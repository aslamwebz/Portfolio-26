import { Head } from '@inertiajs/react';
import Navigation from '@/components/navigation';

interface Project {
    id: number;
    title: string;
    description: string;
    link: string | null;
    image: string;
    github: string;
    technologies: string[];
    category: string;
}

interface ProjectsProps {
    auth?: {
        user?: any;
    };
}

export default function Projects({ auth }: ProjectsProps) {
    const projects: Project[] = [
        {
            id: 9,
            title: 'Shad Admin',
            description:
                'A premium admin dashboard built with Vue 3, Vite, Pinia, and Tailwind CSS, powered by shadcn-vue for reusable components and elegant UI design.',
            link: 'https://webz-admin.vercel.app/',
            image: '/img/webzadmin.png',
            github: 'https://github.com/aslamwebz/webz-admin',
            technologies: [
                'Vue',
                'Vite',
                'Tailwindcss',
                'Shadvue CDN',
                'Pinia',
            ],
            category: 'Vue',
        },
        {
            id: 8,
            title: 'Vanguard-co',
            description:
                "Vanguard & Co. — A refined, modern e-commerce site showcasing premium men's watches and accessories through an elegant, minimalist interface.",
            link: 'https://vanguard-co.vercel.app/',
            image: '/img/vanguard.png',
            github: 'https://github.com/aslamwebz/Vanguard',
            technologies: ['React', 'Next Js', 'Tailwindcss'],
            category: 'React',
        },
        {
            id: 7,
            title: 'PennyPilot',
            description:
                'PennyPilot-X — An intuitive, modern expense tracking web app designed to help users manage their personal finances effortlessly.',
            link: 'https://pennypilot-x.vercel.app/',
            image: '/img/penny_pilot.png',
            github: 'https://github.com/aslamwebz/Penny-Pilot',
            technologies: ['React', 'Next Js', 'Typescript', 'Tailwindcss'],
            category: 'React',
        },
        {
            id: 6,
            title: 'Sentinel Solutions',
            description:
                'Sentinel Solutions — A modern, professional website for a full-spectrum security firm, designed to convey trust, readiness, and high-level expertise.',
            link: 'https://sentinel-solutions.vercel.app',
            image: '/img/sentinel.png',
            github: 'https://github.com/aslamwebz/Sentinel-Solutions',
            technologies: ['React', 'vite', 'tailwindcss', 'css3'],
            category: 'React',
        },
        {
            id: 5,
            title: 'Wine Dine',
            description:
                'Wine & Dine — A modern, elegant restaurant website that captures the upscale ambiance of a vineyard-based fine dining venue.',
            link: 'https://wine-dine.vercel.app/',
            image: '/img/wine-dine.png',
            github: 'https://github.com/aslamwebz/wine-dine',
            technologies: [
                'vite',
                'Typescript',
                'React',
                'shadcdn-ui',
                'tailwind css',
            ],
            category: 'React',
        },
        {
            id: 1,
            title: 'Hearty Meal',
            description:
                'An innovative food ordering platform that connects local restaurants with hungry customers. Features include real-time order tracking, customizable menus, and a seamless checkout process.',
            link: null,
            image: '/img/hm-main.png',
            github: 'https://github.com/aslamwebz/Portfolio/tree/main/resources/js/Pages/HeartyMeal',
            technologies: ['php', 'laravel', 'vue', 'tailwind'],
            category: 'Vue',
        },
        {
            id: 3,
            title: 'AI Projects',
            description:
                'A collection of AI projects using Python and Crew AI that use AI to enhance functionality and user experiences.',
            link: null,
            image: '/img/ai-main.png',
            github: 'https://github.com/aslamwebz/ai',
            technologies: ['python', 'crewai', 'Ollama', 'openai', 'streamlit'],
            category: 'AI',
        },
        {
            id: 4,
            title: 'AI Laravel Projects',
            description:
                'A collection of Laravel projects that use AI to enhance functionality and user experiences.',
            link: '/ai',
            image: '/img/ai-main.png',
            github: 'https://github.com/aslamwebz/Portfolio/blob/dev/app/Http/Controllers/AIController.php',
            technologies: ['laravel', 'vue', 'openai', 'tailwind'],
            category: 'AI',
        },
    ];

    const categories = ['All', 'React', 'Vue', 'AI'];

    return (
        <>
            <Head title="Projects | Mohamed Aslam">
                <meta
                    name="description"
                    content="Full-stack projects built with React, Vue, Laravel, and AI technologies."
                />
            </Head>

            <div className="min-h-screen bg-slate-900 text-white">
                <Navigation auth={auth} />

                {/* Header */}
                <section className="border-b border-slate-800 bg-slate-900 pt-32 pb-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <div className="bg-primary-400/10 border-primary-400/30 text-primary-400 mb-6 inline-flex items-center rounded-full border px-3 py-1 font-mono text-xs">
                                PORTFOLIO
                            </div>
                            <h1 className="mb-4 text-4xl font-bold sm:text-5xl">
                                All
                                <span className="gradient-text"> Projects</span>
                            </h1>
                            <p className="mx-auto max-w-2xl text-lg text-slate-400">
                                A comprehensive collection of my work across
                                full-stack development, AI integration, and
                                modern web technologies.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Projects Grid */}
                <section className="py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {projects.map((project) => (
                                <div
                                    key={project.id}
                                    className="hover:border-primary-400/50 group flex flex-col overflow-hidden rounded-xl border border-slate-700 bg-slate-800 transition-all"
                                >
                                    <div className="relative h-48 overflow-hidden bg-slate-900">
                                        <div className="to-primary-400/20 absolute inset-0 bg-gradient-to-br from-blue-500/20"></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-center">
                                                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-xl border border-slate-700 bg-slate-800 transition-transform group-hover:scale-110">
                                                    <svg
                                                        className="text-primary-400 h-8 w-8"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                                                        ></path>
                                                    </svg>
                                                </div>
                                                <div className="font-mono text-xs text-slate-500">
                                                    {project.category}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-1 flex-col p-6">
                                        <h3 className="mb-2 text-lg font-semibold">
                                            {project.title}
                                        </h3>
                                        <p className="mb-4 flex-1 text-sm leading-relaxed text-slate-400">
                                            {project.description}
                                        </p>
                                        <div className="mb-4 flex flex-wrap gap-2">
                                            {project.technologies.map(
                                                (tech) => (
                                                    <span
                                                        key={tech}
                                                        className="rounded bg-slate-900 px-2 py-1 font-mono text-xs text-slate-400"
                                                    >
                                                        {tech}
                                                    </span>
                                                ),
                                            )}
                                        </div>
                                        <div className="flex gap-3">
                                            {project.link && (
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-primary-400 hover:text-primary-300 text-sm font-medium"
                                                >
                                                    Live Demo →
                                                </a>
                                            )}
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm font-medium text-slate-400 hover:text-white"
                                            >
                                                GitHub →
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Back to Home */}
                        <div className="mt-16 text-center">
                            <a
                                href="/"
                                className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-white"
                            >
                                <svg
                                    className="h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                    ></path>
                                </svg>
                                Back to Home
                            </a>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-slate-800 py-8">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center text-sm text-slate-500">
                            <span className="text-slate-400">
                                Mohamed Aslam
                            </span>{' '}
                            — Senior Backend Engineer
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
