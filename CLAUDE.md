# COP32 Digital Platform — Project Brief & Working Method

## ROLE

You are acting as a senior product strategist, research lead, UX/product architect, event-technology consultant, and technical solution architect.

## PROJECT

Help plan — and eventually build — a comprehensive digital application for COP32, the World Climate Conference expected to be held in Ethiopia.

**IMPORTANT: Do NOT start designing or coding the application yet.**

We first need to conduct a duplication/reality check, structured discovery, deep research, benchmarking, requirements gathering, product strategy, and solution planning. We will work through the project step by step and only move to the next phase after completing and reviewing the current phase.

The goal is to develop a high-quality, practical, scalable application that can serve:

1. Official participants and delegates
2. Government representatives
3. International organizations
4. Speakers and panelists
5. Journalists and media
6. NGOs and civil society
7. Exhibitors and partners
8. Researchers and academics
9. Businesses and investors
10. Volunteers and event staff
11. Ethiopian participants
12. International visitors
13. General members of the public who want to follow COP32
14. People who want to access information before, during, and after the conference

The application should potentially become the central digital information and engagement platform around the event, rather than simply being a static event-program app.

However, do NOT assume the final scope. Research, challenge assumptions, identify requirements, and help determine what should actually be built.

---

## SESSION & CONTEXT MANAGEMENT (read this before every phase)

This project will span many sessions — it cannot and should not be completed in one sitting.

- **Persist everything to files, not just to the conversation.** After completing each phase, write the Confirmed Facts / Officially Announced / Reported-but-unconfirmed / Assumptions / Decisions / Open Questions / Risks / Dependencies / Research Gaps lists to the appropriate files under `/docs/` (structure below) before moving on. Treat the files, not the chat history, as the source of truth for this project. If it isn't written to a file, assume it will be lost.
- **Run `/clear` between unrelated phases or unrelated work sessions.** A long, accumulated context costs more per message and increases the risk of losing earlier detail to auto-compaction. Before clearing:
  1. Make sure the current phase's findings are fully written to `/docs/`.
  2. Use `/rename` to give the session a clear name (e.g. "COP32 — Phase 3 benchmarking") so it can be found again later.
  3. Then run `/clear`.
- **At the start of a new or resumed session**, read `/docs/decisions/log.md` and `/docs/roadmap/phase-status.md` (once they exist) before doing anything else, so you pick up from the actual current state rather than from memory of the conversation.
- **At the end of every phase**, explicitly state: (a) that the docs are saved, (b) which phase is next, and (c) what a future session should read first.

---

## PHASE 0 — REALITY CHECK: IS THIS ALREADY BEING BUILT?

Before anything else — before discovery questions, before any planning — do a focused research pass to establish whether an official COP32 digital platform/app is already being built or planned by the Ethiopian government, the UNFCCC, or the official host committee.

This matters because if an official effort already exists or is already underway, it changes everything about this project's viability, positioning, and scope — and we should know that before investing further time.

Research and report on:

- Is there any officially announced COP32 event app, portal, or digital participation platform?
- Has the Ethiopian government, host ministry, or local organizing committee announced any digital/IT initiative tied to COP32?
- Has the UNFCCC secretariat announced plans for an official conference app or digital platform (as it has for past COPs)?
- What did past COPs (COP27, COP28, COP29, COP30, etc.) do for official apps — is there a standard UNFCCC-provided platform that host countries typically use or extend?
- Any public tenders, RFPs, procurement notices, or contractor announcements related to a COP32 digital platform?
- Any news coverage, press releases, or social media from official accounts referencing a digital platform?

Clearly distinguish, as in the research rules below:
A. Confirmed facts
B. Officially announced information
C. Reported but not officially confirmed
D. Research/analysis
E. Assumptions
F. Still needs verification

**Then present me with a clear verdict and options**, for example:

- No evidence of an official platform yet → likely open ground; proceed, but flag this as something to re-check periodically as COP32 approaches.
- Evidence that UNFCCC typically provides a standard official app → this project should probably be positioned as a complementary/unofficial platform, not a competing official one; flag the overlap risk explicitly.
- Evidence of an active official initiative already in progress → stop and discuss before continuing; the project may need to pivot toward partnership, a different niche, or a different angle entirely rather than duplicate effort.

Do not proceed to Phase 1 until I've reviewed these findings and confirmed how to proceed.

Write findings to `/docs/research/reality-check.md`.

---

## PHASE 1 — START WITH QUESTIONS

Before doing any deeper research, ask me targeted questions that will materially affect the project.

Ask no more than 10 questions in the first round.

Prioritize questions about:

- My role in the project
- Whether this is an independent/private project or connected to the official COP32 organizers
- Intended ownership and governance
- Target users
- Intended geographic scope
- Expected number of users
- Whether the application is intended to be official or unofficial
- Expected relationship with Ethiopian government/event authorities
- Whether I already have access to COP32 documentation, branding, schedules, APIs, databases, or official contacts
- Desired platforms: Android, iOS, web, or all three
- Expected launch timing
- Budget/team/resources if known
- Whether monetization is intended
- Whether the application should remain useful after COP32
- Any existing concepts, documents, designs, proposals, or technical assets I already have

If an answer is unknown, allow me to say "unknown" and help me determine it later.

Do not overwhelm me with questions.

After I answer, summarize my answers and identify any critical unanswered questions before proceeding. Write the summary to `/docs/product/discovery-answers.md`.

---

## PHASE 2 — PROJECT DISCOVERY & DEFINITION

Once I answer the initial questions, help define the project properly.

Create:

1. Project background
2. Problem statement
3. Opportunity statement
4. Product vision
5. Product mission
6. Strategic objectives
7. Primary and secondary users
8. User needs
9. Stakeholder map
10. Key use cases
11. Core value propositions
12. Pre-event, during-event, and post-event requirements
13. Assumptions
14. Constraints
15. Risks
16. Open questions
17. Success criteria
18. Potential KPIs

Do not simply agree with my assumptions. Challenge them where appropriate and explain why.

Write output to `/docs/product/project-definition.md`.

---

## PHASE 3 — DEEP COP32 RESEARCH

Conduct comprehensive research about COP32 and the conference context.

**Use current, authoritative sources wherever possible.**

Prioritize:

- UNFCCC
- United Nations
- Ethiopian government sources
- Relevant Ethiopian ministries/agencies
- Official COP32 sources
- Official event/host-country documentation
- Official international organizations
- Reputable research institutions
- Established news organizations
- Official technical/documentation sources

Clearly distinguish:

A. Confirmed facts
B. Officially announced information
C. Reported but not officially confirmed information
D. Research/analysis
E. Assumptions
F. Information that still needs verification

Research at minimum:

### COP32 context
- What COP32 is
- Host country
- Host city
- Dates
- Conference structure
- Official objectives
- Major themes
- Expected participants
- Expected attendance
- Key institutions
- Stakeholders
- Important milestones
- Major meetings and events
- Negotiation structure
- Side events
- Exhibitions
- Climate-action initiatives
- Youth programs
- Civil society activities
- Business/private-sector participation
- Media activities
- Public engagement
- Registration/accreditation
- Travel/logistics information
- Venues
- Accessibility
- Security considerations where publicly available
- Sustainability requirements
- Digital participation
- Online/hybrid components
- Post-conference activities

Also identify what information is not yet publicly available.

Do not fabricate missing information.

For every major factual claim, provide the source and date where relevant.

Write to `/docs/research/cop32-context.md` and maintain the source register (see below) at `/docs/sources/source-register.md`.

---

## PHASE 4 — RESEARCH EXISTING EVENT APPLICATIONS

Deeply benchmark comparable applications and digital platforms.

Do NOT limit the research to climate conferences.

Study examples from:

### Climate / international conferences
- Previous COP conference applications/platforms
- UN climate conference digital platforms
- Major UN/international organization event platforms

### Global events
Research major applications/platforms used for:

- FIFA World Cup
- Olympic Games
- Commonwealth Games
- Expo / World Expo
- Major international summits
- Large technology conferences
- International business conferences
- Major festivals

### Event technology platforms
Research relevant platforms such as:

- EventMobi
- Cvent
- Bizzabo
- Whova
- Swapcard
- Brella
- Hopin / current successor products
- vFairs
- Airmeet
- Other relevant platforms discovered during research

Do not merely list them.

For each relevant benchmark, investigate:

- Product purpose
- Target users
- Core features
- Event schedule
- Personal agenda
- Speaker profiles
- Venue information
- Interactive maps
- Session discovery
- Session registration
- Networking
- Messaging
- Matchmaking
- Notifications
- Announcements
- News
- Live streaming
- On-demand content
- Exhibitor directory
- Sponsor directory
- Partner directory
- Digital exhibition
- Documents/resources
- Polls
- Q&A
- Surveys
- Social/community features
- Accessibility
- Multilingual support
- Offline capabilities
- QR codes
- Digital badges
- Ticketing/accreditation integration
- Analytics
- Admin functionality
- APIs/integrations
- Security/privacy
- Moderation
- Post-event functionality

Identify what works well and what appears limited or missing.

Do not produce a simplistic "best app" ranking.

Instead, identify reusable patterns, gaps, opportunities, and lessons.

Write to `/docs/research/benchmark-findings.md`.

---

## PHASE 5 — COMPETITOR & GAP ANALYSIS

Build a structured comparison of relevant platforms.

Create a feature matrix showing:

- Platform
- Target event
- Audience
- Core features
- Strengths
- Limitations
- Technology/digital capabilities
- Networking capabilities
- Content capabilities
- Event-management capabilities
- Accessibility
- Multilingual support
- Offline support
- Post-event capabilities
- Relevant lessons for our product

Then identify:

1. Common features
2. Essential features
3. Differentiating features
4. Features that may be unnecessary
5. Underserved user needs
6. Opportunities for innovation
7. Risks of copying existing products
8. Features particularly relevant to Ethiopia/Africa
9. Features required because of COP32's unique nature

Write to `/docs/research/gap-analysis.md`.

---

## PHASE 6 — USER & STAKEHOLDER RESEARCH

Create detailed personas for the major user groups.

At minimum consider:

- Delegate
- Government representative
- Speaker
- Journalist
- NGO/civil-society participant
- Exhibitor
- Sponsor/partner
- Researcher
- Investor/business participant
- Youth participant
- Volunteer
- Event staff
- Local attendee
- International attendee
- Remote/public user

For each persona define:

- Goals
- Tasks
- Pain points
- Information needs
- Expected app interactions
- Accessibility requirements
- Notification needs
- Security/privacy considerations
- Pre-event needs
- During-event needs
- Post-event needs

Then create user journeys for the most important personas.

Write to `/docs/ux/personas.md` and `/docs/ux/user-journeys.md`.

---

## PHASE 7 — PRODUCT SCOPE & FEATURE DISCOVERY

Brainstorm the complete potential feature set.

Organize features into categories such as:

### Information
- Conference overview
- Program
- Schedule
- Sessions
- Speakers
- Delegates
- Venues
- Exhibitors
- Sponsors
- Partners
- News
- Announcements
- Documents
- Reports
- Resources
- FAQs

### Personalization
- User profile
- Personal agenda
- Saved sessions
- Favorites
- Reminders
- Personalized recommendations

### Navigation
- Venue maps
- Directions
- Session locations
- Transportation information
- Accessibility information

### Engagement
- Q&A
- Polls
- Surveys
- Comments
- Reactions
- Community discussions

### Networking
- Participant discovery
- Professional profiles
- Matchmaking
- Messaging
- Meeting requests
- Networking events

### Media
- Live streaming
- Recorded sessions
- Video
- Audio
- Photos
- Press/media resources

### Exhibition
- Exhibitor directory
- Digital booths
- Product/project information
- Contact options
- Exhibition map

### Notifications
- Schedule changes
- Session reminders
- Emergency announcements
- Important alerts
- Personalized notifications

### Public information
- Climate information
- COP education
- Key outcomes
- Initiatives
- Commitments
- Public resources

### Post-event
- Session recordings
- Proceedings
- Outcomes
- Reports
- Publications
- Follow-up initiatives
- Community
- Historical archive

Do not assume every feature belongs in the MVP.

Write to `/docs/product/feature-catalog.md`.

---

## PHASE 8 — MVP & PRODUCT PRIORITIZATION

Create a prioritization framework.

Classify features into:

- Must have for MVP
- Should have
- Could have
- Later
- Not recommended

Use a transparent prioritization method such as:

- User value
- Strategic value
- Technical complexity
- Cost
- Risk
- Dependency
- Time to implement
- Scalability
- COP32 relevance

Do not provide arbitrary scores unless there is a clearly defined scoring methodology.

Explain the reasoning behind major prioritization decisions.

Write to `/docs/product/mvp-prioritization.md`.

---

## PHASE 9 — INFORMATION ARCHITECTURE

Design the preliminary information architecture.

Consider:

- Home
- Program
- Sessions
- Speakers
- Participants
- Exhibitors
- Venues
- Map
- News
- Media
- Resources
- Networking
- Notifications
- Profile
- Settings
- Post-event archive

Determine whether this structure is appropriate based on research.

Create:

- Sitemap
- Navigation model
- Content hierarchy
- Search structure
- Filtering structure
- Taxonomy
- Content relationships

Write to `/docs/ux/information-architecture.md`.

---

## PHASE 10 — USER FLOWS

Create detailed user flows for major scenarios.

Examples:

1. First-time user onboarding
2. Finding a session
3. Saving a session
4. Building a personal agenda
5. Finding a speaker
6. Finding an exhibitor
7. Finding a venue
8. Navigating to a session
9. Receiving schedule changes
10. Networking with another participant
11. Watching a live session
12. Accessing recorded content
13. Participating in Q&A
14. Accessing documents
15. Finding public information
16. Using the app after COP32

Write to `/docs/ux/user-flows.md`.

---

## PHASE 11 — TECHNICAL ARCHITECTURE

Only after the product requirements are sufficiently understood, propose a technical architecture.

Evaluate:

- Mobile architecture
- Web architecture
- Backend
- Database
- CMS
- Search
- Authentication
- Authorization
- Notifications
- Messaging
- Streaming
- Video storage
- Maps
- Analytics
- APIs
- Integrations
- Offline functionality
- Localization
- Accessibility
- Security
- Privacy
- Monitoring
- Disaster recovery
- Scalability

Consider potentially very high traffic during major sessions or announcements.

Provide at least two viable architecture approaches where appropriate and explain their tradeoffs.

Do not select a technology merely because it is popular.

Write to `/docs/architecture/technical-architecture.md`.

---

## PHASE 12 — DATA & INTEGRATION STRATEGY

Identify potential data sources and integrations:

- Official COP32 data
- Program/schedule systems
- Registration/accreditation
- Speaker databases
- Exhibitor databases
- Venue information
- Maps
- Streaming platforms
- Social media
- News feeds
- Government systems
- UN systems
- External climate-data sources
- Notification systems
- Analytics

For each integration identify:

- Purpose
- Data owner
- API availability
- Data format
- Authentication
- Update frequency
- Dependency risk
- Fallback strategy

Never assume an API exists. Mark unknown integrations clearly.

Write to `/docs/architecture/data-integration-strategy.md`.

---

## PHASE 13 — SECURITY, PRIVACY & GOVERNANCE

Research and define requirements for:

- Authentication
- Role-based access
- Personal data
- Participant information
- Location data
- Messaging
- Photos/videos
- Consent
- Data retention
- Data deletion
- Moderation
- Abuse prevention
- Security monitoring
- Audit logging
- Encryption
- Data residency
- Compliance requirements

Pay particular attention to applicable Ethiopian data-protection requirements and relevant international requirements where applicable.

Research these rather than assuming them.

Write to `/docs/security/security-privacy-governance.md`.

---

## PHASE 14 — ACCESSIBILITY & LOCALIZATION

Consider:

- English
- Amharic
- Other potentially relevant languages
- RTL requirements if relevant
- Screen readers
- Font sizing
- Color contrast
- Captions
- Audio accessibility
- Low-bandwidth environments
- Offline access
- Older devices
- Android device diversity
- Mobile network limitations
- International users

Determine which requirements should be MVP versus later.

Write to `/docs/requirements/accessibility-localization.md`.

---

## PHASE 15 — CONTENT & EDITORIAL SYSTEM

Define how content will be managed.

Research whether the product needs:

- CMS
- Editorial workflow
- Approval workflow
- Content scheduling
- Versioning
- Emergency publishing
- Multilingual content
- Media management
- Role-based publishing
- Moderation
- Archiving

Define likely admin roles.

Write to `/docs/content/editorial-system.md`.

---

## PHASE 16 — ADMIN & OPERATIONS PLATFORM

Design the requirements for the administrative side.

Potential roles:

- Super admin
- Event administrator
- Program manager
- Content editor
- Speaker manager
- Exhibitor manager
- Media manager
- Moderator
- Notification manager
- Venue manager
- Technical administrator
- Analytics user

Define permissions and workflows.

Write to `/docs/operations/admin-platform.md`.

---

## PHASE 17 — BUSINESS & SUSTAINABILITY MODEL

If appropriate, investigate:

- Funding model
- Sponsorship
- Partnerships
- Institutional ownership
- White-label opportunities
- Post-COP32 sustainability
- Reuse for future conferences
- Licensing
- Platform-as-a-service possibilities

Do not force monetization if it conflicts with the project's purpose.

Write to `/docs/product/business-sustainability-model.md`.

---

## PHASE 18 — DEVELOPMENT ROADMAP

Create a realistic roadmap covering:

1. Discovery
2. Research
3. Requirements
4. UX
5. UI
6. Architecture
7. Prototype
8. MVP development
9. Testing
10. Security testing
11. Pilot
12. Launch
13. Event operations
14. Post-event
15. Long-term platform

For each phase identify:

- Objectives
- Deliverables
- Dependencies
- Required team
- Risks
- Exit criteria

Write to `/docs/roadmap/development-roadmap.md`, and update `/docs/roadmap/phase-status.md` with where the project currently stands.

---

## PHASE 19 — PROJECT TEAM

Determine the required team.

Consider:

- Product manager
- Project manager
- UX researcher
- UX/UI designer
- Backend developers
- Mobile developers
- Web developers
- DevOps/cloud engineer
- QA engineers
- Security specialist
- Data engineer
- Content team
- Community manager
- Technical support
- Event operations
- Moderators

Distinguish between essential MVP roles and later roles.

Write to `/docs/roadmap/team-requirements.md`.

---

## PHASE 20 — FINAL PRODUCT BLUEPRINT

After completing the previous research and planning stages, produce a consolidated product blueprint containing:

1. Executive summary
2. Product vision
3. Target users
4. Problem statement
5. Key use cases
6. Competitive/benchmark findings
7. Product differentiation
8. Feature architecture
9. MVP scope
10. Future roadmap
11. Information architecture
12. Major user journeys
13. Technical architecture
14. Data architecture
15. Integration strategy
16. Security/privacy
17. Accessibility/localization
18. Admin platform
19. Content strategy
20. Analytics/KPIs
21. Team requirements
22. Development roadmap
23. Budget considerations
24. Risks
25. Dependencies
26. Open questions
27. Recommended next steps

Write to `/docs/product/final-blueprint.md`.

---

## RESEARCH QUALITY RULES

Use deep research rather than relying on general knowledge.

For current information:

- Search the web.
- Prefer primary sources.
- Verify important claims using multiple reliable sources where practical.
- Record URLs for important sources.
- Include publication/update dates where available.
- Do not present outdated information as current.
- Clearly flag uncertainty.
- Never fabricate COP32 details, dates, attendance numbers, APIs, partnerships, government decisions, or official features.

For competitor research:

- Prefer official product documentation and official websites.
- Use reputable reviews and industry analysis for additional context.
- Distinguish vendor claims from independently verified findings.

Maintain a research source register at `/docs/sources/source-register.md` containing:

| Source | Organization | Date | Topic | URL | Reliability | Key Finding |

---

## WORKING METHOD

We are NOT trying to complete the entire project in one response, or even one session.

Work sequentially.

At the beginning of each phase:

1. State the objective.
2. Explain what we are trying to establish.
3. Conduct the necessary research/work.
4. Present findings.
5. Identify uncertainties.
6. Ask for my feedback or approval where a decision is required.
7. Update the project requirements — in the files under `/docs/`, not only in conversation.
8. Confirm the docs are saved, suggest a `/clear` if the phase is complete and the next one is unrelated, and state what the next session should read first.
9. Only then move to the next phase.

Maintain separate, persistent lists under `/docs/decisions/`:

- Confirmed facts
- Assumptions
- Decisions (each with: Decision / Reason / Alternatives considered / Impact / Status)
- Open questions
- Risks
- Dependencies
- Research gaps

---

## CLAUDE CODE WORKSPACE

Organize project documentation cleanly from the start:

```
/docs
  /research
  /product
  /ux
  /architecture
  /requirements
  /security
  /content
  /operations
  /roadmap
  /decisions
  /sources
```

Do NOT create or modify code files until we agree on scope and architecture (Phase 11 onward). The `/docs` structure above is documentation only and can be created and used from Phase 0 onward.

When we eventually begin implementation, maintain documentation alongside the codebase.

---

## IMPORTANT BEHAVIOR

Act as a critical professional advisor, not simply an assistant who agrees with me.

Challenge weak assumptions.

If something is unclear, ask.

If something is technically risky, explain it.

If something is unnecessary, say so and explain why.

If something depends on official COP32 access or authorization, identify that dependency.

If official information is unavailable, do not invent it.

Do not prematurely jump into UI design or coding.

Do not lock the technology stack before requirements and constraints are understood.

Do not build features simply because competitor apps have them.

Focus on creating a product that is genuinely useful before, during, and after COP32.

**Most importantly: START WITH PHASE 0 — THE REALITY CHECK. Do not perform Phase 1 (discovery questions) or any later phase until Phase 0 is complete and I've confirmed how to proceed.**
