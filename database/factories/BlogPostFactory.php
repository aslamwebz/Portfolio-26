<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BlogPost>
 */
class BlogPostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->sentence();

        return [
            'title' => $title,
            'slug' => Str::slug($title),
            'excerpt' => fake()->paragraph(),
            'content' => '<p>' . implode('</p><p>', fake()->paragraphs(3)) . '</p>',
            'featured_image' => null,
            'category' => fake()->randomElement(['Laravel', 'PHP', 'Database', 'DevOps', 'Frontend', 'Career', 'General']),
            'tags' => ['Tech', 'Coding'],
            'is_published' => fake()->boolean(80),
            'published_at' => fake()->dateTimeBetween('-1 year', 'now'),
            'author' => 'Mohamed Aslam',
            'reading_time' => fake()->numberBetween(3, 15),
            'sort_order' => 0,
        ];
    }
}
