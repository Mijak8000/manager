import { UserRequest } from '@libs/core/infrastructure/config/types/http/user-request.type';
import {
    ISSOConfigService,
    SSO_CONFIG_SERVICE_TOKEN,
} from '@libs/ee/sso/domain/contracts/ssoConfig.service.contract';
import {
    SSOProtocol,
    SSOProtocolConfigMap,
} from '@libs/ee/sso/domain/interfaces/ssoConfig.interface';
import { CreateOrUpdateSSOConfigUseCase } from '@libs/ee/sso/use-cases/create-or-update.use-case';
import { GetSSOConnectionTestResultUseCase } from '@libs/ee/sso/use-cases/test-connection/get-sso-connection-test-result.use-case';
import { StartSSOConnectionTestUseCase } from '@libs/ee/sso/use-cases/test-connection/start-sso-connection-test.use-case';
import {
    Action,
    ResourceType,
} from '@libs/identity/domain/permissions/enums/permissions.enum';
import {
    CheckPolicies,
    PolicyGuard,
} from '@libs/identity/infrastructure/adapters/services/permissions/policy.guard';
import { checkPermissions } from '@libs/identity/infrastructure/adapters/services/permissions/policy.handlers';
import {
    Body,
    Controller,
    Get,
    Inject,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import {
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';
import { ApiStandardResponses } from '../docs/api-standard-responses.decorator';
import { ApiObjectResponseDto } from '../dtos/api-response.dto';

@ApiTags('SSO Config')
@ApiBearerAuth('jwt')
@ApiStandardResponses()
@Controller('sso-config')
export class SSOConfigController {
    constructor(
        private readonly createOrUpdateSSOConfigUseCase: CreateOrUpdateSSOConfigUseCase,
        private readonly startSSOConnectionTestUseCase: StartSSOConnectionTestUseCase,
        private readonly getSSOConnectionTestResultUseCase: GetSSOConnectionTestResultUseCase,

        @Inject(SSO_CONFIG_SERVICE_TOKEN)
        private readonly ssoConfigService: ISSOConfigService,

        @Inject(REQUEST)
        private readonly request: UserRequest,
    ) {}

    @Post()
    @UseGuards(PolicyGuard)
    @CheckPolicies(
        checkPermissions({
            action: Action.Create,
            resource: ResourceType.OrganizationSettings,
        }),
    )
    @ApiOperation({
        summary: 'Create or update SSO config',
        description: 'Create or update SSO configuration for the organization.',
    })
    @ApiCreatedResponse({ type: ApiObjectResponseDto })
    async createOrUpdate(
        @Body()
        body: {
            uuid?: string;
            protocol?: SSOProtocol;
            providerConfig?: SSOProtocolConfigMap[SSOProtocol];
            active?: boolean;
            domains?: string[];
            testSessionId?: string;
        },
    ) {
        const organizationId = this.request?.user?.organization?.uuid;
        const userId = this.request?.user?.uuid;

        if (!organizationId) {
            throw new Error('Organization not found');
        }

        return await this.createOrUpdateSSOConfigUseCase.execute({
            ...body,
            organizationId,
            userId,
        });
    }

    @Post('test/start')
    @UseGuards(PolicyGuard)
    @CheckPolicies(
        checkPermissions({
            action: Action.Create,
            resource: ResourceType.OrganizationSettings,
        }),
    )
    @ApiOperation({
        summary: 'Start SSO connection test',
        description:
            'Starts a temporary SSO test session using draft config and returns the redirect URL.',
    })
    @ApiCreatedResponse({ type: ApiObjectResponseDto })
    async startConnectionTest(
        @Body()
        body: {
            protocol: SSOProtocol;
            providerConfig: SSOProtocolConfigMap[SSOProtocol];
            domains: string[];
        },
    ) {
        const organizationId = this.request?.user?.organization?.uuid;

        if (!organizationId) {
            throw new Error('Organization not found');
        }

        return this.startSSOConnectionTestUseCase.execute({
            organizationId,
            protocol: body.protocol,
            providerConfig: body.providerConfig,
            domains: body.domains,
            userId: this.request?.user?.uuid,
        });
    }

    @Get('test/result')
    @UseGuards(PolicyGuard)
    @CheckPolicies(
        checkPermissions({
            action: Action.Read,
            resource: ResourceType.OrganizationSettings,
        }),
    )
    @ApiOperation({
        summary: 'Get SSO connection test result',
        description:
            'Returns the current status of a temporary SSO test session.',
    })
    @ApiOkResponse({ type: ApiObjectResponseDto })
    async getConnectionTestResult(@Query('sessionId') sessionId: string) {
        return this.getSSOConnectionTestResultUseCase.execute(sessionId);
    }

    @Get()
    @ApiQuery({
        name: 'protocol',
        enum: SSOProtocol,
        type: String,
        required: false,
    })
    @ApiQuery({ name: 'active', type: Boolean, required: false })
    @UseGuards(PolicyGuard)
    @CheckPolicies(
        checkPermissions({
            action: Action.Read,
            resource: ResourceType.OrganizationSettings,
        }),
    )
    @ApiOperation({
        summary: 'Get SSO config',
        description: 'Return SSO configuration for the organization.',
    })
    @ApiOkResponse({ type: ApiObjectResponseDto })
    @ApiNotFoundResponse({ description: 'SSO config not found' })
    async getSSOConfigs(
        @Query('protocol') protocol?: SSOProtocol,
        @Query('active') active?: boolean,
    ) {
        const organizationId = this.request?.user?.organization?.uuid;

        if (!organizationId) {
            throw new Error('Organization not found');
        }

        const ssoConfig = await this.ssoConfigService.findOne({
            active,
            organization: {
                uuid: organizationId,
            },
            protocol,
        });

        if (!ssoConfig) {
            return null;
        }

        return ssoConfig.toJson();
    }
}
