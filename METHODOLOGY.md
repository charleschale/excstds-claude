# Integrated Coaching Guide — Methodology

**Purpose.** A reproducible method for producing a single-respondent coaching guide that integrates TTI Talent Insights (DISC + Behavioral Hierarchy + 12 Driving Forces) with the Excellence Standards model. Designed to be applied to any respondent in the Hale Global dataset, not just the prototype (Isaiah Harvey, Key3 `20260413.isaiah.harvey@yale.edu`).

---

## Core design principle #1 — leadership is making people and situations better

This is the scoreboard. **Leadership is making people and situations better.** It is the only frame that holds at the end of every coaching guide we write. A leader who builds a great company by running point on everything has built something real and has not yet leaned into the version of leadership that outlives the builder. A leader who delivers results while shrinking the people around them has not led — they have performed. A leader who succeeds at the office while their family meets the residue of the build has paid a cost that the W-2 does not measure.

The instrument exists to surface where the practice of *making people and situations better* is incomplete. Every L1 area, every L2 dimension, every flag, every question is one operationalization of that frame. When a number is low, the question to ask is *"where in this leader's life are people and situations not yet getting better through their effort?"* — not *"what trait are they missing?"* The standards travel into every sphere where the respondent has influence: direct reports, exec team, board, clients, partner, children, parents, self. The deliverable's job is to name the practice ground.

This frame governs voice. Never write a coaching guide that scores the leader against the instrument and walks away. Always write one that names where the practice could make the people and situations around them better — *including the leader themselves*.

## Core design principle #2 — leadership excellence is all-around (the pilot frame)

A pilot can be great at everything — takeoff, navigation, cruise, radio work — and still be a bad pilot if they cannot land the plane. Landing is not a nice-to-have. It is the move that defines the job. **A CEO cannot be great if he or she has a one-sigma deficit at any L1 in the Excellence Standards.** Each L1 is a landing. Strengths in the other L1 areas do not substitute for the missing landing — they camouflage it, and the cost is the eventual moment when the missing competence is exactly what the situation requires.

Implication for the deliverable: when a respondent's file shows a 1σ-or-greater deficit at any L1, the coaching guide must name it directly — *this is a landing not yet being made.* Do not soften it. Do not let strengths elsewhere in the file create the impression that the pattern is fine. The coaching invitation is to install the missing landing — not because the person is failing, but because *that is the move that lets the rest of the wiring scale*. A founder-CEO with four 1σ L1 deficits at the in-the-room layers (Conducting, Replacing Self, Facilitative Mindset, Pushing Extreme Accountability) is being asked to install four landings. Naming the count makes the work specific and the stakes clear.

This frame governs how strengths are presented too. Strengths matter — they are the lift the file already has — but they do not erase L1 deficits. In every signature pattern, name the four-strengths-that-carry-the-file *and* name the L1 landings not yet being made, in the same paragraph. The reader needs to see both at once.

## Core design principle #3 — especially the best get better

The overarching frame of every guide produced by this method is the Excellence Standards principle: **especially the best get better.** The instrument exists because great leaders continue to practice and refine. It is not a certification, not an intelligence test, and not a capability assessment. It is a practice tool for leaders who want to keep improving — wherever they lead.

A few implications that must shape every report:

1. **The standards are universal.** *"Believe in people in advance of themselves"* is the same standard whether the person is your direct report, your co-founder, your teenage child, or a mentee you've taken on at age 75. The instrument is calibrated on workplace data, but the behaviors it surfaces apply to every sphere of a leader's life where they are in a position of influence. For top executives in particular — senior, established, possibly post-primary-career — the practice ground for the impact routines is often as much *personal life* as it is *current work role*. Being a great father requires believing in your child in advance of their own belief; being a great mentor requires giving feedforward rather than feedback; being a great spouse requires clarity as kindness. The standards travel.

2. **Low scores are not judgments of the person.** They indicate current expression gaps, not defects. The same person scored in different moments or in different contexts will show different expression patterns. A great leader taking over a turnaround may score lower on "admires the team" because the turnaround requires replacing that team — and that's the right move for the role. The coaching work is to name where the practice is needed, not to characterize the person.

3. **The instrument responds quickly to deliberate practice.** Reference case: Terry Alexander scored strongly before joining a turnaround. Once in the turnaround he scored poorly — because, appropriately to the situation, he didn't admire the team he'd inherited and was replacing them. As the turnaround matured and he used the coaching guide to refine his practices, his scores improved. He now advocates for the instrument and uses it everywhere in his life — work and beyond. The delta between re-takes is the coaching evidence that matters.

4. **Never position context as an excuse.** "You're in academia" or "you're in a turnaround" or "you're semi-retired" does not give a respondent a pass on the standards. The standards are universally applicable. Context only shapes *where* the practice ground lives — not whether the practice is needed. If a high-D CEO is decisive too fast at work, that pattern very likely shows up at home too, and the guide should name where the practice could be applied most usefully, not release the respondent from it.

5. **Voice discipline.** Never write sentences that imply permanence ("you lack X," "you are weak at Y"). Always write sentences that imply current expression ("this behavior is not currently being expressed," "the practice is incomplete right now"). Equally, do not write sentences that imply role-based escape ("you're in a role that doesn't require X"). The standards apply; the practice ground may vary.

6. **The coaching invitation is forward.** The guide exists because leaders at every level — and *especially* the best — keep practicing. Write the report as an invitation to the next rep, not as a report card on the last one.

If any section of a draft reads as trait-assessment, or as role-based excuse-making for a low score, revise.

---

## Inputs required per respondent

From the **Excellence Standards Power BI dataset** (via executeQueries REST API or DAX Studio):
1. Category-level rollup — 9 L1 categories with Z|Algo, Z|Human, RF# and question count
2. Sub-category rollup — all L2 dimensions with Score5_filtered and question count
3. Flag status — the 16 binary flags and their current state
4. Top Impact list — top ~10–20 questions ranked by Impact.Rank|Q
5. Top Teach list — top ~10–20 questions ranked by Teach.Rank|Q
6. Per-question detail for the union of the two lists — QuestionText, IdealAnswer, Commentary, TargetBehavior, IOU, _Polarity, Answer, RightNum, Z|Delta
7. Headline scorecard — overall Z|Algo, Z|Human, RF#, Questions Answered

From the **TTI Talent Insights Executive report** (PDF):
1. DISC Natural style — four numbers (D, I, S, C) on the 0–100 scale
2. DISC Adapted style — four numbers (D, I, S, C)
3. Behavioral Hierarchy — 12 workplace behaviors, each with a Natural score (0–100) and Adapted score. Standard items: Organized Workplace, Analysis, Persistence, Consistent, Following Policy, Competitive, Customer-Oriented, People-Oriented, Urgency, Frequent Change, Versatile, Interaction
4. 12 Driving Forces — each with a numeric score (0–100) and a tag (Primary / Situational / Indifferent). Six continua with two poles each: Instinctive–Intellectual (Knowledge), Selfless–Resourceful (Utility), Objective–Harmonious (Surroundings), Intentional–Altruistic (Others), Collaborative–Commanding (Power), Receptive–Structured (Methodologies)

## Two product variants

The instrument serves two distinct use cases. Approximately half of Hale Global's deployments are interview-context rather than coaching-context. The methodology below produces two distinct outputs depending on which variant is being built.

- **Variant 1 — Coaching Guide (candidate-facing).** The 15–20-page written practice tool for an established leader. Everything in the "Core Algorithm" section of this document is about Variant 1. Example: Bill George, Isaiah Harvey.
- **Variant 2 — Hiring Manager Report.** A 3–5-page evaluation written for the hiring manager of an interview candidate. Example: Meriste Moore (`MnM/hiring_manager_report_DRAFT.md`). Variant 2 structure, framework, and rules are documented in a dedicated section below.

**How to determine variant at intake:**
- Check `Answers_Non-Scorable` for the respondent. Q107 (interview_company) and Q108 (interview_role) populated = Variant 2. Empty = Variant 1.
- Secondary signal: Q114 cohort. Cohorts .1 / .2 (IC-only direct reports) + populated interview fields reinforce Variant 2. Cohorts .4 / .5 without interview fields reinforce Variant 1.
- Cross-over case: CEO-level hires may receive both variants — hiring-manager report for the search committee, coaching guide for the candidate if hired.

---

## Output — Variant 1 (Coaching Guide)

A ~15–20 page integrated coaching guide with the following spine:
1. Executive summary (1 p) — headline ExcStds scores + 1-sentence synthesis of DISC + top driver
2. Your behavioral fingerprint (1–2 pp) — condensed DISC + Behavioral Hierarchy ordered list + Primary DF cluster
3. What you teach (3–4 pp) — the 10 Teach questions, each with standard/why/target-behaviors/profile-fit
4. What to work on (5–6 pp) — the 10 Impact questions, each with standard/why/target-behaviors/profile-fit/fuel
5. The two lists connected (1 p) — the mirror observation (what themes the two lists express, how they interact)
6. Action plan worksheet (1 p)

---

## The core algorithm

### Step 1 — Pull and save all data to disk

All DAX queries are in `dax_queries.md` (see separate file). Key point: the naive `SUMMARIZECOLUMNS` join on `dim_L1L2` produces a cartesian. Use `SELECTCOLUMNS('Questions', ..., "L1_Num", RELATED('dim_L1L2'[L1_Num]))` instead. Results can be hundreds of KB with narrative columns and **must not be pasted into chat** — export as CSV to the respondent folder and load from disk.

### Step 2 — Classify each ExcStds category on the Natural ↔ Not-Natural axis

Using DISC Natural + Behavioral Hierarchy scores. The 9 ExcStds categories map to Behavioral Hierarchy items as follows:

| ExcStds category | Primary BH items (high score = natural) | Also relevant |
|---|---|---|
| Organizational Decision Making | Analysis, Organized Workplace, Following Policy | C score |
| Personal Reliability | Persistence, Consistent, Organized Workplace | C + S |
| Risking by Facilitative Mindset | People-Oriented, Interaction | Low C helps |
| Risking by Investing in Others | People-Oriented, Interaction, Customer-Oriented | I score |
| Conducting & Outvoted | Low C, Versatile, Frequent Change | Receptive helps |
| Risking by Replacing Self | Versatile, Frequent Change, low C | Low Persistence helps paradoxically |
| Risking by Pushing Extreme Accountability | Competitive, Urgency | D score |
| Not Pleasing | Competitive (for pushing discomfort), low I (for approval-independence) | D + low I |
| Deliberate Urgency | Urgency, Competitive, Frequent Change | D score |

**Decision rule.** A category is *Natural* when the relevant BH items are above 60 (population top third) and not contradicted by DISC. *Not-Natural* when relevant BH items are below 40 (population bottom third) or DISC clearly contradicts.

### Step 2a — Recognized DISC risk patterns (internal field notes)

Certain DISC shapes come with named, recurring coaching risks. Recognize the pattern before you read the scores — it tells you which flags to expect lit, which L2s to expect depressed, and which counter-routines belong in the *What to Work On* section. These labels are **internal framings for the analyst**; the respondent-facing guide must use the respectful wording called out under *Voice rule* below.

**The Conducting Implementor — internal name: the *Assassin Profile* / *killer-doer* pattern.** Wheel position 9 — D and C as the twin engines, S below or at mid, I below the midline. High-performance wiring; these profiles are often the strongest *doers* in the room. They ship, they hold the plan, they make the hard call. And the same engine that produces the execution can alienate the team it is driving: D+C reads as standards-pressure, low S reads as no pace-match, low I reads as limited warmth / third-party advocacy. Stacked, the signal teammates receive is *the plan matters more than the people on it* — even when that is not what the operator believes.

Instrument fingerprint (what to look for when this wiring is present):
- *L1 depressions:* Conducting & Outvoted (Conductor > Lead Guitarist, Empower Team Authority); Facilitative Mindset (Dialogue vs. Direction, Power & Status Management); Replacing Self (Ability To Disappear).
- *Flags lit, classically:* `Initiating Accountability Sev` (conductor lane collapse), `HoldsAvgDownChain` (compromise held at the same time the standard is carried up), `Condit Belief Sev` (belief extended to proven performers but not yet to developing ones), `Satisfied with Gripes | Low` (standing gripes held at the same time as reported satisfaction).
- *Typical strengths (what carries the file):* `Not Pleasing` L1 high, `Deliberate Urgency` L1 high, `Org Decision Making` L1 high, `Clarity of Accountability` L2 high, `Extreme Proactivity` L2 high.
- *TTI corroboration:* Objective Primary, Structured Primary, Commanding Primary; Harmonious / Selfless / Receptive / Altruistic cluster Indifferent. Adapted shift typically bumps D and drops S further.

Coaching implication. The counter-routines are specific and go in this order: (1) task only your direct reports — rebuild the chain of command; (2) question-first dialogue — replace direction-giving with probes; (3) third-party advocacy — public praise you do not own; (4) develop-before-trade — install the developmental discipline that lifts the bottom rather than replaces it; (5) disappear-by-design — the week-off as proof the organization runs without the operator. Do not pitch these as personality change; pitch them as *counter-routines installed against the grain of a wiring that would otherwise carry the whole org on its back*.

**Voice rule — do not use "assassin" in respondent-facing prose.** "Assassin Profile" is an internal analyst shorthand only. In the coaching guide itself, use the respectful wording: *"the Implementor wiring and its known risk,"* or *"a recognized, high-performance wiring that carries a recognized risk,"* or *"the killer-doer pattern."* Name the specific seams where the strengths tip into the risk — that is the operating manual the respondent needs. Never frame the pattern as a verdict on the person.

**The IAAM integrated read — *I Am All About Myself*.** The Implementor wiring is the *necessary* condition for the failure pattern; it is not the *sufficient* condition. The full failure pattern fires when three signals co-occur:

1. **Implementor wiring at the core** (D + C twin engines, S mid/low, I below midline).
2. **One-sigma-or-greater L1 deficits across the in-the-room cluster** — Replacing Self, Conducting & Outvoted, Facilitative Mindset (frequently with Pushing Extreme Accountability joining). These are the landings (per Core principle #2 — the pilot frame) where the plane does not yet land.
3. **Severe Conditional Belief** (belief is extended to those who have already delivered; not yet to those who have not).

When all three co-occur, the pattern resolves to one outcome — *"I Am All About Myself"* — a leader who, often without intending it, keeps the people around them one rung below full capability so the leader stays indispensable. The prize is indispensability; the cost is structural: nothing scales, the leader exhausts themselves carrying it, and the people who care most about them — partner, children, parents, self — meet the residue of the build rather than the person.

Coaching consequence. When the IAAM signature is detected, the deliverable must name two costs together: the *organizational* cost (the ceiling the company hits because no one is built up high enough to take the next layer) and the *personal* cost (showing up as a lousy partner, a lousy parent, a stranger to oneself). Both are real; the personal cost is what most often moves the practice. Tie back to Core principle #1 — *leadership is making people and situations better* — because that is the frame that sees both costs at once.

Voice rule for IAAM. Never write *"you are all about yourself"* — that is judgment, not coaching. Write the pattern: *"this combination, uncorrected, resolves to a specific outcome — a leader who keeps the people around them one rung below full capability so the leader stays indispensable. You may win; you win at great cost."* Always pair the diagnosis with the alternative: *"the standards in this guide exist because the alternative — leadership that makes people, situations, and you yourself better — is entirely learnable."*

Reference case: Matthew Cohen (`20250721.matt@provablemarkets.com`, April 2026 coaching guide) — textbook IAAM signature; Implementor wiring, four 1σ L1 deficits in the in-the-room cluster, Severe Conditional Belief, four flags lit, strengths cluster carrying the file.

### Step 3 — Classify each ExcStds category on the Effective ↔ Ineffective axis

Using Z|Algo at the L1 level:
- **Effective:** Z|Algo ≥ +0.5 (roughly)
- **Ineffective:** Z|Algo ≤ −0.5
- **Neutral:** between ±0.5 — use L2 detail to see if there are strong sub-patterns

**Note on Z|Human.** Z|Human is an internal polarity check used by the Excellence Standards team — when Z|Human disagrees sharply with Z|Algo ("reverse polarity") the underlying question gets flagged for removal from scoring. It is not a second scoring lens for coaching purposes and should **not** appear in respondent-facing reports. Treat it as internal diagnostic data only. The coaching signal is always Z|Algo.

**Cohort-anchored interpretation of Z|Algo.** Before reading Z|Algo at face value, identify the respondent's Q114 cohort (from `Answers_Non-Scorable[QuestionNmbr] = 114`) and mentally anchor the score against the cohort average. A Z|Algo of +0.10 means very different things depending on the cohort: *well above* the .1 (ICs) norm, *below* the .5 (All Leaders) norm.

Static cohort norms (from `dim_CohortBridge`, as of April 2026 — no per-respondent cohort-relative Z measure exists in the model because RLS would require duplicate-table workarounds that would explode the model size, so this table serves as the manual ruler):

| Cohort | N | Avg Score5 | Avg Z\|Algo | Med Z\|Algo |
|---|---|---|---|---|
| Q114.1 DirRpts: ICs | 207 | −0.528 | −0.115 | −0.188 |
| Q114.2 DirRpts: Mostly ICs | 98 | −0.753 | −0.164 | −0.198 |
| Q114.3 DirRpts: Mix | 179 | −1.123 | −0.244 | −0.275 |
| Q114.4 DirRpts: Mostly Leaders | 159 | +0.230 | +0.050 | −0.069 |
| Q114.5 DirRpts: All Leaders | 376 | +1.125 | +0.244 | +0.128 |
| (All Respondents) | 1088 | −0.034 | −0.007 | −0.113 |

Two patterns worth holding: (a) the inflection between .3 and .4 is sharp — cohorts .1/.2/.3 all sit below the all-respondents mean, .4/.5 above. Crossing from "Mix" to "Mostly Leaders" is where ExcStds scoring lifts meaningfully, consistent with the standards rewarding leading-leaders behaviors. (b) The .3 (Mix) cohort is the *lowest*-scoring — leading a mixed roster of ICs and leaders is structurally the hardest mode. When a respondent sits in .3, name the structural difficulty; the gap isn't a personal failing.

Application rules:
- Cohort .1 / .2: earlier-career framing in the prose — "learning to lead" rather than "refining established leadership." Voice more instructive, less peer-to-peer.
- Cohort .3: name the mixed-reports difficulty explicitly.
- Cohort .4 / .5: leading leaders. Replacing-Self and Investing-in-Others items carry extra weight. Voice peer-to-peer, frame as practice for someone already operating at level.
- The cohort math stays in the writer's interpretation; it does not need to appear in reader-facing prose unless it helps the respondent understand why a score reads the way it does.

### Step 4 — Place each category in the 2×2

| | Effective | Ineffective |
|---|---|---|
| Natural | **Teach** — wiring expressing as it should | **Close the loop** — leak inside a strength zone |
| Not Natural | **Protect** — driving force is carrying it | **Install routines** — the core coaching work |

The Teach list will cluster in the Natural + Effective cell. The Impact list will cluster in the Not-Natural + Ineffective cell. Items that don't fit the dominant pattern (e.g., a Teach item in the Not-Natural + Effective cell) are where Driving Forces earn their keep as anomaly-explainers.

### Step 5 — Identify fuel for each Impact routine

For each Impact question, determine which Primary Driving Force will sustain the corresponding routine. Use this mapping:

| Driving Force | Fuels routines about... |
|---|---|
| Receptive | Letting others have their methodology; dialogue over direction; ownership reflection; empowering team authority; weekly disappearance as diagnostic |
| Intellectual | Knowledge-transfer (priority repetition); analytical restraint; building the replacing-self system; diagnostic observation |
| Intentional | Specific investment in specific people; discomfort invitation for named individuals; developmental conversations; fans-ness behaviors when targeted |
| Commanding | Fuels routines that *require decisive action or authority presence* (e.g., action-over-inaction, pushing accountability, discomfort for team). Does NOT fuel routines that *require restraint or ownership-transfer* (e.g., optionality-preservation, withholding urgency, single-point-accountability delegation). For introverted respondents (Low-I), do not use Commanding as fuel even if Primary — the expression channel doesn't exist. When Commanding is the *source* of the gap (e.g., deciding too fast), the fuel must come from another Primary driver even if Commanding is P1. |
| Altruistic | Fuels broader-good framings for developmental behaviors — *"this serves the mission / the team / the larger cause."* For leaders where Altruistic is Primary but Intentional is Indifferent (a common pattern), Altruistic becomes the critical coaching lever because "specific investment in specific people" will not land. Reframe individual-focused routines as mission-focused. |
| Structured | Routines for their own sake; following policy. **Not usable as fuel if Indifferent** — this is common and important. |
| Objective | Facts-over-feelings decision-making |
| Harmonious | Sublimating ego; dialogue that honors the room |
| Selfless | Service-oriented behaviors; completing tasks for the team's sake |
| Altruistic | Broader community investment |
| Collaborative | Supporting role behaviors; empowering others to lead |
| Resourceful | ROI-framed decisions; efficiency behaviors |
| Instinctive | Experience-based pattern matching; gut-led decisions |

**Decision rule for fuel selection.** Pick the highest-ranked Primary DF that plausibly fuels the behavior. If two Primaries both fit, name both (e.g., "Fuel: Intellectual + Receptive"). If the person's wiring would make a DF unusable despite being Primary (e.g., Commanding for a Low-I respondent), say so explicitly — this is the most important judgment call and the one that makes reports feel personalized rather than templated.

### Step 6 — Write each section using the template

**Teach item template** (~150 words):
- **The standard** — the question's behavior statement, quoted or closely paraphrased
- **Why it works** — one-line compression of Commentary
- **What to teach** — the specific behaviors to pass on, taken from TargetBehavior
- **Why it's natural for you** — cite specific DISC + BH + DF numbers that predict this strength. If strength is *not* predicted by DISC, explicitly name the DF that's carrying it.

**Impact item template** (~180 words):
- **The standard** — the question's behavior statement
- **Why it matters** — one-line compression of Commentary
- **What to do** — the target behaviors, taken verbatim or near-verbatim from TargetBehavior
- **Your profile** — two parts: (a) what in your wiring makes this not natural (specific BH scores), (b) which Driving Force will fuel the routine, and the reframe that connects them

**Closing mirror observation.** After both lists, write a short section naming the cross-pattern. For most respondents, the Teach list will show one class of behavior ("holding" or "pushing" or "relating" depending on DISC) and the Impact list will show the complementary class. That's the synthesis.

---

## Rules of thumb (lessons from Isaiah Harvey and Bill George builds)

1. **DISC + Behavioral Hierarchy are the primary lens. Driving Forces are anomaly explainers.** Don't build the Natural/Not-Natural axis from motivators. Use motivators only when: (a) they confirm what ExcStds already shows, or (b) they explain an ExcStds strength that DISC wouldn't predict.

2. **Only Primary cluster DFs matter for writing. Situational and Indifferent appear as context, not as fuel.** Situational DFs may fuel behaviors when the situation calls for them but won't sustain routines. Indifferent DFs actively resist being framing vehicles — note them explicitly when the obvious framing would use one (e.g., "don't frame as structure — Structured is Indifferent").

3. **Commanding in a Low-I profile is a trap.** If D + Commanding are both high but I is very low, the person's Commanding driver does not express through the standard confrontational/dominant behaviors. Don't use it as fuel for pushing-discomfort routines. Use Intentional instead.

4. **Never pluralize or invent routines beyond TargetBehavior.** Every specific behavior recommendation must trace back to the question's TargetBehavior field or its Commentary. The coaching move is synthesis, not generation. This was the primary drafting error in early versions.

5. **Drop L1/L2 jargon from reader-facing prose.** Say "the area called Discomfort For Team" or "decision-quality behaviors" rather than "L2 7.4" or "L1 8." Keep the labels in the data layer and the methodology doc, not in the report itself.

5a. **Signature Pattern is conceptualization, not numeric summary.** The Signature Pattern paragraph that opens the coaching guide is the reader's first impression and should *describe the pattern in concepts*, not enumerate scores. Keep it free of Z-values, L2 numbers, DF rank-and-score lists, and per-question references. The fingerprint card and scorecard immediately below carry every figure the reader could want; the signature's job is to name what those figures mean. Permitted in the signature: biographical scale markers (e.g., $18MM Seed → $75MM Series A), named findings (flag names, named L1 areas described in plain language), and conceptual framings (sheriff vs. conductor, easy-to-please vs. hard-to-satisfy). Not permitted in the signature: Z|Algo values, L2 ± numbers, DF rank/score lists, per-question Q-numbers, percentile readouts. If a number is doing the storytelling, move the story up and let the chart do the number.

6. **Coaching voice, not diagnostic voice.** The respondent is reading this. Principles to weave in: *clarity is kindness; especially the best get better; nothing great happens until people are uncomfortable; leaders believe in people in advance of their own belief.* These anchor the tone.

7. **No "good" or "bad" language.** Only "effective" and "ineffective." Behaviors are not morally loaded; they produce outcomes or don't.

8. **Quote the standard when practical.** Respondents and their coaches are familiar with the Excellence Standards language; using the actual question text anchors the report in a shared vocabulary rather than in the writer's paraphrases.

9. **Altruistic vs Intentional as coaching levers.** These two Driving Forces look similar but produce very different coaching frames. Intentional (Primary) supports *"specific investment in specific people"*; Altruistic (Primary) supports *"investment in the broader good / mission / cause."* For respondents where one is Primary and the other is Indifferent (surprisingly common — Bill George has Altruistic P3 with Intentional Indifferent #10), all developmental behaviors must be framed through the Primary one. Attempting to use the Indifferent-side frame produces routines that don't stick.

10. **Commanding-as-fuel vs Commanding-as-source distinction.** When Commanding is Primary, check whether it's *producing* the impact gap (e.g., deciding too fast, imposing urgency, being the source of authority when distribution is called for) or whether it would *fuel* the routine (e.g., action-over-inaction, pushing accountability when accountability has diffused). If Commanding is the source, route around it to the next Primary. If Commanding would fuel, use it directly but pair with a restraint-capable driver (Receptive, Selfless) to keep it from re-producing the same gap in new form.

11. **Standards are universal; practice ground may vary.** Do not use role context as an excuse for low scores. The standards apply universally and the coaching invitation is to practice them wherever the respondent has influence — which for top executives often means as much in personal life as at work. When a respondent's current role doesn't seem to *require* a given behavior, ask where else in their life the standard applies, and invite the practice there. A CEO with grown children still has grandchildren, mentees, and a legacy conversation with themselves. The instrument points at real gaps; the coaching names real practice grounds.

12. **Build outputs land at `_reports/` root in BOTH formats — HTML and PDF.** Every coaching guide and hiring report must end up at the top level of `_reports/` as TWO files, named identically except for the extension:
    - `_reports/<Lastname>_<Firstname>_coaching_guide.html` and `.pdf`, or
    - `_reports/<Lastname>_<Firstname>_hiring_report.html` and `.pdf`

    Per-build working subfolders (e.g., `_reports/cohen_coaching/`) are fine for intermediate artifacts, but the canonical user-facing surface is `_reports/` root. The HTML matters as much as the PDF — it's the editable surface for v2/v3 iteration, the source of truth for chart rendering, and the format that survives template revisions cleanly. Shipping only the PDF leaves the user without the artifact they need to revise.

    **Build-script convention:** every build script's `OUT` writer must do two writes — `OUT_DIR/<name>.html` for the working copy AND `_reports/<Lastname>_<Firstname>_<variant>.html` for the canonical copy. Same pattern for the PDF renderer JS — write to the working subfolder and copy/link to `_reports/` root. Verify both files exist with `ls -la _reports/<Lastname>_*` as a final QA gate before announcing the build is done. If either is missing, the build is not complete.

13. **Remind the user to push to git after every substantive session.** The brains files (METHODOLOGY.md, PROJECT_NOTES.md, the report SKILL.md, templates, session notes, build scripts) accumulate hours of trial-and-error judgment. OneDrive sync is not version control — it's a single-point mirror with no diff history. A bad edit (Edit-tool truncation, accidental overwrite, OneDrive merge conflict) can silently destroy days of work. After delivering any report, methodology change, skill change, or build-script change, Claude must surface a short backup prompt with the PowerShell commands. The two repos are `charleschale/excstds-claude` (workspace root, brains) and `charleschale/hale-excstds-pipeline` (`_pipeline/` folder). Skip the pipeline block if `_pipeline/` was untouched; skip both if the only changes were inside `_reports/` or `_respondents/` (excluded from version control by design). The full reminder template lives in `_skills/report/SKILL.md` under the "Closing — Back up the brains" section.

---

## Data quality checks before writing

1. **Impact list continuity.** Occasionally the exported Impact CSV is missing a rank (e.g., the Isaiah prototype had rank 4 missing from the CSV — the actual rank 4 was in the full DAX result). Always cross-reference the CSV with the DAX export of per-question data before writing.

2. **Teach list bounds.** Top 10 Teach questions are the standard set. If any of those 10 are answered ideally but with a near-zero Z|Delta, they're effective-but-not-distinctive — note this in the Teach section but don't lean heavily.

3. **Contradiction check.** For each Impact item, verify the person's Answer is actually off-ideal. For each Teach item, verify Answer == RightNum or near-ideal. The Z|Delta values alone don't tell you which side of the standard they're on.

4. **Category-level contradictions.** If a category is overall Effective (+0.5 Z|Algo) but contains several Impact-ranked questions, flag the pattern — it indicates leaks inside a strength zone (the "Close the loop" quadrant). These deserve a callout even if not in the top Impact list.

5. **Flag corroboration.** When an Impact routine maps to a lit flag (e.g., Q33 + "Satisfied with Average" flag, or Discomfort For Team gaps + "Lower Stds for Others than Self" flag), name the flag in the prose. Flag evidence strengthens the case.

---

## Variant 2 — Hiring Manager Report

This section documents everything that differs when the product is a hiring-manager report rather than a coaching guide.

### When Variant 2 applies

The candidate is being evaluated for a role rather than coached in a role. The respondent has typically completed the same instrument as a Variant 1 respondent, but the audience of the report is different (the hiring manager, not the candidate), the decision it supports is different (hire/no-hire + structured interview follow-up), and the voice is different (professional evaluation, not coaching). The substance of the ExcStds + TTI data is identical; what changes is how it is framed and who reads it.

### TTI is mandatory

Unlike Variant 1, where the TTI adds corroboration and anomaly-explanation to an ExcStds-driven narrative, **Variant 2 cannot be shipped without the TTI.** The Meriste Moore build (April 2026) produced a v0.1 draft from ExcStds alone and a v0.2 draft with TTI added; the difference was large enough that v0.1 would have materially under-served the hiring manager. Specifically:

- TTI DISC D score corroborates or contradicts ExcStds Urgency readings (see "slow to move" signals below).

If the TTI is not yet in hand for a Variant 2 candidate, stop data work and request the TTI before continuing.

### Output structure — 3 to 5 pages

1. **Recommendation** — hire / recommend against / qualified yes, with the rowing-pace framing (see below).
2. **Headline scoring table** — one table with ExcStds Z|Algo overall, RF#, flag counts, DISC Natural + Adapted, key BH items, Primary + Indifferent DF cluster.
3. **Evaluation on three axes** — Talent, Judgment, Skills (see framework below). Lead with Talent and Judgment reads; Skills is a third, shorter section.
4. **Slow-to-move signals present (if any)** — named, corroborated across ExcStds and TTI, and framed in timeframe language (see below).
5. **Structured interview guide** — 4 to 6 questions tied directly to the most decision-relevant gaps and strengths, each with the read it is probing and the answer pattern that confirms vs. disconfirms the hypothesis.

### Role-Fit section — seat-responsive "What Will Be Easy / What Will Be Hard"

Codified after the Cohen build (April 2026). The Variant 2 badge scheme (red / amber / green across Talent, Judgment, Skills) is coarse — it can read net-positive on a candidate who has both top-decile strengths and Sev-level flags, because the badge averages signal rather than weighting it. The hiring manager then loses the seat-specific decision shape: which strengths actually translate to *this* role, and which weaknesses are deal-breakers vs. coachable in *this* role.

The Role-Fit section sits immediately after the three-axes block and before the targeted concerns. It is a single bordered box with two columns:

- **What Will Be Easy** (green-left, ~120-150 words) — names the top-decile L1/L2 strengths + TTI primary cluster + career evidence that map directly onto the seat's specific demands. Example for Series B CEO: decisional velocity, regulator/counterparty legitimacy, structured operating cadence.
- **What Will Be Hard** (red-right, ~150-200 words) — names the seat-specific failure mode the data predicts. Frames the failure as a transition (e.g., "the conductor-not-lead-guitarist transition" for Seed/A → Series B), then catalogues the L1/L2 + TTI evidence that points at it. Ends with a binary diligence question the onsite must answer (e.g., "installable against the wiring, OR pair with a COO whose explicit charter is X?").

The seat description is a separate one-line caption at the top of the box (Series B growth-stage CEO · regulated FinTech · scaling exec team · board wants commercial velocity + operating discipline). The hiring manager must supply the seat shape; if not supplied, the build script asks via AskUserQuestion before drafting the section.

Template tokens: `{{ROLE_FIT_TITLE}}`, `{{ROLE_FIT_SEAT}}`, `{{ROLE_FIT_EASY}}`, `{{ROLE_FIT_HARD}}`. CSS classes: `.role-fit-box`, `.role-fit-grid`, `.role-fit-col.easy`, `.role-fit-col.hard`. The hiring template ships these as canonical from this build forward.

QA gate adds these checks: `role-fit-box` ≥ 1, `role-fit-col easy` ≥ 1, `role-fit-col hard` ≥ 1, presence of "What Will Be Easy" + "What Will Be Hard" labels, and a seat-name reference (e.g., "Series B" / "Series A" / "VP" / "Director" matching the supplied seat shape).

---

## Pretend-CEO mode — framing rules

Codified after the Alba Quintas Núñez coaching guide (April 2026, Yale undergraduate). Many respondents — and almost every college student — take the Excellence Standards survey explicitly *as if they were a CEO with direct reports*, even though they have not held that seat. Yale advises this approach when the respondent has no actual direct reports to assess against. The framing of the entire deliverable changes substantially under this mode and the change is non-trivial enough to deserve a dedicated section in the methodology.

### When pretend-CEO mode applies

Trigger conditions, in order of strength:

1. The user explicitly confirms it at intake (the SKILL.md Quick Start input #6 prompt).
2. The Key3 email domain is `.edu` or otherwise indicates a college student.
3. The Non-Scorable tab Q9921 (prior role) reads "Student", or Q9931 (role before that) reads "Student".
4. The Non-Scorable tab Q106 (current role / title) reads as a student or college position rather than as a CEO / executive seat.
5. The respondent's age, inferable from career history Q9911–Q9938, is under ~25.

When any of these hold, default to pretend-CEO mode. Confirm with the user up front — never default silently, because an actual-leader respondent who happens to be young (e.g., a 24-year-old founder-CEO) needs the actual-leader framing.

### What changes in pretend-CEO mode

The substance of the analysis does not change. The L1/L2 scores, flags, Impact and Teach top-tens, TTI wiring composite, and Driving Forces composite all read the same. **What changes is the lens through which the data is interpreted in narrative.**

- **Actual-leader frame:** the file shows current behavioral leadership patterns. Gaps are described as "leader's burden not yet picked up." Coaching invitation is to refine practice while in the seat.
- **Pretend-CEO frame:** the file shows current *instincts about what good leadership looks like*, before the seat. Gaps are described as "against-standard instincts worth refining before the seat arrives." Coaching invitation is to train the instincts now, in peer-team contexts and student-leadership operations, so that when the seat arrives the starting point is closer to the admired pattern than the average first-time leader's.

Both frames produce the same set of Impact and Teach items. Only the language in the Signature Pattern, the introductory framing of each Flag-Driven and per-answer card, and the Closing Note changes.

### The "good instincts / against-standard instincts" structural pattern

In pretend-CEO mode, the Signature Pattern leads with credibility (the activity record + the cohort-relative top-decile score) and pivots to a two-bucket structural read:

1. **Where the instincts align with the standard.** Name the L1 strengths above one standard deviation. These are the parts of leadership the respondent already has the instinct for. Most pretend-CEOs at twenty have several. For a top-decile respondent, this list will be remarkable for its length.
2. **Where the instincts go against the standard.** Name the four-or-five flags or per-answer findings that show against-standard instincts, framed as instincts to refine *before* the seat arrives. The phrase "untrained instincts harden into habits when the seat actually arrives" captures the urgency.

### The four common-cohort against-standard instincts (in Yale-equivalent populations)

These four show up repeatedly in pretend-CEO files of high-achieving college students. When any one of them is present, the others are usually too — they cluster, because they share a common root (the leader's burden has not yet been imagined picked up).

1. **Holding yourself to a higher standard than others.** Lights the *Lower Standards for Others than Self* flag. The admired pattern is the reverse — admired leaders expect *more* of others than of themselves, because they admire them. Holding yourself to a higher standard sounds humble; in practice it means the leader fills the gap by doing the work, and the team never gets the chance to rise.
2. **A leader cannot be outvoted.** Q5 ("my team can outvote me") answered toward "cannot." A leader the team cannot overrule is the boss; a leader the team can overrule is the conductor. The boss model scales to one person's judgment; the conductor model scales to the team's collective judgment.
3. **The team can be at fault independently of the leader.** Q61 ("there are no bad teams, only bad leaders") answered toward disagreement. The admired stance is extreme ownership: when the team is not delivering, the work to do sits on the leader side first.
4. **Approval from others matters at the threshold.** Q131 (require excellence vs. require respect/approval) answered middle-of-scale or toward approval; *Cares About Others Not Their Approval* L2 sitting low. The pattern is wanting to be liked-and-effective at once and softening on the "effective" side when discomfort would be the more developmental act.

### The ideological-conformity nuance on the Pleasing thread

The Pleasing pattern is not only about wanting personal popularity — that is the easier version to spot and to coach. The harder version, especially common in Yale and similar academic environments, is *pleasing the prevailing ideological or cultural moment*: deferring to the positions the in-group expects, because taking those positions feels like the right thing rather than like pleasing. This nuance must be named explicitly when the respondent is from an academic environment and shows the Pleasing pattern, because the in-group-loyalty version is invisible to the respondent (it does not feel like pleasing) and therefore harder to refine without naming.

The Q119 answer (see below) is one expression of this nuance. When Q119 fires in a pretend-CEO file, name the ideological-conformity version of pleasing in the Signature Pattern's Pleasing-thread paragraph.

### Q119 as a "woke test" — full walk-through required

**Q119:** *"When leaders take a stance and attempt to do the 'right' thing about issues unconnected to the core mission of the organization, everyone loses — especially the leader."* Scale 1-TRUE / 5-FALSE; admired answer is 1 (TRUE).

This is one of the most reliably-failed questions in the entire instrument among smart, civically-engaged college students. The failure pattern: students answer 4 or 5 (FALSE), reflecting the prevailing academic-environment instinct that platforms come with responsibility, that silence on important issues is itself a position, and that leaders should use visibility to advance causes they believe in.

The coaching response is **never** dismissal of the respondent's values. It is a careful walk-through of the rationale. The card for Q119 in pretend-CEO files should always include:

1. **Acknowledge the cohort-typical instinct** the answer comes from. Smart, civically-engaged students at Yale (and similar campuses) are taught — explicitly and implicitly — that platforms come with responsibility. There is integrity in that instinct.
2. **Walk through the three predictable consequences** when leaders speak outside the lane: (a) the leader becomes a lightning rod (whichever side the leader takes, the other side reads it as official organizational endorsement and feels disenfranchised); (b) the team fractures internally (teammates with different views feel they cannot speak honestly without consequence; collaborative spirit erodes); (c) the mission gets diluted (energy that should go to the work goes to managing public-statement controversies).
3. **Distinguish what the discipline is and is not.** The discipline is *not* silencing the leader's personal views. The respondent may hold strong positions and should hold them. The discipline is choosing not to use the *leadership platform* for views unconnected to the role's mission. Personal positions can be voiced from the respondent's own name and platform — not from the org's.
4. **Connect to the broader Pleasing thread.** Mission-loyalty over in-group-loyalty.

### Q63 as a "requiring excellence produces respect" reframe

**Q63:** *"Comfort vs Discomfort: Peak performance happens when teams are: 1-Comfortable / 5-Uncomfortable."* Admired answer is 5 (uncomfortable / productively pressured).

A common pattern at twenty — and especially in respectful, internationally-mobile, civically-engaged students, AND particularly among students from harder backgrounds where respect was hard-earned — is to read "requiring excellence" and "showing respect" as opposite ends of the same axis. The implicit logic: *if I push them, I am not respecting them; if I respect them, I should ease the demand.*

**The admired-leader frame inverts that logic exactly.** Requiring excellence *is* the highest form of respect. To require excellence of someone, you have to (a) believe they are capable of it, (b) care about their growth more than their comfort, (c) be willing to hold the discomfort while they rise to the standard. Easing the demand looks like respect on the surface; on a longer time-frame the team experiences it as the leader not believing they can rise.

When Q63 fires in any coaching guide — pretend-CEO or actual-leader — name this reframe explicitly. It is one of the most consistently valuable coaching points in the instrument and the framing is non-obvious from inside the wiring that produced the answer.

### Q125 as a "B-grade = F-grade" gateway-belief test

**Q125:** *"I believe in people in advance of them believing in themselves."* Scale 1-TRUE / 5-FALSE; admired answer is 1 (TRUE).

Q125 is one of a small set of *gateway-belief* tests in the instrument where there is effectively no B-grade. Either you believe in people in advance, or you do not — and the team feels the difference. An answer of 2 ("mostly, but not always") triggers the *Mixed Conditional Belief* flag, and the B-grade-equals-F-grade rule applies: **at the Mixed level, Conditional Belief is not a soft version of Severe; it is a different reading of the same fundamental gap and carries effectively the same coaching weight.**

In every coaching guide where Mixed Conditional Belief is lit, the framing must explicitly:

1. State the rule: there is no B-grade on this question; either belief is extended in advance or it is not.
2. Cite Q125 specifically and the respondent's actual answer.
3. State that Mixed-level Conditional Belief still constrains followership depth and the leader's ability to develop people they do not yet fully believe in.
4. **Never** soft-pedal the finding by characterizing Mixed as "less concerning than Severe." It is the same concern, expressed at a lower-severity surface.

### Other pretend-CEO mode framing rules

- **The "leader's burden" language is replaced with "against-standard instincts" language** in pretend-CEO mode. The leader has not yet had a burden to pick up; they have current instincts about what good leadership looks like, and some of those instincts go against the standard.
- **The Closing Note's "two effectiveness levers, in sequence" structure stays.** The first lever is still the prerequisite (HandsOn|Sev plus the depth-of-organization flag). The second lever is the in-the-room conducting / against-standard-instincts work. The advantage-at-this-altitude paragraph is the new pretend-CEO-specific addition: refining instincts at twenty in peer-team contexts and student-leadership operations means the version of the leader who walks into a real seat has already done the work most first-time leaders have to do under pressure.
- **Cohort-relative scoring still anchors at the all-leaders cohort norms.** Even in pretend-CEO mode, a Z|Algo of +1.40 means the pretend-CEO answers cluster top-decile of the all-respondents population — which itself skews senior. That is meaningful. State the cohort-relative read and the cohort-typical context.
- **Reference case:** Alba Quintas Núñez (`20260425.alba.quintasnunez@yale.edu`, April 2026 coaching guide) — Yale undergraduate, top-decile pretend-CEO file, four against-standard instincts visible, ideological-conformity nuance on Pleasing, Q119 walk-through, Q63 respect reframe, Q125 B=F call-out all present.
