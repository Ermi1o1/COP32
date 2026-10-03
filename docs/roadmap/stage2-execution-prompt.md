# COP32 — Stage 2 Execution Prompt
### IA Heuristic Validation → Spikes S1–S7 → Design System → Clickable Prototype → Architecture ADRs → Full Dossier (.docx)

**How to use this file:** paste this whole document as your next message in Claude Code (same repo, same CLAUDE.md context), ideally right after a `/clear` + `/rename` to something like "COP32 — Stage 2 execution". It assumes `CLAUDE.md`, `docs/decisions/log.md`, `docs/roadmap/phase-status.md`, and `docs/product/final-blueprint.md` are already in the repo (they are — Phases 0–20 are done, D1–D43 decided). Do not re-litigate those decisions here; build on them.

This is **Phase 21** of the project (continuing the numbering in `docs/roadmap/phase-status.md`). It has six tracks (A–F). Work through them **in the order given** — later tracks depend on earlier ones. Update `docs/roadmap/phase-status.md` and `docs/decisions/log.md` as you complete each track, exactly as the existing phases do.

---

## 0. Non-negotiable honesty rule (read this first)

Everything in Tracks A and B that would normally require real people, real devices, or real outside organisations **cannot be done for real inside this environment**. You must still produce something useful, but it must be clearly and permanently labeled as a **substitute**, not the real thing:

- Track A (IA validation) is a **heuristic/expert walkthrough**, not the card sort / tree test defined in `docs/ux/ia-validation-kit.md`. Say so explicitly in the output file's title and first paragraph.
- Track B (spikes) is **desk research + small code proofs-of-concept using mock/sample data**, not the real-device test matrix in `docs/architecture/spike-briefs.md`. For each spike, state plainly which parts you actually executed (e.g., "ran a Flutter and React Native build and rendered the Amharic test string in this sandbox") versus which parts you could not (e.g., "no physical Android/iOS devices, no Huawei HMS, no real Addis Ethio Telecom/Raxio contacts — these remain open").
- Never write a line like "validated with users" or "tested on target devices" unless a real human or real device was actually involved. If you did a heuristic pass, call it a heuristic pass.
- Every Track A and B output ends with an explicit **"Still needs real-world validation"** list, so a future session (or the founder, or the BA) picks up exactly where simulation stops and reality must take over.

This rule governs the whole phase. Breaking it once undermines every document the founder will show to government/partners.

---

## Track A — IA Heuristic Validation (expert walkthrough, not real users)

**Goal:** catch obvious problems in the IA (`docs/ux/information-architecture.md`, D16 v2 — 5 tabs: Home, Programme, Map, Visit, Updates + header menu) before it's baked into a design system and prototype, without pretending this replaces the real card sort/tree test in `docs/ux/ia-validation-kit.md`.

**Do:**
1. Re-read `docs/ux/information-architecture.md`, `docs/ux/personas.md`, `docs/ux/user-journeys.md`, and the 12 tree-test tasks (T1–T12) and 40 cards in `docs/ux/ia-validation-kit.md`.
2. Run a **cognitive walkthrough**: for each of P1–P7 (Tier 1/1-ops personas) and each of T1–T12, reason step-by-step through which tab/menu item a first-time user would click, where they'd likely get it wrong, and why — exactly the kind of judgment call the IA kit's "First click" metric is designed to measure with real people.
3. Pay specific attention to the two flagged risks already on record: the **"Visit" tab label** and the **Amharic translations** for Visit/Updates/Programme (D16 v2 note; IA kit §6). Propose 2–3 alternative EN labels and get as far as you reasonably can on AM candidates, but flag AM wording as needing a native-speaker check — do not invent Amharic translations you can't verify.
4. Note any card from the 40-card set whose "intended home" seems genuinely ambiguous even on expert review (candidates for cross-links regardless of what real testing later shows).
5. Produce a short, clearly-labeled risk rating per tab (Low/Medium/High confidence that the real tree test will pass its ≥70–80% target), not a pass/fail claim.

**Write to:** `docs/ux/ia-validation-results/heuristic-walkthrough.md` (new folder). Title it exactly: *"Heuristic Walkthrough (expert review) — NOT a substitute for the real card sort / tree test"*. End with a "Still needs real-world validation" section listing: real card sort (8–12 people), real tree test (10–15 people), native-speaker Amharic label check, and the ethics/recruitment steps already defined in the IA kit.

**Decision point before moving on:** if the walkthrough surfaces a change you're confident about (e.g., swap a label), log it as a new decision (D44, D45…) in `docs/decisions/log.md` with status "Approved — heuristic basis; confirm with real testing," not "Approved" unqualified.

---

## Track B — Spikes S1–S7 (desk research + sandbox proofs-of-concept)

Re-read `docs/architecture/spike-briefs.md` in full before starting. For each spike below, do what is genuinely possible here, and say clearly what isn't.

| Spike | What you can actually do here | What you cannot do here (flag, don't fake) |
|---|---|---|
| S1 Flutter vs React Native | Scaffold a minimal Flutter app and a minimal React Native/Expo app in this sandbox; implement the schedule screen (sample 50-session JSON) with EN/AM toggle; render the Amharic test string set from the spike brief; bundle an Ethiopic font (D11) and check for tofu boxes in a screenshot/emulator if one is available; compare cold-start code paths, bundle structure, and developer ergonomics from the build logs | Real low-end Android/Huawei/iPhone hardware, TalkBack/VoiceOver testing, real network throttling, real battery/memory profiling |
| S2 CMS (Payload/Strapi/Directus) | Spin up each candidate locally (Docker if available) or research their docs/licence text directly; model Event/Session/Person/Place/GuideArticle/Alert/LinkOut; fill the checklist in the brief from documentation + a local install where feasible; write the licence summary from the actual licence text | A production government deployment; a live SSO/OIDC integration test |
| S3 Ge'ez-aware search | Stand up Postgres FTS+trigram and at least one of Meilisearch/Typesense locally with the sample dataset; write the homophone-folding normaliser; run the ≥60 test queries from the brief and report precision/recall for real on this sandbox data | A linguist's review of the normaliser rules (flag as open) |
| S4 Offline maps | Generate PMTiles for a small Addis bounding box from OSM (if the OSM export is reachable); test MapLibre render in a browser; measure package size | On-device pan/zoom smoothness on real phones; a field-checked POI completeness audit |
| S5 Hosting in Ethiopia | Desk research only — list Ethio Telecom, Raxio, Safaricom Ethiopia, Wingu.Africa, WebSprix public information (certifications, service pages); draft the questionnaire ready to send | Actually contacting providers, pricing, deploying to their infrastructure, measuring real Addis latency — this spike fundamentally requires the founder to reach out; produce the outreach note, don't simulate a response |
| S6 Push notifications | Research FCM/APNs/HMS integration requirements and set up a minimal sender against a test project if credentials are available; otherwise document the integration pattern and known constraints from documentation | Delivery-rate testing on real devices/networks — flag entirely as pending |
| S7 Snapshot sync | Build the manifest format (versions, checksums, signatures) and a client that downloads/verifies/applies deltas against local mock bundles; test interruption/resume and tamper-rejection logic in the sandbox | Real 3G/flaky-network conditions, CDN cache-invalidation behaviour at scale, a 100k-client load simulation |

**For each spike, write:** a short results file under `docs/architecture/spike-results/S1-mobile-framework.md` (…S2…S7…), following the brief's own "Deliverables" line, using the **real sandbox results you obtained** plus an explicit "Not yet tested — needs real devices/providers" section.

**Then:** update the `## Spike results log` table at the bottom of `docs/architecture/spike-briefs.md` with what actually ran (owner: "Claude Code sandbox run"), and record any spike that reached a confident decision as a new entry in `docs/decisions/log.md`, qualified the same way as Track A ("Approved — sandbox evidence; confirm on real devices before shipping").

**Minimum bar before moving to Track C/D:** S1 must produce at least a working Amharic-rendering screenshot comparison between the two frameworks, since D11 (bundled Ethiopic font, real-device QA requirement) makes this the single highest-risk technical unknown in the whole project. If you cannot get either framework running in this sandbox, say so explicitly and fall back to a documentation-only comparison — do not block Track D on it (the prototype doesn't need S1 resolved; see Track D).

---

## Track C — Design System

**Build on:** D11 (bundled Ethiopic font), D16 v2 (IA/tabs), D25–D27 (WCAG 2.2 AA, Android/iOS platform parity, performance budgets, 200% text scaling), D21 (privacy-by-design — no dark patterns, no manipulative nudges).

**Produce:**
1. `docs/design/design-system.md` — written spec: color palette (with light/dark themes and documented contrast ratios meeting WCAG 2.2 AA), typography scale (including the chosen Ethiopic-capable font family and fallback stack), spacing/grid system, elevation/radius/motion tokens, iconography approach, and accessibility annotations (minimum target size, focus states, 200% scale behavior).
2. `docs/design/tokens.json` — the same tokens machine-readable (so Track D's prototype and any future app codebase consume the same values instead of hand-copied CSS).
3. `docs/design/component-inventory.md` — list every component the IA/flows require (tab bar, session card, filter chips, alert banner, map POI card, language switch, empty/error/offline states, etc.), each with states (default/hover/pressed/disabled/loading/error) and which personas/flows use it (cross-reference `docs/ux/user-flows.md`).

**If a brand/color identity hasn't been supplied by the founder:** do not invent an "official COP32" color scheme — this is explicitly an *unofficial* platform (D1, D3 risk flag). Propose an original, neutral, Ethiopia-appropriate palette of your own design and say so; do not imitate any UNFCCC/COP visual identity.

---

## Track D — Clickable Prototype

**Goal:** a real, shareable, browser-based interactive mockup the founder can open on a phone or laptop and click through to "see how it looks and works" (D10) — tangible enough to show government/partner stakeholders, per the founder's explicit request. This is **not** the production codebase and does **not** need S1 (mobile framework) resolved.

**Build:**
- A self-contained static web app (plain HTML/CSS/JS, or a lightweight framework if it keeps the build simple) implementing the validated IA: 5 tabs (Home, Programme, Map, Visit, Updates) + header menu, using the Track C design tokens.
- Populate it with **clearly-labeled sample data** (the same 50-session/20-speaker/30-POI/10-article/5-alert dataset used in the spike briefs) — never real COP32 content, since none is officially available (Phase 0/D1).
- Implement: EN/Amharic language switch (using the bundled Ethiopic font from D11), the 12 tree-test tasks as clickable paths (T1–T12 from the IA kit) so it can double as a dry-run of the real tree test later, offline/empty/error states (static screens are fine — this doesn't need real offline sync, that's S7/Track B), and basic responsive layout for phone width.
- Add a visible "PROTOTYPE — sample data, not an official COP32 product" watermark/footer, consistent with the branding caution in D1/D24.

**Where it lives:** `/prototype` at the repo root (plain static site), with a `README.md` inside explaining how to open it locally and, if the founder wants to share a link, how to deploy it for free (e.g., GitHub Pages from this repo) — note that enabling GitHub Pages is a repo setting the founder needs to flip themselves (Settings → Pages), not something this session can do without the founder's own GitHub access.

---

## Track E — Architecture Decision Records (formalising spike outcomes)

For every spike that reached even a provisional decision in Track B, write a short ADR under `docs/architecture/adr/` (new folder), numbered `ADR-001-...md` etc., in the same spirit as the existing D-numbered decisions:

- Context (the question from the spike brief)
- Options considered
- Evidence (cite the specific `docs/architecture/spike-results/...` file)
- Decision (and whether it's provisional pending real-device testing, or safe to lock in)
- Consequences

Cross-reference each ADR back into `docs/decisions/log.md` as a new D-number, and update `docs/architecture/technical-architecture.md` §3.2 (the scored comparison table) with the sandbox-measured values replacing the estimated scores, exactly as D18 anticipates.

---

## Track F — Full Research & Proposal Dossier (.docx)

**Goal:** a single polished Word document the founder can send to government offices, funders, or partners — the external-facing synthesis of everything in `/docs`.

**Before building it, decide (state your assumption explicitly, don't silently guess):**
- **Audience/version:** this should default to an **external, government/funder-facing** version (professional tone, no internal team gossip, no raw risk-register language about "branding/impersonation risk" phrased bluntly) — consistent with the claims-discipline warning already recorded in `docs/outreach/README.md` ("verify every name/title before sending; do not claim registration numbers or endorsement"). Apply that same discipline here: never state or imply government endorsement, official status, or a registration/legal status that hasn't actually been confirmed (Zega Tech PLC registration status is an open question per `docs/decisions/log.md`).
- If the founder actually wants an **internal** candid version too (with the full risk register, PPR/legal open items, capacity concerns), produce that as a **second, separate** document clearly marked "INTERNAL — NOT FOR EXTERNAL DISTRIBUTION" — do not mix the two in one file.

**Use the `docx` skill** (read its SKILL.md before building) to produce `deliverables/COP32-Platform-Proposal-v1.docx`, structured from `docs/product/final-blueprint.md` plus the new Stage 2 outputs:

1. Cover page (title, "unofficial/complementary civic-tech initiative," date, Zega Tech attribution)
2. Executive summary
3. Vision, mission, problem statement
4. Target users (persona summary, not the full detail doc)
5. Why this is needed now (Phase 0 reality-check finding — no official platform announced as of the stated date; position as complementary, not competing)
6. Product overview: IA, key screens (embed prototype screenshots here — export a few from Track D), feature scope (MVP vs later)
7. What's already been validated vs. what's still pending (be explicit: heuristic walkthrough done, real user testing pending; sandbox spikes done, real-device/provider testing pending) — this is the section most likely to be fact-checked by a skeptical reader, so it must be scrupulously accurate
8. Technical approach (plain-language summary of the architecture, not the full technical doc)
9. Security, privacy, and accessibility commitments
10. Governance, ownership, and sustainability model (D2, D34, D35 — stated as intent, not as settled fact where it isn't)
11. Roadmap and gates (G1–G5)
12. What we're asking for (the actual outreach asks from `docs/outreach/`, softened to document form rather than letter form)
13. Appendix: team, contact

**Apply the user's stored output preferences:** exact brand-color fidelity (use the Track C tokens, not improvised colors) and professional-grade formatting (proper heading styles, consistent typography, a real table of contents, page numbers).

**Deliver** the finished .docx to the founder via file send, and also commit it to `deliverables/` in the repo so it's version-controlled like everything else.

---

## Sequencing summary

1. **Track A** (IA heuristic walkthrough) — quick, unblocks confident label decisions.
2. **Track B** (spikes) — can start in parallel with A; S1's Amharic-rendering result feeds Track C's font choice.
3. **Track C** (design system) — depends on A (labels) + S1 (font proof).
4. **Track D** (clickable prototype) — depends on C; this is the tangible artifact for showing stakeholders.
5. **Track E** (ADRs) — depends on B; can run anytime after B, doesn't block D.
6. **Track F** (docx dossier) — last; pulls from everything above, including prototype screenshots.

After Track F, update `docs/roadmap/phase-status.md` with Phase 21 marked done and sub-noted "heuristic/sandbox basis — real validation still pending," and state explicitly what a future session should read first. Do **not** start the real native-app build (Phase 22 / the "working apps" stage the founder deferred to) until the founder has shown the prototype and dossier around and S1 has a real decision — per the founder's own chosen sequencing (prototype first, then working apps).
