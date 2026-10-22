<?php

namespace App\Support;

use App\Models\SiteSetting;
use Illuminate\Support\Facades\Storage;

class CvFile
{
    public static function resolve(?string $path = null): ?string
    {
        $path ??= SiteSetting::current()->cv_path;
        if (! $path || str_contains($path, '..') || str_contains($path, '\\') || str_contains($path, ':') || str_contains($path, "\0") || str_starts_with($path, '/') || strtolower(pathinfo($path, PATHINFO_EXTENSION)) !== 'pdf') {
            return null;
        }

        $stored = str_starts_with($path, 'storage/');
        $root = realpath($stored ? Storage::disk('public')->path('') : public_path());
        $file = realpath($stored ? Storage::disk('public')->path(substr($path, 8)) : public_path($path));

        return $root && $file && is_file($file) && str_starts_with($file, $root.DIRECTORY_SEPARATOR) ? $file : null;
    }
}
