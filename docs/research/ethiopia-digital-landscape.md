# Ethiopian digital landscape (researched 2026-10-01)
Purpose: sizing constraints for the product. Sources differ in date and method; conflicts flagged.

| Metric | Value | Source / date | Reliability |
|---|---|---|---|
| Population | 128.1M; 76.6% rural; median age 18.9 | DataReportal Digital 2024 (Jan 2024) | Medium (modelled) |
| Internet users | 24.83M; 19.4% penetration; 80.6% offline | DataReportal (Jan 2024) | Medium |
| Cellular connections | 77.39M (60.4% of pop.) | DataReportal (Jan 2024) | Medium |
| Social media users | 7.05M (5.5%) | DataReportal (Jan 2024) | Medium (ad-reach based) |
| Mobile phone ownership (adults) | 95% urban, 72% rural | GSMA State of Mobile Internet Connectivity 2026 (Sep 2026), via Blackpixel | Medium-High (via secondary) |
| Mobile internet use (adults) | 48% urban, 19% rural; daily use 29% / 7% | same | Medium-High |
| Internet-enabled phone ownership | 61% urban, 30% rural (per Blackpixel) | same | **Conflict** with "15% smartphone ownership" cited by a 2020s local blog (Bloom) — different base/date; treat as range, verify |
| Usage gap | ~100M people within coverage but offline | GSMA 2026 via Blackpixel | Medium-High |
| Awareness gap | Only 66% know mobile internet exists | same | Medium |
| Barriers | Handset cost (52% urban/41% rural non-users); data cost secondary (11%/4%); literacy affects ~28% rural non-users | same | Medium |
| Social/messaging habits | 89% (of users) use social media; Telegram widely used (claim from Blackpixel) | Blackpixel analysis of GSMA | Low-Medium |

## Implications (D, hypotheses)
1. **Two different audiences with opposite constraints:** the *global/remote* audience is well connected; *Ethiopian* citizens are mostly offline or on low-end Android phones with limited data.
2. A native-app-only strategy would miss most Ethiopians. Web-first/PWA, small payloads, offline caching, Amharic, audio/icon-led UI, and channels people already use (Telegram, SMS/USSD fallback, WhatsApp/Facebook pages) deserve evaluation in Phases 8, 11, 14. (USSD/SMS = idea only; feasibility with Ethio Telecom unknown.)
3. The Ethiopian reach may also depend on the telecom (Ethio Telecom is on the Digital Task Force) — e.g., zero-rated or discounted data for the official app, a bargaining chip for a government partnership.
4. Success metrics must not rely on Ethiopian smartphone user counts; use reach across channels.
5. iOS share in Ethiopia likely small (assumption, verify) — supports Android + web before iOS native, subject to delegate/international users who skew iOS.

## Gaps
Current (2025/26) Android/iOS share, Android version distribution, median device RAM, 3G/4G coverage near venue, Ethio Telecom/Safaricom data prices, Amharic keyboard/font support, Telegram usage statistics (primary), literacy rates.
