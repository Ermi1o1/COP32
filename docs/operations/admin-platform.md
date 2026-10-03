# Phase 16 — Admin & Operations Platform (draft v1, 2026-10-03)
Defines the back-office consoles, roles, permissions, workflows and the event-time operating model. It builds on the editorial system (D28–D30 approved), security baseline (D22), privacy commitments (D21), architecture (D17/D18) and data strategy (D19/D20). Technology (the CMS and console frameworks) is decided by spike S2.

## 1. Purpose and principles
1. **One controlled place to run the event's information**, usable under pressure, safe by default, fully audited.
2. **Least privilege and separation of duties** (NIST RBAC model: roles, hierarchy, and static/dynamic separation-of-duty constraints).
3. **High-risk actions are slow on purpose** (broadcast alerts, mass notifications, role changes, exports, deletions); low-risk actions are fast.
4. **Privacy-preserving by design:** no per-user tracking views; aggregate analytics only; personal data access limited to Support/DPO workflows.
5. **Event-agnostic:** every console works per `event_id`; roles can be scoped to an event, an area, or a module.
6. **Bilingual admin experience** (English UI minimum; Amharic labels for fields and content editing; Amharic admin UI is a Should).
7. **Accessible:** the admin consoles meet the same accessibility baseline (D25) — operators may have disabilities and duty staff work on small screens.
8. **Operable offline-tolerant:** consoles degrade gracefully; critical actions (alerts, kill switches) have a documented fallback when the CMS is unreachable.

## 2. Consoles (modules)
| # | Console | Primary users | Key functions | Release |
|---|---|---|---|---|
| C1 | **Content console (CMS)** | Content editor, Approver, Translator/Reviewer, Media manager | Create/edit all content types, workflow states, preview in app/web, EN/AM side-by-side, revision diff and rollback, scheduling/embargo, bulk edit, glossary | Demo (basic) → Pilot |
| C2 | **Programme console** | Programme manager, Speaker manager, Exhibitor manager | Import (CSV/ICS/JSON) into **staging**, validation report, **diff view** against live, approve/reject changes, manage sessions/rooms/speakers/pavilions, change-notification proposals | Demo (import) → Pilot |
| C3 | **Alerts & notifications console** | Alert publisher, Approver, Notification manager | Alert templates (CAP-aligned fields), dual approval, test/exercise mode, audience/segment targeting (no PII), schedule, update/cancel, delivery stats, kill switch, push preview for iOS/Android/Huawei | Pilot (basic) → Event (full) |
| C4 | **Moderation console** | Moderator, Support | Queue of organiser submissions, reports/flags, takedown requests, corrections inbox, decisions with reasons, appeals, canned responses | Pilot → Event |
| C5 | **Organiser portal** (external) | Organisers/exhibitors | Verified accounts, create/edit own listings, status tracking, change notices, materials upload, interest counts | Event |
| C6 | **Volunteer & operations console** | Volunteer coordinator, Duty editor | Volunteer invites/codes, FAQ/handbook content, operational broadcasts, issue reports intake (if enabled) | Event |
| C7 | **Venue & places console** | Venue manager, Content editor | Venues/zones/rooms, POIs, accessibility attributes, map layers, field-verification workflow, opening hours, closures | Pilot → Event |
| C8 | **Link-out registry** | Link-out manager (Content lead), Approver | Providers, types (official/commercial), approval status, sponsored flags, link checker status, fallbacks (D14) | Demo → Pilot |
| C9 | **Analytics dashboard** | Analytics user, Event admin, Owner | Aggregate usage (see §8), content freshness, translation lag, publish times, alert delivery, accessibility check results | Pilot (basic) → Event |
| C10 | **Users & roles console** | Super admin, Event admin | Staff accounts, role assignment with constraints, access requests/reviews, invites, offboarding, MFA status | Pilot |
| C11 | **System console** | Technical administrator | Feature flags/remote config, job queues, snapshot builder status, backups, deployment status, API keys, integration/feed status, maintenance mode, read-only mode | Pilot |
| C12 | **Privacy & audit console** | DPO/Auditor, Support (limited) | Data subject requests (access/export/erasure), consent records summary, audit-log search, retention job reports, breach register | Pilot |
| C13 | **Event setup** | Event admin, Super admin | Create/clone an event: dates, time zone, languages, modules, branding tokens, themes/taxonomy, roles, phase switching (pre/during/post), archive/closure | Post-event / Later (manual configuration in MVP) |
| C14 | **Operations dashboard / status board** | Duty editor, Incident lead, Event admin | Live system health, publish queue, alert status, push delivery, error rates, user reports, upcoming scheduled items, handover notes | Event |

## 3. Roles
Role codes used in the matrix are in brackets. A person may hold several roles subject to the constraints in §5. All roles are **scoped** by event (and optionally by module or area).
| Role (code) | Description / scope |
|---|---|
| Super admin (SA) | Break-glass ownership of configuration and identity; very few holders; cannot publish content or alerts; all actions dual-approved or logged for review |
| Event administrator (EA) | Runs the event instance: configuration, schedules, role assignments within the event (not super-admin roles), phase switching, reports |
| Programme manager (PM) | Owns programme data: sessions, rooms, side events, import and change approval |
| Content editor (CE) | Writes and edits content; submits for review; cannot approve own work |
| Translator / Reviewer (TR) | Translates and reviews EN/AM content; manages glossary entries (with term owner) |
| Approver (AP) | Approves and publishes content on Standard/Fast tracks; cannot be author of the same item |
| Speaker manager (SpM) | Manages speaker profiles, consents, photos/bios |
| Exhibitor manager (ExM) | Manages pavilions/exhibitors and organiser accounts, verifies organisations |
| Media manager (MM) | Manages assets, licences, captions/transcripts, galleries |
| Moderator (MOD) | Reviews organiser submissions, reports and takedowns |
| Notification manager (NM) | Prepares non-emergency notifications and digests; schedules; cannot send emergency alerts |
| Alert publisher (ALR) | Drafts and sends alerts from authorised-source references; hardware-key authentication; always requires a second authoriser |
| Alert authoriser (ALA) | Second person approving alerts (may be a designated host liaison); cannot be the publisher of the same alert |
| Venue manager (VM) | Manages venue/zone/room data, POIs, accessibility data, closures |
| Link-out manager (LM) | Maintains the link-out registry and neutrality rules; owner approval step recorded |
| Technical administrator (TA) | Infrastructure, deployments, flags, jobs; no content publishing rights; privileged actions via just-in-time elevation |
| Analytics user (AN) | Reads aggregate dashboards; no access to individual data |
| Support (SUP) | Handles user requests, corrections inbox, organiser support; limited personal data access via ticket scope |
| DPO / Auditor (DPO) | Read-only oversight of audit logs, requests, consents; independent of operators; cannot administer |
| Volunteer coordinator (VC) | Manages volunteer invite codes, handbook content, operational broadcasts to volunteers |
| Organiser (ORG, external) | Verified partner; manages only own listings |
| Duty editor (DE) | Shift role combining CE+AP rights for the Fast track during event hours, plus incident coordination; elevated only during assigned shifts |
| Incident lead (IL) | Shift role coordinating incidents and escalation; can trigger kill switches and maintenance modes with logged reasons |
(Role names map to the brief's list: Super admin, Event administrator, Program manager, Content editor, Speaker manager, Exhibitor manager, Media manager, Moderator, Notification manager, Venue manager, Technical administrator, Analytics user — plus roles added by Phases 12–15.)

## 4. Permission matrix (key resources)
Legend: C create · R read · U update · D delete/archive · S submit for approval · A approve · P publish · X export · — none. "own" = own items only. All actions are audited.
| Resource | SA | EA | PM | CE | TR | AP | SpM | ExM | MM | MOD | NM | ALR/ALA | VM | LM | TA | AN | SUP | DPO | ORG |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Guide/Explainer/FAQ/News | R | R,P | R | C,U,S | U (translations) | A,P | — | — | R | — | R | — | — | — | — | — | R | R | — |
| Programme (sessions, rooms) | R | R,A | C,U,S,A* | R | U (translations) | R | R | R | — | — | R | — | R | — | — | R | — | R | R,U (own, S) |
| Speakers / People | R | R | R | R | U (translations) | R | C,U,S | — | R | — | — | — | — | — | — | — | R | R | — |
| Exhibitors / Pavilions | R | R | R | R | U (translations) | R | — | C,U,S,A | R | R | — | — | R | — | — | — | R | R | C,U (own),S |
| Places / Venues / Maps | R | R | R | R | U (translations) | R | — | — | — | — | — | — | C,U,S,A* | — | — | — | — | R | — |
| Link-out registry | R | R | — | R | — | A | — | — | — | — | — | — | — | C,U,S | — | — | R | R | — |
| Media assets | R | R | — | C,U | — | R | — | — | C,U,D | R | — | — | — | — | — | — | — | R | C (own) |
| Non-emergency notifications | R | R,A | — | — | — | A | — | — | — | — | C,U,S,P* | — | — | — | — | R (stats) | — | R | — |
| **Alerts (emergency)** | R | R | — | — | — | — | — | — | — | — | — | **ALR: C,S · ALA: A,P (different person)** | — | — | — | R (stats) | — | R | — |
| Moderation queue | — | R | — | — | — | — | — | R | — | R,U,A | — | — | — | — | — | — | R,U | R | R (own status) |
| Users/Roles (staff) | C,U,D | C,U (non-SA) | — | — | — | — | — | — | — | — | — | — | — | — | R | — | — | R | — |
| Feature flags / maintenance | U (with TA) | R | — | — | — | — | — | — | — | — | — | — | — | — | C,U (logged) | — | — | R | — |
| Analytics (aggregate) | R | R | — | — | — | — | — | — | — | — | — | — | — | — | R | R | — | R | — |
| Data subject requests | — | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C,U (scoped) | R,A | — |
| Audit log | R (limited) | R (own event) | — | — | — | — | — | — | — | — | — | — | — | — | R (system) | — | — | R | — |
| Exports (CSV etc.) | X (logged) | X (aggregates) | X (programme) | — | — | — | — | — | — | — | — | — | — | — | X (ops) | X (aggregates) | — | X | — |
\* = subject to the constraints below. A row-by-row editable version will be generated into the CMS role configuration and kept in `docs/operations/roles-matrix.csv` once the CMS is chosen.

## 5. Separation-of-duties constraints (static and dynamic)
| # | Constraint | Type |
|---|---|---|
| SD1 | The author/creator of an item cannot approve or publish it | Dynamic (per item) |
| SD2 | The alert publisher and the alert authoriser must be different people, authenticated with hardware keys, and at least one must be present on the duty roster | Dynamic |
| SD3 | Super admin and Technical administrator cannot hold content publishing roles (AP, ALR, ALA) | Static |
| SD4 | DPO/Auditor cannot hold SA, EA, TA or any editing role | Static |
| SD5 | Role assignment: EA can assign roles but cannot assign SA; role grants need a second approver for ALR, ALA, TA | Dynamic |
| SD6 | Organisers cannot hold staff roles in the same event | Static |
| SD7 | Exports of personal data require DPO approval; exports of aggregates are logged | Dynamic |
| SD8 | Elevated privileges (TA, SA, ALR) are granted just-in-time with expiry; standing access is minimised | Dynamic |
| SD9 | No shared accounts; all actions attributable | Static |
| SD10 | Deletion of audit logs is impossible via the application; retention is enforced by policy jobs only | Static |

## 6. Key workflows
### 6.1 Staff lifecycle
Request → role owner approval → (for ALR/ALA/TA: second approval) → provision SSO account with MFA and hardware key if required → training/certification (including alert drill) → access granted with expiry → quarterly access review → offboarding checklist (same-day revocation, key return, session invalidation).
### 6.2 Programme import and change control
Upload → automatic validation (IDs, time ranges, languages, rooms, access labels, URLs) → staging diff vs live → Programme manager reviews and annotates → approver publishes → system proposes change notifications for saved/followed sessions → publish builds new snapshot → dashboards show impact (items changed, followers to notify). Emergency schedule change: Fast track with single approver + duty editor, logged.
### 6.3 Standard/Fast content publishing
As in the editorial system (§3): states, tracks, quality gate, translation tasks, scheduling. The console enforces the quality gate checklist before the Publish button enables.
### 6.4 Alert flow
Select source authorisation (reference to the authorising body from the matrix) → choose template → fill fields (urgency/severity/certainty/area/expiry) in EN and AM → preview (push, banner, alert feed, screen-reader announcement) → second authoriser reviews and approves within the console → send → monitor delivery → update/cancel → post-alert report. Exercise/Test mode isolated from production audiences.
### 6.5 Moderation and corrections
Intake (organiser submission, "report an error", takedown request) → triage by priority → action with reason (approve, request changes, reject, remove, correct) → notify submitter → correction note published → metrics.
### 6.6 Data subject requests (D21/D22)
Request received (in-app or web form) → identity check → Support creates ticket → system generates export or schedules erasure → DPO approves erasure scope → completion notice → log. Backups age out per retention.
### 6.7 Event phase switching
Event admin switches pre/during/post with two-person confirmation; effects: Home modules, notification defaults, desk rosters, archive jobs; rollback possible.
### 6.8 Kill switches and degraded modes (Incident lead / TA)
Pre-built switches: disable a feature (e.g., organiser portal), show maintenance banner, freeze content (read-only), serve static emergency page, pause notifications, disable a link-out provider, force app update prompt for critical fixes. Each requires a reason, creates an audit entry and notifies the duty channel.

## 7. Event-time operating model (digital operations cell)
Modelled on the Incident Command System principles used for large events: unified command with host operations, clear functions, span of control ≤ ~7, handover logs, and incident action plans. The cell supports the host's operations; it does not replace host command.
| Function | Role(s) | Responsibilities |
|---|---|---|
| Command | Incident lead (+ deputy) | Coordinates, decides escalation, liaises with host operations centre |
| Public information | Duty editor / Content desk | Updates, digest, press, corrections |
| Operations — programme | Schedule desk (PM) | Change intake, import, notifications |
| Operations — alerts | Alert desk (ALR + ALA on duty) | 24/7 alert handling with templates |
| Operations — translation | Translation desk (TR) | EN/AM parity on Fast track |
| Operations — moderation & support | Moderation/Support desk | Organiser content, reports, user requests |
| Technical | Technical desk (TA) | Systems health, deployments freeze, mitigations |
| Liaison | Host liaison | Contact with host operations, security, health, transport |
| Safety/Privacy | DPO / security lead (on call) | Incident privacy/security decisions |
Rules: written shift handover; incident log; severity levels (S1 safety-critical/wrong alert; S2 major outage; S3 degraded; S4 minor) with response targets; decision authority matrix; pre-written holding statements; rehearsals before the pilot and before the event; post-incident reviews.
Runbooks (minimum): wrong or false alert; alert system unavailable; CMS down/compromised; API degraded; CDN or snapshot failure; push provider failure; DDoS; data breach (72-hour clock); wrong schedule published; broken or compromised link-out; mistranslation in alert; host data feed delayed; venue network outage; severe weather; mass user reports; key personnel absence; legal takedown request.

## 8. Analytics (aggregate, privacy-preserving)
- **Allowed metrics:** sessions/day, active devices (coarse), views by content type/theme, saves, searches (top terms, anonymised), language split, platform split (iOS/Android/web), country (coarse), offline pack downloads, alert delivery/open rates (aggregate), publish times, freshness, translation lag, broken links, accessibility check results, performance (load times), crash-free rate.
- **Safeguards:** minimum group size thresholds (e.g., hide cells with fewer than 10 users), no individual timelines, no cross-device identity, truncated IPs, retention per D21/§5 of Phase 13, export of aggregates logged.
- **Product KPIs:** link to success criteria (official links obtained, endorsement, press coverage — D6) are tracked in a separate project dashboard, not in the admin console.
- **Platform parity KPI (D27 amendment):** iOS vs Android vs web usage share to validate the parity assumption.

## 9. Admin UX requirements
Role-aware navigation; global search across content; saved filters/views; bulk actions with preview and undo; inline editing; side-by-side EN/AM editing with translation status; visual diff for revisions and imports; live previews (phone frame iOS/Android, web; light/dark; text-size); templates; keyboard shortcuts; context help and runbook links; confirmation friction proportional to risk (e.g., typed confirmation for all-user alerts); clear environment indicator (production vs training/staging); session timeout with draft autosave; mobile-friendly duty views; accessibility parity (WCAG 2.2 AA); notifications/inbox for tasks and approvals; time-zone clarity (EAT shown with UTC offsets).
Training environment ("sandbox") with sample data for onboarding and drills.

## 10. Security of the admin plane
Separate admin domain and network segment; SSO (OIDC) with MFA for all staff; hardware keys for SA, TA, ALR, ALA; device and IP policies where practical; short sessions for privileged roles; just-in-time elevation; privileged actions require reason + ticket reference; CSP and strict cookie settings; rate limiting; WAF; no personal data in logs; secrets in a vault; immutable audit log with alerting on anomalous admin behaviour; regular access reviews; penetration test scope includes admin consoles and the organiser portal.

## 11. Data and integration administration
Feed status board (last import, errors); staging area with retention limits; export controls; retention job dashboard; API keys with scopes; webhook management; link checker results; backup and restore requests handled by TA with dual control and DPO notification when personal data is involved.

## 12. Release plan (admin features)
| Release | Admin capabilities |
|---|---|
| Demo (Dec 2026) | Minimal CMS: bilingual content entry, spreadsheet import, preview, publish to demo snapshot (sample data); no external users |
| Pilot (Jun 2027) | Roles and SSO/MFA, approvals and tracks, programme import with diff, notification console (non-emergency), link-out registry, audit log, privacy console (requests), basic analytics, training sandbox |
| Event (Oct 2027) | Alerts console with dual approval and drills, moderation console, organiser portal, volunteer console, ops dashboard/status board, kill switches, full runbooks, on-call integration |
| Post-event | Archive freeze tools, retention sweeps, export package, event closure |
| Later | Event-setup wizard (clone/new event), advanced analytics, Amharic admin UI, SLA reports, API for partners |

## 13. Requirement IDs (traceability to the feature catalog)
ADM-01 Bilingual CMS (C1) · ADM-02 Approval workflow (C1, C2) · ADM-03 Emergency publishing (C3) · ADM-04 Schedule import (C2) · ADM-05 Notification console (C3) · ADM-06 Moderation queue (C4) · ADM-07 Privacy-respecting analytics (C9) · ADM-08 Multi-event setup (C13) · ADM-09 Audit log (C12) · ADM-10 Open API (Later). New: ADM-11 Roles console (C10) · ADM-12 System console/flags (C11) · ADM-13 Privacy console (C12) · ADM-14 Ops dashboard (C14) · ADM-15 Organiser portal (C5) · ADM-16 Volunteer console (C6) · ADM-17 Venue/places console (C7) · ADM-18 Link-out registry (C8) · ADM-19 Training sandbox · ADM-20 Kill switches.

## 14. Risks
| # | Risk | Mitigation |
|---|---|---|
| A1 | Admin account compromise → false alerts or defacement | SSO+MFA+hardware keys; dual approval; signed manifests; anomaly alerts |
| A2 | Role sprawl or permission creep | Scoped roles; expiry; quarterly reviews; SoD constraints |
| A3 | Operator error under pressure | Templates; friction for high-risk actions; training; drills; sandbox |
| A4 | Single point of failure (CMS down) | Break-glass path; static fallback; runbooks; backups |
| A5 | Insider misuse of personal data | Minimal data; scoped Support access; DPO oversight; logs |
| A6 | Fragmented tooling (many consoles) | One SSO; unified navigation; consistent patterns |
| A7 | Host authorities not integrated in alert workflow | Early agreement on authorisation matrix; liaison role; relay-only policy |
| A8 | Analytics misuse (de-anonymisation) | Thresholds; aggregation; no individual drill-down |
| A9 | Handover to government unclear | Documentation; admin guide; role transfer plan; training |
| A10 | Organiser portal abuse | Verification; moderation; rate limits |

## 15. Open questions
1. Which host or government body will provide alert authorisers and a liaison (24/7)? 2. Will the government use its own identity provider (SSO) for staff? 3. Who are the Event administrator and Super admin after handover? 4. Does the host expect integration with its operations centre tools (chat, ticketing)? 5. Language of the admin UI for government staff (EN only vs EN/AM)? 6. Who holds the signing keys, and where (HSM or managed key service in Ethiopia)? 7. How will staff training and certification be delivered and recorded? 8. Is there a public status page requirement?

## 16. Proposed decisions
- **D31:** adopt the console set (C1–C14), the role model and the separation-of-duties constraints (§3–§5), with scoped, just-in-time privileged access and hardware keys for SA/TA/ALR/ALA.
- **D32:** adopt the event-time digital operations model (§7), kill switches and runbook set, and rehearsals before pilot and event.
- **D33:** adopt the aggregate-only analytics rules (§8) and the release plan for admin features (§12).
