### Proposed patch to `skills/report/SKILL.md` — "Power BI refresh" diagnostic

The skills folder is mounted read-only in Cowork, so this patch needs to be applied to the plugin source directly.

**Location in the file:** Step 1 ("Pull respondent data"), immediately after the existing line:

> If the pipeline returns an error (non-2xx), print the body (it contains a diagnostic detail about why the lookup missed) and ask the user to provide the workbook manually.

...and immediately before the `### Step 2: Compute distribution chart tokens` heading.

**Insert this block:**

---

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
