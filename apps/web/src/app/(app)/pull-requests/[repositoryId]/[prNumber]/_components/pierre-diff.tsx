"use client";

import { MultiFileDiff, PatchDiff } from "@pierre/diffs/react";

interface PierreDiffProps {
    oldCode: string;
    newCode: string;
    fileName: string;
    diffStyle?: "split" | "unified";
}

export default function PierreDiff({
    oldCode,
    newCode,
    fileName,
    diffStyle = "split",
}: PierreDiffProps) {
    if (!oldCode && !newCode) return null;

    return (
        <div className="pierre-diff-container overflow-x-auto p-2">
            <MultiFileDiff
                oldFile={{ name: fileName, contents: oldCode }}
                newFile={{ name: fileName, contents: newCode }}
                options={{
                    theme: "pierre-dark",
                    diffStyle,
                    overflow: "scroll",
                }}
            />
        </div>
    );
}

interface PierrePatchDiffProps {
    patch: string;
    diffStyle?: "split" | "unified";
}

export function PierrePatchDiffComponent({
    patch,
    diffStyle = "split",
}: PierrePatchDiffProps) {
    if (!patch) return null;

    return (
        <div className="pierre-diff-container overflow-x-auto">
            <PatchDiff
                patch={patch}
                options={{
                    theme: "pierre-dark",
                    diffStyle,
                    overflow: "scroll",
                }}
            />
        </div>
    );
}
