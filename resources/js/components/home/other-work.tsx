import SectionHeading from '@/components/home/section-heading';
import type { ProjectSummary } from '@/types/portfolio';

export default function OtherWork({
    projects,
}: {
    projects: ProjectSummary[];
}) {
    return (
        <section className="section page-width" aria-label="Other work">
            <SectionHeading label="More work" title="The wider toolkit" />
            <div className="other-grid">
                {projects.map((project) => (
                    <article className="other-card" key={project.id}>
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                        <p className="mono tech-line">
                            {project.technologies.join(' · ')}
                        </p>
                        <div className="project-links">
                            {project.repo_url && (
                                <a
                                    href={project.repo_url}
                                    aria-label={
                                        project.title + ' source on GitHub'
                                    }
                                >
                                    Source ↗
                                </a>
                            )}
                            {project.demo_url && (
                                <a
                                    href={project.demo_url}
                                    aria-label={project.title + ' demo'}
                                >
                                    Demo ↗
                                </a>
                            )}
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
