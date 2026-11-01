<?php

namespace Tests\Feature;

use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class ProjectManagementTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->actingAs(User::factory()->create());
    }

    public function test_public_portfolio_displays_projects_from_the_database(): void
    {
        $project = Project::create([
            'title' => 'Portfolio project',
            'category' => 'Web Design',
            'description' => 'A dynamic project.',
            'tech_stack' => 'React, Laravel',
            'image' => 'images/project-portfolio.png',
        ]);

        $this->get('/')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Portfolio')
                ->has('projects', 1)
                ->where('projects.0.id', $project->id)
                ->where('projects.0.title', 'Portfolio project'));
    }

    public function test_project_can_be_created_with_an_image(): void
    {
        Storage::fake('public');
        $image = UploadedFile::fake()->createWithContent(
            'branding.jpg',
            file_get_contents(public_path('images/project-branding.jpg')),
        );

        $this->post(route('admin.projects.store'), [
            'title' => 'New design',
            'category' => 'Branding',
            'description' => 'A refreshed visual identity.',
            'tech_stack' => 'Figma, Illustrator',
            'project_url' => 'https://example.com/project',
            'repository_url' => 'https://github.com/jong/project',
            'completed_at' => '2025-10-10',
            'image' => $image,
        ])
            ->assertRedirect(route('admin.projects.index'))
            ->assertSessionHas('success');

        $project = Project::query()->where('title', 'New design')->firstOrFail();

        $this->assertSame('Branding', $project->category);
        Storage::disk('public')->assertExists($project->image);

        $this->get(route('admin.projects.index'))
            ->assertInertia(fn (Assert $page) => $page
                ->where('flash.success', 'Project created successfully.'));
    }

    public function test_project_can_be_updated_without_changing_its_unique_title(): void
    {
        $project = Project::create([
            'title' => 'Keep this title',
            'category' => 'Branding',
            'description' => 'Before update.',
            'image' => 'images/project-branding.jpg',
        ]);

        $this->put(route('admin.projects.update', $project), [
            'title' => 'Keep this title',
            'category' => 'Branding',
            'description' => 'After update.',
        ])
            ->assertRedirect(route('admin.projects.index'))
            ->assertSessionHas('success');

        $this->assertSame('After update.', $project->fresh()->description);
        $this->assertSame('images/project-branding.jpg', $project->fresh()->image);
    }

    public function test_project_validation_returns_field_errors(): void
    {
        $this->from(route('admin.projects.create'))
            ->post(route('admin.projects.store'), [
                'title' => '',
                'category' => '',
                'description' => '',
                'project_url' => 'not-a-url',
            ])
            ->assertRedirect(route('admin.projects.create'))
            ->assertSessionHasErrors([
                'title',
                'category',
                'description',
                'project_url',
                'image',
            ]);
    }

    public function test_duplicate_titles_are_rejected(): void
    {
        Project::create([
            'title' => 'Existing title',
            'category' => 'Branding',
            'description' => 'An existing project.',
        ]);

        $this->post(route('admin.projects.store'), [
            'title' => 'Existing title',
            'category' => 'Branding',
            'description' => 'A second project.',
        ])->assertSessionHasErrors(['title']);
    }

    public function test_long_text_future_dates_and_non_image_uploads_are_rejected(): void
    {
        $this->from(route('admin.projects.create'))
            ->post(route('admin.projects.store'), [
                'title' => str_repeat('T', 121),
                'category' => 'Branding',
                'description' => str_repeat('D', 2001),
                'completed_at' => now()->addDay()->toDateString(),
                'image' => UploadedFile::fake()->create('notes.txt', 1, 'text/plain'),
            ])
            ->assertRedirect(route('admin.projects.create'))
            ->assertSessionHasErrors(['title', 'description', 'completed_at', 'image']);
    }

    public function test_project_can_be_deleted(): void
    {
        $project = Project::create([
            'title' => 'Remove this project',
            'category' => 'Web Design',
            'description' => 'This project should be removed.',
            'image' => 'images/project-portfolio.png',
        ]);

        $this->delete(route('admin.projects.destroy', $project))
            ->assertRedirect(route('admin.projects.index'))
            ->assertSessionHas('success');

        $this->assertDatabaseMissing('projects', ['id' => $project->id]);
    }
}
