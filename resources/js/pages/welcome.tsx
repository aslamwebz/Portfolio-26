import { Head, usePage } from '@inertiajs/react';
import Navigation from '@/components/navigation';
import Particles from '@/components/particles';
import { Reveal } from '@/components/reveal';
import Terminal from '@/components/terminal';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

interface DbProject {
    id: number;
    title: string;
    description: string;
    image: string | null;
    link: string | null;
    github: string | null;
    technologies: string[] | null;
    category: string;
    sort_order: number;
    is_featured: boolean;
}

interface DbCertification {
    id: number;
    name: string;
    issuer: string;
    year: string;
    description: string | null;
    image: string | null;
    sort_order: number;
}

interface Project {
    id: number;
    title: string;
    description: string;
    link: string;
    image: string;
    github: string;
    technologies: string[];
    category: string;
}

const ProjectCarousel = ({ projects }: { projects: Project[] }) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);

    const next = () => {
        setCurrentIndex((prev) => (prev + 1) % projects.length);
    };

    const prev = () => {
        setCurrentIndex(
            (prev) => (prev - 1 + projects.length) % projects.length,
        );
    };

    const project = projects[currentIndex];

    return (
        <div className="group relative overflow-hidden rounded-2xl border border-slate-700 bg-slate-800/50">
            <div className="grid md:grid-cols-2">
                {/* Left Pane: Image */}
                <div className="relative h-64 overflow-hidden bg-slate-900 md:h-[450px]">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={project.id}
                            src={project.image}
                            alt={project.title}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="h-full w-full object-cover"
                        />
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                        <span className="bg-primary-400 rounded-full px-3 py-1 font-mono text-xs font-bold text-slate-900">
                            {project.category}
                        </span>
                    </div>
                </div>

                {/* Right Pane: Details */}
                <div className="flex flex-col justify-center p-8 lg:p-12">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h3 className="mb-4 text-2xl font-bold text-white lg:text-3xl">
                                {project.title}
                            </h3>
                            <p className="mb-6 text-lg leading-relaxed text-slate-400">
                                {project.description}
                            </p>

                            <div className="mb-8 flex flex-wrap gap-2">
                                {project.technologies.map((tech) => (
                                    <span
                                        key={tech}
                                        className="rounded-lg border border-slate-700/50 bg-slate-900 px-3 py-1.5 font-mono text-xs text-slate-300"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center gap-6">
                                {project.link && (
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-primary-400 hover:bg-primary-500 flex items-center gap-2 rounded-lg px-6 py-3 font-bold text-slate-900 transition-all"
                                    >
                                        Live Demo
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
                                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                            />
                                        </svg>
                                    </a>
                                )}
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 font-medium text-slate-400 hover:text-white"
                                >
                                    View Source
                                    <svg
                                        className="h-4 w-4"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                </a>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Navigation Arrows */}
            <div className="absolute right-4 bottom-4 flex gap-2">
                <button
                    onClick={prev}
                    className="hover:bg-primary-400 flex h-12 w-12 items-center justify-center rounded-xl border border-slate-700 bg-slate-800/80 text-white transition-all hover:text-slate-900"
                >
                    <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                </button>
                <button
                    onClick={next}
                    className="hover:bg-primary-400 flex h-12 w-12 items-center justify-center rounded-xl border border-slate-700 bg-slate-800/80 text-white transition-all hover:text-slate-900"
                >
                    <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </button>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2 md:left-[25%]">
                {projects.map((_, i) => (
                    <div
                        key={i}
                        className={`h-1.5 rounded-full transition-all ${
                            i === currentIndex
                                ? 'bg-primary-400 w-8'
                                : 'w-2 bg-slate-600'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default function Welcome({
    canRegister = true,
    dbProjects = [],
    dbCertifications = [],
}: {
    canRegister?: boolean;
    dbProjects?: DbProject[];
    dbCertifications?: DbCertification[];
}) {
    const { auth } = usePage().props;

    const techStack = [
        {
            icon: 'https://cdn.iconscout.com/icon/free/png-512/free-laravel-4695747-3903173.png', // Laravel 3D
            title: 'Core Backend',
            tags: ['PHP', 'Laravel', 'MySQL', 'Redis'],
        },
        {
            icon: 'https://cdn.iconscout.com/icon/free/png-512/free-react-7578010-6184852.png', // React 3D
            title: 'Frontend & UI',
            tags: ['React', 'Inertia.js', 'Tailwind CSS', 'Vue.js'],
        },
        {
            icon: 'https://cdn.iconscout.com/icon/free/png-512/free-docker-4695749-3903175.png', // Docker 3D
            title: 'DevOps & Tools',
            tags: ['Docker', 'Git', 'GitHub Actions', 'Azure'],
        },
        {
            icon: 'https://cdn.iconscout.com/icon/free/png-512/free-php-7578026-6184868.png', // PHP 3D (to represent and fill space)
            title: 'Architecture',
            tags: ['TALL Stack', 'Multi-tenancy', 'REST APIs', 'TDD'],
        },
    ];

    const experiences = [
        {
            date: 'May 2021 - Present',
            location: 'Remote, UK',
            isCurrent: true,
            title: 'Senior Backend Engineer',
            company: 'Digital Egg Ltd / Fullstripe s.r.o',
            achievements: [
                'Architected and scaled a Laravel multi-tenant SaaS for 50K+ users with robust RBAC and security audits',
                'Maintained 15+ RESTful API endpoints using Laravel Sanctum/Passport with 100% test coverage',
                'Optimized high-traffic payment billing flows (Stripe, PayPal) and real-time notification systems',
                'Developed custom admin dashboards with Filament & Nova, reducing task completion time by 35%',
                'Led refactoring that reduced production bugs by 40% and halved deployment rollback rates',
            ],
        },
        {
            date: 'July 2018 - Nov 2020',
            location: 'Remote, Sri Lanka',
            isCurrent: false,
            title: 'Junior WordPress & PHP Developer',
            company: 'Remote Office One',
            achievements: [
                'Built 50+ WordPress sites and PHP web apps with clean, documented code and modern UI',
                'Developed custom WP plugins and integrated external REST APIs, increasing platform flexibility',
                'Contributed to internal knowledge base, improving developer onboarding speed',
            ],
        },
        {
            date: 'Dec 2012 - May 2018',
            location: 'Qatar',
            isCurrent: false,
            title: 'IT Infrastructure & Network Engineer',
            company: 'Multiple Companies',
            achievements: [
                'Managed enterprise server, network, and security infrastructure across multiple organizations',
                'Expertise in Linux administration, deployments, and operations supporting backend work',
            ],
        },
    ];

    const stats = [
        { value: '50K+', label: 'Platform Users' },
        { value: '5+', label: 'Years Laravel Exp.' },
        { value: '15+', label: 'APIs Maintained' },
        { value: '100%', label: 'Test Coverage' },
    ];

    const whyHireMe = [
        {
            icon: (
                <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                </svg>
            ),
            title: 'Performance Focused',
            description:
                'I build systems that scale. From database optimization to caching strategies, I ensure your application performs under heavy load.',
        },
        {
            icon: (
                <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                </svg>
            ),
            title: 'Security First',
            description:
                'With my CCNA background and security mindset, I implement best practices from day one. Your data and users are protected.',
        },
        {
            icon: (
                <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                </svg>
            ),
            title: 'Team Player',
            description:
                'I mentor junior developers, conduct thorough code reviews, and communicate effectively with both technical and non-technical stakeholders.',
        },
        {
            icon: (
                <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            ),
            title: 'Fast Delivery',
            description:
                'I understand business needs. Using the TALL stack, I deliver production-ready features quickly without sacrificing code quality.',
        },
    ];

    const testimonials = [
        {
            quote: 'Mohamed transformed our legacy codebase into a modern, scalable system. His attention to performance and security is unmatched.',
            author: 'Sarah Chen',
            role: 'CTO',
            company: 'TechScale Solutions',
            avatar: 'SC',
        },
        {
            quote: 'Working with Mohamed was a game-changer. He delivered complex payment integrations flawlessly and mentored our team on best practices.',
            author: 'James Mitchell',
            role: 'Product Manager',
            company: 'Digital Egg',
            avatar: 'JM',
        },
        {
            quote: 'His infrastructure background shows in everything he builds. The systems are robust, secure, and perform beautifully under load.',
            author: 'Alex Rivera',
            role: 'Lead Developer',
            company: 'Fullstripe',
            avatar: 'AR',
        },
    ];

    const certifications = [
        {
            name: 'CCNA - Cisco Certified Network Associate',
            issuer: 'Cisco',
            year: '2012',
            description:
                'Validation of knowledge for fundamental networking concepts, IP connectivity, IP services, security fundamentals, and automation and programmability.',
            image: '/img/ccna_certificate.png',
            icon: (
                <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                </svg>
            ),
        },
        {
            name: 'Laravel Certified Developer',
            issuer: 'Laravel',
            year: '2020',
            description:
                'Official certification certifying expertise in the Laravel framework, including architectural patterns, Eloquent ORM, security, and application deployment.',
            image: '/img/laravel_certificate.png',
            icon: (
                <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                </svg>
            ),
        },
        {
            name: 'AWS Cloud Practitioner',
            issuer: 'Amazon Web Services',
            year: '2022',
            description:
                'Foundational understanding of building and operating on the AWS Cloud, including cloud concepts, security, technology, and billing.',
            image: '/img/aws_certificate.png',
            icon: (
                <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                    />
                </svg>
            ),
        },
    ];

    const education = [
        {
            degree: 'GCE Ordinary Level',
            school: 'DCB Mother Tongue School',
            year: '1996 - 2008',
            description:
                'Foundation secondary education in Badulla, Sri Lanka.',
        },
    ];

    const projects = [
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

    // Strictly Backend-Driven Data
    const displayProjects = dbProjects.map((p) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        link: p.link,
        image: p.image ? `/storage/${p.image}` : '/img/ai-main.png',
        github: p.github,
        technologies: p.technologies || [],
        category: p.category,
    }));

    const displayCertifications = dbCertifications.map((c) => ({
        name: c.name,
        issuer: c.issuer,
        year: c.year,
        description: c.description || '',
        image: c.image ? `/storage/${c.image}` : '/img/ccna_certificate.png',
        icon: (
            <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
            </svg>
        ),
    }));

    const additionalSkills = [
        'PHPUnit',
        'Cypress',
        'CI/CD',
        'Redis',
        'Queue Management',
        'WebSockets',
    ];

    return (
        <>
            <Head title="Mohamed Aslam | Senior Backend Engineer">
                <meta
                    name="description"
                    content="Senior Backend Engineer specializing in high-traffic applications, REST APIs, and the TALL stack."
                />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <div className="min-h-screen bg-slate-900 text-white">
                <Navigation auth={auth} />

                {/* Hero Section */}
                <section className="relative flex min-h-screen items-center overflow-hidden pt-16">
                    {/* Particles Background */}
                    <Particles />

                    {/* Background Grid - simplified */}
                    <div className="pointer-events-none absolute inset-0 opacity-[0.02]">
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage:
                                    'radial-gradient(circle, #34d399 1px, transparent 1px)',
                                backgroundSize: '40px 40px',
                            }}
                        ></div>
                    </div>

                    {/* Gradient glow behind terminal */}
                    <div className="bg-primary-400/10 pointer-events-none absolute top-1/2 right-0 h-[600px] w-[600px] translate-x-1/4 -translate-y-1/2 rounded-full blur-[120px]"></div>

                    <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
                        <div className="grid w-full items-start gap-12 lg:grid-cols-2">
                            {/* Left Content */}
                            <div className="animate-slide-up flex flex-col justify-center">
                                <div className="mb-6 inline-flex items-center rounded-full border border-green-400/30 bg-green-400/10 px-4 py-1.5 font-mono text-sm font-medium text-green-400">
                                    <span className="mr-2 text-lg">●</span>
                                    Open to Work — Available Immediately
                                </div>

                                <h1 className="mb-6 text-3xl leading-tight font-bold sm:text-4xl lg:text-5xl">
                                    Senior Backend Engineer
                                    <span className="gradient-text">
                                        {' '}
                                        Ready to Build
                                    </span>
                                    <br />& Scale Your Product
                                </h1>

                                <p className="mb-8 max-w-xl text-lg leading-relaxed text-slate-400">
                                    I build scalable Laravel applications and
                                    robust REST APIs for enterprise platforms.
                                    Deeply focused on security, multi-tenancy,
                                    and high-performance backend architecture.
                                </p>

                                {/* Stats */}
                                <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                                    {stats.map((stat, index) => (
                                        <div
                                            key={index}
                                            className="rounded-lg bg-slate-800/50 px-4 py-3 text-center"
                                        >
                                            <div className="text-primary-400 text-xl font-bold sm:text-2xl">
                                                {stat.value}
                                            </div>
                                            <div className="text-xs text-slate-500">
                                                {stat.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-wrap gap-4">
                                    <a
                                        href="#contact"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            document
                                                .querySelector('#contact')
                                                ?.scrollIntoView({
                                                    behavior: 'smooth',
                                                });
                                        }}
                                        className="bg-primary-400 hover:bg-primary-500 inline-flex items-center gap-2 rounded-lg px-8 py-4 text-lg font-semibold text-slate-900 transition-colors"
                                    >
                                        Hire Me
                                        <svg
                                            className="h-5 w-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                                            ></path>
                                        </svg>
                                    </a>
                                    <a
                                        href="https://calendly.com/aslam4webz"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-800 px-6 py-4 font-medium text-white transition-colors hover:border-slate-500 hover:bg-slate-700"
                                    >
                                        <svg
                                            className="h-5 w-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            ></path>
                                        </svg>
                                        Schedule a Call
                                    </a>
                                </div>
                            </div>

                            {/* Right Content - Terminal */}
                            <div className="animate-fade-in flex items-center justify-center lg:pl-8">
                                <Terminal />
                            </div>
                        </div>
                    </div>

                    {/* Scroll Indicator */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                        <svg
                            className="h-6 w-6 text-slate-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 14l-7 7m0 0l-7-7m7 7V3"
                            ></path>
                        </svg>
                    </div>
                </section>

                {/* About Section */}
                <section id="about" className="bg-slate-800/50 py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid items-center gap-16 lg:grid-cols-2">
                            {/* Left - Visual */}
                            <div className="relative flex flex-col justify-center">
                                <div className="from-primary-400/10 absolute -inset-4 rounded-2xl bg-gradient-to-r to-blue-500/10 opacity-50"></div>
                                <div className="relative rounded-xl border border-slate-700 bg-slate-800 p-8">
                                    <div className="mb-6 flex items-center gap-4">
                                        <div className="bg-primary-400/10 border-primary-400/30 flex h-16 w-16 items-center justify-center rounded-xl border">
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
                                                    d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                                                ></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="font-mono text-sm text-slate-400">
                                                Current Role
                                            </div>
                                            <div className="font-semibold">
                                                Senior Backend Engineer
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4 font-mono text-sm">
                                        <div className="flex justify-between border-b border-slate-700 py-2">
                                            <span className="text-slate-400">
                                                Experience
                                            </span>
                                            <span className="text-primary-400">
                                                12+ Years
                                            </span>
                                        </div>
                                        <div className="flex justify-between border-b border-slate-700 py-2">
                                            <span className="text-slate-400">
                                                Focus
                                            </span>
                                            <span>Backend Architecture</span>
                                        </div>
                                        <div className="flex justify-between border-b border-slate-700 py-2">
                                            <span className="text-slate-400">
                                                Stack
                                            </span>
                                            <span>TALL Stack</span>
                                        </div>
                                        <div className="flex justify-between border-b border-slate-700 py-2">
                                            <span className="text-slate-400">
                                                Location
                                            </span>
                                            <span>Lisbon, Portugal</span>
                                        </div>
                                        <div className="flex justify-between py-2">
                                            <span className="text-slate-400">
                                                Availability
                                            </span>
                                            <span className="text-green-400">
                                                Global Remote
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right - Content */}
                            <div className="flex flex-col justify-center">
                                <div className="mb-4 inline-flex items-center rounded-full border border-slate-700 bg-slate-800 px-3 py-1 font-mono text-xs text-slate-400">
                                    ABOUT ME
                                </div>

                                <h2 className="mb-6 text-2xl font-bold sm:text-3xl">
                                    From Infrastructure to
                                    <span className="gradient-text">
                                        {' '}
                                        Architecture
                                    </span>
                                </h2>

                                <div className="space-y-4 leading-relaxed text-slate-400">
                                    <p>
                                        My journey began in IT and Network
                                        Administration, where I earned my{' '}
                                        <span className="font-medium text-white">
                                            CCNA certification
                                        </span>{' '}
                                        and managed enterprise infrastructure.
                                        This foundation gave me a deep
                                        understanding of the "metal" that code
                                        runs on—servers, networks, and security.
                                    </p>

                                    <p>
                                        Transitioning to software engineering, I
                                        brought that systems-thinking mindset
                                        with me. I don't just write code; I{' '}
                                        <span className="font-medium text-white">
                                            architect systems
                                        </span>{' '}
                                        that handle scale, process payments
                                        securely, and integrate complex
                                        third-party services.
                                    </p>

                                    <p>
                                        Today, I specialize in building
                                        high-traffic applications using the{' '}
                                        <span className="font-medium text-white">
                                            TALL stack
                                        </span>{' '}
                                        (Tailwind, Alpine, Laravel, Livewire).
                                        My unique background in infrastructure
                                        means I understand performance at every
                                        layer—from database queries to server
                                        configuration.
                                    </p>
                                </div>

                                <div className="mt-8 flex items-center gap-3 text-sm text-slate-500">
                                    <svg
                                        className="text-primary-400 h-5 w-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        ></path>
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        ></path>
                                    </svg>
                                    Based in Lisbon, Portugal — Open to Global
                                    Remote opportunities
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why Hire Me Section */}
                <section className="border-y border-slate-800 bg-slate-900 py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <Reveal>
                            <div className="mb-16 text-center">
                                <div className="mb-6 inline-flex items-center rounded-full border border-slate-700 bg-slate-800 px-3 py-1 font-mono text-xs text-slate-400">
                                    WHY HIRE ME
                                </div>
                                <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                                    What Sets Me
                                    <span className="gradient-text">
                                        {' '}
                                        Apart
                                    </span>
                                </h2>
                                <p className="mx-auto max-w-2xl text-slate-400">
                                    Beyond technical skills, here's why I'm the
                                    right engineer for your team.
                                </p>
                            </div>
                        </Reveal>

                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {whyHireMe.map((item, index) => (
                                <Reveal
                                    key={index}
                                    delay={index as 0 | 1 | 2 | 3}
                                >
                                    <div className="card-hover group hover:border-primary-400/30 rounded-xl border border-slate-700 bg-slate-800/50 p-6 transition-all hover:bg-slate-800">
                                        <div className="bg-primary-400/10 text-primary-400 mb-4 flex h-12 w-12 items-center justify-center rounded-lg transition-transform group-hover:scale-110">
                                            {item.icon}
                                        </div>
                                        <h3 className="mb-2 font-semibold transition-colors group-hover:text-white">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm leading-relaxed text-slate-400">
                                            {item.description}
                                        </p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Tech Stack Section */}
                <section id="stack" className="bg-slate-800/50 py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-16 text-center">
                            <div className="mb-6 inline-flex items-center rounded-full border border-slate-700 bg-slate-800 px-3 py-1 font-mono text-xs text-slate-400">
                                TECH STACK
                            </div>
                            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                                Tools I Use to Build
                                <span className="gradient-text">
                                    {' '}
                                    Scalable Systems
                                </span>
                            </h2>
                            <p className="mx-auto max-w-2xl text-slate-400">
                                A battle-tested stack focused on rapid
                                development, type safety, and performance at
                                scale.
                            </p>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {techStack.map((stack, index) => (
                                <Reveal
                                    key={stack.title}
                                    delay={index as 0 | 1 | 2 | 3}
                                >
                                    <div className="card-hover group hover:border-primary-400/30 rounded-xl border border-slate-700 bg-slate-800 p-6 transition-all">
                                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-slate-700/30 p-2 transition-all group-hover:scale-110 group-hover:bg-slate-700/50">
                                            <img
                                                src={stack.icon}
                                                alt={stack.title}
                                                className="h-12 w-12 object-contain drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]"
                                            />
                                        </div>
                                        <h3 className="mb-3 font-semibold transition-colors group-hover:text-white">
                                            {stack.title}
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {stack.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="rounded bg-slate-900 px-2 py-1 font-mono text-xs text-slate-300 transition-colors group-hover:bg-slate-700"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>

                        {/* Additional Skills */}
                        <div className="mt-12 flex flex-wrap justify-center gap-3">
                            {additionalSkills.map((skill) => (
                                <span
                                    key={skill}
                                    className="rounded-full border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-slate-400"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Projects Section - 2 Pane Carousel */}
                <section id="projects" className="bg-slate-800/50 py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-16 text-center">
                            <div className="mb-6 inline-flex items-center rounded-full border border-slate-700 bg-slate-800 px-3 py-1 font-mono text-xs text-slate-400">
                                CASE STUDIES
                            </div>
                            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                                Featured
                                <span className="gradient-text"> Projects</span>
                            </h2>
                            <p className="mx-auto max-w-2xl text-slate-400">
                                A collection of projects I&apos;ve built,
                                showcasing my expertise in full-stack
                                development, AI integration, and modern web
                                technologies.
                            </p>
                        </div>

                        {displayProjects.length > 0 ? (
                            <div className="relative mx-auto max-w-5xl">
                                <ProjectCarousel projects={displayProjects} />
                            </div>
                        ) : (
                            <div className="rounded-xl border border-dashed border-slate-700 py-20 text-center">
                                <p className="text-slate-500">
                                    No projects found. Add some in the admin
                                    panel!
                                </p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Certifications Section - Adjacent to Projects */}
                <section id="certifications" className="bg-slate-900 py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <Reveal>
                            <div className="mb-16 text-center">
                                <div className="mb-6 inline-flex items-center rounded-full border border-slate-700 bg-slate-800 px-3 py-1 font-mono text-xs text-slate-400">
                                    CREDENTIALS
                                </div>
                                <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                                    Certifications &
                                    <span className="gradient-text">
                                        {' '}
                                        Trust
                                    </span>
                                </h2>
                            </div>
                        </Reveal>

                        {displayCertifications.length > 0 ? (
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {displayCertifications.map((cert, index) => (
                                    <Reveal
                                        key={index}
                                        delay={(index % 3) as 0 | 1 | 2}
                                    >
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <div className="card-hover group hover:border-primary-400/30 cursor-pointer overflow-hidden rounded-xl border border-slate-700 bg-slate-800/50 p-0 transition-all">
                                                    <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                                                        <img
                                                            src={cert.image}
                                                            alt={cert.name}
                                                            className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                                                        />
                                                        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/40 opacity-0 transition-opacity group-hover:opacity-100">
                                                            <div className="bg-primary-400/80 rounded-full p-3 text-slate-900">
                                                                <svg
                                                                    className="h-6 w-6"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={
                                                                            2
                                                                        }
                                                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m4-3H6"
                                                                    />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="p-6">
                                                        <div className="flex items-center gap-4">
                                                            <div className="bg-primary-400/10 text-primary-400 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg">
                                                                {cert.icon}
                                                            </div>
                                                            <div className="min-w-0">
                                                                <div className="truncate font-semibold transition-colors group-hover:text-white">
                                                                    {cert.name}
                                                                </div>
                                                                <div className="text-sm text-slate-500">
                                                                    {
                                                                        cert.issuer
                                                                    }{' '}
                                                                    •{' '}
                                                                    {cert.year}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </DialogTrigger>
                                            <DialogContent className="max-w-4xl border-slate-700 bg-slate-900 p-0 text-white">
                                                <div className="grid md:grid-cols-2">
                                                    <div className="flex items-center justify-center bg-slate-950 p-6">
                                                        <img
                                                            src={cert.image}
                                                            alt={cert.name}
                                                            className="h-auto max-h-[70vh] w-full object-contain"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col justify-center p-8">
                                                        <DialogHeader className="mb-6">
                                                            <div className="bg-primary-400/10 text-primary-400 mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl">
                                                                {cert.icon}
                                                            </div>
                                                            <DialogTitle className="text-2xl font-bold text-white">
                                                                {cert.name}
                                                            </DialogTitle>
                                                            <p className="text-primary-400 mt-2 font-mono text-sm tracking-widest uppercase">
                                                                {cert.issuer} •{' '}
                                                                {cert.year}
                                                            </p>
                                                        </DialogHeader>
                                                        <div className="space-y-4">
                                                            <p className="text-slate-400">
                                                                {
                                                                    cert.description
                                                                }
                                                            </p>
                                                            <div className="pt-6">
                                                                <a
                                                                    href={
                                                                        cert.image
                                                                    }
                                                                    target="_blank"
                                                                    className="bg-primary-400 hover:bg-primary-500 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-bold text-slate-900 transition-colors"
                                                                >
                                                                    View Full
                                                                    Certificate
                                                                    <svg
                                                                        className="h-4 w-4"
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        viewBox="0 0 24 24"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth={
                                                                                2
                                                                            }
                                                                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                                                        />
                                                                    </svg>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    </Reveal>
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-xl border border-dashed border-slate-700 py-20 text-center">
                                <p className="text-slate-500">
                                    No certifications found.
                                </p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Experience Section */}
                <section id="experience" className="py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-16 text-center">
                            <div className="mb-6 inline-flex items-center rounded-full border border-slate-700 bg-slate-800 px-3 py-1 font-mono text-xs text-slate-400">
                                EXPERIENCE
                            </div>
                            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                                Professional
                                <span className="gradient-text"> Journey</span>
                            </h2>
                        </div>

                        <div className="mx-auto max-w-3xl space-y-8">
                            {experiences.map((exp, index) => (
                                <div
                                    key={index}
                                    className="relative pl-8 sm:pl-0"
                                >
                                    <div className="absolute top-0 bottom-0 left-1/2 hidden w-px -translate-x-1/2 bg-slate-700 sm:block"></div>
                                    <div
                                        className={`absolute top-6 left-1/2 hidden h-4 w-4 -translate-x-1/2 rounded-full border-4 border-slate-800 sm:flex ${
                                            exp.isCurrent
                                                ? 'bg-primary-400'
                                                : 'bg-slate-600'
                                        }`}
                                    ></div>

                                    <div
                                        className={`items-start sm:grid sm:grid-cols-2 sm:gap-8 ${
                                            index % 2 === 1
                                                ? 'sm:grid-flow-col-dense'
                                                : ''
                                        }`}
                                    >
                                        <div
                                            className={`${index % 2 === 1 ? 'sm:order-1 sm:pl-8 sm:text-left' : 'sm:pr-8 sm:text-right'}`}
                                        >
                                            <div className="text-primary-400 mb-1 font-mono text-sm">
                                                {exp.date}
                                            </div>
                                            {exp.location && (
                                                <div className="text-sm text-slate-500">
                                                    {exp.location}
                                                </div>
                                            )}
                                        </div>
                                        <div
                                            className={`rounded-xl border border-slate-700 bg-slate-800 p-6 ${
                                                index % 2 === 1
                                                    ? 'sm:order-0 sm:mr-8'
                                                    : 'sm:ml-8'
                                            }`}
                                        >
                                            {exp.isCurrent && (
                                                <div className="mb-2 flex items-center gap-2">
                                                    <span className="h-2 w-2 rounded-full bg-green-400"></span>
                                                    <span className="text-xs font-medium text-green-400">
                                                        CURRENT
                                                    </span>
                                                </div>
                                            )}
                                            <h3 className="mb-1 text-lg font-semibold">
                                                {exp.title}
                                            </h3>
                                            <p className="mb-4 text-sm text-slate-400">
                                                {exp.company}
                                            </p>
                                            <ul className="space-y-2 text-sm text-slate-400">
                                                {exp.achievements.map(
                                                    (achievement, i) => (
                                                        <li
                                                            key={i}
                                                            className="flex items-start gap-2"
                                                        >
                                                            <span className="text-primary-400 mt-1">
                                                                →
                                                            </span>
                                                            <span>
                                                                {achievement}
                                                            </span>
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="bg-slate-800/30 py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <Reveal>
                            <div className="mb-16 text-center">
                                <div className="mb-6 inline-flex items-center rounded-full border border-slate-700 bg-slate-800 px-3 py-1 font-mono text-xs text-slate-400">
                                    TESTIMONIALS
                                </div>
                                <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                                    What People
                                    <span className="gradient-text"> Say</span>
                                </h2>
                                <p className="mx-auto max-w-2xl text-slate-400">
                                    Feedback from colleagues and clients I've
                                    had the pleasure to work with.
                                </p>
                            </div>
                        </Reveal>

                        <div className="grid gap-6 md:grid-cols-3">
                            {testimonials.map((testimonial, index) => (
                                <Reveal key={index} delay={index as 0 | 1 | 2}>
                                    <div className="card-hover group flex h-full flex-col rounded-xl border border-slate-700 bg-slate-800/50 p-6 transition-all hover:border-teal-400/30">
                                        <div className="mb-4 text-4xl text-teal-400/30">
                                            "
                                        </div>
                                        <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-300">
                                            {testimonial.quote}
                                        </p>
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 font-mono text-sm font-bold text-slate-900">
                                                {testimonial.avatar}
                                            </div>
                                            <div>
                                                <div className="font-medium">
                                                    {testimonial.author}
                                                </div>
                                                <div className="text-xs text-slate-500">
                                                    {testimonial.role},{' '}
                                                    {testimonial.company}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact / Footer Section */}
                <section
                    id="contact"
                    className="border-t border-slate-800 bg-slate-900 py-24"
                >
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-3xl text-center">
                            <div className="mb-6 inline-flex items-center rounded-full border border-green-400/30 bg-green-400/10 px-4 py-1.5 font-mono text-sm font-medium text-green-400">
                                <span className="mr-2 text-lg">●</span>
                                Available for Immediate Start
                            </div>
                            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                                Ready to Join Your
                                <span className="gradient-text"> Team</span>
                            </h2>
                            <p className="mb-8 text-lg text-slate-400">
                                I'm currently looking for my next challenge.
                                Whether you need a Senior Backend Engineer,
                                Technical Lead, or Consultant—let's talk about
                                how I can help your team succeed.
                            </p>

                            {/* Hiring CTA Buttons */}
                            <div className="mb-12 flex flex-col justify-center gap-4 sm:flex-row">
                                <a
                                    href="https://calendly.com/aslam4webz"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-primary-400 hover:bg-primary-500 inline-flex items-center justify-center gap-2 rounded-lg px-8 py-4 text-lg font-semibold text-slate-900 transition-colors"
                                >
                                    <svg
                                        className="h-5 w-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        ></path>
                                    </svg>
                                    Schedule an Interview
                                </a>
                                <a
                                    href="mailto:aslam4webz@gmail.com?subject=Job Opportunity - [Your Company]"
                                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-600 bg-slate-800 px-8 py-4 text-lg font-medium text-white transition-colors hover:border-slate-500 hover:bg-slate-700"
                                >
                                    <svg
                                        className="h-5 w-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        ></path>
                                    </svg>
                                    Send Job Offer
                                </a>
                            </div>

                            {/* Social Links */}
                            <div className="mb-12 flex flex-wrap justify-center gap-4">
                                <a
                                    href="https://github.com/aslamwebz"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-700"
                                >
                                    <svg
                                        className="h-5 w-5"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                    GitHub
                                </a>
                                <a
                                    href="https://linkedin.com/in/aslam4webz"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-700"
                                >
                                    <svg
                                        className="h-5 w-5"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                    LinkedIn
                                </a>
                                <a
                                    href="/resume.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-700"
                                >
                                    <svg
                                        className="h-5 w-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        ></path>
                                    </svg>
                                    Download Resume
                                </a>
                            </div>

                            {/* Quick Contact Form */}
                            <div className="rounded-xl border border-slate-700 bg-slate-800 p-6 text-left">
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        alert(
                                            'Message sent! (Form submission would be implemented here)',
                                        );
                                    }}
                                >
                                    <div className="mb-4 grid gap-4 sm:grid-cols-2">
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-slate-400">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                className="focus:border-primary-400 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-white focus:outline-none"
                                                placeholder="Your name"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-slate-400">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                className="focus:border-primary-400 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-white focus:outline-none"
                                                placeholder="your@email.com"
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="mb-2 block text-sm font-medium text-slate-400">
                                            Message
                                        </label>
                                        <textarea
                                            rows={4}
                                            className="focus:border-primary-400 w-full resize-none rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-white focus:outline-none"
                                            placeholder="Tell me about your project..."
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-primary-400 hover:bg-primary-500 w-full rounded-lg px-6 py-3 font-semibold text-slate-900 transition-colors"
                                    >
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 sm:flex-row">
                            <div className="text-center sm:text-left">
                                <div className="font-mono text-sm text-slate-400">
                                    Mohamed Aslam
                                </div>
                                <div className="text-xs text-slate-500">
                                    Senior Backend Engineer • Lisbon, Portugal •
                                    Global Remote
                                </div>
                            </div>
                            <div className="flex gap-6 text-sm text-slate-500">
                                <a
                                    href="https://github.com/aslamwebz"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-primary-400 transition-colors"
                                >
                                    GitHub
                                </a>
                                <a
                                    href="https://linkedin.com/in/aslam4webz"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-primary-400 transition-colors"
                                >
                                    LinkedIn
                                </a>
                                <a
                                    href="mailto:aslam4webz@gmail.com"
                                    className="hover:text-primary-400 transition-colors"
                                >
                                    Email
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
