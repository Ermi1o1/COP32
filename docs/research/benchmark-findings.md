# Phase 4 — Benchmark Findings (first pass, 2026-10-01)
Legend: [V] vendor/official claim · [I] independent/press · [?] not verified. No ranking: the aim is patterns, gaps, lessons.
Limits: unfccc.int and some vendor pages failed to load; vendor feature lists are marketing claims; no hands-on testing of any app yet (recommended before Phase 5 sign-off: install COP30 app, Whova demo, Swapcard demo).

## A. Climate / UN conference platforms
### A1. COP30 Event Platform (UNFCCC, Belém 2025)
- Purpose: official delegate/participant platform, web + Android/iOS. Built by UNFCCC Digital Participation Team with Social27 [V, search summary; primary page not retrievable].
- Users/access: registered participants; features gated "according to your badge type"; virtual-only delegates supported.
- Features [V]: personalised schedule + reminders; live and on-demand sessions, side meetings, press conferences; networking (delegates, NGOs, policymakers; "networking lounge"); AI assistant ("Platform GPT"); alerts for sessions, location changes, announcements; English + Portuguese.
- Not found [?]: public (non-accredited) access, offline mode, maps, accessibility statement, Amharic/other languages, open data/API.
- Lessons: UNFCCC treats the platform as a per-COP product; localisation limited to host language + English (COP32 would be English + Amharic: our default pair); gating by badge leaves non-accredited public to other channels.

### A2. COP28 apps (UAE, 2023)
- Two apps: UNFCCC "UN Climate Change" app (news, push notifications, meeting search filters, public live streams, logistics, official documents) and host-government **COP28 UAE app** (interactive map and routing for Expo City, full programme, LinkedIn-style networking, private/remote meetings, personalised scheduling, recommendations, nine self-guided itineraries of 2–4 hours) [V/I: unfccc.int, Khaleej Times, Zawya]. Android, iOS and Huawei.
- Website: independent review found the "low carbon" website version needed a 500+ kB JavaScript file to toggle and replaced images with gradient boxes that looked broken [I: Fershad Irani].
- Lessons: the **host-country app** pattern is the precedent for our pitch; public Green Zone visitors got itineraries/maps; Huawei support (relevant to Ethiopia? Huawei devices exist there — F); sustainability messaging can backfire if poorly executed.

### A3. Second Africa Climate Summit (Addis, Sep 2025) — local precedent
- 25,000+ participants, 50+ official events, 300+ side events chosen from 700+ applications, 24 pavilions, 45+ heads of state [I: AU, UNDP; search summaries]. Held at Addis International Convention Center.
- Official app/platform: **none found** (absence not proven). Website africaclimatesummit2.et exists.
- Lessons: scale is a useful baseline for COP32 (COP32 likely 2–3x); side-event discovery (300+ events) is a clear need; ask AU/Ethiopian organisers what was used and what failed (outreach item).

## B. Global events
### B1. Expo 2020 Dubai (2021–22)
- Official visitor app + business app. Features [I: Gulf News, The National, Time Out]: personalised itinerary from a short quiz; tickets; 200+ dining options; **Smart Queue** (up to 10 pavilion time-slot bookings per day, QR confirmation); GPS map with step-by-step directions; chatbot for opening times, parking, transport.
- Afterlife: app removed from Google Play on 15 Aug 2025; successor Expo City Dubai app (repurposed site) [I].
- Lessons: reservation/queue features solve real on-site pain (Green Zone/pavilion queues are COP analogues); itineraries by interest and time; post-event relevance requires a new purpose (see post-event-precedents.md).

### B2. FIFA World Cup 2022 (Qatar): Hayya + Ehteraz
- Hayya: ticket/ID/visa/transport pass; Ehteraz: COVID tracing; both mandatory [I].
- Independent concerns: Norwegian, French and German regulators warned the apps enabled surveillance; broad permissions (location, storage, call metadata); privacy policy only in English and a few languages, not Arabic; no encryption claims; no data deletion route [I: SMEX, CNIL via press, The Register].
- Lessons: **mandatory + opaque + over-permissioned = trust disaster**. Our app must be optional, minimal-permission, bilingual privacy notice, deletion route. This matters for government adoption: a host app that tracks people damages COP32's image.

### B3. Paris 2024
- Official Programme app: 9+ languages [V, App Store listing]; audio description for blind users and a Intel/Orange-style indoor navigation app for visually impaired visitors were reported [I]; city "Paris je t'aime" app continues after the Games [I].
- Lessons: accessibility was treated as a feature set, not a statement; multilingual breadth (we start with 2).

### B4. Other (not yet researched): Commonwealth Games, Tokyo 2020, World Expo Osaka 2025, G20 summits, large tech conferences (Web Summit, CES), festivals (Glastonbury, Coachella). Open for second pass.

## C. Event-technology platforms (vendor claims; not hands-on)
| Platform | Positioning [I/V] | Notable verified claims | Gaps / unknowns |
|---|---|---|---|
| Whova | Mobile-first conference app, strong networking/ease of use | Offline: agenda, floor map, attendee list/profiles, exhibitors, sponsors viewable offline; messaging, Community Board, surveys, push need internet. Personal agenda, live polling, session Q&A, in-app messaging, Community Board [V: whova.com FAQ] | Template-based; white label limits [I]; Amharic/RTL support [?]; API [?] |
| EventMobi | Customisable, hybrid | 27 languages; native iOS/Android or mobile browser; built-in live streaming (RTMP), video library; fully brandable but app-store listing still shows EventMobi as developer [V] | Offline [?] |
| Swapcard | Enterprise trade shows; AI matchmaking; integrations (e.g., Cvent) [I] | Starts around $610+/event [I] | Integration docs not retrievable [?]; offline [?] |
| Brella | Networking/matchmaking specialist [I] | Self-improving matchmaking claim [V] | Not a full event app |
| Bizzabo | Enterprise suite | ~US$18k/yr, 3-user minimum [I: competitor blog, may be biased] | UI complexity claims come from competitor (Whova) blog -> low reliability |
| Cvent | Enterprise event management/registration | ~US$19.5k/yr median [I] | Not researched in depth |
| Others: Hopin successor, vFairs (used for COP30 Virtual Ocean Pavilion), Airmeet, Grip, Eventify, Fliplet, Guidebook | — | vFairs runs a COP30 Virtual Ocean Pavilion [V] | Not researched |
Pricing sources are competitor/comparison blogs: **low reliability**.

## D. Cross-cutting findings
1. **Gating pattern:** official UN platforms gate by badge; public/remote people rely on separate channels — confirms the niche.
2. **Host-country app pattern:** COP28 and Expo show governments commission a separate logistics/visitor app (map, itineraries, queue booking). That is our adoption path.
3. **On-site pain solved by apps:** wayfinding, queue/slot booking, itineraries, schedule changes. Online-only features (networking) are less valuable to the public.
4. **Offline reality:** only Whova states a concrete offline scope (read-only content); others unverified. Offline-read plus background sync is a feasible, cheap differentiator even with D9's connected-user assumption (Addis venues will be congested at peak).
5. **Language:** UN platform = host language + English; event vendors offer many languages but rarely Amharic (Ge'ez script; no RTL) — verify Amharic rendering/font/IME support on each vendor [?].
6. **Trust & privacy:** World Cup apps show the cost of poor privacy; Ethiopia's Personal Data Protection Proclamation (1321/2024) adds a legal angle (Phase 13).
7. **Accessibility:** WCAG 2.1 AA is the common claim by vendors (InEvent, ClearEvent) [V]; real mobile-app accessibility rarely evidenced. Paris 2024 is the best reported example.
8. **Lifecycle:** per-event apps are retired; survivors are re-scoped (Hayya, Expo City, Paris je t'aime).
9. **Build vs buy (new question):** white-label vendors (EventMobi, Whova, Swapcard) could power a demo quickly; but per-event pricing, branding limits, data residency, Amharic and IP/ownership (government wants ownership) argue for owning the product — decision for Phase 11/17. A vendor-built demo is an option for gate G1.

## E. Gaps in this pass (to close in a second pass if you want)
Hands-on testing; primary UNFCCC pages; COP29 apps; Commonwealth/Tokyo/Osaka/G20/Web Summit/festival apps; vendor offline/API/accessibility documentation (Swapcard, Cvent, Bizzabo, Brella, Airmeet, vFairs); app-store ratings/reviews of COP28/COP30 apps; analytics from any of these (none public).

---
# Second pass (2026-10-01)
## F. Additional benchmarks
### F1. COP29 (Baku 2024)
- Two UNFCCC-listed apps [V: unfccc.int, Google Play `com.unfccc.cop29`]: (1) **UN Climate Change app** — host-team and UNFCCC practical info and guides, official documents, session information, meetings/events with search filters, public webcast streams, **Baku transport navigation**, **venue interactive maps**, news/photos/video; (2) **COP29 Platform app** — virtual participation by badge type, personal schedule with push notifications for programme changes, COP profile for networking, notifications when official documents are issued.
- Host also launched an **accommodation platform** and an "enhanced digital info platform" before the conference [V: cop29.az, news.az].
- Pattern confirmed across COP28/29/30: UNFCCC app/platform (docs + sessions, badge-gated virtual) + host info/logistics layer. Accommodation/transport are host-side digital needs — the same gaps we identified for Addis.

### F2. Expo 2025 Osaka
- Official **EXPO 2025 Visitors** app: pavilion reservations, ticket/reservation status, map, **real-time wait times and crowding for pavilions and toilets**, real-time schedules, stamp rally, live location; companion tools **Personal Agent** (facility info, crowd status, routes) and **EXPO Translation** for talking to staff [V/I: expo2025.or.jp, Japan Travel].
- Lessons: crowd/queue visibility, in-venue translation, and gamified participation (stamp rally) are mainstream for mass-visitor events; relevant to Green Zone/pavilion experience.

### F3. Tokyo 2020 / Birmingham 2022
- Tokyo official app criticisms [I, user reviews via search]: too many steps to find information, little customisation, times shown in Tokyo local time with no time-zone option. A government-mandated OCHA check-in/health app existed for participants [I].
- Birmingham 2022 app: medal tables, schedule with videos, festival info, volunteer jobs, tickets [V].
- Lessons: **time-zone handling** matters for a global remote audience (COP32 Addis = EAT, UTC+3) — we must show local and user time zones; keep navigation shallow.

### F4. Conferences: Web Summit, CES, SXSW
- Web Summit: proprietary platform (Summit Engine); algorithmic suggestions and curated side events to cope with volume; ~21,000 meetings among ~13,000 active networkers reported [I, secondary].
- CES: QR "MagicBadge" contact exchange; reviewer noted no scheduling of pre-arranged vendor meetings and no schedule-to-map link [I: app-store review quoted via search].
- SXSW (London/EDU): AI connection recommendations, "Networking Roulette"; reviewers say outreach to specific people is weak at 8,000 attendees [I].
- General critique [I, vendor/blog]: checkbox-taxonomy matching captures categories, not intent; network features see 40–70% use only when networking is a stated goal.
- Lessons: for COP32's public audience, deep matchmaking is low priority; QR contact exchange, schedule-to-map links, and meeting scheduling are the practical wins.

### F5. Africa-specific
- AFCON 2023 (Côte d'Ivoire): searches found no useful information on an official fan/event app or on connectivity issues. **Gap.**
- ACS1 Nairobi (2023): ~30,000 delegates; ACS2 Addis (2025): 25,000+; no official app found for either [I]. Absence is not proof.

## G. Vendor documentation checked
| Vendor | Finding [V unless noted] |
|---|---|
| Swapcard | **SwapAccess** badge scanning works offline using a cached allow-list and syncs later; public developer API docs (developer.swapcard.com), Salesforce and registration integrations, public bug-bounty program (YesWeHack) |
| Cvent Attendee Hub | WCAG 2.1 AA targeted; VPATs published; colour-contrast controls, screen-reader support, real-time captions on video, keyboard-only UI, accessible self check-in |
| vFairs | WCAG 2.1 AA, ADA, AODA claims; text resizing, contrast controls, keyboard navigation, screen reader, audio narration |
| Whova | Offline read of agenda/map/lists (from first pass) |
| EventMobi | 27 languages, native iOS/Android, white label with app-store caveat (first pass) |
Still not retrieved: Brella, Airmeet, Bizzabo, Hopin-successor documentation; offline support for Swapcard attendee app and EventMobi.

## H. Amharic / Ge'ez rendering (new, important for D9)
- Ge'ez glyphs are missing from some system fonts; unsupported glyphs render as boxes ("tofu"). iOS usually falls back to system fonts, but **Android depends on the OEM** — a device may lack Amharic glyphs (example given: Xiaomi) [I: localisation testing guidance].
- Mitigation (D, recommendation): **bundle an Ethiopic font (e.g. Noto Sans Ethiopic) in the app and web app**, test on the real Android models common in Addis, and include Amharic in QA and accessibility testing (screen-reader pronunciation of Amharic is an open risk).
- Keyboard input: third-party Ge'ez keyboards exist (GeezIME, FynGeez); built-in Amharic keyboards exist on Android/iOS. Search must handle Ge'ez variants (e.g., homophone letters) — feature to specify in Phase 9.

## I. Updated cross-cutting conclusions
1. COP28/29/30 all split **UNFCCC platform vs host logistics layer**; COP29 added a host accommodation platform. Our natural fit = host-side layer: map/transport/accommodation/itineraries/Green Zone info.
2. Mass-event apps (Expo 2020/2025) win on **wayfinding, queue/wait-time visibility and slot booking** — these solve physical pain; they require venue-side data feeds (partnership dependency).
3. Networking is the most over-featured, least-validated category for a public audience.
4. Time-zone display, shallow navigation, and bilingual privacy notices are repeated failure points.
5. Offline: Whova (read-only offline) and Swapcard (offline scanning) are concrete examples; neither shows full offline-first.
6. Accessibility claims (WCAG 2.1 AA) are widespread but unverified in practice; Amharic accessibility has no precedent we found.
7. Build-vs-buy remains open; vendors with open APIs (Swapcard) could supply a demo or integrate later.

## J. Remaining gaps (accept for now)
Hands-on testing (plan below); G20/Glastonbury/Coachella; FIFA 2022 official fan app features; Olympics Paris detailed features; AFCON; vendor docs for Brella/Airmeet/Bizzabo; user reviews/ratings of COP apps; any usage analytics.
