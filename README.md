# Dr. Shashank Tripathi Medical Website

A modern, private clinic-focused static website for **Dr. Shashank Tripathi**, Senior Heart Surgeon & CTVS Specialist in Kanpur.

## Site Structure

- `index.html` - Home page (overview and quick navigation)
- `about.html` - Doctor profile, credentials, and clinical philosophy
- `treatments.html` - Procedures and treatment areas
- `locations.html` - Clinic and hospital locations with timings
- `contact.html` - Booking and emergency contact page
- `styles.css` - Shared responsive design system
- `script.js` - Mobile nav toggle, active nav state, portrait handling, footer year
- `serve.ps1` - Simple local static server launcher
- `smoke-test.ps1` - Basic file-level smoke test

## Quick Start

No package manager is required.

### Option 1: Open directly
Open `index.html` in any modern web browser.

### Option 2: Serve locally

```powershell
./serve.ps1
```

Then open:

- `http://127.0.0.1:8000`

## Run Smoke Test

```powershell
./smoke-test.ps1
```

## Customization Notes

- Replace map placeholders in `locations.html` with live Google Maps iframes.
- The hero portrait currently uses `assets/dr-shashank-tripathi-portrait.svg`; replace this with the final image when available.
- Primary consultation flow is private clinic-first; Regency Hospital remains an emergency/hospital support option.

## Disclaimer

This website content is for awareness and general guidance only and does not replace in-person medical evaluation or emergency care.
