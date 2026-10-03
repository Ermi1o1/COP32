# S5 — Hosting in Ethiopia — desk research + outreach pack
**Basis: public web sources read on 2026-10-03 by Claude Code. No provider was contacted, no price obtained, nothing deployed, no latency measured. Provider claims below are press/vendor statements, not verified.** This spike *requires the founder (or BA) to contact providers*; the questionnaire and note below are ready to send. No responses are simulated.

## Why it matters (legal driver — verify with counsel)
Secondary sources summarising **Proclamation No. 1321/2024** (in force from 24 July 2024) report a requirement that locally collected personal data be stored on servers in Ethiopia, and that cross-border transfer of *sensitive* personal data needs prior authority authorisation (see Digital Policy Alert and law-firm summaries). Exact scope, thresholds and implementing directives were **not verified against the Proclamation text** here — this remains the open item R5 / Phase 13.

## Public information found
| Provider | What public sources say (date of source varies) | Gaps |
|---|---|---|
| **Raxio Data Centre (ET1)**, ICT Park, Addis | Privately owned, carrier-neutral colocation; **Uptime Institute Tier III (design) certification reported 21 Oct 2022**; ~800 racks / 3 MW design capacity | Tier III *constructed facility/operations* certification not confirmed; managed services? pricing? SLA? |
| **Wingu.Africa**, Ethio ICT Park, Addis | Data centre inaugurated June 2023 (per DCD); "built to Tier III standards"; carrier- and cloud-neutral; 10 MW / 800 racks at full build; hosts Ethiopia's first IXP (per press) | Actual certification, cloud products, price, current capacity |
| **Ethio Telecom** (Telecloud) | Tier III-*ready* modular data centre (Gola Sefer, Huawei, 2021 press); Telecloud listed in Cloud Security Alliance STAR registry (certification based on ISO/IEC 27001 + CCM per the registry entry) | Level of STAR assurance; services/SLA/price; independence from the state operator for a possibly sensitive project |
| **Safaricom Ethiopia** | Prefab Tier III data centre reported (2022); cloud services marketed with data-residency compliance; further $60 M Tier III telco-cloud data centre planned (press) | Current operational status of services, enterprise onboarding |
| **WebSprix** | Private ISP; VPS hosting; "sovereign cloud" OpenStack clusters (vendor claim); minority investor in Wingu Ethiopia | Certifications, DR, capacity |

## Questionnaire (send as-is; adapt to provider)
Certifications (Uptime Tier level and whether *constructed facility*/*operational sustainability*; ISO 27001 scope; other) · SLA and uptime history for the last 24 months · services (VMs, containers/managed Kubernetes, object storage, managed PostgreSQL, backups, snapshots) · network capacity, international transit providers, peering/IXP, CDN peering · DDoS protection · pricing list and billing currency (ETB/USD), payment terms · second-site / DR options · data-protection compliance posture under Proclamation 1321/2024 and the lawful-access (subpoena) process · support hours and escalation · onboarding lead time · government/restricted-sector clauses or content restrictions · ability to reserve capacity for Oct 2027 · customer audit rights · encryption options and key custody · accessibility of the control plane from outside Ethiopia · export of data/exit terms.

## Outreach note (draft for founder to adapt; unofficial status stated up front)
> Subject: Hosting enquiry — civic information app for a major 2027 international event (Zega Tech PLC)
> Dear [Name], we are Zega Tech, an independent Ethiopian technology company preparing a pilot public-information application for visitors and residents around COP32. This is **not** an official COP32, UNFCCC or government product. We are evaluating Ethiopian hosting for the personal-data part of the system (small: accounts, saved items; the public content is static). Could you share the information in the attached questionnaire, indicative pricing for a small production + disaster-recovery footprint from mid-2027, and the best contact for a short call? We can sign an NDA. Thank you, [Founder], [phone].
(Verify the company name/registration status before sending; do not imply endorsement.)

## Provisional conclusion
None possible. Candidates exist (Raxio, Wingu.Africa, Ethio Telecom, Safaricom, WebSprix); selecting one needs the written answers, quotes and a test deployment.

## Not yet done — needs founder/providers
Contact all providers; collect written answers and quotes; deploy a minimal API + Postgres + object storage; measure latency from Addis and abroad through a CDN; backup-restore and failover test; legal confirmation of the localisation scope.
