<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('projects', function (Blueprint $table): void {
            $table->string('slug')->nullable()->unique();
            $table->boolean('is_flagship')->default(false)->index();
            $table->text('role')->nullable();
            $table->text('problem')->nullable();
            $table->json('decisions')->nullable();
            $table->json('results')->nullable();
            $table->string('architecture_image')->nullable();
            $table->string('repo_url')->nullable();
            $table->string('demo_url')->nullable();
            $table->string('video_url')->nullable();
            $table->longText('body')->nullable();
        });

        foreach (DB::table('projects')->orderBy('id')->lazyById() as $project) {
            $base = Str::slug($project->title) ?: 'project';
            $slug = DB::table('projects')->where('slug', $base)->exists() ? $base.'-'.$project->id : $base;
            DB::table('projects')->where('id', $project->id)->update([
                'slug' => $slug, 'repo_url' => $project->github, 'demo_url' => $project->link,
            ]);
        }
    }

    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table): void {
            $table->dropUnique(['slug']);
            $table->dropIndex(['is_flagship']);
            $table->dropColumn(['slug', 'is_flagship', 'role', 'problem', 'decisions', 'results', 'architecture_image', 'repo_url', 'demo_url', 'video_url', 'body']);
        });
    }
};
