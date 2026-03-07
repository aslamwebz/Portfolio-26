<?php

namespace Database\Seeders;

use App\Models\Certification;
use Illuminate\Database\Seeder;

class CertificationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $certifications = [
            [
                'name' => 'AI Fluency: Framework & Foundations',
                'issuer' => 'Anthropic',
                'year' => '2026',
                'description' => 'Comprehensive framework and foundations for AI literacy and implementation.',
                'image' => '/img/certifications/certificate-izxy3mfx32iw-1772606207.jpg',
                'sort_order' => 1,
            ],
            [
                'name' => 'Claude Code in Action',
                'issuer' => 'Anthropic',
                'year' => '2026',
                'description' => 'Practical implementation of Claude Code for development workflows.',
                'image' => '/img/certifications/certificate-g8bsaiwfgzw3-1772528875.jpg',
                'sort_order' => 2,
            ],
            [
                'name' => 'Claude 101',
                'issuer' => 'Anthropic',
                'year' => '2026',
                'description' => 'Foundational training on Claude AI models and their capabilities.',
                'image' => '/img/certifications/certificate-59xptz5eh8py-1772535918.jpg',
                'sort_order' => 3,
            ],
            [
                'name' => 'CCNA Routing and Switching',
                'issuer' => 'Cisco',
                'year' => '2015',
                'description' => 'Cisco Certified Network Associate (CCNA) Routing and Switching certification.',
                'image' => '/img/certifications/Sgfffc,asn3.jpg',
                'sort_order' => 4,
            ],
            [
                'name' => 'Installing and Configuring Windows Server 2012 R2 (MCSA 70-410)',
                'issuer' => 'WinSYS Networks',
                'year' => '2015',
                'description' => 'Microsoft Certified Solutions Associate (MCSA) training for Windows Server 2012 R2.',
                'image' => '/img/certifications/MCSA.jpg',
                'sort_order' => 5,
            ],
            [
                'name' => 'Network+',
                'issuer' => 'IDM',
                'year' => '2009',
                'description' => 'CompTIA Network+ certification training covering networking technologies.',
                'image' => '/img/certifications/N+.jpg',
                'sort_order' => 6,
            ],
        ];

        foreach ($certifications as $cert) {
            Certification::create($cert);
        }
    }
}
