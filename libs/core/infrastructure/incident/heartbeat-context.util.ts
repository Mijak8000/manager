import * as os from 'os';

type HeartbeatValue = Date | number | string | undefined;

function normalizeHeartbeatValue(value: HeartbeatValue): string | undefined {
    if (value === undefined) {
        return undefined;
    }

    if (value instanceof Date) {
        return value.toISOString();
    }

    return String(value);
}

export function formatHeartbeatContext(
    extra: Record<string, HeartbeatValue> = {},
): string {
    const env = process.env.API_NODE_ENV;
    const component = process.env.COMPONENT_TYPE;

    const context = {
        env,
        component,
        host: os.hostname(),
        ...extra,
    };

    return Object.entries(context)
        .map(([key, value]) => [key, normalizeHeartbeatValue(value)] as const)
        .filter(([, value]) => value && value.length > 0)
        .map(([key, value]) => `${key}=${value}`)
        .join(' ');
}
