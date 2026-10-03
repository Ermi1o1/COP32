"""Single source for design tokens. Run: python3 build_tokens.py -> writes tokens.json and prints/validates WCAG contrast.
Original, neutral palette (NOT an official COP32/UNFCCC identity; D1/D3)."""
import json, sys
def lum(h):
    h=h.lstrip('#'); c=[int(h[i:i+2],16)/255 for i in (0,2,4)]
    c=[x/12.92 if x<=0.03928 else ((x+0.055)/1.055)**2.4 for x in c]; return .2126*c[0]+.7152*c[1]+.0722*c[2]
def cr(a,b):
    la,lb=sorted((lum(a),lum(b)),reverse=True); return (la+.05)/(lb+.05)
COLOR = {
 "light": {"bg":"#FBF8F2","surface":"#FFFFFF","surfaceAlt":"#F0EBE0","border":"#8A8578","divider":"#DDD6C8",
   "text":"#1D221E","textSecondary":"#4A514B","primary":"#0F5C4D","onPrimary":"#FFFFFF","primarySoft":"#D6EBE4","onPrimarySoft":"#0A3F34",
   "accent":"#8F4A00","onAccent":"#FFFFFF","link":"#0B5A8A",
   "info":"#0B5A8A","infoBg":"#DCEBF5","success":"#1B6630","successBg":"#DDF0E1","warning":"#6E4300","warningBg":"#FFEFC9","danger":"#A3261B","dangerBg":"#FBE0DC","onDanger":"#FFFFFF","focus":"#0B5A8A"},
 "dark": {"bg":"#111512","surface":"#1A201B","surfaceAlt":"#232A24","border":"#8C968B","divider":"#2F382F",
   "text":"#EDF0E8","textSecondary":"#B7C0B4","primary":"#6FCDB2","onPrimary":"#06231C","primarySoft":"#1D3A32","onPrimarySoft":"#BFEBDD",
   "accent":"#F0A860","onAccent":"#2B1700","link":"#8CC8F0",
   "info":"#8CC8F0","infoBg":"#16303F","success":"#8FD39F","successBg":"#17301D","warning":"#F5C970","warningBg":"#382A0A","danger":"#FF9D92","dangerBg":"#3E1B17","onDanger":"#2B0A06","focus":"#8CC8F0"}}
# (foreground, background, minimum ratio, rule)
PAIRS = [("text","bg",4.5,"body text"),("text","surface",4.5,"body text on card"),("textSecondary","bg",4.5,"secondary text"),("textSecondary","surface",4.5,"secondary text on card"),
 ("textSecondary","surfaceAlt",4.5,"secondary text on alt surface"),("text","surfaceAlt",4.5,"text on alt surface"),
 ("onPrimary","primary",4.5,"primary button text"),("onPrimarySoft","primarySoft",4.5,"selected chip/tab text"),("onAccent","accent",4.5,"accent button text"),
 ("primary","bg",4.5,"primary-coloured text/icon on bg"),("primary","surface",4.5,"primary text on card"),("link","bg",4.5,"links"),("link","surface",4.5,"links on card"),
 ("info","infoBg",4.5,"info banner"),("success","successBg",4.5,"success banner"),("warning","warningBg",4.5,"warning banner"),("danger","dangerBg",4.5,"danger/alert banner"),("onDanger","danger",4.5,"danger button text"),
 ("border","bg",3.0,"input/control border (non-text 3:1)"),("border","surface",3.0,"control border on card"),("focus","bg",3.0,"focus ring on bg"),("focus","surface",3.0,"focus ring on card"),
 ("primary","primarySoft",3.0,"icon on selected state (non-text)")]
TYPE = {"fontFamily":{"body":"'Noto Sans Ethiopic', system-ui, sans-serif","note":"One bundled variable font covers Ethiopic + Latin; no OS fallback relied upon (D11, D49)"},
 "scale":{ # size px (at 100%), line-height ratio EN, ratio AM
  "display":[28,1.25,1.45],"title":[22,1.3,1.5],"heading":[18,1.35,1.55],"body":[16,1.5,1.7],"bodySmall":[14,1.5,1.7],"label":[14,1.3,1.5],"caption":[12,1.4,1.6]},
 "weights":{"regular":400,"medium":500,"semibold":600,"bold":700},"minBodySize":16,"maxTextScale":2.0,
 "amharicNote":"Ge'ez glyphs are dense: use the AM line-height ratio and never go below 14px for AM running text (to validate on A1/A2 devices)."}
SPACE=[0,2,4,8,12,16,20,24,32,40,48,64]
tokens={"meta":{"name":"COP32 companion — neutral design tokens","status":"Proposed v0.1 (2026-10-03). Original palette; not an official COP32/UNFCCC identity.","units":"px (dp/pt equivalent)"},
 "color":COLOR,"typography":TYPE,"space":SPACE,
 "radius":{"sm":6,"md":12,"lg":20,"pill":999},"elevation":{"0":"none","1":"0 1px 2px rgba(0,0,0,.12)","2":"0 4px 12px rgba(0,0,0,.16)"},
 "motion":{"fast":120,"base":200,"slow":320,"easing":"cubic-bezier(.2,0,0,1)","reducedMotion":"disable non-essential motion; durations 0"},
 "layout":{"minTarget":48,"minTargetWeb":44,"minTargetAbsolute":24,"gutter":16,"maxContentWidth":720,"tabBarHeight":64,"breakpoints":{"phone":0,"tablet":600,"desktop":960}},
 "focus":{"width":3,"offset":2,"style":"solid"}}
if __name__=="__main__":
    bad=0; rows=[]
    for mode,c in COLOR.items():
        for f,b,m,r in PAIRS:
            v=cr(c[f],c[b]); ok=v>=m; bad+=not ok; rows.append((mode,f,b,v,m,ok,r))
    if "--table" in sys.argv:
        print("| Mode | Foreground on background | Ratio | Needs | Use |\n|---|---|---|---|---|")
        for m,f,b,v,mn,ok,r in rows: print(f"| {m} | `{f}` {COLOR[m][f]} on `{b}` {COLOR[m][b]} | {v:.2f}:1 | {mn}:1 {'✔' if ok else '✘'} | {r} |")
    else:
        for m,f,b,v,mn,ok,r in rows:
            if not ok: print("FAIL",m,f,b,round(v,2),mn)
    tokens["contrastChecks"]=[dict(mode=m,fg=f,bg=b,ratio=round(v,2),min=mn,pass_=ok,use=r) for m,f,b,v,mn,ok,r in rows]
    json.dump(tokens,open("tokens.json","w"),indent=1,ensure_ascii=False)
    print("failures:",bad,"of",len(rows),file=sys.stderr)
