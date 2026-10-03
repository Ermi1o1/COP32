import http.server, threading, os, shutil, json, tempfile, time, socketserver, sys
import publisher; from client import Client, SyncError
ROOT = {"dir": "site"}; FAULT = {"mode": None, "hits": 0}
class H(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, p): return os.path.join(ROOT["dir"], p.lstrip("/").split("?")[0])
    def log_message(self, *a): pass
    def do_GET(self):
        path = self.translate_path(self.path); name = os.path.basename(path)
        if not os.path.exists(path): self.send_error(404); return
        data = open(path, "rb").read(); start = 0
        rng = self.headers.get("Range")
        if rng: start = int(rng.split("=")[1].split("-")[0])
        m = FAULT["mode"]
        if m == "corrupt" and name.startswith("delta"): data = data[:20] + bytes([data[20] ^ 0xFF]) + data[21:]
        if m == "tamper-manifest" and name == "manifest.json":
            j = json.loads(data); j["manifest"]["files"][next(iter(j["manifest"]["files"]))]["sha256"] = "0" * 64; data = json.dumps(j).encode()
        part = data[start:]
        self.send_response(206 if start else 200); 
        if start: self.send_header("Content-Range", f"bytes {start}-{len(data)-1}/{len(data)}")
        self.send_header("Content-Length", str(len(part))); self.end_headers()
        if m == "interrupt" and name.startswith(("delta", "snapshot")) and FAULT["hits"] < 2 and len(part) > 100:
            FAULT["hits"] += 1; self.wfile.write(part[: len(part) // 2]); self.wfile.flush(); self.connection.close(); return
        self.wfile.write(part)
srv = socketserver.ThreadingTCPServer(("127.0.0.1", 8120), H); srv.allow_reuse_address = True
threading.Thread(target=srv.serve_forever, daemon=True).start()
pub = open("site/pubkey.pem", "rb").read(); res = []
def new_client(): d = tempfile.mkdtemp(); return Client("http://127.0.0.1:8120", d, pub)
def at_version(v):
    out = f"site_v{v}"; shutil.rmtree(out, ignore_errors=True); publisher.OUT = out; publisher.build(v); ROOT["dir"] = out
    c = new_client(); c.sync(); ROOT["dir"] = "site"; FAULT.update(mode=None, hits=0); return c
def rec(name, ok, note=""): res.append((name, ok, note)); print(("PASS" if ok else "FAIL"), name, note)
# 1 fresh install -> snapshot
c = new_client(); mode = c.sync(); rec("fresh install uses snapshot", mode == "snapshot" and c.local()["_v"] == 6, f"{c.bytes} B transferred")
# 2 up to date
b0 = c.bytes; rec("no-op sync only fetches manifest", c.sync() == "up-to-date", f"{c.bytes-b0} B")
# 3 delta from v5 and v1
for v in (5, 3, 1):
    c = at_version(v); b0 = c.bytes; m = c.sync(); rec(f"delta v{v}->v6", m == "delta" and c.local()["_v"] == 6, f"{c.bytes-b0} B transferred")
# 4 delta result equals fresh snapshot
fresh = new_client(); fresh.sync(); c = at_version(2); c.sync()
a = {k: sorted(x, key=lambda i: i["id"]) for k, x in c.local().items() if k != "_v"}; b = {k: sorted(x, key=lambda i: i["id"]) for k, x in fresh.local().items() if k != "_v"}
rec("delta-applied state == fresh snapshot state", a == b)
# 5 interruption + resume
c = new_client(); FAULT.update(mode="interrupt", hits=0)
try: m = c.sync(); rec("interrupted download resumes (Range)", c.local()["_v"] == 6, f"mode={m}, interruptions={FAULT['hits']}, {c.bytes} B")
except Exception as e: rec("interrupted download resumes (Range)", False, repr(e))
FAULT.update(mode=None, hits=0)
# 6 corrupted delta -> rejected, old state kept
c = at_version(4); before = json.dumps(c.local(), sort_keys=True); FAULT["mode"] = "corrupt"
try: c.sync(); rec("corrupted file rejected", False)
except SyncError as e: rec("corrupted file rejected", json.dumps(c.local(), sort_keys=True) == before, f"{e}; local state untouched")
FAULT["mode"] = None
# 7 tampered manifest (hash edited, signature stale) -> rejected
c = at_version(4); FAULT["mode"] = "tamper-manifest"
try: c.sync(); rec("tampered manifest rejected", False)
except SyncError as e: rec("tampered manifest rejected", "signature" in str(e), str(e))
FAULT["mode"] = None
# 8 manifest signed with a different key -> rejected
other = tempfile.mkdtemp(); cwd = os.getcwd(); shutil.copy("site/pubkey.pem", other + "/real.pem")
os.chdir(other); shutil.copytree(cwd + "/../data", other + "/../data", dirs_exist_ok=True) if False else None; os.chdir(cwd)
os.makedirs("evil_tmp", exist_ok=True); publisher.OUT = "site_evil"
if os.path.exists("signing.key"): os.rename("signing.key", "signing.key.real")
publisher.build(7); os.rename("signing.key", "evil.key"); os.rename("signing.key.real", "signing.key")
ROOT["dir"] = "site_evil"; c = new_client()
try: c.sync(); rec("manifest signed by unknown key rejected", False)
except SyncError as e: rec("manifest signed by unknown key rejected", True, str(e))
shutil.rmtree("site_evil"); os.remove("evil.key"); shutil.rmtree("evil_tmp"); ROOT["dir"] = "site"
# 9 rollback (replay of older manifest) rejected
c = new_client(); c.sync(); shutil.rmtree("site_v3", ignore_errors=True); publisher.OUT = "site_v3"; publisher.build(3); ROOT["dir"] = "site_v3"
try: c.sync(); rec("replayed older manifest rejected", False)
except SyncError as e: rec("replayed older manifest rejected", True, str(e))
ROOT["dir"] = "site"
# 10 user-initiated rollback to previous snapshot
c = at_version(5); c.sync(); ok = c.rollback(); rec("local rollback to previous state", ok and c.local()["_v"] == 5)
# 11 polling load on manifest (single-process, local only)
import urllib.request; n = 2000; t0 = time.time()
for _ in range(n): urllib.request.urlopen("http://127.0.0.1:8120/manifest.json").read()
dt = time.time() - t0; rec("manifest GET throughput (python http.server, serial, localhost)", True, f"{n/dt:.0f} req/s; manifest {os.path.getsize('site/manifest.json')} B")
for d in ("site_v1","site_v3","site_v5","site_v4","site_v2"): shutil.rmtree(d, ignore_errors=True)
json.dump(res, open("results.json", "w"), indent=1)
print(sum(r[1] for r in res), "/", len(res), "passed")
