import * as fs from 'fs';
import * as yaml from 'js-yaml';

import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { CreateOrUpdateCodeReviewParameterDto } from '@libs/organization/dtos/create-or-update-code-review-parameter.dto';

describe('crossFileDependenciesAnalysis config contract', () => {
    it('keeps default config, JSON schema, and strict API DTO aligned', async () => {
        const defaultConfig = yaml.load(
            fs.readFileSync('default-kodus-config.yml', 'utf8'),
        ) as Record<string, unknown>;
        const schema = JSON.parse(
            fs.readFileSync('libs/common/schemas/codereview.json', 'utf8'),
        );

        expect(defaultConfig.crossFileDependenciesAnalysis).toBe(true);
        expect(schema.properties.crossFileDependenciesAnalysis).toEqual(
            expect.objectContaining({ type: 'boolean', default: true }),
        );

        const dto = plainToInstance(CreateOrUpdateCodeReviewParameterDto, {
            organizationAndTeamData: { teamId: 'team-1' },
            configValue: { crossFileDependenciesAnalysis: true },
        });

        await expect(
            validate(dto, { whitelist: true, forbidNonWhitelisted: true }),
        ).resolves.toEqual([]);
    });
});
