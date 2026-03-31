import { Head, Link, router } from '@inertiajs/react';
import Navigation from '@/components/navigation';
import { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash/debounce';

interface BlogPost {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    featured_image: string | null;
    category: string;
    tags: string[];
    published_at: string;
    author: string;
    reading_time: number;
}

interface BlogIndexProps {
    posts: BlogPost[];
    categories: string[];
    filters: {
        search: string | null;
        category: string | null;
    };
    auth?: {
        user?: {
            name: string;
            email: string;
            [key: string]: unknown;
        };
    };
}

export default function BlogIndex({
    posts = [],
    categories = [],
    filters = { search: '', category: 'All' },
    auth,
}: BlogIndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [activeCategory, setActiveCategory] = useState(
        filters.category || 'All',
    );

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    // Debounced search function
    const debouncedSearch = useCallback(
        debounce((query: string, category: string) => {
            router.get(
                window.location.pathname,
                { search: query, category: category !== 'All' ? category : '' },
                { preserveState: true, preserveScroll: true, replace: true },
            );
        }, 300),
        [],
    );

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearch(query);
        debouncedSearch(query, activeCategory);
    };

    const handleCategoryChange = (category: string) => {
        setActiveCategory(category);
        router.get(
            window.location.pathname,
            { search: search, category: category !== 'All' ? category : '' },
            { preserveState: true, preserveScroll: true },
        );
    };

    return (
        <>
            <Head title="Blog | Mohamed Aslam">
                <meta
                    name="description"
                    content="Technical articles on Laravel, PHP, databases, and modern web development by Mohamed Aslam."
                />
            </Head>

            <div className="min-h-screen bg-[#0A0A0A] text-white">
                <Navigation auth={auth} />

                {/* Header */}
                <section className="border-b border-white/5 bg-[#0A0A0A] pt-32 pb-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-slate-400 backdrop-blur-sm">
                                BLOG
                            </div>
                            <h1 className="mb-4 text-4xl font-bold sm:text-5xl">
                                Technical{' '}
                                <span className="gradient-text">Articles</span>
                            </h1>
                            <p className="mx-auto max-w-2xl text-lg text-slate-400">
                                Thoughts on Laravel, PHP, databases, and
                                building reliable web applications.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Filters & Search */}
                <section className="border-b border-white/5 py-8">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                            {/* Category Filters */}
                            <div className="flex flex-wrap items-center gap-2">
                                <button
                                    onClick={() => handleCategoryChange('All')}
                                    className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                                        activeCategory === 'All'
                                            ? 'bg-emerald-500 text-white'
                                            : 'border border-white/10 bg-white/5 text-slate-400 hover:bg-white/10'
                                    }`}
                                >
                                    All
                                </button>
                                {categories?.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() =>
                                            handleCategoryChange(category)
                                        }
                                        className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                                            activeCategory === category
                                                ? 'bg-emerald-500 text-white'
                                                : 'border border-white/10 bg-white/5 text-slate-400 hover:bg-white/10'
                                        }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>

                            {/* Search Bar */}
                            <div className="relative w-full md:max-w-sm">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <svg
                                        className="h-4 w-4 text-slate-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    value={search}
                                    onChange={handleSearchChange}
                                    placeholder="Search articles..."
                                    className="block w-full rounded-full border border-white/10 bg-white/5 py-2.5 pr-4 pl-10 text-sm text-white placeholder-slate-500 backdrop-blur-sm transition-all focus:border-emerald-500/50 focus:bg-white/10 focus:ring-0 focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Posts Grid */}
                <section className="py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        {posts.length > 0 ? (
                            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                                {posts.map((post) => (
                                    <Link
                                        key={post.id}
                                        href={`/blog/${post.slug}`}
                                        className="group overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md transition-all hover:border-emerald-400/30 hover:bg-white/10"
                                    >
                                        {/* Image or Placeholder */}
                                        <div className="relative h-48 w-full overflow-hidden bg-[#050505]">
                                            {post.featured_image ? (
                                                <img
                                                    src={
                                                        post.featured_image.startsWith(
                                                            'http',
                                                        )
                                                            ? post.featured_image
                                                            : post.featured_image.startsWith(
                                                                    '/',
                                                                )
                                                              ? post.featured_image
                                                              : `/${post.featured_image}`
                                                    }
                                                    alt={post.title}
                                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="flex h-full items-center justify-center bg-gradient-to-br from-emerald-500/10 to-blue-500/10">
                                                    <svg
                                                        className="h-12 w-12 text-slate-600"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={1.5}
                                                            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                                                        />
                                                    </svg>
                                                </div>
                                            )}
                                            <div className="absolute top-3 left-3">
                                                <span className="rounded-full border border-white/20 bg-black/60 px-2.5 py-1 text-xs font-medium text-slate-300 backdrop-blur-sm">
                                                    {post.category}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6">
                                            <h2 className="mb-2 text-lg font-semibold transition-colors group-hover:text-white">
                                                {post.title}
                                            </h2>
                                            <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-slate-400">
                                                {post.excerpt}
                                            </p>
                                            <div className="flex items-center justify-between text-xs text-slate-500">
                                                <span>
                                                    {formatDate(
                                                        post.published_at,
                                                    )}
                                                </span>
                                                <span>
                                                    {post.reading_time} min read
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="py-24 text-center">
                                <p className="text-lg text-slate-500">
                                    {search || activeCategory !== 'All'
                                        ? 'No posts found matching your search criteria.'
                                        : 'No posts published yet. Check back soon!'}
                                </p>
                                {(search || activeCategory !== 'All') && (
                                    <button
                                        onClick={() => {
                                            setSearch('');
                                            handleCategoryChange('All');
                                        }}
                                        className="mt-4 text-sm font-medium text-emerald-400 hover:text-emerald-300"
                                    >
                                        Clear all filters
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Back to Home */}
                        <div className="mt-16 text-center">
                            <Link
                                href="/"
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
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </section>

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
