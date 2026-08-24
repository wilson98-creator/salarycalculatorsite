#!/bin/bash
# Trigger a Cloudflare Pages deploy via the deploy hook.
# Usage: ./scripts/deploy.sh
#
# The hook URL is stored here so we can trigger deploys without
# depending on the GitHub webhook (which has been flaky).

set -e

DEPLOY_HOOK="https://api.cloudflare.com/client/v4/pages/webhooks/deploy_hooks/1b0bbefe-8af1-4799-b2f0-e9f498256642"

echo "Triggering Cloudflare Pages deploy..."
response=$(curl -sS -X POST "$DEPLOY_HOOK" -w "\n%{http_code}")

http_code=$(echo "$response" | tail -n 1)
body=$(echo "$response" | head -n -1)

if [ "$http_code" = "200" ]; then
  build_id=$(echo "$body" | python3 -c "import sys, json; print(json.load(sys.stdin)['result']['id'])" 2>/dev/null || echo "unknown")
  echo "✓ Deploy triggered (build ID: $build_id)"
  echo "Watch: https://dash.cloudflare.com/ → Workers & Pages → salarycalc-au → Deployments"
else
  echo "✗ Deploy failed (HTTP $http_code)"
  echo "$body"
  exit 1
fi
