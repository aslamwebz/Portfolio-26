<?php

namespace App\Http\Controllers;

use App\Support\CvFile;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class CvController extends Controller
{
    public function __invoke(): BinaryFileResponse
    {
        $file = CvFile::resolve();
        abort_unless($file, 404);

        return response()->download($file, 'Mohamed-Aslam-CV.pdf', ['Content-Type' => 'application/pdf']);
    }
}
