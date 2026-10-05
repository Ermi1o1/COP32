# COP32 companion — independent platform concept

An unofficial concept for a companion app for COP32 in Addis Ababa, Ethiopia.
**Not an official COP32, UNFCCC, or government product.** All content in the
prototype is invented sample data; Amharic text is machine-drafted and has not
been reviewed by a native speaker.

**Live prototype:** https://ermi1o1.github.io/COP32 (PWA: installable, works offline)

## What this repo contains

- **A clickable prototype** (`prototype/`): a vanilla-JS PWA with five tabs
  (Today, Programme, Map, Visit, Updates) and a Profile & Settings sheet.
  EN/አማ switching with a bundled Ethiopic font, Ge'ez-aware search, light mode
  by default with a Dark mode switch, card-based screens with openly licensed
  photos (credited in-app) and illustrated invented speakers, sample
  agenda/speakers/places/news, a tree-test dry run and a UI-states gallery.
  See `prototype/README.md`.
- **Product documentation** (`docs/`): research and benchmarks, personas,
  information architecture, design system with tokens, six architecture
  decision records, security/privacy governance, roadmap and outreach drafts.
- **Technical spikes** (`spikes/`): mobile framework (S1), search
  normalisation (S3), offline maps (S4), signed snapshot/delta sync (S7);
  results in `docs/architecture/spike-results/`.

## Current status

Pre-production concept. Done: IA (D16 v2) with cross-links (D44), visual design
"Highland Mist" (D53) with the card/photo layer (D54, D56, D57), installable
offline PWA (D55), and a heuristic walkthrough that gives risk estimates.
Deliberately **not** done, because it needs real people: card sort, tree test,
native-speaker Amharic review, device and screen-reader testing, and real
COP32 content (none has been officially published).

## Quick start

```bash
cd prototype && python3 -m http.server 8000   # http://localhost:8000
```

Rebuild generated files with `python3 build.py`; release a new version with
`python3 release.py X.Y.Z` (see `CONTRIBUTING.md`). Merging to `main` deploys
to GitHub Pages; the deploy stops if the version strings disagree.

## Documentation index

| Want to… | Read |
|---|---|
| Understand the product | `docs/product/project-definition.md`, `docs/product/final-blueprint.md` |
| Review the IA | `docs/ux/information-architecture.md`, `docs/ux/ia-validation-results/heuristic-walkthrough.md` |
| Check the design | `docs/design/design-system.md`, `docs/design/redesign-directions/README.md` |
| Understand tech choices | `docs/architecture/adr/`, `docs/architecture/technical-architecture.md` |
| See every decision | `docs/decisions/log.md` |
| Pick up the work | `docs/roadmap/development-roadmap.md`, `docs/roadmap/phase-status.md` |
| Contribute | `CONTRIBUTING.md` |
