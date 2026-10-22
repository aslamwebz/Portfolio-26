<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BlogSearchRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /** @return array<string, array<int, string>> */
    public function rules(): array
    {
        return [
            'search' => ['nullable', 'string', 'max:120'],
            'category' => ['nullable', 'string', 'max:80'],
            'page' => ['nullable', 'integer', 'min:1'],
        ];
    }

    /** @return array<string, string> */
    public function messages(): array
    {
        return [
            'search.string' => 'Enter a single search phrase.',
            'search.max' => 'Keep your search within 120 characters.',
            'category.string' => 'Choose one category.',
            'category.max' => 'The category name is too long.',
            'page.integer' => 'Choose a valid page number.',
            'page.min' => 'Page numbers start at one.',
        ];
    }
}
