<?php

use App\Models\BlogPost;
use Inertia\Testing\AssertableInertia as Assert;

test('the alternate homepage redirects permanently', function () {
    $this->get('/new')->assertStatus(301)->assertRedirect('/');
});

test('home does not ship full article bodies', function () {
    BlogPost::factory()->create(['content' => 'A body not needed on the home page', 'is_published' => true, 'published_at' => now()->subDay()]);
    $this->get('/')->assertInertia(fn (Assert $page) => $page->component('home')->has('posts.0.excerpt')->missing('posts.0.content'));
});
