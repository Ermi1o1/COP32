# S7 — Snapshot sync — sandbox results
**Basis: Python reference implementation + automated tests against a local fault-injecting HTTP server, run 2026-10-03 by Claude Code. Synthetic data, localhost only. NOT run on 3G/flaky real networks, NOT a CDN test, NOT a 100k-client load test.**

## What was built (`spikes/s7-sync/`)
- **Format (`publisher.py`):** `manifest.json` = `{manifest, signature, key_id}`. Manifest fields: `schema`, `version`, `min_client_schema`, `published`, `state_sha256` (hash of the canonical end-state, collections sorted by id), and a `files` map with `sha256`, `size`, `kind` (`snapshot` | `delta`), `frm`/`to`. Bundles are gzip'd canonical JSON. Signature: **Ed25519** over the canonical manifest bytes.
- **Delta model:** per collection `{upsert:[records], delete:[ids]}`, chained v→v+1.
- **Client (`client.py`):** verify manifest signature → refuse older manifest than local (rollback/replay) → plan (contiguous delta chain, else full snapshot) → download with HTTP `Range` resume to a `.part` file → verify per-file SHA-256 → apply to an in-memory copy → verify **end-state hash** → write temp file and `os.replace` (atomic) → keep `state.prev.json` for rollback.
- **Tests (`test_sync.py`, results in `results.json`): 13/13 passed**

| Test | Result |
|---|---|
| Fresh install uses snapshot | pass — 4,580 B transferred (manifest 1,412 B + snapshot 3,168 B gz) |
| No-op sync fetches only the manifest | pass — 1,412 B |
| Delta v5→v6 / v3→v6 / v1→v6 | pass — 2,110 B / 3,334 B / 4,355 B (vs 4,580 B snapshot: with this tiny dataset deltas barely beat a snapshot) |
| Delta-applied state == fresh snapshot state | pass |
| Interrupted download (connection cut mid-file, twice) resumes via Range | pass |
| Corrupted bundle byte → rejected, local state untouched | pass |
| Tampered manifest (stale signature) → rejected | pass |
| Manifest signed with an unknown key → rejected | pass |
| Replayed older manifest → rejected | pass |
| Local rollback to previous state | pass |
| Manifest GET throughput, Python `http.server`, serial, localhost | 1,346 req/s (meaningless for CDN; shows the manifest is 1.4 kB) |

## Findings
1. The signed-manifest + per-file-hash + end-state-hash design catches every tamper/corruption case I could think of in-process, and a failed update never touches the live state (atomic replace).
2. **The sample dataset is too small to prove delta economics:** the whole gzip'd snapshot is ~3 kB, so deltas save little. Real value shows only with large guide/media metadata; a "snapshot-only unless >N changes" rule is likely sufficient for MVP (simpler), which should be re-decided with a realistic bundle.
3. **Not covered by my tests (known gaps):** record *deletions* in deltas (implemented, not exercised); schema migration (`min_client_schema` is only checked as a refusal); storage-quota failures; concurrent syncs; clock skew (the manifest has `published` but no expiry check, so a captured old-but-valid *manifest* can be replayed to a client that has not yet synced past it — it can only be refused once the client has a newer version; add `valid_until`/freshness for the alert channel); key rotation (`key_id` is a placeholder; a rotation scheme with a pinned key set + next-key announcement is needed).
4. The signing key must live with the content publisher (not the CMS server); the private test key is deliberately git-ignored. Key custody is an organisational decision (open).

## Provisional conclusion
The design is **viable and cheap to implement** and can be adopted as the **working specification** for sync, provisional until measured on real networks. Per-update bytes cannot be generalised from this dataset.

## Not yet tested — needs real networks / infrastructure
- Real 3G (~400 kbps/400 ms) and 30%-loss conditions; battery and CPU on a low-end phone; TLS handshake costs; mobile OS background-download limits.
- CDN behaviour: cache invalidation/propagation after publish, `Range` support, `ETag`/`If-None-Match` handling, stale manifests served from edge.
- 100k-client polling load, thundering herd after a push notification; recommended polling intervals.
- Client implementation in the chosen mobile framework (this client is Python) and its crypto-library availability (Ed25519 on Android/iOS/web).
- Key management plan: who holds keys, rotation, compromise recovery.
