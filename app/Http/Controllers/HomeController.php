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
        return Inertia::render('home', [
            'site' => PublicPortfolio::site(),
            'flagships' => [],
            'otherWork' => Project::query()->orderBy('sort_order')->get()->map(PublicPortfolio::project(...)),
            'certifications' => Certification::query()->orderBy('sort_order')->get(['id', 'name', 'issuer', 'year', 'image']),
            'posts' => BlogPost::published()->latest('published_at')->limit(3)->get()->map(PublicPortfolio::post(...)),
        ]);
    }
}
