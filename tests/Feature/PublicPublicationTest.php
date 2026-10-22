<?php

use App\Models\BlogPost;
use App\Models\Project;
use Inertia\Testing\AssertableInertia as Assert;

test('drafts and future posts are excluded from every public surface', function () {
    $published = BlogPost::factory()->create(['title' => 'Visible note', 'is_published' => true, 'published_at' => now()->subDay()]);
    $draft = BlogPost::factory()->create(['slug' => 'private-draft', 'is_published' => false]);
    $future = BlogPost::factory()->create(['slug' => 'future-note', 'is_published' => true, 'published_at' => now()->addWeek()]);
    $this->get('/')->assertInertia(fn (Assert $page) => $page->has('posts', 1)->where('posts.0.id', $published->id));
    $this->get('/blog')->assertInertia(fn (Assert $page) => $page->has('posts.data', 1)->where('posts.data.0.id', $published->id));
    foreach ([$draft, $future] as $post) {
        $this->get('/blog/'.$post->slug)->assertNotFound();
        $this->get('/og/blog/'.$post->slug.'.png')->assertNotFound();
    }
    foreach (['/sitemap.xml', '/feed.xml'] as $path) {
        $this->get($path)->assertOk()->assertSee($published->slug)->assertDontSee($draft->slug)->assertDontSee($future->slug);
    }
});

test('only flagship projects have discoverable case study URLs and social images', function () {
    $flagship = Project::factory()->create(['slug' => 'public-system', 'is_flagship' => true]);
    $other = Project::factory()->create(['slug' => 'other-system', 'is_flagship' => false]);
    $this->get('/sitemap.xml')->assertOk()->assertSee('/projects/'.$flagship->slug)->assertDontSee('/projects/'.$other->slug);
    $this->get('/og/projects/'.$flagship->slug.'.png')->assertOk()->assertHeader('Content-Type', 'image/png');
    $this->get('/og/projects/'.$other->slug.'.png')->assertNotFound();
    $this->get('/og/home.png')->assertOk()->assertHeader('Content-Type', 'image/png');
});

test('search validates input and paginates only matching published summaries', function () {
    BlogPost::factory()->count(12)->create(['title' => 'Laravel architecture', 'is_published' => true, 'published_at' => now()->subDay()]);
    BlogPost::factory()->create(['title' => 'Unrelated', 'is_published' => true, 'published_at' => now()->subDay()]);
    $this->get('/blog?search=Laravel')->assertInertia(fn (Assert $page) => $page->has('posts.data', 9)->where('posts.total', 12)->missing('posts.data.0.content'));
    $this->get('/blog?search=Laravel&page=2')->assertInertia(fn (Assert $page) => $page->has('posts.data', 3)->where('posts.current_page', 2));
    $this->getJson('/blog?search[]=bad')->assertUnprocessable();
    $this->getJson('/blog?search='.str_repeat('x', 121))->assertUnprocessable();
    $this->get('/blog?search='.urlencode("' OR 1=1 --"))->assertInertia(fn (Assert $page) => $page->has('posts.data', 0));
});

test('article and case HTML cannot execute editor-supplied scripts or event handlers', function () {
    $post = BlogPost::factory()->create(['content' => '<h1>Nested title</h1><script>alert(1)</script><p onclick="alert(2)">Safe text</p><a href="javascript:alert(3)">Unsafe URL</a><pre><code class="language-php">echo 1;</code></pre>', 'is_published' => true, 'published_at' => now()->subDay()]);
    $this->get('/blog/'.$post->slug)->assertInertia(fn (Assert $page) => $page->where('post.content', fn (string $html) => str_contains($html, 'Safe text') && str_contains($html, '<h2>') && str_contains($html, 'language-php') && ! str_contains($html, '<script') && ! str_contains($html, 'onclick') && ! str_contains($html, 'javascript:')));
    $project = Project::factory()->create(['is_flagship' => true, 'body' => '<script>alert(1)</script> [unsafe](javascript:alert(2))']);
    $this->get('/projects/'.$project->slug)->assertInertia(fn (Assert $page) => $page->where('project.body_html', fn (string $html) => ! str_contains($html, '<script') && ! str_contains($html, 'javascript:')));
});

test('public responses contain security headers and a nonce-based CSP', function () {
    foreach (['/', '/projects', '/blog', '/sitemap.xml', '/feed.xml'] as $path) {
        $response = $this->get($path)->assertOk()->assertHeader('X-Content-Type-Options', 'nosniff')->assertHeader('Referrer-Policy', 'strict-origin-when-cross-origin')->assertHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
        expect($response->headers->get('Content-Security-Policy'))->toContain("script-src 'self' 'nonce-")->not->toContain("'unsafe-inline'");
    }
    $this->get('https://localhost/')->assertHeader('Strict-Transport-Security', 'max-age=31536000');
});

test('reading time and metadata reflect published stored content', function () {
    $post = BlogPost::factory()->create(['title' => 'A real title', 'content' => str_repeat('word ', 450), 'is_published' => true, 'published_at' => now()->subDay()]);
    expect($post->reading_time)->toBe(3);
    $this->get('/blog/'.$post->slug)->assertInertia(fn (Assert $page) => $page->where('seo.title', 'A real title')->where('seo.canonical', 'https://mohamedaslam.dev/blog/'.$post->slug)->where('seo.image', 'https://mohamedaslam.dev/og/blog/'.$post->slug.'.png'));
    $this->get('/robots.txt')->assertOk()->assertSee('Sitemap: https://mohamedaslam.dev/sitemap.xml');
});

test('missing and external architecture media fall back to the built-in diagram', function (string $image) {
    $project = Project::factory()->create(['is_flagship' => true, 'architecture_image' => $image]);
    $this->get('/projects/'.$project->slug)->assertInertia(fn (Assert $page) => $page->where('project.architecture_image', null));
})->with(['architecture/missing.png', '//external.example/track.png', '../../.env']);
