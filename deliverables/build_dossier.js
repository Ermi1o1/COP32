// Builds COP32-Platform-Proposal-v1.docx (EXTERNAL version). Colours come from docs/design/tokens.json.
const fs = require('fs'), path = require('path');
const D = require('docx');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle, AlignmentType, ImageRun, Header, Footer, PageNumber, TableOfContents, LevelFormat, PageBreak, TabStopType } = D;
const T = JSON.parse(fs.readFileSync('../docs/design/tokens.json')).color.light;
const hex = c => c.replace('#', '');
const PRIMARY = hex(T.primary), ACCENT = hex(T.accent), TEXT = hex(T.text), MUTED = hex(T.textSecondary), SOFT = hex(T.primarySoft), ALT = hex(T.surfaceAlt), WARNBG = hex(T.warningBg), WARN = hex(T.warning), DIV = hex(T.divider);
const FONT = 'Arial', W = 9638; // A4, 2 cm margins -> content width in DXA
const run = (t, o = {}) => new TextRun({ text: t, font: FONT, color: TEXT, size: 22, ...o });
const P = (t, o = {}) => new Paragraph({ spacing: { after: 120, line: 300 }, ...o, children: Array.isArray(t) ? t : [run(t)] });
const B = (t, lvl = 0) => new Paragraph({ numbering: { reference: 'bul', level: lvl }, spacing: { after: 60, line: 290 }, children: Array.isArray(t) ? t : [run(t)] });
const rich = (...parts) => parts.map(p => typeof p === 'string' ? run(p) : run(p.b, { bold: true }));
const H1 = t => new Paragraph({ heading: HeadingLevel.HEADING_1, pageBreakBefore: true, children: [new TextRun({ text: t, font: FONT })] });
const H2 = t => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: t, font: FONT })] });
const bd = { style: BorderStyle.SINGLE, size: 4, color: DIV };
const borders = { top: bd, bottom: bd, left: bd, right: bd };
function table(head, rows, widths) {
  const cell = (t, w, o = {}) => new TableCell({ width: { size: w, type: WidthType.DXA }, borders, margins: { top: 70, bottom: 70, left: 100, right: 100 }, shading: o.fill ? { type: ShadingType.CLEAR, fill: o.fill, color: 'auto' } : undefined,
    children: String(t).split('\n').map(l => new Paragraph({ spacing: { after: 40 }, children: [run(l, { size: 19, bold: !!o.bold, color: o.color || TEXT })] })) });
  return new Table({ width: { size: widths.reduce((a, b) => a + b, 0), type: WidthType.DXA }, columnWidths: widths,
    rows: [new TableRow({ tableHeader: true, children: head.map((h, i) => cell(h, widths[i], { fill: PRIMARY, bold: true, color: 'FFFFFF' })) }), ...rows.map((r, ri) => new TableRow({ cantSplit: true, children: r.map((c, i) => cell(c, widths[i], { fill: ri % 2 ? ALT : undefined, bold: i === 0 })) }))] });
}
const callout = (title, text) => new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: [W], rows: [new TableRow({ children: [new TableCell({ width: { size: W, type: WidthType.DXA }, borders: { top: { style: BorderStyle.SINGLE, size: 4, color: ACCENT }, bottom: { style: BorderStyle.SINGLE, size: 4, color: ACCENT }, right: { style: BorderStyle.SINGLE, size: 4, color: ACCENT }, left: { style: BorderStyle.SINGLE, size: 24, color: ACCENT } }, shading: { type: ShadingType.CLEAR, fill: WARNBG, color: 'auto' }, margins: { top: 100, bottom: 100, left: 160, right: 160 },
  children: [new Paragraph({ spacing: { after: 60 }, children: [run(title, { bold: true, color: WARN })] }), ...text.map(t => new Paragraph({ spacing: { after: 60 }, children: [run(t, { size: 20, color: WARN })] }))] })] })] });
const img = (f, w) => new ImageRun({ type: 'png', data: fs.readFileSync(path.join('../docs/design/prototype-screens', f)), transformation: { width: w, height: Math.round(w * 820 / 400) }, altText: { title: f, description: 'Prototype screen (sample data)', name: f } });
function shots(items) { const cw = Math.floor(W / items.length);
  return new Table({ width: { size: cw * items.length, type: WidthType.DXA }, columnWidths: items.map(() => cw), rows: [new TableRow({ children: items.map(([f, cap]) => new TableCell({ width: { size: cw, type: WidthType.DXA }, borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } }, margins: { left: 60, right: 60 },
    children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [img(f, Math.floor(cw / 15 - 6))] }), new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 80 }, children: [run(cap, { size: 16, color: MUTED })] })] })) })] }); }
const PH = t => run(t, { shading: { type: ShadingType.CLEAR, fill: 'FFF200', color: 'auto' } }); // visible placeholder to be completed by the founder

const S = [];
// ---- cover
S.push(new Paragraph({ spacing: { before: 2200 }, children: [run('INDEPENDENT, COMPLEMENTARY CIVIC-TECHNOLOGY INITIATIVE', { size: 20, bold: true, color: ACCENT, characterSpacing: 40 })] }));
S.push(new Paragraph({ spacing: { before: 200, after: 160 }, children: [run('A Public-Information Platform for COP32', { size: 60, bold: true, color: PRIMARY })] }));
S.push(new Paragraph({ spacing: { after: 400 }, children: [run('Research findings and project proposal — English and Amharic, Android, iOS and web', { size: 28, color: MUTED })] }));
S.push(new Paragraph({ border: { top: { style: BorderStyle.SINGLE, size: 12, color: PRIMARY, space: 12 } }, spacing: { before: 200, after: 120 }, children: [run('Prepared by Zega Tech PLC (registration in progress)', { size: 24, bold: true })] }));
S.push(new Paragraph({ spacing: { after: 120 }, children: [run('Version 1.0 · 3 October 2026', { size: 22, color: MUTED })] }));
S.push(callout('Status of this document', ['This is an independent proposal. It is not an official COP32, UNFCCC or Government of Ethiopia product, and it does not claim or imply endorsement, partnership or access to official data.', 'The prototype screens shown contain sample data only. No real COP32 programme exists yet in this work.']));
// ---- TOC
S.push(new Paragraph({ pageBreakBefore: true, children: [run('Contents', { size: 36, bold: true, color: PRIMARY })] }));
const PAGES = fs.existsSync('toc-pages.json') ? JSON.parse(fs.readFileSync('toc-pages.json')) : {};
const H1S = ['1. Executive summary','2. Vision, mission and problem','3. Who it is for','4. Why this is needed now','5. Product overview','6. Design approach','7. What has been validated, and what has not','8. Technical approach in plain language','9. Security, privacy and accessibility commitments','10. Governance, ownership and sustainability','11. Roadmap and decision gates','12. What we are asking for','Appendix: team and contact'];
H1S.forEach(h => S.push(new Paragraph({ tabStops: [{ type: TabStopType.RIGHT, position: W, leader: 'dot' }], spacing: { after: 100 }, children: [run(h), new TextRun({ text: '\t' + (PAGES[h] || ''), font: FONT, size: 22, color: TEXT })] })));
S.push(P([run('Headings in this document use Word’s built-in heading styles, so References > Table of Contents can also generate a live contents list.', { size: 16, color: MUTED })]));
// 1 exec summary
S.push(H1('1. Executive summary'));
S.push(P('COP32, the UN climate conference, is expected to be held in Addis Ababa, Ethiopia in November 2027 (dates and venue to be confirmed by the host). Accredited delegates will have official, access-controlled systems. Residents, visitors, journalists, side-event organisers and the global public currently have no single, trusted, bilingual and low-bandwidth source of practical information.'));
S.push(P('Zega Tech PLC proposes to build that source: a free-to-use information platform in English and Amharic on Android, iOS and the web, covering the public programme and side events, maps and accessibility information, a visitor companion for Addis Ababa, verified news and alerts, plain-language explainers, and an archive after the conference.'));
S.push(P([run('What is distinctive: ', { bold: true }), run('it focuses on the public and host-country layer rather than duplicating official delegate tools; Amharic is treated as a first-class language; personal data is minimised and kept on the device wherever possible; core content works offline; and the platform is designed to be handed to a suitable Ethiopian public institution and reused for future events.')]));
S.push(P([run('Where the work stands: ', { bold: true }), run('desk research, product definition, architecture and governance planning are complete. A clickable prototype with sample data and a design system exist. Testing with real users and on real devices has not yet been done, and the technical choices that depend on it remain open (section 7).')]));
S.push(P([run('What we ask: ', { bold: true }), run('a meeting with the appropriate COP32 office, guidance on the right route for a platform of this kind, structured public event information when the host is ready to share it, and permission to link to official streams and documents (section 12).')]));
// 2
S.push(H1('2. Vision, mission and problem'));
S.push(H2('Vision'));
S.push(P('The trusted public window into COP32 for everyone, in Ethiopia and worldwide, before, during and after the conference.'));
S.push(H2('Mission'));
S.push(P('Make COP32 understandable, accessible and participatory for people who are not in the negotiating rooms, and leave Ethiopia with a reusable digital platform for future events.'));
S.push(H2('Problem'));
S.push(P('Information about a major climate conference is spread across UN systems, government channels, partner websites and social media. Delegates receive a gated official platform; the public, remote followers, journalists, citizens and non-accredited visitors do not have one dependable place that explains what is happening, how to take part, how to get around Addis Ababa and what the conference decided. Experience at recent conferences also shows that practical city and entry guidance affects who can actually attend.'));
S.push(H2('Strategic objectives'));
['Credibility: an official link or listing and, in time, formal endorsement — pursued openly, never assumed.', 'A realistic adoption path: public pilot in mid-2027 and a design ready for hand-over.', 'Visibility and trust through press coverage and transparency.', 'Sustainability: a funding and ownership model that does not depend on advertising or data sales.', 'Legacy: an event-agnostic core that outlives COP32.'].forEach(t => S.push(B(t)));
// 3 users
S.push(H1('3. Who it is for'));
S.push(P('Users were prioritised from desk research on past conferences and on Ethiopia’s digital landscape. The personas are working hypotheses, to be validated through interviews and testing.'));
S.push(table(['Priority', 'Audience', 'Main needs'], [
  ['Primary', 'International visitors and non-accredited attendees', 'Can I attend? What is open to the public? Visa, transport, accommodation, safety, maps'],
  ['Primary', 'Residents of Addis Ababa', 'Amharic explanations, local events, road and transport changes, how to take part or volunteer'],
  ['Primary', 'Journalists and media', 'Press calendar, verified releases and documents, accurate schedule changes'],
  ['Primary', 'Remote and public followers', 'What is live now in my time zone, plain-language summaries, recordings, outcomes'],
  ['Primary', 'Side-event organisers and exhibitors', 'Listings, location and time changes, reaching audiences'],
  ['Operational', 'Volunteers and event staff', 'Quick answers offline, announcements, issue reporting'],
  ['Served through the public layer', 'NGOs, youth, researchers, business, speakers, sponsors, delegates and officials', 'Public programme, documents, archive; official delegate tools remain with the official systems']], [1900, 3300, 4438]));
S.push(P(''));
S.push(P('Design principle: roles change what the home screen emphasises, not what people are allowed to see. No account is required for public information.'));
// 4 why now
S.push(H1('4. Why this is needed now'));
S.push(P('A focused reality check was carried out at the start of the project to establish whether an official COP32 application or digital platform had been announced.'));
S.push(table(['Finding', 'Status'], [
  ['No official COP32 app, portal, procurement notice or digital participation platform had been announced by the host or the UN climate secretariat as of 1 October 2026.', 'Confirmed as an absence of evidence; absence is not proven, and the position will be re-checked quarterly.'],
  ['The UN climate secretariat has provided its own accredited-participant platform at recent conferences (COP28–COP30).', 'Established pattern; those platforms are gated to registered participants.'],
  ['COP32 dates, venue and public-access arrangements are not yet officially published in the sources reviewed.', 'To be confirmed with the host.']], [6200, 3438]));
S.push(P(''));
S.push(P([run('Positioning. ', { bold: true }), run('The initiative is therefore positioned as complementary to official systems: it serves the public and host-country audience, links to official sources and labels every item by source. It does not replicate delegate negotiation tools. If an official host application is announced, the response is to seek partnership or integration before any duplication.')]));
// 5 product overview
S.push(H1('5. Product overview'));
S.push(H2('Structure'));
S.push(P('Five bottom tabs, tested against Android and iOS navigation guidance and the lessons from comparable event and tourism apps, with lower-frequency items in a header menu:'));
S.push(table(['Tab', 'What it contains'], [
  ['Home', 'Next saved session, priority alerts, “can I attend?”, shortcuts; changes with the phase of the event (before, during, after)'],
  ['Programme', 'Schedule by day, side events, speakers, exhibitors and pavilions, personal agenda with time-zone display'],
  ['Map', 'Venue and city maps, points of interest, accessibility information, directions (hand-off to the phone’s map app), offline use'],
  ['Visit', 'Arrival checklist, links to the official e-visa portal, transport and ride options, accommodation links, attractions, coffee culture, health and safety'],
  ['Updates', 'Verified news, alert history, press centre, live and recorded streams (links), explainers, daily digest'],
  ['Header menu', 'Learn (COP explained, glossary), library, archive, settings and privacy, help, about']], [1900, 7738]));
S.push(P(''));
S.push(H2('Prototype screens (sample data)'));
S.push(P('A clickable prototype exists so that stakeholders can see how the platform would look and work. It runs in a web browser, uses sample data throughout and carries a visible “prototype — not an official COP32 product” banner.'));
S.push(shots([['01-home-en.png', 'Home (English)'], ['02-home-am.png', 'Home (Amharic draft*)'], ['03-programme.png', 'Programme'], ['06-visit.png', 'Visit']]));
S.push(shots([['05-map.png', 'Map (schematic)'], ['07-explainers.png', 'Explainers'], ['10-settings-200.png', 'Settings at 200% text'], ['14-home-dark.png', 'Dark theme']]));
S.push(P([run('* Amharic text in the prototype is a machine-drafted placeholder and has not been reviewed by a native speaker. The map in the prototype is a schematic stand-in; a real offline map was built and tested separately (section 7).', { size: 17, color: MUTED })]));
S.push(H2('Feature scope: MVP and later'));
S.push(table(['Release', 'Timing (planned)', 'Scope'], [
  ['Demo', 'By 31 Dec 2026', 'Sample-data demonstration of the main flows in English and Amharic; clearly labelled'],
  ['Pilot', 'From mid-2027', 'Real public content: notifications with consent, search, offline city pack, transport information, explainers, press section, privacy controls, accessibility baseline'],
  ['Event', 'Sep–Oct 2027', 'Programme import and change alerts, venue maps, live-stream links, relayed safety alerts, side-events directory, organiser portal, volunteer mode'],
  ['After the event', 'From Dec 2027', 'Archive, outcomes, recordings (links), follow-up, reuse for other events']], [1700, 2200, 5738]));
S.push(P(''));
S.push(P('Deliberately out of scope: delegate negotiation workflows, in-app bookings or payments (the platform links to official portals and approved providers), open messaging and user-generated content that would need heavy moderation, advertising, and additional languages in the first release.'));
// 6 (design) + 7 validation
S.push(H1('6. Design approach'));
S.push(B('Spacious, calm layouts with large touch targets (48 dp Android, 44 pt iOS), reflowing at 200% text size.'));
S.push(B('A bundled Ethiopic font (Noto Sans Ethiopic, SIL Open Font Licence) so Amharic does not depend on what a phone happens to have installed; all icons are drawn as vector graphics.'));
S.push(B('Light and dark themes with colour contrast calculated against WCAG 2.2 AA (46 of 46 checked colour pairs pass); status is never conveyed by colour alone.'));
S.push(B('An original, neutral visual identity. It deliberately does not imitate the UN climate secretariat’s, any host or government identity.'));
S.push(B('No manipulative design: no fake urgency, no pre-ticked consent, notification and location requests explained first and always refusable.'));
S.push(P('The design system and component inventory are available on request.'));
S.push(H1('7. What has been validated, and what has not'));
S.push(callout('Please read this section carefully', ['Everything below is stated as it actually happened. “Sandbox” means desk research or small experiments on a development computer with sample data. Nothing in this table has been tested by members of the public, on target phones, or with Ethiopian service providers unless stated.']));
S.push(P(''));
S.push(table(['Area', 'What was done', 'What is still pending'], [
  ['Market and official landscape', 'Desk research on COP28–COP30 platforms, event-app benchmarks and Ethiopia’s digital landscape (sources recorded in the project register).', 'Hands-on testing of benchmark apps; re-check for official announcements each quarter.'],
  ['Users', 'Personas and journeys from desk research.', 'Interviews with real users (questionnaire prepared, not yet run).'],
  ['Navigation structure', 'Expert (heuristic) walkthrough of the structure against twelve typical tasks; two changes made on that basis.', 'Real card sort (8–12 people) and tree test (10–15 people) in English and Amharic; native-speaker review of all Amharic labels.'],
  ['Mobile framework (Flutter vs React Native)', 'Both rendered an Amharic test set correctly in web builds with a bundled font; one common pitfall (missing symbol glyph) found and turned into a design rule.', 'No native builds, no real phones, no screen-reader tests. No framework has been chosen.'],
  ['Search', 'Three search engines compared on a small synthetic data set with a custom Amharic-aware normaliser; a database-based approach looks sufficient.', 'Review of the rules by a linguist; realistic data; handling of Amharic word forms.'],
  ['Offline maps', 'An offline map of central Addis was built from open map data and rendered with Amharic labels (about 2–5 MB depending on detail).', 'Tests on phones; field check of places; only about 18% of map features have Amharic names today.'],
  ['Content updates', 'A signed, versioned update mechanism was prototyped and passed 13 of 13 tamper and interruption tests on a local computer.', 'Real mobile networks, content-delivery networks, load testing.'],
  ['Content management system', 'Licences and feature tiers of three candidates read from vendor sources.', 'Hands-on build; legal review of licences; none selected.'],
  ['Hosting in Ethiopia', 'Public information on five providers gathered; questionnaire drafted.', 'No provider contacted yet; prices, certifications, tests all pending.'],
  ['Push notifications', 'Platform requirements documented.', 'All delivery tests pending (need devices and accounts).'],
  ['Prototype and design system', 'Built; contrast ratios calculated; reflow checked by screenshot.', 'Usability testing, screen-reader and device testing, accessibility audit.']], [2100, 4100, 3438]));
// 8 tech
S.push(H1('8. Technical approach in plain language'));
S.push(B('Public content (programme, guides, maps) is published as versioned, digitally signed bundles that apps download and keep on the phone, so the main information keeps working with weak or no connection.'));
S.push(B('Personal data is kept to a minimum and, where it must be stored on a server, is intended to be hosted in Ethiopia; the platform has no advertising or tracking software.'));
S.push(B('A conventional, well-understood server stack (relational database, open-source content management, open map data) chosen for reliability and ease of hand-over rather than novelty.'));
S.push(B('Degrades gracefully: live service, then cached content, then content on the device, then a static emergency page.'));
S.push(B('Planned targets, to be validated: app download about 30 MB or less; essential offline content about 3 MB; web first view about 200 KB; recovery within one hour.'));
S.push(P('Specific technology choices (mobile framework, content management system, search engine, hosting provider, push service) are deliberately not final: they depend on the real-device and provider tests listed in section 7.'));
// 9 security
S.push(H1('9. Security, privacy and accessibility commitments'));
S.push(P('These are design commitments for the build; none has yet been independently audited.'));
S.push(H2('Privacy'));
S.push(B('Use without an account; personal data stays on the device by default; location used only when the user asks and processed on the device.'));
S.push(B('No advertising or behavioural-tracking software; aggregate, anonymous analytics only; click-to-load for third-party embeds.'));
S.push(B('Bilingual privacy notice, consent controls of equal prominence for “allow” and “not now”, and in-app data deletion.'));
S.push(B('Alignment with Ethiopia’s Personal Data Protection Proclamation No. 1321/2024; the exact scope of its local-storage requirement is being confirmed with legal counsel.'));
S.push(H2('Security'));
S.push(B('Industry baselines for web and mobile (OWASP ASVS and MASVS), multi-factor authentication for all staff, signed content, dual approval for any safety alert, audit logging and encrypted backups.'));
S.push(B('Independent penetration tests are planned before the pilot and before the event.'));
S.push(H2('Accessibility and language'));
S.push(B('Target of WCAG 2.2 AA; text scaling to 200%; screen-reader support including language tagging for Amharic; reduced-motion and data-saver modes; captions for supported media.'));
S.push(B('English and Amharic from the first release, with visible fallback to English where a translation is pending; professional translation and native-speaker review before any public release.'));
// 10 gov
S.push(H1('10. Governance, ownership and sustainability'));
S.push(callout('Stated as intent, not settled fact', ['No agreement with any government body exists. The company is in the process of registration. The items below describe what is intended and proposed.']));
S.push(P(''));
S.push(B('Intended ownership: the platform is designed so that a suitable Ethiopian public institution can own the COP32 instance and its content. A split model is proposed first (government owns the instance and content; Zega Tech retains a reusable core under licence), with full assignment or an open-source release as alternatives, to be decided at the March 2027 gate.'));
S.push(B('Funding: a host or government service contract, or donor funding for a government-owned public good, are the primary routes; licence terms and a post-event support retainer follow. Capped and screened sponsorship and a start-up fund bridge are possible but conditional.'));
S.push(B('Principles that will not change: no advertising, no paid listings, no affiliate commissions and no sale of data.'));
S.push(B('Team arrangements, intellectual-property assignments and any profit-participation scheme are being put on a written legal footing before public release.'));
S.push(B('Sustainability: an event-agnostic core so the platform can serve later events, and a low-cost “hibernation” archive mode after COP32.'));
// 11 roadmap
S.push(H1('11. Roadmap and decision gates'));
S.push(table(['Gate', 'Date', 'What must be true'], [
  ['G1', '31 Dec 2026', 'Company registered or at final stage; contributor agreements signed; demonstration complete; first meeting with the host requested or held; key technical choices decided or scheduled'],
  ['G2', '31 Mar 2027', 'Written support, pilot agreement or funding application submitted; ownership structure agreed in principle; hosting chosen'],
  ['G3', '31 May 2027', 'Pilot features working on all three platforms; hosting live in Ethiopia; first penetration test booked'],
  ['G4', '31 Aug 2027', 'Pilot results reviewed; official-platform and data status known; decision to scale, integrate, partner or pivot'],
  ['G5', '15 Oct 2027', 'Second penetration test closed; load and alert drills passed; operations roster; store releases approved']], [900, 1700, 7038]));
S.push(P(''));
S.push(P('Pre-defined responses exist for the main scenarios: official adoption, independent pilot, pivot or partnership if an official application appears, funding delay, change of event dates, and fallback ownership. The native mobile build will not start until the prototype has been reviewed and the mobile framework decision is made on real-device evidence.'));
// 12 asks
S.push(H1('12. What we are asking for'));
S.push(table(['To', 'Request'], [
  ['COP32 Presidency Secretariat / appropriate host office', 'A meeting; guidance on the correct office and process for a platform of this kind; early information on public-access arrangements; structured public programme and venue information when ready'],
  ['Digital, ICT and Utilities Task Force (host)', 'A technical meeting (about 45 minutes); guidance on hosting, security and any assessment or registration requirements; whether a programme-data service or alert channel is planned'],
  ['Owners of official streams and recordings', 'Guidance and permission to link to, or embed, official live streams and recordings'],
  ['Accommodation platform or programme', 'Whether an official accommodation platform exists, and permission to link to it'],
  ['Telecommunications and connectivity partners', 'Discussion of connectivity cooperation, for example low-cost or zero-rated access to public information'],
  ['Tourism, meteorology and transport authorities', 'Authoritative visitor, weather and public-transport information that can be linked or republished with attribution'],
  ['Authorities able to authorise safety alerts', 'A protocol for relaying authorised alerts, with signing and dual approval, if they consider it useful'],
  ['Funders and partners', 'Support for the pilot and event phases, in cash or in kind, consistent with the principles in section 10']], [3200, 6438]));
S.push(P(''));
S.push(P('We will provide on request: the one-page overview, the prototype, the design system, and the full technical, privacy and governance documentation.'));
// 13 appendix
S.push(H1('Appendix: team and contact'));
S.push(P([run('Zega Tech PLC ', { bold: true }), run('(registration in progress)')]));
S.push(P([run('Contact: '), PH('[Founder name]'), run(', Founder · '), PH('[phone]'), run(' · '), PH('[email]')]));
S.push(P([run('Team: ', { bold: true }), run('a small group of engineers, a business analyst and a project manager, working with the founder as product owner. Names and roles will be provided to recipients on request once contributor agreements are in place.')]));
S.push(P([run('Note: ', { bold: true }), run('items highlighted in yellow are placeholders for the sender to complete before this document is shared.')]));
S.push(H2('Sources and documentation'));
S.push(P('Research sources, decision records and the architecture documents are kept in the project repository and are available on request. Statements about third-party facilities, laws and products come from public sources and vendor statements and have not been independently verified; they are marked as such in the supporting documents.'));

const doc = new Document({
  creator: 'Zega Tech PLC', title: 'A Public-Information Platform for COP32 — Proposal v1.0', description: 'Independent, unofficial proposal',
  styles: { default: { document: { run: { font: FONT, size: 22, color: TEXT } } },
    paragraphStyles: [
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: FONT, size: 36, bold: true, color: PRIMARY }, paragraph: { spacing: { before: 120, after: 200 }, outlineLevel: 0 } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: FONT, size: 26, bold: true, color: ACCENT }, paragraph: { spacing: { before: 240, after: 100 }, outlineLevel: 1 } }] },
  numbering: { config: [{ reference: 'bul', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 270 } } } }, { level: 1, format: LevelFormat.BULLET, text: '–', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 1080, hanging: 270 } } } }] }] },
  sections: [{ properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1247, bottom: 1247, left: 1134, right: 1134 } } },
    headers: { default: new Header({ children: [new Paragraph({ border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: DIV, space: 4 } }, children: [run('Public-Information Platform for COP32 — independent proposal, not an official product', { size: 16, color: MUTED })] })] }) },
    footers: { default: new Footer({ children: [new Paragraph({ tabStops: [{ type: TabStopType.RIGHT, position: W }], children: [run('Zega Tech PLC · v1.0 · 3 October 2026', { size: 16, color: MUTED }), new TextRun({ children: ['\tPage ', PageNumber.CURRENT, ' of ', PageNumber.TOTAL_PAGES], font: FONT, size: 16, color: MUTED })] })] }) },
    children: S }] });
Packer.toBuffer(doc).then(b => { fs.writeFileSync('COP32-Platform-Proposal-v1.docx', b); console.log('written', b.length); });
