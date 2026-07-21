# Search Console Setup

Use this after SEO Foundation V1 is deployed.

## Property

Recommended property type:

- Domain property: `budapestpropertyservices.hu`

If DNS verification is already handled outside the repository, do not change DNS from this project.

## Sitemap Submission

Submit:

```text
https://budapestpropertyservices.hu/sitemap.xml
```

The sitemap should contain exactly the English and Hungarian canonical URLs documented in `docs/SEO_FOUNDATION_V1.md`.

## Inspection Checklist

Inspect these representative URLs first:

- `https://budapestpropertyservices.hu/`
- `https://budapestpropertyservices.hu/hu/`
- `https://budapestpropertyservices.hu/property-maintenance-budapest.html`
- `https://budapestpropertyservices.hu/hu/ingatlan-karbantartas-budapest.html`

For each inspected URL, confirm:

- URL is indexable.
- Canonical is self-referencing.
- `hreflang` alternates are detected.
- Rendered page is not blocked.
- Page resources load successfully.
- Google can access `script.js`, `script-core.js`, CSS and images.

## Post-Deployment Monitoring

Check after Google recrawls:

- Coverage for all 16 submitted URLs.
- Duplicate without user-selected canonical warnings.
- Alternate page with proper canonical behavior.
- Page indexing status for `/hu/` URLs.
- Enhancement reports for structured data.

Do not add fake reviews, ratings, addresses, opening hours or certifications to structured data unless they are verified business facts.
