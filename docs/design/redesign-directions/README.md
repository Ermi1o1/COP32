# Track D v2 — Step 1: visual directions (checkpoint)
Working mockups: `prototype/directions/index.html` (side by side), plus `a-…`, `b-…`, `c-…` pages (each has a Light/Dark toggle). Generator: `prototype/directions/_build.py`; contrast check: `_contrast.py`. Screenshots (full-page, so the fixed tab bar appears mid-page): this folder.

| | A · Savanna Editorial | B · Civic Clear | C · Bright Voices |
|---|---|---|---|
| Tone | Warm, editorial, human | Clean, institutional, trustworthy | Vibrant, youthful, playful |
| Colour | Forest green + ochre/terracotta on cream | Navy/cobalt + sky on cool grey | Violet + sunflower + coral on warm white, hard outlines |
| Type (Latin) | Fraunces (headings) + Inter Tight | Plus Jakarta Sans | Bricolage Grotesque + Source Serif 4 |
| Icons | Lucide outline 1.75px, tinted circles | Phosphor filled, rounded squares | Lucide bold 2.5px, solid colour chips |
| Avatars | Organic blob + initials (SVG) | Rounded square + initials (SVG) | Flat faceless bust illustrations (SVG) |
| Amharic | Noto Sans Ethiopic bundled (D11) in all three | same | same |

Checks so far: all text/background pairs ≥ 4.5:1 in light and dark for all three (`_contrast.py`). Fonts are self-hosted OFL variable woff2 (≈36–51 KB each; Latin only). Not yet done: Amharic body-text rendering test per direction, 200% text-scale check — these happen after a direction is chosen. No real photos, logos or official names are used; all people are invented.
Note: the `frontend-design` / `canvas-design` skills named in the prompt are not installed in this session; design decisions here were made directly.

## Revision 2 (2026-10-03) — light, minimal, user-friendly
Founder feedback: design must be **light, minimal and user friendly**; review must work on a phone. The three directions were redone as light/minimal variants and published as a private mobile review page with Approve / Approve with edits / Reject + notes per direction (decisions are stored with the page and read back by Claude):
- Review page: https://claude.ai/artifact/3Hsz2HTHPEDUufGY86SPJx (source copy: `review.html`)
- A · Highland Calm — off-white, deep green, Figtree, thin Lucide icons, list shortcuts, circle initials avatars
- B · Clear Sky — white, calm blue, Public Sans, Lucide on pale-blue squares, 2×2 soft tiles, rounded-square avatars
- C · Fresh Air — white, teal + coral touch, Atkinson Hyperlegible, larger text, full-width button shortcuts, faceless illustrated avatars
The earlier v1 mockups in `prototype/directions/` are superseded by these.

## Round 2 (2026-10-03) — two finals, lime/teal palette
Founder asked to match the lime green of https://cic-26.com/ and a reference "COP32 Ethiopia" key-visual image (misty teal Africa/acacia scene, sunset-orange/navy/sky logo), and to reflect COP32 + Ethiopian themes. Sampled colours: cic-26 logo lime ≈ #62C200 → #307000; image mist #75A194, deep teal #1B4752, sand #EBD9B3, sunset #F7971F, ocean #2795AE.
- **Final 1 · Green Legacy** — white, lime #62C200 fills with dark ink text, leaf green #2F6B0E for text/icons, sun yellow #F5B21B; Figtree; 2×2 tiles; initials avatars; SVG highland hills + sun.
- **Final 2 · Highland Mist** — mist #F7FAF8, deep teal #155E63 hero, lime #9BE15D buttons with dark ink, sunset orange accent; Atkinson Hyperlegible; list shortcuts; faceless illustrated avatars; SVG misty hills + acacia.
Contrast (computed): ink on lime 7.05:1, leaf green on white 6.50:1, white on teal 7.46:1, lime on deep teal 7.34:1 — all AA. Lime is never used as text on white (it fails AA).
Constraint kept: colours only. The reference image's logo, wordmark and tagline are **not** copied (D1 unofficial positioning). Same review page/URL, version 2.
