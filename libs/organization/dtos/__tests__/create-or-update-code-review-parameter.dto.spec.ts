import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { CreateOrUpdateCodeReviewParameterDto } from '../create-or-update-code-review-parameter.dto';

describe('CreateOrUpdateCodeReviewParameterDto', () => {
    it('accepts cross-file dependencies analysis in code review config', async () => {
        const dto = plainToInstance(CreateOrUpdateCodeReviewParameterDto, {
            organizationAndTeamData: {
                teamId: 'team-1',
            },
            configValue: {
                crossFileDependenciesAnalysis: true,
            },
        });

        const errors = await validate(dto, {
            whitelist: true,
            forbidNonWhitelisted: true,
        });

        expect(errors).toEqual([]);
    });
});
