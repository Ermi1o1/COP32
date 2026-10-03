# COP32 companion — clickable prototype (sample data)

> **PROTOTYPE — sample data, not an official COP32 product.** Independent, unofficial concept (D1, D3). All content is synthetic; Amharic text is machine-drafted and **not reviewed by a native speaker**. This is not the production app and does not depend on the mobile-framework decision (S1).

## What it shows
- The approved IA (D16 v2): 5 tabs — Home, Programme, Map, Visit, Updates — plus a header menu (Learn, Library, Archive, Settings, Help, About), search, alerts bell, language switch.
- EN / አማ switch with the bundled Ethiopic font (Noto Sans Ethiopic, OFL, subset ≈100 KB woff2). Strings without an Amharic draft fall back to **visible** English (marked "EN"), as the IA requires.
- Design tokens from `docs/design/tokens.json` (light/dark, 200% text size, reduce motion).
- Sample dataset: 50 sessions, 20 speakers, 30 POIs, 10 articles, 5 alerts, plus sample news, guides, glossary, library.
- Save sessions → My agenda → Home "Now & next"; Ge'ez-aware search (try `ዐዲስ` — it finds `አዲስ`).
- **Tree-test dry run** (`#/test`): tasks T1–T12 from `docs/ux/ia-validation-kit.md`, each as a text tree or by navigating the prototype; first click/path/success stored in your browser, downloadable as CSV. A rehearsal only — **not** the real tree test.
- UI states gallery (`#/states`): alerts, empty, error, offline/stale, TBC, loading, link-out interstitial. "Simulate offline" in Settings. Real offline sync is not implemented (see spike S7).
- Map is a **schematic placeholder**; the real MapLibre/PMTiles stack was tested separately in spike S4.

## Open locally
```
cd prototype
python3 -m http.server 8000      # then open http://localhost:8000
```
(Opening `index.html` directly also works in most browsers.) Phone: open the same address from a phone on the same Wi-Fi, e.g. `http://<computer-ip>:8000`.

## Rebuild generated files
`python3 build.py` regenerates `tokens.css` (from the design tokens) and `data.js` (sample data from `spikes/data/sample.json`).

## Share a link (free)
The repository includes `.github/workflows/pages.yml`. **You (the repo owner) must enable it yourself:** GitHub → Settings → Pages → Source: *GitHub Actions*; the workflow runs when `prototype/` changes on `main` (or via *Run workflow*). This session cannot change repository settings. Alternative: drag the `prototype` folder to any static host.

## Not done / needs real validation
Real users, real devices, screen-reader testing, native-speaker Amharic, real COP32 content (none officially exists), accessibility audit of this build (only computed colour contrast and a 200% reflow check by screenshot).
