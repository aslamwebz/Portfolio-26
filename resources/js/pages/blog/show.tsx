import { Head } from '@inertiajs/react';
import type { HTMLReactParserOptions } from 'html-react-parser';
import parse, { Element, Text } from 'html-react-parser';
import CodeBlock from '@/components/CodeBlock';
import { postDate } from '@/components/home/writing';
import PublicLayout from '@/layouts/public-layout';
import type { Post, Site } from '@/types/portfolio';

export default function BlogPost({ site, post }: { site: Site; post: Post }) {
    const options: HTMLReactParserOptions = {
        replace: (node) => {
            if (node instanceof Element && node.name === 'pre') {
                const code = node.children.find(
                    (child) =>
                        child instanceof Element && child.name === 'code',
                );
                if (code instanceof Element) {
                    const text = code.children
                        .filter((child): child is Text => child instanceof Text)
                        .map((child) => child.data)
                        .join('');
                    return (
                        <CodeBlock
                            code={text}
                            language={
                                code.attribs.class?.replace('language-', '') ||
                                'text'
                            }
                        />
                    );
                }
            }
        },
    };
    return (
        <PublicLayout site={site}>
            <Head title={post.title} />
            <article className="article page-width">
                <header className="page-intro">
                    <a className="text-link" href="/blog">
                        ← All writing
                    </a>
                    <div className="post-meta">
                        <span>{post.category}</span>
                        <time dateTime={post.published_at}>
                            {postDate(post.published_at)}
                        </time>
                        <span>{post.reading_time} min read</span>
                    </div>
                    <h1>{post.title}</h1>
                    <p>{post.excerpt}</p>
                    <p className="caption">By {post.author}</p>
                </header>
                <div className="article-body">
                    {parse(post.content, options)}
                </div>
                <footer className="article-footer">
                    <a className="text-link" href={'mailto:' + site.email}>
                        Discuss this article →
                    </a>
                </footer>
            </article>
        </PublicLayout>
    );
}
