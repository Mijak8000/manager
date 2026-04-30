import { environment } from '@libs/ee/configs/environment';
import {
    ILicenseService,
    SubscriptionStatus,
} from '@libs/ee/license/interfaces/license.interface';
import { IOrganizationParametersService } from '@libs/organization/domain/organizationParameters/contracts/organizationParameters.service.contract';
import {
    PermissionValidationService,
    ValidationErrorType,
} from './permissionValidation.service';

describe('PermissionValidationService', () => {
    const env = { ...process.env };
    const originalCloudMode = environment.API_CLOUD_MODE;
    const originalDevelopmentMode = environment.API_DEVELOPMENT_MODE;

    const organizationAndTeamData = {
        organizationId: 'org-1',
        teamId: 'team-1',
    };

    let licenseService: jest.Mocked<ILicenseService>;
    let organizationParametersService: jest.Mocked<IOrganizationParametersService>;

    beforeEach(() => {
        process.env = { ...env };
        environment.API_CLOUD_MODE = false;
        environment.API_DEVELOPMENT_MODE = false;

        licenseService = {
            validateOrganizationLicense: jest.fn().mockResolvedValue({
                valid: true,
                subscriptionStatus: SubscriptionStatus.LICENSED_SELF_HOSTED,
                planType: 'enterprise',
                numberOfLicenses: 1000,
            }),
            getAllUsersWithLicense: jest.fn().mockResolvedValue([]),
            assignLicense: jest.fn(),
            unassignLicense: jest.fn(),
        };

        organizationParametersService = {
            findByKey: jest.fn(),
            createOrUpdateConfig: jest.fn(),
            find: jest.fn(),
        } as any;
    });

    afterEach(() => {
        process.env = { ...env };
        environment.API_CLOUD_MODE = originalCloudMode;
        environment.API_DEVELOPMENT_MODE = originalDevelopmentMode;
        jest.clearAllMocks();
    });

    it('does not enforce self-hosted seats when KODUS_ENTERPRISE_ACCESS is enabled', async () => {
        process.env.KODUS_ENTERPRISE_ACCESS = 'true';

        const service = new PermissionValidationService(
            licenseService,
            organizationParametersService,
        );

        await expect(
            service.validateExecutionPermissions(
                organizationAndTeamData,
                'unassigned-user',
                'test',
            ),
        ).resolves.toEqual({ allowed: true });

        expect(licenseService.getAllUsersWithLicense).not.toHaveBeenCalled();
    });

    it('still enforces self-hosted seats for normal self-hosted licenses', async () => {
        delete process.env.KODUS_ENTERPRISE_ACCESS;

        const service = new PermissionValidationService(
            licenseService,
            organizationParametersService,
        );

        await expect(
            service.validateExecutionPermissions(
                organizationAndTeamData,
                'unassigned-user',
                'test',
            ),
        ).resolves.toMatchObject({
            allowed: false,
            errorType: ValidationErrorType.USER_NOT_LICENSED,
        });

        expect(licenseService.getAllUsersWithLicense).toHaveBeenCalledWith(
            organizationAndTeamData,
        );
    });

});
