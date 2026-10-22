<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Support\PublicPortfolio;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('projects/index', [
            'site' => PublicPortfolio::site(),
            'projects' => Project::query()->orderBy('sort_order')->get()->map(PublicPortfolio::project(...)),
        ]);
    }
}
