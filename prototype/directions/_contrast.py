import re,glob
def lum(h):
    h=h.lstrip('#'); h=h if len(h)>=6 else ''.join(x*2 for x in h)
    c=[int(h[i:i+2],16)/255 for i in (0,2,4)]
    c=[x/12.92 if x<=.03928 else ((x+.055)/1.055)**2.4 for x in c];return .2126*c[0]+.7152*c[1]+.0722*c[2]
def cr(a,b):
    x,y=sorted([lum(a),lum(b)],reverse=True);return (x+.05)/(y+.05)
pairs=[("tx","bg"),("tx2","bg"),("tx2","surf"),("tx2","surf2"),("onpri","pri"),("onprisoft","prisoft"),("onhero","hero"),("dangertx","dangerbg"),("warntx","warnbg"),("ontic","tic"),("navact","surf")]
for f in sorted(glob.glob('[abc]-*.html')):
    t=open(f).read(); rx=r'--(\w+):(#[0-9A-Fa-f]{3,8})'
    L=dict(re.findall(rx,re.search(r':root\{(--bg.*?)--hf',t).group(1)))
    D=dict(re.findall(rx,re.search(r':root\[data-theme=dark\]\{([^}]*)\}',t).group(1)))
    for n,m in (("light",L),("dark",D)):
        r=[(a,b,round(cr(m[a],m[b]),2)) for a,b in pairs]; bad=[x for x in r if x[2]<4.5]
        print(f[:1].upper(),n,"min",min(x[2] for x in r),"FAIL "+str(bad) if bad else "all >=4.5:1")
