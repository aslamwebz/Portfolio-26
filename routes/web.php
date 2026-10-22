<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\CvController;
use App\Http\Controllers\DiscoveryController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\SocialImageController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');

Route::get('/projects', [ProjectController::class, 'index'])->name('projects');
Route::get('/projects/{project:slug}', [ProjectController::class, 'show'])->name('projects.show');
Route::get('/cv', CvController::class)->name('cv');
Route::get('/sitemap.xml', [DiscoveryController::class, 'sitemap'])->name('sitemap');
Route::get('/feed.xml', [DiscoveryController::class, 'feed'])->name('feed');
Route::get('/robots.txt', [DiscoveryController::class, 'robots'])->name('robots');
Route::get('/og/home.png', [SocialImageController::class, 'home'])->name('og.home');
Route::get('/og/projects/{project:slug}.png', [SocialImageController::class, 'project'])->name('og.project');
Route::get('/og/blog/{blogPost:slug}.png', [SocialImageController::class, 'post'])->name('og.post');

Route::permanentRedirect('/new', '/')->name('new');

Route::get('/blog', [BlogController::class, 'index'])->name('blog');

Route::get('/blog/{blogPost:slug}', [BlogController::class, 'show'])->name('blog.show');
