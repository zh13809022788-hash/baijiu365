# Development Log

This file is the synchronized development archive for collaborators and future review.

## Current Direction

Project: Baijiu365.

Primary domain: baijiu365.com.

The project is being reduced from the original broad PDF plan into a focused Astro static content site for overseas readers who need practical, credible guidance on Chinese baijiu.

## Decisions

### 2026-07-12

- First-pass upgrade kept the existing uncommitted domain/brand cleanup from Hermes where it improved consistency: Baijiu365 publisher name, canonical domain, CNAME, and contextual ChinaTripBox references.
- Rewrote the navigation around reader decisions rather than a thin page list: basics, aroma types, beginner buying, overseas buying, fake Maotai risk, Maotai, glossary, about.
- Added three new crawlable guide pages: overseas baijiu buying, fake Maotai risk checks, and a simple baijiu flavor wheel.
- Expanded core articles with practical tables, FAQ/next-step sections, and internal links so readers can move through the guide without relying on the homepage.
- Kept ChinaTripBox links sparse and contextual: broader China travel planning, restaurant etiquette context, and travel logistics only where those topics naturally support baijiu readers.
- Added Open Graph/Twitter summary metadata in the base layout while preserving Astro static output and sitemap generation.
- Keep the original PDF and extracted text as source references.
- Do not start with Headless WordPress. Use Astro + Markdown/static pages first.
- Do not launch 10 languages at once. Start with English MVP; add Chinese later if useful.
- Avoid premature association/authority branding such as GBAS until there is real evidence, samples, contributors, or review process.
- Prioritize useful pages that can rank and help readers: baijiu basics, aroma types, beginner buying, drinking method, vodka comparison, Maotai guide, glossary, about/editorial standards.
- Use this file as the running development archive whenever plans, tradeoffs, or implementation direction change.

### 2026-07-13

- Replaced homepage-facing "Baijiu 101" wording with clearer "Start Here" / "Basics" language to reduce template feel for readers.
- Verified the Astro static build after the copy adjustment: 12 pages generated plus sitemap.

## MVP Scope

- Homepage
- Baijiu 101
- Types of Baijiu
- Best Baijiu for Beginners
- How to Buy Baijiu Outside China
- How to Spot Fake Maotai
- Baijiu Flavor Wheel
- How to Drink Baijiu
- Baijiu vs Vodka
- Maotai brand guide
- Glossary
- About

## Technical Stack

- Astro
- Static pages
- Cloudflare Pages-ready build output
- Sitemap integration
- No database, login, comments, or WordPress in MVP

## Documentation Added

- `docs/PROJECT_BRIEF.md`: positioning, audience, collaboration model.
- `docs/ROADMAP.md`: sprint plan and backlog.
- `docs/CONTENT_STANDARD.md`: editorial quality bar and anti-generic-AI rules.
- `docs/TASK_BOARD.md`: current implementation tasks and WORKBUDDY input requests.

## Implementation Update

- 2026-07-12 first-pass upgrade generated 12 static pages plus sitemap and kept the site build-ready, but no deployment was performed.
- Primary domain set to `baijiu365.com` in Astro config and robots sitemap.
- MVP static pages created: homepage, Baijiu 101, aroma types, beginner guide, drinking guide, baijiu vs vodka, Maotai guide, glossary, and about page.
- npm install initially stalled on the default registry, then succeeded after switching this project environment to `https://registry.npmmirror.com`.
- `npm run build` passed on 2026-07-13 and generated 12 static pages plus sitemap.

## Open Questions

- Whether Baijiu365 should remain the permanent public brand or later gain a companion editorial subtitle.
- Whether Chinese pages should be added immediately or after English pages are indexed.
- Whether real tasting notes, sample photos, or supplier data are available for future credibility upgrades.
