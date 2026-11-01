import { Link, router } from '@inertiajs/react';

export default function Navbar({ admin = false }) {
    if (admin) {
        return (
            <nav aria-label="Admin navigation">
                <Link className="logo" href="/admin/projects">Project Manager</Link>
                <ul>
                    <li><Link href="/">View portfolio</Link></li>
                    <li>
                        <button
                            className="nav-logout"
                            type="button"
                            onClick={() => router.post('/admin/logout')}
                        >
                            Sign out
                        </button>
                    </li>
                </ul>
            </nav>
        );
    }

    return (
        <nav aria-label="Main navigation">
            <a className="logo" href="#about">Portfolio</a>
            <ul>
                <li><a href="#about">About Me</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#education">Education</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    );
}
