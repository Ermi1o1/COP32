# Hands-on benchmark test plan (for the Zega Tech team; run in parallel, does not block Phase 5)
Purpose: replace desk research with first-hand evidence. Time-box: ~1 day per person. Record in a shared sheet using the template below, with screenshots.

## Who tests what
| Tester | Targets |
|---|---|
| Dev 1 (Android) | COP30 Event Platform (`com.unfccc.cop30`), COP29 apps (`com.unfccc.cop29`), UN Climate Change app, COP28 UAE app (if still listed), Expo City Dubai app |
| Dev 2 (iOS) | Same apps on iOS, Paris 2024 Official Programme, Expo 2025 Visitors, Web Summit app |
| Dev 3 (Web/QA) | Whova, Swapcard, EventMobi demo/trial sites; browser versions of COP30 platform; low-carbon COP28 site; accessibility checks |
| BA | Scoring sheet, comparison, interview notes |
| PM | Schedule, collect results, owner of follow-ups |
| Product owner | Review top findings and decide Phase 5 emphasis |
Note: some apps may be unlisted after the event or need accreditation; record "unavailable" as a finding.

## Test script (per app)
1. **Install & first run:** size (MB), time to first screen, permissions requested (list every one), account required?, language options, privacy policy language(s).
2. **Info tasks (time each, count taps):** find today's schedule; find a specific session; save it to a personal agenda; find a speaker; find venue map; find transport/accommodation info.
3. **Connectivity:** use with airplane mode after loading (what still works?); throttle to 3G or weak Wi-Fi (time to load schedule).
4. **Accessibility:** enable screen reader (TalkBack/VoiceOver) and complete task 2; font size at 200%; colour contrast; captions on any video.
5. **Language & Amharic:** switch languages; check Ge'ez rendering on 3+ real Android devices of different brands plus an iPhone (look for tofu boxes); test Amharic search.
6. **Time zones:** change device time zone; are session times shown correctly?
7. **Notifications:** opt-in flow, relevance, controls.
8. **Public/remote use:** what can a non-registered user do?
9. **Privacy:** data deletion route, tracking SDKs (use an App privacy report/Exodus-style check), mandatory login?
10. **Rate 1–5 and note one "steal" idea and one "avoid" lesson.**

## Result template
| App | Version/date | Platform/device | Install MB | Permissions | Languages | Task times/taps | Offline works? | Accessibility notes | Amharic notes | Time-zone handling | Public access | Privacy notes | Steal | Avoid |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|

## Ethics/safety
Use only public app-store builds and demo accounts; do not bypass accreditation or access gated content; do not scrape or record other users' data.
