<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use App\Models\Certification;
use App\Models\Project;
use App\Support\PublicPortfolio;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __invoke(): Response
    {
        $site = PublicPortfolio::site();

        return Inertia::render('home', [
            'site' => $site,
            'seo' => PublicPortfolio::seo('Backend & AI systems', 'PHP/Laravel backend engineer building agents, LLM applications and the systems around them. Explore Freya, Forge and HireAI.', '/', schema: [
                '@context' => 'https://schema.org', '@type' => 'Person', 'name' => $site['name'],
                'url' => $site['site_url'], 'jobTitle' => 'Software Engineer', 'email' => 'mailto:'.$site['email'],
                'sameAs' => array_values(array_filter([$site['github_url'], $site['linkedin_url']])),
            ]),
            'flagships' => Project::query()->where('is_flagship', true)->whereNotNull('slug')->orderBy('sort_order')->limit(3)->get(Project::SUMMARY_FIELDS)->map(PublicPortfolio::project(...)),
            'otherWork' => Project::query()->where('is_flagship', false)->orderBy('sort_order')->get(Project::SUMMARY_FIELDS)->map(PublicPortfolio::project(...)),
            'certifications' => Certification::query()->orderBy('sort_order')->get(['id', 'name', 'issuer', 'year', 'image']),
            'posts' => BlogPost::published()->latest('published_at')->limit(3)->get(BlogPost::SUMMARY_FIELDS)->map(PublicPortfolio::post(...)),
        ]);
    }
}
