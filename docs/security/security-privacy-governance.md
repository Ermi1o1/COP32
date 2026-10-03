# Phase 13 — Security, Privacy & Governance (draft v1, 2026-10-03)
This document defines requirements. It is **not legal advice**; items needing a qualified Ethiopian lawyer are listed in §14. Legal sources were found through secondary reprints and policy trackers and must be verified against the official Negarit Gazette text.
Inputs: Proclamation 1321/2024 article review (see architecture doc §4), reality check, architecture (D17/D18), data strategy (D19/D20), personas, flows.

## 1. Legal and regulatory landscape (researched)
| Instrument / body | What it requires (as found) | Effect on the product | Verification |
|---|---|---|---|
| **Personal Data Protection Proclamation No. 1321/2024** (in force 24 July 2024) | Art. 22 local storage of locally collected personal data; Art. 20 cross-border transfer conditions; Art. 8 consent (free, informed, specific, active); Art. 11 minors; Art. 28 erasure; Art. 32 portability; Art. 33 registration; Art. 40 DPO (incl. government bodies); Art. 43–44 72-hour breach notification; Art. 60 fines up to 4% of worldwide turnover; Art. 64 criminal penalties | Drives architecture (D17), data minimisation, consent, deletion, DPO, breach process | Secondary reprint; lawyer to confirm vs gazette |
| **Supervisory authority** | Reported as the **Ethiopian Communications Authority (ECA)**: register of data processors, complaints, sanctions | Registration, notifications, guidance requests | Secondary sources; confirm operational status and forms |
| **Computer Crime Proclamation No. 958/2016** | Criminalises hacking, data damage, fraud; obliges service providers to retain communications records for at least a year; surveillance powers | Log retention and lawful-request handling procedures; hosting provider obligations; unauthorised access offences | Secondary sources; lawyer to confirm applicability to us |
| **Hate Speech and Disinformation Prevention and Suppression Proclamation No. 1185/2020** | Prohibits hate speech and disinformation; **social media platforms** must have measures and remove flagged content within **24 hours** | Applies directly to large social platforms; our UGC is minimal, but adopt a 24-hour takedown standard for any user content and a disinformation-aware editorial policy | Applicability thresholds to be confirmed |
| **INSA (Information Network Security Administration)** | National cybersecurity authority; conducts security audits; organisations processing citizen, government or sensitive data are reported to need registration and periodic audits; cyber security audit guideline published | Government-owned platform should expect INSA review → plan audit-readiness, documentation, remediation | Secondary sources; confirm requirements for this class of system |
| **Ethio-CERT (INSA)** | National cyber emergency response team; member of FIRST | Incident reporting/coordination contact | Confirm reporting process |
| **International** | GDPR may apply to services offered to people in the EU (visitors, remote followers); other national laws may apply to residents of other countries | Treat GDPR-style rights, notice and transfers as a baseline; avoid targeting EU marketing | Lawyer to confirm |
| **App stores** | Google Play: apps with account creation need an in-app deletion path and a web deletion link, plus Data safety form; Apple App Store Guideline 5.1.1(v): in-app account deletion and privacy nutrition labels | Account deletion UX; accurate labels; privacy policy URL in EN/AM | Official store policies (found) |
| **Accessibility standards** | WCAG 2.1 AA target (project decision) | See Phase 14 | — |
| **UNFCCC / UN practices** | Official platform terms and data-sharing rules for any use of UNFCCC content/logos | Do not misuse UN/UNFCCC branding; licence for content use | Request permission |

## 2. Privacy-by-design commitments (proposed D21)
1. **Guest-first:** all public features work without an account; accounts only for sync and for staff, organiser and volunteer tools.
2. **Device-first personal data:** saved sessions, favourites, language, time zone, text size and **accessibility needs** (e.g., step-free routing) stay **on the device**. Accessibility needs could reveal health information (a potentially sensitive category), so they are never uploaded.
3. **No role registry:** the "I am a journalist/NGO/…" choice is stored on the device only. We do not build a list of journalists or activists on a server.
4. **Location:** requested only when the user taps a location feature; "near me" is computed **on the device** against downloaded points of interest; no location history is stored; directions hand off to the device's map app.
5. **No advertising, cross-app tracking or profiling;** no advertising IDs; no social-login SDKs; no third-party analytics SDKs that send device data abroad.
6. **Analytics:** self-hosted, aggregate-only; no per-user event streams; coarse country/language only; IPs truncated or dropped.
7. **Push:** tokens stored in Ethiopia; topics limited to language and a few public topics; payloads contain no personal data; users can opt out of any category.
8. **Link-outs and embeds:** interstitial before leaving; embeds only on click ("click to load") to prevent third parties receiving data on page load.
9. **Minors:** no profiling or marketing; no accounts for under-age users without parental consent (age gate wording subject to legal advice); youth features avoid collecting personal data.
10. **Transparency:** plain-language privacy notice in English and Amharic, short in-app summaries ("just-in-time" notices), and a public data inventory.

## 3. Mapping of the Proclamation to design responses
| Provision | Design response | Owner |
|---|---|---|
| Art. 22(1) local storage | Personal-data plane in Ethiopian data centres; public content on CDN | Architecture |
| Art. 22(3) sensitive data transfers | No sensitive data collected | Product |
| Art. 20 cross-border | Minimise transfers; document any (push services; email provider); consent/adequacy per legal advice | Legal + Arch |
| Art. 8 consent | Granular, revocable, versioned consent records; no pre-ticked boxes; consent for push, optional account, optional analytics (if not aggregate-only) | Product |
| Art. 11 minors | No profiling/marketing; age-appropriate notice; parental consent route if accounts for minors are ever allowed | Product + Legal |
| Art. 28 erasure | In-app "Delete my account and data"; web request form; erase within a stated period; propagate to backups by expiry | Engineering |
| Art. 32 portability | Export of account data in JSON/CSV | Engineering |
| Art. 33 registration | Register controller/processor roles with the authority | Owner + Legal |
| Art. 40 DPO | Appoint a DPO (mandatory where government processes) | Owner |
| Art. 43–44 breach | 72-hour playbook: detection → triage → notify authority and users | Security + DPO |
| Records and DPIA | Record of processing activities; DPIA before pilot (guest-first design should keep risk low) | DPO |

## 4. Identity, authentication and authorisation
### 4.1 Authentication
| Population | Method | Notes |
|---|---|---|
| Public visitors | None (guest) | Default |
| Optional users (sync, organiser, volunteer) | Passwordless email one-time code or magic link; passkeys later; phone OTP optional via local operator | Rate limits, replay protection |
| Staff (editors, approvers, alert publishers, admins) | SSO via OIDC identity provider + **mandatory MFA** (TOTP/FIDO2) | Hardware keys for alert publishers/admins |
| Machine access | Short-lived tokens, scoped API keys, mutual TLS between services | Secrets in a vault |
### 4.2 Authorisation: role-based with least privilege (detail in Phase 16)
| Role | Core permissions | Controls |
|---|---|---|
| Guest | Read public content | — |
| User | Manage own profile, sync, consents | Self-service deletion |
| Volunteer | Volunteer mode content; report issues | Invite code + account |
| Organiser | Create/edit **own** events/listings; submit for approval | Organisation verification; moderation |
| Editor | Draft content (EN/AM) | No publish rights for alerts |
| Approver | Approve/publish content | Separation of duties from author |
| Alert publisher | Publish alerts | Dual approval; hardware key; reason + audit |
| Analyst | View aggregate analytics | No personal data |
| Support | Handle user requests (deletion/export) | Limited, logged access |
| DPO/Auditor | Read-only on logs, records, requests | Independent of operators |
| Admin | Configuration, user/role management | Break-glass; all actions audited |
| Super admin | Infrastructure/keys | Very few people; two-person approval for key actions |
Rules: no shared accounts; quarterly access reviews; immediate revocation on departure; just-in-time elevation for admin tasks.

## 5. Personal data lifecycle
| Data | Lawful basis (to confirm) | Retention (proposal) | Deletion |
|---|---|---|---|
| Account email/phone | Consent / contract for optional features | Until deletion; auto-delete inactive accounts after 12 months with notice | In-app + web form; within [30] days |
| Push tokens + language/topics | Consent | Until opt-out or 90 days of failures | Automatic on unregister |
| Consent records | Legal obligation | Life of account + [legal period] | With account after legal period |
| Organiser/volunteer profiles | Contract/consent | Event + [12] months; archive anonymised | On request / end of retention |
| Support requests | Legitimate interest | [12] months | Automatic |
| Security/audit logs | Legal obligation / legitimate interest | [12] months minimum (provider obligations), audit log per policy | Automatic |
| Aggregate analytics | Legitimate interest (non-personal) | 24 months | Rolling |
| Backups | Same as source | 30–90 days rolling | Expire |
Data subject request process: identity verification proportionate to risk; response within the legal deadline (to confirm); logs of requests.

## 6. Messaging, user content, photos/videos and moderation
- **MVP scope:** no public messaging, comments, photo wall or Q&A (Could/Later). User input is limited to feedback forms, organiser submissions, and "report an issue".
- **Policy for any future UGC:** community guidelines (EN/AM), report button, moderation queue, 24-hour response target for flagged content (aligned with Proclamation 1185/2020 practice), appeals, transparency on removals, protection of minors, no doxxing, no location sharing of individuals.
- **Photos/videos:** only official or properly licensed media in galleries; credits and takedown contact; consent for identifiable individuals and minors per policy; no user uploads in MVP; if enabled later → image scanning, EXIF stripping, age restrictions.
- **Disinformation:** editorial policy — official claims labelled by source and linked; alerts only from authorised sources with dual approval; corrections log; "report an error" on every item.
- **Abuse prevention:** rate limits, bot protection (privacy-preserving challenge), blocklists, anomaly detection on organiser portal and forms; spam-resistant contact forms.

## 7. Security requirements
### 7.1 Standards and baselines
- **Web/API:** OWASP ASVS **Level 2** as the verification baseline (v5.0 current), Level 3 controls for alert publishing and key management.
- **Mobile apps:** OWASP MASVS **L1** for all apps plus selected **L2** requirements for storage, crypto, network, platform interaction and resilience as appropriate; MASTG for test procedures.
- **Organisational:** align policies with ISO/IEC 27001 control themes (formal certification is a decision for the owner); NIST CSF categories for incident response; INSA guidelines (cyber security audit and evaluation) as the national reference.
### 7.2 Secure development lifecycle
Threat modelling per release; secure coding standard; peer review; SAST, dependency, secret and container scanning in CI; SBOM; signed builds and reproducible deployment; protected branches; least-privilege CI; staged rollouts with rollback; separate prod credentials; no production data in test.
### 7.3 Infrastructure and operations
Hardened images; network segmentation (public edge / application / data); WAF and DDoS protection at the CDN; TLS 1.2+ (prefer 1.3) with HSTS; rate limiting; patch SLAs; vulnerability management SLA (critical ≤ 72 h, high ≤ 7 days — proposal); secrets manager; key rotation; encrypted backups with restore drills; time synchronisation; central logging.
### 7.4 Content integrity (specific to this product)
**Signed content manifests** verified by apps; dual approval for alerts; emergency publishing audited; rollback of any publish; display "last updated" and source; protect CMS with MFA and IP/device policies; separate signing keys from CMS (HSM-like or protected key service); key-rotation plan.
### 7.5 Mobile-specific
No secrets in the app; secure storage for tokens (Keychain/Keystore); certificate validation (pinning only if rotation is managed); disable cleartext; deep-link validation (prevent open-redirect/hijack); WebView hardening or avoid WebViews; clipboard and screenshot protections only for sensitive screens; minimise permissions (notifications, optional location); obfuscation/tamper detection as proportionate (not a substitute for server controls); update prompts for critical security fixes.
### 7.6 Testing
Independent **penetration test before the pilot** and **again before the event**; mobile app pentest (MASTG); accessibility and privacy reviews; load/DDoS rehearsal; red-team style alert-spoofing test; INSA-style audit readiness; bug-bounty alternative: **vulnerability disclosure policy** and security.txt, with safe-harbour language agreed with the owner.
### 7.7 Incident response
Roles (Incident lead, DPO, communications, engineering, owner liaison); severity matrix; runbooks (account compromise, CMS compromise/false alert, DDoS, data leak, CDN failure); 24/7 on-call during the event window; evidence preservation; **notify authority and affected users within 72 hours** where required; liaison with Ethio-CERT/INSA; post-incident review; annual (and pre-event) tabletop exercises.

## 8. Encryption and key management
In transit: TLS everywhere, internal service encryption. At rest: disk/volume encryption, database column-level encryption for contact data, encrypted backups. Keys: managed vault, role-separated, rotation schedule, split knowledge for signing keys, documented recovery. No custom cryptography.

## 9. Audit logging and monitoring
Immutable (append-only, hash-chained or write-once) audit log for admin actions, publishing, approvals, role changes, data exports and deletions; time-synced; stored separately from application DB; access restricted to Auditor/DPO; alerting on anomalous admin behaviour, repeated failed MFA, mass exports, unusual publishing; uptime and integrity monitoring (compare served manifest signatures); privacy-preserving application metrics.

## 10. Data residency and transfers (summary)
Personal data plane in Ethiopia; CDN for public content only; push services (Google/Apple/Huawei) and any email provider are disclosed as transfers/processors with minimal payloads; no personal data in third-party analytics; exact legal treatment to be confirmed (§14).

## 11. Governance structure and documents
### 11.1 Roles (accountabilities)
| Role | Accountability | Notes |
|---|---|---|
| Platform owner (government office, after adoption) | Overall accountability; controller; appoints DPO | D2/D20 |
| Operator (Zega Tech or designated) | Processor/operator; runs platform under agreement | Until/unless transferred |
| Data Protection Officer | Independent oversight, DPIA, requests, regulator liaison | Mandatory for government processing (Art. 40) |
| Security lead | Controls, testing, incident response | |
| Editorial lead | Accuracy, source labels, corrections, alert approval policy | |
| Product owner | Scope, privacy-by-design decisions | |
| Legal counsel | Contracts, compliance advice | External |
### 11.2 Policy and document pack (to produce)
Privacy notice (EN/AM) · Terms of use · Cookie/storage notice (web) · Data inventory and Record of Processing · DPIA · Retention schedule · Data subject request procedure · Breach response plan · Information security policy · Access control policy · Vendor/processor agreements and review checklist (push, email, hosting, CDN) · Acceptable use + community guidelines · Content moderation policy · Editorial and sources policy · Alert authorisation protocol · Sponsorship and independence policy · Link-out/neutrality policy (D14) · Vulnerability disclosure policy · Accessibility statement · Change management and release policy · Business continuity/DR plan · Open-source licence compliance policy.
### 11.3 Review cadence
Quarterly access review; semi-annual policy review; pre-pilot and pre-event audit; post-event retrospective and data-minimisation sweep; annual DPIA update.

## 12. Compliance by release gates
| Gate | Required |
|---|---|
| Demo (Dec 2026) | Sample data only; no personal data processed; unofficial labelling; privacy summary draft |
| Pilot (Jun 2027) | Controller/processor roles settled (D20); registration steps taken; DPIA; privacy notice EN/AM; hosting in Ethiopia live; consent flows; deletion/export working; threat model; pentest 1; incident plan; store compliance (labels, deletion link); vendor review of push/email |
| Event (Oct 2027) | Pentest 2 + remediation; load/DDoS rehearsal; alert protocol drill; on-call roster; INSA/authority readiness; DPO appointed; backups verified; accessibility audit |
| Post-event | Retention sweep; archive anonymisation; lessons learned; data handover or deletion per agreement |

## 13. Risks
| # | Risk | Mitigation |
|---|---|---|
| S1 | Misinterpretation of localisation/transfer rules | Legal opinion; guest-first design; separate planes |
| S2 | Fake alerts or defaced content | Signed manifests; dual approval; hardware keys; monitoring |
| S3 | Insider or account compromise | MFA, least privilege, audit, separation of duties |
| S4 | DDoS or attacks during the event | CDN/WAF; static fallbacks; rehearsal; contacts with provider and Ethio-CERT |
| S5 | Surveillance perception of a government-adopted app (Hayya lesson) | Minimal permissions; transparent notice; no tracking; independent audit; no device-level data |
| S6 | Journalists/activists endangered by data collection | No role registry; device-local; no logs of reading behaviour; anonymous browsing |
| S7 | Third-party SDK/embedded content leaks | SDK gate; click-to-load embeds |
| S8 | Non-compliance with app store rules | Deletion flows; accurate labels; privacy URLs |
| S9 | UGC abuse | No UGC in MVP; policies ready before any enablement |
| S10 | Incomplete incident readiness | Drills; named roles; runbooks |
| S11 | Regulator-readiness gaps (registration, DPO) | Early engagement with ECA; checklist |
| S12 | Using UN/host branding or content without permission | Written permissions; unofficial label |

## 14. What needs a lawyer vs what we can decide
| Needs qualified legal advice | We can decide (engineering/product) |
|---|---|
| "Collected locally" scope for visitors and telemetry; transfer basis for push/email providers | Guest-first, device-first design; data minimisation |
| Controller/processor allocation and contracts; DPO appointment; registration with ECA | Technical retention automation; deletion/export flows |
| Applicability of Proclamation 1185/2020 and Computer Crime obligations (log retention, lawful requests) | Moderation workflow, report button, takedown SLA |
| Age thresholds and parental consent | No-minor-profiling rule; no accounts for minors by default |
| IP ownership, volunteer agreements, PPR | Security controls, testing plan |
| Use of UN/UNFCCC branding and content; endorsement statements | Source-labelling and link-out rules |
| Terms of use, liability limits, indemnities | UX of notices |
| Government procurement rules, INSA requirements | Audit-readiness documentation |

## 15. Open questions
1. Operational status of the supervisory authority (registration portal, forms, timelines). 2. Does INSA require registration/audit for this class of application, and when? 3. Which hosting provider can meet security/compliance requirements (S5)? 4. Who will be DPO and security lead? 5. Which push/email providers are acceptable? 6. Will the host require a particular identity provider or government PKI? 7. Are there procurement or security standards for government-owned apps?

## 16. Proposed decisions
- **D21:** adopt the privacy-by-design commitments in §2 (guest-first; device-first; no role registry; on-device location; no ad/tracking SDKs; self-hosted aggregate analytics; click-to-load embeds; minors protections).
- **D22:** adopt the security baseline in §7 (ASVS L2 web/API, MASVS L1 + selected L2 mobile, SDLC controls, signed manifests, dual-approved alerts, independent pentests before pilot and event, INSA audit-readiness, vulnerability disclosure policy, 72-hour incident process).
- **D23:** adopt the governance structure and document pack in §11, with the release-gate compliance table in §12, and engage legal counsel for the items in §14 before the pilot.
