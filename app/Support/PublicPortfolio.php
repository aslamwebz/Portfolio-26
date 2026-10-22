<?php

namespace App\Support;

use App\Models\BlogPost;
use App\Models\Project;

class PublicPortfolio
{
    /** @return array<string, mixed> */
    public static function site(): array
    {
        return [
            'name' => 'Mohamed Aslam',
            'email' => 'aslam4webz@gmail.com',
            'github_url' => 'https://github.com/aslamwebz',
            'linkedin_url' => 'https://www.linkedin.com/in/aslamwebz/',
            'site_url' => 'https://mohamedaslam.dev',
            'cv_url' => is_file(public_path('Resume.pdf')) ? '/Resume.pdf' : null,
            'availability' => 'Open to AI engineering roles — full-time or contract, remote',
            'location' => 'TODO: location',
            'timezone' => 'TODO: time zone',
            'year' => now()->year,
        ];
    }

    /** @return array<string, mixed> */
    public static function project(Project $project): array
    {
        return [
            'id' => $project->id, 'title' => $project->title,
            'description' => $project->description, 'slug' => null, 'is_flagship' => false,
            'technologies' => $project->technologies ?? [], 'category' => $project->category,
            'repo_url' => self::webUrl($project->github), 'demo_url' => self::webUrl($project->link),
        ];
    }

    /** @return array<string, mixed> */
    public static function post(BlogPost $post): array
    {
        return $post->only(['id', 'title', 'slug', 'excerpt', 'category', 'published_at', 'reading_time', 'author']);
    }

    public static function webUrl(?string $url): ?string
    {
        return $url && filter_var($url, FILTER_VALIDATE_URL) && in_array(parse_url($url, PHP_URL_SCHEME), ['http', 'https'], true) ? $url : null;
    }
}
