jest.mock("@services/fetch", () => ({
    authorizedFetch: jest.fn(),
}));

jest.mock("@services/organizations/fetch", () => ({
    getOrganizationId: jest.fn(),
}));

jest.mock("src/core/utils/helpers", () => ({
    pathToApiUrl: (path: string) => `/api${path}`,
}));

describe("validateOrganizationLicense", () => {
    const env = { ...process.env };

    afterEach(() => {
        process.env = { ...env };
        jest.resetModules();
        jest.clearAllMocks();
    });

    it("treats self-hosted enterprise access env as a licensed self-hosted instance", async () => {
        process.env.WEB_NODE_ENV = "self-hosted";
        process.env.KODUS_ENTERPRISE_ACCESS = "true";
        process.env.KODUS_ENTERPRISE_ACCESS_PLAN = "enterprise";
        process.env.KODUS_ENTERPRISE_ACCESS_SEATS = "1234";

        const { authorizedFetch } = await import("@services/fetch");
        const { validateOrganizationLicense } = await import("./fetch");

        await expect(
            validateOrganizationLicense({ teamId: "team-1" }),
        ).resolves.toEqual({
            valid: true,
            subscriptionStatus: "licensed-self-hosted",
            planType: "enterprise",
            numberOfLicenses: 1234,
        });
        expect(authorizedFetch).not.toHaveBeenCalled();
    });
});
