import { Link } from '@inertiajs/react';
import SectionHeading from '@/components/home/section-heading';
import { blog } from '@/routes';
import type { PostSummary } from '@/types/portfolio';

export function postDate(date: string) {
    return new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        timeZone: 'UTC',
    }).format(new Date(date));
}
export default function Writing({ posts }: { posts: PostSummary[] }) {
    return (
        <section className="section page-width" aria-label="Latest writing">
            <SectionHeading label="Writing" title="Notes from the work" />
            <div className="writing-list">
                {posts.map((post) => (
                    <article key={post.id}>
                        <div className="post-meta">
                            <span>{post.category}</span>
                            <time dateTime={post.published_at}>
                                {postDate(post.published_at)}
                            </time>
                            <span>{post.reading_time} min read</span>
                        </div>
                        <h3>
                            <Link href={'/blog/' + post.slug}>
                                {post.title} <span aria-hidden="true">↗</span>
                            </Link>
                        </h3>
                        <p>{post.excerpt}</p>
                    </article>
                ))}
            </div>
            {posts.length === 0 && (
                <p>
                    No published notes yet. The case studies are the best place
                    to start.
                </p>
            )}
            <Link className="text-link" href={blog()}>
                All writing →
            </Link>
        </section>
    );
}
