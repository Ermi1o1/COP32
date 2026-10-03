# COP32 Prototype — Visual Redesign (Stage 2, Track D v2)
### Screen-by-screen rebuild: real visual design, graphics, icons, type, color — on top of the existing, already-validated design system

**How to use this file:** paste this whole document as your next message in Claude Code, on the `COP32` repo (`main` branch), ideally after `/clear` + `/rename` (e.g. "COP32 — Track D visual redesign"). It assumes `docs/design/design-system.md`, `docs/design/tokens.json`, `docs/design/component-inventory.md`, and the existing `/prototype` are already in the repo (they are — Track D v1 and the rest of Phase 21 are done).

**What this is:** a visual-fidelity upgrade of the clickable prototype so it looks and feels like a real, designed product — not a new IA, not new features, not the native app build. The prototype's job is still the same: something tangible to click through and show people. It just needs to look like it was designed on purpose.

---

## 0. Non-negotiable constraints (read first)

- This is still an **unofficial, complementary** platform (D1). A more polished prototype makes it *easier*, not harder, to mistake for something official — so keep a visible "PROTOTYPE — sample data, not an official COP32 product" mark somewhere sensible in the UI (footer, settings screen, or a persistent small badge — your call on placement, but it must not be easy to miss or easy to crop out of a screenshot).
- **Never use real COP32, UNFCCC, Ethiopian-government branding, logos, real official names/titles, or real photos of real people** (officials, speakers, attendees) anywhere in the redesign. All sample content — session titles, speaker names, bios, POI descriptions, news items — must read as plausible but clearly invented.
- **Sample personas (speakers, delegates, quoted attendees, etc.) should use illustrated/graphic avatars, not photoreal stock photography of real strangers** — simpler licensing, more consistent visually, avoids any "is this a real person" ambiguity. If an image-generation tool is available in this session, generate original illustrated-style avatars; if not, build consistent SVG/CSS-drawn avatars (initials + shape + color from the design tokens works well and stays lightweight). Do not source photos from the open web.
- Keep the prototype a **lightweight static site** — it's viewed on phones, often on Ethiopian mobile data. Avoid large image files; prefer SVG/CSS for graphics and icons over bitmap images where possible; compress anything raster.
- Don't change the validated IA (5 tabs: Home, Programme, Map, Visit, Updates + header menu — D16 v2) or the tree-test task paths from the heuristic walkthrough (Track A). This pass is visual/interaction polish, not structural.
- Load the `frontend-design` skill before making any aesthetic decisions, and the `canvas-design` skill if you end up producing original illustrations/graphics rather than relying on an icon library alone.

---

## Step 1 — Pick a visual direction (don't skip this)

Before touching all the screens, propose **2–3 distinct visual directions** using just the Home screen (EN) as the test case for each. Each direction should vary meaningfully — not just swap one accent color — across:
- Color system (primary/secondary/accent, light + dark mode)
- Typography pairing (headline vs. body, weight scale) — must keep the bundled Ethiopic-capable font family for Amharic text (D11); the Latin pairing can change
- Visual tone (e.g., "warm/editorial," "clean/institutional," "vibrant/youthful") — pick names that fit, don't just use mine
- Iconography style (outline vs. filled, one open-source icon library used consistently — propose which one)
- Imagery/avatar treatment for the sample personas

Render all 2–3 as actual working HTML (not just a description) so they can be opened and compared side by side. **Stop here and show these before building anything further** — this is the one checkpoint worth pausing for, since every other screen will follow whichever direction gets picked.

Once a direction is chosen, write it up as an extension of `docs/design/design-system.md` (new/updated tokens into `docs/design/tokens.json`) rather than a separate parallel system — this is the single source of truth both the prototype and (eventually) the real apps should pull from.

---

## Step 2 — Screen inventory and batch plan

List every screen/state currently in the prototype (cross-reference `docs/design/component-inventory.md` and the existing screenshots in `docs/design/prototype-screens/`), plus any missing states worth adding now (loading, empty, error, offline — these exist structurally per Track D v1, they just need the new visual treatment too). Group them into batches of 3–4 related screens (e.g., Batch 1: Home EN/AM + Settings; Batch 2: Programme + Agenda + session detail; Batch 3: Map + Visit; Batch 4: Updates + Explainers/Glossary + search; Batch 5: states — empty/error/offline/dark mode). Write the batch plan to `docs/design/redesign-plan.md` before starting Step 3.

---

## Step 3 — Rebuild batch by batch

For each batch, in order:
1. Rebuild the screens against the chosen direction's tokens — real spacing rhythm, elevation/shadow where appropriate, consistent icon usage, polished component states (default/hover/pressed/disabled/loading), and the illustrated/SVG avatar system for any persona content.
2. Write or refresh the sample content for that batch so it reads like real content, not placeholder text — specific (fake) session titles, speaker names/roles/one-line bios, POI names/descriptions, etc. Keep it clearly fictional per the constraints above.
3. Take a screenshot of each rebuilt screen (same convention as the existing `docs/design/prototype-screens/`) and save it, replacing the old plain version.
4. Report progress briefly (which batch, what changed) and move to the next batch — don't wait for approval between every batch, but do flag anything where you had to make a judgment call that affects later batches (e.g., a new component pattern).

---

## Step 4 — Final polish pass

After all batches:
- Check consistency across every screen (shared header/nav/footer, consistent spacing, no leftover v1 styling anywhere)
- Add light micro-interactions where they help (transitions, tap states) — keep them simple, no animation libraries that bloat the bundle
- Re-check the accessibility commitments still hold against the new visuals: contrast ratios (WCAG 2.2 AA, D25), 200% text scaling (D27), focus states — don't let the redesign quietly break what Track C already got right
- Confirm EN/Amharic parity (every redesigned screen works in both languages, Ethiopic font renders correctly) and light/dark mode parity
- Confirm the tree-test task paths (T1–T12) still resolve to the same places, just better-looking

---

## Step 5 — Redeploy and record

- Redeploy via the existing GitHub Actions workflow (`.github/workflows/pages.yml` — same as before, no changes needed there unless the folder structure moved)
- Update `docs/roadmap/phase-status.md` noting Track D is now v2 (visual redesign complete) and link `docs/design/redesign-plan.md`
- If any real design decisions were locked in during this pass (direction chosen, icon library, avatar system), log them as new D-numbered decisions in `docs/decisions/log.md`, same convention as before
- End by stating: docs saved, what's next (showing the prototype around; S1 real-device decision still pending before any native build), and what a future session should read first
