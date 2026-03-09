<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        $projects = [
            [
                'title' => 'Penny Pilot',
                'description' => 'Pilot Your Finances - A comprehensive financial tracking and management application built for speed and precision.',
                'image' => 'img/projects/penny pilot.png',
                'github' => 'https://github.com/aslamwebz/Penny-Pilot',
                'link' => 'https://penny-pilot-x.vercel.app',
                'technologies' => json_encode(['React', 'Bun', 'Capacitor', 'Tailwind CSS', 'Vite']),
                'category' => 'Fullstack',
                'sort_order' => 1,
                'is_featured' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Vanguard',
                'description' => 'Premium business landing page and management system with advanced layout optimization and error handling.',
                'image' => 'img/projects/vanguard.png',
                'github' => 'https://github.com/aslamwebz/Vanguard',
                'link' => 'https://vanguard-co.vercel.app',
                'technologies' => json_encode(['React', 'Bun', 'Tailwind CSS', 'Shadcn/UI']),
                'category' => 'UI/UX',
                'sort_order' => 2,
                'is_featured' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Webz-Admin',
                'description' => 'Comprehensive enterprise admin dashboard featuring real-time analytics, reports, and deep theme customization.',
                'image' => 'img/projects/webzadmin.png',
                'github' => 'https://github.com/aslamwebz/webz-admin',
                'link' => 'https://webz-admin.vercel.app',
                'technologies' => json_encode(['Vue', 'Shadcn Vue', 'Tailwind CSS', 'Vite']),
                'category' => 'Enterprise',
                'sort_order' => 3,
                'is_featured' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'TeamBoard',
                'description' => 'Multi-Tenant Project & Billing Management SaaS system with vendor management and file preview features.',
                'image' => 'img/projects/Screenshot 2025-12-08 071446.png',
                'github' => 'https://github.com/aslamwebz/TeamBoard',
                'link' => null,
                'technologies' => json_encode(['Laravel', 'Blade', 'PHP', 'MySQL']),
                'category' => 'SaaS',
                'sort_order' => 4,
                'is_featured' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Sentinel Solutions',
                'description' => 'Modern corporate website for Security & Guarding Services with focus on reliability and professional aesthetics.',
                'image' => 'img/projects/Screenshot 2025-07-02 180804.png',
                'github' => 'https://github.com/aslamwebz/Sentinel-Solutions',
                'link' => 'https://sentinel-solutions.vercel.app',
                'technologies' => json_encode(['React', 'Bun', 'Tailwind CSS', 'Shadcn/UI']),
                'category' => 'Corporate',
                'sort_order' => 5,
                'is_featured' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'WineDine',
                'description' => 'Gourmet Experience - An elegant food and dining experience website with menu management and event tracking.',
                'image' => 'img/projects/Screenshot 2025-06-26 154446.png',
                'github' => 'https://github.com/aslamwebz/wine-dine',
                'link' => 'https://wine-dine.vercel.app',
                'technologies' => json_encode(['React', 'Bun', 'Tailwind CSS', 'Shadcn/UI']),
                'category' => 'Hospitality',
                'sort_order' => 6,
                'is_featured' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'HireAI',
                'description' => 'The Ultimate AI-Powered Job Application Suite. Leverage AI to build stunning resumes, optimize for ATS, analyze CVs, and prepare for interviews.',
                'image' => 'img/projects/hiareai.png',
                'github' => 'https://github.com/aslamwebz/HireAI',
                'link' => null,
                'technologies' => json_encode(['Laravel 12', 'Livewire 4', 'Flux UI', 'Tailwind CSS 4']),
                'category' => 'AI SaaS',
                'sort_order' => 7,
                'is_featured' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('projects')->truncate();
        DB::table('projects')->insert($projects);
    }
}
