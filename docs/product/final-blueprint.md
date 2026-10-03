# COP32 Public Platform — Final Product Blueprint (v1.0 draft, 2026-10-03)

**Status:** APPROVED v1.0 (2026-10-03). Consolidation of Phases 0–19. Decisions D1–D42 are approved (see `docs/decisions/log.md`); this blueprint adds only **D43** (adopt this blueprint as the baseline). Every statement points to the file that holds the detail; if this file and a source file disagree, the source file and the decision log win.
**Evidence labels:** **A** confirmed · **B** officially announced · **C** reported, unconfirmed · **D** analysis · **E** assumption · **F** needs verification.
**Scope rule kept throughout:** team capacity is not assumed or discussed (founder instruction); functions are listed, not people.
**Not in this document:** no code, no UI design, no technology lock-in beyond decisions D17/D18 (framework, CMS, search, hosting are decided by spikes S1–S7).

---

## 1. Executive summary
- **What:** a bilingual (English + Amharic) public-information platform for COP32 (Addis Ababa, reported 8–19 Nov 2027, **dates and venue unconfirmed — F**), delivered as native Android and iOS apps (equal priority) plus a web app, serving everyone who is **not** in the negotiating rooms: international visitors, Ethiopian residents, journalists, remote followers, side-event organisers, volunteers and staff.
- **Why there is room:** no official COP32 app, portal or tender has been announced as of 2026-10-01 (A, absence not proven), but UNFCCC reliably ships its own badge-gated delegate platform (COP28–COP30). The open ground is the **public, host-country, Ethiopia-local, Amharic, low-bandwidth, post-event** layer, not the delegate core (D1, D8).
- **How it is positioned:** an **independent, unofficial** platform until endorsed, built to be **handed to the Ethiopian government** (D2), with split ownership first and full assignment or open source as fallbacks (D35), funded mainly by a host/government service contract or donor grant (D34).
- **What is distinctive:** trust and transparency by design (guest-first, device-first personal data, no ad/tracking SDKs), Amharic done properly (bundled Ethiopic font, Ge'ez-aware search), offline Tier A content, a visitor "Visit" companion built on link-outs rather than bookings, a safety-alert **relay** (not originate) with dual approval, and an event-agnostic core that lets the platform outlive COP32.
- **How success is judged (D6, in order):** (1) a link/listing from an official COP32/UNFCCC/government channel; (2) formal government endorsement; (3) press coverage. User counts are secondary.
- **Plan:** Demo by 31 Dec 2026 (gate G1), funding/ownership signal by 31 Mar 2027 (G2), pilot features by 31 May 2027 (G3), public pilot mid-Jun–Aug 2027 (G4 on 31 Aug), event release Sep–Oct 2027 (G5 on 15 Oct), event operations late Oct–Nov 2027, post-event archive from Dec 2027 (D38).
- **Largest risks:** no official data/API access; alert authorisation not agreed with the host; funding and the legal foundation (IP assignments, PPR) not in place; official overlap; interpretation of Ethiopian data-localisation law; one or more of the above slipping past the dated gates.
- **Immediate actions (founder):** legal foundation; send reviewed outreach drafts; start BA validation; engineers start spikes S1–S7; start store/D-U-N-S accounts once registration completes (see §27).

## 2. Product vision, mission and objectives
- **Vision:** *The trusted public window into COP32 for everyone — in Ethiopia and worldwide — before, during and after the conference.*
- **Mission:** make COP32 understandable, accessible and participatory for people who are not in the negotiating rooms, and leave Ethiopia with a reusable digital platform for future events.
- **Strategic objectives:** credibility (official link, endorsement) · adoption path (pilot by mid-2027, hand-over ready) · visibility (press) · sustainability (funding, PPR) · legacy (event-agnostic core). Source: `product/project-definition.md` §4–6.
- **Founder-stated success and stop conditions:** success = first international event app recognised globally (built or partnered by Zega Tech PLC); stop/pivot if not accepted or funded, if someone else is officially established with the government/UNFCCC, or if the event is cancelled — handled as dated gates (D4) with a pivot response first (§22).

## 3. Target users
Prioritisation of personas (D12; source `ux/personas.md`):
| Tier | Personas |
|---|---|
| 1 (primary) | P1 non-accredited visitor / international attendee · P2 local attendee (Addis) · P3 journalist/media · P4 remote follower · P5 side-event organiser/exhibitor |
| 1-ops | P6 volunteer · P7 event staff/admin |
| 2 | P8 NGO/civil society · P9 youth · P10 researcher · P11 business/investor · P12 speaker · P13 sponsor/partner |
| 3 (served via the public layer) | P14 accredited delegate · P15 government representative |
Why this order: at COP30 only ~7,527 of ~42,618 in-person attendees held party badges (C-A, secondary) — most people at a COP are observers, media, staff, side-event and public visitors. Design principle: **roles change layout, not access** (no gated content except staff/organiser/volunteer tools).
Audience size is a planning range of 50,000–80,000+ on site (C; sources conflict — ask the Secretariat), plus a remote audience of unknown size (E).

## 4. Problem statement
Around a once-in-a-generation climate conference in Ethiopia, information will be scattered across UNFCCC systems, government channels, partner sites and social media. Accredited delegates get a gated official platform; **the public, remote followers, journalists, Ethiopian citizens and non-accredited visitors have no single trusted, bilingual, low-bandwidth place** to understand what COP32 is, what is happening, how to take part and get around, and what came out of it. COP30 also showed that accommodation and access shortfalls reduce attendance (C), so practical city and entry guidance is part of the problem, not an extra.

## 5. Key use cases
1. **Understand COP32** in plain language (EN/AM) and check "Can I attend?" (INF-01, INF-02, PUB-02).
2. **Plan the trip**: visa, accommodation, flights and ride-hailing via link-outs; transport guide; arrival checklist; attractions and coffee culture (Visit; D14).
3. **See what is on** and build a personal agenda in my time zone, with reminders and calendar export (INF-03, PER-04, PER-05).
4. **Get verified alerts and schedule changes** quickly, including safety information relayed from authorised sources (NOT-01/03, D29–D30).
5. **Find my way**: city and venue maps, offline, with accessible-route information (NAV-01…05, NAV-09, NAV-13).
6. **Follow remotely**: live-stream links, daily digest, explainers, key outcomes (MED-01, MED-04, PUB-04).
7. **Report and research** (journalists): press centre, verified releases, documents, data packs (MED-08, INF-11).
8. **Organise** (side-event organisers): submit and update listings; followers are notified of changes (EXH-02, EXH-03).
9. **Help others** (volunteers): offline FAQ and operational broadcasts (OPS-01/02/05).
10. **After COP32**: outcomes, recordings links, archive, follow-up; reuse for other events (PST-*, D5).
Detailed flows: `ux/user-flows.md` (F1–F16, V1–V7, O1–O3). Journeys: `ux/user-journeys.md`.

## 6. Competitive and benchmark findings
Sources: `research/benchmark-findings.md`, `research/gap-analysis.md` (desk research; hands-on tests pending).
- **Pattern:** official UNFCCC platforms are per-COP, badge-gated and typically split into an information app and a participation app (COP29, COP28). Host governments add a venue/logistics app (COP28 UAE). COP30's platform (UNFCCC + vendor) is English/Portuguese only; public access, offline, maps and accessibility are **not documented** — the capability matrix is mostly "?", which is itself a finding.
- **Event-app lessons:** queue/slot and crowd information solves real on-site pain but needs venue data (Expo 2020/2025); itineraries by interest and time work for public visitors (COP28 Green Zone); networking is over-featured for a public audience; mandatory, over-permissioned apps destroy trust (Hayya/Ehteraz 2022); apps survive an event only when re-purposed with a permanent owner (Expo City, Hayya, Paris je t'aime — `research/post-event-precedents.md`).
- **Local precedent:** the Second Africa Climate Summit (Addis, Sep 2025; 25,000+ participants, 300+ side events from 700+ applications) had no publicly documented participant app (absence not proven) — a test case and a pitch point.
- **Platforms such as Whova, EventMobi, Swapcard, Cvent:** useful patterns (offline-read scope, language breadth, open APIs, published accessibility artefacts) but vendor-controlled, template-based, no Amharic evidence, and white-label limits that conflict with government ownership.
- **Things deliberately not copied:** delegate negotiation workflows (D8), AI matchmaking, virtual booths, heavy community features needing moderation, mandatory accounts.

## 7. Product differentiation
1. **Public/host layer** the official delegate platform will not serve (complementary, not competing; D1).
2. **Addis city companion** with link-outs (D14) — accommodation, transport, safety, visa, local culture.
3. **Amharic-first quality** — correct rendering, search and (later) audio; no benchmark documents it.
4. **Remote follower experience** across time zones with plain-language explainers and daily digest.
5. **Trust and transparency by design** — minimal permissions, optional accounts, delete-my-data, published privacy/accessibility statements, verified-source labels.
6. **Safety-alert relay** with dual approval and CAP-aligned fields (D30) — only if the host agrees authorisers; otherwise disabled.
7. **Post-event archive and reusable event-agnostic core** (D5) giving a durable purpose.
Differentiation we do **not** claim: official status, data access, or delegate tooling.

## 8. Feature architecture
Catalogue: 156 items across 14 categories (`product/feature-catalog.md`); prioritised with a transparent weighted score (`product/mvp-prioritization.md`, `mvp-scoring.py`).
| Class | Count | Meaning |
|---|---|---|
| Must (MVP) | 73 | Demo 30 · Pilot 32 · Event 9 · Post-event 2; ~26 are editorial content, not engineering |
| Should | 41 | Event release if capacity |
| Could | 23 | Post-event / if capacity |
| Later | 16 | After COP32 |
| Not recommended | 3 | AI matchmaking, virtual booths, Amharic voice assistant (for now) |
Feature groups (prefix): INF information · PER personalisation · NAV navigation · NOT notifications · MED media · ENG engagement · NET networking · EXH exhibition · PUB public information · PST post-event · TRU trust & privacy · ACC accessibility · ADM admin · OPS volunteer/ops · DEM demo · F-xx founder "Visit" ideas · B-xx bold ideas.
Foundations that are Must regardless of score: guest mode, language switch, time zones, privacy notice, minimal permissions, delete/export data, unofficial disclaimer, source verification, consent, accessibility baseline, text size, Ethiopic font, emergency alerts, notification controls, bilingual CMS, approval workflow, emergency publishing, audit log, and the event-agnostic data model.
Fallback if capacity proves short: raise the Must threshold from ≥35 to ≥37 (D15).

## 9. MVP scope
**Releases (D15/D38):**
| Release | When | Scope |
|---|---|---|
| Demo | by 31 Dec 2026 (G1) | 30 Musts with clearly labelled sample data: Home EN/AM → COP32 overview + "Can I attend?" → sample programme/sessions → personal agenda with time zones → Visit (transport, accommodation and visa link-outs, ride-hailing, attractions, coffee culture) → news with verified-source labels → FAQ → COP explained / Africa & Ethiopia context → privacy notice + unofficial disclaimer → government dashboard mock |
| Pilot | from mid-Jun 2027 | ~32 Pilot Musts with real public content: notifications and controls, search, offline city pack, transport routes (open GTFS), explainers, press section, analytics, consent/deletion, accessibility baseline |
| Event | Sep–Oct 2027 | 9 Event Musts + agreed Shoulds: programme import and change alerts, venue maps and accessibility info, live-stream links, safety alerts relay, side-events directory, organiser portal, volunteer mode |
| Post-event | from Dec 2027 | Archive, outcomes and follow-up, recordings links |
**MVP definition:** the minimum product that serves COP32 users credibly before, during and after the conference. **Data rule:** any data-dependent Must has a manual fallback (spreadsheet import, staff entry, links), so nothing waits on an official feed.
**Explicitly out of MVP:** negotiation workflows, in-app bookings/payments/visa processing (D14), networking and messaging, user-generated content with moderation load, additional languages, SMS/Telegram channels (D9).

## 10. Future roadmap (summary)
Detail in `roadmap/development-roadmap.md` (R1–R15, gates, scenarios A–G). After the event: archive in "hibernation mode" (static, near-zero running cost); Addis Climate & Events Hub reuse; next-COP handover and white-label (M4); Wave-2 languages (Afaan Oromo, Tigrinya, French, Arabic) decided by demand data (D26); open data/API with owner consent; event-setup wizard (C13); accessibility upgrades (sign-language clips, captions); retainer-supported maintenance (M11).

## 11. Information architecture
Source: `ux/information-architecture.md` (D16 v2) · validation: `ux/ia-validation-kit.md`.
- **Primary navigation (5 tabs):** **Home · Programme · Map · Visit · Updates**. Header menu: Learn, Library, Archive, Me & Settings, Help, About. The brief's 16 sections were merged or demoted on evidence (Apple HIG warns against hiding content under "More"; Material suggests 3–5 destinations; Expo 2025 review lessons).
- **Global elements:** language switch (EN | አማ), search, notification bell, time-zone chip (Addis Ababa EAT + user time), offline/sync indicator, "Independent platform" label until endorsed.
- **State-aware Home:** pre-event (countdown, "Can I attend?", plan your trip) → during (now & next, agenda, alerts, map, live) → post-event (outcomes, recordings, archive); optional role selection tailors shortcuts, not access.
- **Content model:** **Event** is the root entity (`event_id` on every object); sessions, speakers, venues/rooms, POIs, guides, news, alerts, link-outs, documents, taxonomies and relationships defined in IA §4–5. Bilingual controlled vocabularies; Ge'ez-aware search; section filters; link-out registry with interstitial.
- **Validation pending:** tab labels (esp. "Visit") and Amharic labels via card sort/tree test (target ≥80% success on key tasks).

## 12. Major user journeys
| Journey | Persona | Core path | Release |
|---|---|---|---|
| J1 | Visitor (P1) | "Can I attend?" → visa link-out → stay → get around → arrival checklist → agenda | Demo→Event |
| J2 | Local Addis resident (P2) | What is this? → Amharic explainers → events I can join → map | Demo→Event |
| J3 | Journalist (P3) | Verified releases → press centre → documents → logistics | Event |
| J4 | Remote follower (P4) | What happened today in my time zone → daily digest → live link → outcomes | Event→Post |
| J5 | Organiser (P5) | Submit/update listing → approvals → change notices to followers | Event |
| J6 | Volunteer (P6) | Offline FAQ → operational broadcasts → escalate | Event |
Cross-journey rules (flows doc): never block on account creation; every screen has an offline/empty/error state; every link-out passes the interstitial; alerts are never the only channel for critical information.

## 13. Technical architecture
Source: `architecture/technical-architecture.md` (D17, D18), `architecture/spike-briefs.md`.
- **Principles:** content-as-versioned-snapshots on CDN with signed manifests; **two data planes** (public-content plane on a CDN; personal-data plane hosted in Ethiopia per PDPP Proclamation 1321/2024 Art. 22 — text consulted via a secondary reprint, **F: verify against the Negarit Gazette**); device-first personalisation; **modular monolith** (not microservices); contract-first (OpenAPI) APIs; graceful degradation (live API → cached snapshot → on-device pack → static emergency page); open standards/open source (portability for hand-over); event-agnostic from day one.
- **Components:** PostgreSQL; self-hosted open-source headless CMS (Payload/Strapi/Directus by S2); SSR web framework; Flutter **or** React Native by S1 (scored tie 47 vs 48/54); MapLibre + OSM vector tiles with PMTiles offline packs; own notification service over FCM/APNs (+ HMS evaluation); Postgres FTS + trigram + Ge'ez normaliser (S3); self-hosted aggregate analytics and error monitoring; containers on VMs in Ethiopian data centres with IaC and CI/CD.
- **Targets (to be validated by spikes and load tests):** event-period content availability 99.9%+ with graceful degradation; RPO ≤ 15 min, RTO ≤ 1 h; app ≤ 30 MB, Tier A bundle ≤ 3 MB, web critical ≤ 200 KB, offline map ≤ 40 MB, Android 8+, iOS parity (D27).
- **Open technical decisions:** S1 framework · S2 CMS and licence · S3 search · S4 offline maps · S5 hosting feasibility and price · S6 push delivery (incl. Huawei) · S7 snapshot sync. Results are due before 31 Dec 2026 (framework/CMS/search) and 31 Mar 2027 (hosting).

## 14. Data architecture
Sources: `architecture/data-integration-strategy.md` (D19, D20), `architecture/technical-architecture.md` §4–6.
- **Data classes:** public content (no personal data) · reference/open data (OSM, GTFS — licences recorded) · operational data · optional account data · device/notification data · organiser/volunteer data · device-local data (agenda, favourites, accessibility needs, role choice — never uploaded) · aggregate analytics · consent records.
- **Sensitive data:** not collected (health, biometrics, political opinion, minors' profiles). Location is used on-device only.
- **Retention proposals (confirm with counsel):** logs 90 days; inactive accounts 12 months; stale push tokens 90 days of failures; aggregates 24 months; audit log long-term; event archive permanent per event.
- **Provenance:** every record carries source, URL, licence, imported-at, last-verified, approver — this drives verified-source labels.
- **Import path:** staging → validation → diff → approval → snapshot build; CSV/ICS/JSON templates available to staff from day one.
- **Controller/processor roles:** to be settled before the pilot (D20); changes if the government owns the platform (DPO duty under Art. 40 — F).

## 15. Integration strategy
Principles (D19): manual fallback for every integration; adapters; no scraping without written permission; link-don't-copy; provenance and licence recorded; no personal data through integrations. Register status:
| Group | Examples | Status |
|---|---|---|
| Event data (E1–E10) | official programme, side events, venue plans, streams, documents, announcements, host alerts | **Unknown** — no API/feed found; manual or file-based path by default; request structured export from the Secretariat |
| Registration/accreditation (UNFCCC ORS) | — | **None** for third parties; link-out guidance only |
| City/travel (T-series) | e-visa portal, flights, hotels, ride-hailing, open GTFS, OSM | Link-outs and open data; no APIs needed for MVP |
| Platform services | FCM/APNs/HMS, email, CDN, analytics, monitoring | Own or self-hosted; vendor review gate for any SDK |
| Non-technical unlocks | host liaison, alert authorisers, signing-key custody, data-licence permission | Pending outreach (`outreach/`; nothing sent) |
The product must ship and work with **zero** external feeds.

## 16. Security and privacy
Source: `security/security-privacy-governance.md` (D21–D23).
- **Privacy by design (D21):** guest-first; device-first personal data; on-device location; no ad/tracking SDKs; self-hosted aggregate analytics; click-to-load embeds; no profiling of minors; bilingual privacy notice; deletion/export; consent management.
- **Security baseline (D22):** OWASP ASVS L2 for web/API, MASVS L1 plus selected L2 for mobile; secure SDLC, SBOM, dependency/container scanning; MFA for all staff, hardware keys for privileged roles; signed content manifests; dual-approved alerts; immutable audit log; encrypted backups; independent pentests **before pilot** (May–Jun 2027) **and before event** (Aug–Oct 2027); vulnerability disclosure policy; 72-hour breach process; INSA audit readiness.
- **Governance (D23):** owner/controller, operator/processor, DPO (advisor first; mandatory once government-owned), security lead, editorial lead; policy pack; compliance mapped to release gates (Demo: sample data only; Pilot: DPIA, privacy notice, hosting in Ethiopia live, pentest 1; Event: pentest 2, drills, DPO, accessibility audit).
- **Needs a lawyer:** meaning of "collected locally" for tourists; whether anonymous telemetry, CDN logs and push tokens count as personal data; cross-border rules for push services; media-law and hate-speech obligations (24-hour removal duty for platforms under Proclamation 1185/2020); volunteer classification.

## 17. Accessibility and localisation
Source: `requirements/accessibility-localization.md` (D25–D27).
- **Standard:** WCAG 2.2 AA (web) with equivalent mobile requirements; screen-reader support including Amharic (evidence for Amharic screen-reader quality is thin — test, don't assume); 200% text scaling; contrast; reduced motion; plain language; text alternatives for maps and images; accessibility statement; user testing with disability organisations and an independent audit before pilot and event.
- **Languages:** English + Amharic from day one with full content parity for Tier A; bundled Ethiopic font (D11) and real-device rendering/search/screen-reader tests; RTL-ready foundations; Wave-2 (Afaan Oromo, Tigrinya, French, Arabic) by demand data; no machine-only translation for official or safety content.
- **Time/dates:** UTC storage; event time and user time shown together; Ethiopian calendar display is a Should (pending validation).
- **Low-bandwidth and older devices:** low-data mode; offline Tier A; Android 8+ and iPhone parity (D27 amendment — international visitors drive iOS share).
- **Later:** Amharic audio (human-recorded), high-contrast theme, Ethiopian Sign Language clips, own captioning.

## 18. Admin platform
Source: `operations/admin-platform.md` (D31–D33).
- **Consoles:** C1 content · C2 programme · C3 alerts & notifications · C4 moderation · C5 organiser portal · C6 volunteer & operations · C7 venue & places · C8 link-out registry · C9 analytics · C10 users & roles · C11 system · C12 privacy & audit · C13 event setup · C14 operations dashboard.
- **Access model:** scoped roles, NIST-style RBAC with separation-of-duties rules SD1–SD10, just-in-time privileged access, hardware keys for super admin/technical admin/alert roles.
- **Event-time model:** ICS-inspired digital operations cell (incident lead, alert publisher + separate authoriser, duty editor, schedule/translation/moderation desks, technical on-call, DPO/security on call, host liaison); kill switches and degraded modes; runbooks and rehearsals before pilot and event.
- **Analytics:** aggregate-only with minimum thresholds; no individual views (D33).

## 19. Content strategy
Source: `content/editorial-system.md` (D28–D30).
- **Content is the product.** A self-hosted headless CMS with an editorial layer: states, quality gate, snapshot builder, scheduling/embargo, versioning, media management, multilingual workflow with translation status.
- **Four publishing tracks:** Standard (≤2 working days) · Fast (≤30 min from source confirmation; EN first, AM within service level) · Emergency/alerts (≤5 min target, 24/7 in the event window, templates in EN and AM) · Organiser submissions (≤1 working day; ≤2 hours during the event). Targets are proposals.
- **Alerts: relay, not originate** — from authorised sources only, dual approval, CAP-aligned fields, on-device geographic targeting, drills.
- **Editorial standards:** verified-source labels, corrections policy, neutrality, plain-language, sponsorship separation.
- **Inventory (planning estimates, hypotheses):** ~40 visit guides · ~40 explainers · ~120 FAQs · ~150 glossary terms · ~400 POIs · ~60 link-outs · 500–2,000+ sessions · 500–3,000 speakers · 50–200 pavilions · 5–30 news posts and 0–20 alerts per event day.

## 20. Analytics and KPIs
Targets marked TBD are intentionally not invented; set them after the Secretariat provides attendance and after the pilot. Source: `product/project-definition.md` §18, `operations/admin-platform.md` §8, `product/business-sustainability-model.md` §9.3.
| Area | KPI | Target |
|---|---|---|
| Credibility (D6 #1) | Official links/listings from COP32/UNFCCC/government channels | ≥1 by G4 |
| Credibility (D6 #2) | Written endorsement / MoU / pilot agreement | 1 by G2–G3 |
| Press (D6 #3) | Articles in recognised outlets | TBD |
| Adoption | Monthly active users, by platform, language, country; Ethiopian share | TBD |
| Quality | Crash-free rate; page load on throttled 3G/4G; accessibility audit pass; Amharic rendering defects | TBD (budgets in D27) |
| Operations | Alert time-to-publish; schedule-change latency; uptime; translation lag; corrections time | Service levels per editorial doc |
| Engagement | Return rate; alert opt-in; shares; agenda saves | TBD |
| Funding | Grants/sponsors/contracts secured vs plan | TBD |
| Sustainability | Cost per active user; non-grant share of costs; events configured after COP32 | ≥1 additional event |
Measurement rules: aggregate only; no ad IDs; documented in the privacy notice.

## 21. Team requirements
Source: `roadmap/team-requirements.md` (D40–D42). Functions only; no capacity assumptions.
- **Essential for Demo and Pilot (E):** product owner · project manager · business analyst · host/government liaison · funding/partnerships lead · finance · legal counsel · UX/UI design · accessibility specialist · content design · technical lead · Android, iOS, web and backend development · CMS/editorial tooling · DevOps/cloud · QA · security lead · independent pentesters and accessibility auditor (external) · disability-organisation partners · Amharic linguist/reviewer · content lead, writers, translators, glossary owner.
- **By Pilot/Event (P):** DPO/privacy lead · search/localisation engineering · basic analytics · maps/GIS · cultural reviewer · programme data manager · narration · community/outreach · support · trainers.
- **Event-time (V):** incident lead, alert publisher + authoriser, duty editors, schedule/translation/moderation desks, technical on-call, DPO/security on call, host liaison (roster arithmetic computed in R10 once official programme hours are known).
- **Governance (D42):** decision rights, RACI, working agreements, tools. **Engagement (D41):** engagement types, onboarding checklist, independence rules; **signed IP assignment, confidentiality and conflict declarations before anyone contributes code, design or content** (Copyright Proclamation 410/2004 gives IP to employers/commissioners by default and does not cover volunteers). Coverage register is private and blank in the repo.

## 22. Development roadmap
Source: `roadmap/development-roadmap.md` (D38, D39).
| Gate | Date | Test |
|---|---|---|
| G1 | 31 Dec 2026 | Company registered (or final stage); IP assignments signed; PPR framework drafted; spikes S1–S3 decided; demo complete; first host meeting requested/held |
| G2 | 31 Mar 2027 | Written support/pilot agreement or funding application submitted; ownership structure agreed in principle; PPR signed; hosting chosen; governance appointed |
| G3 | 31 May 2027 | Pilot Musts working on all three platforms; hosting live in Ethiopia; CI/CD and monitoring; pentest 1 booked; store accounts verified; Tier A content ready |
| G4 | 31 Aug 2027 | Pilot results reviewed; official-platform and host-data status known; scale/integrate/partner/pivot decision; event funding or contingency |
| G5 | 15 Oct 2027 | Pentest 2 closed; load/DDoS rehearsal passed; alert drills passed; on-call roster; store releases approved; DPIA and DPO; restore test; static fallback tested |
Phases R1–R15 (discovery → long-term platform) with objectives, deliverables, dependencies, functions, risks and exit criteria are in the roadmap file. Scenarios A–G (adoption, independent pilot, pivot, overlap, funding delay, date change, fallback ownership) pre-define responses.
**Critical path:** legal foundation → store/D-U-N-S accounts (Apple organisation enrolment typically 2–4 weeks; D-U-N-S ~30 days or more — F) → hosting selection → pentest bookings → host data/alert authorisation → translation lead times → funding. COP32 opening is assumed 8 Nov 2027 for planning only.

## 23. Budget considerations
**No numbers are asserted.** Cost scenarios (lean demo, pilot, full event) will be built when quotes arrive (hosting S5, translation, pentest, legal). Structure from `product/business-sustainability-model.md` §8:
- **Cost categories:** infrastructure (Ethiopian hosting primary + DR, CDN, storage, backups, monitoring) · messaging (push, email) · maps · stores and test devices (Android and iPhone matrix) · security and quality (two pentests, mobile tests, accessibility audit and user testing, load/DDoS rehearsal) · legal and compliance · content and language (professional translation, native review, narration, licences) · event-time operations · outreach and demo · contingency.
- **FX:** hosting, stores and services may be in foreign currency while revenue is in birr; contracts should state currency and indexation; budgets need an FX buffer.
- **Funding path (D34):** demo at zero cash through in-kind support (M12) → grants/pilot agreement by G2 → host/government service contract or donor funds for the pilot and event (M1/M2) → licence or handover terms (M5) → retainer (M11); startup-fund bridge (M13) and capped, screened sponsorship (M3) are conditional; **red lines:** no advertising, affiliate commissions, paid listings, data sales or paid visitor features.
- **Ownership (D35):** split ownership first (government owns the COP32 instance and content; Zega Tech keeps reusable core under licence), fallback to full assignment or open source, trigger decided at G2; Digital Public Goods readiness.
- **Team compensation (D37):** PPR is a 15% pool of net profit (net income after expenses); grant-funded work is compensated through the L1–L8 stack in business-model §7.5, routed through a government procurement contract where needed; counsel drafts all instruments.
- **Possible enablers (F, verify):** Ethiopian Startup Proclamation (reported 5% ICT-tender reservation, tax holiday, startup fund); Procurement Proclamation 1333/2024.

## 24. Risks
Consolidated top risks (full registers: `decisions/log.md`, and the risk tables in each phase file).
| # | Risk | Severity | Mitigation / owner |
|---|---|---|---|
| R1 | Official UNFCCC/host app overlaps the product | High | Complementary positioning; link/integrate; quarterly re-check (next Jan 2027) |
| R2 | No official data/API access | High | Manual import and link-outs; written data request to the Secretariat |
| R3 | Government does not engage, or chooses another vendor | High | Independent public pilot path; scenarios B/C/D |
| R4 | Funding gap; no budget | High | Gate G2/G3 funding tests; in-kind; scope fallback (Must ≥37) |
| R5 | Legal foundation incomplete (IP assignments, PPR, company registration) | High | Entry criteria for G1/G2 (D39); no public release before IP assignment |
| R6 | Data-localisation interpretation and hosting capability in Ethiopia | Medium-High | Counsel opinion; S5; two planes; CDN offload; static fallback |
| R7 | False or unauthorised alerts; no agreed authorisers | High (safety) | Relay-only, dual approval, drills; alerts stay disabled until agreed |
| R8 | Scope creep ("everything for everyone") | High | MVP classes; change control; D14 link-outs |
| R9 | Impersonation / implied endorsement | Medium | "Independent/unofficial" labelling until endorsed (D1) |
| R10 | Amharic rendering/search/screen-reader defects | Medium | D11, S1, S3, device matrix, native-speaker review |
| R11 | Peak traffic, DDoS, poor connectivity at venue | Medium | CDN-first reads, offline packs, load/DDoS rehearsal, degradation tiers |
| R12 | Store account lead times / rejections | Medium | Start organisation accounts in Q4 2026; 2–4 weeks buffer per release |
| R13 | Security incident or data breach | High impact | ASVS/MASVS, two pentests, 72-hour process, minimal data |
| R14 | Event postponed, relocated or dates/venue change | Low-Medium | Event-agnostic core; re-baseline from T; scenario C/F |
| R15 | Content errors or translation lag | Medium | Quality gate, corrections policy, translation desk |

## 25. Dependencies
| Dependency | Needed for | Owner | Fallback |
|---|---|---|---|
| Company registration, D-U-N-S | Store organisation accounts, contracts, PPR | Founder / counsel | Delay stores; web first |
| Signed IP assignments, confidentiality, PPR | G1/G2; any public release | Founder / counsel | Stop public release |
| Official dates, venue, accreditation windows | Event planning, content | Secretariat | Placeholders; "TBC" states |
| Programme/schedule, side-event and venue data | Programme, maps, alerts | Secretariat / venue / organisers | Manual import, organiser portal, link-outs |
| Alert authorisers and liaison; signing-key custody | Alerts relay | Host | Alerts disabled; informational updates only |
| Government SSO / hosting mandate | Admin plane, hosting | Host | Own identity provider; chosen Ethiopian data centre |
| Spikes S1–S7 | Stack decisions | Engineering functions | Native/KMP kept as fallback for mobile |
| Hosting quotes and SLA | Pilot infrastructure | Technical lead | Second provider; CDN-only public mode |
| Translation, review, narration | Tier A content | Content lead | Reduce Tier A set |
| External testers and disability organisations | Pentests, accessibility audit | Security / accessibility functions | Book at G2 |
| Funding or in-kind support | Pilot and event operations | Founder | Scaled-down event release |

## 26. Open questions
**For the founder / team**
1. Legal timeline: company registration date; counsel appointed; IP assignment signatories; PPR instrument.
2. Which funding routes will be pursued first, and who owns each application.
3. BA validation: interviews (Parts A–G), IA card sort / tree test, hands-on benchmark tests — when will results land?
4. Ownership fallback trigger (A or C) at G2.
**For the host (via Secretariat / Digital Task Force — outreach drafted, not sent)**
5. Official COP32 dates, venue, expected attendance, Green Zone concept and ticketing.
6. Will the host or UNFCCC run an official public/host app? Is a structured schedule export available?
7. Who staffs 24/7 alert authorisation; verification method; named liaison.
8. Government SSO? Who holds signing keys and where? Who are Event admin and Super admin after handover?
9. Operations-centre tooling integration; admin UI language; staff training; public status page.
10. Data-sharing and branding permissions; endorsement process.
**For counsel**
11. Data localisation scope (tourists, telemetry, CDN logs, push tokens); controller/processor roles; registration with the Authority; DPO timing.
12. Media-law, hate-speech and platform-liability duties; volunteer classification; government contract and IP structure.
**Research gaps:** primary-source verification of UNFCCC pages and Proclamation text; COP32 official pages when published; Huawei share; Ethiopian Sign Language tooling; operator zero-rating; language demand beyond Amharic.

## 27. Recommended next steps
**Within 2 weeks (by ~17 Oct 2026)**
1. Start the **legal foundation**: confirm company registration status, engage counsel, send the IP assignment template to every contributor, begin the PPR drafting (D37, D39).
2. Review the outreach pack (`docs/outreach/`) — **verify every name/title before sending**; do not claim registration numbers or endorsement — then send the Secretariat and Digital Task Force letters and short requests.
3. Start BA tasks: interview programme (`ux/interview-questionnaire.md`), IA validation (`ux/ia-validation-kit.md`), hands-on benchmark tests (`research/benchmark-test-plan.md`).
4. Start spikes S1–S7 (`architecture/spike-briefs.md`), beginning with S1–S3 (due before 31 Dec 2026).
5. Fill the private function-coverage register (`roadmap/team-requirements.md` §9).
**By G1 (31 Dec 2026)**
6. Clickable prototype (mid-Nov) and working demo on Android, iOS and web with labelled sample data; demo script and one-page overview.
7. Start D-U-N-S and store organisation accounts once registration completes.
8. Request meetings with the Secretariat and Task Force; keep the outreach log current.
9. First funding applications drafted; in-kind hosting/conversations opened.
**Standing**
10. Quarterly re-check of official COP32/UNFCCC announcements, procurement notices and third-party apps (next: **January 2027**).
11. Monthly roadmap and risk review; log every gate outcome in `decisions/log.md`.

---
## Appendix A — Decision register (D1–D43)
| Group | Decisions |
|---|---|
| Strategy & scope | D1 complementary/unofficial · D2 path to government ownership · D3 platforms/team inputs · D4 gates · D5 event-agnostic core · D6 success markers · D8 delegate workflows out of scope · D9 native Android + iOS + web, EN/AM default |
| Compensation & legal | D7 PPR · D20 controller/processor + IP before pilot · D35 DPG readiness / split ownership · D37 PPR framework · D39 IP assignments + PPR entry criteria |
| Product & UX | D10 early demo · D11 bundled Ethiopic font · D12 persona tiers · D13 founder brainstorm revisit · D14 integration-by-link · D15 prioritisation/releases · D16 navigation |
| Architecture & data | D17 reference architecture · D18 framework by spike · D19 integration principles |
| Security, accessibility, performance | D21 privacy by design · D22 security baseline · D23 governance · D25 WCAG 2.2 AA · D26 language waves · D27 performance/device targets (iOS parity) |
| Content & operations | D24 outreach pack · D28 CMS · D29 publishing tracks · D30 alert protocol · D31 consoles/roles · D32 operations cell · D33 aggregate analytics |
| Business | D34 revenue model · D36 sponsorship policy |
| Roadmap & team | D38 roadmap and gates · D40 function catalogue · D41 engagement/onboarding · D42 governance/RACI/roster |
| Blueprint | **D43 (approved 2026-10-03)** adopt this blueprint as the baseline |

## Appendix B — Document map
| Area | File |
|---|---|
| Decisions, open questions, risks | `decisions/log.md`, `decisions/confirmed-facts.md` |
| Project status | `roadmap/phase-status.md` |
| Research | `research/reality-check.md`, `cop32-context.md`, `ethiopia-digital-landscape.md`, `government-stakeholders.md`, `post-event-precedents.md`, `benchmark-findings.md`, `benchmark-test-plan.md`, `gap-analysis.md` |
| Product | `product/discovery-answers.md`, `project-definition.md`, `feature-catalog.md`, `mvp-prioritization.md`, `mvp-scoring.py`, `business-sustainability-model.md` |
| UX | `ux/personas.md`, `user-journeys.md`, `information-architecture.md`, `ia-validation-kit.md`, `user-flows.md`, `interview-questionnaire.md` |
| Architecture & security | `architecture/technical-architecture.md`, `spike-briefs.md`, `data-integration-strategy.md`, `security/security-privacy-governance.md` |
| Requirements, content, operations | `requirements/accessibility-localization.md`, `content/editorial-system.md`, `operations/admin-platform.md` |
| Roadmap & team | `roadmap/development-roadmap.md`, `roadmap/team-requirements.md` |
| Outreach (nothing sent) | `outreach/README.md`, `01-secretariat-letter.md`, `02-digital-task-force-letter.md`, `03-one-page-overview.md`, `04-short-requests.md` |
| Sources | `sources/source-register.md` |

## Appendix C — Maintenance of this blueprint
Re-baseline this file at each gate (G1–G5) and whenever any of these change: official COP32 dates/venue/attendance, an official app or host platform is announced, a spike decides the stack, the ownership option changes, or funding is confirmed. Record the change in `decisions/log.md` first, then update this file.
