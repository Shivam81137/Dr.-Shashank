$ErrorActionPreference = 'Stop'
$port = 8000

if (Get-Command py -ErrorAction SilentlyContinue) {
    py -m http.server $port
} elseif (Get-Command python -ErrorAction SilentlyContinue) {
    python -m http.server $port
} else {
    throw 'Python is not installed. Install Python to run the local server.'
}

