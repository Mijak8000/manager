jest.mock("src/core/utils/reactQuery", () => ({
    useFetch: jest.fn(),
    useSuspenseFetch: jest.fn(() => ({ total: 10 })),
}));

jest.mock("src/features/ee/subscription/_hooks/use-subscription-status", () => ({
    useSubscriptionStatus: jest.fn(),
}));

jest.mock("src/core/utils/server-side", () => ({ isServerSide: false }));

jest.mock(".", () => ({
    KODY_RULES_PATHS: {
        GET_KODY_RULES_TOTAL_QUANTITY: "/kody-rules/total",
    },
}));

import { useSubscriptionStatus } from "src/features/ee/subscription/_hooks/use-subscription-status";

import { useKodyRulesLimits } from "./hooks";

describe("useKodyRulesLimits", () => {
    afterEach(() => {
        delete (globalThis as any).__KODUS_PUBLIC_CONFIG__;
        jest.clearAllMocks();
    });

    it("keeps free accounts limited to 10 rules by default", () => {
        (useSubscriptionStatus as jest.Mock).mockReturnValue({
            valid: true,
            status: "free",
        });

        expect(useKodyRulesLimits()).toEqual({
            canAddMoreRules: false,
            total: 10,
            limit: 10,
        });
    });

    it("gives free accounts unlimited Kody Rules when enterprise access is enabled in public config", () => {
        (globalThis as any).__KODUS_PUBLIC_CONFIG__ = {
            enterpriseAccessEnabled: true,
        };
        (useSubscriptionStatus as jest.Mock).mockReturnValue({
            valid: true,
            status: "free",
        });

        expect(useKodyRulesLimits()).toEqual({
            canAddMoreRules: true,
            total: 10,
            limit: Number.POSITIVE_INFINITY,
        });
    });
});
