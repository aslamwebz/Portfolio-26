<?php

namespace App\Http\Controllers;

use App\Http\Requests\BlogSearchRequest;
use App\Models\BlogPost;
use App\Support\PublicPortfolio;
use App\Support\SafeContent;
use Illuminate\Database\Eloquent\Builder;
use Inertia\Inertia;
use Inertia\Response;

class BlogController extends Controller
{
    public function index(BlogSearchRequest $request): Response
    {
        $filters = $request->safe()->only(['search', 'category']);
        $search = trim($filters['search'] ?? '');
        $category = $filters['category'] ?? '';
        $posts = BlogPost::published()->select(BlogPost::SUMMARY_FIELDS)
            ->when($search !== '', fn (Builder $query) => $query->where(fn (Builder $q) => $q->where('title', 'like', '%'.$search.'%')->orWhere('excerpt', 'like', '%'.$search.'%')))
            ->when($category !== '' && $category !== 'All', fn (Builder $q) => $q->where('category', $category))
            ->latest('published_at')->orderByDesc('id')->paginate(9)->withQueryString()->through(PublicPortfolio::post(...));

        return Inertia::render('blog/index', [
            'site' => PublicPortfolio::site(),
            'seo' => PublicPortfolio::seo('Writing', 'Notes on backend engineering, Laravel, application architecture and building AI systems.', '/blog', noindex: $search !== '' || $category !== '' || $posts->currentPage() > 1),
            'posts' => $posts,
            'filters' => ['search' => $search, 'category' => $category],
            'categories' => BlogPost::published()->distinct()->orderBy('category')->pluck('category'),
        ]);
    }

    public function show(BlogPost $blogPost): Response
    {
        abort_unless(BlogPost::published()->whereKey($blogPost->id)->exists(), 404);
        $site = PublicPortfolio::site();
        $seo = PublicPortfolio::seo($blogPost->title, $blogPost->excerpt, route('blog.show', $blogPost, false), route('og.post', $blogPost, false));
        $seo['schema'] = [
            '@context' => 'https://schema.org', '@type' => 'Article', 'headline' => $blogPost->title,
            'description' => $blogPost->excerpt, 'image' => $seo['image'], 'mainEntityOfPage' => $seo['canonical'],
            'datePublished' => $blogPost->published_at->toAtomString(), 'dateModified' => $blogPost->updated_at->toAtomString(),
            'author' => ['@type' => 'Person', 'name' => $blogPost->author, 'url' => $site['site_url']],
        ];

        return Inertia::render('blog/show', [
            'site' => $site,
            'seo' => $seo,
            'post' => [...PublicPortfolio::post($blogPost), 'content' => SafeContent::html($blogPost->content), 'tags' => $blogPost->tags ?? []],
        ]);
    }
}
