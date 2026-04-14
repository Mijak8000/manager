#!/bin/bash
#
# Bumps the HEAD of every benchmark branch with an empty commit (same tree).
# This changes head_sha so GitHub allows creating a new PR (100-PR-per-head_sha cap).
#
# Usage: ./bump-benchmark-heads.sh
#
# Reads scripts/pr-creator/prs.json for repo+branch pairs.
# Requires `gh` authenticated with push access on ai-code-review-benchmark/*.

set -euo pipefail

REPO_DIR="$(cd "$(dirname "$0")/../.." && pwd)"
PRS_JSON="$REPO_DIR/scripts/pr-creator/prs.json"

if [ ! -f "$PRS_JSON" ]; then
  echo "prs.json not found at $PRS_JSON"
  exit 1
fi

AUTHOR_NAME="${BENCHMARK_BUMP_AUTHOR_NAME:-Kodus Benchmark Bot}"
AUTHOR_EMAIL="${BENCHMARK_BUMP_AUTHOR_EMAIL:-benchmark-bot@kodus.io}"

echo "▸ Bumping HEAD of benchmark branches (empty commit)..."

# Emit "repo|branch" pairs, unique, preserving order.
PAIRS=$(node -e "
const fs = require('fs');
const d = JSON.parse(fs.readFileSync('$PRS_JSON','utf8'));
const prs = Array.isArray(d) ? d : d.prs;
const seen = new Set();
for (const p of prs) {
  const k = p.repo + '|' + p.head;
  if (seen.has(k)) continue;
  seen.add(k);
  process.stdout.write(k + '\n');
}
")

TOTAL=$(printf '%s\n' "$PAIRS" | grep -c '|' || true)
OK=0
FAIL=0
IDX=0

while IFS='|' read -r REPO BRANCH; do
  [ -z "$REPO" ] && continue
  IDX=$((IDX + 1))

  # 1. Get current ref SHA
  REF_SHA=$(gh api "repos/$REPO/git/ref/heads/$BRANCH" --jq '.object.sha' 2>/dev/null || echo "")
  if [ -z "$REF_SHA" ]; then
    echo "  [$IDX/$TOTAL] ✗ $REPO#$BRANCH — ref not found"
    FAIL=$((FAIL + 1))
    continue
  fi

  # 2. Get the commit's tree SHA
  TREE_SHA=$(gh api "repos/$REPO/git/commits/$REF_SHA" --jq '.tree.sha' 2>/dev/null || echo "")
  if [ -z "$TREE_SHA" ]; then
    echo "  [$IDX/$TOTAL] ✗ $REPO#$BRANCH — tree not found"
    FAIL=$((FAIL + 1))
    continue
  fi

  # 3. Create a new commit pointing at the same tree (empty commit)
  MSG="bench: bump head $(date -u +%Y-%m-%dT%H:%M:%SZ)"
  NEW_SHA=$(gh api "repos/$REPO/git/commits" \
    -f "message=$MSG" \
    -f "tree=$TREE_SHA" \
    -f "parents[]=$REF_SHA" \
    -f "author[name]=$AUTHOR_NAME" \
    -f "author[email]=$AUTHOR_EMAIL" \
    --jq '.sha' 2>/dev/null || echo "")
  if [ -z "$NEW_SHA" ]; then
    echo "  [$IDX/$TOTAL] ✗ $REPO#$BRANCH — failed to create commit"
    FAIL=$((FAIL + 1))
    continue
  fi

  # 4. Update ref to new commit
  if gh api "repos/$REPO/git/refs/heads/$BRANCH" -X PATCH -f "sha=$NEW_SHA" --silent 2>/dev/null; then
    echo "  [$IDX/$TOTAL] ✓ $REPO#$BRANCH ${REF_SHA:0:7} → ${NEW_SHA:0:7}"
    OK=$((OK + 1))
  else
    echo "  [$IDX/$TOTAL] ✗ $REPO#$BRANCH — failed to update ref"
    FAIL=$((FAIL + 1))
  fi
done <<< "$PAIRS"

echo "  ✓ Bumped $OK/$TOTAL branches ($FAIL failed)"

# Only hard-fail if nothing bumped; orphan branches in prs.json can be ignored.
if [ "$OK" -eq 0 ]; then
  exit 1
fi
