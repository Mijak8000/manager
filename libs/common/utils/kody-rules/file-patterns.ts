import * as path from 'path';

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

/**
 * Directory segments that act as IDE rule containers, derived from
 * `RULE_FILE_PATTERNS`. Used by code that needs to "strip the IDE part"
 * from a source file path to recover the real repository subdirectory
 * the rule belongs to (see `extractRepoSubdirFromIdeSource`).
 *
 * Derivation: for each pattern, take the longest fixed prefix (the part
 * before any glob wildcard) and grab its directory portion. Root-only
 * patterns like `.cursorrules` or `CLAUDE.md` contribute no marker
 * because they live at the repo root by definition.
 *
 * Sorted longest-first so deeper markers (e.g. `.cursor/rules`) win over
 * their parents (`.cursor`) when both would match the same source path.
 *
 * Single source of truth — adding a new entry to `RULE_FILE_PATTERNS`
 * automatically extends the marker list at module load.
 */
export const IDE_RULE_DIR_MARKERS: ReadonlyArray<string> = (() => {
    const markers = new Set<string>();
    for (const pattern of RULE_FILE_PATTERNS) {
        // Cut the pattern at the first wildcard character to get the
        // longest fixed prefix the matcher requires.
        const fixedPrefix = pattern.split(/[*?[]/)[0];
        // Directory portion of the fixed prefix. If the prefix already
        // ends with "/", strip it; otherwise drop the basename.
        const dir = fixedPrefix.endsWith('/')
            ? fixedPrefix.slice(0, -1)
            : path.posix.dirname(fixedPrefix);
        if (dir && dir !== '.') {
            markers.add(dir);
        }
    }
    return [...markers].sort((a, b) => b.length - a.length);
})();

/**
 * Repository subdirectory a rule was authored for, given the path to the
 * IDE rule source file that produced it. Returns null when the rule
 * lives at the repo root, so callers can keep the rule repo-wide.
 *
 * Strategy: drop any trailing IDE-rule directory marker (see
 * `IDE_RULE_DIR_MARKERS`) from the source's dirname. What remains is
 * the real repo subdir.
 *
 * Examples (with patterns shipped today):
 *   ".cursor/rules/foo.mdc"                 → null
 *   "applications/foo/.cursor/rules/x.mdc"  → "applications/foo"
 *   ".cursorrules"                          → null
 *   "applications/bar/.cursorrules"         → "applications/bar"
 *   "CLAUDE.md"                             → null
 *   "applications/baz/CLAUDE.md"            → "applications/baz"
 */
export function extractRepoSubdirFromIdeSource(
    sourceFilePath: string | null | undefined,
): string | null {
    if (!sourceFilePath) return null;
    const dir = path.posix.dirname(sourceFilePath);
    if (!dir || dir === '.') return null;

    for (const marker of IDE_RULE_DIR_MARKERS) {
        if (dir === marker) return null;
        if (dir.endsWith('/' + marker)) {
            const stripped = dir.slice(0, dir.length - marker.length - 1);
            return stripped || null;
        }
    }

    // Source file uses a root-only pattern (e.g. `.cursorrules`,
    // `CLAUDE.md`) but is placed inside a subdirectory. The subdir IS
    // the dirname.
    return dir;
}
