import 'dotenv/config';

import { writeFileSync } from 'fs';

/**
 * Parity harness: hits the legacy cockpit (kodus-service-analytics on
 * BigQuery) and the new internal cockpit (apps/api on Postgres
 * analytics) for the same set of queries, compares responses, and
 * emits a drift report.
 *
 * No Nest, no DB drivers — just HTTP. Designed to be CI-friendly:
 * exits non-zero when ANY combination drifts above threshold.
 *
 * Usage:
 *   yarn analytics:parity-vs-bq \
 *     --new https://api.staging.kodus.io \
 *     --legacy https://analytics.staging.kodus.io \
 *     --orgs org-1,org-2,org-3 \
 *     --jwt-new $JWT \
 *     [--jwt-legacy $LEGACY_JWT]      # defaults to --jwt-new
 *     [--threshold-count 0.01]        # 1%, count metrics
 *     [--threshold-time 0.05]         # 5%, time metrics (timezone forgiveness)
 *     [--report parity-report.json]
 *     [--endpoints bug-ratio,deploy-frequency]   # subset
 *     [--windows 7d,30d]                          # subset
 *
 * Smoke test (compares the new endpoint against itself — should be 100% MATCH):
 *   yarn analytics:parity-vs-bq \
 *     --new http://localhost:3011 --legacy http://localhost:3011 \
 *     --orgs analytics-test-001 --jwt-new fake
 */

interface CliArgs {
    newUrl: string;
    legacyUrl: string;
    orgs: string[];
    jwtNew: string;
    jwtLegacy: string;
    thresholdCount: number;
    thresholdTime: number;
    reportPath: string;
    endpoints?: string[];
    windows?: string[];
}

interface EndpointDef {
    name: string;
    path: string;
    /** How to compare:
     *  - 'count': absolute relative diff against thresholdCount.
     *  - 'time':  absolute relative diff against thresholdTime.
     *  - 'composite': walks numeric leaves, applies thresholdCount.
     */
    type: 'count' | 'time' | 'composite';
}

interface WindowDef {
    name: string;
    days: number;
}

interface ComparisonResult {
    org: string;
    endpoint: string;
    window: string;
    legacyOk: boolean;
    newOk: boolean;
    legacyStatus: number;
    newStatus: number;
    drift: number;
    verdict: 'MATCH' | 'DRIFT_OK' | 'DRIFT_BAD' | 'MISSING' | 'ERROR';
    detail?: string;
}

const ALL_ENDPOINTS: EndpointDef[] = [
    { name: 'bug-ratio', path: '/code-health/charts/bug-ratio', type: 'count' },
    {
        name: 'deploy-frequency',
        path: '/productivity/charts/deploy-frequency',
        type: 'count',
    },
    {
        name: 'lead-time-for-change',
        path: '/productivity/highlights/lead-time-for-change',
        type: 'time',
    },
    {
        name: 'suggestions-by-category',
        path: '/code-health/charts/suggestions-by-category',
        type: 'count',
    },
    {
        name: 'company-dashboard',
        path: '/productivity/dashboard/company',
        type: 'composite',
    },
];

const ALL_WINDOWS: WindowDef[] = [
    { name: '7d', days: 7 },
    { name: '30d', days: 30 },
    { name: '90d', days: 90 },
];

function parseArgs(): CliArgs {
    const out: Partial<CliArgs> = {
        thresholdCount: 0.01,
        thresholdTime: 0.05,
        reportPath: 'parity-report.json',
    };
    const argv = process.argv.slice(2);
    for (let i = 0; i < argv.length; i += 1) {
        const arg = argv[i];
        const next = argv[i + 1];
        switch (arg) {
            case '--new':
                out.newUrl = next;
                i += 1;
                break;
            case '--legacy':
                out.legacyUrl = next;
                i += 1;
                break;
            case '--orgs':
                out.orgs = next.split(',');
                i += 1;
                break;
            case '--jwt-new':
                out.jwtNew = next;
                i += 1;
                break;
            case '--jwt-legacy':
                out.jwtLegacy = next;
                i += 1;
                break;
            case '--threshold-count':
                out.thresholdCount = Number(next);
                i += 1;
                break;
            case '--threshold-time':
                out.thresholdTime = Number(next);
                i += 1;
                break;
            case '--report':
                out.reportPath = next;
                i += 1;
                break;
            case '--endpoints':
                out.endpoints = next.split(',');
                i += 1;
                break;
            case '--windows':
                out.windows = next.split(',');
                i += 1;
                break;
            default:
                if (arg?.startsWith('--')) {
                    throw new Error(`unknown flag: ${arg}`);
                }
        }
    }
    if (!out.newUrl || !out.legacyUrl || !out.orgs || !out.jwtNew) {
        throw new Error(
            'required: --new <url> --legacy <url> --orgs <csv> --jwt-new <token>',
        );
    }
    if (!out.jwtLegacy) out.jwtLegacy = out.jwtNew;
    return out as CliArgs;
}

function isoDateNDaysAgo(days: number): string {
    const d = new Date();
    d.setUTCDate(d.getUTCDate() - days);
    return d.toISOString().slice(0, 10);
}

function isoDateToday(): string {
    return new Date().toISOString().slice(0, 10);
}

async function fetchEndpoint(
    baseUrl: string,
    jwt: string,
    path: string,
    org: string,
    window: WindowDef,
): Promise<{ status: number; body: unknown }> {
    const url = new URL(path, baseUrl);
    url.searchParams.set('organizationId', org);
    url.searchParams.set('startDate', isoDateNDaysAgo(window.days));
    url.searchParams.set('endDate', isoDateToday());

    try {
        const res = await fetch(url.toString(), {
            headers: jwt ? { Authorization: `Bearer ${jwt}` } : {},
        });
        const text = await res.text();
        let body: unknown = text;
        try {
            body = JSON.parse(text);
        } catch {
            // keep raw text
        }
        return { status: res.status, body };
    } catch (err) {
        return {
            status: 0,
            body: err instanceof Error ? err.message : String(err),
        };
    }
}

/**
 * Walk two values in parallel and collect every numeric leaf pair.
 * Useful for chart payloads with `[{week, value}, ...]` shapes — we
 * compare values across same-keyed positions.
 */
function collectNumericPairs(
    a: unknown,
    b: unknown,
    pairs: Array<[number, number]> = [],
): Array<[number, number]> {
    if (typeof a === 'number' && typeof b === 'number') {
        pairs.push([a, b]);
        return pairs;
    }
    if (Array.isArray(a) && Array.isArray(b)) {
        const len = Math.min(a.length, b.length);
        for (let i = 0; i < len; i += 1) {
            collectNumericPairs(a[i], b[i], pairs);
        }
        return pairs;
    }
    if (
        a !== null &&
        b !== null &&
        typeof a === 'object' &&
        typeof b === 'object'
    ) {
        const ao = a as Record<string, unknown>;
        const bo = b as Record<string, unknown>;
        // Walk keys present on both; ignore mismatched keys (caller can
        // detect those structurally if needed).
        for (const k of Object.keys(ao)) {
            if (k in bo) collectNumericPairs(ao[k], bo[k], pairs);
        }
        return pairs;
    }
    return pairs;
}

function maxRelativeDrift(pairs: Array<[number, number]>): number {
    let max = 0;
    for (const [legacy, neu] of pairs) {
        const denom = Math.max(Math.abs(legacy), Math.abs(neu), 1);
        const drift = Math.abs(legacy - neu) / denom;
        if (drift > max) max = drift;
    }
    return max;
}

function compare(
    endpoint: EndpointDef,
    legacy: { status: number; body: unknown },
    neu: { status: number; body: unknown },
    args: CliArgs,
): { drift: number; verdict: ComparisonResult['verdict']; detail?: string } {
    const legacyOk = legacy.status >= 200 && legacy.status < 300;
    const newOk = neu.status >= 200 && neu.status < 300;

    if (!legacyOk && !newOk) {
        return {
            drift: 0,
            verdict: 'ERROR',
            detail: `both failed (legacy ${legacy.status}, new ${neu.status})`,
        };
    }
    if (!legacyOk || !newOk) {
        return {
            drift: 1,
            verdict: 'MISSING',
            detail: `one side failed (legacy ${legacy.status}, new ${neu.status})`,
        };
    }

    // Some new endpoints wrap the response in `{data, statusCode, type}`
    // (the apps/api TransformInterceptor). Unwrap before comparing.
    const unwrap = (b: unknown): unknown => {
        if (
            b !== null &&
            typeof b === 'object' &&
            'data' in (b as Record<string, unknown>) &&
            'statusCode' in (b as Record<string, unknown>)
        ) {
            return (b as Record<string, unknown>).data;
        }
        return b;
    };

    const pairs = collectNumericPairs(unwrap(legacy.body), unwrap(neu.body));
    if (pairs.length === 0) {
        // No numeric leaves to compare — likely both empty arrays. That's a MATCH.
        return { drift: 0, verdict: 'MATCH' };
    }

    const drift = maxRelativeDrift(pairs);
    const threshold =
        endpoint.type === 'time' ? args.thresholdTime : args.thresholdCount;
    if (drift === 0) return { drift, verdict: 'MATCH' };
    if (drift <= threshold) return { drift, verdict: 'DRIFT_OK' };
    return {
        drift,
        verdict: 'DRIFT_BAD',
        detail: `max numeric drift ${(drift * 100).toFixed(2)}% > ${(threshold * 100).toFixed(2)}%`,
    };
}

async function main() {
    const args = parseArgs();
    const endpoints = args.endpoints
        ? ALL_ENDPOINTS.filter((e) => args.endpoints!.includes(e.name))
        : ALL_ENDPOINTS;
    const windows = args.windows
        ? ALL_WINDOWS.filter((w) => args.windows!.includes(w.name))
        : ALL_WINDOWS;

    const results: ComparisonResult[] = [];
    const total = args.orgs.length * endpoints.length * windows.length;
    let done = 0;

    // eslint-disable-next-line no-console
    console.log(
        `[parity] running ${total} comparisons (${args.orgs.length} orgs × ${endpoints.length} endpoints × ${windows.length} windows)`,
    );

    for (const org of args.orgs) {
        for (const endpoint of endpoints) {
            for (const window of windows) {
                const [legacy, neu] = await Promise.all([
                    fetchEndpoint(
                        args.legacyUrl,
                        args.jwtLegacy,
                        endpoint.path,
                        org,
                        window,
                    ),
                    fetchEndpoint(
                        args.newUrl,
                        args.jwtNew,
                        endpoint.path,
                        org,
                        window,
                    ),
                ]);
                const cmp = compare(endpoint, legacy, neu, args);
                results.push({
                    org,
                    endpoint: endpoint.name,
                    window: window.name,
                    legacyOk: legacy.status >= 200 && legacy.status < 300,
                    newOk: neu.status >= 200 && neu.status < 300,
                    legacyStatus: legacy.status,
                    newStatus: neu.status,
                    drift: cmp.drift,
                    verdict: cmp.verdict,
                    detail: cmp.detail,
                });
                done += 1;
                if (done % 10 === 0) {
                    // eslint-disable-next-line no-console
                    console.log(`[parity] ${done}/${total} done`);
                }
            }
        }
    }

    // Sort: worst (DRIFT_BAD/MISSING/ERROR) first.
    const order: Record<ComparisonResult['verdict'], number> = {
        DRIFT_BAD: 0,
        ERROR: 1,
        MISSING: 2,
        DRIFT_OK: 3,
        MATCH: 4,
    };
    results.sort((a, b) => order[a.verdict] - order[b.verdict]);

    // Console table — only the worst N (avoid 75-row dump if mostly fine).
    const worst = results.filter(
        (r) =>
            r.verdict === 'DRIFT_BAD' ||
            r.verdict === 'ERROR' ||
            r.verdict === 'MISSING',
    );
    if (worst.length > 0) {
        // eslint-disable-next-line no-console
        console.log('\nIssues:');
        // eslint-disable-next-line no-console
        console.table(
            worst.map((r) => ({
                org: r.org,
                endpoint: r.endpoint,
                window: r.window,
                drift_pct: (r.drift * 100).toFixed(3),
                verdict: r.verdict,
                detail: r.detail ?? '',
            })),
        );
    }

    const summary = {
        total: results.length,
        match: results.filter((r) => r.verdict === 'MATCH').length,
        drift_ok: results.filter((r) => r.verdict === 'DRIFT_OK').length,
        drift_bad: results.filter((r) => r.verdict === 'DRIFT_BAD').length,
        missing: results.filter((r) => r.verdict === 'MISSING').length,
        error: results.filter((r) => r.verdict === 'ERROR').length,
    };

    writeFileSync(
        args.reportPath,
        JSON.stringify({ summary, results }, null, 2),
    );

    // eslint-disable-next-line no-console
    console.log(
        `\n${summary.total} total: ${summary.match} MATCH, ${summary.drift_ok} DRIFT_OK, ${summary.drift_bad} DRIFT_BAD, ${summary.missing} MISSING, ${summary.error} ERROR`,
    );
    // eslint-disable-next-line no-console
    console.log(`report saved to ${args.reportPath}`);

    const failed = summary.drift_bad + summary.missing + summary.error;
    process.exit(failed > 0 ? 1 : 0);
}

main().catch((err) => {
    // eslint-disable-next-line no-console
    console.error('parity-vs-bq crashed:', err);
    process.exit(1);
});
