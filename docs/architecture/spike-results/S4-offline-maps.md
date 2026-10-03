# S4 — Offline maps — sandbox results
**Basis: real OSM data processed in the sandbox on 2026-10-03 by Claude Code; rendered in headless desktop Chromium (software GL). NOT tested on any phone; NOT field-checked.**

## What was executed (`spikes/s4-maps/`)
1. **Source data:** Ethiopia OSM extract (`download.openstreetmap.fr`, 154 MB, dated 2026-10-03). Geofabrik and Overpass were not reachable from the sandbox.
2. **Tile build:** Planetiler 0.9.1 (OpenMapTiles schema, Java, 10 GB heap) → **`addis.pmtiles`** for bbox 38.62–38.92 E, 8.88–9.14 N (central Addis), zoom 0–15. Build time ≈ 64 s including Natural Earth download. Tiles are © OpenMapTiles / © OpenStreetMap contributors (attribution displayed in the map; ODbL/CC-BY obligations apply).
3. **Ge'ez glyphs:** MapLibre needs SDF glyph PBFs; stock OpenMapTiles fonts do not cover Ethiopic. I generated them from the bundled Noto Sans Ethiopic with `fontnik` (ranges U+0000–00FF, U+1200–13FF, U+2D80, U+AB00): **≈346 kB for all five, ≈278 kB for the three needed**.
4. **Render:** MapLibre GL JS 5 + PMTiles JS protocol, HTTP `Range` requests to a static server, label expression `coalesce(name:am, name)` for Amharic mode and `coalesce(name:en, name)` for English, plus the 30 synthetic POIs as a GeoJSON layer. Screenshots: `spike-results/s4-screens/map-am-z14.8.png`, `map-en-z14.8.png`.

## Results
| Question | Result |
|---|---|
| Does MapLibre render Ge'ez labels correctly with self-generated glyphs? | **Yes** in headless desktop Chromium: place, road and POI labels in Ethiopic script render legibly, with Latin fallback for features lacking an Amharic name (mixed script on one map). |
| Tile package size (central Addis bbox, PMTiles) | z0–15 **8.7 MB**. By zoom (uncompressed-by-PMTiles, gzip'd tiles): z0–13 ≈ **2.0 MB** cumulative; z14 ≈ 3.0 MB; z15 ≈ 3.7 MB. So z0–14 ≈ **5 MB**, z0–13 ≈ **2 MB**. Plus glyphs ≈ 0.28 MB. |
| Amharic label coverage in OSM (counted from z14 tiles; counts include some tile-edge duplicates, so approximate) | ≈ **73 %** of place/POI/road features have a `name`; only ≈ **18 %** (≈4.6 k of 25 k) have `name:am`. Amharic maps will often show Latin/English labels unless OSM is improved. |
| POI completeness vs a recalled list of 17 well-known places (airport, Black Lion hospital, Hilton, Sheraton, Skylight, AU, Meskel Sq., National Museum, Unity Park, Entoto, Merkato, Lideta, Piassa, AAU, LRT, Edna Mall, Millennium Hall) | **All 17 have a name match** in z14 tiles. This is a **name-presence check against my recollection, not a field-checked audit**: positions, opening hours, accessibility attributes, closures were not verified. |
| POI counts (z14, approximate) | ~1.2 k lodging features (877 hotels, 331 guest houses), ~540 hospital/clinic features, 87 railway stations, 16 subway entrances. |
| Not extracted/checked | Embassies (OpenMapTiles `poi` layer did not classify them in this build; check with a custom profile), accessibility tags, light-rail line geometry. |

## Findings
- **Self-hosted static tiles are viable and cheap:** one file, no tile server, `Range` requests only (works on any static host/CDN that supports ranges).
- **Glyph generation is a hidden dependency** not in the original brief: Ge'ez labels require our own SDF glyph pack; budget ≈ 0.3 MB and a build step.
- **Name quality is the real constraint** (≈ 18 % Amharic names): plan to improve OSM, or to curate Amharic names for the ~100–300 POIs that matter to COP32 users in our own POI layer (which already has a bilingual model).
- OpenMapTiles output imposes attribution; Planetiler/OSM/ODbL licences need legal summary before production (not done).
- Venue-level (indoor/zone) maps are not in OSM at the needed detail and are a separate content task (host-provided plan, D-open).

## Provisional conclusion
**Self-hosted PMTiles + MapLibre + our own Ethiopic glyph pack** is feasible and small enough for an offline "Tier A" city package (≈ 2–5 MB depending on max zoom). Provisional — blocked on device smoothness checks.

## Not yet tested — needs real devices / field work
- Pan/zoom smoothness, time to first render, memory on A1/A2 and iPhones; MapLibre Native (Android/iOS) vs the web build used here; offline operation from the native cache.
- POI clustering performance at 500 points; label collision behaviour at 200 % system font scale.
- Field-checked completeness audit (50 places on the ground); correctness of Amharic names (native-speaker review).
- Embassy, light-rail and accessibility data extraction; legal review of attribution/licence for a government-adopted product.
- Hosting the 5–9 MB tile file on a CDN/Ethiopian host with `Range` support (S5).
