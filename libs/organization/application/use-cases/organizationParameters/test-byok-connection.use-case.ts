import { BYOKProvider } from '@kodus/kodus-common/llm';
import { ProviderService } from '@libs/core/infrastructure/services/providers/provider.service';
import { createLogger } from '@kodus/flow';
import { BadRequestException, Injectable } from '@nestjs/common';
import axios, { AxiosError } from 'axios';

export type TestByokResultCode =
    | 'ok'
    | 'auth'
    | 'not_found'
    | 'bad_request'
    | 'payment'
    | 'rate_limit'
    | 'server_error'
    | 'network'
    | 'unknown';

export type TestByokResult = {
    ok: boolean;
    code: TestByokResultCode;
    latencyMs: number;
    /** Short, user-friendly explanation of the failure. */
    message?: string;
    /** Raw error message surfaced by the provider (e.g. "model 'x' does not exist"). */
    providerMessage?: string;
    /** HTTP status returned by the provider, when applicable. */
    httpStatus?: number;
};

type TestByokInput = {
    provider: string;
    apiKey: string;
    baseURL?: string;
    model?: string;
};

const TEST_TIMEOUT_MS = 15_000;

@Injectable()
export class TestByokConnectionUseCase {
    private readonly logger = createLogger(TestByokConnectionUseCase.name);

    constructor(private readonly providerService: ProviderService) {}

    async execute(input: TestByokInput): Promise<TestByokResult> {
        const { provider, apiKey, baseURL } = input;

        if (!this.providerService.isProviderSupported(provider)) {
            throw new BadRequestException(`Unsupported provider: ${provider}`);
        }

        if (!apiKey?.trim()) {
            throw new BadRequestException('apiKey is required');
        }

        const byokProvider = provider as BYOKProvider;

        if (
            byokProvider === BYOKProvider.OPENAI_COMPATIBLE &&
            !baseURL?.trim()
        ) {
            throw new BadRequestException(
                'baseURL is required for openai_compatible',
            );
        }

        const { url, headers } = this.buildProbeRequest(byokProvider, apiKey, baseURL);
        const start = Date.now();

        try {
            await axios.get(url, { headers, timeout: TEST_TIMEOUT_MS });
            return {
                ok: true,
                code: 'ok',
                latencyMs: Date.now() - start,
            };
        } catch (err) {
            const latencyMs = Date.now() - start;
            return this.normalizeError(err, latencyMs);
        }
    }

    private buildProbeRequest(
        provider: BYOKProvider,
        apiKey: string,
        baseURL?: string,
    ): { url: string; headers: Record<string, string> } {
        switch (provider) {
            case BYOKProvider.OPENAI:
                return {
                    url: 'https://api.openai.com/v1/models',
                    headers: {
                        Authorization: `Bearer ${apiKey}`,
                        'Content-Type': 'application/json',
                    },
                };

            case BYOKProvider.ANTHROPIC:
                return {
                    url: 'https://api.anthropic.com/v1/models',
                    headers: {
                        'x-api-key': apiKey,
                        'anthropic-version': '2023-06-01',
                        'Content-Type': 'application/json',
                    },
                };

            case BYOKProvider.GOOGLE_GEMINI:
                return {
                    url: 'https://generativelanguage.googleapis.com/v1beta/models',
                    headers: {
                        'x-goog-api-key': apiKey,
                    },
                };

            case BYOKProvider.GOOGLE_VERTEX:
                return {
                    url: `https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(apiKey)}`,
                    headers: {},
                };

            case BYOKProvider.OPEN_ROUTER:
                return {
                    url: 'https://openrouter.ai/api/v1/models',
                    headers: {
                        Authorization: `Bearer ${apiKey}`,
                        'Content-Type': 'application/json',
                    },
                };

            case BYOKProvider.NOVITA:
                return {
                    url: 'https://api.novita.ai/v3/openai/models',
                    headers: {
                        Authorization: `Bearer ${apiKey}`,
                        'Content-Type': 'application/json',
                    },
                };

            case BYOKProvider.OPENAI_COMPATIBLE: {
                const trimmed = baseURL!.replace(/\/+$/, '');
                const needsV1 = !/\/v\d+$/i.test(trimmed);
                const url = needsV1
                    ? `${trimmed}/v1/models`
                    : `${trimmed}/models`;
                return {
                    url,
                    headers: {
                        Authorization: `Bearer ${apiKey}`,
                        'Content-Type': 'application/json',
                    },
                };
            }

            default:
                throw new BadRequestException(
                    `Unsupported provider: ${provider}`,
                );
        }
    }

    private normalizeError(err: unknown, latencyMs: number): TestByokResult {
        if (axios.isAxiosError(err)) {
            const status = err.response?.status;
            const providerMessage = this.extractProviderMessage(
                err.response?.data,
            );

            const base = { latencyMs, httpStatus: status, providerMessage };

            if (status === 401 || status === 403) {
                return {
                    ok: false,
                    code: 'auth',
                    ...base,
                    message:
                        'The provider rejected this API key. Double-check it was copied in full, billing is active, and the key matches the endpoint you selected.',
                };
            }

            if (status === 404) {
                return {
                    ok: false,
                    code: 'not_found',
                    ...base,
                    message:
                        "The provider returned 404. Either the base URL is wrong for this provider, or the API path isn't exposed on your plan.",
                };
            }

            if (status === 400) {
                return {
                    ok: false,
                    code: 'bad_request',
                    ...base,
                    message:
                        'The provider rejected the request format. The key may be valid but the model ID or request shape is off — check the exact model name in the provider catalog.',
                };
            }

            if (status === 402) {
                return {
                    ok: false,
                    code: 'payment',
                    ...base,
                    message:
                        'The provider account has insufficient credits or a blocked billing status. Top up on the provider dashboard and retry.',
                };
            }

            if (status === 429) {
                return {
                    ok: true,
                    code: 'rate_limit',
                    ...base,
                    message:
                        "Rate-limited — the key works but the provider is throttling right now. Wait a moment and save again, or lower Max Concurrent Requests in Advanced settings.",
                };
            }

            if (typeof status === 'number' && status >= 500) {
                return {
                    ok: false,
                    code: 'server_error',
                    ...base,
                    message: `The provider returned HTTP ${status}. This is a provider-side error — wait a moment and retry. If it persists, check the provider status page.`,
                };
            }

            if (err.code === 'ECONNABORTED' || err.code === 'ETIMEDOUT') {
                return {
                    ok: false,
                    code: 'network',
                    latencyMs,
                    message: `The request timed out after ${TEST_TIMEOUT_MS}ms. The provider may be slow or unreachable from this deployment — retry or check outbound network.`,
                };
            }

            if (
                err.code === 'ECONNREFUSED' ||
                err.code === 'ENOTFOUND' ||
                err.code === 'EAI_AGAIN'
            ) {
                return {
                    ok: false,
                    code: 'network',
                    latencyMs,
                    message: `Couldn't reach the provider (${err.code}). The base URL may be wrong, the host may be down, or your deployment can't make outbound HTTPS calls.`,
                };
            }

            return {
                ok: false,
                code: 'unknown',
                ...base,
                message: status
                    ? `The provider returned HTTP ${status} and Kodus couldn't classify the error. See the provider message below for details.`
                    : 'Kodus reached the provider but couldn\'t classify the response. See the provider message below.',
            };
        }

        this.logger.warn({
            message: 'Unexpected error while testing BYOK connection',
            context: TestByokConnectionUseCase.name,
            error: err as AxiosError,
        });

        return {
            ok: false,
            code: 'unknown',
            latencyMs,
            message:
                (err as Error)?.message ??
                'Unexpected error while testing the connection.',
        };
    }

    /**
     * Extract the provider's own error message from the response body.
     * Covers OpenAI/Anthropic/Google/OpenRouter/OpenAI-compatible shapes.
     */
    private extractProviderMessage(data: unknown): string | undefined {
        if (!data) return undefined;

        // Some providers return a plain string body
        if (typeof data === 'string') {
            const trimmed = data.trim();
            return trimmed.length > 0 && trimmed.length < 500
                ? trimmed
                : undefined;
        }

        if (typeof data !== 'object') return undefined;
        const d = data as Record<string, unknown>;

        // OpenAI / Anthropic / Google / OpenRouter:  { error: { message, ... } }
        const errorField = d.error;
        if (errorField && typeof errorField === 'object') {
            const inner = errorField as Record<string, unknown>;
            if (typeof inner.message === 'string' && inner.message.trim()) {
                return inner.message.trim();
            }
        }
        // Some OpenAI-compatible servers:  { error: "plain string" }
        if (typeof errorField === 'string' && errorField.trim()) {
            return errorField.trim();
        }

        // Fallback: top-level message
        if (typeof d.message === 'string' && d.message.trim()) {
            return d.message.trim();
        }

        // Gemini's google.rpc.Status shape: { error: { details: [...] } }
        if (
            errorField &&
            typeof errorField === 'object' &&
            Array.isArray((errorField as any).details)
        ) {
            const first = (errorField as any).details[0];
            if (first?.reason && typeof first.reason === 'string') {
                return first.reason;
            }
        }

        return undefined;
    }
}
