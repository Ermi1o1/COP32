"""Static server with HTTP Range support (needed by PMTiles)."""
import http.server, os, re, sys
class H(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a): pass
    def send_head(self):
        path = self.translate_path(self.path); rng = self.headers.get("Range")
        if not rng or not os.path.isfile(path): return super().send_head()
        m = re.match(r"bytes=(\d+)-(\d*)", rng); size = os.path.getsize(path); s = int(m[1]); e = int(m[2]) if m[2] else size - 1; e = min(e, size - 1)
        f = open(path, "rb"); f.seek(s); self.send_response(206); self.send_header("Content-Type", self.guess_type(path)); self.send_header("Accept-Ranges", "bytes")
        self.send_header("Content-Range", f"bytes {s}-{e}/{size}"); self.send_header("Content-Length", str(e - s + 1)); self.end_headers()
        self._left = e - s + 1; return f
    def copyfile(self, src, dst):
        left = getattr(self, "_left", None)
        if left is None: return super().copyfile(src, dst)
        dst.write(src.read(left)); self._left = None
if __name__ == "__main__":
    http.server.ThreadingHTTPServer(("127.0.0.1", int(sys.argv[1])), H).serve_forever()
