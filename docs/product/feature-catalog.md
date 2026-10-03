# Phase 7 — Feature Catalog (brainstorm draft v1, 2026-10-01)
Purpose: the **complete potential feature set**, before prioritisation. Nothing here is committed to the MVP — Phase 8 decides.
Inputs: project definition, COP32 context, benchmarks, gap analysis, personas/journeys (D12 tiers), decisions D1–D13.

## How to read
- **ID**: category prefix + number (stable for Phase 8 scoring).
- **Personas**: P1 visitor · P2 local · P3 journalist · P4 remote · P5 organiser/exhibitor · P6 volunteer · P7 staff · P8 NGO · P9 youth · P10 researcher · P11 business · P12 speaker · P13 sponsor · P14 delegate · P15 government. "All" = everyone.
- **When**: Pre / During / Post event.
- **Dep**: external dependency — **H** host/organiser data or approval · **U** UNFCCC data/links · **V** venue data/sensors · **3P** third party · **—** none (we can build with public/own content).
- **Origin**: B benchmark precedent · G gap/differentiator · J journey need · E Ethiopia/COP32-specific · F founder idea (to be added).
- ⚠ = risk flag (privacy, moderation, cost, scope).

---
## 1. Information
| ID | Feature | Description | Personas | When | Dep | Origin |
|---|---|---|---|---|---|---|
| INF-01 | COP32 overview | What COP32 is, why it matters, host, dates, venues — EN/AM | All | Pre–Post | — | J |
| INF-02 | "Can I attend?" guide | Who can enter what (accredited zones vs public areas), how to get access | P1 P2 P9 | Pre | H U | G |
| INF-03 | Programme / schedule | Official + side-event programme, filters (day, theme, venue, language, open-to-public) | All | Pre–During | H U | B |
| INF-04 | Session detail pages | Time (event + local time zone), location, speakers, language, stream link, access type | All | Pre–During | H U | B |
| INF-05 | Speakers directory | Profiles, sessions, organisation | All | Pre–During | H | B |
| INF-06 | Exhibitors & pavilions directory | Pavilions, exhibitors, location, contacts | P1 P5 P11 | Pre–During | H | B E |
| INF-07 | Side-events directory | Discovery across hundreds of side events (ACS2 had 300+) | P1 P5 P8 P9 | Pre–During | H | E |
| INF-08 | Partners & sponsors directory | Listing with disclosure of sponsorship | P13 All | Pre–Post | — | B |
| INF-09 | News & announcements | Editorial news feed, official announcements labelled by source | All | Pre–Post | — | B |
| INF-10 | Verified-source labels | Each item marked: official (host/UNFCCC), partner, editorial | All | Pre–Post | — | G |
| INF-11 | Documents & resources | Official documents (links), reports, factsheets, downloadable | P3 P8 P10 | Pre–Post | U | B |
| INF-12 | FAQs | Searchable bilingual FAQ (visitors, media, volunteers) | All | Pre–During | — | J |
| INF-13 | Glossary / jargon buster | Plain-language COP terms in EN/AM (NDC, Article 6, loss & damage…) | P2 P4 P9 | Pre–Post | — | G |
| INF-14 | Thematic days & topics | Pages per theme (finance, adaptation, land restoration…) | All | Pre–During | H | E |
| INF-15 | Countdown & key dates | Milestones: registration windows, Pre-COP, SBs, COP opening | All | Pre | U H | J |
| INF-16 | Global search | One search across sessions, speakers, places, news, FAQ; Ge'ez-aware | All | All | — | B E |

## 2. Personalisation
| ID | Feature | Description | Personas | When | Dep | Origin |
|---|---|---|---|---|---|---|
| PER-01 | Guest mode | Use app fully without an account (core rule) | All | All | — | G |
| PER-02 | Optional profile | Account only for sync/notifications; minimal data | All | All | — | G |
| PER-03 | Language switch | EN ↔ AM at any time; remember choice | All | All | — | E |
| PER-04 | Time-zone setting | Show event time (EAT) and user time; auto-detect | P4 P1 | All | — | B (Tokyo lesson) |
| PER-05 | Saved sessions / personal agenda | Save, conflict warnings, export to calendar (.ics) | All | Pre–During | — | B |
| PER-06 | Favourites | Save speakers, exhibitors, places, articles | All | All | — | B |
| PER-07 | Reminders | Before saved sessions; configurable | All | During | — | B |
| PER-08 | Follow topics | Themes/tags to personalise feed and alerts | P4 P10 P11 | All | — | G |
| PER-09 | Role selection | "I am a visitor/journalist/volunteer…" tailors home | All | All | — | J |
| PER-10 | Recommendations (rules-based) | Suggest sessions from followed topics/role; no profiling ⚠ | All | Pre–During | — | B |
| PER-11 | Self-guided itineraries | Curated 2–4 hour routes by interest (COP28 precedent) | P1 P2 P9 | During | H | B |
| PER-12 | Cross-device sync | Agenda/favourites across mobile and web | All | All | — | B |

## 3. Navigation & city companion
| ID | Feature | Description | Personas | When | Dep | Origin |
|---|---|---|---|---|---|---|
| NAV-01 | Venue maps | Zone/hall/room maps, accessible routes | All | During | H V | B |
| NAV-02 | Session → map link | From any session, show where it is | All | During | H | B (CES lesson) |
| NAV-03 | City map & points of interest | Venues, hotels, embassies, hospitals, pharmacies, ATMs, transport hubs | P1 P2 P14 | Pre–During | 3P | G |
| NAV-04 | Directions hand-off | Open in Google/Apple Maps; walking/driving | All | During | 3P | B |
| NAV-05 | Transport guide | Airport transfer, official shuttles, taxis/ride-hailing, light rail, buses | P1 P14 | Pre–During | H 3P | G |
| NAV-06 | Road closures & traffic alerts | Event-related closures and restrictions | P1 P2 | During | H | J |
| NAV-07 | Accommodation guide | Official accommodation info/links, areas, price guidance ⚠ (no booking) | P1 P11 P14 | Pre | H | G (COP29/30) |
| NAV-08 | Arrival checklist | e-visa, yellow fever/health, currency, SIM/data, power plugs, weather, altitude | P1 P14 | Pre | — | G |
| NAV-09 | Accessibility info | Step-free routes, accessible toilets, assistance contacts | All | Pre–During | H V | B |
| NAV-10 | Indoor wayfinding | Turn-by-turn inside venue ⚠ cost/beacons | All | During | V | B |
| NAV-11 | Queue / wait-time & capacity info | Public area capacity, pavilion queues (Expo precedent) | P1 P2 | During | V H | B |
| NAV-12 | Slot booking for popular spaces | Reserve time slots (Expo Smart Queue) ⚠ | P1 P2 | During | H V | B |
| NAV-13 | Offline city & venue pack | Download maps/guides/FAQ for offline use | All | Pre–During | — | G |
| NAV-14 | Safety & emergency info | Emergency numbers, safe areas, lost & found, medical points | All | During | H | J |

## 4. Engagement
| ID | Feature | Description | Personas | When | Dep | Origin |
|---|---|---|---|---|---|---|
| ENG-01 | Session Q&A | Submit/upvote questions to moderators ⚠ moderation | P4 P1 P9 | During | H | B |
| ENG-02 | Live polls | Session or app-wide polls | P1 P4 | During | H | B |
| ENG-03 | Surveys / feedback | Session and app feedback | All | During–Post | — | B |
| ENG-04 | Reactions | Lightweight reactions on news/sessions | All | During | — | B |
| ENG-05 | Comments / discussions | Threads per topic ⚠ heavy moderation | All | All | — | B |
| ENG-06 | Stamp rally / challenges | Visit pavilions, learn, collect badges (Expo 2025) | P1 P2 P9 | During | H | B |
| ENG-07 | Climate pledges (personal) | Personal climate actions, Green Legacy tie-in | P2 P9 | All | — | E |
| ENG-08 | Quizzes / learning paths | Short learning modules on climate/COP in EN/AM | P2 P9 P4 | Pre–Post | — | G |
| ENG-09 | Share cards | Shareable session/news cards for social & Telegram | All | All | — | E |
| ENG-10 | Photo wall / UGC ⚠ | User photos with moderation | P1 P2 | During | — | B |

## 5. Networking
| ID | Feature | Description | Personas | When | Dep | Origin |
|---|---|---|---|---|---|---|
| NET-01 | Professional profile (opt-in) | Visible profile for networking only if opted in | P8 P10 P11 | Pre–During | — | B |
| NET-02 | Participant discovery | Search opted-in participants | P8 P10 P11 | Pre–During | — | B |
| NET-03 | QR contact exchange | Scan to exchange contact cards (CES MagicBadge) | P3 P8 P11 | During | — | B |
| NET-04 | Messaging ⚠ | 1:1 messages; abuse/moderation, privacy | P8 P11 | During | — | B |
| NET-05 | Meeting requests | Request/accept meetings with time/place | P11 P8 | During | — | B |
| NET-06 | AI matchmaking ⚠ (parked) | Algorithmic matching — low value at scale | P11 | Pre–During | — | B |
| NET-07 | Networking events listing | Receptions, meetups, youth/constituency events | P8 P9 P11 | During | H | B |
| NET-08 | Community groups ⚠ | Groups by interest/constituency | P8 P9 | All | — | B |

## 6. Media
| ID | Feature | Description | Personas | When | Dep | Origin |
|---|---|---|---|---|---|---|
| MED-01 | Live stream links/embeds | Official public streams embedded or linked | P4 P3 | During | U H | B |
| MED-02 | On-demand recordings | Recorded sessions by topic/day | P4 P10 | During–Post | U H | B |
| MED-03 | Captions & transcripts | Where provided; or partner captions | P4 + accessibility | During–Post | U 3P | B |
| MED-04 | Daily digest | Human-edited daily summary EN/AM (push/email) | P4 P2 P3 | During | — | G |
| MED-05 | Plain-language explainers | Short articles/videos/audio explaining decisions | P2 P4 P9 | All | — | G |
| MED-06 | Audio content (Amharic) | Listen mode for key content | P2 + accessibility | All | — | E |
| MED-07 | Photo/video galleries | Official/press galleries with credits | All | During–Post | H | B |
| MED-08 | Press centre section | Press-conference calendar, press kits, contacts, accreditation links | P3 | Pre–During | H U | J |
| MED-09 | Press releases EN/AM | Downloadable releases, embargo notes | P3 | During | H | J |
| MED-10 | AI-assisted summaries ⚠ | Draft summaries reviewed by editors before publishing | P4 | During | — | G |

## 7. Exhibition & side events
| ID | Feature | Description | Personas | When | Dep | Origin |
|---|---|---|---|---|---|---|
| EXH-01 | Exhibitor/pavilion pages | Description, projects, location, contacts, materials | P5 P11 | Pre–Post | H | B |
| EXH-02 | Organiser self-service portal | Organisers submit/update listings → moderation | P5 P7 | Pre–During | H | J |
| EXH-03 | Change notifications to followers | When an event moves, followers are notified | P5 + all | During | H | J |
| EXH-04 | Interest counts (aggregate) | "X people saved this" for organisers; no personal data | P5 P13 | Pre–During | — | J |
| EXH-05 | Exhibition map | Pavilions on venue map | All | During | H V | B |
| EXH-06 | Lead capture ⚠ | Exhibitor scanning of visitors (consent) | P5 P11 | During | — | B |
| EXH-07 | Digital booths / virtual expo (parked) | 3D/virtual booths — low value, high cost | P4 P5 | All | — | B |

## 8. Notifications
| ID | Feature | Description | Personas | When | Dep | Origin |
|---|---|---|---|---|---|---|
| NOT-01 | Schedule-change alerts | Changes to saved/followed items | All | During | H | B |
| NOT-02 | Session reminders | Configurable lead time | All | During | — | B |
| NOT-03 | Emergency / safety alerts | Priority broadcast, bypass quiet settings where allowed | All | During | H | J |
| NOT-04 | Important announcements | Editorial broadcast by segment (role, language) | All | All | — | B |
| NOT-05 | Personalised topic alerts | Based on followed topics | P4 P10 | All | — | G |
| NOT-06 | Notification centre & controls | Inbox, categories, quiet hours, opt-outs | All | All | — | G |
| NOT-07 | Email digest option | For web users without app | P4 | All | — | G |
| NOT-08 | SMS / Telegram channel (parked, D9) | Alternative channels if data shows need | P2 | All | 3P | E |

## 9. Public information & education
| ID | Feature | Description | Personas | When | Dep | Origin |
|---|---|---|---|---|---|---|
| PUB-01 | Climate basics hub | Climate science & policy basics, EN/AM | P2 P4 P9 | All | — | G |
| PUB-02 | COP explained | How COPs work, negotiation basics, history | P2 P4 P9 | Pre | — | G |
| PUB-03 | Africa & Ethiopia climate context | African priorities, Ethiopia's NDC, Green Legacy, renewable grid | All | All | — | E |
| PUB-04 | Key outcomes tracker | Decisions/outcomes summarised and linked to official texts | P3 P4 P10 | During–Post | U | G |
| PUB-05 | Commitments/pledges tracker | Announced pledges with source links and status ⚠ accuracy | P3 P4 P10 | During–Post | U H 3P | G |
| PUB-06 | Initiatives directory | Climate initiatives launched at COP32 | P8 P11 | During–Post | H | B |
| PUB-07 | Green Legacy progress | Tree-planting stats/stories (government data) | P2 P9 | All | H | E |
| PUB-08 | Myth-busting / fact checks | Counter common misinformation with sourced answers | All | All | — | G |

## 10. Post-event
| ID | Feature | Description | Personas | When | Dep | Origin |
|---|---|---|---|---|---|---|
| PST-01 | Recordings library | Searchable archive of sessions | P4 P10 | Post | U H | B |
| PST-02 | Proceedings & reports | Official reports, summaries, links | P10 P3 | Post | U H | B |
| PST-03 | Outcomes & follow-up | What happens next; implementation milestones | All | Post | U | G |
| PST-04 | Historical archive | Permanent archive per event (event-agnostic core, D5) | All | Post | — | G |
| PST-05 | Community continuation ⚠ | Groups/newsletter after the event | P8 P9 | Post | — | B |
| PST-06 | Handover to next COP / next event | Reuse the platform for another event (D5) | P7 P15 | Post | — | G |
| PST-07 | Certificates of participation | For volunteers/youth (where official) | P6 P9 | Post | H | J |

## 11. Trust, privacy & safety (cross-cutting)
| ID | Feature | Description | Personas | When | Dep | Origin |
|---|---|---|---|---|---|---|
| TRU-01 | Bilingual privacy notice | Plain-language EN/AM; what we collect and why | All | All | — | B (Hayya lesson) |
| TRU-02 | Minimal permissions | Location only on demand; no contacts/calls/storage | All | All | — | B |
| TRU-03 | Delete my data / export | Self-service deletion and export | All | All | — | B |
| TRU-04 | Unofficial status disclaimer | Clear "independent, not official" until endorsed (D1) | All | All | — | G |
| TRU-05 | Report content / abuse | Report button on all user content | All | All | — | B |
| TRU-06 | Source verification workflow | Editorial checks for official claims | P7 | All | — | G |
| TRU-07 | Consent management | Granular consent for notifications, analytics, networking | All | All | — | G |

## 12. Accessibility & localisation (cross-cutting)
| ID | Feature | Description | Personas | When | Dep | Origin |
|---|---|---|---|---|---|---|
| ACC-01 | WCAG 2.1 AA baseline | Contrast, focus, labels, screen-reader support | All | All | — | B |
| ACC-02 | Dynamic text size | Respect OS font scaling | All | All | — | B |
| ACC-03 | Bundled Ethiopic font (D11) | Correct Ge'ez rendering everywhere | P2 + all | All | — | E |
| ACC-04 | Ethiopian calendar display (hypothesis) | Show Ethiopian date alongside Gregorian (verify conversion) | P2 | All | — | E |
| ACC-05 | Accessibility statement | Published, honest conformance statement (VPAT-style) | All | All | — | B (Cvent) |
| ACC-06 | Additional languages (later) | Afaan Oromo, Tigrinya, French, Arabic… on demand | All | Post-MVP | — | E |
| ACC-07 | Low-data mode | Reduced images/video by choice | All | All | — | E |
| ACC-08 | Sign-language content (later) | Ethiopian Sign Language/ISL clips for key info | Accessibility | All | 3P | G |

## 13. Volunteer & operations
| ID | Feature | Description | Personas | When | Dep | Origin |
|---|---|---|---|---|---|---|
| OPS-01 | Volunteer mode | Role view with quick answers, maps, contacts | P6 | During | H | J |
| OPS-02 | Offline volunteer FAQ | Must work without network | P6 | During | — | J |
| OPS-03 | Report-issue button | Volunteers/staff report incidents (cleanliness, lost person…) | P6 P7 | During | H | J |
| OPS-04 | Shift/task info | Shift schedules if volunteer programme shares data | P6 | During | H | J |
| OPS-05 | Operational broadcasts | Targeted to volunteers/staff | P6 P7 | During | H | J |

## 14. Admin, content & analytics (back office — detailed in Phases 15–16)
| ID | Feature | Description | Personas | When | Dep | Origin |
|---|---|---|---|---|---|---|
| ADM-01 | Bilingual CMS | Content in EN/AM with translation status | P7 | All | — | G |
| ADM-02 | Approval workflow | Draft → review → publish; roles | P7 | All | — | G |
| ADM-03 | Emergency publishing | Fast path with audit trail | P7 | During | — | J |
| ADM-04 | Schedule import / sync | Import programme from host/UNFCCC feeds or spreadsheets | P7 | All | H U | J |
| ADM-05 | Notification console | Segmented sends, scheduling, preview | P7 | All | — | B |
| ADM-06 | Moderation queue | User content, organiser submissions | P7 | All | — | B |
| ADM-07 | Privacy-respecting analytics | Aggregate usage, no individual tracking | P7 P13 P15 | All | — | G |
| ADM-08 | Multi-event (event-agnostic) setup (D5) | Configure a new event without code | P7 | Post | — | G |
| ADM-09 | Audit log | Who changed what, when | P7 | All | — | G |
| ADM-10 | Open data / API (later) | Public read API for programme/news for partners | P15 3P | Post-MVP | — | G |

## 15. Demo/pitch enablers (support gates G1/G2, D10)
| ID | Feature | Description | Dep |
|---|---|---|---|
| DEM-01 | Demo dataset | Realistic sample content (clearly marked sample) to show flows | — |
| DEM-02 | "Government view" | Aggregated analytics/ops dashboard mock for officials | — |
| DEM-03 | White-label theming | Show it can carry official branding once authorised | — |

---
## Parked ("possibly unnecessary", per Phase 5) — revisit after user validation (D13)
NET-06 AI matchmaking · EXH-07 virtual booths · NAV-10 indoor wayfinding · in-app video calls · AR wayfinding · ticketing/payments · heavy chat communities (ENG-05/NET-08 in full form) · NOT-08 SMS/Telegram.

## Brainstorm — bolder ideas (not evaluated; for discussion)
1. **"What's on now near me"** live view combining schedule + map + crowding.
2. **Amharic voice assistant** for FAQs (high risk/cost; quality of Amharic speech tech unknown).
3. **Climate-action stories from Ethiopian regions** (user-submitted, moderated) for the public narrative.
4. **Carbon footprint of your trip** calculator with local offsets/Green Legacy link ⚠ credibility.
5. **"Ask an expert" sessions** for public/youth with scheduled volunteers.
6. **Media-ready data packs** (CSV/JSON of schedule, speakers, pledges) for journalists/researchers.
7. **School/university programme** — classroom packs in Amharic tied to COP32.
8. **Local business directory** (restaurants, guides) for visitors — sponsor-funded ⚠ neutrality.
9. **Post-COP "Addis Climate Hub"** — the platform becomes a permanent climate-events calendar for Addis (AU/UNECA events), supporting D5 and sustainability.

## Founder ideas (added 2026-10-01, D13)
Founder's direction: **"All in one app" — everything a visitor needs in one place.** Bookings and official processes are **linked out** to the designated provider or official portal, not built in-house (D14).
| ID | Idea | Description | Personas | When | Dep | Notes / evidence |
|---|---|---|---|---|---|---|
| F-01 | One-stop visitor hub | Organising concept: the app as the single entry point to everything a COP32 visitor needs (event + city + travel) | All | All | — | Becomes the product's framing; implemented through INF/NAV/F features |
| F-02 | Hotel booking (link-out) | Accommodation listings → hand-off to official accommodation platform or provider sites | P1 P11 P14 | Pre | H 3P | COP29 host ran an accommodation platform; Addis ~25k beds vs 50–80k demand |
| F-03 | Flight booking (link-out) | Links to airline/booking sites | P1 P14 | Pre | 3P | Low added value (visitors book anyway); keep simple |
| F-04 | Visa process (link-out) | Step-by-step guide → official Ethiopian e-visa portal (evisa.gov.et) | P1 P14 | Pre | — | Official portal exists; COP32-specific visa arrangements not yet announced |
| F-05 | Ride-hailing options (deep links) | Compare and open local ride apps | P1 P2 P14 | During | 3P | Local apps reported: Ride, Feres, ZayRide, Yango (blog sources, verify); some need a local phone number |
| F-06a | Public transport routes & trip planner | Light rail, Anbessa/Sheger buses, minibus routes; trip planning | P1 P2 | During | 3P (open data) | Open GTFS for Addis exists (AddisMap/DigitalTransport4Africa 2026 data, OSM-based) |
| F-06b | Real-time transit tracker | Live vehicle positions / departures | P1 P2 | During | 3P H | **No official real-time feed found**; only if operators provide data |
| F-07 | Tourist attractions & must-visit places | Curated Addis sights, museums, day trips | P1 P2 P11 | Pre–Post | — | Own curated content; good for demo |
| F-08 | **Buna (coffee) culture** — concept expanded 2026-10-01, see F-08a–d below | P1 P2 P11 | All | — | Ethiopia is widely regarded as the birthplace of coffee; the ceremony is a strong, authentic, low-risk cultural hook |
| F-09 | Light-rail digital ticket link | Link to the official digital ticketing (Telebirr app / USSD pilot) | P1 P2 | During | 3P | LRT digital ticketing pilot at 4 stations (2026 report) |
| F-10 | Related/side events | Already covered by INF-07, EXH-*, NET-07 | — | — | — | Merged |

### F-08 expanded — "Buna" coffee culture (all content below is general cultural knowledge; the editorial team must verify facts and get cultural-reviewer sign-off before publishing)
| ID | Feature | Description | Dep | Notes |
|---|---|---|---|---|
| F-08a | Coffee ceremony guide | Short illustrated/audio guide in EN/AM: the three stages (roasting, brewing in the jebena, serving), the three rounds (abol, tona, baraka), incense and snacks, **visitor etiquette** (accept the first cup, don't rush, compliment the host) | — | Content only; good demo piece; audio version helps low-literacy and visitors |
| F-08b | "Where to experience it" trail | Neutral, owner-approved list of places to see a ceremony (museums, cultural venues, cafés, hotel demonstrations, tours), shown on the city map | 3P | Must follow D14 neutrality: transparent criteria, sponsored placements labelled, no endorsement implied |
| F-08c | Coffee passport (stamp rally) | Optional collectible stamps for visiting trail places; ties to ENG-06 | H 3P | Needs participating venues; fun, low priority |
| F-08d | Coffee & climate story | Why coffee and climate are linked (climate pressure on coffee-growing areas, Ethiopia's role as origin) told in plain language; links to adaptation and Green Legacy themes | — | Strong narrative bridge between culture and the COP32 theme; **claims must be sourced** (e.g., published climate-suitability studies) before publishing |
| F-08e | "Buna break" moments (idea) | Scheduled in-app prompts/events where visitors and locals meet over coffee at partner venues (opt-in, public places only) | H 3P | Light social alternative to heavy networking; moderation/safety review needed |

### D14 — Integration-by-link principle (approved)
1. The app **does not process bookings, payments or visa applications**; it links to official portals or designated providers.
2. **Official first:** where a government/host portal exists (e-visa, official accommodation platform), link to it only.
3. **Neutral listing rules:** commercial providers (hotels, ride apps, airlines, tours) listed by transparent criteria; sponsored placement labelled; the owner (government) approves the provider list. Avoids favouritism complaints in a government-adopted product.
4. **No data sharing by default:** no personal data passed to third parties; link-outs carry no user identifiers unless the user consents (Phase 13).
5. **Broken-link resilience:** links monitored; fallback text with phone/website.
6. Affiliate/referral revenue is a Phase 17 question and must not compromise neutrality.

## Next step
Phase 8 will score these with a transparent method (user value, strategic value, complexity, cost, risk, dependency, time, scalability, COP32 relevance) and classify Must/Should/Could/Later/Not recommended.
