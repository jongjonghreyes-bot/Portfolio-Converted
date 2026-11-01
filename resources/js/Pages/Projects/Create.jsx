import { Head } from '@inertiajs/react';
import AdminLayout from '../../Components/AdminLayout';
import ProjectForm from '../../Components/ProjectForm';

export default function Create() {
    return (
        <AdminLayout>
            <Head title="Add a project" />
            <ProjectForm />
        </AdminLayout>
    );
}
