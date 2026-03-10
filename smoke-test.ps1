$ErrorActionPreference = 'Stop'

$pages = @(
    'index.html',
    'about.html',
    'treatments.html',
    'locations.html',
    'contact.html'
)

foreach ($page in $pages) {
    if (-not (Test-Path $page)) {
        throw "Missing page: $page"
    }
}

Write-Output 'SmokeTest: PASS (all expected pages exist)'

