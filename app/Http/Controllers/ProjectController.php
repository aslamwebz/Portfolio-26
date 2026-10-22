<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Support\PublicPortfolio;
use App\Support\SafeContent;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('projects/index', [
            'site' => PublicPortfolio::site(),
            'projects' => Project::query()->orderBy('sort_order')->get(Project::SUMMARY_FIELDS)->map(PublicPortfolio::project(...)),
        ]);
    }

    public function show(Project $project): Response
    {
        abort_unless($project->is_flagship, 404);

        return Inertia::render('projects/show', [
            'site' => PublicPortfolio::site(),
            'project' => [
                ...PublicPortfolio::project($project),
                'role' => $project->role ?? '', 'problem' => $project->problem ?? '',
                'decisions' => $project->decisions ?? [], 'results' => $project->results ?? [],
                'architecture_image' => PublicPortfolio::mediaUrl($project->architecture_image),
                'video_url' => PublicPortfolio::webUrl($project->video_url),
                'body_html' => SafeContent::markdown($project->body),
            ],
        ]);
    }
}
