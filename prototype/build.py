"""Generates tokens.css (from docs/design/tokens.json) and data.js (sample dataset + extra SAMPLE content).
Everything in data.js is SYNTHETIC: no real COP32 content exists officially (Phase 0 / D1)."""
import json, os
T = json.load(open("../docs/design/tokens.json")); S = json.load(open("../spikes/data/sample.json"))
def vars_(c): return "\n".join(f"  --c-{k}: {v};" for k, v in c.items())
css = f"""/* GENERATED from docs/design/tokens.json by build.py — do not edit */
:root {{
{vars_(T['color']['light'])}
  --r-sm: {T['radius']['sm']}px; --r-md: {T['radius']['md']}px; --r-lg: {T['radius']['lg']}px;
  --t-fast: {T['motion']['fast']}ms; --t-base: {T['motion']['base']}ms; --ease: {T['motion']['easing']};
  --target: {T['layout']['minTargetWeb']}px; --gutter: {T['layout']['gutter']}px; --focus-w: {T['focus']['width']}px; --focus-o: {T['focus']['offset']}px;
  --shadow-1: {T['elevation']['1']}; --shadow-2: {T['elevation']['2']};
  {chr(10).join(f'--s-{i}: {v}px;' for i, v in enumerate(T['space']))}
}}
:root[data-theme="dark"] {{
{vars_(T['color']['dark'])}
}}
@media (prefers-color-scheme: dark) {{ :root:not([data-theme="light"]) {{
{vars_(T['color']['dark'])}
}} }}
"""
open("tokens.css", "w").write(css)
SAMPLE = "Sample content — to be written and verified. Not real guidance."
visit = [("visa","Visa & entry","ቪዛ"),("flights","Flights",None),("stay","Where to stay",None),("rides","Ride-hailing",None),("transit","Airport & public transport",None),
 ("explore","Explore Addis",None),("buna","Coffee culture (Buna)",None),("food","Food",None),("money","Money, SIM & internet",None),("health","Health & safety",None),("emergency","Emergency & help","ድንገተኛ አደጋ"),("arrival","Arrival checklist",None)]
data = dict(
 sessions=S["sessions"], speakers=S["speakers"], pois=S["pois"], articles=S["articles"], alerts=S["alerts"],
 visit=[dict(id=i, en=e, am=a, link=(i in ("visa","flights","stay","rides")), body=SAMPLE) for i, e, a in visit],
 news=[dict(id=f"N{i}", src=["Official (sample)","Partner (sample)","Editorial (sample)"][i%3], type=["News","Press release","Explainer"][i%3], title=f"Sample headline {i+1}: climate update", day=f"2027-10-{10+i%5:02d}", body=SAMPLE) for i in range(9)],
 live=[dict(id="L1", title="Sample plenary (live)", status="live"), dict(id="L2", title="Sample side event stream", status="scheduled"), dict(id="L3", title="Sample opening ceremony (recorded)", status="recorded")],
 docs=[dict(id=f"D{i}", title=f"Sample document {i+1}", kind=["Report","Press kit","Guide"][i%3], size=f"{120+i*90} KB") for i in range(5)],
 archive=[dict(id="A1", title="Sample past edition 1 (archive)"), dict(id="A2", title="Sample past edition 2 (archive)")],
 glossary=[("Adaptation","Adjusting to the effects of climate change."),("Mitigation","Reducing or preventing greenhouse-gas emissions."),("Loss and damage","Harm from climate impacts that cannot be avoided or adapted to."),
  ("Climate finance","Money directed to climate action."),("NDC","A country's nationally determined climate plan."),("COP","Conference of the Parties — the yearly UN climate conference."),
  ("Emissions","Gases released into the atmosphere, such as CO2."),("Carbon sink","A natural or artificial system that absorbs more carbon than it releases.")],
 exhibitors=[dict(id=f"E{i}", name=f"Sample pavilion {i+1}", zone=["Zone A","Zone B","Green Zone"][i%3], theme=["Energy","Water","Youth","Forests"][i%4]) for i in range(8)],
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
