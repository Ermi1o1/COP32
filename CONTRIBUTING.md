# Contributing

Thanks for helping. This is an **independent, unofficial** COP32 companion
concept with sample data only. It is not an official COP32, UNFCCC or
government product. Keep that framing in anything you add: no official logos,
names or claims.

## Repo map (start here)

| Path | What it is |
|---|---|
| `docs/product/` | Project definition, feature catalog, MVP scoring, blueprint |
| `docs/ux/` | Information architecture (D16 v2), personas, user flows, IA validation kit |
| `docs/design/` | Design system, tokens (`tokens.json`), redesign log, prototype screens |
| `docs/architecture/` | ADR-001…006, technical architecture, data-integration strategy, spike briefs and results |
| `docs/decisions/log.md` | Every decision (D1…) with reason, alternatives and status |
| `docs/research/`, `docs/requirements/`, `docs/security/`, `docs/roadmap/`, `docs/operations/` | Supporting evidence and plans |
| `prototype/` | The clickable PWA (deployed to GitHub Pages) |
| `spikes/` | Throwaway technical experiments (S1, S3, S4, S7) |

Read the ADRs and `docs/decisions/log.md` before proposing changes that
contradict a recorded decision, or log a new decision first.

## Development

```bash
cd prototype
python3 build.py            # regenerate tokens.css + data.js from sources
python3 -m http.server 8000 # open http://localhost:8000
```

`build.py` needs `../docs/design/tokens.json` and `../spikes/data/sample.json`.
If tokens changed, run `python3 build_tokens.py` inside `docs/design/` first.

## Versioning: always use release.py

Never hand-edit version strings. The version appears in four places
(`sw.js` cache name and URL suffix, the `?v=` asset URLs in `index.html`, and
the About row in `app.js`), and they must agree or phones can keep showing an
old build.

```bash
python3 prototype/release.py            # show the current version
python3 prototype/release.py 0.7.0      # bump all four places, then verify
python3 prototype/release.py --check    # verify only (exit 1 on mismatch)
```

`--check` runs in CI: on every pull request that touches `prototype/`
(`.github/workflows/check.yml`) and before every GitHub Pages deploy
(`.github/workflows/pages.yml`), so an inconsistent tree can't ship. Bump the
version in any change that alters what users see.

## Hard rules

1. **Sample data only.** Everything in `data.js` is synthetic and fictional.
   Real Addis landmarks are allowed as public place names; real people and
   organisations are not. Photos must be openly licensed (CC0, CC BY, CC BY-SA),
   show real places or generic events (never presented as COP32), avoid logos,
   public figures and close-up portraits, and be credited in `credits.js`.
   Never put a real photo next to an invented person; speaker avatars stay
   illustrated.
2. **Amharic strings are machine-drafted and unverified.** Do not treat the
   `AM` table in `app.js` or the `*_am` fields in `data.js` as correct. A
   native-speaker review is still outstanding; the items it must cover are
   listed in `docs/ux/ia-validation-results/heuristic-walkthrough.md` §3.4.
   Until it happens, missing translations fall back to visible English. Keep it
   that way.
3. **Accessibility is a gate, not polish.** After UI changes, re-run the checks
   listed in `prototype/README.md` (token contrast, axe-core WCAG 2.2 A/AA scan,
   200% reflow) and keep 44px minimum targets.
4. **Offline-first.** The service worker is network-first with a cache fallback.
   Anything new must degrade gracefully offline or say so honestly in the UI.
5. **No real COP32 content exists yet.** Mark unannounced things "TBC" rather
   than guessing (see the `notice()` patterns in `app.js`).
6. **Tree-test answers live in the kit.** If you change which screens count as a
   correct answer (`tasks` in `build.py`, `TREE_MAP` in `app.js`), update
   `docs/ux/ia-validation-kit.md` §5.2 in the same change.

## Validation debt (do not claim these are done)

Real card sort, real tree test (10–15 participants, EN and AM), native-speaker
Amharic check, a pass on low-end Android devices, and screen-reader testing on
real devices. The heuristic walkthrough is a *simulation of judgment*: cite it
as risk estimates, never as validation.

## Commit style

Small, single-purpose commits. Reference decision IDs (D16, D44, D53…) from
`docs/decisions/log.md` when a change implements or revises one.
