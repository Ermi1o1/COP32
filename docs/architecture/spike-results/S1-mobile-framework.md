# S1 — Mobile framework: Flutter vs React Native — sandbox results
**Basis: sandbox desk research + small proofs-of-concept on synthetic data, run 2026-10-03 by Claude Code. NOT the real-device test matrix in `spike-briefs.md`. No Android/iOS device, emulator or Android SDK was available.**

## What was actually executed
| Item | Detail |
|---|---|
| Environment | Linux container, 4 vCPU, 15 GB RAM, headless Chromium (Playwright, `--use-gl=swiftshader`), no GPU |
| Flutter | 3.47.6 stable / Dart 3.13.5, **web (CanvasKit) release build** only: `flutter build web --release --no-web-resources-cdn`. Source `spikes/s1-flutter/` |
| React Native | `react-native-web` 0.x + React 18 bundled with esbuild (production, minified). **This is the React Native *web renderer*, not a native RN/Expo build** — Metro, Hermes and native views were not exercised. Source `spikes/s1-rn-web/` |
| Screen implemented (both) | Schedule list from the 50-session synthetic JSON, EN/AM toggle, "open to public" filter, 200% text-scale toggle, the spike brief's Amharic test string set (common phrases, Ge'ez numerals/punctuation, mixed script), bold + regular weights |
| Font (D11) | Noto Sans Ethiopic (variable, OFL-1.1, 1.1 MB; licence copy in `spikes/fonts/OFL.txt`) bundled in both |
| Not built | Local database/offline bundle, MapLibre screen, pull-to-refresh, sticky headers (out of reach without native builds; see below) |

Screenshots: `spike-results/s1-screens/` — `flutter-am-100.png`, `flutter-am-200.png`, `flutter-en.png`, `rn-am-100.png`, `rn-am-200.png`, `rn-en.png`, `rn-nofont-baseline.png`.

## Results
### Ge'ez rendering (bundled font)
- **Both** frameworks rendered every string in the test set correctly with the bundled font at 100% and 200% scale, regular and bold: no tofu in the Ethiopic text, correct conjuncts/vowel orders, Ge'ez numerals (፩ ፪ ፫ ፲ ፻) and punctuation (። ፣ ፤ ፦), mixed Latin/Ethiopic lines, and the homophone-variant titles (ሃ/ኃ, ሰ/ሠ, አ/ዐ, ጸ/ፀ).
- **Finding F1 (Flutter, important):** the "✓" (U+2713) I used as an "open to public" marker is **not** in Noto Sans Ethiopic and rendered as a **tofu box in Flutter**. React Native Web rendered it because the browser silently used a system fallback font. Flutter web instead tried to download fallback fonts at runtime from `fonts.gstatic.com` (Noto Sans Symbols 2) — which failed here (proxy/CA) and would also (a) fail offline, (b) send a request to Google on the user's device, relevant to the D21 privacy-by-design stance. **Implication:** whichever framework wins, every glyph the UI can show (icons, symbols, ✓, arrows, Latin/digits) must come from bundled assets; do not depend on platform/fallback fonts.
- Control check: with **no** bundled font, React Native Web *still* showed Ethiopic text in Chromium (`rn-nofont-baseline.png`) because this Chromium resolved a system fallback. The sandbox therefore **cannot reproduce** the Android-OEM tofu risk that motivated D11; it neither confirms nor refutes it. That risk is only testable on real low-end Android devices (A1/A2).
- At 200% text scale the Flutter header title wrapped one glyph per line because my PoC header row did not reserve space; the RN PoC header did not scale. This is a PoC layout artifact on both sides, **not** a framework result. 200% scale behaviour should be re-tested with the real component set.

### Size / start-up / memory (web builds only — not comparable to native APK/IPA)
| Metric | React Native Web | Flutter web (CanvasKit) |
|---|---|---|
| App JS | 397 kB min (≈99 kB gzip) | `main.dart.js` 1.99 MB (≈592 kB gzip) |
| Engine/runtime | included above | `canvaskit.wasm` (chromium variant) 5.4 MB (≈2.07 MB gzip) |
| Bundled font | 1.14 MB (≈544 kB gzip) | same |
| Total bytes fetched, cold load (uncompressed server) | ≈1.55 MB | ≈8.9 MB |
| Shell ready, median of 5 (headless, no throttling) | ≈170 ms | ≈690 ms (`flt-glass-pane` attached) |
| JS heap after load | ≈6 MB | ≈51 MB |
Caveats: single machine, no network throttling, python `http.server` without compression, software GL, different readiness signals for the two apps. Use only as a rough order-of-magnitude indication that Flutter web ships a much heavier runtime for a web app than React Native Web — relevant to a *web* deliverable on 3G, **not** to native app size.

### Developer ergonomics (observed)
- Flutter: SDK download ≈1.5 GB / 2.2 GB unpacked; first build 30 s; one-line flag required to stop the CDN fetch of CanvasKit (`--no-web-resources-cdn`); the `git safe.directory` setup is an environment quirk. Single language/toolchain; tree-shakes icon fonts automatically.
- React Native Web: dependencies installed in seconds; bundle in 0.12 s with esbuild; reused ordinary web tooling. (Metro/Expo flows not exercised.)

### Web-code-sharing notes (desk reasoning, not tested)
React Native Web shares components with a React web app; Flutter web shares Dart code across all three targets but ships a canvas-rendered web app (text is not selectable/indexable DOM by default and accessibility depends on Flutter's semantics layer). Plan D9 requires a *web app* as a first-class deliverable, which makes this a real trade-off to evaluate with real tests.

## Provisional conclusion (sandbox evidence only)
1. **No framework is disqualified on Ge'ez rendering** — both render correctly *when the font is bundled* (consistent with D11).
2. The evidence that actually differentiates them here is the **web footprint** (RN Web far lighter) and the **fallback-font behaviour** (Flutter requires bundling every glyph, otherwise tofu + network calls). Neither is a decision by itself.
3. The decision rule in the brief (fail any option with an unresolved Amharic defect *on a target device*) **cannot be applied** without devices. **No S1 decision is made.** Track D does not depend on S1.

## Not yet tested — needs real devices/providers
- Native Android and iOS builds (RN/Expo with Hermes; Flutter AOT) — APK/AAB/IPA size, cold start, jank, peak RAM on A1/A2.
- Real Ge'ez rendering on low-end Android OEM font stacks (A1–A5) and iPhones (I1–I4); Huawei (HMS) device.
- TalkBack / VoiceOver with Amharic text (focus order, pronunciation, large text).
- Offline local database, mock-manifest sync, resume, local search, MapLibre offline map with Ge'ez labels.
- Push on A3/A4/A5/I1 (see S6), real network throttling, battery.
- Maturity/upgrade-path comparison for the libraries we need (maps, DB, sync) beyond documentation.
