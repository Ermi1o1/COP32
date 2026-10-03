# Component Inventory v0.1 (Track C)
Status: proposed 2026-10-03. Derived from `docs/ux/information-architecture.md` (D16 v2), `docs/ux/user-flows.md` (F1–F16, V1–V7) and personas P1–P7. Tokens: `tokens.json`.

**Standard states** (every interactive component unless noted): default · hover (web/pointer) · focus (3 px ring) · pressed · disabled · loading · error. Data components add: empty · offline/stale · TBC. All components: EN/AM text expansion-safe (≥ 40 % growth), 200 % text scale, light/dark, RTL-ready, accessible name/role/state.

## A. Navigation and chrome
| # | Component | Key states / variants | Notes | Flows / personas |
|---|---|---|---|---|
| A1 | **Tab bar** (5: Home, Programme, Map, Visit, Updates) | selected, badge (Updates unread), 2-line labels at 200 % | Bottom bar on phone, top nav ≥ 960 px; preserves tab state | all; F1–F16 |
| A2 | **Header** (title, back, language switch, search, bell, menu ☰) | scrolled, offline | Language switch on every screen | all |
| A3 | **Language switch** (EN \| አማ) | selected, "translation pending" indicator | Shows each language in its own script | F1; P2, P4 |
| A4 | **Header menu / drawer** (Learn, Library, Archive, Me & Settings, Help, About) | open/closed | Low-frequency items (D16 v2) | F15, F16; P4, P3 |
| A5 | **Time-zone chip** ("Addis Ababa EAT · your time") | same-tz hides the second part | Every date/time shows event and user time | F2, F11; P4 |
| A6 | **Offline / sync indicator** | online, offline, syncing, stale (age shown), failed | Never hides cached content | all |
| A7 | **Independent-platform label** | persistent footer / About link | Required until endorsed (D1) | all |
| A8 | **Breadcrumb / back** | — | Predictable system back | all |

## B. Content display
| # | Component | States / variants | Notes | Flows / personas |
|---|---|---|---|---|
| B1 | **Session card** | default, saved, live-now, changed (badge), cancelled, TBC access, past | Title EN/AM, time (event+user), room, access chip, theme; save button ≥ 48 px | F2, F3, F4, F9; P1, P2, P4 |
| B2 | **Day header (sticky)** & day selector | selected, today | Opens on today (F2) | F2 |
| B3 | **Access chip** (Open to public · Accredited only · Registration required · TBC) | 4 values | Icon + text; never guessed | F2; P1, P2 |
| B4 | **Filter chips + filter sheet** | selected, count badge, clear-all | Day, Open to public, Theme, Venue, Language, Format… | F2, F5, F6 |
| B5 | **Speaker card / profile** | with/without photo | Sessions list | F5; P3, P10 |
| B6 | **Exhibitor/pavilion card** | — | Zone, theme, contact link-out | F6; P5, P11 |
| B7 | **Guide article / explainer** | read, saved offline, "last verified" | Source label; long-text reading mode | F15, V6; P1, P2, P4 |
| B8 | **Service grid tile** (Visit) | default, offline-available, link-out marker | Each tile EN/AM, ≥ 48 px | V1–V7; P1 |
| B9 | **News / press item** | official · partner · editorial source label | Embargo state for press | P3 |
| B10 | **Source label + last-updated** | verified, unverified | On everything that changes (IA rule 1) | all |
| B11 | **TBC / "Notify me when announced"** | notifications allowed/denied | First-class unknown state | F2, F8 |
| B12 | **Document row** | downloaded, downloading, failed | Size, type, offline | F14; P3, P10 |
| B13 | **Media player (live/recorded)** | live, scheduled, ended, captions on/off, low-data | No autoplay; link-out if rights require | F11, F12; P4 |
| B14 | **Now & next module** (Home) | has-saved, none, all-day | Personal items first (EXPO lesson) | F1, F8; P1 |
| B15 | **Countdown / phase module** (Home) | pre / during / post | Replaces carousels | P1, P4 |
| B16 | **Role shortcuts row** (Home) | per role | Layout only, no gating (PER-09) | F1; P1, P2, P3, P6 |

## C. Alerts and feedback
| # | Component | States | Notes | Flows |
|---|---|---|---|---|
| C1 | **Alert banner** (info, warning, critical) | dismissible (not critical), expired | Icon+text; assertive live region only for critical | F9; all |
| C2 | **Alert inbox / history** | unread, read | Bell + Updates | F9 |
| C3 | **Toast / snackbar** | success, error, undo | Auto-dismiss ≥ 6 s, pausable | F3 |
| C4 | **Dialog / permission pre-prompt** (notifications, location) | explain → Allow / Not now | Equal-weight buttons, refusable (D21) | F1, F8 |
| C5 | **Link-out interstitial** | provider, data notice | "You're leaving the app to [Provider]. We don't share your data." (D14) | V1–V7 |
| C6 | **Empty state** | per context, with action | Short, helpful text | all lists |
| C7 | **Error state** | network, server, not-found | Retry + offline fallback | all |
| C8 | **Offline state / stale data notice** | with age | Cached data shown | all |
| C9 | **Skeleton / loading** | — | No spinner-only full screens | all |

## D. Inputs
| # | Component | States | Notes | Flows |
|---|---|---|---|---|
| D1 | **Search field + scope tabs + suggestions** | focused, results, no results, recent (local) | Ge'ez-aware (S3); scope tabs All/Sessions/People/Places/News/Help | F2, F5, F7 |
| D2 | **Buttons** (primary, secondary, tertiary, destructive, icon) | standard | 48 px high; one primary per screen | all |
| D3 | **Switch / checkbox / radio** | standard | Visible labels | Settings |
| D4 | **Text input / select** | error, helper | Labels not placeholders | contact/report forms |
| D5 | **Segmented control** (e.g., Schedule/My agenda) | selected | Inside screens, not navigation | F4 |
| D6 | **Save / favourite toggle** | on/off, syncing | ≥ 48 px, announces state | F3 |
| D7 | **Settings rows** (text size, contrast, reduce motion, data saver, notifications, delete my data) | standard | Device-local (D21) | Settings |

## E. Map
| # | Component | States | Notes | Flows |
|---|---|---|---|---|
| E1 | **Map view** (MapLibre) | offline, loading tiles, location denied | Attribution visible; Ge'ez glyph pack (S4) | F7, F8 |
| E2 | **POI marker + cluster** | selected | Non-colour distinction by icon | F7 |
| E3 | **POI card / bottom sheet** | accessible tags, hours, directions button | "Directions" hands off to device map app | F7, F8 |
| E4 | **Category filter** | selected | Hospital, hotel, transport, ATM, embassy, attraction | F7 |
| E5 | **Offline map download row** | not downloaded, downloading (size), downloaded, update available | Size shown before download | F1 |

## F. Role-gated (not in the public prototype)
Volunteer mode quick-answer screen and report-issue button (P6), organiser change form (P5) — specified in operations docs; design deferred.

## G. Cross-reference to IA tasks (tree-test dry-run, Track D)
T1 → A1, B8; T2 → B16, B3; T3 → B1, B4; T4 → C1, B1; T5 → B9; T6 → E3 (accessibility tag); T7 → B8; T8 → A3; T9 → B7 (glossary), D1; T10 → B13; T11 → B8, C5; T12 → D7.

## Still needs real-world validation
- [ ] Usability testing of each component with real users (none done).
- [ ] Screen-reader and keyboard pass on a built version (none yet).
- [ ] Component behaviour at 200 % in Amharic on low-end devices.
- [ ] Final copy for every label in both languages (native-speaker reviewed).
