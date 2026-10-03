"""S7 reference client: fetch signed manifest -> verify -> plan (deltas if contiguous, else snapshot) -> download with
HTTP Range resume -> verify sha256 -> apply to staging copy -> verify final state hash -> atomic swap; keep previous for rollback."""
import json, gzip, hashlib, os, base64, shutil, urllib.request, urllib.error
from cryptography.hazmat.primitives import serialization
from cryptography.exceptions import InvalidSignature
def canon(o): return json.dumps(o, sort_keys=True, separators=(",", ":"), ensure_ascii=False).encode()
def sha(b): return hashlib.sha256(b).hexdigest()
class SyncError(Exception): pass
class Client:
    def __init__(self, base, store, pubkey_pem):
        self.base, self.store = base, store; self.pub = serialization.load_pem_public_key(pubkey_pem); os.makedirs(store, exist_ok=True)
        self.bytes = 0
    def _get(self, path, start=0):
        req = urllib.request.Request(f"{self.base}/{path}", headers={"Range": f"bytes={start}-"} if start else {})
        with urllib.request.urlopen(req, timeout=10) as r: return r.read(), r.status
    def local(self):
        p = f"{self.store}/state.json"
        return (json.load(open(p)) if os.path.exists(p) else None)
    def manifest(self):
        b, _ = self._get("manifest.json"); self.bytes += len(b); m = json.loads(b)
        try: self.pub.verify(base64.b64decode(m["signature"]), canon(m["manifest"]))
        except InvalidSignature: raise SyncError("manifest signature invalid")
        if m["manifest"]["schema"] > 1: raise SyncError("client too old for schema")
        return m["manifest"]
    def fetch_file(self, name, meta, retries=6):
        tmp = f"{self.store}/dl/{name}.part"; os.makedirs(os.path.dirname(tmp), exist_ok=True)
        for _ in range(retries):
            have = os.path.getsize(tmp) if os.path.exists(tmp) else 0
            if have >= meta["size"]: break
            try:
                data, st = self._get(name, have)
                if have and st != 206: have = 0   # server ignored Range: restart
                with open(tmp, "wb" if not have else "ab") as f: f.write(data)
                self.bytes += len(data)
            except Exception: continue   # interrupted: loop and resume from .part
        b = open(tmp, "rb").read() if os.path.exists(tmp) else b""
        if sha(b) != meta["sha256"]:
            if os.path.exists(tmp): os.remove(tmp)    # corrupted -> discard
            raise SyncError(f"{name}: checksum mismatch")
        return b
    def apply_delta(self, state, d):
        for c, ch in d.items():
            idx = {x["id"]: x for x in state[c]}
            for u in ch["upsert"]: idx[u["id"]] = u
            for i in ch["delete"]: idx.pop(i, None)
            state[c] = list(idx.values())
        return state
    def sync(self):
        m = self.manifest(); cur = self.local(); curv = cur["_v"] if cur else 0
        if curv == m["version"]: return "up-to-date"
        if curv > m["version"]: raise SyncError("manifest older than local (rollback attack?)")
        files = m["files"]; chain = []; v = curv
        while cur and v < m["version"] and any(f.get("frm") == v for f in files.values()):
            n, f = next((n, f) for n, f in files.items() if f.get("frm") == v); chain.append((n, f)); v = f["to"]
        if cur and v == m["version"]: mode = "delta"; state = json.loads(json.dumps(cur)); state.pop("_v")
        else:
            mode = "snapshot"; n, f = next((n, f) for n, f in files.items() if f["kind"] == "snapshot")
            state = json.loads(gzip.decompress(self.fetch_file(n, f))); chain = []
        for n, f in chain: state = self.apply_delta(state, json.loads(gzip.decompress(self.fetch_file(n, f))))
        norm = {k: sorted(state[k], key=lambda x: x["id"]) for k in state}
        if sha(canon(norm)) != m["state_sha256"]: raise SyncError("end-state hash mismatch (nothing applied)")
        state = norm
        state["_v"] = m["version"]; new = f"{self.store}/state.json.new"
        json.dump(state, open(new, "w"), ensure_ascii=False)
        if os.path.exists(f"{self.store}/state.json"): shutil.copy(f"{self.store}/state.json", f"{self.store}/state.prev.json")
        os.replace(new, f"{self.store}/state.json")   # atomic on POSIX
        shutil.rmtree(f"{self.store}/dl", ignore_errors=True)
        return mode
    def rollback(self):
        if os.path.exists(f"{self.store}/state.prev.json"): os.replace(f"{self.store}/state.prev.json", f"{self.store}/state.json"); return True
        return False
