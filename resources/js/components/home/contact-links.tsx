import type { Site } from '@/types/portfolio';

export default function ContactLinks({ site }: { site: Site }) {
    return (
        <div className="action-links">
            {site.cv_url ? (
                <a className="button button-primary" href={site.cv_url}>
                    Download CV <span aria-hidden="true">↓</span>
                </a>
            ) : (
                <span className="cv-unavailable">
                    CV update in progress — email me for a copy.
                </span>
            )}
            <a
                className="button button-secondary"
                href={'mailto:' + site.email}
            >
                Email me <span aria-hidden="true">↗</span>
            </a>
            {site.github_url && (
                <a className="button button-quiet" href={site.github_url}>
                    GitHub <span aria-hidden="true">↗</span>
                </a>
            )}
        </div>
    );
}
