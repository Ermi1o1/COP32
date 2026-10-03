# ADR-006 — Mobile framework: decision deferred
Status: **No decision (open)** · Date: 2026-10-03 · Decision log: — · Evidence basis: sandbox/desk, **not** real devices or providers

## Context
Flutter or React Native (S1)?

## Options considered
- Flutter (+ Next.js web)
- React Native (+ Next.js web)
- Flutter for all three
- Kotlin Multiplatform + native + web

## Evidence
Source: `docs/architecture/spike-results/S1-mobile-framework.md`.
Only web builds could run: both rendered the Amharic test set correctly with a bundled font; React Native Web shipped about 1.5 MB cold versus about 8.9 MB for Flutter web (CanvasKit) in an unthrottled headless run. No native builds, devices, TalkBack/VoiceOver, memory or start-up measurements.

## Decision
**No decision.** The brief's decision rule (fail any option with an Amharic defect on a target device) cannot be applied without devices. The prototype (Track D) and design system do not depend on it. Native spike on real devices remains the gate for starting Phase 22.

## Consequences
- Scored table in technical-architecture §3.2 is unchanged except for an evidence overlay.
- Phase 22 (native apps) stays blocked on this.

## Revisit when
Real-device or real-provider results for the spike arrive, or the assumptions above change.
