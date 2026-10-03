# Heuristic Walkthrough (expert review) — NOT a substitute for the real card sort / tree test

**Phase 21, Track A · 2026-10-03 · Basis: desk-based cognitive walkthrough by Claude. No participants, no recordings, no Amharic speakers were involved.**

This document is a *simulation of judgment*. It predicts where a first-time user would click for each tree-test task (T1–T12) and where the 40 cards are ambiguous, using the IA (`docs/ux/information-architecture.md`, D16 v2), the personas (P1–P7), and the IA kit (`docs/ux/ia-validation-kit.md`). It estimates risk; it does **not** measure it. Nothing here counts as "validated with users". The real card sort and tree test remain open (see the last section).

Confidence ratings below mean: *how confident I am that the real tree test will meet its target (≥70–80%)*. They are expert guesses, not pass/fail claims.

---

## 1. Method
For each task I (1) took the wording a participant would hear, (2) listed the top-level labels a first-time user would plausibly scan, (3) picked the most likely first click and the plausible alternatives, and (4) noted what in the structure causes a wrong turn. I used personas P1–P7 as the "who" (P7 staff use the CMS, not the public app, so they are out of scope for tab IA; P6 volunteer mode is role-gated and not in the tree at all — see §4).

Known walkthrough limits: I am reasoning from English labels; Amharic first-click behaviour can differ and cannot be predicted here; real users skim differently than an analyst; the tree has no icons or search, which makes the test harsher than the real app.

---

## 2. Task-by-task walkthrough (T1–T12)

| Task | Persona | Most likely first click | Plausible wrong turns | Why | Risk |
|---|---|---|---|---|---|
| **T1** Landed at Bole, get to hotel | P1 | **Visit** (Getting around) | **Map** (Directions) | "Get to" = directions → Map is a real competitor; but "airport", "hotel" are trip words → Visit. Map's Directions node is generic and has no airport cue | Low–Med |
| **T2** Can the public attend without a badge? | P1, P2 | **Home** (shortcut) or **Visit** | Menu → Learn; Programme (looking for "open to public") | Intended answer set is already generous (Home or Learn). "Can I attend?" is split Home/Visit in the cards, so the tree has the word "Shortcuts" only — not a scannable label | Medium |
| **T3** Events tomorrow open to everyone | P1, P2 | **Programme** | Home | Strong match on "events". "Open to everyone" is a filter, which a tree can't show; first click will still be right | Low |
| **T4** Saved session has moved | P1 | **Programme** (My agenda) or **Home** | Updates | Accepted answers cover all three; anything other than Menu/Visit/Map passes | Low |
| **T5** Journalist, today's press releases | P3 | **Updates** (Press centre) | Programme (press conferences); Menu → Library (press kits) | "Press releases" ≈ news → Updates. Press *kits* sit in Library per the IA, creating a split | Low–Med |
| **T6** Step-free entrance | P1 | **Map** (Accessibility) | Visit → Health & safety; Menu → Help | "Entrance" is spatial → Map | Low |
| **T7** See a coffee ceremony | P1 | **Visit** (Coffee culture) | Programme (cultural session type) | Explicit node "Coffee culture". Risk only if a cultural session exists | Low |
| **T8** Change language to Amharic | any | **Menu** (Me & Settings) | Home | The header language switch isn't in the tree, so tree test under-represents the real app. Users who can't read English labels may fail by definition | Low (tree) / see §3 for Amharic |
| **T9** Learn what "loss and damage" means | P2, P4 | **Updates** (Explainers) | Programme (themes), Home | **Real conflict.** The IA says Learn content is *also* an Explainers filter in Updates and surfaces in Home highlights, but the *Glossary* exists only in Menu. A "what does X mean" mental model points at Updates/Explainers or search, not at a hamburger menu | **High** |
| **T10** After COP32, recording of the opening ceremony | P4 | **Updates** (Live & recorded) | Menu → Archive; Programme | Both accepted. "After COP32" is a cue for Archive, and that is a hidden menu item | Low–Med |
| **T11** Apply for Ethiopian visa | P1 | **Visit** (Before you travel → Visa) | Updates; Menu → Help & FAQ | Strong keyword; "Before you travel" is a good parent | Low |
| **T12** Delete my data | any | **Menu** (Me & Settings → Privacy & data) | Menu → About (privacy notice); Menu → Help & FAQ | Right top-level, but three sub-nodes plausibly hold "privacy"; About contains the privacy notice | Med |

**Pattern:** every task that *intends* the Menu (T2 alt, T8, T9, T12, Archive in T10) depends on users expecting a hamburger to hold such things. Task-by-task, the Menu tasks carry the most structural risk and the five tabs the least. This matches the Apple HIG caution already cited in the IA second pass: hidden destinations are found less often.

---

## 3. Label risks: "Visit", "Updates", "Programme" (flagged risks on record)

### 3.1 "Visit"
- **Risk:** P2 (locals) and P4 (remote followers) are not "visiting". A resident asking "where can I get a ride on Sunday" or "coffee ceremony" may not see themselves in *Visit*. Also reads as a verb ("go to a site") rather than a section. The founder confirmed "Visit" for the visitor audience (D16), so I am *not* recommending a change now; I am recommending it be tested.
- **Alternatives to put in the real label test (EN):** (a) **"Plan your trip"** — explicit about purpose and visitor-oriented, but long for a tab label and wrong for locals; (b) **"Addis"** or **"Explore Addis"** — works for locals and visitors, tells you it is place-based, but hides the pre-travel content (visa, flights); (c) **"Travel guide"** — conventional, tourism-app familiar (Visit Dubai/Qatar use "Plan/Explore"), but "guide" suggests static reading rather than a service grid.
- **My lean (heuristic only):** keep **Visit** for now; add the label test; if locals test poorly, "Addis" is the strongest candidate because the tab's content is mostly Addis-specific after the "Before you travel" block.

### 3.2 "Updates"
- **Risk:** vague. "Updates" can mean app updates, schedule updates, or news. It currently contains news, alerts history, press centre, live, recorded, explainers and digest — heterogeneous. Home also has "Alerts", which creates overlap with "Alerts history" in Updates.
- **Alternatives (EN):** **"News"** (clear, but excludes live/recorded/explainers); **"News & Live"** (accurate, longer); **"Latest"** (short, but vague); **"Media"** (fits press/live/recorded, bad for general public).
- **My lean:** "Updates" is acceptable for tab 5; the risk is moderate because the other four tabs are clear by elimination. Test against "News & Live".

### 3.3 "Programme"
- **Risk:** spelling split (British *Programme* vs. US *Program*). Most international readers handle both, but "Programme" as a section name reads formal/academic; many apps use "Schedule" or "Agenda". It also contains exhibitors and speakers, so "Schedule" would under-describe it.
- **Alternatives:** **"Schedule"** (most common in event apps; precise for sessions, weaker for exhibitors/speakers), **"Events"** (friendlier; blurs with "side events" inside it), **"What's on"** (clear in UK English, uncommon elsewhere).
- **Note on spelling:** pick one convention for the whole product and apply it in code/copy; UNFCCC documents use "programme" (British). Fine either way; consistency is the point.

### 3.4 Amharic labels — **needs a native-speaker check; I cannot verify any of these**
I am deliberately not asserting translations. Below are *candidates I have seen used in similar contexts*, shown only so a native speaker has something to react to. Treat every one as **unverified**.

| EN label | Candidate AM (unverified) | Gloss / concern for the reviewer |
|---|---|---|
| Home | መነሻ | "starting point" — common in apps; confirm it doesn't read as "origin/departure" in context |
| Programme | መርሐ ግብር / ፕሮግራም | Formal vs. loanword. Which do everyday users say? |
| Map | ካርታ | Likely fine; confirm |
| Visit | ጉብኝት | "visit/tour" — may skew toward formal/official visits; consider alternatives meaning "trip" or "city guide" |
| Updates | ዜና / ወቅታዊ መረጃ | "news" vs. "current information" — they are not synonyms; decide which scope |
| Menu | ምናሌ | Often "food menu" in Amharic; confirm that it works for app menu |

Also test: width/truncation of all five labels at 200% text scale (Ge'ez at larger sizes is wider), and the **"Ethiopian time" risk** (IA §A3.5) wherever times appear near labels. Do not finalise any of the above without a native speaker plus a second checker, per the IA kit §3.

---

## 4. Structural findings beyond the tasks
1. **"Menu" in the test tree ≠ the product.** The IA has a header ☰ (Learn, Library, Archive, Me & Settings, Help, About). The kit's tree models it as a top-level node called "Menu", but the closed-sort group is "Menu (Learn/Library/Settings)". A participant seeing "Menu" in a text list will treat it as a catch-all "More" — the very pattern D16 v2 sought to avoid. The tree test therefore tests the *worst case* for the hamburger; the real app has an icon and header position that may help or hurt. Interpret Menu results with that in mind.
2. **Duplicated paths** (all deliberate, but each is a place where the tree test will show mixed first clicks, which is acceptable): alerts (Home / Updates / My agenda), recordings (Updates / Archive), outcomes (Updates / Learn), "Can I attend?" (Home / Visit / Learn).
3. **Map vs. Visit overlap:** *Directions* (Map) vs. *Getting around* (Visit); *Hospitals* (Map POI) vs. *Health & safety / Emergency* (Visit). Cross-links needed (see §6).
4. **Volunteer mode (P6) is invisible in the tree.** By design it is role-gated; the card "Volunteer help" is therefore not testable as a public-IA task and its wording is ambiguous (see §5).
5. **P7 (staff) has no public IA task.** Correct by design; keep the CMS out of this test.
6. **Stale v1 text inside `information-architecture.md`:** §2–3 still describe the 5th tab as "More"; the second pass overrides it, as the file says. Anyone building the prototype from §3 alone would get the wrong tabs. Recommend adding a one-line pointer at the top of §3 in a later cleanup (not done here — Track A scope is the walkthrough).

---

## 5. Cards with a genuinely ambiguous "intended home"
Cards that I judge ambiguous *even on expert review*, with the cross-link I would add regardless of what real testing shows:

| # | Card | Ambiguity | Cross-link recommendation |
|---|---|---|---|
| 1 | What is COP32? | Home vs. Learn (Menu) | Home highlight → Learn; Learn also reachable from Updates → Explainers |
| 2 | Can I attend? | Home / Visit / Learn | Home shortcut (primary) + Visit "Before you travel" tile + Programme "Open to public" filter |
| 7/8 | My saved sessions / Session reminders | Programme (My agenda) vs. Home vs. Settings (reminders) | Home "Next saved session" → My agenda; My agenda → reminder settings |
| 11 | Hospitals & pharmacies nearby | Map POI vs. Visit Health | Map POI category + Visit → Emergency tile deep-linked to the same POI list |
| 22 | Emergency numbers | Visit vs. Home | Persistent "Emergency" shortcut on Home and in header menu; content owned once |
| 23 | Road closures | Updates vs. Home vs. Visit/Getting around | Alerts category surfaced in Updates and in Visit → Getting around |
| 25 | Schedule changes | Updates vs. Home vs. My agenda | Home alert banner and My agenda change badge → same alert item |
| 27 | Recorded sessions | Updates vs. Archive | Both; "Live & recorded" links to Archive for past editions |
| 33 | Glossary | Menu → Learn only | Surface glossary terms in search, in session pages (term links) and in Updates → Explainers (T9 risk) |
| 35 | Outcomes & commitments | Updates vs. Learn | Home post-event module → Outcomes |
| 37 | Language | Header vs. Menu → Settings | Both (already in IA) |
| 40 | **Volunteer help** | **Wording ambiguous:** "help *for* volunteers" vs. "help *from* a volunteer" | Reword the card (see D45) before the real sort; intended homes are not testable with the current wording |

---

## 6. Confidence ratings by tab (will the real tree test meet its target?)
These are guesses, not results.

| Tab / area | Confidence the real test passes (≥70–80%) | Reasoning |
|---|---|---|
| **Programme** | **High** | Clear label; T3, T4 forgiving; main risk is spelling/formality, not findability |
| **Map** | **High** | Spatial tasks (T6) map cleanly; only T1 competes with Visit |
| **Visit** | **Medium–High** in EN for visitors; **Medium** for locals/Amharic | T1, T7, T11 have strong keyword hooks. Label is the risk, not the structure |
| **Updates** | **Medium** | T5, T10 should pass; heterogeneous contents and "Updates" vagueness could pull T4 and T9 first clicks wrongly |
| **Home** | **Medium** | T2 and T4 first clicks may land here or elsewhere; "Shortcuts/Highlights" are weak scanning labels in a text tree |
| **Menu (Learn, Library, Archive, Settings, Help, About)** | **Low–Medium** | T9 (**High risk**) and T12 (**Med**) depend on users expecting the right thing in a hamburger. T8 passes because the header switch is a known pattern, but not tested in the tree |
| **Amharic versions (any tab)** | **Unknown** | Cannot be assessed without native speakers; "Updates" and "Visit" are the two I would most expect to differ |

Expected shape of real results: most failures cluster on T9 (glossary), T12 (delete data) and T2 (public attendance). Fixes are cross-links and a better-labelled glossary entry point, not a restructure.

---

## 7. Recommendations (heuristic basis)
1. **Add cross-links** listed in §5 as a baseline (cheap, low regret). Logged as **D44**.
2. **Make the glossary reachable from Updates → Explainers and from search,** not only from Menu → Learn (fixes the predicted T9 failure). Part of D44.
3. **Fix the IA-kit wording** for card #40 and make the T2 prompt neutral (don't include "badge" jargon the participant may not know). Logged as **D45**.
4. **Keep the "Visit", "Updates" and "Programme" labels for now;** add the alternatives in §3 to the optional label test (kit §6) rather than changing them on analyst opinion alone.
5. **Do not finalise Amharic tab labels** until the native-speaker check.
6. **Build the prototype's tree-test mode with both the "Menu" worst-case tree and the ☰ header version,** so a later dry-run can compare them (Track D).

---

## Still needs real-world validation
Nothing above replaces these. They are the items a future session, the founder, or the BA must run:
- [ ] **Real card sort**, 8–12 participants (open sort 6 + closed sort 6), mixed EN/AM, per `ia-validation-kit.md` §4.
- [ ] **Real tree test**, 10–15 participants, T1–T12 with the metrics in kit §5.3; compare EN vs. AM results.
- [ ] **Native-speaker Amharic label check** (two people) for all tabs, menu items, and the 40 cards — every Amharic candidate in §3.4 is unverified.
- [ ] **Label test** for Visit / Updates / Programme alternatives (kit §6), including Addis residents for the "Visit" question (IA open question 4).
- [ ] **Ethics and recruitment steps** exactly as defined in the kit (§1–2): consent read-out, coded participants (R1, R2…), no names or phone numbers stored.
- [ ] **Low-end Android check** that all five labels fit in both languages at 200% text scale.
- [ ] **Confirm or revert D44 and D45** against the real results.
