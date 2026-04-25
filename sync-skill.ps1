<#
.SYNOPSIS
    Sync a workspace skill to the Claude Desktop plugin directory AND back up to git.
.DESCRIPTION
    Two steps:
      1) LOCAL SYNC — copy _skills\<name>\ -> every installed Claude Desktop
         skill plugin folder, so the next Claude session picks up your edits.
         Restart Claude Desktop after running.
      2) GIT BACKUP — stage just _skills\<name>\, commit, and push to the brains
         repo on GitHub. Other working changes elsewhere in the repo are NOT
         swept in (intentional — keeps this commit focused).

    Step 2 is on by default. Pass -NoBackup to skip it (e.g., if you're offline
    or have a half-finished commit you don't want to push yet).

    Usage:
      Right-click this file -> "Run with PowerShell"   (full sync + backup of 'report')
      .\sync-skill.ps1                                  (same)
      .\sync-skill.ps1 -Skill xlsx                      (different skill)
      .\sync-skill.ps1 -NoBackup                        (sync only, skip git)
      .\sync-skill.ps1 -Message "Add Step 0 orient pass" (custom commit message)

    First-time setup (if "running scripts is disabled"):
      Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
    (one-time; answer Yes to the prompt)
#>

param(
    [string]$Skill = "report",
    [switch]$NoBackup,
    [string]$Message = ""
)

$ErrorActionPreference = "Stop"

$workspaceSkill = Join-Path $PSScriptRoot "_skills\$Skill"
$pluginBase = Join-Path $env:APPDATA "Claude\local-agent-mode-sessions\skills-plugin"

Write-Host ""
Write-Host "=== Sync skill: $Skill ===" -ForegroundColor Cyan
Write-Host "Workspace source: $workspaceSkill"
Write-Host ""

if (-not (Test-Path $workspaceSkill)) {
    Write-Host "ERROR: No workspace folder for skill '$Skill' at:" -ForegroundColor Red
    Write-Host "       $workspaceSkill" -ForegroundColor Red
    Write-Host ""
    Read-Host "Press Enter to close"
    exit 1
}

if (-not (Test-Path $pluginBase)) {
    Write-Host "ERROR: Claude Desktop plugin folder not found at:" -ForegroundColor Red
    Write-Host "       $pluginBase" -ForegroundColor Red
    Write-Host "Is Claude Desktop installed and has it been opened at least once?"
    Write-Host ""
    Read-Host "Press Enter to close"
    exit 1
}

# Find every installed copy of this skill under the plugin tree.
# (There may be more than one if Claude Desktop has been reinstalled.)
$pluginCopies = Get-ChildItem -Path $pluginBase -Recurse -Directory -Filter $Skill -ErrorAction SilentlyContinue |
                Where-Object { $_.Parent.Name -eq "skills" }

if ($pluginCopies.Count -eq 0) {
    Write-Host "ERROR: No plugin copy of '$Skill' found under:" -ForegroundColor Red
    Write-Host "       $pluginBase" -ForegroundColor Red
    Write-Host "Has this skill ever been installed into Claude Desktop?"
    Write-Host ""
    Read-Host "Press Enter to close"
    exit 1
}

Write-Host "Found $($pluginCopies.Count) plugin location(s) to sync to:"
foreach ($dst in $pluginCopies) {
    Write-Host "  -> $($dst.FullName)"
}
Write-Host ""

foreach ($dst in $pluginCopies) {
    Copy-Item -Path "$workspaceSkill\*" -Destination $dst.FullName -Recurse -Force
    Write-Host "SYNCED: $($dst.FullName)" -ForegroundColor Green
}

Write-Host ""
Write-Host "Local sync complete. Restart Claude Desktop to pick up the changes." -ForegroundColor Yellow
Write-Host ""

# --------------------------------------------------------------------------
# Git backup -- stage just _skills\<Skill>, commit, push.
# Disabled with -NoBackup. Other unrelated working changes are intentionally
# left alone (we only stage the skill folder, not the whole repo).
# --------------------------------------------------------------------------
if ($NoBackup) {
    Write-Host "Skipping git backup (-NoBackup passed)." -ForegroundColor DarkGray
} else {
    Write-Host "=== Git backup ===" -ForegroundColor Cyan

    # Native git commands return non-zero exit codes for normal signaling
    # (e.g. `git diff --quiet` returns 1 when there ARE differences). Don't
    # let $ErrorActionPreference="Stop" treat that as a script-fatal error.
    $prevErrorPref = $ErrorActionPreference
    $ErrorActionPreference = "Continue"

    Push-Location $PSScriptRoot
    try {
        # Verify we're in a git repo.
        & git rev-parse --is-inside-work-tree *> $null
        if ($LASTEXITCODE -ne 0) {
            Write-Host "WARN: $PSScriptRoot is not a git repo -- skipping backup." -ForegroundColor Yellow
        } else {
            $skillRel = "_skills/$Skill"

            # Stage only the skill folder. Other working changes are untouched.
            & git add -- $skillRel
            if ($LASTEXITCODE -ne 0) {
                Write-Host "ERROR: 'git add $skillRel' failed." -ForegroundColor Red
            } else {
                # Anything actually staged?
                & git diff --cached --quiet -- $skillRel
                $hasStaged = ($LASTEXITCODE -ne 0)

                if (-not $hasStaged) {
                    Write-Host "No changes in $skillRel to commit." -ForegroundColor DarkGray
                } else {
                    $commitMsg = if ($Message) { $Message } else { "Sync skill: $Skill" }

                    & git commit -m $commitMsg -- $skillRel
                    if ($LASTEXITCODE -ne 0) {
                        Write-Host "ERROR: git commit failed. Commit was NOT made." -ForegroundColor Red
                    } else {
                        Write-Host "COMMITTED: $commitMsg" -ForegroundColor Green

                        & git push
                        if ($LASTEXITCODE -eq 0) {
                            Write-Host "PUSHED to remote." -ForegroundColor Green
                        } else {
                            Write-Host "WARN: git push failed. Commit is local --" -ForegroundColor Yellow
                            Write-Host "      run 'git push' manually when you're back online / authenticated." -ForegroundColor Yellow
                        }
                    }
                }
            }
        }
    } finally {
        Pop-Location
        $ErrorActionPreference = $prevErrorPref
    }
}

Write-Host ""
Write-Host "===" -ForegroundColor Cyan
Write-Host "Done." -ForegroundColor Cyan
Write-Host ""

# Keep the window open so you can read the output before it closes.
if ($Host.Name -eq "ConsoleHost") {
    Read-Host "Press Enter to close"
}
