import { randomBytes } from 'crypto';
import { Inject, Injectable } from '@nestjs/common';

import { IUseCase } from '@libs/core/domain/interfaces/use-case.interface';
import {
    CLI_AUTH_SESSION_REPOSITORY_TOKEN,
    ICliAuthSessionRepository,
} from '@libs/identity/domain/cli-auth/contracts/cli-auth-session.repository';

const DEVICE_TTL_SECONDS = 10 * 60;
const POLL_INTERVAL_SECONDS = 5;
// Excludes 0/O/1/I to make the code easy to read aloud.
const USER_CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export interface InitiateCliDeviceLoginInput {
    userAgent?: string;
}

export interface InitiateCliDeviceLoginResult {
    deviceCode: string;
    userCode: string;
    verificationUri: string;
    verificationUriComplete: string;
    expiresIn: number;
    interval: number;
}

@Injectable()
export class InitiateCliDeviceLoginUseCase
    implements
        IUseCase<InitiateCliDeviceLoginInput, InitiateCliDeviceLoginResult>
{
    constructor(
        @Inject(CLI_AUTH_SESSION_REPOSITORY_TOKEN)
        private readonly sessionRepository: ICliAuthSessionRepository,
    ) {}

    async execute(
        input: InitiateCliDeviceLoginInput,
    ): Promise<InitiateCliDeviceLoginResult> {
        const state = randomBytes(32).toString('hex');
        const deviceCode = randomBytes(32).toString('hex');
        const userCode = this.generateUserCode();
        const expiresAt = new Date(Date.now() + DEVICE_TTL_SECONDS * 1000);

        await this.sessionRepository.create({
            state,
            mode: 'device',
            deviceCode,
            userCode,
            expiresAt,
            userAgent: input.userAgent,
        });

        const frontendUrl =
            process.env.API_FRONTEND_URL?.replace(/\/$/, '') ||
            'https://app.kodus.io';
        const verificationUri = `${frontendUrl}/cli/authorize`;
        const verificationUriComplete = `${verificationUri}?code=${encodeURIComponent(
            userCode,
        )}`;

        return {
            deviceCode,
            userCode,
            verificationUri,
            verificationUriComplete,
            expiresIn: DEVICE_TTL_SECONDS,
            interval: POLL_INTERVAL_SECONDS,
        };
    }

    private generateUserCode(): string {
        const bytes = randomBytes(8);
        let code = '';
        for (let i = 0; i < 8; i++) {
            code += USER_CODE_ALPHABET[bytes[i] % USER_CODE_ALPHABET.length];
        }
        return `${code.slice(0, 4)}-${code.slice(4)}`;
    }
}
