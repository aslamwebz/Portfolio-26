<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\SiteSetting;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        SiteSetting::current();
        DB::transaction(function (): void {
            $settings = SiteSetting::query()->lockForUpdate()->findOrFail(1);
            if ($settings->content_seeded_at) {
                return;
            }

            $other = json_decode(file_get_contents(database_path('data/other-projects.json')), true, flags: JSON_THROW_ON_ERROR);
            foreach ($other as $item) {
                $previous = Arr::pull($item, 'previous_description');
                $project = Project::query()->firstOrCreate(['title' => $item['title']], $item);
                if ($project->description === $previous) {
                    $project->update(['description' => $item['description']]);
                }
            }

            $cases = json_decode(file_get_contents(database_path('data/case-studies.json')), true, flags: JSON_THROW_ON_ERROR);
            foreach ($cases as $index => $case) {
                $project = Project::query()->where('repo_url', $case['repo_url'])->orWhere('github', $case['repo_url'])->orWhere('slug', $case['slug'])->first();
                if (! $project) {
                    Project::create([...$case, 'is_flagship' => true, 'sort_order' => -30 + $index]);
                } elseif (! filled($project->problem) && ! filled($project->body)) {
                    $attributes = Arr::only($case, ['role', 'problem', 'decisions', 'results', 'body', 'repo_url']);
                    if ($project->description === 'The Ultimate AI-Powered Job Application Suite. Leverage AI to build stunning resumes, optimize for ATS, analyze CVs, and prepare for interviews.') {
                        $attributes['description'] = $case['description'];
                    }
                    $project->update([...$attributes, 'is_flagship' => true, 'sort_order' => -30 + $index]);
                }
            }

            $settings->forceFill(['content_seeded_at' => now()])->save();
        });
    }
}
