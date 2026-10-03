"""Single source for design tokens. Run: python3 build_tokens.py -> writes tokens.json and prints/validates WCAG contrast.
Original, neutral palette (NOT an official COP32/UNFCCC identity; D1/D3)."""
import json, sys
def lum(h):
    h=h.lstrip('#'); c=[int(h[i:i+2],16)/255 for i in (0,2,4)]
    c=[x/12.92 if x<=0.03928 else ((x+0.055)/1.055)**2.4 for x in c]; return .2126*c[0]+.7152*c[1]+.0722*c[2]
def cr(a,b):
    la,lb=sorted((lum(a),lum(b)),reverse=True); return (la+.05)/(lb+.05)
COLOR = {  # v0.2 "Highland Mist" (D53). Teal is the only tint; lime (accent) is reserved for the single primary action.
 "light": {"bg":"#F2F6F4","surface":"#FFFFFF","surfaceAlt":"#E6EDEA","border":"#76858F","divider":"#D9E3DF",
   "text":"#0E1B1A","textSecondary":"#4C5B58","textTertiary":"#5F6E6B","primary":"#155E63","onPrimary":"#FFFFFF","primarySoft":"#D9EEEA","onPrimarySoft":"#0E4549",
   "accent":"#9BE15D","onAccent":"#0F2A00","sunset":"#E8862A","heroFrom":"#135A5E","heroTo":"#0D474C","onHero":"#FFFFFF","heroKicker":"#9BE15D","link":"#155E63",
   "info":"#0B5A8A","infoBg":"#DCEBF5","success":"#2C6610","successBg":"#E6F4D7","warning":"#7A3A0E","warningBg":"#FFF1E3","danger":"#B3261E","dangerBg":"#FDE6E1","onDanger":"#FFFFFF","focus":"#155E63","star":"#B57A00",
   "bar":"rgba(247,250,249,.82)","fill":"rgba(118,138,134,.13)","separator":"rgba(60,80,76,.18)"},
 "dark": {"bg":"#000000","surface":"#141B1B","surfaceAlt":"#1E2828","border":"#7F908C","divider":"#263232",
   "text":"#EEF5F3","textSecondary":"#A3B2AF","textTertiary":"#8C9B98","primary":"#5FC2BE","onPrimary":"#04211F","primarySoft":"#123536","onPrimarySoft":"#BFE9E6",
   "accent":"#9BE15D","onAccent":"#0F2A00","sunset":"#F2A04E","heroFrom":"#18595C","heroTo":"#0A3538","onHero":"#FFFFFF","heroKicker":"#9BE15D","link":"#7AD3CF",
   "info":"#8CC8F0","infoBg":"#16303F","success":"#A6E26B","successBg":"#1D3311","warning":"#F8C99A","warningBg":"#2E1F10","danger":"#FF9D92","dangerBg":"#3A1A16","onDanger":"#2B0A06","focus":"#7AD3CF","star":"#F2B33D",
   "bar":"rgba(16,22,22,.78)","fill":"rgba(160,190,185,.15)","separator":"rgba(160,190,185,.2)"}}
# (foreground, background, minimum ratio, rule)
PAIRS = [("text","bg",4.5,"body text"),("text","surface",4.5,"body text on card"),("textSecondary","bg",4.5,"secondary text"),("textSecondary","surface",4.5,"secondary text on card"),
 ("textSecondary","surfaceAlt",4.5,"secondary text on alt surface"),("text","surfaceAlt",4.5,"text on alt surface"),
 ("onPrimary","primary",4.5,"primary button text"),("onPrimarySoft","primarySoft",4.5,"selected chip/tab text"),("onAccent","accent",4.5,"accent button text"),
 ("primary","bg",4.5,"primary-coloured text/icon on bg"),("primary","surface",4.5,"primary text on card"),("link","bg",4.5,"links"),("link","surface",4.5,"links on card"),
 ("info","infoBg",4.5,"info banner"),("success","successBg",4.5,"success banner"),("warning","warningBg",4.5,"warning banner"),("danger","dangerBg",4.5,"danger/alert banner"),("onDanger","danger",4.5,"danger button text"),
 ("border","bg",3.0,"input/control border (non-text 3:1)"),("border","surface",3.0,"control border on card"),("focus","bg",3.0,"focus ring on bg"),("focus","surface",3.0,"focus ring on card"),
 ("primary","primarySoft",3.0,"icon on selected state (non-text)"),
 ("onAccent","accent",4.5,"primary-action (lime) button text"),("onHero","heroFrom",4.5,"hero text (top)"),("onHero","heroTo",4.5,"hero text (bottom)"),("heroKicker","heroTo",4.5,"hero kicker"),("heroKicker","heroFrom",4.5,"hero kicker (top)"),
 ("textTertiary","surface",4.5,"tertiary text on card"),("textTertiary","bg",4.5,"tertiary text on bg"),("star","surface",3.0,"saved star (non-text)"),("textSecondary","primarySoft",4.5,"secondary text on soft tint")]
TYPE = {"fontFamily":{"body":"'Atkinson Hyperlegible Next', 'Noto Sans Ethiopic', system-ui, sans-serif","ethiopic":"'Noto Sans Ethiopic', sans-serif",
  "note":"v0.2 (D53): Atkinson Hyperlegible Next (OFL, variable 200–800, Latin ≈34 KB woff2) for Latin; Noto Sans Ethiopic (bundled subset) renders all Ge'ez text via unicode-range fallback (D11, D49). Native iOS may swap Latin to the system font after review."},
 "scale":{ # iOS-Dynamic-Type-aligned; size px at 100%, line-height ratio EN, ratio AM, weight
  "largeTitle":[34,1.2,1.4,800],"title1":[28,1.2,1.4,800],"title2":[24,1.2,1.4,800],"title3":[20,1.25,1.45,800],"headline":[17,1.3,1.6,600],"body":[17,1.35,1.65,400],
  "callout":[16,1.35,1.6,400],"subhead":[15,1.35,1.6,400],"footnote":[13,1.35,1.55,400],"caption":[12,1.35,1.55,600]},
 "weights":{"regular":400,"medium":500,"semibold":600,"bold":700,"heavy":800},"minBodySize":16,"maxTextScale":2.0,"tracking":{"largeTitle":-0.022,"title":-0.015,"body":-0.005,"eyebrow":0.04},
 "amharicNote":"Ge'ez glyphs are dense: use the AM line-height ratio and never go below 14px for AM running text (to validate on A1/A2 devices)."}
SPACE=[0,2,4,8,12,16,20,24,32,40,48,64]
tokens={"meta":{"name":"COP32 companion — Highland Mist design tokens","status":"v0.2 (2026-10-03, D53). Original palette inspired by founder references; not an official COP32/UNFCCC identity; no COP32 logo/wordmark used.","units":"px (dp/pt equivalent)"},
 "color":COLOR,"typography":TYPE,"space":SPACE,
 "radius":{"sm":9,"md":14,"lg":22,"sheet":14,"device":42,"pill":999},"elevation":{"0":"none","1":"0 1px 2px rgba(10,40,40,.06)","2":"0 10px 24px -14px rgba(12,70,75,.55)","sheet":"0 -8px 30px rgba(0,0,0,.18)"},"material":{"blur":20,"saturate":1.8},
 "motion":{"fast":150,"base":200,"slow":420,"easing":"cubic-bezier(.2,.9,.25,1)","spring":"cubic-bezier(.3,1.5,.5,1)","pressScale":0.97,"reducedMotion":"disable non-essential motion; durations 0"},
 "layout":{"minTarget":48,"minTargetWeb":44,"minTargetAbsolute":24,"gutter":16,"maxContentWidth":720,"tabBarHeight":64,"listRowMin":48,"listInset":58,"breakpoints":{"phone":0,"tablet":600,"desktop":960}},
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
