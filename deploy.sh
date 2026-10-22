#!/usr/bin/env bash
set -Eeuo pipefail

command -v node >/dev/null || { echo "Node 24.22.1 LTS is required."; exit 1; }
command -v npm >/dev/null || { echo "npm is required."; exit 1; }
command -v nohup >/dev/null || { echo "A persistent SSR process requires nohup or a process supervisor."; exit 1; }
node -e 'const [major, minor, patch] = process.versions.node.split(".").map(Number); if (major !== 24 || minor < 22 || (minor === 22 && patch < 1)) { console.error("Use Node 24.22.1 or a newer 24.x release."); process.exit(1); }'
php -r 'if (!is_callable("proc_open")) { fwrite(STDERR, "proc_open must be available for Composer and SSR.\n"); exit(1); }'

echo "Starting portfolio deployment."
php artisan down
trap 'php artisan up >/dev/null 2>&1 || true' EXIT

composer install --no-interaction --prefer-dist --optimize-autoloader --no-dev
composer check-platform-reqs --no-dev
php artisan optimize:clear

npm ci --include=dev
npm run build:ssr

php artisan migrate --force --no-interaction
php artisan portfolio:grant-admin --check --no-interaction
php artisan db:seed --class=ProjectSeeder --force --no-interaction

if [ ! -e public/storage ] && [ ! -L public/storage ]; then
    php artisan storage:link --no-interaction
fi

php artisan optimize
php artisan view:cache
php artisan event:cache
php artisan filament:optimize

mkdir -p storage/logs
php artisan inertia:stop-ssr --graceful --no-interaction
if php artisan inertia:check-ssr --no-interaction >/dev/null 2>&1; then
    echo "The old SSR process did not stop; refusing to accept stale renderer health."
    exit 1
fi
nohup php artisan inertia:start-ssr --no-interaction >> storage/logs/ssr.log 2>&1 < /dev/null &
ssr_pid=$!
ssr_ready=0
for attempt in {1..20}; do
    if ! kill -0 "$ssr_pid" 2>/dev/null; then
        echo "SSR exited during startup. Inspect storage/logs/ssr.log."
        exit 1
    fi
    if php artisan inertia:check-ssr --no-interaction >/dev/null 2>&1; then
        ssr_ready=1
        break
    fi
    sleep 1
done
if [ "$ssr_ready" -ne 1 ]; then
    echo "SSR did not become healthy. Inspect storage/logs/ssr.log and the hosting process limits."
    exit 1
fi

php artisan up
trap - EXIT
echo "Deployment complete; SSR health verified."
