import { Head, Link } from '@inertiajs/react';
import parse from 'html-react-parser';
import ArchitectureSketch from '@/components/architecture-sketch';
import PublicLayout from '@/layouts/public-layout';
import { projects } from '@/routes';
import type { CaseStudy, Site } from '@/types/portfolio';

export default function ProjectCaseStudy({
    site,
    project,
}: {
    site: Site;
    project: CaseStudy;
}) {
    return (
        <PublicLayout site={site}>
            <Head title={project.title + ' — Case study'} />
            <article className="case-study page-width">
                <header className="page-intro">
                    <Link className="text-link" href={projects()}>
                        ← All work
                    </Link>
                    <p className="eyebrow">{project.category} / Case study</p>
                    <h1>{project.title}</h1>
                    <p className="case-description">{project.description}</p>
                    <ul className="stack-chips" aria-label="Project stack">
                        {project.technologies.map((tech) => (
                            <li key={tech}>{tech}</li>
                        ))}
                    </ul>
                    <div className="project-links">
                        {project.repo_url && (
                            <a href={project.repo_url}>Source on GitHub ↗</a>
                        )}
                        {project.demo_url && (
                            <a href={project.demo_url}>Live demo ↗</a>
                        )}
                        {project.video_url && (
                            <a href={project.video_url}>Video walkthrough ↗</a>
                        )}
                    </div>
                </header>
                <div className="case-overview">
                    <section>
                        <p className="eyebrow">The problem</p>
                        <h2>What this system is for</h2>
                        <p>{project.problem}</p>
                        <h3>My role</h3>
                        <p>{project.role}</p>
                    </section>
                    <section className="architecture-panel">
                        <h2>System sketch</h2>
                        {project.architecture_image ? (
                            <img
                                src={project.architecture_image}
                                alt={project.title + ' architecture'}
                                width="760"
                                height="960"
                                loading="lazy"
                                decoding="async"
                            />
                        ) : (
                            <ArchitectureSketch
                                slug={project.slug || 'system'}
                                title={project.title}
                            />
                        )}
                        <p className="caption">
                            TODO-VERIFY: confirm this simplified diagram against
                            the current implementation.
                        </p>
                    </section>
                </div>
                <section className="case-section">
                    <p className="eyebrow">Engineering decisions</p>
                    <h2>The choices and their costs</h2>
                    <div className="decision-list">
                        {project.decisions.map((decision) => (
                            <section key={decision.title}>
                                <h3>{decision.title}</h3>
                                <p>{decision.decision}</p>
                                <p className="tradeoff">
                                    <strong>Tradeoff.</strong>{' '}
                                    {decision.tradeoff}
                                </p>
                            </section>
                        ))}
                    </div>
                </section>
                <section className="case-section">
                    <p className="eyebrow">Evidence</p>
                    <h2>Results &amp; current limits</h2>
                    <dl className="results-grid">
                        {project.results.map((result) => (
                            <div key={result.label}>
                                <dt>{result.label}</dt>
                                <dd>{result.value}</dd>
                            </div>
                        ))}
                    </dl>
                </section>
                <div className="article-body case-section">
                    {parse(project.body_html)}
                </div>
                <footer className="case-footer">
                    <h2>Want to walk through the implementation?</h2>
                    <a className="text-link" href={'mailto:' + site.email}>
                        Email me →
                    </a>
                </footer>
            </article>
        </PublicLayout>
    );
}
