import { Inject, Injectable } from '@nestjs/common';

import {
    ITokenUsageService,
    TOKEN_USAGE_SERVICE_TOKEN,
} from '@libs/analytics/domain/token-usage/contracts/tokenUsage.service.contract';
import {
    DailyUsageByPrResultContract,
    TokenUsageQueryContract,
    UsageByPrResultContract,
} from '@libs/analytics/domain/token-usage/types/tokenUsage.types';
import {
    AUTOMATION_EXECUTION_SERVICE_TOKEN,
    IAutomationExecutionService,
} from '@libs/automation/domain/automationExecution/contracts/automation-execution.service';

@Injectable()
export class TokensByPrUseCase {
    constructor(
        @Inject(TOKEN_USAGE_SERVICE_TOKEN)
        private readonly tokenUsageService: ITokenUsageService,
        @Inject(AUTOMATION_EXECUTION_SERVICE_TOKEN)
        private readonly automationExecutionService: IAutomationExecutionService,
    ) {}

    execute(
        query: TokenUsageQueryContract,
        daily: true,
    ): Promise<DailyUsageByPrResultContract[]>;

    execute(
        query: TokenUsageQueryContract,
        daily: false,
    ): Promise<UsageByPrResultContract[]>;

    async execute(
        query: TokenUsageQueryContract,
        daily: boolean,
    ): Promise<UsageByPrResultContract[] | DailyUsageByPrResultContract[]> {
        const queryWithoutRepository: TokenUsageQueryContract = {
            ...query,
            repositoryId: undefined,
        };

        const [usageByPr, prRefs] = await Promise.all([
            daily
                ? this.tokenUsageService.getDailyUsageByPr(
                      queryWithoutRepository,
                  )
                : this.tokenUsageService.getUsageByPr(queryWithoutRepository),
            this.automationExecutionService.findDistinctPullRequestRefsByOrganizationAndPeriod(
                {
                    organizationId: query.organizationId,
                    startDate: query.start,
                    endDate: query.end,
                    pullRequestNumber: query.prNumber,
                    repositoryId: query.repositoryId,
                },
            ),
        ]);

        const repositoriesByPrNumber = new Map<number, string[]>();

        for (const ref of prRefs) {
            const existing = repositoriesByPrNumber.get(ref.pullRequestNumber);

            if (!existing) {
                repositoriesByPrNumber.set(ref.pullRequestNumber, [
                    ref.repositoryId,
                ]);
                continue;
            }

            const alreadyExists = existing.includes(ref.repositoryId);

            if (!alreadyExists) {
                existing.push(ref.repositoryId);
            }
        }

        const filteredByKnownPrs = usageByPr.filter((item) =>
            repositoriesByPrNumber.has(item.prNumber),
        );

        const prCount = prRefs.length;

        return filteredByKnownPrs.flatMap((item) => {
            const repositories =
                repositoriesByPrNumber.get(item.prNumber) ?? [];

            if (repositories.length === 0) {
                return [];
            }

            return repositories.map((repositoryId) => ({
                ...item,
                repositoryId,
                prCount,
            }));
        });
    }
}
