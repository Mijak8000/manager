import { isServerSide } from "./server-side";

const truthyValues = new Set(["1", "true", "yes", "on"]);

export function isEnterpriseAccessEnabled(): boolean {
    const value = isServerSide
        ? process.env.KODUS_ENTERPRISE_ACCESS
        : (globalThis as any).__KODUS_PUBLIC_CONFIG__?.enterpriseAccessEnabled;

    if (typeof value === "boolean") {
        return value;
    }

    return truthyValues.has(String(value ?? "").trim().toLowerCase());
}
