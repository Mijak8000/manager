import {
    IDE_RULE_DIR_MARKERS,
    RULE_FILE_PATTERNS,
    extractRepoSubdirFromIdeSource,
    isIdeRuleSource,
} from '../../../libs/common/utils/kody-rules/file-patterns';

describe('IDE_RULE_DIR_MARKERS', () => {
    it('is derived from RULE_FILE_PATTERNS — every pattern with a directory part contributes a marker', () => {
        // Sanity: invariant the implementation depends on. If anyone adds
        // a pattern with a directory part to RULE_FILE_PATTERNS, the
        // marker derivation must pick it up at module load.
        for (const pattern of RULE_FILE_PATTERNS) {
            const fixedPrefix = pattern.split(/[*?[]/)[0];
            const dir = fixedPrefix.endsWith('/')
                ? fixedPrefix.slice(0, -1)
                : require('path').posix.dirname(fixedPrefix);
            if (!dir || dir === '.') continue;
            expect(IDE_RULE_DIR_MARKERS).toContain(dir);
        }
    });

    it('is sorted longest-first so deeper markers win over their parents', () => {
        // Otherwise stripping ".cursor" first would leave a stray
        // "/rules" hanging in the subdir.
        for (let i = 1; i < IDE_RULE_DIR_MARKERS.length; i += 1) {
            expect(IDE_RULE_DIR_MARKERS[i - 1].length).toBeGreaterThanOrEqual(
                IDE_RULE_DIR_MARKERS[i].length,
            );
        }
    });

    it('has no duplicates', () => {
        expect(IDE_RULE_DIR_MARKERS.length).toBe(
            new Set(IDE_RULE_DIR_MARKERS).size,
        );
    });

    it('covers every IDE/agent pattern shipped today', () => {
        // Spot-check: each marker corresponds to the directory portion of
        // a pattern's fixed prefix. Patterns whose fixed prefix has no
        // directory part (`.cursorrules`, `CLAUDE.md`, `.windsurfrules`,
        // ...) intentionally don't contribute markers — they live at the
        // repo root by definition.
        expect(IDE_RULE_DIR_MARKERS).toEqual(
            expect.arrayContaining([
                '.cursor/rules', // .cursor/rules/**/*.mdc
                '.kody/rules', // .kody/rules/**
                '.github/instructions', // .github/instructions/**/*.instructions.md
                '.github', // .github/copilot-instructions.md
                '.claude', // .claude/settings.json
                '.sourcegraph', // .sourcegraph/**/*.rule.md
                '.rules', // .rules/**/*
                'docs/coding-standards', // docs/coding-standards/**/*
            ]),
        );
    });

    it('does NOT contain bare ".cursor" or ".kody" — those have no isolated pattern', () => {
        // We only ship `.cursor/rules/**/*.mdc` and `.kody/rules/**`, not
        // bare `.cursor/...` or `.kody/...`. If somebody later adds a
        // pattern like `.cursor/foo.json`, the marker `.cursor` will
        // start appearing automatically and this guard will fail — at
        // which point the assertion just needs to be removed.
        expect(IDE_RULE_DIR_MARKERS).not.toContain('.cursor');
        expect(IDE_RULE_DIR_MARKERS).not.toContain('.kody');
    });
});

describe('extractRepoSubdirFromIdeSource', () => {
    const cases: Array<{
        name: string;
        source: string;
        expected: string | null;
    }> = [
        // Root-level IDE configs (no subdir → repo-wide rule)
        {
            name: '.cursor/rules at repo root',
            source: '.cursor/rules/foo.mdc',
            expected: null,
        },
        {
            name: '.kody/rules at repo root',
            source: '.kody/rules/security.md',
            expected: null,
        },
        {
            name: '.github/instructions at repo root',
            source: '.github/instructions/api.instructions.md',
            expected: null,
        },
        {
            name: '.cursorrules at repo root',
            source: '.cursorrules',
            expected: null,
        },
        {
            name: 'CLAUDE.md at repo root',
            source: 'CLAUDE.md',
            expected: null,
        },
        // Subdir IDE configs (must strip the IDE marker)
        {
            name: '.cursor/rules under a subdir',
            source: 'applications/foo/.cursor/rules/x.mdc',
            expected: 'applications/foo',
        },
        {
            name: '.kody/rules under a subdir',
            source: 'apps/api/.kody/rules/security.md',
            expected: 'apps/api',
        },
        {
            name: '.cursorrules under a subdir',
            source: 'applications/bar/.cursorrules',
            expected: 'applications/bar',
        },
        {
            name: 'CLAUDE.md under a subdir',
            source: 'applications/baz/CLAUDE.md',
            expected: 'applications/baz',
        },
        {
            name: 'docs/coding-standards under a deep subdir',
            source: 'monorepo/web/docs/coding-standards/typescript.md',
            expected: 'monorepo/web',
        },
        // Edge cases
        {
            name: 'empty string',
            source: '',
            expected: null,
        },
    ];

    for (const c of cases) {
        it(c.name, () => {
            expect(extractRepoSubdirFromIdeSource(c.source)).toBe(c.expected);
        });
    }
});

describe('isIdeRuleSource — sanity check', () => {
    it('returns true for known patterns at root and under subdirs', () => {
        expect(isIdeRuleSource('.cursorrules')).toBe(true);
        expect(isIdeRuleSource('apps/web/.cursorrules')).toBe(true);
        expect(isIdeRuleSource('.cursor/rules/foo.mdc')).toBe(true);
        expect(isIdeRuleSource('CLAUDE.md')).toBe(true);
    });

    it('returns false for unrelated source files', () => {
        expect(isIdeRuleSource('package.json')).toBe(false);
        expect(isIdeRuleSource('apps/web/tsconfig.json')).toBe(false);
        expect(isIdeRuleSource(null)).toBe(false);
        expect(isIdeRuleSource(undefined)).toBe(false);
        expect(isIdeRuleSource('')).toBe(false);
    });
});
