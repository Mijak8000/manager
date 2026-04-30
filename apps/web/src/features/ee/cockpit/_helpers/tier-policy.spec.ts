import { isCockpitTierAllowed } from "./tier-policy";

describe("isCockpitTierAllowed", () => {
    it("allows enterprise self-hosted licenses", () => {
        expect(
            isCockpitTierAllowed({
                valid: true,
                subscriptionStatus: "licensed-self-hosted",
                planType: "enterprise",
                numberOfLicenses: 1000,
            }),
        ).toBe(true);
    });

    it("blocks unlicensed self-hosted instances", () => {
        expect(
            isCockpitTierAllowed({
                valid: true,
                subscriptionStatus: "self-hosted",
            }),
        ).toBe(false);
    });
});
