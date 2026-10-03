import json, time, sys, statistics, requests, psycopg2
from collections import defaultdict
from corpus import docs
from queries import build
from normalise import fold
DOCS = docs(); Q = build()
ident = lambda s: s.lower()
def fields(d, nf):  # text sent to engines
    return {k: nf(d[k]) for k in ("title_en","title_am","alias","body")}

# ---------- PostgreSQL FTS('simple') + pg_trgm ----------
class PG:
    name = "postgres"
    def __init__(s, nf):
        s.nf = nf; s.c = psycopg2.connect(host="/var/tmp/pg", port=5433, user="postgres", dbname="s3"); s.c.autocommit = True
        cur = s.c.cursor(); cur.execute("drop table if exists docs; create table docs(id text primary key, title text, alias text, body text, tsv tsvector, alltxt text)")
        t0 = time.time()
        for d in DOCS:
            f = fields(d, nf); title = f["title_en"]+" "+f["title_am"]; alltxt = " ".join((title, f["alias"], f["body"]))
            cur.execute("insert into docs values(%s,%s,%s,%s, setweight(to_tsvector('simple',%s),'A')||setweight(to_tsvector('simple',%s),'A')||setweight(to_tsvector('simple',%s),'C'), %s)", (d["id"], title, f["alias"], f["body"], title, f["alias"], f["body"], alltxt))
        cur.execute("create index on docs using gin(tsv); create index on docs using gin(alltxt gin_trgm_ops)")
        s.index_ms = (time.time()-t0)*1000
        cur.execute("select pg_total_relation_size('docs')"); s.size = cur.fetchone()[0]
    def search(s, q, k=10):
        import re; toks = re.findall(r"\w+", s.nf(q))
        if not toks: return []
        cur = s.c.cursor(); res = []; seen = set()
        def take(rows):
            for r in rows:
                if r[0] not in seen: seen.add(r[0]); res.append(r[0])
        pre = " & ".join(t.replace("'", "")+":*" for t in toks); pre_or = " | ".join(t.replace("'", "")+":*" for t in toks)
        cur.execute("select id from docs where tsv @@ to_tsquery('simple',%s) order by ts_rank(tsv, to_tsquery('simple',%s)) desc, id limit %s", (pre, pre, k)); take(cur.fetchall())
        if len(res) < k:
            cur.execute("select id from docs where tsv @@ to_tsquery('simple',%s) order by ts_rank(tsv, to_tsquery('simple',%s)) desc, id limit %s", (pre_or, pre_or, k)); take(cur.fetchall())
        if len(res) < k:  # typo fallback: trigram word similarity per token
            for t in toks:
                cur.execute("select id from docs where %s <%% alltxt order by word_similarity(%s, alltxt) desc, id limit %s", (t, t, k)); take(cur.fetchall())
        return res[:k]

# ---------- Meilisearch ----------
class Meili:
    name = "meilisearch"; H = {"Authorization": "Bearer spike"}; U = "http://127.0.0.1:7700"
    def __init__(s, nf):
        s.nf = nf; requests.delete(s.U+"/indexes/docs", headers=s.H); time.sleep(0.3)
        t0 = time.time()
        r = requests.post(s.U+"/indexes", headers=s.H, json={"uid": "docs", "primaryKey": "id"}); s.wait(r)
        s.wait(requests.patch(s.U+"/indexes/docs/settings", headers=s.H, json={"searchableAttributes": ["title_en","title_am","alias","body"]}))
        s.wait(requests.post(s.U+"/indexes/docs/documents", headers=s.H, json=[dict(id=d["id"], **fields(d, nf)) for d in DOCS]))
        s.index_ms = (time.time()-t0)*1000; s.size = requests.get(s.U+"/stats", headers=s.H).json()["databaseSize"]
    def wait(s, r):
        uid = r.json()["taskUid"]
        while requests.get(f"{s.U}/tasks/{uid}", headers=s.H).json()["status"] in ("enqueued","processing"): time.sleep(0.05)
    def search(s, q, k=10):
        r = requests.post(s.U+"/indexes/docs/search", headers=s.H, json={"q": s.nf(q), "limit": k}).json()
        return [h["id"] for h in r["hits"]]

# ---------- Typesense ----------
class TS:
    name = "typesense"; H = {"X-TYPESENSE-API-KEY": "spike"}; U = "http://127.0.0.1:8108"
    def __init__(s, nf):
        s.nf = nf; requests.delete(s.U+"/collections/docs", headers=s.H); t0 = time.time()
        r = requests.post(s.U+"/collections", headers=s.H, json={"name":"docs","fields":[{"name":n,"type":"string"} for n in ("title_en","title_am","alias","body")]}); assert r.ok, r.text
        body = "\n".join(json.dumps(dict(id=d["id"], **fields(d, nf)), ensure_ascii=False) for d in DOCS)
        r = requests.post(s.U+"/collections/docs/documents/import?action=create", headers=s.H, data=body.encode()); assert '"success":false' not in r.text, r.text[:300]
        s.index_ms = (time.time()-t0)*1000; s.size = None
    def search(s, q, k=10):
        r = requests.get(s.U+"/collections/docs/documents/search", headers=s.H, params={"q": s.nf(q) or "*", "query_by": "title_en,title_am,alias,body", "prefix": "true", "num_typos": 2, "per_page": k, "drop_tokens_threshold": 1}).json()
        return [h["document"]["id"] for h in r.get("hits", [])]

def evaluate(eng):
    per = defaultdict(list); lat = []; miss = []
    for q in Q:
        t0 = time.time(); got = eng.search(q["q"]); lat.append((time.time()-t0)*1000)
        top5 = got[:5]; g = q["gold"]
        hit = any(x in g for x in top5); p5 = sum(x in g for x in top5)/min(5, len(g)); r10 = sum(x in g for x in got[:10])/len(g)
        per[q["cat"]].append((hit, p5, r10)); per["ALL"].append((hit, p5, r10))
        if not hit: miss.append(q["q"])
    summ = {c: (sum(h for h,_,_ in v)/len(v), sum(p for _,p,_ in v)/len(v), sum(r for _,_,r in v)/len(v), len(v)) for c, v in per.items()}
    return summ, statistics.median(lat), max(lat), miss

if __name__ == "__main__":
    out = {}
    for mode, nf in (("raw", ident), ("folded", fold)):
        for E in (PG, Meili, TS):
            e = E(nf); summ, med, mx, miss = evaluate(e)
            out[f"{e.name}/{mode}"] = dict(summary=summ, median_ms=med, max_ms=mx, index_ms=e.index_ms, size=e.size, misses=miss)
            a = summ["ALL"]; print(f"{e.name:12s} {mode:7s} hit@5={a[0]:.2f} P@5={a[1]:.2f} R@10={a[2]:.2f} median={med:.1f}ms index={e.index_ms:.0f}ms misses={len(miss)}")
    json.dump(out, open("results.json", "w"), ensure_ascii=False, indent=1)
