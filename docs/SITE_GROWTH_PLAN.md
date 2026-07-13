# Baijiu365 Site Growth Plan

Last updated: 2026-07-13

This is the working plan for Baijiu365. Update it whenever positioning, content scope, SEO/indexing strategy, AdSense readiness, design direction, or publishing priorities change.

## Current Objective

Move Baijiu365 from a thin MVP into a credible English-language baijiu authority site that can be submitted for Google indexing and later Google AdSense review.

The site should not be treated as ready for aggressive indexing or advertising approval until it has enough original content depth, useful navigation, clear editorial standards, and a more polished reading experience.

## Current Gap Assessment

### Product and Trust Gaps

- The site explains baijiu basics, but still feels like an early content shell.
- It lacks real bottle photos, label examples, tasting references, source notes, and contributor/editorial credibility signals.
- About/editorial standards are present but too short for a site that wants to build trust in alcohol guidance.
- Commercial/affiliate disclosure is not yet needed, but the policy should be prepared before monetization.

### Content Gaps

- Several pages are useful outlines rather than deep guides.
- Core articles need more original structure: decision tables, tasting language, label-reading examples, risks, food/use-case scenarios, FAQs, and next-step links.
- Missing high-value articles for SEO and usefulness:
  - What Does Baijiu Taste Like?
  - How to Read a Baijiu Label
  - Baijiu Gift Guide
  - Baijiu Cocktails Guide
  - Baijiu and Chinese Food Pairing
  - Wuliangye, Fenjiu, Luzhou Laojiao, Yanghe beginner guides
  - How to Buy Baijiu in the US/UK/EU/Australia

### UI and Design Gaps

- Homepage still relies on CSS-drawn decorative objects and lacks real visual authority.
- Article pages are readable but plain; they need better hierarchy, summary boxes, related links, and richer tables/cards.
- The design needs to feel like a serious drinks field guide, not a placeholder Astro demo.
- Mobile navigation and homepage scanning should be improved as content grows.

### SEO and Indexing Gaps

- Sitemap and robots exist.
- Canonical domain is now `https://baijiu365.com`.
- Need RSS, `llms.txt`, stronger internal links, better structured data, and a content quality check script.
- Old `/baijiu-101/` route is retained as a lightweight noindex compatibility page while the main guide uses `/baijiu-basics/`.

### Google AdSense Readiness Gaps

Before applying for AdSense, the site should have:

- At least 20-30 substantial original pages/posts, not thin AI-like pages.
- Clear About, Contact, Privacy, Terms, Editorial Policy, and disclosure pages.
- No broken links or duplicate placeholder pages.
- A polished homepage and article reading experience.
- Enough navigation for users to discover content without search.
- No misleading authority claims or unverifiable tasting claims.

## 2026-07-13 Working Decisions

- Treat Baijiu365 as not yet ready for AdSense.
- Prioritize quality and trust before monetization.
- Replace front-facing `Baijiu 101` language with `Baijiu Basics`; keep `/baijiu-101/` only as an old-link compatibility page.
- Add the same operational discipline used for ChinaTripBox: every meaningful change must update this plan or the development log.
- Add RSS, `llms.txt`, and local content quality checks before pushing more content.
- Improve homepage and layout design before adding a large number of new pages.

## Near-Term Implementation Plan

### Phase 1: Technical Indexing Foundation

- Add `/rss.xml`.
- Add `/llms.txt`.
- Add RSS discovery metadata.
- Add local content quality check script.
- Verify sitemap includes all public routes.
- Keep `/baijiu-101/` as old-link compatibility; use `/baijiu-basics/` as the main route.

### Phase 2: UI and Trust Upgrade

- Redesign homepage into a serious field-guide entry point with clear sections:
  - Start here
  - Flavor and aroma map
  - Buying risk center
  - Brand guides
  - Drinking and food context
  - Editorial standards
- Improve article template styling:
  - Summary/decision boxes
  - Related guide links
  - Better tables
  - Clearer FAQ blocks
  - More restrained, polished visual language
- Add policy pages needed for future monetization:
  - Contact
  - Privacy
  - Terms
  - Editorial Policy
  - Disclosure

### Phase 3: Content Depth

Upgrade existing core pages first:

- `/baijiu-basics/`
- `/types-of-baijiu/`
- `/best-baijiu-for-beginners/`
- `/how-to-buy-baijiu-outside-china/`
- `/how-to-spot-fake-maotai/`
- `/brands/maotai/`

Then add new guides in a steady rhythm, not as bulk thin pages.

### Phase 4: Visual Assets and Evidence

- Add real or properly licensed bottle/table/restaurant imagery.
- Add label-reading examples where possible.
- Add source notes or limitations where claims require verification.
- Collect domestic market examples through WORKBUDDY before making strong product claims.

## Content Quality Standard

Every major guide should include:

- Clear answer or judgment near the top.
- Real use cases: buying, gifting, banquet, restaurant, cocktail, overseas retail.
- Aroma/flavor language with comparisons to familiar spirits.
- Risk warnings where relevant.
- At least 3 useful internal links.
- FAQ section when search intent is clear.
- No generic filler, fake authority, or unverifiable tasting claims.

## Next Work Queue

1. Replace placeholder editorial profiles with verified real editor identities and social/profile links.
2. Reduce first content quality report warnings with internal links, decision boxes, and deeper policy/about pages.
3. Continue improving shared article template visual quality.
4. Expand `About` into stronger editorial policy/disclosure language and keep policy pages current.
5. Add real product examples, photos, or label screenshots for buying-risk pages.
6. Add the next two high-value guides:
   - `What Does Baijiu Taste Like?`
   - `How to Read a Baijiu Label`

## Verification Log

- 2026-07-12: Astro build passed after first-pass content upgrade; 12 pages generated.
- 2026-07-13: Route cleanup from `/baijiu-101/` to `/baijiu-basics/` completed locally; old route is noindex with canonical to `/baijiu-basics/`.
- 2026-07-13: `npm.cmd run build` passed after RSS, `llms.txt`, homepage UI, policy pages, and content quality script were added; 18 pages generated.
- 2026-07-13: Rebuild-mode audit fixes completed locally: Article JSON-LD expanded, `404.html` generated, footer trust links added, `/affiliate-disclosure/` and editorial team pages added, and `/llms.txt` changed to H1 plus Markdown links. `npm.cmd run build` passed with 22 pages.
