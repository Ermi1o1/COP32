# Phase 9 — Information Architecture (draft v1, 2026-10-01)
Inputs: feature prioritisation (Must/Should, D15), personas/journeys (D12), benchmarks, decisions D1–D15. No UI design here: this defines **structure, navigation, content relationships, search and taxonomy**. Screens/visual design come after Phase 10 flows (and the demo prototype, D10).

## 1. Is the brief's structure appropriate? (evaluation)
The brief proposed: Home, Program, Sessions, Speakers, Participants, Exhibitors, Venues, Map, News, Media, Resources, Networking, Notifications, Profile, Settings, Post-event archive.
| Brief item | Verdict | Reason |
|---|---|---|
| Home | Keep, but **state-aware** | Changes by phase (pre / during / post) and by role selection (PER-09) |
| Program + Sessions | **Merge** into one "Programme" | Sessions live inside the programme; users think "what's on", not "sessions" |
| Speakers | Demote to a **directory under Programme** | Rarely a destination on its own for a public audience |
| Participants + Networking | **Remove from primary navigation** | Networking mostly Could/Later (D15); opt-in only; avoids moderation load |
| Exhibitors + Venues | Merge: **Exhibitors/pavilions under Programme**, **Venues under Map** | Matches how visitors find them (place or event) |
| Map | Promote to a **primary tab** | Wayfinding is core on-site need (Expo/COP28 precedent) |
| News + Media | Merge into **Updates** (news, press, streams, explainers) | One place for "what's happening"; media/press as filters |
| Resources | Keep as **Library** (documents, guides) inside Learn/Library | Documents are secondary to the visitor |
| Notifications | Keep as **bell + inbox** (global, not a tab) | Cross-cutting |
| Profile + Settings | Merge into **More → Me & Settings** | Optional profile (guest mode first) |
| Post-event archive | Keep as **Archive** reachable from More and Home (post phase) | Same content model, different time |
**Added by research:** a **Visit** (city companion) section — transport, stay, arrival checklist, attractions, coffee culture, ride-hailing and booking link-outs — because the founder's "all in one app" vision (F-01) and visitor journeys (J1, J2) need it, and **Learn** (COP explained, Ethiopia and Africa context, glossary, Green Legacy).

## 2. Navigation model
### 2.1 Primary navigation (mobile bottom bar / web top bar): **5 items**
| Tab | Purpose | Main content |
|---|---|---|
| **Home** | Today / what's next / alerts, role-aware | Now & next, top alerts, shortcuts, news highlights, phase-based modules |
| **Programme** | What's on | Schedule, side events, speakers, exhibitors/pavilions, my agenda |
| **Map** | Where | Venue maps, city map, points of interest, directions, accessible routes |
| **Visit** | Everything for the trip | Arrival checklist, visa/flights/hotels link-outs, transport, ride-hailing, attractions, coffee culture, safety |
| **More** | Everything else | Updates (news/press/streams), Learn, Library, Archive, Me & Settings, Help, About, Language, Privacy |
Rationale: five is within common mobile navigation limits; Updates also surface on Home and as bell notifications; Learn and Archive sit under More until content volume justifies promotion (revisit after pilot analytics). On web the same five appear as a header nav with More as a menu.

### 2.2 Global elements (on every screen)
Language switch (EN | አማ) · search · notifications bell with unread count · time-zone chip ("Addis Ababa EAT · your time") · offline/sync indicator · "Independent platform" label until endorsed (D1, TRU-04) · back/breadcrumb.

### 2.3 Role-aware home (no separate apps)
On first run: choose language → optional "I am a… (visitor / local / media / organiser / volunteer / other)" → tailors Home modules and shortcuts; skippable; changeable. **Roles change layout, not access** (no gated content, except staff/organiser/volunteer tools which use accounts).

### 2.4 Phase-aware home modules
| Phase | Home emphasis |
|---|---|
| Pre-event | Countdown, "Can I attend?", plan your trip, news, key dates |
| During | Now & next, my agenda, alerts, map shortcut, live streams |
| Post-event | Outcomes, recordings, archive, follow-up |
(Same app; content blocks switch by event state set in the CMS.)

## 3. Sitemap (v1)
```
Home
 ├─ Now & next / My agenda snapshot
 ├─ Alerts (priority)
 ├─ Shortcuts (role-based)
 └─ Highlights (news, explainers, countdown)

Programme
 ├─ Schedule  (Day → Session)
 ├─ Side events
 ├─ Speakers (directory)
 ├─ Exhibitors & pavilions
 ├─ Networking events (listing)               [Should]
 └─ My agenda (saved, reminders, calendar export)

Map
 ├─ Venue map (zone → hall → room)
 ├─ City map (POIs: hotels, hospitals, embassies, ATMs, transport hubs, attractions)
 ├─ Directions (hand-off to device map app)
 └─ Accessibility (step-free routes, facilities)
 [Later: capacity / queue / wait-time overlays; indoor navigation]

Visit
 ├─ Before you travel  (checklist; visa → official e-visa portal; flights → link-out; stay → accommodation link-outs)
 ├─ Getting around     (airport transfer; light rail; buses; minibuses; ride-hailing deep links; road closures)
 ├─ Where to stay      (areas, official accommodation platform, listed providers per D14)
 ├─ Explore Addis      (attractions & must-visit; day trips; coffee culture "Buna"; food; markets)
 ├─ Money, SIM & connectivity, health, safety, etiquette
 └─ Emergency & help   (numbers, medical points, lost & found, report issue)

More
 ├─ Updates            (News · Press centre · Live & recorded · Explainers · Daily digest)
 ├─ Learn              (COP explained · Climate basics · Africa & Ethiopia · Green Legacy · Glossary · Myth-busting)
 ├─ Library            (Documents & official links · Press kits · Reports)
 ├─ Archive            (Past events/editions → sessions, recordings, outcomes, commitments)
 ├─ Outcomes & commitments tracker             [during/post]
 ├─ Me & Settings      (language, time zone, text size, notifications, privacy & data, optional account)
 ├─ Help & FAQ
 └─ About              (independent status, team, privacy notice, accessibility statement, contact)

Utility (not in navigation): Search results · Notification inbox · Language picker · Onboarding · Error/offline states · Link-out interstitial ("You are leaving to an external site") · Organiser portal & Volunteer mode (role-gated entry points)
```
Back office (CMS/admin) is a **separate web product** (Phases 15–16), not part of this sitemap.

## 4. Content hierarchy and models
### 4.1 Root: **Event** (event-agnostic core, D5)
Everything hangs off an Event so that COP32 is event #1 and later events reuse the structure.
```
Event (COP32)
 ├─ EditionState: pre | during | post   (drives Home modules)
 ├─ Venues → Zones → Rooms/Spaces → POIs
 ├─ Programme
 │    ├─ Days
 │    ├─ Sessions (official, side events, networking events, press events)
 │    ├─ Speakers (people), Organisations
 │    └─ Exhibitors / Pavilions
 ├─ Content: News, Press releases, Explainers, FAQs, Glossary terms, Guides (Visit), Documents
 ├─ Media: Streams, Recordings, Galleries, Transcripts/Captions
 ├─ Alerts / Notifications
 └─ Outcomes: Decisions, Commitments
City Guide is event-independent (Addis) but linked to the event; Archive = Events with state "post".
```
### 4.2 Core entities and relationships
| Entity | Key attributes | Relations |
|---|---|---|
| Event | name (EN/AM), dates, state, venues, branding | has many Sessions, Venues, Content |
| Session | title (EN/AM), type, start/end (UTC + display tz), room, format (in-person/hybrid/online), language(s), access (public / accredited / unknown), stream URL, status (scheduled/changed/cancelled) | belongs to Event, Day, Room; many Speakers; many Themes; optional Organiser; may have Recording, Documents |
| Speaker / Person | name, role, organisation, photo, bio (EN/AM) | many Sessions |
| Organisation | name, type (government, NGO, business, UN, academic), logo, country | many Sessions/Exhibits |
| Exhibitor / Pavilion | name, description, location (Space), contacts, materials | belongs to Event; optional Organisation |
| Venue → Zone → Room/Space | name, map geometry, accessibility, capacity | contains Sessions/Exhibits |
| POI | category (hotel, hospital, ATM, embassy, attraction, café, transport), location, hours, accessibility, source | linked to City Guide articles |
| Guide article | category (Before you travel, Getting around, etc.), body (EN/AM), last-verified date | links to POIs, Link-out entries |
| Link-out entry | provider, type (official portal / commercial), URL, label, approval status, sponsored flag | referenced from Guide/POIs (D14) |
| News / Release | title, body, source type (official / partner / editorial), published, language(s), embargo | relates to Themes, Sessions |
| Media item | type (stream/recording/gallery), URL/file, captions, rights | linked to Session |
| Document | title, source, URL/file, version | linked to Session/Theme |
| Theme / Topic | name (finance, adaptation, land restoration…) | tags Sessions, News, Learn |
| Alert | severity, audience segment, message (EN/AM), expiry | optional link to Session/Space |
| Decision / Commitment | text, actor, status, source link | linked to Theme, Session |
| User (optional) | language, tz, role, saved items, consents | saves Sessions/Speakers/POIs |

## 5. Taxonomy (controlled vocabularies, bilingual)
| Facet | Values (initial) | Notes |
|---|---|---|
| **Access** | Open to public · Accredited only · Registration required · Unknown/TBC | Critical for the public audience (INF-02); never guess |
| **Day** | Dates of the event | Event-time + user-tz display |
| **Theme** | Climate finance · Adaptation · Mitigation · Loss & damage · Land restoration · Energy · Agriculture & food · Water · Cities & transport · Health · Youth · Gender · Indigenous peoples · Technology & AI · Oceans · Trade & investment · Education | Seed list; align with host-announced themes when published |
| **Session type** | Plenary · Negotiation (if public) · Press conference · Side event · Workshop · Pavilion event · Cultural/Green Legacy · Networking · Training | |
| **Format** | In-person · Hybrid · Online | |
| **Language** | English · Amharic · French · Arabic · other (as announced) | Language of delivery/interpretation |
| **Organiser type** | Government · UN/IGO · NGO/civil society · Business · Academia · Youth · Media | |
| **Venue / Zone** | Per official venue plan | |
| **Accessibility tags** | Step-free · Captioned · Sign interpretation · Quiet space · Audio description | Where info exists |
| **Audience** | General public · Media · Youth · Business · Researchers · Volunteers | Optional; role-aware shortcuts |
| **Guide category** | Before you travel · Getting around · Where to stay · Explore Addis · Money & SIM · Health & safety · Culture (Buna) · Emergency | |
| **Content source** | Official (host) · UNFCCC · Partner · Editorial (our team) | Drives the verified label (INF-10) |
| **Content type** | News · Explainer · Press release · Guide · FAQ · Document · Media | |
| **Phase** | Pre · During · Post | |
Governance: facets owned by content team; changes versioned; each value has EN and AM labels; "Unknown/TBC" is allowed and visible.

## 6. Search structure
- **Scope tabs:** All · Sessions · People & organisations · Places · News & guides · Help. Default ranking: exact title → upcoming sessions → places → content.
- **Ge'ez-aware search (D11):** normalise Amharic homophone letters (e.g., ሀ/ሐ/ኀ, ሰ/ሠ, አ/ዐ, ጸ/ፀ — verify list with an Amharic linguist), ignore diacritic-like variants, support transliterated (Latin) queries for common names and places, allow mixed-script queries. Spell-suggest in both languages.
- **Filters on results:** Day, Theme, Access, Format, Venue/Zone, Language, Session type, Organiser type, Accessibility.
- **Quick search suggestions:** "Now", "Today", "Open to public", "Near me" (opt-in location), recent searches (local only).
- **Offline:** search works over downloaded content (schedule, guides, FAQ, POIs); online adds news, alerts.
- **Privacy:** search queries not stored server-side per user by default (aggregate, anonymised analytics only, ADM-07).

## 7. Filtering structure (by section)
| Section | Primary filters | Secondary |
|---|---|---|
| Schedule | Day, Open to public, Theme | Venue, Language, Format, Type, Accessibility |
| Side events | Day, Theme, Organiser type | Open to public, Language, Venue |
| Speakers | Name, Organisation, Theme | Country |
| Exhibitors/Pavilions | Zone, Theme, Country/region | Organisation type |
| Map (POIs) | Category | Open now, Accessible, Distance |
| Visit (Explore) | Category, Interest (culture, food, nature, history) | Time needed (2/3/4 hours), Cost level |
| Updates | Source (official/partner/editorial), Type, Theme | Date, Language |
| Library | Type, Theme, Source | Date |

## 8. Link-out registry (D14)
Central list of external destinations (official e-visa portal, airlines, accommodation platform/providers, ride-hailing apps, light-rail ticketing, attractions, tours). Each entry: owner approval, last-checked date, language, fallback text (phone/website), tracking policy. All link-outs pass through one **interstitial pattern** ("You're leaving the app", with provider name and data notice) and open in the external browser/app. No personal data passed by default.

## 9. Cross-cutting IA rules
1. **Every item shows its source label and last-updated time** where content can change (alerts, schedule, guides).
2. **Unknown is a valid state** — show "TBC" rather than hiding or guessing (dates, venue, access).
3. **Offline tiers:** *Tier A downloaded by default* (FAQ, arrival checklist, emergency info, schedule snapshot, venue/city maps); *Tier B on demand* (articles, media); *Online only* (live streams, alerts refresh, link-outs).
4. **Deep links** for every entity (share cards, QR codes, notifications) work on web and apps; stable URLs (important for archive and press).
5. **EN/AM parity:** each page can show a "translation pending" state; Amharic is never an afterthought, but incomplete translations fall back to English visibly, not silently.
6. **Time zones:** every date-time stores UTC and displays event-time and user-time.
7. **Three platforms, one structure:** same IA on Android, iOS and web; navigation patterns adapt (bottom bar vs header), the structure does not.
8. **Roles with accounts:** Organiser portal and Volunteer mode are entry points visible only after sign-in/invite; they do not alter the public IA.

## 10. Validation plan
- **Card sorting** (open/closed) with 8–10 people via BA, using the sitemap labels in EN and AM.
- **Tree testing** on tasks from journeys: "find a public event tomorrow", "get from the airport to the venue", "see whether I can enter", "find a press kit", "see Amharic explainer".
- **Label test:** Amharic labels for each tab (Home, Programme, Map, Visit, More) with native speakers — avoid literal translation mistakes.
- Add 5–6 IA questions to the existing BA questionnaire (optional).

## 11. Open questions
1. Final Amharic labels for primary tabs (needs native-speaker input).
2. Does COP32 publish a venue plan/zone concept (blue/green-style) that changes the Map structure?
3. Will the host provide structured schedule data (format, IDs)? Impacts import design (ADM-04).
4. Should "Visit" be named differently for locals (P2) who are not visitors — e.g., "City" or "Addis"? Test with Addis residents.
5. Promote "Learn" or "Updates" to the primary bar after pilot analytics? Decide with data.
6. Accounts: confirm in Phase 13 which features truly require login (sync, notifications, organiser tools).

## 12. Phase 10 preview
User flows will use this structure for: onboarding; finding/saving a session; building an agenda; finding a speaker/exhibitor/venue; navigating to a session; receiving changes; live and recorded content; documents; public information; using the app after COP32; plus visit-planning flows (visa/hotel/ride link-outs).
