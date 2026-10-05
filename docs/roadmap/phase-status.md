# Phase Status (updated 2026-10-03)
## Documentation phases (project brief)
| Phase | Status | Key files |
|---|---|---|
| 0 Reality check | Done (D1) | research/reality-check.md |
| 1 Discovery | Done (D2–D7) | product/discovery-answers.md |
| 2 Project definition | Done (approved) | product/project-definition.md |
| 3 COP32 research | Done (two passes; re-run when official pages publish) | research/cop32-context.md, ethiopia-digital-landscape.md |
| 4 Benchmarks | Done (desk); hands-on test plan issued | research/benchmark-findings.md, benchmark-test-plan.md |
| 5 Gap analysis | Done (approved) | research/gap-analysis.md |
| 6 Personas & journeys | Done (approved); BA interviews pending (non-blocking) | ux/personas.md, user-journeys.md, interview-questionnaire.md |
| 7 Feature catalog | Done | product/feature-catalog.md |
| 8 MVP prioritisation | Done (D15) | product/mvp-prioritization.md, mvp-scoring.py |
| 9 Information architecture | Done (D16 v2); BA validation kit issued | ux/information-architecture.md, ia-validation-kit.md |
| 10 User flows | Done | ux/user-flows.md |
| 11 Technical architecture | Done (D17, D18); spikes S1–S7 pending | architecture/technical-architecture.md, spike-briefs.md |
| 12 Data & integration | Done (D19, D20); outreach pack drafted (not sent) | architecture/data-integration-strategy.md, outreach/ |
| 13 Security, privacy, governance | Done (D21–D23) | security/security-privacy-governance.md |
| 14 Accessibility & localisation | Done (D25–D27 incl. Android/iOS parity) | requirements/accessibility-localization.md |
| 15 Content & editorial | Done (D28–D30) | content/editorial-system.md |
| 16 Admin & operations | Done (D31–D33) | operations/admin-platform.md |
| 17 Business & sustainability | Done — D34, D36 approved; D35 = split ownership first (fallback A/C); D37 PPR terms recorded | product/business-sustainability-model.md |
| 18 Development roadmap | Done — D38, D39 approved 2026-10-03 | roadmap/development-roadmap.md | roadmap/development-roadmap.md |
| 19 Project team | Done — D40–D42 approved 2026-10-03 | roadmap/team-requirements.md |
| 20 Final product blueprint | Done — D43 approved 2026-10-03 | product/final-blueprint.md |
| 21 Stage 2 execution: IA heuristic validation, spikes, design system, clickable prototype, ADRs, dossier | **Done 2026-10-03 on heuristic/sandbox basis — real validation still pending** (D44–D52) | roadmap/stage2-execution-prompt.md; ux/ia-validation-results/; architecture/spike-results/, architecture/adr/; design/; prototype/; deliverables/COP32-Platform-Proposal-v1.docx |

## Track D v2 — visual redesign (2026-10-03)
**Done.** Direction "Highland Mist" chosen after four founder review rounds (D53; `docs/design/redesign-directions/`). Design system v0.2 + `tokens.json` updated; plan in `docs/design/redesign-plan.md`; every prototype screen rebuilt (5 batches); screenshots refreshed in `docs/design/prototype-screens/` (20). Checks: tokens 64/64 AA, axe-core 0 violations (16 screens × light/dark), 200% reflow without horizontal scroll, EN/AM and light/dark parity, tree-test T1–T12 all resolve. Private phone-viewable copy: https://claude.ai/artifact/X4MMCwgpeHVfpBCpLDh3wh (entry page `prototype/artifact-entry.html`). The GitHub Pages redeploy runs once this branch is merged to `main`.

## Track D v2.1 — visual layer (2026-10-03)
Card- and block-based redesign with illustrated SVG covers (D54); light mode default with a Dark mode switch. Checks: axe-core 0 violations, T1–T12 resolve, 200% reflow OK.

## Track D v2.2 — PWA + illustrated personas (2026-10-03)
The prototype is an installable, offline-capable PWA (D55), and every card shows an invented illustrated persona in a themed scene (D56). Checks: axe-core 0 violations, T1–T12 resolve, offline reload verified.

## Track D v2.3 — real photos (2026-10-03)
Cards, headers and the hero use 46 openly licensed photos with an in-app credits screen (D57); speaker avatars stay illustrated. Checks: axe 0 violations, T1–T12 resolve, offline OK.

## Repo hygiene + D44 cross-links (2026-10-05)
Added root `README.md` and `CONTRIBUTING.md`, `prototype/release.py` (single-command version bump with a `--check` CI guard in `pages.yml` and a new PR workflow `check.yml`), and completed the D44 cross-links (D44a). Prototype v0.6.1. These started from an external AI review package; it was fixed before adding (patch did not apply cleanly, release script failed on the current tree).

## Where the project stands in practice
- Phase 21 is complete on a heuristic/sandbox basis (see table). Real card sort/tree test, real-device spikes (S1, S6), provider outreach (S5), native-speaker Amharic review and user testing remain open.
- Planning documentation is complete through Phase 20 (blueprint approved, D43). Phase 21 ("Stage 2 execution") is defined and ready to run: `docs/roadmap/stage2-execution-prompt.md` is the operating prompt for it — paste it into a fresh Claude Code session (after `/clear`) to execute Tracks A–F (IA heuristic walkthrough, spikes S1–S7 sandbox proofs, design system, clickable prototype, architecture ADRs, external .docx dossier).
- **Not started yet (execution):** legal set-up (company registration, IP assignments, PPR agreement), outreach (letters drafted, not sent), real-world validation of Phase 21's heuristic/sandbox work (see above), and — deferred until after Phase 21 — the real native-app build (Phase 22+).
- **Important scope note for Phase 21:** nothing in it substitutes for real-user IA testing or real-device/real-provider spikes (`docs/ux/ia-validation-kit.md`, `docs/architecture/spike-briefs.md`). It produces heuristic/sandbox evidence only, clearly labeled, plus a tangible clickable prototype and a sendable proposal dossier — real validation stays a tracked open item.
- **Next gate:** G1 on 31 Dec 2026 (see roadmap).
## Decisions awaiting approval
D44–D52 recorded in the log with qualified status (heuristic/sandbox basis; provisional). Founder to confirm or amend.
## Next session should read first
docs/decisions/log.md (D44–D53), docs/roadmap/phase-status.md, docs/design/redesign-plan.md, docs/architecture/adr/README.md, docs/design/design-system.md, prototype/README.md, then docs/product/final-blueprint.md. Phase 22 (native build) is blocked on prototype review + a real-device S1 decision.
