# Phase 18 — Development Roadmap (draft v1, 2026-10-03)
Covers the 15 roadmap phases requested in the brief, with objectives, deliverables, dependencies, required functions, risks and exit criteria. Built around the gates (G1–G4, D4) and release plan (Demo / Pilot / Event / Post-event, D15). **Team size and capacity are not assumed or discussed here** (founder instruction); "required functions" lists roles the work needs.
Anchor facts: planning documents Phases 0–17 completed 2026-10-01…03. COP32 reported for **November 2027** (8–19 Nov reported, **unconfirmed**); host data, venue and accreditation details unpublished. All dates below use "T" = COP32 opening (assumed 8 Nov 2027 for planning only; shift everything if the official dates differ).

## 1. Timeline overview
```mermaid
gantt
  title COP32 platform roadmap (planning dates; COP32 opening assumed 2027-11-08)
  dateFormat YYYY-MM-DD
  axisFormat %b %y
  section Foundations
  Legal set-up (company, IP assignments, PPR, contracts)   :crit, a1, 2026-10-05, 2026-12-20
  Outreach to Secretariat / Task Force / partners          :a2, 2026-10-05, 2027-03-31
  Funding applications and in-kind agreements              :a3, 2026-10-15, 2027-04-30
  section Discovery to Prototype
  Research validation (BA interviews, hands-on tests)      :b1, 2026-10-05, 2026-11-20
  Spikes S1-S7 and stack decisions                         :crit, b2, 2026-10-12, 2026-12-10
  UI design system + clickable prototype                   :b3, 2026-10-19, 2026-12-05
  Demo build (sample data)                                 :crit, b4, 2026-11-09, 2026-12-28
  Gate G1                                                  :milestone, g1, 2026-12-31, 0d
  section MVP build
  Infrastructure, CMS, pipelines                           :c1, 2027-01-04, 2027-03-31
  Pilot feature build (Must set for Pilot)                 :crit, c2, 2027-01-11, 2027-05-28
  Content production (EN/AM Tier A)                        :c3, 2027-01-11, 2027-06-15
  Gate G2                                                  :milestone, g2, 2027-03-31, 0d
  Gate G3                                                  :milestone, g3, 2027-05-31, 0d
  section Test and secure
  Test cycles, device matrix, accessibility audit          :d1, 2027-04-05, 2027-06-30
  Pentest 1 + remediation                                  :crit, d2, 2027-05-17, 2027-06-30
  section Pilot
  Store accounts, submissions, closed testing              :e0, 2027-03-01, 2027-06-15
  Public-information pilot                                 :crit, e1, 2027-06-15, 2027-08-31
  Gate G4                                                  :milestone, g4, 2027-08-31, 0d
  section Event release
  Event features (Should set), programme import, alerts    :f1, 2027-07-05, 2027-09-30
  Pentest 2, load/DDoS rehearsal, drills                   :crit, f2, 2027-08-16, 2027-10-08
  Launch / store release and soft launch                   :f3, 2027-09-27, 2027-10-22
  Gate G5 go-live readiness                                :milestone, g5, 2027-10-15, 0d
  section Event and after
  Event operations                                         :crit, h1, 2027-10-25, 2027-11-30
  Post-event: archive, outcomes, retention sweep           :h2, 2027-12-01, 2028-03-31
  Long-term platform (reuse, retainer, next events)        :h3, 2028-01-10, 2028-12-31
```

## 2. Gates (decision points)
| Gate | Date | Entry criteria (all must be assessed) | If not met |
|---|---|---|---|
| **G1** | 31 Dec 2026 | Company registered (or final stage); **IP assignments signed by all contributors**; PPR framework drafted with counsel; spike results S1–S3 decided or scheduled; demo (≥10 flows, EN/AM, Android/iOS/web, sample data) complete; first meeting requested/held with Secretariat or Task Force; outreach log up to date | Continue building a public-facing pilot with no government dependency; fix legal foundation first (do not proceed with public releases without IP assignment) |
| **G2** | 31 Mar 2027 | Written support, pilot agreement or funding application submitted; ownership structure agreed in principle (Option B first; fallback trigger assessed — D35); PPR signed; hosting provider chosen (S5); stack decided; privacy/security governance appointed (DPO or advisor) | Reduce to lightweight public companion; seek in-kind hosting; pitch other events (M4) |
| **G3** | 31 May 2027 | Pilot-set Must features working on all three platforms; hosting live in Ethiopia; CI/CD and monitoring in place; pentest 1 booked; store accounts verified; pilot content (Tier A EN/AM) ≥ agreed coverage | Delay pilot start; cut non-core Must items per D15 fallback (threshold ≥37) |
| **G4** | 31 Aug 2027 | Pilot results reviewed (usage by platform, accessibility findings, performance, feedback); status of official platforms and host data known; decide scale / integrate / partner / pivot; event funding secured or contingency plan chosen | Scaled-down event release (core information + alerts relay only) or integration with official layer |
| **G5** (new, proposed) | 15 Oct 2027 | Pentest 2 critical/high issues closed; load/DDoS rehearsal passed; alert drills passed with authorisers; on-call roster; store releases approved; privacy notice and DPIA complete; DPO appointed; backups restored in test; static fallback tested | Postpone feature releases, keep core release; do not launch alerts relay without drill sign-off |

## 3. Roadmap phases
For each phase: **Objectives · Deliverables · Dependencies · Required functions · Risks · Exit criteria.**

### R1 — Discovery (Done: 2026-10-01…03)
- **Objectives:** reality check, structured questions, project definition.
- **Deliverables:** reality-check.md, discovery-answers.md, project-definition.md, decisions D1–D7.
- **Dependencies:** founder input.
- **Functions:** product owner, researcher.
- **Risks:** official platform appears later (re-check quarterly).
- **Exit criteria:** founder-approved definition and decisions. **Met.**

### R2 — Research (Done at first/second-pass level; continuous validation)
- **Objectives:** COP32 context, benchmarks, gap analysis, personas, stakeholder research.
- **Deliverables:** cop32-context, benchmark-findings, gap-analysis, personas, user-journeys, government-stakeholders, post-event-precedents; **to run:** BA interviews, IA validation (card sort/tree test), hands-on benchmark tests.
- **Dependencies:** BA, access to participants, test devices.
- **Functions:** BA, researcher, product owner.
- **Risks:** desk research outdated; UNFCCC pages unavailable; interviews biased.
- **Exit criteria:** interview/IA/test summaries filed (Oct–Nov 2026); quarterly re-check logged (next Jan 2027).

### R3 — Requirements (mostly done; finalise by Dec 2026)
- **Objectives:** lock the MVP backlog and acceptance criteria per release.
- **Deliverables:** feature catalog, MVP prioritisation, NFRs (architecture §1.2), accessibility/localisation requirements, security/privacy requirements, editorial/admin requirements; **to produce:** release backlog with user stories and acceptance criteria per feature ID, traceability matrix.
- **Dependencies:** BA validation; spike outcomes; host data availability.
- **Functions:** BA, product owner, PM.
- **Risks:** scope creep; unknown host data.
- **Exit criteria:** backlog baselined for Demo and Pilot; each Must has acceptance criteria; change control active.

### R4 — UX (flows done; validation and content design in progress)
- **Objectives:** validated information architecture and flows; content design rules.
- **Deliverables:** IA v2, user flows (F1–F16, V1–V7, O1–O3), IA validation results, content design guidelines (tone, plain-language, EN/AM patterns), accessibility patterns.
- **Dependencies:** R2 validation; Amharic label review by native speakers.
- **Functions:** UX designer, BA, content designer, accessibility specialist.
- **Risks:** Amharic labels misunderstood; tab naming ("Visit") fails with locals.
- **Exit criteria:** tree-test targets met (success ≥80% on key tasks); label changes applied; flows signed off for Demo and Pilot.

### R5 — UI (Oct–Dec 2026 for demo; continues)
- **Objectives:** visual design system and screens for Android, iOS and web with bilingual typography.
- **Deliverables:** design tokens (colour, type incl. Ethiopic font, spacing, motion), component library (light/dark, 200% text), screens for demo flows, accessibility annotations, icon set, empty/error/offline states, notification templates, admin console wireframes.
- **Dependencies:** R4 outputs; S1 outcome (framework affects component implementation); brand decisions (independent brand until endorsed, D1).
- **Functions:** UI designer, accessibility specialist, native-speaker reviewer.
- **Risks:** Ge'ez typography problems; inconsistent iOS/Android patterns; branding conflicts with host.
- **Exit criteria:** design system v1 and demo screens approved; contrast and target-size checks pass; Amharic review done.

### R6 — Architecture (documents done; spikes and set-up pending)
- **Objectives:** confirm stack and infrastructure; prepare environments.
- **Deliverables:** technical-architecture, data strategy, spike briefs (done); **to produce:** spike results S1–S7, ADRs (architecture decision records), infrastructure-as-code, environments (dev/staging/prod/training), CI/CD, monitoring, backup plan, signing key management.
- **Dependencies:** hosting quotes; legal opinion on data localisation; CDN account.
- **Functions:** architect/tech lead, backend, mobile, web, DevOps, security.
- **Risks:** Ethiopian hosting capability; framework tie; CMS licence issues.
- **Exit criteria:** stack decided (D18) by 31 Dec 2026; hosting chosen by G2; staging mirrors production by G3.

### R7 — Prototype / Demo (Oct–Dec 2026) — **G1**
- **Objectives:** show officials how it looks and works; validate interaction patterns.
- **Deliverables:** clickable design prototype (mid-Nov), working demo apps on Android, iOS and web with sample data (clearly labelled), demo script, government dashboard mock, short video, one-page overview; outreach pack updated.
- **Dependencies:** R4–R5; sample dataset; demo CMS and spreadsheet import; Task Force/Secretariat meeting.
- **Functions:** product owner, designers, mobile/web/backend engineers, content editor, BA.
- **Risks:** demo mistaken for an official product; performance issues; missing Amharic glyphs; scope overreach.
- **Exit criteria:** demo runs on test matrix (≥4 devices per platform where possible); EN/AM content; 10 demo flows; no critical accessibility or Ge'ez rendering defects; "independent, sample data" labelling; demo delivered to at least one government/partner audience.

### R8 — MVP development (Jan–May 2027) — **G2, G3**
- **Objectives:** build Pilot-set Must features (D15) on all three platforms; foundations (privacy, security, accessibility, i18n).
- **Deliverables:** apps (Android, iOS), web app, backend, CMS with editorial workflow, snapshot builder with signed manifests, search, offline packs, maps, notification service, link-out registry, programme import with diff, admin consoles (C1, C2, C3 basic, C8, C10–C12), analytics (aggregate), release candidates.
- **Dependencies:** R6 decisions; design system; content pipeline; hosting; legal/DPO foundations.
- **Functions:** mobile, web, backend, DevOps, QA, designers, content/translation.
- **Risks:** Must set too large (fallback threshold ≥37); late official data; vendor/licence problems; integration unknowns.
- **Exit criteria (G3):** all Pilot-set Musts pass acceptance tests; performance budgets met (D27); zero open critical defects; offline Tier A works; EN/AM parity for Tier A.

### R9 — Testing (Apr–Jun 2027 and continuous)
- **Objectives:** quality across devices, languages, networks and assistive technologies.
- **Deliverables:** test plan, automated suites (unit/integration/E2E), device matrix runs (Android incl. low-end, iPhone models), Amharic rendering/search tests, accessibility audit (independent) and user testing with disability organisations, performance/load tests, content QA, regression packs.
- **Dependencies:** test devices; stable builds; partners (ENAD and other disability organisations).
- **Functions:** QA, accessibility specialist, engineers, BA.
- **Risks:** device fragmentation; late accessibility findings; weak test coverage in Amharic.
- **Exit criteria:** release criteria met (no critical/high defects; WCAG 2.2 AA failures fixed or documented with plan); performance budgets met; accessibility statement drafted.

### R10 — Security testing (pentest 1: May–Jun 2027; pentest 2: Aug–Oct 2027)
- **Objectives:** verify controls (ASVS L2, MASVS L1/L2 parts), admin/alert plane, supply chain.
- **Deliverables:** threat models, independent pentest reports (web/API/mobile/admin), remediation log, retest evidence, vulnerability disclosure policy, incident response plan, DPIA, privacy notice, INSA-readiness pack, alert-spoofing test results.
- **Dependencies:** external testers; stable pilot build; staging environment; legal/DPO input.
- **Functions:** security lead (internal or external), independent testers, DevOps, DPO/advisor.
- **Risks:** late critical findings; scope gaps (organiser portal); regulator requirements unknown.
- **Exit criteria:** no open critical/high findings before pilot and before event (G5); retest passed; incident drill held.

### R11 — Pilot (Jun–Aug 2027) — **G4**
- **Objectives:** real public use with public information; measure; learn; prove credibility.
- **Deliverables:** live apps (store tracks), web app, pilot content (Tier A + Visit + Learn), analytics dashboard, feedback channels, press/outreach materials, pilot report, updated risk register, host data integrations tested (if available), privacy and accessibility statements.
- **Dependencies:** store verification (see §5), hosting live, content ready, DPIA/privacy complete, host consent for any official content, quarterly re-check of official platforms.
- **Functions:** product owner, engineers (support), content/translation, community/outreach, QA, DPO/advisor.
- **Risks:** low adoption; negative press; official platform overlap; unofficial status confusion; data-protection complaints.
- **Exit criteria (G4):** pilot report with usage by platform, languages, countries; accessibility and performance results; at least one link or endorsement step toward D6 goals or a documented plan; event go/no-go and funding status.

### R12 — Launch / Event release (Sep–Oct 2027) — **G5**
- **Objectives:** release event-ready platform ahead of COP32 with alerts relay, programme, maps, live content links.
- **Deliverables:** store releases (staged rollout), web release, programme import from host data (or manual), alert console and drills, organiser portal, volunteer console, operations dashboard, status page, runbooks, training of staff and authorisers, press kit, launch communications.
- **Dependencies:** official programme/venue data; host liaison for alerts; legal clearances; pentest 2; load tests; store review times.
- **Functions:** all engineering functions, content and translation desks, operations lead, security/DPO, outreach.
- **Risks:** late official data; store rejection; capacity problems; alert authorisation not agreed (then alerts remain disabled).
- **Exit criteria (G5):** readiness checklist signed (see G5 criteria).

### R13 — Event operations (late Oct–Nov 2027)
- **Objectives:** run the platform and the digital operations cell during the event.
- **Deliverables:** daily operations reports, change logs, alerts log, incident log, corrections log, user support tickets, live analytics, daily digest, press support.
- **Dependencies:** duty rosters, host liaison, on-call arrangements, change freeze except emergency fixes.
- **Functions:** operations cell functions (incident lead, duty editors, schedule desk, alert desk, translation desk, moderation/support desk, technical desk, DPO/security on call).
- **Risks:** false alerts; traffic spikes; DDoS; content errors; fatigue; host data delays.
- **Exit criteria:** event completed with incident reports closed; service-level report (alert time-to-publish, schedule-change latency, uptime); corrections reviewed.

### R14 — Post-event (Dec 2027–Mar 2028)
- **Objectives:** preserve outcomes; archive; retention and privacy sweeps; handover or hibernation; lessons learned.
- **Deliverables:** archive snapshot (frozen, stable URLs), outcomes and commitments pages, recordings links, post-event report (usage, satisfaction, accessibility, press), retention sweep report, security review, handover package (documentation, runbooks, keys, access list), financial report (feeds PPR calculation), lessons-learned workshop, hibernation mode or retainer start.
- **Dependencies:** owner decisions; official outcomes; contracts for retainer.
- **Functions:** product owner, content, engineering, DPO, finance/legal.
- **Risks:** loss of momentum; data retention failures; missing handover.
- **Exit criteria:** archive published; retention jobs verified; handover accepted or hibernation configured; PPR/net-income statement prepared; lessons documented.

### R15 — Long-term platform (2028+)
- **Objectives:** reuse for other events (Addis hub, AU/UNECA, next COP), maintain archive, evolve platform; sustainability (M4, M11).
- **Deliverables:** event-setup wizard (C13), white-label theming, open data/API (later, with owner consent), additional languages (Wave 2), accessibility improvements, annual security reviews, roadmap updates.
- **Dependencies:** ownership structure (D35), retainer/partner contracts, funding.
- **Functions:** product, engineering, content, partnerships, DPO/security.
- **Risks:** funding gaps; neglected maintenance; technical debt.
- **Exit criteria (rolling):** at least one additional event running or contracted; annual health review passed; cost per active user within target.

## 4. Parallel workstreams (cross-phase)
| Stream | Key activities | Owner function |
|---|---|---|
| A. Governance & legal | Company registration, contributor IP assignments, PPR agreement, ownership structure (B first), service/grant/sponsor contract templates, DPO/registration, terms & privacy | Founder + legal counsel |
| B. Partnerships & outreach | Secretariat/Task Force meetings, data requests, alert-authorisation protocol, Ethio Telecom, tourism/transport authorities, UN/UNFCCC links, press | Founder + outreach lead |
| C. Funding & sustainability | Grant applications, startup certification, in-kind agreements, sponsor screening, budget model, retainer proposals | Founder + finance |
| D. Product & UX | Backlog, validation, design system | Product owner, BA, designers |
| E. Engineering | Build, CI/CD, infrastructure | Engineering functions |
| F. Content & localisation | Glossary, style guide, Tier A content, translation, narration | Content lead, translators |
| G. Quality, accessibility & security | Test, audits, pentests | QA/security functions |
| H. Operations readiness | Runbooks, rosters, drills, training | Operations lead |

## 5. Critical path and lead times (verify early)
1. **Legal foundation** (company registration, IP assignments, PPR) → gates all external work. Start immediately.
2. **Store accounts:** organisation accounts typically need a legal entity and a D-U-N-S number; reported durations: D-U-N-S can take around 30 days or more to obtain; Google identity checks a few days up to about five; Apple organisation enrollment typically 2–4 weeks. **Start in Q4 2026** once registration completes. Google Play's closed-testing rule (12 testers for 14 days) applies to *personal* accounts created after 13 Nov 2023 — avoid by using an **organisation account**; confirm current rules. Budget at least 2–4 weeks for store reviews and fixes before each release.
3. **Hosting selection (S5)** → pilot infrastructure by March 2027.
4. **Host data and alerts authorisation** → Event release; if late, the manual import and link-out fallbacks apply.
5. **Translation and narration** (lead time for professional review) → Tier A content by pilot.
6. **Pentest booking** (testers' availability) → book at G2 for May–June and Aug–Oct windows.
7. **Accessibility audit and user testing** with disability organisations → schedule at G2.
8. **Official COP32 dates, venue, accreditation windows** → adjust T and event plan.
9. **Funding or in-kind support** for pilot and event operations → G2/G4 milestones.

## 6. Release plan by roadmap phase
| Release | When | Scope (from D15) | Audience |
|---|---|---|---|
| Demo | by 31 Dec 2026 | 30 demo Must items with sample data | Government, partners, funders |
| Pilot | from mid-Jun 2027 | Pilot-set Musts (~32 features) with real public content | Public (stores + web), press |
| Event | from early Oct 2027 (soft launch), full by T-14 days | Event-set Musts and agreed Shoulds (programme, maps, alerts relay, live links, organiser portal) | Visitors, locals, journalists, remote followers |
| Post-event | from Dec 2027 | Archive, outcomes, recordings links | Public |
| Later | 2028+ | Wave-2 languages, event wizard, open data | Partners, other events |

## 7. Scenarios and contingencies
| Scenario | Trigger | Response |
|---|---|---|
| A: Adoption/endorsement | Written agreement by G2 | Align roadmap with host timeline; integrate official data; formalise ownership (B) |
| B: Independent pilot continues | No agreement but public interest | Public-information pilot; keep outreach; scaled event release without alerts relay |
| C: Pivot to other events | No endorsement by G4 or COP32 postponed/cancelled | Reuse platform for Addis conferences (M4); archive project assets |
| D: Overlap with official platform | Official host app announced | Integrate/link; reposition as complementary; reassess features |
| E: Funding delay | No funds by G3 | Reduce scope per fallback; prioritise in-kind; delay launch |
| F: Dates/venue change | Official announcement | Re-baseline from T; adjust gates |
| G: Fallback ownership (A or C) | Funder or government condition | Execute conversion clause; DPG-ready packaging |

## 8. Monitoring and governance of the roadmap
Monthly roadmap review (PM + product owner); gate reviews documented in `docs/decisions/log.md`; risk register reviewed monthly; quarterly external re-check (official platforms, host announcements, procurement notices); change control for scope; status dashboard (phase, gate, blockers, dependencies).

## 9. Open questions
1. Official COP32 dates, venue and registration timeline. 2. Procurement route and timing for any government contract. 3. Funding decisions and sources. 4. Who provides authorisers and a liaison for alerts. 5. Final stack (S1–S7). 6. Legal set-up timeline (company registration). 7. Availability of external security testers and disability-organisation partners in the planned windows. 8. App store verification status.

## 10. Proposed decisions
- **D38:** adopt this roadmap, the five gates (including proposed G5 go-live readiness) and the critical-path actions in §5, starting with the legal foundation and store/D-U-N-S processes.
- **D39:** make signed IP assignments and a settled PPR framework entry criteria for G1/G2 (no public release before IP assignment).
