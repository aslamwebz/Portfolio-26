{!! '<?xml version="1.0" encoding="UTF-8"?>' !!}
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>Mohamed Aslam — Writing</title>
        <link>{{ rtrim($site['site_url'], '/').'/blog' }}</link>
        <description>Notes on backend engineering and AI applications.</description>
        <language>en</language>
        <atom:link href="{{ rtrim($site['site_url'], '/').'/feed.xml' }}" rel="self" type="application/rss+xml"/>
@foreach ($posts as $post)
        <item>
            <title>{{ $post->title }}</title>
            <link>{{ rtrim($site['site_url'], '/').'/blog/'.rawurlencode($post->slug) }}</link>
            <guid isPermaLink="true">{{ rtrim($site['site_url'], '/').'/blog/'.rawurlencode($post->slug) }}</guid>
            <pubDate>{{ $post->published_at->toRssString() }}</pubDate>
            <description>{{ $post->excerpt }}</description>
        </item>
@endforeach
    </channel>
</rss>
