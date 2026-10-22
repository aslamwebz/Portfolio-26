# Portfolio rework: audit and implementation plan

**Goal:** A hiring manager can identify Mohamed Aslam's backend and applied-AI focus in ten seconds, inspect engineering evidence in two minutes, then email him or download his CV.

**Architecture:** Laravel controllers prepare small, explicit Inertia payloads. One public layout and one homepage lead to three database-backed case studies. Filament remains the private content editor. Publication rules, HTML sanitization, CV resolution and metadata are enforced on the server.

**Execution:** Implement inline on `rework/portfolio`, with small tested commits. Do not merge, deploy this branch, or change production data. The user's supplied eight-step brief is the approved specification; this document records the evidence and implementation decisions.

## Constraints

- Keep PHP `~8.4.27 || ^8.5.12` and Composer platform PHP `8.4.27`.
- Stable dependencies only. Read official migration guides. Upgrade direct majors separately except adapter/toolchain pairs that cannot resolve independently.
- Run `composer test`, `php vendor/bin/pint --test`, `composer audit`, `npm run lint`, `npm run types`, `npm run format:check`, `npm run build`, and `npm run build:ssr` after each step. Fix failures before continuing.
- At the end, require no high/critical npm advisories, and measure the requested Lighthouse, LCP, CLS and JavaScript budgets.
- Preserve existing migrations, rows, Filament resources, admin login and certificate editing. Use additive migrations and non-destructive seeders. Never change `.env` values.
- No invented metrics, customers, dates, qualifications, or production-AI claims. Identify missing facts with `TODO:` and unverified claims with `TODO-VERIFY:`.
- Employer projects remain anonymous. Public Freya material links to **Freya-v1**; private continuation claims must not be attributed to v1.
- Keep education and certificates in a compact background disclosure within Experience; their omission from the new section list does not authorize removing them.
- No AI attribution trailers in commits or the PR.

## Baseline

Measured 22 October 2026, on a Vite production build through a local production-mode Laravel server and a separate SQLite preview database. The real database service was unavailable; `.env` and the original database were not changed. Lighthouse 13.5.0, Chrome, default simulated mobile/desktop presets. The initial UI and Laravel 12 were unchanged during measurement.

| Page | Device | Performance | Accessibility | Best Practices | SEO | LCP | CLS |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `/` | Mobile | 53 | 94 | 96 | 100 | 9.61 s | 0 |
| `/` | Desktop | 89 | 94 | 96 | 100 | 1.80 s | 0.0041 |
| `/projects` | Mobile | 69 | 89 | 100 | 100 | 6.79 s | 0 |
| `/projects` | Desktop | 96 | 81 | 100 | 100 | 1.28 s | 0 |
| `/blog` | Mobile | 69 | 92 | 100 | 100 | 6.78 s | 0 |
| `/blog` | Desktop | 94 | 89 | 100 | 100 | 1.28 s | 0 |

The initial test suite passed **44 tests / 165 assertions**. All eight checks passed after the Tinker and Laravel migrations. An initial sandbox-only PHPUnit bootstrap/cache error disappeared when the checks ran with normal filesystem access; it was not fixed by changing application checks.

## Audit: pages and routes

| Area | Responsibility and findings | Planned treatment |
| --- | --- | --- |
| `pages/Dashboard.tsx` | Large public homepage combining data, animation, project/certificate lightboxes, timeline, education, a simulated terminal and an alert-only contact form. Contains unsupported 40% outcome claims and animated counts. | Replace with a small `home.tsx` composing focused sections; retain useful background/certificates, remove unsupported claims and the nonfunctional form. |
| `pages/new.tsx`, `css/folio.css` | A second long homepage with duplicated career/content data and a different design. | Keep its clearer hierarchy, consolidate into one page, redirect `/new` permanently. |
| `pages/projects/index.tsx` | Project listing with hardcoded fallback content and independent styling. | Render database summaries in the shared layout, three case studies plus six compact other projects; no filters at this size. |
| `pages/blog/index.tsx` | Search/category UI, debounced requests, no pagination, duplicated post interfaces. | Validated server search, pagination, explicit summary DTO, deterministic dates and shared layout. |
| `pages/blog/show.tsx` | Parses editor HTML, eagerly imports all-language highlighting, has no publication guard on the direct route. | Published-only lookup, sanitized HTML, post-only highlighting, article metadata and reading time. |
| `pages/user-dashboard.tsx` | Starter-kit authenticated dashboard, not a portfolio feature. | Remove the page/route and assert 404. |
| `pages/settings/*` and `routes/settings.php` | Starter-kit profile/password/appearance/2FA settings UI and controllers. | Remove public settings pages/routes as requested; preserve authentication/password-reset/challenge flows and test removed endpoints return 404. |
| `pages/auth/*` | Fortify login, reset, email verification, password confirmation and 2FA challenge screens; dead register screen. | Keep the working authentication flows; remove dead registration UI and all public-nav account links. Redirect successful login to admin. |
| `routes/web.php` | Closure handlers fetch complete model collections; checks table existence on each request. | Typed Home, Project and Blog controllers. Run migrations rather than hiding missing-schema problems per request. |
| `/admin` | Filament project, certificate and blog editing. User has no explicit `FilamentUser` authorization contract. | Preserve resources, add owner-only `canAccessPanel`, explicit owner bootstrap and site settings editing. |

## Audit: component and supporting-code inventory

- `navigation.tsx`: public navigation, mobile-menu state and anchor scrolling; replace with semantic links, accessible mobile controls, theme switch and no account links.
- `terminal.tsx`, `particles.tsx`, inline homepage typewriter/canvas/motion helpers: decorative ongoing work and first-paint costs; remove from the public experience, use static architecture evidence and restrained CSS reveal.
- `CodeBlock.tsx`: Prism with every language/theme, inline styles and decorative chrome; keep the capability on article pages only, use limited languages and CSS tokens compatible with the CSP.
- `reveal.tsx`, `use-scroll-reveal.ts`: optional reveal behavior; preserve visible content without JavaScript and disable motion when requested.
- `app-{content,header,logo,logo-icon,shell,sidebar,sidebar-header}.tsx`, `nav-{footer,main,user}.tsx`, `user-{info,menu-content}.tsx`, `breadcrumbs.tsx`, `layouts/app*`, `layouts/settings/*`, mobile-navigation/initials/current-url hooks: starter app-shell infrastructure; delete only after confirming no retained page imports them.
- `layouts/auth*`, `input-error`, `alert-error`, `text-link`, `heading`, `ui/{button,input,label,checkbox,spinner,dialog,tooltip,input-otp}`, two-factor components, clipboard and 2FA hooks: retained authentication dependencies until the import graph proves otherwise.
- Remaining `components/ui/*`: shared primitives. Preserve those reached by retained auth/public pages; remove unreachable leftovers at final cleanup, not by filename guesswork.
- `hooks/use-appearance.tsx`, appearance middleware and root Blade template: default to dark, preserve explicit light preferences, validate cookie values and make SSR/client theme output consistent.
- `lib/utils.ts` and `types/*`: utilities and duplicated/incomplete shared types; keep only used utilities and introduce shared public DTO types.
- `app.tsx` / `ssr.tsx`: lazy page resolution exists, but the client uses `createRoot` even for SSR HTML. Inertia 3 needs typed module resolution; hydrate SSR output instead of recreating it.
- Models/migrations: projects lack case-study fields; blog publication scope already exists but is not used on detail routes. Add fields, keep all prior migrations.
- Seeders: Project, Certification and BlogPost seeders call `truncate`; replace with idempotent writes that preserve existing rows and later editor changes.
- Configuration/providers: registration is already disabled and Fortify already has a login limiter. Preserve both, update Laravel 13's request-forgery middleware reference and add explicit panel access.
- Published Vite assets are tracked. Keep their final production build coherent with the source and document the hosting build/SSR process.

## Audit: accessibility, SEO and security

- Measured accessibility failures: insufficient text contrast, no main landmark on all three pages, and skipped heading levels on projects. Add landmarks, a skip link, one h1, sequential headings, visible focus, labels, reduced motion and explicit image dimensions.
- Existing theme is inconsistent across the two homepages; dark-only inline colors defeat a working light mode. Introduce CSS tokens used by every public page.
- Current pages have some titles/descriptions, which explains the high baseline SEO score; this does **not** prove complete metadata. Add canonicals, Open Graph/Twitter images, Person/Article JSON-LD, sitemap, robots and RSS.
- Direct draft/scheduled post URLs must return 404. Publication scope also controls lists, home summaries, RSS, sitemap and post images.
- Editor HTML requires server sanitization; parsing HTML into React is not a sanitizer. Preserve safe formatting while removing scripts, event handlers and unsafe URL schemes.
- Bound Eloquent search plus length/type validation and pagination avoids interpolated SQL and unbounded responses.
- Add nonce-based public CSP and security headers; do not break Filament's editor/runtime with a public-only policy. Keep production debug off and verify login throttling.
- CV resolution must restrict files to intended public roots and PDFs. Missing files hide the download action gracefully and return 404, never disclose filesystem paths.
- Architecture media and public URLs require safe validation. Do not render arbitrary admin-supplied SVG markup or use user input as executable code.

## Decisions and trade-offs

1. **One coherent technical design:** neutral surfaces, a single violet accent, Inter for text/display, system mono for code; dark first with a true light palette. This palette incorporates the later approved balanced blend in `balanced-design.md`. The distinctive proof is a small system sketch for each project, not animated statistics.
2. **CSS over Framer Motion:** static first paint; only optional subtle scroll reveal with reduced-motion handling. Remove the animation package after replacing its consumers.
3. **Server ownership of public data:** controllers/DTOs select summary fields; no full article bodies on indexes. Blog search/pagination remains progressively usable through ordinary forms and links.
4. **Additive content model:** Project gets slug, flagship/role/problem, decisions/results JSON, architecture/repository/demo/video fields and markdown body. Backfill links/slugs without deleting rows. A singleton settings record owns CV, availability and social links; initial-content seeding is recorded so repeat seeding cannot overwrite editor changes.
5. **Case-study truthfulness:** Freya is a desktop agent, Forge a multi-agent terminal workspace, HireAI a job-application tool for job seekers rather than an employer recruiting product. Draft from public sources; label version-specific or inferred claims. Do not use commit/test counts as business impact.
6. **Background remains:** include the confirmed employment timeline and compact education/certificate disclosure. Keep the certificate admin resource and access to certificate media.
7. **Deployment remains separate:** this branch is not production. Keep the existing PHP constraints. The live Hostinger PHP is a vendor-patched 8.5.11 build dated 21 October 2026; document that its displayed version differs from the declared upstream security floor. Production SSR needs a persistent Node process, not merely an SSR bundle.

## Implementation checkpoints

### 0. Stable dependency upgrades

- [x] Capture direct dependencies and official release metadata before changing manifests.
- [x] Tinker 3 first: the old v2 requirement prevents Laravel 13 resolution. This order change preserves separately testable major upgrades.
- [x] Laravel 13: update the Filament request-forgery middleware reference; review config, auth, queue, middleware and model changes against the official guide.
- [x] Inertia 3 adapters together: migrate page config/head attributes, use exported component types and hydrate SSR HTML.
- [x] Pest 5 and Laravel plugin 5; review PHPUnit 13 removals and run the existing suite.
- [x] Remaining Composer stable updates and Filament asset publishing; clean audit.
- [x] Upgrade the Vite/Laravel bundler peer pair together, then the React Vite plugin, React/types, Tailwind/Prettier tooling, TypeScript, ESLint ecosystem, icons, parser and concurrently. Keep each independently resolvable major in its own commit.
- [x] TypeScript 7 is held back: verified typescript-eslint support is `>=4.8.4 <6.1.0`. Use stable 6.0.3 while the native compiler remains unsupported by the required linter.
- [x] Replace ESLint React/import plugins if their published peers prevent ESLint 10; retain equivalent/stronger checks, never force incompatible peers or disable checks to obtain a pass.
- [x] Node 24.22.1 LTS, `.nvmrc`, engines and current stable Actions. Remove hard-pinned platform binaries.
- [x] Record before/after direct versions, breaking changes, holdbacks and every suite result.

### 1. Audit checkpoint

- [x] Record initial architecture, publication/data hazards and six Lighthouse measurements.
- [x] Finalize the component inventory and migration decisions in this document after dependency work.
- [x] Commit the audit without introducing unrelated application changes.

### 2. Public structure and access

Files: `routes/web.php`, new public controllers and `resources/js/types/portfolio.ts`; `pages/home.tsx`, `components/home/*`, public layout; Fortify configuration, User panel contract and additive admin flag migration.

- [x] Write failing feature tests for home props, `/new` 301, removed dashboard/settings routes, registration denial, guest admin redirect and non-owner 403.
- [x] Add controllers, explicit summary payloads and one homepage; preserve existing data-backed content until the case-study migration.
- [x] Keep authentication recovery/challenge pages and Filament resources; add an explicit owner bootstrap path without guessed credentials.
- [x] Remove requested unused logs/root index and confirmed unreachable starter code. Run the complete suite and commit.

### 3. Content and admin editing

Files: additive Project/settings migrations; `Project`, `SiteSetting`, factories and safe seeders; Project/settings Filament forms; `ProjectController::show`; `pages/projects/show.tsx` and architecture component.

- [x] Write failing tests for stored decisions/results, non-flagship 404, safe markdown/media, missing CV and idempotent seeders preserving arbitrary pre-existing records and editor changes.
- [x] Introduce case-study and settings fields; backfill only new fields on old records.
- [x] Seed three source-backed flagship drafts and six plain-language other projects, with an initialization marker protecting subsequent admin edits.
- [x] Build scannable case pages with problem, role, stack, architecture, decisions/trade-offs, hard problems, results placeholders, next steps and verified links.
- [x] Implement all requested homepage sections; use mailto instead of the current unsent form. Run the complete suite and commit.

### 4. Design and responsive verification

- [x] Apply shared CSS tokens, typography and responsive layout across all public pages; keep source files near/below 300 lines.
- [x] Provide working light/dark modes, visible keyboard focus, skip link, labelled menu/theme/search controls, useful image text and reduced motion.
- [x] Remove simulated terminal/particle work and Framer consumers. Preserve useful certificate viewing and background content.
- [x] Inspect 360, 768, 1280 and 1920 px layouts, keyboard operation, both themes and horizontal overflow. Capture screenshots for the PR.
- [x] Run the complete suite and commit.

### 5. Publication, metadata and performance

Files: security middleware, publication-aware Blog/Feed/Sitemap/OG controllers, safe content/CV services, public metadata component, RSS/XML views and deployment script.

- [x] Write failing tests for draft/future post access, escaped/validated search, pagination, publication-only feeds/sitemap/images, metadata/headers and CV traversal/missing files.
- [x] Sanitize editor HTML; calculate reading time. Keep highlighting in a separate article-only chunk.
- [x] Add canonical/title/description, social cards/images, JSON-LD, sitemap, robots and RSS.
- [x] Configure SSR, client hydration and build/start/restart/health-check deployment steps; validate actual local rendered HTML rather than only the config flag.
- [x] Measure mobile `/`, `/projects/freya` and `/blog`: target 95+ in all categories, LCP <2 s, CLS <0.05, home JS <150 KB gzip. Report actual misses; do not fabricate passing results.
- [x] Run the complete suite and commit.

### 6. Regression and final cleanup

- [x] Exercise all requested feature-level behaviors, including owner/non-owner admin access, registration, feeds, draft 404s, security headers, CV availability and DB case-study payloads.
- [x] Trace retained imports, remove only unused dependencies, verify safe absolute deletion targets, delete `node_modules` and the lockfile once, reinstall and audit.
- [x] Run all required checks after cleanup, verify the rebuilt SSR pages and repeat measurements only when changed code invalidates them.

### 7–8. Documentation and delivery

- [x] Rewrite README with the verified live URL, actual versions, screenshots, correct clone URL, setup/test/deploy steps and PHP security requirement. Add a license if absent.
- [x] Produce full direct-dependency and before/after Lighthouse tables, screenshots, breaking changes, justified holdbacks and the complete TODO list.
- [x] Review the diff and commit messages for secrets, accidental data/environment changes and forbidden attribution trailers.
- [x] Push only `rework/portfolio`, create and attach a PR to `main`, and leave it unmerged. If CLI authentication fails, use a supported authenticated alternative or report the precise remaining sign-in step; never claim a PR exists without its URL.

## Content confirmation register

- `TODO:` Confirm location and time zone for the availability line.
- `TODO-VERIFY:` Replace/approve the existing CV PDF before merging; keep the download path editable in admin.
- `TODO-VERIFY:` Review each case study's ownership/role language, engineering decisions and trade-offs against the implementation being presented.
- `TODO-VERIFY:` Confirm which Freya version includes DeepSeek integration, AES-256-GCM key handling, SQLCipher and sealed backups. Never silently attribute private continuation features or benchmarks to public v1.
- `TODO:` Add documented usage/outcome, latency, cost or reliability measurements with scope and evidence. Do not substitute test or commit counts.
- `TODO:` Supply optional demo/video links; absence produces no fake link or empty button.
- `TODO-VERIFY:` Identify the existing owner account and grant its admin flag before production rollout; do not guess or create a production password.
- `TODO-VERIFY:` Confirm Hostinger's Node runtime, persistent SSR process support and the upstream-version/backport policy before deployment.
- The live URL and new LinkedIn URL have already been verified: `https://mohamedaslam.dev/` and `https://www.linkedin.com/in/aslamwebz/`.

## Primary references

- [Laravel 13 upgrade](https://laravel.com/framework/docs/13.x/upgrade)
- [Inertia 3 upgrade](https://inertiajs.com/docs/v3/getting-started/upgrade-guide)
- [Pest 5 upgrade](https://pestphp.com/docs/upgrade-guide) and [PHPUnit 13 changes](https://github.com/sebastianbergmann/phpunit/blob/13.0.0/ChangeLog-13.0.md)
- [Vite 8 migration](https://v8.vite.dev/guide/migration)
- [typescript-eslint supported versions](https://typescript-eslint.io/users/dependency-versions/)
- [Hostinger security/build-date guidance](https://statuspage.hostinger.com/)
- Public project READMEs: [Freya-v1](https://github.com/aslamwebz/Freya-v1), [Forge](https://github.com/aslamwebz/forge), [HireAI](https://github.com/aslamwebz/HireAI).

Laravel Boost is installed in the project but its MCP tools are not connected in this chat. Official upstream documentation and the supported Artisan CLI are used instead. Chrome and Lighthouse are available. GitHub CLI is installed, but its stored token was reported invalid during preflight; PR creation must be verified separately at delivery.

## Final implementation status

The implementation and measurements above are recorded in [rework-report.md](rework-report.md). All eight checks pass; 65 tests contain 488 assertions. The completed measurement checkpoint does **not** mean every performance bar passed: mobile home LCP is 2.491 s and Freya is 2.217 s, so the strict under-two-second target remains open. Keep delivery in draft until that target, factual content, CV and hosting prerequisites are resolved.
