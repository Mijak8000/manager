import { SubscriptionStatus } from '@libs/ee/license/interfaces/license.interface';

import { isCockpitTierAllowed } from './tier-policy';

describe('isCockpitTierAllowed', () => {
    it('allows enterprise self-hosted licenses', () => {
        expect(
            isCockpitTierAllowed({
                valid: true,
                subscriptionStatus: SubscriptionStatus.LICENSED_SELF_HOSTED,
                planType: 'enterprise',
                numberOfLicenses: 1000,
            }),
        ).toBe(true);
    });

    it('blocks unlicensed self-hosted instances', () => {
        expect(
            isCockpitTierAllowed({
                valid: true,
                subscriptionStatus: SubscriptionStatus.SELF_HOSTED,
            }),
        ).toBe(false);
    });
});
