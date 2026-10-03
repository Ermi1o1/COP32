# ADR-005 — CMS: Payload leading; Strapi not recommended; none locked
Status: **Provisional** · Date: 2026-10-03 · Decision log: D50 · Evidence basis: sandbox/desk, **not** real devices or providers

## Context
Which self-hosted open-source CMS fits bilingual editorial, approvals and emergency publishing with a licence compatible with government handover (S2)?

## Options considered
- Payload (MIT)
- Strapi (MIT community + Enterprise-licensed `ee/`)
- Directus (MSCL-1.0-GPL)
- Custom admin (not evaluated)

## Evidence
Source: `docs/architecture/spike-results/S2-cms.md`.
Licence texts read from upstream repositories; vendor tier pages read 2026-10-03. Strapi lists Review Workflows and Audit Logs as Enterprise-only; Payload is MIT with versions, drafts, scheduled publishing and localisation documented, SSO listed as enterprise; Directus is under a licence that permits any non-competing use and converts to GPL-3.0 after four years. No candidate was installed, so capabilities are documented, not verified.

## Decision
Lean Payload, **provisional and desk-only**: confirm by building the data model and estimating audit/approval work; Directus second pending legal advice on 'Competing Use'; Strapi not recommended unless an enterprise agreement is acceptable.

## Consequences
- Audit log, approval workflow and SSO may be custom work on Payload.
- Licence and pricing statements must be re-verified before any commitment.

## Revisit when
Real-device or real-provider results for the spike arrive, or the assumptions above change.
