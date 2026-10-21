import { Head } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import '../../css/folio.css';

/**
 * /new — an alternative portfolio design.
 *
 * Direction: the Claude/Anthropic design language. Warm paper ground, near-black
 * ink, one terracotta accent spent in a few deliberate places, hairline rules as
 * structure, editorial spacing. Type is a geometric grotesque for display and a
 * serif for reading text — the inverse of the usual serif-headline default.
 *
 * The signature element is a request trace: a span waterfall in the vernacular of
 * Telescope and Sentry, which is the native artifact of the work being described.
 */

interface DbProject {
    id: number;
    title: string;
    description: string;
    image: string | null;
    link: string | null;
    github: string | null;
    technologies: string[] | null;
    category: string;
}

interface DbCertification {
    id: number;
    name: string;
    issuer: string;
    year: string;
}

interface DbBlogPost {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    category: string;
    published_at: string;
    reading_time: number;
}

/* ── The trace ──────────────────────────────────────────────────────────────
 * An illustrative payout request, laid out to scale against a 412ms total.
 * The point it makes without saying it: the time lives in the external call,
 * not in the framework.
 */
const TRACE_SPANS = [
    {
        label: 'POST /api/payouts',
        depth: 0,
        start: 0,
        width: 100,
        ms: '412ms',
        root: true,
    },
    { label: 'auth:sanctum', depth: 1, start: 1, width: 2, ms: '8ms' },
    {
        label: 'PayoutController@store',
        depth: 1,
        start: 3.4,
        width: 93.7,
        ms: '386ms',
    },
    {
        label: 'PaymentService::charge',
        depth: 2,
        start: 4.9,
        width: 69.4,
        ms: '286ms',
        focus: true,
    },
    {
        label: 'Stripe\\Charge::create',
        depth: 3,
        start: 10.2,
        width: 58.5,
        ms: '241ms',
        tag: 'external',
    },
    {
        label: 'db: payouts insert',
        depth: 2,
        start: 75.2,
        width: 2.2,
        ms: '9ms',
    },
    {
        label: 'queue: DispatchPayout',
        depth: 2,
        start: 80.1,
        width: 2.9,
        ms: '12ms',
    },
];

const ROLES = [
    {
        when: 'May 2021 — Present',
        where: 'Remote from Portugal · Digital Egg Ltd (UK) / Fullstripe s.r.o',
        title: 'Software Engineer',
        org: 'Digital Egg Ltd / Fullstripe s.r.o',
        current: true,
        points: [
            'Build and maintain Laravel applications for a global user base, with Vue.js, Inertia.js, and Livewire front-ends.',
            'Designed and documented 15+ REST endpoints with Laravel Sanctum, consumed by both web and mobile clients.',
            'Integrated Stripe, PayPal, and OAuth 2.0 payment and authentication flows.',
            'Established test-first development with Pest and PHPUnit against PSR-12, cutting production regressions by 40%.',
            'Built Filament and Laravel Nova admin systems that replaced manual operational workflows, improving internal team productivity by 40%.',
            'Designed event-driven workflows, job queues, and multi-environment deployments across a growing product team.',
        ],
    },
    {
        when: 'Jul 2018 — Nov 2020',
        where: 'Remote · Sri Lanka',
        title: 'WordPress & PHP Developer',
        org: 'Remote Office One',
        current: false,
        points: [
            'Built 50+ WordPress sites and PHP applications from design mockups.',
            'Maintained project documentation and the internal knowledge base.',
        ],
    },
    {
        when: 'Dec 2012 — May 2018',
        where: 'Qatar · Sri Lanka',
        title: 'IT Infrastructure & Network Engineer',
        org: 'Multiple organizations',
        current: false,
        points: [
            'Ran enterprise server, network, and security infrastructure — the layer most application engineers only ever read about in a runbook.',
        ],
    },
];

const LAYERS = [
    {
        year: '2021—',
        name: 'Laravel applications & REST APIs',
        note: 'Sanctum, queues, Filament, Pest',
        now: true,
    },
    {
        year: '2018—20',
        name: 'PHP & WordPress',
        note: 'Building from mockups, at volume',
    },
    {
        year: '2012—18',
        name: 'Servers, networks, security',
        note: 'CCNA, MCSA — the layer underneath',
    },
];

const DAILY_STACK = [
    'Laravel',
    'PHP 8.4',
    'MySQL',
    'REST',
    'Sanctum',
    'Livewire',
    'Inertia',
    'Vue',
    'Tailwind',
    'Filament',
    'Pest',
    'PHPUnit',
    'GitHub Actions',
    'Docker',
    'Redis',
    'Sentry',
];

const EDUCATION = [
    {
        year: '2025—',
        title: 'MBA, International Business',
        note: 'Imperial College of Business Studies · awarded by University of the West of Scotland',
        current: true,
    },
    {
        year: '2020—21',
        title: 'Professional Bachelor’s, Computer Systems',
        note: 'Turiba University, Riga — first year completed, then paused',
    },
    {
        year: '2011',
        title: 'GCE Advanced Level',
        note: 'Dharmadutha College, Badulla',
    },
];

function isBackendProject(project: DbProject): boolean {
    const stack = (project.technologies ?? []).join(' ').toLowerCase();
    return /laravel|php|livewire|blade|mysql/.test(stack);
}

function resolveImage(image: string | null): string {
    if (!image) return '/img/ai-main.png';
    if (image.startsWith('http') || image.startsWith('/')) return image;
    return `/${image}`;
}

function ArrowIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 17L17 7M17 7H8m9 0v9"
            />
        </svg>
    );
}

function DownloadIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v11m0 0l-4-4m4 4l4-4M4 19h16"
            />
        </svg>
    );
}

/** Fades a block in once, the first time it enters the viewport. */
function Reveal({
    children,
    className = '',
}: {
    children: React.ReactNode;
    className?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [shown, setShown] = useState(
        () => typeof IntersectionObserver === 'undefined',
    );

    useEffect(() => {
        const node = ref.current;
        if (!node || typeof IntersectionObserver === 'undefined') return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShown(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '-40px' },
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`folio-reveal ${shown ? 'is-in' : ''} ${className}`}
        >
            {children}
        </div>
    );
}

function SectionHead({ label, note }: { label: string; note?: string }) {
    return (
        <div className="folio-head">
            <span className="folio-eyebrow">{label}</span>
            <span className="folio-head__rule" />
            {note && <span className="folio-head__note">{note}</span>}
        </div>
    );
}

export default function New({
    dbProjects = [],
    dbCertifications = [],
    dbBlogPosts = [],
}: {
    dbProjects?: DbProject[];
    dbCertifications?: DbCertification[];
    dbBlogPosts?: DbBlogPost[];
}) {
    const backendWork = dbProjects.filter(isBackendProject);
    const interfaceWork = dbProjects.filter((p) => !isBackendProject(p));

    return (
        <>
            <Head title="Mohamed Aslam — Laravel engineer">
                <meta
                    name="description"
                    content="Mohamed Aslam — software engineer, four years building and maintaining Laravel applications and REST APIs in production. Based in Portugal with EU work rights."
                />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&family=JetBrains+Mono:wght@400;500&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <div className="folio">
                <header className="folio-top">
                    <div className="folio-top__inner">
                        <a href="#top" className="folio-mark">
                            Mohamed Aslam
                        </a>
                        <nav className="folio-top__nav" aria-label="Sections">
                            <a className="folio-top__link" href="#work">
                                Work
                            </a>
                            <a className="folio-top__link" href="#experience">
                                Experience
                            </a>
                            <a className="folio-top__link" href="#writing">
                                Writing
                            </a>
                            <a className="folio-top__link" href="#contact">
                                Contact
                            </a>
                        </nav>
                        <a
                            className="folio-top__cta"
                            href="/resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Resume
                        </a>
                    </div>
                </header>

                <main id="top">
                    {/* ── Hero: the thesis, and the trace that backs it ── */}
                    <section className="folio-shell folio-hero">
                        <div>
                            <p
                                className="folio-hero__standfirst folio-rise"
                                style={{ '--d': 0 } as React.CSSProperties}
                            >
                                Software engineer · Laravel
                            </p>
                            <h1
                                className="folio-h1 folio-rise"
                                style={{ '--d': 80 } as React.CSSProperties}
                            >
                                I keep other people’s <em>businesses</em>{' '}
                                running in production.
                            </h1>
                            <p
                                className="folio-hero__thesis folio-rise"
                                style={{ '--d': 160 } as React.CSSProperties}
                            >
                                Four years building and maintaining{' '}
                                <strong>
                                    Laravel applications and REST APIs
                                </strong>{' '}
                                that handle real payments and real users — after
                                six years running the servers and networks
                                underneath them.
                            </p>
                            <ul
                                className="folio-facts folio-rise"
                                style={{ '--d': 220 } as React.CSSProperties}
                            >
                                <li>
                                    <span>Based</span>Portugal
                                </li>
                                <li>
                                    <span>Work rights</span>EU residence permit
                                    — no sponsorship needed
                                </li>
                                <li>
                                    <span>Open to</span>Remote, worldwide
                                </li>
                            </ul>
                            <div
                                className="folio-actions folio-rise"
                                style={{ '--d': 280 } as React.CSSProperties}
                            >
                                <a
                                    className="folio-btn folio-btn--solid"
                                    href="#contact"
                                >
                                    Get in touch
                                </a>
                                <a
                                    className="folio-btn folio-btn--quiet"
                                    href="/resume.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Resume <DownloadIcon />
                                </a>
                            </div>
                        </div>

                        <figure
                            className="folio-trace folio-rise"
                            style={{ '--d': 340 } as React.CSSProperties}
                        >
                            <div className="folio-trace__head">
                                <span className="folio-trace__title">
                                    Trace · payout request
                                </span>
                                <span className="folio-trace__status">
                                    201 Created
                                </span>
                            </div>
                            <ol className="folio-trace__spans">
                                {TRACE_SPANS.map((span, i) => (
                                    <li
                                        key={span.label}
                                        className={[
                                            'folio-span',
                                            span.root ? 'folio-span--root' : '',
                                            span.focus
                                                ? 'folio-span--focus'
                                                : '',
                                        ].join(' ')}
                                        style={
                                            {
                                                '--depth': span.depth,
                                                '--i': i,
                                            } as React.CSSProperties
                                        }
                                    >
                                        <span className="folio-span__label">
                                            {span.label}
                                            {span.tag && (
                                                <span className="folio-span__tag">
                                                    ↗ {span.tag}
                                                </span>
                                            )}
                                        </span>
                                        <span
                                            className="folio-span__track"
                                            aria-hidden="true"
                                        >
                                            <span
                                                className="folio-span__fill"
                                                style={
                                                    {
                                                        '--start': `${span.start}%`,
                                                        '--width': `${span.width}%`,
                                                        '--i': i,
                                                    } as React.CSSProperties
                                                }
                                            />
                                        </span>
                                        <span className="folio-span__ms">
                                            {span.ms}
                                        </span>
                                    </li>
                                ))}
                            </ol>
                            <figcaption className="folio-trace__foot">
                                Illustrative, not a benchmark. It’s here because
                                it’s the shape of the work: 59% of that request
                                is one external call, and knowing that is the
                                difference between optimising the right thing
                                and the wrong one.
                            </figcaption>
                        </figure>
                    </section>

                    {/* ── The arc ── */}
                    <section className="folio-section" id="about">
                        <div className="folio-shell">
                            <SectionHead
                                label="Background"
                                note="Infrastructure → applications"
                            />
                            <div className="folio-arc">
                                <Reveal className="folio-prose">
                                    <h2 className="folio-h2">
                                        I came to Laravel from underneath it.
                                    </h2>
                                    <p>
                                        Most application engineers meet
                                        infrastructure as a deploy target. I
                                        spent six years on the other side of it
                                        — enterprise servers, networks, and
                                        security across organisations in Qatar
                                        and Sri Lanka — before I wrote
                                        production PHP.
                                    </p>
                                    <p>
                                        That’s the useful part. When a queue
                                        backs up, a deploy fails, or latency
                                        shows up somewhere nobody expected, I’m
                                        not guessing about the layer below the
                                        framework.
                                    </p>
                                    <p>
                                        Today my work is{' '}
                                        <strong>Laravel</strong>: designing
                                        Sanctum-backed REST endpoints, writing
                                        schemas and Eloquent relationships,
                                        integrating Stripe and PayPal, building
                                        Livewire and Vue interfaces, testing
                                        with Pest, and shipping through GitHub
                                        Actions.
                                    </p>
                                </Reveal>
                                <Reveal>
                                    <ul className="folio-layers">
                                        {LAYERS.map((layer) => (
                                            <li
                                                key={layer.year}
                                                className={`folio-layer ${layer.now ? 'folio-layer--now' : ''}`}
                                            >
                                                <span className="folio-layer__year">
                                                    {layer.year}
                                                </span>
                                                <span className="folio-layer__name">
                                                    {layer.name}
                                                    <span>{layer.note}</span>
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="folio-stack-note">
                                        Daily stack
                                    </p>
                                    <ul className="folio-tags">
                                        {DAILY_STACK.map((tech) => (
                                            <li key={tech}>{tech}</li>
                                        ))}
                                    </ul>
                                </Reveal>
                            </div>
                        </div>
                    </section>

                    {/* ── Work: backend first, honestly separated ── */}
                    <section
                        className="folio-section folio-section--sunk"
                        id="work"
                    >
                        <div className="folio-shell">
                            <SectionHead
                                label="Selected work"
                                note={`${backendWork.length} backend · ${interfaceWork.length} interface`}
                            />
                            <h2 className="folio-h2">
                                Applications with a database and a bill to pay.
                            </h2>
                            <p
                                className="folio-lede"
                                style={{ marginBottom: '2.5rem' }}
                            >
                                The two below are the ones worth reading the
                                code of. Everything under them is interface work
                                — real, but a different kind of problem.
                            </p>

                            {backendWork.length > 0 && (
                                <Reveal>
                                    <div className="folio-work">
                                        {backendWork.map((project) => (
                                            <article
                                                className="folio-card"
                                                key={project.id}
                                            >
                                                <div className="folio-card__top">
                                                    <span className="folio-card__kind">
                                                        {project.category}
                                                    </span>
                                                </div>
                                                <img
                                                    className="folio-card__shot"
                                                    src={resolveImage(
                                                        project.image,
                                                    )}
                                                    alt={`${project.title} interface`}
                                                    loading="lazy"
                                                />
                                                <h3 className="folio-card__name">
                                                    {project.title}
                                                </h3>
                                                <p className="folio-card__body">
                                                    {project.description}
                                                </p>
                                                <p className="folio-card__meta">
                                                    {(
                                                        project.technologies ??
                                                        []
                                                    ).join(' · ')}
                                                </p>
                                                <div className="folio-card__links">
                                                    {project.link ? (
                                                        <a
                                                            className="folio-link"
                                                            href={project.link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            Live <ArrowIcon />
                                                        </a>
                                                    ) : (
                                                        <span className="folio-card__meta">
                                                            Not currently
                                                            deployed
                                                        </span>
                                                    )}
                                                    {project.github && (
                                                        <a
                                                            className="folio-link folio-link--muted"
                                                            href={
                                                                project.github
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            Source <ArrowIcon />
                                                        </a>
                                                    )}
                                                </div>
                                            </article>
                                        ))}
                                    </div>
                                </Reveal>
                            )}

                            {interfaceWork.length > 0 && (
                                <Reveal>
                                    <div className="folio-subhead">
                                        <h3>Interface work</h3>
                                        <p>
                                            React & Vue front-ends, deployed on
                                            Vercel
                                        </p>
                                    </div>
                                    <ul className="folio-minis">
                                        {interfaceWork.map((project) => (
                                            <li
                                                className="folio-mini"
                                                key={project.id}
                                            >
                                                <span className="folio-mini__name">
                                                    {project.title}
                                                </span>
                                                <span className="folio-mini__desc">
                                                    {project.description}
                                                    <br />
                                                    <span className="folio-mini__stack">
                                                        {(
                                                            project.technologies ??
                                                            []
                                                        ).join(' · ')}
                                                    </span>
                                                </span>
                                                <span className="folio-mini__links">
                                                    {project.link && (
                                                        <a
                                                            href={project.link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            Live
                                                        </a>
                                                    )}
                                                    {project.github && (
                                                        <a
                                                            href={
                                                                project.github
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            Source
                                                        </a>
                                                    )}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </Reveal>
                            )}
                        </div>
                    </section>

                    {/* ── Experience ── */}
                    <section className="folio-section" id="experience">
                        <div className="folio-shell">
                            <SectionHead
                                label="Experience"
                                note="13 years working · 4 in Laravel"
                            />
                            <div className="folio-roles">
                                {ROLES.map((role) => (
                                    <Reveal key={role.title}>
                                        <div className="folio-role">
                                            <div className="folio-role__when">
                                                {role.current && (
                                                    <span className="folio-role__now">
                                                        Current
                                                    </span>
                                                )}
                                                {role.when}
                                                <span className="folio-role__where">
                                                    {role.where}
                                                </span>
                                            </div>
                                            <div>
                                                <h3 className="folio-role__title">
                                                    {role.title}
                                                </h3>
                                                <p className="folio-role__org">
                                                    {role.org}
                                                </p>
                                                <ul className="folio-role__points">
                                                    {role.points.map(
                                                        (point) => (
                                                            <li key={point}>
                                                                {point}
                                                            </li>
                                                        ),
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    </Reveal>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* ── Writing ── */}
                    {dbBlogPosts.length > 0 && (
                        <section
                            className="folio-section folio-section--sunk"
                            id="writing"
                        >
                            <div className="folio-shell">
                                <SectionHead
                                    label="Writing"
                                    note={`${dbBlogPosts.length} published`}
                                />
                                <ul className="folio-posts">
                                    {dbBlogPosts.map((post) => (
                                        <li
                                            className="folio-post"
                                            key={post.id}
                                        >
                                            <a
                                                className="folio-post__link"
                                                href={`/blog/${post.slug}`}
                                            >
                                                <span className="folio-post__cat">
                                                    {post.category}
                                                </span>
                                                <span>
                                                    <span className="folio-post__title">
                                                        {post.title}
                                                    </span>
                                                    <span className="folio-post__excerpt">
                                                        {post.excerpt}
                                                    </span>
                                                </span>
                                                <span className="folio-post__mins">
                                                    {post.reading_time} min
                                                </span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>
                    )}

                    {/* ── Study & credentials ── */}
                    <section className="folio-section" id="study">
                        <div className="folio-shell">
                            <SectionHead label="Study & credentials" />
                            <div className="folio-bg">
                                <Reveal>
                                    <p
                                        className="folio-stack-note"
                                        style={{ marginTop: 0 }}
                                    >
                                        Education
                                    </p>
                                    <dl className="folio-defs">
                                        {EDUCATION.map((item) => (
                                            <div key={item.title}>
                                                <dt>{item.year}</dt>
                                                <dd>
                                                    {item.current ? (
                                                        <em>{item.title}</em>
                                                    ) : (
                                                        item.title
                                                    )}
                                                    <span>{item.note}</span>
                                                </dd>
                                            </div>
                                        ))}
                                    </dl>
                                </Reveal>
                                {dbCertifications.length > 0 && (
                                    <Reveal>
                                        <p
                                            className="folio-stack-note"
                                            style={{ marginTop: 0 }}
                                        >
                                            Certifications
                                        </p>
                                        <dl className="folio-defs">
                                            {dbCertifications.map((cert) => (
                                                <div key={cert.id}>
                                                    <dt>{cert.year}</dt>
                                                    <dd>
                                                        {cert.name}
                                                        <span>
                                                            {cert.issuer}
                                                        </span>
                                                    </dd>
                                                </div>
                                            ))}
                                        </dl>
                                    </Reveal>
                                )}
                            </div>
                        </div>
                    </section>
                </main>

                {/* ── Contact ── */}
                <section className="folio-contact" id="contact">
                    <div className="folio-shell">
                        <div className="folio-head">
                            <span className="folio-eyebrow">Contact</span>
                            <span className="folio-contact__rule" />
                        </div>
                        <h2 className="folio-contact__h">
                            Hiring for a Laravel team?
                        </h2>
                        <p className="folio-contact__p">
                            Email is the fastest way to reach me and it goes
                            straight to my inbox. Tell me what you’re building
                            and what’s currently in your way.
                        </p>
                        <a
                            className="folio-mailto"
                            href="mailto:aslam4webz@gmail.com"
                        >
                            aslam4webz@gmail.com
                        </a>
                        <ul className="folio-elsewhere">
                            <li>
                                <a
                                    href="https://github.com/aslamwebz"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A12.3 12.3 0 0 1 12 5.8c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.652.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                                    </svg>
                                    GitHub
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://linkedin.com/in/emaslam"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                    LinkedIn
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/resume.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <DownloadIcon />
                                    Resume
                                </a>
                            </li>
                        </ul>
                    </div>
                </section>

                <footer className="folio-foot">
                    <div className="folio-foot__inner">
                        <span>
                            Mohamed Aslam · Software engineer · Portugal
                        </span>
                        <span>
                            Laravel · React · {new Date().getFullYear()}
                        </span>
                    </div>
                </footer>
            </div>
        </>
    );
}
