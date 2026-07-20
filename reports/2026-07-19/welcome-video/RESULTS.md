# Welcome video block, 2026-07-19

Click-to-play YouTube block on the homepage (Adrian x Claude Design drop). Verified against
`npm run preview` (production build) through headless Edge over the DevTools protocol.

## Results

| Check | Result |
|---|---|
| Video is real | "Welcome \| FabricatorStudio", 69s, public on the channel (`e316fbyqX5Q`) |
| YouTube contact BEFORE click | **Zero requests.** No third-party script, no cookie for visitors who never play it |
| After click | iframe injected, `youtube-nocookie.com/embed/e316fbyqX5Q`, exactly 1 request; poster removed |
| Section order | `hero -> welcome -> tools -> why -> features -> download -> licensing -> tutorials -> about` |
| Horizontal overflow @1440 | None (1425 = 1425) |
| Horizontal overflow @390 | None (390 = 390) |
| Visual | Confirmed desktop and mobile |

## Gate parser fix landed alongside

The drop's radial scrim tripped G6 as an "off-palette gradient stop `60% 60%`". Cause: the
minifier strips a default `at 50% 50%` position, leaving a bare size prelude the DIRECTION
regex did not recognize, so it fell through to the palette check. Build-only, invisible in
`dev`.

Fixed the parser, not the CSS or the law. The new regex accepts keyword directions, angles,
shapes (optionally positioned), position-only, and 1-2 length size preludes with optional
shape and optional `at`. Verified against a table of **17 preludes accepted** and **10 color
stops still checked** before landing, so no real off-palette stop can slip past.

## Screenshots

`welcome-desktop-poster`, `welcome-desktop-playing` (1440x900), `welcome-mobile` (390x844).
