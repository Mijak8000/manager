import * as fs from 'node:fs';

import * as yaml from 'js-yaml';

import validateKodusConfigFile from './validateCodeReviewConfigFile';

describe('validateKodusConfigFile', () => {
    it('accepts the repository default Kodus config as current and valid', () => {
        const defaultConfig = yaml.load(
            fs.readFileSync('default-kodus-config.yml', 'utf8'),
        );

        expect(validateKodusConfigFile(defaultConfig)).toEqual(
            expect.objectContaining({
                isValidConfigFile: true,
                isDeprecated: false,
                validationErrors: [],
            }),
        );
    });
});
