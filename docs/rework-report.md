# Portfolio rework verification and review report

Verified on 22 October 2026, on `rework/portfolio`. This is a review build, not a production deployment. The approved balanced blend combines the earlier bold violet hero and rounded surfaces with the new diagrams and case-study structure.

## What changed

1. Upgrade the compatible stable dependency stack in independently verified commits. Laravel 13, Inertia 3, Pest 5, React 19.3, Vite 8 and ESLint 10 are installed. TypeScript 6.0.3 is the supported holdback; see the [complete direct-dependency tables](dependency-upgrades.md).
2. Replace duplicated public homepages with one typed Inertia page and focused components. `/new` redirects permanently to `/`. Public registration, starter settings and the visitor dashboard are removed; authentication recovery/challenge flows and Filament remain.
3. Add editable flagship case studies and site settings through additive migrations. Seeders retain existing rows and editor changes; the project initialization marker also preserves deliberate project deletions. Deleted seeded certificates/articles can be recreated by seeding. Projects, certificates and articles remain manageable through Filament.
4. Present three source-backed case studies, six compact other projects, confirmed employment, independent AI-assisted work, recorded certificates and direct contact/CV actions. No invented outcomes, client names, production AI experience or TypeScript proficiency claim.
5. Apply the approved balanced design, light/dark tokens, keyboard focus, skip navigation, restrained CSS effects and static architecture sketches. The hero diagram is explicitly an engineering sketch.
6. Add publication guards, sanitized content, metadata/JSON-LD, per-page social cards, sitemap, RSS and safe CV/media resolution. Draft/future posts are absent from public detail, lists, feeds, sitemap and social images.
7. Configure SSR hydration and a guarded deployment restart/health check. Enforce nonce CSP, production debug off and security headers. Filament uses an explicit owner flag, with an existing-account grant/check command.
8. Remove unused dependencies, old pinned platform binaries and requested junk. Perform the requested one-time clean reinstall. Refresh CI, documentation, licensing and production build assets.

## Automated verification

All eight required checks passed on the final source:

| Check | Result |
| --- | --- |
| `composer test` | 65 passed; 488 assertions |
| `php vendor/bin/pint --test` | Pass |
| `composer audit` | No advisories |
| `npm run lint` | Pass |
| `npm run types` | Pass |
| `npm run format:check` | Pass |
| `npm run build` | Pass |
| `npm run build:ssr` | Pass |

The separate final `npm audit` reports zero vulnerabilities. Feature coverage includes route/component props, permanent redirect, disabled registration, guest/non-owner/owner admin access, stored case decisions/results, safe HTML/media, CV existence/traversal, publication restrictions, feeds/sitemap/social images, headers and safe/idempotent seeding. Image regressions were reproduced before implementation; the final image tests pass without relaxing assertions.

### Clean-checkout CI follow-up

The first GitHub test job passed, but read-only lint exposed 20 import-order errors in freshly generated Wayfinder helpers. Raw generation followed by read-only lint reproduced the failure locally. The shared route generator now runs Artisan, then applies the existing ESLint/Prettier rules only to generated actions/routes/helpers. Vite and CI use the same preparation. Authored application code still receives the unchanged read-only CI lint check; no rule was disabled or suppressed. Fresh generation followed by read-only lint and formatting passes locally. All eight checks passed again, and read-only lint/format checks also passed after both builds finished. At that CI-only checkpoint, client asset hashes and the 122,397-byte JavaScript budget were unchanged; both GitHub checks subsequently passed. The later hero-motion update is measured below.

Browser checks: real SSR content appears in initial HTML; client hydration and page navigation have no observed CSP or hydration errors. The final browser console check contains no warnings/errors. Dark/light themes, skip link and visible keyboard focus were checked. Local SSR binds only to `127.0.0.1:13714`. This does not establish that production SSR is available.

## Lighthouse before and after

Chrome with Lighthouse 13.5.0, production client/SSR builds, default simulated mobile throttling and the desktop preset. Local measurements use a disposable SQLite preview; production data and environment values were not changed.

**Conditions differ and are disclosed:** baseline used plain PHP serving without response compression or OPcache. Final preview uses gzip matching the committed Apache text-compression policy, PHP OPcache, isolated configuration/route caches and a running SSR process. Its small local serving adapter lives outside the repository; it provides compression/static caching, not an HTML response cache or reduced Lighthouse throttling. These are local lab results, not production field measurements or a controlled estimate of code-only improvement.

| Page | Device | Performance | Accessibility | Best practices | SEO | LCP | CLS |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Before `/` | Mobile | 53 | 94 | 96 | 100 | 9.605 s | 0 |
| Before `/` | Desktop | 89 | 94 | 96 | 100 | 1.799 s | 0.0041 |
| Before `/projects` | Mobile | 69 | 89 | 100 | 100 | 6.790 s | 0 |
| Before `/projects` | Desktop | 96 | 81 | 100 | 100 | 1.283 s | 0 |
| Before `/blog` | Mobile | 69 | 92 | 100 | 100 | 6.784 s | 0 |
| Before `/blog` | Desktop | 94 | 89 | 100 | 100 | 1.281 s | 0 |
| After `/` | Mobile | 97 | 100 | 100 | 100 | **2.490 s** | 0 |
| After `/` | Desktop | 100 | 100 | 100 | 100 | 0.600 s | 0 |
| After `/projects/freya` | Mobile | 98 | 100 | 100 | 100 | **2.217 s** | 0 |
| After `/projects/freya` | Desktop | 100 | 100 | 100 | 100 | 0.462 s | 0 |
| After `/blog` | Mobile | 99 | 100 | 100 | 100 | 1.987 s | 0 |
| After `/blog` | Desktop | 100 | 100 | 100 | 100 | 0.514 s | 0 |

The flagship page did not exist before; the original projects index is contextual baseline data, not the same page. Home was remeasured after the approved hero-motion follow-up; flagship/blog rows are the preceding balanced-build measurements. All recorded mobile category scores meet 95 and all CLS values meet 0.05. **The strict mobile LCP <2 s bar remains unmet on home and Freya.** Blog only narrowly meets it. Do not mark that bar complete or merge on a claim that all performance targets pass. A script-priority experiment changed home LCP only marginally and was reverted; the table uses normal-loading builds. Remeasure on the intended production-equivalent server and address server response/critical rendering before release.

### Payloads and media

- Home entry plus all recursive static JavaScript imports, each gzipped once: **122,811 bytes**, below the 150,000-byte budget. The approved hero-motion control adds 414 gzip bytes to the preceding build. This is the home bundle graph, not every route's JavaScript.
- Admin/public pages and the article-only syntax highlighter are separate build paths/chunks. No highlighter is loaded by the home page.
- The local Inter subset is **29,660 bytes**, with weights 400–700 and `font-display: optional`; its OFL/provenance remains in the repository.
- Eight faithful WebP previews total **267,790 bytes**. Original project images are retained. Both client and SSR builds regenerate previews; PHP GD/WebP is required.
- Images have measured dimensions, asynchronous decoding and lazy loading below the fold. Missing/unsafe screenshot paths fall back to architecture diagrams.

## Responsive evidence

The production build was inspected/captured at the requested viewport widths. Each accessibility-only responsive run scored 100; scores alone do not prove all WCAG 2.2 AA requirements. The screenshots show dark mode. Lazy images outside the current viewport may still show their reserved surface in full-page captures and load on scroll.

- [360 px full page](screenshots/home-360.webp)
- [768 px full page](screenshots/home-768.webp)
- [1280 px full page](screenshots/home-1280.webp)
- [1920 px full page](screenshots/home-1920.webp)
- [Desktop first fold](screenshots/hero-desktop.jpg)
- [Mobile first fold](screenshots/hero-mobile.jpg)

No horizontal overflow was observed. A DOM check in the final desktop preview found one h1 and matching client/scroll widths. The large hero sketch is intentionally omitted on small screens. Browser keyboard/theme checks supplement the automated accessibility result; this is not an independent accessibility certification.

### Approved right-hand hero motion

The user approved a slow flow/glow sequence through User intent, Application core, Model, Memory and Tools, plus a six-pixel float for the panel and badges. The left-hand hero content remains stationary. CSS animates only opacity and transforms; no animation dependency, timer loop or inline style was added. A keyboard-accessible pause/play control freezes all panel, badge and pseudo-element animations.

Browser checks confirmed identical paused panel coordinates across separate observations, successful keyboard resume, stationary left-text coordinates, visible focus, working light/dark themes, and no horizontal overflow at 360 px. The narrow layout still hides the panel. Reduced-motion media rules suppress the motion and its control; a separate Chrome run using the [upstream reduced-motion switch](https://chromium.googlesource.com/chromium/src/+/master/ui/gfx/switches.cc) captured the static layout and scored 100 for accessibility. See [reduced-motion capture](screenshots/hero-reduced-motion.webp).

All eight required checks pass on this update: 65 tests / 488 assertions. The refreshed home measurements are 97/100/100/100 mobile and 100/100/100/100 desktop, with zero CLS. The desktop/mobile first-fold screenshots above are current; the four full-page width captures document the earlier balanced composition. The remaining LCP and factual/hosting release blockers are unchanged.

## Data, confidentiality and deployment boundaries

- No original migration was removed. Existing rows and Filament resources remain. Only additive migrations introduce case fields, settings and the explicit owner flag.
- No `.env` values changed. New configuration examples belong only in `.env.example`; preview database/caches and measurement logs remain outside the repo.
- No production migration, merge, main push or deployment was performed. No other project repository was modified.
- Employer work remains anonymous; excluded private work is not presented. Freya links only to the public v1 snapshot. Private continuation features/metrics are explicitly not attributed to v1.
- Existing CV/certificates are preserved; the current CV still needs approval/replacement. The MIT software license does not relicense personal documents or third-party font assets.
- Hostinger previously displayed a vendor-patched PHP 8.5.11 build. It must satisfy the unchanged `~8.4.27 || ^8.5.12` security floor before this branch can deploy. Do not bypass platform checks.
- Confirm Node 24, persistent SSR/process supervision, `proc_open`, GD/WebP, text compression and fingerprinted caching on the actual host. A successful SSR bundle is not proof of a production renderer.
- Authorize the exact existing owner after additive migration, then verify `portfolio:grant-admin --check`. No production account/password is guessed.

## Complete owner review register

These are explicit unresolved content/hosting decisions, not hidden accomplishments. The seeded case text below remains visibly marked until reviewed in admin. Review the actual database content if it predates these seeds; seeders intentionally preserve subsequent edits.

### General content and release

- **TODO:** Confirm location and time zone; the hero currently shows explicit placeholders.
- **TODO-VERIFY:** Approve or replace the existing `public/Resume.pdf` and set the intended CV path in admin. The older résumé was not silently rewritten by the portfolio task.
- **TODO-VERIFY:** Reconcile retained education/certificate details against the newest approved résumé; recorded dates do not imply current certification status.
- **TODO-VERIFY:** Approve the conceptual diagrams for Freya, Forge and HireAI against the version being presented.
- **TODO:** Supply optional demo/video URLs for each of Freya, Forge and HireAI; absent links remain absent.
- **TODO-VERIFY:** Identify and authorize the exact existing production owner account.
- **TODO-VERIFY:** Confirm the hosting PHP security floor/backport policy, Node 24/persistent SSR support, process supervision, `proc_open`, GD/WebP, compression and asset caching before rollout.
- **TODO:** Resolve the remaining home/Freya mobile LCP miss and remeasure all target pages under release-equivalent conditions.
- Already resolved: live URL is `https://mohamedaslam.dev/`; LinkedIn is `https://www.linkedin.com/in/aslamwebz/`.

### Freya

- `role`: Independent project: system design, AI-assisted implementation and review. TODO-VERIFY: confirm the scope of my ownership in the public v1 snapshot.
- `decisions[0].tradeoff`: TODO-VERIFY: confirm that continuity across UI restarts was the original motivation. This boundary also adds IPC and lifecycle complexity.
- `decisions[1].tradeoff`: TODO-VERIFY: review the exact enforcement coverage in v1. Explicit approval adds friction to otherwise automatic work.
- `decisions[2].tradeoff`: TODO-VERIFY: verify key storage, recovery and model-boundary behavior against the public snapshot; encrypted storage still needs careful key handling.
- `results[1].value`: TODO: add reproducible task completion, cancellation, latency and cost measurements for this exact version.
- `body`: TODO-VERIFY: describe one implemented failure-and-recovery path, including what happens if a tool process stops mid-task. The README alone does not prove that every boundary is enforced.
- `body`: This page links only to Freya-v1. TODO-VERIFY: establish which version includes DeepSeek, AES-256-GCM key handling, sealed backups, multi-agent workers and cost controls before attributing those details to this public repository. No private-version benchmark is presented as a v1 result.
- `body`: TODO-VERIFY: proposed next work is a repeatable task evaluation set, failure injection around cancellation, and an explicit audit of tool permissions. Confirm this reflects the current roadmap.

### Forge

- `role`: Independent project: workflow design, AI-assisted implementation and review. TODO-VERIFY: confirm ownership wording and current release status.
- `decisions[0].tradeoff`: TODO-VERIFY: confirm the mode's behavior and design rationale. Isolation avoids competing edits in one checkout, but integration and worktree cleanup still need review.
- `decisions[1].tradeoff`: TODO-VERIFY: confirm recovery guarantees. A persistent engine introduces ownership, reconnection and orphan-process concerns.
- `decisions[2].tradeoff`: TODO-VERIFY: verify the precise threat model. Explicit control adds user steps, while local credentials require lifecycle management.
- `decisions[3].tradeoff`: TODO-VERIFY: explain the implemented handoff and its limits. More reviewers add time and do not guarantee correctness.
- `results[1].value`: TODO: add a reproducible session-recovery demonstration and measured coordination overhead. No adoption or productivity figures are claimed.
- `body`: TODO-VERIFY: document one tested reconnect sequence and how a stopped or crashed agent's work is recovered.
- `body`: TODO-VERIFY: proposed next work is a documented recovery matrix, reproducible multi-agent integration examples and tighter visibility into session ownership. Confirm against the repository's current roadmap.

### HireAI

- `role`: Independent project: application architecture, Laravel development and AI-assisted implementation. TODO-VERIFY: approve ownership wording and public release scope.
- `decisions[0].tradeoff`: TODO-VERIFY: confirm the original rationale. This keeps product rules close to the backend, but couples interactive flows to server state.
- `decisions[1].tradeoff`: TODO-VERIFY: document validation and fallback coverage. A fallback can preserve a usable flow, but cannot guarantee semantic accuracy.
- `decisions[2].tradeoff`: TODO-VERIFY: identify the exact flows using each mode. Streaming and queued paths require separate failure handling; automatic fallback between them is not claimed.
- `results[1].value`: TODO: add extraction accuracy, generation latency, cost and task completion measurements using a documented evaluation set.
- `body`: TODO-VERIFY: explain the validation rules and one implemented provider failure path. No claim is made about guaranteed ATS results, employer-side recruitment or automatic streaming-to-queue fallback.
- `body`: TODO-VERIFY: proposed next work is an evaluation set for résumé extraction, measured generation costs and documented recovery behavior for failed jobs. Confirm the current implementation and roadmap.

## Repository presentation suggestions

Suggested description: “PHP/Laravel backend and applied AI portfolio with editable engineering case studies, Inertia SSR and Filament administration.”

Suggested topics: `portfolio`, `laravel`, `php`, `inertiajs`, `react`, `ai-agents`, `llm`, `filament`, `server-side-rendering`.

These are suggestions only; repository settings were not changed. Keep the pull request in draft until factual review, CV, hosting prerequisites and the outstanding LCP target are resolved. Do not merge or deploy automatically.

## Delivery

[Draft pull request #1](https://github.com/aslamwebz/Portfolio-26/pull/1) targets main from rework/portfolio. Only the review branch was pushed; main and production remain unchanged. Outstanding LCP, factual, CV and hosting checks remain release blockers.
