import { Command } from 'commander';
import { enableAction } from './enable.js';
import { disableAction } from './disable.js';
import { captureAction } from './capture.js';
import { statusAction } from './status.js';
import { showAction } from './show.js';
import { promoteAction } from './promote.js';

export const memoryCommand = new Command('memory')
  .description('Capture and persist decision memory from AI coding sessions');

memoryCommand
  .command('enable')
  .description('Install all hooks and initialize module config for memory capture')
  .option('--agents <agents>', 'Comma-separated list: claude,cursor,codex', 'claude,cursor,codex')
  .option('--codex-config <path>', 'Path to Codex config.toml (default: ~/.codex/config.toml)')
  .option('--force', 'Overwrite existing modules.yml')
  .action(enableAction);

memoryCommand
  .command('disable')
  .description('Remove all memory hooks (preserves .kody/ data)')
  .action(disableAction);

memoryCommand
  .command('capture')
  .description('Internal hook command to persist memory capture')
  .argument('[payload]', 'Optional payload JSON (used by Codex notify)')
  .requiredOption('--agent <agent>', 'Agent name: claude-compatible, claude-code, cursor, codex')
  .requiredOption('--event <event>', 'Hook event name')
  .option('--summary <text>', 'Optional summary text')
  .action(captureAction);

memoryCommand
  .command('status')
  .description('Show current branch memory status')
  .action(statusAction);

memoryCommand
  .command('show')
  .description('Show PR memory (current branch) or module memory')
  .argument('[name]', 'Module name or branch name')
  .action(showAction);

memoryCommand
  .command('promote')
  .description('Promote PR decisions to module memory files')
  .option('--branch <name>', 'Branch name (default: current branch)')
  .option('--modules <ids>', 'Comma-separated module IDs (default: all matched)')
  .action(promoteAction);
