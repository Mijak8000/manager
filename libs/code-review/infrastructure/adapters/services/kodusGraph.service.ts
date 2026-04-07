import { createLogger } from '@kodus/flow';
import { Injectable } from '@nestjs/common';
import type { Sandbox } from 'e2b';
import type { FileChange } from '@libs/core/infrastructure/config/types/general/codeReview.type';

const REPO_DIR = '/home/user/repo';
const GRAPH_DIR = '.kodus-graph';
const GRAPH_PATH = `${GRAPH_DIR}/graph.json`;
const PROMPT_PATH = `${GRAPH_DIR}/prompt.txt`;

const TIMEOUTS = {
    INSTALL_MS: 120_000, // 2 min — download + install bun + kodus-graph
    PARSE_MS: 300_000, // 5 min — full repo parse (large repos)
    CONTEXT_MS: 60_000, // 1 min — context generation
};

const KODUS_GRAPH_VERSION = '0.2.0';

@Injectable()
export class KodusGraphService {
    private readonly logger = createLogger(KodusGraphService.name);

    /**
     * Generate call graph context using kodus-graph in the E2B sandbox.
     * Installs bun + kodus-graph, parses the full repo, then generates
     * LLM-optimized prompt context for the changed files.
     *
     * @returns The prompt text ready to inject into agent prompts, or empty string on failure.
     */
    async generateContext(
        sandboxHandle: unknown,
        changedFiles: FileChange[],
    ): Promise<string> {
        const sandbox = sandboxHandle as Sandbox;
        if (!sandbox?.commands) {
            this.logger.warn({
                message: '[KODUS-GRAPH] No sandbox handle available, skipping',
                context: KodusGraphService.name,
            });
            return '';
        }

        const filePaths = changedFiles
            .map((f) => f.headFile?.path || f.previousFile?.path)
            .filter(Boolean) as string[];

        if (filePaths.length === 0) {
            return '';
        }

        try {
            // Step 1: Install bun + kodus-graph
            await this.installKodusGraph(sandbox);

            // Step 2: Parse full repo
            await this.parseRepo(sandbox);

            // Step 3: Generate context for changed files
            const prompt = await this.generatePromptContext(
                sandbox,
                filePaths,
            );

            this.logger.log({
                message: `[KODUS-GRAPH] Context generated: ${prompt.length} chars for ${filePaths.length} changed files`,
                context: KodusGraphService.name,
                metadata: {
                    changedFiles: filePaths.length,
                    promptChars: prompt.length,
                    promptPreview: prompt.substring(0, 320),
                },
            });

            return prompt;
        } catch (error) {
            this.logger.warn({
                message: `[KODUS-GRAPH] Failed to generate context, proceeding without it`,
                context: KodusGraphService.name,
                error,
            });
            return '';
        }
    }

    private async installKodusGraph(sandbox: Sandbox): Promise<void> {
        this.logger.log({
            message: '[KODUS-GRAPH] Installing bun + kodus-graph...',
            context: KodusGraphService.name,
        });

        const result = await sandbox.commands.run(
            [
                // Install bun if not present
                'which bun > /dev/null 2>&1 || (curl -fsSL https://bun.sh/install | bash > /dev/null 2>&1)',
                'export PATH="$HOME/.bun/bin:$PATH"',
                // Install kodus-graph globally
                `bun install -g @kodus/kodus-graph@${KODUS_GRAPH_VERSION} 2>&1`,
            ].join(' && '),
            { timeoutMs: TIMEOUTS.INSTALL_MS },
        );

        if (result.exitCode !== 0) {
            throw new Error(
                `kodus-graph install failed (exit=${result.exitCode}): ${(result.stderr || result.stdout || '').slice(0, 500)}`,
            );
        }

        this.logger.log({
            message: `[KODUS-GRAPH] Installed successfully`,
            context: KodusGraphService.name,
        });
    }

    private async parseRepo(sandbox: Sandbox): Promise<void> {
        this.logger.log({
            message: '[KODUS-GRAPH] Parsing full repo...',
            context: KodusGraphService.name,
        });

        const result = await sandbox.commands.run(
            [
                'export PATH="$HOME/.bun/bin:$PATH"',
                `cd ${REPO_DIR}`,
                `mkdir -p ${GRAPH_DIR}`,
                `kodus-graph parse --all --repo-dir . --out ${GRAPH_PATH}`,
            ].join(' && '),
            { timeoutMs: TIMEOUTS.PARSE_MS },
        );

        if (result.exitCode !== 0) {
            throw new Error(
                `kodus-graph parse failed (exit=${result.exitCode}): ${(result.stderr || '').slice(0, 500)}`,
            );
        }

        // Log parse stats from stderr (kodus-graph writes progress to stderr)
        if (result.stderr) {
            this.logger.log({
                message: `[KODUS-GRAPH] Parse output: ${result.stderr.slice(0, 300)}`,
                context: KodusGraphService.name,
            });
        }
    }

    private async generatePromptContext(
        sandbox: Sandbox,
        filePaths: string[],
    ): Promise<string> {
        const filesArg = filePaths.join(' ');

        const result = await sandbox.commands.run(
            [
                'export PATH="$HOME/.bun/bin:$PATH"',
                `cd ${REPO_DIR}`,
                `kodus-graph context --files ${filesArg} --graph ${GRAPH_PATH} --repo-dir . --format prompt --out ${PROMPT_PATH}`,
            ].join(' && '),
            { timeoutMs: TIMEOUTS.CONTEXT_MS },
        );

        if (result.exitCode !== 0) {
            throw new Error(
                `kodus-graph context failed (exit=${result.exitCode}): ${(result.stderr || '').slice(0, 500)}`,
            );
        }

        // Read the prompt file
        const readResult = await sandbox.commands.run(
            `cat ${REPO_DIR}/${PROMPT_PATH}`,
            { timeoutMs: 10_000 },
        );

        return readResult.stdout || '';
    }
}
