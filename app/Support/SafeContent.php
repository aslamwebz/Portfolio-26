<?php

namespace App\Support;

use Illuminate\Support\Str;
use Symfony\Component\HtmlSanitizer\HtmlSanitizer;
use Symfony\Component\HtmlSanitizer\HtmlSanitizerConfig;

class SafeContent
{
    public static function html(?string $html): string
    {
        $config = (new HtmlSanitizerConfig)->allowSafeElements()
            ->allowRelativeLinks()->allowRelativeMedias()
            ->allowLinkSchemes(['https', 'http', 'mailto'])
            ->allowMediaSchemes(['https'])->allowAttribute('class', ['code', 'pre'])
            ->dropElement('script')->dropElement('style')->dropElement('iframe')
            ->withMaxInputLength(1000000);
        $safe = (new HtmlSanitizer($config))->sanitize($html ?? '');

        return preg_replace('/<(\/?)h1(\s[^>]*)?>/i', '<$1h2$2>', $safe) ?? '';
    }

    public static function markdown(?string $markdown): string
    {
        return self::html(Str::markdown($markdown ?? '', ['html_input' => 'strip', 'allow_unsafe_links' => false]));
    }
}
