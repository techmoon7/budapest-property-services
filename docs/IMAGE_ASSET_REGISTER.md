# Image Asset Register

Phase: Image Quality & Before/After Recovery V1  
Build ID: `compare-slider-v1-2026-08-04-01`
Date: 2026-08-04  

This register documents the image assets replaced or edited during this phase. The website continues to state that images are illustrative examples of typical work processes and expected results, not completed client projects.

## Source Notes

- No new third-party stock download was added in this phase.
- Reworked assets were derived from existing repository images and saved in place to preserve page layout, paths, alt text, and deployment behaviour.
- The original source/licence metadata for the pre-existing repository images was not present in the repository at the start of this phase.
- AI generation was not used in this phase. Before-state recovery images were created with local procedural image editing from matching after-state assets, then manually reviewed.
- New files were saved as optimized progressive JPGs to preserve existing browser compatibility and avoid broad markup changes.
- 2026-08-05 follow-up: the generated garden before image was removed because it did not meet the required natural visual quality. The garden/outdoor pair now uses the existing real-looking `assets/budapest-courtyard-before-entrance.jpg` image as the before state.

## Replaced Or Edited Assets

| Local file | Usage | Source basis | Licence / usage basis | AI-assisted? | Edit summary | Old size | New size |
|---|---|---|---|---|---|---:|---:|
| `assets/budapest-painting-before-matched.jpg` | Homepage and modal painting before image | Existing repository asset `assets/budapest-apartment-wall-refresh.jpg` | Existing project asset; original source not documented | No | Replaced the artificial wall-mark edit with a real renovation-room photo showing patching and preparation. | 276,854 B | 197,396 B |
| `assets/budapest-finished-room-1.jpg` | Homepage hero, painting after image, gallery | Existing repository asset | Existing project asset; original source not documented | No | Mild contrast, colour and sharpness optimization for clearer finished state. | 208,500 B | 280,478 B |
| `assets/budapest-drywall-before-matched.jpg` | Homepage and modal drywall before image | Existing repository asset `assets/painting-wall-repairs-spackle-smoothing.jpg` | Existing project asset; original source not documented | No | Replaced the artificial wall-mark edit with a real close-up wall repair and smoothing photo. | 193,581 B | 153,151 B |
| `assets/budapest-finished-room-2.jpg` | Drywall after image and gallery | Existing repository asset | Existing project asset; original source not documented | No | Mild contrast, colour and sharpness optimization for clearer finished state. | 147,763 B | 197,962 B |
| `assets/budapest-courtyard-before-entrance.jpg` | Homepage and modal garden before image | Existing repository asset | Existing project asset; original source not documented | No | Replaced the artificial garden before image with a more credible overgrown Budapest courtyard image. | Existing | Existing |
| `assets/budapest-courtyard-garden-1.jpg` | Garden after image, homepage service imagery, gallery | Existing repository asset | Existing project asset; original source not documented | No | Mild contrast, colour and sharpness optimization for clearer maintained-garden result. | 311,705 B | 401,576 B |
| `assets/budapest-airbnb-before-turnover-matched.jpg` | Homepage and modal Airbnb before image | Existing repository asset `assets/cleaning-services-move-out-room.jpg` | Existing project asset; original source not documented | No | Replaced the too-subtle same-room edit with a real empty move-out room photo for a clearer turnover story. | 256,529 B | 130,087 B |
| `assets/budapest-airbnb-living-room.jpg` | Airbnb after image, foreign-owner support imagery, gallery | Existing repository asset | Existing project asset; original source not documented | No | Mild contrast, colour and sharpness optimization for clearer guest-ready state. | 194,985 B | 265,440 B |
| `assets/budapest-office-before-touchup-matched.jpg` | Homepage and modal office before image | Existing repository asset `assets/budapest-office-process-wall-touchup.jpg` | Existing project asset; original source not documented | No | Replaced the artificial scuff edit with a real office wall touch-up process photo. | 244,799 B | 178,938 B |
| `assets/budapest-office-finished-1.jpg` | Office after image, foreign-owner support imagery, gallery | Existing repository asset | Existing project asset; original source not documented | No | Mild contrast, colour and sharpness optimization for clearer finished office state. | 173,263 B | 237,322 B |
| `assets/budapest-handyman-before-matched.jpg` | Homepage and modal handyman before image | Existing repository asset `assets/handyman-services-hero-drilling.jpg` | Existing project asset; original source not documented | No | Replaced the artificial bedroom defect edit with a real wall drilling/fixing photo. | 221,900 B | 266,064 B |
| `assets/budapest-airbnb-bedroom.jpg` | Handyman after image, Airbnb gallery | Existing repository asset | Existing project asset; original source not documented | No | Mild contrast, colour and sharpness optimization for clearer handover-ready state. | 169,410 B | 228,000 B |
| `assets/garden-maintenance-hero-garden.jpg` | Garden Maintenance EN/HU hero and social image | Existing repository asset derived from `assets/budapest-courtyard-garden-3.jpg` | Existing project asset; original source not documented | No | Replaced foreign-looking modern house with Budapest-style apartment courtyard greenery. | 547,883 B | 504,689 B |
| `assets/property-maintenance-drywall-sanding.jpg` | Homepage drywall service card and service-page support imagery | Existing repository asset | Existing project asset; original source not documented | No | Optimized contrast, colour and sharpness for local homepage usage. | 129,734 B | 166,605 B |
| `assets/handyman-services-wall-fixtures.jpg` | Homepage handyman service card and handyman service imagery | Existing repository asset | Existing project asset; original source not documented | No | Optimized contrast, colour and sharpness for local homepage usage. | 87,245 B | 119,911 B |

## Before / After Pair Register

| Pair | Before asset | After asset | Recovery decision |
|---|---|---|---|
| Painting / wall repair | `assets/budapest-painting-before-matched.jpg` | `assets/budapest-finished-room-1.jpg` | Real renovation-room before photo with patched walls; after remains a clean Budapest apartment-style finish. |
| Drywall / ceiling | `assets/budapest-drywall-before-matched.jpg` | `assets/budapest-finished-room-2.jpg` | Real wall smoothing before detail; after shows a clean paint-ready room. |
| Garden / outdoor | `assets/budapest-courtyard-before-entrance.jpg` | `assets/budapest-courtyard-garden-1.jpg` | Replaced the artificial garden before image with a more credible overgrown Budapest courtyard before image. |
| Airbnb / tenant turnover | `assets/budapest-airbnb-before-turnover-matched.jpg` | `assets/budapest-airbnb-living-room.jpg` | Real empty move-out room before; after shows a furnished, guest-ready apartment interior. |
| Office touch-up | `assets/budapest-office-before-touchup-matched.jpg` | `assets/budapest-office-finished-1.jpg` | Real wall touch-up process before; after shows a tidy office/representative room. |
| Handyman / small fixes | `assets/budapest-handyman-before-matched.jpg` | `assets/budapest-airbnb-bedroom.jpg` | Real wall drilling/fixing before; after shows a tidy prepared apartment room. |

## 2026-08-08 Before / After Visual Recovery V2

Baseline commit: `4df087a8641ff02b8f8e6d84b09d483536fe99de`

Backup branch: `backup-before-before-after-recovery-v2`

This pass replaced weak or nearly identical before states with stronger same-scene illustrative edits. No new third-party stock downloads were added. The edited before images are derived from the corresponding existing after image so that room geometry, camera position, windows, doors, radiators, flooring and fixed furniture stay aligned. The images remain illustrative examples only and are not presented as completed client projects.

| Local file | Component/page | Source platform / source URL / creator | Usage basis | AI-assisted? | What changed | Final dimensions | Final file size |
|---|---|---|---|---|---|---:|---:|
| `assets/budapest-painting-before-matched.jpg` | Homepage EN/HU transformation card, work example card, project modal and full comparison | Existing repository asset `assets/budapest-finished-room-1.jpg`; original source URL and creator not present in repository | Existing project asset, edited locally for same-scene illustrative comparison | No | Added visible wall cracks, uneven old paint, repair patches, protective floor/furniture covering and masking tape while preserving the same Budapest apartment room geometry. | 1600x1067 | 269,657 B |
| `assets/budapest-drywall-before-matched.jpg` | Homepage EN/HU work example card, project modal and full comparison | Existing repository asset `assets/budapest-finished-room-2.jpg`; original source URL and creator not present in repository | Existing project asset, edited locally for same-scene illustrative comparison | No | Added unfinished drywall seams, repair patches, cracks and protective covering while preserving the same room, window, radiator and floor alignment. | 1600x1067 | 198,051 B |
| `assets/budapest-airbnb-before-turnover-matched.jpg` | Homepage EN/HU transformation card, situation card, work example card, project modal and full comparison | Existing repository asset `assets/budapest-airbnb-living-room.jpg`; original source URL and creator not present in repository | Existing project asset, edited locally for same-scene illustrative comparison | No | Added guest-left soft furnishings, used cups, a small bin and wall marks while preserving the same living room composition. | 1600x1067 | 249,191 B |
| `assets/budapest-office-before-touchup-matched.jpg` | Homepage EN/HU situation card, work example card, project modal and full comparison | Existing repository asset `assets/budapest-office-finished-1.jpg`; original source URL and creator not present in repository | Existing project asset, edited locally for same-scene illustrative comparison | No | Added central wall marks, desk/table clutter, papers and a less visitor-ready office impression while preserving the same office geometry. | 1600x1067 | 223,903 B |
| `assets/budapest-handyman-before-matched.jpg` | Homepage EN/HU situation card, work example card, project modal and full comparison | Existing repository asset `assets/budapest-airbnb-bedroom.jpg`; original source URL and creator not present in repository | Existing project asset, edited locally for same-scene illustrative comparison | No | Added a loose curtain rail, mounting holes, small wall marks and a less prepared handover state while preserving the same bedroom composition. | 1600x1067 | 213,252 B |

## 2026-08-08 Pair Review

| Pair | Decision | Reason |
|---|---|---|
| Painting / wall repair | Replaced | Previous before state was too close to the after state. The new pair keeps the same room and shows visible cracks, repair preparation and protective covering. |
| Drywall / ceiling | Replaced | Previous before state did not clearly show an unfinished surface. The new pair keeps the same room and shows seams, cracks and paint-ready preparation. |
| Garden / outdoor | Retained | The pair already communicates neglected courtyard to maintained courtyard clearly, with a believable Budapest-style outdoor setting. |
| Airbnb / tenant turnover | Replaced | Previous before state was nearly identical to the after state. The new pair keeps the same living room and shows a guest-left condition before cleaning and preparation. |
| Office / representative space | Replaced | Previous before state was too subtle. The new pair keeps the same office and adds visible wall marks and untidy work surfaces. |
| Small fixes / handover | Replaced | Previous before state was too subtle. The new pair keeps the same bedroom and shows a loose fitting and small wall defects before handover. |

## 2026-10-10 – Image optimisation (no change to what the images show)

- `scripts/optimize-images.py` re-encodes every `assets/*.jpg` master to at most 1600 px on the long side (progressive, metadata-free sRGB JPG, quality 80) and writes responsive WebP variants `<name>-<width>w.webp` (480/800/1200/1600 px).
- Processed masters are recorded in `scripts/image-manifest.json` by content hash, so running the script again only touches new or replaced images. To replace an image: overwrite the JPG with the new original, run `python scripts/optimize-images.py`, and commit the JPG, the new WebP variants and the manifest.
- Pages reference the variants through `srcset`/`sizes` (sizes measured from the rendered layout at 390, 1024 and 1440 px); the JPG stays as `src` fallback, lightbox source and `og:image`.
- The deploy hash (`__ASSET_VERSION__`) now also covers `assets/*`, so replaced images bust browser caches automatically.

## 2026-10-10 – Project gallery photos hosted locally instead of hotlinked from Pexels

The project modal galleries on the home pages previously loaded 35 photos directly from the Pexels CDN (`images.pexels.com`) by numeric photo ID. The same photos (no change to what is shown) are now downloaded once, re-encoded by `scripts/optimize-images.py` and served from `assets/`, so visitors' browsers no longer contact Pexels and a removed or changed Pexels photo can no longer break a gallery. All photos are used under the [Pexels License](https://www.pexels.com/license/): free for commercial use, attribution not required, modification allowed. Downloaded and checked on 2026-10-10.

| Local file | Previously | Pexels photo | Photographer | Licence |
|---|---|---|---|---|
| `assets/budapest-gallery-painting-before-1.jpg` | hotlinked Pexels ID 12036084 | [12036084](https://www.pexels.com/photo/neglected-apartment-before-renovation-12036084/) | Faruk Tokluoğlu | Pexels License |
| `assets/budapest-gallery-painting-before-2.jpg` | hotlinked Pexels ID 804392 | [804392](https://www.pexels.com/photo/unfinished-wall-804392/) | Laurie Shaw | Pexels License |
| `assets/budapest-gallery-painting-process-1.jpg` | hotlinked Pexels ID 3616757 | [3616757](https://www.pexels.com/photo/renovating-a-room-3616757/) | La Miko | Pexels License |
| `assets/budapest-gallery-painting-process-2.jpg` | hotlinked Pexels ID 3615721 | [3615721](https://www.pexels.com/photo/room-renovation-3615721/) | La Miko | Pexels License |
| `assets/budapest-gallery-painting-process-3.jpg` | hotlinked Pexels ID 6474471 | [6474471](https://www.pexels.com/photo/man-painting-the-wall-6474471/) | Tima Miroshnichenko | Pexels License |
| `assets/budapest-gallery-painting-process-4.jpg` | hotlinked Pexels ID 6473978 | [6473978](https://www.pexels.com/photo/a-man-sanding-the-wall-6473978/) | Tima Miroshnichenko | Pexels License |
| `assets/budapest-gallery-drywall-before-1.jpg` | hotlinked Pexels ID 15798783 | [15798783](https://www.pexels.com/photo/building-during-refurbishment-15798783/) | Francesco Ungaro | Pexels License |
| `assets/budapest-gallery-drywall-before-2.jpg` | hotlinked Pexels ID 5606879 | [5606879](https://www.pexels.com/photo/room-under-constr-5606879/) | Kazi Khadem | Pexels License |
| `assets/budapest-gallery-drywall-process-1.jpg` | hotlinked Pexels ID 3990359 | [3990359](https://www.pexels.com/photo/house-renovation-3990359/) | Rene Terp | Pexels License |
| `assets/budapest-gallery-drywall-process-2.jpg` | hotlinked Pexels ID 6474313 | [6474313](https://www.pexels.com/photo/wooden-materials-in-a-room-6474313/) | Tima Miroshnichenko | Pexels License |
| `assets/budapest-gallery-drywall-process-3.jpg` | hotlinked Pexels ID 6474202 | [6474202](https://www.pexels.com/photo/a-man-in-white-shirt-painting-a-house-6474202/) | Tima Miroshnichenko | Pexels License |
| `assets/budapest-gallery-drywall-process-4.jpg` | hotlinked Pexels ID 6474343 | [6474343](https://www.pexels.com/photo/man-polishing-the-ceiling-6474343/) | Tima Miroshnichenko | Pexels License |
| `assets/budapest-gallery-drywall-process-5.jpg` | hotlinked Pexels ID 6474300 | [6474300](https://www.pexels.com/photo/man-in-black-jacket-and-black-pants-wearing-white-helmet-6474300/) | Tima Miroshnichenko | Pexels License |
| `assets/budapest-gallery-drywall-process-6.jpg` | hotlinked Pexels ID 6474129 | [6474129](https://www.pexels.com/photo/man-polishing-the-ceiling-6474129/) | Tima Miroshnichenko | Pexels License |
| `assets/budapest-gallery-drywall-after-1.jpg` | hotlinked Pexels ID 9826455 | [9826455](https://www.pexels.com/photo/an-empty-room-9826455/) | Gustavo Galeano Maz | Pexels License |
| `assets/budapest-gallery-handyman-before-1.jpg` | hotlinked Pexels ID 13909112 | [13909112](https://www.pexels.com/photo/bookshelves-on-a-wall-13909112/) | Yunus Tuğ | Pexels License |
| `assets/budapest-gallery-handyman-before-2.jpg` | hotlinked Pexels ID 13588248 | [13588248](https://www.pexels.com/photo/shelves-on-a-wall-13588248/) | Zeynep Merve Kılıç Çakır | Pexels License |
| `assets/budapest-gallery-handyman-process-1.jpg` | hotlinked Pexels ID 23224978 | [23224978](https://www.pexels.com/photo/man-putting-picture-on-wall-23224978/) | Vitaly Gariev | Pexels License |
| `assets/budapest-gallery-handyman-process-2.jpg` | hotlinked Pexels ID 4981802 | [4981802](https://www.pexels.com/photo/man-drilling-in-a-wall-in-an-apartment-4981802/) | Antoni Shkraba | Pexels License |
| `assets/budapest-gallery-handyman-after-1.jpg` | hotlinked Pexels ID 19109111 | [19109111](https://www.pexels.com/photo/shelves-on-green-wall-in-room-19109111/) | Avery Arwood | Pexels License |
| `assets/budapest-gallery-handyman-after-2.jpg` | hotlinked Pexels ID 9565966 | [9565966](https://www.pexels.com/photo/wooden-shelves-mounted-on-the-wall-9565966/) | Taryn Elliott | Pexels License |
| `assets/budapest-gallery-handyman-after-3.jpg` | hotlinked Pexels ID 5824546 | [5824546](https://www.pexels.com/photo/interior-of-dense-room-with-shelves-on-brick-wall-5824546/) | Charlotte May | Pexels License |
| `assets/budapest-gallery-handyman-after-4.jpg` | hotlinked Pexels ID 5824575 | [5824575](https://www.pexels.com/photo/bookshelves-on-brick-wall-in-room-5824575/) | Charlotte May | Pexels License |
| `assets/budapest-gallery-airbnb-before-1.jpg` | hotlinked Pexels ID 5102904 | [5102904](https://www.pexels.com/photo/a-messy-living-room-5102904/) | Angelina Lobanova | Pexels License |
| `assets/budapest-gallery-airbnb-process-1.jpg` | hotlinked Pexels ID 6195959 | [6195959](https://www.pexels.com/photo/a-woman-cleaning-the-living-room-6195959/) | Tima Miroshnichenko | Pexels License |
| `assets/budapest-gallery-airbnb-after-1.jpg` | hotlinked Pexels ID 6764827 | [6764827](https://www.pexels.com/photo/modern-living-room-in-an-apartment-6764827/) | Femke | Pexels License |
| `assets/budapest-gallery-airbnb-after-2.jpg` | hotlinked Pexels ID 8135495 | [8135495](https://www.pexels.com/photo/a-clean-bedroom-8135495/) | Max Vakhtbovych | Pexels License |
| `assets/budapest-gallery-airbnb-after-3.jpg` | hotlinked Pexels ID 19899060 | [19899060](https://www.pexels.com/photo/tables-armchair-and-couch-in-living-room-19899060/) | Lisa Anna | Pexels License |
| `assets/budapest-gallery-airbnb-after-4.jpg` | hotlinked Pexels ID 271624 | [271624](https://www.pexels.com/photo/bedroom-interior-setup-271624/) | Pixabay | Pexels License |
| `assets/budapest-gallery-office-before-1.jpg` | hotlinked Pexels ID 5483236 | [5483236](https://www.pexels.com/photo/an-empty-office-5483236/) | cottonbro studio | Pexels License |
| `assets/budapest-gallery-office-before-2.jpg` | hotlinked Pexels ID 8477444 | [8477444](https://www.pexels.com/photo/an-empty-office-8477444/) | Gustavo Galeano Maz | Pexels License |
| `assets/budapest-gallery-office-process-1.jpg` | hotlinked Pexels ID 5511098 | [5511098](https://www.pexels.com/photo/an-interior-of-an-office-5511098/) | Mike van Schoonderwalt | Pexels License |
| `assets/budapest-gallery-office-after-1.jpg` | hotlinked Pexels ID 7534216 | [7534216](https://www.pexels.com/photo/modern-interior-of-office-room-7534216/) | Max Vakhtbovych | Pexels License |
| `assets/budapest-gallery-office-after-2.jpg` | hotlinked Pexels ID 36631699 | [36631699](https://www.pexels.com/photo/spacious-modern-office-interior-with-open-cubicles-36631699/) | DOAN THANH BINH | Pexels License |
| `assets/budapest-gallery-office-after-3.jpg` | hotlinked Pexels ID 1181406 | [1181406](https://www.pexels.com/photo/group-of-people-on-a-conference-room-1181406/) | Christina Morillo | Pexels License |
