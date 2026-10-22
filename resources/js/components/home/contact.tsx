import ContactLinks from '@/components/home/contact-links';
import type { Site } from '@/types/portfolio';

export default function Contact({ site }: { site: Site }) {
    return (
        <section id="contact" className="section contact-section page-width">
            <p className="eyebrow">Have a role or a system to build?</p>
            <h2>Let’s talk engineering.</h2>
            <p>{site.availability}</p>
            <a className="contact-email" href={'mailto:' + site.email}>
                {site.email}
            </a>
            <ContactLinks site={site} />
            {site.linkedin_url && (
                <a className="text-link" href={site.linkedin_url}>
                    Find me on LinkedIn ↗
                </a>
            )}
        </section>
    );
}
