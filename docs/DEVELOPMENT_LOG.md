# Development Log

This file is the synchronized development archive for collaborators and future review.

## Current Direction

Project: Baijiu365 / Inside Baijiu MVP.

Primary domain: baijiu365.com.

The project is being reduced from the original broad PDF plan into a focused Astro static content site for overseas readers who need practical, credible guidance on Chinese baijiu.

## Decisions

### 2026-07-12

- Keep the original PDF and extracted text as source references.
- Do not start with Headless WordPress. Use Astro + Markdown/static pages first.
- Do not launch 10 languages at once. Start with English MVP; add Chinese later if useful.
- Avoid premature association/authority branding such as GBAS until there is real evidence, samples, contributors, or review process.
- Prioritize useful pages that can rank and help readers: baijiu basics, aroma types, beginner buying, drinking method, vodka comparison, Maotai guide, glossary, about/editorial standards.
- Use this file as the running development archive whenever plans, tradeoffs, or implementation direction change.

## MVP Scope

- Homepage
- Baijiu 101
- Types of Baijiu
- Best Baijiu for Beginners
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

- Primary domain set to `baijiu365.com` in Astro config and robots sitemap.
- MVP static pages created: homepage, Baijiu 101, aroma types, beginner guide, drinking guide, baijiu vs vodka, Maotai guide, glossary, and about page.
- npm install initially stalled on the default registry, then succeeded after switching this project environment to `https://registry.npmmirror.com`.
- `npm run build` passed and generated 9 static pages plus sitemap.

## Open Questions

- Final public brand/domain: Inside Baijiu, Baijiu Field Guide, or another name.
- Whether Chinese pages should be added immediately or after English pages are indexed.
- Whether real tasting notes, sample photos, or supplier data are available for future credibility upgrades.
