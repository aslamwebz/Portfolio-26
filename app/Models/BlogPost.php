<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlogPost extends Model
{
    use HasFactory;

    public const SUMMARY_FIELDS = ['id', 'title', 'slug', 'excerpt', 'category', 'published_at', 'reading_time', 'author'];

    protected static function booted(): void
    {
        static::saving(function (BlogPost $post): void {
            if ($post->isDirty('content')) {
                $post->reading_time = max(1, (int) ceil(str_word_count(strip_tags($post->content ?? '')) / 200));
            }
        });
    }

    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'content',
        'featured_image',
        'category',
        'tags',
        'is_published',
        'published_at',
        'author',
        'reading_time',
        'sort_order',
    ];

    protected $casts = [
        'tags' => 'array',
        'is_published' => 'boolean',
        'published_at' => 'datetime',
    ];

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('is_published', true)
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now());
    }
}
