# Budapest Property Services - media relevance audit

Audit date: 2026-06-11

## Scope

The full customer-facing website was reviewed on desktop and at a 390 x 844 mobile viewport. The audit covered navigation, contact links, service cards, project cards, category filters, before/after comparisons, image galleries, thumbnails, carousel controls, language switching, modal behaviour and all video elements.

## Issues found and fixes

| Issue found | Risk | Resolution |
|---|---|---|
| Four external Pexels stock videos were presented as project-specific media for painting, drywall, garden and Airbnb work. | High: the footage could be interpreted as documentation of work completed by the business. | Removed all project videos and all project-video click targets. |
| Painting, drywall, garden and Airbnb had videos while office and handyman projects did not. | Medium: inconsistent experience and weak credibility. | All projects now use the same honest structure: before/after comparison plus a relevant ten-image gallery. |
| Two patch scripts could reinsert project videos after the main page rendered. | High: removed content could return unexpectedly. | Deleted both obsolete project-video patch scripts and removed their script tags. |
| An obsolete wrapper file still contained the removed project-video library. | Medium: accidental future reuse risk. | Deleted the obsolete wrapper file. |
| The gallery patch identified a modal project by a fallback index, which could pair a project title with the painting gallery. | High: direct service/media mismatch. | Added a stable project index to each modal and made the gallery read that exact index. |
| Filtered project cards were patched by their visible DOM position instead of their original project index. | High: a filtered garden, office or other card could receive painting media. | Card galleries now use each card's explicit `data-project` value. |
| Phase filters could stop working after the patched carousel replaced the original carousel. | Medium: controls appeared available but did not reliably filter images. | Added phase-aware carousel state, image filtering and counters. |
| Some copy described external illustrative photos as references or project documentation. | High: could imply real completed customer projects. | Reworded the content as service-specific visual examples and typical work processes. The page now states that real assessments use photos from the actual property. |
| The former video reference section encouraged clicks into stock footage. | High: misleading media association. | Replaced it with image-only work-process cards that open the matching project gallery. |

## Media removed or replaced

| Media item | Previous use | Final action |
|---|---|---|
| `6474086-sd_960_540_25fps.mp4` | Painting project/reference video | Removed from projects and modals. A smaller version of the same general-purpose footage remains only as the single hero background video. |
| `13751987_3840_2160_50fps.mp4` | Drywall project video | Removed completely from the active website. |
| `7475267-hd_1066_1920_25fps.mp4` | Garden project video | Removed completely from the active website. |
| `7216747-sd_540_960_24fps.mp4` | Airbnb project video | Removed completely from the active website. |
| Four clickable video-reference cards | Separate video section | Replaced with service-matched image-gallery cards. |

## Files modified

| File | Change |
|---|---|
| `index.html` | Removed obsolete project-video scripts and updated cache versions. |
| `script.js` | Removed project video data, video modal and video handlers; retained one hero video; added image-only work-process cards; corrected customer-facing wording; added stable modal project IDs. |
| `project-gallery-fix.js` | Corrected project/media pairing, filtered-card indexing, carousel phase filtering, counters and thumbnail navigation. |
| `project-modal-state-reset.js` | Removed obsolete video-modal state handling. |
| `modal-close-layer-fix.js` | Removed obsolete video-modal close handling while retaining gallery close behaviour. |
| `mobile-modal-layout-fix.js` | Removed obsolete project-video layout rules while retaining mobile modal fixes. |

## Files deleted

| File | Reason |
|---|---|
| `project-video-modal-fix.js` | Reinserted project videos and video modal behaviour. |
| `project-video-pairing-final.js` | Reinserted category video pairing. |
| `script.github-wrapper-project-media2.js` | Obsolete development wrapper containing the removed stock-video library. |

## Final validation

| Test | Result |
|---|---|
| Video elements on page | Pass: exactly 1, the retained muted looping hero video. |
| Project video buttons/modals | Pass: 0 remain. |
| Main project cards | Pass: 6 of 6 open the correct project modal. |
| Project media matching | Pass: 6 of 6 modals use their own category-specific gallery. |
| Filtered project media matching | Pass: painting, drywall, garden, Airbnb, office and handyman filters all retain the correct media set. |
| Project galleries | Pass: 6 of 6 contain 10 relevant images and no video. |
| Service galleries | Pass: 4 of 4 contain 10 service-matched images and no video. |
| Before/after controls | Pass: retained and functional. |
| Carousel arrows and thumbnails | Pass: navigation and active state update correctly. |
| Phase filters | Pass: before/process/finished filters update the visible image set and count. |
| Navigation anchors | Pass: every menu target exists. |
| Telephone links | Pass: all use `tel:+36206671832`. |
| WhatsApp links | Pass: all use `https://wa.me/36206671832`. |
| Hungarian/English switch | Pass in both directions. |
| Desktop layout | Pass: no broken modal or control layout found. |
| Mobile layout | Pass at 390 x 844: no horizontal overflow; project modal and galleries remain usable. |
| JavaScript console | Pass: no errors during the interaction audit. |
| Broken loaded images | Pass: no broken image requests detected during section-by-section loading. |

## Trust note

The remaining image collections are service-relevant external Pexels images. They are now presented as illustrative work-type examples, not as proof of specific completed customer projects. For the strongest long-term credibility, replace these collections gradually with original, dated before/process/after photos from real jobs after customer permission is obtained.

## Final status

The site now retains the current branding, layout, hero video, before/after sliders and galleries. All project-specific videos, fake video references and mismatched video targets have been removed. Every project and filtered card now resolves to media from the correct service category.

