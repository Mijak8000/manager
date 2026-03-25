"use client";

import { Button } from "@components/ui/button";
import { Card, CardContent, CardHeader } from "@components/ui/card";
import { Checkbox } from "@components/ui/checkbox";
import { FormControl } from "@components/ui/form-control";
import { Heading } from "@components/ui/heading";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { Controller, useFormContext } from "react-hook-form";

import { OverrideIndicatorForm } from "../../../_components/override";
import type { CodeReviewFormType } from "../../../_types";

const levelOptions = [
    {
        value: "low",
        name: "All findings",
        description: "Critical + Issues + Warnings",
        default: true,
    },
    {
        value: "high",
        name: "Critical + Issues",
        description: "Hide warnings — only show findings that need action",
    },
    {
        value: "critical",
        name: "Critical only",
        description: "Only findings that block merge",
    },
] satisfies Array<{
    value: string;
    name: string;
    description: string;
    default?: boolean;
}>;

/**
 * V3 level filter: critical / issue / warning.
 * Maps to the existing severityLevelFilter field for backwards compatibility:
 * - "low" = show all findings (critical + issues + warnings)
 * - "high" = show critical + issues (hide warnings)
 * - "critical" = show only critical findings
 */
export const MinimumLevelFilter = () => {
    const form = useFormContext<CodeReviewFormType>();

    return (
        <Card>
            <CardHeader>
                <div className="flex flex-col gap-1">
                    <div className="flex flex-row items-center gap-2">
                        <Heading variant="h3">Finding level</Heading>
                        <OverrideIndicatorForm fieldName="suggestionControl.severityLevelFilter" />
                    </div>
                    <p className="text-text-secondary text-sm">
                        Choose which findings Kody should post as review
                        comments
                    </p>
                </div>
            </CardHeader>
            <CardContent>
                <Controller
                    name="suggestionControl.severityLevelFilter.value"
                    control={form.control}
                    render={({ field }) => {
                        const currentValue =
                            field.value === "critical"
                                ? "critical"
                                : field.value === "high"
                                  ? "high"
                                  : "low";

                        return (
                            <FormControl.Root className="flex-1">
                                <FormControl.Input>
                                    <ToggleGroup.Root
                                        id={field.name}
                                        type="single"
                                        disabled={field.disabled}
                                        className="flex flex-1 flex-col gap-2"
                                        value={currentValue}
                                        onValueChange={(value) => {
                                            if (value) field.onChange(value);
                                        }}>
                                        {levelOptions.map((option) => (
                                            <ToggleGroup.ToggleGroupItem
                                                asChild
                                                key={option.value}
                                                value={option.value}>
                                                <Button
                                                    size="md"
                                                    variant="helper"
                                                    className="h-auto w-full justify-between py-4">
                                                    <div className="flex flex-col gap-2">
                                                        <div className="flex items-center gap-1">
                                                            <Heading variant="h3">
                                                                {option.name}
                                                            </Heading>
                                                            {option.default && (
                                                                <small className="text-text-secondary">
                                                                    (default)
                                                                </small>
                                                            )}
                                                        </div>
                                                        <small className="text-text-secondary text-left">
                                                            {
                                                                option.description
                                                            }
                                                        </small>
                                                    </div>

                                                    <Checkbox
                                                        decorative
                                                        checked={
                                                            currentValue ===
                                                            option.value
                                                        }
                                                    />
                                                </Button>
                                            </ToggleGroup.ToggleGroupItem>
                                        ))}
                                    </ToggleGroup.Root>
                                </FormControl.Input>
                            </FormControl.Root>
                        );
                    }}
                />
            </CardContent>
        </Card>
    );
};
