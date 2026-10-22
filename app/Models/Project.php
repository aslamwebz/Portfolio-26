<?php

namespace App\Models;

use Database\Factories\ProjectFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    /** @use HasFactory<ProjectFactory> */
    use HasFactory;

    public const SUMMARY_FIELDS = ['id', 'title', 'slug', 'description', 'image', 'is_flagship', 'technologies', 'category', 'repo_url', 'demo_url'];

    protected $fillable = [
        'title', 'description', 'image', 'link', 'github', 'technologies', 'category', 'sort_order', 'is_featured',
        'slug', 'is_flagship', 'role', 'problem', 'decisions', 'results', 'architecture_image', 'repo_url', 'demo_url', 'video_url', 'body',
    ];

    protected function casts(): array
    {
        return ['technologies' => 'array', 'is_featured' => 'boolean', 'is_flagship' => 'boolean', 'decisions' => 'array', 'results' => 'array'];
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
