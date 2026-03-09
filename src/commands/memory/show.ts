import chalk from 'chalk';
import { gitService } from '../../services/git.service.js';
import { memoryService } from '../../services/memory.service.js';
import { exitWithCode } from '../../utils/cli-exit.js';
import { cliError, cliInfo } from '../../utils/logger.js';

export async function showAction(name?: string): Promise<void> {
    const isRepo = await gitService.isGitRepository();
    if (!isRepo) {
        cliError(chalk.red('Error: Not a git repository.'));
        exitWithCode(1);
    }

    const repoRoot = (await gitService.getGitRoot()).trim();

    // If no argument, try current branch PR memory
    if (!name) {
        let branch: string;
        try {
            branch = (await gitService.getCurrentBranch()).trim();
        } catch {
            cliInfo(chalk.dim('No PR memory found.'));
            cliInfo('');
            cliInfo(chalk.dim('Session data is available in the Kodus dashboard.'));
            return;
        }

        const prMemory = await memoryService.readPrMemory(repoRoot, branch);
        if (prMemory) {
            cliInfo(prMemory.content);
            return;
        }

        cliInfo(chalk.dim('No PR memory found for this branch.'));
        cliInfo('');
        cliInfo(chalk.dim('Session data is available in the Kodus dashboard.'));
        return;
    }

    // Try as module name first
    const moduleContent = await memoryService.readModuleMemory(repoRoot, name);
    if (moduleContent) {
        cliInfo(moduleContent);
        return;
    }

    // Try as branch name
    const branchMemory = await memoryService.readPrMemory(repoRoot, name);
    if (branchMemory) {
        cliInfo(branchMemory.content);
        return;
    }

    cliInfo(chalk.dim(`No module or branch memory found for: ${name}`));
    cliInfo('');
    cliInfo(chalk.dim('Session data is available in the Kodus dashboard.'));
}
