import { createLogger } from '@kodus/flow';
import {
    Controller,
    HttpStatus,
    Inject,
    Optional,
    Post,
    Req,
    Res,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { PlatformType } from '@libs/core/domain/enums/platform-type.enum';
import { Public } from '@libs/identity/infrastructure/adapters/services/auth/public.decorator';
import { EnqueueWebhookUseCase } from '@libs/platform/application/use-cases/webhook/enqueue-webhook.use-case';
import { RepositoryRepository } from '@libs/code-review/infrastructure/adapters/repositories/repository.repository';
import { AstGraphStatus } from '@libs/code-review/infrastructure/adapters/repositories/schemas/repository.model';
import { WorkflowType } from '@libs/core/workflow/domain/enums/workflow-type.enum';
import { HandlerType } from '@libs/core/workflow/domain/enums/handler-type.enum';
import { JobStatus } from '@libs/core/workflow/domain/enums/job-status.enum';
import {
    IJobQueueService,
    JOB_QUEUE_SERVICE_TOKEN,
} from '@libs/core/workflow/domain/contracts/job-queue.service.contract';

@Public()
@Controller('github')
export class GithubController {
    private readonly logger = createLogger(GithubController.name);

    constructor(
        private readonly enqueueWebhookUseCase: EnqueueWebhookUseCase,
        @Optional()
        private readonly repositoryRepository?: RepositoryRepository,
        @Optional()
        @Inject(JOB_QUEUE_SERVICE_TOKEN)
        private readonly jobQueueService?: IJobQueueService,
    ) {}

    @Post('/webhook')
    handleWebhook(@Req() req: Request, @Res() res: Response) {
        const event = req.headers['x-github-event'] as string;
        const payload = req.body as any;

        // Filter unsupported events before enqueueing
        const supportedEvents = [
            'pull_request',
            'issue_comment',
            'pull_request_review_comment',
            'push',
        ];
        if (!supportedEvents.includes(event)) {
            return res
                .status(HttpStatus.OK)
                .send('Webhook ignored (event not supported)');
        }

        // Handle push events for incremental graph update
        if (event === 'push') {
            const ref = payload.ref || '';
            const defaultBranch =
                payload.repository?.default_branch || 'main';

            // Only process pushes to the default branch
            if (ref !== `refs/heads/${defaultBranch}`) {
                return res
                    .status(HttpStatus.OK)
                    .send('Webhook ignored (not default branch)');
            }

            // Extract changed files from commits
            const changedFiles = new Set<string>();
            for (const commit of payload.commits || []) {
                for (const f of commit.added || []) changedFiles.add(f);
                for (const f of commit.modified || []) changedFiles.add(f);
                for (const f of commit.removed || []) changedFiles.add(f);
            }

            if (changedFiles.size === 0) {
                return res
                    .status(HttpStatus.OK)
                    .send('Webhook ignored (no changed files)');
            }

            res.status(HttpStatus.OK).send('Push received');

            if (this.repositoryRepository && this.jobQueueService) {
                setImmediate(() => {
                    this.enqueueIncrementalUpdate(
                        String(payload.repository?.id || ''),
                        Array.from(changedFiles),
                        payload.after || '',
                    ).catch((err) => {
                        this.logger.warn({
                            message: `[AST-GRAPH] Failed to enqueue incremental update: ${err.message}`,
                            context: GithubController.name,
                        });
                    });
                });
            }

            return;
        }

        // For pull_request events, filter unsupported actions
        if (event === 'pull_request') {
            const allowedActions = [
                'opened',
                'synchronize',
                'closed',
                'reopened',
                'ready_for_review',
            ];
            if (!allowedActions.includes(payload?.action)) {
                return res
                    .status(HttpStatus.OK)
                    .send('Webhook ignored (action not supported)');
            }
        }

        // Responde imediatamente (não bloqueia a request aguardando persistência/fila)
        res.status(HttpStatus.OK).send('Webhook received');

        setImmediate(() => {
            void this.enqueueWebhookUseCase
                .execute({
                    platformType: PlatformType.GITHUB,
                    event,
                    payload,
                })
                .then(() => {
                    this.logger.log({
                        message: `Webhook enqueued, ${event}`,
                        context: GithubController.name,
                        metadata: {
                            event,
                            installationId: payload?.installation?.id,
                            repository: payload?.repository?.name,
                        },
                    });
                })
                .catch((error) => {
                    this.logger.error({
                        message: 'Error enqueuing webhook',
                        context: GithubController.name,
                        error,
                        metadata: {
                            event,
                            platformType: PlatformType.GITHUB,
                        },
                    });
                });
        });
    }

    private async enqueueIncrementalUpdate(
        repoExternalId: string,
        changedFiles: string[],
        newSha: string,
    ): Promise<void> {
        if (!this.repositoryRepository || !this.jobQueueService) return;

        const repo = await this.repositoryRepository.findByExternalId(
            'github',
            repoExternalId,
        );
        if (!repo || repo.astGraphStatus !== AstGraphStatus.READY) return;

        await this.jobQueueService.enqueue({
            correlationId: repo.uuid,
            workflowType: WorkflowType.AST_GRAPH_INCREMENTAL,
            handlerType: HandlerType.SIMPLE_FUNCTION,
            payload: {
                repositoryId: repo.uuid,
                changedFiles,
                newSha,
                cloneUrl: '',
                defaultBranch: repo.defaultBranch,
                fullName: repo.fullName,
                platform: repo.platform,
            },
            status: JobStatus.PENDING,
            priority: 0,
            retryCount: 0,
            maxRetries: 3,
        });

        this.logger.log({
            message: `[AST-GRAPH] Enqueued incremental update for ${repo.fullName}: ${changedFiles.length} files`,
            context: GithubController.name,
        });
    }
}
