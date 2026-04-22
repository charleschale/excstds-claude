---
name: report
description: Generate Excellence Standards hiring-manager reports or talent coaching guides from a respondent Key3. Use this skill whenever the user wants to run a report, generate a hiring report, create a coaching guide, pull respondent data, or mentions Key3, ExcStds, Excellence Standards, TTI, or talent assessment. Also trigger on "/report" or any mention of "run a report for [name]". This is the primary workflow for producing Hale Global deliverables from instrument data.
---

# Excellence Standards Report Generator

This skill orchestrates the full report generation workflow: data pull, analysis, narrative generation, chart computation, template fill, and HTML output. It replaces the manual process of opening Power BI, exporting data, and hand-filling templates.

## Quick Start (what to show the user)

When this skill triggers, begin by gathering five inputs UP FRONT (before doing any work). Use AskUserQuestion for the multiple-choice items; ask for the free-text/attachment items in the same turn:

1. **Key3** â€” the respondent identifier (format: `YYYYMMDD.email@domain.com`). If the user already provided it inline with the command (e.g. `/report 20260415.firstname.lastname@example.com`), skip asking.
2. **TTI Report** â€” the TTI Talent Insights PDF for this respondent. The analysis requires TTI data (DISC profile, Driving Forces) for the Wiring-Fit Check and corroboration on hard-to-learn signals. Ask the user to upload the TTI PDF. If they've already attached it, skip asking.
3. **LinkedIn URL** â€” the respondent's LinkedIn profile URL. This is REQUIRED up front, not optional. LinkedIn is the single richest external-validator file on the respondent â€” promotion history, awards, board/volunteer leadership, education, and activity together form the Talent signal (see Three-Axes Framework in Step 3). Always ask for this alongside Key3 and TTI. If the user says they don't have it or can't share it, proceed but flag in the report that the Talent axis read is constrained to instrument data and self-reported career history (Non-Scorable tab 9911â€“9938).

   **MANDATORY FULL-PROFILE SWEEP â€” do not skip any section.** When a LinkedIn URL is provided, pull ALL of the following sections before drafting the Talent axis. A partial sweep has produced repeated errors in past reports (missing internal promotions, missing awards, missing community-leadership roles that directly contradict instrument readings). This is non-negotiable.
   - **Experience** â€” every role, every date, every concurrent role. Click "Show more" / navigate to `/details/experience/` to guarantee full pull. Internal promotions within a single company are a top-tier talent signal and are easy to miss if the sweep is lazy.
   - **Honors & Awards** â€” navigate to `/details/honors/`. Count and list every award with year and issuer. Five independent award judges across the career arc is stronger Talent evidence than two sponsor-bets.
   - **Education** â€” `/details/education/`. School names, dates, honors, degrees in progress.
   - **Volunteer Experience / Board Service** â€” `/details/volunteering-experiences/`. Chair, Co-Chair, Treasurer, Secretary seats are peer-elected or appointed â€” they ARE talent-selector evidence and often directly counter the Investing in Others / Unconditional Belief instrument reads.
   - **Skills, Certifications, Licenses** â€” `/details/skills/`, `/details/certifications/`. Note any licensing that constrains role fit.
   - **About / Summary** â€” the top-of-profile narrative.
   - **Recommendations** â€” `/details/recommendations/`. Count received/given and note patterns.
   - **Activity** â€” recent posts, especially active recruiting (posting jobs, sharing hiring updates). Active hiring activity is live counter-evidence to low Investing in Others instrument readings.

   After the sweep, write a one-line summary in the working notes of what was found in EACH of these sections (even if the answer is "none" or "empty"). If a section was not checked, the sweep is incomplete â€” re-run it. Record the sweep completion in the report skill's working log.
4. **Report type** â€” Hiring (interview prep for hiring manager) or Talent (coaching guide for the respondent). Default: Hiring.
5. **Format** â€” Graphical (full HTML with charts) or Text (narrative-only markdown). Default: Graphical.

## Workflow

### Step 1: Pull respondent data

Read the API token automatically from `_pipeline/.env` in the workspace folder â€” look for `PIPELINE_API_TOKEN` and `PIPELINE_URL`. Never ask the user for these; they should always be in the `.env` file.

**DO NOT use the MySQL-direct path (`pipeline.runner.pull_respondent`).** MySQL credentials live on the Render service, not in the local `.env`. Attempting the direct-DB path fails with `ExcStdsConfigError: Missing required env var: MYSQL_HOST`. Use the HTTP endpoint instead â€” the pipeline's Render service encapsulates Power BI auth + MySQL and returns a fully-built xlsx.

**Preferred: use the `scripts/pull_local.py` helper** (it reads `.env`, handles auth, saves xlsx). From the workspace root:
```bash
python _pipeline/scripts/pull_local.py <key3>
# Saves to: $LOCAL_RESPONDENT_ROOT/<key3>/data.xlsx
```

**Manual curl (only when the helper is unavailable):**
```bash
curl -sS -X POST "$PIPELINE_URL/v1/pull-respondent" \
  -H "Authorization: Bearer $PIPELINE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"key3":"<key3>"}' \
  -o respondents/<key3>/data.xlsx
```

The returned xlsx contains tabs: `L1`, `L2`, `Flags`, `Skinny`, `ImpactTop10`, `TeachTop10`, `Non-Scorable`, `Metadata`. The `L2` tab is the canonical source of L2 scores for the Motivators section (Step 5) â€” do NOT build `l2_scores` from the scorecard / Impact subset.

If the pipeline returns an error (non-2xx), print the body (it contains a diagnostic detail about why the lookup missed) and ask the user to provide the workbook manually.

**CRITICAL — "Empty scorecard, lit flags" = Power BI dataset not refreshed. Do NOT raise a data-integrity alarm before checking this first.**

The single most common non-error failure mode of the pull is: the pipeline returns 2xx with a valid-looking xlsx (~10 KB), but the L1 and L2 tabs have every `Z_Algo` / `Z_Human` / `RF_Count` / `Score5_filtered` cell set to `None`, and the `Skinny`, `ImpactTop10`, and `TeachTop10` tabs all read `"(no rows returned for this query)"`. Flags may still be lit because flag logic fires at the question-answer layer, not the aggregation layer. **This is almost always because the Power BI dataset has not been refreshed since the respondent's answers landed in the source system** — not because the respondent is a partial-completion, not because the Key3 is wrong, not because the pipeline is broken.

**The check — run this BEFORE surfacing any "incomplete data" message to the user:**

```python
import openpyxl
wb = openpyxl.load_workbook('<respondent>/data.xlsx', data_only=True)
l1 = wb['L1']
# Skip header row; check if every Z_Algo / Z_Human / RF_Count is None.
all_null = all(
    row[2] is None and row[3] is None and row[4] is None
    for row in l1.iter_rows(min_row=2, values_only=True)
)
skinny_empty = wb['Skinny'].cell(1, 1).value == '(no rows returned for this query)'
if all_null and skinny_empty:
    print("LIKELY CAUSE: Power BI dataset not refreshed — ask user to refresh and retry.")
```

**When this pattern is detected, the correct response is a one-line, no-alarm message to the user:**

> "The pull came back with an empty L1/L2 scorecard and empty Skinny/Impact/Teach tabs — this is almost always because the Power BI dataset hasn't been refreshed since the respondent's answers landed. Can you refresh Power BI and let me know? I'll re-pull."

Then wait. Do NOT draft a "Partial-Data Brief," do NOT ask whether the Key3 is wrong, do NOT speculate about the respondent's completion status. Refresh-and-retry resolves this in >95% of occurrences. Only after a fresh refresh still returns the empty-scorecard pattern should the diagnostic widen to "is the Key3 correct / did the respondent actually complete the instrument."
### Step 2: Compute distribution chart tokens

Read population data from `Histogram Data.xlsx` in the workspace root (sheets: `Zalgo summ` for 1,088 population rows with Key3/SuccessFlag/Z|Algo/Z|Human/RF columns, `Historgram Z` for Z-score bin definitions, `Histogram Flags` for flag-count bin definitions). Note: `_pipeline/population_scores.csv` may be empty â€” always fall back to `Histogram Data.xlsx`. Compute all 13 DIST_* template tokens inline:

- **Chart 1 (All Scores):** Histogram Z|Algo + Z|Human across population. 0.5-unit bins from -4.0 to +4.0, trim empty leading/trailing. Mark individual's bins with triangle (algo) and diamond (human).
- **Chart 2 (Success | Fail):** Same bins but split by SuccessFlag. Omit bins where both cohorts are 0. Last bin label ends with "+". Mark individual's bins.

**CRITICAL NOTE â€” Chart 2 SuccessFlag Handling:**
When reading the SuccessFlag column from `Histogram Data.xlsx` (sheet `Zalgo summ`), openpyxl returns Python booleans `True` and `False`, NOT strings. Python's `bool(False)` is falsy, so a naive pattern like `str(sf) if sf else '` silently converts all FALSE-flagged respondents to empty strings, making the FALSE cohort appear empty. **Always check explicitly:** `if sf is True: ... elif sf is False: ... else: ...`. The final chart data should be hardcoded in pre-collapsed format: 2-row labels already split, empty bins removed, last bin labeled with "+", and no runtime `collapseBins()` call for Chart 2. Typical population: ~37 FALSE, ~12 TRUE, ~1039 None/unrated respondents.

**Chart 2 Hardcoded Format (DO NOT use collapseBins at runtime):**
Pre-compute Chart 2 with hardcoded data in this structural shape (all array values vary by respondent â€” this is the format, not the content):
```javascript
// 2-row labels: inner arrays are [low, high] strings; last high is "+"
const sfLabels2 = [["-2.5","-2.0"],["-2.0","-1.5"], /* ... */, ["3.5","+"]];
// One integer per bin, same length as sfLabels2. Bins where both cohorts are 0 are omitted.
const failData2    = [ /* FALSE cohort counts per bin */ ];
const successData2 = [ /* TRUE cohort counts per bin */ ];
// Respondent's bin indices into the trimmed array (0-based)
const sfAlgoBin  = /* respondent Z|Algo bin index */;
const sfHumanBin = /* respondent Z|Human bin index */;
```

The canonical structural reference for all Chart 2 shape rules is `_templates/hiring_report_TEMPLATE.html` itself â€” do not use any specific filled candidate report as the "example to match."

**CRITICAL NOTE â€” `{{EXCSTDS_COLOR_OVERRIDES}}` lives inside a `//` JS comment in the template:**
The hiring/coaching template has TWO instances of the token `{{EXCSTDS_COLOR_OVERRIDES}}` in the Chart.js setup block: one is the real substitution point on its own line; the other appears inside a single-line `// Substitute {{EXCSTDS_COLOR_OVERRIDES}} with raw JS statements OR leave empty...` comment a few lines above. When the build script's `html.replace("{{EXCSTDS_COLOR_OVERRIDES}}", multi_line_value)` fires, it replaces BOTH â€” and the multi-line value shatters the in-comment copy. Everything after the first newline becomes un-commented JS, producing a `PageError: Unexpected identifier 'raw'` at runtime and breaking every Chart.js instance (including all three distribution charts, the DISC chart, the scorecard, and the talent radar). The PDF still writes but is 445 KB and empty of charts instead of ~1.2 MB with charts. **Fix â€” neutralize the in-comment instance BEFORE the main replacement loop:**
```python
html = html.replace(
    "Substitute {{EXCSTDS_COLOR_OVERRIDES}} with raw JS",
    "Substitute EXCSTDS_COLOR_OVERRIDES with raw JS",
)
for tok, val in replacements.items():
    html = html.replace(tok, val)
```
Include a chart-rendering verification harness in every new build (Puppeteer `pageerror` listener + middle-region `getImageData` pixel sample on each canvas id). If `nonZero: true` for all six charts and no page errors fire, Chart.js is rendering correctly. If you see a 445 KB PDF with no charts, suspect this bug first.

**CRITICAL NOTE â€” Build-script file integrity (truncation + duplicate tails):**
Two pathological patterns have burned this skill and must be checked before every run:
1. **Truncation mid-identifier.** A prior session ended `build_meyrath_hiring.py` at line 463 with a partial line reading `    concern_cou` â€” the tail (`nt = html.count(...)` plus the `print`/`OUT.write_text`/`__main__` block) was lost. Running the script produced `NameError: name 'concern_cou' is not defined` with no other diagnostic. Check `wc -l` and `tail -5` on any build script before running â€” the last three lines should always be `if __name__ == "__main__":` / `    main()` / blank.
2. **Duplicate garbage tails from append-based recovery.** When the truncation above was recovered with bash `cat >> file`, subsequent runs appended the tail again, producing multiple duplicate copies of the pre-save QA + write block (lines 480â€“512 of a 479-line canonical file). Python still ran main() once (via `if __name__ == "__main__"` guard), but re-running the recovery appended another copy each time. Check `wc -l` matches the known-good length after any `cat >>` recovery; trim the file back to the canonical length with a one-shot Python `lines[:N]` rewrite if duplicates appear.
3. **Edit tool vs. disk state mismatch.** When recovering from truncation, the Edit tool can report success on a cached file view while the on-disk file remains truncated. Prefer `cat >>` via bash for append-style recovery, and always verify post-edit state with `wc -l` + `tail -5` via bash before re-running the script.

- **Chart 3 (Flag Counts):** 5-unit bins from 0 to 50. **Orientation: worse on LEFT** (high flag counts on the left, low flag counts on the right — see convention below). Y-axis on right. Triangle marker for individual.

**Flag Count Computation:**
Total RF (Reverse Flag) count is the sum of RF_Count across ALL L1 dimensions in the respondent data, NOT from a separate flags sheet. The Flags sheet in the respondent workbook contains only Z_Algo_Overall and Z_Human_Overall summary scores.

**CRITICAL — Chart orientation convention: WORSE ON THE LEFT.**
Every population-distribution chart in every Excellence Standards deliverable (hiring report AND coaching guide) uses the same orientation rule: **the worse end of the distribution is on the LEFT, the better end is on the RIGHT.** The user has repeated this correction multiple times across multiple respondents; it is now part of the skill contract and must not be re-derived from Power BI or from "natural" numeric order. Concretely:

| Chart | Worse end (LEFT) | Better end (RIGHT) |
|---|---|---|
| Chart 1 (All Scores, Z\|Algo + Z\|Human) | Low Z-scores (−4.0) | High Z-scores (+4.0) |
| Chart 2 (Success \| Fail cohorts) | Low Z-scores (−2.5) | High Z-scores (+3.5 / "+") |
| Chart 3 (Flag Counts) | **High flag counts (45+)** | **Low flag counts (0)** |

Chart 3 is the one that trips people up: more flags = worse outcome, so high flag counts go on the LEFT. The labels array is reversed relative to the source Histogram-Flags bin order. The respondent's bin index must also be reversed (e.g. RF_Num=25 lands in source bin 5 of 10, which reverses to position `(10-1) - 5 = 4` in the rendered array).

**CRITICAL — Chart 3 x-axis label parity gate.**
The x-axis labels for Chart 3 MUST be the flag-count lower bounds of each bin (`'45+','40','35','30','25','20','15','10','5','0'`), NOT column indices (`'0','1',...,'9'`) and NOT the raw Histogram-Flags sheet labels in source order. This has been shipped wrong in the past; the template's default label list is a sequence of integers that reads as valid flag counts but is actually column indices. **Gate (run at build time):**
1. After computing Chart 3, assert `flagLabels3 == ['45+','40','35','30','25','20','15','10','5','0']` or the equivalent reversed-bin-lower-bound list if bin count differs.
2. Assert `flagLabels3[0]` reads as a high flag count (e.g. `'45+'` or `'40'`) and `flagLabels3[-1]` reads as `'0'`. If the list starts with `'0'` or `'0'..'9'` in any order, the orientation or label source is wrong — STOP and re-derive.
3. Assert the marker bin index `jFlagBin3` points at a non-zero count and matches the respondent's RF_Num bin after reversal.

**CRITICAL — Chart 2 empty-cohort-column stripping gate.**
Chart 2 (Success | Fail) must have every bin where BOTH cohorts are 0 removed before the HTML is written — no empty columns in the rendered chart. This has also been shipped wrong repeatedly. **Gate (run at build time):**
1. After computing `failData2` and `successData2`, assert `all((f + s) > 0 for f, s in zip(failData2, successData2))`. Any `(0, 0)` pair means a column was not stripped — STOP and strip it.
2. Assert `len(sfLabels2) == len(failData2) == len(successData2)`.
3. Assert respondent bin indices (`sfAlgoBin`, `sfHumanBin`) still point at valid (non-stripped) bins after stripping; re-index if needed.

**CRITICAL — Edit tool truncation on large HTML files.**
The Edit tool silently truncates the trailing ~15 lines of files larger than ~100KB (observed at ~118KB on `coaching_guide.html`, 3 times in a single session). The canonical failure mode: Chart 3's closing `});` block, the `</script>`, and `</body></html>` disappear after an Edit, producing a blank-chart PDF and a 5-error pageerror log. After EVERY Edit on a coaching-guide or hiring-report HTML file:
1. Run `wc -l` and `tail -5` via bash to verify the file still ends with `</html>`.
2. If truncated, restore the tail with `cat >> file << 'EOF' ... EOF` via bash — NOT another Edit call.
3. Re-render and re-verify the PDF before copying to `_reports`.

Prefer Python rewrite (read-modify-write) over Edit for any structural change to a large HTML file. Edit is safe for <50KB files and for tiny point-replacements in larger files where the surrounding context is short.

### Step 3: Analyze the data

Read all the data tabs. For the analysis, apply these frameworks:

#### Three-Axes Framework (Talent, Judgment, Skills)
Teams are rowing â€” only as fast as the slowest rower. Evaluate in this order:

1. **Talent (capacity to grow):** Check LinkedIn FIRST and pull the **entire profile** per the mandatory full-profile sweep in Step 1, input #3. The Talent axis is NOT just "were there internal promotions" â€” it is the integration of:
   - Internal promotions and sponsor-selections (fellowships, leadership programs)
   - Awards and external recognition (40-Under-40 class, industry press, national features)
   - Board / Treasurer / Chair / Co-Chair / ERG leadership roles (peer-elected fiduciary seats are talent-selector evidence)
   - Two-Sport Athlete evidence (achievement outside the work lane)
   - Background-of-grit signals (pathway into the profession, geography, concurrent work/civic service in early career)
   - TTI Intellectual DF, openness indicators, Investing in Others
   - Slow-to-move / hard-to-learn signals (talent-axis constraints)

   When external-validator density is high (multiple independent award judges + sustained board leadership) but instrument readings like Investing in Others are low, that **tension is the read** â€” do not dismiss either. Frame the community record as evidence that "selectors keep picking this person" and keep the instrument concern alive at the *direct-report* altitude. Probe accordingly.

   - **LinkedIn Data:** The LinkedIn URL is collected up front in Quick Start (input #3) â€” fetch it at the start of analysis, not mid-report. **The sweep must be complete â€” Experience, Honors & Awards, Education, Volunteer, Skills, Certifications, About, Recommendations, Activity.** If the URL was not provided, explicitly note in the Talent-axis narrative that the read is constrained to instrument data and fall back to the respondent's Non-Scorable tab (questions 9911-9938) for self-reported career history (role titles, revenue figures, tenure). Use the Non-Scorable tab for the Career Timeline section regardless of whether LinkedIn is available.

2. **Judgment (everyday decisions):** Primary read from ExcStds L1 #8 Organizational Decision Making. Key sub-dimensions: Clarity of Accountability (8.2), Facts Over Feelings (8.7). A candidate with weak judgment contributes poor decisions into every room they enter.

3. **Skills (ability to do the job):** The instrument does not measure domain skill directly. Acknowledge this. Remind the hiring manager that strong skills do not compensate for weak talent or weak judgment.

#### Hard-to-Learn Gate Check (do this BEFORE other analysis)
Scan for these four signals â€” if any are severely present, they drive the recommendation:

1. **Low Deliberate Urgency** (L1 #9) â€” corroborated by low D in TTI DISC. Sub-dims: Action Over Inaction (9.6), Extreme Proactivity (9.2), Fire in Belly (9.1).
2. **Low Organizational Decision Making** (L1 #8) â€” corroborated by Instinctive DF near zero.
3. **Conditional Belief in Others (Severe)** â€” Flag10.UnconditBelief = "Condit Belief Sev". Corroborated by Upgrade Team flag, TTI Altruistic DF in Indifferent cluster.
4. **Satisfied with Gripes** â€” Flag.1.SatVsGripes lit. Corroborated by high-S + conflict-avoidance language in TTI. **Read the flag as a ratio** â€” see the CRITICAL block on Satisfied with Gripes below for the full framing.

Frame as "hard to learn inside a typical coaching timeframe" â€” never "coaching-resistant" or "doesn't coach up."

**CRITICAL â€” Coaching voice = effectiveness, not good/bad:**
The entire coaching guide is written in the language of *effectiveness*, not moral judgment. Never label a flag or a score as "serious," "bad," "a concern," or "a weakness." The respondent is not broken; they have a current position on an effectiveness axis, and the guide is the lever to move further along it.

**Preferred phrasing (admired/successful frame â€” use this by default):**
*"Admired and successful leaders install this routine; unsuccessful and unadmired leaders do not. It is effective; the opposite is not."* This is the canonical cohort-contrast voice across Signature Pattern, Impact items, Teach items, and closing note. Favor the admired-successful / unadmired-unsuccessful pairing over earlier "value-creator cohort / value-destroyer cohort" phrasing â€” the admired-leader frame is crisper, more concrete, and on-brand. The older value-creator/value-destroyer construction can still appear once or twice in longer narrative passages for variety, but the admired/successful pair is the default.

**Off-brand words to avoid:**
- *"Ceiling"* â€” in any usage ("D pinned to the ceiling," "raises the ceiling of who believes," "CEO-scale ceiling signal," etc.). Replace with: *"top of the scale"* for DISC maxima, *"widens the circle of"* for who-believes language, *"separator"* or *"constraint signal"* for scale-transition framing.
- *"Weakness," "deficit," "coaching-resistant," "doesn't coach up"* â€” per the effectiveness-frame rule above.
- *"Concern"* (standalone) â€” use *"targeted concern"* only in hiring reports' Targeted Concerns sections; otherwise prefer *"frontier"* or *"lever."*

**Off-brand framings to avoid (too strong, overclaim the scope of the guide):**
- *"This guide is not the counter-argument to that record â€” it is the owner's-manual to the next decade"* (or any variant of "counter-argument to your record / owner's-manual / next decade" framing). This overclaims. The guide is not a stake-in-the-ground on the next decade of the respondent's career; it is a practice tool. Replace with: *"This guide is simply how to get even better â€” because especially the best get better, and you are one of the best."* The canonical Hale Global coaching frame is the tagline itself: **"Especially the best get better."** The Signature Pattern closing sentence and the Closing Note opening frame should both land on that phrasing, not on owner's-manual / counter-argument language.
- *"The next decade" / "the next chapter" / "the next altitude"* as standalone stake-in-the-ground phrases â€” avoid. These project certainty about outcomes the instrument cannot predict and they tip the voice into pronouncement. The guide is about routines, not about career trajectory forecasting.
- *"The single highest-leverage thing is not in the instrument â€” it is in the room"* (or any *"not in X, it is in Y"* rhetorical construction that contrasts the instrument against something else). Self-defeating because the insight **is** being surfaced in the guide, so the claim that "it's not in the instrument" doesn't land. Replace with a direct statement: *"The single highest-leverage thing to work on happens in the room â€” specifically, the room when you are not in it."* Lead with the insight; don't frame it as a negation of the assessment.

**Vocabulary â€” *guide* vs *instrument*:** Use these terms precisely. The **instrument** is the Excellence Standards assessment itself (the questions, the L1/L2 scores, the flag basket math, the TTI wiring panel) â€” the thing that produced the data. The **guide** is the coaching document in the respondent's hands â€” the narrative artifact, the cards, the charts, the routines. Never refer to the coaching guide as "the instrument." Conversely, "this instrument is flagging" / "the instrument is pointing at" is correct and encouraged when describing what the assessment data is showing. The coaching guide is always "this guide" or "the guide."

**Vocabulary â€” *coach up* is ambiguous, avoid it.** The phrase "coach up" (as in *"what this means for how you coach up"* or *"how to coach them up"*) reads as "coaching someone higher up the chain of command" or "coaching someone to a higher level" â€” the reader has to stop and decide which. Replace with unambiguous language: *"where to focus your deliberate practice,"* *"the routines that move this furthest,"* *"the levers to work on,"* or domain-specific phrasing. The Driving Forces Implications block and any other introductory "what this means forâ€¦" paragraph should open with a clear frame, not "coach up."

**CRITICAL â€” Signature Pattern structural rule:**
The Signature Pattern is **one headline**. It captures the primary effectiveness lever for this respondent in a single unified frame. When serious flags or concerns are lit that do not fit the primary pattern cleanly, **do not invent a new pattern** and do not force a unified theory. Instead, surface the flag inside the Signature Pattern section as a clearly-seamed second block â€” labeled honestly as *"one second flag that does not derive from the primary pattern and deserves to be named on its own"* â€” and treat it as an independent effectiveness lever. Better messy and precise than polished and glib. Causal over-connection between flags (e.g., "Facilitative Mindset weakness causes HoldsAvgDownChain") is a repeated error; do not force it. Use seam-language like *"this does not derive from the primary pattern"* to make the structure honest.

**CRITICAL â€” Q33 ("trade bottom 10%") and HoldsAvgDownChain:**
Q33 is one of six questions in the `HoldsAvgDownChain` basket (Q117, Q102, Q37, Q136, Q4, Q33). The flag measures whether the standard the leader holds at the exec table is the same standard enforced one, two, and three levels down â€” the depth-of-excellence axis. When the flag is lit (especially at `HoldsAvgDownChain | Med` or higher), it is the headline of its own coaching card â€” not a sub-point of anything else. Cite Q33 as one of the six supporting items; do not make the card about the Q33 answer alone.

**The theoretical anchor is crew, not basketball.** Basketball is about trading for better talent at the top of the roster â€” a "replace the bottom 10%" frame. Business is more like crew: the boat moves at the pace of the slowest rower, and the value-creator cohort continuously upgrades at depth rather than tolerating average seats two and three levels down. The coaching routine is the one that comes out of that frame: pick the roles two levels down where, if hiring today, you would not hire the current incumbent â€” name them, and set a date by which the seat clears the bar or is in transition. HoldsAvgDownChain goes quiet when the leader stops finding seats they would not hire for today.

**Do NOT** (a) label this flag as "serious" vs. "not serious," (b) claim it is "as important as" or "more important than" another frontier, or (c) force a causal link to Facilitative Mindset. It stands on its own; effectiveness rises when it is addressed. Q13 is a partial bridge (room-level quickness of ideas can reflect bench quality at depth) but is not a tight coupling. Keep the seams honest.

**CRITICAL â€” Question answer-scale literalism (Q123 and similar):**
Every question in the instrument has an `AnswerRange` in the Impact/Teach Top10 tabs. Always read it before labeling the respondent's answer in narrative. Many questions use `1-TRUE <> 5-FALSE` (so answer=5 means FALSE / disagree with the stem), others use `1=smart <> 5=work hard` or similar custom scales. NEVER default to "not-like-me / like-me" phrasing unless the AnswerRange actually uses those words. The correct formula in coaching narrative: *"You answered 'N' ([scale-endpoint label per AnswerRange])"* â€” e.g. "You answered '5' (FALSE)" or "You answered '1' (smart over hard-working)". This has been a repeated error source when the question stem is phrased in the negative (Q123 especially â€” "I don't make an irreversible decision until I have to" â€” answer=5/FALSE means the respondent DOES decide early).

**CRITICAL â€” Team quality as root cause:**
When a leader's Team Answers grades are weak (B's, C's, F's rather than A's), this is often the root cause of multiple other issues. The causal chain: team quality â†’ stays hands-on â†’ can't disappear â†’ can't conduct â†’ can't facilitate. A leader who doesn't truly admire their team will not step back, will not delegate decision-making, and will not create the conditions for genuine dialogue. Always check Team Answers and connect weak grades to the Replacing Self, Conducting, and Facilitative Mindset dimensions. The foundational coaching recommendation: get to all A's on the team first â€” everything else becomes easier from that foundation.

**CRITICAL â€” Self-report literalism:**
The instrument is self-report. Do not editorialize self-reported answers into conclusions the data doesn't support. If a respondent's answers assess team loyalty favorably (e.g., Q50), say "whose answers assess team loyalty favorably" â€” do NOT claim the leader "builds loyalty" or "keeps people engaged" as established fact. This is especially important when other flags (e.g., Conditional Belief) create tension with the self-report. Stay literal to what the questions measure.

#### Wiring-Fit Check
Compare TTI wiring against ExcStds scores for any hard-to-learn dimension:
- ExcStds passes but TTI contradicts â†’ "Diligence Item" (watch in first 6 months)
- ExcStds confirms TTI concern â†’ "Targeted Concern" (must probe in interview)
- Standards are UNIVERSAL â€” never frame role-fit as making ExcStds concerns less relevant. Low urgency in an IC is still mediocre IC-level leadership.

**CRITICAL â€” High-I and Facilitative Mindset:**
High-I does NOT correlate with facilitative behavior. High-I leaders tend to talk, persuade, and charm rather than listen and conduct. When ExcStds Facilitative Mindset is low AND TTI I is high, these are **consistent concerns** â€” the wiring and the instrument agree. Do NOT frame this as "surprising" or "contradictory." The high-I is part of why facilitation is weak: the leader fills the room with influence and suppresses genuine dissent.

**CRITICAL â€” Conditional Belief Flag (all severity levels):**
Always pay attention to the Conditional Belief flag, even at "Mixed" level (not just "Severe"). Conditional belief in others directly constrains two things: (1) followership depth â€” people follow leaders who believe in them unconditionally, and (2) the leader's ability to replace themselves â€” you don't fully develop replacements you don't fully believe in. Q36 ("Some people haven't proven themselves enough to deserve my goodwill and encouragement") answered at C (middle) is never great. Connect Conditional Belief to Replacing Self, Investing in Others, and Intentional-over-Altruistic DF pattern in the narrative. The coaching framing: the leader needs to make small tweaks toward more proactive, unconditional belief â€” extending goodwill *before* people prove themselves, not after.

**CRITICAL â€” Initiating Accountability Flag (push-vs-initiate thesis):**

Pushing Accountability and Initiating Accountability are **mirror images** of the same meta-skill, and the distinction is what makes the Initiating Accountability flag unusually diagnostic. Treat this as the canonical framing whenever the flag lights (at any severity) in either a hiring report or a coaching guide.

**The two lanes:**
- *Pushing Accountability* is the **sheriff lane** â€” enforcing standards after the fact, holding people to what was committed, driving consequences. Measured primarily by L1 #4 (Pushing Extreme Accountability) and L2 Drives Accountability.
- *Initiating Accountability* is the **conductor lane** â€” creating the conditions in which the team brings accountability *up to the leader* before it has to be enforced *down from the leader*. Measured by the 7-L2 cross-L1 basket: 2.1 Dialogue vs. Direction Â· 2.2 Power & Status Management Â· 2.4 Sublimating Ego Â· 3.1 Conductor > Lead Guitarist Â· 3.2 Empower Team Authority Â· 4.3 Urgency Down Chain of Command Â· 8.6 Inaction Over Action.

A great leader needs both lanes. Most strong operators have the sheriff lane; the conductor lane is scarcer and is the one that compounds at scale.

**Why the flag is unusually reliable:**
It is built cross-L1 â€” deliberately sampling four different L1s (Facilitative Mindset Â· Replacing Self Â· Pushing Extreme Accountability Â· Org Decision Making). That construction is the point. A leader can rationalize weakness in any single dimension, but when three or four quadrants of the same meta-skill cluster, no single-lane escape hatch works. The meta-skill itself is what is actually missing. The flag reads cleanly as a **CEO-scale separator** â€” enforcement-alone tops out around nine-figure revenue, and initiating is the behavior that unlocks the next layer of scale.

**Structural initiating vs. in-the-room initiating:**
When analyzing the seven L2s, split them into two groups and report on each separately â€” this is where the sharpest coaching read comes from.
- *Structural initiating* (does the architecture allow accountability to flow up?): Conductor > Lead Guitarist (3.1), Empower Team Authority (3.2), Urgency Down Chain (4.3), Inaction Over Action (8.6).
- *In-the-room initiating* (does what actually happens in meetings allow it?): Dialogue vs. Direction (2.1), Power & Status (2.2), Sublimating Ego (2.4).

A common and diagnostic pattern at senior-exec altitude: **structural initiating passes, in-the-room initiating fails.** The architecture is in place (authority delegated, urgency travels, team runs without daily direction), but in the moments that matter â€” when people are in the room with the leader â€” the best thinking does not make it onto the table before the leader's conclusion does. When this pattern shows up, collapse the flag's coaching frontier to the Facilitative Mindset cluster and treat the dialogue routines (answer questions with questions, third-party praise, explicit invitations for dissent) as the fuel line.

**Framing rules for the narrative:**
- Lead the card/section with the **thesis** (sheriff lane vs conductor lane), not with basket mechanics, DAX, or severity math.
- Do NOT expose DAX scoring rules (â‰¤2 = severe, â‰¤3 = hi, â‰¤4 = lit) or severity-suffix calculations to the reader. Those are internal mechanics of the flag; they don't belong in hiring or coaching narrative.
- Do name the seven behaviors in human-readable form (the L2 names) so the reader sees the texture â€” but without the scoring rubric.
- Always show *which* of the seven L2s passed and which failed for this specific respondent, grouped by structural vs. in-the-room. That split is the diagnostic.
- Never frame the flag as "accountability is weak." When Pushing Accountability is strong (high Z or top-decile), say so explicitly â€” the flag is not about accountability being weak, it is about the *initiating-through-dialogue* direction being the gap.
- In hiring reports, the flag belongs in the Targeted Concerns section when it is lit at Hi or Sev, and should be one of the two interview-probe targets. Use Form 8 Facilitative Mindset question â€” "What's something you really believe in? When is it okay to make exceptions?" â€” plus a second probe on dialogue patterns in staff meetings.

**CRITICAL â€” Satisfied with Gripes Flag (ratio flag, easy-to-please/hard-to-satisfy anchor):**

Satisfied with Gripes is a **ratio flag**, not a single-behavior flag. It evaluates two self-reports side by side: how satisfied the leader assesses they are with the team, and how many gripes the leader assesses they have about the team. The flag trips when the ratio is **out of whack** â€” specifically when the leader reports *both* some level of satisfaction *and* a working list of gripes at the same time. That combination is the pathology; it is also the most common self-report pattern across the population, which is why the flag is a reliable separator.

**The admired-leader anchor â€” this is the canonical coaching frame for this flag in both coaching guides and hiring reports:**

> The admired leader is **easy to please but hard to satisfy**.

Unpack it in three parts when the flag is lit:

1. **Easy to please.** The value-creator leader is quick to notice good work and quick to say so. Pleasing is about the moment-to-moment behavior of recognizing excellence as it happens â€” low bar for celebration, high frequency of specific praise.
2. **Hard to satisfy.** The admired leader is never fully *satisfied* with the team, because the team should always be developing further than it is today. Satisfaction is the word that closes the development loop. An admired leader who says "I'm satisfied with this team" is telling you they have stopped developing the team. That is the behavior the flag is catching.
3. **No standing gripes.** A gripe is a standard the leader has noticed is being missed but has not yet converted into a decision. Admired leaders move gripes to decisions the week they surface â€” a conversation, a role clarification, a transition plan. They therefore carry *no* standing gripes, because any gripe would have been closed the moment it became one. Griping is the residue of tolerance.

**The bad-leader pattern (which is also the most common pattern):** the leader simultaneously reports being satisfied with their team *and* reports a working list of gripes about the team. This is the flag's target. Most leaders land here; the value-destroyer cohort lives here. Satisfaction plus griping = development has stopped AND standards are drifting by tolerance.

**Corroboration signals:** high-S in TTI (conflict-avoidance), low Deliberate Urgency, HoldsAvgDownChain also lit (shared root: tolerating what has already been noticed as not good enough), Team Answer grades below A (a leader who does not truly admire the team will settle into satisfaction-plus-gripes rather than keep developing).

**Framing rules for the narrative:**
- Lead with the ratio definition â€” the flag is NOT "the leader complains too much" or "the leader is too easygoing." It is the out-of-whack pair.
- Always state the admired-leader anchor phrase explicitly â€” *easy to please, hard to satisfy* â€” as a sentence the respondent or hiring manager will remember.
- Always name the bad-leader pattern (satisfied + gripes) so the reader can see the specific answer shape the flag is catching.
- In coaching guides, the routine has two rules: (1) no standing gripes â€” the week one surfaces, move it to a decision; (2) stay hard to satisfy â€” after a strong quarter, ask what the team could do a year from now that it cannot do today, and start the development routine that gets there.
- In hiring reports, probe with Form 8 Talent Development: "What people over your career have you nurtured who have gone on to do great things?" â€” and listen specifically for whether the leader names current-team development loops that are open, or whether the answer is retrospective and satisfied.
- When the flag is Low severity and primary frontiers are elsewhere, frame it as a watch-item that shares a root with whatever else is lit (HoldsAvgDownChain especially) â€” do not inflate it into its own frontier, but do not dismiss it either.

#### Key Principles
- "When you have doubt, there's no doubt" â€” if unclear, it's a NO.
- Blanco Principle â€” better to have no one in seat than someone with a major deficit.
- Even one mediocre player damages the team.
- Skills are over-emphasized; talent and judgment are under-estimated by most hiring managers.

### Step 4: Generate the narrative

#### For Hiring Reports (Variant 2)
Structure:
1. **Recommendation badge** â€” clear hire/no-hire/conditional with reasoning
2. **Three-axes cards** â€” Talent, Judgment, Skills with badge (green/amber/yellow/red/gray) and 2-3 sentence assessment each
3. **Two Targeted Concerns** â€” the top 2 issues the hiring manager must resolve, with specific interview guidance
4. **Headline Metrics** â€” Z|Algo overall, Reverse Flags, Flags Lit, Teach Items, Hard-to-Learn count
5. **Population Distribution charts** â€” the 3 automated charts
6. **DISC Profile** â€” Natural vs Adapted with significant-shift annotation
7. **Wiring-Fit Check strip** â€” pass/flag per hard-to-learn dimension
8. **Motivators & Anti-Motivators** â€” **REQUIRED, NON-NEGOTIABLE.** Generated by `_pipeline/src/pipeline/motivators_section.py â†’ build_section(respondent)`. Fills the `{{MOTIVATORS_ANTIMOTIVATORS_SECTION}}` token in the hiring-report template. Contains: primary-wedge / anti-wedge callouts (motivator and drain narratives), alignment block (L2s bucketed as motivator-strong / motivator-weak / anti-strong / anti-weak), DISC Standard Map SVG, and the DISC wiring panel. **This section has been repeatedly missed in past runs because the placeholder gets stripped without being populated. Do not strip the placeholder silently. If the pipeline data is incomplete, pass `partial_data=True` in the respondent dict and render what is available with the partial-data note â€” never omit the section.** Build-time verification required (see Step 5).
9. **ExcStds Dimensional Scorecard** â€” all L1s + relevant L2s
10. **Talent Radar** â€” 7 Bible attributes scored 1-5
11. **Career Timeline** â€” visual blocks from LinkedIn (every role, every concurrent role, every date)
12. **Awards & External Recognition** â€” every honor from the LinkedIn Honors & Awards section, with year, issuer, and the career seat at time of award. Include only if the respondent has at least one documented award; if none, omit the section rather than leaving it empty.

#### For Coaching Guides (Variant 1) â€” What-to-Work-On structural rules

The What-to-Work-On section is the heart of the coaching guide. Two structural rules are mandatory for every coaching guide going forward:

**Rule 1 â€” Flag-Driven subsection comes FIRST, before per-answer Impact items.**

The section is organized in two subsections, in this order:

1. **Flag-Driven Items** â€” one card per lit flag (multi-L2, pattern-level effectiveness levers). Each card carries:
   - Flag name (e.g., *HoldsAvgDownChain | Med*, *Initiating Accountability*, *Satisfied with Gripes | Low*) with severity suffix if applicable
   - A one-line qref under the title (NOT a DAX formula â€” a human-readable ratio or pattern descriptor)
   - A thesis-first narrative body (see the CRITICAL flag-framing blocks above for canonical framings per flag)
   - A routine line at the bottom â€” one concrete, repeatable practice the leader can install
2. **Per-answer Impact items** â€” nine single-L2 coaching cards, each tied to one Impact-ranked question. Introduced by the parallel subtitle: *"Nine standards where deliberate practice will produce the largest lift."*

The order matters because flags are cross-L1, pattern-level levers â€” they move multiple dimensions at once when addressed. Per-answer Impact items are finer-grained practices that compound *after* the flag-level work. Reversing the order buries the larger levers under the smaller ones.

In the build script, this is implemented by composing the `{{IMPACT_ITEMS_HTML}}` token as:
```
<practice-subsection-hdr Flag-Driven Items>
+ FLAG_DRIVEN_HTML
+ <22px spacer>
+ <practice-subtitle "Nine standards...">
+ _impact_colored
```

**Rule 1b â€” The Wiringâ†”Standards panel bold headers are colored by motivator alignment.**

The Wiringâ†”Standards panel (the six-to-seven paragraph block summarizing L1 dimensions with their DISC/DF wiring interpretations, rendered via the `{{WIRING_FIT_ITEMS}}` token) should have its opening `<strong>` headers color-coded to tie the narrative into the Motivators color grammar:

- **Motivator-aligned strong** (the dimension where the wiring is carrying the standard) â†’ blue `#2563eb` â€” the same blue used for "Routines running naturally" in the alignment grid and for top-decile L2 chips.
- **Anti-aligned weak / practice frontier** (the dimension where deliberate practice is the lever) â†’ deepened tan `#b8862e` â€” darker-AA-contrast variant of the alignment grid's `#d4a84b` "Routines to install" tan, chosen so colored header text stays legible against a white background.
- **Installed against the grain** (anti-aligned strong â€” wiring says one thing, behavior says another in a good way) â†’ green `#22c55e`.
- **Motivator-aligned weak** (rare â€” the dimension where the wiring SHOULD carry the standard but isn't) â†’ red `#c0392b`.

Implementation: inline `style="color:#<hex>;"` on the opening `<strong>` element of each paragraph in `WIRING_FIT_ITEMS`. The coloring should apply ONLY to the opening dimension-name-plus-score-plus-summary line; body prose stays in the default text color for readability.

Why this rule exists: the Motivators wheel, the alignment grid, and the Teach/Impact L2 tags already carry a consistent color language (motivator = blue, anti-motivator/frontier = tan, against-the-grain = green, motivator-weak = red). Carrying that language into the Wiringâ†”Standards prose makes the whole report flow cohesively â€” the reader can trace each dimension from the wheel through the alignment grid into the Wiringâ†”Standards narrative without re-keying to a different color grammar.

**Rule 2 â€” Every Teach/Impact L2 tag color-matches the Motivators wheel wedge.**

Each coaching card carries a small L2 tag in the top-right showing the driving L2 (e.g., *8.1 Simplification Methods*). The tag fill color, text color, and border color must all match the wedge color used for that L2 in the respondent's Motivators wheel. This gives every card a DISC/Motivators trace that reads at a glance â€” warm wedges (Power/Status/Influence family) show warm tags, cool wedges (Organizational family) show cool tags, light wedges show light tags, etc.

Implementation (already wired into `build_meyrath_coaching.py` and should be carried into every future coaching-guide build script):

1. Build the motivators fragment first via `motivators_section.build_section(respondent)`.
2. Extract the per-L2 color map from the fragment with a helper `extract_l2_color_map(svg_fragment)` that regex-parses `<rect fill="...">` immediately followed by `<text fill="...">X.Y Name</text>` pairs, returning `{l2_num: (fill, text_fill)}`.
3. Rewrite every `<div class="practice-l2-tag" title="...">X.Y Name</div>` with inline `style="background: <fill>; color: <text_fill>; border-color: <fill>;"` via `colorize_l2_tags(html_with_cards, color_map)`.
4. In the template CSS, ensure `.practice-l2-tag::before { color: inherit; opacity: 0.7; }` so the leading bullet-circle inherits the tag's text color (contrasting cleanly against any fill).
5. If any L2 in Teach/Impact cards is absent from the wheel (gray-pill L2), the helper leaves the default styling in place and logs a warning.

QA check at build time: the build script should print coverage (`All Teach/Impact L2 tags matched to wheel colors` vs. `WARN: L2s without wheel color`).

**Rule 3 â€” Coaching guides and hiring reports treat numbers differently. This is a brand rule, not a style preference.**

The two variants serve different readers, and the rhetorical job of the numbers is different in each. Follow the treatment rules below strictly.

*Hiring reports (Variant 2) â€” numbers-as-evidence discipline.* The hiring manager is making a yes/no call with asymmetric downside; their job is easier when the report shows its work. Cite individual L2 scores (e.g. *Sublimating Ego &minus;2.71*), Z|Algo, Z|Human, severity levels, DISC scores (D=94, I=75, etc.), and Driving Forces cluster positions **inline in the narrative prose** wherever they materially support the read. Flag cards in hiring reports should show the full basket composition. Scorecards are a reference table, not the primary evidence channel.

*Coaching guides (Variant 1) â€” insight-first, numbers recede.* The candidate is the reader. Their job is to internalize a pattern they can practice against, not to re-audit the algorithm. Lead with lived-experience language ("the room when you are not in it," "easy to please, hard to satisfy," "crew, not basketball"), and let the quantitative detail live in the dedicated chart surfaces:

1. **Headline Metrics strip** (Z|Algo, Reverse Flags, Flags Lit, etc.) â€” OK to cite in the Signature Pattern as credibility anchors.
2. **ExcStds Dimensional Scorecard** (chart) â€” the L1/L2 bar chart is where L2 numbers live. In prose, reference L2s by *name* (Sublimating Ego, Dialogue vs. Direction, Conductor > Lead Guitarist), not by signed score.
3. **DISC/Motivators chart block** â€” where DISC scores live. In prose, reference wiring by adjective (Commanding-primary, high-D, Altruistic Indifferent), not by number.
4. **Flag cards** â€” name the flag, describe the pattern in plain English, say which behaviors in the basket pass and which fail by *behavior name*. Do not enumerate per-behavior +/- scores inline.

The narrative anchor numbers that are always OK in a coaching guide: Z|Algo overall (credibility marker), career-outcome numbers from the respondent's own history (revenue growth, EBITDA lift), top-line DISC primary/adapted shift if behaviorally relevant. Everything else recedes to chart surfaces.

*Why this rule exists.* When a coaching guide reads like a hiring report with the name swapped, two failure modes appear. (1) The respondent gets stuck auditing the methodology ("what does &minus;2.71 actually mean?") instead of working on the behavior. (2) The numbers feel like a verdict rather than an owner's manual; the voice tips from *effectiveness* back to *good/bad*. The fix is not fewer insights &mdash; it is the same insights, delivered in plain English, with the quantitative backbone available in the charts for anyone who wants it.

*Implementation note.* When converting a hiring-report card into a coaching-guide card, do a `grep` for numeric patterns: `[+&minus;-]\d+\.\d+`, `Q\d+`, `top decile`, `top \d+%`, `L2 \d+\.\d+`. Each hit should be replaced with behavior-name language or deleted, unless it falls into the always-OK list above.

---

### Brand lockup â€” MANDATORY, applies to EVERY deliverable (hiring report AND coaching guide, HTML AND PDF)

The company brand lockup is **`HALE GLOBAL SUCCESS DIAGNOSTICS`** â€” never the shorthand `HALE GLOBAL` alone. This has been a recurring error. The correct string must appear in all four locations of every deliverable:

1. **HTML top banner** (the `.hale-logo` div near the top of the rendered report). Correct: `HALE GLOBAL SUCCESS DIAGNOSTICS â€” HIRING REPORT` or `HALE GLOBAL SUCCESS DIAGNOSTICS â€” COACHING GUIDE`.
2. **HTML footer line** at the bottom of the document. Correct: `HALE GLOBAL SUCCESS DIAGNOSTICS â€” Confidential Executive Assessment | <date>` or `HALE GLOBAL SUCCESS DIAGNOSTICS â€” Integrated Coaching Guide | Confidential | <date>`.
3. **PDF header template** in `make_pdf*.js`. Correct: `Hale Global Success Diagnostics Â· Excellence Standards <Report Type> Â· <Candidate>`.
4. **HTML `<title>` tag**. Correct: `<Candidate> â€” <Report Type> | HALE GLOBAL SUCCESS DIAGNOSTICS`.

**Pre-Save QA check (add to every build script):** `assert html.count("HALE GLOBAL SUCCESS DIAGNOSTICS") >= 2, "Brand lockup missing â€” replace any bare 'HALE GLOBAL' or 'Hale Global'"`. Also grep the PDF builder JS for the correct string before rendering. The bare "HALE GLOBAL" / "Hale Global" form is always wrong except inside the proper lockup.

When a template is found with the wrong shorthand, fix the template too â€” don't just patch the one build. The correction must propagate to `_templates/hiring_report_TEMPLATE.html`, `_templates/coaching_guide_TEMPLATE.html`, and any `make_pdf*.js` that lives in the pipeline.

---

### Print / PDF CSS strategy â€” "keep-with-next", not container-atomicity

Historical failure mode: early versions of `make_pdf_*.js` set `page-break-inside: avoid` on every large container (`.section`, `.practice-section`, `.wiring-panel`, `.alignment-grid`, `.callouts-pair`, `.ma-section`, large `svg`, etc.). When any of those containers didn't fit in the remaining space of the current page, it was forced intact onto the next page â€” leaving 400â€“585px of trailing whitespace on the previous page. On the Meyrath v3d build this produced a 9-page PDF in which pages 4, 6, and 9 were 60â€“85% empty.

**The correct strategy is paragraph-level keep-together plus keep-with-next on headers â€” NOT container-level atomicity.** Apply this as boilerplate in every `make_pdf_*.js` for every coaching guide and hiring report:

```css
/* Paragraph-level: never leave a single line orphaned at top/bottom of a page */
p, li {
  orphans: 3 !important;
  widows: 3 !important;
  break-inside: avoid !important;
  page-break-inside: avoid !important;
}

/* Small atomic units â€” individual cards, pills, rows. These stay intact. */
.callout, .bucket, .probe-card, .award-card, .board-role-card,
.axis-card, .concern-card, .metric-card,
.l2-row, .timeline-block, .timeline-row, .practice-fuel,
.dimension-row, .flag-chip, .scorecard-row {
  break-inside: avoid !important;
  page-break-inside: avoid !important;
}

/* CRITICAL OVERRIDE: the generated HTML itself has @media print rules
   setting page-break-inside: avoid on .section, .practice-section, .fingerprint,
   .metrics, .header. You MUST explicitly override each of those, or a single
   small top element (e.g. a scorecard) will force ~400px of trailing
   whitespace because the next practice-section is forced intact onto the
   following page. */
.section, .practice-section, .fingerprint, .metrics, .header,
.wiring-panel, .alignment-grid, .callouts-pair, .dist-chart,
.ma-section, .career-timeline, .timeline-group {
  break-inside: auto !important;
  page-break-inside: auto !important;
}

/* SVGs: only icon-sized ones stay intact. Large chart SVGs (motivators wheel,
   DISC map, dimensional scorecard) should be allowed to break. */
svg { break-inside: auto !important; page-break-inside: auto !important; }
svg.icon, .flag-icon svg, .metric-card svg {
  break-inside: avoid !important; page-break-inside: avoid !important;
}

/* Keep-with-next: headers stay with the content that follows them.
   This is the prima