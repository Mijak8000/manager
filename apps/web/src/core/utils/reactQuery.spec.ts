jest.mock("@tanstack/react-query", () => ({
    useMutation: jest.fn(),
    useQuery: jest.fn(),
    useQueryClient: jest.fn(),
    useSuspenseQuery: jest.fn((options) => ({ options })),
}));

jest.mock("../providers/auth.provider", () => ({
    useAuth: () => ({ accessToken: "test-token" }),
}));

jest.mock("./axios", () => ({
    axiosAuthorized: {
        fetcher: jest.fn(),
        post: jest.fn(),
        patch: jest.fn(),
        deleted: jest.fn(),
    },
}));

import { useSuspenseQuery } from "@tanstack/react-query";

import { useSuspenseFetch } from "./reactQuery";

describe("useSuspenseFetch", () => {
    const originalFetch = global.fetch;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        global.fetch = originalFetch;
    });

    function getQueryFn() {
        useSuspenseFetch("/api/proxy/api/parameters/find-by-key", undefined, {
            fallbackData: "fallback" as unknown as string,
        });

        return (useSuspenseQuery as jest.Mock).mock.calls[0][0].queryFn as (
            context: { signal?: AbortSignal },
        ) => Promise<string>;
    }

    it("uses fallback data when the same-origin proxy returns upstream-unavailable 503 JSON", async () => {
        global.fetch = jest.fn().mockResolvedValue(
            new Response(
                JSON.stringify({
                    message: "Upstream service is unavailable",
                }),
                { status: 503, statusText: "Service Unavailable" },
            ),
        ) as unknown as typeof fetch;

        await expect(getQueryFn()({})).resolves.toBe("fallback");
    });

    it("reports the HTTP status when an error JSON response omits statusCode", async () => {
        global.fetch = jest.fn().mockResolvedValue(
            new Response(JSON.stringify({ message: "bad gateway" }), {
                status: 502,
                statusText: "Bad Gateway",
            }),
        ) as unknown as typeof fetch;

        useSuspenseFetch("/api/proxy/api/parameters/find-by-key");

        const queryFn = (useSuspenseQuery as jest.Mock).mock.calls[0][0]
            .queryFn as (context: { signal?: AbortSignal }) => Promise<string>;

        await expect(queryFn({})).rejects.toThrow(
            "Request failed: /api/proxy/api/parameters/find-by-key returned status 502",
        );
    });
});
