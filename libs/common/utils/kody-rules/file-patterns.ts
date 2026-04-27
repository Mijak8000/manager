import { isFileMatchingGlob } from '@libs/common/utils/glob-utils';

export const RULE_FILE_PATTERNS = [
    // Cursor
    '.cursorrules',
    '.cursor/rules/**/*.mdc',

    // GitHub Copilot
    '.github/copilot-instructions.md',
    '.github/instructions/**/*.instructions.md',

    // Agentic
    '.agents.md',
    '.agent.md',

    // Claude
    'CLAUDE.md',
    '.claude/settings.json',

    // Windsurf
    '.windsurfrules',

    // Sourcegraph Cody
    '.sourcegraph/**/*.rule.md',

    // OpenCode
    '.opencode.json',

    // Aider
    '.aider.conf.yml',
    '.aiderignore',

    // Generic / internal
    '.rules/**/*',
    '.kody/rules/**',
    'docs/coding-standards/**/*',
] as const;

export type RuleFilePattern = (typeof RULE_FILE_PATTERNS)[number];

/**
 * Whether `sourcePath` came from an IDE rule file recognised by the auto-sync
 * importer (i.e. it matches one of `RULE_FILE_PATTERNS`, anywhere in the repo).
 *
 * Reason: rules persisted by ingestion all carry a `sourcePath`, but only a
 * subset of those came from the IDE-rule auto-sync flow. Other flows
 * (Onboard, etc.) also set `sourcePath`. Code paths that should only act on
 * IDE-synced rules — e.g. the toggle-off purge in `KodyRulesSyncService` —
 * must use this check, not just `sourcePath != null`, to avoid sweeping up
 * unrelated origins.
 *
 * Patterns are matched at the repo root AND under any subdirectory (e.g. a
 * sourcePath of `applications/sales/.cursorrules` matches the `.cursorrules`
 * pattern via the `**\/` prefix variant), so per-subdir IDE rule imports are
 * recognised the same way as repo-root ones.
 */
export function isIdeRuleSource(
    sourcePath: string | null | undefined,
): boolean {
    if (!sourcePath) return false;
    const patterns: string[] = [
        ...RULE_FILE_PATTERNS,
        ...RULE_FILE_PATTERNS.map((p) => `**/${p}`),
    ];
    return isFileMatchingGlob(sourcePath, patterns);
}
