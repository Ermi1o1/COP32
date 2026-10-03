# ADR-003 — Maps: self-hosted PMTiles + MapLibre + own Ethiopic glyph pack
Status: **Provisional** · Date: 2026-10-03 · Decision log: D48 · Evidence basis: sandbox/desk, **not** real devices or providers

## Context
Can we ship fast, attractive offline Addis maps with correct Ge'ez labels at an acceptable size (S4)?

## Options considered
- Self-hosted PMTiles (Planetiler/OpenMapTiles) + MapLibre + fontnik glyphs (chosen)
- Commercial hosted tiles/SDK
- Native platform maps only (no offline control, link-out for directions)

## Evidence
Source: `docs/architecture/spike-results/S4-offline-maps.md`.
A real build from the 2026-10-03 Ethiopia OSM extract produced 8.7 MB for central Addis to z15 (≈2 MB to z13, ≈5 MB to z14). MapLibre rendered Ethiopic labels with glyphs generated from Noto Sans Ethiopic (≈0.28 MB needed). Only ≈18 % of features carry `name:am`. 17 of 17 well-known places had name matches (not a field audit). Tested in desktop Chromium only.

## Decision
Adopt the stack as the working approach. **Provisional** pending on-device smoothness/memory tests, field-checked POI audit, licence/attribution review, and an Amharic POI-name curation plan.

## Consequences
- A glyph build step and font licence compliance are part of the map pipeline.
- Amharic POI names need curation in our own POI layer.
- Venue indoor maps are separate content from the host.

## Revisit when
Real-device or real-provider results for the spike arrive, or the assumptions above change.
