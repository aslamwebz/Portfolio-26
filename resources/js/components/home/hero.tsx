import ContactLinks from '@/components/home/contact-links';
import SystemPanel from '@/components/home/system-panel';
import type { Site } from '@/types/portfolio';

export default function Hero({ site }: { site: Site }) {
    return (
        <section className="hero page-width" aria-labelledby="intro-title">
            <div className="hero-copy">
                <p className="eyebrow hero-badge">
                    <span aria-hidden="true" />
                    Mohamed Aslam / Software engineer
                </p>
                <h1 id="intro-title">
                    <span className="hero-title-line">Backend engineer</span>{' '}
                    <span className="hero-title-line">
                        building <em>AI systems</em>
                    </span>
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
            <SystemPanel />
        </section>
    );
}
