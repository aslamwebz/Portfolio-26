import { Link } from '@inertiajs/react';
import { Moon, Sun } from 'lucide-react';
import type { ReactNode } from 'react';
import { useAppearance } from '@/hooks/use-appearance';
import { blog, home } from '@/routes';
import type { Site } from '@/types/portfolio';

export default function PublicLayout({
    site,
    children,
}: {
    site: Site;
    children: ReactNode;
}) {
    const { resolvedAppearance, updateAppearance } = useAppearance();
    return (
        <div className="portfolio">
            <a className="skip-link" href="#main">
                Skip to content
            </a>
            <header className="site-header">
                <div className="page-width header-inner">
                    <Link
                        href={home()}
                        className="brand"
                        aria-label="<MA/> — Mohamed Aslam home"
                    >
                        <span className="monogram" aria-hidden="true">
                            {'<MA/>'}
                        </span>
                        <span className="brand-name">Mohamed Aslam</span>
                    </Link>
                    <nav aria-label="Main navigation">
                        <a href="/#work">Work</a>
                        <Link href={blog()}>Writing</Link>
                        <a href="/#contact">Contact</a>
                    </nav>
                    <button
                        className="theme-toggle"
                        type="button"
                        onClick={() =>
                            updateAppearance(
                                resolvedAppearance === 'dark'
                                    ? 'light'
                                    : 'dark',
                            )
                        }
                        aria-label={
                            resolvedAppearance === 'dark'
                                ? 'Switch to light theme'
                                : 'Switch to dark theme'
                        }
                    >
                        {resolvedAppearance === 'dark' ? (
                            <Sun size={18} />
                        ) : (
                            <Moon size={18} />
                        )}
                    </button>
                </div>
            </header>
            <main id="main" tabIndex={-1}>
                {children}
            </main>
            <footer className="site-footer page-width">
                <p>
                    © {site.year} {site.name}
                </p>
                <p>Backend foundations. AI systems.</p>
                <a href={'mailto:' + site.email}>Email me ↗</a>
            </footer>
        </div>
    );
}
