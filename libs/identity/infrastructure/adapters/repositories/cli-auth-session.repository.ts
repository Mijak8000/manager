import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';

import { ICliAuthSessionRepository } from '@libs/identity/domain/cli-auth/contracts/cli-auth-session.repository';
import {
    CompleteCliAuthSession,
    CreateCliAuthSession,
    ICliAuthSession,
} from '@libs/identity/domain/cli-auth/interfaces/cli-auth-session.interface';

import { CliAuthSessionModel } from './schemas/cli-auth-session.model';

@Injectable()
export class CliAuthSessionRepository implements ICliAuthSessionRepository {
    constructor(
        @InjectRepository(CliAuthSessionModel)
        private readonly repo: Repository<CliAuthSessionModel>,
    ) {}

    private toInterface(model: CliAuthSessionModel): ICliAuthSession {
        return {
            uuid: model.uuid,
            state: model.state,
            deviceCode: model.deviceCode ?? null,
            userCode: model.userCode ?? null,
            redirectUri: model.redirectUri ?? null,
            mode: model.mode,
            status: model.status,
            accessToken: model.accessToken ?? null,
            refreshToken: model.refreshToken ?? null,
            userId: model.user?.uuid ?? null,
            userEmail: model.userEmail ?? null,
            userAgent: model.userAgent ?? null,
            expiresAt: model.expiresAt,
            consumedAt: model.consumedAt ?? null,
            completedAt: model.completedAt ?? null,
            createdAt: model.createdAt,
            updatedAt: model.updatedAt,
        };
    }

    async create(input: CreateCliAuthSession): Promise<ICliAuthSession> {
        const model = this.repo.create({
            state: input.state,
            mode: input.mode,
            expiresAt: input.expiresAt,
            redirectUri: input.redirectUri ?? null,
            deviceCode: input.deviceCode ?? null,
            userCode: input.userCode ?? null,
            userAgent: input.userAgent ?? null,
            status: 'pending',
        });
        const saved = await this.repo.save(model);
        return this.toInterface(saved);
    }

    async findByState(state: string): Promise<ICliAuthSession | null> {
        const model = await this.repo.findOne({
            where: { state },
            relations: ['user'],
        });
        return model ? this.toInterface(model) : null;
    }

    async findByDeviceCode(
        deviceCode: string,
    ): Promise<ICliAuthSession | null> {
        const model = await this.repo.findOne({
            where: { deviceCode },
            relations: ['user'],
        });
        return model ? this.toInterface(model) : null;
    }

    async findByUserCode(userCode: string): Promise<ICliAuthSession | null> {
        const model = await this.repo.findOne({
            where: { userCode, status: 'pending' },
            relations: ['user'],
        });
        return model ? this.toInterface(model) : null;
    }

    async complete(
        uuid: string,
        data: CompleteCliAuthSession,
    ): Promise<ICliAuthSession | null> {
        await this.repo.update(
            { uuid },
            {
                accessToken: data.accessToken ?? null,
                refreshToken: data.refreshToken ?? null,
                userEmail: data.userEmail ?? null,
                user: data.userId ? ({ uuid: data.userId } as any) : null,
                status: 'completed',
                completedAt: new Date(),
            },
        );

        const updated = await this.repo.findOne({
            where: { uuid },
            relations: ['user'],
        });
        return updated ? this.toInterface(updated) : null;
    }

    async markConsumed(uuid: string): Promise<void> {
        await this.repo.update(
            { uuid },
            { status: 'consumed', consumedAt: new Date() },
        );
    }

    async markDenied(uuid: string): Promise<void> {
        await this.repo.update({ uuid }, { status: 'denied' });
    }

    async expirePending(now: Date): Promise<number> {
        const result = await this.repo.update(
            { status: 'pending', expiresAt: LessThan(now) },
            { status: 'expired' },
        );
        return result.affected ?? 0;
    }
}
