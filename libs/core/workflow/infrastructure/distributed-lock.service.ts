import { createLogger } from '@kodus/flow';
import { createHash } from 'crypto';
import { Injectable } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';

export interface DistributedLockOptions {
    ttl?: number;
}

interface AdvisoryLockId {
    classId: number;
    objectId: number;
}

export class DistributedLock {
    private released = false;

    constructor(
        private readonly queryRunner: QueryRunner,
        private readonly lockId: AdvisoryLockId,
        private readonly ttl?: number,
        private readonly logger = createLogger(DistributedLock.name),
    ) {
        if (ttl) {
            setTimeout(() => {
                if (!this.released) {
                    this.release().catch((error) => {
                        this.logger.error({
                            message: 'Error auto-releasing lock',
                            context: DistributedLock.name,
                            error,
                            metadata: { lockId },
                        });
                    });
                }
            }, ttl);
        }
    }

    async release(): Promise<void> {
        if (this.released) {
            return;
        }

        try {
            await this.queryRunner.query(
                `SELECT pg_advisory_unlock($1, $2) as released`,
                [this.lockId.classId, this.lockId.objectId],
            );
            this.released = true;
            this.logger.debug({
                message: 'Distributed lock released',
                context: DistributedLock.name,
                metadata: { lockId: this.lockId },
            });
        } catch (error) {
            this.logger.error({
                message: 'Error releasing distributed lock',
                context: DistributedLock.name,
                error: error instanceof Error ? error : undefined,
                metadata: { lockId: this.lockId },
            });
            throw error;
        } finally {
            try {
                if (!this.queryRunner.isReleased) {
                    await this.queryRunner.release();
                }
            } catch (releaseError) {
                this.logger.error({
                    message:
                        'Error releasing query runner after distributed lock release',
                    context: DistributedLock.name,
                    error:
                        releaseError instanceof Error
                            ? releaseError
                            : undefined,
                    metadata: { lockId: this.lockId },
                });
            }
        }
    }

    isReleased(): boolean {
        return this.released;
    }
}

@Injectable()
export class DistributedLockService {
    private readonly logger = createLogger(DistributedLockService.name);

    constructor(private readonly dataSource: DataSource) {}

    async acquire(
        key: string,
        options: DistributedLockOptions = {},
    ): Promise<DistributedLock | null> {
        const lockId = this.hashKey(key);
        const queryRunner = this.dataSource.createQueryRunner();

        try {
            await queryRunner.connect();

            const result = await queryRunner.query(
                `SELECT pg_try_advisory_lock($1, $2) as acquired`,
                [lockId.classId, lockId.objectId],
            );

            if (!result[0]?.acquired) {
                await queryRunner.release();
                this.logger.debug({
                    message:
                        'Could not acquire distributed lock (already in use)',
                    context: DistributedLockService.name,
                    metadata: { key, lockId },
                });
                return null;
            }

            this.logger.debug({
                message: 'Distributed lock acquired',
                context: DistributedLockService.name,
                metadata: { key, lockId, ttl: options.ttl },
            });

            return new DistributedLock(
                queryRunner,
                lockId,
                options.ttl,
                this.logger,
            );
        } catch (error) {
            try {
                if (!queryRunner.isReleased) {
                    await queryRunner.release();
                }
            } catch {
                // Ignore release failures on acquisition error path
            }
            this.logger.error({
                message: 'Error acquiring distributed lock',
                context: DistributedLockService.name,
                error: error instanceof Error ? error : undefined,
                metadata: { key, lockId },
            });
            throw error;
        }
    }

    /**
     * Hash string key to a two-part advisory lock ID (classId, objectId).
     * Uses SHA-256 to avoid the collisions present in djb2 32-bit hashing.
     * The 256-bit digest is split into two signed int4 values matching
     * PostgreSQL's pg_try_advisory_lock(int4, int4) signature.
     */
    private hashKey(key: string): AdvisoryLockId {
        const digest = createHash('sha256').update(key).digest();

        const classId = digest.readInt32BE(0);
        const objectId = digest.readInt32BE(4);

        return { classId, objectId };
    }

    async isLocked(key: string): Promise<boolean> {
        const lockId = this.hashKey(key);
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.connect();

            const result = await queryRunner.query(
                `SELECT pg_try_advisory_lock($1, $2) as acquired`,
                [lockId.classId, lockId.objectId],
            );

            if (result[0]?.acquired) {
                await queryRunner.query(`SELECT pg_advisory_unlock($1, $2)`, [
                    lockId.classId,
                    lockId.objectId,
                ]);
                return false;
            }

            return true;
        } catch (error) {
            this.logger.error({
                message: 'Error checking lock status',
                context: DistributedLockService.name,
                error: error instanceof Error ? error : undefined,
                metadata: { key, lockId },
            });
            return true;
        } finally {
            try {
                if (!queryRunner.isReleased) {
                    await queryRunner.release();
                }
            } catch {
                // Ignore release failures on lock probe path
            }
        }
    }
}
