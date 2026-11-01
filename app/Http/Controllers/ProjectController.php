<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Projects/Index', [
            'projects' => Project::query()->orderBy('id')->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Projects/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate($this->rules(), $this->messages());

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('projects', 'public');
        }

        Project::create($validated);

        return to_route('admin.projects.index')->with('success', 'Project created successfully.');
    }

    public function edit(Project $project): Response
    {
        return Inertia::render('Projects/Edit', [
            'project' => $project,
        ]);
    }

    public function update(Request $request, Project $project): RedirectResponse
    {
        $validated = $request->validate($this->rules($project), $this->messages());

        if ($request->hasFile('image')) {
            $this->deleteUploadedImage($project->image);
            $validated['image'] = $request->file('image')->store('projects', 'public');
        } else {
            unset($validated['image']);
        }

        $project->update($validated);

        return to_route('admin.projects.index')->with('success', 'Project updated successfully.');
    }

    public function destroy(Project $project): RedirectResponse
    {
        $this->deleteUploadedImage($project->image);
        $project->delete();

        return to_route('admin.projects.index')->with('success', 'Project deleted successfully.');
    }

    private function rules(?Project $project = null): array
    {
        return [
            'title' => [
                'required',
                'string',
                'max:120',
                Rule::unique('projects', 'title')->ignore($project?->id),
            ],
            'category' => ['required', 'string', 'max:60'],
            'description' => ['required', 'string', 'max:2000'],
            'tech_stack' => ['nullable', 'string', 'max:255'],
            'project_url' => ['nullable', 'url', 'max:255'],
            'repository_url' => ['nullable', 'url', 'max:255'],
            'completed_at' => ['nullable', 'date', 'before_or_equal:today'],
            'image' => [$project ? 'nullable' : 'required', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ];
    }

    private function messages(): array
    {
        return [
            'title.required' => 'Enter a project title.',
            'title.unique' => 'A project with this title already exists.',
            'title.max' => 'The title must not be longer than 120 characters.',
            'category.required' => 'Enter a project category.',
            'description.required' => 'Add a short description of the project.',
            'description.max' => 'The description must not be longer than 2,000 characters.',
            'project_url.url' => 'Enter a complete project URL beginning with http:// or https://.',
            'repository_url.url' => 'Enter a complete repository URL beginning with http:// or https://.',
            'completed_at.before_or_equal' => 'The completion date cannot be in the future.',
            'image.required' => 'Choose an image for this project.',
            'image.image' => 'The project image must be a valid image file.',
            'image.mimes' => 'Use a JPG, PNG, or WebP image.',
            'image.max' => 'The image must be 2 MB or smaller.',
        ];
    }

    private function deleteUploadedImage(?string $image): void
    {
        if ($image && ! str_starts_with($image, 'images/')) {
            Storage::disk('public')->delete($image);
        }
    }
}
