import chalk from 'chalk';
import { gitService } from '../../services/git.service.js';
import {
    removeClaudeCompatibleHooks,
    removeCodexNotify,
    removeMergeHook,
    resolveCodexConfigPath,
} from './hooks.js';
import { exitWithCode } from '../../utils/cli-exit.js';
import { cliError, cliInfo } from '../../utils/logger.js';
import type { GlobalOptions } from '../../types/index.js';
import { createCommandContext } from '../../utils/command-context.js';
import {
    buildAgentSuccessEnvelope,
    emitAgentEnvelope,
} from '../../utils/command-output.js';

export async function disableAction(
    options: { dryRun?: boolean } = {},
    globalOpts?: GlobalOptions,
): Promise<void> {
    const ctx = createCommandContext('decisions disable', {
        format: globalOpts?.format ?? 'terminal',
        output: globalOpts?.output,
        verbose: globalOpts?.verbose ?? false,
        quiet: globalOpts?.quiet ?? false,
        agent: globalOpts?.agent ?? false,
    });

    const isRepo = await gitService.isGitRepository();
    if (!isRepo) {
        cliError(chalk.red('Error: Not a git repository.'));
        exitWithCode(1);
    }

    const gitRoot = (await gitService.getGitRoot()).trim();

    if (options.dryRun) {
        const payload = {
            action: 'decisions disable',
            repositoryRoot: gitRoot,
            removeClaudeCompatibleHooks: true,
            removeCodexNotify: true,
            removePostMergeHookBlock: true,
            preserveKodyData: true,
            codexConfigPath: resolveCodexConfigPath(),
        };

        if (ctx.isAgent) {
            await emitAgentEnvelope(
                buildAgentSuccessEnvelope(ctx.command, payload, ctx.startedAt),
                ctx.outputFile,
            );
            return;
        }

        cliInfo(chalk.cyan('Dry run: no changes were made.'));
        cliInfo(JSON.stringify(payload, null, 2));
        return;
    }

    const claudeResult = await removeClaudeCompatibleHooks(gitRoot);
    const codexResult = await removeCodexNotify(resolveCodexConfigPath());
    const mergeResult = await removeMergeHook(gitRoot);

    cliInfo(chalk.green('\u2713 Decision hooks removed.'));
    cliInfo(
        `  Claude Code / Cursor hooks: ${claudeResult.removed ? 'removed' : 'not found'}`,
    );
    cliInfo(`  Codex notify: ${codexResult.removed ? 'removed' : 'not found'}`);
    cliInfo(
        `  Post-merge hook: ${mergeResult.removed ? 'removed' : 'not found'}`,
    );
    cliInfo(chalk.dim('  Memory data in .kody/ preserved.'));
}
