import { describe, expect, it } from 'vitest';
import { createReviewCommand } from '../command.js';

describe('createReviewCommand', () => {
    it('creates the review command with the expected interactive options', () => {
        const command = createReviewCommand();

        expect(command.name()).toBe('review');

        const optionFlags = command.options.map((option) => option.flags);
        expect(optionFlags).toEqual(
            expect.arrayContaining([
                '-s, --staged',
                '-c, --commit <sha>',
                '-b, --branch <name>',
                '-i, --interactive',
                '--fix',
                '--prompt-only',
                '--fail-on <severity>',
                '--context <file>',
                '--fields <csv>',
            ]),
        );
    });
});
