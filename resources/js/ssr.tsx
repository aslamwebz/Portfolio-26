import type { ResolvedComponent } from '@inertiajs/react';
import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import ReactDOMServer from 'react-dom/server';

const appName = 'Mohamed Aslam';

createServer(
    (page) =>
        createInertiaApp({
            page,
            render: ReactDOMServer.renderToString,
            title: (title) => (title ? `${title} - ${appName}` : appName),
            resolve: async (name) => {
                const page = await resolvePageComponent<{
                    default: ResolvedComponent;
                }>(
                    `./pages/${name}.tsx`,
                    import.meta.glob<{ default: ResolvedComponent }>(
                        './pages/**/*.tsx',
                    ),
                );

                return page.default;
            },
            setup: ({ App, props }) => {
                return <App {...props} />;
            },
        }),

    { host: '127.0.0.1', port: 13714 },
);
