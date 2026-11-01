import '../css/app.css';
import { createInertiaApp } from '@inertiajs/react';
import { createElement } from 'react';
import { createRoot } from 'react-dom/client';

createInertiaApp({
    title: (title) => (title ? `${title} | Jong Reyes` : 'Jong Reyes | Portfolio'),
    resolve: (name) => {
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
        const page = pages[`./Pages/${name}.jsx`];

        if (!page) {
            throw new Error(`Inertia page "${name}" was not found.`);
        }

        return page;
    },
    setup({ el, App, props }) {
        createRoot(el).render(createElement(App, props));
    },
});
