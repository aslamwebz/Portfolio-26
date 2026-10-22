export type Site = {
    name: string;
    email: string;
    github_url: string | null;
    linkedin_url: string | null;
    site_url: string;
    cv_url: string | null;
    availability: string;
    location: string;
    timezone: string;
    year: number;
};
export type ProjectSummary = {
    image: { url: string; width: number; height: number } | null;
    id: number;
    title: string;
    slug: string | null;
    description: string;
    is_flagship: boolean;
    technologies: string[];
    category: string;
    repo_url: string | null;
    demo_url: string | null;
};
export type Decision = { title: string; decision: string; tradeoff: string };
export type Result = { label: string; value: string };
export type CaseStudy = ProjectSummary & {
    architecture_width: number | null;
    architecture_height: number | null;
    role: string;
    problem: string;
    decisions: Decision[];
    results: Result[];
    body_html: string;
    architecture_image: string | null;
    video_url: string | null;
};
export type PostSummary = {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    category: string;
    published_at: string;
    reading_time: number;
    author: string;
};
export type Post = PostSummary & { content: string; tags: string[] };
export type Certification = {
    id: number;
    name: string;
    issuer: string;
    year: string;
    image: string | null;
};
export type Pagination<T> = {
    data: T[];
    current_page: number;
    last_page: number;
    total: number;
    links: { url: string | null; label: string; active: boolean }[];
};

export type SeoMetadata = {
    title: string;
    description: string;
    canonical: string;
    image: string;
    schema: Record<string, unknown> | null;
    noindex: boolean;
};
