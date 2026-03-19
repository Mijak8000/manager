import { AutomationModule } from '@libs/automation/modules/automation.module';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TOKEN_USAGE_REPOSITORY_TOKEN } from '../domain/token-usage/contracts/tokenUsage.repository.contract';
import { TOKEN_USAGE_SERVICE_TOKEN } from '../domain/token-usage/contracts/tokenUsage.service.contract';

import { TokenUsageRepository } from '../infrastructure/adapters/repositories/tokenUsage.repository';
import { TokenUsageService } from '../infrastructure/adapters/services/tokenUsage.service';

import { PullRequestsModule } from '@libs/code-review/modules/pull-requests.module';
import { TrackUseCase } from '../application/use-cases/segment/track.use-case';
import { CostEstimateUseCase } from '../application/use-cases/usage/cost-estimate.use-case';
import { TokenPricingUseCase } from '../application/use-cases/usage/token-pricing.use-case';
import { TokensByDeveloperUseCase } from '../application/use-cases/usage/tokens-developer.use-case';
import { TokensByPrUseCase } from '../application/use-cases/usage/tokens-pr.use-case';
import {
    ObservabilityTelemetryModel,
    ObservabilityTelemetryModelSchema,
} from '../infrastructure/adapters/repositories/schemas/observabilityTelemetry.model';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: ObservabilityTelemetryModel.name,
                schema: ObservabilityTelemetryModelSchema,
            },
        ]),
        forwardRef(() => AutomationModule),
        forwardRef(() => PullRequestsModule),
    ],
    providers: [
        {
            provide: TOKEN_USAGE_REPOSITORY_TOKEN,
            useClass: TokenUsageRepository,
        },
        { provide: TOKEN_USAGE_SERVICE_TOKEN, useClass: TokenUsageService },
        TrackUseCase,
        TokenPricingUseCase,
        TokensByPrUseCase,
        TokensByDeveloperUseCase,
        CostEstimateUseCase,
    ],
    exports: [
        TOKEN_USAGE_SERVICE_TOKEN,
        TrackUseCase,
        TokenPricingUseCase,
        TokensByPrUseCase,
        TokensByDeveloperUseCase,
        CostEstimateUseCase,
    ],
})
export class AnalyticsModule {}
