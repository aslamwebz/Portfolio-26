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
        $posts = BlogPost::published()
            ->when($search !== '', fn (Builder $query) => $query->where(fn (Builder $q) => $q->where('title', 'like', '%'.$search.'%')->orWhere('excerpt', 'like', '%'.$search.'%')))
            ->when($category !== '' && $category !== 'All', fn (Builder $q) => $q->where('category', $category))
            ->latest('published_at')->orderByDesc('id')->paginate(9)->withQueryString()->through(PublicPortfolio::post(...));

        return Inertia::render('blog/index', [
            'site' => PublicPortfolio::site(),
            'posts' => $posts,
            'filters' => ['search' => $search, 'category' => $category],
            'categories' => BlogPost::published()->distinct()->orderBy('category')->pluck('category'),
        ]);
    }

    public function show(BlogPost $blogPost): Response
    {
        abort_unless(BlogPost::published()->whereKey($blogPost->id)->exists(), 404);

        return Inertia::render('blog/show', [
            'site' => PublicPortfolio::site(),
            'post' => [...PublicPortfolio::post($blogPost), 'content' => SafeContent::html($blogPost->content), 'tags' => $blogPost->tags ?? []],
        ]);
    }
}
