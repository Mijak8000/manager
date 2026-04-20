import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';

import { createLogger } from '@kodus/flow';
import {
    ISSOConfigService,
    SSO_CONFIG_SERVICE_TOKEN,
} from '../domain/contracts/ssoConfig.service.contract';
import {
    SSOConnectionTestStatus,
    SSOProtocol,
    SSOProtocolConfigMap,
} from '../domain/interfaces/ssoConfig.interface';
import { SSOTestSessionService } from '../services/sso-test-session.service';
import {
    buildSSOConfigFingerprint,
    normalizeDomains,
} from '../utils/sso-fingerprint.util';

@Injectable()
export class CreateOrUpdateSSOConfigUseCase {
    private readonly logger = createLogger(CreateOrUpdateSSOConfigUseCase.name);

    constructor(
        @Inject(SSO_CONFIG_SERVICE_TOKEN)
        private readonly ssoConfigService: ISSOConfigService,
        private readonly ssoTestSessionService: SSOTestSessionService,
    ) {}

    async execute(params: {
        organizationId: string;
        uuid?: string;
        protocol?: SSOProtocol;
        providerConfig?: SSOProtocolConfigMap[SSOProtocol];
        active?: boolean;
        domains?: string[];
        testSessionId?: string;
        userId?: string;
    }) {
        const {
            organizationId,
            uuid,
            protocol,
            providerConfig,
            active,
            domains,
            testSessionId,
            userId,
        } = params;

        if (uuid) {
            const ssoConfig = await this.ssoConfigService.findOne({
                uuid,
                organization: {
                    uuid: organizationId,
                },
            });

            if (!ssoConfig) {
                this.logger.error({
                    message: 'SSOConfig not found',
                    context: CreateOrUpdateSSOConfigUseCase.name,
                    metadata: { uuid, organizationId },
                });
                throw new NotFoundException('SSO config not found');
            }

            const targetProtocol = protocol || ssoConfig.protocol;
            const targetProviderConfig =
                providerConfig || ssoConfig.providerConfig;
            const targetDomains = normalizeDomains(
                domains || ssoConfig.domains,
            );
            const targetActive = active ?? ssoConfig.active;
            const targetFingerprint = buildSSOConfigFingerprint({
                protocol: targetProtocol,
                providerConfig: targetProviderConfig,
                domains: targetDomains,
            });

            let nextConnectionTest = ssoConfig.connectionTest;

            if (targetActive) {
                if (testSessionId) {
                    const testSession =
                        await this.ssoTestSessionService.getSession(
                            testSessionId,
                        );

                    if (
                        !testSession ||
                        testSession.organizationId !== organizationId ||
                        testSession.configFingerprint !== targetFingerprint ||
                        testSession.status !== 'success'
                    ) {
                        throw new BadRequestException({
                            message:
                                'Run a successful SSO connection test before enabling SSO.',
                            code: 'SSO_TEST_REQUIRED',
                        });
                    }

                    nextConnectionTest = {
                        ...this.ssoTestSessionService.toConnectionTestMetadata(
                            testSession,
                        ),
                        testedBy: testSession.createdBy || userId,
                    };
                }

                const hasValidPersistedTest =
                    nextConnectionTest?.status ===
                        SSOConnectionTestStatus.SUCCESS &&
                    nextConnectionTest?.configFingerprint === targetFingerprint;

                if (!hasValidPersistedTest) {
                    throw new BadRequestException({
                        message:
                            'Run a successful SSO connection test before enabling SSO.',
                        code: 'SSO_TEST_REQUIRED',
                    });
                }
            }

            if (
                nextConnectionTest?.configFingerprint &&
                nextConnectionTest.configFingerprint !== targetFingerprint
            ) {
                nextConnectionTest = undefined;
            }

            const updated = await this.ssoConfigService.update(ssoConfig.uuid, {
                protocol: targetProtocol,
                providerConfig: targetProviderConfig,
                active: targetActive,
                domains: targetDomains,
                connectionTest: nextConnectionTest,
            });

            this.logger.log({
                message: 'SSO config updated successfully',
                context: CreateOrUpdateSSOConfigUseCase.name,
                metadata: { uuid: updated.uuid, organizationId },
            });

            return updated.toJson();
        }

        if (!protocol || !providerConfig || !domains) {
            this.logger.error({
                message: 'Missing required fields for SSO config creation',
                context: CreateOrUpdateSSOConfigUseCase.name,
                metadata: { protocol, providerConfig, domains },
            });
            throw new BadRequestException('Missing required fields');
        }

        const normalizedDomains = normalizeDomains(domains);
        const targetActive = active ?? true;
        const targetFingerprint = buildSSOConfigFingerprint({
            protocol,
            providerConfig,
            domains: normalizedDomains,
        });

        let connectionTest;

        if (targetActive) {
            if (!testSessionId) {
                throw new BadRequestException({
                    message:
                        'Run a successful SSO connection test before enabling SSO.',
                    code: 'SSO_TEST_REQUIRED',
                });
            }

            const testSession =
                await this.ssoTestSessionService.getSession(testSessionId);

            if (
                !testSession ||
                testSession.organizationId !== organizationId ||
                testSession.configFingerprint !== targetFingerprint ||
                testSession.status !== 'success'
            ) {
                throw new BadRequestException({
                    message:
                        'Run a successful SSO connection test before enabling SSO.',
                    code: 'SSO_TEST_REQUIRED',
                });
            }

            connectionTest = {
                ...this.ssoTestSessionService.toConnectionTestMetadata(
                    testSession,
                ),
                testedBy: testSession.createdBy || userId,
            };
        }

        const created = await this.ssoConfigService.create({
            protocol,
            providerConfig,
            active: targetActive,
            organization: {
                uuid: organizationId,
            },
            domains: normalizedDomains,
            connectionTest,
        });

        this.logger.log({
            message: 'SSO config created successfully',
            context: CreateOrUpdateSSOConfigUseCase.name,
            metadata: { uuid: created.uuid, organizationId },
        });

        return created.toJson();
    }
}
