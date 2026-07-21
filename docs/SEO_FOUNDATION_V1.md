# SEO Foundation V1

Production domain: `https://budapestpropertyservices.hu`

Baseline protected by backup branch:

- `backup-before-seo-foundation-v1`
- Production commit before this work: `f0b4a50044edf83c42b51d097b27ac69f83c8a22`

## What Changed

- Added crawlable English and Hungarian URL equivalents for all indexable pages.
- Kept German, Ukrainian and Chinese as client-side convenience languages only.
- Added self canonicals, reciprocal `hreflang="en"` / `hreflang="hu"` and `x-default` on each EN/HU page.
- Removed meta keywords from generated page heads.
- Added normalized JSON-LD:
  - Homepage: `LocalBusiness` and `WebSite`
  - Service pages: `LocalBusiness`, `Service`, `BreadcrumbList`
  - Service pages with visible FAQs: `FAQPage`
- Updated sitemap to the full EN/HU canonical set.
- Preserved versioned CSS/JS asset loading with build ID `seo-foundation-v1-2026-07-21-02`.
- Added `scripts/seo-audit.mjs` for repeatable validation.

## Crawlable URL Set

English:

- `https://budapestpropertyservices.hu/`
- `https://budapestpropertyservices.hu/property-maintenance-budapest.html`
- `https://budapestpropertyservices.hu/handyman-services-budapest.html`
- `https://budapestpropertyservices.hu/painting-wall-repairs-budapest.html`
- `https://budapestpropertyservices.hu/garden-maintenance-budapest.html`
- `https://budapestpropertyservices.hu/cleaning-services-budapest.html`
- `https://budapestpropertyservices.hu/airbnb-property-maintenance-budapest.html`
- `https://budapestpropertyservices.hu/property-management-for-foreign-owners-budapest.html`

Hungarian:

- `https://budapestpropertyservices.hu/hu/`
- `https://budapestpropertyservices.hu/hu/ingatlan-karbantartas-budapest.html`
- `https://budapestpropertyservices.hu/hu/ezermester-budapest.html`
- `https://budapestpropertyservices.hu/hu/szobafestes-faljavitas-budapest.html`
- `https://budapestpropertyservices.hu/hu/kertfenntartas-budapest.html`
- `https://budapestpropertyservices.hu/hu/takaritas-budapest.html`
- `https://budapestpropertyservices.hu/hu/airbnb-karbantartas-budapest.html`
- `https://budapestpropertyservices.hu/hu/ingatlankezeles-kulfoldi-tulajdonosoknak-budapest.html`

## Language Behavior

- Route language wins over stored language on initial load.
- English and Hungarian language selections navigate to the equivalent static URL.
- German, Ukrainian and Chinese remain client-side language modes and are not included in sitemap or `hreflang`.
- No browser-language redirect is used.

## Validation

Run:

```bash
node --check script.js
node --check script-core.js
node scripts/seo-audit.mjs
git diff --check
```

The audit validates metadata, canonicals, hreflang, JSON-LD, internal links, image alt attributes, sitemap consistency and robots sitemap visibility.
