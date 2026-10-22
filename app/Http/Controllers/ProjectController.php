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
            'seo' => PublicPortfolio::seo('Projects', 'AI agents, coding-agent coordination and Laravel applications. Read the architecture, decisions and limits behind each case study.', '/projects'),
            'projects' => Project::query()->orderBy('sort_order')->get(Project::SUMMARY_FIELDS)->map(PublicPortfolio::project(...)),
        ]);
    }

    public function show(Project $project): Response
    {
        abort_unless($project->is_flagship, 404);
        $architecture = PublicPortfolio::mediaImage($project->architecture_image);

        return Inertia::render('projects/show', [
            'site' => PublicPortfolio::site(),
            'seo' => PublicPortfolio::seo($project->title.' — Case study', $project->description, route('projects.show', $project, false), route('og.project', $project, false)),
            'project' => [
                ...PublicPortfolio::project($project),
                'role' => $project->role ?? '', 'problem' => $project->problem ?? '',
                'decisions' => $project->decisions ?? [], 'results' => $project->results ?? [],
                'architecture_image' => $architecture['url'] ?? null,
                'architecture_width' => $architecture['width'] ?? null,
                'architecture_height' => $architecture['height'] ?? null,
                'video_url' => PublicPortfolio::webUrl($project->video_url),
                'body_html' => SafeContent::markdown($project->body),
            ],
        ]);
    }
}
