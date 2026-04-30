describe("isEnterpriseAccessEnabled", () => {
    const ENV_ORIG = process.env.KODUS_ENTERPRISE_ACCESS;

    afterEach(() => {
        jest.resetModules();
        if (ENV_ORIG === undefined) {
            delete process.env.KODUS_ENTERPRISE_ACCESS;
        } else {
            process.env.KODUS_ENTERPRISE_ACCESS = ENV_ORIG;
        }
        delete (globalThis as any).__KODUS_PUBLIC_CONFIG__;
    });

    it("is disabled by default", () => {
        delete process.env.KODUS_ENTERPRISE_ACCESS;

        const { isEnterpriseAccessEnabled } = require("./enterprise-access");

        expect(isEnterpriseAccessEnabled()).toBe(false);
    });

    it("is enabled on the server when KODUS_ENTERPRISE_ACCESS=true", () => {
        process.env.KODUS_ENTERPRISE_ACCESS = "true";

        const { isEnterpriseAccessEnabled } = require("./enterprise-access");

        expect(isEnterpriseAccessEnabled()).toBe(true);
    });

    it("is enabled on the client from public runtime config", () => {
        jest.doMock("./server-side", () => ({ isServerSide: false }));
        (globalThis as any).__KODUS_PUBLIC_CONFIG__ = {
            enterpriseAccessEnabled: true,
        };

        const { isEnterpriseAccessEnabled } = require("./enterprise-access");

        expect(isEnterpriseAccessEnabled()).toBe(true);
    });
});
