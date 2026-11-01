<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectsSeeder extends Seeder
{
    public function run(): void
    {
        $projects = [
            [
                'title' => 'Branding',
                'category' => 'Branding',
                'description' => 'Creating the "Brand Guidelines." This is a rulebook that ensures your logo, colors, and fonts are used exactly the same way every time.',
                'tech_stack' => 'Brand identity, Visual design',
                'image' => 'images/project-branding.jpg',
            ],
            [
                'title' => 'UX',
                'category' => 'UX Design',
                'description' => 'Futuristic business and branding social media designs for the modern era.',
                'tech_stack' => 'Figma, UX design',
                'image' => 'images/project-ux.jpg',
            ],
            [
                'title' => 'Graphic Design',
                'category' => 'Graphic Design',
                'description' => 'Consistent visual direction, from high-contrast campaign art to bright lifestyle imagery, helps a brand stay recognizable without its logo.',
                'tech_stack' => 'Graphic design, Branding',
                'image' => 'images/project-graphic-design.jpg',
            ],
            [
                'title' => 'Portfolio Design',
                'category' => 'Web Design',
                'description' => 'Complete visual identity redesign for a tech startup.',
                'tech_stack' => 'UI design, Web design',
                'image' => 'images/project-portfolio.png',
            ],
        ];

        foreach ($projects as $project) {
            Project::updateOrCreate(
                ['title' => $project['title']],
                $project,
            );
        }
    }
}
