import { Head, usePage } from '@inertiajs/react';
import { documentNonce } from '@/lib/csp';
import type { SeoMetadata } from '@/types/portfolio';

export default function SeoHead() {
    const { seo, cspNonce } = usePage<{ seo: SeoMetadata; cspNonce: string }>()
        .props;
    return (
        <Head title={seo.title}>
            <meta
                name="description"
                content={seo.description}
                head-key="description"
            />
            <link rel="canonical" href={seo.canonical} head-key="canonical" />
            <meta
                name="robots"
                content={seo.noindex ? 'noindex, follow' : 'index, follow'}
                head-key="robots"
            />
            <meta
                property="og:type"
                content={
                    seo.schema?.['@type'] === 'Article' ? 'article' : 'website'
                }
                head-key="og:type"
            />
            <meta
                property="og:site_name"
                content="Mohamed Aslam"
                head-key="og:site_name"
            />
            <meta
                property="og:title"
                content={seo.title + ' — Mohamed Aslam'}
                head-key="og:title"
            />
            <meta
                property="og:description"
                content={seo.description}
                head-key="og:description"
            />
            <meta property="og:url" content={seo.canonical} head-key="og:url" />
            <meta property="og:image" content={seo.image} head-key="og:image" />
            <meta
                property="og:image:width"
                content="1200"
                head-key="og:image:width"
            />
            <meta
                property="og:image:height"
                content="630"
                head-key="og:image:height"
            />
            <meta
                property="og:image:alt"
                content={seo.title}
                head-key="og:image:alt"
            />
            <meta
                name="twitter:card"
                content="summary_large_image"
                head-key="twitter:card"
            />
            <meta
                name="twitter:title"
                content={seo.title + ' — Mohamed Aslam'}
                head-key="twitter:title"
            />
            <meta
                name="twitter:description"
                content={seo.description}
                head-key="twitter:description"
            />
            <meta
                name="twitter:image"
                content={seo.image}
                head-key="twitter:image"
            />
            {seo.schema && (
                <script
                    type="application/ld+json"
                    nonce={documentNonce(cspNonce)}
                    head-key="structured-data"
                >
                    {JSON.stringify(seo.schema).replaceAll('<', '\\u003c')}
                </script>
            )}
        </Head>
    );
}
