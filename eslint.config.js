import js from '@eslint/js';
import react from '@eslint-react/eslint-plugin';
import prettier from 'eslint-config-prettier/flat';
import { importX as importPlugin } from 'eslint-plugin-import-x';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import typescript from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
    js.configs.recommended,
    reactHooks.configs.flat.recommended,
    ...typescript.configs.recommended,
    {
        ...react.configs['recommended-typescript'],
        languageOptions: {
            globals: {
                ...globals.browser,
            },
        },
    },
    {
        ...importPlugin.flatConfigs.recommended,
        settings: {
            'import-x/resolver': {
                typescript: true,
                node: true,
            },
        },
        rules: {
            'import-x/order': [
                'error',
                {
                    groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: true,
                    },
                },
            ],
        },
    },
    {
        ...importPlugin.flatConfigs.typescript,
        files: ['**/*.{ts,tsx}'],
        rules: {
            '@typescript-eslint/consistent-type-imports': [
                'error',
                {
                    prefer: 'type-imports',
                    fixStyle: 'separate-type-imports',
                },
            ],
        },
    },
    {
        ignores: ['vendor', 'node_modules', 'public', 'bootstrap/ssr', 'tailwind.config.js', 'vite.config.ts'],
    },
    prettier, // Turn off all rules that might conflict with Prettier
];
