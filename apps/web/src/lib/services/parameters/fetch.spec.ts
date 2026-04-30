/// <reference types="jest" />

export {};

const postMock = jest.fn();

jest.mock("src/core/utils/axios", () => ({
    axiosAuthorized: {
        post: (...args: unknown[]) => postMock(...args),
        fetcher: jest.fn(),
    },
}));

jest.mock("src/core/utils/helpers", () => ({
    codeReviewConfigRemovePropertiesNotInType: (value: unknown) => value,
    pathToApiUrl: (path: string) => path,
}));

jest.mock("@services/fetch", () => ({
    authorizedFetch: jest.fn(),
}));

describe("createOrUpdateCodeReviewParameter", () => {
    beforeEach(() => {
        postMock.mockReset();
    });

    it("preserves backend validation messages instead of returning only the HTTP status", async () => {
        postMock.mockRejectedValueOnce({
            response: {
                status: 400,
                data: {
                    error: "Bad Request",
                    message:
                        "configValue.property crossFileDependenciesAnalysis should not exist",
                },
            },
        });

        const { createOrUpdateCodeReviewParameter } = await import("./fetch");

        const result = await createOrUpdateCodeReviewParameter(
            { crossFileDependenciesAnalysis: true } as any,
            "team-1",
            "global",
        );

        expect(result).toEqual({
            error: "400 Bad Request: configValue.property crossFileDependenciesAnalysis should not exist",
        });
    });
});
