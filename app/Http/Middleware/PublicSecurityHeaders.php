<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Vite;
use Symfony\Component\HttpFoundation\Response;

class PublicSecurityHeaders
{
    /** @param Closure(Request): Response $next */
    public function handle(Request $request, Closure $next): Response
    {
        Vite::useCspNonce();
        $response = $next($request);
        $response->headers->set('X-Content-Type-Options', 'nosniff');
        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');
        $response->headers->set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
        if ($request->isSecure()) {
            $response->headers->set('Strict-Transport-Security', 'max-age=31536000');
        }

        if (! $request->is('admin', 'admin/*', 'livewire/*')) {
            $nonce = Vite::cspNonce();
            $dev = app()->isLocal() ? ' http://localhost:* http://127.0.0.1:*' : '';
            $connections = app()->isLocal() ? $dev.' ws://localhost:* ws://127.0.0.1:*' : '';
            $authStyles = $request->is('login', 'forgot-password', 'reset-password/*', 'two-factor-challenge', 'user/confirm-password', 'email/verify') ? "; style-src-attr 'unsafe-inline'" : '';
            $policy = "default-src 'self'; script-src 'self' 'nonce-{$nonce}'{$dev}; style-src 'self' 'nonce-{$nonce}'{$dev}; img-src 'self' data:; font-src 'self'; connect-src 'self'{$connections}; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'{$authStyles}";
            $response->headers->set('Content-Security-Policy', $policy);
        }

        return $response;
    }
}
