describe("cockpit availability", () => {
    it("does not require the legacy analytics secret in self-hosted deployments", async () => {
        const { shouldBlockCockpitForMissingAnalyticsSecret } = await import(
            "./availability"
        );

        expect(
            shouldBlockCockpitForMissingAnalyticsSecret({
                isSelfHostedDeployment: true,
                analyticsSecret: undefined,
            }),
        ).toBe(false);
    });

    it("requires the legacy analytics secret outside self-hosted deployments", async () => {
        const { shouldBlockCockpitForMissingAnalyticsSecret } = await import(
            "./availability"
        );

        expect(
            shouldBlockCockpitForMissingAnalyticsSecret({
                isSelfHostedDeployment: false,
                analyticsSecret: undefined,
            }),
        ).toBe(true);
    });
});
