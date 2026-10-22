<?php

use App\Models\BlogPost;
use App\Models\Project;
use App\Models\SiteSetting;
use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;

test('the additive migration preserves legacy rows with colliding title suffixes', function () {
    $migration = require database_path('migrations/2026_10_22_164403_add_case_studies_to_projects_table.php');
    $migration->down();
    foreach (['foo-3', 'foo', 'foo'] as $index => $title) {
        DB::table('projects')->insert(['id' => $index + 1, 'title' => $title, 'description' => 'Legacy description', 'github' => 'https://example.com/repo', 'link' => 'https://example.com/demo', 'created_at' => now(), 'updated_at' => now()]);
    }
    $migration->up();
    $rows = DB::table('projects')->orderBy('id')->get();
    expect($rows)->toHaveCount(3)
        ->and($rows->pluck('slug')->unique())->toHaveCount(3)
        ->and($rows->pluck('title')->all())->toBe(['foo-3', 'foo', 'foo'])
        ->and($rows->pluck('description')->unique()->all())->toBe(['Legacy description'])
        ->and($rows->pluck('repo_url')->unique()->all())->toBe(['https://example.com/repo']);
});

test('flagship pages render editable decisions and results from storage', function () {
    $project = Project::factory()->create(['is_flagship' => true, 'slug' => 'example-system', 'decisions' => [['title' => 'Isolation', 'decision' => 'Separate workers', 'tradeoff' => 'More coordination']], 'results' => [['label' => 'Outcome', 'value' => 'TODO: measured result']]]);
    $this->get('/projects/example-system')->assertOk()->assertInertia(fn (Assert $page) => $page
        ->component('projects/show')->where('project.id', $project->id)
        ->where('project.decisions.0.title', 'Isolation')->where('project.results.0.value', 'TODO: measured result')
    );
    $project->update(['is_flagship' => false]);
    $this->get('/projects/example-system')->assertNotFound();
});

test('seeders retain existing rows and preserve subsequent editor changes', function () {
    $existing = Project::factory()->create(['title' => 'Existing custom project']);
    $post = BlogPost::factory()->create(['title' => 'Existing article']);
    $this->seed(DatabaseSeeder::class);
    $freya = Project::where('slug', 'freya')->firstOrFail();
    $freya->update(['description' => 'Edited by owner', 'body' => 'Owner revision', 'is_flagship' => false, 'results' => []]);
    $count = Project::count();
    $this->seed(DatabaseSeeder::class);
    expect(Project::count())->toBe($count)
        ->and($existing->fresh()->title)->toBe('Existing custom project')
        ->and($post->fresh()->title)->toBe('Existing article')
        ->and($freya->fresh()->description)->toBe('Edited by owner')
        ->and($freya->fresh()->body)->toBe('Owner revision')
        ->and($freya->fresh()->is_flagship)->toBeFalse()
        ->and($freya->fresh()->results)->toBe([]);
});

test('CV files are downloadable from the configured public disk', function () {
    Storage::fake('public');
    Storage::disk('public')->put('cv/current.pdf', "%PDF-1.4\nexample");
    SiteSetting::current()->update(['cv_path' => 'storage/cv/current.pdf']);
    $this->get('/cv')->assertOk()->assertDownload('Mohamed-Aslam-CV.pdf');
    $this->get('/')->assertInertia(fn (Assert $page) => $page->where('site.cv_url', '/cv'));
});

test('missing or unsafe CV files produce a graceful public state', function (string $path) {
    SiteSetting::current()->update(['cv_path' => $path]);
    $this->get('/cv')->assertNotFound();
    $this->get('/')->assertOk()->assertInertia(fn (Assert $page) => $page->where('site.cv_url', null));
})->with(['missing.pdf', '../../.env', 'https://example.com/resume.pdf', 'storage/../.env', 'Resume.pdf/../.env']);

test('the owner can edit all content resources and site settings', function () {
    $owner = User::factory()->create();
    $owner->forceFill(['is_admin' => true])->save();
    foreach (['/admin/projects/create', '/admin/blog-posts/create', '/admin/certifications/create', '/admin/site-settings'] as $url) {
        $this->actingAs($owner)->get($url)->assertOk();
    }
});

test('article HTML retains safe formatting and drops executable content', function () {
    $post = BlogPost::factory()->create(['is_published' => true, 'published_at' => now()->subDay(), 'content' => '<script>alert(1)</script><p onclick="evil()">Keep this text</p>']);
    $this->get('/blog/'.$post->slug)->assertInertia(fn (Assert $page) => $page->where('post.content', fn (string $html) => str_contains($html, 'Keep this text') && ! str_contains($html, '<script') && ! str_contains($html, 'onclick')));
});
