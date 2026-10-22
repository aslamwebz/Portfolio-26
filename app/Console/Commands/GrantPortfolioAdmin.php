<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class GrantPortfolioAdmin extends Command
{
    protected $signature = 'portfolio:grant-admin {email? : Exact email of an existing owner account} {--revoke : Remove panel access} {--check : Check that an owner has been authorized}';

    protected $description = 'Grant or revoke portfolio admin access for an existing account';

    public function handle(): int
    {
        if ($this->option('check')) {
            if (User::query()->where('is_admin', true)->exists()) {
                $this->info('An authorized owner account exists.');

                return self::SUCCESS;
            }
            $this->error('Authorize the existing owner first: php artisan portfolio:grant-admin owner@example.com');

            return self::FAILURE;
        }
        $user = User::query()->where('email', $this->argument('email'))->first();
        if (! $user) {
            $this->error('No existing account has that email. No account was created.');

            return self::FAILURE;
        }

        $user->forceFill(['is_admin' => ! $this->option('revoke')])->save();
        $this->info($this->option('revoke') ? 'Panel access revoked.' : 'Panel access granted.');

        return self::SUCCESS;
    }
}
