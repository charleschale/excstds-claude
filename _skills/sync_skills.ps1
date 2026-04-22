# sync_skills.ps1 — publish edited skills from Exc Stds\_skills\ to the Claude plugin directory.
# Run from any shell:  powershell -ExecutionPolicy Bypass -File ".\_skills\sync_skills.ps1"
#
# Direction: Exc Stds\_skills\  -->  %APPDATA%\Claude\local-agent-mode-sessions\skills-plugin\...\skills\
# Use `-Pull` to go the other way (plugin --> Exc Stds) for authoring edits.

param(
    [switch]$Pull,          # reverse direction: plugin --> Exc Stds
    [switch]$DryRun,        # show what would copy, don't actually copy
    [string]$Skill          # optional single-skill name; default = all
)

$ErrorActionPreference = 'Stop'

# --- resolve paths --------------------------------------------------------
$Source = Join-Path $PSScriptRoot ''        # Exc Stds\_skills\  (this script's folder)
$PluginRoot = Join-Path $env:APPDATA 'Claude\local-agent-mode-sessions\skills-plugin'

if (-not (Test-Path $PluginRoot)) {
    Write-Error "Plugin root not found: $PluginRoot"
    exit 1
}

# Find the skills dir inside the plugin tree. It lives at:
# skills-plugin\<guid>\<guid>\skills\
$PluginSkills = Get-ChildItem -Path $PluginRoot -Filter 'skills' -Recurse -Directory -ErrorAction SilentlyContinue |
                Where-Object { $_.FullName -match 'skills-plugin[\\/][^\\/]+[\\/][^\\/]+[\\/]skills$' } |
                Select-Object -First 1

if (-not $PluginSkills) {
    Write-Error "Could not locate plugin skills directory under $PluginRoot"
    exit 1
}

Write-Host "Source:  $Source"       -ForegroundColor Cyan
Write-Host "Plugin:  $($PluginSkills.FullName)" -ForegroundColor Cyan

if ($Pull) {
    $From = $PluginSkills.FullName
    $To   = $Source
    Write-Host "Direction: plugin --> Exc Stds (Pull)" -ForegroundColor Yellow
} else {
    $From = $Source
    $To   = $PluginSkills.FullName
    Write-Host "Direction: Exc Stds --> plugin (Push)" -ForegroundColor Yellow
}

# --- build the list of skill folders to sync ------------------------------
if ($Skill) {
    $SkillDirs = @(Join-Path $From $Skill)
    if (-not (Test-Path $SkillDirs[0])) { Write-Error "Skill not found: $Skill"; exit 1 }
} else {
    $SkillDirs = Get-ChildItem -Path $From -Directory | Select-Object -ExpandProperty FullName
}

# --- copy each skill (mirror, overwrite) ----------------------------------
$total = 0
foreach ($srcSkill in $SkillDirs) {
    $name = Split-Path $srcSkill -Leaf
    $dstSkill = Join-Path $To $name
    Write-Host "`n[skill] $name" -ForegroundColor Green

    # robocopy: /MIR = mirror (delete dest files not in source), /NFL /NDL /NJH /NJS = quiet,
    # /NP = no progress, /R:1 /W:1 = retry once, /XO = skip older (not used — we overwrite).
    $roboArgs = @($srcSkill, $dstSkill, '/MIR', '/NFL', '/NDL', '/NJH', '/NJS', '/NP', '/R:1', '/W:1')
    if ($DryRun) { $roboArgs += '/L' }

    $out = & robocopy @roboArgs
    $ec = $LASTEXITCODE
    # robocopy: 0 = no files copied, 1 = files copied, 2-7 also success variants. >=8 is failure.
    if ($ec -ge 8) {
        Write-Host "  robocopy failed (exit $ec)" -ForegroundColor Red
        $out | Write-Host
    } else {
        if ($DryRun) { Write-Host "  DRY RUN ok (exit $ec)" -ForegroundColor Gray }
        else         { Write-Host "  synced ok (exit $ec)"  -ForegroundColor Gray }
        $total++
    }
}

Write-Host "`n$(if($DryRun){'Would sync'}else{'Synced'}) $total skill(s)." -ForegroundColor Cyan
if (-not $DryRun -and -not $Pull) {
    Write-Host "`nRestart Cowork / reload the skills list for changes to take effect." -ForegroundColor Yellow
}
