# Phase 15 — Content & Editorial System (draft v1, 2026-10-03)
Defines how content is created, translated, verified, approved, published, corrected and archived. Admin roles and screens are detailed in Phase 16; technology choice for the CMS is settled by spike S2. Inputs: IA (content model, taxonomy), user flows (F9 changes, O3 publishing), data strategy (D19: provenance, staging), security/privacy (D21–D23: dual approval, signed manifests), accessibility/localisation (D25–D27), feature catalog (ADM-01…ADM-10).

## 1. Does the product need a CMS and an editorial workflow? (research conclusion)
**Yes.** Reasons from requirements:
1. Content is the product (IA §2.1): programme, guides, news, alerts, FAQs, explainers, POIs and link-outs change daily, in two languages, and must be accurate and traceable.
2. Content must be edited by non-developers (editors, translators, organisers) without releases.
3. Safety-critical content (alerts, closures) needs approvals, audit trails and an emergency path.
4. Multilingual parity (EN/AM) with visible translation status.
5. Government ownership requires accountability, versioning and handover.
6. Event-agnostic reuse (D5): the same model must serve future events.
**Build vs buy:** use a self-hosted, open-source headless CMS selected by spike S2 (Payload / Strapi / Directus candidates) plus a small **editorial layer** (workflow states, alert protocol, snapshot builder). A fully custom admin is not recommended.

## 2. Content types and models
| Type | Purpose | Key fields (beyond title/body, EN+AM) | Source label | Review level |
|---|---|---|---|---|
| **Session / Event** | Programme items | start/end (UTC), room/space, type, access, format, languages, stream URL, status, speakers, organiser, themes | Official / Partner | Standard + schedule check |
| **Person (speaker)** | Directory | name, role, organisation, photo + credit, bio, consent basis | Official / Partner | Standard + consent check |
| **Organisation** | Directory | type, country, logo, website | Partner | Standard |
| **Exhibitor / Pavilion** | Directory | location, materials, contacts | Partner | Standard |
| **Place (POI)** | Map/guides | category, coordinates, landmark description, hours, accessibility, source, last verified | Editorial/Partner | Field verification |
| **Guide page** (Visit) | Visitor guidance | category, steps, last verified, related POIs, link-outs | Editorial | Subject-matter + cultural review |
| **Explainer / Learn article** | Public education | reading level, glossary links, sources list, last reviewed | Editorial | Subject-matter + plain-language check |
| **FAQ item** | Quick answers | question, answer, category, audience | Editorial | Standard |
| **Glossary term** | Terminology | term EN/AM, definition, usage notes, approved Amharic term | Editorial | Terminology review |
| **News post** | Updates | summary, link to source, source type, theme | Official/Partner/Editorial | Standard (fast-track allowed) |
| **Press release / kit** | Media | embargo, attachments, contacts | Official | Verified-source check |
| **Alert** | Safety/logistics | CAP-aligned fields (see §6), audience, area, expiry | Official (authorised source) | **Dual approval** |
| **Link-out entry** | Registry (D14) | provider, type, URL, approval, sponsored flag, last checked, fallback text | Editorial/Owner | Neutrality check |
| **Document** | Library | source, version, URL/file, accessibility status | Official | Rights check |
| **Media item** | Photo/video/audio | credit, licence, alt text EN/AM, captions/transcript, focal point | Varies | Rights + accessibility |
| **Page module** | Home blocks, banners | phase rules (pre/during/post), audience, schedule | Editorial | Standard |
| **Outcome / Commitment** | Trackers | text, actor, status, source link | Official/Editorial | Verified-source check |
Common metadata on every item: `event_id`, language versions + status, `source_type`, `source_url`, `last_verified`, `verified_by`, `owner`, `created/updated`, `visibility window`, `themes`, `audience`, `accessibility notes`, `licence/credit`.

## 3. Lifecycle and workflow
### 3.1 States
`Draft → In review → Needs translation → In translation → Translation review → Approved → Scheduled → Published → Updated → Expired → Archived` (Rejected/Returned at any review step; Withdrawn for corrections).
### 3.2 Publishing tracks
| Track | Used for | Steps | Target time (proposal) |
|---|---|---|---|
| **Standard** | Guides, explainers, FAQs, directories | Draft → editor review → translation + review → approver → schedule/publish | Within 2 working days of draft; no urgency |
| **Fast** | Schedule changes, news, closures, press releases | Draft/ingest → single editor check (source link) → approver → publish; translation can follow within the service level with EN-first flagged "AM translation pending" | ≤ 30 minutes from source confirmation |
| **Emergency (alerts)** | Safety alerts, evacuations, severe disruptions | Authorised source reference → alert publisher drafts from template → second authoriser approves → publish + push; AM and EN simultaneously from approved templates | ≤ 5 minutes (target), 24/7 during the event |
| **Organiser submission** | Side events, pavilion pages | Organiser submits → moderator checks → editor approves → publish; changes notify followers | ≤ 1 working day (event period ≤ 2 hours) |
### 3.3 Separation of duties
Authors cannot approve their own content; alert publishers cannot be the sole approvers of the same alert; admins cannot publish without logging; a break-glass path (single approver + mandatory reason + post-hoc review within 24 h) exists for CMS or key-holder outages.
### 3.4 Quality gate (publish checklist; enforced in CMS where possible)
1. Source linked and source label set; claims attributable. 2. Facts verified; `last_verified` set. 3. Languages complete or fallback visibly flagged. 4. Plain-language check (§7). 5. Accessibility: alt text EN/AM, headings, link text, captions/transcripts present or linked. 6. Rights: image/media licences, quotation, UN/host branding rules respected. 7. Privacy: no personal data beyond consented public bios; no sensitive data. 8. Tone and neutrality (no political comment, no endorsement). 9. Links tested; link-outs approved. 10. Preview in app and web, in both languages. 11. Approver recorded.

## 4. Scheduling, embargo, expiry, versioning
- **Scheduling:** publish-at and expire-at times with time-zone display (EAT); time-sensitive modules (countdown, "now & next") auto-switch by event phase (pre/during/post).
- **Embargo:** press releases and announcements can be staged with an embargo time; embargoed content is invisible to API/snapshots until release; restricted preview for journalists only if the owner requests (not MVP).
- **Expiry:** alerts expire automatically; logistics tips flagged "possibly outdated" when `last_verified` exceeds the category threshold (e.g., transport 14 days, accommodation 30 days, attractions 90 days — proposals).
- **Versioning:** every save creates a revision; published versions are immutable snapshots with diffs; one-click rollback; snapshot builder links each bundle to the content revisions it contains (traceability for disputes).
- **Change notifications:** on publishing a change to a session/place with followers, the system proposes a push notification and requires the editor to select change type (time, room, cancelled, speaker).

## 5. Multilingual content operations
- **Source language:** content may start in English or Amharic; the editor sets the source language; the other becomes "Needs translation" unless the item is flagged "single-language by design" (e.g., Amharic cultural note).
- **Translators and reviewers:** professional or vetted translators for Amharic (native, domain familiarity); a second native reviewer for safety, legal, health and climate-technical content; terminology from the **glossary** (EN/AM) is enforced; style guide (tone: respectful, hospitable, clear).
- **Tools:** CMS-native locale fields for content; a **translation management system** for UI strings (e.g., an open-source TMS such as Weblate or a hosted one) with translation memory and glossary support — Amharic support to be verified in S2/S3 tooling checks; avoid sending unpublished sensitive content to external machine-translation services without review of terms (privacy).
- **Machine translation policy:** may assist translators (draft only, never published unreviewed); never used for alerts, safety, legal, or press content; if enabled as a public convenience (e.g., device translate) it is labelled "automatic translation".
- **Fallbacks:** untranslated items display in the other language with a visible label; alerts never publish in one language only (templates guarantee parity).
- **Translation SLAs (proposals):** Fast track ≤ 2 hours after EN/AM source approved; Standard ≤ 2 working days; Wave-2 languages (Tier A only) per agreement.
- **Text expansion/typography:** editors check preview in both scripts; avoid text in images; Ethiopic numerals and dates as per D26; Ethiopian calendar fields optional.

## 6. Alerts and urgent communications protocol
**Principle:** the platform **relays** alerts from authorised sources; it does not originate emergency instructions. Every alert must cite an authorising body and contact.
### 6.1 Authorised sources (to be agreed with the host)
Host operations/security centre; venue management; health authority; transport/city authorities; organising committee communications; emergency services. Sources are listed in an "Authorisation matrix" (who may authorise what, how verified, 24/7 contact).
### 6.2 Alert fields (aligned with the Common Alerting Protocol concepts)
| Field | Values / notes |
|---|---|
| Status | Actual · Exercise · Test (tests/drills never reach production users) |
| Message type | Alert · Update · Cancel (updates reference the original alert) |
| Category | Safety · Security · Health · Transport · Weather · Venue operations · Programme |
| Urgency | Immediate · Expected · Future · Past |
| Severity | Extreme · Severe · Moderate · Minor |
| Certainty | Observed · Likely · Possible · Unlikely |
| Effective / Expires | Time (EAT + UTC), mandatory expiry |
| Area | Venue zone(s) and/or city area (map polygon or named areas) |
| Headline (≤ 80 chars) | EN + AM, plain language |
| Instruction | What to do (EN + AM), contact numbers |
| Source & authoriser | Body, person/role, reference ID |
| Audience | All users / in-area (if on-device location permitted) / role / topic |
| Delivery | Push, in-app banner, Home alert slot, alert feed; channel priority by severity |
### 6.3 Rules
Two-person approval; hardware-key authentication for alert publishers (D22); alert templates for common situations (EN/AM pre-approved by authorities); calm, factual language; no speculation or names of individuals; updates and "all clear" messages; quarterly drills and pre-event rehearsal with the host's operations team; audit log retained; post-incident review; accessibility (screen-reader announcements, high contrast alerts).
Geographic targeting is **on-device** (the app compares alert areas with the user's location only if permitted; no location sent to servers — D21); otherwise alerts go to all users with the affected area stated.

## 7. Editorial standards
1. **Mission:** accurate, neutral, useful public information; clearly **independent/unofficial** until recognised (D1).
2. **Sourcing:** official claims are attributed and linked; the source label (Official / UNFCCC / Partner / Editorial) is shown; single-source claims about safety are not published without authorisation; avoid unverifiable social-media claims.
3. **Neutrality:** no political commentary or endorsements; climate science statements link to authoritative sources; sponsored content labelled and separated; no content that could be read as endorsing commercial providers (D14).
4. **Plain language:** follow the principles of the ISO plain-language standard (ISO 24495-1: relevant, findable, understandable, usable): short sentences, active voice, define jargon, one idea per paragraph, descriptive headings, numerals/dates in unambiguous formats. Target reading level to be set after user testing (EN and AM).
5. **House style:** adopt the UN Editorial Manual conventions as a baseline for international terms (names, abbreviations, country names) with a local addendum for Ethiopian names/places (transliteration standard) and the bilingual glossary.
6. **Names and places:** use consistent transliteration rules for Amharic ↔ Latin; keep the official spelling of institutions; record variants for search.
7. **Corrections policy:** visible "Updated/Corrected [time]" notes; material corrections are logged on a public corrections page; safety-related errors corrected immediately with a push if the earlier message was pushed; "report an error" link on every item; review of every correction for root cause. Aligns with common newsroom and fact-checking codes (e.g., transparency about sources and a public corrections policy).
8. **Rights and ethics:** images with licences and credits; no use of identifiable minors' photos without consent; respect cultural and religious sensitivities; no content that promotes hatred or disinformation; cooperation with takedown requests within 24 hours for flagged content (aligned with Proclamation 1185/2020 practice).
9. **Independence and conflicts:** disclose funding and sponsors; separation between sponsorship and editorial decisions (policy in Phase 17).
10. **Legal:** counsel to confirm whether the Updates/news section falls under Ethiopia's Media Proclamation 1238/2021 (online media is defined as an internet-based service whose primary business is news collection/dissemination; registration is described as voluntary, though reports in 2026 mention proposed amendments to mandate registration of digital platforms) and whether editor-in-chief responsibilities apply; position the section as **curated information with links** rather than original reporting; avoid acting as an accreditation authority — accreditation is a matter for the Ethiopian Media Authority and UNFCCC (press accreditation disputes have occurred; keep neutral and factual).

## 8. Media and asset management
- **Library:** central DAM within the CMS; originals preserved; automatic derivatives (responsive sizes, WebP/AVIF) to meet performance budgets (D27); alt text EN/AM mandatory for informational images; credits/licences mandatory; focal-point cropping.
- **Audio:** key Amharic content narrated by professionals; compressed; transcript attached; offline-capable.
- **Video:** link or click-to-load embed of official streams (D19/D21); captions/transcripts linked; own video minimal in MVP; host-provided video requires licence.
- **Documents:** links preferred; hosted copies need permission; accessible formats flagged.
- **Brand assets:** official logos only with written permission; "independent platform" badge per D1.
- **Retention:** assets follow the retention schedule (Phase 13 §5); personal images removed on request.

## 9. Organiser and partner content
Organiser portal with scoped permissions: create/edit own listings; submit for approval; see status; receive change notices. Moderation checks: relevance to the event, accuracy, no promotional spam, no prohibited content, correct access label, language fields, accessibility info. Organisation verification (official email domain, host reference). Abuse handling: warnings, suspension. Data minimisation: contact details limited to those needed for public display.

## 10. Operations: calendar, desks and service levels
### 10.1 Editorial calendar by period
| Period | Focus | Output |
|---|---|---|
| Now–Dec 2026 | Demo content set (clearly labelled sample) | ~20 guide pages, ~30 FAQs, 10 explainers, 30 POIs, sample programme |
| Jan–Jun 2027 | Pilot content: Tier A (EN/AM) | Visit guides, FAQs, glossary, explainers, link-out registry, city POIs, news pipeline |
| Jul–Oct 2027 | Event readiness | Programme import, side events, speakers, venue maps, alert templates, rehearsals |
| Event window | Live operations | Daily digest, schedule changes, alerts, press, organiser support |
| Post-event | Outcomes and archive | Summaries, recordings links, outcomes tracker, archive freeze |
### 10.2 Event-time desks (roles and shifts, not headcount)
Content desk (news, digest), Schedule desk (programme changes), Alert desk (24/7 duty with two authorisers), Translation desk (EN/AM), Moderation desk (organiser content/reports), Support desk (corrections, user requests), Duty editor (incident lead for content). Handover logs between shifts; escalation list; runbooks.
### 10.3 Service levels (proposals)
Schedule change visible ≤ 30 min after confirmation; alerts ≤ 5 min; corrections of safety info immediately; news within 2 hours of official release; AM translation ≤ 2 hours on fast track; broken link fixed ≤ 24 hours; user "report an error" acknowledged ≤ 24 hours.
### 10.4 Content inventory (planning estimates; hypotheses)
Visit guide pages ≈ 40; explainers ≈ 40; FAQ ≈ 120; glossary ≈ 150 terms; POIs ≈ 400; link-out entries ≈ 60; sessions ≈ 500–2,000+ (ACS2 had 300+ side events); speakers ≈ 500–3,000; pavilions/exhibitors ≈ 50–200; news posts 5–30 per event day; alerts 0–20 per event day. Refine when official programme volumes are known.

## 11. Archiving
At event close: freeze a versioned **archive snapshot**; keep canonical URLs stable (redirects); label time-sensitive logistics as "historical"; keep outcomes, recordings (links), documents; remove or anonymise personal contact data per retention policy; export an open, documented archive package for the owner (and, if agreed, for deposit with a national or international archive); reactivate the model for the next event via event-agnostic setup (D5).

## 12. Metrics for the editorial system
Freshness (% of items verified within threshold), time-to-publish by track, alert time-to-publish, corrections per 100 items and time-to-correct, translation lag and completeness, broken-link rate, accessibility check pass rate, readability scores, share of content with source label, organiser submission turnaround, user "report error" volume, snapshot publish success rate.

## 13. Risks
| # | Risk | Mitigation |
|---|---|---|
| C1 | Misinformation or wrong alerts | Authorised-source matrix; dual approval; templates; drills; corrections policy |
| C2 | Translation errors in sensitive content | Native reviewers; glossary; no machine-only; two-person review |
| C3 | Content overload during the event | Tracks and desks; templates; prioritisation rules; automation of imports with approval |
| C4 | Staleness of logistics information | `last_verified` rules; stale flags; owner assignment |
| C5 | Legal exposure from news-like content or media-law classification | Counsel review; curated-with-links stance; clear corrections/takedown process |
| C6 | Rights violations (images, UN/host branding) | Rights checks; written permissions; licence fields |
| C7 | Perceived bias or endorsement | Neutral link-out rules; sponsorship separation; editorial standards |
| C8 | CMS unavailable or compromised | Break-glass path; signed manifests; static fallback; backups |
| C9 | Organiser misuse | Verification; moderation; suspension |
| C10 | Terminology inconsistency | Glossary governance; term owner; translation memory |

## 14. Open questions
1. Who is the editorial owner (accountable editor) once the government adopts the platform? 2. Which bodies can authorise alerts and how are they reachable 24/7? 3. Will the host provide structured programme data and official text in both languages? 4. Which national bodies maintain standard Amharic climate terminology? 5. What is the legal classification of the Updates section? 6. Translation vendor options and costs; native reviewer availability. 7. Policy for user-submitted corrections and takedown requests. 8. What content may we show about sponsors? 9. Does the host permit embedding official streams, press kits and photos?

## 15. Proposed decisions
- **D28:** Adopt a self-hosted open-source headless CMS plus an editorial layer (workflow states, tracks, quality gate, snapshot builder) — product selection by spike S2.
- **D29:** Adopt the four publishing tracks and the separation-of-duties rules (§3), the quality gate checklist, and the editorial standards (§7), including the corrections policy and the "relay, not originate" principle for alerts.
- **D30:** Adopt the alert protocol (§6) with CAP-aligned fields, authorised-source matrix, templates, dual approval and drills; geographic targeting on-device only.
