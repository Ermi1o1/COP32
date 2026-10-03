/* COP32 companion — CLICKABLE PROTOTYPE. Sample data only. Vanilla JS, no dependencies. */
(() => {
const D = window.DATA, $ = (s, r = document) => r.querySelector(s);
const store = { get(k, d) { try { const v = localStorage.getItem('p_' + k); return v === null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem('p_' + k, JSON.stringify(v)); } catch {} },
  clear() { try { Object.keys(localStorage).filter(k => k.startsWith('p_')).forEach(k => localStorage.removeItem(k)); } catch {} } };
const S = { lang: store.get('lang', 'en'), theme: store.get('theme', 'auto'), scale: store.get('scale', 1), reduce: store.get('reduce', false), save: store.get('dataSaver', false),
  offline: false, phase: store.get('phase', 'during'), saved: new Set(store.get('saved', [])), task: store.get('task', null), visited: [], firstTab: null, results: store.get('results', []), role: store.get('role', '') };
// ---- i18n: AM strings are MACHINE-DRAFTED & UNVERIFIED; missing ones fall back to visible English (IA rule 5)
const AM = { Home:'መነሻ', Programme:'ፕሮግራም', Map:'ካርታ', Visit:'ጉብኝት', Updates:'ዜና', Search:'ፈልግ', Settings:'ቅንብሮች', Language:'ቋንቋ', Help:'እገዛ', Today:'ዛሬ',
  'Open to public':'ለሕዝብ ክፍት', Save:'አስቀምጥ', Saved:'ተቀምጧል', 'Welcome':'እንኳን ደህና መጡ', 'Emergency & help':'ድንገተኛ አደጋ', Schedule:'መርሐ ግብር', Speakers:'ተናጋሪዎች', Menu:'ምናሌ', Back:'ተመለስ', 'Climate finance':'የአየር ንብረት ፋይናንስ', Water:'ውሃ', Energy:'ኃይል', Youth:'ወጣቶች', Health:'ጤና' };
const t = (en) => (S.lang === 'am' && AM[en]) ? `<span lang="am">${AM[en]}</span>` : (S.lang === 'am' ? `<span class="pending" lang="en" title="Translation pending">${en}<sup>EN</sup></span>` : en);
const tp = (en) => (S.lang === 'am' && AM[en]) ? AM[en] : en;  // plain text (attributes)
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const ic = n => ({ home:'<path d="M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10"/>', cal:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>', map:'<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2zM9 4v14M15 6v14"/>', suit:'<rect x="3" y="8" width="18" height="12" rx="2"/><path d="M9 8V5h6v3"/>', news:'<path d="M4 5h13v14H6a2 2 0 01-2-2V5zM17 8h3v9a2 2 0 01-2 2M7 9h7M7 13h7"/>', search:'<circle cx="11" cy="11" r="7"/><path d="M21 21l-5-5"/>', bell:'<path d="M6 16V11a6 6 0 0112 0v5l2 2H4l2-2zM10 21h4"/>', menu:'<path d="M4 6h16M4 12h16M4 18h16"/>', globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>', warn:'<path d="M12 3l10 18H2L12 3zM12 10v5M12 18h.01"/>', info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5h.01"/>', check:'<path d="M5 12l5 5 9-10"/>', ext:'<path d="M14 4h6v6M20 4l-9 9M18 14v5H5V6h5"/>', star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3z"/>', off:'<path d="M3 3l18 18M8.5 8.5a6 6 0 00-1.4 4M16 13a6 6 0 00-5-5M5 12a10 10 0 014-3M12 19h.01"/>', back:'<path d="M15 5l-7 7 7 7"/>' }[n] || '');
const svg = n => `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${ic(n)}</svg>`;
const fold = s => { s = (s || '').normalize('NFC'); const ones = {}, tens = {}; for (let i = 0; i < 9; i++) { ones[String.fromCharCode(0x1369 + i)] = i + 1; tens[String.fromCharCode(0x1372 + i)] = (i + 1) * 10; }
  s = s.replace(/[፩-፺]+/g, m => [...m].reduce((a, c) => a + (ones[c] || tens[c] || 0), 0));
  const M = { 0x1210: 0x1200, 0x1280: 0x1200, 0x1220: 0x1230, 0x12D0: 0x12A0, 0x1340: 0x1338 };
  s = [...s].map(c => { const p = c.codePointAt(0); for (const k in M) { if (p >= +k && p < +k + 8) return String.fromCodePoint(M[k] + p - +k); } return c; }).join('');
  return s.toLowerCase().replace(/[፠-፨]|[^\p{L}\p{N}\s]/gu, ' ').replace(/\s+/g, ' ').trim(); };
const sTitle = s => S.lang === 'am' ? s.title_am : s.title_en;
// ---- time: sample sessions in EAT (UTC+3); show user time when different
function timeStr(s) { const fmt = d => d.slice(0, 5); let out = `${s.day.slice(5)} ${fmt(s.start)}–${fmt(s.end)} EAT`;
  try { const off = -new Date().getTimezoneOffset(); if (off !== 180) { const utc = Date.parse(`${s.day}T${s.start}:00+03:00`); out += ` · ${new Intl.DateTimeFormat(S.lang === 'am' ? 'am-ET' : 'en-GB', { hour: '2-digit', minute: '2-digit' }).format(utc)} your time`; } } catch {} return out; }
// ---- shell
const app = $('#app'); let dialogCb = null;
function setPrefs() { const r = document.documentElement; r.style.setProperty('--scale', S.scale); r.dataset.reduce = S.reduce; r.classList.toggle('big', S.scale >= 1.5); document.body.dataset.uiLang = S.lang; r.lang = S.lang;
  if (S.theme === 'auto') r.removeAttribute('data-theme'); else r.dataset.theme = S.theme; }
const route = () => (location.hash.replace(/^#\/?/, '') || 'home');
const TABS = [['home', 'Home', 'home'], ['programme', 'Programme', 'cal'], ['map', 'Map', 'map'], ['visit', 'Visit', 'suit'], ['updates', 'Updates', 'news']];
const seg = (items, cur, base) => `<div class="seg" role="tablist">${items.map(([k, l]) => `<a class="chip" role="tab" href="#/${base}/${k}" ${cur === k ? 'aria-current="true"' : ''}>${t(l)}</a>`).join('')}</div>`;
const tagAccess = s => s.open_to_public ? `<span class="tag ok">${svg('check')}${t('Open to public')}</span>` : `<span class="tag warn">${svg('info')}Accredited only (sample)</span>`;
function card(s) { const sv = S.saved.has(s.id);
  return `<article class="card"><a href="#/session/${s.id}" style="color:inherit;text-decoration:none"><strong lang="${S.lang}">${esc(sTitle(s))}</strong><div class="small muted">${esc(timeStr(s))} · ${esc(s.room)}</div></a>
  <div class="row between" style="margin-top:8px">${tagAccess(s)}<button class="chip" data-save="${s.id}" aria-pressed="${sv}">${svg('star')}${t(sv ? 'Saved' : 'Save')}</button></div></article>`; }
function banner(kind, text) { return `<div class="banner ${kind}" role="${kind === 'critical' ? 'alert' : 'status'}">${svg(kind === 'info' || kind === 'success' ? 'info' : 'warn')}<div>${text}</div></div>`; }
// ---- screens
const V = {};
V.home = () => {
  const crit = D.alerts.find(a => a.severity === 'critical'), saved = D.sessions.filter(s => S.saved.has(s.id));
  const next = saved[0] || null;
  const phase = { pre: `<div class="card"><h3 style="margin:0">Countdown (sample)</h3><p class="muted">Pre-event: plan your trip, key dates, news.</p></div>`,
    during: `<div class="card"><h3 style="margin:0 0 8px">${t('Now & next')}</h3>${next ? `<strong>${esc(sTitle(next))}</strong><div class="small muted">${esc(timeStr(next))} · ${esc(next.room)}</div>` : `<p class="muted">Save a session to see it here.</p><a class="btn secondary" href="#/programme/schedule">${t('Programme')}</a>`}</div>`,
    post: `<div class="card"><h3 style="margin:0">Outcomes & recordings (sample)</h3><p class="muted">Post-event: recordings, outcomes, archive.</p><a class="btn secondary" href="#/updates/live">Live & recorded</a></div>` }[S.phase];
  return `<h2>${t('Welcome')}</h2>
  ${crit ? banner('critical', `<strong>${esc(S.lang === 'am' ? crit.msg_am : crit.msg_en)}</strong><div class="small">Source: Sample · updated 10:05 EAT</div>`) : ''}
  ${phase}
  <h3>Shortcuts</h3><div class="grid">
   <a class="card tile" href="#/menu/learn/cop"><strong>Can I attend?</strong><span class="small muted">Who can enter where</span></a>
   <a class="card tile" href="#/programme/schedule?public=1"><strong>${t('Open to public')}</strong><span class="small muted">Tomorrow's events</span></a>
   <a class="card tile" href="#/visit/emergency"><strong>${t('Emergency & help')}</strong><span class="small muted">Numbers & help</span></a>
   <a class="card tile" href="#/map"><strong>${t('Map')}</strong><span class="small muted">Venue & city</span></a></div>
  <h3>Highlights</h3>${D.news.slice(0, 2).map(n => `<a class="card" href="#/updates/news"><span class="tag info">${esc(n.src)}</span><br><strong>${esc(n.title)}</strong></a>`).join('')}
  <a class="card" href="#/updates/explainers"><strong>Explainers</strong><div class="small muted">Climate basics, glossary</div></a>`; };
V.programme = (p, q) => { const k = p[1] || 'schedule', days = [...new Set(D.sessions.map(s => s.day))].sort();
  let body = '';
  if (k === 'schedule' || k === 'side') {
    const day = q.get('day') || days[0], pub = q.get('public') === '1';
    let list = D.sessions.filter(s => (k === 'side' ? s.title_en.startsWith('Side event') : s.day === day) && (!pub || s.open_to_public));
    body = `<div class="chips">${k === 'schedule' ? days.map(d => `<a class="chip" href="#/programme/schedule?day=${d}${pub ? '&public=1' : ''}" ${d === day ? 'aria-current="true"' : ''}>${d.slice(5)}</a>`).join('') : ''}
      <a class="chip" aria-pressed="${pub}" href="#/programme/${k}?${k === 'schedule' ? 'day=' + day + '&' : ''}${pub ? '' : 'public=1'}">${svg('check')}${t('Open to public')}</a></div>
      ${list.length ? list.map(card).join('') : emptyState('No sessions match', 'Try another day or clear filters.')}`;
  } else if (k === 'speakers') body = D.speakers.map(s => `<div class="card"><strong>${esc(s.name)}</strong><div class="small muted">${esc(s.org)} (sample)</div></div>`).join('');
  else if (k === 'exhibitors') body = D.exhibitors.map(e => `<div class="card"><strong>${esc(e.name)}</strong><div class="small muted">${e.zone} · ${e.theme} (sample)</div></div>`).join('');
  else if (k === 'agenda') { const l = D.sessions.filter(s => S.saved.has(s.id)); body = l.length ? l.map(card).join('') + `<p class="small muted">Calendar export and reminders: sample screen only.</p>` : emptyState('No saved sessions yet', 'Tap Save on any session to build your agenda.'); }
  return `<h2>${t('Programme')}</h2>${seg([['schedule', 'Schedule'], ['side', 'Side events'], ['speakers', 'Speakers'], ['exhibitors', 'Exhibitors & pavilions'], ['agenda', 'My agenda']], k, 'programme')}${body}`; };
V.session = p => { const s = D.sessions.find(x => x.id === p[1]); if (!s) return notFound();
  return `<a class="chip" href="javascript:history.back()">${svg('back')}${t('Back')}</a><h2 style="margin-top:12px" lang="${S.lang}">${esc(sTitle(s))}</h2>
  <p class="muted">${esc(timeStr(s))} · ${esc(s.room)}</p><p>${tagAccess(s)} <span class="tag info">${esc(s.theme)}</span></p>
  <p lang="${S.lang}">${esc(S.lang === 'am' ? s.body_am : s.body_en)}</p>
  <button class="btn" data-save="${s.id}" aria-pressed="${S.saved.has(s.id)}">${svg('star')}${t(S.saved.has(s.id) ? 'Saved' : 'Save')}</button>
  <p class="small muted" style="margin-top:12px">Source: sample dataset · last updated 10:05 EAT</p>`; };
V.map = (p, q) => { const cats = ['all', 'hotel', 'hospital', 'embassy', 'atm', 'transport', 'attraction', 'cafe'], c = q.get('c') || 'all', a = q.get('acc') === '1';
  const pois = D.pois.filter(x => c === 'all' || x.cat === c), la = D.pois.map(x => x.lat), lo = D.pois.map(x => x.lon), [a0, a1, o0, o1] = [Math.min(...la), Math.max(...la), Math.min(...lo), Math.max(...lo)];
  const X = x => 30 + (x.lon - o0) / (o1 - o0) * 340, Y = x => 270 - (x.lat - a0) / (a1 - a0) * 240;
  const sel = D.pois.find(x => x.id === q.get('poi'));
  return `<h2>${t('Map')}</h2>${banner('info', 'Schematic placeholder — not a real map. A real offline map stack was tested separately (spike S4).')}
  <div class="chips"><a class="chip" aria-pressed="${a}" href="#/map?acc=${a ? 0 : 1}&c=${c}">Accessibility</a>${cats.map(k => `<a class="chip" aria-pressed="${c === k}" href="#/map?c=${k}${a ? '&acc=1' : ''}">${k === 'all' ? 'All' : k}</a>`).join('')}</div>
  ${a ? `<div class="card"><strong>Step-free entrance (sample)</strong><p class="small muted">Sample: Gate B has a ramp and step-free path; accessible toilets in Hall A. Not real venue information.</p></div>` : ''}
  <div class="mapbox"><svg viewBox="0 0 400 300" role="img" aria-label="Schematic map with ${pois.length} sample points"><path d="M0 150 C120 120 250 190 400 140" stroke="var(--c-border)" stroke-width="10" fill="none" opacity=".35"/><path d="M200 0 C190 100 230 200 210 300" stroke="var(--c-border)" stroke-width="8" fill="none" opacity=".35"/>
  ${pois.map(x => `<a href="#/map?poi=${x.id}&c=${c}"><circle cx="${X(x)}" cy="${Y(x)}" r="${sel && sel.id === x.id ? 12 : 8}" fill="var(--c-danger)" stroke="var(--c-surface)" stroke-width="3"><title>${esc(x.name)}</title></circle></a>`).join('')}</svg></div>
  ${sel ? `<div class="card" style="margin-top:12px"><strong>${esc(sel.name)}</strong><div class="small muted">${sel.cat} (sample) · step-free: yes (sample)</div><a class="btn secondary" href="#" data-linkout="Device map app" style="margin-top:8px">${svg('ext')}Directions</a></div>` : `<p class="small muted">Tap a point for details.</p>`}`; };
V.visit = p => { const g = D.visit.find(x => x.id === p[1]);
  if (g) return `<a class="chip" href="#/visit">${svg('back')}${t('Back')}</a><h2 style="margin-top:12px">${g.am && S.lang === 'am' ? esc(g.am) : esc(g.en)}</h2><p>${esc(g.body)}</p>${g.link ? `<a class="btn" href="#" data-linkout="${esc(g.en)} provider">${svg('ext')}Open official / partner site (sample)</a>` : ''}<p class="small muted" style="margin-top:12px">Source: Editorial (sample) · last verified: never (placeholder)</p>`;
  return `<h2>${t('Visit')}</h2><p class="muted">Everything for the trip — guides and link-outs. All sample content.</p><div class="grid">${D.visit.map(x => `<a class="card tile" href="#/visit/${x.id}"><strong>${x.am && S.lang === 'am' ? esc(x.am) : esc(x.en)}</strong>${x.link ? `<span class="tag info">${svg('ext')}link-out</span>` : '<span class="tag">guide · offline</span>'}</a>`).join('')}</div>`; };
V.updates = p => { const k = p[1] || 'news'; let b = '';
  if (k === 'news') b = D.news.map(n => `<div class="card"><span class="tag info">${esc(n.src)}</span> <span class="small muted">${n.day}</span><br><strong>${esc(n.title)}</strong><p class="small muted">${esc(n.body)}</p></div>`).join('');
  else if (k === 'alerts') b = D.alerts.map(a => banner(a.severity === 'critical' ? 'critical' : a.severity === 'warning' ? 'warning' : 'info', `${esc(S.lang === 'am' ? a.msg_am : a.msg_en)}<div class="small">Sample · 10:0${a.id.slice(-1)} EAT</div>`)).join('');
  else if (k === 'press') b = D.news.filter(n => n.type !== 'Explainer').map(n => `<div class="card"><span class="tag">${esc(n.type)}</span><br><strong>${esc(n.title)}</strong><a class="small" href="#/menu/library">Press kit (sample)</a></div>`).join('');
  else if (k === 'live') b = D.live.map(l => `<div class="card"><span class="tag ${l.status === 'live' ? 'bad' : ''}">${l.status}</span><br><strong>${esc(l.title)}</strong><p class="small muted">Sample — no real stream. Captions: sample.</p></div>`).join('') + `<a href="#/menu/archive">Past events archive</a>`;
  else if (k === 'explainers') b = D.news.filter(n => n.type === 'Explainer').map(n => `<div class="card"><strong>${esc(n.title)}</strong></div>`).join('') + `<a class="card" href="#/menu/learn/glossary"><strong>Glossary of COP words</strong><div class="small muted">Adaptation, mitigation, loss and damage…</div></a>`;
  else b = `<div class="card"><strong>Daily digest (sample)</strong><p class="muted">Short summary of the day.</p></div>`;
  return `<h2>${t('Updates')}</h2>${seg([['news', 'News'], ['alerts', 'Alerts history'], ['press', 'Press centre'], ['live', 'Live & recorded'], ['explainers', 'Explainers'], ['digest', 'Daily digest']], k, 'updates')}${b}`; };
V.menu = p => { const k = p[1];
  const back = `<a class="chip" href="#/menu">${svg('back')}${t('Menu')}</a>`;
  if (!k) return `<h2>${t('Menu')}</h2>${[['learn', 'Learn'], ['library', 'Library'], ['archive', 'Archive'], ['settings', 'Me & Settings'], ['help', 'Help & FAQ'], ['about', 'About']].map(([i, l]) => `<a class="card" href="#/menu/${i}"><strong>${t(l === 'Me & Settings' ? 'Settings' : l === 'Help & FAQ' ? 'Help' : l)}${l === 'Me & Settings' ? ' (Me & Settings)' : ''}</strong></a>`).join('')}`;
  if (k === 'learn') { if (p[2] === 'glossary') return `${back}<h2 style="margin-top:12px">Glossary</h2>${D.glossary.map(([a, b]) => `<div class="card"><strong>${a}</strong><p class="muted">${b} <span class="small">(sample wording)</span></p></div>`).join('')}`;
    if (p[2] === 'cop') return `${back}<h2 style="margin-top:12px">COP explained & public access</h2><p>${esc("Sample content — to be written and verified. Public-access rules for COP32 are not officially announced.")}</p><p class="tag warn">TBC</p>`;
    return `<h2>Learn</h2>${[['cop', 'COP explained & Can I attend?'], ['glossary', 'Glossary of COP words'], ['basics', 'Climate basics (sample)'], ['africa', 'Africa & Ethiopia climate story (sample)'], ['legacy', 'Green Legacy (sample)']].map(([i, l]) => `<a class="card" href="#/menu/learn/${i}"><strong>${l}</strong></a>`).join('')}`; }
  if (k === 'library') return `${back}<h2 style="margin-top:12px">Library</h2>${D.docs.map(d => `<div class="card row between"><div><strong>${d.title}</strong><div class="small muted">${d.kind} · ${d.size}</div></div><span class="tag">sample</span></div>`).join('')}`;
  if (k === 'archive') return `${back}<h2 style="margin-top:12px">Archive</h2>${D.archive.map(a => `<div class="card"><strong>${a.title}</strong></div>`).join('')}`;
  if (k === 'help') return `${back}<h2 style="margin-top:12px">Help & FAQ</h2><div class="card">Sample FAQ entries.</div>`;
  if (k === 'about') return `${back}<h2 style="margin-top:12px">About</h2>${banner('warning', '<strong>Independent platform — not an official COP32, UNFCCC or government product.</strong> This is a prototype with sample data.')}<p class="small muted">Amharic text in this prototype is machine-drafted and has not been reviewed by a native speaker.</p><p><a href="#/test">Tree-test dry-run</a> · <a href="#/states">UI states gallery</a></p>`;
  if (k === 'settings') return settings(p, back); return notFound(); };
function settings(p, back) { const sw = (id, label, on) => `<div class="setting"><label for="${id}">${label}</label><input type="checkbox" id="${id}" ${on ? 'checked' : ''} style="width:28px;height:28px"></div>`;
  return `${back}<h2 style="margin-top:12px">${t('Settings')}</h2>
  <div class="setting"><span>${t('Language')}</span><span class="row"><button class="chip" data-lang="en" aria-pressed="${S.lang === 'en'}">English</button><button class="chip" data-lang="am" aria-pressed="${S.lang === 'am'}" lang="am">አማርኛ</button></span></div>
  <div class="setting"><span>Text size</span><span class="row"><button class="chip" data-scale="1" aria-pressed="${S.scale === 1}">100%</button><button class="chip" data-scale="2" aria-pressed="${S.scale === 2}">200%</button></span></div>
  <div class="setting"><span>Theme</span><span class="row">${['auto', 'light', 'dark'].map(x => `<button class="chip" data-theme="${x}" aria-pressed="${S.theme === x}">${x}</button>`).join('')}</span></div>
  ${sw('s-reduce', 'Reduce motion', S.reduce)}${sw('s-save', 'Data saver (low-data mode)', S.save)}
  <h3>Demo controls</h3>
  ${sw('s-off', 'Simulate offline', S.offline)}
  <div class="setting"><span>Event phase (Home)</span><span class="row">${['pre', 'during', 'post'].map(x => `<button class="chip" data-phase="${x}" aria-pressed="${S.phase === x}">${x}</button>`).join('')}</span></div>
  <h3>Privacy & data</h3><p class="muted small">This prototype stores only your settings, saved sessions and test results in this browser. Nothing is sent anywhere.</p>
  <button class="btn danger" id="del">Delete my data</button>`; }
V.search = (p, q) => { const raw = q.get('q') || '', f = fold(raw); let res = [];
  if (f) { const m = (...a) => a.some(x => fold(x).includes(f));
    res = [...D.sessions.filter(s => m(s.title_en, s.title_am, s.theme)).map(s => ['Sessions', sTitle(s), `session/${s.id}`]), ...D.speakers.filter(s => m(s.name)).map(s => ['People', s.name, 'programme/speakers']),
      ...D.pois.filter(x => m(x.name, x.cat)).map(x => ['Places', x.name, `map?poi=${x.id}`]), ...D.visit.filter(v => m(v.en, v.am || '')).map(v => ['Visit', v.en, `visit/${v.id}`]), ...D.glossary.filter(g => m(g[0], g[1])).map(g => ['Glossary', g[0], 'menu/learn/glossary']), ...D.news.filter(n => m(n.title)).map(n => ['News', n.title, 'updates/news'])]; }
  return `<h2>${t('Search')}</h2><form id="sf" role="search"><div class="field"><label for="q">${t('Search')}</label><input type="search" id="q" value="${esc(raw)}" autocomplete="off"></div></form>
  <p class="small muted">Prototype search: simple matching with Ge'ez homophone/numeral folding (see spike S3).</p>
  ${f ? (res.length ? res.slice(0, 30).map(r => `<a class="card" href="#/${r[2]}"><span class="tag">${r[0]}</span> <strong>${esc(r[1])}</strong></a>`).join('') : emptyState('No results', 'Check spelling or try another word.')) : ''}`; };
const emptyState = (a, b) => `<div class="card" style="text-align:center"><strong>${a}</strong><p class="muted">${b}</p></div>`;
const notFound = () => emptyState('Page not found', 'This prototype does not include this screen.');
V.states = () => `<h2>UI states gallery</h2>${banner('critical', '<strong>Critical alert</strong> — assertive announcement (sample)')}${banner('warning', 'Warning — sample')}${banner('info', 'Info — sample')}${banner('success', 'Success — sample')}
  <h3>Empty</h3>${emptyState('No saved sessions yet', 'Tap Save on any session.')}<h3>Error</h3>${banner('critical', 'Could not refresh. Showing saved content from 09:12 EAT. <button class="chip">Retry</button>')}
  <h3>Offline / stale</h3><div class="strip offline">${svg('off')} Offline — showing saved content (updated 09:12 EAT)</div><h3>TBC</h3><p><span class="tag warn">TBC</span> Dates and venue not announced. <button class="chip">Notify me when announced</button></p>
  <h3>Loading</h3><div class="skel" style="width:80%"></div><div class="skel"></div><div class="skel" style="width:60%"></div>
  <h3>Link-out interstitial</h3><button class="btn secondary" data-linkout="Example provider">Open example</button>`;
// ---- tree test
const TREE = { Home: ['Next session', 'Alerts', 'Now & next', 'Shortcuts', 'Highlights'], Programme: ['Schedule (by day)', 'Side events', 'Speakers', 'Exhibitors & pavilions', 'My agenda'], Map: ['Venue map', 'City map', 'Directions', 'Accessibility'],
  Visit: ['Before you travel (Visa, Flights, Insurance info)', 'Stay (Hotels)', 'Getting around (Airport, Light rail, Buses, Ride apps)', 'Explore Addis (Attractions, Day trips)', 'Coffee culture', 'Food', 'Money & SIM', 'Health & safety', 'Emergency'],
  Updates: ['News', 'Alerts history', 'Press centre', 'Live & recorded', 'Explainers', 'Daily digest'],
  Menu: ['Learn (COP explained, Climate basics, Africa & Ethiopia, Green Legacy, Glossary)', 'Library (Documents, Reports)', 'Archive', 'Me & Settings (Language, Time zone, Notifications, Privacy & data)', 'Help & FAQ', 'About'] };
const TREE_MAP = { 'Getting around (Airport, Light rail, Buses, Ride apps)': ['visit/transit', 'visit/rides'], 'Before you travel (Visa, Flights, Insurance info)': ['visit/visa'], 'Coffee culture': ['visit/buna'], 'Press centre': ['updates/press'], 'Live & recorded': ['updates/live'], 'Archive': ['menu/archive'],
  'Learn (COP explained, Climate basics, Africa & Ethiopia, Green Legacy, Glossary)': ['menu/learn'], 'Me & Settings (Language, Time zone, Notifications, Privacy & data)': ['menu/settings'], Accessibility: ['map'], 'Schedule (by day)': ['programme'], 'Side events': ['programme'], 'My agenda': ['programme'], Alerts: ['home'], 'Alerts history': ['updates'], Shortcuts: ['home'] };
V.test = (p, q) => { const task = S.task && D.tasks.find(x => x[0] === S.task);
  const hist = S.results.length ? `<table><tr><th>Task</th><th>Mode</th><th>First click</th><th>Path</th><th>OK</th></tr>${S.results.map(r => `<tr><td>${r.task}</td><td>${r.mode}</td><td>${esc(r.first)}</td><td>${esc(r.path)}</td><td>${r.ok ? 'Y' : 'N'}</td></tr>`).join('')}</table><p><button class="btn secondary" id="csv">Download CSV</button> <button class="chip" id="clr">Clear results</button></p>` : '<p class="muted">No results yet.</p>';
  if (p[1] === 'tree' && task) return `<div class="taskbar"><strong>${task[0]}</strong> ${esc(task[1])}</div><h2 style="margin-top:12px">Text tree (worst-case "Menu" node, as in the IA kit)</h2><p class="small muted">Click where you would look first, then the item.</p><div class="tree">${Object.entries(TREE).map(([k, v]) => `<ul><li><button data-tt="${esc(k)}" data-top="1">${k}</button><ul>${v.map(i => `<li><button data-tt="${esc(i)}" data-parent="${k}">${esc(i)}</button></li>`).join('')}</ul></li></ul>`).join('')}</div>`;
  return `<h2>Tree-test dry-run</h2>${banner('warning', '<strong>Dry run only.</strong> Not the real tree test (needs 10–15 real participants, EN and AM). Results stay in this browser.')}
  <p>Pick a task, then do it either on a text tree or in the prototype itself.</p>
  ${D.tasks.map(x => `<div class="card"><strong>${x[0]}</strong> ${esc(x[1])}<div class="row" style="margin-top:8px"><button class="btn secondary" data-task="${x[0]}" data-mode="tree">Text tree</button><button class="btn" data-task="${x[0]}" data-mode="app">In the prototype</button></div></div>`).join('')}<h3>Results</h3>${hist}`; };
const finish = (mode, path, first, ok) => { S.results.push({ task: S.task, mode, first, path, ok }); store.set('results', S.results); const nxt = S.task; S.task = null; store.set('task', null); S.visited = []; S.firstTab = null; alert(ok ? `Correct (${nxt}).` : `Not the expected location (${nxt}).`); location.hash = '#/test'; };
// ---- render
function render() {
  setPrefs(); const full = route(), [pathPart, qs] = full.split('?'), p = pathPart.split('/'), q = new URLSearchParams(qs || ''), key = p[0] === 'session' ? 'programme' : p[0];
  S.visited.push(pathPart); if (!S.firstTab && S.task) S.firstTab = pathPart;
  const view = V[p[0]] || (() => notFound()); const title = { home: 'Home', programme: 'Programme', map: 'Map', visit: 'Visit', updates: 'Updates', menu: 'Menu', search: 'Search', test: 'Test', states: 'States', session: 'Session' }[p[0]] || 'Not found';
  document.title = `${title} — COP32 companion (PROTOTYPE)`;
  const task = S.task && D.tasks.find(x => x[0] === S.task);
  app.innerHTML = `<header class="top"><h1>COP32 companion <span class="tag warn">prototype</span></h1>
    <button class="ib" id="lg" aria-label="${S.lang === 'en' ? 'Switch language to Amharic' : 'Switch language to English'}">${svg('globe')}<span lang="${S.lang === 'en' ? 'am' : 'en'}">${S.lang === 'en' ? 'አማ' : 'EN'}</span></button>
    <a class="ib" href="#/search" aria-label="${tp('Search')}">${svg('search')}</a><a class="ib" href="#/updates/alerts" aria-label="Notifications, 1 unread">${svg('bell')}<span class="badge" aria-hidden="true">1</span></a>
    <a class="ib" href="#/menu" aria-label="${tp('Menu')}">${svg('menu')}</a></header>
    <div class="strip ${S.offline ? 'offline' : ''}" role="status">${S.offline ? svg('off').replace('<svg', '<svg width="18" height="18"') + ' Offline — showing saved content (updated 09:12 EAT)' : '<span>Addis Ababa EAT · your time shown where different</span>'}<span>Independent platform · not official</span></div>
    ${task && p[0] !== 'test' ? `<div class="taskbar"><strong>${task[0]}</strong> ${esc(task[1])} <button class="btn" id="found">I found it</button> <a href="#/test" style="color:inherit">Cancel</a></div>` : ''}
    <main id="main" tabindex="-1">${view(p, q)}</main>
    <div class="watermark" role="note">PROTOTYPE — sample data, not an official COP32 product</div>
    <nav class="tabs" aria-label="Main">${TABS.map(([k, l, i]) => `<a href="#/${k}" ${key === k ? 'aria-current="page"' : ''}>${svg(i)}<span>${t(l)}</span></a>`).join('')}</nav>`;
  $('#main').focus({ preventScroll: true }); window.scrollTo(0, 0); }
// ---- events
document.addEventListener('click', e => {
  const el = e.target.closest('[data-save],[data-lang],[data-scale],[data-theme],[data-phase],[data-linkout],[data-task],[data-tt],#lg,#del,#found,#csv,#clr'); if (!el) return;
  if (el.dataset.save) { const id = el.dataset.save; S.saved.has(id) ? S.saved.delete(id) : S.saved.add(id); store.set('saved', [...S.saved]); render(); }
  else if (el.id === 'lg' || el.dataset.lang) { S.lang = el.dataset.lang || (S.lang === 'en' ? 'am' : 'en'); store.set('lang', S.lang); S.visited.push('header/language'); render(); }
  else if (el.dataset.scale) { S.scale = +el.dataset.scale; store.set('scale', S.scale); render(); }
  else if (el.dataset.theme) { S.theme = el.dataset.theme; store.set('theme', S.theme); render(); }
  else if (el.dataset.phase) { S.phase = el.dataset.phase; store.set('phase', S.phase); render(); }
  else if (el.dataset.linkout) { e.preventDefault(); const d = document.createElement('dialog'); d.setAttribute('aria-labelledby', 'dt'); d.innerHTML = `<h2 id="dt" style="font-size:1.125rem">You're leaving the app to ${esc(el.dataset.linkout)}</h2><p>We don't share your data. (Sample interstitial — no real link.)</p><div class="row"><button class="btn secondary" value="x">Cancel</button><button class="btn" value="c">Continue</button></div>`; document.body.appendChild(d); d.addEventListener('click', ev => { if (ev.target.closest('button')) d.close(); }); d.addEventListener('close', () => d.remove()); d.showModal(); }
  else if (el.dataset.task) { S.task = el.dataset.task; store.set('task', S.task); S.visited = []; S.firstTab = null; if (el.dataset.mode === 'tree') { S.mode = 'tree'; location.hash = '#/test/tree'; } else { S.mode = 'app'; location.hash = '#/home'; } }
  else if (el.dataset.tt) { const task = D.tasks.find(x => x[0] === S.task); if (el.dataset.top) { S.firstTab = el.dataset.tt; el.style.fontWeight = 700; return; }
    const ok = (TREE_MAP[el.dataset.tt] || [el.dataset.tt.toLowerCase()]).some(r => task[2].some(c => r === c || c.startsWith(r + '/') || r.startsWith(c + '/') || (r === 'menu/settings' && c === 'header/language'))); finish('tree', `${el.dataset.parent} > ${el.dataset.tt}`, S.firstTab || el.dataset.parent, ok); }
  else if (el.id === 'found') { const task = D.tasks.find(x => x[0] === S.task), cur = route().split('?')[0]; const last = cur; finish('app', S.visited.filter(v => v !== 'test').join(' > '), S.firstTab || '', task[2].some(c => last === c || last.startsWith(c) || (c === 'header/language' && S.visited.includes('header/language')) || (c.startsWith('visit/') && last === c) || (c === 'programme' && last.startsWith('programme')) || (c === 'home' && last === 'home') || (c === 'updates' && last.startsWith('updates')) || (c === 'map' && last.startsWith('map')) || (c === 'menu/settings' && last.startsWith('menu/settings')))); }
  else if (el.id === 'del') { if (confirm('Delete all prototype data stored in this browser?')) { store.clear(); S.saved = new Set(); S.results = []; S.lang = 'en'; S.theme = 'auto'; S.scale = 1; S.task = null; render(); } }
  else if (el.id === 'csv') { const csv = 'task,mode,first_click,path,success\n' + S.results.map(r => [r.task, r.mode, r.first, r.path, r.ok ? 'Y' : 'N'].map(x => `"${String(x).replace(/"/g, '""')}"`).join(',')).join('\n'); const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' })); a.download = 'tree-test-dry-run.csv'; a.click(); }
  else if (el.id === 'clr') { S.results = []; store.set('results', []); render(); } });
document.addEventListener('change', e => { const i = e.target.id; if (i === 's-reduce') { S.reduce = e.target.checked; store.set('reduce', S.reduce); } else if (i === 's-save') { S.save = e.target.checked; store.set('dataSaver', S.save); } else if (i === 's-off') { S.offline = e.target.checked; } else return; render(); });
document.addEventListener('submit', e => { if (e.target.id === 'sf') { e.preventDefault(); location.hash = '#/search?q=' + encodeURIComponent($('#q').value); } });
window.addEventListener('hashchange', render); render();
})();
