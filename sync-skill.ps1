<#
.SYNOPSIS
    Sync a workspace skill to the Claude Desktop plugin directory.
.DESCRIPTION
    Copies a skill folder from _skills\<name>\ in this workspace to the live
    Claude Desktop plugin location, so the next Claude session picks up your
    latest edits. Restart Claude Desktop after running this.

    Usage:
      Right-click this file → "Run with PowerShell"  (syncs the 'report' skill)
      OR in a PowerShell prompt: .\sync-skill.ps1
      OR for a different skill:  .\sync-skill.ps1 -Skill other-skill-name

    If you get a "running scripts is disabled" error, open PowerShell and run:
      Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
    (one-time setup; answer Yes to the prompt)
#>

param(
    [string]$Skill = "report"
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
Write-Host "===" -ForegroundColor Cyan
Write-Host "Done. NEXT: Close and reopen Claude Desktop to pick up the changes." -ForegroundColor Yellow
Write-Host ""

# Keep the window open so you can read the output before it closes.
if ($Host.Name -eq "ConsoleHost") {
    Read-Host "Press Enter to close"
}
