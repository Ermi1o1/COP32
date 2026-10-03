# S2 — CMS (Payload / Strapi / Directus) — desk results
**Basis: licence texts fetched from the upstream repositories and vendor documentation/pricing pages read on 2026-10-03 by Claude Code. NO candidate was installed or run (no Docker daemon in the sandbox; time-boxed). The feature checklist below is therefore "documented", not "verified in a running instance".** Legal summary is a lay reading, **not legal advice**.

## Licences (primary text)
| CMS | Licence found | Key terms relevant to us |
|---|---|---|
| **Payload** (`payload` 3.90.2 on npm) | **MIT** (`LICENSE.md`, © 2018-2026 Payload CMS, LLC) | No usage restrictions; handover to a government is unproblematic. Vendor docs list **SSO as an Enterprise feature** (see below). |
| **Strapi** (`@strapi/strapi` 5.56.0) | **MIT Expat for the Community Edition; any code under an `ee/` directory is under the Strapi Enterprise licence** (repo `LICENSE`, `packages/core/admin/ee/LICENSE` → https://strapi.io/enterprise-terms) | Community use is MIT, but the licence says anyone with a *registered cloud account* is not covered by the MIT grant for that use; Enterprise features require a commercial agreement. Per the vendor's self-hosted pricing page (read 2026-10-03): **Review Workflows, Audit Logs and full SSO are Enterprise-only; Content History is Growth+ (14-day retention); RBAC, Draft & Publish and i18n are free.** |
| **Directus** (`directus` 12.4.1) | **Monospace Sustainable Core License 1.0 (MSCL-1.0-GPL)**, © 2026 Monospace Inc. — *not* the older BSL 1.1 | Permitted for any purpose **except a "Competing Use"** (making the software available to a party that competes with the licensor's commercial offerings of the software itself where the licensor charges a fee); internal use, non-commercial use and professional services to a licensee (incl. deploying/hosting for them) are expressly permitted; **must not circumvent licence-key functionality**; converts to **GPL-3.0 four years after each release**. Not a revenue threshold. A future "platform-as-a-service/white-label for other organisers" model (D34/D35) could approach "Competing Use" and needs counsel. |

## Capability checklist (documentation-based; N = Native, P = Plugin, C = Custom, X = Not found/paid, ? = not confirmed)
| Requirement | Payload | Strapi (free) | Directus |
|---|---|---|---|
| Per-locale fields / localisation | N (docs: core feature) | N (i18n free) | ? (not read this session) |
| Draft / publish | N | N | ? |
| Scheduled publish | N (docs: publishing schedule) | X on free (Releases is Growth+) | ? |
| Multi-step approval workflow | C/P (not confirmed native) | **X (Review Workflows Enterprise-only)** | ? |
| Revision history | N (versions + restore) | X on free (Content History Growth+, 14 days) | ? |
| Audit log | C/P (not confirmed) | **X (Enterprise-only)** | ? |
| Field/role-based access | N (field-level access control documented) | N (RBAC free; granularity not confirmed) | ? |
| SSO/OIDC | X (Enterprise per docs) | X (Enterprise/add-on) | ? |
| Emergency publish with reason + audit | C | C | ? |
| PostgreSQL | N (documented adapter) | N | N (widely documented) |
| Admin UI in Amharic | ? (needs translation file — check) | ? | ? |
`?` items were not read in this session; they are research gaps, not negative findings.

## Findings
1. **Licence/tier risk is concentrated in Strapi** (approval workflows and audit logs — both required by the editorial/admin design — are Enterprise-only), so under the brief's decision rule it is **disqualified unless a commercial agreement is acceptable**.
2. **Payload (MIT) is the cleanest for government handover**; its gaps (audit log, approvals, SSO) would be custom work or plugin work — not yet estimated.
3. **Directus's new licence is permissive for our own use but carries a non-compete clause** that must be reviewed by counsel before any multi-organiser or resale model.
4. Not tested: CMS performance with 5,000 records, rich-text with Ge'ez, Amharic admin UI, backup/restore, webhooks, CSV import, OIDC.

## Provisional conclusion
No CMS selected. **Lean: Payload**, subject to a hands-on build of the data model (Event/Session/Person/Place/GuideArticle/Alert/LinkOut) and gap estimation for audit/approval; Directus is the second candidate pending licence counsel; Strapi is not recommended on tier grounds.

## Not yet tested
Running instances of all three; model build with EN/AM sample content; approval/emergency-publish flows; OIDC/SSO test; upgrade path; legal review of licences (incl. MSCL "Competing Use"); verifying vendor pricing/tier statements again before any decision (pricing pages change).
