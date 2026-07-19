# SITE-WHY-R2 verification, 2026-07-18

Homepage re-order (WHY split into its own section, licensing moved below download).
Verified against `npm run preview` (production build), NOT dev, per the relay's known-risk
note about the Astro minifier folding `animation-timeline` into the shorthand.

Method: `astro preview` on port 4399 (off Adrian's 1313/4323 lanes), driven through headless
Edge over the DevTools protocol from a Node script. The repo carries no browser tooling.

## Results

| Check | Result |
|---|---|
| Section order | `hero -> why -> tools -> features -> download -> licensing -> tutorials -> about` |
| Download parallax fires | **YES.** Image transform `matrix(1,0,0,1,0,-345.6)` -> `matrix(1,0,0,1,0,-44.7)` across the scroll; `CSS.supports('animation-timeline')` true |
| Desktop horizontal overflow @1440 | None (scrollWidth 1425 = clientWidth 1425) |
| Mobile horizontal overflow @390 | None (390 = 390 = 390); zero elements extending past the viewport |
| `#why` anchor resolves | YES |
| `/licensing` untouched | YES |
| Story copy | Byte-identical, now sourced from `src/data/licensing.ts` (shared with `/licensing`) |

Build artifacts also confirmed `view-timeline-name` and `animation-timeline` survived
minification as separate declarations (not folded into the `animation` shorthand), and
`overflow-x: clip` is intact on the scroll ancestors.

## Divergence from the relay

The homepage panel label shipped as **WHY THIS EXISTS**, per Adrian's live ruling
2026-07-18. It briefly ran as "WHY IT'S FREE" (Claude Design's pull-quote drop) between
`aa0a940` and this commit.

## Screenshots

`desktop-top`, `desktop-why`, `desktop-licensing` (1440x900), `mobile-top`, `mobile-why`
(390x844).
