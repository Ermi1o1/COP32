# Do event apps live on after the event? Precedents (researched 2026-10-01)

## Findings
| Event / app | What happened | Source quality |
|---|---|---|
| Expo 2020 Dubai official app | Retired: removed from Google Play 15 Aug 2025 with message that the site is closed so the app is no longer needed. Successor **Expo City Dubai app** serves the repurposed site. Legacy was via a *new* app for the *new* use of the venue, not the old app. | Medium (app-store aggregators/search summaries) |
| Qatar World Cup 2022 **Hayya** platform | Not retired: relaunched under Qatar Tourism, processed >2M e-visa applications since the World Cup, ~60k/month, reported 2.7M app users. Survived because it became a **national visitor/visa/tourism platform** with a government owner. | Medium (Qatar Tribune, state-adjacent; figures are government-reported) |
| Paris 2024 | "Paris je t'aime" tourism app continues after the Games — but it is the city tourism office's app, not a Games-specific one. | Low-Medium |
| COP28 UNFCCC "UN Climate Change" app | Unknown whether/how it continued year-round; COP28 UAE host app fate not found. COP30 platform described as per-COP. | Unverified |
| General event-tech stats | A vendor blog claims ~20% of attendees return next year; automated follow-up can raise this — **vendor claims, low reliability.** | Low |

## Analysis (Claude)
- Pattern: **event-specific apps usually die; apps that survive are re-scoped to a durable purpose and have a permanent owner/budget** (tourism, visas, venue operations).
- Why COP32 could justify a life after the event (hypotheses, not facts):
  1. **Government value:** legacy asset for Ethiopia/Addis as a climate-diplomacy and conference hub (AU and UNECA are headquartered in Addis — verify event pipeline).
  2. **Funding logic:** grants/donors favour reusable digital public goods over one-off event apps; a multi-event platform is easier to justify than a 2-week app.
  3. **Content value:** outcomes, commitments, recordings and proceedings have a long tail (follow-up on pledges, COP33+ handover).
  4. **Reuse:** white-label for later COPs (African Group hosting handovers), AU/other summits; turns a cost into a product line for Zega Tech.
  5. **Cost sharing:** infrastructure already built (accounts, CMS, notifications) is cheap to extend.
- Counter-arguments: ongoing hosting/moderation/support cost; engagement collapses after the event; risk of scope creep before MVP; government may not fund maintenance.
- Suggested design principle (NOT yet a decision): build an **event-agnostic core (multi-event, multi-tenant content model)** with COP32 as the first event, so post-event reuse is cheap. Decide in Phase 2/8/11.

## Gaps
- No primary-source data on post-event usage of UNFCCC/COP apps; COP29 and Olympic/World Cup app retention numbers not found.
