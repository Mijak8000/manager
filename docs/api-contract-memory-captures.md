# API Contract: Memory Captures

> Contrato para o endpoint que o CLI consome no Milestone 2 (LLM Classification + Auto-Promote).
> O CLI já está implementado e fazendo chamadas para este endpoint.

---

## Endpoint

```
POST /cli/memory/captures
```

## Autenticação

Segue o mesmo padrão do `/cli/review` — dois modos:

| Modo | Header | Exemplo |
|------|--------|---------|
| Team Key | `X-Team-Key: <key>` | `X-Team-Key: kodus_abc123...` |
| JWT (Bearer) | `Authorization: Bearer <token>` | `Authorization: Bearer eyJ...` |

O CLI detecta automaticamente: se o token começa com `kodus_`, usa `X-Team-Key`; caso contrário, usa `Bearer`.

## Request

**Content-Type:** `application/json`

### Body

```jsonc
{
  // Branch onde a sessão de coding aconteceu
  "branch": "feat/auth",                    // string, required

  // SHA do HEAD no momento da captura
  "sha": "abc1234def5678",                  // string | null, required

  // Org/repo extraído do git remote (formato "org/repo")
  "orgRepo": "kodustech/cli",               // string | null, required

  // Agente que gerou a captura
  "agent": "claude-code",                   // string, required
  // Valores possíveis: "claude-code", "cursor", "codex"

  // Evento que disparou a captura (sempre "stop" neste endpoint)
  "event": "stop",                          // string, required

  // Sinais extraídos da sessão do agente
  "signals": {                              // object, required
    "sessionId": "sess-abc123",             // string?, optional
    "turnId": "turn-456",                   // string?, optional
    "prompt": "Refactor auth to use JWT",   // string?, optional
    "assistantMessage": "I decided to...",  // string?, optional (truncado a 10.000 chars pelo CLI)
    "modifiedFiles": [                      // string[], required (pode ser vazio)
      "src/auth/jwt.ts",
      "src/auth/middleware.ts"
    ],
    "toolUses": [                           // Array<object>, required (pode ser vazio)
      {
        "tool": "Write",                    // string, required
        "filePath": "src/auth/jwt.ts",      // string?, optional
        "summary": "Created JWT helper"     // string?, optional
      }
    ]
  },

  // Resumo textual opcional (vem do flag --summary do CLI)
  "summary": "Refactored auth module",      // string?, optional

  // Timestamp ISO 8601 de quando a captura foi feita
  "capturedAt": "2025-06-01T10:30:00.000Z"  // string, required
}
```

### Tamanhos esperados

| Campo | Tamanho típico | Máximo |
|-------|---------------|--------|
| `branch` | 10-80 chars | ~250 chars |
| `sha` | 40 chars (full SHA) ou 7 (short) | 40 chars |
| `orgRepo` | 10-60 chars | ~200 chars |
| `agent` | 5-15 chars | 50 chars |
| `signals.prompt` | 0-500 chars | Ilimitado (depende do usuário) |
| `signals.assistantMessage` | 0-5.000 chars | **10.000 chars** (truncado pelo CLI) |
| `signals.modifiedFiles` | 0-20 itens | ~100 itens |
| `signals.toolUses` | 0-50 itens | ~200 itens |
| **Body total** | ~2-15 KB | ~50 KB |

## Response

### Sucesso (200 ou 201)

```json
{
  "id": "cap_abc123def456",
  "accepted": true
}
```

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | `string` | ID único da captura criada no backend |
| `accepted` | `boolean` | `true` se a captura foi aceita para processamento LLM; `false` se foi descartada (ex: duplicata, rate limit soft) |

> **Nota:** O wrapper padrão da API (`{ data: ..., statusCode, type }`) é suportado — o CLI extrai `.data` automaticamente se presente.

### Erros

O CLI faz fire-and-forget: **todos os erros são silenciosamente ignorados**. Mas para observabilidade do backend:

| Status | Quando | CLI behavior |
|--------|--------|-------------|
| `400` | Payload inválido | Ignorado |
| `401` | Token expirado/inválido | Ignorado |
| `403` | Sem permissão para o org/repo | Ignorado |
| `429` | Rate limit | Ignorado (sem retry) |
| `5xx` | Erro interno | Ignorado (sem retry) |

**Importante:** O CLI **não faz retry** neste endpoint (usa `request<T>` direto, não `requestWithRetry`). Se a primeira tentativa falhar, a captura é perdida. Isso é intencional — a captura local no `.kody/` já foi salva antes da chamada API.

## Comportamento do CLI

1. A chamada só acontece no evento `stop` (fim de sessão do agente)
2. Só envia se o usuário está autenticado (`authService.isAuthenticated()`)
3. É fire-and-forget: a `Promise` é disparada mas não aguardada
4. Qualquer erro (auth, rede, API) é engolido via `.catch(() => {})`
5. O `assistantMessage` é truncado a 10.000 caracteres antes do envio
6. A captura local no `.kody/pr/<branch>.md` sempre acontece independentemente da API

## O que o backend precisa fazer

1. **Receber e persistir** a captura raw
2. **Classificar com LLM** (server-side, async):
   - Extrair decisões do `signals.prompt` + `signals.assistantMessage`
   - Classificar cada decisão por tipo (`architectural_decision`, `convention`, `tradeoff`, etc.)
   - Associar ao `orgRepo` e `branch`
3. **Retornar rapidamente** — o CLI não espera, mas o timeout padrão do `request` é 20min (herança do request genérico). Idealmente responder em < 1s.
4. **Idempotência** — considerar usar `sha` + `sessionId` + `capturedAt` como chave de dedup

## Exemplo completo

### Request

```bash
curl -X POST https://api.kodus.io/cli/memory/captures \
  -H "Content-Type: application/json" \
  -H "X-Team-Key: kodus_abc123" \
  -d '{
    "branch": "feat/auth",
    "sha": "a1b2c3d4e5f6",
    "orgRepo": "kodustech/cli",
    "agent": "claude-code",
    "event": "stop",
    "signals": {
      "sessionId": "sess-abc",
      "prompt": "Refactor auth to use JWT",
      "assistantMessage": "I decided to use JWT because it allows stateless auth...",
      "modifiedFiles": ["src/auth/jwt.ts", "src/auth/middleware.ts"],
      "toolUses": [
        { "tool": "Write", "filePath": "src/auth/jwt.ts" },
        { "tool": "Edit", "filePath": "src/auth/middleware.ts", "summary": "Added JWT validation" }
      ]
    },
    "capturedAt": "2025-06-01T10:30:00.000Z"
  }'
```

### Response

```json
{
  "data": {
    "id": "cap_789xyz",
    "accepted": true
  },
  "statusCode": 201,
  "type": "success"
}
```

---

## Referência: Código fonte no CLI

| Arquivo | O que faz |
|---------|-----------|
| `src/types/memory.ts` | Tipos `MemoryCaptureApiRequest` e `MemoryCaptureApiResponse` |
| `src/services/api/api.interface.ts` | Interface `IMemoryApi` |
| `src/services/api/api.real.ts` | `RealMemoryApi.submitCapture()` |
| `src/commands/memory/capture.ts` | `submitCaptureToApi()` — lógica fire-and-forget |
