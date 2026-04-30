import { CollectCrossFileContextStage } from './collect-cross-file-context.stage';
import { CodeReviewPipelineContext } from '../context/code-review-pipeline.context';

describe('CollectCrossFileContextStage', () => {
    const makeDeps = () => {
        const collectCrossFileContextsService = {
            collectContexts: jest.fn().mockResolvedValue({
                contexts: [],
                plannerQueries: [],
                totalSearches: 0,
                totalSnippetsBeforeDedup: 0,
            }),
        };

        const sandbox = {
            type: 'local',
            baseBranch: 'main',
            remoteCommands: {},
            cleanup: jest.fn().mockResolvedValue(undefined),
        };

        const sandboxProvider = {
            isAvailable: jest.fn().mockReturnValue(true),
            createSandboxWithRepo: jest.fn().mockResolvedValue(sandbox),
        };

        const cloneParamsResolver = {
            resolve: jest.fn().mockResolvedValue({
                url: 'https://github.com/acme/repo.git',
                authToken: 'token',
                authUsername: 'x-access-token',
                branch: 'feature/test',
                baseBranch: 'main',
                prNumber: 123,
                platform: 'github',
            }),
        };

        const graphContext = {
            parseAndGetGraphJson: jest.fn().mockResolvedValue({
                nodes: [],
                edges: [],
            }),
        };

        const stage = new CollectCrossFileContextStage(
            collectCrossFileContextsService as any,
            sandboxProvider as any,
            cloneParamsResolver as any,
            graphContext as any,
        );

        return {
            stage,
            collectCrossFileContextsService,
            sandboxProvider,
            cloneParamsResolver,
            graphContext,
        };
    };

    const makeContext = (
        config: Partial<CodeReviewPipelineContext['codeReviewConfig']> = {},
    ): CodeReviewPipelineContext =>
        ({
            origin: 'opened',
            organizationAndTeamData: {
                organizationId: 'org-1',
                teamId: 'team-1',
            },
            repository: {
                id: 'repo-1',
                name: 'repo-1',
            },
            pullRequest: {
                number: 123,
            },
            changedFiles: [
                {
                    filename: 'src/foo.ts',
                    patch: '@@ -1 +1 @@',
                    patchWithLinesStr: '1 +export const foo = 1;',
                },
            ],
            codeReviewConfig: {
                reviewMode: 'normal',
                languageResultPrompt: 'en-US',
                ...config,
            },
            errors: [],
            pipelineMetadata: {},
        }) as unknown as CodeReviewPipelineContext;

    it('skips sandbox creation and collection when cross-file dependency analysis is disabled', async () => {
        const {
            stage,
            collectCrossFileContextsService,
            sandboxProvider,
            cloneParamsResolver,
            graphContext,
        } = makeDeps();
        const context = makeContext({ crossFileDependenciesAnalysis: false });

        const result = await stage.execute(context);

        expect(result).toBe(context);
        expect(sandboxProvider.isAvailable).not.toHaveBeenCalled();
        expect(cloneParamsResolver.resolve).not.toHaveBeenCalled();
        expect(sandboxProvider.createSandboxWithRepo).not.toHaveBeenCalled();
        expect(
            collectCrossFileContextsService.collectContexts,
        ).not.toHaveBeenCalled();
        expect(graphContext.parseAndGetGraphJson).not.toHaveBeenCalled();
    });

    it('preserves existing collection behavior when cross-file dependency analysis is enabled', async () => {
        const {
            stage,
            collectCrossFileContextsService,
            sandboxProvider,
            cloneParamsResolver,
        } = makeDeps();
        const context = makeContext({ crossFileDependenciesAnalysis: true });

        const result = await stage.execute(context);

        expect(sandboxProvider.isAvailable).toHaveBeenCalledTimes(1);
        expect(cloneParamsResolver.resolve).toHaveBeenCalledTimes(1);
        expect(sandboxProvider.createSandboxWithRepo).toHaveBeenCalledTimes(1);
        expect(
            collectCrossFileContextsService.collectContexts,
        ).toHaveBeenCalledTimes(1);
        expect(result.crossFileContexts).toEqual(
            expect.objectContaining({ contexts: [], totalSearches: 0 }),
        );
    });

    it('preserves default-on collection behavior when cross-file dependency analysis is omitted', async () => {
        const {
            stage,
            collectCrossFileContextsService,
            sandboxProvider,
            cloneParamsResolver,
        } = makeDeps();
        const context = makeContext();

        const result = await stage.execute(context);

        expect(sandboxProvider.isAvailable).toHaveBeenCalledTimes(1);
        expect(cloneParamsResolver.resolve).toHaveBeenCalledTimes(1);
        expect(sandboxProvider.createSandboxWithRepo).toHaveBeenCalledTimes(1);
        expect(
            collectCrossFileContextsService.collectContexts,
        ).toHaveBeenCalledTimes(1);
        expect(result.crossFileContexts).toEqual(
            expect.objectContaining({ contexts: [], totalSearches: 0 }),
        );
    });
});
