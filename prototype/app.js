/* COP32 companion — CLICKABLE PROTOTYPE, "Highland Mist" visual design (D53). Sample data only. Vanilla JS, no dependencies.
   IA unchanged (D16 v2): 5 tabs + header actions; every hash route from v1 still resolves (tree-test T1–T12). */
(() => {
const D = window.DATA, ICONS = window.ICONS || {}, $ = (s, r = document) => r.querySelector(s);
const store = { get(k, d) { try { const v = localStorage.getItem('p_' + k); return v === null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem('p_' + k, JSON.stringify(v)); } catch {} },
  clear() { try { Object.keys(localStorage).filter(k => k.startsWith('p_')).forEach(k => localStorage.removeItem(k)); } catch {} } };
const S = { lang: store.get('lang', 'en'), theme: store.get('appearance', 'light'), scale: store.get('scale', 1), reduce: store.get('reduce', false), save: store.get('dataSaver', false),
  offline: false, phase: store.get('phase', 'during'), saved: new Set(store.get('saved', [])), task: store.get('task', null), visited: [], firstTab: null, results: store.get('results', []), signed: store.get('signed', false) };
// ---- i18n: AM strings are MACHINE-DRAFTED & UNVERIFIED; missing ones fall back to visible English (IA rule 5)
const AM = { Home:'መነሻ', Programme:'ፕሮግራም', Map:'ካርታ', Visit:'ጉብኝት', Updates:'ዜና', Search:'ፈልግ', Settings:'ቅንብሮች', Language:'ቋንቋ', Help:'እገዛ', Today:'ዛሬ',
  'Open to public':'ለሕዝብ ክፍት', Save:'አስቀምጥ', Saved:'ተቀምጧል', 'Welcome':'እንኳን ደህና መጡ', 'Emergency & help':'ድንገተኛ አደጋ', Schedule:'መርሐ ግብር', Speakers:'ተናጋሪዎች', Menu:'ምናሌ', Back:'ተመለስ',
  'Climate finance':'የአየር ንብረት ፋይናንስ', Water:'ውሃ', Energy:'ኃይል', Youth:'ወጣቶች', Health:'ጤና', 'Up next':'ቀጣይ', Shortcuts:'አቋራጮች', 'My agenda':'የእኔ መርሐ ግብር', 'Browse programme':'ፕሮግራሙን ይመልከቱ', 'Sessions, places, people':'ስብሰባዎች፣ ቦታዎች፣ ሰዎች' };
const t = en => (S.lang === 'am' && AM[en]) ? `<span lang="am">${AM[en]}</span>` : (S.lang === 'am' ? `<span class="pending" lang="en" title="Translation pending">${en}<sup>EN</sup></span>` : en);
const tp = en => (S.lang === 'am' && AM[en]) ? AM[en] : en;  // plain text (attributes)
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const svg = (n, cls = '') => `<svg class="i ${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${ICONS[n] || ''}</svg>`;
const chev = () => svg('chevron-right', 'chev');
const fold = s => { s = (s || '').normalize('NFC'); const ones = {}, tens = {}; for (let i = 0; i < 9; i++) { ones[String.fromCharCode(0x1369 + i)] = i + 1; tens[String.fromCharCode(0x1372 + i)] = (i + 1) * 10; }
  s = s.replace(/[፩-፺]+/g, m => [...m].reduce((a, c) => a + (ones[c] || tens[c] || 0), 0));
  const M = { 0x1210: 0x1200, 0x1280: 0x1200, 0x1220: 0x1230, 0x12D0: 0x12A0, 0x1340: 0x1338 };
  s = [...s].map(c => { const p = c.codePointAt(0); for (const k in M) { if (p >= +k && p < +k + 8) return String.fromCodePoint(M[k] + p - +k); } return c; }).join('');
  return s.toLowerCase().replace(/[፠-፨]|[^\p{L}\p{N}\s]/gu, ' ').replace(/\s+/g, ' ').trim(); };
const sTitle = s => S.lang === 'am' ? s.title_am : s.title_en;
const DAYS = [...new Set(D.sessions.map(s => s.day))].sort();
const dayLabel = d => { try { return new Intl.DateTimeFormat('en-GB', { weekday: 'short', day: 'numeric', timeZone: 'UTC' }).format(Date.parse(d + 'T00:00:00Z')); } catch { return d.slice(5); } };
const mins = s => { const [a, b] = s.start.split(':').map(Number), [c, d] = s.end.split(':').map(Number); return (c * 60 + d) - (a * 60 + b); };
// ---- time: sample sessions in EAT (UTC+3); show user time when different
function timeStr(s) { let out = `${dayLabel(s.day)} · ${s.start}–${s.end} EAT`;
  try { const off = -new Date().getTimezoneOffset(); if (off !== 180) { const utc = Date.parse(`${s.day}T${s.start}:00+03:00`); out += ` · ${new Intl.DateTimeFormat(S.lang === 'am' ? 'am-ET' : 'en-GB', { hour: '2-digit', minute: '2-digit' }).format(utc)} your time`; } } catch {} return out; }
// ---- illustrated, faceless avatars (no photos of real people)
const AVC = [['--c-primarySoft', '--c-primary'], ['--c-warningBg', '--c-sunset'], ['--c-successBg', '--c-success'], ['--c-infoBg', '--c-info']];
function avatar(id, big) { const n = parseInt(String(id).replace(/\D/g, ''), 10) || 0, [bg, body] = AVC[n % 4], skin = ['#EBCFB2', '#C99B72', '#8D5E3C', '#5C3B24'][n % 4],
  hair = ['M30 44q0-24 20-24t20 24q-10-9-20-9t-20 9z', 'M28 48q-2-28 22-28t22 28q-6-13-22-13T28 48z', 'M31 43q2-23 19-23t19 23l-5-3q-14-7-28 0z'][n % 3];
  return `<svg class="av ${big ? 'lg' : ''}" viewBox="0 0 100 100" aria-hidden="true"><rect width="100" height="100" fill="var(${bg})"/><path d="M14 100q0-28 36-28t36 28z" fill="var(${body})"/><circle cx="50" cy="48" r="16" fill="${skin}"/><path d="${hair}" fill="#2B1D16"/></svg>`; }
// ---- shell
const app = $('#app');
function setPrefs() { const r = document.documentElement; r.style.setProperty('--scale', S.scale); r.dataset.reduce = S.reduce; r.classList.toggle('big', S.scale >= 1.5); document.body.dataset.uiLang = S.lang; r.lang = S.lang;
  if (S.theme === 'auto') r.removeAttribute('data-theme'); else r.dataset.theme = S.theme;
  const dark = S.theme === 'dark' || (S.theme === 'auto' && matchMedia('(prefers-color-scheme: dark)').matches), m = document.querySelector('meta[name=theme-color]'); if (m) m.content = dark ? '#000000' : '#F2F6F4'; }
const route = () => (location.hash.replace(/^#\/?/, '') || 'home');
const TABS = [['home', 'Home', 'house'], ['programme', 'Programme', 'calendar'], ['map', 'Map', 'map'], ['visit', 'Visit', 'luggage'], ['updates', 'Updates', 'newspaper']];
const largeTitle = (title, eyebrow = '', extra = '') => `<div class="lt"><div>${eyebrow ? `<div class="eyebrow">${eyebrow}</div>` : ''}<h1 class="title">${title}</h1></div>${extra}</div>`;
const segc = (items, cur, base) => `<nav class="segc" aria-label="Sections">${items.map(([k, l]) => `<a href="#/${base}/${k}" ${cur === k ? 'aria-current="true"' : ''}>${t(l)}</a>`).join('')}</nav>`;
const row = ({ href = '#', icon, tone = '', title, sub = '', val = '', attrs = '', noChev = false }) => `<a class="row ${icon ? '' : 'notile'}" href="${href}" ${attrs}>${icon ? `<span class="ri ${tone}">${svg(icon)}</span>` : ''}<span class="rt"><b>${title}</b>${sub ? `<small>${sub}</small>` : ''}</span>${val ? `<span class="val">${val}</span>` : ''}${noChev ? '' : chev()}</a>`;
const access = s => s.open_to_public ? `<span class="pub">${t('Open to public')}</span>` : 'Badge required';
const starBtn = s => { const sv = S.saved.has(s.id); return `<button class="star" data-save="${s.id}" aria-pressed="${sv}" aria-label="${sv ? 'Remove from' : 'Save to'} My agenda: ${esc(s.title_en)}">${svg('star')}</button>`; };
const sessRow = s => `<div class="row time"><a href="#/session/${s.id}" class="rt" style="color:inherit;text-decoration:none;flex-direction:row;gap:var(--s-4);align-items:center"><span class="tcol"><b>${s.start}</b><small>${mins(s)} min</small></span><span class="rt"><b lang="${S.lang}">${esc(sTitle(s))}</b><small>${esc(s.room)} · ${access(s)}</small></span></a>${starBtn(s)}</div>`;
const sevIcon = k => k === 'info' || k === 'success' ? 'info' : 'triangle-alert';
const notice = (kind, title, sub = '', time = '') => `<div class="notice ${kind}" role="${kind === 'critical' ? 'alert' : 'status'}">${svg(sevIcon(kind))}<div><b>${title}</b>${sub ? `<span>${sub}</span>` : ''}</div>${time ? `<time>${time}</time>` : ''}</div>`;
const emptyState = (a, b, icon = 'bookmark', cta = '') => `<div class="empty"><span class="ri">${svg(icon)}</span><b>${a}</b><p class="muted">${b}</p>${cta}</div>`;
const notFound = () => largeTitle('Not here') + emptyState('Page not found', 'This prototype does not include this screen.', 'circle-help');
const hills = `<svg class="hills" viewBox="0 0 340 110" preserveAspectRatio="none" aria-hidden="true"><path d="M0 110V62q60-30 130-10t120-6 90 10v54z" fill="#2A8285" opacity=".45"/><path d="M0 110V84q90-26 180-6t160-8v40z" fill="#0A3A3E" opacity=".9"/><path d="M286 84V68M268 66q18-11 36 0M273 71q13-7 26 0" stroke="#9BE15D" stroke-width="2.2" fill="none" stroke-linecap="round"/></svg><span class="sun" aria-hidden="true"></span>`;
// ---- screens
const V = {};
V.home = () => {
  const crit = D.alerts.find(a => a.severity === 'critical'), warn = D.alerts.find(a => a.severity === 'warning'), saved = D.sessions.filter(s => S.saved.has(s.id)).sort((a, b) => (a.day + a.start).localeCompare(b.day + b.start));
  const hero = { pre: `<article class="hero"><div class="hero-in"><div class="kicker">Before the conference · sample</div><h2>Plan your trip to Addis Ababa</h2><div class="count"><span><b>24</b><small>days</small></span><span><b>06</b><small>hours</small></span><span><b>50</b><small>sessions</small></span></div><a class="btn go" href="#/visit">${svg('luggage')}Start planning</a></div>${hills}</article>`,
    during: `<article class="hero"><div class="hero-in"><div class="kicker">${t('Welcome to Addis Ababa')}</div><h2>${t('Plan your days at the conference')}</h2><p lang="am">እንኳን ደህና መጡ። ጉዞዎን ያቅዱ።</p><a class="btn go" href="#/programme/schedule">${svg('calendar')}${t('Browse programme')}</a></div>${hills}</article>`,
    post: `<article class="hero"><div class="hero-in"><div class="kicker">After the conference · sample</div><h2>Outcomes and recordings</h2><p>Catch up on decisions, sessions and reports.</p><a class="btn go" href="#/updates/live">${svg('play')}Live &amp; recorded</a></div>${hills}</article>` }[S.phase];
  const next = saved.length ? `<div class="group">${saved.slice(0, 3).map(sessRow).join('')}</div>` : emptyState('Nothing saved yet', 'Tap the star on any session to see it here.', 'star', `<a class="btn tinted" href="#/programme/schedule">${svg('calendar')}${t('Programme')}</a>`);
  return `${largeTitle(t('Today'), `${dayLabel(DAYS[0])} · Sample`)}
  <a class="searchf" href="#/search" aria-label="${tp('Search')}">${svg('search')}<span>${t('Sessions, places, people')}</span></a>
  ${S.offline ? `<div class="status offline">${svg('wifi-off')}Offline — showing saved content (updated 09:12 EAT)</div>` : ''}
  ${hero}
  <div style="margin-top:var(--s-4)">${crit ? notice('critical', esc(S.lang === 'am' ? crit.msg_am : crit.msg_en), 'Source: sample feed', '10:05') : ''}${warn ? notice('warning', esc(S.lang === 'am' ? warn.msg_am : warn.msg_en), '', '09:40') : ''}</div>
  <h2 class="sh">${t('Up next')} <a href="#/programme/agenda">${t('My agenda')}</a></h2>${next}
  <h2 class="sh">${t('Shortcuts')}</h2><div class="group">
   ${row({ href: '#/menu/learn/cop', icon: 'ticket', title: 'Can I attend?', sub: 'Who can enter where' })}
   ${row({ href: '#/programme/schedule?public=1', icon: 'users', tone: 'c2', title: t('Open to public'), sub: 'Free events for everyone' })}
   ${row({ href: '#/visit/emergency', icon: 'heart-pulse', tone: 'c3', title: t('Emergency & help'), sub: 'Numbers and first aid' })}
   ${row({ href: '#/map?acc=1', icon: 'map-pin', tone: 'c4', title: 'Venue map', sub: 'Halls and step-free routes' })}</div>
  <h2 class="sh">Featured voices <a href="#/programme/speakers">See all</a></h2>
  <div class="voices">${D.speakers.slice(15, 17).concat(D.speakers.slice(2, 3)).slice(0, 2).map(p => `<a class="voice" href="#/programme/speakers">${avatar(p.id)}<b>${esc(p.name)}</b><small>${esc(p.role)}</small></a>`).join('')}</div>
  <h2 class="sh">Highlights <a href="#/updates/news">All news</a></h2><div class="group">${D.news.slice(0, 3).map(n => row({ href: '#/updates/news', title: esc(n.title), sub: `${esc(n.src)} · ${n.type}` })).join('')}</div>
  <p class="fine">All people and content are invented sample data.</p>`; };
V.programme = (p, q) => { const k = p[1] || 'schedule';
  let body = '';
  if (k === 'schedule' || k === 'side') {
    const day = q.get('day') || DAYS[0], pub = q.get('public') === '1';
    const list = D.sessions.filter(s => (k === 'side' ? s.format === 'Side event' : s.day === day) && (!pub || s.open_to_public)).sort((a, b) => (a.day + a.start).localeCompare(b.day + b.start));
    const am = list.filter(s => s.start < '12:00'), pm = list.filter(s => s.start >= '12:00');
    body = `${k === 'schedule' ? `<nav class="segc" aria-label="Day">${DAYS.map(d => `<a href="#/programme/schedule?day=${d}${pub ? '&public=1' : ''}" ${d === day ? 'aria-current="true"' : ''}>${dayLabel(d)}</a>`).join('')}</nav>` : ''}
      <div class="caps"><a class="cap" aria-current="${pub}" href="#/programme/${k}?${k === 'schedule' ? 'day=' + day + '&' : ''}${pub ? '' : 'public=1'}">${pub ? svg('check') : ''}${t('Open to public')}</a><a class="cap" href="#/programme/agenda">${svg('star')}${t('Saved')} · ${S.saved.size}</a></div>
      ${list.length ? (k === 'side' ? `<h2 class="sh">All side events</h2><div class="group">${list.map(sessRow).join('')}</div>` : `${am.length ? `<h2 class="sh">Morning</h2><div class="group">${am.map(sessRow).join('')}</div>` : ''}${pm.length ? `<h2 class="sh">Afternoon</h2><div class="group">${pm.map(sessRow).join('')}</div>` : ''}`) : emptyState('No sessions match', 'Try another day or clear the filter.', 'calendar')}
      <p class="fine">Times in East Africa Time (EAT). Sample data.</p>`;
  } else if (k === 'speakers') body = `<div class="group">${D.speakers.map(s => `<a class="row" href="#/programme/speakers" style="--inset:4.5rem">${avatar(s.id)}<span class="rt"><b>${esc(s.name)}</b><small>${esc(s.role)} · ${esc(s.org)}</small></span>${chev()}</a>`).join('')}</div>`;
  else if (k === 'exhibitors') body = `<div class="group">${D.exhibitors.map((e, i) => row({ icon: ['layers', 'landmark', 'mountain', 'building-2'][i % 4], tone: ['', 'c2', 'c4', 'c5'][i % 4], title: esc(e.name), sub: `${e.zone} · ${e.theme}` })).join('')}</div>`;
  else if (k === 'agenda') { const l = D.sessions.filter(s => S.saved.has(s.id)).sort((a, b) => (a.day + a.start).localeCompare(b.day + b.start));
    body = l.length ? `${DAYS.filter(d => l.some(s => s.day === d)).map(d => `<h2 class="sh">${dayLabel(d)}</h2><div class="group">${l.filter(s => s.day === d).map(sessRow).join('')}</div>`).join('')}<div class="actions" style="margin-top:var(--s-5)"><button class="btn tinted" data-toast="Calendar export is a sample in this prototype">${svg('calendar-plus')}Add to calendar</button></div>`
      : emptyState('No saved sessions yet', 'Tap the star on any session to build your agenda.', 'star', `<a class="btn tinted" href="#/programme/schedule">${svg('calendar')}Browse schedule</a>`); }
  return `${largeTitle(t('Programme'), 'Sample programme', `<a class="cb" href="#/search" aria-label="${tp('Search')}">${svg('search')}</a>`)}${segc([['schedule', 'Schedule'], ['side', 'Side events'], ['speakers', 'Speakers'], ['exhibitors', 'Exhibitors'], ['agenda', 'My agenda']], k, 'programme')}${body}`; };
V.session = p => { const s = D.sessions.find(x => x.id === p[1]); if (!s) return notFound(); const sv = S.saved.has(s.id);
  const spk = (s.speakers || []).map(id => D.speakers.find(x => x.id === id)).filter(Boolean);
  return `<div class="eyebrow" style="margin:var(--s-2) var(--s-1) 0">${esc(s.format || 'Session')} · ${esc(s.theme)}</div><h2 class="dt" lang="${S.lang}">${esc(sTitle(s))}</h2>
  <div class="meta">${s.open_to_public ? `<span class="pill ok">${svg('check')}${t('Open to public')}</span>` : `<span class="pill warn">${svg('ticket')}Badge required (sample)</span>`}<span class="pill tint">${esc(s.theme)}</span></div>
  <div class="group">${row({ icon: 'clock', title: timeStr(s), sub: `${mins(s)} minutes`, noChev: true })}${row({ href: '#/map', icon: 'map-pin', tone: 'c4', title: esc(s.room), sub: 'Show on venue map' })}</div>
  <div class="actions" style="margin-top:var(--s-5)"><button class="btn ${sv ? 'tinted' : 'go'}" data-save="${s.id}" aria-pressed="${sv}">${svg('star')}${sv ? t('Saved') : 'Save to My agenda'}</button><button class="btn plain" data-toast="Sharing is a sample in this prototype">${svg('share')}Share</button></div>
  <h2 class="sh">About</h2><p class="prose" lang="${S.lang}">${esc(S.lang === 'am' ? s.body_am : s.body_en)}</p>
  ${spk.length ? `<h2 class="sh">${t('Speakers')}</h2><div class="group">${spk.map(x => `<a class="row" href="#/programme/speakers" style="--inset:4.5rem">${avatar(x.id)}<span class="rt"><b>${esc(x.name)}</b><small>${esc(x.role)} · ${esc(x.org)}</small></span>${chev()}</a>`).join('')}</div>` : ''}
  <p class="src">Source: sample dataset · last updated 10:05 EAT</p>`; };
V.map = (p, q) => { const cats = [['all', 'All', 'layers'], ['transport', 'Transport', 'train-front'], ['attraction', 'Sights', 'landmark'], ['hotel', 'Hotels', 'bed'], ['cafe', 'Cafés', 'coffee'], ['hospital', 'Health', 'hospital'], ['atm', 'ATMs', 'banknote'], ['embassy', 'Embassies', 'building-2']], c = q.get('c') || 'all', a = q.get('acc') === '1';
  const pois = D.pois.filter(x => (c === 'all' || x.cat === c) && (!a || x.stepfree)), la = D.pois.map(x => x.lat), lo = D.pois.map(x => x.lon), [a0, a1, o0, o1] = [Math.min(...la), Math.max(...la), Math.min(...lo), Math.max(...lo)];
  const X = x => 30 + (x.lon - o0) / (o1 - o0) * 340, Y = x => 270 - (x.lat - a0) / (a1 - a0) * 240, sel = D.pois.find(x => x.id === q.get('poi'));
  const qs = (o) => { const u = new URLSearchParams({ c, ...(a ? { acc: '1' } : {}), ...o }); [...u.keys()].forEach(k => { if (u.get(k) === '') u.delete(k); }); return '#/map?' + u.toString(); };
  return `${largeTitle(t('Map'), 'Addis Ababa · schematic')}
  <div class="caps"><a class="cap" aria-current="${a}" href="${qs({ acc: a ? '' : '1' })}">${svg('accessibility')}Step-free</a>${cats.map(([k, l, ic]) => `<a class="cap" aria-current="${c === k}" href="${qs({ c: k })}">${svg(ic)}${l}</a>`).join('')}</div>
  ${a ? notice('success', 'Step-free entrance: Gate B (sample)', 'Ramp and level path to all halls; accessible toilets in Hall A. Not real venue information.') : ''}
  <div class="mapbox"><span class="badge">Schematic placeholder · not a real map</span><svg viewBox="0 0 400 300" role="group" aria-label="Schematic map with ${pois.length} sample points">
  <rect width="400" height="300" fill="var(--c-surfaceAlt)"/><path d="M0 210 C90 180 160 240 260 200 S360 170 400 190 V300 H0Z" fill="var(--c-primarySoft)" opacity=".7"/>
  <path d="M0 150 C120 120 250 190 400 140" stroke="var(--c-surface)" stroke-width="12" fill="none"/><path d="M200 0 C190 100 230 200 210 300" stroke="var(--c-surface)" stroke-width="10" fill="none"/><path d="M40 0 C80 90 60 200 120 300" stroke="var(--c-surface)" stroke-width="6" fill="none"/>
  ${pois.map(x => { const on = sel && sel.id === x.id; return `<a href="${qs({ poi: x.id })}" aria-label="${esc(x.name)}"><circle cx="${X(x)}" cy="${Y(x)}" r="${on ? 13 : 9}" fill="${on ? 'var(--c-accent)' : 'var(--c-primary)'}" stroke="var(--c-surface)" stroke-width="3"/></a>`; }).join('')}</svg></div>
  ${sel ? `<div class="group poi-card">${row({ icon: (cats.find(k => k[0] === sel.cat) || [0, 0, 'map-pin'])[2], title: esc(sel.name), sub: `${esc(sel.desc)} ${sel.stepfree ? '· Step-free (sample)' : ''}`, noChev: true })}<a class="row notile" href="#" data-linkout="your device's map app"><span class="rt"><b style="color:var(--c-primary)">Directions</b></span>${svg('external-link', 'chev')}</a></div>`
    : `<p class="fine">Tap a point for details. A real offline map stack was tested separately (spike S4).</p>`}`; };
V.visit = p => { const g = D.visit.find(x => x.id === p[1]);
  if (g) return `<div class="eyebrow" style="margin:var(--s-2) var(--s-1) 0">Visit guide · sample</div><h2 class="dt">${g.am && S.lang === 'am' ? `<span lang="am">${esc(g.am)}</span>` : esc(g.en)}</h2>
    <div class="meta">${g.link ? `<span class="pill info">${svg('external-link')}Links to an outside site</span>` : `<span class="pill ok">${svg('circle-check')}Works offline</span>`}</div>
    <p class="prose">${esc(g.body)}</p>${g.link ? `<a class="btn go wide" href="#" data-linkout="the ${esc(g.en.toLowerCase())} provider (sample)">${svg('external-link')}Open official or partner site</a>` : ''}
    <p class="src">Source: Editorial (sample) · last verified: never (placeholder)</p>`;
  return `${largeTitle(t('Visit'), 'Your trip to Addis Ababa')}<p class="lead-p">Guides that work offline, plus links to booking and visa sites. All sample content.</p>
  <div class="tiles visit">${D.visit.map((x, i) => `<a class="tile" href="#/visit/${x.id}"><span class="ri ${['', 'c2', 'c4', 'c5', 'c3'][i % 5]}">${svg(x.icon)}</span><b>${x.am && S.lang === 'am' ? `<span lang="am">${esc(x.am)}</span>` : esc(x.en)}</b><small>${x.link ? 'Link-out' : 'Offline guide'}</small></a>`).join('')}</div>`; };
V.updates = p => { const k = p[1] || 'news'; let b = '';
  if (k === 'news') b = `<div class="group">${D.news.map(n => row({ title: esc(n.title), sub: `${esc(n.src)} · ${n.type} · ${dayLabel(n.day)}` })).join('')}</div>`;
  else if (k === 'alerts') b = D.alerts.map((a, i) => notice(a.severity === 'critical' ? 'critical' : a.severity === 'warning' ? 'warning' : 'info', esc(S.lang === 'am' ? a.msg_am : a.msg_en), 'Sample feed', `10:0${i}`)).join('');
  else if (k === 'press') b = `<div class="group">${D.news.filter(n => n.type !== 'Explainer').map(n => row({ icon: 'file-text', tone: n.type === 'News' ? '' : 'c5', title: esc(n.title), sub: `${n.type} · ${esc(n.src)}` })).join('')}</div><h2 class="sh">Press kit</h2><div class="group">${row({ href: '#/menu/library', icon: 'library', title: 'Press kit (sample)', sub: 'Logos are not included: independent platform' })}</div>`;
  else if (k === 'live') b = `<div class="group">${D.live.map(l => row({ icon: l.status === 'recorded' ? 'play' : 'radio', tone: l.status === 'live' ? 'c3' : '', title: esc(l.title), sub: l.status === 'live' ? '<span class="pill bad"><span class="live-dot"></span>LIVE</span> Captions: sample' : l.status === 'scheduled' ? 'Starts 14:00 EAT' : 'Recording · 1 h 12 min' })).join('')}</div><h2 class="sh">Past events</h2><div class="group">${row({ href: '#/menu/archive', icon: 'archive', title: 'Archive', sub: 'Recordings from earlier editions (sample)' })}</div>`;
  else if (k === 'explainers') b = `<div class="group">${D.news.filter(n => n.type === 'Explainer').map(n => row({ icon: 'book-open', title: esc(n.title), sub: 'Explainer · 3 min read' })).join('')}${row({ href: '#/menu/learn/glossary', icon: 'languages', tone: 'c2', title: 'Glossary of COP words', sub: 'Adaptation, mitigation, loss and damage…' })}</div>`;
  else b = `<div class="group">${row({ icon: 'newspaper', title: 'Daily digest (sample)', sub: 'A short summary of the day, ready each evening at 19:00 EAT', noChev: true })}</div>`;
  return `${largeTitle(t('Updates'), 'News, alerts and media', `<a class="cb" href="#/search" aria-label="${tp('Search')}">${svg('search')}</a>`)}${segc([['news', 'News'], ['alerts', 'Alerts'], ['press', 'Press'], ['live', 'Live & recorded'], ['explainers', 'Explainers'], ['digest', 'Digest']], k, 'updates')}${b}`; };
// ---- profile & settings sheet (#/menu): replaces the v1 ☰ menu; same destinations (D53)
V.menu = p => { const k = p[1];
  if (!k) return `${largeTitle(t('Settings'), 'Profile & settings')}
    ${S.signed ? `<div class="prof"><span class="pav">SA</span><div class="rt"><b>Selam Anbessa</b><small>selam@example.org · sample account</small></div></div>`
      : `<div class="prof"><span class="pav">${svg('user-round')}</span><div class="rt"><b>Guest</b><small>Using the app without an account</small></div></div><button class="btn wide" id="signin" style="margin-top:var(--s-3)">${svg('log-in')}Sign in to sync your agenda</button><p class="gnote">Optional. Everything works without an account; your saved sessions stay on this phone (D21).</p>`}
    <div class="glabel">Account</div><div class="group">${row({ href: '#/programme/agenda', icon: 'bookmark', title: t('My agenda'), val: `${S.saved.size} saved` })}${row({ href: '#/updates/alerts', icon: 'bell-ring', tone: 'c2', title: 'Notifications', val: 'On' })}</div>
    <div class="glabel">Preferences</div><div class="group">${row({ href: '#/menu/settings', icon: 'languages', title: t('Language'), val: S.lang === 'am' ? '<span lang="am">አማርኛ</span>' : 'English' })}<div class="row"><span class="ri c4">${svg('sun-moon')}</span><label class="rt" for="s-dark"><b>Dark mode</b><small>${S.theme === 'auto' ? 'Matching your phone' : S.theme === 'dark' ? 'On' : 'Off (light)'}</small></label><input type="checkbox" role="switch" class="switch" id="s-dark" ${S.theme === 'dark' ? 'checked' : ''}></div>${row({ href: '#/menu/settings', icon: 'type', tone: 'c5', title: 'Text size', val: S.scale > 1 ? '200%' : 'Default' })}${row({ href: '#/menu/settings', icon: 'clock', tone: 'c2', title: 'Time zone', val: 'EAT' })}</div>
    <div class="glabel">Learn &amp; library</div><div class="group">${row({ href: '#/menu/learn', icon: 'book-open', title: 'Learn', sub: 'COP explained, climate basics, glossary' })}${row({ href: '#/menu/library', icon: 'library', tone: 'c5', title: 'Library', sub: 'Documents and reports' })}${row({ href: '#/menu/archive', icon: 'archive', tone: 'c4', title: 'Archive', sub: 'Past editions' })}</div>
    <div class="glabel">Privacy</div><div class="group">${row({ href: '#/menu/settings', icon: 'shield', title: 'Privacy & data' })}${row({ href: '#/menu/settings', icon: 'trash-2', tone: 'c3', title: '<span style="color:var(--c-danger)">Delete my data</span>' })}</div>
    <div class="glabel">Help</div><div class="group">${row({ href: '#/menu/help', icon: 'circle-help', title: 'Help & FAQ' })}${row({ href: '#/menu/about', icon: 'info', tone: 'c5', title: 'About this prototype', val: 'v0.2' })}</div>
    ${S.signed ? `<button class="btn danger wide" id="signout" style="margin-top:var(--s-7)">${svg('log-out')}Sign out</button>` : ''}
    <p class="fine">PROTOTYPE · sample data · not an official COP32 app</p>`;
  if (k === 'learn') { if (p[2] === 'glossary') return `${largeTitle('Glossary', 'Learn')}<div class="group">${D.glossary.map(([a, b]) => `<div class="row notile"><span class="rt"><b>${a}</b><small>${b} (sample wording)</small></span></div>`).join('')}</div>`;
    if (p[2] === 'cop') return `${largeTitle('Can I attend?', 'COP explained')}${notice('warning', 'Not announced yet', 'Public-access rules for COP32 have not been officially published. This page will update when they are.')}<p class="prose">Sample content — to be written and verified. Most COPs have a badge-only Blue Zone and a Green Zone open to the public; that may not apply here.</p><span class="pill warn">TBC</span>`;
    return `${largeTitle('Learn', 'Climate, explained simply')}<div class="group">${[['cop', 'COP explained & Can I attend?', 'ticket', ''], ['glossary', 'Glossary of COP words', 'languages', 'c2'], ['basics', 'Climate basics', 'book-open', 'c5'], ['africa', 'Africa & Ethiopia climate story', 'mountain', 'c4'], ['legacy', 'Green Legacy tree planting', 'heart-pulse', 'c2']].map(([i, l, ic, tn]) => row({ href: `#/menu/learn/${i}`, icon: ic, tone: tn, title: l, sub: i === 'cop' || i === 'glossary' ? '' : 'Sample' })).join('')}</div>`; }
  if (k === 'library') return `${largeTitle('Library', 'Documents & reports')}<div class="group">${D.docs.map(d => row({ icon: 'file-text', title: esc(d.title), sub: `${d.kind} · ${d.size}`, val: '' })).join('')}</div>`;
  if (k === 'archive') return `${largeTitle('Archive', 'Past editions')}<div class="group">${D.archive.map(a => row({ icon: 'archive', tone: 'c4', title: esc(a.title) })).join('')}</div>`;
  if (k === 'help') return `${largeTitle('Help & FAQ')}<div class="group">${['How do I save a session?', 'Does the app work offline?', 'Is this the official COP32 app?', 'How do I change the language?'].map(x => row({ title: x })).join('')}</div><p class="fine">Sample FAQ entries.</p>`;
  if (k === 'about') return `${largeTitle('About')}${notice('warning', 'Independent platform — not an official COP32, UNFCCC or government product.', 'This is a prototype with invented sample data.')}<p class="prose muted">Amharic text in this prototype is machine-drafted and has not been reviewed by a native speaker. Design: Highland Mist v0.2. Icons: Lucide (ISC). Fonts: Atkinson Hyperlegible Next and Noto Sans Ethiopic (OFL).</p><div class="group">${row({ href: '#/test', icon: 'flask-conical', title: 'Tree-test dry run' })}${row({ href: '#/states', icon: 'layers', tone: 'c5', title: 'UI states gallery' })}</div>`;
  if (k === 'settings') return settings(); return notFound(); };
function settings() { const sw = (id, label, on, sub = '') => `<div class="row notile"><label class="rt" for="${id}"><b>${label}</b>${sub ? `<small>${sub}</small>` : ''}</label><input type="checkbox" role="switch" class="switch" id="${id}" ${on ? 'checked' : ''}></div>`;
  const opt = (label, items) => `<div class="row notile"><span class="rt"><b>${label}</b></span><span class="opt">${items}</span></div>`;
  return `${largeTitle(t('Settings'), 'Preferences')}
  <div class="group">${opt(t('Language'), `<button data-lang="en" aria-pressed="${S.lang === 'en'}">English</button><button data-lang="am" aria-pressed="${S.lang === 'am'}" lang="am">አማርኛ</button>`)}
  ${opt('Text size', `<button data-scale="1" aria-pressed="${S.scale === 1}">100%</button><button data-scale="2" aria-pressed="${S.scale === 2}">200%</button>`)}
  ${opt('Appearance', ['light', 'dark', 'auto'].map(x => `<button data-set-theme="${x}" aria-pressed="${S.theme === x}">${{ auto: 'Match phone', light: 'Light', dark: 'Dark' }[x]}</button>`).join(''))}
  ${sw('s-reduce', 'Reduce motion', S.reduce)}${sw('s-save', 'Data saver', S.save, 'Low-data mode for mobile networks')}</div>
  <div class="glabel">Demo controls</div><div class="group">${sw('s-off', 'Simulate offline', S.offline)}${opt('Event phase', ['pre', 'during', 'post'].map(x => `<button data-phase="${x}" aria-pressed="${S.phase === x}">${x}</button>`).join(''))}</div>
  <div class="glabel">Privacy &amp; data</div><div class="group"><div class="row notile"><span class="rt"><small>This prototype stores only your settings, saved sessions and test results in this browser. Nothing is sent anywhere.</small></span></div></div>
  <button class="btn danger wide" id="del" style="margin-top:var(--s-4)">${svg('trash-2')}Delete my data</button>`; }
V.search = (p, q) => { const raw = q.get('q') || '', f = fold(raw); let res = [];
  if (f) { const m = (...a) => a.some(x => fold(x).includes(f));
    res = [...D.sessions.filter(s => m(s.title_en, s.title_am, s.theme)).map(s => ['Sessions', sTitle(s), `session/${s.id}`, 'calendar']), ...D.speakers.filter(s => m(s.name, s.role)).map(s => ['People', s.name, 'programme/speakers', 'user-round']),
      ...D.pois.filter(x => m(x.name, x.cat)).map(x => ['Places', x.name, `map?poi=${x.id}`, 'map-pin']), ...D.visit.filter(v => m(v.en, v.am || '')).map(v => ['Visit', v.en, `visit/${v.id}`, 'luggage']), ...D.glossary.filter(g => m(g[0], g[1])).map(g => ['Glossary', g[0], 'menu/learn/glossary', 'languages']), ...D.news.filter(n => m(n.title)).map(n => ['News', n.title, 'updates/news', 'newspaper'])]; }
  const groups = [...new Set(res.map(r => r[0]))];
  return `${largeTitle(t('Search'))}<form id="sf" role="search"><label class="vh" for="q">${t('Search')}</label><input type="search" id="q" value="${esc(raw)}" placeholder="Sessions, places, people" autocomplete="off"></form>
  <p class="fine" style="text-align:start;margin:var(--s-3) var(--s-2) 0">Ge'ez-aware: try <span lang="am">ዐዲስ</span> — it finds <span lang="am">አዲስ</span> (spike S3).</p>
  ${f ? (res.length ? groups.map(g => `<h2 class="sh">${g}</h2><div class="group">${res.filter(r => r[0] === g).slice(0, 8).map(r => row({ href: '#/' + r[2], icon: r[3], title: esc(r[1]) })).join('')}</div>`).join('') : `<div style="margin-top:var(--s-5)">${emptyState('No results', 'Check the spelling or try another word.', 'search')}</div>`) : ''}`; };
V.states = () => `${largeTitle('UI states', 'Gallery')}${notice('critical', 'Critical alert', 'Assertive announcement (sample)', '10:05')}${notice('warning', 'Warning', 'Sample')}${notice('info', 'Info', 'Sample')}${notice('success', 'Success', 'Sample')}
  <h2 class="sh">Empty</h2>${emptyState('No saved sessions yet', 'Tap the star on any session.', 'star')}
  <h2 class="sh">Error</h2>${notice('critical', 'Couldn’t refresh', 'Showing saved content from 09:12 EAT.')}<button class="btn tinted" data-toast="Retrying (sample)">${svg('rotate-cw')}Retry</button>
  <h2 class="sh">Offline / stale</h2><div class="status offline">${svg('wifi-off')}Offline — showing saved content (updated 09:12 EAT)</div>
  <h2 class="sh">Not announced (TBC)</h2><div class="group"><div class="row notile"><span class="rt"><b>Dates and venue</b><small>Not officially announced yet</small></span><span class="pill warn">TBC</span></div></div><button class="btn plain" style="margin-top:var(--s-3)" data-toast="We'll notify you (sample)">${svg('bell')}Notify me when announced</button>
  <h2 class="sh">Loading</h2><div class="group" style="padding:var(--s-4)"><div class="skel" style="width:70%"></div><div class="skel"></div><div class="skel" style="width:50%"></div></div>
  <h2 class="sh">Link-out</h2><button class="btn plain" data-linkout="an example provider">${svg('external-link')}Open example</button>`;
// ---- tree test (dry run)
const TREE = { Home: ['Next session', 'Alerts', 'Now & next', 'Shortcuts', 'Highlights'], Programme: ['Schedule (by day)', 'Side events', 'Speakers', 'Exhibitors & pavilions', 'My agenda'], Map: ['Venue map', 'City map', 'Directions', 'Accessibility'],
  Visit: ['Before you travel (Visa, Flights, Insurance info)', 'Stay (Hotels)', 'Getting around (Airport, Light rail, Buses, Ride apps)', 'Explore Addis (Attractions, Day trips)', 'Coffee culture', 'Food', 'Money & SIM', 'Health & safety', 'Emergency'],
  Updates: ['News', 'Alerts history', 'Press centre', 'Live & recorded', 'Explainers', 'Daily digest'],
  'Profile & settings': ['Learn (COP explained, Climate basics, Africa & Ethiopia, Green Legacy, Glossary)', 'Library (Documents, Reports)', 'Archive', 'Me & Settings (Language, Time zone, Notifications, Privacy & data)', 'Help & FAQ', 'About'] };
const TREE_MAP = { 'Getting around (Airport, Light rail, Buses, Ride apps)': ['visit/transit', 'visit/rides'], 'Before you travel (Visa, Flights, Insurance info)': ['visit/visa'], 'Coffee culture': ['visit/buna'], 'Press centre': ['updates/press'], 'Live & recorded': ['updates/live'], 'Archive': ['menu/archive'],
  'Learn (COP explained, Climate basics, Africa & Ethiopia, Green Legacy, Glossary)': ['menu/learn'], 'Me & Settings (Language, Time zone, Notifications, Privacy & data)': ['menu/settings'], Accessibility: ['map'], 'Schedule (by day)': ['programme'], 'Side events': ['programme'], 'My agenda': ['programme'], Alerts: ['home'], 'Alerts history': ['updates'], Shortcuts: ['home'] };
V.test = (p) => { const task = S.task && D.tasks.find(x => x[0] === S.task);
  const hist = S.results.length ? `<div class="tablewrap"><table><tr><th>Task</th><th>Mode</th><th>First click</th><th>Path</th><th>OK</th></tr>${S.results.map(r => `<tr><td>${r.task}</td><td>${r.mode}</td><td>${esc(r.first)}</td><td>${esc(r.path)}</td><td>${r.ok ? 'Y' : 'N'}</td></tr>`).join('')}</table></div><div class="actions" style="margin-top:var(--s-4)"><button class="btn tinted" id="csv">Download CSV</button><button class="btn plain" id="clr">Clear results</button></div>` : '<p class="muted">No results yet.</p>';
  if (p[1] === 'tree' && task) return `${largeTitle('Text tree', task[0])}<p class="prose">${esc(task[1])}</p><p class="small muted">Click where you would look first, then the item.</p><div class="group tree" style="padding:var(--s-4)">${Object.entries(TREE).map(([k, v]) => `<ul><li><button data-tt="${esc(k)}" data-top="1">${k}</button><ul>${v.map(i => `<li><button data-tt="${esc(i)}" data-parent="${k}">${esc(i)}</button></li>`).join('')}</ul></li></ul>`).join('')}</div>`;
  return `${largeTitle('Tree-test dry run', 'Rehearsal only')}${notice('warning', 'Dry run only.', 'Not the real tree test (needs 10–15 real participants, EN and AM). Results stay in this browser.')}
  <div class="group">${D.tasks.map(x => `<div class="row notile" style="flex-wrap:wrap"><span class="rt"><b>${x[0]}</b><small>${esc(x[1])}</small></span><span class="opt"><button data-task="${x[0]}" data-mode="tree">Text tree</button><button data-task="${x[0]}" data-mode="app" aria-pressed="true">In the app</button></span></div>`).join('')}</div><h2 class="sh">Results</h2>${hist}`; };
let toastT; function toast(msg) { let el = $('.toast'); if (!el) { el = document.createElement('div'); el.className = 'toast'; el.setAttribute('role', 'status'); document.body.appendChild(el); } el.textContent = msg; el.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove('show'), 1800); }
function dialogBox(html, onOk) { const d = document.createElement('dialog'); d.setAttribute('aria-labelledby', 'dt'); d.innerHTML = html; document.body.appendChild(d); d.addEventListener('click', ev => { const b = ev.target.closest('button'); if (b) { d.close(); if (b.value === 'c' && onOk) onOk(); } }); d.addEventListener('close', () => d.remove()); d.showModal(); }
const finish = (mode, path, first, ok) => { S.results.push({ task: S.task, mode, first, path, ok }); store.set('results', S.results); const nxt = S.task; S.task = null; store.set('task', null); S.visited = []; S.firstTab = null; toast(ok ? `Correct (${nxt}).` : `Not the expected location (${nxt}).`); location.hash = '#/test'; };
// ---- render
const ROOTS = ['home', 'programme', 'map', 'visit', 'updates'];
function render() {
  setPrefs(); const full = route(), [pathPart, qs] = full.split('?'), p = pathPart.split('/'), q = new URLSearchParams(qs || ''), key = p[0] === 'session' ? 'programme' : p[0];
  S.visited.push(pathPart); if (!S.firstTab && S.task) S.firstTab = pathPart;
  const view = V[p[0]] || (() => notFound()); const title = { home: 'Today', programme: 'Programme', map: 'Map', visit: 'Visit', updates: 'Updates', menu: 'Settings', search: 'Search', test: 'Test', states: 'States', session: 'Session' }[p[0]] || 'Not found';
  document.title = `${title} — COP32 companion (PROTOTYPE)`;
  const task = S.task && D.tasks.find(x => x[0] === S.task);
  const isRoot = ROOTS.includes(p[0]) && p.length === 1 || (['programme', 'updates'].includes(p[0]) && p.length === 2);
  const backHref = p[0] === 'session' ? '#/programme' : p[0] === 'visit' ? '#/visit' : p[0] === 'menu' && p.length > 1 ? (p[1] === 'learn' && p[2] ? '#/menu/learn' : '#/menu') : p[0] === 'menu' || p[0] === 'search' ? '#/home' : '#/home';
  const lead = isRoot ? `<a class="mark" href="#/home" aria-label="COP32 companion, home"><b>C32</b><span>Companion</span></a>` : `<a class="back" href="${backHref}" ${p[0] === 'session' || p[0] === 'search' ? 'data-back="1"' : ''}>${svg('chevron-left')}${t('Back')}</a>`;
  app.innerHTML = `<header class="nav"><div class="lead">${lead}</div><span class="inline-title" aria-hidden="true">${tp(title)}</span>
    <a class="cb" href="#/updates/alerts" aria-label="Alerts, 1 unread">${svg('bell')}<span class="dot" aria-hidden="true"></span></a>
    <button class="lang" id="lg" aria-label="${S.lang === 'en' ? 'Switch language to Amharic' : 'Switch language to English'}"><span lang="${S.lang === 'en' ? 'am' : 'en'}">${S.lang === 'en' ? 'አማ' : 'EN'}</span></button>
    <a class="cb" href="#/menu" aria-label="Profile and settings" ${p[0] === 'menu' && !p[1] ? 'aria-current="page"' : ''}>${svg('circle-user-round')}</a></header>
    ${task && p[0] !== 'test' ? `<div class="taskbar"><strong>${task[0]}</strong> ${esc(task[1])} <button class="btn" id="found">I found it</button> <a href="#/test">Cancel</a></div>` : ''}
    <main id="main" tabindex="-1">${view(p, q)}</main>
    <div class="watermark" role="note">PROTOTYPE · sample data · not an official COP32 product</div>
    <nav class="tabs" aria-label="Main">${TABS.map(([k, l, i]) => `<a href="#/${k}" ${key === k ? 'aria-current="page"' : ''}>${svg(i)}<span>${t(l === 'Home' ? 'Today' : l)}</span></a>`).join('')}</nav>`;
  $('#main').focus({ preventScroll: true }); window.scrollTo(0, 0); onScroll();
}
function onScroll() { app.classList.toggle('scrolled', window.scrollY > 24); }
window.addEventListener('scroll', onScroll, { passive: true });
// ---- events
document.addEventListener('click', e => {
  const el = e.target.closest('[data-save],[data-lang],[data-scale],[data-set-theme],[data-phase],[data-linkout],[data-task],[data-tt],[data-toast],[data-back],#lg,#del,#found,#csv,#clr,#signin,#signout'); if (!el) return;
  if (el.dataset.back && history.length > 1 && document.referrer !== undefined) { e.preventDefault(); history.back(); return; }
  if (el.dataset.save) { e.preventDefault(); const id = el.dataset.save, on = !S.saved.has(id); on ? S.saved.add(id) : S.saved.delete(id); store.set('saved', [...S.saved]); const y = window.scrollY; render(); window.scrollTo(0, y); onScroll(); toast(on ? 'Added to My agenda' : 'Removed from My agenda'); }
  else if (el.id === 'lg' || el.dataset.lang) { S.lang = el.dataset.lang || (S.lang === 'en' ? 'am' : 'en'); store.set('lang', S.lang); S.visited.push('header/language'); render(); }
  else if (el.dataset.scale) { S.scale = +el.dataset.scale; store.set('scale', S.scale); render(); }
  else if (el.dataset.setTheme) { S.theme = el.dataset.setTheme; store.set('appearance', S.theme); render(); }
  else if (el.dataset.phase) { S.phase = el.dataset.phase; store.set('phase', S.phase); render(); }
  else if (el.dataset.toast) { toast(el.dataset.toast); }
  else if (el.dataset.linkout) { e.preventDefault(); dialogBox(`<h2 id="dt">You’re leaving the app</h2><p class="muted">Opening ${esc(el.dataset.linkout)}. We don’t share your data. (Sample interstitial — no real link.)</p><div class="dlg-actions"><button class="btn plain" value="x">Cancel</button><button class="btn" value="c">Continue</button></div>`, () => toast('Sample only: no real link')); }
  else if (el.dataset.task) { S.task = el.dataset.task; store.set('task', S.task); S.visited = []; S.firstTab = null; if (el.dataset.mode === 'tree') { S.mode = 'tree'; location.hash = '#/test/tree'; } else { S.mode = 'app'; location.hash = '#/home'; } }
  else if (el.dataset.tt) { const task = D.tasks.find(x => x[0] === S.task); if (el.dataset.top) { S.firstTab = el.dataset.tt; el.style.fontWeight = 700; return; }
    const ok = (TREE_MAP[el.dataset.tt] || [el.dataset.tt.toLowerCase()]).some(r => task[2].some(c => r === c || c.startsWith(r + '/') || r.startsWith(c + '/') || (r === 'menu/settings' && c === 'header/language'))); finish('tree', `${el.dataset.parent} > ${el.dataset.tt}`, S.firstTab || el.dataset.parent, ok); }
  else if (el.id === 'found') { const task = D.tasks.find(x => x[0] === S.task), last = route().split('?')[0]; finish('app', S.visited.filter(v => v !== 'test').join(' > '), S.firstTab || '', task[2].some(c => last === c || last.startsWith(c) || (c === 'header/language' && S.visited.includes('header/language')) || (c.startsWith('visit/') && last === c) || (c === 'programme' && last.startsWith('programme')) || (c === 'home' && last === 'home') || (c === 'updates' && last.startsWith('updates')) || (c === 'map' && last.startsWith('map')) || (c === 'menu/settings' && last.startsWith('menu/settings')))); }
  else if (el.id === 'del') { dialogBox(`<h2 id="dt">Delete your data?</h2><p class="muted">This removes your settings, saved sessions and test results from this browser.</p><div class="dlg-actions"><button class="btn plain" value="x">Cancel</button><button class="btn" style="background:var(--c-danger);color:var(--c-onDanger)" value="c">Delete</button></div>`, () => { store.clear(); S.saved = new Set(); S.results = []; S.lang = 'en'; S.theme = 'light'; S.scale = 1; S.task = null; S.signed = false; render(); toast('Your data was deleted'); }); }
  else if (el.id === 'signin') { S.signed = true; store.set('signed', true); render(); toast('Signed in (sample account)'); }
  else if (el.id === 'signout') { S.signed = false; store.set('signed', false); render(); toast('Signed out'); }
  else if (el.id === 'csv') { const csv = 'task,mode,first_click,path,success\n' + S.results.map(r => [r.task, r.mode, r.first, r.path, r.ok ? 'Y' : 'N'].map(x => `"${String(x).replace(/"/g, '""')}"`).join(',')).join('\n'); const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' })); a.download = 'tree-test-dry-run.csv'; a.click(); }
  else if (el.id === 'clr') { S.results = []; store.set('results', []); render(); } });
document.addEventListener('change', e => { const i = e.target.id; if (i === 's-reduce') { S.reduce = e.target.checked; store.set('reduce', S.reduce); } else if (i === 's-save') { S.save = e.target.checked; store.set('dataSaver', S.save); } else if (i === 's-dark') { S.theme = e.target.checked ? 'dark' : 'light'; store.set('appearance', S.theme); } else if (i === 's-off') { S.offline = e.target.checked; toast(S.offline ? 'Offline mode (simulated)' : 'Back online'); } else return; render(); });
document.addEventListener('submit', e => { if (e.target.id === 'sf') { e.preventDefault(); location.hash = '#/search?q=' + encodeURIComponent($('#q').value); } });
window.addEventListener('hashchange', render); render();
})();
