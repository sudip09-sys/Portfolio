# Sudip Sah — Portfolio

Computer Engineering student at Gachon University and video editor at LumaCreatives.

**Live portfolio:** https://sudip09-sys.github.io/Portfolio/

The same portfolio is available from the course site at https://sudip09-sys.github.io/WebProgramming/week10/portfolio/.

## Design and interaction

The cinematic black-and-red design follows the supplied reference recording, adapted to Sudip's actual biography, photo and projects.

- A natural-color portrait, red halo, floating angular shapes and a restrained ember background.
- A manual 3D project showcase with filters, arrow keys, touch swipes and project-detail dialogs. Cards do not auto-advance while someone is reading.
- Memory Match, Book Search, JokeLab and the LumaCreatives editing profile. Individual client clips have not been supplied; the editing card links to the real profile rather than claiming a fictional showreel.
- Twelve selectable tools across editing, web development and engineering, with explanations and relevant links.
- Scroll reveals, a reading-progress line, persistent light/dark preference and a motion control.
- System reduced-motion support, capped decorative particle count, paused background animation in hidden tabs, first-focus skip navigation and visible focus indicators.
- An email-draft form and copy-email button. The form opens the visitor's email app; it does not send or store messages on a server.
- The complete project list, biography and direct contact links remain available without JavaScript.

The course homepage, team project and saved audit evidence are separate from this portfolio design.

## Run locally

Open `index.html` in a browser, or serve the repository with any static HTTP server. There is no build step or runtime dependency. Fonts use Google Fonts with local fallback stacks.

GitHub Pages serves `main` from the repository root. Images live under `assets/`.

## Validation and historical evidence

JavaScript syntax, CSS parsing and automated DOM checks cover carousel/filter/swipe navigation, all project dialogs, all tools, theme persistence, motion preferences, contact validation and email-draft construction, clipboard fallback, and no-JavaScript content. These checks exercise the app at several viewport settings; they do not constitute visual browser or physical-phone verification.

A fresh visual browser, keyboard and Lighthouse audit is still required for this design. Headless browser rendering was unavailable during implementation.

The existing `evidence/lighthouse-mobile-scores.jpg` records the **previous design**, measured on 5 November 2026 with Performance 94, Accessibility 100, Best Practices 100 and SEO 100. Those are historical scores, not measurements of this redesign.

Previous audit: https://pagespeed.web.dev/analysis/https-sudip09-sys-github-io-Portfolio/186f1of5fe?form_factor=mobile

Course submission materials: https://sudip09-sys.github.io/WebProgramming/week10/
