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

Route::get('/blog', function () {
    return Inertia::render('blog/index', [
        'posts' => BlogPost::published()->latest('published_at')->get(),
    ]);
})->name('blog');

Route::get('/blog/{blogPost:slug}', function (BlogPost $blogPost) {
    return Inertia::render('blog/show', [
        'post' => $blogPost,
    ]);
})->name('blog.show');

require __DIR__.'/settings.php';
