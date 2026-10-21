<?php

use App\Models\BlogPost;
use App\Models\Certification;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('Dashboard', [
        'canRegister' => Features::enabled(Features::registration()),
        'dbProjects' => Project::orderBy('sort_order')->get(),
        'dbCertifications' => Certification::orderBy('sort_order')->get(),
        'dbBlogPosts' => Schema::hasTable('blog_posts')
            ? BlogPost::published()->latest('published_at')->take(3)->get()
            : collect(),
    ]);
})->name('home');

Route::get('dashboard', function () {
    return Inertia::render('user-dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/projects', function () {
    return Inertia::render('projects/index', [
        'dbProjects' => Project::orderBy('sort_order')->get(),
    ]);
})->name('projects');

Route::get('/new', function () {
    return Inertia::render('new', [
        'dbProjects' => Project::orderBy('sort_order')->get(),
        'dbCertifications' => Certification::orderBy('sort_order')->get(),
        'dbBlogPosts' => Schema::hasTable('blog_posts')
            ? BlogPost::published()
                ->select(['id', 'title', 'slug', 'excerpt', 'category', 'published_at', 'reading_time'])
                ->latest('published_at')
                ->get()
            : collect(),
    ]);
})->name('new');

Route::get('/blog', function (Request $request) {
    if (! Schema::hasTable('blog_posts')) {
        return Inertia::render('blog/index', [
            'posts' => [],
            'filters' => [
                'search' => $request->input('search'),
                'category' => $request->input('category'),
            ],
            'categories' => [],
        ]);
    }

    $search = $request->input('search');
    $category = $request->input('category');

    $query = BlogPost::published();

    if ($search) {
        $query->where(function ($q) use ($search) {
            $q->where('title', 'like', "%{$search}%")
                ->orWhere('excerpt', 'like', "%{$search}%")
                ->orWhere('content', 'like', "%{$search}%");
        });
    }

    if ($category && $category !== 'All') {
        $query->where('category', $category);
    }

    return Inertia::render('blog/index', [
        'posts' => $query->latest('published_at')->get(),
        'filters' => [
            'search' => $search,
            'category' => $category,
        ],
        'categories' => BlogPost::published()->distinct()->pluck('category')->toArray(),
    ]);
})->name('blog');

Route::get('/blog/{blogPost:slug}', function (BlogPost $blogPost) {
    return Inertia::render('blog/show', [
        'post' => $blogPost,
    ]);
})->name('blog.show');

require __DIR__.'/settings.php';
