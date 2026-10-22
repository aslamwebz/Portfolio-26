<?php

namespace App\Support;

use App\Models\BlogPost;
use App\Models\Project;
use App\Models\SiteSetting;

class PublicPortfolio
{
    /** @return array<string, mixed> */
    public static function site(): array
    {
        $settings = SiteSetting::current();

        return [
            'name' => 'Mohamed Aslam', 'email' => $settings->email,
            'github_url' => self::webUrl($settings->github_url),
            'linkedin_url' => self::webUrl($settings->linkedin_url),
            'site_url' => self::webUrl($settings->site_url) ?? 'https://mohamedaslam.dev',
            'cv_url' => CvFile::resolve($settings->cv_path) ? '/cv' : null,
            'availability' => $settings->availability,
            'location' => $settings->location ?: 'TODO: location',
            'timezone' => $settings->timezone ?: 'TODO: time zone', 'year' => now()->year,
        ];
    }

    /** @return array<string, mixed> */
    public static function project(Project $project): array
    {
        return [
            'id' => $project->id, 'title' => $project->title,
            'description' => $project->description, 'slug' => $project->slug, 'is_flagship' => $project->is_flagship,
            'technologies' => $project->technologies ?? [], 'category' => $project->category,
            'repo_url' => self::webUrl($project->repo_url), 'demo_url' => self::webUrl($project->demo_url),
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

    public static function mediaUrl(?string $path): ?string
    {
        if (! $path || str_contains($path, '..') || str_contains($path, ':') || str_contains($path, '\\') || ! preg_match('/\.(webp|avif|png|jpe?g)$/i', $path)) {
            return null;
        }

        return str_starts_with($path, '/') ? $path : '/storage/'.$path;
    }
}
