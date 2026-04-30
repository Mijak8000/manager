const truthyValues = new Set(['1', 'true', 'yes', 'on']);

export function isEnterpriseAccessEnabled(): boolean {
    return truthyValues.has(
        String(process.env.KODUS_ENTERPRISE_ACCESS ?? '')
            .trim()
            .toLowerCase(),
    );
}
