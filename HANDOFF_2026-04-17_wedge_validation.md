# Wedge-Map Validation & Mark Nelson Rebuild — Handoff

**Date:** 2026-04-17
**Scope:** Empirically validate the speculative L2→DISC wedge motivator/anti-motivator mapping in `l2_wedge_map.xlsx` against raw TTI + L2 data (N=426), apply data-driven reassignments, and regenerate Mark Nelson's hiring report using the updated mapping.

---

## 1. Deliverables

| File | Path | Status |
|---|---|---|
| Validated wedge map | `l2_wedge_map.xlsx` | Updated — banner, Validation_Apr2026 sheet, 3 reassignments applied, Legend updated |
| Mark Nelson hiring report | `_reports/Nelson_Mark_hiring_report.html` | Regenerated with updated mapping + polarity-aware text colors |
| Pre-revision backup | `_reports/_archive/Nelson_Mark_hiring_report_pre_wedge_rev.html` | ⚠ Overwritten on second rebuild pass — now matches current, not the true pre-revision version. Recover from OneDrive version history if needed. |

---

## 2. Validation methodology

- **Source data:** `TTI vs L2.xlsx` (raw TTI wheel + L2 Z|Algo scores), matched on date+email → N=426 respondents.
- **Wheel position convention:** WP1 = Adapted, WP2 = Natural (corrected mid-analysis).
- **Wedge derivation:** top-1 DISC axis above 50 with top-2 also >50 → pair-map; else primary only. (See `wedge_from_disc` in the audit artifact.)
- **Metric:** per-L2 per-wedge **mean Z|Algo** (proper referee). Earlier per-position enrichment was unstable at small n.
- **Verdict counts:** 19 HIT · 2 weak · 7 MISS · 4 INSUFFICIENT DATA (Supporter n=4) · 1 UNMAPPED.

Detailed per-L2 verdicts + top-3 mean-Z wedges per L2 are in the **Validation_Apr2026** sheet of `l2_wedge_map.xlsx`.

---

## 3. Reassignments applied (3)

| L2 | Was | Now | Why |
|---|---|---|---|
| 1.6 Developmental Discipline | Implementor / Coordinator | **Conductor / Analyzer** | Empirical top-3 by mean Z (N=426): Cond / Anlz / Relr |
| 2.1 Dialogue Vs. Direction | Supporter / Relater | **Persuader / Conductor** | Empirical top-3: Pers / Cond / Prom. Mapping was inverted — persuaders, not supporters, score this highest. |
| 4.3 Urgency Down Chain Of Command | Conductor / Implementor | **Analyzer / Coordinator** | Empirical top-3: Anlz / Coord / Relr. Urgency culture correlates with analyzers, not conductors. |

29 L2s received clarifying notes in the mapping's `Notes` column (18 confirmed, 11 flagged for q-bank review but not reassigned pending more data).

---

## 4. Mark Nelson — changes visible in rebuilt report

**Mark's wiring (from raw TTI):**
- DISC Natural: D=32, I=42, S=68, C=81
- Wheel: Natural pos 21 (Analyzing Coordinator) → **Coordinator** motivator wedge; **Persuader** anti-motivator wedge
- Adapted pos 22 (Coordinating Analyzer) — minimal shift, wiring expressed untempered

**Tile shifts on the Standard Map wheel (vs. pre-revision):**
| L2 | Z | Before | After |
|---|---|---|---|
| 2.1 Dialogue Vs. Direction | +0.54 | Routines running naturally (blue) | **Installed against the grain (bright green)** |
| 4.3 Urgency Down Chain | −0.39 | Anti-neutral (pale green) | **Motivator-neutral (pale blue)** |
| 1.6 Developmental Discipline | −0.05 | Cross (gray) | **Anti-neutral (pale green)** |

**Additional fix applied (prompted by Charles):** the wheel's tile text colors now route through `_z_text_color(z)` on non-dark-fill pills, so gray/gold/pale tiles communicate polarity at a glance (e.g., 6.1 Extreme Ownership Z=−0.58 → red text; 1.4 Demonstrating Genuine Fanness Z=+0.88 → green text).

---

## 5. Known issues / follow-ups

1. **Pipeline source sync mismatch.** `_pipeline/src/pipeline/motivators_section.py` reads truncated via the Linux mount (ends mid-f-string around line 602) while the Read tool sees the full Windows file. I worked around it by patching the archived v8 copy at `_reports/_archive/motivators_section_v8_20260417_1734.py` and using that as the importable module. **Action:** re-sync the Windows source before the next regeneration, and confirm it carries:
   - The **banner-detection fix**: `if 'L2_Short' not in hdrs:` (so `PARTIALLY VALIDATED` banners don't break the loader)
   - The **text-color route**: after `fill, textcol = BUCKET_FILL[bucket]` add `if bucket not in _DARK_FILL_BUCKETS: textcol = _z_text_color(z)`
   If the Windows file already has both, no action needed.

2. **Pre-revision backup clobbered.** The `_archive/Nelson_Mark_hiring_report_pre_wedge_rev.html` was overwritten during the second rebuild pass (the text-color fix regeneration) and now matches the current report. The true pre-wedge-revision version needs to be recovered from OneDrive version history if a diff is required.

3. **11 flagged-but-not-reassigned L2s.** See the `Notes` column in `L2_Wedge_Mapping` for the flagged items. Two judgment calls for the next pass: do we push empirical reassignments on L2s where |top-3 mean-Z| is modest, or hold and broaden the question bank first?

4. **Supporter wedge has n=4 in the sample** — 4 L2s tagged INSUFFICIENT DATA. More Supporter-profile respondents needed before we can validate any of those mappings.

5. **Small DISC-value discrepancy:** Mark's prior hiring report showed D=32 I=38 S=62 C=84 for DISC bars. The authoritative raw TTI row has D=32 I=42 S=68 C=81. The rebuilt report now uses the raw values. If the report pipeline's upstream data join was dropping/altering DISC, that's worth tracing.

---

## 6. Scripts used (kept for reruns)

Both live in the session scratch outputs directory (not persisted after session ends):
- `rebuild_nelson.py` — respondent→build_section→splice pipeline for Mark's report
- `pipeline_fixed/motivators_section.py` — patched v8 archive copy with the banner-detection and text-color fixes

If the Windows source gets re-synced cleanly, the one-shot regeneration becomes: import `pipeline.motivators_section.build_section`, pass the respondent dict, splice into template — no patching needed.
