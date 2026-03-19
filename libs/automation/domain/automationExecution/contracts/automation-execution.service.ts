import { CodeReviewExecutionEntity } from '@libs/automation/domain/codeReviewExecutions/entities/codeReviewExecution.entity';
import { AutomationStatus } from '../../automation/enum/automation-status';
import { CodeReviewExecution } from '../../codeReviewExecutions/interfaces/codeReviewExecution.interface';
import { AutomationExecutionEntity } from '../entities/automation-execution.entity';
import { IAutomationExecution } from '../interfaces/automation-execution.interface';
import { IAutomationExecutionRepository } from './automation-execution.repository';

export const AUTOMATION_EXECUTION_SERVICE_TOKEN = Symbol(
    'AutomationExecutionService',
);

export interface IAutomationExecutionService extends IAutomationExecutionRepository {
    findOneByOrganizationIdAndIssueId(
        organizationId: string,
        issueId: string,
    ): Promise<boolean>;

    createCodeReview(
        automationExecution: Omit<
            IAutomationExecution,
            'uuid' | 'createdAt' | 'updatedAt' | 'codeReviewExecutions'
        >,
        message: string,
        stageName?: string,
        metadata?: Record<string, any>,
    ): Promise<{
        execution: AutomationExecutionEntity;
        stageLog?: CodeReviewExecutionEntity<IAutomationExecution>;
    } | null>;

    updateCodeReview(
        filter: Partial<IAutomationExecution>,
        automationExecution: Partial<
            Omit<
                IAutomationExecution,
                'uuid' | 'createdAt' | 'updatedAt' | 'codeReviewExecutions'
            >
        >,
        message: string,
        stageName?: string,
        metadata?: Record<string, any>,
    ): Promise<{
        execution: AutomationExecutionEntity;
        stageLog?: CodeReviewExecutionEntity<IAutomationExecution>;
    } | null>;

    updateStageLog(
        uuid: string,
        data: Partial<
            Omit<
                CodeReviewExecution<IAutomationExecution>,
                'uuid' | 'createdAt' | 'updatedAt'
            >
        >,
    ): Promise<void>;

    findLatestStageLog(
        executionId: string,
        stageName: string,
    ): Promise<CodeReviewExecutionEntity<IAutomationExecution> | null>;

    hasStageWithStatus(
        executionId: string,
        stageNames: string[],
        statuses: AutomationStatus[],
    ): Promise<boolean>;

    countDistinctPullRequestsByOrganizationAndPeriod(params: {
        organizationId: string;
        startDate: Date;
        endDate: Date;
        pullRequestNumber?: number;
        repositoryId?: string;
    }): Promise<number>;

    findDistinctPullRequestRefsByOrganizationAndPeriod(params: {
        organizationId: string;
        startDate: Date;
        endDate: Date;
        pullRequestNumber?: number;
        repositoryId?: string;
    }): Promise<
        Array<{
            pullRequestNumber: number;
            repositoryId: string;
        }>
    >;
}
