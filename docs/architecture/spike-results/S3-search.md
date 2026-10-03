# S3 — Ge'ez-aware search — sandbox results
**Basis: local sandbox run on a 115-document SYNTHETIC corpus, 2026-10-03, Claude Code. Gold labels were written by the same author who wrote the corpus and the normaliser. No linguist reviewed the rules; no real users, no real COP32 content.** Numbers are a mechanism check, not a quality claim.

## What was executed
- Engines (all local, default-ish settings): **PostgreSQL 16.14** (`to_tsvector('simple')` with weights, GIN, `pg_trgm` word-similarity fallback, C.UTF-8 database), **Meilisearch 1.12.0**, **Typesense 27.1** (prefix on, 2 typos). OpenSearch was **not** run (no JVM cluster set up; optional in the brief).
- Corpus (`spikes/s3-search/corpus.py`): 50 sessions, 20 speakers, 30 POIs, 10 articles, 5 alerts from `spikes/data/sample.json`; POI Amharic names and Latin aliases added by me (**unverified Amharic**; `ሃይል/ኃይል`, `ሰላም/ሠላም`, `አዲስ/ዐዲስ`, `ጸሐይ/ፀሐይ` variant records planted in S001–S008).
- Normaliser (`normalise.py`): homophone folding for ሀ/ሐ/ኀ, ሰ/ሠ, አ/ዐ, ጸ/ፀ (Unicode family offsets), Ge'ez numerals → Arabic, Ethiopic punctuation → space, case/diacritic folding. Applied identically to documents and queries ("folded") vs only lower-casing ("raw").
- Query set (`queries.py`): **68 queries** in 12 categories (exact EN/AM titles, prefixes, homophones in multi- and single-token form, name transliteration/alias, typos, mixed script, Ge'ez numerals, short queries, multi-word, speakers). Run with `python3 run.py` (results in `spikes/s3-search/results.json`).
- Metrics: **hit@5** (any gold item in top 5) / **R@10** (fraction of gold in top 10), per category below; P@5 and misses in `results.json`.

## Results (hit@5 / R@10)
| Category (n) | PG/raw | Meili/raw | TS/raw | PG/folded | Meili/folded | TS/folded |
|---|---|---|---|---|---|---|
| exact-EN (6) | 1.00 / 1.00 | 1.00 / 1.00 | 1.00 / 1.00 | 1.00 / 1.00 | 1.00 / 1.00 | 1.00 / 1.00 |
| exact-AM (6) | 1.00 / 1.00 | 1.00 / 1.00 | 1.00 / 1.00 | 1.00 / 1.00 | 1.00 / 1.00 | 1.00 / 1.00 |
| prefix (8) | 1.00 / 0.90 | 1.00 / 0.90 | 1.00 / 0.90 | 1.00 / 0.90 | 1.00 / 0.90 | 1.00 / 0.90 |
| homophone (8) | 1.00 / 1.00 | 1.00 / 1.00 | 1.00 / 0.56 | 1.00 / 1.00 | 1.00 / 1.00 | 1.00 / 1.00 |
| homophone-1tok (6) | 1.00 / 0.50 | 1.00 / 1.00 | 1.00 / 0.50 | 1.00 / 1.00 | 1.00 / 1.00 | 1.00 / 1.00 |
| name-translit (8) | 1.00 / 1.00 | 1.00 / 1.00 | 1.00 / 1.00 | 1.00 / 1.00 | 1.00 / 1.00 | 1.00 / 1.00 |
| typo (6) | 1.00 / 1.00 | 0.83 / 0.83 | 1.00 / 1.00 | 1.00 / 1.00 | 0.83 / 0.83 | 1.00 / 1.00 |
| mixed-script (4) | 1.00 / 1.00 | 1.00 / 1.00 | 1.00 / 1.00 | 1.00 / 1.00 | 1.00 / 1.00 | 1.00 / 1.00 |
| numerals (4) | 0.00 / 0.00 | 0.00 / 0.00 | 0.00 / 0.00 | 1.00 / 1.00 | 1.00 / 1.00 | 1.00 / 1.00 |
| short (4) | 1.00 / 1.00 | 1.00 / 1.00 | 1.00 / 1.00 | 1.00 / 1.00 | 1.00 / 1.00 | 1.00 / 1.00 |
| multiword (4) | 1.00 / 1.00 | 1.00 / 1.00 | 1.00 / 1.00 | 1.00 / 1.00 | 1.00 / 1.00 | 1.00 / 1.00 |
| speaker (4) | 1.00 / 1.00 | 1.00 / 1.00 | 1.00 / 1.00 | 1.00 / 1.00 | 1.00 / 1.00 | 1.00 / 1.00 |
| ALL (68) | 0.94 / 0.89 | 0.93 / 0.91 | 0.94 / 0.83 | 1.00 / 0.99 | 0.99 / 0.97 | 1.00 / 0.99 |
| median latency ms | 2.3 | 1.8 | 1.7 | 2.5 | 2.2 | 1.9 |
| index time ms (115 docs) | 39 | 172 | 9 | 56 | 182 | 23 |

(Prefix R@10 is capped at 0.90 because several gold sets exceed 10 documents.)

## What this does and does not show
1. **The folding normaliser is what matters, not the engine.** Without it all three engines fail Ge'ez numerals (0/4) and degrade on single-token homophone queries (PG and Typesense find only one spelling: R@10 0.50). With it all three reach ≥0.99 hit@5 on this set. PostgreSQL FTS + `pg_trgm` was **as good as** the dedicated engines here, including typo recovery (the trigram fallback handled all six typo queries).
2. **Meilisearch partly "covers" homophones by itself — via typo tolerance, not folding.** Raw `ሃይል` returned S001/S002 but ranked variants inconsistently (`ኃይል` put S001 *last*), and single-letter substitutions are within its 1-typo budget only for longer words; two-letter differences (e.g. `ዐዲስ ዐበባ` vs `አዲስ አበባ`) rely on the other tokens. Meilisearch missed `Adis Ababa University` (a one-letter typo in a 4-letter word is below its typo threshold) — a real, small configuration finding.
3. **Test-quality caveats (important):** tiny corpus; queries and gold authored by me; "name-translit" passes largely because I supplied a curated alias field (this is the realistic mechanism — aliases managed in the CMS — but it is not automatic transliteration, which was **not** implemented); the homophone multi-token queries are partly masked by shared tokens; no stop-word, ranking-quality or stemming (Amharic morphology: prefixes/suffixes like የ-, በ-, -ዎች) tests. Amharic **stemming/morphology is the largest untested risk**; real queries will use inflected forms the exact-token tests do not cover.
4. **Latency/size are not meaningful** at 115 documents (all ≈2 ms median; index builds in tens to ~180 ms). They say nothing about 5,000+ records or concurrent load. PostgreSQL's 'simple' parser handled Ethiopic as word characters in a C.UTF-8 database — **database locale matters**; confirm for the target hosting.
5. On-device (offline) search with SQLite FTS5 was **not** tested.

## Provisional conclusion (sandbox evidence only)
- **Lean: PostgreSQL FTS + pg_trgm + our own folding normaliser** (consistent with the brief's "prefer PostgreSQL unless another engine is clearly better"): no engine was clearly better on this data. Keep Meilisearch/Typesense as upgrade options if relevance tuning demands it.
- This is **not locked**; the normaliser rules and morphology handling need linguist review and a larger realistic corpus.

## Not yet tested — needs real people / data
- Linguist review of fold rules (are ሀ/ሐ/ኀ order-for-order equivalents? ሃ vs ሀ? ኧ, ዐ-family edge cases?) — **open**.
- Native-speaker-written realistic queries incl. inflected forms, spelling variants, colloquial transliteration (Latin → Ge'ez and reverse); automatic transliteration tables.
- Larger corpus (≥5,000 records), concurrency, relevance ranking with real titles/bodies.
- OpenSearch with ICU analysis; SQLite FTS5 on device (offline); Amharic search on a real mobile keyboard (Fidel IME input differences).
