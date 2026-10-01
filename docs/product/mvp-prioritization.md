# Phase 8 — MVP & Product Prioritisation (draft v1, 2026-10-01)
Inputs: feature-catalog.md (133 catalog features + 10 founder ideas + 9 bold ideas = 152 items), personas (D12), decisions D1–D14.
**Status: draft for review.** Scores are structured judgement, not measurement — the method is transparent so anyone can re-score. BA interview results and hands-on tests may change scores.

## 1. Definitions
- **MVP** = the minimum product that serves COP32 users credibly **before, during and after** the conference (target: event release, Oct 2027).
- **Releases (timing, separate from priority):**
  - **Demo (by 31 Dec 2026, gate G1/D10):** the pitch build — shows how it looks and works with sample data.
  - **Pilot (Jun 2027):** real public content, real users (aligns with mid-2027 pilot and the June UNFCCC subsidiary sessions).
  - **Event (Oct 2027):** live programme, maps, alerts, streams once host data exists.
  - **Post-event (Dec 2027+):** archive, outcomes follow-up.
- **Classes:** Must (MVP) · Should (event release if capacity) · Could (if capacity / post-event) · Later (after COP32) · Not recommended.

## 2. Scoring method
Eight criteria, each scored 1–3 where **3 is always "better for prioritising"**:
| Code | Criterion | 3 means | Weight |
|---|---|---|---|
| UV | User value (Tier-1 personas, D12) | High value to Tier-1 users | 3 |
| SV | Strategic value (pitch/demo, D6 recognition markers, government adoption) | Strongly helps endorsement/funding | 2 |
| CR | COP32 relevance | Specific to COP32/Ethiopia | 2 |
| FE | Feasibility (technical complexity + cost combined) | Simple/cheap → size **S**; 2 = **M**; 1 = **L** | 2 |
| TI | Time to implement | Fast | 1 |
| R | Risk (privacy, moderation, accuracy, reputational) | Low risk | 1 |
| DP | Dependency on external data/approval | None or manual fallback exists | 2 |
| SC | Scalability/reuse (event-agnostic, D5) | Reusable for future events | 1 |
Score = Σ(score × weight); range 14–42.

**Thresholds:** Must ≥ 35 · Should 30–34 · Could 26–29 · Later ≤ 25.
**Overrides (stated, not hidden):**
- *Foundation overrides → Must regardless of score:* guest mode, language switch, time zones, privacy notice, minimal permissions, delete/export data, unofficial disclaimer, source verification, consent, accessibility baseline, text size, Ethiopic font, emergency alerts, notification controls, bilingual CMS, approval workflow, emergency publishing, audit log. Reason: legal/trust/safety or prerequisites of everything else.
- *Not recommended:* AI matchmaking, virtual booths, Amharic voice assistant (for now) — low value or high risk/cost for this audience.
- *Later by decision:* SMS/Telegram channel and additional languages (D9).
- *Rule for data-dependent Musts:* a feature that depends on host/UNFCCC data may be Must only if a **manual fallback** (staff entry, spreadsheet import, links) exists.
- Plus one structural Must not listed as a feature: the **event-agnostic data model (D5)**.

## 3. Results summary
| Class | Count | Notes |
|---|---|---|
| Must | 72 | 52 small, 20 medium, 0 large. ~25 are mainly **editorial content** (explainers, guides, FAQs), not engineering |
| Should | 40 | Event release if capacity |
| Could | 22 | If capacity / post-event |
| Later | 15 | After COP32 |
| Not recommended | 3 | |
Must by release: Demo 30 · Pilot 31 · Event 9 · Post-event 2.

**Capacity warning (challenge):** 72 Musts is a lot for 3 volunteer developers across Android, iOS and web, plus EN/AM content. Mitigations: (a) content Musts fall on the BA/PM/content contributors, not developers; (b) if Phase 18 estimates exceed capacity, **raise the Must threshold to ≥ 37** (≈ 52 Musts + foundations) and move 35–36 items to Should; (c) a cross-platform framework choice in Phase 11 could reduce effort (not decided).

## 4. Key prioritisation decisions and reasoning
1. **Visitor hub framing wins (F-01):** city companion items (transport, accommodation link-outs, arrival checklist, attractions, coffee culture, ride-hailing) score Must — high Tier-1 value, little dependency, strong demo appeal, and they match the founder's "all in one app" vision via link-outs (D14).
2. **Programme features are Must but data-dependent:** schedule, sessions and side events need host data; MVP must support spreadsheet/manual import (ADM-04) so the demo/pilot works without official feeds.
3. **Real-time transit (F-06b), queue/capacity info and slot booking are Should/Later:** valuable, but no official real-time feeds exist and venue data is uncertain. Static routes from open GTFS (F-06a) are Must.
4. **Networking is mostly Could/Later:** evidence shows low value at scale for a public audience; QR contact exchange is the only Should.
5. **Engagement with moderation risk (comments, photo wall, Q&A) is Could/Later:** moderation cost and reputational risk outweigh value for a volunteer team.
6. **Trust & accessibility are foundations:** the Hayya lesson; government adoption requires them; they're cheap if built in from day 1.
7. **Demo enablers are Must for the Demo release only** (sample data, theming); the government dashboard mock is Should but included in the Demo set because it helps the pitch.
8. **Post-event archive and outcomes follow-up are Must** (lifecycle evidence, D5) but scheduled Post-event.
9. **Flight booking link-out is Should:** low incremental value; visitors already book flights elsewhere.
10. **Ethiopian calendar display is Should** pending validation (BA interviews).

## 5. Demo scope (Dec 2026) — what officials would see
Home in EN/AM → COP32 overview & "Can I attend?" → sample programme & session pages → personal agenda with time zones → city companion (transport guide, accommodation & visa link-outs, ride-hailing options, attractions, coffee culture) → news with verified-source labels → FAQ → COP explained / Africa & Ethiopia context → privacy notice & unofficial disclaimer → government dashboard mock. All with clearly labelled sample data.

## 6. Full scoring table

### Must (72)
| ID | Feature | UV | SV | CR | FE | TI | R | DP | SC | Score /42 | Size | Release | Note |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| INF-01 | COP32 overview | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 42 | S | Demo (Dec 2026) |  |
| INF-10 | Verified-source labels | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 42 | S | Demo (Dec 2026) |  |
| INF-12 | FAQs | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 42 | S | Demo (Dec 2026) |  |
| PER-03 | Language switch EN/AM | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 42 | S | Demo (Dec 2026) | Foundation override |
| NAV-08 | Arrival checklist | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 42 | S | Demo (Dec 2026) |  |
| NOT-04 | Announcements broadcast | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 42 | S | Pilot (Jun 2027) |  |
| PUB-02 | COP explained | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 42 | S | Demo (Dec 2026) |  |
| PUB-03 | Africa & Ethiopia climate context | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 42 | S | Demo (Dec 2026) |  |
| TRU-01 | Bilingual privacy notice | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 42 | S | Demo (Dec 2026) | Foundation override |
| TRU-06 | Source verification workflow | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 42 | S | Pilot (Jun 2027) | Foundation override |
| ACC-03 | Bundled Ethiopic font (D11) | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 42 | S | Demo (Dec 2026) | Foundation override |
| F-04 | Visa process (link to official e-visa) | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 42 | S | Demo (Dec 2026) |  |
| INF-09 | News & announcements | 3 | 3 | 3 | 3 | 3 | 2 | 3 | 3 | 41 | S | Demo (Dec 2026) |  |
| MED-05 | Plain-language explainers | 3 | 3 | 3 | 3 | 2 | 3 | 3 | 3 | 41 | S | Demo (Dec 2026) |  |
| ADM-03 | Emergency publishing | 3 | 3 | 3 | 3 | 3 | 2 | 3 | 3 | 41 | S | Pilot (Jun 2027) | Foundation override |
| ADM-05 | Notification console | 3 | 3 | 3 | 3 | 3 | 2 | 3 | 3 | 41 | S | Pilot (Jun 2027) |  |
| PER-01 | Guest mode (no account needed) | 3 | 3 | 2 | 3 | 3 | 3 | 3 | 3 | 40 | S | Demo (Dec 2026) | Foundation override |
| PER-04 | Time-zone setting | 3 | 2 | 3 | 3 | 3 | 3 | 3 | 3 | 40 | S | Demo (Dec 2026) | Foundation override |
| PER-05 | Personal agenda + calendar export | 3 | 3 | 2 | 3 | 3 | 3 | 3 | 3 | 40 | S | Demo (Dec 2026) |  |
| NAV-05 | Transport guide | 3 | 3 | 3 | 3 | 3 | 3 | 2 | 3 | 40 | S | Demo (Dec 2026) |  |
| NAV-14 | Safety & emergency info | 3 | 3 | 3 | 3 | 3 | 3 | 2 | 3 | 40 | S | Event (Oct 2027) |  |
| MED-04 | Daily digest (EN/AM) | 3 | 3 | 3 | 3 | 2 | 2 | 3 | 3 | 40 | S | Pilot (Jun 2027) |  |
| MED-08 | Press centre section | 3 | 3 | 3 | 3 | 3 | 3 | 2 | 3 | 40 | S | Event (Oct 2027) |  |
| TRU-02 | Minimal permissions | 3 | 3 | 2 | 3 | 3 | 3 | 3 | 3 | 40 | S | Pilot (Jun 2027) | Foundation override |
| F-07 | Tourist attractions & must-visit places | 3 | 3 | 2 | 3 | 3 | 3 | 3 | 3 | 40 | S | Demo (Dec 2026) |  |
| INF-02 | "Can I attend?" guide | 3 | 3 | 3 | 3 | 3 | 2 | 2 | 3 | 39 | S | Demo (Dec 2026) |  |
| NAV-07 | Accommodation guide | 3 | 3 | 3 | 3 | 3 | 2 | 2 | 3 | 39 | S | Demo (Dec 2026) |  |
| PUB-01 | Climate basics hub | 3 | 2 | 3 | 3 | 2 | 3 | 3 | 3 | 39 | S | Pilot (Jun 2027) |  |
| TRU-04 | Unofficial-status disclaimer | 2 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 39 | S | Demo (Dec 2026) | Foundation override |
| ACC-01 | WCAG 2.1 AA baseline | 3 | 3 | 3 | 2 | 2 | 3 | 3 | 3 | 39 | M | Pilot (Jun 2027) | Foundation override |
| ADM-01 | Bilingual CMS | 3 | 3 | 3 | 2 | 2 | 3 | 3 | 3 | 39 | M | Demo (Dec 2026) | Foundation override |
| ADM-02 | Approval workflow | 3 | 3 | 3 | 2 | 2 | 3 | 3 | 3 | 39 | M | Pilot (Jun 2027) | Foundation override |
| F-02 | Hotel booking (link-out) | 3 | 3 | 3 | 3 | 3 | 2 | 2 | 3 | 39 | S | Demo (Dec 2026) |  |
| F-05 | Ride-hailing deep links | 3 | 3 | 3 | 3 | 3 | 2 | 2 | 3 | 39 | S | Demo (Dec 2026) |  |
| PER-07 | Reminders | 3 | 2 | 2 | 3 | 3 | 3 | 3 | 3 | 38 | S | Pilot (Jun 2027) |  |
| NOT-02 | Session reminders (push) | 3 | 2 | 2 | 3 | 3 | 3 | 3 | 3 | 38 | S | Pilot (Jun 2027) |  |
| NOT-06 | Notification centre & controls | 3 | 2 | 2 | 3 | 3 | 3 | 3 | 3 | 38 | S | Pilot (Jun 2027) | Foundation override |
| PUB-08 | Myth-busting / fact checks | 2 | 3 | 3 | 3 | 3 | 2 | 3 | 3 | 38 | S | Pilot (Jun 2027) |  |
| ACC-02 | Dynamic text size | 3 | 2 | 2 | 3 | 3 | 3 | 3 | 3 | 38 | S | Pilot (Jun 2027) | Foundation override |
| INF-13 | Glossary / jargon buster | 2 | 2 | 3 | 3 | 3 | 3 | 3 | 3 | 37 | S | Pilot (Jun 2027) |  |
| INF-15 | Countdown & key dates | 2 | 3 | 3 | 3 | 3 | 3 | 2 | 3 | 37 | S | Pilot (Jun 2027) |  |
| PER-09 | Role selection | 2 | 3 | 2 | 3 | 3 | 3 | 3 | 3 | 37 | S | Demo (Dec 2026) |  |
| NAV-03 | City map & points of interest | 3 | 3 | 3 | 2 | 2 | 3 | 2 | 3 | 37 | M | Demo (Dec 2026) |  |
| NAV-13 | Offline city & venue pack | 3 | 3 | 2 | 2 | 2 | 3 | 3 | 3 | 37 | M | Pilot (Jun 2027) |  |
| ENG-09 | Share cards | 2 | 3 | 2 | 3 | 3 | 3 | 3 | 3 | 37 | S | Pilot (Jun 2027) |  |
| MED-01 | Live stream links/embeds | 3 | 3 | 3 | 3 | 3 | 2 | 1 | 3 | 37 | S | Event (Oct 2027) |  |
| PST-04 | Historical archive | 2 | 3 | 2 | 3 | 3 | 3 | 3 | 3 | 37 | S | Post-event |  |
| ACC-05 | Accessibility statement | 2 | 3 | 2 | 3 | 3 | 3 | 3 | 3 | 37 | S | Pilot (Jun 2027) |  |
| OPS-02 | Offline volunteer FAQ | 2 | 3 | 3 | 3 | 3 | 3 | 2 | 3 | 37 | S | Pilot (Jun 2027) |  |
| ADM-07 | Privacy-respecting analytics | 2 | 3 | 2 | 3 | 3 | 3 | 3 | 3 | 37 | S | Pilot (Jun 2027) |  |
| ADM-09 | Audit log | 2 | 3 | 2 | 3 | 3 | 3 | 3 | 3 | 37 | S | Pilot (Jun 2027) | Foundation override |
| F-08 | Coffee culture & ceremony | 2 | 3 | 2 | 3 | 3 | 3 | 3 | 3 | 37 | S | Demo (Dec 2026) |  |
| INF-03 | Programme / schedule | 3 | 3 | 3 | 2 | 2 | 2 | 2 | 3 | 36 | M | Demo (Dec 2026) |  |
| INF-07 | Side-events directory | 3 | 3 | 3 | 2 | 2 | 2 | 2 | 3 | 36 | M | Event (Oct 2027) |  |
| NAV-02 | Session-to-map link | 3 | 2 | 2 | 3 | 3 | 3 | 2 | 3 | 36 | S | Event (Oct 2027) |  |
| NAV-04 | Directions hand-off to map apps | 3 | 2 | 2 | 3 | 3 | 3 | 2 | 3 | 36 | S | Pilot (Jun 2027) |  |
| PUB-04 | Key outcomes tracker | 3 | 3 | 3 | 2 | 2 | 2 | 2 | 3 | 36 | M | Event (Oct 2027) |  |
| ADM-04 | Schedule import (feed or spreadsheet) | 3 | 3 | 3 | 2 | 2 | 2 | 2 | 3 | 36 | M | Pilot (Jun 2027) |  |
| DEM-01 | Demo dataset | 2 | 3 | 2 | 3 | 3 | 3 | 3 | 2 | 36 | S | Demo (Dec 2026) |  |
| F-01 | One-stop visitor hub (framing) | 3 | 3 | 3 | 2 | 2 | 2 | 2 | 3 | 36 | M | Demo (Dec 2026) |  |
| F-06a | Public transport routes & trip planner (open GTFS) | 3 | 3 | 3 | 2 | 2 | 2 | 2 | 3 | 36 | M | Pilot (Jun 2027) |  |
| INF-04 | Session detail pages | 3 | 3 | 3 | 2 | 2 | 3 | 1 | 3 | 35 | M | Demo (Dec 2026) |  |
| INF-11 | Documents & resources (links) | 2 | 2 | 3 | 3 | 3 | 3 | 2 | 3 | 35 | S | Pilot (Jun 2027) |  |
| INF-16 | Global search (Ge'ez-aware) | 3 | 2 | 2 | 2 | 2 | 3 | 3 | 3 | 35 | M | Pilot (Jun 2027) |  |
| PER-11 | Self-guided itineraries | 2 | 3 | 3 | 2 | 3 | 3 | 2 | 3 | 35 | M | Pilot (Jun 2027) |  |
| NAV-01 | Venue maps | 3 | 3 | 3 | 2 | 2 | 3 | 1 | 3 | 35 | M | Event (Oct 2027) |  |
| NAV-09 | Accessibility info (venues) | 3 | 3 | 3 | 2 | 2 | 3 | 1 | 3 | 35 | M | Event (Oct 2027) |  |
| NOT-01 | Schedule-change alerts | 3 | 3 | 3 | 2 | 2 | 3 | 1 | 3 | 35 | M | Event (Oct 2027) |  |
| PST-03 | Outcomes & follow-up | 2 | 3 | 3 | 3 | 2 | 2 | 2 | 3 | 35 | S | Post-event |  |
| NOT-03 | Emergency / safety alerts | 3 | 3 | 3 | 2 | 2 | 2 | 1 | 3 | 34 | M | Pilot (Jun 2027) | Foundation override |
| TRU-03 | Delete / export my data | 2 | 3 | 2 | 2 | 2 | 3 | 3 | 3 | 34 | M | Pilot (Jun 2027) | Foundation override |
| TRU-07 | Consent management | 2 | 3 | 2 | 2 | 2 | 3 | 3 | 3 | 34 | M | Pilot (Jun 2027) | Foundation override |

### Should (40)
| ID | Feature | UV | SV | CR | FE | TI | R | DP | SC | Score /42 | Size | Release | Note |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| NAV-06 | Road closures & traffic alerts | 3 | 3 | 3 | 2 | 2 | 2 | 1 | 3 | 34 | M | Event (if capacity) |  |
| DEM-03 | White-label theming | 1 | 3 | 2 | 3 | 3 | 3 | 3 | 3 | 34 | S | Event (if capacity) |  |
| B-01 | "What's on near me now" view | 2 | 3 | 3 | 2 | 2 | 3 | 2 | 3 | 34 | M | Event (if capacity) |  |
| INF-05 | Speakers directory | 2 | 2 | 3 | 3 | 3 | 3 | 1 | 3 | 33 | S | Event (if capacity) |  |
| INF-06 | Exhibitors & pavilions directory | 2 | 2 | 3 | 3 | 3 | 3 | 1 | 3 | 33 | S | Event (if capacity) |  |
| INF-14 | Thematic days & topics | 2 | 1 | 3 | 3 | 3 | 3 | 2 | 3 | 33 | S | Event (if capacity) |  |
| ENG-03 | Surveys / feedback | 2 | 2 | 1 | 3 | 3 | 3 | 3 | 3 | 33 | S | Event (if capacity) |  |
| EXH-01 | Exhibitor/pavilion pages | 2 | 2 | 3 | 3 | 3 | 3 | 1 | 3 | 33 | S | Event (if capacity) |  |
| EXH-02 | Organiser self-service portal | 3 | 3 | 3 | 1 | 1 | 2 | 2 | 3 | 33 | L | Event (if capacity) |  |
| PUB-07 | Green Legacy progress | 2 | 3 | 3 | 3 | 3 | 2 | 1 | 2 | 33 | S | Event (if capacity) |  |
| TRU-05 | Report content / abuse | 2 | 2 | 1 | 3 | 3 | 3 | 3 | 3 | 33 | S | Event (if capacity) |  |
| ACC-04 | Ethiopian calendar display | 1 | 2 | 3 | 3 | 3 | 2 | 3 | 3 | 33 | S | Event (if capacity) |  |
| ACC-07 | Low-data mode | 2 | 1 | 2 | 3 | 3 | 3 | 3 | 3 | 33 | S | Event (if capacity) |  |
| DEM-02 | Government dashboard mock | 1 | 3 | 2 | 3 | 3 | 3 | 3 | 2 | 33 | S | Event (if capacity) |  |
| B-06 | Media/research data packs | 2 | 2 | 2 | 3 | 3 | 3 | 2 | 3 | 33 | S | Event (if capacity) |  |
| PER-08 | Follow topics | 2 | 1 | 2 | 3 | 2 | 3 | 3 | 3 | 32 | S | Event (if capacity) |  |
| MED-02 | On-demand recordings | 2 | 2 | 3 | 3 | 3 | 2 | 1 | 3 | 32 | S | Event (if capacity) |  |
| MED-06 | Amharic audio content | 2 | 2 | 2 | 2 | 2 | 3 | 3 | 3 | 32 | M | Event (if capacity) |  |
| MED-09 | Press releases EN/AM | 2 | 2 | 3 | 3 | 3 | 2 | 1 | 3 | 32 | S | Event (if capacity) |  |
| NOT-05 | Personalised topic alerts | 2 | 1 | 2 | 3 | 2 | 3 | 3 | 3 | 32 | S | Event (if capacity) |  |
| NOT-07 | Email digest option | 2 | 1 | 2 | 3 | 3 | 2 | 3 | 3 | 32 | S | Event (if capacity) |  |
| PUB-06 | Initiatives directory | 2 | 2 | 3 | 3 | 3 | 2 | 1 | 3 | 32 | S | Event (if capacity) |  |
| PST-06 | Handover / reuse for next event | 2 | 3 | 1 | 2 | 2 | 3 | 3 | 3 | 32 | M | Event (if capacity) |  |
| OPS-01 | Volunteer mode | 2 | 3 | 3 | 2 | 2 | 3 | 1 | 3 | 32 | M | Event (if capacity) |  |
| F-09 | Light-rail digital ticket link | 2 | 2 | 2 | 3 | 3 | 2 | 2 | 3 | 32 | S | Event (if capacity) |  |
| B-07 | Classroom packs (Amharic) | 2 | 2 | 2 | 2 | 2 | 3 | 3 | 3 | 32 | M | Event (if capacity) |  |
| PER-06 | Favourites | 2 | 1 | 1 | 3 | 3 | 3 | 3 | 3 | 31 | S | Event (if capacity) |  |
| ENG-07 | Personal climate pledges | 1 | 1 | 3 | 3 | 3 | 2 | 3 | 3 | 31 | S | Event (if capacity) |  |
| NET-07 | Networking events listing | 2 | 2 | 2 | 3 | 3 | 3 | 1 | 3 | 31 | S | Event (if capacity) |  |
| EXH-03 | Change notifications to followers | 3 | 2 | 2 | 2 | 2 | 3 | 1 | 3 | 31 | M | Event (if capacity) |  |
| PST-02 | Proceedings & reports | 2 | 2 | 2 | 3 | 3 | 3 | 1 | 3 | 31 | S | Event (if capacity) |  |
| OPS-05 | Operational broadcasts | 2 | 2 | 2 | 3 | 3 | 3 | 1 | 3 | 31 | S | Event (if capacity) |  |
| ADM-06 | Moderation queue | 2 | 1 | 1 | 3 | 3 | 3 | 3 | 3 | 31 | S | Event (if capacity) |  |
| F-03 | Flight booking (link-out) | 1 | 2 | 2 | 3 | 3 | 2 | 3 | 3 | 31 | S | Event (if capacity) |  |
| NAV-11 | Queue / wait-time & capacity info | 3 | 3 | 3 | 1 | 1 | 2 | 1 | 2 | 30 | L | Event (if capacity) |  |
| NET-03 | QR contact exchange | 2 | 1 | 1 | 3 | 3 | 2 | 3 | 3 | 30 | S | Event (if capacity) |  |
| MED-10 | AI-assisted summaries (editor-reviewed) | 2 | 2 | 2 | 2 | 2 | 1 | 3 | 3 | 30 | M | Event (if capacity) |  |
| EXH-04 | Aggregate interest counts | 1 | 1 | 2 | 3 | 3 | 3 | 3 | 3 | 30 | S | Event (if capacity) |  |
| EXH-05 | Exhibition map | 2 | 2 | 3 | 2 | 2 | 3 | 1 | 3 | 30 | M | Event (if capacity) |  |
| F-06b | Real-time transit tracker | 3 | 3 | 3 | 1 | 1 | 2 | 1 | 2 | 30 | L | Event (if capacity) |  |

### Could (22)
| ID | Feature | UV | SV | CR | FE | TI | R | DP | SC | Score /42 | Size | Release | Note |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| INF-08 | Partners & sponsors directory | 1 | 2 | 1 | 3 | 3 | 2 | 3 | 3 | 29 | S | Post-event / if capacity |  |
| PER-02 | Optional profile | 2 | 2 | 1 | 2 | 2 | 2 | 3 | 3 | 29 | M | Post-event / if capacity |  |
| ENG-02 | Live polls | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 3 | 29 | M | Post-event / if capacity |  |
| ENG-08 | Quizzes / learning paths | 1 | 2 | 2 | 2 | 2 | 3 | 3 | 3 | 29 | M | Post-event / if capacity |  |
| PST-01 | Recordings library | 2 | 2 | 2 | 3 | 2 | 2 | 1 | 3 | 29 | S | Post-event / if capacity |  |
| ADM-08 | Multi-event setup UI (D5) | 1 | 3 | 1 | 2 | 2 | 3 | 3 | 3 | 29 | M | Post-event / if capacity |  |
| B-03 | Regional climate stories (moderated UGC) | 2 | 2 | 3 | 1 | 2 | 1 | 3 | 2 | 29 | L | Post-event / if capacity |  |
| B-09 | Post-COP 'Addis Climate Hub' calendar | 2 | 3 | 1 | 2 | 2 | 2 | 2 | 3 | 29 | M | Post-event / if capacity |  |
| B-05 | Ask-an-expert sessions | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 28 | M | Post-event / if capacity |  |
| B-08 | Local business directory | 2 | 2 | 1 | 2 | 2 | 1 | 3 | 3 | 28 | M | Post-event / if capacity |  |
| PER-10 | Rules-based recommendations | 2 | 1 | 1 | 2 | 2 | 2 | 3 | 3 | 27 | M | Post-event / if capacity |  |
| ENG-04 | Reactions | 1 | 1 | 1 | 3 | 3 | 2 | 3 | 3 | 27 | S | Post-event / if capacity |  |
| NET-01 | Opt-in professional profile | 2 | 1 | 1 | 2 | 2 | 2 | 3 | 3 | 27 | M | Post-event / if capacity |  |
| MED-03 | Captions & transcripts | 2 | 2 | 2 | 2 | 2 | 2 | 1 | 3 | 27 | M | Post-event / if capacity |  |
| MED-07 | Photo/video galleries | 1 | 2 | 2 | 3 | 3 | 2 | 1 | 3 | 27 | S | Post-event / if capacity |  |
| PUB-05 | Commitments/pledges tracker | 2 | 3 | 3 | 1 | 1 | 1 | 1 | 3 | 27 | L | Post-event / if capacity |  |
| OPS-03 | Report-issue button | 2 | 2 | 2 | 2 | 2 | 2 | 1 | 3 | 27 | M | Post-event / if capacity |  |
| ENG-01 | Session Q&A | 2 | 2 | 2 | 2 | 2 | 1 | 1 | 3 | 26 | M | Post-event / if capacity |  |
| ENG-06 | Stamp rally / challenges | 2 | 2 | 2 | 2 | 2 | 2 | 1 | 2 | 26 | M | Post-event / if capacity |  |
| NET-05 | Meeting requests | 2 | 1 | 1 | 2 | 2 | 2 | 3 | 2 | 26 | M | Post-event / if capacity |  |
| PST-07 | Certificates of participation | 1 | 2 | 2 | 3 | 3 | 2 | 1 | 2 | 26 | S | Post-event / if capacity |  |
| ADM-10 | Open data / public API | 1 | 2 | 1 | 2 | 2 | 2 | 3 | 3 | 26 | M | Post-event / if capacity |  |

### Later (15)
| ID | Feature | UV | SV | CR | FE | TI | R | DP | SC | Score /42 | Size | Release | Note |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| NOT-08 | SMS / Telegram channel | 2 | 2 | 2 | 2 | 2 | 2 | 1 | 2 | 26 | M | After COP32 | Override |
| ACC-06 | Additional languages | 2 | 2 | 2 | 1 | 1 | 2 | 2 | 3 | 26 | L | After COP32 | Override |
| NET-02 | Participant discovery | 2 | 1 | 1 | 2 | 2 | 1 | 3 | 2 | 25 | M | After COP32 |  |
| PER-12 | Cross-device sync | 1 | 1 | 1 | 2 | 2 | 2 | 3 | 3 | 24 | M | After COP32 |  |
| NAV-10 | Indoor turn-by-turn wayfinding | 2 | 2 | 2 | 1 | 1 | 2 | 1 | 2 | 23 | L | After COP32 |  |
| ACC-08 | Sign-language content | 2 | 2 | 2 | 1 | 1 | 2 | 1 | 2 | 23 | L | After COP32 |  |
| OPS-04 | Shift/task info | 1 | 2 | 2 | 2 | 2 | 2 | 1 | 2 | 23 | M | After COP32 |  |
| NAV-12 | Slot booking for popular spaces | 2 | 2 | 2 | 1 | 1 | 1 | 1 | 2 | 22 | L | After COP32 |  |
| ENG-05 | Comments / discussions | 1 | 1 | 1 | 2 | 2 | 1 | 3 | 2 | 22 | M | After COP32 |  |
| ENG-10 | Photo wall / user content | 1 | 1 | 1 | 2 | 2 | 1 | 3 | 2 | 22 | M | After COP32 |  |
| NET-04 | Messaging | 2 | 1 | 1 | 1 | 1 | 1 | 3 | 2 | 22 | L | After COP32 |  |
| EXH-06 | Exhibitor lead capture | 1 | 1 | 1 | 2 | 2 | 1 | 3 | 2 | 22 | M | After COP32 |  |
| PST-05 | Community continuation | 1 | 1 | 1 | 2 | 2 | 1 | 3 | 2 | 22 | M | After COP32 |  |
| B-04 | Trip carbon calculator | 1 | 1 | 2 | 2 | 2 | 1 | 2 | 2 | 22 | M | After COP32 |  |
| NET-08 | Community groups | 1 | 1 | 1 | 1 | 1 | 1 | 3 | 2 | 19 | L | After COP32 |  |

### Not recommended (3)
| ID | Feature | UV | SV | CR | FE | TI | R | DP | SC | Score /42 | Size | Release | Note |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| B-02 | Amharic voice assistant | 2 | 2 | 2 | 1 | 1 | 1 | 3 | 2 | 26 | L | — | Override |
| NET-06 | AI matchmaking | 1 | 1 | 1 | 1 | 1 | 1 | 3 | 2 | 19 | L | — | Override |
| EXH-07 | Virtual booths | 1 | 1 | 1 | 1 | 1 | 1 | 3 | 1 | 18 | L | — | Override |
## 7. Next
- Founder review of classes, especially Must count and Demo scope.
- Re-score after BA interviews and hands-on tests.
- Phase 9 (information architecture) will organise the Must/Should features into a sitemap and navigation.
