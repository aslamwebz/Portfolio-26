<?php

use App\Models\BlogPost;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('home renders small public summaries and no account links', function () {
    BlogPost::factory()->create(['is_published' => true, 'published_at' => now()->subDay(), 'content' => 'PRIVATE LARGE BODY']);
    BlogPost::factory()->create(['is_published' => false]);

    $this->get('/')->assertOk()->assertInertia(fn (Assert $page) => $page
        ->component('home')->has('flagships')->has('otherWork')->has('certifications')
        ->has('posts', 1)->missing('posts.0.content')->has('site.email')
    );
});

test('new is a permanent redirect to the one homepage', function () {
    $this->get('/new')->assertStatus(301)->assertRedirect('/');
});

test('public project and blog pages use their dedicated components', function () {
    $this->get('/projects')->assertOk()->assertInertia(fn (Assert $page) => $page->component('projects/index')->has('projects'));
    $this->get('/blog')->assertOk()->assertInertia(fn (Assert $page) => $page->component('blog/index')->has('posts.data'));
});

test('the admin panel admits only explicitly authorized accounts', function () {
    $this->get('/admin')->assertRedirect('/admin/login');
    $ordinary = User::factory()->create();
    $this->actingAs($ordinary)->get('/admin')->assertForbidden();
    $owner = User::factory()->create();
    $owner->forceFill(['is_admin' => true])->save();
    $this->actingAs($owner)->get('/admin')->assertOk();
});

test('owner bootstrap grants an existing account without creating or changing others', function () {
    $owner = User::factory()->create();
    $other = User::factory()->create();
    $this->artisan('portfolio:grant-admin', ['email' => $owner->email])->assertSuccessful();
    expect($owner->fresh()->is_admin)->toBeTrue()->and($other->fresh()->is_admin)->toBeFalse();
    $this->artisan('portfolio:grant-admin', ['email' => 'absent@example.com'])->assertFailed();
    expect(User::count())->toBe(2);
});

test('theme defaults to dark and honors only valid explicit preferences', function () {
    $response = $this->get('/')->assertOk();
    expect(preg_match('/<html[^>]+class="[^"]*\bdark\b/', $response->getContent()))->toBe(1);
    $response = $this->withUnencryptedCookie('appearance', 'light')->get('/')->assertOk();
    expect(preg_match('/<html[^>]+class="[^"]*\bdark\b/', $response->getContent()))->toBe(0);
    $response = $this->withUnencryptedCookie('appearance', 'invalid')->get('/')->assertOk();
    expect(preg_match('/<html[^>]+class="[^"]*\bdark\b/', $response->getContent()))->toBe(1);
});

test('deployment readiness requires an explicitly authorized owner', function () {
    $this->artisan('portfolio:grant-admin', ['--check' => true])->assertFailed();
    $owner = User::factory()->create();
    $owner->forceFill(['is_admin' => true])->save();
    $this->artisan('portfolio:grant-admin', ['--check' => true])->assertSuccessful();
});
