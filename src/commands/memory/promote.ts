import chalk from 'chalk';
import { gitService } from '../../services/git.service.js';
import { memoryService } from '../../services/memory.service.js';
import { exitWithCode } from '../../utils/cli-exit.js';
import { cliError, cliInfo } from '../../utils/logger.js';
import type { GlobalOptions } from '../../types/index.js';
import { createCommandContext } from '../../utils/command-context.js';
import {
    buildAgentSuccessEnvelope,
    emitAgentEnvelope,
} from '../../utils/command-output.js';

interface PromoteOptions {
    branch?: string;
    modules?: string;
    dryRun?: boolean;
}

export async function promoteAction(
    options: PromoteOptions,
    globalOpts?: GlobalOptions,
): Promise<void> {
    const ctx = createCommandContext('decisions promote', {
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

    const repoRoot = (await gitService.getGitRoot()).trim();

    let branch = options.branch;
    if (!branch) {
        try {
            branch = (await gitService.getCurrentBranch()).trim();
        } catch {
            cliError(
                chalk.red(
                    'Error: Could not determine current branch. Use --branch to specify.',
                ),
            );
            exitWithCode(1);
        }
    }

    const moduleIds = options.modules
        ? options.modules
              .split(',')
              .map((m) => m.trim())
              .filter(Boolean)
        : undefined;

    if (options.dryRun) {
        const payload = {
            action: 'decisions promote',
            repositoryRoot: repoRoot,
            branch,
            modules: moduleIds ?? 'all matched modules',
            willWriteModuleMemoryFiles: true,
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

    const result = await memoryService.promoteToModuleMemory(
        repoRoot,
        branch,
        moduleIds,
    );

    if (result.promoted === 0) {
        cliInfo(chalk.dim('No decisions to promote.'));
        if (result.modules.length === 0) {
            cliInfo(
                chalk.dim(
                    'Check that modules.yml exists and PR memory has decisions with matching files.',
                ),
            );
        }
        return;
    }

    cliInfo(
        chalk.green(
            `✓ Promoted ${result.promoted} decision(s) to ${result.modules.length} module(s):`,
        ),
    );
    for (const modId of result.modules) {
        cliInfo(chalk.dim(`  - .kody/memory/${modId}.md`));
    }
}
