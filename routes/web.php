<?php

use App\Models\BlogPost;
use App\Models\Certification;
use App\Models\Project;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('Dashboard', [
        'canRegister' => Features::enabled(Features::registration()),
        'dbProjects' => Project::orderBy('sort_order')->get(),
        'dbCertifications' => Certification::orderBy('sort_order')->get(),
        'dbBlogPosts' => BlogPost::published()->latest('published_at')->take(3)->get(),
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

use Illuminate\Http\Request;

Route::get('/blog', function (Request $request) {
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

require __DIR__ . '/settings.php';
