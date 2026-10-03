# S6 — Push notifications — desk results
**Basis: vendor/third-party documentation read on 2026-10-03. No FCM/APNs/HMS project credentials were available; no message was sent to any device. Nothing about delivery rate or latency was measured.**

## Documented facts (sources: Android developer docs, Firebase docs, push-vendor guides)
- **FCM** is optimised for Doze/App Standby. *Normal* priority messages may be delayed in Doze; *high* priority attempts immediate delivery and can wake the device, but on Android 9+ remains subject to **app standby buckets/quota** — high priority can still be delayed if the app has no wake quota. Use high priority sparingly (Firebase "Set and manage Android message priority"; Android "Optimize for Doze and App Standby").
- If the app is **force-stopped**, or violates background limits, FCM messages may not be delivered (Firebase docs).
- **Huawei devices without Google Mobile Services** do not support FCM; delivery needs **HMS Push Kit** (a separate SDK/credentials). A single build can include both; when both services exist FCM takes priority in the SDKs of at least some push vendors (Pushwoosh docs).
- Manufacturer battery optimisers (Xiaomi, Oppo, etc.) kill background apps beyond stock Android — widely reported, but the search results this session did not return the maintained list (dontkillmyapp.com) — **to be read and cited** before design.
- iOS: APNs only; requires user permission; silent (content-available) pushes are throttled by iOS (known; not re-verified this session).

## Design implications (reasoning, not tested)
1. Alerts must not rely on push alone: keep the **signed manifest poll** (S7) and an **in-app banner** as fallback; show "last updated" time.
2. Support **FCM + APNs + HMS** behind one internal sender interface; make HMS a feature flag until A5 testing shows need.
3. Use **topics** (language, role) rather than per-device tokens to limit personal data; tell users what passes through Google/Apple/Huawei (privacy notice, D21).
4. High priority only for genuine alerts; collapse keys for schedule changes.

## Provisional conclusion
None. The above is a requirements list for the real test, not a result.

## Not yet tested — all of S6's measurements
Delivery rate and p50/p95 latency on A1–A6 and I1–I4, foreground/background/reboot/battery-saver, Wi-Fi vs cellular in Addis, HMS on a real Huawei, deep links, silent-push-triggered sync, permission-denied behaviour, polling-fallback timing; reading and citing dontkillmyapp-style OEM restrictions; creating test projects (needs founder-owned Firebase/Apple/Huawei accounts).
