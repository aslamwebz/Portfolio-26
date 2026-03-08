import { Head, usePage } from '@inertiajs/react';
import type { Variants } from 'framer-motion';
import { motion, useInView, animate } from 'framer-motion';
import { useRef, useEffect, useState, useCallback } from 'react';
import Navigation from '@/components/navigation';
import { Reveal } from '@/components/reveal';
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

// Framer Motion Variants
const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
};

const slideInLeft: Variants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
};

const slideInRight: Variants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
};

function AnimatedCounter({
    from,
    to,
    duration = 2,
}: {
    from: number;
    to: number;
    duration?: number;
}) {
    const nodeRef = useRef<HTMLSpanElement>(null);
    const isInView = useInView(nodeRef, { once: true, margin: '-50px' });

    useEffect(() => {
        if (!isInView || !nodeRef.current) return;
        const controls = animate(from, to, {
            duration,
            ease: 'easeOut',
            onUpdate(value: number) {
                if (nodeRef.current) {
                    nodeRef.current.textContent = Math.round(value).toString();
                }
            },
        });
        return () => controls.stop();
    }, [from, to, duration, isInView]);

    return <span ref={nodeRef}>{from}</span>;
}

function AnimatedSection({
    children,
    className = '',
}: {
    children: React.ReactNode;
    className?: string;
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });
    return (
        <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export default function Dashboard({
    dbProjects = [],
    dbCertifications = [],
}: {
    dbProjects?: DbProject[];
    dbCertifications?: DbCertification[];
}) {
    const { auth } = usePage().props;
    const heroContentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!heroContentRef.current) return;
            const rect = heroContentRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            heroContentRef.current.style.setProperty('--mouse-x', `${x}px`);
            heroContentRef.current.style.setProperty('--mouse-y', `${y}px`);
        };
        const hero = document.getElementById('hero-section');
        if (hero) hero.addEventListener('mousemove', handleMouseMove);
        return () => {
            if (hero) hero.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const categorization = [
        {
            title: 'Backend & Architecture',
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
                    />
                </svg>
            ),
            icons: [
                {
                    name: 'PHP',
                    url: '/icons/php.svg',
                },
                {
                    name: 'Laravel',
                    url: '/icons/laravel.svg',
                },
                {
                    name: 'MySQL',
                    url: '/icons/mysql.svg',
                },
                {
                    name: 'Livewire',
                    url: '/icons/livewire.svg',
                },
                {
                    name: 'REST',
                    url: '/icons/rest.svg',
                },
                {
                    name: 'RBAC',
                    url: '/icons/rbac.svg',
                },
                {
                    name: 'OAuth 2.0',
                    url: '/icons/oauth.svg',
                },
                {
                    name: 'Redis',
                    url: '/icons/redis.svg',
                },
                {
                    name: 'Events',
                    url: '/icons/events.svg',
                },
                {
                    name: 'Sanctum',
                    url: '/icons/sanctum.svg',
                },
                {
                    name: 'Passport',
                    url: '/icons/passport.svg',
                },
                {
                    name: 'Queues',
                    url: '/icons/queues.svg',
                },
                {
                    name: 'Horizon',
                    url: '/icons/horizon.svg',
                },
                {
                    name: 'Multi-tenant',
                    url: '/icons/multi-tenant.svg',
                },
                {
                    name: 'Microservices',
                    url: '/icons/microservices.svg',
                },
            ],
        },
        {
            title: 'Frontend & UI',
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
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                </svg>
            ),
            icons: [
                {
                    name: 'Filament',
                    url: '/icons/filament.svg',
                },
                {
                    name: 'Nova',
                    url: '/icons/nova.svg',
                },
                {
                    name: 'API Dev',
                    url: '/icons/api-dev.svg',
                },
                {
                    name: 'HTML5',
                    url: '/icons/html5.svg',
                },
                {
                    name: 'CSS3',
                    url: '/icons/css3.svg',
                },
                {
                    name: 'JavaScript',
                    url: '/icons/javascript.svg',
                },
                {
                    name: 'Alpine.js',
                    url: '/icons/alpinejs.svg',
                },
                {
                    name: 'Vue.js',
                    url: '/icons/vuejs.svg',
                },
                {
                    name: 'TailwindCSS',
                    url: '/icons/tailwindcss.svg',
                },
            ],
        },
        {
            title: 'Cloud & DevOps',
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
                        d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                    />
                </svg>
            ),
            icons: [
                {
                    name: 'Git',
                    url: '/icons/git.svg',
                },
                {
                    name: 'GitHub',
                    url: '/icons/github.svg',
                },
                {
                    name: 'Docker',
                    url: '/icons/docker.svg',
                },
                {
                    name: 'Bitbucket',
                    url: '/icons/bitbucket.svg',
                },
                {
                    name: 'Azure',
                    url: '/icons/azure.svg',
                },
                {
                    name: 'Actions',
                    url: '/icons/actions.svg',
                },
                {
                    name: 'CI/CD',
                    url: '/icons/cicd.svg',
                },
                {
                    name: 'Linux',
                    url: '/icons/linux.svg',
                },
            ],
        },
        {
            title: 'Quality & Monitoring',
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
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            ),
            icons: [
                {
                    name: 'PHPUnit',
                    url: '/icons/phpunit.svg',
                },
                {
                    name: 'Pest',
                    url: '/icons/pest.svg',
                },
                {
                    name: 'OpenAPI',
                    url: '/icons/openapi.svg',
                },
                {
                    name: 'Postman',
                    url: '/icons/postman.svg',
                },
                {
                    name: 'Sentry',
                    url: '/icons/sentry.svg',
                },
                {
                    name: 'Telescope',
                    url: '/icons/telescope.svg',
                },
                {
                    name: 'Logrocket',
                    url: '/icons/logrocket.svg',
                },
            ],
        },
        {
            title: 'AI Development',
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
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                </svg>
            ),
            icons: [
                {
                    name: 'Claude Code',
                    url: '/icons/claude.svg',
                },
                {
                    name: 'Cursor',
                    url: '/icons/cursor.svg',
                },
                {
                    name: 'Windsurf',
                    url: '/icons/windsurf.svg',
                },
                {
                    name: 'Perplexity',
                    url: '/icons/perplexity.svg',
                },
                {
                    name: 'OpenAI',
                    url: '/icons/open-code.svg',
                },
                {
                    name: 'Ollama',
                    url: '/icons/ollama.svg',
                },
                {
                    name: 'LRVL Boost',
                    url: '/icons/lrvl-boost.svg',
                },
                {
                    name: 'AI SDK',
                    url: '/icons/ai-sdk.svg',
                },
            ],
        },
        {
            title: 'Static Analysis',
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
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                </svg>
            ),
            icons: [
                {
                    name: 'Rector',
                    url: '/icons/rector.svg',
                },
                {
                    name: 'Pint',
                    url: '/icons/pint.svg',
                },
                {
                    name: 'PHPStan',
                    url: '/icons/phpstan.svg',
                },
                {
                    name: 'Larastan',
                    url: '/icons/larastan.svg',
                },
            ],
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
                        d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
                    />
                </svg>
            ),
            title: 'Adaptability & Quick Learning',
            description:
                'I thrive in fast-paced environments, quickly mastering new technologies and adapting to evolving infrastructure and business requirements with a growth-oriented mindset.',
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

    const [activeFilter, setActiveFilter] = useState('All');

    // Strictly Backend-Driven Data with Laravel Priority
    const displayProjects = dbProjects
        .map((p) => ({
            id: p.id,
            title: p.title,
            description: p.description,
            link: p.link,
            image: p.image
                ? p.image.startsWith('http')
                    ? p.image
                    : p.image.startsWith('/')
                      ? p.image
                      : `/${p.image}`
                : '/img/ai-main.png',
            github: p.github,
            technologies: Array.isArray(p.technologies) ? p.technologies : [],
            category: p.category,
        }))
        .sort((a, b) => {
            const aHasLaravel = a.technologies.some((t) =>
                t.toLowerCase().includes('laravel'),
            );
            const bHasLaravel = b.technologies.some((t) =>
                t.toLowerCase().includes('laravel'),
            );
            // Laravel comes first
            if (aHasLaravel && !bHasLaravel) return -1;
            if (!aHasLaravel && bHasLaravel) return 1;
            return 0;
        });

    const filteredProjects =
        activeFilter === 'All'
            ? displayProjects
            : displayProjects.filter((p) =>
                  p.technologies.some((t) => {
                      const tech = t.toLowerCase();
                      const filter = activeFilter.toLowerCase();
                      if (tech === filter) return true;

                      // Smart matching for common ecosystem tags
                      if (filter === 'php') {
                          return [
                              'laravel',
                              'wordpress',
                              'php',
                              'livewire',
                              'tall',
                              'pest',
                              'phpunit',
                              'blade',
                          ].some((p) => tech.includes(p));
                      }
                      if (filter === 'vue') {
                          return ['vue', 'nuxt', 'vite'].some((p) =>
                              tech.includes(p),
                          );
                      }
                      if (filter === 'react') {
                          return ['react', 'next', 'vite', 'remix'].some((p) =>
                              tech.includes(p),
                          );
                      }
                      return false;
                  }),
              );

    const displayCertifications = dbCertifications.map((c) => ({
        name: c.name,
        issuer: c.issuer,
        year: c.year,
        description: c.description || '',
        image: c.image
            ? c.image.startsWith('http')
                ? c.image
                : c.image.startsWith('/')
                  ? c.image
                  : `/${c.image}`
            : '/img/certifications/MCSA.jpg',
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

    const [selectedCertIndex, setSelectedCertIndex] = useState<number | null>(
        null,
    );

    const [selectedProjectIndex, setSelectedProjectIndex] = useState<
        number | null
    >(null);

    const nextCert = useCallback(() => {
        if (selectedCertIndex === null) return;
        setSelectedCertIndex(
            (prev) => (prev! + 1) % displayCertifications.length,
        );
    }, [selectedCertIndex, displayCertifications.length]);

    const prevCert = useCallback(() => {
        if (selectedCertIndex === null) return;
        setSelectedCertIndex(
            (prev) =>
                (prev! - 1 + displayCertifications.length) %
                displayCertifications.length,
        );
    }, [selectedCertIndex, displayCertifications.length]);

    const nextProject = useCallback(() => {
        if (selectedProjectIndex === null) return;
        setSelectedProjectIndex(
            (prev) => (prev! + 1) % filteredProjects.length,
        );
    }, [selectedProjectIndex, filteredProjects.length]);

    const prevProject = useCallback(() => {
        if (selectedProjectIndex === null) return;
        setSelectedProjectIndex(
            (prev) =>
                (prev! - 1 + filteredProjects.length) % filteredProjects.length,
        );
    }, [selectedProjectIndex, filteredProjects.length]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedCertIndex !== null) {
                if (e.key === 'ArrowRight') nextCert();
                if (e.key === 'ArrowLeft') prevCert();
            }
            if (selectedProjectIndex !== null) {
                if (e.key === 'ArrowRight') nextProject();
                if (e.key === 'ArrowLeft') prevProject();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [
        selectedCertIndex,
        nextCert,
        prevCert,
        selectedProjectIndex,
        nextProject,
        prevProject,
    ]);

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

            <div className="min-h-screen bg-[#0A0A0A] text-white">
                <Navigation auth={auth} />

                {/* Cinematic Hero Section */}
                <section
                    id="hero-section"
                    className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0A0A0A] pt-20"
                >
                    {/* Background layers */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,20,20,1)_0%,rgba(0,0,0,1)_100%)]" />
                    <div className="grain-overlay absolute inset-0" />

                    {/* Spotlight mouse tracker */}
                    <div
                        ref={heroContentRef}
                        className="hero-spotlight absolute inset-0 z-0"
                    />

                    {/* Accent Lines */}
                    <div className="pointer-events-none absolute inset-0 flex justify-between px-[5vw] opacity-10">
                        {[...Array(6)].map((_, i) => (
                            <div
                                key={i}
                                className="relative h-full w-[1px] bg-slate-800"
                            >
                                <div
                                    className="animate-beam absolute top-0 left-0 h-32 w-full bg-gradient-to-b from-transparent via-indigo-500 to-transparent"
                                    style={{
                                        animationDelay: `${i * 1.5}s`,
                                        opacity: i % 2 === 0 ? 0.6 : 0.3,
                                    }}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="relative z-10 mx-auto flex w-full max-w-[90rem] flex-col gap-16 px-4 sm:px-6 lg:px-8 xl:flex-row xl:items-center xl:justify-between xl:gap-8">
                        {/* Left: Typography & Hero Messaging */}
                        <div className="flex w-full flex-col xl:w-1/2 xl:pr-12">
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    scale: 0.9,
                                    filter: 'blur(10px)',
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    filter: 'blur(0px)',
                                }}
                                transition={{
                                    duration: 0.8,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className="mb-8 inline-flex items-center gap-3 self-start rounded-full border border-white/5 bg-white/5 px-4 py-2 text-xs font-semibold tracking-widest text-slate-300 uppercase backdrop-blur-md"
                            >
                                <span className="relative flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                                </span>
                                System Architect & Backend Engineer
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.8,
                                    delay: 0.1,
                                    ease: 'easeOut',
                                }}
                                className="text-[3.5rem] leading-[1.05] font-black tracking-tight text-white sm:text-[4.5rem] md:text-[5.5rem]"
                            >
                                Building the
                                <br />
                                <span className="hero-gradient-text block py-2 pr-2">
                                    Infrastructure
                                </span>
                                of Tomorrow.
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.8,
                                    delay: 0.2,
                                    ease: 'easeOut',
                                }}
                                className="mt-8 max-w-xl text-lg leading-relaxed font-light text-slate-400 sm:text-xl"
                            >
                                I write{' '}
                                <span className="font-medium tracking-wide text-slate-200">
                                    high-octane Laravel applications
                                </span>{' '}
                                that scale instantly, secure effortlessly, and
                                perform beyond expectations.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.8,
                                    delay: 0.3,
                                    ease: 'easeOut',
                                }}
                                className="mt-12 flex flex-wrap items-center gap-6"
                            >
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
                                    className="group relative inline-flex h-14 items-center justify-center gap-3 overflow-hidden rounded-full bg-white px-8 text-sm font-bold tracking-wide text-black transition-all hover:scale-105"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        Deploy the Future
                                        <svg
                                            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2.5}
                                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                                            />
                                        </svg>
                                    </span>
                                    <div className="absolute inset-0 z-0 bg-gradient-to-r from-indigo-200 via-white to-fuchsia-200 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                </a>
                                <a
                                    href="https://github.com/aslamwebz"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex h-14 items-center justify-center gap-3 rounded-full border border-white/10 bg-white/5 px-8 text-sm font-semibold text-slate-300 backdrop-blur-md transition-all hover:bg-white/10 hover:text-white"
                                >
                                    View GitHub
                                </a>
                            </motion.div>
                        </div>

                        {/* Right: Floating Code Card & Stats */}
                        <div className="relative flex w-full flex-col items-center justify-center xl:w-1/2">
                            {/* Stats overlay boxes */}
                            <motion.div
                                initial={{ opacity: 0, x: -50, y: -20 }}
                                animate={{ opacity: 1, x: 0, y: 0 }}
                                transition={{
                                    duration: 0.8,
                                    delay: 0.5,
                                    ease: 'easeOut',
                                }}
                                className="absolute top-4 -left-4 z-20 flex flex-col gap-2 rounded-2xl border border-white/10 bg-black/60 p-4 shadow-2xl backdrop-blur-xl md:-left-12 lg:top-12"
                            >
                                <div className="text-xs font-semibold tracking-widest text-slate-400 uppercase">
                                    Requests/sec
                                </div>
                                <div className="text-3xl font-black text-indigo-400">
                                    <AnimatedCounter
                                        from={0}
                                        to={8450}
                                        duration={2.5}
                                    />
                                    +
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 50, y: 50 }}
                                animate={{ opacity: 1, x: 0, y: 0 }}
                                transition={{
                                    duration: 0.8,
                                    delay: 0.7,
                                    ease: 'easeOut',
                                }}
                                className="absolute -right-4 bottom-12 z-20 flex flex-col gap-2 rounded-2xl border border-white/10 bg-black/60 p-4 shadow-2xl backdrop-blur-xl md:-right-8"
                            >
                                <div className="text-xs font-semibold tracking-widest text-slate-400 uppercase">
                                    Uptime
                                </div>
                                <div className="text-3xl font-black text-emerald-400">
                                    99.
                                    <AnimatedCounter
                                        from={0}
                                        to={999}
                                        duration={3}
                                    />
                                    %
                                </div>
                            </motion.div>

                            {/* Centerpiece Floating Code Window */}
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    scale: 0.9,
                                    rotateY: 15,
                                }}
                                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                                transition={{
                                    duration: 1,
                                    delay: 0.4,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                style={{ transformPerspective: 1000 }}
                                className="animate-float-slow relative w-full max-w-lg"
                            >
                                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-indigo-500 via-fuchsia-500 to-emerald-500 opacity-20 blur-xl" />
                                <div className="relative rounded-2xl border border-white/10 bg-[#0d0d12]/90 shadow-2xl backdrop-blur-2xl">
                                    <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
                                        <div className="flex gap-2">
                                            <div className="h-3 w-3 rounded-full bg-red-500/80" />
                                            <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                                            <div className="h-3 w-3 rounded-full bg-green-500/80" />
                                        </div>
                                        <div className="font-mono text-[10px] tracking-wider text-slate-500">
                                            ScaleService.php
                                        </div>
                                    </div>
                                    <div className="overflow-x-auto p-6 font-mono text-[13px] leading-relaxed tracking-wide text-slate-300">
                                        <pre>
                                            <code>
                                                <span className="code-keyword">
                                                    namespace
                                                </span>{' '}
                                                App\Services;
                                                <br />
                                                <br />
                                                <span className="code-keyword">
                                                    use
                                                </span>{' '}
                                                Illuminate\Support\Facades\Cache;
                                                <br />
                                                <br />
                                                <span className="code-keyword">
                                                    final class
                                                </span>{' '}
                                                <span className="text-indigo-300">
                                                    ScaleService
                                                </span>
                                                <br />
                                                &#123;
                                                <br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;
                                                <span className="code-keyword">
                                                    public function
                                                </span>{' '}
                                                <span className="code-function">
                                                    handleTrafficSpike
                                                </span>
                                                (
                                                <span className="code-variable">
                                                    $payload
                                                </span>
                                                ):{' '}
                                                <span className="code-keyword">
                                                    void
                                                </span>
                                                <br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;&#123;
                                                <br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <span className="code-bracket">
                                                    if
                                                </span>{' '}
                                                (!Cache::
                                                <span className="code-function">
                                                    lock
                                                </span>
                                                (
                                                <span className="code-string">
                                                    'deploy'
                                                </span>
                                                )-&gt;
                                                <span className="code-function">
                                                    get
                                                </span>
                                                ()) &#123;
                                                <br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <span className="code-keyword">
                                                    throw new
                                                </span>{' '}
                                                Exception(
                                                <span className="code-string">
                                                    'Scaling in progress'
                                                </span>
                                                );
                                                <br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;
                                                <br />
                                                <br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <span className="code-comment">
                                                    // Dispatch to horizons fast
                                                    queue
                                                </span>
                                                <br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ProcessCriticalData::
                                                <span className="code-function">
                                                    dispatch
                                                </span>
                                                (
                                                <span className="code-variable">
                                                    $payload
                                                </span>
                                                )<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&gt;
                                                <span className="code-function">
                                                    onQueue
                                                </span>
                                                (
                                                <span className="code-string">
                                                    'high-priority'
                                                </span>
                                                );
                                                <br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;&#125;
                                                <br />
                                                &#125;
                                            </code>
                                        </pre>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Scroll Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 0.8 }}
                        className="absolute bottom-6 left-1/2 -translate-x-1/2"
                    >
                        <div className="flex flex-col items-center gap-2 mix-blend-difference">
                            <span className="text-[10px] font-medium tracking-[0.2em] text-slate-400 uppercase">
                                Explore
                            </span>
                            <div className="flex h-10 w-6 items-start justify-center rounded-full border border-slate-600 p-1.5">
                                <motion.div
                                    animate={{
                                        y: [0, 12, 0],
                                        opacity: [1, 0.5, 1],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                    }}
                                    className="h-2 w-1.5 rounded-full bg-slate-400"
                                />
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* About Section */}
                <section
                    id="about"
                    className="relative border-t border-white/5 bg-[#050505] py-24"
                >
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <AnimatedSection className="grid items-center gap-16 lg:grid-cols-2">
                            {/* Left - Visual */}
                            <motion.div
                                variants={slideInLeft}
                                className="relative flex flex-col justify-center"
                            >
                                <div className="from-primary-400/10 absolute -inset-4 rounded-2xl bg-gradient-to-r to-blue-500/10 opacity-50"></div>
                                <div className="relative rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
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
                                        <div className="flex justify-between border-b border-white/5 py-2">
                                            <span className="text-slate-400">
                                                Experience
                                            </span>
                                            <span className="text-primary-400">
                                                12+ Years
                                            </span>
                                        </div>
                                        <div className="flex justify-between border-b border-white/5 py-2">
                                            <span className="text-slate-400">
                                                Focus
                                            </span>
                                            <span>Backend Architecture</span>
                                        </div>
                                        <div className="flex justify-between border-b border-white/5 py-2">
                                            <span className="text-slate-400">
                                                Location
                                            </span>
                                            <span>Lisbon, Portugal</span>
                                        </div>
                                        <div className="flex justify-between border-b border-white/5 py-2">
                                            <span className="text-slate-400">
                                                TRC Status
                                            </span>
                                            <span className="text-primary-400">
                                                Portugal TRC
                                            </span>
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
                            </motion.div>

                            {/* Right - Content */}
                            <motion.div
                                variants={slideInRight}
                                className="flex flex-col justify-center"
                            >
                                <div className="mb-4 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-slate-400 backdrop-blur-sm">
                                    ABOUT ME
                                </div>

                                <h2 className="mb-6 text-2xl font-bold sm:text-3xl">
                                    From Infrastructure to
                                    <span className="hero-gradient-text">
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
                            </motion.div>
                        </AnimatedSection>
                    </div>
                </section>

                {/* Why Hire Me Section */}
                <section className="border-y border-white/5 bg-[#0A0A0A] py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <Reveal>
                            <div className="mb-16 text-center">
                                <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-slate-400 backdrop-blur-sm">
                                    WHY HIRE ME
                                </div>
                                <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                                    What Sets Me
                                    <span className="hero-gradient-text">
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
                                    <div className="card-hover group hover:border-primary-400/30 h-full rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:bg-white/10">
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
                <section id="stack" className="bg-[#050505] py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-16 text-center">
                            <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-slate-400 backdrop-blur-sm">
                                TECH STACK
                            </div>
                            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                                Tools I Use to Build
                                <span className="hero-gradient-text">
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

                        <div className="grid gap-12 text-left sm:grid-cols-2 lg:grid-cols-3">
                            {categorization.map((category) => (
                                <div key={category.title} className="space-y-8">
                                    <div className="flex flex-col items-center gap-4 text-center">
                                        <div className="hover:border-primary-400/30 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-xl backdrop-blur-md transition-all hover:scale-110">
                                            {category.icon}
                                        </div>
                                        <h3 className="text-primary-400 text-xs font-bold tracking-[0.2em] uppercase">
                                            {category.title}
                                        </h3>
                                    </div>
                                    <div className="flex flex-wrap justify-center gap-4">
                                        {category.icons.map((icon) => (
                                            <div
                                                key={icon.name}
                                                className="group relative flex flex-col items-center gap-2"
                                            >
                                                <div className="group-hover:border-primary-400/20 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2.5 shadow-lg backdrop-blur-sm transition-all group-hover:scale-110 group-hover:bg-white/10">
                                                    <img
                                                        src={icon.url}
                                                        alt={icon.name}
                                                        className="h-full w-full object-contain"
                                                    />
                                                </div>
                                                <span className="text-[10px] font-medium text-slate-500 transition-colors group-hover:text-slate-300">
                                                    {icon.name}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Projects Section - 2 Pane Carousel */}
                <section
                    id="projects"
                    className="border-t border-white/5 bg-[#0A0A0A] py-24"
                >
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-16 text-center">
                            <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-slate-400 backdrop-blur-sm">
                                CASE STUDIES
                            </div>
                            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                                Featured
                                <span className="hero-gradient-text">
                                    {' '}
                                    Projects
                                </span>
                            </h2>
                            <p className="mx-auto max-w-2xl text-slate-400">
                                A collection of projects I&apos;ve built,
                                showcasing my expertise in full-stack
                                development, AI integration, and modern web
                                technologies.
                            </p>
                        </div>

                        <div className="mb-12 flex flex-wrap justify-center gap-4">
                            {['All', 'PHP', 'Vue', 'React', 'Python'].map(
                                (lang) => (
                                    <button
                                        key={lang}
                                        onClick={() => setActiveFilter(lang)}
                                        className={`rounded-full border px-6 py-2 text-sm font-bold transition-all duration-300 ${
                                            activeFilter === lang
                                                ? 'border-primary-400 bg-primary-400/10 text-primary-400 shadow-[0_0_20px_rgba(34,197,94,0.2)]'
                                                : 'border-white/5 bg-white/5 text-slate-400 hover:border-white/20 hover:bg-white/10 hover:text-white'
                                        } backdrop-blur-md`}
                                    >
                                        {lang}
                                    </button>
                                ),
                            )}
                        </div>

                        {filteredProjects.length > 0 ? (
                            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                {filteredProjects.map((project, index) => (
                                    <Reveal
                                        key={project.id}
                                        delay={(index % 4) as 0 | 1 | 2 | 3}
                                    >
                                        <div
                                            onClick={() =>
                                                setSelectedProjectIndex(index)
                                            }
                                            className="group hover:border-primary-400/30 cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all"
                                        >
                                            <div className="relative h-48 overflow-hidden">
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                                <div className="absolute top-4 left-4">
                                                    <span className="text-primary-400 border-primary-400/20 rounded-full border bg-black/60 px-3 py-1 text-[10px] font-bold backdrop-blur-md">
                                                        {project.category}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="p-6">
                                                <h3 className="mb-2 text-xl font-bold text-white">
                                                    {project.title}
                                                </h3>
                                                <p className="mb-4 line-clamp-2 text-sm text-slate-400">
                                                    {project.description}
                                                </p>
                                                <div className="mb-6 flex flex-wrap gap-1.5">
                                                    {project.technologies
                                                        .slice(0, 4)
                                                        .map((tech) => (
                                                            <span
                                                                key={tech}
                                                                className="rounded border border-white/5 bg-black/40 px-2 py-0.5 text-[10px] text-slate-400 backdrop-blur-sm"
                                                            >
                                                                {tech}
                                                            </span>
                                                        ))}
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    {project.link && (
                                                        <a
                                                            href={project.link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-primary-400 text-xs font-bold hover:underline"
                                                        >
                                                            Live Demo
                                                        </a>
                                                    )}
                                                    <a
                                                        href={
                                                            project.github ||
                                                            undefined
                                                        }
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-xs font-medium text-slate-500 hover:text-white"
                                                    >
                                                        Source Code
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </Reveal>
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-xl border border-dashed border-white/10 bg-white/5 py-20 text-center">
                                <p className="text-slate-500">
                                    No projects found. Add some in the admin
                                    panel!
                                </p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Certifications Section - Adjacent to Projects */}
                <section
                    id="certifications"
                    className="border-t border-white/5 bg-[#050505] py-24"
                >
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <Reveal>
                            <div className="mb-16 text-center">
                                <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-slate-400 backdrop-blur-sm">
                                    CREDENTIALS
                                </div>
                                <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                                    Certifications
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
                                        <div
                                            onClick={() =>
                                                setSelectedCertIndex(index)
                                            }
                                            className="card-hover group hover:border-primary-400/30 cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-white/5 p-0 backdrop-blur-md transition-all hover:bg-white/10"
                                        >
                                            <div className="relative h-48 w-full overflow-hidden bg-[#0A0A0A]">
                                                <img
                                                    src={cert.image}
                                                    alt={cert.name}
                                                    className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center bg-[#0A0A0A]/60 opacity-0 transition-opacity group-hover:opacity-100">
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
                                                                strokeWidth={2}
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
                                                            {cert.issuer} •{' '}
                                                            {cert.year}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Reveal>
                                ))}

                                <Dialog
                                    open={selectedProjectIndex !== null}
                                    onOpenChange={(open) =>
                                        !open && setSelectedProjectIndex(null)
                                    }
                                >
                                    <DialogContent className="max-w-[95vw] overflow-hidden border-white/10 bg-[#0A0A0A] p-0 text-white shadow-2xl xl:max-w-screen-2xl">
                                        {selectedProjectIndex !== null && (
                                            <div className="relative grid md:grid-cols-3">
                                                {/* Navigation Buttons */}
                                                <button
                                                    onClick={prevProject}
                                                    className="absolute top-1/2 left-4 z-50 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white/50 backdrop-blur-md transition-all hover:bg-white/20 hover:text-white"
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
                                                    onClick={nextProject}
                                                    className="absolute top-1/2 right-4 z-50 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white/50 backdrop-blur-md transition-all hover:bg-white/20 hover:text-white"
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

                                                {/* Left: Image */}
                                                <div className="flex items-center justify-center border-r border-white/5 bg-[#050505] p-6 md:col-span-2 md:p-12">
                                                    <img
                                                        src={
                                                            displayProjects[
                                                                selectedProjectIndex
                                                            ].image
                                                        }
                                                        alt={
                                                            displayProjects[
                                                                selectedProjectIndex
                                                            ].title
                                                        }
                                                        className="h-auto max-h-[85vh] w-full rounded-lg object-contain shadow-2xl transition-transform duration-700 hover:scale-[1.02]"
                                                    />
                                                </div>

                                                {/* Right: Details */}
                                                <div className="flex flex-col justify-center p-8 md:col-span-1 md:p-12">
                                                    <DialogHeader className="mb-6">
                                                        <div className="text-primary-400 border-primary-400/20 mb-4 inline-flex items-center self-start rounded-full border bg-black/40 px-3 py-1 text-xs font-bold backdrop-blur-md">
                                                            {
                                                                displayProjects[
                                                                    selectedProjectIndex
                                                                ].category
                                                            }
                                                        </div>
                                                        <DialogTitle className="text-2xl font-bold text-white md:text-3xl lg:text-4xl">
                                                            {
                                                                displayProjects[
                                                                    selectedProjectIndex
                                                                ].title
                                                            }
                                                        </DialogTitle>
                                                    </DialogHeader>
                                                    <div className="space-y-6">
                                                        <p className="text-lg leading-relaxed text-slate-400 lg:text-xl">
                                                            {
                                                                displayProjects[
                                                                    selectedProjectIndex
                                                                ].description
                                                            }
                                                        </p>

                                                        <div className="flex flex-wrap gap-2 pt-4">
                                                            {displayProjects[
                                                                selectedProjectIndex
                                                            ].technologies.map(
                                                                (tech) => (
                                                                    <span
                                                                        key={
                                                                            tech
                                                                        }
                                                                        className="rounded-lg border border-white/5 bg-white/5 px-3 py-1.5 text-xs text-slate-300 backdrop-blur-sm"
                                                                    >
                                                                        {tech}
                                                                    </span>
                                                                ),
                                                            )}
                                                        </div>

                                                        <div className="flex items-center gap-4 pt-8">
                                                            {displayProjects[
                                                                selectedProjectIndex
                                                            ].link && (
                                                                <a
                                                                    href={
                                                                        displayProjects[
                                                                            selectedProjectIndex
                                                                        ].link!
                                                                    }
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="bg-primary-400 hover:bg-primary-500 inline-flex items-center gap-2 rounded-lg px-8 py-4 text-sm font-bold text-slate-900 shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all hover:scale-105 active:scale-95"
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
                                                                            strokeWidth={
                                                                                2
                                                                            }
                                                                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                                                        />
                                                                    </svg>
                                                                </a>
                                                            )}
                                                            {displayProjects[
                                                                selectedProjectIndex
                                                            ].github && (
                                                                <a
                                                                    href={
                                                                        displayProjects[
                                                                            selectedProjectIndex
                                                                        ]
                                                                            .github!
                                                                    }
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-8 py-4 text-sm font-bold text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-white/10 active:scale-95"
                                                                >
                                                                    Source Code
                                                                    <svg
                                                                        className="h-4 w-4"
                                                                        fill="currentColor"
                                                                        viewBox="0 0 24 24"
                                                                    >
                                                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                                                    </svg>
                                                                </a>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </DialogContent>
                                </Dialog>

                                <Dialog
                                    open={selectedCertIndex !== null}
                                    onOpenChange={(open) =>
                                        !open && setSelectedCertIndex(null)
                                    }
                                >
                                    <DialogContent className="max-w-[95vw] overflow-hidden border-white/10 bg-[#0A0A0A] p-0 text-white shadow-2xl xl:max-w-screen-2xl">
                                        {selectedCertIndex !== null && (
                                            <div className="relative grid md:grid-cols-2">
                                                {/* Navigation Buttons */}
                                                <button
                                                    onClick={prevCert}
                                                    className="absolute top-1/2 left-4 z-50 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white/50 backdrop-blur-md transition-all hover:bg-white/20 hover:text-white"
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
                                                    onClick={nextCert}
                                                    className="absolute top-1/2 right-4 z-50 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white/50 backdrop-blur-md transition-all hover:bg-white/20 hover:text-white"
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

                                                {/* Left: Image */}
                                                <div className="flex items-center justify-center border-r border-white/5 bg-[#050505] p-6 md:p-12">
                                                    <img
                                                        src={
                                                            displayCertifications[
                                                                selectedCertIndex
                                                            ].image
                                                        }
                                                        alt={
                                                            displayCertifications[
                                                                selectedCertIndex
                                                            ].name
                                                        }
                                                        className="h-auto max-h-[75vh] w-full rounded-lg object-contain shadow-2xl transition-transform duration-700 hover:scale-[1.02]"
                                                    />
                                                </div>

                                                {/* Right: Details */}
                                                <div className="flex flex-col justify-center p-8 md:p-12">
                                                    <DialogHeader className="mb-6">
                                                        <div className="bg-primary-400/10 text-primary-400 mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl">
                                                            {
                                                                displayCertifications[
                                                                    selectedCertIndex
                                                                ].icon
                                                            }
                                                        </div>
                                                        <DialogTitle className="text-2xl font-bold text-white md:text-3xl lg:text-4xl">
                                                            {
                                                                displayCertifications[
                                                                    selectedCertIndex
                                                                ].name
                                                            }
                                                        </DialogTitle>
                                                        <p className="text-primary-400 mt-2 font-mono text-sm tracking-widest uppercase">
                                                            {
                                                                displayCertifications[
                                                                    selectedCertIndex
                                                                ].issuer
                                                            }{' '}
                                                            •{' '}
                                                            {
                                                                displayCertifications[
                                                                    selectedCertIndex
                                                                ].year
                                                            }
                                                        </p>
                                                    </DialogHeader>
                                                    <div className="space-y-4">
                                                        <p className="text-lg leading-relaxed text-slate-400 lg:text-xl">
                                                            {
                                                                displayCertifications[
                                                                    selectedCertIndex
                                                                ].description
                                                            }
                                                        </p>
                                                        <div className="pt-8">
                                                            <a
                                                                href={
                                                                    displayCertifications[
                                                                        selectedCertIndex
                                                                    ].image
                                                                }
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="bg-primary-400 hover:bg-primary-500 inline-flex items-center gap-2 rounded-lg px-8 py-4 text-base font-bold text-slate-900 shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all hover:scale-105 active:scale-95"
                                                            >
                                                                View Full
                                                                Certificate
                                                                <svg
                                                                    className="h-5 w-5"
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
                                        )}
                                    </DialogContent>
                                </Dialog>
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
                <section id="experience" className="bg-[#0A0A0A] py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-16 text-center">
                            <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-slate-400 backdrop-blur-sm">
                                EXPERIENCE
                            </div>
                            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                                Professional
                                <span className="hero-gradient-text">
                                    {' '}
                                    Journey
                                </span>
                            </h2>
                        </div>

                        <div className="mx-auto max-w-5xl space-y-8">
                            {experiences.map((exp, index) => (
                                <div
                                    key={index}
                                    className="relative pl-8 sm:pl-0"
                                >
                                    <div className="absolute top-0 bottom-0 left-1/2 hidden w-px -translate-x-1/2 bg-white/10 sm:block"></div>
                                    <div
                                        className={`absolute top-6 left-1/2 hidden h-4 w-4 -translate-x-1/2 rounded-full border-4 border-[#0A0A0A] sm:flex ${
                                            exp.isCurrent
                                                ? 'bg-primary-400'
                                                : 'bg-white/20'
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
                                            className={`rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm ${
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
                    className="border-t border-white/5 bg-[#0A0A0A] py-24"
                >
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-3xl text-center">
                            <div className="mb-6 inline-flex items-center rounded-full border border-green-400/30 bg-green-400/10 px-4 py-1.5 font-mono text-sm font-medium text-green-400">
                                <span className="mr-2 text-lg">●</span>
                                Available for Immediate Start
                            </div>
                            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                                Ready to Join Your
                                <span className="hero-gradient-text">
                                    {' '}
                                    Team
                                </span>
                            </h2>
                            <p className="mb-8 text-lg text-slate-400">
                                I'm currently looking for my next challenge.
                                Whether you need a Senior Backend Engineer,
                                Technical Lead, or Consultant—let's talk about
                                how I can help your team succeed.
                            </p>

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
                                    href="https://linkedin.com/in/emaslam"
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
                                        className="group relative w-full overflow-hidden rounded-lg bg-white px-6 py-4 font-bold text-black transition-all hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        <div className="from-primary-400 absolute inset-0 bg-gradient-to-r to-blue-500 opacity-0 transition-opacity group-hover:opacity-100" />
                                        <span className="relative z-10 transition-colors group-hover:text-white">
                                            Send Message
                                        </span>
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
                                    href="https://linkedin.com/in/emaslam"
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
