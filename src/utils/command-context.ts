import type { GlobalOptions, OutputFormat } from '../types/index.js';
import type { CommandMode } from '../types/command-output.js';

export interface CommandContext {
    command: string;
    mode: CommandMode;
    isAgent: boolean;
    outputFormat: OutputFormat;
    startedAt: number;
    outputFile?: string;
}

export function createCommandContext(
    command: string,
    globalOpts: GlobalOptions,
): CommandContext {
    const isAgent = !!globalOpts.agent;

    return {
        command,
        mode: isAgent ? 'agent' : 'human',
        isAgent,
        outputFormat: isAgent ? 'json' : globalOpts.format,
        startedAt: Date.now(),
        outputFile: globalOpts.output,
    };
}
