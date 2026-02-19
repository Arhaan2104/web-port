#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

STRICT="${STRICT:-0}"

echo "Design lint report"
echo "=================="

echo
echo "1) Hardcoded hex colors (excluding intentional showcase/demo files):"
HEX_REPORT="$(rg -n --glob '*.{ts,tsx,css}' \
  --glob '!components/case-study/**/DesignSystemShowcase.tsx' \
  --glob '!app/opengraph-image.tsx' \
  --glob '!styles/globals.css' \
  "#[0-9A-Fa-f]{3,8}" app components lib styles || true)"

if [[ -z "$HEX_REPORT" ]]; then
  echo "  none"
  HEX_COUNT=0
else
  echo "$HEX_REPORT" | sed 's/^/  /'
  HEX_COUNT="$(echo "$HEX_REPORT" | wc -l | tr -d ' ')"
fi

echo
echo "2) Arbitrary utility hotspots (top 20):"
ARBITRARY_REPORT="$(rg -o --glob '*.{ts,tsx,css}' '\b[a-z0-9:/_-]+-\[[^]]+\]' app components lib styles | sort | uniq -c | sort -nr | head -n 20 || true)"
if [[ -z "$ARBITRARY_REPORT" ]]; then
  echo "  none"
else
  echo "$ARBITRARY_REPORT" | sed 's/^/  /'
fi

echo
echo "3) Legacy repeated typography string:"
LEGACY_PATTERN='text-xs text-white/50 font-urbanist uppercase tracking-\[0.15em\]'
LEGACY_REPORT="$(rg -n --glob '*.{ts,tsx}' "$LEGACY_PATTERN" app components || true)"
if [[ -z "$LEGACY_REPORT" ]]; then
  echo "  none"
  LEGACY_COUNT=0
else
  echo "$LEGACY_REPORT" | sed 's/^/  /'
  LEGACY_COUNT="$(echo "$LEGACY_REPORT" | wc -l | tr -d ' ')"
fi

echo
echo "Summary:"
echo "  hex_violations=$HEX_COUNT"
echo "  legacy_typography_occurrences=$LEGACY_COUNT"

if [[ "$STRICT" == "1" ]]; then
  if [[ "$HEX_COUNT" -gt 0 || "$LEGACY_COUNT" -gt 0 ]]; then
    echo
    echo "STRICT mode failed."
    exit 1
  fi
fi
