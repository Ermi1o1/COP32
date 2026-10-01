# Phase 6 — Personas (desk-research draft v1, 2026-10-01)
**Status: HYPOTHESES, not validated.** Built from docs/research/* (COP32 context, benchmarks, gap analysis, Ethiopian digital landscape). No interviews yet; the BA questionnaire (docs/ux/interview-questionnaire.md) is the validation path. Personas are archetypes, not real people; names are placeholders. Tier = design priority (D12).

## Tiering (proposal D12)
| Tier | Meaning | Personas |
|---|---|---|
| 1 — design for | Core MVP audience; drives IA and flows | P1 Non-accredited visitor / international attendee · P2 Local attendee (Addis resident) · P3 Journalist / media · P4 Remote / public follower · P5 Side-event organiser / exhibitor / partner |
| 1-ops | Operational users who also act as information channel | P6 Volunteer · P7 Event staff / admin |
| 2 — serve well, don't over-design | Valuable, partly served by Tier 1 + public features | P8 NGO / civil society · P9 Youth participant · P10 Researcher / academic · P11 Business / investor · P12 Speaker / panelist · P13 Sponsor / partner (funder) |
| 3 — served via public layer only (D8) | Own gated tooling by UNFCCC | P14 Delegate · P15 Government representative |
Note: a person can be several personas (e.g., an NGO delegate who is also a speaker). Roles combine through profile flags, not separate accounts (to confirm in Phase 9/13).

## Cross-persona assumptions
Languages: English + Amharic (D9). Devices: Android + iOS + web. Accessibility: WCAG 2.1 AA target, Amharic screen-reader behaviour untested. Privacy: optional account, minimal permissions, deletion route, Ethiopian PDPP 1321/2024 applies (verify). Time zone: show event time (EAT, UTC+3) and user's local time.

---
## P1 — Non-accredited visitor / international attendee ("Maria", climate-interested traveller or event-adjacent professional)
- **Goals:** attend public/Green Zone-type activities if available; see Addis; connect with the climate community without a party badge.
- **Tasks:** find out whether and how the public can enter; book travel/lodging; plan days; get around; find side events open to all.
- **Pain points:** unclear public access rules; accommodation scarcity/cost (COP30 lesson); no local knowledge; scattered information; fear of scams.
- **Information needs:** dates/venue, entry rules/capacity/passes, e-visa, transport from Bole airport, safe areas, SIM/data, weather, local etiquette, emergency info.
- **App interactions:** pre-trip guide and checklist; programme filter "open to public"; personal agenda; map/directions; alerts; offline guide.
- **Accessibility:** may need step-free routes, large text; English UI; maybe screen reader.
- **Notifications:** schedule changes, entry-capacity alerts, transport disruptions, safety advisories.
- **Security/privacy:** reluctant to share location or ID; wary of mandatory apps (Hayya lesson).
- **Pre / during / post:** *Pre:* plan & book; *During:* navigate, attend, adapt; *Post:* photos, outcomes, reuse the guide for next trip.

## P2 — Local attendee ("Abebe/Selam", Addis resident, student or professional)
- **Goals:** take part in an historic event in their city; learn; maybe volunteer or find work/networking; show pride.
- **Tasks:** find public events; understand what COP32 means in Amharic; plan visits; get around despite road closures; share with family.
- **Pain points:** content only in English; data cost; traffic/closures; low trust in information sources; limited awareness of what's open to public.
- **Information needs:** Amharic explainers, local events, road/transport changes, how to join/volunteer, Green Legacy activities.
- **App interactions:** Amharic-first home; "what's happening near me/today"; traffic/closure alerts; share cards; offline basics.
- **Accessibility:** Amharic fonts (D11) and screen-reader support; low-end Android; audio support for lower literacy.
- **Notifications:** local event reminders, closure alerts; opt-in language choice.
- **Security/privacy:** data-protection concerns; local data storage per law (verify).
- **Pre / during / post:** *Pre:* awareness, volunteering; *During:* local events, mobility; *Post:* legacy, outcomes in Amharic.

## P3 — Journalist / media ("Daniel", international and Ethiopian press)
- **Goals:** accurate, timely stories; access to briefings/press conferences; logistics.
- **Tasks:** check accreditation/press centre info; track schedule of press events; get verified statements/documents; find sources; file stories.
- **Pain points:** scattered official sources; last-minute changes; language gaps (English vs Amharic outlets); bandwidth at venue; misinformation.
- **Information needs:** press-conference calendar, press kits, official documents, spokespersons, embargo notes, venue/press-centre logistics.
- **App interactions:** media section; verified-source feed; alerts for press events; document downloads; contacts; time-zone-aware schedule; EN/AM releases.
- **Accessibility:** quick scanning, offline downloads, share/export.
- **Notifications:** breaking announcements, press-conference reminders, embargo lifts.
- **Security/privacy:** source protection — avoid tracking/telemetry; no mandatory login for public releases.
- **Pre / during / post:** *Pre:* accreditation & logistics; *During:* real-time info; *Post:* outcome documents, archive.
- Dependency: official media accreditation (UNFCCC/host) data and press office cooperation.

## P4 — Remote / public follower ("Ayesha", follows from another country/time zone)
- **Goals:** understand what is happening and what it means; watch key sessions; get summaries.
- **Tasks:** find live streams; catch up on recordings; read plain-language summaries; follow topics (finance, adaptation); share.
- **Pain points:** jargon; time-zone confusion; fragmented streams; fear of misinformation; sessions gated.
- **Information needs:** what's live/next in my time zone; key outcomes; explainers; link to official sources.
- **App interactions:** time-zone-aware schedule; follow topics; push/email digests; web-first (no install); captions.
- **Accessibility:** captions/transcripts; screen reader; low bandwidth modes.
- **Notifications:** daily digest; topic alerts; key-moment alerts.
- **Security/privacy:** minimal data; anonymous browsing; email opt-in only.
- **Pre / during / post:** *Pre:* learn basics; *During:* follow; *Post:* outcomes tracker, archive.
- Dependency: stream rights and links from UNFCCC/host.

## P5 — Side-event organiser / exhibitor / partner ("Tigist", runs a pavilion or side event)
- **Goals:** reach audiences, fill sessions, get leads, show projects.
- **Tasks:** submit/update event details; share location/time; promote; manage changes; view attendee interest.
- **Pain points:** 300+ side events compete (ACS2 scale); discoverability; last-minute room/time changes; no analytics.
- **Information needs:** application process, deadlines, venue/room specs, rules, audience demographics.
- **App interactions:** organiser portal (admin); listing pages; QR links; change notices; interest counts; contact options.
- **Accessibility:** forms in EN/AM; mobile-friendly portal.
- **Notifications:** approvals, schedule changes, reminders.
- **Security/privacy:** organisation verification; content moderation; attendee data minimal.
- **Pre / during / post:** *Pre:* apply & prepare; *During:* promote & adapt; *Post:* reports, archive of materials.
- Dependency: host rules for side events/pavilions (not yet public).

## P6 — Volunteer ("Hana", trained helper)
- **Goals:** help visitors, do tasks well, learn, be recognised.
- **Tasks:** know shifts, answer questions, give directions, escalate issues.
- **Pain points:** inconsistent info, too many sources, language gaps, poor connectivity.
- **Information needs:** FAQs, maps, shift/duty info, escalation contacts, emergency procedures, visitor guidance in EN/AM.
- **App interactions:** volunteer mode with quick answers, offline FAQ, report-issue button, announcements, shifts (if provided).
- **Accessibility:** large buttons; quick access.
- **Notifications:** shift changes, urgent operational notices.
- **Security/privacy:** role-based access; no sensitive data by default.
- **Pre / during / post:** *Pre:* training materials; *During:* operations; *Post:* certificates/feedback.
- Dependency: volunteer programme owner and data.

## P7 — Event staff / admin ("Kidus", content/ops team member)
- **Goals:** publish accurate, timely information; handle changes and incidents.
- **Tasks:** update schedule, send alerts, moderate, publish news, manage content in EN/AM.
- **Pain points:** manual duplication, approval delays, error risk, two languages.
- **Needs:** CMS, approval workflow, emergency publishing, audit log, roles (Phases 15–16).
- **Security:** strong authentication, role-based permissions, audit logs.

## P8 — NGO / civil-society participant
- **Goals:** advocacy, networking, event participation, observer logistics.
- **Pain points:** observer access rules, side-event discovery, coordination across constituencies.
- **Needs/interactions:** constituency pages/events, side-event discovery, meeting spaces info, documents, alerts; links to official observer processes.
- **Privacy:** human-rights-sensitive participants may need anonymity; avoid tracking.
- **Pre/during/post:** plan engagement → coordinate & join → follow outcomes.

## P9 — Youth participant (incl. YOUNGO members, students)
- **Goals:** voice, learning, networking, opportunities.
- **Pain points:** cost, access, tokenism, jargon.
- **Needs/interactions:** youth programme, free/low-cost events, learn-pathways, volunteer opportunities, social sharing, Amharic explainers.
- **Notifications:** opportunity alerts; **privacy:** minors' data — consent/age rules to research (Phase 13).

## P10 — Researcher / academic
- **Goals:** papers, data, networking with practitioners.
- **Needs:** documents, datasets, reports, session recordings, citations, archive; schedule of science events.
- **Interactions:** search/filter, bookmarks, export citations, notifications for publications.

## P11 — Business / investor participant
- **Goals:** deal flow, partnerships, market insight, Ethiopia opportunities.
- **Needs:** business/investor events, pavilions, contacts, side-event lists, meeting requests (light), logistics (hotels, transport), Addis business context.
- **Pain points:** time scarcity, finding the right people, security.
- **Privacy:** professional profiles only if opted in.

## P12 — Speaker / panelist
- **Goals:** show up on time and prepared; reach audience.
- **Needs:** session details, room/time, tech check, materials upload, change alerts, profile accuracy, post-session resources.
- **Interactions:** speaker view (read mostly), updates from organisers; **privacy:** profile control.

## P13 — Sponsor / partner (funder)
- **Goals:** visibility, impact, reporting.
- **Needs:** sponsor listing, analytics (aggregate), engagement reports, branding guidelines; **constraint:** ads/commercial content must not undermine trust; independence policy (Phase 17).

## P14 — Delegate (Party / observer, accredited) — Tier 3
- Uses the UNFCCC platform for negotiation workflows (D8). From us they need: city guide, transport, maps, local info, itineraries, link-out to official platform. **Out of scope:** delegation management, closed-session schedules, text tracking.

## P15 — Government representative (Ethiopian and foreign) — Tier 3
- Needs: protocol/logistics information (via official channels), public information they can reference; Ethiopian officials also act as **adopters/owners** (see stakeholder map). Security-sensitive: no sensitive schedules in our app.

## Open validation questions (to confirm via BA interviews)
Which personas are genuinely reachable and willing; Amharic vs English preference per persona; which features each rank top; trust in unofficial apps; acceptance of accounts and notifications; actual device models; Green Zone expectations; willingness to share location.
