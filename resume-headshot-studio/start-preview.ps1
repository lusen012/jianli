$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$port = 4173
$serverScript = Join-Path $root "preview-server.js"
$nodeCandidates = @(
  "E:\腾讯电脑管家软件搬家\node.exe",
  "node"
)

$nodePath = $null
foreach ($candidate in $nodeCandidates) {
  try {
    if ($candidate -eq "node") {
      $cmd = Get-Command node -ErrorAction Stop
      $nodePath = $cmd.Source
      break
    }
    elseif (Test-Path $candidate) {
      $nodePath = $candidate
      break
    }
  }
  catch {
  }
}

if (-not $nodePath) {
  throw "Node.js not found. Please install Node.js or update start-preview.ps1."
}

Write-Host "Preview server starting at http://127.0.0.1:$port/"
Write-Host "Project root: $root"
Write-Host "Using Node: $nodePath"
Write-Host "Press Ctrl+C to stop."

if (-not (Test-Path $serverScript)) {
  throw "preview-server.js not found."
}

& $nodePath $serverScript $root $port
