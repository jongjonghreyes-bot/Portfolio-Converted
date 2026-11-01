import { Link, useForm } from '@inertiajs/react';

const fields = [
    { name: 'title', label: 'Project title', required: true, maxLength: 120 },
    { name: 'category', label: 'Category', required: true, maxLength: 60 },
    { name: 'tech_stack', label: 'Tools and technologies', maxLength: 255 },
    { name: 'project_url', label: 'Project URL', type: 'url', placeholder: 'https://example.com' },
    { name: 'repository_url', label: 'Repository URL', type: 'url', placeholder: 'https://github.com/username/project' },
    { name: 'completed_at', label: 'Date completed', type: 'date' },
];

export default function ProjectForm({ project = null }) {
    const form = useForm({
        title: project?.title ?? '',
        category: project?.category ?? '',
        description: project?.description ?? '',
        tech_stack: project?.tech_stack ?? '',
        project_url: project?.project_url ?? '',
        repository_url: project?.repository_url ?? '',
        completed_at: project?.completed_at?.slice(0, 10) ?? '',
        image: null,
    });

    const submit = (event) => {
        event.preventDefault();

        if (project) {
            form.transform((data) => ({ ...data, _method: 'put' }))
                .post(`/admin/projects/${project.id}`, { forceFormData: true });
            return;
        }

        form.post('/admin/projects', { forceFormData: true });
    };

    const errors = Object.entries(form.errors);

    return (
        <form className="admin-form" onSubmit={submit} noValidate>
            {errors.length > 0 && (
                <div className="admin-error-summary" role="alert" aria-live="polite">
                    <strong>Please check the highlighted fields:</strong>
                    <ul>
                        {errors.map(([field, message]) => (
                            <li key={field}>{message}</li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="admin-form-grid">
                {fields.map(({ name, label, type = 'text', ...attributes }) => (
                    <div className="admin-field" key={name}>
                        <label htmlFor={name}>
                            {label}{attributes.required ? ' *' : ''}
                        </label>
                        <input
                            {...attributes}
                            id={name}
                            name={name}
                            type={type}
                            value={form.data[name]}
                            onChange={(event) => form.setData(name, event.target.value)}
                            aria-invalid={Boolean(form.errors[name])}
                            aria-describedby={form.errors[name] ? `${name}-error` : undefined}
                        />
                        {form.errors[name] && (
                            <span className="admin-field-error" id={`${name}-error`}>
                                {form.errors[name]}
                            </span>
                        )}
                    </div>
                ))}

                <div className="admin-field admin-field-full">
                    <label htmlFor="description">Description *</label>
                    <textarea
                        id="description"
                        name="description"
                        maxLength={2000}
                        value={form.data.description}
                        onChange={(event) => form.setData('description', event.target.value)}
                        aria-invalid={Boolean(form.errors.description)}
                        aria-describedby={form.errors.description ? 'description-error' : undefined}
                    />
                    {form.errors.description && (
                        <span className="admin-field-error" id="description-error">
                            {form.errors.description}
                        </span>
                    )}
                </div>

                <div className="admin-field admin-field-full">
                    <label htmlFor="image">
                        Project image{project ? ' (choose a new image to replace the current one)' : ' *'}
                    </label>
                    <input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        required={!project}
                        onChange={(event) => form.setData('image', event.target.files[0] ?? null)}
                        aria-invalid={Boolean(form.errors.image)}
                        aria-describedby={form.errors.image ? 'image-error' : 'image-help'}
                    />
                    <span className="admin-muted" id="image-help">JPG, PNG, or WebP, up to 2 MB.</span>
                    {form.errors.image && (
                        <span className="admin-field-error" id="image-error">
                            {form.errors.image}
                        </span>
                    )}
                    {project?.image_url && (
                        <img
                            className="admin-image-preview"
                            src={project.image_url}
                            alt={`Current image for ${project.title}`}
                        />
                    )}
                </div>
            </div>

            <div className="project-form-actions">
                <button className="admin-button" type="submit" disabled={form.processing}>
                    {form.processing ? 'Saving…' : project ? 'Save changes' : 'Create project'}
                </button>
                <Link className="admin-button admin-button-secondary" href="/admin/projects">
                    Cancel
                </Link>
            </div>
        </form>
    );
}
