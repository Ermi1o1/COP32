"""Generate the SYNTHETIC sample dataset for spikes (50 sessions, 20 speakers, 30 POIs, 10 articles, 5 alerts).
Nothing here is real COP32 content. Amharic strings are assembled from a small vocabulary and are
UNVERIFIED by a native speaker (flagged in docs/architecture/spike-results/)."""
import json, random
random.seed(32)
# (EN, AM) theme vocabulary -- AM unverified
THEMES=[("Climate finance","የአየር ንብረት ፋይናንስ"),("Adaptation","መላመድ"),("Energy","ኃይል"),("Water","ውሃ"),
("Agriculture","ግብርና"),("Youth","ወጣቶች"),("Health","ጤና"),("Education","ትምህርት"),("Forests","ደን"),("Cities","ከተሞች")]
KINDS=[("Panel","ውይይት"),("Workshop","ወርክሾፕ"),("Side event","ጎን ለጎን ዝግጅት"),("Briefing","መግለጫ"),("Showcase","ኤግዚቢሽን")]
ROOMS=["Hall A","Hall B","Room 101","Room 102","Pavilion 3","Green Zone Stage"]
sessions=[]
for i in range(50):
    t=THEMES[i%len(THEMES)]; k=KINDS[(i//2)%len(KINDS)]
    day=1+i%5; h=9+(i%8)
    sessions.append(dict(id=f"S{i+1:03d}",title_en=f"{k[0]}: {t[0]} in Africa (sample {i+1})",
      title_am=f"{k[1]}፦ {t[1]} በአፍሪካ (ናሙና {i+1})",day=f"2027-10-{day+10:02d}",start=f"{h:02d}:00",end=f"{h+1:02d}:00",
      room=ROOMS[i%len(ROOMS)],open_to_public=(i%3!=0),theme=t[0],
      body_am="የአየር ንብረት ለውጥ ጉባኤ ፕሮግራም አዲስ አበባ ኢትዮጵያ። "+t[1]+"።",
      body_en=f"Synthetic description about {t[0].lower()}."))
# homophone-variant records for S3 (ሀ/ሐ/ኀ, ሰ/ሠ, አ/ዐ, ጸ/ፀ)
sessions[0]["title_am"]="ሃይል ጉባኤ ናሙና"; sessions[1]["title_am"]="ኃይል ጉባኤ ናሙና"; sessions[2]["title_am"]="ሰላም ጉባኤ ናሙና"; sessions[3]["title_am"]="ሠላም ጉባኤ ናሙና"
sessions[4]["title_am"]="አዲስ አበባ ጉብኝት"; sessions[5]["title_am"]="ዐዲስ ዐበባ ጉብኝት"; sessions[6]["title_am"]="ጸሐይ ኃይል"; sessions[7]["title_am"]="ፀሐይ ኃይል"
first=["Almaz","Bekele","Chala","Dawit","Eden","Fikru","Genet","Hana","Ibrahim","Jemal","Kebede","Liya","Meron","Nardos","Omar","Selam","Tigist","Urael","Yared","Zeritu"]
speakers=[dict(id=f"P{i+1:02d}",name=f"{n} Sample",org=f"Sample Org {i%6+1}",bio_en="Synthetic bio.") for i,n in enumerate(first)]
CATS=["hotel","hospital","embassy","atm","transport","attraction","cafe"]
POI=[("Bole Airport",8.9779,38.7993),("Meskel Square",9.0107,38.7612),("National Museum",9.0300,38.7620),("Addis Ababa University",9.0386,38.7629),
("Merkato",9.0350,38.7360),("Entoto Park",9.0870,38.7650),("Unity Park",9.0150,38.7570),("Lideta Station",9.0090,38.7370),("Bole Medhanialem",8.9960,38.7850),("Piassa",9.0360,38.7500)]
pois=[]
for i in range(30):
    b=POI[i%10]; pois.append(dict(id=f"POI{i+1:02d}",name=f"{b[0]} (sample {i//10+1})",cat=CATS[i%7],lat=round(b[1]+(i//10)*0.004,5),lon=round(b[2]+(i//10)*0.004,5)))
articles=[dict(id=f"A{i+1:02d}",title_en=f"Sample guide {i+1}",title_am=f"ናሙና መመሪያ {i+1}",body_en=("Synthetic long text. "*80),body_am=("የአየር ንብረት ለውጥ ጉባኤ። "*60)) for i in range(10)]
alerts=[dict(id=f"AL{i+1}",severity=["info","warning","critical","info","warning"][i],msg_en=f"Sample alert {i+1}: schedule change",msg_am=f"ናሙና ማሳሰቢያ {i+1}፦ የፕሮግራም ለውጥ") for i in range(5)]
json.dump(dict(sessions=sessions,speakers=speakers,pois=pois,articles=articles,alerts=alerts),open("sample.json","w"),ensure_ascii=False,indent=1)
print({k:len(v) for k,v in json.load(open("sample.json")).items()})
