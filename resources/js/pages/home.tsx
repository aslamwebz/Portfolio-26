import { Head } from '@inertiajs/react';
import CaseStudies from '@/components/home/case-studies';
import Contact from '@/components/home/contact';
import Experience from '@/components/home/experience';
import Hero from '@/components/home/hero';
import OtherWork from '@/components/home/other-work';
import Stack from '@/components/home/stack';
import Writing from '@/components/home/writing';
import PublicLayout from '@/layouts/public-layout';
import type {
    Certification,
    PostSummary,
    ProjectSummary,
    Site,
} from '@/types/portfolio';

type Props = {
    site: Site;
    flagships: ProjectSummary[];
    otherWork: ProjectSummary[];
    certifications: Certification[];
    posts: PostSummary[];
};
export default function Home({
    site,
    flagships,
    otherWork,
    certifications,
    posts,
}: Props) {
    return (
        <PublicLayout site={site}>
            <Head title="Backend & AI systems" />
            <Hero site={site} />
            <CaseStudies projects={flagships} />
            <OtherWork projects={otherWork} />
            <Experience certifications={certifications} />
            <Stack />
            <Writing posts={posts} />
            <Contact site={site} />
        </PublicLayout>
    );
}
