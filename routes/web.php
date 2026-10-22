<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');

Route::get('/projects', [ProjectController::class, 'index'])->name('projects');

Route::permanentRedirect('/new', '/')->name('new');

Route::get('/blog', [BlogController::class, 'index'])->name('blog');

Route::get('/blog/{blogPost:slug}', [BlogController::class, 'show'])->name('blog.show');
