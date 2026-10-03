"""S7: builds signed snapshot+delta bundles from the sample data. Manifest = JSON signed with Ed25519.
Delta = per-collection upsert/delete lists keyed by id; gzip'd; sha256 of every file in the manifest."""
import json, gzip, hashlib, os, copy, base64, sys
from cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PrivateKey
from cryptography.hazmat.primitives import serialization
OUT = sys.argv[1] if len(sys.argv) > 1 else "site"
def canon(o): return json.dumps(o, sort_keys=True, separators=(",", ":"), ensure_ascii=False).encode()
def sha(b): return hashlib.sha256(b).hexdigest()
def load_key(path="signing.key"):
    if os.path.exists(path): return serialization.load_pem_private_key(open(path, "rb").read(), None)
    k = Ed25519PrivateKey.generate(); open(path, "wb").write(k.private_bytes(serialization.Encoding.PEM, serialization.PrivateFormat.PKCS8, serialization.NoEncryption())); return k
def by_id(d): return {x["id"]: x for x in d}
def norm(s): return {c: sorted(s[c], key=lambda x: x["id"]) for c in s}
def state(v, base):
    s = copy.deepcopy(base)
    for i in range(1, v):   # each version tweaks a few sessions / adds an alert
        s["sessions"][i % 50]["room"] = f"Room v{v}-{i}"
        s["sessions"][(i * 7) % 50]["start"] = f"{8 + i % 9:02d}:30"
        s["alerts"].append(dict(id=f"AL-v{i}", severity="info", msg_en=f"Change {i}", msg_am=f"ለውጥ {i}"))
    return s
def delta(a, b):
    d = {}
    for c in b:
        A, B = by_id(a[c]), by_id(b[c])
        up = [B[i] for i in B if A.get(i) != B[i]]; rm = [i for i in A if i not in B]
        if up or rm: d[c] = dict(upsert=up, delete=rm)
    return d
def build(versions=6):
    base = json.load(open("../data/sample.json")); key = load_key(); os.makedirs(OUT, exist_ok=True)
    snaps = {v: norm(state(v, base)) for v in range(1, versions + 1)}
    files = {}
    raw = canon(snaps[versions]); gz = gzip.compress(raw, 9, mtime=0)
    name = f"snapshot-v{versions}.json.gz"; open(f"{OUT}/{name}", "wb").write(gz); files[name] = dict(sha256=sha(gz), size=len(gz), kind="snapshot", to=versions)
    for v in range(1, versions):
        d = canon(delta(snaps[v], snaps[v + 1])); g = gzip.compress(d, 9, mtime=0); n = f"delta-v{v}-v{v+1}.json.gz"
        open(f"{OUT}/{n}", "wb").write(g); files[n] = dict(sha256=sha(g), size=len(g), kind="delta", frm=v, to=v + 1)
    man = dict(schema=1, version=versions, min_client_schema=1, published="2027-01-01T00:00:00Z", state_sha256=sha(raw), files=files)
    body = canon(man); sig = key.sign(body)
    open(f"{OUT}/manifest.json", "w").write(json.dumps(dict(manifest=man, signature=base64.b64encode(sig).decode(), key_id="k1"), indent=1))
    open(f"{OUT}/pubkey.pem", "wb").write(key.public_key().public_bytes(serialization.Encoding.PEM, serialization.PublicFormat.SubjectPublicKeyInfo))
    print("built", {n: f["size"] for n, f in files.items()}, "raw state bytes", len(raw))
if __name__ == "__main__": build()
