import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { authService } from '../services/auth.service.js';
import { reviewService } from '../services/review.service.js';
import type { GlobalOptions } from '../types/index.js';

export const configCommand = new Command('config')
  .description('Show active configuration from platform')
  .action(async (_opts, cmd: Command) => {
    const globalOpts = cmd.optsWithGlobals() as GlobalOptions;
    const spinner = ora();

    try {
      const isAuthenticated = await authService.isAuthenticated();

      if (!isAuthenticated) {
        console.log(chalk.yellow('Not logged in. Using default configuration.'));
        console.log(chalk.dim('Run `kodus auth login` to access your organization settings.'));
        return;
      }

      spinner.start(chalk.blue('Fetching configuration...'));
      
      const config = await reviewService.getConfig(globalOpts.org, globalOpts.repo);
      
      spinner.stop();

      console.log(chalk.bold('\nActive Configuration\n'));
      console.log(`${chalk.dim('Organization:')} ${globalOpts.org || chalk.dim('(auto-detected)')}`);
      console.log(`${chalk.dim('Repository:')}   ${globalOpts.repo || chalk.dim('(auto-detected)')}`);
      console.log(`${chalk.dim('Language:')}     ${config.language}`);
      console.log(`${chalk.dim('Severity:')}     ${config.severity}`);
      console.log(`${chalk.dim('LLM Provider:')} ${config.llmProvider === 'byok' ? 'Your API Key (BYOK)' : 'Kodus'}`);
      
      console.log(chalk.dim('\nRules:'));
      Object.entries(config.rules).forEach(([rule, enabled]) => {
        const status = enabled ? chalk.green('✓') : chalk.dim('✗');
        console.log(`  ${status} ${rule}`);
      });

      if (config.ignore.length > 0) {
        console.log(chalk.dim('\nIgnored patterns:'));
        config.ignore.forEach((pattern) => {
          console.log(`  ${chalk.dim('•')} ${pattern}`);
        });
      }

    } catch (error) {
      spinner.fail(chalk.red('Failed to fetch configuration'));
      if (error instanceof Error) {
        console.error(chalk.red(error.message));
      }
      process.exit(1);
    }
  });

