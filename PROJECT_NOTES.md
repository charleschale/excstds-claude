# Excellence Standards Report System — Project Notes

*Last updated: April 25, 2026*

---

## Recent changes (2026-04-25) — Alba Quintas Núñez run + Pretend-CEO mode codification

The Alba Quintas Núñez coaching guide build (Yale undergraduate, top-decile pretend-CEO file) surfaced a fundamental framing issue that had been latent in the methodology and now has dedicated treatment.

**Pretend-CEO mode codified in METHODOLOGY.md.** Almost every college student takes the Excellence Standards survey *as if they were a CEO with direct reports*, even though they have not held that seat. The framing of the entire deliverable changes substantially under this mode. The core change: gaps in the file are framed as *"against-standard instincts worth refining before the seat arrives"* rather than as *"leader's burden not yet picked up."* Both versions produce the same Impact and Teach items; only the language of the Signature Pattern, the introductory framing of each card, and the Closing Note changes.

**SKILL.md Quick Start gains a 6th input:** survey-mode question (actual-leader vs pretend-CEO). Trigger conditions for pretend-CEO default: `.edu` domain, Q9921 = "Student", Q106 indicates a student / college position, age inferable from career history is under ~25.

**Four common-cohort against-standard instincts** named explicitly in METHODOLOGY: holding yourself to a higher standard than others (Lower Stds for Others than Self flag), cannot-be-outvoted (Q5), team-can-be-bad-independently-of-leader (Q61), approval-from-others-matters (Q131 + Cares About Others Not Their Approval L2). These cluster — when one is present, the others usually are too.

**Three new flag / question framings codified in METHODOLOGY (with full coaching walk-throughs):**

- **Q63 as a "requiring excellence produces respect" reframe.** Many respondents — particularly young people from harder backgrounds where respect was hard-earned — read "requiring excellence" and "showing respect" as opposite ends of the same axis. The admired-leader frame inverts that: requiring excellence *is* the highest form of respect. Easing the demand looks like respect on the surface; over time the team experiences it as the leader not believing they can rise. This reframe applies in both actual-leader and pretend-CEO mode and is one of the most consistently valuable coaching points in the instrument.
- **Q119 as a "woke test" — full walk-through required.** One of the most reliably-failed questions among smart, civically-engaged college students. Failure pattern: students answer 4 or 5 (FALSE), reflecting the academic-environment instinct that platforms come with responsibility. Coaching response is never dismissal — it is a careful four-part walk-through: acknowledge the cohort-typical instinct → walk through the three predictable consequences (lightning rod / team fractures / mission dilution) → distinguish what the discipline is and is not (NOT silencing personal views; the discipline is mission-platform discipline) → connect to the broader Pleasing thread (mission-loyalty over in-group-loyalty).
- **Q125 as a "B-grade = F-grade" gateway-belief test.** Mixed Conditional Belief is *not* a soft version of Severe Conditional Belief. There is effectively no B-grade on the gateway-belief questions: either you believe in people in advance, or you do not, and the team feels the difference. The Mixed-level finding carries effectively the same coaching weight as Severe and must never be soft-pedaled.

**Ideological-conformity nuance on the Pleasing pattern.** The Pleasing thread is not only about wanting personal popularity. The harder version, especially common in academic environments, is *pleasing the prevailing ideological or cultural moment* — deferring to the positions the in-group expects, because taking those positions feels like the right thing rather than like pleasing. This nuance must be named explicitly when the respondent is from an academic environment and shows the Pleasing pattern, because the in-group-loyalty version is invisible to the respondent (it does not feel like pleasing) and therefore harder to refine without naming.

**DISC bar colors in the wiring panel — fixed in pipeline source.** The motivators-section module previously rendered DISC bars in the classic palette (D=red, I=orange, S=green, C=blue), which created false visual rhyme with the L2 alignment grammar (blue=motivator-strong, green=against-the-grain, tan=anti-aligned-weak, red=motivator-weak). The DISC bar colors are now monochrome (`#1a2332`), removing the false signal. Change is in `_pipeline/src/pipeline/motivators_section.py` and propagates to every future report.

**Voice rules tightened:**
- Never write *"this is a frame that has to be honest"* or any variant. Implies the rest of the report is dishonest.
- In pretend-CEO mode, replace *"leader's burden not yet picked up"* with *"against-standard instincts worth refining before the seat arrives."*
- The "good instincts / against-standard instincts" two-bucket Signature Pattern structure is canonical for pretend-CEO files.

**Local-run backup path documented.** When the Render-hosted pipeline fails (typically because SiteGround's network firewall blocks Render's egress IPs at the layer above cPanel's "Manage Remote Hosts"), the same pipeline can run locally from the user's laptop — Power BI is reachable via HTTPS, MySQL is reachable from non-Render IPs, and `_pipeline/scripts/run_local.py` already does the orchestration. Secrets backup at `_pipeline/.env.local-backup.md` (gitignored as `.env.*`). Full instructions and rotation map in that file.

**Deliverables produced:**
- `_reports/Quintas-Nunez_Alba_coaching_guide.html` — pretend-CEO Variant 1 coaching guide.
- `_reports/Quintas-Nunez_Alba_coaching_guide.pdf` (and v2, v3 iterations).
- `_pipeline/scripts/build_alba_coaching.py`, `_pipeline/scripts/make_pdf_alba.js` — build scripts for the canonical pipeline.

---

## Recent changes (2026-04-17) — Mark Nelson run

The Mark Nelson run surfaced several drift issues and produced a set of durable fixes. Everything below this header was touched or added that day. The authoritative source of the workflow is `_skills/report/SKILL.md`; this section is a shorter index.

**Workflow rules added to SKILL.md:**
- Chart 3 is REVERSED axis (high flags LEFT) — reverse data in the generator, not at runtime.
- All three charts are hardcoded pre-collapsed (Bender pattern). Runtime helpers in templates are now unused.
- LinkedIn guest-view redacts experience history to asterisks — stop and ask user to paste from their logged-in view.
- Power BI dataset must be refreshed for same-day respondents; detect and ask the user.
- Urgency and Judgment don't move with coaching — a conditional hire requires a clear win on both.
- Big-company-lifer pattern is usually a negative signal for Hale-type seats.
- Standardized badge monikers: `HIRE / CONDITIONAL HIRE / UNLIKELY HIRE / NO HIRE`; `ESTABLISHED / CONCERN / TARGETED CONCERN / OPEN QUESTION / DILIGENCE / NOT ASSESSED`.

**Template patches (`_templates/hiring_report_TEMPLATE.html`, `_templates/coaching_guide_TEMPLATE.html`):**
- Chart 1/2/3 JS blocks now consume `{{DIST_*}}` tokens directly. No runtime `collapseBins`/`splitLabel`/`reverseAll` calls.
- `badge-green` (#1e8449) and `badge-red` (#c0392b) CSS classes added to the hiring template.
- The ExcStds color-override line is now a clean `{{EXCSTDS_COLOR_OVERRIDES}}` token (no `// ... — e.g. ...` comment scaffold that used to break substitution).

**Pipeline module update (`_pipeline/src/pipeline/motivators_section.py`):**
- `_z_text_color(z)` + `_DARK_FILL_BUCKETS` added. Standard Map L2 pills in cross-zone / pale neutral / no-score buckets now encode Z in their text color (dark green ≥ 1.0, readable green ≥ 0.5, dark red ≤ −1.0, readable red ≤ −0.5, neutral grey otherwise). Dark-fill buckets (motivator_strong, motivator_weak, anti_strong) keep white text for contrast. The wheel now scans for misalignment at a glance.

**Deliverables produced:**
- `_reports/Nelson_Mark_hiring_report.html` — UNLIKELY HIRE recommendation, based on Urgency + Judgment both concerning and big-company-lifer pattern.
- `_reports/Nelson_Mark_coaching_guide.html` — Variant 1, peer-to-peer voice, signature pattern lands on "extend unconditional belief BEFORE people prove it."

---

## System Overview

The Hale Global Excellence Standards report generator produces two deliverable types from respondent survey data + TTI Talent Insights:

1. **Hiring Manager Report** — hiring-manager-facing, recommendation badge, three-axes assessment, targeted concerns, interview probes from Form 8
2. **Integrated Coaching Guide** — candidate-facing, peer-to-peer voice, teach + impact practice items, no hire/no-hire, no interview probes

Both are available in graphical (HTML with Chart.js charts) and text (markdown) formats, though the graphical versions are the primary deliverable. Text templates exist but are considered deprecated in favor of graphical.

---

## Template System

Four templates live in `_templates/`:

| Template | Format | Tokens | Status |
|----------|--------|--------|--------|
| `hiring_report_TEMPLATE.html` | Graphical | 52 | Production |
| `hiring_report_TEMPLATE.md` | Text | ~30 | Available |
| `coaching_guide_TEMPLATE.html` | Graphical | 48 | Production |
| `coaching_guide_TEMPLATE.md` | Text | ~90 | Available |

All templates use `{{TOKEN}}` placeholders replaced by build scripts.

---

## Brand and Design Decisions

- **Accent color:** Gold (#d4a84b) for both hiring and coaching reports. No color differentiation between report types.
- **Fonts:** DM Serif Display (headings), DM Sans (body), loaded from Google Fonts CDN.
- **Charts:** Chart.js via CDN. Hiring reports use six chart types: DISC profile, ExcStds scorecard, Talent Radar, and 3 population distribution charts. Coaching guides use five (no Talent Radar — it is assessment-oriented, not coaching-oriented).

---

## Language Framework (Critical)

These conventions apply to all coaching content and are documented in SKILL.md:

- **Effective / ineffective** — never good / bad. Use "may not be effective" not "won't work."
- **Teach item label:** "How your profile produces it" — covers both wired traits and earned strengths. NOT "Why it's natural for you."
- **Impact item label:** "Driver to lean on" — maps to TTI "Driving Forces" terminology. NOT "Fuel."
- **Standards are universal** — never frame role-fit as making ExcStds concerns less relevant.
- **Voice:** Current expression, not trait-assessment. "This behavior is not currently being expressed" not "you lack X."
- **Self-report literalism:** The instrument is self-report. Do not editorialize self-reported answers into conclusions the data doesn't support. E.g., if a respondent's answers assess team loyalty favorably, say that — don't claim the leader "builds loyalty" or "keeps people engaged" as established fact. Especially when other flags (e.g., Conditional Belief) create tension with the self-report.

---

## Population Distribution Charts

Three charts rendered in a single row, sharing a chart key:

1. **All Scores** — Dual histogram (Z|Algo + Z|Human), triangle/diamond markers for individual
2. **Success | Fail Cohorts** — Same bins split by SuccessFlag, red/green series
3. **Flag Counts** — Single histogram, **reversed axis** (high flags left, low flags right, so right = better across all 3 charts), Y-axis on right

All three charts feature:
- **2-row x-axis labels** — bin ranges split into two lines (e.g., "-2.5" / "-2.0")
- **Empty bin collapsing** — bins where all series are 0 are removed
- Client-side JS helper functions (`splitLabel`, `collapseBins`, `reverseAll`) handle these transforms at render time

Population data: 1,088 rows from `Histogram Data.xlsx` (sheets: `Zalgo summ`, `Historgram Z`, `Histogram Flags`).

---

## Career Timeline

Must be a **horizontal Gantt-bar** using `.timeline` flex row with `.timeline-block` elements. Each block uses `flex: N` for proportional width and a background color. Below: `.timeline-banner` (warning/note text) and `.timeline-legend` grid.

Do NOT use vertical card layouts, inline padding/margin overrides, or nested divs inside timeline blocks.

Coaching reports use green banner (#e8f5e9); hiring reports use red/warning banner.

---

## Skill Inputs (SKILL.md Quick Start)

Five inputs gathered at report start:

1. **Key3** — respondent identifier (YYYYMMDD.email@domain.com)
2. **TTI Report** — uploaded PDF
3. **LinkedIn profile URL** — search by name+company first; ask user if not found
4. **Report type** — Hiring or Talent (coaching)
5. **Format** — Graphical (default) or Text

---

## Analysis Framework

### Three-Axes (Talent, Judgment, Skills)
Evaluate in order. Teams are only as fast as the slowest rower.

1. **Talent** — LinkedIn promotion history FIRST. No promotions within companies = "open question, not established."
2. **Judgment** — L1 #8 Org Decision Making. Key: Clarity of Accountability (8.2), Facts Over Feelings (8.7).
3. **Skills** — Not measured by instrument. Strong skills don't compensate for weak talent or judgment.

### Hard-to-Learn Gate Check (BEFORE other analysis)
Four signals — if severely present, they drive the recommendation:

1. Low Deliberate Urgency (L1 #9) — corroborate with low D in TTI DISC
2. Low Org Decision Making (L1 #8) — corroborate with Instinctive DF near zero
3. Conditional Belief in Others (Severe) — Flag10.UnconditBelief = "Condit Belief Sev"
4. Satisfied with Gripes — Flag.1.SatVsGripes lit

### Wiring-Fit Check
Compare TTI wiring vs ExcStds for hard-to-learn dimensions:
- ExcStds passes but TTI contradicts → "Diligence Item"
- ExcStds confirms TTI concern → "Targeted Concern"

**High-I ≠ Facilitative (learned from Hunter report, April 2026):**
High-I does NOT correlate with facilitative behavior. High-I leaders talk, persuade, and charm rather than listen and conduct. Low Facilitative Mindset + High-I = consistent concern, not contradiction. The high-I is part of *why* facilitation is weak.

**Conditional Belief — always flag, all severities (learned from Hunter report, April 2026):**
The Conditional Belief flag matters even at "Mixed" level. It constrains followership depth (people follow leaders who believe in them unconditionally) and the leader's ability to replace themselves (you don't develop replacements you don't fully believe in). Q36 answer of C is never great. Connect to Replacing Self, Investing in Others, and Intentional-over-Altruistic DF pattern.

**Q33 ("trade bottom 10%") — correct interpretation (learned from Hunter report, April 2026):**
For most businesses (not giant enterprises), the leader should be so aggressive on up-or-out that they'd be *uneasy* with this question — there should be no obvious bottom 10% to trade. A leader who agrees the org would improve has people they know aren't good enough and hasn't acted. Don't freelance this into "developing vs. trading" philosophy.

**Team quality as root cause (learned from Hunter report, April 2026):**
Weak Team Answer grades (B's, C's, F's) are often the root cause of Replacing Self, Conducting, and Facilitative Mindset issues. Causal chain: team quality → stays hands-on → can't disappear → can't conduct → can't facilitate. Foundational recommendation: get to all A's on the team first.

**Conducting Implementor — the "Assassin Profile" / killer-doer pattern (learned from Cohen report, April 2026):**
Wheel position 9 (D + C twin engines, S mid, I below midline) is a recognized high-performance wiring that carries a recognized team-alienation risk. These operators are the strongest *doers* in the room — they ship, hold the plan, make the hard call — and the same engine produces the classic teammate-alienation signal *the plan matters more than the people on it*. Instrument fingerprint: L1 depressions in Conducting & Outvoted, Facilitative Mindset, Replacing Self; flags lit classically in `Initiating Accountability Sev`, `HoldsAvgDownChain`, `Condit Belief Sev`, `Satisfied with Gripes | Low`; strengths that carry the file in `Not Pleasing`, `Deliberate Urgency`, `Org Decision Making`. TTI corroboration: Objective + Structured + Commanding Primary; Harmonious / Selfless / Receptive / Altruistic Indifferent. Counter-routines (in order): task only direct reports; question-first dialogue; third-party advocacy; develop-before-trade; disappear-by-design. **Voice rule:** "Assassin Profile" is internal analyst shorthand only — use *"Implementor wiring,"* *"recognized high-performance wiring with a recognized risk,"* or *"killer-doer pattern"* in client-facing prose; never "assassin." Full pattern writeup: METHODOLOGY.md Step 2a. Reference case: Cohen (`20250721.matt@provablemarkets.com`).

### Key Principles
- "When you have doubt, there's no doubt" — unclear = NO
- Blanco Principle — better no one in seat than someone with a major deficit
- Even one mediocre player damages the team

---

## Completed Reports

| Candidate | Report Type | Format | File | Status |
|-----------|-------------|--------|------|--------|
| Vincent Harinam | Hiring | HTML | `_reports/Harinam_Vincent_hiring_report.html` | Complete |
| Vincent Harinam | Coaching | HTML | `_reports/Harinam_Vincent_coaching_guide.html` | Complete |
| Vincent Harinam | Coaching | Text | `_reports/Harinam_Vincent_coaching_guide_DRAFT.md` | Complete |
| Bill George | Coaching | Text | `bill_george/coaching_guide_DRAFT.md` | Complete (pre-template) |
| Isaiah Harvey | Coaching | Text | `isaiah/coaching_guide_DRAFT.md` | Complete (pre-template) |
| Jody Bender | Hiring | HTML | `_reports/Bender_Jody_hiring_report.html` | Complete |
| Jody Bender | Hiring | Text | `_reports/Bender_Jody_hiring_report_DRAFT.md` | Draft |
| Sepand Moshiri | Hiring | HTML | `_reports/Moshiri_Sepand_hiring_report.html` | Complete |
| M&M | Hiring | Text | `MnM/hiring_manager_report_DRAFT.md` | Draft |
| Chris Hunter | Coaching | HTML | `_reports/Hunter_Chris_coaching_guide.html` | Complete |

---

## Interview Questions (Form 8) — CRITICAL, NON-NEGOTIABLE

**All interview probes in hiring reports MUST be drawn verbatim from this canonical set. This is a contract, not a convention.**

### Why Form 8 is non-negotiable

1. **Cross-candidate calibration.** Form 8 questions are the reference instrument that makes candidate A and candidate B comparable. If each report generates novel questions, every interview becomes incomparable to the last — the hiring manager loses the ability to build a mental library of how great, good, and mediocre answers to the same question distinguish themselves.
2. **Trained pattern recognition.** The probes are designed to surface specific, documented behavioral signals (Two-Sport Athlete, Punctuates Differently, Pre-Proof Belief, etc.). Novel interviewer-generated questions do not surface those signals reliably; they test whatever the interviewer was thinking about that morning.
3. **Freelanced questions silently substitute the interviewer's intuition for the instrument.** That is the failure mode the entire ExcStds methodology was built to replace.

### The 10 canonical Form 8 questions (probes 1 through 10, in canonical order)

1. **Two-Sport Athlete** — "Of all the things you've done in life, tell me what results you're most proud of."
2. **Talent Development** — "What people over your career have you nurtured who have gone on to do great things?"
3. **TORC** — "What was your boss's name? What will they say your strengths and areas for improvement were?"
4. **Emotional Maturity** — "What's the greatest adversity you've faced in life?"
5. **Punctuates Differently** — "What do you do to achieve excellence that others don't?"
6. **Facilitative Mindset** — "What's something you really believe in? When is it okay to make exceptions?"
7. **Commitment** — "Tell me something important to you that you do every day."
8. **Leadership Deep-Dive** — "Draw the org chart you're responsible for today."
9. **Passion** — "What is the worst job you could imagine? How would you create passion around it?"
10. **Continuous Improvement** — "What counts as work? When do you work, when don't you?"

### What IS tailored per candidate — and what must stay faithful

- YES — The **probe-category label** (links each Form 8 question to this candidate's specific flag / concern / wiring signal — e.g., "FACILITATIVE MINDSET (Concern 1 · Decisions-over-feelings)").
- YES — The **coaching note** underneath (what to listen for, grounded in this candidate's career history, flag profile, wiring mismatches). No "Listen for:" prefix.
- NO — **NEVER** the question text itself. Do not paraphrase, do not re-order, do not substitute a "similar" question, do not generate novel questions even if they seem better calibrated.

### Display rule

Do NOT lead the probe-question display text with the "Form 8 #N —" label. The reader sees the canonical question in quotes, exactly as it will be asked in the interview. "Form 8" is a sourcing rule (which questions are allowed), not a display label. The probe-category label carries the instrument-framing context.

### Build-time enforcement

`qa_gate()` in `_pipeline/scripts/build_<slug>_hiring.py` matches a distinctive substring from each canonical Form 8 question against each rendered `.probe-question` block. If fewer than 10 of 10 canonical questions are present, the build fails loudly with `AssertionError`. Freelanced questions cannot ship.

### Exceptions

None. If a candidate's profile seems to call for a probe the Form 8 set doesn't cover, that context belongs in the **coaching note** of the closest Form 8 question — not in a substituted question. If the Form 8 set is genuinely missing a question the framework needs, propose adding it to this section (as an 11th canonical question) and update `FORM8_QUESTIONS` in the build script. Do not silently substitute.

---

## API

```
POST https://hale-excstds-pipeline.onrender.com/v1/pull-respondent
Authorization: Bearer <token from _pipeline/.env>
Content-Type: application/json
{"key3": "<key3>"}
```

Returns Excel workbook with tabs: L1, L2, Flags, Skinny, ImpactTop10, TeachTop10, Non-Scorable, Metadata.

---

## Next Steps

- Run reports for additional candidates (both hiring and coaching) to validate the template system at scale
- Consider whether text templates are needed going forward given graphical report quality
