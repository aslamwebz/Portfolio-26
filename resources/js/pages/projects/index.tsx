import CaseStudies from '@/components/home/case-studies';
import OtherWork from '@/components/home/other-work';
import SeoHead from '@/components/seo-head';
import PublicLayout from '@/layouts/public-layout';
import type { ProjectSummary, Site } from '@/types/portfolio';

export default function Projects({
    site,
    projects,
}: {
    site: Site;
    projects: ProjectSummary[];
}) {
    return (
        <PublicLayout site={site}>
            <SeoHead />
            <div className="page-intro page-width">
                <p className="eyebrow">Selected work</p>
                <h1>
                    Systems, decisions,
                    <br />
                    and working software.
                </h1>
                <p>AI applications and the backend foundations behind them.</p>
            </div>
            <CaseStudies
                projects={projects.filter((project) => project.is_flagship)}
            />
            <OtherWork
                projects={projects.filter((project) => !project.is_flagship)}
            />
        </PublicLayout>
    );
}
