#!/usr/bin/env python3
"""release.py — bump and verify the COP32 prototype version in one step.

The version appears in four places that must always agree; a mismatch is how
stale-cache incidents happen. This script is the only supported way to change it.

  sw.js      const VERSION = 'cop32-proto-vX.Y.Z'   (service-worker cache name)
             const V = '?v=X.Y.Z'                    (precache URL suffix)
  index.html every asset ?v=X.Y.Z                    (busts browser + old-worker caches)
  app.js     About this prototype … val: 'vX.Y.Z'    (shown in Profile & Settings)

Usage (run from anywhere):
  python3 prototype/release.py            # print the current version
  python3 prototype/release.py --check    # CI guard: exit 1 if the places disagree
  python3 prototype/release.py 0.7.0      # bump everywhere, then re-verify
  python3 prototype/release.py --force 0.7.0   # bump even if the tree disagrees

All four files are computed in memory first and only written if every rewrite
succeeds. Each file is replaced atomically; the set is not one transaction, so
the closing check reports any partial write.
"""
import pathlib
import re
import sys

HERE = pathlib.Path(__file__).resolve().parent
SEMVER = re.compile(r"^\d+\.\d+\.\d+$")
CARRIERS = {
    "sw.js": [re.compile(r"(const VERSION = 'cop32-proto-v)(\d+\.\d+\.\d+)(')"),
              re.compile(r"(const V = '\?v=)(\d+\.\d+\.\d+)(')")],
    "index.html": [re.compile(r"(\?v=)(\d+\.\d+\.\d+)(\")")],
    "app.js": [re.compile(r"(title: 'About this prototype', val: 'v)(\d+\.\d+\.\d+)(')")],
}


def die(msg):
    print(f"release.py: {msg}", file=sys.stderr)
    sys.exit(1)


def read(name):
    return (HERE / name).read_text(encoding="utf-8")


def found_versions():
    """[(file, pattern, version)] for every carrier occurrence."""
    out = []
    for name, pats in CARRIERS.items():
        text = read(name)
        for pat in pats:
            hits = [m.group(2) for m in pat.finditer(text)]
            if not hits:
                die(f"{name}: no match for {pat.pattern} — carrier missing or reformatted")
            out += [(name, pat.pattern, v) for v in hits]
    return out


def current():
    vs = {v for _, _, v in found_versions()}
    return vs.pop() if len(vs) == 1 else None


def check():
    rows = found_versions()
    vs = sorted({v for _, _, v in rows})
    if len(vs) != 1:
        for name, pat, v in rows:
            print(f"  {name}: {v}   [{pat}]", file=sys.stderr)
        die(f"inconsistent versions: {vs}")
    print(f"OK: {len(rows)} version carriers agree on v{vs[0]}")
    return 0


def bump(new, force=False):
    if not SEMVER.match(new):
        die(f"'{new}' is not X.Y.Z")
    if not force and current() is None:
        die("tree is inconsistent — run --check, fix it, or rerun with --force")
    staged = {}
    for name, pats in CARRIERS.items():
        text = read(name)
        for pat in pats:
            text, n = pat.subn(lambda m: m.group(1) + new + m.group(3), text)
            if not n:
                die(f"{name}: could not rewrite {pat.pattern}")
        staged[name] = text
    for name, text in staged.items():          # write only after every rewrite succeeded
        tmp = HERE / (name + ".tmp")
        tmp.write_text(text, encoding="utf-8")
        tmp.replace(HERE / name)
    check()
    print(f"Bumped to v{new}. Commit and push; GitHub Pages deploys and online users get it on their next open.")


if __name__ == "__main__":
    args = [a for a in sys.argv[1:] if a != "--force"]
    if not args:
        v = current()
        print(f"Current version: v{v}" if v else "Versions disagree — run --check")
    elif args[0] == "--check":
        sys.exit(check())
    elif args[0] in ("-h", "--help"):
        print(__doc__)
    else:
        bump(args[0], force="--force" in sys.argv)
