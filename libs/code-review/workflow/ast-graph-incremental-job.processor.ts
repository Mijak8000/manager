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

interface AstGraphIncrementalJobPayload {
    repositoryId: string;
    changedFiles: string[];
    newSha: string;
    cloneUrl: string;
    defaultBranch: string;
    fullName: string;
    platform: string;
    organizationAndTeamData: OrganizationAndTeamData;
}

@Injectable()
export class AstGraphIncrementalJobProcessor implements IJobProcessorService {
    private readonly logger = createLogger(AstGraphIncrementalJobProcessor.name);

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
            message: `Processing AST Graph Incremental Update job ${jobId}`,
            context: AstGraphIncrementalJobProcessor.name,
            metadata: { jobId, correlationId: job.correlationId },
        });

        await this.jobRepository.update(jobId, {
            status: JobStatus.PROCESSING,
            startedAt: new Date(),
        });

        const payload = job.payload as unknown as AstGraphIncrementalJobPayload;

        if (!payload?.repositoryId || !payload?.changedFiles?.length || !payload?.newSha) {
            throw new Error('Invalid payload: missing required fields (repositoryId, changedFiles, newSha)');
        }

        let sandbox: SandboxInstance | undefined;

        try {
            // 1. Resolve auth credentials for git clone
            let cloneParams;
            try {
                cloneParams = await this.codeManagementService.getCloneParams(
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
            } catch (authError) {
                this.logger.warn({
                    message: `Auth resolution failed for incremental update job ${jobId}`,
                    context: AstGraphIncrementalJobProcessor.name,
                    error: authError,
                    metadata: { jobId, repositoryId: payload.repositoryId },
                });
                throw authError;
            }

            // 2. Create sandbox with repo cloned
            sandbox = await this.sandboxProvider.createSandboxWithRepo({
                cloneUrl: cloneParams.url || payload.cloneUrl,
                authToken: cloneParams.auth?.token || '',
                authUsername: cloneParams.auth?.username,
                branch: payload.defaultBranch,
                platform: payload.platform as PlatformType,
            });

            // 3. Run incremental AST graph update
            await this.astGraphBuildService.incrementalUpdate({
                repositoryId: payload.repositoryId,
                sandbox: sandbox.sandboxHandle as Sandbox,
                changedFiles: payload.changedFiles,
                newSha: payload.newSha,
            });

            await this.markCompleted(jobId, {
                repositoryId: payload.repositoryId,
                newSha: payload.newSha,
                changedFilesCount: payload.changedFiles.length,
            });

            this.logger.log({
                message: `AST Graph Incremental Update job ${jobId} completed successfully`,
                context: AstGraphIncrementalJobProcessor.name,
                metadata: {
                    jobId,
                    repositoryId: payload.repositoryId,
                    newSha: payload.newSha,
                    changedFilesCount: payload.changedFiles.length,
                },
            });
        } catch (error) {
            this.logger.error({
                message: `AST Graph Incremental Update job ${jobId} failed`,
                error,
                context: AstGraphIncrementalJobProcessor.name,
                metadata: {
                    jobId,
                    repositoryId: payload.repositoryId,
                    changedFilesCount: payload.changedFiles?.length,
                },
            });

            await this.handleFailure(jobId, error);
            throw error;
        } finally {
            // 4. Always cleanup sandbox
            if (sandbox) {
                try {
                    await sandbox.cleanup();
                } catch (cleanupError) {
                    this.logger.warn({
                        message: `Sandbox cleanup failed for job ${jobId}`,
                        context: AstGraphIncrementalJobProcessor.name,
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
