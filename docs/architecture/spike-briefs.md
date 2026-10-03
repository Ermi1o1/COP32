# Spike Briefs (S1–S7) — engineering experiments that settle open architecture decisions
Prepared 2026-10-03 for the engineering team. Each spike answers one question with pre-agreed criteria so the result is a decision, not an opinion. Results are recorded in `docs/architecture/spike-results/` (create) and summarised in `docs/decisions/log.md`. The PM sets time-boxes and assigns owners; spikes can run in parallel.
**Rules for all spikes:** throw-away prototypes (not production code); use only sample/public data; no personal data; record the exact versions, devices and settings; screenshots/screen recordings for visual results; note anything surprising.

## Shared test assets
### Device matrix (fill with real models)
| Slot | Requirement | Notes |
|---|---|---|
| A1 | Low-end Android (≤2 GB RAM, older Android version, small screen) | Brand common in Addis (e.g., Tecno/Infinix/itel — confirm by local market check) |
| A2 | Low-end Android of a different maker/skin | Different OEM font stack |
| A3 | Mid-range Samsung | Largest OEM |
| A4 | Xiaomi/Redmi or Oppo/Realme | Aggressive battery management (push/background tests) |
| A5 | Huawei (without Google services) if available | HMS push, font stack |
| A6 | Recent flagship Android | Baseline |
| I1 | iPhone (older supported model, limited memory) | Parity with Android (founder 2026-10-03) |
| I2 | iPhone (small screen, e.g., SE-class) | |
| I3 | iPhone (standard recent) | |
| I4 | iPhone (large/Pro Max class) + an iPad if tablet support is planned | |
| W1–W3 | Web: Chrome Android, Safari iOS, desktop Chrome/Firefox | |
Network profiles: Wi-Fi; throttled 3G (~400 kbps, 400 ms RTT); flaky (30% packet loss); offline.
### Amharic test text set (ask a native speaker to confirm and extend)
- Common phrases: እንኳን ደህና መጡ · የአየር ንብረት ለውጥ · ጉባኤ · ፕሮግራም · ካርታ · አዲስ አበባ · ኢትዮጵያ
- Ethiopic numerals and punctuation: ፩ ፪ ፫ ፲ ፻ · ። ፣ ፤ ፦
- Long titles (wrapping across 3–4 lines), mixed English+Amharic strings, text at 200% font scale, bold/medium weights.
- Homophone pairs for search (to be confirmed by a linguist): ሀ/ሐ/ኀ, ሰ/ሠ, አ/ዐ, ጸ/ፀ — create records using each variant.
### Sample dataset
50 sessions (EN+AM titles), 20 speakers, 30 POIs, 10 guide articles (long text), 5 alerts. Generate with the CSV templates in `data-integration-strategy.md` §5.

---
## S1 — Mobile framework: Flutter vs React Native
**Question:** Which framework gives the most reliable Amharic rendering, performance on low-end Android, offline capability and accessibility for our needs?
**Build (identical in both):**
1. *Schedule screen:* list of 50 sessions, EN/AM toggle, filters (day, "open to public"), pull-to-refresh, sticky day headers.
2. *Session detail + offline:* local database (SQLite-class), download a bundle from a mock manifest, run in airplane mode, save/unsave sessions, search over local data.
3. *Map screen:* MapLibre-based vector map with 30 POIs, offline tiles for a small Addis area, tap for POI card.
Plus: bundled Ethiopic font; dynamic type; dark mode optional.
**Measure:**
| Criterion | How | Pass/Fail or score |
|---|---|---|
| Ge'ez rendering | Test text set on all devices; screenshots; check tofu boxes, clipping, line height, weights, 200% font scale, numerals/punctuation | **Any defect on a target device = fail** until fixed |
| Cold start & scroll | Startup time; jank (frame times) on A1/A2 while scrolling 1,000 rows | Record numbers |
| App size | Release APK/AAB and IPA download size | Record |
| Memory | Peak RAM on A1 | Record |
| Offline | Works in airplane mode after sync; resume interrupted downloads; storage use | Pass/Fail |
| Local search | Amharic query returns expected items (before normalisation work) | Record |
| Accessibility | TalkBack and VoiceOver: focus order, labels, Amharic text pronunciation/reading (note that Amharic TTS support may be limited), large text, contrast | Score 1–3 + notes |
| Map integration | Offline tiles, label fonts with Ge'ez glyphs, smoothness on A1 | Record |
| Push (basic) | Receive a test push on A3/A4/A5/I1 | Pass/Fail |
| Web code sharing | What can be shared with the web app (types, API client, logic) | Notes |
| Developer experience | Build times, debugging, hot reload, upgrade path, ecosystem for needed libraries (maps, DB, sync) | Notes |
**Decision rule:** fail any option with an unresolved Amharic rendering defect on a target device; otherwise choose the higher total on the weighted criteria in `technical-architecture.md` §3.2, with measured values replacing the estimated scores. Ties → the option with the smaller defect surface on A1/A2 and better accessibility.
**Deliverables:** comparison table, screenshots/videos, size/perf numbers, recommendation (one page).

## S2 — Content management system
**Question:** Which self-hosted open-source CMS best fits bilingual editorial, approvals and emergency publishing — and has a licence compatible with government ownership?
**Candidates:** Payload, Strapi, Directus (add others if found).
**Build:** model Event, Session, Person, Place, GuideArticle, Alert, LinkOut; create sample content in EN+AM.
**Checklist (score each: Native / Plugin / Custom / No):**
Per-locale fields and translation status · draft/publish · scheduled publish · multi-step approval · emergency publish with reason + audit · role-based permissions (field/item level) · revision history with diff · audit log · media library with focal points and alt text · webhooks on publish · bulk CSV import/export · PostgreSQL support · API (REST/GraphQL, OpenAPI) · rich-text with Ge'ez · admin UI in Amharic? · SSO/OIDC · backup/restore · upgrade path · performance with 5,000 records.
**Licence review (mandatory):** exact licence text, restrictions on use by governments/revenue thresholds, which features sit in paid tiers (e.g., review workflows, audit logs), obligations when redistributing to a government client. Record legal summary.
**Decision rule:** disqualify any candidate whose required features sit behind a paid tier or whose licence blocks handover; rank the rest by checklist score.
**Deliverables:** checklist table, licence summary, sample admin screenshots, recommendation.

## S3 — Search (Ge'ez-aware)
**Question:** Can PostgreSQL full-text + trigram with our own normaliser meet Amharic search needs, or do Meilisearch/Typesense/OpenSearch do better?
**Build:** load the sample dataset into (a) PostgreSQL with an FTS config + `pg_trgm`, (b) Meilisearch, (c) Typesense, (d) optionally OpenSearch with ICU analysis. Implement a normaliser (homophone folding, optional transliteration table, punctuation stripping) applied at index and query time.
**Test queries (≥60):** exact titles in AM and EN; partial words/prefixes; homophone variants; transliterated Latin queries for names/places (e.g., "Bole", "Meskel"); mixed-script; typos; multi-word; numerals (Ge'ez and Arabic); stop words; very short queries.
**Measure:** precision@5/recall@10 against a hand-labelled answer set; latency; index size; behaviour of ranking (title > body); ability to filter/facet; on-device options (SQLite FTS5) for offline.
**Decision rule:** meet target (e.g., ≥90% of labelled queries return the right item in top 5 — set by PM) with the simplest infrastructure; prefer PostgreSQL unless another engine is clearly better.
**Deliverables:** query set + results, normaliser rules (reviewed by a linguist), recommendation.

## S4 — Offline maps
**Question:** Can we deliver fast, attractive, offline Addis maps with correct Ge'ez labels at an acceptable download size?
**Build:** generate vector tiles from OSM for Addis (e.g., via Tilemaker or equivalent) into PMTiles/MBTiles; write a map style with Ethiopic-capable fonts (glyph ranges); host static tiles; test MapLibre on Android, iOS and web.
**Measure:** tile package size for city + venue zoom levels; time to first render on A1; pan/zoom smoothness; label legibility (Amharic + English, names missing in OSM); offline operation; attribution display; POI overlay performance with 500 points; clustering.
**Also test:** how complete OSM is for key Addis POIs (hotels, hospitals, embassies, light-rail stations) vs a field-checked list of 50 places; list gaps.
**Deliverables:** size/perf table, screenshots, gap list, recommendation on tile sourcing (self-hosted vs commercial), plan to improve OSM data.

## S5 — Hosting in Ethiopia
**Question:** Which Ethiopian facility can host the personal-data plane reliably, securely and affordably — and can we run our stack there?
**Method:** request written information from Ethio Telecom (telecloud/data centre), Raxio, Safaricom Ethiopia, Wingu.Africa, WebSprix and any others identified.
**Questionnaire:** certifications (Tier level, ISO 27001 etc.); SLA and uptime history; available services (VMs, containers, managed Kubernetes, object storage, managed Postgres, backups); network capacity and international transit; peering with CDNs; DDoS protection; price list and billing currency; ability to host a second site / DR; data-protection compliance posture and subpoena/law-enforcement process; support hours; onboarding lead time; government/restricted-sector clauses; ability to reserve capacity for the event window; access for audits; encryption options.
**Test:** deploy a minimal containerised API + Postgres + object storage; measure latency from Addis, from Europe/Asia/Americas through the CDN; failover test between sites if available; restore a backup.
**Decision rule:** choose primary + secondary providers meeting written requirements (set with the owner); if none qualifies, escalate with options.
**Deliverables:** comparison matrix, quotes, test results, recommendation.

## S6 — Push notifications
**Question:** Do alerts arrive reliably and fast on typical Ethiopian devices and networks, including Huawei and aggressive-battery phones?
**Build:** minimal sender using FCM, APNs, and Huawei HMS (if A5 available); alerts with topics (language, role).
**Test:** delivery rate and latency to A1–A6, I1–I4 across Wi-Fi/cellular, in foreground/background/after reboot, battery saver on; message collapse and priority; deep links into app; silent data push to trigger sync; behaviour when permission denied; polling fallback timing.
**Measure:** p50/p95 latency; delivered %; failure causes; user permission flow.
**Deliverables:** results table, recommended settings, fallback design (polling interval, in-app banner), notes for privacy notice (what passes through Google/Apple/Huawei).

## S7 — Snapshot sync
**Question:** Can versioned, signed content bundles sync quickly and safely on weak networks?
**Build:** a manifest (version, checksums, sizes, signature) + bundles (schedule, POIs, guides, FAQ) served from static hosting/CDN; client that downloads deltas, verifies signatures, applies atomically, supports resume.
**Test:** 3G and flaky networks; interruptions; corrupted file; tampered manifest (must be rejected); schema migration; rollback; downloading on cellular vs Wi-Fi settings; storage quota; time to update after a publish; CDN cache invalidation behaviour; load simulation of 100k clients polling the manifest.
**Measure:** bytes transferred per update, time to usable, failure recovery, CPU/battery impact on A1.
**Deliverables:** format spec, results, recommended polling intervals, key management plan (who holds signing keys; rotation).

## Spike results log
| Spike | Owner | Start | End | Decision | Link to results |
|---|---|---|---|---|---|
| S1 | Claude Code sandbox run (web builds only) | 2026-10-03 | 2026-10-03 | No decision (no devices); finding F1 → D49 | spike-results/S1-mobile-framework.md |
| S2 | Claude Code sandbox run (desk only) | 2026-10-03 | 2026-10-03 | Provisional lean Payload (D50) | spike-results/S2-cms.md |
| S3 | Claude Code sandbox run | 2026-10-03 | 2026-10-03 | Provisional: PG FTS+trgm+normaliser (D47) | spike-results/S3-search.md |
| S4 | Claude Code sandbox run | 2026-10-03 | 2026-10-03 | Provisional: PMTiles+MapLibre+own glyphs (D48) | spike-results/S4-offline-maps.md |
| S5 | Claude Code sandbox run (desk only) | 2026-10-03 | 2026-10-03 | None — founder outreach needed | spike-results/S5-hosting-ethiopia.md |
| S6 | Claude Code sandbox run (desk only) | 2026-10-03 | 2026-10-03 | None — needs devices/credentials | spike-results/S6-push-notifications.md |
| S7 | Claude Code sandbox run | 2026-10-03 | 2026-10-03 | Provisional spec adopted (D46) | spike-results/S7-snapshot-sync.md |
