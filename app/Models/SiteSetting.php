<?php

namespace App\Models;

use Database\Factories\SiteSettingFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SiteSetting extends Model
{
    /** @use HasFactory<SiteSettingFactory> */
    use HasFactory;

    protected $fillable = ['cv_path', 'availability', 'email', 'github_url', 'linkedin_url', 'site_url', 'location', 'timezone'];

    protected function casts(): array
    {
        return ['content_seeded_at' => 'datetime'];
    }

    public static function current(): self
    {
        return self::query()->firstOrCreate(['id' => 1], [
            'cv_path' => 'Resume.pdf',
            'availability' => 'Open to AI engineering roles — full-time or contract, remote',
            'email' => 'aslam4webz@gmail.com',
            'github_url' => 'https://github.com/aslamwebz',
            'linkedin_url' => 'https://www.linkedin.com/in/aslamwebz/',
            'site_url' => 'https://mohamedaslam.dev',
            'location' => 'TODO: location', 'timezone' => 'TODO: time zone',
        ]);
    }
}
