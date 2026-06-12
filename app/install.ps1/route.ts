// Scout-specific binary install endpoint. mcpscan does not have verified release assets yet.
const script = `$ErrorActionPreference = "Stop"

$repo = "Orisan-org/orisan-scout"
$releaseName = "v0.2.0-alpha.2"
$release = Invoke-RestMethod "https://api.github.com/repos/$repo/releases/tags/$releaseName"

$arch = if ([System.Runtime.InteropServices.RuntimeInformation]::OSArchitecture -eq "Arm64") { "arm64" } else { "amd64" }
$assetName = "orisan-scout_windows_$arch.zip"
$asset = $release.assets | Where-Object { $_.name -eq $assetName } | Select-Object -First 1

if (-not $asset) {
  throw "Could not find release asset: $assetName"
}

$installDir = Join-Path $env:LOCALAPPDATA "Orisan\\bin"
$zipPath = Join-Path $env:TEMP $assetName
New-Item -ItemType Directory -Force -Path $installDir | Out-Null

Invoke-WebRequest -Uri $asset.browser_download_url -OutFile $zipPath
Expand-Archive -Path $zipPath -DestinationPath $installDir -Force
Remove-Item $zipPath -Force

$userPath = [Environment]::GetEnvironmentVariable("Path", "User")
if ($userPath -notlike "*$installDir*") {
  [Environment]::SetEnvironmentVariable("Path", "$userPath;$installDir", "User")
  $env:Path = "$env:Path;$installDir"
  Write-Host "Added $installDir to your user PATH. Open a new terminal if 'orisan' is not found."
}

Write-Host "Orisan installed: $installDir\\orisan.exe"
Write-Host "Run: orisan scout"
`;

export function GET() {
  return new Response(script, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=300"
    }
  });
}
