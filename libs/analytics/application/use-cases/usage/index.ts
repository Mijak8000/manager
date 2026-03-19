import { CostEstimateUseCase } from './cost-estimate.use-case';
import { TokenPricingUseCase } from './token-pricing.use-case';
import { TokensByDeveloperUseCase } from './tokens-developer.use-case';
import { TokensByPrUseCase } from './tokens-pr.use-case';

export const UseCases = [
    TokensByPrUseCase,
    TokensByDeveloperUseCase,
    TokenPricingUseCase,
    CostEstimateUseCase,
];
