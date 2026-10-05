# Lemlem · COP32 — clickable prototype (sample data)

> **PROTOTYPE — sample data, not an official COP32 product.** Independent, unofficial concept (D1, D3). All content is synthetic; Amharic text is machine-drafted and **not reviewed by a native speaker**. This is not the production app and does not depend on the mobile-framework decision (S1).

## Visual design (Track D v2, D53)
"Highland Mist": misty teal tint, lime for the one primary action, grouped inset lists, large collapsing titles, translucent bars, true dark mode (Apple HIG principles). Light mode is the default; turn on Dark mode from the profile button → Preferences, or choose Light / Dark / Match phone in Settings. Fonts: Atkinson Hyperlegible Next (Latin, 34 KB) + Noto Sans Ethiopic (bundled). Icons: Lucide subset (`icons.js`, ISC). Avatars: faceless illustrated SVG. The ☰ menu is now the **profile button** next to the language switch; it opens Profile & Settings (`#/menu`) with Learn, Library, Archive, Help and About. See `docs/design/design-system.md` and `docs/design/redesign-plan.md`.

## Install as an app (PWA)
The prototype is a Progressive Web App (D55): `manifest.webmanifest`, icons in `icons/`, and a service worker (`sw.js`) that precaches the app shell so it opens and works offline after the first visit.
- **Android / Chrome:** an "Install the app" card appears on Today and in Profile & Settings; or use the browser menu → *Install app*.
- **iPhone / Safari:** Share → *Add to Home Screen* (the card shows this hint on iOS).
- **Releasing a change:** run `python3 release.py X.Y.Z` (never hand-edit versions). It updates `sw.js`, the `?v=` URLs in `index.html` and the About row together; `python3 release.py --check` runs in CI before every deploy. The service worker is network-first, so online users get the new deploy on their next open; the cache is only used offline. Photos are cached on first view.
- The service worker only runs over HTTPS (GitHub Pages) or `localhost`.

## Photos (D57)
Card and header photos in `img/` are openly licensed (CC BY, CC BY-SA, CC0) from Wikimedia Commons via Openverse, cropped and resized. Credits: in-app at *Profile & Settings → Photo credits* (`#/menu/credits`), data in `credits.js`. They show real places and generic events, not COP32, and are never tied to invented people. Data saver switches back to illustrations.

## Personas and images
Cards and detail pages use original illustrated personas (`people.js`, D56): 20 invented speakers plus 13 invented roles (traveller, coffee-ceremony host, chef, driver, guide, nurse, officer, volunteer, journalist, reporter, delegate, student, banker), each in a themed scene. All are fictional; there are no photos and no real people.

## What it shows
- The approved IA (D16 v2): 5 tabs — Today (Home), Programme, Map, Visit, Updates — plus header actions: alerts, language switch, and the profile button (Profile & Settings with Learn, Library, Archive, Help, About). Search sits on Today and in Programme/Updates.
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
`python3 build.py` regenerates `tokens.css` (from the design tokens) and `data.js` (sample data from `spikes/data/sample.json`, with fictional titles, people and places layered on top). Regenerate tokens first with `python3 docs/design/build_tokens.py` (run inside `docs/design`).

## Share a link (free)
The repository includes `.github/workflows/pages.yml`. **You (the repo owner) must enable it yourself:** GitHub → Settings → Pages → Source: *GitHub Actions*; the workflow runs when `prototype/` changes on `main` (or via *Run workflow*). This session cannot change repository settings. Alternative: drag the `prototype` folder to any static host.

## Not done / needs real validation
Real users, real devices, screen-reader testing, native-speaker Amharic, real COP32 content (none officially exists), full accessibility audit of this build. Done so far: computed token contrast (64 pairs, all AA), automated axe-core WCAG 2.2 A/AA scan of 16 screens × light/dark (0 violations), 200% reflow check, and all 12 tree-test tasks resolving in app mode.
