import ContactLinks from '@/components/home/contact-links';
import type { Site } from '@/types/portfolio';

export default function Hero({ site }: { site: Site }) {
    return (
        <section className="hero page-width" aria-labelledby="intro-title">
            <div className="hero-copy">
                <p className="eyebrow">Mohamed Aslam / Software engineer</p>
                <h1 id="intro-title">
                    Backend engineer building <em>AI systems</em>
                    <span className="hero-detail">
                        {' '}
                        — agents, LLM apps, and the infrastructure under them
                    </span>
                </h1>
                <p className="hero-summary">
                    I build PHP/Laravel backends and AI applications, from
                    business workflows to desktop agents. I direct AI-assisted
                    development and take responsibility for architecture,
                    review, testing and the result.
                </p>
                <ContactLinks site={site} />
                <p className="availability">
                    <span aria-hidden="true" />
                    {site.availability}
                </p>
                <div className="hero-location">
                    <span>
                        {site.location} · {site.timezone}
                    </span>
                    {site.linkedin_url && (
                        <a href={site.linkedin_url}>LinkedIn ↗</a>
                    )}
                </div>
            </div>
            <aside className="system-note" aria-label="Engineering focus">
                <p className="eyebrow">What I build around the model</p>
                <div className="system-core">
                    <span className="mono">application core</span>
                    <strong>
                        Reasoning needs
                        <br />a reliable system.
                    </strong>
                </div>
                <ul className="system-boundaries">
                    <li>
                        <span>Context</span>
                        <small>Memory &amp; state</small>
                    </li>
                    <li>
                        <span>Actions</span>
                        <small>Tools &amp; permissions</small>
                    </li>
                    <li>
                        <span>Operations</span>
                        <small>Queues &amp; recovery</small>
                    </li>
                    <li>
                        <span>Verification</span>
                        <small>Review &amp; evaluation</small>
                    </li>
                </ul>
                <a href="#work" className="text-link">
                    See the engineering <span aria-hidden="true">↓</span>
                </a>
            </aside>
        </section>
    );
}
