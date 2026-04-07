import { createLogger } from '@kodus/flow';
import { Injectable, Inject } from '@nestjs/common';
import type { Sandbox } from 'e2b';

import { IJobProcessorService } from '@libs/core/workflow/domain/contracts/job-processor.service.contract';
import {
    IWorkflowJobRepository,
    WORKFLOW_JOB_REPOSITORY_TOKEN,
} from '@libs/core/workflow/domain/contracts/workflow-job.repository.contract';
import { JobStatus } from '@libs/core/workflow/domain/enums/job-status.enum';
import { ErrorClassification } from '@libs/core/workflow/domain/enums/error-classification.enum';
import { PlatformType } from '@libs/core/domain/enums';
import {
    ISandboxProvider,
    SANDBOX_PROVIDER_TOKEN,
    SandboxInstance,
} from '@libs/code-review/domain/contracts/sandbox.provider';
import { CodeManagementService } from '@libs/platform/infrastructure/adapters/services/codeManagement.service';
import { AstGraphBuildService } from '@libs/code-review/infrastructure/adapters/services/astGraphBuild.service';
import { OrganizationAndTeamData } from '@libs/core/infrastructure/config/types/general/organizationAndTeamData';

interface AstGraphBuildJobPayload {
    repositoryId: string;
    cloneUrl: string;
    defaultBranch: string;
    fullName: string;
    platform: string;
    organizationAndTeamData: OrganizationAndTeamData;
}

@Injectable()
export class AstGraphBuildJobProcessor implements IJobProcessorService {
    private readonly logger = createLogger(AstGraphBuildJobProcessor.name);

    constructor(
        @Inject(WORKFLOW_JOB_REPOSITORY_TOKEN)
        private readonly jobRepository: IWorkflowJobRepository,
        @Inject(SANDBOX_PROVIDER_TOKEN)
        private readonly sandboxProvider: ISandboxProvider,
        private readonly codeManagementService: CodeManagementService,
        private readonly astGraphBuildService: AstGraphBuildService,
    ) {}

    async process(jobId: string): Promise<void> {
        const job = await this.jobRepository.findOne(jobId);

        if (!job) {
            throw new Error(`Job ${jobId} not found`);
        }

        this.logger.log({
            message: `Processing AST Graph Build job ${jobId}`,
            context: AstGraphBuildJobProcessor.name,
            metadata: { jobId, correlationId: job.correlationId },
        });

        await this.jobRepository.update(jobId, {
            status: JobStatus.PROCESSING,
            startedAt: new Date(),
        });

        const payload = job.payload as unknown as AstGraphBuildJobPayload;

        if (!payload?.repositoryId || !payload?.fullName || !payload?.defaultBranch) {
            throw new Error('Invalid payload: missing required fields (repositoryId, fullName, defaultBranch)');
        }

        let sandbox: SandboxInstance | undefined;

        try {
            // 1. Resolve auth credentials for git clone
            const cloneParams = await this.codeManagementService.getCloneParams(
                {
                    repository: {
                        id: '0', // not needed for token resolution
                        defaultBranch: payload.defaultBranch,
                        fullName: payload.fullName,
                        name: payload.fullName.split('/').pop() || payload.fullName,
                    },
                    organizationAndTeamData: payload.organizationAndTeamData,
                },
                payload.platform as PlatformType,
            );

            // 2. Create sandbox with repo cloned
            sandbox = await this.sandboxProvider.createSandboxWithRepo({
                cloneUrl: cloneParams.url || payload.cloneUrl,
                authToken: cloneParams.auth?.token || '',
                authUsername: cloneParams.auth?.username,
                branch: payload.defaultBranch,
                platform: payload.platform as PlatformType,
            });

            // 3. Get HEAD sha from the sandbox
            const shaResult = await (sandbox.sandboxHandle as Sandbox).commands.run(
                'git -C /home/user/repo rev-parse HEAD',
                { timeoutMs: 10_000 },
            );
            const headSha = shaResult.stdout?.trim() || '';

            if (!headSha) {
                throw new Error('Failed to resolve HEAD sha from sandbox');
            }

            // 4. Run full AST graph build
            await this.astGraphBuildService.fullBuild({
                repositoryId: payload.repositoryId,
                sandbox: sandbox.sandboxHandle as Sandbox,
                headSha,
            });

            await this.markCompleted(jobId, {
                repositoryId: payload.repositoryId,
                headSha,
            });

            this.logger.log({
                message: `AST Graph Build job ${jobId} completed successfully`,
                context: AstGraphBuildJobProcessor.name,
                metadata: { jobId, repositoryId: payload.repositoryId, headSha },
            });
        } catch (error) {
            this.logger.error({
                message: `AST Graph Build job ${jobId} failed`,
                error,
                context: AstGraphBuildJobProcessor.name,
                metadata: { jobId, repositoryId: payload.repositoryId },
            });

            await this.handleFailure(jobId, error);
            throw error;
        } finally {
            // 5. Always cleanup sandbox
            if (sandbox) {
                try {
                    await sandbox.cleanup();
                } catch (cleanupError) {
                    this.logger.warn({
                        message: `Sandbox cleanup failed for job ${jobId}`,
                        context: AstGraphBuildJobProcessor.name,
                        error: cleanupError,
                    });
                }
            }
        }
    }

    async handleFailure(jobId: string, error: Error): Promise<void> {
        await this.jobRepository.update(jobId, {
            status: JobStatus.FAILED,
            errorClassification: ErrorClassification.PERMANENT,
            lastError: error.message?.slice(0, 1000),
            failedAt: new Date(),
        });
    }

    async markCompleted(jobId: string, result?: unknown): Promise<void> {
        await this.jobRepository.update(jobId, {
            status: JobStatus.COMPLETED,
            completedAt: new Date(),
            result,
        });
    }
}
