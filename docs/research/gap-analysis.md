# Phase 5 — Competitor & Gap Analysis (draft v1, 2026-10-01)
Basis: docs/research/benchmark-findings.md (desk research only; hands-on test results pending, see benchmark-test-plan.md).
Legend for matrix: ● documented in sources · ◐ partial/limited · ? not verified · ✗ none found (absence of evidence, not proof). Everything labelled "Opportunity/Hypothesis" is analysis, not fact.

## 1. Platform profiles
| Platform | Target event | Audience | Core features (documented) | Strengths | Limitations / unknowns | Lessons for us |
|---|---|---|---|---|---|---|
| COP30 Event Platform (UNFCCC + Social27) | COP30 Belém 2025 | Accredited participants, virtual delegates | Schedule + reminders, live/on-demand sessions, networking lounge, AI assistant, alerts, EN/PT | Official, badge-aware, hybrid | Badge-gated; public access ?; offline ?; maps ?; accessibility ?; 2 languages | Official core is gated: do not duplicate; link to it |
| COP29 apps (UNFCCC) | COP29 Baku 2024 | Participants + general | UN Climate Change app: docs, sessions, webcasts, Baku transport navigation, venue maps; COP29 Platform app: virtual participation, personal schedule, profile networking | Maps/transport in the UNFCCC app | Fragmented across 2 apps | Split of "info" vs "participation" apps is the norm |
| COP28 UAE app (host) | COP28 Dubai 2023 | Blue + Green Zone attendees | Interactive map/routing, programme, networking, private/remote meetings, nine itineraries | Host-layer precedent; itineraries for public | Reported website sustainability UX flaws | Our adoption model |
| Expo 2020 Dubai app | Expo 2020 | Public visitors | Tickets, personalised itinerary, Smart Queue slots, GPS map, chatbot | Queue booking | Retired 2025 | Queue/slot features solve real pain; plan lifecycle |
| Expo 2025 Visitors app | Expo Osaka 2025 | Public visitors | Reservations, wait times/crowding, map, stamp rally, translation companion | Real-time crowding | Needs venue data feeds | Crowd data = partnership dependency |
| Paris 2024 Official Programme app | Olympics | Fans | Programme in 9+ languages; audio description reported | Breadth of languages; accessibility attention | Details of accessibility ? | Treat accessibility as a feature set |
| Hayya / Ehteraz | World Cup Qatar 2022 | Ticket holders | Mandatory ticket/ID/visa/transport; COVID tracing | Everything in one pass | Over-permissioned, opaque privacy, no deletion route | What NOT to do on trust and consent |
| Whova | Conferences | Attendees, organisers | Agenda, community board, messaging, polls, Q&A, offline read of agenda/map/lists | Ease of use; stated offline scope | Template-based; Amharic ?; API ? | Offline-read scope is a feasible baseline |
| EventMobi | Conferences | Attendees | 27 languages, native apps, live streaming, white label | Language breadth; branding | Offline ?; app-store developer shows vendor | White-label limits matter for government ownership |
| Swapcard | Trade shows | Attendees, exhibitors | Matchmaking, offline badge scanning, API, CRM/registration integrations | Open API; offline scanning | Price per event; offline attendee app ? | API-first vendor; demo/integration candidate |
| Cvent Attendee Hub | Enterprise events | Attendees | WCAG 2.1 AA target, VPAT, captions, screen-reader support | Published accessibility artefacts | Cost; fit for public events ? | Publish a VPAT-style statement |
| Web Summit / CES / SXSW | Conferences | Attendees | Matchmaking, QR contact exchange, schedules | Scale experience | Critiques of matching quality | Networking over-featured for a public audience |

## 2. Capability matrix (documented evidence only)
| Capability | COP30 | COP29 | COP28 UAE | Expo 2020 | Expo 2025 | Paris 24 | Hayya | Whova | EventMobi | Swapcard | Cvent AH |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Schedule / personal agenda | ● | ● | ● | ● | ● | ● | ◐ | ● | ? | ? | ? |
| Venue map / wayfinding | ? | ● | ● | ● | ● | ? | ? | ● | ? | ? | ? |
| Queue / slot booking, crowd info | ✗ | ✗ | ✗ | ● | ● | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Networking / messaging | ● | ● | ● | ✗ | ✗ | ✗ | ✗ | ● | ? | ● | ? |
| Live + on-demand content | ● | ● | ◐ | ✗ | ✗ | ● | ✗ | ◐ | ● | ? | ● |
| Public (non-accredited) access | ? | ● | ● | ● | ● | ● | ◐ | n/a | n/a | n/a | n/a |
| Offline use | ? | ? | ? | ? | ? | ? | ? | ◐ | ? | ◐ (scanning) | ? |
| Languages beyond EN + host | ✗ (EN/PT) | ? | ? | ? | ● | ● | ◐ | ? | ● (27) | ? | ? |
| Accessibility documented | ? | ? | ? | ? | ? | ◐ | ✗ | ? | ? | ? | ● |
| Post-event archive / continuity | ? | ? | ? | ◐ (successor app) | ? | ◐ | ● (re-purposed) | ? | ? | ? | ? |
| Open API / integrations | ? | ? | ? | ? | ? | ? | ? | ? | ? | ● | ? |
| Privacy-friendly practice evidenced | ? | ? | ? | ? | ? | ? | ✗ | ? | ? | ◐ (bug bounty) | ◐ |
Takeaway: the matrix is mostly "?" — evidence of **how little is public** about official event apps' accessibility, offline and privacy practice. Hands-on tests should fill it.

## 3. Findings
### 3.1 Common features (every comparable has)
Schedule/agenda; speaker/session information; notifications; maps (host/public apps); multilingual UI of at least two languages; mobile apps on both stores.

### 3.2 Essential for our product (table stakes, D-level hypotheses)
Programme/schedule with filtering; personal agenda with reminders; push alerts for changes; venue and city maps with directions; English + Amharic with correct Ge'ez rendering (D11); event-agnostic content model (D5); accessible UI (WCAG 2.1 AA target); clear bilingual privacy notice; time-zone-correct times; news/announcements; content management for non-developers (Phase 15); search.

### 3.3 Differentiating features (opportunities)
1. **Public/Green-Zone layer:** capacity, day-pass, entry guidance and queue/wait information, itineraries by interest and time (COP28/Expo precedent) — depends on host data.
2. **Addis city companion:** accommodation, transport, safety, money/SIM/e-visa guidance, local events — COP30 showed accommodation shortfalls reduced attendance; COP29 built a host accommodation platform.
3. **Amharic-first quality:** correct rendering, search, audio — no competitor documented Amharic support.
4. **Remote follower experience:** live streams, daily summaries, plain-language explainers in EN/AM, key-outcome tracker — official platforms target accredited users.
5. **Post-event archive & commitments tracker** — a durable purpose (lifecycle evidence in post-event-precedents.md).
6. **Trust & transparency by design:** minimal permissions, optional accounts, delete-my-data, published accessibility and privacy statements — contrast with Hayya.
7. **Event-agnostic core** allows reuse (AU/UNECA events in Addis, later COPs).

### 3.4 Features possibly unnecessary (for MVP/public audience)
Deep AI matchmaking (evidence of low value at scale); native gamification beyond simple stamp/quiz; full virtual-expo/3D booths; in-app video conferencing; chat communities needing heavy moderation (cost/risk); payments/ticketing (unless host requires); AR wayfinding. Reconsider after validation.

### 3.5 Underserved user needs (hypotheses to validate in Phase 6)
Non-accredited visitors needing entry/queue/capacity clarity; Ethiopians wanting local-language explanations and ways to take part; journalists needing verified, timely, bilingual releases and logistics; remote followers across time zones; people with disabilities (documented accessibility is rare); visitors needing accommodation/transport help in a constrained city.

### 3.6 Opportunities for innovation (bounded by capacity)
Offline-first schedule/map/guide beyond Whova's read-only scope with background sync; time-zone-aware "what's happening now/next in my time zone"; plain-language summaries (human-edited, AI-assisted with review); crowd/queue reporting if venue feeds exist; accessible audio versions in Amharic; open event-data model/API for partners.

### 3.7 Risks of copying existing products
Duplicating the gated delegate platform (scope, data access, legal); copying networking-heavy features without audience fit; adopting vendor patterns that bake in English-only/LTR assumptions; copying mandatory-app/data-hungry patterns (Hayya); building features dependent on venue data we may never get; feature bloat vs. a 3-developer volunteer team; accidental implication of "official" status.

### 3.8 Features particularly relevant to Ethiopia/Africa
Amharic (and later Oromo/Tigrinya? — F: language demand not researched); Ge'ez font bundling; Ethiopian calendar awareness (Ethiopia uses its own calendar; COP32 is in Nov 2027 = Hidar/Tikimt 2020 E.C. — verify; show both calendars as a courtesy; hypothesis); local-payments irrelevant for MVP; mobile-money not needed unless ticketing; low-end Android performance; data-light media; Addis traffic and transport guidance; e-visa guidance; security/safety advisories; integration with local channels (Telegram) deferred (D9).

### 3.9 Features required by COP32's unique nature
Dual-presidency/host dynamics (Ethiopia as host + UNFCCC process); African Group priorities content; Green Legacy storytelling and citizen participation; large public/side-event programme (ACS2 had 300+ side events from 700+ applications → side-event discovery); pavilions directory (24 at ACS2); climate-finance/commitments explainer content; high-profile security/crowd advisories; official-source verification (anti-misinformation) given a global audience.

## 4. Revisit of D8 (delegate-workflow scope)
Evidence supports D8: official platforms own badge-gated negotiation tooling and no vendor/precedent shows third parties succeeding there. **Recommendation: keep D8.** Two bounded additions to consider in Phase 7: (a) deep links/handoff to the official platform for registered delegates; (b) delegate-friendly *logistics* (map, transport, accommodation, itineraries) as the public layer already covers.

## 5. Implications for Phase 6–8 (preview)
Persona focus: non-accredited visitor, Ethiopian resident, journalist, remote follower, side-event organiser/exhibitor, volunteer. MVP candidate themes: bilingual programme + agenda + alerts + maps + city guide + news + accessibility/privacy foundations. Later: Green Zone capacity/queues (data-dependent), archive, commitments tracker.

## 6. Open items
Hands-on test results; confirm Ethiopian calendar claim; language demand beyond Amharic; whether host will run a Green Zone; vendor build-vs-buy for demo (Phase 11).
