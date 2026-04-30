import { SubscriptionStatus } from './interfaces/license.interface';
import { SelfHostedLicenseService } from './self-hosted-license.service';

describe('SelfHostedLicenseService enterprise access override', () => {
    const env = { ...process.env };
    const organizationParametersService = {
        findByKey: jest.fn(),
        createOrUpdateConfig: jest.fn(),
        find: jest.fn(),
    };

    afterEach(() => {
        process.env = { ...env };
        jest.clearAllMocks();
    });

    it('returns a licensed self-hosted result without requiring a license key when KODUS_ENTERPRISE_ACCESS is enabled', async () => {
        process.env.KODUS_ENTERPRISE_ACCESS = 'true';
        process.env.KODUS_ENTERPRISE_ACCESS_PLAN = 'enterprise';
        process.env.KODUS_ENTERPRISE_ACCESS_SEATS = '1234';

        const service = new SelfHostedLicenseService(
            organizationParametersService as any,
        );

        await expect(
            service.validateOrganizationLicense({ organizationId: 'org-1' }),
        ).resolves.toEqual({
            valid: true,
            subscriptionStatus: SubscriptionStatus.LICENSED_SELF_HOSTED,
            planType: 'enterprise',
            numberOfLicenses: 1234,
        });
        expect(organizationParametersService.findByKey).not.toHaveBeenCalled();
    });
});
