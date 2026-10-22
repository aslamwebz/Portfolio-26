<?php

use Illuminate\Support\Str;

require dirname(__DIR__, 2).'/vendor/autoload.php';

if (! extension_loaded('gd') || ! function_exists('imagewebp')) {
    fwrite(STDERR, "PHP GD with WebP support is required to build project previews.\n");
    exit(1);
}

$source = dirname(__DIR__, 2).'/public/img/projects';
$destination = $source.'/optimized';
if (! is_dir($destination) && ! mkdir($destination, 0755, true) && ! is_dir($destination)) {
    throw new RuntimeException('Could not create the project preview directory.');
}

$names = [];
foreach (new DirectoryIterator($source) as $file) {
    if ($file->isLink() || ! $file->isFile() || ! in_array(strtolower($file->getExtension()), ['png', 'jpg', 'jpeg'], true)) {
        continue;
    }
    $name = Str::slug($file->getBasename('.'.$file->getExtension())).'.webp';
    if (isset($names[$name])) {
        throw new RuntimeException('Two project images resolve to the same preview name: '.$name);
    }
    $names[$name] = true;
    $image = imagecreatefromstring(file_get_contents($file->getPathname()));
    if (! $image) {
        throw new RuntimeException('Cannot decode project image: '.$file->getFilename());
    }
    $width = imagesx($image);
    $height = imagesy($image);
    if ($width > 1280) {
        $image = imagescale($image, 1280, max(1, (int) round($height * 1280 / $width)));
        if (! $image) {
            throw new RuntimeException('Cannot scale project image: '.$file->getFilename());
        }
    }
    if (! imagewebp($image, $destination.'/'.$name, 82)) {
        throw new RuntimeException('Cannot write project preview: '.$name);
    }
}

fwrite(STDOUT, 'Prepared '.count($names)." faithful WebP project previews; originals retained.\n");
