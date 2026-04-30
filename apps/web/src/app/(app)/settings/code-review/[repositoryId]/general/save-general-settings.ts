import { unformatConfig } from "src/core/utils/helpers";

import type { CentralizedPrResponse } from "@services/parameters/types";

import type { CodeReviewFormType, CodeReviewGlobalConfig } from "../../_types";

type SaveSettingsResult = {
    centralizedPr?: CentralizedPrResponse;
    applySideEffects?: () => void;
};

type SaveSettings = (
    formData: CodeReviewFormType,
    options?: {
        prepare?: (formData: CodeReviewFormType) => Promise<{
            savedFormData: CodeReviewFormType;
            codeReviewConfig: Partial<CodeReviewGlobalConfig>;
        }>;
        deferSideEffects?: boolean;
    },
) => Promise<SaveSettingsResult>;

type SaveLanguage = (
    language: CodeReviewFormType["language"],
) => Promise<{ error?: unknown }>;

const getFormattedBooleanValue = (field: unknown): boolean => {
    if (field && typeof field === "object" && "value" in field) {
        return Boolean((field as { value: unknown }).value);
    }

    return Boolean(field);
};

export async function saveGeneralSettings({
    formData,
    saveSettings,
    saveLanguage,
}: {
    formData: CodeReviewFormType;
    saveSettings: SaveSettings;
    saveLanguage: SaveLanguage;
}) {
    const { language, ...config } = formData;
    const configForSave = { ...config };

    if (!getFormattedBooleanValue(formData.automatedReviewActive)) {
        delete configForSave.reviewCadence;
    }

    const codeReviewSaveResult = await saveSettings(formData, {
        deferSideEffects: true,
        prepare: async () => ({
            savedFormData: { ...configForSave, language } as CodeReviewFormType,
            codeReviewConfig: unformatConfig(configForSave),
        }),
    });

    const languageResult = await saveLanguage(language);

    if (languageResult.error) {
        throw new Error(
            `Failed to save language settings: ${languageResult.error}`,
        );
    }

    codeReviewSaveResult.applySideEffects?.();

    return codeReviewSaveResult;
}
