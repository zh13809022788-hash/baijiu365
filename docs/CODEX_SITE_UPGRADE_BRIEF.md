# Codex Brief: Baijiu365 Comprehensive Upgrade

Owner model: Hermes coordinates, Codex implements, Hermes verifies/deploys.

Goal: Upgrade Baijiu365 from MVP into a credible independent baijiu authority site with stronger structure, content depth, visual polish, internal linking, cross-link strategy with ChinaTripBox, and Google indexing readiness.

Non-negotiables:
- Preserve working Astro static build.
- Do not ask the user routine implementation questions; make conservative product/content decisions and document them.
- Do not introduce fake authority, unverifiable tasting claims, or generic AI travel/alcohol filler.
- Prefer useful editorial judgment: buying risks, aroma-type distinctions, food/drinking situations, beginner mistakes, glossary clarity, and transparent limitations.
- Keep implementation scoped and buildable in this repo.
- Update docs/DEVELOPMENT_LOG.md, docs/ROADMAP.md, and docs/TASK_BOARD.md with decisions and remaining work.

Current context:
- Project path: D:\白酒独立站
- Domain: https://baijiu365.com
- Existing pages: homepage, baijiu 101, aroma types, beginner buying, how to drink, baijiu vs vodka, Maotai guide, glossary, about.
- There may be uncommitted Hermes edits adding light ChinaTripBox links; review them, keep/rewrite only if editorially natural.
- ChinaTripBox project path: D:\独立站\china-travel-kit, domain https://www.chinatripbox.com.

Prioritized work:
1. IA/navigation: make site feel like a serious guide, not a thin MVP. Add clearer page hierarchy, topical pathways, and next-step links.
2. Homepage: strengthen first viewport, positioning, guide pathways, credibility signals, and featured content sections.
3. Content depth: expand core pages with practical sections, comparison tables or structured lists where useful, FAQ blocks where appropriate, and stronger internal links.
4. SEO/indexing: improve canonical domain consistency, metadata, JSON-LD where useful, sitemap/robots correctness, href/canonical sanity, and crawlable internal links.
5. Cross-linking: add only a few contextual links to ChinaTripBox where travel context genuinely helps; avoid footer keyword link schemes.
6. Design polish: improve typography, spacing, article readability, guide cards, calls to action, and mobile layout without turning it into a decorative landing page.

Verification:
- npm run build must pass.
- Inspect generated routes/sitemap for expected URLs.
- Provide a concise change report listing files changed, major decisions, and any follow-up items Hermes should verify/deploy.
