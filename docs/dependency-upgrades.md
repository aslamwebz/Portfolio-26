# Stable dependency upgrade report

Captured from the original manifests/lockfiles and the final clean lockfile on 22 October 2026. These tables list every direct Composer/npm dependency, including removed packages and old platform-specific optional binaries. A removed direct package may still exist transitively when another maintained package needs it.

## Runtime policy

- PHP requirement remains `~8.4.27 || ^8.5.12`; Composer platform remains `8.4.27`.
- CI and `.nvmrc`: Node `24.22.1` LTS; package engine `^24.22.1`.
- No preview, beta, RC or development requirement was introduced.
- `node_modules` and `package-lock.json` were deleted once after pruning unused imports, then reinstalled normally. The resulting npm audit reports **zero vulnerabilities**; Composer audit is clean.

## Composer

| Direct package | Before (locked) | After (locked) | Status |
| --- | --- | --- | --- |
| `fakerphp/faker` | v1.24.1 | v1.24.1 | Retained / upgraded |
| `filament/filament` | v5.10.3 | v5.10.3 | Retained / upgraded |
| `inertiajs/inertia-laravel` | v2.0.28 | v3.5.2 | Retained / upgraded |
| `laravel/boost` | v2.10.3 | v2.10.3 | Retained / upgraded |
| `laravel/fortify` | v1.41.0 | v1.41.0 | Retained / upgraded |
| `laravel/framework` | v12.70.1 | v13.38.0 | Retained / upgraded |
| `laravel/pail` | v1.2.7 | v1.2.7 | Retained / upgraded |
| `laravel/pint` | v1.32.1 | v1.32.1 | Retained / upgraded |
| `laravel/sail` | v1.69.0 | v1.69.0 | Retained / upgraded |
| `laravel/tinker` | v2.11.1 | v3.0.2 | Retained / upgraded |
| `laravel/wayfinder` | v0.1.23 | v0.1.23 | Retained / upgraded |
| `livewire/blaze` | v1.0.19 | v1.0.19 | Retained / upgraded |
| `mockery/mockery` | 1.6.15 | 1.6.15 | Retained / upgraded |
| `nunomaduro/collision` | v8.9.5 | v8.9.5 | Retained / upgraded |
| `pestphp/pest` | v4.7.8 | v5.3.3 | Retained / upgraded |
| `pestphp/pest-plugin-laravel` | v4.1.0 | v5.0.1 | Retained / upgraded |
| `symfony/html-sanitizer` | — | v8.1.8 | Added |

## npm

| Direct package | Before (locked) | After (locked) | Status |
| --- | --- | --- | --- |
| `@babel/core` | — | 8.0.7 | Added |
| `@eslint-react/eslint-plugin` | — | 5.28.6 | Added |
| `@eslint/js` | 9.39.2 | 10.0.1 | Retained / upgraded |
| `@headlessui/react` | 2.2.9 | — | Removed direct dependency |
| `@inertiajs/react` | 2.3.15 | 3.9.1 | Retained / upgraded |
| `@laravel/vite-plugin-wayfinder` | 0.1.7 | 0.1.11 | Retained / upgraded |
| `@radix-ui/react-avatar` | 1.1.11 | — | Removed direct dependency |
| `@radix-ui/react-checkbox` | 1.3.3 | 1.4.1 | Retained / upgraded |
| `@radix-ui/react-collapsible` | 1.1.12 | — | Removed direct dependency |
| `@radix-ui/react-dialog` | 1.1.15 | — | Removed direct dependency |
| `@radix-ui/react-dropdown-menu` | 2.1.16 | — | Removed direct dependency |
| `@radix-ui/react-label` | 2.1.8 | 2.1.17 | Retained / upgraded |
| `@radix-ui/react-navigation-menu` | 1.2.14 | — | Removed direct dependency |
| `@radix-ui/react-select` | 2.2.6 | — | Removed direct dependency |
| `@radix-ui/react-separator` | 1.1.8 | — | Removed direct dependency |
| `@radix-ui/react-slot` | 1.2.4 | 1.5.0 | Retained / upgraded |
| `@radix-ui/react-toggle` | 1.1.10 | — | Removed direct dependency |
| `@radix-ui/react-toggle-group` | 1.1.11 | — | Removed direct dependency |
| `@radix-ui/react-tooltip` | 1.2.8 | — | Removed direct dependency |
| `@rolldown/plugin-babel` | — | 0.2.4 | Added |
| `@rollup/rollup-linux-x64-gnu` | 4.9.5 | — | Removed direct dependency |
| `@rollup/rollup-win32-x64-msvc` | 4.9.5 | — | Removed direct dependency |
| `@tailwindcss/oxide-linux-x64-gnu` | 4.2.0 | — | Removed direct dependency |
| `@tailwindcss/oxide-win32-x64-msvc` | 4.2.0 | — | Removed direct dependency |
| `@tailwindcss/typography` | 0.5.19 | — | Removed direct dependency |
| `@tailwindcss/vite` | 4.2.0 | 4.3.3 | Retained / upgraded |
| `@types/lodash` | 4.17.24 | — | Removed direct dependency |
| `@types/node` | 22.19.11 | 24.19.2 | Retained / upgraded |
| `@types/react` | 19.2.14 | 19.3.0 | Retained / upgraded |
| `@types/react-dom` | 19.2.3 | 19.3.0 | Retained / upgraded |
| `@types/react-syntax-highlighter` | 15.5.13 | 15.5.13 | Retained / upgraded |
| `@vitejs/plugin-react` | 5.1.4 | 6.1.2 | Retained / upgraded |
| `babel-plugin-react-compiler` | 1.0.0 | 1.0.0 | Retained / upgraded |
| `class-variance-authority` | 0.7.1 | 0.7.1 | Retained / upgraded |
| `clsx` | 2.1.1 | 2.1.1 | Retained / upgraded |
| `concurrently` | 9.2.1 | 10.0.6 | Retained / upgraded |
| `eslint` | 9.39.2 | 10.13.0 | Retained / upgraded |
| `eslint-config-prettier` | 10.1.8 | 10.1.8 | Retained / upgraded |
| `eslint-import-resolver-typescript` | 4.4.4 | 4.4.5 | Retained / upgraded |
| `eslint-plugin-import` | 2.32.0 | — | Removed direct dependency |
| `eslint-plugin-import-x` | — | 4.17.1 | Added |
| `eslint-plugin-react` | 7.37.5 | — | Removed direct dependency |
| `eslint-plugin-react-hooks` | 7.0.1 | 7.1.1 | Retained / upgraded |
| `framer-motion` | 12.35.0 | — | Removed direct dependency |
| `globals` | 15.15.0 | 17.13.0 | Retained / upgraded |
| `html-react-parser` | 5.2.17 | 6.1.9 | Retained / upgraded |
| `input-otp` | 1.4.2 | 1.5.0 | Retained / upgraded |
| `laravel-vite-plugin` | 2.1.0 | 3.2.0 | Retained / upgraded |
| `lightningcss-linux-x64-gnu` | 1.31.1 | — | Removed direct dependency |
| `lightningcss-win32-x64-msvc` | 1.31.1 | — | Removed direct dependency |
| `lodash` | 4.17.23 | — | Removed direct dependency |
| `lucide-react` | 0.475.0 | 1.61.0 | Retained / upgraded |
| `prettier` | 3.8.1 | 3.9.10 | Retained / upgraded |
| `prettier-plugin-tailwindcss` | 0.6.14 | 0.8.1 | Retained / upgraded |
| `react` | 19.2.4 | 19.3.1 | Retained / upgraded |
| `react-dom` | 19.2.4 | 19.3.1 | Retained / upgraded |
| `react-syntax-highlighter` | 16.1.1 | 16.1.2 | Retained / upgraded |
| `tailwind-merge` | 3.5.0 | 3.7.0 | Retained / upgraded |
| `tailwindcss` | 4.2.0 | 4.3.3 | Retained / upgraded |
| `tw-animate-css` | 1.4.0 | — | Removed direct dependency |
| `typescript` | 5.9.3 | 6.0.3 | Retained / upgraded |
| `typescript-eslint` | 8.56.0 | 8.72.0 | Retained / upgraded |
| `vite` | 7.3.1 | 8.3.5 | Retained / upgraded |

Build tools and type packages now live in devDependencies; HTML parsing and highlighting remain runtime dependencies because SSR loads article/case components. Unused headless/Radix primitives, direct Lodash/types, Framer Motion and unused Tailwind animation/typography packages were removed.

## Breaking changes handled

1. **Tinker 3 before Laravel 13:** the old Tinker 2 requirement prevented Laravel 13 resolution. This order change allowed separately tested commits.
2. **Laravel 13:** migrate the Filament request-forgery middleware reference and review bootstrap, casts, authentication and queue configuration. Keep existing migrations and authentication recovery/challenge flows.
3. **Inertia 3 adapters together:** resolve typed page modules, migrate head/config handling, hydrate server markup, pass the CSP nonce explicitly, and retain the initial document nonce on client navigation. Match the PHP and React adapters' major versions.
4. **Pest 5 / Laravel plugin 5 / PHPUnit 13:** move the required test toolchain together and run the existing suite without skipping or weakening checks.
5. **Vite 8 / Laravel plugin 3:** migrate the incompatible peer pair together. The React plugin 6 uses the compatible Rolldown Babel integration and Babel 8 for the React compiler. Keep both client and SSR builds working.
6. **React 19.3:** use the matching runtime/types, client hydration and a single string child for SVG titles; split title text caused a real hydration mismatch and was corrected.
7. **Tailwind / formatting:** update Tailwind 4 tooling and the Prettier plugin, use CSS tokens for light/dark themes, remove unreachable starter styles and unused plugins.
8. **TypeScript 6:** remove obsolete baseUrl usage, explicitly include required ambient types, and include Vite configuration in type checking. No suppression was added to hide compatibility errors.
9. **ESLint 10:** replace unsupported legacy React/import plugins with the supported React ESLint and import-x packages. Retain TypeScript, hooks, imports and formatting checks; CI lint runs without fixing files.
10. **Lucide 1 / HTML parser 6 / concurrently 10:** check retained imports, parser output and build/development scripts. Highlight only the limited languages needed by article pages, in a post-only chunk.
11. **Motion:** choose CSS reveals and restrained hover transitions instead of upgrading Framer. No ongoing particles, typing timer or animation dependency remains.
12. **Platform binaries:** remove old rollup/oxide/lightningcss optional pins. npm chooses binaries for each platform; the clean install completed without forced peer resolution.
13. **CI / deployment:** checkout 7.0.1, setup-node 7.1.0, cache 6.1.0, setup-php 2.40.0. Generate Wayfinder types before static checks on a fresh checkout. A shared generator normalizes only generated helpers using the existing lint/format rules, fixing the reproduced clean-checkout import-order failure; authored-code CI lint remains read-only. Deployment builds SSR, checks PHP requirements and owner readiness, rejects stale SSR health and verifies the replacement process.

## Holdbacks and deployment limits

- **TypeScript 7.0.2 is held back.** The required typescript-eslint 8.72.0 declares support for `>=4.8.4 <6.1.0`; use supported stable TypeScript 6.0.3. No forced/legacy peer installation was used.
- Filament 5, Tailwind 4 and React 19.3 stay within the majors explicitly requested. Their current compatible stable patches are listed above.
- Production was not changed. Hostinger's displayed vendor-patched PHP 8.5.11 differs from the declared upstream floor; confirm a compatible runtime before merging. Do not relax the Composer requirement.
- Confirm persistent Node 24 SSR support, process supervision, working text compression and the existing owner account before rollout. A successful local build is not evidence that production SSR is running.

## Primary migration references

- [Laravel 13 upgrade](https://laravel.com/framework/docs/13.x/upgrade)
- [Inertia 3 upgrade](https://inertiajs.com/docs/v3/getting-started/upgrade-guide)
- [Pest upgrade](https://pestphp.com/docs/upgrade-guide)
- [PHPUnit 13 changes](https://github.com/sebastianbergmann/phpunit/blob/13.0.0/ChangeLog-13.0.md)
- [Vite 8 migration](https://v8.vite.dev/guide/migration)
- [Vite React plugin releases](https://github.com/vitejs/vite-plugin-react/releases)
- [TypeScript ESLint support matrix](https://typescript-eslint.io/users/dependency-versions/)
- [ESLint 10 migration](https://eslint.org/docs/latest/use/migrate-to-10.0.0)
- [React hydration](https://react.dev/reference/react-dom/client/hydrateRoot)

Each independent major upgrade was committed after all eight checks passed; incompatible adapter/toolchain peers were upgraded together. See the branch history and the main verification report for final results.
