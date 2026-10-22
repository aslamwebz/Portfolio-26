<?php

namespace Database\Factories;

use App\Models\SiteSetting;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends Factory<SiteSetting> */
class SiteSettingFactory extends Factory
{
    public function definition(): array
    {
        return [
            'cv_path' => null, 'availability' => 'Open to remote roles',
            'email' => fake()->safeEmail(), 'site_url' => 'https://mohamedaslam.dev',
            'location' => 'TODO: location', 'timezone' => 'TODO: time zone',
        ];
    }
}
