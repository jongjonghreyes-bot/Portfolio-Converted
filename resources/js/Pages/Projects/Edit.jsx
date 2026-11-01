import { Head } from '@inertiajs/react';
import AdminLayout from '../../Components/AdminLayout';
import ProjectForm from '../../Components/ProjectForm';

export default function Edit({ project }) {
    return (
        <AdminLayout>
            <Head title={`Edit ${project.title}`} />
            <ProjectForm project={project} />
        </AdminLayout>
    );
}
