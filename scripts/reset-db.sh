#!/usr/bin/env bash
# ==============================================================================
# reset-db.sh - wipe and rebuild the LogiFlow databases
#
# Usage (from ~/logiflow):
#   ./scripts/reset-db.sh                 # reset the 5 Postgres databases
#   ./scripts/reset-db.sh --all           # also flush Redis and drop Mongo data
#   ./scripts/reset-db.sh --no-backup     # skip the backup step
#   ./scripts/reset-db.sh --yes           # skip the confirmation prompt
#
# Needs scripts/migrate.sh in the same folder.
# ==============================================================================
set -euo pipefail

NS=logiflow
PG_USER=logiflow_admin
DBS=(logiflow_identity logiflow_shipment logiflow_dispatch logiflow_driver logiflow_notification)
SERVICES=(identity-service shipment-service dispatch-service driver-service notification-service)

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKUP_DIR="$HOME/logiflow-backups"

CLEAN_ALL=false
DO_BACKUP=true
ASSUME_YES=false

for arg in "$@"; do
  case "$arg" in
    --all)       CLEAN_ALL=true ;;
    --no-backup) DO_BACKUP=false ;;
    --yes|-y)    ASSUME_YES=true ;;
    *) echo "Unknown option: $arg"; exit 1 ;;
  esac
done

declare -A REPLICAS

on_error() {
  echo
  echo "!! The script stopped before finishing."
  echo "!! Services may still be scaled down. Bring them back with:"
  for svc in "${SERVICES[@]}"; do
    echo "   kubectl scale deployment/$svc -n $NS --replicas=${REPLICAS[$svc]:-1}"
  done
}
trap on_error ERR

# ------------------------------------------------------------------------------
# 0. Confirm
# ------------------------------------------------------------------------------
echo "This will DELETE all data in: ${DBS[*]}"
$CLEAN_ALL && echo "It will ALSO flush Redis and drop the Mongo database 'logiflow_tracking'."
if [ "$ASSUME_YES" != true ]; then
  read -r -p "Type 'yes' to continue: " answer
  [ "$answer" = "yes" ] || { echo "Cancelled."; exit 0; }
fi

# ------------------------------------------------------------------------------
# 1. Backup
# ------------------------------------------------------------------------------
if [ "$DO_BACKUP" = true ]; then
  mkdir -p "$BACKUP_DIR"
  file="$BACKUP_DIR/postgres-$(date +%F-%H%M%S).sql"
  echo "==> [1/6] Backing up Postgres to $file"
  kubectl exec -n $NS deploy/postgres -- pg_dumpall -U $PG_USER > "$file"
  echo "    Backup size: $(du -h "$file" | cut -f1)"
else
  echo "==> [1/6] Backup skipped"
fi

# ------------------------------------------------------------------------------
# 2. Scale down the services that use Postgres (stops them reconnecting mid-reset)
# ------------------------------------------------------------------------------
echo "==> [2/6] Stopping services"
for svc in "${SERVICES[@]}"; do
  REPLICAS[$svc]=$(kubectl get deployment/$svc -n $NS -o jsonpath='{.spec.replicas}')
  kubectl scale deployment/$svc -n $NS --replicas=0
done
for svc in "${SERVICES[@]}"; do
  kubectl wait --for=delete pod -l app=$svc -n $NS --timeout=90s 2>/dev/null || true
done

# ------------------------------------------------------------------------------
# 3. Drop the databases
# ------------------------------------------------------------------------------
echo "==> [3/6] Dropping databases"
for db in "${DBS[@]}"; do
  kubectl exec -n $NS deploy/postgres -- psql -U $PG_USER -d postgres \
    -c "DROP DATABASE IF EXISTS $db WITH (FORCE);"
done

# ------------------------------------------------------------------------------
# 4. Recreate databases and re-apply every migration (also re-seeds data)
# ------------------------------------------------------------------------------
echo "==> [4/6] Running migrations"
bash "$SCRIPT_DIR/migrate.sh"

# ------------------------------------------------------------------------------
# 5. Optional: Redis and Mongo
# ------------------------------------------------------------------------------
if [ "$CLEAN_ALL" = true ]; then
  echo "==> [5/6] Cleaning Redis and Mongo"
  kubectl exec -n $NS deploy/redis -- redis-cli FLUSHALL
  kubectl exec -n $NS deploy/mongodb -- sh -c \
    'mongosh -u "$MONGO_INITDB_ROOT_USERNAME" -p "$MONGO_INITDB_ROOT_PASSWORD" --authenticationDatabase admin logiflow_tracking --quiet --eval "db.dropDatabase()"'
  kubectl rollout restart deployment/tracking-service -n $NS
else
  echo "==> [5/6] Redis and Mongo left untouched (use --all to clean them)"
fi

# ------------------------------------------------------------------------------
# 6. Start the services again
# ------------------------------------------------------------------------------
echo "==> [6/6] Starting services"
for svc in "${SERVICES[@]}"; do
  kubectl scale deployment/$svc -n $NS --replicas="${REPLICAS[$svc]}"
done
for svc in "${SERVICES[@]}"; do
  kubectl rollout status deployment/$svc -n $NS --timeout=180s
done

trap - ERR
echo
kubectl get pods -n $NS
echo
echo "Done. Sign in again from the frontend (clear the site's local storage or use"
echo "an incognito window, since your old tokens no longer match any user)."