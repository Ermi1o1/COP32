# Decisions Log
| # | Decision | Reason | Alternatives considered | Impact | Status |
|---|---|---|---|---|---|
| D1 | Proceed as a **complementary, unofficial** COP32 platform (Phase 0 Option 1). Focus on public/non-accredited users, Ethiopia-local content, Amharic, low-bandwidth/offline, post-event archive. Re-check for official platform announcements quarterly. | No official COP32 platform announced as of 2026-10-01, but UNFCCC reliably ships its own delegate platform (COP28–30), so an "official" niche is likely taken. | 2: partner with host Digital/ICT Task Force first; 3: pause/pivot | Do not duplicate the gated delegate agenda/networking core; do not claim official status/branding | Decided 2026-10-01 |

| D2 | Intended path: independent pilot -> pitch to dedicated government office for adoption/ownership and funding (grant/sponsor/government). Government is intended long-term owner. | Founder's stated goal (discovery Q1, Q9). | Fully independent commercial product; purely volunteer/unofficial | Shapes Phase 17 (funding) and governance; branding must avoid implying endorsement before granted | Decided 2026-10-01 |
| D3 | Platforms: Android + iOS + web. Languages: English + Amharic first. Pilot target mid-2027. Team: 3 devs, 1 BA, 1 PM, founder as PO. No budget. | Discovery answers | — | Inputs for Phases 11, 14, 18, 19 (Claude to challenge: all-three-platform scope with 3 devs and no budget; consider web/PWA-first in Phase 8/11) | Recorded 2026-10-01 |

| D4 | Go/no-go gates: G1 31 Dec 2026, G2 31 Mar 2027, G3 31 May 2027, G4 31 Aug 2027 (see below). | Gives dated decision points and funding/endorsement tests. | No fixed gates | Approved by user 2026-10-01 | Decided |
| D5 | Light event-agnostic core: 'event' is a first-class entity in the data model/config; no multi-tenant/billing/white-label features before MVP. | Cheap now, expensive to retrofit; supports post-COP32 reuse and funder logic. | COP32-only build; full multi-tenant platform | Approved by user 2026-10-01 | Decided |

| D6 | Success markers for 'recognized globally' (priority order): (1) link/listing from an official COP32/UNFCCC/government channel; (2) formal government endorsement; (3) press coverage. User counts/country reach are secondary. | User choice 2026-10-01 | Downloads/users as primary | KPIs in project-definition.md; outreach plan targets these three first | Decided |
| D7 | Team compensation: volunteers; deferred pay via Profit Participation Right (PPR) of up to 15% of net profit when product is sold or funded. | User 2026-10-01 | — | Needs legal drafting (see flags in project-definition.md §15) | Recorded; legal review pending |

| D8 | Delegates' negotiation workflows (delegation management, closed negotiation schedules, draft-text tracking, bilateral booking, badge-gated areas) are out of scope; delegates may use public features; integration/linking possible later; revisit in Phase 5. | Owned by UNFCCC platform, confidential data, duplication, security/legal risk, credibility | Build delegate tools | Narrows MVP; reduces risk | Decided 2026-10-01 |

| D9 | **Platforms and languages (finalized by user 2026-10-01):** native Android and iOS apps plus a web app; English and Amharic are the default languages from day one. Rationale: likely users are mostly in Addis Ababa and connected, plus international users; native apps needed for demo/pitch. Engineering practice (not a separate product): keep payloads light and cache content for patchy connectivity. Not pursued now: SMS/USSD/Telegram channels (revisit if usage data shows need). Technology stack not yet chosen (Phase 11). | User judgement that target users are connected and Addis-based; Phase 3 data shows national connectivity is low but Addis/urban and international users are well connected | Web/PWA-first only; native-first without web | 3 deliverables with 3 developers: accepted by user (team capable); risk R8/R3 stays on register; G1 demo gate 31 Dec 2026 will test capacity | Decided 2026-10-01 |

| D10 (INPUT) | A visual demo/prototype is needed early so officials can 'see how it looks and works' (supports gate G1). Format (clickable prototype vs partial build) to be decided in Phase 10/18, no UI design before then per project rules. | User need for pitch | — | Informs roadmap | Noted |

| D11 | Bundle an Ethiopic font in the apps and web app, and make real-device Amharic testing (rendering, search, screen reader) a QA requirement. | Android OEM fonts may lack Ge'ez glyphs (tofu boxes) | Rely on system fonts | Small effort; avoids a visible failure in the demo | Approved by user 2026-10-01 |

| D12 | Persona priority tiers: Tier 1 P1 visitor, P2 local attendee, P3 journalist, P4 remote follower, P5 side-event organiser/exhibitor; Tier 1-ops P6 volunteer, P7 staff/admin; Tier 2 P8–P13; Tier 3 delegates/government reps (served via public layer). | Phase 6 desk research, benchmarks, D8 | Equal weight for all 15 | Focuses IA/MVP; BA validation pending | Approved by user 2026-10-01 |
| D13 | At Phase 7/8, run a founder brainstorm on additional features (including founder's suggestions) and revisit features parked as 'possibly unnecessary' after user validation; **Claude must ask the founder at that point**. | Founder request 2026-10-01 | — | Scheduled agenda item | Decided |

| D14 | Integration-by-link: no in-app bookings/payments/visa processing; link to official portals first, then neutral, owner-approved provider lists; no personal data to third parties by default. | Founder's all-in-one vision with link-outs; neutrality for a government-adopted app; scope control | Build bookings in-app; affiliate-first | Keeps scope feasible; Phase 13/17 inputs | Approved by user 2026-10-01 |
| D15 | Prioritisation method and releases: 8 weighted criteria, thresholds Must≥35, foundation overrides; releases Demo (Dec 2026) / Pilot (Jun 2027) / Event (Oct 2027) / Post-event. Fallback: raise Must to ≥37 if Phase 18 shows capacity shortfall. | Transparent, re-scorable (docs/product/mvp-scoring.py) | Arbitrary ranking; RICE | Defines MVP; 73 Musts flagged as capacity risk | Approved by user 2026-10-01 |

| D16 (v2) | Primary navigation = 5 labelled tabs: **Home, Programme, Map, Visit, Updates**; low-frequency items (Learn, Library, Archive, Me & Settings, Help, About) in a header menu; Home leads with personal/time-critical items; Visit is a service grid of guides and link-outs (label 'Visit' kept — targets visitors, founder 2026-10-01); Event is root entity; link-out interstitial. | Second pass: Apple HIG warns against 'More' hiding content; Material 3–5 destinations; EXPO 2025 review lessons; tourism & super-app patterns; Telebirr clutter critiques | v1 (Home, Programme, Map, Visit, More); brief's 16 sections | Defines structure for flows and demo | Approved by user 2026-10-01 |

| D17 | Reference architecture: two data planes (public-content via CDN snapshots; personal-data hosted in Ethiopia), modular monolith, PostgreSQL, self-hosted open-source headless CMS, device-first personalisation, OSM/MapLibre maps, own notification service, self-hosted analytics, signed content manifests, event-agnostic model. | NFRs N1–N14; PDPP Art. 22; Hayya privacy lesson; traffic profile | BaaS cloud (Firebase/Supabase); microservices; single global cloud | Shapes hosting, privacy and delivery | Approved by user 2026-10-03 |
| D18 | Mobile framework (Flutter vs React Native) decided by spike S1; web uses an SSR framework; CMS and search decided by spikes S2/S3 (scored comparison ties A/B: 47 vs 48 of 54). | Evidence cannot separate options; empirical test on real devices | Choose by preference | Avoids premature lock-in | Approved by user 2026-10-03; spike briefs issued (docs/architecture/spike-briefs.md) |

| D19 | Integration principles: manual fallback for every integration; adapters; staging→validation→approval→publish; provenance and licence on every record; link-don't-copy; no scraping without written permission; no personal data through integrations. | Brief rule 'never assume an API exists'; Phase 12 research | Direct dependency on feeds | Keeps product shippable without external data | Approved by user 2026-10-03 |
| D20 | Resolve data controller/processor roles and content/IP ownership (incl. volunteer agreements, PPR) before the pilot. | PDPP roles; government ownership (D2) | Defer to launch | Inputs to Phases 13 and 17 | Approved by user 2026-10-03 |

| D21 | Privacy-by-design commitments: guest-first; device-first personal data (incl. accessibility needs and role choice never uploaded); on-device location; no ad/tracking SDKs; self-hosted aggregate analytics; click-to-load embeds; no profiling of minors. | PDPP; Hayya lesson; journalist/activist safety; data minimisation | Convenience-first data collection | Shapes architecture, UX, store labels | Approved by user 2026-10-03 |
| D22 | Security baseline: ASVS L2 (web/API), MASVS L1 + selected L2 (mobile), secure SDLC, signed manifests, dual-approved alerts, independent pentests before pilot and event, INSA audit-readiness, vulnerability disclosure policy, 72-hour incident process. | Standards research; government ownership; Art. 43 | Ad hoc security | Test and audit gates in roadmap | Approved by user 2026-10-03 |
| D23 | Governance structure and policy pack; release-gate compliance table; engage legal counsel for items needing legal advice before pilot. | Phase 13 | Defer governance to launch | Roles: owner/controller, operator/processor, DPO, security lead, editorial lead | Approved by user 2026-10-03 |
| D24 | Outreach pack drafted (docs/outreach/); nothing sent; founder reviews before sending. | Founder request 2026-10-03 | — | Starts structured data requests and partnership approach | Drafted |

| D25 (PROPOSED) | Accessibility target WCAG 2.2 AA (web) + equivalent for apps (supersedes '2.1 AA' wording); testing plan incl. user testing with disability organisations and independent audits before pilot and event. | WCAG 2.2 is a superset; EN 301 549 updates; evidence on Amharic screen-reader uncertainty | WCAG 2.1 AA | Test plan and release blockers | Proposed |
| D26 (PROPOSED) | Language waves: EN+AM MVP; Wave-2 Tier A essentials (Afaan Oromo, Tigrinya, French, Arabic) decided by demand data; RTL-ready foundations; no machine-only translation for official/safety content. | Language research; audience; cost | Add many languages at launch | Content ops and layout engine | Proposed |
| D27 (PROPOSED) | Performance/device targets: app ≤30 MB, Tier A bundle ≤3 MB, web critical ≤200 KB, offline map ≤40 MB (to validate), Android 8+ target, low-data mode and offline Tier A in MVP. | Connectivity and device data | No budgets | Engineering acceptance criteria | Proposed |

## Open questions
- Government target (researched; hypothesis ranking in research/government-stakeholders.md; no contact yet)
- PPR terms: is 15% a total pool or per person? How is 'net profit' defined for grant income? Are IP-assignment agreements signed?
- Zega Tech PLC registration status; team availability/paid or volunteer; funding runway.
- Definition/metrics of 'recognized globally' and a go/no-go date.
- Should the platform be event-agnostic from day 1 (post-COP32 reuse)? See research/post-event-precedents.md.
## Research gaps
- See docs/research/reality-check.md §F.
## Risks
- R1: Official UNFCCC/host apps overlap core features (high).
- R2: No official data/API access (high).
- R4: No budget; team salaries unfunded until grant/contract (high).
- R5: Ethiopian data-localisation requirement may constrain hosting (verify).
- R3: Branding/impersonation risk of "unofficial" app (must not imply endorsement).
## Re-check schedule
- Quarterly re-check of official COP32 digital announcements (next: 2027-01).
