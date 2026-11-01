import { Head, Link, useForm } from '@inertiajs/react';

export default function Login() {
    const form = useForm({ email: '', password: '' });

    const submit = (event) => {
        event.preventDefault();
        form.post('/admin/login');
    };

    return (
        <>
            <Head title="Project manager login" />
            <main className="auth-page">
                <section className="auth-card" aria-labelledby="login-title">
                    <p className="name-tag">Portfolio administration</p>
                    <h1 id="login-title">Sign in</h1>
                    <p className="admin-description">
                        Sign in to manage the projects displayed on the portfolio.
                    </p>
                    <form className="admin-form" onSubmit={submit}>
                        <div className="admin-field">
                            <label htmlFor="email">Email address</label>
                            <input
                                autoComplete="username"
                                id="email"
                                name="email"
                                type="email"
                                value={form.data.email}
                                onChange={(event) => form.setData('email', event.target.value)}
                                aria-invalid={Boolean(form.errors.email)}
                                aria-describedby={form.errors.email ? 'email-error' : undefined}
                                required
                            />
                            {form.errors.email && (
                                <span className="admin-field-error" id="email-error" role="alert">
                                    {form.errors.email}
                                </span>
                            )}
                        </div>
                        <div className="admin-field">
                            <label htmlFor="password">Password</label>
                            <input
                                autoComplete="current-password"
                                id="password"
                                name="password"
                                type="password"
                                value={form.data.password}
                                onChange={(event) => form.setData('password', event.target.value)}
                                aria-invalid={Boolean(form.errors.password)}
                                aria-describedby={form.errors.password ? 'password-error' : undefined}
                                required
                            />
                            {form.errors.password && (
                                <span className="admin-field-error" id="password-error" role="alert">
                                    {form.errors.password}
                                </span>
                            )}
                        </div>
                        <button className="admin-button" type="submit" disabled={form.processing}>
                            {form.processing ? 'Signing in…' : 'Sign in'}
                        </button>
                    </form>
                    <Link className="auth-back-link" href="/">Back to portfolio</Link>
                </section>
            </main>
        </>
    );
}
