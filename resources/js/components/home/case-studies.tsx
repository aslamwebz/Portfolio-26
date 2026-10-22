import { Link } from '@inertiajs/react';
import SectionHeading from '@/components/home/section-heading';
import type { ProjectSummary } from '@/types/portfolio';

export default function CaseStudies({
    projects,
}: {
    projects: ProjectSummary[];
}) {
    return (
        <section
            id="work"
            className="section page-width"
            aria-labelledby="work-title"
        >
            <div id="work-title">
                <SectionHeading
                    label="Selected systems"
                    title="Inside the engineering"
                    description="Three different problems. The architecture, decisions and limits behind each one."
                />
            </div>
            <div className="case-list">
                {projects.map((project) => (
                    <article className="case-card" key={project.id}>
                        <div className="case-sketch" aria-hidden="true">
                            <span className="mono">{project.category}</span>
                            <div className="sketch-node">{project.title}</div>
                            <div className="sketch-line" />
                            <div className="sketch-branches">
                                <span>
                                    {project.slug === 'freya'
                                        ? 'Memory'
                                        : project.slug === 'forge'
                                          ? 'Agents'
                                          : 'Documents'}
                                </span>
                                <span>
                                    {project.slug === 'freya'
                                        ? 'Guard'
                                        : project.slug === 'forge'
                                          ? 'Worktrees'
                                          : 'AI services'}
                                </span>
                            </div>
                        </div>
                        <div className="case-copy">
                            <p className="eyebrow">{project.category}</p>
                            <h3>
                                <Link href={'/projects/' + project.slug}>
                                    {project.title}
                                    <span aria-hidden="true"> ↗</span>
                                </Link>
                            </h3>
                            <p>{project.description}</p>
                            <ul
                                className="stack-chips"
                                aria-label={project.title + ' technologies'}
                            >
                                {project.technologies.map((tech) => (
                                    <li key={tech}>{tech}</li>
                                ))}
                            </ul>
                            <Link
                                className="text-link"
                                href={'/projects/' + project.slug}
                            >
                                Read case study{' '}
                                <span aria-hidden="true">→</span>
                            </Link>
                        </div>
                    </article>
                ))}
            </div>
            {projects.length === 0 && (
                <p>
                    Case studies are being prepared.{' '}
                    <a href="#contact">Ask me for a walkthrough.</a>
                </p>
            )}
        </section>
    );
}
