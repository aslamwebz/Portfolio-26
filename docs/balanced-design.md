# Balanced portfolio implementation plan

> For agentic workers: implement this tightly coupled visual task inline; retain the existing `rework/portfolio` branch and run the complete verification suite before committing. The user approved “Balanced blend (recommended)” on 22 October 2026.

**Goal:** Combine the earlier portfolio's visual personality with the new portfolio's clear AI/backend positioning and source-backed case studies.

**Architecture:** Retain controllers, editable content, safe media resolution, SSR, security headers and existing public routes. Change shared presentation tokens and focused React/CSS components; introduce one presentational hero diagram. Reuse real stored project images, with the existing safe image resolver and diagram fallbacks.

**Tech stack:** Laravel 13, Inertia 3, React 19.3, TypeScript 6, Tailwind 4; no additional dependencies.

## Global constraints

- Work only on `rework/portfolio`; no merge or deployment.
- Keep PHP `~8.4.27 || ^8.5.12` and Composer platform PHP `8.4.27`.
- Preserve `.env`, existing migrations, database rows, Filament and explicit owner authorization.
- Keep all factual placeholders and version boundaries. No invented counters, outcomes, production claims, sample code presented as project evidence, or personal TypeScript proficiency claim.
- Preserve light mode, keyboard focus, reduced motion, one h1, native navigation and server sanitization.
- Run all eight original checks. Do not repeat the completed one-time dependency deletion/reinstall.

## Approved visual specification

- Earlier design: large hero typography, violet lighting, rounded controls, editor-window framing and richer cards.
- New design: precise headline, accountable summary, system diagrams, flagship pages, compact other work, and scannable experience.
- Dark tokens: background `#0b0c12`, surface `#13141e`, foreground `#f3f2f8`, muted `#b6b3c6`, border `#303044`, accent `#b9a4ff`. Light tokens use pale neutral surfaces and a darker violet accent `#6340ad`.
- Inter/system sans for readable text; heavier display weights and restrained mono labels. Use one violet accent family across public pages, favicon and social cards.
- Hero: readable two-column composition; on the right, a static editor-style window explains intent, application core, model, memory and scoped tools. Its caption identifies it as an engineering sketch, not a live application or benchmark.
- Mobile: content first; the hero diagram is omitted on narrow screens. No decorative animation blocks initial text.
- Case cards: preserve the architecture sketches; use an existing valid local screenshot when available, with measured dimensions and lazy loading. Missing or unsafe images fall back to diagrams.
- Experience: retain date/content alignment, add restrained timeline markers and soft card surfaces. Surface three recorded certificates above the full background disclosure without implying current certification status.
- Keep effects static, apart from subtle hover transitions and existing reduced-motion-aware reveals. No particles, repeating typing, animation framework or fake statistics.

## Task: deliver the coherent blended presentation

- [x] Extend `tests/Feature/PublicPublicationTest.php` with stored screenshot metadata and missing/unsafe image coverage. Run the focused tests before implementation and confirm the missing image props fail.
- [x] Add `image` to `Project::SUMMARY_FIELDS`; map it through `PublicPortfolio::mediaImage()` as `{url, width, height} | null`. Extend `ProjectSummary` with the same nullable shape. Keep article bodies out of summaries.
- [x] Modify `hero.tsx` and add `system-panel.tsx`; preserve the exact substantive headline and existing contact/availability data. Add focused `hero-panel.css`; update the existing hero CSS and public color tokens.
- [x] Update the shared header, case cards, compact other-work cards, timeline, certificate previews and stack surfaces. Keep components and CSS near/below 300 lines by responsibility.
- [x] Align the favicon and generated social-card palette. Preserve publication guards and social-image dimensions.
- [x] Run focused image tests, all eight checks, and dependency audits. Review browser console for hydration/CSP errors after reload and client navigation.
- [x] Inspect dark/light layouts and keyboard operation; capture 360/768/1280/1920 screenshots and verify no horizontal overflow. Measure actual mobile performance, LCP, CLS and gzip JavaScript; report plain PHP and production-transport conditions separately.
- [x] Review the final source diff and factual placeholders; commit the verified visual step. Complete the report and README with the new screenshots and actual measurements.
- [x] Push the review branch and open the draft PR; never merge or deploy.

## Acceptance

The page reads as one visual identity, communicates backend/AI work immediately, and leads directly to verifiable case studies and contact actions. The legacy visual treatment returns through composition and surfaces, while all completed security, data-preservation and publication work remains intact.

## Verification result

The approved visual blend is implemented and inspected in both themes. All eight source checks pass. Responsive evidence and actual performance results are in [rework-report.md](rework-report.md); mobile home and Freya LCP still exceed the strict two-second target. This remains a review branch with visible factual placeholders.
