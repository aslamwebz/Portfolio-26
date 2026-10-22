import { Head, Link, usePage } from '@inertiajs/react';
import { postDate } from '@/components/home/writing';
import PublicLayout from '@/layouts/public-layout';
import { blog } from '@/routes';
import type { Pagination, PostSummary, Site } from '@/types/portfolio';

type Props = {
    site: Site;
    posts: Pagination<PostSummary>;
    filters: { search: string; category: string };
    categories: string[];
};
export default function Blog({ site, posts, filters, categories }: Props) {
    const { errors } = usePage().props;
    return (
        <PublicLayout site={site}>
            <Head title="Writing" />
            <section className="page-intro page-width">
                <p className="eyebrow">Engineering notes</p>
                <h1>
                    Writing from
                    <br />
                    the work.
                </h1>
                <p>
                    Backend development, application architecture and lessons
                    from building AI systems.
                </p>
            </section>
            <section className="section page-width" aria-label="Articles">
                <form className="search-form" action={blog().url} method="get">
                    <div>
                        <label htmlFor="search">Search articles</label>
                        <input
                            id="search"
                            name="search"
                            type="search"
                            maxLength={120}
                            defaultValue={filters.search}
                            placeholder="Architecture, Laravel…"
                        />
                        {errors.search && <p role="alert">{errors.search}</p>}
                    </div>
                    <div>
                        <label htmlFor="category">Category</label>
                        <select
                            id="category"
                            name="category"
                            defaultValue={filters.category}
                        >
                            <option value="">All categories</option>
                            {categories.map((category) => (
                                <option key={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                    <button className="button button-primary" type="submit">
                        Search
                    </button>
                </form>
                <div className="writing-list">
                    {posts.data.map((post) => (
                        <article key={post.id}>
                            <div className="post-meta">
                                <span>{post.category}</span>
                                <time dateTime={post.published_at}>
                                    {postDate(post.published_at)}
                                </time>
                                <span>{post.reading_time} min read</span>
                            </div>
                            <h2>
                                <Link href={'/blog/' + post.slug}>
                                    {post.title} ↗
                                </Link>
                            </h2>
                            <p>{post.excerpt}</p>
                        </article>
                    ))}
                </div>
                {posts.data.length === 0 && (
                    <p>
                        {filters.search || filters.category
                            ? 'No articles match. Try a broader search or clear the category.'
                            : 'No published articles yet. Explore the case studies while the next note takes shape.'}
                    </p>
                )}
                {posts.last_page > 1 && (
                    <nav className="pagination" aria-label="Article pages">
                        {posts.links.map((link) =>
                            link.url ? (
                                <Link
                                    key={link.label}
                                    href={link.url}
                                    aria-current={
                                        link.active ? 'page' : undefined
                                    }
                                >
                                    {link.label
                                        .replace(/&laquo;|&raquo;/g, '')
                                        .trim()}
                                </Link>
                            ) : (
                                <span key={link.label} aria-disabled="true">
                                    {link.label
                                        .replace(/&laquo;|&raquo;/g, '')
                                        .trim()}
                                </span>
                            ),
                        )}
                    </nav>
                )}
                <a className="text-link" href="/feed.xml">
                    RSS feed ↗
                </a>
            </section>
        </PublicLayout>
    );
}
