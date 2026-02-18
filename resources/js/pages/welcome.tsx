import { Head, usePage } from '@inertiajs/react';
import Terminal from '@/components/terminal';
import Navigation from '@/components/navigation';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage().props;

    const techStack = [
        {
            icon: (
                <svg
                    className="h-6 w-6 text-blue-400"
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
            ),
            title: 'Core',
            tags: ['PHP', 'Laravel', 'MySQL'],
        },
        {
            icon: (
                <svg
                    className="text-primary-400 h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    ></path>
                </svg>
            ),
            title: 'TALL Stack',
            tags: ['Tailwind', 'Alpine.js', 'Livewire'],
        },
        {
            icon: (
                <svg
                    className="h-6 w-6 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                    ></path>
                </svg>
            ),
            title: 'Tools',
            tags: ['Filament', 'Nova', 'Docker', 'Git', 'Pest'],
        },
        {
            icon: (
                <svg
                    className="h-6 w-6 text-orange-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    ></path>
                </svg>
            ),
            title: 'Architecture',
            tags: ['REST APIs', 'JSON', 'OOP', 'Linux'],
        },
    ];

    const experiences = [
        {
            date: 'May 2021 - Present',
            location: 'Remote, UK',
            isCurrent: true,
            title: 'Senior Backend Engineer',
            company: 'Digital Egg / Fullstripe',
            achievements: [
                'Architected high-traffic backends handling 10M+ requests/month with 99.9% uptime',
                'Integrated complex payment processors (Stripe, PayPal) processing $2M+ annually',
                'Led refactoring efforts that reduced bug reports by 40% and improved deployment speed by 60%',
                'Mentored 3 junior developers and established code review best practices',
            ],
        },
        {
            date: '2018 - 2020',
            location: '',
            isCurrent: false,
            title: 'Full Stack PHP Developer',
            company: 'Digital Agency',
            achievements: [
                'Delivered 15+ custom WordPress plugins and Laravel applications for enterprise clients',
                'Reduced page load times by 50% through optimization and caching strategies',
                'Implemented RESTful APIs integrating with 10+ third-party services',
            ],
        },
        {
            date: '2012 - 2018',
            location: '',
            isCurrent: false,
            title: 'IT & Network Systems Administrator',
            company: 'Enterprise Organization',
            achievements: [
                'Managed infrastructure for 500+ users across 3 locations',
                'Achieved CCNA certification and implemented enterprise security protocols',
                'Reduced system downtime by 75% through proactive monitoring and maintenance',
            ],
        },
    ];

    const stats = [
        { value: '12+', label: 'Years Experience' },
        { value: '50+', label: 'Projects Delivered' },
        { value: '99.9%', label: 'Uptime Achieved' },
        { value: '10M+', label: 'API Requests/Month' },
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

                    <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid items-center gap-12 lg:grid-cols-2">
                            {/* Left Content */}
                            <div className="animate-slide-up">
                                <div className="mb-6 inline-flex items-center rounded-full border border-green-400/30 bg-green-400/10 px-4 py-1.5 font-mono text-sm font-medium text-green-400">
                                    <span className="mr-2 text-lg">●</span>
                                    Open to Work — Available Immediately
                                </div>

                                <h1 className="mb-6 text-4xl leading-tight font-bold sm:text-5xl lg:text-6xl">
                                    Senior Backend Engineer
                                    <span className="gradient-text">
                                        {' '}
                                        Ready to Build
                                    </span>
                                    <br />& Scale Your Product
                                </h1>

                                <p className="mb-8 max-w-xl text-lg leading-relaxed text-slate-400">
                                    I help companies build high-performance,
                                    scalable applications that handle millions
                                    of requests. With 12+ years of experience
                                    and a proven track record of reducing costs
                                    and improving performance.
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
                            <div className="animate-fade-in lg:pl-8">
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
                            <div className="relative">
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
                            <div>
                                <div className="mb-6 inline-flex items-center rounded-full border border-slate-700 bg-slate-800 px-3 py-1 font-mono text-xs text-slate-400">
                                    ABOUT ME
                                </div>

                                <h2 className="mb-6 text-3xl font-bold sm:text-4xl">
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
                        <div className="mb-16 text-center">
                            <div className="mb-6 inline-flex items-center rounded-full border border-slate-700 bg-slate-800 px-3 py-1 font-mono text-xs text-slate-400">
                                WHY HIRE ME
                            </div>
                            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                                What Sets Me
                                <span className="gradient-text"> Apart</span>
                            </h2>
                            <p className="mx-auto max-w-2xl text-slate-400">
                                Beyond technical skills, here's why I'm the
                                right engineer for your team.
                            </p>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {whyHireMe.map((item, index) => (
                                <div
                                    key={index}
                                    className="rounded-xl border border-slate-700 bg-slate-800/50 p-6 transition-all hover:border-slate-600"
                                >
                                    <div className="bg-primary-400/10 text-primary-400 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                                        {item.icon}
                                    </div>
                                    <h3 className="mb-2 font-semibold">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm leading-relaxed text-slate-400">
                                        {item.description}
                                    </p>
                                </div>
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
                            {techStack.map((stack) => (
                                <div
                                    key={stack.title}
                                    className="hover:border-primary-400/50 group rounded-xl border border-slate-700 bg-slate-800 p-6 transition-colors"
                                >
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10 transition-transform group-hover:scale-110">
                                        {stack.icon}
                                    </div>
                                    <h3 className="mb-3 font-semibold">
                                        {stack.title}
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {stack.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded bg-slate-900 px-2 py-1 font-mono text-xs text-slate-300"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
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

                {/* Projects Section */}
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
                                A collection of projects I've built, showcasing
                                my expertise in full-stack development, AI
                                integration, and modern web technologies.
                            </p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-3">
                            {projects.slice(0, 3).map((project) => (
                                <div
                                    key={project.id}
                                    className="hover:border-primary-400/50 group overflow-hidden rounded-xl border border-slate-700 bg-slate-800 transition-all"
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
                                    <div className="p-6">
                                        <h3 className="mb-2 text-lg font-semibold">
                                            {project.title}
                                        </h3>
                                        <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-slate-400">
                                            {project.description}
                                        </p>
                                        <div className="mb-4 flex flex-wrap gap-2">
                                            {project.technologies
                                                .slice(0, 4)
                                                .map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="rounded bg-slate-900 px-2 py-1 font-mono text-xs text-slate-400"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
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

                        {/* More Projects Link */}
                        <div className="mt-12 text-center">
                            <a
                                href="/projects"
                                className="bg-primary-400/10 text-primary-400 border-primary-400/30 hover:bg-primary-400/20 inline-flex items-center gap-2 rounded-lg border px-6 py-3 font-medium transition-all"
                            >
                                View All Projects
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
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    ></path>
                                </svg>
                            </a>
                        </div>
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
