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

| D14 (PROPOSED) | Integration-by-link: no in-app bookings/payments/visa processing; link to official portals first, then neutral, owner-approved provider lists; no personal data to third parties by default. | Founder's all-in-one vision with link-outs; neutrality for a government-adopted app; scope control | Build bookings in-app; affiliate-first | Keeps scope feasible; Phase 13/17 inputs | Proposed |
| D15 (PROPOSED) | Prioritisation method and releases: 8 weighted criteria, thresholds Must≥35, foundation overrides; releases Demo (Dec 2026) / Pilot (Jun 2027) / Event (Oct 2027) / Post-event. Fallback: raise Must to ≥37 if Phase 18 shows capacity shortfall. | Transparent, re-scorable (docs/product/mvp-scoring.py) | Arbitrary ranking; RICE | Defines MVP; 72 Musts flagged as capacity risk | Proposed |

## Open questions
- Government target (researched; hypothesis ranking in research/government-stakeholders.md; no contact yet)
- Founder to complete idea F-08 (coffee culture sentence was cut off).
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
