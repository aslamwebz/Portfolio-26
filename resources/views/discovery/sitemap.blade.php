{!! '<?xml version="1.0" encoding="UTF-8"?>' !!}
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
@foreach (['/', '/projects', '/blog'] as $path)
    <url><loc>{{ $base.$path }}</loc></url>
@endforeach
@foreach ($projects as $project)
    <url><loc>{{ $base.'/projects/'.rawurlencode($project->slug) }}</loc><lastmod>{{ $project->updated_at->toAtomString() }}</lastmod></url>
@endforeach
@foreach ($posts as $post)
    <url><loc>{{ $base.'/blog/'.rawurlencode($post->slug) }}</loc><lastmod>{{ $post->updated_at->toAtomString() }}</lastmod></url>
@endforeach
</urlset>
