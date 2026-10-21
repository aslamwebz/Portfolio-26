<?php

use App\Models\BlogPost;
use App\Models\Certification;
use App\Models\Project;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia;

uses(RefreshDatabase::class);

test('the new portfolio page renders with projects, certifications and published posts', function () {
    $project = Project::create([
        'title' => 'TeamBoard',
        'description' => 'Multi-tenant project and billing management.',
        'technologies' => ['Laravel', 'PHP', 'MySQL'],
        'category' => 'SaaS',
        'sort_order' => 1,
    ]);

    $certification = Certification::create([
        'name' => 'CCNA Routing and Switching',
        'issuer' => 'Cisco',
        'year' => '2015',
        'sort_order' => 1,
    ]);

    $published = BlogPost::factory()->create([
        'title' => 'The Silent Killer',
        'is_published' => true,
        'published_at' => now()->subDay(),
    ]);

    BlogPost::factory()->create([
        'title' => 'Unfinished draft',
        'is_published' => false,
        'published_at' => null,
    ]);

    $this->get('/new')
        ->assertOk()
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->component('new')
            ->has('dbProjects', 1)
            ->where('dbProjects.0.title', $project->title)
            ->has('dbCertifications', 1)
            ->where('dbCertifications.0.name', $certification->name)
            ->has('dbBlogPosts', 1)
            ->where('dbBlogPosts.0.title', $published->title)
        );
});

test('the new portfolio page does not ship full article bodies to the index', function () {
    BlogPost::factory()->create([
        'content' => 'A very long article body that the landing page never renders.',
        'is_published' => true,
        'published_at' => now()->subDay(),
    ]);

    $this->get('/new')
        ->assertOk()
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->has('dbBlogPosts.0.excerpt')
            ->missing('dbBlogPosts.0.content')
        );
});
