"""Generates tokens.css (from docs/design/tokens.json) and data.js (sample dataset + extra SAMPLE content).
Everything in data.js is SYNTHETIC and FICTIONAL: no real COP32 content exists officially (Phase 0 / D1).
People and organisations are invented; real Addis Ababa landmarks are used only as public place names."""
import json
T = json.load(open("../docs/design/tokens.json")); S = json.load(open("../spikes/data/sample.json"))
def vars_(c): return "\n".join(f"  --c-{k}: {v};" for k, v in c.items())
R, E, M, L = T['radius'], T['elevation'], T['motion'], T['layout']
css = f"""/* GENERATED from docs/design/tokens.json by build.py — do not edit */
:root {{
{vars_(T['color']['light'])}
  --r-sm: {R['sm']}px; --r-md: {R['md']}px; --r-lg: {R['lg']}px; --r-sheet: {R['sheet']}px;
  --e-1: {E['1']}; --e-2: {E['2']}; --e-sheet: {E['sheet']};
  --t-fast: {M['fast']}ms; --t-base: {M['base']}ms; --t-slow: {M['slow']}ms; --ease: {M['easing']}; --spring: {M['spring']};
  --target: {L['minTargetWeb']}px; --gutter: {L['gutter']}px; --row: {L['listRowMin']}px; --inset: {L['listInset']}px; --focus-w: {T['focus']['width']}px; --focus-o: {T['focus']['offset']}px;
  --blur: {T['material']['blur']}px; --sat: {T['material']['saturate']};
  {chr(10).join(f'--s-{i}: {v}px;' for i, v in enumerate(T['space']))}
}}
:root[data-theme="dark"] {{
{vars_(T['color']['dark'])}
  color-scheme: dark;
}}
@media (prefers-color-scheme: dark) {{ :root:not([data-theme="light"]) {{
{vars_(T['color']['dark'])}
  color-scheme: dark;
}} }}
"""
open("tokens.css", "w").write(css)

# ---------- fictional sample content (D53 redesign, Track D v2) ----------
TITLES = {
 "Climate finance": [("Panel","From pledges to delivery: tracing climate finance","How promised money can be followed from donor to village."),("Workshop","Grants, not loans: designing fair finance","Hands-on session on finance that does not add to debt."),("Briefing","Climate finance in 10 minutes","A plain-language briefing for first-time attendees."),("Showcase","Local banks financing solar farms","Three lenders share what worked and what did not."),("Side event","Insurance for smallholder farmers","Weather-index insurance pilots from the region.")],
 "Adaptation": [("Panel","Adapting cities to extreme heat","Planners compare shade, water and building codes."),("Workshop","Early-warning systems that reach everyone","Designing alerts for low-signal and low-literacy areas."),("Briefing","What the adaptation goal means","An explainer on the global goal on adaptation."),("Showcase","Terraces and water harvesting in the highlands","Farmer groups present a decade of results."),("Side event","Pastoralist voices on drought","Herders and researchers on living with drier seasons.")],
 "Energy": [("Panel","Clean cooking for every kitchen","Why smoke-free cooking matters for health and forests."),("Workshop","Mini-grids for rural towns","Planning, pricing and maintaining village power."),("Briefing","Green corridors explained","How cross-border power lines could share renewables."),("Showcase","Geothermal in the Rift Valley","Engineers present lessons from drilling sites."),("Side event","Women in renewable energy","Founders and technicians on building careers.")],
 "Water": [("Panel","Water security in the drylands","Managing scarce water between farms, towns and nature."),("Workshop","Mapping groundwater with communities","Low-cost tools for tracking wells and springs."),("Briefing","Rivers that cross borders","A short guide to shared water and cooperation."),("Showcase","Rainwater for schools","Student-built systems from three regions."),("Side event","Wetlands as natural sponges","Restoring wetlands to buffer floods and droughts.")],
 "Agriculture": [("Panel","Feeding a hotter world","Seeds, soils and markets under changing rain."),("Workshop","Climate-smart coffee","Shade-grown coffee and the farmers behind it."),("Briefing","Food systems and emissions","Where food emissions come from, in plain terms."),("Showcase","Teff and drought-tolerant grains","Breeders show new varieties in the field."),("Side event","Young farmers going digital","Apps and SMS tools for weather and prices.")],
 "Youth": [("Panel","Youth at the negotiating table","Young delegates on how to be heard."),("Workshop","Telling climate stories on your phone","A practical session on short video and audio."),("Briefing","Your first COP: a survival guide","Badges, zones and where to find help."),("Showcase","Student climate innovations","Ten teams, ten three-minute pitches."),("Side event","Climate jobs for the next generation","Employers and trainers on green skills.")],
 "Health": [("Panel","Heat, health and hospitals","Keeping clinics running during heatwaves."),("Workshop","Clean air in growing cities","Measuring and cutting air pollution."),("Briefing","Climate and disease in brief","How changing weather shifts disease patterns."),("Showcase","Solar power for rural clinics","Nurses and engineers share installations."),("Side event","Mental health and climate worry","Practical support for anxious communities.")],
 "Education": [("Panel","Teaching climate in every classroom","Curricula from primary school to university."),("Workshop","Making science easy to understand","Plain-language writing for researchers."),("Briefing","Where to learn more after COP","Free courses and resources to keep going."),("Showcase","School gardens for resilience","Students grow food and knowledge together."),("Side event","Indigenous knowledge and climate","Elders and scientists learning from each other.")],
 "Forests": [("Panel","Planting billions of trees: what lasts?","Survival rates, species choice and long-term care."),("Workshop","Measuring forest carbon honestly","Methods that communities can check themselves."),("Briefing","Forests and climate in five minutes","Why forests matter for rain and carbon."),("Showcase","Restoring highland forests","Nursery workers and rangers present their work."),("Side event","Church forests of the highlands","Small sacred forests as seed banks.")],
 "Cities": [("Panel","Light rail and the walkable city","Transport that cuts emissions and commutes."),("Workshop","Green roofs and cool streets","Simple design moves for hotter cities."),("Briefing","Cities and climate in brief","Why cities are at the centre of climate action."),("Showcase","Waste to value","Recycling and compost cooperatives on stage."),("Side event","Informal settlements and floods","Residents and planners on safer neighbourhoods.")]}
SPK = [("Dr. Almaz Tesfaye","Hydrologist","Highland Water Institute"),("Bekele Girma","Energy engineer","Rift Valley Power Lab"),("Chaltu Abdissa","Youth organiser","Green Campus Network"),("Dawit Haile","Urban planner","City Futures Studio"),
 ("Eden Mulugeta","Climate finance analyst","Savanna Finance Initiative"),("Fikru Desta","Coffee farmer","Highland Growers Union"),("Genet Alemu","Public health researcher","Clean Air Collective"),("Hana Yohannes","Science journalist","Plain Climate News"),
 ("Ibrahim Musa","Pastoralist leader","Drylands Herders Forum"),("Jemal Ahmed","Agronomist","Grain Futures Centre"),("Kebede Wolde","Forester","Church Forest Alliance"),("Liya Tekle","Teacher","Classroom Climate Project"),
 ("Meron Asfaw","Solar entrepreneur","SunHome Cooperative"),("Nardos Bekele","Wetlands ecologist","Rivers & Wetlands Trust"),("Omar Hassan","Insurance specialist","Farmers' Risk Fund"),("Selam Anbessa","Dryland water researcher","Arid Lands Lab"),
 ("Tigist Lemma","Transport engineer","Walkable City Lab"),("Ama Owusu","Adaptation negotiator","West Africa Climate Desk"),("Priya Nair","Heat-health physician","Cool Cities Network"),("Lucas Moreau","Carbon-markets researcher","Open Carbon Institute")]
speakers = [dict(id=s["id"], name=n, role=r, org=o + " (fictional)", bio_en=f"{r} at {o}. Invented profile for this prototype.") for s, (n, r, o) in zip(S["speakers"], SPK)]
fmt_count = {}
sessions = []
for i, s in enumerate(S["sessions"]):
    th = s["theme"]; k = fmt_count.get(th, 0); fmt_count[th] = k + 1
    f, title, blurb = TITLES[th][k % 5]
    sessions.append(dict(s, format=f, title_en=title, body_en=blurb + " Sample session — not a real event.", speakers=[speakers[(i * 3) % 20]["id"], speakers[(i * 7 + 5) % 20]["id"]]))
POI = [("Bole International Airport","transport","Main airport, about 20 minutes from the venue by car."),("Meskel Square","attraction","Large public square used for festivals and gatherings."),("National Museum of Ethiopia","attraction","Home of the famous early-human fossil exhibits."),
 ("Addis Ababa University (Sidist Kilo)","attraction","Historic campus with gardens and the ethnological museum."),("Merkato","attraction","One of Africa's largest open-air markets."),("Entoto Park","attraction","Hilltop forest park with walking trails and city views."),
 ("Unity Park","attraction","Gardens and pavilions in the palace grounds."),("Lideta Light Rail Station","transport","Light-rail stop on the east–west line."),("Highland View Hotel","hotel","Fictional hotel, 10 minutes' walk from the venue."),
 ("Buna Corner Café","cafe","Fictional café serving traditional coffee ceremonies."),("City Central Hospital","hospital","Fictional 24-hour emergency department."),("Embassy district","embassy","Area with several embassies and consulates (sample)."),
 ("Bole Road ATM cluster","atm","Several bank ATMs accepting international cards (sample).")]
pois = [dict(p, name=POI[i % len(POI)][0] + ("" if i < len(POI) else f" ({['north','south','east'][i % 3]} side)"), cat=POI[i % len(POI)][1], desc=POI[i % len(POI)][2], stepfree=(i % 3 != 1)) for i, p in enumerate(S["pois"])]
ALERTS = [("info","Room change: “Water security in the drylands” moves to Hall B."),("warning","Shuttle route 2 is delayed. Use route 4 from the north gate."),("critical","Heavy rain warning this afternoon. Use the covered walkway between halls."),
 ("info","Registration desk opens at 07:30 tomorrow."),("warning","Light rail runs every 12 minutes today due to maintenance.")]
alerts = [dict(a, severity=ALERTS[i][0], msg_en=ALERTS[i][1] + " (sample)") for i, a in enumerate(S["alerts"])]
SAMPLE = "Sample content — to be written and verified. Not real guidance."
visit = [("visa","Visa & entry","ቪዛ","book-user"),("flights","Flights",None,"plane"),("stay","Where to stay",None,"bed"),("rides","Ride-hailing",None,"car"),("transit","Airport & public transport",None,"train-front"),
 ("explore","Explore Addis",None,"landmark"),("buna","Coffee culture (Buna)",None,"coffee"),("food","Food",None,"utensils"),("money","Money, SIM & internet",None,"wallet"),("health","Health & safety",None,"heart-pulse"),("emergency","Emergency & help","ድንገተኛ አደጋ","siren"),("arrival","Arrival checklist",None,"list-checks")]
NEWS = [("Official (sample)","News","Delegates arrive as the conference opens in Addis Ababa"),("Partner (sample)","Press release","Regional partners announce a shared early-warning pilot"),("Editorial (sample)","Explainer","What “loss and damage” means, in plain words"),
 ("Official (sample)","News","Day two: finance talks focus on delivery, not pledges"),("Partner (sample)","Press release","Clean-cooking coalition publishes new country plans"),("Editorial (sample)","Explainer","How a COP decision is actually made"),
 ("Official (sample)","News","Youth pavilion hosts a record number of side events"),("Partner (sample)","Press release","Highland forest restoration report released"),("Editorial (sample)","Explainer","Adaptation vs. mitigation: the difference")]
EXH = [("Rift Valley Solar Cooperative","Energy"),("Highland Water Partnership","Water"),("Green Campus Network","Youth"),("Church Forest Alliance","Forests"),("Clean Air Collective","Health"),("Walkable City Lab","Cities"),("Grain Futures Centre","Agriculture"),("Savanna Finance Initiative","Climate finance")]
data = dict(
 sessions=sessions, speakers=speakers, pois=pois, articles=S["articles"], alerts=alerts,
 visit=[dict(id=i, en=e, am=a, icon=ic, link=(i in ("visa","flights","stay","rides")), body=SAMPLE) for i, e, a, ic in visit],
 news=[dict(id=f"N{i}", src=s, type=t, title=h, day=f"2027-10-{11+i%5:02d}", body=SAMPLE) for i, (s, t, h) in enumerate(NEWS)],
 live=[dict(id="L1", title="Opening plenary (sample)", status="live"), dict(id="L2", title="Youth pavilion stream (sample)", status="scheduled"), dict(id="L3", title="Opening ceremony recording (sample)", status="recorded")],
 docs=[dict(id=f"D{i}", title=t, kind=k, size=f"{120+i*90} KB") for i, (t, k) in enumerate([("Daily programme overview (sample)","Guide"),("Press kit (sample)","Press kit"),("Venue accessibility guide (sample)","Guide"),("Highland forests report (sample)","Report"),("Glossary booklet (sample)","Guide")])],
 archive=[dict(id="A1", title="Past conference highlights (sample)"), dict(id="A2", title="Recorded plenaries from earlier editions (sample)")],
 glossary=[("Adaptation","Adjusting to the effects of climate change."),("Mitigation","Reducing or preventing greenhouse-gas emissions."),("Loss and damage","Harm from climate impacts that cannot be avoided or adapted to."),
  ("Climate finance","Money directed to climate action."),("NDC","A country's nationally determined climate plan."),("COP","Conference of the Parties — the yearly UN climate conference."),
  ("Emissions","Gases released into the atmosphere, such as CO2."),("Carbon sink","A natural or artificial system that absorbs more carbon than it releases.")],
 exhibitors=[dict(id=f"E{i}", name=n + " (fictional)", zone=["Zone A","Zone B","Green Zone"][i%3], theme=t) for i, (n, t) in enumerate(EXH)],
 tasks=[
  ("T1","You just landed at Bole airport. Where would you look to get to your hotel?",["visit/transit","visit/rides"]),
  ("T2","Find out whether ordinary members of the public can go to COP32 events, or only people with a special pass.",["home","menu/learn"]),
  ("T3","Find events happening tomorrow that are open to everyone.",["programme"]),
  ("T4","A session you saved has moved. Where would you check?",["home","updates","programme"]),
  ("T5","You're a journalist and need today's press releases.",["updates/press"]),
  ("T6","Find a step-free entrance to the venue.",["map"]),
  ("T7","You want to see a traditional coffee ceremony.",["visit/buna"]),
  ("T8","Change the app language to Amharic.",["menu/settings","header/language"]),
  ("T9","Learn what \"loss and damage\" means.",["menu/learn"]),
  ("T10","After COP32, find a recording of the opening ceremony.",["updates/live","menu/archive"]),
  ("T11","Apply for an Ethiopian visa.",["visit/visa"]),
  ("T12","Delete your data from the app.",["menu/settings"])],
)
open("data.js", "w").write("window.DATA = " + json.dumps(data, ensure_ascii=False) + ";\n")
print("built tokens.css, data.js")
