import json, os
from normalise import fold
D = json.load(open(os.path.join(os.path.dirname(__file__), "../data/sample.json")))
# AM names / aliases for POIs: machine-drafted, UNVERIFIED by a native speaker
POI_AM = {"Bole Airport":("ቦሌ አውሮፕላን ማረፊያ","Bole"),"Meskel Square":("መስቀል አደባባይ","Mesqel Meskel"),"National Museum":("ብሔራዊ ሙዚየም",""),
 "Addis Ababa University":("አዲስ አበባ ዩኒቨርሲቲ","AAU"),"Merkato":("መርካቶ","Mercato"),"Entoto Park":("እንጦጦ ፓርክ","Entoto"),"Unity Park":("አንድነት ፓርክ",""),
 "Lideta Station":("ልደታ ጣቢያ","Lidetta"),"Bole Medhanialem":("ቦሌ መድኃኔዓለም","Bole"),"Piassa":("ፒያሳ","Piazza Arada")}
def docs():
    out = []
    for s in D["sessions"]:
        out.append(dict(id=s["id"], type="session", title_en=s["title_en"], title_am=s["title_am"], alias="", body=s["body_en"]+" "+s["body_am"]+" "+s["room"]))
    for p in D["speakers"]:
        out.append(dict(id=p["id"], type="speaker", title_en=p["name"], title_am="", alias="", body=p["org"]+" "+p["bio_en"]))
    for p in D["pois"]:
        base = p["name"].rsplit(" (sample",1)[0]; am, al = POI_AM[base]
        out.append(dict(id=p["id"], type="poi", title_en=p["name"], title_am=am, alias=al, body=p["cat"]))
    for a in D["articles"]:
        out.append(dict(id=a["id"], type="article", title_en=a["title_en"], title_am=a["title_am"], alias="", body=a["body_en"][:200]+" "+a["body_am"][:200]))
    for a in D["alerts"]:
        out.append(dict(id=a["id"], type="alert", title_en=a["msg_en"], title_am=a["msg_am"], alias="", body=a["severity"]))
    return out
