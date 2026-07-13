# Task Board

## In Progress

- Website rebuild mode: deepen core articles and replace placeholder trust profiles with verified public editor identities before submission.

## Next

- Verify live deployment/domain after Hermes deploys.
- Submit sitemap in Google Search Console after deployment.
- Expand About, Contact, Privacy, Terms, Editorial Policy, Affiliate Disclosure, and Editorial Team from starter pages into fuller final trust pages before AdSense application.
- Replace placeholder editorial roles with approved real editor names and social profile links.
- Add real product examples, photos, or label screenshots for buying-risk pages.
- Expand Maotai and beginner pages with sourced brand/channel facts.
- Add FAQ blocks to `types-of-baijiu` and `best-baijiu-for-beginners`.
- Add internal links and decision boxes where `npm run check:content` reports warnings.

## Sprint 1 Development Tasks

### Foundation

- Create/confirm `package.json`, `astro.config.mjs`, `tsconfig.json`, `.gitignore`.
- Create base layout and global styles.
- Create reusable guide card component.
- Create homepage.
- Create guide pages.
- Create about/editorial standards page.
- Create glossary page.
- Add robots and sitemap support.

### Content Pages

- `/baijiu-basics/`
- `/types-of-baijiu/`
- `/best-baijiu-for-beginners/`
- `/how-to-buy-baijiu-outside-china/`
- `/how-to-spot-fake-maotai/`
- `/baijiu-flavor-wheel/`
- `/how-to-drink-baijiu/`
- `/baijiu-vs-vodka/`
- `/brands/maotai/`
- `/glossary/`
- `/about/`

### Verification

- Run `npm install` if needed.
- Run `npm run build`.
- Inspect generated sitemap and routes.
- Record issues and fixes in `docs/DEVELOPMENT_LOG.md`.

## Completed On 2026-07-12

- Reviewed existing uncommitted Hermes edits and kept the useful Baijiu365 domain/brand cleanup.
- Added new guide pages for overseas buying, fake Maotai risk, and tasting vocabulary.
- Improved homepage pathways, footer links, article tables, next-step links, and SEO metadata.
- Updated development documentation for the first-pass upgrade.
- Verified `npm run build` after the first-pass upgrade; Astro generated 12 static routes plus sitemap.

## Completed On 2026-07-13

- Finished `/baijiu-101/` to `/baijiu-basics/` cleanup with a noindex compatibility page and canonical support.
- Added `/rss.xml`, `/llms.txt`, RSS discovery metadata, and `scripts/check-content-quality.mjs`.
- Upgraded homepage scanning with field-guide imagery, flavor map links, buying-risk links, and trust signals.
- Added starter Contact, Privacy, Terms, Editorial Policy, and Disclosure pages.
- Verified `npm.cmd run build`; Astro generated 18 static routes plus sitemap.
- Completed rebuild-mode P0 fixes: Article JSON-LD template, generated logo asset, canonical brand scan over public templates, explicit `404.html`, and Markdown-compliant `llms.txt`.
- Completed starter P1 trust work: `/editorial-team/`, `/author/editorial-team/`, `/affiliate-disclosure/`, and footer trust links.

## WORKBUDDY Input Requests

- Collect real questions Chinese consumers ask about baijiu selection.
- Collect overseas buyer pain points: where to buy, how to avoid fake bottles, what to bring as gifts.
- Collect basic brand facts for Maotai, Wuliangye, Luzhou Laojiao, Fenjiu, Yanghe.
- Collect examples of common misleading sales phrases around vintage, limited editions, OEM/development bottles, and gift packaging.
