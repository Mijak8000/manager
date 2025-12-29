# Kodus CLI

AI-powered code review from your terminal.

## Installation

### npm (Recommended)

```bash
npm install -g @kodus/cli
```

### Via curl

```bash
curl -fsSL https://raw.githubusercontent.com/kodustech/cli/main/install.sh | bash
```

### Homebrew (Coming soon)

```bash
brew install kodus/tap/kodus
```

### Using npx (No installation)

```bash
npx @kodus/cli review
```

## Quick Start

```bash
# Run a review on modified files (trial mode)
kodus review

# Run a review on staged files
kodus review --staged

# Run a review on a specific commit
kodus review --commit HEAD~1

# Run a review on specific files
kodus review src/index.ts src/utils.ts

# Review using only configured rules (no general suggestions)
kodus review --rules-only

# Fast mode: quicker analysis (good for large diffs)
kodus review --fast
```

## Authentication

```bash
# Sign up for a new account
kodus auth signup

# Login with existing account
kodus auth login

# Check authentication status
kodus auth status

# Logout
kodus auth logout

# Generate CI/CD token
kodus auth token
```

## Output Formats

```bash
# Terminal output (default)
kodus review

# JSON output
kodus review --format json

# Markdown report
kodus review --format markdown

# Save to file
kodus review --format markdown --output report.md
```

## Configuration

When logged in, the CLI fetches your configuration from the Kodus platform:

```bash
# View active configuration
kodus config

# Review with only your configured rules
kodus review --rules-only
```

### Flags

| Flag | Description | Use Case |
|------|-------------|----------|
| `--rules-only` | Only check configured rules | Team standards, CI/CD |
| `--fast` | Faster analysis with lighter checks | Large diffs, quick feedback |
| `--staged` | Analyze only staged files | Pre-commit |
| `--format json` | Output as JSON | Automation, integrations |

**Examples:**

```bash
# Pre-commit: fast check on staged files
kodus review --staged --fast

# CI/CD: strict rules only
kodus review --rules-only --format json

# Quick feedback on large changes
kodus review --fast

# Strict + fast for large PRs
kodus review --rules-only --fast
```

## Trial Mode

Without an account, you can use the CLI with rate limits:

- 5 reviews per day
- 10 files per review
- 500 lines per file

Sign up for free to remove these limits.

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Run in development
npm run dev

# Test locally
node dist/index.js review
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `KODUS_API_URL` | API endpoint (default: https://api.kodus.io) |
| `KODUS_MOCK` | Set to `true` to use mock API |
| `KODUS_TOKEN` | CI/CD token for non-interactive environments |

## License

MIT

