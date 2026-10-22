import CertificatePreview from '@/components/home/certificate-preview';
import SectionHeading from '@/components/home/section-heading';
import type { Certification } from '@/types/portfolio';

export default function Experience({
    certifications,
}: {
    certifications: Certification[];
}) {
    return (
        <section
            id="experience"
            className="section page-width"
            aria-label="Experience and background"
        >
            <SectionHeading label="Experience" title="Built on backend work" />
            <div className="timeline">
                <article className="timeline-entry">
                    <p className="mono">May 2021 — present</p>
                    <div>
                        <h3>Software Engineer</h3>
                        <p className="organization">
                            Digital Egg Ltd / FullStripe s.r.o.
                        </p>
                        <ul>
                            <li>
                                Develop and maintain PHP/Laravel applications
                                for HR, hospitality and ordering workflows.
                            </li>
                            <li>
                                Modernize legacy applications and connect
                                business rules, APIs and data flows.
                            </li>
                            <li>
                                Work across backend features, access rules,
                                integrations and application maintenance.
                            </li>
                        </ul>
                    </div>
                </article>
                <article className="timeline-entry">
                    <p className="mono">Independent work</p>
                    <div>
                        <h3>AI application development</h3>
                        <p className="organization">
                            Personal software projects
                        </p>
                        <ul>
                            <li>
                                Design desktop agents, coding-agent workflows
                                and AI-assisted application features.
                            </li>
                            <li>
                                Orchestrate AI coding tools, review changes and
                                verify behavior against the intended
                                architecture.
                            </li>
                        </ul>
                    </div>
                </article>
            </div>
            <CertificatePreview certifications={certifications} />
            <details className="background-details">
                <summary>Education &amp; certificates</summary>
                <div className="background-content">
                    <h3>Education</h3>
                    <p>
                        MBA, International Business — ICBS / University of the
                        West of Scotland, 2025–present.
                    </p>
                    <p>
                        TODO-VERIFY: confirm any additional education details
                        from the latest CV before adding them here.
                    </p>
                    <h3>Certificates &amp; training</h3>
                    <ul>
                        {certifications.map((cert) => (
                            <li key={cert.id}>
                                {cert.image ? (
                                    <a
                                        href={
                                            cert.image.startsWith('/')
                                                ? cert.image
                                                : '/storage/' + cert.image
                                        }
                                    >
                                        {cert.name}
                                    </a>
                                ) : (
                                    cert.name
                                )}
                                <span>
                                    {' '}
                                    — {cert.issuer}, {cert.year}
                                </span>
                            </li>
                        ))}
                    </ul>
                    <p className="caption">
                        Historical certificates and training are listed with
                        their recorded dates; current certification status is
                        not implied.
                    </p>
                </div>
            </details>
        </section>
    );
}
