# ADR-004 — UI glyphs must be bundled; no runtime font or symbol fallback
Status: **Accepted rule; device test still required** · Date: 2026-10-03 · Decision log: D49 · Evidence basis: sandbox/desk, **not** real devices or providers

## Context
Does bundling an Ethiopic font (D11) suffice, or can other glyphs also fail (S1)?

## Options considered
- Rely on platform fallback fonts
- Bundle one text font + SVG icons only (chosen)
- Bundle additional symbol fonts

## Evidence
Source: `docs/architecture/spike-results/S1-mobile-framework.md`.
Noto Sans Ethiopic covers Ethiopic and Latin but not ✓ or →. Flutter web rendered ✓ as a missing-glyph box and attempted to download fallback fonts from a Google domain at runtime (fails offline; external request). React Native Web used the browser fallback silently. The sandbox Chromium also showed Ethiopic text without any bundled font, so the Android-OEM tofu risk behind D11 could not be reproduced.

## Decision
Rule: every glyph the UI can show comes from bundled fonts or SVG icons; no symbol characters in strings; font-load check in CI. **Safe to lock** as a design rule (it follows from privacy and offline requirements regardless of framework). The device test of D11 remains required.

## Consequences
- Icons are SVG assets; strings avoid symbol characters.
- Web font is subset (prototype: ≈100 KB woff2).

## Revisit when
Real-device or real-provider results for the spike arrive, or the assumptions above change.
