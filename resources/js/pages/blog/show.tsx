import { Head, Link } from '@inertiajs/react';
import Navigation from '@/components/navigation';

interface BlogPost {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featured_image: string | null;
    category: string;
    tags: string[];
    published_at: string;
    author: string;
    reading_time: number;
}

interface BlogShowProps {
    post: BlogPost;
    auth?: {
        user?: {
            name: string;
            email: string;
            [key: string]: unknown;
        };
    };
}

export default function BlogShow({ post, auth }: BlogShowProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const tags = Array.isArray(post.tags) ? post.tags : [];

    return (
        <>
            <Head title={`${post.title} | Mohamed Aslam`}>
                <meta name="description" content={post.excerpt} />
            </Head>

            <div className="min-h-screen bg-[#0A0A0A] text-white">
                <Navigation auth={auth} />

                {/* Article Header */}
                <section className="border-b border-white/5 bg-[#0A0A0A] pb-12 pt-32">
                    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                        <Link
                            href="/blog"
                            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-white"
                        >
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                ></path>
                            </svg>
                            Back to Blog
                        </Link>

                        <div className="mb-4 flex items-center gap-3">
                            <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300 backdrop-blur-sm">
                                {post.category}
                            </span>
                            <span className="text-xs text-slate-500">
                                {post.reading_time} min read
                            </span>
                        </div>

                        <h1 className="mb-6 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                            {post.title}
                        </h1>

                        <div className="flex items-center gap-4 text-sm text-slate-400">
                            <span className="font-medium text-slate-300">
                                {post.author}
                            </span>
                            <span>•</span>
                            <span>{formatDate(post.published_at)}</span>
                        </div>
                    </div>
                </section>

                {/* Featured Image */}
                {post.featured_image && (
                    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
                        <img
                            src={
                                post.featured_image.startsWith('http')
                                    ? post.featured_image
                                    : post.featured_image.startsWith('/')
                                      ? post.featured_image
                                      : `/${post.featured_image}`
                            }
                            alt={post.title}
                            className="w-full rounded-xl border border-white/10 object-cover"
                        />
                    </div>
                )}

                {/* Article Content */}
                <article className="py-8 pb-16">
                    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                        <div
                            className="blog-prose prose prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-2xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-xl prose-p:leading-relaxed prose-p:text-slate-300 prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-code:rounded prose-code:border prose-code:border-white/10 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:text-emerald-400 prose-code:before:content-[''] prose-code:after:content-[''] prose-pre:rounded-xl prose-pre:border prose-pre:border-white/10 prose-pre:bg-[#050505] prose-ol:text-slate-300 prose-ul:text-slate-300 prose-li:marker:text-emerald-400 max-w-none"
                            dangerouslySetInnerHTML={{
                                __html: post.content,
                            }}
                        />

                        {/* Tags */}
                        {tags.length > 0 && (
                            <div className="mt-12 border-t border-white/5 pt-8">
                                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-300">
                                    Tags
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-300 backdrop-blur-sm"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Back to Blog */}
                        <div className="mt-12 text-center">
                            <Link
                                href="/blog"
                                className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-white"
                            >
                                <svg
                                    className="h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                    ></path>
                                </svg>
                                All Articles
                            </Link>
                        </div>
                    </div>
                </article>

                {/* Footer */}
                <footer className="border-t border-white/5 py-8">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center text-sm text-slate-500">
                            <span className="text-slate-400">
                                Mohamed Aslam
                            </span>{' '}
                            — Software Engineer
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
