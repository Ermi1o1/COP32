# Phase 2 — Project Definition (draft v1, 2026-10-01)
Status: DRAFT for user review. Facts cite docs/research/*; everything else is labelled Assumption (A) or Hypothesis (H).

## 1. Project background
- COP32 (UNFCCC) is planned for Addis Ababa, **November 2027**; exact dates/venue unpublished (reality-check.md). Attendance reported ~50,000 (unconfirmed); founder cites >80,000.
- UNFCCC historically provides a gated delegate event platform/app; host governments sometimes add their own (COP28). No official COP32 participant app announced as of 2026-10-01. A Digital/ICT/Utilities Task Force exists (infrastructure and operations focus).
- Zega Tech PLC (registration in progress) wants to build, pilot by mid-2027, and sell/hand over to the Ethiopian government, funded by grants/sponsors/government. Team is volunteer (3 developers, 1 BA, 1 PM, founder as product owner).

## 2. Problem statement
Around a once-in-a-generation climate conference in Ethiopia, information will be scattered across UNFCCC systems, government channels, partner sites and social media. Accredited delegates get a gated official platform; **the public, remote followers, journalists, Ethiopian citizens and non-accredited visitors have no single trusted, low-bandwidth, Amharic-capable place** to understand what COP32 is, what is happening, how to take part, and what came out of it (H — to validate with research in Phases 3–6).

## 3. Opportunity statement
Fill the gap the official delegate platform is unlikely to serve (H): a public-facing, bilingual, mobile-first and offline-tolerant companion that can later be adopted as Ethiopia's host-country layer, while leaving a reusable event platform as legacy (D5).

## 4. Product vision
*The trusted public window into COP32 for everyone — in Ethiopia and worldwide — before, during and after the conference.*

## 5. Product mission
Make COP32 understandable, accessible and participatory for people who are not in the negotiating rooms, and leave Ethiopia with a reusable digital platform for future events.

## 6. Strategic objectives
1. **Credibility:** secure an official link/listing and government endorsement (D6 #1, #2).
2. **Adoption path:** pilot by mid-2027, ready for hand-over to the government office (D2).
3. **Visibility:** earn press coverage and recognition (D6 #3).
4. **Sustainability:** secure grant/sponsor/government funding; fund PPR obligations (D7).
5. **Legacy:** event-agnostic core reusable after COP32 (D5).

## 7. Primary and secondary users
- **Primary (H):** general public/remote followers; Ethiopian residents and visitors; journalists/media; non-accredited and local participants.
- **Secondary:** NGOs/civil society, youth, researchers, businesses/investors, exhibitors/partners, international visitors, volunteers/staff.
- **Deprioritised (H):** accredited delegates' negotiation workflow (official platform's turf) — they may still use public parts.
- Persona work deferred to Phase 6.

## 8. User needs (hypotheses to validate)
Plain-language "what is COP32 / what's on / where / when"; trustworthy news and alerts; Amharic and English; works on low-end Android and weak networks; watch/follow sessions remotely; understand outcomes afterwards; local logistics (transport, accommodation, safety, accessibility); ways to take part (events, side events, volunteering); media resources and verified updates.

## 9. Stakeholder map
| Stakeholder | Role | Influence | Interest | Notes |
|---|---|---|---|---|
| COP32 Presidency Secretariat (CEO Negusu Aklilu*) | Runs conference; likely adopter/gatekeeper | Very high | Unknown | Priority target |
| Digital, ICT & Utilities Task Force (Ethio Telecom CEO briefing) | Digital infrastructure/ops | High | Unknown | Partner or competitor |
| President-Designate (Foreign Minister) | Presidency | High | — | Via Secretariat |
| PM-chaired National Steering Committee | Governance | High | — | Indirect |
| Ministry of Innovation & Technology | Digital policy | Medium | Unknown | Possible route in |
| UNFCCC (secretariat, Digital Participation Team) | Official platform owner | Very high | Unknown | Interop/listing; overlap risk |
| AU / UNECA (Addis) | Regional bodies, future events | Medium | Unknown | Post-COP reuse |
| Addis Chamber (Green Growth Centre) | Private sector | Medium | Unknown | Channel/sponsor |
| Funders (donors, climate funds, sponsors) | Money | High | Unknown | Phase 17 |
| Press/media; civil society; end users | Audience | Medium | High | Validation |
| Zega Tech team (volunteers) | Builders | — | High | PPR/IP agreements |
(*unverified)

## 10. Key use cases (high level)
Understand COP32; browse programme and events; follow live/recorded content; get verified alerts; plan a visit (venues, transport, accessibility); media/press access to resources; find side events/exhibitors; read outcomes and commitments afterwards; (later) reuse for another event. Detailed flows in Phase 10.

## 11. Core value propositions (H)
1. One trusted public entry point. 2. Amharic + English, low-bandwidth, offline-tolerant. 3. Works for people not in the room. 4. Government-ready: governance, privacy and content workflow suited to official adoption. 5. Reusable beyond COP32.

## 12. Requirements by period (high level; features come in Phase 7)
- **Pre-event (now–Nov 2027):** public info hub, countdown/FAQ, news, travel/visit guidance, volunteer/partner info, press kit, sign-up for updates; pilot mid-2027.
- **During (Nov 2027):** schedule and personal agenda (subject to data access), alerts, venue/transport info, live streams (subject to rights), side events, media section, Q&A/polls (maybe), high-traffic resilience.
- **Post-event:** recordings, outcomes, commitments tracker, archive, community/follow-up, handover or next-event reuse.

## 13. Assumptions
A1 No official participant app will fully cover the public/Amharic/low-bandwidth niche. A2 Official schedule/venue data will become obtainable, or can be covered by public sources. A3 Government is willing to adopt a third-party platform. A4 Volunteers stay available until funding. A5 >50k attendees; infrastructure must scale (figure unconfirmed). A6 Funding exists for climate-digital public goods. A7 Mobile-first Android audience in Ethiopia (to verify with stats).

## 14. Constraints
Zero budget; volunteer team; hard external deadline (Nov 2027); dependence on official data/access; no confirmed contacts; Ethiopian data-protection law (data localisation reportedly required — verify); must not imply official endorsement before granted; limited developer capacity for three platforms (consider web/PWA first — to decide in Phases 8/11).

## 15. Risks (top, with challenge notes)
| # | Risk | Severity | Note |
|---|---|---|---|
| R1 | Official UNFCCC/host apps overlap; project redundant | High | Niche focus; seek partnership |
| R2 | No access to official data/APIs | High | Public-source MVP; early outreach |
| R3 | No funding; volunteers leave | High | Gate G2; early grant applications |
| R4 | Government never engages / chooses another vendor | High | Dual path: independent public pilot |
| R5 | Data-localisation & privacy compliance | Medium-High | Phase 13; hosting choice |
| R6 | Traffic spikes / poor connectivity | Medium | Offline-first, CDN, static content |
| R7 | Impersonation/misinformation if "official-looking" | Medium | Clear unofficial labelling until endorsed |
| R8 | Scope creep from "everything for everyone" | High | MVP discipline (Phase 8) |
| R9 | IP/ownership disputes with volunteers; PPR terms | High | Signed IP assignment + legal PPR draft |
| R10 | COP32 postponed/relocated | Low-Medium | Event-agnostic core; stop trigger in gates |

**PPR flags (D7):** (a) "up to 15% of net profit" — total pool or per person? (b) grant/government funding is usually restricted-use and may not count as distributable "profit"; define what triggers payment; (c) a profit-participation right is a contract needing Ethiopian legal drafting; (d) if the government takes ownership, define buy-out/royalty so PPR is still honoured. Not legal advice — engage a lawyer.

## 16. Open questions
Company registration date; IP assignment status; PPR terms; target office contact; official COP32 dates/venue/attendance; whether host will run its own app; hosting preference/data residency; payment/legal form of government deal; who owns content rights for streams.

## 17. Success criteria
Per D6 in priority order: (1) official link/listing from COP32/UNFCCC/government channel; (2) written government endorsement/MoU/pilot agreement; (3) press coverage from recognised outlets. Plus: pilot live by mid-2027 (gate G3); funding secured (G2); platform reused or handed over post-COP32.

## 18. Potential KPIs (targets to be set after Phase 3/6; numbers below are placeholders, not forecasts)
| Area | KPI | Target |
|---|---|---|
| Credibility | Official links/listings secured | ≥1 by G4 |
| Credibility | Written endorsement/MoU | 1 by G2–G3 |
| Press | Articles in recognised outlets | TBD |
| Adoption | Monthly active users, countries reached, Ethiopian share | TBD |
| Quality | App crash-free rate; page load on 3G; accessibility audit pass | TBD |
| Engagement | Return rate; alerts opt-in; content shares | TBD |
| Funding | Grants/sponsors secured vs plan | TBD |
| Legacy | Events configured on the platform after COP32 | ≥1 |

## Challenges to the founder's assumptions
1. ">80k" unverified; plan for a range. 2. "Everyone" is not a target user — Phase 6/8 must choose a sharp primary audience. 3. "Recognized globally" depends on gatekeepers outside your control; hence D6 and outreach in parallel with building. 4. Three platforms at once with volunteers is risky — evaluate PWA-first. 5. The government/UNFCCC may also see this as competing; the pitch should lead with complementarity.
