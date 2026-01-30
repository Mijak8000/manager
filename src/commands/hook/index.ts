import { Command } from 'commander';
import { installAction } from './install.js';
import { uninstallAction } from './uninstall.js';
import { statusAction } from './status.js';

export const hookCommand = new Command('hook')
  .description('Manage pre-commit hook for automatic code review');

hookCommand
  .command('install')
  .description('Install pre-commit hook for automatic code review')
  .option('--fail-on <severity>', 'Minimum severity to block commit (info, warning, error, critical)', 'critical')
  .option('--fast', 'Use fast mode for review (default: true)', true)
  .option('--no-fast', 'Disable fast mode for review')
  .option('--force', 'Overwrite existing hook without prompting')
  .action(installAction);

hookCommand
  .command('uninstall')
  .description('Remove pre-commit hook installed by kodus')
  .action(uninstallAction);

hookCommand
  .command('status')
  .description('Show pre-commit hook status')
  .action(statusAction);
