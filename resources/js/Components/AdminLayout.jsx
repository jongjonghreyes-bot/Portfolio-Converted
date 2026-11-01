import { Link } from '@inertiajs/react';
import Navbar from './Navbar';

export default function AdminLayout({ children }) {
    return (
        <>
            <Navbar admin />
            <main className="admin-page">
                <div className="admin-shell">
                    <div className="admin-header">
                        <div>
                            <h1>Project manager</h1>
                            <p className="admin-description">
                                Manage the projects shown on your public portfolio.
                            </p>
                        </div>
                        <Link className="admin-button admin-button-secondary" href="/">
                            Back to portfolio
                        </Link>
                    </div>
                    {children}
                </div>
            </main>
        </>
    );
}
