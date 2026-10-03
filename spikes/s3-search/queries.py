"""Hand-built query set (>=60). Gold = ids a person would accept. Homophone/numeral/typo/translit gold is
specified by hand from the generator; prefix/multiword gold uses simple raw-text predicates (see build())."""
from corpus import docs, D
import re
DOCS = docs(); S = {d["id"]: d for d in DOCS}
def ids(pred): return {d["id"] for d in DOCS if pred(d)}
def tokens(d): return re.findall(r"\w+", (d["title_en"]+" "+d["title_am"]+" "+d["alias"]+" "+d["body"]).lower())
def prefix_gold(q): return ids(lambda d: any(t.startswith(q.lower()) for t in tokens(d)))
def build():
    Q = []
    def add(cat, q, gold): Q.append(dict(cat=cat, q=q, gold=set(gold)))
    for i in ("S010","S021","S033","S040","S047"): add("exact-EN", S[i]["title_en"], [i])
    add("exact-EN", "Almaz Sample", ["P01"])
    for i in ("S012","S020","S030","S041","S046","S049"): add("exact-AM", S[i]["title_am"], [i])
    for q in ("Worksh","Showcas","Briefi","Agricult","Adaptat"): add("prefix", q, prefix_gold(q))
    for q in ("ፕሮግራ","ግብር","ወጣቶ"): add("prefix", q, prefix_gold(q))
    add("homophone","ሃይል ጉባኤ ናሙና",["S001","S002"]); add("homophone","ኃይል ጉባኤ ናሙና",["S001","S002"])
    add("homophone","ሰላም ጉባኤ ናሙና",["S003","S004"]); add("homophone","ሠላም ጉባኤ ናሙና",["S003","S004"])
    add("homophone","አዲስ አበባ ጉብኝት",["S005","S006"]); add("homophone","ዐዲስ ዐበባ ጉብኝት",["S005","S006"])
    add("homophone","ጸሐይ ኃይል",["S007","S008"]); add("homophone","ፀሐይ ኃይል",["S007","S008"])
    pw = lambda *w: ids(lambda d: any(x in tokens(d) for x in w))
    add("homophone-1tok","ሃይል",pw("ሃይል","ኃይል")); add("homophone-1tok","ኃይል",pw("ሃይል","ኃይል"))
    add("homophone-1tok","ሰላም",pw("ሰላም","ሠላም")); add("homophone-1tok","ሠላም",pw("ሰላም","ሠላም"))
    add("homophone-1tok","ጸሐይ",pw("ጸሐይ","ፀሐይ")); add("homophone-1tok","ፀሐይ",pw("ጸሐይ","ፀሐይ"))
    bole = ids(lambda d: d["type"]=="poi" and "Bole" in d["title_en"])
    add("name-translit","Bole",bole); add("name-translit","ቦሌ",bole)
    mesk = ids(lambda d: d["type"]=="poi" and "Meskel" in d["title_en"]); add("name-translit","Meskel",mesk); add("name-translit","መስቀል",mesk); add("name-translit","Mesqel Square",mesk)
    merk = ids(lambda d: d["type"]=="poi" and "Merkato" in d["title_en"]); add("name-translit","Mercato",merk); add("name-translit","መርካቶ",merk)
    add("name-translit","Piazza",ids(lambda d: d["type"]=="poi" and "Piassa" in d["title_en"]))
    add("typo","Merkatto",merk); add("typo","Meskal Square",mesk)
    uni = ids(lambda d: d["type"]=="poi" and "Unity" in d["title_en"]); add("typo","Unitiy Park",uni)
    ent = ids(lambda d: d["type"]=="poi" and "Entoto" in d["title_en"]); add("typo","Entotto",ent)
    nm = ids(lambda d: d["type"]=="poi" and "National" in d["title_en"]); add("typo","Nacional Museum",nm)
    aau = ids(lambda d: d["type"]=="poi" and "University" in d["title_en"]); add("typo","Adis Ababa University",aau)
    for th,am in (("Energy","ኃይል"),("Water","ውሃ"),("Youth","ወጣቶች"),("Health","ጤና")):
        add("mixed-script", f"{th} {am}", ids(lambda d,th=th: d["type"]=="session" and th in d["title_en"]))
    add("numerals","sample ፲",["S010"]); add("numerals","sample ፳፭",["S025"]); add("numerals","ናሙና ፴",["S030"]); add("numerals","sample ፵",["S040"])
    add("short","ደን",ids(lambda d: d["type"]=="session" and "ደን" in tokens(d)))
    add("short","ጤና",ids(lambda d: d["type"]=="session" and "ጤና" in tokens(d)))
    add("short","ውሃ",ids(lambda d: d["type"]=="session" and "ውሃ" in tokens(d)))
    add("short","Youth",ids(lambda d: d["type"]=="session" and "Youth" in d["title_en"]))
    add("multiword","energy workshop",ids(lambda d: d["type"]=="session" and d["title_en"].startswith("Workshop") and "Energy" in d["title_en"]))
    add("multiword","youth side event",ids(lambda d: d["type"]=="session" and d["title_en"].startswith("Side event") and "Youth" in d["title_en"]))
    add("multiword","forests showcase",ids(lambda d: d["type"]=="session" and d["title_en"].startswith("Showcase") and "Forests" in d["title_en"]))
    add("multiword","health briefing",ids(lambda d: d["type"]=="session" and d["title_en"].startswith("Briefing") and "Health" in d["title_en"]))
    for n,i in (("Selam","P16"),("Tigist","P17"),("Yared","P19"),("Meron","P13")): add("speaker",n,[i])
    return [q for q in Q if q["gold"]]
if __name__ == "__main__":
    Q = build(); print(len(Q), "queries"); 
    from collections import Counter; print(Counter(q["cat"] for q in Q)); print([q["q"] for q in Q if len(q["gold"])==0])
