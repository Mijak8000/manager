"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@hooks/use-debounce";

type RepositoryOption = { id: string; name: string };

export const useTokenUsageFilters = (
    models: string[],
    repositories: RepositoryOption[] = [],
) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentFilter = searchParams.get("filter") ?? "daily";

    const [selectedModels, setSelectedModels] = useState<string[]>(models);

    const [prNumber, setPrNumber] = useState(
        searchParams.get("prNumber") ?? "",
    );
    const debouncedPrNumber = useDebounce(prNumber, 500);

    const [repositoryId, setRepositoryId] = useState(
        searchParams.get("repositoryId") ?? "",
    );
    const debouncedRepositoryId = useDebounce(repositoryId, 500);

    const [developer, setDeveloper] = useState(
        searchParams.get("developer") ?? "",
    );
    const debouncedDeveloper = useDebounce(developer, 500);

    const handleFilterChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("filter", value);
        if (value !== "by-pr") {
            params.delete("prNumber");
            params.delete("repositoryId");
        }
        if (value !== "by-developer") {
            params.delete("developer");
        }
        router.replace(`${pathname}?${params.toString()}`);
    };

    const handleModelChange = (model: string) => {
        const updatedModels = selectedModels.includes(model)
            ? selectedModels.filter((m) => m !== model)
            : [...selectedModels, model];

        setSelectedModels(updatedModels);
    };

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());

        if (debouncedPrNumber) {
            params.set("prNumber", debouncedPrNumber);
        } else {
            params.delete("prNumber");
        }

        router.replace(`${pathname}?${params.toString()}`);
    }, [debouncedPrNumber, router, pathname, searchParams]);

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());

        if (debouncedRepositoryId) {
            params.set("repositoryId", debouncedRepositoryId);
        } else {
            params.delete("repositoryId");
        }

        router.replace(`${pathname}?${params.toString()}`);
    }, [debouncedRepositoryId, router, pathname, searchParams]);

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());

        if (debouncedDeveloper) {
            params.set("developer", debouncedDeveloper);
        } else {
            params.delete("developer");
        }

        router.replace(`${pathname}?${params.toString()}`);
    }, [debouncedDeveloper, router, pathname, searchParams]);

    const handlePrNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrNumber(e.target.value);
    };

    const handleDeveloperChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDeveloper(e.target.value);
    };

    const handleRepositoryChange = (value: string) => {
        setRepositoryId(value);
    };

    const getModelSelectionText = () => {
        if (
            selectedModels.length === models.length ||
            selectedModels.length === 0
        ) {
            return "All models";
        }
        if (selectedModels.length === 1) {
            return selectedModels[0];
        }
        return `${selectedModels.length} models selected`;
    };

    return {
        currentFilter,
        selectedModels,
        repositories,
        prNumber,
        repositoryId,
        developer,
        handleFilterChange,
        handleModelChange,
        handlePrNumberChange,
        handleDeveloperChange,
        handleRepositoryChange,
        getModelSelectionText,
        setSelectedModels,
    };
};
