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
import { motion, useInView, Variants, animate } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

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
    link: string | null;
    image: string;
    github: string | null;
    technologies: string[];
    category: string;
}

// Framer Motion Variants
const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 32, scale: 0.97 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
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

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut' },
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
            onUpdate(value) {
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
    canRegister = true,
    dbProjects = [],
    dbCertifications = [],
}: {
    canRegister?: boolean;
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
                    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg',
                },
                {
                    name: 'Laravel',
                    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg',
                },
                {
                    name: 'MySQL',
                    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg',
                },
                {
                    name: 'Livewire',
                    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/livewire/livewire-original.svg',
                },
                {
                    name: 'REST',
                    url: 'https://cdn.simpleicons.org/fastapi/ffffff',
                },
                {
                    name: 'RBAC',
                    url: 'https://cdn.simpleicons.org/auth0/ffffff',
                },
                {
                    name: 'OAuth 2.0',
                    url: 'https://cdn.simpleicons.org/auth0/ffffff',
                },
                {
                    name: 'Redis',
                    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg',
                },
                {
                    name: 'Events',
                    url: 'https://cdn.simpleicons.org/socketdotio/ffffff',
                },
                {
                    name: 'Sanctum',
                    url: 'https://cdn.simpleicons.org/jsonwebtokens/ffffff',
                },
                {
                    name: 'Passport',
                    url: 'https://cdn.simpleicons.org/passport/ffffff',
                },
                {
                    name: 'Queues',
                    url: 'https://cdn.simpleicons.org/rabbitmq/ffffff',
                },
                {
                    name: 'Horizon',
                    url: 'https://cdn.simpleicons.org/laravelhorizon/ffffff',
                },
                {
                    name: 'Multi-tenant',
                    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
                },
                {
                    name: 'Microservices',
                    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg',
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
                    url: 'https://logo.svgcdn.com/devicon/filamentphp-original.svg',
                },
                {
                    name: 'Nova',
                    url: 'https://static.cdnlogo.com/logos/l/57/laravel.svg',
                },
                {
                    name: 'API Dev',
                    url: 'https://logo.svgcdn.com/devicon/postman-original.svg',
                },
                {
                    name: 'HTML5',
                    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
                },
                {
                    name: 'CSS3',
                    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
                },
                {
                    name: 'JavaScript',
                    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
                },
                {
                    name: 'Alpine.js',
                    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/alpinejs/alpinejs-original.svg',
                },
                {
                    name: 'Vue.js',
                    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg',
                },
                {
                    name: 'TailwindCSS',
                    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
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
                    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
                },
                {
                    name: 'GitHub',
                    url: 'https://cdn.simpleicons.org/github/ffffff',
                },
                {
                    name: 'Docker',
                    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
                },
                {
                    name: 'Bitbucket',
                    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bitbucket/bitbucket-original.svg',
                },
                {
                    name: 'Azure',
                    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg',
                },
                {
                    name: 'Actions',
                    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg',
                },
                {
                    name: 'CI/CD',
                    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gitlab/gitlab-original.svg',
                },
                {
                    name: 'Linux',
                    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg',
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
                    url: 'https://cdn.simpleicons.org/testinglibrary/ffffff',
                },
                {
                    name: 'Pest',
                    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg',
                },
                {
                    name: 'OpenAPI',
                    url: 'https://cdn.simpleicons.org/openapiinitiative/ffffff',
                },
                {
                    name: 'Postman',
                    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg',
                },
                {
                    name: 'Sentry',
                    url: 'https://cdn.simpleicons.org/sentry/ffffff',
                },
                {
                    name: 'Telescope',
                    url: 'https://cdn.simpleicons.org/opentelemetry/ffffff',
                },
                {
                    name: 'Logrocket',
                    url: 'https://cdn.simpleicons.org/rocketdotchat/ffffff',
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
                    url: 'https://cdn.simpleicons.org/anthropic/ffffff',
                },
                {
                    name: 'Cursor',
                    url: 'https://cdn.simpleicons.org/cursor/ffffff',
                },
                {
                    name: 'Windsurf',
                    url: 'data:image/svg+xml;utf8,%3Csvg%20fill%3D%27%2523ffffff%27%20role%3D%27img%27%20viewBox%3D%270%200%2024%2024%27%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%3E%3Ctitle%3ECodeium%3C/title%3E%3Cpath%20d%3D%27M1%200a1%201%200%200%200-1%201v22c0%20.063.007.124.018.184L0%2023.199l.025.026c.103.443.5.775.975.775h22a1%201%200%200%200%201-1V1a1%201%200%200%200-1-1H1zm.707%201h20.582l-2%202H3.707l-2-2zM23%201.705v20.588l-2-2V3.705l2-2zM1%201.707l2%202v16.492l-2%202V1.707zM4%204h16v16H4V4zm3.537%203c-1.006%200-1.51.535-1.51%201.605v2.297c0%20.4-.184.6-.554.6a.47.47%200%200%200-.344.139.512.512%200%200%200-.129.365.49.49%200%200%200%20.129.353.47.47%200%200%200%20.344.139c.37%200%20.554.2.554.6v2.297c0%201.07.504%201.605%201.51%201.605.136%200%20.248-.05.334-.148A.494.494%200%200%200%208%2016.498a.512.512%200%200%200-.129-.365.439.439%200%200%200-.334-.139c-.376%200-.564-.199-.564-.6v-2.296c0-.46-.1-.823-.297-1.092.099-.138.173-.3.222-.485.05-.183.075-.389.075-.619V8.605c0-.4.188-.6.564-.6a.439.439%200%200%200%20.334-.138A.499.499%200%200%200%208%207.512a.53.53%200%200%200-.129-.364A.425.425%200%200%200%207.537%207zm8.926%200a.425.425%200%200%200-.334.148.53.53%200%200%200-.129.364.5.5%200%200%200%20.129.355.439.439%200%200%200%20.334.139c.376%200%20.564.199.564.6v2.296c0%20.23.025.436.075.62.049.183.123.346.222.484-.197.27-.297.632-.297%201.092v2.297c0%20.4-.188.6-.564.6a.439.439%200%200%200-.334.138.512.512%200%200%200-.129.365c0%20.145.043.262.129.354a.425.425%200%200%200%20.334.148c1.006%200%201.51-.535%201.51-1.605v-2.297c0-.4.184-.6.554-.6a.439.439%200%200%200%20.334-.139.475.475%200%200%200%20.139-.353.492.492%200%200%200-.139-.365.439.439%200%200%200-.334-.139c-.37%200-.554-.2-.554-.6V8.605c0-1.07-.504-1.605-1.51-1.605zm-7.25%206a.737.737%200%200%200-.496.227.717.717%200%200%200-.217.529.74.74%200%200%200%20.75.744.74.74%200%200%200%20.75-.744.717.717%200%200%200-.217-.53A.71.71%200%200%200%209.25%2013h-.037zm2.75%200a.737.737%200%200%200-.496.227.717.717%200%200%200-.217.529.74.74%200%200%200%20.217.53c.152.143.33.214.533.214a.74.74%200%200%200%20.75-.744.717.717%200%200%200-.217-.53A.71.71%200%200%200%2012%2013h-.037zm2.75%200a.737.737%200%200%200-.496.227.717.717%200%200%200-.217.529.74.74%200%200%200%20.217.53c.152.143.33.214.533.214a.74.74%200%200%200%20.75-.744.717.717%200%200%200-.217-.53.71.71%200%200%200-.533-.226h-.037zm-11.1%208h16.68l2%202H1.613l2-2z%27/%3E%3C/svg%3E',
                },
                {
                    name: 'Perplexity',
                    url: 'data:image/svg+xml;utf8,%3Csvg%20fill%3D%27%2523ffffff%27%20role%3D%27img%27%20viewBox%3D%270%200%2024%2024%27%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%3E%3Ctitle%3EPerplexity%3C/title%3E%3Cpath%20d%3D%27M22.3977%207.0896h-2.3106V.0676l-7.5094%206.3542V.1577h-1.1554v6.1966L4.4904%200v7.0896H1.6023v10.3976h2.8882V24l6.932-6.3591v6.2005h1.1554v-6.0469l6.9318%206.1807v-6.4879h2.8882V7.0896zm-3.4657-4.531v4.531h-5.355l5.355-4.531zm-13.2862.0676%204.8691%204.4634H5.6458V2.6262zM2.7576%2016.332V8.245h7.8476l-6.1149%206.1147v1.9723H2.7576zm2.8882%205.0404v-3.8852h.0001v-2.6488l5.7763-5.7764v7.0111l-5.7764%205.2993zm12.7086.0248-5.7766-5.1509V9.0618l5.7766%205.7766v6.5588zm2.8882-5.0652h-1.733v-1.9723L13.3948%208.245h7.8478v8.087z%27/%3E%3C/svg%3E',
                },
                {
                    name: 'Open Code',
                    url: 'https://cdn.simpleicons.org/vuedotjs/ffffff',
                },
                {
                    name: 'Ollama',
                    url: 'https://cdn.simpleicons.org/ollama/ffffff',
                },
                {
                    name: 'LRVL Boost',
                    url: 'https://cdn.simpleicons.org/lightning/ffffff',
                },
                {
                    name: 'AI SDK',
                    url: 'https://cdn.simpleicons.org/openai/ffffff',
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
                    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg',
                },
                {
                    name: 'Pint',
                    url: 'https://cdn.simpleicons.org/prettier/ffffff',
                },
                {
                    name: 'PHPStan',
                    url: 'data:image/svg+xml;utf8,<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path fill="%23232323" d="m6.405 24.179l-.636 1.506a1.008 1.008 0 0 0 .547 1.269a1.031 1.031 0 0 0 1.316-.348l.218-.521Z"/><path fill="%23516cb3" d="M16.08 4.6a7.47 7.47 0 0 1 4.47 1.5a.408.408 0 0 0 .536 0a.385.385 0 0 0 .029-.538a1.747 1.747 0 0 0-.9-.593a3.11 3.11 0 0 1 2.531-.961c2.323 0 7.258 3.374 7.258 9.7c0 6.074-3.977 7.383-5.058 7.383c-1.645 0-3.351-1.7-3.351-2.781a4.886 4.886 0 0 0 2.363-3.32s.087-2.591 0-4.786a.462.462 0 0 0-.138-.254a.457.457 0 0 0-.261-.121a.412.412 0 0 0-.294.117a.418.418 0 0 0-.126.292c0 .245.108 1.762.027 4.486a3.66 3.66 0 0 1-2.086 2.87a15.766 15.766 0 0 0 .528-1.827c.051-.239 0-.405-.159-.473a.353.353 0 0 0-.4.08a.357.357 0 0 0-.076.123c-.107.215-3.885 12.5-9.111 12.5c-4.415 0-6.96-6.3-6.96-7.745a1.884 1.884 0 0 1 1.734-2.126A3.329 3.329 0 0 1 8.688 19.2c.135.26-.582.883-.582.883l-.625-.5a.384.384 0 0 0-.488.014a.364.364 0 0 0-.01.511c.159.16 4.932 4.006 4.932 4.006a.445.445 0 0 0 .568.037a.377.377 0 0 0 .017-.529l-1.344-1.083l1.432-4.03s-2.2-.982-3.632.1a2.79 2.79 0 0 0-2.261-1.261a2.5 2.5 0 0 0-1.738.666a2.537 2.537 0 0 0-.808 1.686A8.647 8.647 0 0 1 2 13.741c0-4.378 3.467-9.735 7.487-9.735a3.916 3.916 0 0 1 2.488.889l-.888.675a.407.407 0 0 0-.03.558a.377.377 0 0 0 .507.051A6.486 6.486 0 0 1 16.08 4.6"/><path fill="%23232323" d="m9.853 21.5l1.273-2.884a9.495 9.495 0 0 0 1.543.16a5.887 5.887 0 0 0 5.761-5.939a6 6 0 0 0-12-.194a5.826 5.826 0 0 0 2.7 5.14l-1.024 2.309Zm9.908-8.49a.318.318 0 0 1-.27-.149a.322.322 0 0 1-.018-.309a1.5 1.5 0 0 1 1.244-.849a1.483 1.483 0 0 1 1.241.8a.322.322 0 0 1 .025.248a.32.32 0 0 1-.159.191a.318.318 0 0 1-.432-.148a.848.848 0 0 0-.675-.452c-.433 0-.666.481-.67.481a.318.318 0 0 1-.286.186Z"/><path fill="%23d2d2d2" d="M12.425 16.7a3.86 3.86 0 1 0-3.832-3.86a3.846 3.846 0 0 0 3.832 3.86"/><path fill="%23232323" d="M12.425 14.834a1.992 1.992 0 1 0-1.978-1.992a1.985 1.985 0 0 0 1.978 1.992"/></svg>',
                },
                {
                    name: 'Larastan',
                    url: 'https://cdn.simpleicons.org/php/white',
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
            school: 'DCB',
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

                        {displayProjects.length > 0 ? (
                            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                {displayProjects.map((project, index) => (
                                    <Reveal
                                        key={project.id}
                                        delay={(index % 4) as 0 | 1 | 2 | 3}
                                    >
                                        <div className="group hover:border-primary-400/30 overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all">
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
                                    Certifications &
                                    <span className="hero-gradient-text">
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
                                                <div className="card-hover group hover:border-primary-400/30 cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-white/5 p-0 backdrop-blur-md transition-all hover:bg-white/10">
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
                                            <DialogContent className="max-w-4xl border-white/10 bg-[#0A0A0A] p-0 text-white shadow-2xl">
                                                <div className="grid md:grid-cols-2">
                                                    <div className="flex items-center justify-center border-r border-white/5 bg-[#050505] p-6">
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
