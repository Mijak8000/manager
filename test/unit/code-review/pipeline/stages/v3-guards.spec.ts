/**
 * Tests that V3 guards on existing stages work correctly.
 * Stages should skip when codeReviewVersion === V3_AGENT,
 * and run normally otherwise.
 */
import { CodeReviewVersion } from '@/core/domain/enums/code-review.enum';

jest.mock('@kodus/flow', () => ({
    createLogger: () => ({
        log: jest.fn(),
        error: jest.fn(),
        warn: jest.fn(),
        debug: jest.fn(),
        info: jest.fn(),
    }),
}));

jest.mock('exa-js', () => ({ default: jest.fn() }), { virtual: true });

// Minimal context factory
const makeContext = (
    version?: CodeReviewVersion,
    extras?: Record<string, any>,
) =>
    ({
        codeReviewConfig: version ? { codeReviewVersion: version } : undefined,
        changedFiles: [{ filename: 'src/index.ts' }],
        pullRequest: { number: 1 },
        organizationAndTeamData: { organizationId: 'o', teamId: 't' },
        origin: 'github',
        ...extras,
    }) as any;

describe('V3 guards on existing stages', () => {
    describe('AgentReviewStage', () => {
        it('should skip when NOT V3_AGENT', async () => {
            const mod =
                await import('@/code-review/pipeline/stages/agent-review.stage');
            const stage = Object.create(mod.AgentReviewStage.prototype);
            stage.logger = {
                log: jest.fn(),
                warn: jest.fn(),
                error: jest.fn(),
            };

            const ctx = makeContext(CodeReviewVersion.v2);
            const result = await stage.executeStage(ctx);

            expect(result).toBe(ctx);
        });

        it('should skip when no codeReviewConfig', async () => {
            const mod =
                await import('@/code-review/pipeline/stages/agent-review.stage');
            const stage = Object.create(mod.AgentReviewStage.prototype);
            stage.logger = {
                log: jest.fn(),
                warn: jest.fn(),
                error: jest.fn(),
            };

            const ctx = makeContext(undefined);
            const result = await stage.executeStage(ctx);

            expect(result).toBe(ctx);
        });
    });
});
