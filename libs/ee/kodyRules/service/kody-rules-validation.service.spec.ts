import { KodyRulesValidationService } from './kody-rules-validation.service';
import {
    KodyRulesStatus,
    KodyRulesType,
} from '@libs/kodyRules/domain/interfaces/kodyRules.interface';

describe('KodyRulesValidationService', () => {
    const permissionValidationService = {
        shouldLimitResources: jest.fn(),
    };

    let service: KodyRulesValidationService;

    beforeEach(() => {
        jest.clearAllMocks();
        service = new KodyRulesValidationService(
            permissionValidationService as any,
        );
    });

    it('allows limited free accounts to keep up to 1000 Kody Rules', async () => {
        permissionValidationService.shouldLimitResources.mockResolvedValue(
            true,
        );

        await expect(
            service.validateRulesLimit({ organizationId: 'org-1' }, 1000),
        ).resolves.toBe(true);
        await expect(
            service.validateRulesLimit({ organizationId: 'org-1' }, 1001),
        ).resolves.toBe(false);
    });

    it('keeps the first 1000 active rules when enforcement is limited', () => {
        const rules = Array.from({ length: 1001 }, (_, index) => ({
            uuid: `rule-${index}`,
            title: `Rule ${index}`,
            rule: `Rule body ${index}`,
            type: KodyRulesType.STANDARD,
            status: KodyRulesStatus.ACTIVE,
            repositoryId: 'repo-1',
            createdAt: new Date(2026, 0, index + 1),
        }));

        const { standardRules } = service.filterKodyRules(
            rules,
            'repo-1',
            undefined,
            true,
        );

        expect(standardRules).toHaveLength(1000);
        expect(standardRules.at(-1)?.uuid).toBe('rule-999');
    });
});
