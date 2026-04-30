/// <reference types="jest" />

import { FormattedConfigLevel } from "../../_types";
import { saveGeneralSettings } from "./save-general-settings";

jest.mock("src/core/utils/helpers", () => ({
    unformatConfig: (config: Record<string, any>) => {
        const unformat = (value: any): any => {
            if (
                value &&
                typeof value === "object" &&
                "value" in value &&
                "level" in value
            ) {
                return value.value;
            }

            if (value && typeof value === "object" && !Array.isArray(value)) {
                return Object.fromEntries(
                    Object.entries(value).map(([key, nested]) => [
                        key,
                        unformat(nested),
                    ]),
                );
            }

            return value;
        };

        return unformat(config);
    },
}));

const formatted = <T,>(value: T) => ({
    value,
    level: FormattedConfigLevel.GLOBAL,
});

describe("saveGeneralSettings", () => {
    const makeFormData = () =>
        ({
            language: "en-US",
            automatedReviewActive: formatted(false),
            reviewCadence: {
                type: formatted("automatic"),
                timeWindow: formatted(30),
            },
            crossFileDependenciesAnalysis: formatted(true),
        }) as any;

    it("removes reviewCadence from code-review config when automated review is disabled", async () => {
        const saveSettings = jest.fn().mockResolvedValue({});
        const saveLanguage = jest.fn().mockResolvedValue({ data: true });

        await saveGeneralSettings({
            formData: makeFormData(),
            saveSettings,
            saveLanguage,
        });

        const [, options] = saveSettings.mock.calls[0];
        const prepared = await options.prepare();
        expect(prepared.codeReviewConfig).toEqual({
            automatedReviewActive: false,
            crossFileDependenciesAnalysis: true,
        });
    });

    it("does not save language when code-review settings save fails first", async () => {
        const error = new Error("Failed to save settings: 400 Bad Request");
        const saveSettings = jest.fn().mockRejectedValue(error);
        const saveLanguage = jest.fn();

        await expect(
            saveGeneralSettings({
                formData: makeFormData(),
                saveSettings,
                saveLanguage,
            }),
        ).rejects.toThrow(error);

        expect(saveLanguage).not.toHaveBeenCalled();
    });

    it("saves language before applying form reset/query side effects", async () => {
        const applySideEffects = jest.fn();
        const saveSettings = jest.fn().mockResolvedValue({ applySideEffects });
        const saveLanguage = jest.fn().mockResolvedValue({ data: true });
        const formData = makeFormData();

        await saveGeneralSettings({ formData, saveSettings, saveLanguage });

        expect(saveSettings).toHaveBeenCalledTimes(1);
        expect(saveSettings.mock.calls[0][1]).toEqual(
            expect.objectContaining({ deferSideEffects: true }),
        );
        expect(saveLanguage).toHaveBeenCalledWith(formData.language);
        expect(saveSettings.mock.invocationCallOrder[0]).toBeLessThan(
            saveLanguage.mock.invocationCallOrder[0],
        );
        expect(saveLanguage.mock.invocationCallOrder[0]).toBeLessThan(
            applySideEffects.mock.invocationCallOrder[0],
        );
    });

    it("throws a useful message when language save fails after settings save", async () => {
        const applySideEffects = jest.fn();
        const saveSettings = jest.fn().mockResolvedValue({ applySideEffects });
        const saveLanguage = jest.fn().mockResolvedValue({
            error: "500 Internal Server Error: language unavailable",
        });

        await expect(
            saveGeneralSettings({
                formData: makeFormData(),
                saveSettings,
                saveLanguage,
            }),
        ).rejects.toThrow(
            "Failed to save language settings: 500 Internal Server Error: language unavailable",
        );

        expect(applySideEffects).not.toHaveBeenCalled();
    });
});
