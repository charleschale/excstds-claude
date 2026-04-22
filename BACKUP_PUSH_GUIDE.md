# Backup Push Guide — One-time setup for the GitHub backup

This walks you through the two `git push` operations that complete the backup. Run these from your **Windows terminal** (PowerShell or Git Bash) on your own machine — git operations work cleanly there. Run from inside Linux/sandbox does not, because OneDrive's file locking interferes with git internals.

You'll end up with two private repos:

1. **`charleschale/hale-excstds-pipeline`** — already exists, just needs the new files committed and pushed.
2. **`charleschale/excstds-claude`** — the new "brains" repo (methodology, skill, templates, population data).

---

## Step 1 — Pre-flight: confirm the empty repo exists on GitHub

Go to https://github.com/charleschale/excstds-claude in a browser. If it doesn't exist yet, create it now:

- New repository → name: `excstds-claude` → **Private** → do NOT initialize with README/license/.gitignore (we already have one locally).

---

## Step 2 — Push the pipeline updates

This commits all the new build scripts, ops docs, and renderers that are sitting untracked in `_pipeline/`.

```powershell
cd "C:\Users\charl\OneDrive - Planck LLC d b a Patch Media\ClaudeCode\Exc Stds\_pipeline"

# Clean up any stale lock files left by the sandbox
if (Test-Path .git\index.lock) { Remove-Item .git\index.lock }
Get-ChildItem .git\objects -Recurse -Filter "tmp_obj_*" | Remove-Item -Force

# Stage everything respected by .gitignore (which already excludes .env, .venv, __pycache__, .adomd, data, *.xlsx)
git add -A

# Verify what's about to be committed — make SURE .env is NOT in this list
git status

# Commit
git commit -m "Add build scripts, ops docs, render_distribution, DAX questions"

# Push
git push
```

Expected result: ~20 new files committed, `git push` succeeds.

---

## Step 3 — Initialize and push the brains repo

```powershell
cd "C:\Users\charl\OneDrive - Planck LLC d b a Patch Media\ClaudeCode\Exc Stds"

# Initialize a fresh repo at workspace root
git init -b main

# .gitignore is already in place — verify
type .gitignore | Select-Object -First 5

# Stage everything not excluded
git add -A

# Verify what's about to be committed — should see roughly:
#   METHODOLOGY.md, PROJECT_NOTES.md, dax_queries.md, HANDOFF_2026-04-17_wedge_validation.md,
#   BUILD_REPORT_HECHLER.txt, BACKUP_MANIFEST.md, BACKUP_PUSH_GUIDE.md, .gitignore,
#   Histogram Data.xlsx, l2_wedge_map.xlsx,
#   _templates/* (4 files), _skills/* (the report skill folder + helpers)
# Should NOT see: _reports/, _respondents/, _pipeline/, brains_snapshot_*.zip, _session_notes/, etc.
git status

# Commit
git commit -m "Initial commit — Excellence Standards brains backup

Methodology, report skill, templates, population reference data, and
DAX query documentation. Excludes _pipeline (own repo), _reports
(client confidentiality), _respondents (regeneratable), and snapshots."

# Wire to the GitHub remote
git remote add origin https://github.com/charleschale/excstds-claude.git

# Push
git push -u origin main
```

Expected result: initial commit pushed to `charleschale/excstds-claude`.

---

## Step 4 — Tell OneDrive to leave `.git` alone (recommended)

OneDrive can corrupt git pack files if it syncs them mid-write. Once per repo, exclude `.git` from sync:

In File Explorer, right-click each `.git` folder (the one in workspace root, and the one in `_pipeline/`) → **OneDrive** → **Free up space** OR add `.git` to OneDrive's exclusion list under Settings → Sync and backup → Manage backup.

This keeps the git internals on your local disk only and avoids future "index.lock" errors.

---

## Ongoing rhythm

For routine backups going forward, from either repo's folder on Windows:

```powershell
git add -A
git commit -m "Update <whatever>"
git push
```

That's it. The methodology, skill, and pipeline now have proper version-controlled backups with full diff history.

---

## What about secrets and client reports?

- **`_pipeline/.env`** (PIPELINE_API_TOKEN, PIPELINE_URL) — back up to a password manager (1Password, Bitwarden, Apple Keychain). Never commit.
- **Client reports** (`_reports/Cohen_*`, `_reports/Meyrath_*`, `_reports/Hechler_*`, etc.) — stay local, backed up via OneDrive sync and the `brains_snapshot_*.zip` in the workspace folder. If you want off-site backup of these, copy the snapshot zip to an external drive or non-Microsoft cloud monthly.

---

## Troubleshooting

**`git push` says "Authentication failed":** Your GitHub credentials need refreshing. If using HTTPS, run `git config --global credential.helper manager` (Windows Git Credential Manager) and try again — it'll prompt you to log in via browser. Or switch to SSH: change the remote URL to `git@github.com:charleschale/excstds-claude.git` and use an SSH key.

**`git push` rejected because remote contains work:** The repo on GitHub has a stray commit (probably from accidentally initializing with a README). Run `git pull --rebase origin main` then `git push`.

**`git status` shows files you didn't expect:** Edit `.gitignore`, add the path, run `git rm --cached <path>` to untrack it, then `git add .gitignore` and re-commit.
