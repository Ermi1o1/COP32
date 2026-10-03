/* Illustrated persona system — original flat-vector people for the prototype. All people are INVENTED; no photos, no real persons.
   person(p, x, baseY, scale) draws a half-body figure; PEOPLE maps speaker ids and extra roles to looks. */
(() => {
const SKIN = ['#F1D3B3', '#D9A877', '#B97F52', '#8D5A36', '#6B4126', '#4A2C1A'];
const shade = (hex, f) => { const n = parseInt(hex.slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255, c = v => Math.max(0, Math.min(255, Math.round(v * f))); return '#' + [c(r), c(g), c(b)].map(v => v.toString(16).padStart(2, '0')).join(''); };
function hair(p, s) { const h = p.hairColor || '#1E140E', d = shade(h, .7);
  switch (p.hair) {
    case 'afro': return `<circle cx="0" cy="-92" r="27" fill="${h}"/><circle cx="-14" cy="-104" r="13" fill="${d}" opacity=".35"/>`;
    case 'short': return `<path d="M-18 -88q-2-24 18-26 22 0 19 26-4-12-19-13-14 1-18 13z" fill="${h}"/>`;
    case 'fade': return `<path d="M-17 -90q0-22 17-23 18 1 17 23-6-9-17-10-11 1-17 10z" fill="${h}"/>`;
    case 'long': return `<path d="M-21 -84q-4-34 21-35 26 1 21 35l3 34h-12l-4-30q-4-13-8-20-6 9-17 13-3 10-4 37h-10z" fill="${h}"/>`;
    case 'bun': return `<circle cx="0" cy="-118" r="10" fill="${h}"/><path d="M-19 -86q-1-27 19-28 21 1 19 28-4-14-19-16-15 2-19 16z" fill="${h}"/>`;
    case 'braids': return `<path d="M-20 -84q-3-32 20-33 23 1 20 33z" fill="${h}"/>${[-18, -12, 12, 18].map(x => `<path d="M${x} -88v${44 - Math.abs(x)}" stroke="${h}" stroke-width="5" stroke-linecap="round"/>`).join('')}<path d="M-14 -108q14-8 28 0" stroke="${d}" stroke-width="2" fill="none"/>`;
    case 'wrap': return `<path d="M-22 -86q-4-36 22-38 27 2 22 38-8-10-22-11-14 1-22 11z" fill="${p.wrap || '#E8862A'}"/><path d="M-20 -110q20-14 40 0" stroke="${shade(p.wrap || '#E8862A', .75)}" stroke-width="3" fill="none"/><circle cx="14" cy="-120" r="8" fill="${p.wrap || '#E8862A'}"/>`;
    case 'hijab': return `<path d="M-25 -82q-4-40 25-40 29 0 25 40l6 44q-31 16-62 0z" fill="${p.wrap || '#2A8285'}"/>`;
    case 'cap': return `<path d="M-19 -94q0-20 19-20 20 0 19 20z" fill="${p.wrap || '#2E4057'}"/><path d="M8 -96h20q2 4-4 6H8z" fill="${shade(p.wrap || '#2E4057', .7)}"/>`;
    case 'kufi': return `<path d="M-17 -100q0-14 17-14 17 0 17 14z" fill="${p.wrap || '#F5F1E6'}"/><path d="M-17 -100h34" stroke="${shade(p.wrap || '#F5F1E6', .8)}" stroke-width="2"/>`;
    case 'bald': return '';
    case 'gray': return `<path d="M-18 -86q-1-22 18-24 20 1 18 24-3-9-18-11-15 2-18 11z" fill="#C9C4BC"/>`;
    default: return '';
  } }
function prop(p, skin) { const sk = shade(skin, .92);
  switch (p.prop) {
    case 'mic': return `<path d="M22 -2q-2-34 -6-44" stroke="${p.shirt}" stroke-width="15" stroke-linecap="round" fill="none"/><circle cx="15" cy="-48" r="7" fill="${sk}"/><path d="M14 -52l-5-16" stroke="#222" stroke-width="4" stroke-linecap="round"/><circle cx="8" cy="-71" r="6" fill="#333"/>`;
    case 'laptop': return `<path d="M-34 -6l6-30h56l6 30z" fill="#C7CED6"/><path d="M-34 -6h68v6h-68z" fill="#9AA4AE"/><circle cx="0" cy="-22" r="4" fill="#9BE15D"/>`;
    case 'seedling': return `<ellipse cx="0" cy="-26" rx="20" ry="8" fill="${sk}"/><ellipse cx="0" cy="-31" rx="13" ry="5" fill="#6B4E2E"/><path d="M0 -33v-16" stroke="#3E8E41" stroke-width="3"/><path d="M0 -44q-12-2-12-12 11 0 12 12zM0 -47q12-3 13-13-12 1-13 13z" fill="#5FB36A"/>`;
    case 'jebena': return `<circle cx="18" cy="-24" r="13" fill="#1E140E"/><path d="M14 -36l-2-14h12l-2 14z" fill="#1E140E"/><path d="M29 -28q10-4 11-14" stroke="#1E140E" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M8 -28q-8-4-6-12" stroke="#1E140E" stroke-width="3" fill="none"/><circle cx="-14" cy="-16" r="5" fill="#F5F1E6"/><circle cx="-26" cy="-16" r="5" fill="#F5F1E6"/><path d="M24 -56q4-8-2-14M30 -58q4-6-1-12" stroke="#fff" stroke-width="2" fill="none" opacity=".6"/>`;
    case 'phone': return `<path d="M24 -2q-2-30 -8-40" stroke="${p.shirt}" stroke-width="15" stroke-linecap="round" fill="none"/><rect x="6" y="-66" width="14" height="24" rx="3" fill="#222"/><rect x="8" y="-63" width="10" height="16" rx="1" fill="#7FD1E3"/><circle cx="16" cy="-44" r="6" fill="${sk}"/>`;
    case 'clipboard': return `<rect x="-14" y="-48" width="28" height="36" rx="3" fill="#A67C52"/><rect x="-10" y="-44" width="20" height="28" fill="#FFF"/><path d="M-7 -38h14M-7 -32h14M-7 -26h9" stroke="#9AA4AE" stroke-width="2"/><rect x="-5" y="-51" width="10" height="5" rx="2" fill="#555"/>`;
    case 'camera': return `<rect x="-18" y="-56" width="36" height="24" rx="4" fill="#2B2B2B"/><circle cx="0" cy="-44" r="8" fill="#4A6382"/><circle cx="0" cy="-44" r="4" fill="#9FB3C8"/><rect x="8" y="-60" width="8" height="5" fill="#2B2B2B"/>`;
    case 'book': return `<path d="M-26 -14l26 6 26-6v-28l-26 6-26-6z" fill="#FFF"/><path d="M0 -8v-28" stroke="#C9C4BC" stroke-width="2"/><path d="M-26 -14l26 6 26-6" stroke="${p.accent || '#2A8285'}" stroke-width="3" fill="none"/>`;
    case 'tablet': return `<rect x="-16" y="-50" width="32" height="40" rx="4" fill="#2B2B2B"/><rect x="-13" y="-47" width="26" height="34" rx="2" fill="#DCEBF5"/><path d="M-9 -22l6-8 5 4 7-10" stroke="#155E63" stroke-width="2" fill="none"/>`;
    case 'suitcase': return `<rect x="40" y="-44" width="30" height="44" rx="5" fill="${p.accent || '#E8862A'}"/><path d="M48 -44v-8h14v8" stroke="#333" stroke-width="3" fill="none"/><path d="M45 -30h20" stroke="${shade(p.accent || '#E8862A', .75)}" stroke-width="2"/>`;
    case 'plate': return `<ellipse cx="0" cy="-22" rx="26" ry="8" fill="#F5F1E6"/><ellipse cx="0" cy="-24" rx="18" ry="5" fill="#C9874A"/><circle cx="-6" cy="-26" r="3" fill="#B3463E"/><circle cx="6" cy="-26" r="3" fill="#5FB36A"/>`;
    case 'stetho': return `<path d="M-12 -56q-6 26 12 30 18-4 12-30" stroke="#333" stroke-width="2.5" fill="none"/><circle cx="0" cy="-24" r="4" fill="#9AA4AE"/>`;
    case 'map': return `<path d="M-24 -44l16-4 16 4 16-4v30l-16 4-16-4-16 4z" fill="#F5F1E6"/><path d="M-8 -48v30M8 -44v30" stroke="#C9C4BC" stroke-width="1.5"/><circle cx="2" cy="-30" r="3" fill="#B3463E"/>`;
    default: return ''; } }
function person(p, x = 230, y = 160, s = 1) {
  const skin = SKIN[p.skin || 0], sd = shade(skin, .85), shirt = p.shirt || '#155E63', jd = shade(shirt, .78);
  const outfit = p.jacket ? `<path d="M-44 0q-2-44 22-56h44q24 12 22 56z" fill="${p.jacket}"/><path d="M-10 -56l10 26 10-26z" fill="${shirt}"/><path d="M-10 -56l-8 18 10 6M10 -56l8 18-10 6" fill="${shade(p.jacket, .8)}"/>`
    : `<path d="M-42 0q-2-44 22-56h40q24 12 22 56z" fill="${shirt}"/><path d="M-9 -56q9 12 18 0" fill="${jd}"/>`;
  const netela = p.netela ? `<path d="M-42 -8q-2-40 22-50l6 2q-18 18-14 48zM42 -8q2-40-22-50l-6 2q18 18 14 48z" fill="#F7F3EA"/><path d="M-30 -6q-3-26 10-44M30 -6q3-26-10-44" stroke="${p.tibeb || '#2A8285'}" stroke-width="3" fill="none"/>` : '';
  const badge = p.badge === false ? '' : `<path d="M-10 -56l10 20 10-20" stroke="${p.lanyard || '#9BE15D'}" stroke-width="2.5" fill="none"/><rect x="-6" y="-38" width="12" height="15" rx="2" fill="#FFF"/><rect x="-4" y="-35" width="8" height="3" fill="${p.lanyard || '#9BE15D'}"/>`;
  const face = `<ellipse cx="-6.5" cy="-86" rx="2.1" ry="2.5" fill="#1B1B1B"/><ellipse cx="6.5" cy="-86" rx="2.1" ry="2.5" fill="#1B1B1B"/><path d="M-10 -92q3-2 6 0M4 -92q3-2 6 0" stroke="${shade(p.hairColor || '#1E140E', 1)}" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M0 -84q-1 4 1 5" stroke="${sd}" stroke-width="1.5" fill="none" stroke-linecap="round"/><path d="M-5 -75q5 4 10 0" stroke="#7A2E22" stroke-width="1.8" fill="none" stroke-linecap="round"/>`;
  const glasses = p.glasses ? `<circle cx="-6.5" cy="-86" r="5.5" fill="none" stroke="#222" stroke-width="1.6"/><circle cx="6.5" cy="-86" r="5.5" fill="none" stroke="#222" stroke-width="1.6"/><path d="M-1 -86h2" stroke="#222" stroke-width="1.6"/>` : '';
  const beard = p.beard ? `<path d="M-15 -82q0 18 15 20 15-2 15-20-4 8-15 8-11 0-15-8z" fill="${p.hairColor === '#C9C4BC' ? '#C9C4BC' : (p.hairColor || '#1E140E')}"/><path d="M-5 -75q5 3 10 0" stroke="#7A2E22" stroke-width="1.6" fill="none"/>` : '';
  const hat = p.prop === 'hardhat' ? `<path d="M-21 -96q0-24 21-24 21 0 21 24z" fill="#F2B33D"/><path d="M-25 -96h50v5h-50z" fill="#D9961F"/>` : '';
  const back = ['afro', 'long', 'hijab', 'braids'].includes(p.hair) ? hair(p) : '';
  const front = ['afro', 'long', 'hijab', 'braids'].includes(p.hair) ? (p.hair === 'hijab' ? `<path d="M-19 -88q0-26 19-27 20 1 19 27-2-14-19-15-17 1-19 15z" fill="${p.wrap || '#2A8285'}"/>` : p.hair === 'long' ? `<path d="M-18 -90q2-22 18-23 18 1 18 23-8-14-18-14-10 0-18 14z" fill="${p.hairColor || '#1E140E'}"/>` : p.hair === 'braids' ? `<path d="M-19 -90q1-22 19-23 19 1 19 23-6-12-19-13-13 1-19 13z" fill="${p.hairColor || '#1E140E'}"/>` : '') : hair(p);
  return `<g transform="translate(${x} ${y}) scale(${s})">${p.prop === 'suitcase' ? prop(p, skin) : ''}${back}${outfit}${netela}<rect x="-7" y="-68" width="14" height="14" fill="${sd}"/>${badge}<ellipse cx="0" cy="-86" rx="17" ry="20" fill="${skin}"/><ellipse cx="-17" cy="-85" rx="3" ry="5" fill="${sd}"/><ellipse cx="17" cy="-85" rx="3" ry="5" fill="${sd}"/>${face}${beard}${glasses}${front}${hat}${p.prop !== 'suitcase' ? prop({ ...p, shirt: p.jacket || shirt }, skin) : ''}</g>`; }
// ---- invented personas (speakers P01–P20 map 1:1 to the fictional speaker list in data.js)
const P = {
 P01: { skin: 2, hair: 'braids', shirt: '#2A8285', netela: true, tibeb: '#B3463E', prop: 'tablet' },
 P02: { skin: 3, hair: 'fade', beard: true, shirt: '#3E5C76', prop: 'hardhat' },
 P03: { skin: 4, hair: 'afro', shirt: '#E8862A', prop: 'phone', lanyard: '#FFD166' },
 P04: { skin: 2, hair: 'short', glasses: true, jacket: '#2E4057', shirt: '#F5F1E6', prop: 'clipboard' },
 P05: { skin: 3, hair: 'wrap', wrap: '#5B3FB0', shirt: '#F2B33D', prop: 'laptop' },
 P06: { skin: 4, hair: 'cap', wrap: '#6B4E2E', beard: true, shirt: '#5E8F2B', prop: 'seedling', badge: false },
 P07: { skin: 3, hair: 'hijab', wrap: '#155E63', shirt: '#DCEBF5', prop: 'stetho' },
 P08: { skin: 2, hair: 'long', shirt: '#B3463E', prop: 'mic' },
 P09: { skin: 4, hair: 'kufi', wrap: '#F5F1E6', beard: true, shirt: '#8A6D1F', netela: true, tibeb: '#E8862A', prop: 'map' },
 P10: { skin: 3, hair: 'short', glasses: true, shirt: '#5FB36A', prop: 'seedling' },
 P11: { skin: 3, hair: 'gray', hairColor: '#C9C4BC', beard: true, shirt: '#3E2A1A', netela: true, tibeb: '#5FB36A', prop: 'seedling' },
 P12: { skin: 1, hair: 'bun', glasses: true, shirt: '#7FB8D9', prop: 'book', accent: '#155E63' },
 P13: { skin: 4, hair: 'braids', shirt: '#2E4057', prop: 'hardhat' },
 P14: { skin: 2, hair: 'short', shirt: '#2A9DB5', prop: 'tablet' },
 P15: { skin: 5, hair: 'bald', beard: true, jacket: '#1F4D6B', shirt: '#FFF', prop: 'clipboard' },
 P16: { skin: 3, hair: 'wrap', wrap: '#E8862A', shirt: '#155E63', prop: 'mic' },
 P17: { skin: 2, hair: 'bun', glasses: true, shirt: '#4A6382', prop: 'tablet' },
 P18: { skin: 5, hair: 'wrap', wrap: '#2BB3A3', shirt: '#FFD166', prop: 'mic' },
 P19: { skin: 1, hair: 'long', hairColor: '#2B1D16', shirt: '#E07A6F', prop: 'stetho' },
 P20: { skin: 0, hair: 'short', hairColor: '#6B4A2E', glasses: true, jacket: '#3E5C76', shirt: '#F5F1E6', prop: 'laptop' },
 // extra invented roles for guides, news and live cards
 traveller: { skin: 1, hair: 'long', hairColor: '#8A5A2E', shirt: '#2A9DB5', prop: 'suitcase', accent: '#E8862A', badge: false },
 buna: { skin: 3, hair: 'braids', shirt: '#F7F3EA', netela: true, tibeb: '#B3463E', prop: 'jebena', badge: false },
 chef: { skin: 4, hair: 'wrap', wrap: '#F5F1E6', shirt: '#F5F1E6', prop: 'plate', badge: false },
 driver: { skin: 3, hair: 'fade', shirt: '#2E4057', prop: 'phone', badge: false },
 guide: { skin: 3, hair: 'cap', wrap: '#B3463E', shirt: '#5FB36A', prop: 'map', badge: false },
 nurse: { skin: 2, hair: 'bun', shirt: '#DCEBF5', prop: 'stetho', badge: false },
 officer: { skin: 4, hair: 'short', jacket: '#2E4057', shirt: '#F5F1E6', prop: 'clipboard', badge: false },
 volunteer: { skin: 4, hair: 'afro', shirt: '#9BE15D', prop: 'tablet', lanyard: '#155E63' },
 journalist: { skin: 2, hair: 'short', beard: true, shirt: '#4A6382', prop: 'camera' },
 reporter: { skin: 3, hair: 'long', shirt: '#E8862A', prop: 'mic', lanyard: '#FFD166' },
 delegate: { skin: 5, hair: 'bald', jacket: '#1F2A44', shirt: '#F5F1E6', prop: 'tablet' },
 student: { skin: 2, hair: 'afro', shirt: '#8E6BE0', prop: 'book', accent: '#F2B33D' },
 banker: { skin: 1, hair: 'short', hairColor: '#3A2A20', glasses: true, jacket: '#2E4057', shirt: '#DCEBF5', prop: 'tablet' } };
window.PEOPLE = { person, P, SKIN };
})();
