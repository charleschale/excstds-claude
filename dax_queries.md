# DAX Queries — Coaching Guide Data Pull

The canonical query set for producing a coaching guide for a single respondent. Run all of these against the Excellence Standards Power BI dataset (workspace `5c32a84f-0b3d-406c-9097-4930093e3005`, dataset `6b189299-794b-4a70-8bc9-8c2d269871ca`), substituting the respondent's Key3 in the placeholder `<KEY3>`.

These queries were validated end-to-end on Isaiah Harvey (`20260413.isaiah.harvey@yale.edu`) and Bill George (`20251103.bill@bpgeorge.com`).

## Recommended workflow

1. Export two CSVs from Power BI UI (the "Specific Routines" visuals — see below for filename convention).
2. Run Queries A, B, C, D in DAX Studio. Save each to a tab in a single `.xlsx` workbook.
3. Save everything to `Exc Stds/<respondent_key>/`. The TTI PDF goes there too.

---

## CSV exports from Power BI UI

These two visuals already join QuestionText, Answer, RightNum, Commentary, and TopQ for the top ~10 questions in each list. **Always prefer these over a DAX equivalent** — the Power BI visual is shape-correct and pulling paragraph-length text columns through DAX is error-prone (see "common pitfalls" below).

Filter both visuals to `Lkup_Key[Key3] = "<KEY3>"` before export.

- `Specific Routines - Areas for Teaching.csv` — top ~10 by Teach.Rank|Q
- `Specific Routines - Areas for Impact.csv` — top ~10 by Impact.Rank|Q

Both visuals share columns: `L1_Title, Teach.Rank|Q (or Impact.Rank|Q), QuestionText, AnswerRange, Answer|, RightNum, Commentary, TopQ`. Note that **TargetBehavior is not in these visuals** — pull it separately for the union of teach + impact questions via the Question Detail query below.

---

## Query A — Category (L1) rollup

Returns 9 rows, one per L1 category. Save as the **L1** tab.

```dax
EVALUATE
CALCULATETABLE(
  SUMMARIZECOLUMNS(
    'dim_L1L2'[L1_Num],
    'dim_L1L2'[L1_Title],
    "Z_Algo",         [Z|Algo],
    "Z_Human",        [Z|Human],
    "RF_Count",       [RF#],
    "Question_Count", COUNTROWS('Questions')
  ),
  'Lkup_Key'[Key3] = "<KEY3>",
  'Questions'[IsActive] = 1,
  'Questions'[IsScored] = 1
)
ORDER BY 'dim_L1L2'[L1_Num]
```

Z|Human is pulled here for internal diagnostic purposes only — never expose it in the respondent-facing guide. See METHODOLOGY.md "Z|Human firewall" note.

---

## Query B — Sub-dimension (L2) rollup

Returns ~30 rows, one per active L2 sub-dimension. Save as the **L2** tab.

```dax
EVALUATE
CALCULATETABLE(
  SUMMARIZECOLUMNS(
    'dim_L1L2'[L1_Num],
    'dim_L1L2'[L1_Title],
    'dim_L1L2'[L2_Num],
    'dim_L1L2'[L2_Short],
    "Score5_filtered", [Score5_filtered],
    "Question_Count",  COUNTROWS('Questions')
  ),
  'Lkup_Key'[Key3] = "<KEY3>",
  'Questions'[IsActive] = 1,
  'Questions'[IsScored] = 1
)
ORDER BY 'dim_L1L2'[L1_Num], 'dim_L1L2'[L2_Num]
```

---

## Query C — Headline + all 16 flags

Returns 1 row. Save as the **Flags** tab.

The flag measure names are inconsistent across the model — many have prefixes like `Flag.10.`, `FlagPos1.`, `Score5Flag.8.`, `Score5Flag6.`. Two flags use the misspelling `Attcblty` rather than `Acctblty` (Clarity and Driving). The version below is the validated set as of 2026-04.

`Questions Answered` is not a measure in the model — derive it via `COUNTROWS('Answers')` inside the same Key3 filter.

```dax
EVALUATE
CALCULATETABLE(
  ROW(
    "Z_Algo_Overall",         [Z|Algo],
    "Z_Human_Overall",        [Z|Human],
    "RF_Num",                 [RF#],
    "Questions_Answered",     COUNTROWS('Answers'),

    "Flag_DreamTeam",         [Flag9.DreamTeam],
    "Flag_UnconditBelief",    [Flag10.UnconditBelief],
    "Flag_HoldsAvgDown",      [Flag.10.HoldsAvgDown],
    "Flag_Eyes",              [Flag.11.Eyes],
    "Flag_ExecsCantDoJob",    [Flag.12 Execs Cant Do Job],
    "Flag_UncommonInit",      [FlagPos1.UncommonInitiative],
    "Flag_ResistsMediocrity", [FlagPos2.ResistsMediocrity],
    "Flag_ExecutionDriven",   [FlagPos3.ExecutionDriven],
    "Flag_SatVsGripes",       [Flag.1.SatVsGripes],
    "Flag_SatAvg",            [Flag.2.Sat.Avg],
    "Flag_UnsatCsDs",         [Flag.3.UnsatCsDs],
    "Flag_StdsVsSelf",        [Flag.4.StdsVsSelf],
    "Flag_InitiatingAcctblty",[Score5Flag.8.InitiatingAccountability],
    "Flag_PlsVsSat",          [Score5Flag5.PlsVsSat],
    "Flag_ClarityAcctblty",   [Score5Flag6.ClarityAttcblty],
    "Flag_DrivingAcctblty",   [Score5Flag6.DrivingAttcblty]
  ),
  'Lkup_Key'[Key3] = "<KEY3>"
)
```

If a measure ever returns "cannot be determined," the model has been edited and the measure has been renamed. Re-extract the model's measure list with this small query and update Query C accordingly:

```dax
EVALUATE
SELECTCOLUMNS(
  FILTER(INFO.MEASURES(), SEARCH("flag", [Name], 1, 0) > 0),
  "Measure", [Name]
)
```

---

## Query D — Skinny per-question detail

Returns ~90 rows (one per question Bill answered). Save as the **skinny** tab.

The Answers table has Key3 directly as a column, so we filter from Answers and use RELATED to pull Question and dim_L1L2 attributes. **Do not use SUMMARIZECOLUMNS with dim_L1L2 columns** — it produces a cartesian (every question × every L1L2 combination, ~3000 rows).

```dax
EVALUATE
VAR _Key = "<KEY3>"
RETURN
CALCULATETABLE(
  SELECTCOLUMNS(
    FILTER('Answers', 'Answers'[Key3] = _Key),
    "QuestionNmbr",  'Answers'[QuestionNmbr],
    "Answer",        'Answers'[Answer],
    "L1_Num",        RELATED('Questions'[L1_Num]),
    "L1_Title",      LOOKUPVALUE('dim_L1L2'[L1_Title], 'dim_L1L2'[L2_Num], RELATED('Questions'[L2_Num])),
    "L2_Short",      LOOKUPVALUE('dim_L1L2'[L2_Short], 'dim_L1L2'[L2_Num], RELATED('Questions'[L2_Num])),
    "IOU",           RELATED('Questions'[IOU]),
    "_Polarity",     RELATED('Questions'[_Polarity]),
    "RightNum",      RELATED('Questions'[RightNum]),
    "IsActive",      RELATED('Questions'[IsActive]),
    "IsScored",      RELATED('Questions'[IsScored]),
    "Impact_Rank",   [Impact.Rank|Q],
    "Teach_Rank",    [Teach.Rank|Q],
    "Z_Delta",       [Z|Delta A-H|@Q]
  )
)
ORDER BY [Z_Delta] ASC
```

Filter `IsActive=1 AND IsScored=1` downstream in pandas/Excel rather than in the DAX — keeps the query simple and preserves the full record for debugging.

---

## Question Detail query — for the union of top teach + impact questions

After exporting the two CSVs, identify the union set of QuestionNmbrs across them (typically ~15–20 unique questions). Run this query with that list to pull the full coaching content for each.

```dax
EVALUATE
FILTER(
  SELECTCOLUMNS('Questions',
    "Q",              'Questions'[QuestionNmbr],
    "QuestionText",   'Questions'[QuestionText],
    "IdealAnswer",    'Questions'[IdealAnswer],
    "Commentary",     'Questions'[Commentary],
    "TargetBehavior", 'Questions'[TargetBehavior]
  ),
  [Q] IN { 2,9,15,25,31,33,34,50,63,68,75,81,84,95,100,102,115,120,123,131,132,134,135,137,138,140,384,385,602 }
)
```

Replace the IN-list with the actual union set for the respondent. The query above contains all questions that appeared in either Isaiah's or Bill's top-10 lists — useful as a master superset for the first few builds.

---

## Common pitfalls and lessons learned

1. **The cartesian.** `SUMMARIZECOLUMNS` over `'Questions'` with `'dim_L1L2'` columns will produce one row per question per L1L2 combination unless the relationship is being used. Use `RELATED` or `LOOKUPVALUE` to pull dim attributes through the relationship instead.

2. **Measure name drift.** The flag measures have inconsistent prefixes and at least one misspelling baked in (`Attcblty`). When pulling Query C against a new model version, validate measure names with the `INFO.MEASURES()` lookup above before assuming the old names work.

3. **No `Questions Answered` measure.** Derive via `COUNTROWS('Answers')` inside the Key3 filter context.

4. **Long-text columns.** Pulling `QuestionText`, `Commentary`, or `TargetBehavior` through DAX in bulk works, but the result file is large and easy to mishandle in chat. Always export to disk and read from there. Never paste long-text DAX results inline.

5. **Z|Human is internal-only.** Pull it for diagnostics (reverse-polarity inspection), but never expose it in respondent-facing reports. The coaching signal is always Z|Algo.

6. **The Answer column on the Questions table doesn't exist.** Bill's question — and Isaiah's — comes from the `Answers` table, joined to Questions on QuestionNmbr (with Key3 as a row-level filter on Answers). Earlier drafts of Query D used `CALCULATE(SELECTEDVALUE('Answers'[Answer]))` inside SELECTCOLUMNS over Questions, which technically worked but was less reliable than filtering Answers directly.

---

## Workspace and dataset reference

- Tenant: `3be3af3c-46a1-461d-93b1-44954da5e032`
- Workspace (group ID): `5c32a84f-0b3d-406c-9097-4930093e3005`
- Dataset ID: `6b189299-794b-4a70-8bc9-8c2d269871ca`
- Embed-only Service Principal (also handles `executeQueries`): `PowerBIEmbedApp` (`191260ff-ab3f-4d75-a211-780754200954`)
- SP role on workspace: Member or Admin (confirmed adequate for `executeQueries`)
- Tenant settings confirmed: "Dataset Execute Queries REST API" enabled org-wide; "Service principals can use Fabric APIs" enabled org-wide

The same SP token used for embed-token requests (`https://analysis.windows.net/powerbi/api/.default` scope) is sufficient for `executeQueries` against the dataset above. No new auth flow needed.

---

## Version history

- v0.1 — 2026-04-14 — Isaiah Harvey build. Original Queries A, B, D (with cartesian fix) validated. Question Detail query first used.
- v0.2 — 2026-04-14 — Bill George build. Query C corrected with verified flag measure names. Query D simplified to filter from Answers directly. `Questions Answered` derivation added. Validated against vpax extraction of `ADMIN PRODUCTION FILE RLS.vpax`.
