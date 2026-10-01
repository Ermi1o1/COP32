# Scores: UV,SV,CR,FE,TI,R,DP,SC (1-3, 3 = best)
W=dict(UV=3,SV=2,CR=2,FE=2,TI=1,R=1,DP=2,SC=1)
F=[
("INF-01","COP32 overview",(3,3,3,3,3,3,3,3)),
("INF-02","\"Can I attend?\" guide",(3,3,3,3,3,2,2,3)),
("INF-03","Programme / schedule",(3,3,3,2,2,2,2,3)),
("INF-04","Session detail pages",(3,3,3,2,2,3,1,3)),
("INF-05","Speakers directory",(2,2,3,3,3,3,1,3)),
("INF-06","Exhibitors & pavilions directory",(2,2,3,3,3,3,1,3)),
("INF-07","Side-events directory",(3,3,3,2,2,2,2,3)),
("INF-08","Partners & sponsors directory",(1,2,1,3,3,2,3,3)),
("INF-09","News & announcements",(3,3,3,3,3,2,3,3)),
("INF-10","Verified-source labels",(3,3,3,3,3,3,3,3)),
("INF-11","Documents & resources (links)",(2,2,3,3,3,3,2,3)),
("INF-12","FAQs",(3,3,3,3,3,3,3,3)),
("INF-13","Glossary / jargon buster",(2,2,3,3,3,3,3,3)),
("INF-14","Thematic days & topics",(2,1,3,3,3,3,2,3)),
("INF-15","Countdown & key dates",(2,3,3,3,3,3,2,3)),
("INF-16","Global search (Ge'ez-aware)",(3,2,2,2,2,3,3,3)),
("PER-01","Guest mode (no account needed)",(3,3,2,3,3,3,3,3)),
("PER-02","Optional profile",(2,2,1,2,2,2,3,3)),
("PER-03","Language switch EN/AM",(3,3,3,3,3,3,3,3)),
("PER-04","Time-zone setting",(3,2,3,3,3,3,3,3)),
("PER-05","Personal agenda + calendar export",(3,3,2,3,3,3,3,3)),
("PER-06","Favourites",(2,1,1,3,3,3,3,3)),
("PER-07","Reminders",(3,2,2,3,3,3,3,3)),
("PER-08","Follow topics",(2,1,2,3,2,3,3,3)),
("PER-09","Role selection",(2,3,2,3,3,3,3,3)),
("PER-10","Rules-based recommendations",(2,1,1,2,2,2,3,3)),
("PER-11","Self-guided itineraries",(2,3,3,2,3,3,2,3)),
("PER-12","Cross-device sync",(1,1,1,2,2,2,3,3)),
("NAV-01","Venue maps",(3,3,3,2,2,3,1,3)),
("NAV-02","Session-to-map link",(3,2,2,3,3,3,2,3)),
("NAV-03","City map & points of interest",(3,3,3,2,2,3,2,3)),
("NAV-04","Directions hand-off to map apps",(3,2,2,3,3,3,2,3)),
("NAV-05","Transport guide",(3,3,3,3,3,3,2,3)),
("NAV-06","Road closures & traffic alerts",(3,3,3,2,2,2,1,3)),
("NAV-07","Accommodation guide",(3,3,3,3,3,2,2,3)),
("NAV-08","Arrival checklist",(3,3,3,3,3,3,3,3)),
("NAV-09","Accessibility info (venues)",(3,3,3,2,2,3,1,3)),
("NAV-10","Indoor turn-by-turn wayfinding",(2,2,2,1,1,2,1,2)),
("NAV-11","Queue / wait-time & capacity info",(3,3,3,1,1,2,1,2)),
("NAV-12","Slot booking for popular spaces",(2,2,2,1,1,1,1,2)),
("NAV-13","Offline city & venue pack",(3,3,2,2,2,3,3,3)),
("NAV-14","Safety & emergency info",(3,3,3,3,3,3,2,3)),
("ENG-01","Session Q&A",(2,2,2,2,2,1,1,3)),
("ENG-02","Live polls",(2,2,2,2,2,2,2,3)),
("ENG-03","Surveys / feedback",(2,2,1,3,3,3,3,3)),
("ENG-04","Reactions",(1,1,1,3,3,2,3,3)),
("ENG-05","Comments / discussions",(1,1,1,2,2,1,3,2)),
("ENG-06","Stamp rally / challenges",(2,2,2,2,2,2,1,2)),
("ENG-07","Personal climate pledges",(1,1,3,3,3,2,3,3)),
("ENG-08","Quizzes / learning paths",(1,2,2,2,2,3,3,3)),
("ENG-09","Share cards",(2,3,2,3,3,3,3,3)),
("ENG-10","Photo wall / user content",(1,1,1,2,2,1,3,2)),
("NET-01","Opt-in professional profile",(2,1,1,2,2,2,3,3)),
("NET-02","Participant discovery",(2,1,1,2,2,1,3,2)),
("NET-03","QR contact exchange",(2,1,1,3,3,2,3,3)),
("NET-04","Messaging",(2,1,1,1,1,1,3,2)),
("NET-05","Meeting requests",(2,1,1,2,2,2,3,2)),
("NET-06","AI matchmaking",(1,1,1,1,1,1,3,2)),
("NET-07","Networking events listing",(2,2,2,3,3,3,1,3)),
("NET-08","Community groups",(1,1,1,1,1,1,3,2)),
("MED-01","Live stream links/embeds",(3,3,3,3,3,2,1,3)),
("MED-02","On-demand recordings",(2,2,3,3,3,2,1,3)),
("MED-03","Captions & transcripts",(2,2,2,2,2,2,1,3)),
("MED-04","Daily digest (EN/AM)",(3,3,3,3,2,2,3,3)),
("MED-05","Plain-language explainers",(3,3,3,3,2,3,3,3)),
("MED-06","Amharic audio content",(2,2,2,2,2,3,3,3)),
("MED-07","Photo/video galleries",(1,2,2,3,3,2,1,3)),
("MED-08","Press centre section",(3,3,3,3,3,3,2,3)),
("MED-09","Press releases EN/AM",(2,2,3,3,3,2,1,3)),
("MED-10","AI-assisted summaries (editor-reviewed)",(2,2,2,2,2,1,3,3)),
("EXH-01","Exhibitor/pavilion pages",(2,2,3,3,3,3,1,3)),
("EXH-02","Organiser self-service portal",(3,3,3,1,1,2,2,3)),
("EXH-03","Change notifications to followers",(3,2,2,2,2,3,1,3)),
("EXH-04","Aggregate interest counts",(1,1,2,3,3,3,3,3)),
("EXH-05","Exhibition map",(2,2,3,2,2,3,1,3)),
("EXH-06","Exhibitor lead capture",(1,1,1,2,2,1,3,2)),
("EXH-07","Virtual booths",(1,1,1,1,1,1,3,1)),
("NOT-01","Schedule-change alerts",(3,3,3,2,2,3,1,3)),
("NOT-02","Session reminders (push)",(3,2,2,3,3,3,3,3)),
("NOT-03","Emergency / safety alerts",(3,3,3,2,2,2,1,3)),
("NOT-04","Announcements broadcast",(3,3,3,3,3,3,3,3)),
("NOT-05","Personalised topic alerts",(2,1,2,3,2,3,3,3)),
("NOT-06","Notification centre & controls",(3,2,2,3,3,3,3,3)),
("NOT-07","Email digest option",(2,1,2,3,3,2,3,3)),
("NOT-08","SMS / Telegram channel",(2,2,2,2,2,2,1,2)),
("PUB-01","Climate basics hub",(3,2,3,3,2,3,3,3)),
("PUB-02","COP explained",(3,3,3,3,3,3,3,3)),
("PUB-03","Africa & Ethiopia climate context",(3,3,3,3,3,3,3,3)),
("PUB-04","Key outcomes tracker",(3,3,3,2,2,2,2,3)),
("PUB-05","Commitments/pledges tracker",(2,3,3,1,1,1,1,3)),
("PUB-06","Initiatives directory",(2,2,3,3,3,2,1,3)),
("PUB-07","Green Legacy progress",(2,3,3,3,3,2,1,2)),
("PUB-08","Myth-busting / fact checks",(2,3,3,3,3,2,3,3)),
("PST-01","Recordings library",(2,2,2,3,2,2,1,3)),
("PST-02","Proceedings & reports",(2,2,2,3,3,3,1,3)),
("PST-03","Outcomes & follow-up",(2,3,3,3,2,2,2,3)),
("PST-04","Historical archive",(2,3,2,3,3,3,3,3)),
("PST-05","Community continuation",(1,1,1,2,2,1,3,2)),
("PST-06","Handover / reuse for next event",(2,3,1,2,2,3,3,3)),
("PST-07","Certificates of participation",(1,2,2,3,3,2,1,2)),
("TRU-01","Bilingual privacy notice",(3,3,3,3,3,3,3,3)),
("TRU-02","Minimal permissions",(3,3,2,3,3,3,3,3)),
("TRU-03","Delete / export my data",(2,3,2,2,2,3,3,3)),
("TRU-04","Unofficial-status disclaimer",(2,3,3,3,3,3,3,3)),
("TRU-05","Report content / abuse",(2,2,1,3,3,3,3,3)),
("TRU-06","Source verification workflow",(3,3,3,3,3,3,3,3)),
("TRU-07","Consent management",(2,3,2,2,2,3,3,3)),
("ACC-01","WCAG 2.1 AA baseline",(3,3,3,2,2,3,3,3)),
("ACC-02","Dynamic text size",(3,2,2,3,3,3,3,3)),
("ACC-03","Bundled Ethiopic font (D11)",(3,3,3,3,3,3,3,3)),
("ACC-04","Ethiopian calendar display",(1,2,3,3,3,2,3,3)),
("ACC-05","Accessibility statement",(2,3,2,3,3,3,3,3)),
("ACC-06","Additional languages",(2,2,2,1,1,2,2,3)),
("ACC-07","Low-data mode",(2,1,2,3,3,3,3,3)),
("ACC-08","Sign-language content",(2,2,2,1,1,2,1,2)),
("OPS-01","Volunteer mode",(2,3,3,2,2,3,1,3)),
("OPS-02","Offline volunteer FAQ",(2,3,3,3,3,3,2,3)),
("OPS-03","Report-issue button",(2,2,2,2,2,2,1,3)),
("OPS-04","Shift/task info",(1,2,2,2,2,2,1,2)),
("OPS-05","Operational broadcasts",(2,2,2,3,3,3,1,3)),
("ADM-01","Bilingual CMS",(3,3,3,2,2,3,3,3)),
("ADM-02","Approval workflow",(3,3,3,2,2,3,3,3)),
("ADM-03","Emergency publishing",(3,3,3,3,3,2,3,3)),
("ADM-04","Schedule import (feed or spreadsheet)",(3,3,3,2,2,2,2,3)),
("ADM-05","Notification console",(3,3,3,3,3,2,3,3)),
("ADM-06","Moderation queue",(2,1,1,3,3,3,3,3)),
("ADM-07","Privacy-respecting analytics",(2,3,2,3,3,3,3,3)),
("ADM-08","Multi-event setup UI (D5)",(1,3,1,2,2,3,3,3)),
("ADM-09","Audit log",(2,3,2,3,3,3,3,3)),
("ADM-10","Open data / public API",(1,2,1,2,2,2,3,3)),
("DEM-01","Demo dataset",(2,3,2,3,3,3,3,2)),
("DEM-02","Government dashboard mock",(1,3,2,3,3,3,3,2)),
("DEM-03","White-label theming",(1,3,2,3,3,3,3,3)),
("F-01","One-stop visitor hub (framing)",(3,3,3,2,2,2,2,3)),
("F-02","Hotel booking (link-out)",(3,3,3,3,3,2,2,3)),
("F-03","Flight booking (link-out)",(1,2,2,3,3,2,3,3)),
("F-04","Visa process (link to official e-visa)",(3,3,3,3,3,3,3,3)),
("F-05","Ride-hailing deep links",(3,3,3,3,3,2,2,3)),
("F-06a","Public transport routes & trip planner (open GTFS)",(3,3,3,2,2,2,2,3)),
("F-06b","Real-time transit tracker",(3,3,3,1,1,2,1,2)),
("F-07","Tourist attractions & must-visit places",(3,3,2,3,3,3,3,3)),
("F-08a","Coffee ceremony guide (content)",(2,3,2,3,3,3,3,3)),
("F-08b","'Where to experience it' coffee trail (neutral listing)",(2,3,2,2,2,2,2,3)),
("F-08c","Coffee passport (stamp rally)",(1,2,2,2,2,2,2,2)),
("F-08d","Coffee & climate story",(2,3,3,2,2,2,3,3)),
("F-08e","'Buna break' meet-ups",(2,2,2,2,2,1,2,2)),
("F-09","Light-rail digital ticket link",(2,2,2,3,3,2,2,3)),
("B-01","\"What's on near me now\" view",(2,3,3,2,2,3,2,3)),
("B-02","Amharic voice assistant",(2,2,2,1,1,1,3,2)),
("B-03","Regional climate stories (moderated UGC)",(2,2,3,1,2,1,3,2)),
("B-04","Trip carbon calculator",(1,1,2,2,2,1,2,2)),
("B-05","Ask-an-expert sessions",(2,2,2,2,2,2,2,2)),
("B-06","Media/research data packs",(2,2,2,3,3,3,2,3)),
("B-07","Classroom packs (Amharic)",(2,2,2,2,2,3,3,3)),
("B-08","Local business directory",(2,2,1,2,2,1,3,3)),
("B-09","Post-COP 'Addis Climate Hub' calendar",(2,3,1,2,2,2,2,3)),
]
FOUND={"PER-01","PER-03","PER-04","TRU-01","TRU-02","TRU-03","TRU-04","TRU-06","TRU-07","ACC-01","ACC-02","ACC-03","NOT-03","NOT-06","ADM-01","ADM-02","ADM-03","ADM-09"}
NR={"NET-06","EXH-07","B-02"}
LATER_OVR={"NOT-08","ACC-06"}
DEMO={"INF-01","INF-02","INF-03","INF-04","INF-09","INF-10","INF-12","PER-01","PER-03","PER-04","PER-05","PER-09","NAV-03","NAV-05","NAV-07","NAV-08","F-01","F-02","F-04","F-05","F-07","F-08a","PUB-02","PUB-03","MED-05","ACC-03","TRU-01","TRU-04","DEM-01","DEM-02","DEM-03","ADM-01"}
EVENT={"NAV-01","NAV-02","NAV-09","MED-01","PUB-04","INF-07","NOT-01","MED-08","NAV-14"}
POST={"PST-03","PST-04"}
def cls(i,t):
    if i in NR: return "Not recommended"
    if i in LATER_OVR: return "Later"
    if i in FOUND: return "Must"
    if t>=35: return "Must"
    if t>=30: return "Should"
    if t>=26: return "Could"
    return "Later"
def rel(i,c):
    if c!="Must":
        return {"Should":"Event (if capacity)","Could":"Post-event / if capacity","Later":"After COP32","Not recommended":"—"}[c]
    if i in DEMO: return "Demo (Dec 2026)"
    if i in POST: return "Post-event"
    if i in EVENT: return "Event (Oct 2027)"
    return "Pilot (Jun 2027)"
size={3:"S",2:"M",1:"L"}
rows=[];counts={}
for i,n,sc in F:
    t=sum(v*W[k] for v,k in zip(sc,W))
    c=cls(i,t); r=rel(i,c)
    flag="F" if i in FOUND else ("O" if i in NR|LATER_OVR else "")
    counts[c]=counts.get(c,0)+1
    rows.append((i,n,sc,t,c,r,size[sc[3]],flag))
order=["Must","Should","Could","Later","Not recommended"]
out=[]
for c in order:
    rs=[x for x in rows if x[4]==c]
    out.append(f"\n### {c} ({len(rs)})\n| ID | Feature | UV | SV | CR | FE | TI | R | DP | SC | Score /42 | Size | Release | Note |\n|---|---|---|---|---|---|---|---|---|---|---|---|---|---|")
    for i,n,sc,t,cc,r,sz,fl in sorted(rs,key=lambda x:-x[3]):
        note={"F":"Foundation override","O":"Override"}.get(fl,"")
        out.append(f"| {i} | {n} | "+" | ".join(map(str,sc))+f" | {t} | {sz} | {r} | {note} |")
open("/tmp/claude-0/-home-user-COP32/6d4437b3-3776-5d60-bffd-36a30a6e9b31/scratchpad/table.md","w").write("\n".join(out))
print(counts, len(rows))
from collections import Counter
print(Counter(x[5] for x in rows if x[4]=="Must"))
print(Counter(x[6] for x in rows if x[4]=="Must"))
