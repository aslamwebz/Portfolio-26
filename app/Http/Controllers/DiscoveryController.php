<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use App\Models\Project;
use App\Support\PublicPortfolio;
use Illuminate\Http\Response;

class DiscoveryController extends Controller
{
    public function sitemap(): Response
    {
        return response()->view('discovery.sitemap', [
            'base' => rtrim(PublicPortfolio::site()['site_url'], '/'),
            'projects' => Project::query()->where('is_flagship', true)->whereNotNull('slug')->get(['slug', 'updated_at']),
            'posts' => BlogPost::published()->get(['slug', 'updated_at']),
        ])->header('Content-Type', 'application/xml; charset=UTF-8');
    }

    public function feed(): Response
    {
        return response()->view('discovery.feed', [
            'site' => PublicPortfolio::site(),
            'posts' => BlogPost::published()->latest('published_at')->limit(50)->get(['title', 'slug', 'excerpt', 'published_at']),
        ])->header('Content-Type', 'application/rss+xml; charset=UTF-8');
    }

    public function robots(): Response
    {
        $base = rtrim(PublicPortfolio::site()['site_url'], '/');

        return response("User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /login\nSitemap: {$base}/sitemap.xml\n")
            ->header('Content-Type', 'text/plain; charset=UTF-8');
    }
}
