# ADR-002 — Search: PostgreSQL FTS + trigram with a Ge'ez folding normaliser
Status: **Provisional** · Date: 2026-10-03 · Decision log: D47 · Evidence basis: sandbox/desk, **not** real devices or providers

## Context
Can PostgreSQL full-text + pg_trgm with our own normaliser meet Amharic search needs, or are Meilisearch/Typesense/OpenSearch needed (S3)?

## Options considered
- PostgreSQL FTS ('simple') + pg_trgm + normaliser (chosen)
- Meilisearch
- Typesense
- OpenSearch + ICU (not run)

## Evidence
Source: `docs/architecture/spike-results/S3-search.md`.
On a 115-document synthetic corpus and 68 hand-built queries: with folding all three engines scored hit@5 0.99–1.00; without folding 0.93–0.94, and Ge'ez numerals failed entirely (0/4). Single-token homophone queries found only one spelling in PostgreSQL and Typesense (R@10 0.50) until folded. PostgreSQL handled typos through trigram fallback; Meilisearch missed a one-letter typo in a 4-letter word. Gold labels and corpus were written by the same author; Amharic morphology and linguist review were not covered.

## Decision
Lean to PostgreSQL with the normaliser (simplest infrastructure, no engine clearly better). **Provisional**: linguist review of folding rules and a realistic corpus with inflected forms are required before locking; engines remain upgrade options.

## Consequences
- Normaliser is a shared module (server and on-device) and must be versioned with the index.
- Database locale must support Ethiopic as word characters (C.UTF-8 worked).
- Offline search (SQLite FTS5) still to be tested.

## Revisit when
Real-device or real-provider results for the spike arrive, or the assumptions above change.
