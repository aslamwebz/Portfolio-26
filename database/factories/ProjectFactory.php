<?php

namespace Database\Factories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends Factory<Project> */
class ProjectFactory extends Factory
{
    public function definition(): array
    {
        return [
            'title' => fake()->unique()->sentence(3), 'slug' => fake()->unique()->slug(),
            'description' => fake()->sentence(), 'category' => 'AI',
            'technologies' => ['PHP', 'Laravel'], 'is_flagship' => false,
            'role' => 'Independent developer', 'problem' => 'A documented engineering problem.',
            'decisions' => [], 'results' => [], 'body' => '## Hard problems'.PHP_EOL.PHP_EOL.'A working example.',
        ];
    }
}
