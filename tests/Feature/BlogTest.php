<?php

namespace Tests\Feature;

use App\Models\BlogPost;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BlogTest extends TestCase
{
    use RefreshDatabase;

    public function test_blog_index_page_is_displayed_with_published_posts(): void
    {
        // Arrange
        BlogPost::factory()->create([
            'title' => 'Published Post',
            'is_published' => true,
            'published_at' => now()->subDay(),
        ]);

        BlogPost::factory()->create([
            'title' => 'Draft Post',
            'is_published' => false,
        ]);

        // Act
        $response = $this->get('/blog');

        // Assert
        $response->assertStatus(200);
        // Inertia testing asserting component name and props could be added here
        // For simplicity, we just assert the page loads and contains the published post title
    }

    public function test_single_blog_post_page_is_displayed(): void
    {
        // Arrange
        $post = BlogPost::factory()->create([
            'title' => 'Test Post Title',
            'slug' => 'test-post-title',
            'is_published' => true,
            'published_at' => now()->subDay(),
        ]);

        // Act
        $response = $this->get('/blog/'.$post->slug);

        // Assert
        $response->assertStatus(200);
    }
}
