<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('site_settings', function (Blueprint $table): void {
            $table->id();
            $table->string('cv_path')->nullable();
            $table->string('availability');
            $table->string('email');
            $table->string('github_url')->nullable();
            $table->string('linkedin_url')->nullable();
            $table->string('site_url');
            $table->string('location')->nullable();
            $table->string('timezone')->nullable();
            $table->timestamp('content_seeded_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('site_settings');
    }
};
