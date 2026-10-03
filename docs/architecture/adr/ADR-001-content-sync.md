# ADR-001 — Content sync: signed manifest + versioned snapshot/delta bundles
Status: **Provisional** · Date: 2026-10-03 · Decision log: D46 · Evidence basis: sandbox/desk, **not** real devices or providers

## Context
How can clients on weak networks fetch content updates quickly and safely, with tamper detection and no half-applied states (spike brief S7)?

## Options considered
- Unsigned JSON polling of an API (simple; no integrity or replay protection)
- Full snapshot only, signed (simplest, larger transfers)
- Signed manifest + per-file SHA-256 + end-state hash + deltas with snapshot fallback, Ed25519 (chosen)
- Third-party sync/database replication service (adds a dependency and personal-data exposure)

## Evidence
Source: `docs/architecture/spike-results/S7-snapshot-sync.md`.
13/13 fault-injection tests passed against a local server: fresh install, no-op sync (1.4 kB), delta chains, interrupted downloads resumed with HTTP Range, corrupt file rejected, tampered manifest rejected, unknown signing key rejected, replayed older manifest rejected, local rollback. Delta savings could not be shown: the sample snapshot is only ~3 kB gzip.

## Decision
Adopt the signed-manifest design as the working sync specification. **Provisional**: add manifest freshness (`valid_until`), key rotation with a pinned key set, and an explicit snapshot-vs-delta threshold before build; re-measure on real 3G/flaky networks and behind a real CDN.

## Consequences
- Content pipeline must produce and sign bundles; key custody becomes an organisational decision (open).
- Client needs Ed25519 verification in the chosen framework (to confirm).
- Snapshot-only may be enough for MVP; delta support can be postponed.

## Revisit when
Real-device or real-provider results for the spike arrive, or the assumptions above change.
