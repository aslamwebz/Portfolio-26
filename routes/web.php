<?php

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
    ]);
})->name('home');

Route::get('admin', function () {
    return Inertia::render('admin');
})->middleware(['auth', 'verified'])->name('admin');

Route::get('/projects', function () {
    return Inertia::render('projects/index', [
        'dbProjects' => Project::orderBy('sort_order')->get(),
    ]);
})->name('projects');

require __DIR__ . '/settings.php';
