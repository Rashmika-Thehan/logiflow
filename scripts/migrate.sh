#!/usr/bin/env bash
set -euo pipefail

NS=logiflow
PG_USER=logiflow_admin
PRISMA_VERSION=6.19.3
APPS=(identity-service shipment-service dispatch-service driver-service notification-service)

for app in "${APPS[@]}"; do
  dir=~/logiflow/apps/$app/prisma
  echo "=== $app ==="

  # Env var name the schema reads, e.g. SHIPMENT_DATABASE_URL
  envvar=$(grep -E '^\s*url\s*=' "$dir/schema.prisma" | head -1 | sed -E 's/.*env\("([^"]+)"\).*/\1/')

  # Real connection URL from the Secret (works even when the service is scaled down)
  url=$(kubectl get secret logiflow-secrets -n $NS -o jsonpath="{.data.$envvar}" | base64 -d 2>/dev/null || true)
  if [ -z "$url" ]; then
    echo "!! $app: $envvar is not set in logiflow-secrets." >&2
    exit 1
  fi

  # Database name = last path segment of the URL
  db=$(echo "$url" | sed -E 's#^[^/]+//[^/]+/([^/?]+).*#\1#')
  echo "var=$envvar db=$db"

  # Create the database if missing
  exists=$(kubectl exec -n $NS deploy/postgres -- psql -U $PG_USER -d postgres -tAc \
    "SELECT 1 FROM pg_database WHERE datname='$db'")
  if [ "$exists" != "1" ]; then
    kubectl exec -n $NS deploy/postgres -- psql -U $PG_USER -d postgres -c "CREATE DATABASE \"$db\""
  fi

  if [ ! -d "$dir/migrations" ]; then
    echo "!! $app has no migrations folder, skipping (would need prisma db push)." >&2
    continue
  fi

  pod="migrate-$app"
  kubectl delete pod $pod -n $NS --ignore-not-found
  kubectl run $pod -n $NS --restart=Never --image=node:20-alpine \
    --env="$envvar=$url" --command -- sleep 600
  kubectl wait -n $NS --for=condition=Ready pod/$pod --timeout=120s

  kubectl cp "$dir" $NS/$pod:/prisma
  kubectl exec -n $NS $pod -- sh -c \
    "npx --yes prisma@$PRISMA_VERSION migrate deploy --schema=/prisma/schema.prisma"

  kubectl delete pod $pod -n $NS
done
echo "All done."