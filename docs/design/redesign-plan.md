# Track D v2 — Visual redesign plan (Highland Mist)
Status: executed 2026-10-03. Direction: **Highland Mist** (D53), approved by the founder after four review rounds (`docs/design/redesign-directions/`).
Scope: visual and interaction polish of the existing clickable prototype. **No IA change**: the 5 tabs (Home, Programme, Map, Visit, Updates) and every hash route are unchanged, so tree-test paths T1–T12 resolve to the same places. One approved presentation change: the ☰ header menu becomes a **profile button** next to the language switch. It opens the same `#/menu` route, now styled as an iOS-style Settings sheet holding Profile, Learn, Library, Archive, Settings, Help and About (founder edit, D53).

## Screen inventory (routes)
| # | Screen / state | Route | Batch |
|---|---|---|---|
| 1 | Home: during-event (default) | `#/home` | 1 |
| 2 | Home: pre-event and post-event variants | `#/home` (phase in Settings) | 1 |
| 3 | Home in Amharic | `#/home` + አማ | 1 |
| 4 | Settings sheet (profile, learn, library, archive, help, about, settings) | `#/menu` | 1 |
| 5 | Settings detail (language, text size, theme, motion, data saver, demo controls, delete data) | `#/menu/settings` | 1 |
| 6 | Programme: schedule by day, open-to-public filter | `#/programme/schedule` | 2 |
| 7 | Programme: side events, speakers, exhibitors | `#/programme/side`, `/speakers`, `/exhibitors` | 2 |
| 8 | My agenda (filled and empty) | `#/programme/agenda` | 2 |
| 9 | Session detail | `#/session/:id` | 2 |
| 10 | Map: schematic, categories, accessibility, POI sheet | `#/map` | 3 |
| 11 | Visit: guide grid | `#/visit` | 3 |
| 12 | Visit guide detail and link-out interstitial | `#/visit/:id` | 3 |
| 13 | Updates: news, alerts history, press, live & recorded, explainers, digest | `#/updates/*` | 4 |
| 14 | Learn, glossary, COP explained (TBC) | `#/menu/learn/*` | 4 |
| 15 | Library, archive, help, about | `#/menu/library` … | 4 |
| 16 | Search (incl. Ge'ez homophone folding) | `#/search?q=` | 4 |
| 17 | States gallery: alerts, empty, error, offline/stale, TBC, loading | `#/states` | 5 |
| 18 | Dark mode, 200% text, offline banner, tree-test dry run | all; `#/test` | 5 |

## Batches
1. **Shell + Home + Settings sheet.** New tokens (`tokens.json` v0.2), Atkinson Hyperlegible Next (Latin) with bundled Noto Sans Ethiopic, large collapsing titles, translucent nav and tab bars, profile button, phase variants.
2. **Programme family.** Segmented control, day picker, filter chips, grouped session rows with a time column and save star, speaker rows with illustrated avatars, session detail.
3. **Map + Visit.** Schematic map restyled with category chips and a bottom detail card; icon tiles for guides; link-out sheet.
4. **Updates + Learn/Library + Search.** Grouped news and alert rows with source pills, live badge, glossary list, search field and results grouped by type.
5. **States + modes.** Notice banners (info/warning/critical/success), empty, error, offline, TBC, skeletons; dark mode; 200% reflow; tree-test screens.

## Judgment calls that affect later batches
- **One list component everywhere** (`.group` + `.row`): grouped inset rows with an icon chip, title, subtitle, value and chevron. Cards are kept only for the hero and featured content.
- **Lime is used only for the single primary action** on a screen (dark ink text on lime, 7.9:1). Lime is never used as text on light backgrounds.
- **Avatars:** faceless illustrated SVG busts, colour-coded from tokens. No photos.
- **Prototype mark:** a thin non-dismissable bar above the tab bar on every screen, plus the About and Settings footer.
- **Sample content:** sessions, speakers, POIs, alerts, news and exhibitors rewritten as plausible but invented, with "(fictional)" or "(sample)" labels. Real Addis Ababa landmarks appear only as public place names.
