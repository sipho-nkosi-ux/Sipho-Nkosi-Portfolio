# Sipho Nkosi – Portfolio

Structural design and drafting portfolio: steel and concrete structures, foundations, industrial and residential buildings.
Live at **https://siphonkosi.co.za** (custom domain set in `CNAME`).

A static website: GitHub Pages serves this folder as-is, with no build step on GitHub.

## How the site is made
The pages (`index.html` and one page per project) are generated from project data by a build script that is kept outside this repository.
The project write-ups (problem statement, scope, how I solved it) are written into each page when it is built, so **editing `briefs.js` on GitHub does not change the text on the site**. To change a write-up, update it at the source and rebuild, or edit the text directly in that project's `.html` file.

## Settings you can edit here
`js/contact.js`
- `emailReversed` – your email typed backwards, so spam bots can't read it
- `linkedin` – your LinkedIn link
- `cv` – path to a PDF in this repository, e.g. `files/Sipho-Nkosi-CV.pdf` (leave `''` to hide the button)
- `goatcounter` – your GoatCounter code (leave `''` to switch visitor counting off)
- `web3formsKey` – your Web3Forms access key (see below)

## Contact form
Messages are sent in the background by **Web3Forms** (web3forms.com), using the access key in `js/contact.js`. The visitor sees "Thank you" within about a second.
If Web3Forms ever fails, the form falls back to **FormSubmit** (formsubmit.co), which sends to the email in `js/contact.js`.
Spam protection: a hidden field that only bots fill in, plus any domain restriction you switch on in the Web3Forms dashboard.

## Drawings and confidentiality
- Every drawing image carries a "Sipho Nkosi · Portfolio sample · Not for construction" watermark. Gallery previews are capped at 900 px.
- Phones and tablets are served 1000 px copies (`img/m/`); laptops and desktops get the full-size copies (`img/`).
- The drawing viewer has no zoom. Right-click, drag-to-save, Ctrl/⌘+S, printing and view-source are blocked, and drawings blur when a screenshot tool is likely being used. These are deterrents, not guarantees; the watermark is the real protection.
- Client property descriptions (erf and stand numbers) are deliberately left off the site.

## Visitor counting
GoatCounter (privacy-friendly, no cookies). Stats: https://sipho.goatcounter.com

## Folders
- `img/` full-size drawings · `img/m/` phone copies · `img/p/` gallery previews (WebP)
- `lib/` three.js (3D viewer) · `fonts/` self-hosted fonts · `css/`, `js/` site styles and scripts
- `viewer3d.js`, `projects3d*.js`, `rooms2d.js` – the 3D models and floor-plan data
