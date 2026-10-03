# Phase 17 — Business & Sustainability Model (draft v1, 2026-10-03)
Purpose: decide how the project is funded, owned and sustained — before, during and after COP32 — without compromising its public-interest purpose. No budget exists today (volunteer team, deferred pay through profit participation rights — D7). This document gives options, a transparent evaluation and recommendations; **numbers are placeholders until quotes and funder feedback exist**, and legal, tax and procurement points need counsel.
Inputs: project definition, discovery answers (D2, D6, D7), post-event precedents, architecture (D17), data strategy (D19/D20), privacy/security (D21–D23), editorial system (neutrality, D14, D29), admin platform, outreach pack.

## 1. Starting position and constraints
| Item | Position |
|---|---|
| Intended path | Independent pilot → pitch to the dedicated government office → government adoption/ownership and funding (D2) |
| Intended owner | Government (founder's stated intent). Open: what "owns" means for code vs content vs data vs brand (§5) |
| Funding sources named by founder | Sponsorship, grants/funds, government funding (D2) |
| Team compensation | Volunteers; deferred pay via Profit Participation Right up to 15% of net profit when the product is sold or funded (D7) |
| Success markers | Official link/listing, government endorsement, press coverage (D6) |
| Principles | Public interest first; neutrality (D14); privacy (D21); no tracking/ads; continuity after COP32 (D5) |
| Cash today | None; costs before revenue (hosting tests, legal, pentests, devices, translation, narration) |
| Gates | G1 31 Dec 2026 (demo) · G2 31 Mar 2027 (support/funding signal) · G3 31 May 2027 (MVP) · G4 31 Aug 2027 |

## 2. Funding and market landscape (researched; secondary sources; verify before relying)
### 2.1 Ethiopia-specific enablers
- **Startup law (2025):** Ethiopia enacted a Startup Proclamation (approved by Parliament in mid-2025). As reported by tech media and law-firm commentary: a startup is a tech-based company under about three years old with annual gross revenue below ETB 5 million; **certified startups** receive a five-year corporate tax holiday, customs/tax exemptions on imported equipment and software, reduced withholding on angel investment; a **2-billion-birr Ethiopian Startup Fund** for grants and soft loans; **5% of public ICT tenders reserved for startups**; state-owned enterprises such as Ethio Telecom and the Commercial Bank must pilot at least one proof-of-concept with a startup each fiscal year; mechanisms for subcontracting startups in foreign-firm bids. → **Action:** check whether Zega Tech PLC can be certified (eligibility, timing, ownership rules, PLC form). *Verify the exact proclamation number, definitions and procedures with counsel; secondary reports differ.*
- **Public procurement law:** Federal Public Procurement and Property Administration Proclamation **No. 1333/2024** replaced the 2009 law; it covers open tendering, restricted tendering and direct procurement and extends to state-owned commercial entities. Thresholds and conditions for direct procurement or limited bidding for digital services were **not found** → ask counsel and the procuring entity.
- **State digital programmes and partners:** the World Bank has supported Ethiopia's digital foundations (three projects, about US$630M IDA reported) and national digital ID (Fayda; >36M registered reported). These show donor appetite for digital public infrastructure but are **not** small-grant sources for an app; they indicate an ecosystem and possible subcontracting/partnership routes.
- **Local precedent for small-grant funding:** the Addis transit mapping (AddisMapTransit) was funded through the DigitalTransport4Africa Innovation Challenge — evidence that small innovation challenges fund local data/transport projects.
### 2.2 Digital public goods (DPG) route
The Digital Public Goods Alliance Standard has nine indicators: SDG relevance, approved open licence, clear ownership, platform independence, documentation, non-PII data extraction in open formats, adherence to privacy and applicable law, open standards, and do-no-harm by design. Donors have pledged hundreds of millions of dollars for DPGs (reported at UNGA 2022: Gates Foundation, Norway, Germany, EU initiative). **Implication:** a DPG listing could (a) give recognition (supporting D6), (b) open donor doors, but (c) requires an open licence and clear ownership, which interacts with the licensing decision (§5.3).
### 2.3 Sponsorship norms at COPs
Corporate sponsorship at COPs is contested: reports found 18 of 20 COP27 sponsors with fossil-fuel links, while COP26 barred fossil-fuel sponsors; COP30 saw controversy over a PR contractor with fossil-fuel clients. **Implication:** any sponsor of this platform will be scrutinised; a credible screening policy is essential (§6).
### 2.4 Competitor pricing anchors (low reliability, vendor/comparison blogs)
Per-event platforms start around US$600+ per event (Swapcard); annual enterprise subscriptions around US$18–20k per year (Bizzabo, Cvent). These show what organisers pay for generic event apps but are **not** price benchmarks for a government-owned public-information platform.
### 2.4 Gaps
No specific open grant calls with deadlines were found; UNFCCC/host funding rules for national digital platforms are unknown; donors' appetite for a conference-specific app (vs reusable platform) is untested.

## 3. Revenue and funding models evaluated
### 3.1 Method
Seven criteria scored 1–3 (3 = better for the project): **PA** purpose alignment (×3), **FC** funding certainty/likelihood (×3), **NT** neutrality/trust risk — 3 means low risk (×3), **PS** post-COP32 sustainability (×2), **LG** legal/regulatory simplicity (×1), **TC** time to cash relative to gates (×2), **SC** scalability/reuse (×1). Maximum 45. Scores are structured judgement. **Red lines override the score** (§3.3).
### 3.2 Results
| ID | Model | PA | FC | NT | PS | LG | TC | SC | Score /45 | Class |
|---|---|---|---|---|---|---|---|---|---|---|
| M1 | Government/host service contract (build + operate COP32 platform) | 3 | 2 | 3 | 2 | 2 | 2 | 2 | 36 | Primary |
| M11 | Managed-service retainer after COP32 (hosting, support, archive, updates) | 3 | 2 | 3 | 3 | 2 | 1 | 2 | 36 | Primary |
| M5 | Licence or sale of the platform to the government (one-time + maintenance) | 3 | 2 | 3 | 2 | 2 | 2 | 1 | 35 | Primary |
| M2 | Donor/grant-funded public good, government-owned, operated under agreement | 3 | 2 | 3 | 2 | 2 | 1 | 2 | 34 | Primary |
| M4 | Platform-as-a-service / white-label for other events | 2 | 1 | 3 | 3 | 2 | 1 | 3 | 31 | Secondary |
| M12 | In-kind partnerships (hosting credits, data/network support, venues, translation) | 3 | 2 | 2 | 1 | 2 | 2 | 1 | 30 | Secondary |
| M6 | Affiliate/referral commissions (flights, hotels, rides) | 1 | 2 | 1 | 2 | 2 | 3 | 2 | 26 | Not recommended (red line) |
| M9 | Advertising | 1 | 2 | 1 | 2 | 2 | 3 | 2 | 26 | Not recommended (red line) |
| M3 | Screened sponsorship / partner support | 2 | 2 | 1 | 1 | 2 | 2 | 2 | 25 | Conditional / bridge |
| M13 | Startup-fund grants / soft loans (bridge) | 2 | 1 | 3 | 1 | 2 | 1 | 1 | 25 | Conditional / bridge |
| M10 | Paid app / premium visitor features | 1 | 1 | 2 | 1 | 2 | 2 | 2 | 22 | Not recommended (red line) |
| M7 | Paid featured listings / premium organiser tools | 1 | 1 | 1 | 2 | 2 | 2 | 2 | 21 | Not recommended (red line) |
| M8 | Selling data or audience insights | 1 | 1 | 1 | 2 | 1 | 1 | 2 | 18 | Not recommended (red line) |
### 3.3 Red lines (not recommended for COP32 regardless of score)
M6 affiliate/referral commissions — conflicts with the neutral link-out principle (D14) and could look like paid steering of visitors; M7 paid featured listings — distorts discovery, undermines trust; M8 selling data/insights — contradicts D21; M9 advertising — trust and privacy; M10 paid app/premium visitor features — contradicts the public-information purpose. (Affiliate or paid placements might be reconsidered *after* COP32 only with owner approval, full disclosure and separation from editorial lists.)

### 3.4 Reading the results
- **Primary:** M1 (host/government service contract), M11 (managed-service retainer, which also carries the post-event life), M5 (licence/sale to the government), M2 (donor/grant-funded government-owned public good). These are compatible and can combine: e.g., a grant (M2) pays for the pilot and event deployment under a service agreement (M1), followed by a retainer (M11).
- **Secondary:** M4 (white-label/PaaS for other events) is the main route to sustainability beyond COP32; M12 in-kind support (hosting credits, data/network support, translation, venues) matters a great deal while cash is zero.
- **Conditional/bridge:** M3 sponsorship only with a strict screening policy; M13 startup-fund grants/soft loans as a bridge if eligibility is confirmed.

## 4. Recommended model (proposal D34)
**Core:** a government-owned (COP32 instance) public-information platform funded by a combination of (1) a host/government service agreement or donor grant for build-and-operate (M1/M2), (2) licence/handover terms (M5), and (3) a post-event managed-service retainer (M11); with in-kind partnerships (M12) to cover costs before revenue; startup-fund and innovation-challenge grants as a bridge (M13); and a **product line** (M4) that reuses the platform for other events in Addis and later COPs.
**Sponsorship (M3):** optional and capped; never in editorial lists, never fossil-fuel-linked, never for safety content (policy in §6).
**What is deliberately not done:** advertising, affiliate commissions, paid featuring, data sales, paid visitor features.

### 4.1 Staged funding path against gates
| Stage | Aim | Likely sources | Notes |
|---|---|---|---|
| Now–G1 (to 31 Dec 2026) | Demo at zero cash | In-kind (M12), founders/volunteers, startup-programme support | Cheap tools only; no spend before obligations are clear |
| G1–G2 (to 31 Mar 2027) | Funding/endorsement signal | Grant applications submitted; pilot agreement; startup certification; innovation challenges | Written support letters are as valuable as cash |
| G2–G3 (to 31 May 2027) | Fund the pilot | Grants (M2), host agreement (M1), in-kind hosting | Hosting in Ethiopia, pentest 1, legal |
| G3–Event | Fund event operations | Service contract/grant, limited sponsorship (M3) | Operations cell, translation, narration, pentest 2, rehearsals |
| Post-event | Keep the archive alive; reuse | Retainer (M11), white-label clients (M4) | "Hibernation mode": archive as static content on a CDN (near-zero running cost) |

## 5. Ownership, IP and licensing
### 5.1 What can be owned (separately)
| Asset | Notes |
|---|---|
| Platform source code (core, event-agnostic) | The reusable "engine" |
| COP32-specific configuration, content, translations, imagery | Created for the host/event |
| Brand and domain | "Independent platform" brand now; official branding only with permission |
| Data (content data, aggregated analytics, personal data) | Personal data: controller/processor roles (D20) |
| Open data derived from OSM/GTFS | Licences apply (ODbL attribution, etc.) |
### 5.2 Options for code ownership/licence
| Option | Description | Pros | Cons |
|---|---|---|---|
| A. Full assignment to government | Government owns all IP, including the engine | Satisfies "government owns it" | Zega Tech cannot reuse for other clients unless licensed back; weakens M4/M11 |
| B. **Split ownership (recommended proposal)** | Zega Tech keeps ownership of the **core platform** and grants the government a perpetual, irrevocable, royalty-free licence (with source access and escrow); the government owns the **COP32 instance**: content, data, branding, configuration | Government has control and exit rights; Zega Tech can reuse the engine and sustain the product | Needs clear definitions of "core" vs "instance"; more complex contract |
| C. Open-source release (e.g., a public-sector copyleft licence such as EUPL or AGPL, or a permissive licence such as Apache 2.0) | Code published; government and others can use | Strong trust, DPG eligibility, reuse, anti-lock-in; donors favour it | Revenue shifts to services (hosting, support, customisation); competitors can reuse; licence choice matters (copyleft closes the SaaS loophole under AGPL; EUPL is designed for public administrations) |
| D. Proprietary with source escrow | Zega Tech keeps proprietary rights; escrow protects the owner | Protects commercial position | Weaker trust, no DPG listing |
**Chain of title (non-negotiable):** every contributor, including volunteers, must **assign** their work to Zega Tech PLC (or the chosen holder) in writing *before* work proceeds, with moral-rights waivers where applicable and clean treatment of third-party/open-source components (SBOM and licence register). Without this, any ownership structure fails.
### 5.3 Recommendation (proposal D35)
Prepare the platform to be **DPG-ready** regardless (open standards, documented, exportable data, privacy by design, clear ownership statement); choose between **B (split ownership)** and **C (open-source)** by gate **G2**, after learning what the government and funders require. If donor money is conditional on open licensing, C with a services revenue model is likely; if the government wants exclusive control, B is the compromise. **Founder decision required** — tension with D2 ("owner should be the government") is flagged: under B the government owns the instance and holds permanent usage rights but not the reusable engine.
### 5.3a Founder decision (2026-10-03)
**First option: Option B (split ownership).** Zega Tech keeps the core platform; the government owns the COP32 instance (content, data, branding, configuration) and receives a perpetual, irrevocable, royalty-free licence to the platform with source access (and escrow). **Fallbacks, in order of acceptance:** **Option A** (full assignment to the government) and **Option C** (open-source release). The platform is built DPG-ready so that C remains cheap to execute if a funder or the government requires it. Triggers for moving to a fallback are decided at gate G2 (e.g., a donor makes open licensing a condition, or the government requires full assignment as a condition of adoption). Contract drafting must therefore define "Core Platform" versus "COP32 Instance" precisely, keep a clean chain of title, and include a pre-agreed conversion clause so that moving to A or C does not require renegotiating everything.

### 5.4 Contracts to prepare (with counsel)
Contributor IP assignment and confidentiality agreements; PPR agreements (§7); service agreement with the government (scope, SLAs, data protection roles, IP, exit/handover, liability, payment terms, currency); grant agreements (restricted-use rules, audit rights); sponsor agreements (independence clauses); partner/in-kind agreements (hosting, translation); data-processing agreements (D20); terms of use and privacy notice.

## 6. Sponsorship and independence policy (proposal D36)
1. **Independence:** sponsors have no influence over editorial content, programme data, alerts, or link-out lists; disclosure is public.
2. **Eligibility screening:** exclude companies whose core business is fossil-fuel extraction or whose recent conduct conflicts with the goals of the Paris Agreement (criteria to be defined and published); exclude tobacco, arms, gambling, and companies with serious human-rights or corruption findings; screen for conflicts with the host and UNFCCC rules; the owner has veto.
3. **Form of recognition:** a "Supporters" page with logos; no ads, no sponsored content in news or alerts; no data sharing; sponsor placement never alters rankings.
4. **Caps:** no single sponsor above a stated share of the budget (e.g., 25%; to be set); multi-year dependency avoided.
5. **Safety content never sponsored.**
6. **Contract clauses:** termination rights if sponsor conduct becomes controversial; refund terms; no exclusivity.
7. **Transparency:** publish sponsor list and amounts received in the annual report.
8. **Government alignment:** coordinate with host sponsorship rules for COP32.

## 7. Profit Participation Right (PPR) — structure and issues (proposal D37; needs a lawyer)
Founder's concept: volunteers hold a right to **up to 15% of net profit** when the product is sold or funded (D7).
### 7.1 Issues to resolve
1. **Pool or per-person?** Is "up to 15%" the total pool for all contributors, with shares by contribution? 2. **Definition of "net profit":** after direct costs, overhead allocation, taxes and reserves? Is it per product line (COP32 platform) or company-wide? 3. **What counts as revenue/trigger:** contract payments, licence/sale proceeds, grants? **Grant funds are usually restricted-use and may not be distributable as profit**; many donors forbid profit distribution. 4. **Timing:** when payments are made; vesting; what happens if someone leaves. 5. **Cap and floor:** is there a minimum payment (e.g., a share of contract revenue)? 6. **Tax and company law:** treatment in Ethiopian law, withholding, VAT, accounting. 7. **Interaction with ownership:** if the government owns the instance, which proceeds exist to share? 8. **Dispute resolution** and audit rights for participants.
### 7.2 Structural options
| Option | Mechanism | Fit |
|---|---|---|
| P1 Profit pool | A percentage of audited net profit from defined revenue streams goes to a pool shared by agreed point allocation | Simple, but profit may be zero or deferred under grants |
| P2 Revenue-linked success fee | A percentage of **contract revenue** from the government/host (not grants) after delivery milestones | More predictable; must not exceed what contracts allow |
| P3 Hybrid | A modest success fee on contract revenue + a share of net profit from the reusable product line (M4/M11) | Aligns with long-term sustainability |
| P4 Milestone bonuses | Fixed amounts paid on milestones (G2 signed agreement, G3 MVP, event delivery) funded from specific payments | Clear, easy to explain; no accounting complexity |
### 7.3 Illustrative waterfall (units are arbitrary, for explanation only; not a forecast)
Revenue from a service contract: 100 → direct cash costs (hosting, legal, pentests, translation, narration, devices): 40 → company overhead and reserves: 15 → **net profit before tax: 45** → tax (rate to be confirmed by counsel) → net profit after tax: X. Under P1 with the 15% pool applied to net profit: pool = 15% × X (before/after tax must be defined). Under P2: pool = a defined % of 100 regardless of costs (paid only if cash allows). The same 100 financed by a restricted grant may allow **no** profit distribution at all — which is why a hybrid or milestone-based approach may be safer.
### 7.4 Recommendation
Put a clear written PPR framework in place **before** significant work continues: define pool vs per-person, profit definition per product line, exclusions (restricted grants), payment timing, and exit rules; consider P3 or P4 for predictability. Engage counsel (also covers IP assignment).

### 7.5 Founder decisions on the PPR (2026-10-03) and grant-compatible team compensation
**Decisions recorded:** (1) The **15% is a pool** (not per person). (2) **Net profit = net income after expenses** (revenue minus all expenses; whether taxes are deducted before or after the pool is calculated must be fixed in the written agreement). (3) For **grant-funded work**, "we'll find a way" — Claude's proposal below.
**Problem restated:** donors usually prohibit profit distribution to grantees and may not pay for work done before the award (pre-award costs are typically ineligible). A PPR computed only on profit would pay nothing on grant-funded work.
**Proposed compensation stack (use several layers; none depends on grants distributing profit):**
| Layer | What | Source | Notes |
|---|---|---|---|
| L1 Budgeted personnel/consultancy costs | Grant or contract budgets include **paid roles** for delivery (staff time, consultancy fees) on a forward-looking basis | Grant or service contract | Standard in most grants; rates must be reasonable and documented; works from the award date |
| L2 Contract milestone fees | Fixed payments on milestones (agreement signed, MVP, pilot, event delivery, handover) | Government/host service contract (M1) | Predictable; not "profit"; must be written into the contract price |
| L3 Indirect-cost / overhead recovery | Many grants allow an overhead rate that goes to the organisation (unrestricted) | Grants (M2) | Becomes company income and therefore enters the PPR calculation |
| L4 Route donor money through a procurement contract | Donor funds the government, which procures a service from Zega Tech; a **commercial contract may include a margin** (unlike a pure grant to an organisation) | Government as contracting party | Needs counsel and the donor's rules; keeps profit lawful |
| L5 PPR pool (15% of net income) | Share of net income from **unrestricted** revenue (contracts, retainers, white-label, licence fees, overhead recovery) | Company | The long-term upside; fed by M1, M4, M5, M11 |
| L6 Deferred-pay ledger | Record contributions (roles, months, outputs) and agree that a defined share of the **first unrestricted receipts** repays recorded contributions before the PPR split (a "recoup then share" order) | Company | Must be written; not retroactively chargeable to a grant |
| L7 Equity or phantom-share options | Shares or share-linked rights in Zega Tech PLC as long-term recognition | Company | Requires company-law and tax advice (Ethiopian PLC rules) |
| L8 Non-cash benefits | References, certificates, training, access to events and opportunities | — | Supplementary only |
**Waterfall (order of payments from unrestricted revenue; to be fixed by counsel):** revenue → direct costs → taxes (if applicable before distribution) → reserves (a minimum reserve) → recoup of the deferred-pay ledger (L6) → **PPR pool: 15% of the remaining net income** → balance retained in the company.
**Allocation rules (draft):** a points system by role, responsibility and verified contribution (time, deliverables), recorded in a ledger reviewed quarterly; vesting (for example 12–24 months of contribution, with partial vesting for earlier leavers); good/bad leaver terms; transparency (annual statement of net income and pool calculation); audit right for a participant representative; dispute resolution.
**Cash-flow caution:** the PPR is only as large as unrestricted net income; for the pilot and event the grant/contract budgets (L1, L2) should include paid roles so that delivery does not depend on a future profit.
**Legal checks needed:** classification of PPR under Ethiopian law (contractual profit-sharing right vs employment remuneration vs shares), tax treatment for recipients and the company, whether the 2025 startup rules or incentives affect distributions, and enforceability.

## 8. Costs and budget structure (no numbers yet)
### 8.1 Cost categories
| Category | Items | Driver |
|---|---|---|
| Infrastructure | Ethiopian hosting (primary + DR), CDN, object storage, backups, monitoring tools, domains, certificates | Provider quotes (spike S5), traffic |
| Messaging | Push services (FCM/APNs/HMS — typically free to use), email delivery, SMS (later) | Volume |
| Maps | Self-hosted tiles (storage/bandwidth) or commercial tiles | Zoom levels, coverage |
| Stores & devices | Google Play one-time developer fee and Apple Developer Program annual fee (amounts to verify), test devices (Android and iPhone matrix), assistive-technology tools | Fixed |
| Security & quality | Two independent pentests, mobile app security tests, accessibility audit and user testing with disability organisations, load/DDoS rehearsal | Scope, vendor |
| Legal & compliance | Counsel (IP, PPR, data protection, media law, contracts), registration with the authority, DPO (when owned by government), insurance | Hours |
| Content & language | Professional translation (EN/AM), native review, narration/audio, photography/licences, design assets, glossary | Volume |
| Operations | Event-time desks (alerts, content, translation, moderation, support), on-call, training, rehearsals, travel | Event duration |
| Outreach & demo | Demo events, printing, travel to meetings | Activity |
| Contingency | Reserve for overruns/FX | % of total |
### 8.2 FX and payment risks
Costs for hosting, stores and services may be in foreign currency while revenue is in birr; Ethiopia moved to a market-based FX regime in 2024 — exchange-rate volatility is a budget risk. Contracts should state currency and indexation; grant budgets should include FX buffers.
### 8.3 Next step
Phase 18/20 will produce cost scenarios (lean demo, pilot, full event) once quotes arrive (hosting S5, translation, pentest, legal). No cost estimates are asserted here.

## 9. Post-COP32 sustainability
### 9.1 Why continue (from precedents)
Event-specific apps usually die; those that survive are repurposed and have a permanent owner and funding (Hayya, Expo City, Paris je t'aime). A reusable platform with an archive and a recurring event calendar for Addis has a durable purpose.
### 9.2 Sustainability levers
1. **Hibernation mode:** after the event, switch the archive to static content on a CDN with minimal services — near-zero running cost; keeps URLs and outcomes alive.
2. **Addis Climate & Events Hub:** reuse the platform for AU/UNECA and other Addis conferences; city guide stays useful for visitors (tourism partners, neutral).
3. **Next COP handover:** offer the platform (or its approach) to the next African Group host or the next COP presidency; white-label (M4) with local branding.
4. **Managed-service retainer** (M11) for hosting, updates, security patches and content support.
5. **Learning and education packs:** classroom packs, climate explainers maintained with universities/NGOs (grant-fundable).
6. **Open data:** publishing open schedule/archives can attract research and civic partners (with owner consent).
### 9.3 Sustainability indicators
Cost per monthly active user; share of costs covered by non-grant revenue; renewal rate of retainer/white-label clients; archive page views a year after the event; number of events running on the platform; independent review of platform health.

## 10. Risks
| # | Risk | Mitigation |
|---|---|---|
| B1 | No funding/endorsement by G2 | Pivot options: public pilot funded in-kind; reduced scope; other events (M4) |
| B2 | Government payment delays or procurement complexity | Early procurement guidance; milestone payments; startup certification route; written agreements |
| B3 | Grant restrictions conflict with PPR | Treat grants as restricted; use contract revenue/milestones for PPR |
| B4 | Sponsor controversy damages credibility | Screening policy; caps; veto; transparency |
| B5 | IP ambiguity (volunteers, open-source components) | Written assignments before work; SBOM; licence register |
| B6 | Ownership structure unacceptable to government or donors | Decide B vs C at G2; DPG-ready design |
| B7 | FX volatility and foreign-currency costs | Budget buffers; currency clauses; local hosting |
| B8 | Dependency on one funder or one client | Mix of revenues; caps |
| B9 | Funding arrives too late for the pilot | Gates; in-kind support; low-cost stack |
| B10 | Reputational risk of seeming commercial | Red lines (§3.3); public independence policy |
| B11 | Legal/tax misstep (PPR, startup label, VAT) | Counsel; accounting set-up |
| B12 | Post-event cost without revenue | Hibernation mode; retainer; reuse |

## 11. Open questions
1. Founder preference on ownership: Option B (split) vs C (open-source) vs A? 2. Is Zega Tech PLC eligible for startup certification and when is registration completed? 3. Which entity will procure/fund (Secretariat, ministry, task force) and by which procurement route? 4. Are there grant calls (UNDP, UNECA, AU, EU, bilateral, climate funds, DPG donors) suitable for a conference-linked public platform? 5. Government expectations for pricing and payment terms. 6. Any funds already promised in kind (hosting, translation)? 7. How should PPR share allocation be decided (points by role/contribution)? 8. Sponsorship red lines acceptable to the host and the founder. 9. Insurance and liability expectations.

## 12. Proposed decisions
- **D34:** adopt the recommended revenue model (§4): primary M1/M2/M5/M11, secondary M4/M12, conditional M3/M13; red lines on M6–M10.
- **D35:** make the platform DPG-ready; decide the ownership/licence structure (split ownership vs open-source) by gate G2; require written IP assignments from all contributors before further work.
- **D36:** adopt the sponsorship and independence policy (§6).
- **D37:** adopt the PPR framework approach (§7) — define pool/profit/exclusions in writing with counsel before significant further work; consider P3/P4 structures.
