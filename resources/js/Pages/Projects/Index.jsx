import { Head, Link, router, usePage } from '@inertiajs/react';
import AdminLayout from '../../Components/AdminLayout';

export default function Index({ projects }) {
    const { flash = {} } = usePage().props;

    const deleteProject = (project) => {
        if (window.confirm(`Delete "${project.title}" from the portfolio? This cannot be undone.`)) {
            router.delete(`/admin/projects/${project.id}`);
        }
    };

    return (
        <AdminLayout>
            <Head title="Manage projects" />
            {flash.success && (
                <div className="admin-success" role="status" aria-live="polite">
                    {flash.success}
                </div>
            )}

            {projects.length === 0 ? (
                <div className="admin-empty">
                    <h2>No projects yet</h2>
                    <p className="admin-muted">Add a project to display it on your portfolio.</p>
                    <Link className="admin-button" href="/admin/projects/create">Add a project</Link>
                </div>
            ) : (
                <div className="admin-table-wrap">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th scope="col">Project</th>
                                <th scope="col">Category</th>
                                <th scope="col">Completed</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((project) => (
                                <tr key={project.id}>
                                    <td>
                                        <div className="admin-project">
                                            {project.image_url && (
                                                <img src={project.image_url} alt="" />
                                            )}
                                            <div>
                                                <strong>{project.title}</strong>
                                                <span>{project.tech_stack || 'No technologies listed'}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{project.category}</td>
                                    <td>{project.completed_at?.slice(0, 10) || '—'}</td>
                                    <td>
                                        <div className="admin-actions">
                                            <Link
                                                className="admin-button admin-button-secondary"
                                                href={`/admin/projects/${project.id}/edit`}
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                className="admin-button admin-button-danger"
                                                type="button"
                                                onClick={() => deleteProject(project)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {projects.length > 0 && (
                <div className="project-form-actions" style={{ marginTop: '22px' }}>
                    <Link className="admin-button" href="/admin/projects/create">Add a project</Link>
                </div>
            )}
        </AdminLayout>
    );
}
