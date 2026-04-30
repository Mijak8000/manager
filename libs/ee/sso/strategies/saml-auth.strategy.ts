import {
    Inject,
    Injectable,
    Logger,
    UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { MultiSamlStrategy } from '@node-saml/passport-saml';

import {
    SSOConnectionTestSessionStatus,
    SSOProtocol,
    SSOProtocolConfigMap,
} from '@libs/ee/sso/domain/interfaces/ssoConfig.interface';
import {
    ISSOConfigService,
    SSO_CONFIG_SERVICE_TOKEN,
} from '../domain/contracts/ssoConfig.service.contract';
import { SSOTestSessionService } from '../services/sso-test-session.service';

/**
 * Build the SAML ACS (Assertion Consumer Service) URL the IdP will
 * POST the SAMLResponse to. Centralised so the value is identical
 * everywhere it's referenced — drift between two interpolation sites
 * silently breaks the IdP's signature check.
 *
 * Throws when API_URL is unset, which produces a clear error in the
 * passport-saml chain instead of a malformed
 * "undefined/auth/sso/saml/callback/<id>" URL that the IdP rejects
 * with an unhelpful message.
 */
function buildSamlCallbackUrl(organizationId: string): string {
    const apiUrl = process.env.API_URL;
    if (!apiUrl) {
        throw new Error(
            'API_URL is not set. The SAML callback URL cannot be built. ' +
                'Set API_URL to the public, browser-reachable URL of this ' +
                'API (e.g. https://api.example.com).',
        );
    }
    return `${apiUrl.replace(/\/$/, '')}/auth/sso/saml/callback/${organizationId}`;
}

@Injectable()
export class SamlStrategy extends PassportStrategy(MultiSamlStrategy, 'saml') {
    constructor(
        @Inject(SSO_CONFIG_SERVICE_TOKEN)
        private readonly ssoConfigService: ISSOConfigService,
        private readonly ssoTestSessionService: SSOTestSessionService,
    ) {
        // Boot-time heads-up. The strategy is always instantiated
        // (the SSO module is unconditionally loaded), but API_URL is
        // only consumed when an actual SSO login fires. Warning
        // (not throwing) keeps installs that don't use SSO working;
        // the request-time check in buildSamlCallbackUrl is the hard
        // gate when SSO is actually attempted.
        if (!process.env.API_URL) {
            Logger.warn(
                'API_URL is not set. SAML SSO callbacks will fail until ' +
                    'this is configured. Required if any organization on ' +
                    'this instance uses SSO.',
                SamlStrategy.name,
            );
        }
        super(
            {
                passReqToCallback: true,
                getSamlOptions: async (req, done) => {
                    try {
                        const organizationId = req?.params
                            ?.organizationId as string;
                        const relayState =
                            req?.body?.RelayState || req?.query?.RelayState;

                        if (!organizationId) {
                            return done(
                                new Error('No Organization ID provided'),
                            );
                        }

                        if (relayState) {
                            const testSession =
                                await this.ssoTestSessionService.getSession(
                                    relayState,
                                );

                            if (
                                testSession &&
                                testSession.organizationId === organizationId &&
                                testSession.protocol === SSOProtocol.SAML &&
                                testSession.status ===
                                    SSOConnectionTestSessionStatus.PENDING
                            ) {
                                const samlConfig =
                                    testSession.providerConfig as SSOProtocolConfigMap[SSOProtocol.SAML];

                                return done(null, {
                                    entryPoint: samlConfig.entryPoint,
                                    idpCert: samlConfig.cert,
                                    idpIssuer: samlConfig.idpIssuer,
                                    issuer:
                                        samlConfig.issuer ||
                                        'kodus-orchestrator',
                                    callbackUrl:
                                        buildSamlCallbackUrl(organizationId),
                                    wantAssertionsSigned: false,
                                    identifierFormat:
                                        samlConfig.identifierFormat || null,
                                    signatureAlgorithm: 'sha256',
                                });
                            }
                        }

                        const ssoConfig = await this.ssoConfigService.findOne({
                            protocol: SSOProtocol.SAML,
                            organization: {
                                uuid: organizationId,
                            },
                        });

                        if (!ssoConfig) {
                            return done(new Error('SSO config not found'));
                        }

                        return done(null, {
                            entryPoint: ssoConfig.providerConfig.entryPoint,
                            idpCert: ssoConfig.providerConfig.cert,
                            idpIssuer: ssoConfig.providerConfig.idpIssuer,
                            issuer:
                                ssoConfig.providerConfig.issuer ||
                                'kodus-orchestrator',
                            callbackUrl: buildSamlCallbackUrl(organizationId),
                            wantAssertionsSigned: false,
                            identifierFormat:
                                ssoConfig.providerConfig.identifierFormat ||
                                null,
                            signatureAlgorithm: 'sha256',
                        });
                    } catch (error) {
                        return done(error, null);
                    }
                },
            },
            (
                req: any,
                profile: any,
                done: (err: Error | null, user?: any) => void,
            ) =>
                this.validate(req, profile).then(
                    (user) => done(null, user),
                    (err) => done(err),
                ),
        );
    }

    async validate(req: Request, profile: any) {
        const email: string = profile.email || profile.nameId || profile.nameID;

        if (
            !email ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase())
        ) {
            throw new UnauthorizedException('Invalid email in SAML assertion');
        }

        return {
            email,
            firstName: profile.firstName || '',
            lastName: profile.lastName || '',
            organizationId: req.params.organizationId,
        };
    }
}
