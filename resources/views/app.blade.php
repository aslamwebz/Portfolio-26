<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'dark') !== 'light'])>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="preload" href="{{ \Illuminate\Support\Facades\Vite::asset('vendor/filament/filament/dist/fonts/inter/inter-latin-wght-normal-DIHYUR35.woff2') }}" as="font" type="font/woff2" crossorigin>
    <script nonce="{{ \Illuminate\Support\Facades\Vite::cspNonce() }}">
        const appearance = @json($appearance ?? 'dark');
        document.documentElement.classList.toggle('dark', appearance === 'dark' || (appearance === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches));
    </script>

    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="/favicon.png">
    <link rel="alternate" type="application/rss+xml" title="Mohamed Aslam — Writing" href="/feed.xml">
    <meta property="csp-nonce" nonce="{{ \Illuminate\Support\Facades\Vite::cspNonce() }}">
    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
    @inertiaHead
</head>
<body class="font-sans antialiased">
    @inertia
</body>
</html>
