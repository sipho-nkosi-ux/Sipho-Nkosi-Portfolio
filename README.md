# Sipho Nkosi – Portfolio

Structural design and drafting portfolio: steel and concrete structures, foundations, industrial and residential buildings.
Live at **https://siphonkosi.co.za** (custom domain set in `CNAME`)

A static website: no build step is needed to host it. GitHub Pages serves this folder as-is.

## Editing the site
Open a file on GitHub, click the pencil icon, edit the text between the quotes, and commit. The site updates in a minute or two.

- **Project write-ups** (problem statement, scope, how I solved it): `briefs.js`
- **Contact and visitor counting**: `js/contact.js`
  - `emailReversed` – your email typed backwards, so spam bots can't read it
  - `linkedin` – your LinkedIn link
  - `cv` – path to a PDF in this repository, e.g. `files/Sipho-Nkosi-CV.pdf` (leave `''` to hide the button)
  - `goatcounter` – your GoatCounter code (leave `''` to switch visitor counting off)

## Contact form
Messages are delivered by FormSubmit (formsubmit.co) to the email in `js/contact.js`.
The **first** message triggers a one-time activation email from FormSubmit — click the link in it, and every message after that arrives in your inbox.

## Visitor counting
Uses GoatCounter (free, no cookies). Sign up at goatcounter.com with the code `sipho`, then in its settings tick
*"Allow adding visitor counts on your website"* so the total shows in the site footer.

## Structure
- `index.html` – home page (projects, services, construction details, standards, about, contact)
- one page per project, e.g. `ans-offloading-platform.html`
- `css/`, `js/`, `fonts/` – shared look and behaviour (fonts are hosted here, not on Google)
- `img/` – full-size drawings (opened in the viewer); `img/p/` – compressed previews shown on the pages
- `sitemap.xml`, `robots.txt`, `404.html`

## 3D controls
Load the model on any project page, then: drag to orbit, scroll to zoom, right-drag to pan.
Build sequence · section slider · floors · lift roof · auto-rotate · full screen (Esc to exit).

Engineering design calculations and reports are available on request.

## Credits
Icons: [Tabler Icons](https://tabler.io/icons) (MIT licence). Fonts: Inter, Instrument Serif and JetBrains Mono (SIL Open Font Licence), hosted in `fonts/`.
