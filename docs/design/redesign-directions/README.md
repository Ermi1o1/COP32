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
