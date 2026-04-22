# Backup Manifest — Excellence Standards "Brains"

**Snapshot date:** 2026-04-21
**Snapshot file:** `brains_snapshot_2026-04-22.zip` (2.1 MB, 72 files)

This manifest inventories the files that, taken together, constitute the working intelligence of the Excellence Standards pipeline — the methodology, the code that pulls and builds data, the templates that render deliverables, the population reference set, and the canonical prior deliverables used as style anchors. If this zip survives, the system can be reconstituted.

Files are grouped in five layers by criticality. Sizes as of the snapshot date.

## Layer 1 — Methodology and decision rules (irreplaceable)

These files encode human judgment accumulated over months of trial-and-error coaching work. They cannot be regenerated from the code.

- `METHODOLOGY.md` (36 KB) — Three-Axes Framework, Assassin Profile / IAAM pattern, leadership-scoreboard and pilot frames, Rules of thumb (including 5a — Signature Pattern as conceptualization), voice rules, QA gates.
- `PROJECT_NOTES.md` (16 KB) — Working notes including the Conducting Implementor pattern cross-reference, respondent case threads, open questions.
- `dax_queries.md` (12 KB) — Documentation of the seven DAX queries the pipeline runs against Power BI.
- `HANDOFF_2026-04-17_wedge_validation.md` (6 KB) — L2 wedge-validation handoff notes.
- `BUILD_REPORT_HECHLER.txt` (10 KB) — Reference build log from the canonical Hechler hiring report run.
- `_skills/report/SKILL.md` — The report-skill playbook that orchestrates every deliverable. Heavily annotated with lessons learned (Chart 3 orientation, Chart 2 empty-cohort stripping, Edit-tool truncation recovery, Power BI refresh triage).
- `_skills/report_SKILL_patch_powerbi_refresh.md` — Patch file capturing the Power BI dataset-refresh failure mode and the one-line user response.
- `_skills/sync_skills.ps1` — PowerShell script that syncs the workspace skills folder back to the plugin folder.

## Layer 2 — Pipeline (the production code)

The `_pipeline/` folder is its own git repository (not included in this zip — recommend pushing to a private GitHub remote for a proper backup with version history). This snapshot captures the working-tree state.

Sub-layers:

- **Render service code** — `_pipeline/src/pipeline/` (runner.py, excstds_api.py, powerbi.py, excel_output.py, motivators_section.py) and `_pipeline/src/server/app.py`. This is what runs on Render and returns the respondent xlsx from an HTTP POST.
- **Local build scripts** — `_pipeline/scripts/`:
  - `pull_local.py` — the canonical way to pull a respondent xlsx from the Render service.
  - `build_cohen_coaching.py`, `build_hechler_hiring.py`, `build_motivators.py`, `build_spike_v4.py`, `build_test_hiring_report.py` — the per-respondent and per-template builders.
  - `make_pdf_cohen.js`, `make_pdf_hechler.js`, `make_pdf_hechler_v2.js`, `make_pdf_hechler_v3.js`, `make_pdf_hechler.py` — Puppeteer renderers that produce the final PDFs from built HTML.
  - `bootstrap_user_auth.py`, `run_local.py`, `archive_spike.py` — supporting scripts.
- **DAX queries** — `_pipeline/dax/` (L1.dax, L2.dax, flags.dax, impact_top10.dax, teach_top10.dax, skinny.dax, questions_full.dax).
- **Operational docs** — `_pipeline/QA_CHECKLIST.md`, `_pipeline/FORM_8_CRITICAL.md`, `_pipeline/README.md`, `_pipeline/HANDOFF_2026-04-15.md`, `_pipeline/bootstrap-remote.md`.
- **Config** — `_pipeline/render.yaml`, `_pipeline/requirements.txt`, `_pipeline/.env.example`, `_pipeline/.python-version`, `_pipeline/.gitignore`.
- **Chart renderer** — `_pipeline/render_distribution.py`.
- **Population export script** — `_pipeline/export_population_data.ps1` (PowerShell script that hits Power BI and builds `Histogram Data.xlsx`).

**NOT in the zip (by design):**
- `_pipeline/.env` — contains `PIPELINE_API_TOKEN` and `PIPELINE_URL`. Back up to a password manager or encrypted vault, never bundle with code.
- `_pipeline/.git/` — the git repo metadata. Back up by pushing to a remote.
- `_pipeline/.venv/`, `_pipeline/data/`, `__pycache__/`, `*.pyc` — regeneratable.

## Layer 3 — Templates

- `_templates/coaching_guide_TEMPLATE.html` (39 KB) — the 11×17 Tabloid HTML template for coaching guides.
- `_templates/coaching_guide_TEMPLATE.md` (7 KB) — markdown skeleton.
- `_templates/hiring_report_TEMPLATE.html` (45 KB) — hiring report HTML template. The canonical structural reference for Chart 2 shape rules per SKILL.md.
- `_templates/hiring_report_TEMPLATE.md` (2 KB) — markdown skeleton.

## Layer 4 — Population reference data

- `Histogram Data.xlsx` (132 KB) — the 1,088-respondent population set used to compute every distribution chart in every deliverable. Sheets: `Zalgo summ`, `Historgram Z`, `Histogram Flags`. This file is the denominator for all "where does this candidate fall" comparisons.
- `l2_wedge_map.xlsx` (25 KB) — L2 wedge mapping used in the wedge-validation work.

## Layer 5 — Canonical reference deliverables (style anchors)

These are the prior reports whose structure and voice anchor future work. Losing them wouldn't break the pipeline, but it would make style drift more likely.

- `_reports/Meyrath_Hugues_coaching_guide_v3d.html` + `.pdf` — the coaching-guide canonical reference.
- `_reports/Hechler_Howard_hiring_report.html` + `.pdf` — the hiring-report canonical reference.
- `_reports/Cohen_Matthew_coaching_guide.html` + `.pdf` — latest coaching guide (IAAM / pilot / leadership-scoreboard frames).
- `_reports/Cohen_Matthew_coaching_guide_DRAFT.md` — the markdown draft mirroring the HTML output.

## Explicitly excluded (and why)

- `node_modules/` — Node dependencies, re-installable from the pipeline's package manifest.
- `_pipeline/.venv/` — Python virtualenv, re-creatable from `_pipeline/requirements.txt`.
- All `__pycache__/` directories and `*.pyc` files.
- `_pipeline/.env` — secrets; requires separate, secure backup.
- `_pipeline/.git/` — git metadata; backed up via `git push` to remote.
- `_pipeline/.adomd/` — ADOMD.NET runtime; reinstallable.
- `_pipeline/data/` — per-run artifacts, regeneratable.
- `_respondents/<key3>/data.xlsx` — per-respondent pulls, re-pullable from the Render pipeline at any time.

## Recommended backup rhythm

1. **Methodology files (Layer 1):** push `METHODOLOGY.md`, `PROJECT_NOTES.md`, and `_skills/report/` to a private GitHub repo. Commit on every substantive change. OneDrive file-history is a weak substitute for proper diffs.
2. **Pipeline (Layer 2):** push `_pipeline/` to its own private GitHub repo using the existing `.git`. The `.env` stays out via `.gitignore`.
3. **Templates, population data, canonical reports (Layers 3–5):** snapshot with this zip monthly, or whenever a template or canonical reference is updated. Copy the zip to OneDrive, an external drive, or cloud storage outside the working folder.
4. **.env secrets:** store in a password manager (1Password, Bitwarden) or encrypted vault. Never commit to git, never bundle with code.

## Reconstituting from this zip

To bootstrap a fresh machine from this snapshot alone:

1. Unzip into the target workspace folder.
2. Recreate `_pipeline/.env` from `_pipeline/.env.example` and your stored secrets.
3. Install Python deps: `cd _pipeline && python -m venv .venv && . .venv/bin/activate && pip install -r requirements.txt`.
4. Install Node deps for the PDF renderers: `npm install puppeteer` in the workspace root and run the puppeteer Chrome install if needed.
5. Re-pull any respondent data on demand via `_pipeline/scripts/pull_local.py <key3>`.

The methodology files, skill playbook, templates, and canonical deliverables are immediately usable with no further setup.
