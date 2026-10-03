"""Builds the three Step-1 visual-direction mockups (Home, EN) into prototype/directions/*.html.
All people/orgs/content are invented sample data. Icons: Lucide (ISC) and Phosphor (MIT). Fonts: OFL (Fraunces, Inter Tight, Plus Jakarta Sans, Bricolage Grotesque, Source Serif 4, Noto Sans Ethiopic)."""
import re, os
NM = os.environ["NM"]
def lucide(n): return re.sub(r'<svg[^>]*>|</svg>|<!--.*?-->', '', open(f"{NM}/lucide-static/icons/{n}.svg").read(), flags=re.S).strip()
def phos(n, w): return re.sub(r'<svg[^>]*>|</svg>', '', open(f"{NM}/@phosphor-icons/core/assets/{w}/{n}{'' if w=='regular' else '-'+w}.svg").read()).strip()
def ic_l(n, sw=1.75, cls=""): return f'<svg class="ic {cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{lucide(n)}</svg>'
def ic_p(n, w="fill", cls=""): return f'<svg class="ic {cls}" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">{phos(n,w)}</svg>'

# --- illustrated avatars (SVG, no photos) -------------------------------------
def av_a(init, c1, c2, shape):  # A: soft organic blob + initials
    blobs = ["M50 8c20 0 38 14 40 36s-12 44-36 46S10 78 10 52 30 8 50 8z", "M52 10c22 2 40 18 36 40S70 92 46 90 8 70 12 46 32 8 52 10z", "M48 8c24-2 44 16 42 40S72 90 46 90 6 72 8 46 24 10 48 8z"]
    return f'<svg class="av" viewBox="0 0 100 100" role="img" aria-label="Avatar {init}"><path d="{blobs[shape%3]}" fill="{c1}"/><circle cx="76" cy="24" r="9" fill="{c2}"/><text x="50" y="60" text-anchor="middle" font-size="30" font-weight="700" fill="#fff" font-family="inherit">{init}</text></svg>'
def av_b(init, c1, c2, shape):  # B: rounded square, tinted, initials
    return f'<svg class="av" viewBox="0 0 100 100" role="img" aria-label="Avatar {init}"><rect width="100" height="100" rx="26" fill="{c1}"/><path d="M0 100V70q50-34 100 0v30z" fill="{c2}" opacity=".55"/><text x="50" y="62" text-anchor="middle" font-size="34" font-weight="700" fill="#fff" font-family="inherit">{init}</text></svg>'
def av_c(init, c1, c2, shape):  # C: flat illustrated bust (abstract, no features) on bold colour
    hair = ["M30 42q0-22 20-22t20 22q-10-8-20-8t-20 8z", "M28 46q-2-26 22-26t22 26q-6-12-22-12T28 46z", "M32 44q4-24 18-24t18 24l-6-4q-12-8-24 0z"][shape%3]
    return f'<svg class="av" viewBox="0 0 100 100" role="img" aria-label="Avatar {init}"><rect width="100" height="100" fill="{c1}"/><path d="M12 100q0-30 38-30t38 30z" fill="{c2}"/><circle cx="50" cy="46" r="17" fill="#F3D9BF"/><path d="{hair}" fill="#2B1B14"/></svg>'

SPK = [("SA", "Dr. Selam Anbessa", "Dryland resilience researcher"), ("MK", "Mekdes Kebede", "Youth climate organiser"), ("TW", "Tewodros Wolde", "Renewable-energy engineer")]

def page(d):
    sp = d["avatars"]
    avs = "".join(f'<li class="spk">{sp(i,*d["avcols"][k%len(d["avcols"])],k)}<div><b>{n}</b><span>{r}</span></div></li>' for k,(i,n,r) in enumerate(SPK))
    I = d["icon"]
    tabs = [("Home","house","house"),("Programme","calendar-blank","calendar"),("Map","map-trifold","map"),("Visit","suitcase-simple","briefcase"),("Updates","newspaper","newspaper")]
    cur = 'aria-current="page"'
    tab_html = "".join(f'<a href="#" {cur if i==0 else ""}>{I(p if d["lib"]=="p" else l)}<span>{n}</span></a>' for i,(n,p,l) in enumerate(tabs))
    tiles = [("Can I attend?","Who can enter where","ticket","ticket"),("Open to public","Tomorrow's events","users","users"),("Emergency & help","Numbers & first aid","first-aid","heart-pulse"),("Map","Venue & city","map-trifold","map-pin")]
    tile_html = "".join(f'<a class="tile" href="#"><span class="tic">{I(p if d["lib"]=="p" else l)}</span><b>{t}</b><small>{s}</small></a>' for t,s,p,l in tiles)
    ic = lambda p,l: I(p if d["lib"]=="p" else l)
    return f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Direction {d["key"]} — {d["name"]} (PROTOTYPE, sample data)</title>
<style>
@font-face{{font-family:"Noto Sans Ethiopic";src:url(fonts/NotoSansEthiopic-subset.woff2) format("woff2");font-weight:400 700;font-display:swap}}
@font-face{{font-family:"{d["head"]}";src:url(fonts/{d["headfile"]}) format("woff2");font-weight:300 900;font-display:swap}}
@font-face{{font-family:"{d["body"]}";src:url(fonts/{d["bodyfile"]}) format("woff2");font-weight:100 900;font-display:swap}}
:root{{{d["light"]}--hf:"{d["head"]}","Noto Sans Ethiopic",serif;--bf:"{d["body"]}","Noto Sans Ethiopic",system-ui,sans-serif;--r:{d["r"]}px}}
:root[data-theme=dark]{{{d["dark"]}}}
@media(prefers-color-scheme:dark){{:root:not([data-theme=light]){{{d["dark"]}}}}}
*{{box-sizing:border-box}}body{{margin:0;background:var(--bg);color:var(--tx);font:400 1rem/1.5 var(--bf)}}
.app{{max-width:430px;margin:0 auto;min-height:100vh;position:relative;background:var(--bg);padding-bottom:128px}}
.ic{{width:24px;height:24px;flex:none}}
header{{display:flex;align-items:center;gap:8px;padding:12px 16px;position:sticky;top:0;background:var(--bg);z-index:3}}
.brand{{flex:1;display:flex;align-items:center;gap:10px;font:700 1.0625rem var(--hf)}}
.mark{{width:34px;height:34px;border-radius:{d["markr"]};background:var(--pri);color:var(--onpri);display:grid;place-items:center;font:800 .8rem var(--bf)}}
.ib{{width:44px;height:44px;border-radius:50%;border:0;background:var(--surf2);color:var(--tx);display:grid;place-items:center;position:relative}}
.ib .dot{{position:absolute;top:8px;right:9px;width:10px;height:10px;border-radius:50%;background:var(--danger);border:2px solid var(--bg)}}
.hero{{margin:4px 16px 16px;padding:22px 20px;border-radius:calc(var(--r)*1.4);background:{d["herobg"]};color:var(--onhero);position:relative;overflow:hidden}}
.hero h1{{font:{d["h1"]} var(--hf);margin:6px 0 8px;letter-spacing:{d["ls"]}}}.hero p{{margin:0 0 16px;opacity:.95;max-width:30ch}}
.hero .eyebrow{{font:700 .75rem var(--bf);letter-spacing:.08em;text-transform:uppercase;opacity:.9}}
.hero svg.art{{position:absolute;right:-16px;top:-10px;width:120px;opacity:.55;pointer-events:none;z-index:0}}.hero>*:not(svg){{position:relative;z-index:1}}.hero h1{{max-width:11em}}
.btn{{display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:0 18px;border-radius:{d["btnr"]};background:var(--onhero);color:var(--hero);border:0;font:700 .9375rem var(--bf);text-decoration:none}}
.alert{{margin:0 16px 16px;padding:14px;border-radius:var(--r);background:var(--dangerbg);color:var(--dangertx);display:flex;gap:12px}}
.alert b{{display:block}}.alert small{{opacity:.85}}
section{{padding:0 16px;margin-bottom:22px}}
h2{{font:{d["h2"]} var(--hf);margin:0 0 12px;letter-spacing:{d["ls"]}}}
.card{{background:var(--surf);border:1px solid var(--line);border-radius:var(--r);padding:16px;box-shadow:{d["shadow"]}}}
.next{{display:flex;gap:14px;align-items:flex-start}}
.time{{min-width:64px;text-align:center;border-radius:calc(var(--r)*.7);background:var(--prisoft);color:var(--onprisoft);padding:8px 4px;font:700 1.25rem/1.1 var(--hf)}}.time small{{display:block;font:600 .6875rem var(--bf);letter-spacing:.04em}}
.next h3{{margin:0 0 4px;font:700 1.0625rem/1.3 var(--bf)}}.muted{{color:var(--tx2)}}.small{{font-size:.875rem}}
.tag{{display:inline-flex;align-items:center;gap:6px;padding:3px 10px;border-radius:99px;background:var(--prisoft);color:var(--onprisoft);font:700 .75rem var(--bf)}}
.grid{{display:grid;grid-template-columns:1fr 1fr;gap:12px}}
.tile{{display:flex;flex-direction:column;gap:2px;padding:14px;border-radius:var(--r);background:var(--surf);border:1px solid var(--line);color:var(--tx);text-decoration:none;box-shadow:{d["shadow"]};min-height:112px}}
.tile .tic{{width:42px;height:42px;border-radius:{d["ticr"]};display:grid;place-items:center;background:var(--tic);color:var(--ontic);margin-bottom:8px}}
.tile b{{font:700 .9375rem var(--bf)}}.tile small{{color:var(--tx2);font-size:.8125rem}}
.spks{{list-style:none;margin:0;padding:0;display:grid;gap:10px}}.spk{{display:flex;gap:12px;align-items:center;background:var(--surf);border:1px solid var(--line);border-radius:var(--r);padding:10px 12px}}
.spk b{{display:block;font-size:.9375rem}}.spk span{{color:var(--tx2);font-size:.8125rem}}.av{{width:48px;height:48px;border-radius:{d["avr"]};flex:none;overflow:hidden}}
.news{{display:block;color:var(--tx);text-decoration:none}}.news .tag{{background:var(--surf2);color:var(--tx2)}}.news b{{display:block;margin-top:8px;font:{d["newsf"]} var(--hf)}}
nav{{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:430px;{d["navcss"]};display:grid;grid-template-columns:repeat(5,1fr);z-index:5}}
nav a{{display:flex;flex-direction:column;align-items:center;gap:2px;min-height:60px;justify-content:center;text-decoration:none;color:var(--tx2);font:600 .6875rem var(--bf)}}
nav a[aria-current]{{color:var(--navact);{d["navactcss"]}}}
.proto{{position:fixed;bottom:{d["protob"]};left:50%;transform:translateX(-50%);width:100%;max-width:430px;z-index:6;background:var(--warnbg);color:var(--warntx);font:700 .6875rem var(--bf);text-align:center;padding:5px 8px;letter-spacing:.02em}}
.themebtn{{display:block;margin:8px 16px 0 auto;font:600 .75rem var(--bf);padding:6px 10px;border-radius:99px;border:1px solid var(--line);background:var(--surf);color:var(--tx)}}
:focus-visible{{outline:3px solid var(--focus);outline-offset:2px}}
a,button{{transition:transform .12s,background .12s}}a:active,button:active{{transform:scale(.97)}}
@media(prefers-reduced-motion:reduce){{*{{transition:none!important}}}}
body[data-lang=am]{{line-height:1.7}}
{d["extra"]}
</style></head><body data-lang="en">
<button class="themebtn" onclick="var r=document.documentElement;r.dataset.theme=r.dataset.theme==='dark'?'light':'dark'">Light / Dark</button>
<div class="app">
<header><div class="brand"><span class="mark">C32</span>Companion</div><button class="ib" aria-label="Search">{ic("magnifying-glass","search")}</button><button class="ib" aria-label="Alerts">{ic("bell","bell")}<i class="dot"></i></button><button class="ib" aria-label="Language: switch to Amharic" style="width:auto;padding:0 12px;border-radius:99px;font:700 .8125rem var(--bf)">አማ</button></header>
<div class="hero"><div class="eyebrow">Sample · Pre-event</div><h1>{d["herotitle"]}</h1><p>Plan your trip, build an agenda, follow the news.</p><a class="btn" href="#">{ic("calendar-blank","calendar")}Browse the programme</a>{d["art"]}</div>
<div class="alert" role="alert">{ic("warning","triangle-alert")}<div><b>Sample alert: Shuttle route 2 delayed</b><small>Use route 4 from the north gate. Sample · updated 10:05 EAT</small></div></div>
<section><h2>Now &amp; next</h2><div class="card next"><div class="time"><small>TUE</small>09:30</div><div><span class="tag">{ic("star","star")}Saved</span><h3 style="margin-top:6px">Sample forum: Water security in the drylands</h3><div class="small muted">Hall B · Open to public</div></div></div></section>
<section><h2>Shortcuts</h2><div class="grid">{tile_html}</div></section>
<section><h2>Featured voices <span class="small muted" style="font-weight:400">(invented)</span></h2><ul class="spks">{avs}</ul></section>
<section><h2>Highlights</h2><a class="card news" href="#"><span class="tag">Editorial (sample)</span><b>Sample explainer: what “loss and damage” means</b></a></section>
</div>
<div class="proto">PROTOTYPE — sample data, not an official COP32 product</div>
<nav aria-label="Main">{tab_html}</nav></body></html>'''

def vars_(m): return "".join(f"--{k}:{v};" for k,v in m.items())
A = dict(key="A", name="Savanna Editorial", lib="l", icon=lambda n: ic_l(n,1.75), head="Fraunces", headfile="fraunces-latin-wght-normal.woff2", body="Inter Tight", bodyfile="inter-tight-latin-wght-normal.woff2", r=16, markr="50% 50% 50% 8px", btnr="99px", ticr="50%", avr="50%", h1="600 1.875rem/1.12", h2="600 1.375rem/1.2", newsf="600 1.1875rem/1.3", ls="-.01em", shadow="0 1px 2px rgba(60,40,10,.06)", herobg="var(--hero)", herotitle="Welcome to the climate conversation", protob="68px",
 art='<svg class="art" viewBox="0 0 200 160" aria-hidden="true"><circle cx="130" cy="70" r="46" fill="#F2B84B"/><path d="M0 160V110q40-36 80-6t120-18v74z" fill="#7A3A1D" opacity=".55"/><path d="M0 160v-30q50-30 90-4t110-10v44z" fill="#0B3B31" opacity=".6"/></svg>',
 navcss="background:var(--surf);border-top:1px solid var(--line)", navactcss="", extra="nav a[aria-current] .ic{background:var(--prisoft);width:56px;height:30px;padding:3px 16px;border-radius:99px;box-sizing:border-box}",
 avatars=av_a, avcols=[("#0F6B58","#D8892B"),("#A5471F","#F2B84B"),("#3E5C8A","#D8892B")],
 light=vars_(dict(bg="#FBF6EC",surf="#FFFFFF",surf2="#F1E8D6",line="#E3D8C2",tx="#201A12",tx2="#5A4E3C",pri="#0F5E4C",onpri="#fff",prisoft="#D9ECE3",onprisoft="#0A4034",hero="#0F5E4C",onhero="#FFFFFF",tic="#FBE6C4",ontic="#7A3A00",danger="#B3261E",dangerbg="#FBE1DC",dangertx="#7F1710",warnbg="#FFEFC9",warntx="#5E3A00",focus="#0B5A8A",navact="#0A4034")),
 dark=vars_(dict(bg="#15120D",surf="#201B14",surf2="#2C261C",line="#3A3326",tx="#F4ECDD",tx2="#C9BDA6",pri="#6FCDB2",onpri="#06231C",prisoft="#1F4137",onprisoft="#C8EFE2",hero="#1F5A4B",onhero="#FFFFFF",tic="#4A3417",ontic="#F7C98A",danger="#FF9D92",dangerbg="#4A1D18",dangertx="#FFD6D1",warnbg="#3B2C08",warntx="#F5D08A",focus="#8CC8F0",navact="#C8EFE2")))
B = dict(key="B", name="Civic Clear", lib="p", icon=lambda n: ic_p(n,"fill" if True else "regular"), head="Plus Jakarta Sans", headfile="plus-jakarta-sans-latin-wght-normal.woff2", body="Plus Jakarta Sans", bodyfile="plus-jakarta-sans-latin-wght-normal.woff2", r=12, markr="10px", btnr="10px", ticr="12px", avr="14px", h1="800 1.75rem/1.15", h2="700 1.25rem/1.25", newsf="700 1.0625rem/1.35", ls="-.015em", shadow="0 1px 3px rgba(10,30,60,.10)", herobg="var(--hero)", herotitle="Your guide to the conference", protob="66px",
 art='<svg class="art" viewBox="0 0 200 160" aria-hidden="true"><g fill="none" stroke="#fff" stroke-opacity=".28" stroke-width="2"><circle cx="130" cy="90" r="30"/><circle cx="130" cy="90" r="52"/><circle cx="130" cy="90" r="74"/></g><circle cx="130" cy="90" r="9" fill="#7FD3F0"/></svg>',
 navcss="background:var(--surf);border-top:1px solid var(--line)", navactcss="box-shadow:inset 0 3px 0 var(--pri)", extra="",
 avatars=av_b, avcols=[("#1D4F91","#7FD3F0"),("#0E7C86","#BFEFF2"),("#5B3FA0","#CFC4F0")],
 light=vars_(dict(bg="#F4F7FB",surf="#FFFFFF",surf2="#E6EDF6",line="#D3DDEA",tx="#0F1C2E",tx2="#44546A",pri="#1D4F91",onpri="#fff",prisoft="#DCE8F8",onprisoft="#12335F",hero="#143E78",onhero="#FFFFFF",tic="#DCE8F8",ontic="#12335F",danger="#B3261E",dangerbg="#FBE1DC",dangertx="#7F1710",warnbg="#FFF0C7",warntx="#5E3A00",focus="#0B5A8A",navact="#1D4F91")),
 dark=vars_(dict(bg="#0D1521",surf="#16212F",surf2="#1F2D40",line="#2C3C52",tx="#EAF0F8",tx2="#B3C2D6",pri="#8DB8F2",onpri="#06182E",prisoft="#1D3558",onprisoft="#D5E5FB",hero="#1B3F73",onhero="#FFFFFF",tic="#1D3558",ontic="#D5E5FB",danger="#FF9D92",dangerbg="#4A1D18",dangertx="#FFD6D1",warnbg="#3B2C08",warntx="#F5D08A",focus="#8CC8F0",navact="#8DB8F2")))
C = dict(key="C", name="Bright Voices", lib="l", icon=lambda n: ic_l(n,2.5), head="Bricolage Grotesque", headfile="bricolage-grotesque-latin-wght-normal.woff2", body="Source Serif 4", bodyfile="source-serif-4-latin-wght-normal.woff2", r=22, markr="12px 12px 12px 2px", btnr="99px", ticr="14px", avr="50%", h1="800 2.125rem/1.05", h2="800 1.5rem/1.1", newsf="800 1.25rem/1.2", ls="-.02em", shadow="0 3px 0 var(--line)", herobg="var(--hero)", herotitle="Climate, in your pocket.", protob="72px",
 art='<svg class="art" viewBox="0 0 200 160" aria-hidden="true"><circle cx="150" cy="60" r="34" fill="#FFD23F"/><rect x="70" y="86" width="64" height="64" rx="18" fill="#FF6B4A" transform="rotate(-12 102 118)"/><path d="M20 150l36-60 36 60z" fill="#2BB3A3"/></svg>',
 navcss="background:var(--surf);border:2px solid var(--tx);border-radius:26px;margin-bottom:8px;width:calc(100% - 24px)", navactcss="background:var(--prisoft);border-radius:20px;margin:4px", extra=".app{padding-bottom:140px}.hero{border:2px solid var(--tx)}.card,.tile,.spk{border:2px solid var(--tx)}.tag{border:2px solid currentColor}body{font-family:var(--bf)}h2,.brand,.tile b,.next h3,.btn,nav a,.proto,.time,.themebtn{font-family:\"Bricolage Grotesque\",\"Noto Sans Ethiopic\",sans-serif}",
 avatars=av_c, avcols=[("#2BB3A3","#FF6B4A"),("#FFB000","#7B4DFF"),("#FF6B4A","#2BB3A3")],
 light=vars_(dict(bg="#FFF9EC",surf="#FFFFFF",surf2="#FFEAC2",line="#1B1B1B33",tx="#1B1B1B",tx2="#4B4638",pri="#6A3FE0",onpri="#fff",prisoft="#E6DCFF",onprisoft="#2F1A78",hero="#5A2FD0",onhero="#FFFFFF",tic="#FFD23F",ontic="#1B1B1B",danger="#B3261E",dangerbg="#FFD9D2",dangertx="#7F1710",warnbg="#FFE79A",warntx="#4F3200",focus="#0B5A8A",navact="#2F1A78")),
 dark=vars_(dict(bg="#14111F",surf="#1F1A2E",surf2="#2B2440",line="#F5F0FF33",tx="#F5F0FF",tx2="#C9BFE6",pri="#B79CFF",onpri="#1B0F44",prisoft="#35296B",onprisoft="#E6DCFF",hero="#4A28B0",onhero="#FFFFFF",tic="#FFD23F",ontic="#1B1B1B",danger="#FF9D92",dangerbg="#4A1D18",dangertx="#FFD6D1",warnbg="#3B2C08",warntx="#F5D08A",focus="#8CC8F0",navact="#E6DCFF")))
for d, f in ((A,"a-savanna-editorial"),(B,"b-civic-clear"),(C,"c-bright-voices")):
    open(f"{f}.html","w").write(page(d))
print("ok")
