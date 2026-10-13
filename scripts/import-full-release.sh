#!/usr/bin/env bash
set -euo pipefail

# Safely import a complete OSA release archive into an existing clone.
# Usage: bash scripts/import-full-release.sh /path/to/OSA_Global_AI_Intelligence_Research_Center_v1.9.0.zip
ARCHIVE="${1:-}"
if [[ -z "$ARCHIVE" || ! -f "$ARCHIVE" ]]; then
  echo "Usage: bash scripts/import-full-release.sh /path/to/OSA_Global_AI_Intelligence_Research_Center_v1.9.0.zip" >&2
  exit 2
fi
if ! git rev-parse --show-toplevel >/dev/null 2>&1; then
  echo "Run this script from inside a cloned osa-global-intelligence repository." >&2
  exit 2
fi
ROOT="$(git rev-parse --show-toplevel)"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
unzip -q "$ARCHIVE" -d "$TMP"
SRC="$TMP/OSA_Full_Production_Project"
if [[ ! -d "$SRC" ]]; then
  echo "Archive does not contain OSA_Full_Production_Project/." >&2
  exit 3
fi
# Never import environment secrets or generated dependencies.
rsync -a --delete-excluded \
  --exclude='.git/' \
  --exclude='.env' --exclude='.env.*' --exclude='!.env.example' \
  --exclude='node_modules/' --exclude='.next/' --exclude='out/' \
  --exclude='coverage/' --exclude='playwright-report/' \
  --exclude='test-results/' --exclude='*.log' \
  "$SRC/" "$ROOT/"
echo "Import complete. No commit or push was performed."
echo "Review changes and secrets before committing:"
git -C "$ROOT" status --short
