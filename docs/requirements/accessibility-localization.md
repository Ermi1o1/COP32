# Phase 14 — Accessibility & Localisation (draft v1, 2026-10-03)
Defines requirements and the MVP-versus-later split. Inputs: personas, IA, flows, architecture (D17/D18), privacy/security (D21–D23, approved 2026-10-03), Ethiopian digital landscape, benchmarks. Figures from web sources are secondary and flagged.

## 1. Evidence base (researched)
### 1.1 Languages in Ethiopia
| Language | Script | Status / numbers (secondary sources; verify with census/Ethnologue) | Relevance |
|---|---|---|---|
| Amharic | Ge'ez (Ethiopic) syllabary ("fidel") | Federal working language; ~33.7M mother-tongue speakers (2020) + ~25M second-language speakers → ~58.8M | Default language #2 (D9) |
| Afaan Oromo | Latin ("Qubee") | Federal working language since 2020; ~41.7M speakers (~33.8% of population) — the largest first-language community | Strongest Wave-2 candidate; Latin script (no new font needs) |
| Tigrinya | Ge'ez | Federal working language since 2020; ~9.9M speakers | Reuses the Ethiopic font and layout |
| Somali | Latin | Federal working language; ~6.7M | Later |
| Afar | Latin | Federal working language; ~2.6M | Later |
| English | Latin | International conference language; widely used in business/education | Default language #1 |
Federal working languages: Amharic, Afaan Oromo, Somali, Tigrinya, Afar (Council of Ministers decision, Feb 2020; sources vary on wording). International audience: UNFCCC operates in the six UN languages (Arabic, Chinese, English, French, Russian, Spanish); African Union working languages include French, Arabic, Portuguese, Spanish, Swahili. **Implication:** English + Amharic is the right start; the next language choice should follow audience data, not assumption.

### 1.2 Devices and operating systems
- StatCounter (web traffic; may skew toward heavier internet users): Ethiopia mobile OS share **Android ≈ 94%, iOS ≈ 3%** (Aug 2025). Android versions (May 2026): 14 ≈ 19%, 13 ≈ 14%, 15 ≈ 14%, 16 ≈ 13%, 11 ≈ 11%, 12 ≈ 11% → roughly **82% on Android 11+**, the remainder on older versions. iOS versions (Dec 2025): iOS 18.x dominates; iOS 16.7 ≈ 5%.
- Connectivity (Phase 3): ~19% internet penetration nationally; urban mobile internet use 48% vs rural 19% (GSMA 2026 via secondary). International visitors skew iOS and fast networks.
- **Implication:** Android-first quality, broad Android version support, small downloads; iOS still required (international users, demo audience).

### 1.3 Accessibility context
- Disability prevalence estimates in Ethiopia vary widely (tens of millions of people with disabilities are claimed by advocacy sources; official deaf population ~250,000 vs ENAD claims of far higher). **Treat all numbers as uncertain.** The Ethiopian National Association of the Deaf (ENAD) exists (28 branches, member of the World Federation of the Deaf).
- Ethiopian Sign Language (EthSL) exists but **lacks official status**; a free digital EthSL dictionary has been released with US government support (reported).
- Screen reader/speech: TalkBack uses Google text-to-speech with 30+ languages; Amharic speech services exist from Google (am-ET) and third-party providers, but **quality is uncertain** (a developer-forum report calls a new Amharic TTS "wrong and confusing"). VoiceOver support for Amharic was **not confirmed**. → Amharic screen-reader pronunciation must be tested on real devices (spike S1) and cannot be assumed.
- Automatic speech recognition for Amharic: strong claims from vendors vs poor baseline for general models (reports of ~99.8% WER for an open model on a benchmark vs ~3% for a commercial model — **vendor-sourced, unverified**); fine-tuned models improve; homophone normalisation helps. → Do not promise automatic Amharic captions.
- Standards: WCAG 2.2 is a superset of 2.1 (adds 9 criteria incl. target size minimum 24×24 CSS px, consistent help, accessible authentication, focus not obscured). EN 301 549 (EU) references WCAG 2.1 AA for web, covers native apps; the EU Accessibility Act has applied since 28 June 2025; an updated EN 301 549 is expected to include WCAG 2.2 AA. Ethiopia: the country has disability-rights commitments (e.g., UN CRPD ratification and national proclamations — **to verify with counsel**).

## 2. Accessibility requirements
### 2.1 Standard (proposed D25)
- **Target WCAG 2.2 Level AA** for the web app and the equivalent success criteria for Android/iOS apps (using W3C mobile guidance), replacing the earlier "2.1 AA" wording because 2.2 AA conformance also satisfies 2.1 AA and anticipates EN 301 549 updates.
- Platform guidelines apply on top: Android accessibility guidelines/Material, Apple Human Interface Guidelines accessibility sections.
- Publish an accessibility statement with known limitations and a feedback channel (ACC-05). VPAT-style conformance report before the event.
### 2.2 Concrete requirements
| Area | Requirement | Release |
|---|---|---|
| Screen readers | All interactive elements labelled (EN/AM); logical focus order; headings/landmarks (web); announcements for dynamic updates (alerts) with polite/assertive rules; custom components expose roles/states; avoid gesture-only actions | MVP |
| Amharic with screen readers | Mark language of content (`am`/`en`) on every text node so the speech engine switches voices; test TalkBack and VoiceOver with Amharic; provide text alternatives and, where TTS is poor, **pre-recorded human audio** for key content | MVP (tests) / Should (audio) |
| Text size | Respect OS font scaling up to 200% without loss of content/function; reflow at 320 CSS px (web) | MVP |
| Contrast | Text ≥ 4.5:1 (3:1 large); non-text UI ≥ 3:1; ensure Ge'ez glyph legibility at small sizes; support dark mode and a high-contrast theme | MVP (light/dark) / Should (high contrast) |
| Colour | Never rely on colour alone (status badges have icon + text) | MVP |
| Touch/pointer | Targets ≥ 44×44 pt (iOS) / 48×48 dp (Android) with spacing; satisfies WCAG 2.2 target size; alternatives to drag; no path-based gestures required | MVP |
| Keyboard (web) and switch access | Fully operable by keyboard/switch; visible focus; focus not obscured (2.2); skip links | MVP |
| Motion | Respect reduced-motion setting; no auto-playing media; no flashing > 3/second | MVP |
| Time | No time limits on core tasks; warn and extend if any session timeout exists | MVP |
| Forms/authentication | Labels, errors identified in text, suggestions; **accessible authentication** (email code with paste/auto-fill; no cognitive tests); redundant entry avoided | MVP |
| Consistent help (2.2) | Help/FAQ and contact in the same place on every screen | MVP |
| Cognitive accessibility | Plain-language content, short sentences, consistent navigation, icons with labels, progressive disclosure, no jargon without glossary link | MVP |
| Media | Captions for any video we host; transcripts; audio descriptions where we produce video; links to official captions/streams; do not claim captioning we do not control | MVP (policy) / Later (own video) |
| Maps | Text alternative for every map (list view), accessible routes info, no map-only information | MVP |
| Documents | Linked official PDFs flagged with "may not be accessible"; our own documents tagged PDFs/HTML | MVP |
| Sign language | Visual guides and text for essential content; **Ethiopian Sign Language clips** for key visitor safety/arrival information created with ENAD and sign-language interpreters | Later (Could) |
| Accessibility settings in-app | Text size, contrast, reduce motion, audio on/off, low-data mode; settings are device-local (D21) | MVP |
| Disability data | Accessibility needs (e.g., step-free routes) stored locally only | MVP (D21) |

### 2.3 Testing and assurance
- Automated: linting and checks in CI (web accessibility linters/axe-type tools; Android Accessibility Scanner; Xcode Accessibility Inspector).
- Manual: TalkBack + VoiceOver on the device matrix (spike S1), keyboard-only and screen-reader passes on web (NVDA/JAWS/VoiceOver), switch access, voice control, 200% text, high contrast, reduced motion, colour-blindness simulation.
- **User testing with people with disabilities**: partner with ENAD and organisations representing blind/low-vision and physical-disability communities (to identify); budget participant time; test Amharic specifically; incorporate before pilot and event.
- Independent accessibility audit before the pilot and the event; remediation tracked as release blockers (severity A/AA failures).
- Content accessibility checklist for editors (alt text, plain language, headings, link text, captions).

## 3. Localisation requirements
### 3.1 Language strategy (proposed D26)
| Wave | Languages | Scope | Trigger |
|---|---|---|---|
| **1 (MVP)** | English, Amharic | 100% of public content and UI; full QA | Now (D9) |
| **2 (candidates)** | Afaan Oromo (Latin), Tigrinya (Ge'ez), French, Arabic (RTL) | **Essential content only ("Tier A"):** safety/emergency, arrival checklist, FAQs, alerts, map labels, key explainers | Decide with demand data (BA interviews, pilot analytics, host guidance); professional translation + native QA |
| **3** | Somali, Afar, Spanish, others | Tier A subset | Evidence-based |
Rules: no machine-only translation for official/safety content; if machine translation is offered as a convenience (e.g., system translate), it is labelled and never used for alerts; unknown/untranslated items fall back **visibly** to English; every string carries a translation status in the CMS.
### 3.2 Script, typography and layout
- **Bundle an Ethiopic font** in apps and web (D11), subsetted (woff2 for web); Noto Sans Ethiopic (566 glyphs, 9 weights) is a candidate; evaluate alternatives for legibility at small sizes. Provide fallbacks, and never rely on OEM fonts.
- Ge'ez text needs larger default sizes and line heights than Latin: proposal body ≥ 16 sp with line-height ≥ 1.5, headings with extra ascender/descender clearance; validate on low-end devices (hypothesis to test).
- Layouts must be **expansion-safe** and not truncate Amharic labels; allow 2–3 line labels; avoid fixed-width tabs; avoid letter-spacing and all-caps styles (not meaningful for Ge'ez); avoid italic synthesis (Ge'ez has no true italic).
- **RTL readiness** (needed for Arabic in Wave 2): use start/end logical properties, mirrored icons, bidi-safe strings, number/date handling; build the layout system RTL-ready from the start even though Wave 1 is LTR.
- Mixed-script strings (Amharic + Latin names/numbers) must render and wrap correctly; test URLs, emails, units.
### 3.3 Dates, times, numbers, names, addresses
| Topic | Requirement |
|---|---|
| Time zones | UTC storage; show event time (EAT, UTC+3) and user time (PER-04) |
| Time notation | Ethiopia traditionally counts hours from dawn (6-hour offset from international time) — a source of confusion. **Default to the international clock with explicit AM/PM or 24-hour format and a time-zone label; do not display the traditional clock without an explicit label and explainer.** Native editors define Amharic day-period wording; user-test for misunderstandings |
| Calendar | Gregorian default; optional Ethiopian calendar display (13 months) with a vetted library; always show Gregorian for events and official documents |
| Digits | Default Western (Arabic) digits for readability and consistency; Ethiopic numerals optional/later; search accepts both (S3) |
| Plurals/grammar | ICU message format with CLDR plural rules per language; no string concatenation |
| Names | Ethiopian naming conventions (given name + father's name; no family name) — never assume "first/last" fields; use "full name" and "display name" |
| Addresses | Addis addresses are often described by landmarks, not street numbers (hypothesis supported by press on navigation problems) → store landmark descriptions in addition to coordinates; show "near [landmark]" |
| Currency | ETB; show amounts as indicative; USD/EUR where relevant (T9) |
| Phone numbers | International format with +251 handling; click-to-call |
| Search | Ge'ez-aware normalisation (S3); transliteration for Latin typing of Amharic names/places |
| Keyboard | Support system Amharic keyboards; do not force custom keyboards; check input fields for composition issues |
### 3.4 Content and editorial localisation
- Write Amharic content natively (not literal translation) for key pages; maintain a bilingual style guide and glossary of climate/COP terms with approved Amharic terms (important for consistency).
- Translation workflow in CMS: source language, translation status, reviewer, last-reviewed date; two-person review for safety/alert content.
- Terminology: coordinate with national institutions (e.g., environment agencies, language academy) where terms are standardised — to identify.
- Cultural review: imagery, colours, gestures, holidays/fasting periods (visitor content should flag public holidays and religious observances with accurate dates — verify annually), dress and etiquette content (coffee ceremony, churches).
- Voice and tone: respectful, hospitable, clear; avoid slang and idioms that do not translate.
- Images: avoid text baked into images; supply alt text in both languages.
- Audio: record key Amharic content (arrival, safety, ceremony guide) with professional narrators — also benefits lower-literacy users; store as small compressed files (offline-capable).

## 4. Low-bandwidth, offline and older devices
### 4.1 Budgets (proposals; to be validated by spikes S1, S4, S7)
| Item | Proposed budget | Rationale |
|---|---|---|
| App download size (Android AAB, per-device split) | aim ≤ 30 MB | Data cost/storage; Flutter/React Native baselines differ (~15 MB vs ~12 MB reported) |
| Tier A content bundle (text, JSON, small images) | ≤ 3 MB compressed | Quick first sync on weak networks |
| Offline map pack (Addis city + venue area) | ≤ 40 MB, optional download | Spike S4 will measure |
| Web critical path (HTML+CSS+JS first view) | ≤ 200 KB compressed; fonts subsetted | Works on 3G |
| Images | Responsive, modern formats, ≤ 100 KB typical; lazy load; no autoplay video | Data saver |
| Media | Streams only on demand; audio-only option; downloads on Wi-Fi preferred | |
| Time to useful content | ≤ 3 s on typical 4G; ≤ 8 s on throttled 3G (web) | Tested in S1/S7 |
| Memory | Comfortable on 2 GB RAM devices | Low-end Android |
### 4.2 Behaviours
Low-data mode (user-controlled and auto-suggested on poor networks); resume interrupted downloads; storage manager with quota; background sync on Wi-Fi only by default; request only necessary permissions; battery-friendly polling; graceful offline states with last-updated timestamps; skeleton screens rather than spinners.
### 4.3 OS support (proposed D27)
- **Android:** support Android 8.0 (API 26) or higher if the chosen framework allows (roughly covers current devices; ≈18% of Ethiopian web traffic is on versions older than 11); revisit after spike S1 and real install data. Test on 2 GB RAM devices and Android Go–class devices.
- **iOS:** support the two to three most recent major versions plus iOS 16 if feasible (iOS 16.7 still ≈5% of Ethiopian iOS traffic); decide with the framework minimums.
- **Web:** last two versions of Chrome, Safari, Firefox, Edge, plus Samsung Internet and Opera Mini/Mini-class browsers in "extreme data saver" mode degraded gracefully (core content readable without JavaScript where feasible).
- **Huawei without Google services:** reachable via web app; push through HMS evaluated (S6); store distribution through AppGallery considered.
- Distribution: Play Store, App Store, web; plus APK direct download (with signature verification) for places with limited store access — decision for owner (security trade-offs).

## 5. MVP vs later
| Item | Must (MVP) | Should | Later |
|---|---|---|---|
| WCAG 2.2 AA web + mobile equivalents | ✔ | | |
| Screen reader labels, focus order, language tagging | ✔ | | |
| English + Amharic full content | ✔ | | |
| Bundled Ethiopic font; Ge'ez search normalisation (S3) | ✔ | | |
| Text scaling to 200%, contrast, reduced motion | ✔ | | |
| Offline Tier A; low-data mode | ✔ | | |
| Plain-language content; glossary | ✔ | | |
| Accessibility statement; user testing with disability organisations | ✔ | | |
| Time-zone and clock-notation rules | ✔ | | |
| Alt text/text alternatives (maps, images) | ✔ | | |
| Amharic audio for essential content (human-recorded) | | ✔ | |
| High-contrast theme | | ✔ | |
| Ethiopian calendar display | | ✔ | |
| Wave-2 languages (Tier A): Afaan Oromo, Tigrinya, French, Arabic | | ✔ (decision) | |
| RTL-ready layout engine | ✔ (foundation) | | RTL language content |
| Ethiopian Sign Language video clips | | | ✔ |
| Own live captioning | | | ✔ (depends on host) |
| Amharic voice assistant | | | ✔ (parked) |
| Ethiopic numerals option | | | ✔ |

## 6. Risks
| # | Risk | Mitigation |
|---|---|---|
| L1 | Amharic TTS/screen-reader quality poor | Test early (S1); human audio for key content; text-first design |
| L2 | Ge'ez rendering defects on some Android devices | Bundled fonts (D11); device matrix; release blockers |
| L3 | Translation quality/terminology inconsistent | Style guide, glossary, native reviewers, two-person review for safety |
| L4 | Time-notation misunderstandings | International clock default; explicit labels; user testing |
| L5 | Accessibility claims unverified | Independent audit; honest statement; user testing |
| L6 | Wave-2 languages stretch content operations | Tier A only; decide on demand data |
| L7 | Unsupported older devices exclude users | OS support targets reviewed with data; web fallback |
| L8 | Official streams lack captions/Amharic interpretation | Link official captions; provide summaries; ask host |
| L9 | Low literacy / digital literacy | Icons, audio, simple flows, volunteers' help |
| L10 | Estimates for disability and language numbers are unreliable | Use as direction only; validate through BA interviews and partner organisations |

## 7. Open questions
1. Which languages will the host provide interpretation/captions for? 2. Does the host plan accessibility services (sign interpretation, accessible transport) we should reflect? 3. Which national bodies set standard Amharic climate terminology? 4. Which disability organisations will help test (ENAD plus blind/low-vision and mobility groups)? 5. Are there government accessibility or language-use standards for public digital services? 6. Real device market in Addis (brands, RAM, versions) for the test matrix. 7. Demand for Afaan Oromo/Tigrinya/French/Arabic among target users. 8. Budget for professional narration and translation.

## 8. Proposed decisions
- **D25:** raise the accessibility target to WCAG 2.2 AA (web) with equivalent criteria for apps; adopt the testing and assurance plan (§2.3) including user testing with disability organisations and independent audits before pilot and event.
- **D26:** language waves (§3.1): English + Amharic in MVP; Wave-2 Tier A essentials for candidate languages decided by demand data; RTL-ready foundations from the start.
- **D27:** performance and device targets (§4): budgets as proposals to validate in spikes; Android 8+/iOS minimum targets subject to framework and install data; low-data mode and offline Tier A in MVP.
