<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use App\Models\Project;
use Illuminate\Http\Response;
use Illuminate\Support\Str;

class SocialImageController extends Controller
{
    public function home(): Response
    {
        return $this->image('Backend engineer building AI systems', 'Mohamed Aslam');
    }

    public function project(Project $project): Response
    {
        abort_unless($project->is_flagship, 404);

        return $this->image($project->title, 'Case study / '.$project->category);
    }

    public function post(BlogPost $blogPost): Response
    {
        abort_unless(BlogPost::published()->whereKey($blogPost->id)->exists(), 404);

        return $this->image($blogPost->title, 'Writing / '.$blogPost->category);
    }

    private function image(string $title, string $label): Response
    {
        abort_unless(extension_loaded('gd'), 503);
        $font = resource_path('fonts/Inter.ttf');
        $canvas = imagecreatetruecolor(1200, 630);
        $background = imagecolorallocate($canvas, 11, 12, 18);
        $surface = imagecolorallocate($canvas, 19, 20, 30);
        $line = imagecolorallocate($canvas, 48, 48, 68);
        $ink = imagecolorallocate($canvas, 243, 242, 248);
        $muted = imagecolorallocate($canvas, 182, 179, 198);
        $blue = imagecolorallocate($canvas, 185, 164, 255);
        imagefill($canvas, 0, 0, $background);
        imagefilledrectangle($canvas, 0, 0, 10, 630, $blue);
        imagettftext($canvas, 18, 0, 70, 80, $muted, $font, 'Mohamed Aslam / Software engineer');
        imagettftext($canvas, 17, 0, 70, 170, $blue, $font, Str::limit($label, 65));

        $lines = $this->wrap(Str::limit(strip_tags($title), 140), $font, 50, 900);
        foreach (array_slice($lines, 0, 4) as $index => $text) {
            imagettftext($canvas, 50, 0, 66, 260 + $index * 76, $ink, $font, $text);
        }

        foreach ([220, 310, 400] as $y) {
            imagefilledrectangle($canvas, 1040, $y, 1130, $y + 48, $surface);
            imagerectangle($canvas, 1040, $y, 1130, $y + 48, $line);
            if ($y !== 400) {
                imageline($canvas, 1085, $y + 48, 1085, $y + 90, $blue);
            }
        }
        imageline($canvas, 70, 550, 1130, 550, $line);
        imagettftext($canvas, 17, 0, 70, 594, $muted, $font, 'mohamedaslam.dev');
        imagettftext($canvas, 15, 0, 745, 594, $muted, $font, 'Architecture / decisions / evidence');
        ob_start();
        imagepng($canvas);
        $png = ob_get_clean();

        return response($png)->header('Content-Type', 'image/png')->header('Cache-Control', 'public, max-age=0, must-revalidate');
    }

    /** @return list<string> */
    private function wrap(string $text, string $font, int $size, int $width): array
    {
        $lines = [];
        $line = '';
        foreach (preg_split('/\s+/u', $text) ?: [] as $word) {
            $candidate = $line === '' ? $word : $line.' '.$word;
            $box = imagettfbbox($size, 0, $font, $candidate);
            if ($line !== '' && $width < $box[2] - $box[0]) {
                $lines[] = $line;
                $line = $word;
            } else {
                $line = $candidate;
            }
        }
        $lines[] = $line;

        return $lines;
    }
}
