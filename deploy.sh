#!/bin/bash
set -e

echo "Starting Hostinger Deployment Process..."

# 1. Take the application offline to prevent incomplete user requests
php artisan down || true

# 2. Update PHP dependencies via Composer
echo "Installing Composer dependencies..."
composer install --no-interaction --prefer-dist --optimize-autoloader --no-dev

# 3. Build assets are handled via Git (Commited to repo)
# No longer building on server to avoid memory issues

# 4. Migrate the database (Force required for production)
echo "Running database migrations..."
php artisan migrate --force

# 5. Clear old caches and optimize the application
echo "Caching configurations and routes..."
php artisan optimize:clear
php artisan optimize
php artisan view:cache
php artisan event:cache

# 6. Optimize Filament Admin Panel
echo "Optimizing Filament..."
php artisan filament:optimize

# 7. Bring the application back online
php artisan up

echo "Deployment finished successfully! 🚀"
