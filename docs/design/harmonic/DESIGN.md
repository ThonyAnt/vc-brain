# Harmonic.ai frontend/design teardown

Fetched 2026-07-18. All values below come from shipped code saved in this directory:

- `home.html` = https://harmonic.ai/ (HTTP 200, 346 KB)
- `pricing.html` = https://harmonic.ai/pricing
- `vc.html` = https://harmonic.ai/solutions/vc
- `main.css` = https://cdn.prod.website-files.com/6107b1101d4d3e748743f234/css/harmonic-test.webflow.shared.d3dc9a304.min.css (493 KB, the single stylesheet shared by all three pages)

Platform fact: this is a Webflow site (webflow.js bundle `webflow.9a35007c.bd043fc151a951ee.js`, `w-nav`/`w-dyn-list` classes, cdn.prod.website-files.com asset host). Classes are human-readable Webflow names. Anything marked "could not verify" was not present in the fetched code.

---

## 1. Typefaces and @font-face facts

`main.css` contains 11 `@font-face` blocks. All font files are self-hosted on cdn.prod.website-files.com (verified live with HEAD requests, e.g. PPNeueMontreal-Medium.otf returns 200, font/otf, 55,596 bytes; Inter-Regular.woff2 returns 200, font/woff2, 108,488 bytes).

### Display face: PP Neue Montreal (Pangram Pangram foundry, per file names)
| family | weight | style | file (main.css src URL) | format |
|---|---|---|---|---|
| `PP Neue Montreal` | 400 | normal | `6960b8836175e61299772e32_ppneuemontreal-book.otf` | opentype |
| `PP Neue Montreal` | 500 | normal | `67f53963c9ee4487f3b75500_PPNeueMontreal-Medium.otf` | opentype |
| `PP Neue Montreal` | 600 | italic | `6557ab7ad279ef1ec2e69e6b_PPNeueMontreal-SemiBoldItalic.otf` | opentype |
| `PP Neue Montreal` | 700 | normal | `6557ab7adf7921c526db2160_PPNeueMontreal-Bold.otf` | opentype |

### Body face: Inter (registered under the family name `Inter-`, with a trailing hyphen)
| family | weight | style | file | format |
|---|---|---|---|---|
| `Inter-` | 400 | normal | `67506d619070f8fed5c9d7f4_Inter-Regular.woff2` | woff2 |
| `Inter-` | 500 | normal | `67506d616fcef0af66e260aa_Inter-Medium.woff2` | woff2 |
| `Inter-` | 600 | normal | `67506d618381731b0c103a11_Inter-SemiBold.woff2` | woff2 |
| `Interdisplay` | 700 | italic | `67506d619070f8fed5c9d7f7_InterDisplay-BoldItalic.woff2` | woff2 |

### Mono accent: Fira Code
| family | weight | style | file | format |
|---|---|---|---|---|
| `Fira Code` | 400 | normal | `67506a572005bc3cd51711c3_Fira Code Regular.woff2` | woff2 |

### Legacy/minor
- `AntikorMono` 400 normal, `610a72fcc030f70c84d75fa8_font.woff` (woff). Used only in one rule (`.text-size-medium.text-color-softwhite.text-head-hot-25`, main.css).
- `webflow-icons` 400, inlined base64 truetype (IcoMoon-generated icon font, main.css).

All non-icon faces declare `font-display:swap` (main.css).

### Font-family CSS variables (main.css `:root`)
- `--title: "PP Neue Montreal", Arial, sans-serif`
- `--subtitle: Inter`
- `--body: Inter`

### Loader facts
- Google WebFont loader is called in `home.html` with `WebFont.load({google:{families:["Inconsolata:400,700","Lato:...","Montserrat:100..900 all styles"]}})`. These Google families are loaded but I found no rule in main.css that uses Inconsolata, Lato, or Montserrat. Likely legacy Webflow settings. Treat PP Neue Montreal + Inter + Fira Code as the real system.
- No Typekit/Adobe Fonts link tags in any fetched HTML.
- Zero `rel="preload"` links in home.html (checked; count = 0). Fonts are not preloaded.

---

## 2. Type scale table

Element stacks resolve through Webflow's cascade: base element rules plus class rules, all in `main.css`. `.hm-h1` and `.h1` declare no font-family; they inherit the base `h1` rule. Body inherits the base `body` rule.

Base rules (main.css):
- `body { color:#1f2022; font-family:Inter-,Arial,sans-serif; font-size:14px; font-weight:400; line-height:130% }` (16px at max-width:479px)
- `h1 { font-family:PP Neue Montreal,Arial,sans-serif; font-size:36px; font-weight:500; line-height:1.3em }`
- `h2 { PP Neue Montreal; 32px; 500; 1.3em }` (28px at ≤479px)
- `h3 { PP Neue Montreal; 24px; 500; 1.3em; letter-spacing:.015em }` (22px at ≤479px)
- `h4 { PP Neue Montreal; 20px; 400; 1.5em; letter-spacing:.015em }`
- `h5 { Inter-; 16px; 400; 1.5em; letter-spacing:.015em }`
- `h6 { Inter-; 14px; 400; line-height:180% }`

| Element (HTML source) | Class | Family | Size (desktop base) | Weight | Line-height | Letter-spacing | Responsive sizes | Source |
|---|---|---|---|---|---|---|---|---|
| Hero h1 "The startup discovery engine" (home.html) | `.hm-h1` | PP Neue Montreal (inherited from `h1`) | 74px | 500 (inherited) | 1em | not set | 64px ≤991, 44px ≤767, 36px ≤479; `max-width:13ch` ≤991 | main.css |
| Hero h1 (pricing.html "Find the plan for you") | `.h1` | PP Neue Montreal (inherited) | 74px | 500 (inherited) | 1.1em | -.3px at ≤479 only | 88px ≥1920, 52px ≤991, 44px ≤767/≤479 | main.css |
| Section heading | `.h2` | `PP Neue Montreal,Arial,sans-serif` (declared) | 44px | 500 | 1.2em | not set | 44px ≥1280, 48px/104% ≥1440, 40px ≤991, 32px ≤767, 26px ≤479 | main.css |
| Section heading alt | `.h2-2` | inherited (body Inter unless on heading tag) | 36px | 500 | 1.3em | not set | 44px ≥1280, 48px/104% ≥1440, 40px ≤991, 32px ≤767, 26px ≤479 | main.css |
| Large statement heading | `.h3` | `PP Neue Montreal` (declared) | 40px | 500 | 1.3em | not set | 48px ≥1280, 48px/104% ≥1440, 56px ≥1920, 40px ≤767, 28px ≤479 | main.css |
| Hero subhead (home.html h2 `h3-copy-2 text-weight-normal`) | `.h3-copy-2` | inherited | 40px, color `#262222` | 400 (via `.text-weight-normal`) | 1.3em | not set | 48px/104% ≥1440, 56px ≥1920, 32px ≤991, 28px ≤767, 1.5rem ≤479 | main.css |
| Testimonial h2 | `.h3-copy-3` | inherited | 40px, `#262222` | 400 | 1.3em | not set | same ramp as h3-copy-2 | main.css |
| `.h4` | `.h4` | PP Neue Montreal (base h3/h4 on heading tags) | 28px | 400 with `.text-weight-normal` | inherited | inherited | none found | main.css |
| Popup heading | `.heading-34` | inherited | 48px, color `var(--greyscale-850)` | 500 | 1.1em | not set | 40px ≤991 (.left), 32px ≤479 | main.css |
| FAQ heading (pricing) | `.heading-faq` | `PP Neue Montreal` (declared) | 44px | 500 | 1.3em | not set | 48px/104% ≥1440; `.subtle` 32px/1.2em; `.black` 32px | main.css |
| Body default | `body` | `Inter-,Arial,sans-serif` | 14px | 400 | 130% | not set | 16px ≤479 | main.css |
| Large body copy (home hero support text `text-size-large text-color-grey`) | `.text-size-large` | inherited (Inter) | 20px | inherited 400 | 140% | not set | 16px ≤991 | main.css |
| Medium body | `.text-size-medium` | inherited (Inter) | 1rem | 400 | 1.3 | not set | 16px/1.2 ≤767, 14px/1.2 ≤479 | main.css |
| Small text | `.text-size-small` | inherited | 12px | 400 | 1.2rem | not set | none found | main.css |
| Mono accent text | `.text-size-large.text-mono` | `Fira Code,Impact,sans-serif` | 20px (from .text-size-large) | 400 | 140% | not set | 15px ≤767 (`.text-color-grey` variant) | main.css |
| Nav link | `.hm-navlink` | inherited (Inter via body) | 13px | inherited 400 | inherited | -.1px | 16px ≤991 (mobile menu) | main.css |
| Primary button label | `.nav-button-primary` | inherited | 13px | 500 | 130% | not set | n/a | main.css |
| Secondary button label | `.button-secondary-3` | `Inter-,Arial,sans-serif` (declared) | 13px | 500 | 1.3em | -.1px | n/a | main.css |
| Ghost/tab button | `.button-ghost` | `Inter-,Arial,sans-serif` | 13px | 500 | 1.3em | -.1px | 14px ≥1440 | main.css |
| Case-study card text | `.case-study-card-item-wrap` | `PP Neue Montreal` (declared) | 28px | 500 | 120% | not set | 20px/116% ≤479 (`.case-study` inner) | main.css |

Letter-spacing census across main.css (frequency): `-.1px` (15), `.5px` (10), `0` (9), `.015em` (4), `.025em` (4), `1px` (4), `-.3px` (4). The system is near-zero tracking; slight negative on UI labels, slight positive on base h3/h4.

---

## 3. Color palette

All from the single `:root` block in main.css. Values quoted verbatim (hex, 8-digit hex = alpha).

### Neutrals ("greyscale" ramp)
| token | value |
|---|---|
| `--greyscale-00` | `white` |
| `--greyscale-10` | `#f5f6fa` |
| `--greyscale-50` | `#f0f1f5` |
| `--greyscale-100` | `#e4e5eb` |
| `--greyscale-150` | `#d7d9e0` |
| `--greyscale-200` | `#c4c6cc` |
| `--greyscale-300` | `#abadb3` |
| `--greyscale-400` | `#909299` |
| `--greyscale-450` | `#82858c` |
| `--greyscale-500` | `#6f727a` |
| `--greyscale-600` | `#5c5e66` |
| `--greyscale-700` | `#494b52` |
| `--greyscale-800` | `#2d2e33` |
| `--greyscale-850` | `#212226` |
| `--greyscale-900` | `#16171a` |
| `--greyscale-950` | `#040508` |

### Brand / primaries
| token | value |
|---|---|
| `--primary-dark-orange` | `#fe5d45` |
| `--tomato` | `#fe5d45` |
| `--secondary-blood-orange` | `#fe5d45` |
| `--fe5d45` | `#f65c50` (yes, a variable literally named after the hex) |
| `--indian-red` | `#dd4e43` |
| `--primary-dark-green` | `#06351e` (footer card background) |
| `--spring-green` / `--secondary-green` | `#1de26c` |

### Secondary accents
`--secondary-pink #f068a1`, `--secondary-orange #ff7f36`, `--secondary-yellow #ffd231`, `--secondary-blue #4a72ff`, `--secondary-light-blue #67c7f0`, `--secondary-purple #8957da`

### Highlights
`--highlight-orange #f3b549`, `--highlight-red #e07949`, `--highlight-blue #53a1d2`, `--highlight-purple #8d4fda`

### Pastels
`--yellow #fffcaf`, `--orange #ffedaf`, `--pink #ffc1ee`, `--green #69ffd2`, `--blue #b5ceff`, `--blue-faded #e5eeff`, `--pink-faded #ffe5f8`, `--off-white #f3f4f6`, `--white-smoke #ebebeb`

### Alpha ramps (used for overlays/glass)
- White alphas: `--white-alpha-950 #ffffff05` up through `--white-alpha-10 #fffffff7` (16 steps, e.g. `--white-alpha-300 #ffffffad`, `--white-alpha-500 #ffffff73`, `--white-alpha-900 #ffffff17`).
- Dark alphas over `#040508`: `--dark-alpha-10 #04050808` through `--dark-alpha-950 #040508fa` (17 steps, e.g. `--dark-alpha-100 #0405081a`, `--dark-alpha-500 #0405088f`).

### Legacy grays (also in :root)
`--black #262222`, `--gray #424242`, `--dim-grey #474747`, `--gray-dark #6b7280`, `--gray-medium #d1d5db`, `--gray-light #e5e7eb`

### Key non-token colors that appear in rules (main.css)
- Body text: `#1f2022` (body rule)
- Hero/page background: `#f5f5f9` (`.hero-and-logos`), footer strip `#f4f5f8` (`.footer-section-new`)
- Primary button: bg `#262222`, text `#f1f1f1` (`.nav-button-primary`)

---

## 4. Spacing / radius / shadow tokens

### Spacing variables (main.css :root, a raw px scale)
`--0:0px, --4:4px, --6-5:6px, --8:8px, --10:10px, --12:12px, --16:16px, --20:20px, --24:24px, --26:26px, --28:28px, --32:32px, --40:40px, --48:48px, --64:64px, --96:96px`

### Radius usage (census over main.css, top values by count)
- `99px` (65 uses) plus `999px` (14) and `999rem` (7): pill radius, the signature shape for buttons and the floating nav
- `8px` (25), `1rem` (22), `var(--12)` (18), `var(--16)` (18), `16px` (17), `.5rem` (16), `12px` (14), `24px` (13), `4px` (15), `20px` (12), `32px` (8)
- Working set: pills = 99px; cards = 16px (`var(--16)`); big containers = 24px (`var(--24)`); small chips = 8px / .5rem.

### Shadows actually shipped (main.css, verbatim)
- Card shadow: `0 4px 20px #00000014` (`.case-study-card-item-wrap`)
- Pricing card: `0 30px 35px #2e38481a` (`.pricing-card`)
- Large soft: `0 10px 80px #00000014` (5 uses)
- Dropdown panel: `0 4px 7px #0000000f` (`.dropdown-down`)
- Floating CTA: `0 8px 12px #00000061` (`.nav-button-primary.book-a-demo-floating`)
- Ring style: `0 0 0 2px var(--greyscale-10)` (15 uses), `0 0 0 2px #0000000a` (6)
- Container glow ring: `0 0 2px 1.2px #02140bbf` (`.hm-section-container`, `.footer-card-container`)
- Layered ambient (used twice): `0 420px 168px #2e384803, 0 236px 142px #2e384808, 0 105px 105px #2e38480a, 0 26px 58px #2e38480d`
- Inset ring: `inset 0 0 0 2px #fff` (`.dropdown-link`)

### Blur (backdrop-filter census, main.css)
`blur(2px)` (12), `blur(5px)` (11), `blur(6px)` (3), `blur(4px)` (2), `blur(30px)` (2), `blur(8px)` (2)

---

## 5. Component recipes (verbatim from main.css)

### Primary button (`.nav-button-primary`, used for "Book a demo" in nav and hero)
- `background-color:#262222; color:#f1f1f1; border-radius:99px; padding:10px 16px; font-size:13px; font-weight:500; line-height:130%; display:flex; gap:8px (grid-column/row-gap)`
- Hover: `background-color:var(--dim-grey) /*#474747*/; color:#fff`
- Floating variant `.book-a-demo-floating`: `background-color:var(--greyscale-950); width:220px; padding-left/right:10px; gap:12px; box-shadow:0 8px 12px #00000061`; hover bg `var(--greyscale-850)`

### Secondary button (`.button-secondary-3`)
- `background-color:var(--greyscale-100); color:var(--greyscale-950); letter-spacing:-.1px; border-radius:99px; padding:10px 16px; font-family:Inter-; font-size:13px; font-weight:500; line-height:1.3em; transition:all .2s; gap:8px`
- Hover: `background-color:var(--dark-alpha-150)`; active: `#43464d`; `.on-dark`: bg `var(--greyscale-00)`, hover `var(--greyscale-150)`
- ≤991px: fixed `height:40px`

### Ghost / tab button (`.button-ghost`)
- `background-color:var(--white-alpha-900) /*#ffffff17*/; color:var(--greyscale-10); border-radius:5px; padding:12px 25px; font-size:13px; font-weight:500; transition:all .2s`; current-tab state bg `var(--white-alpha-800)`

### Outline button with icon (`.button-outline-with-icon-left`)
- `border:1px solid var(--greyscale-200); color:var(--greyscale-850); border-radius:99px; padding:6px 14px 6px 6px; font-size:13px; line-height:1.4em; gap:var(--8)`; hover border `var(--greyscale-500)`

### Nav bar (light pages: `.main-navbar` + `.main-navbar-wrap`; dark hero: `.navbar-in-dark`)
- `.main-navbar`: `max-width:1240px; margin:auto; background:transparent`
- `.navbar-in-dark`: absolute top, `margin-top:32px; margin-left/right:40px; padding:4px`; ≥1440 `max-width:1512px`; ≤991 becomes `position:fixed; background:#fff; backdrop-filter:blur(5px)`
- Nav link `.hm-navlink`: `color:var(--greyscale-450); padding:14px 16px; font-size:13px; letter-spacing:-.1px`; hover `var(--greyscale-950)`
- Floating pill nav (`.secondary-navbar`, appears on scroll): `position:fixed; border:1px solid var(--dark-alpha-100); backdrop-filter:blur(5px); background-color:#fffc; border-radius:99px; padding:4px 10px; margin-top:-100px` (slides in via Webflow JS)
- Mega-dropdown panel `.dropdown-down`: `background:var(--white); border:1px solid #f5f6fa; border-radius:16px; min-width:640px; padding:9px; box-shadow:0 4px 7px #0000000f`
- Dropdown item `.dropdown-link`: `min-width:230px; max-width:306px; height:152px; background:#f5f6fa; border:1px solid #ececec; border-radius:.5rem; padding:16px; font-size:13px; box-shadow:inset 0 0 0 2px #fff`; tinted variants use `linear-gradient(45deg,#f5f6fae6,#f5f6fa80)`; `.color-purple` adds `backdrop-filter:blur(5px)`
- Nav bar height: could not verify a fixed height (no `height` on `.main-navbar-wrap` at desktop; it's content-sized with `padding:11px 16px` at ≤991px)

### Case-study / customer cards (home + vc pages)
- `.case-study-card-item-wrap`: `border-radius:var(--16); min-width:400px; max-width:400px; height:270px; padding:20px; font-family:PP Neue Montreal; font-size:28px; font-weight:500; line-height:120%; box-shadow:0 4px 20px #00000014; display:flex; flex-direction:column; justify-content:space-between; gap:12px`
- `.case-study-link-wrap` (image frame): `border:5px solid #00000014; border-radius:16px; position:absolute; overflow:hidden`
- Link text `.case-study-card-link-text`: `color:var(--greyscale-500); text-decoration:underline`; hover `var(--secondary-blood-orange)`; brand variant `var(--indian-red)`

### Pricing cards (pricing.html)
- `.pricing-card`: `border-radius:var(--16); background-color:var(--primary-dark-orange) /*#fe5d45*/; max-width:400px; padding-top:8px; overflow:hidden; box-shadow:0 30px 35px #2e38481a` (the 8px top padding exposes an orange rim above the inner card)
- `.dark` variant: `background-color:var(--greyscale-950); min-height:558px`
- `.pricing-card-inside-wrap`: `background-color:var(--greyscale-10); border-top-left/right-radius:16px; padding-top:12px`
- `.pricing-card-wrap`: `background:var(--white); padding:32px 32px 80px` (40px at ≥1920, 20px at ≤767)

### Big framed section container (`.hm-section-container`, dark "Integrate your way" block)
- `border-radius:var(--24); max-width:1480px; padding:7rem; gap:3rem; overflow:hidden; box-shadow:0 0 2px 1.2px #02140bbf`; purple variant bg `linear-gradient(315deg,#0d0706,#403e5f 55%,#171417)`

### Footer card (`.footer-card-container`)
- `border-radius:var(--24); background-color:var(--primary-dark-green) /*#06351e*/; max-width:1440px; padding:64px 64px 48px; box-shadow:0 0 2px 1.2px #02140bbf`; ≥1920 shadow becomes `0 0 0 6px #06351e40`; sits inside `.footer-section-new { background:#f4f5f8; padding:16px }`

---

## 6. Layout facts (main.css unless noted)

- Content max-widths (census of max-width values): `1240px` (36 uses, the primary container incl. `.main-navbar`), `1124px` (31), `1440px` (15), `1200px` (14), `1480px` (9). Working grid: nav and case-study rows at 1240px, content columns often 1124px, hero/feature frames at 1440 to 1480px.
- Section rhythm: `.hm-section { padding:8rem 4rem; display:flex; flex-direction:column; align-items:center }`. Quote section variant `padding-top:140px; padding-bottom:220px`.
- Hero: `.hero-section { height:100vh; min-height:940px; max-height:1430px; margin-bottom:-250px; gap:55px; text-align:center; overflow:hidden }` on background `#f5f5f9` (`.hero-and-logos`). Mobile ≤479: `height:90vh; max-height:570px`.
- Hero content: `.hm-hero-content-wrap { gap:12px; padding-bottom:200px }`.
- Grids: `grid-template-columns:1fr 1fr` is dominant (34 uses); `1fr 1fr 1fr` (7); one `1fr` x7 row (logo strip). `.pricing-card-list-features` uses a 2-col grid pattern (`1fr 1fr`).
- Breakpoints used throughout: min-width 1280 / 1440 / 1920; max-width 991 / 767 / 479 (standard Webflow set, seen in every media query above).
- Nav container: `.navbar-no-shadow-container { max-width:1230px; padding:20px }`; light sticky bar `.navbar-no-shadow { backdrop-filter:blur(4px); background-image:linear-gradient(#fff,#ffffff4a); padding-left/right:20px }`.

---

## 7. Motion

From main.css:
- Only one `@keyframes` in the entire stylesheet: `@keyframes spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}`, used as `animation:.8s linear infinite spin` (a loading spinner).
- Transition census: `all .2s` (13 uses, the default), `transform .8s cubic-bezier(.165,.84,.44,1)` (3), `color .2s` (2), `background-color .1s` (2), `all .2s cubic-bezier(.6,-.28,.735,.045)` (2), plus single uses of `all .3s`, `border-color .3s cubic-bezier(.19,1,.22,1)`, `all .3s cubic-bezier(.075,.82,.165,1)`, `all .2s cubic-bezier(.23,1,.32,1)`, `all .2s cubic-bezier(.95,.05,.795,.035)`, `all .2s cubic-bezier(.175,.885,.32,1.275)`.
- So: micro-interactions at 200ms, a few 100ms color flips, and slow 800ms ease-out-quart transforms for larger moves.

From home.html:
- 51 `data-w-id` attributes: scroll/hover animations are Webflow Interactions (IX2) driven by the webflow.js bundle, not CSS. Their timing curves live in JSON inside the JS bundle and were not extracted; marked unverified.
- Nav uses Webflow's own `data-animation="default" data-duration="400" data-easing="ease"` attributes (visible on `.main-navbar` in home.html).
- No Lottie, GSAP, Framer Motion, Swiper, or Splide references found in home.html (grep returned nothing). jQuery 3.6/3.5.1 and jquery.pjax 2.0.1 are loaded (pjax = soft page transitions). `<video>` count in home.html: 0.

---

## 8. Qualitative notes (impressions, not measured)

- Overall language: light gray-lavender canvas (#f5f5f9/#f5f6fa) with near-black ink (#040508 family), one hot accent (tomato #fe5d45), and a deep green (#06351e) reserved for the footer card. Sections alternate light canvas with fully dark framed "cards" (rounded 24px containers with a faint 2px glow ring) rather than full-bleed dark sections.
- Buttons and the floating scroll-nav are all pills (99px radius) with glassmorphism: rgba-white backgrounds plus backdrop blur (2 to 8px). The floating "Book a demo" pill is fixed-width 220px with an unusually heavy shadow (38% black) so it reads as a physical object.
- Product UI is shown as large PNG screenshots inside 16px-radius frames with a 5px translucent border (the `.case-study-link-wrap` pattern), often masked by vertical fade gradients (`linear-gradient(#fff0,#000 92%)` style masks appear repeatedly in the CSS). Company/network data is illustrated with image assets (e.g. `network.png`, "Pogs" avatar PNGs) rather than live JS visualizations on the marketing site.
- Type hierarchy trick they lean on: same size, two colors. Headings pair a `#abadb3` gray line (`.h2.subtle`) with a black line (`.h2`) at identical size/weight, e.g. "Meet Scout / The agent made for investors". The two-tone hero on the VC page does the same with `.text-color-grey`.
- Mono (Fira Code) is used sparsely as an eyebrow/annotation voice (`.text-mono`, hot-25 labels), giving a data-product feel against the neutral grotesque headings.
- Data-density on the marketing site is low; density lives in the screenshots. Cards carry one stat or one quote in 28px PP Neue Montreal.
- Gradient use is restrained: 45deg near-white glass gradients on dropdown tiles, vertical white fades for masking, and exactly one saturated gradient (`315deg #0d0706 → #403e5f → #171417`) for the purple integration section.

---

## 9. What could not be verified

- Webflow IX2 scroll/hover animation parameters (durations, easings, transforms). They are encoded in the webflow.js bundle's JSON, not in CSS. Only the 51 `data-w-id` hooks are observable in home.html.
- A fixed nav bar height. No `height` rule on `.main-navbar` or `.main-navbar-wrap` at desktop widths; height is content-driven (padding 11px 16px is only declared at ≤991px).
- Any use of the loaded Google fonts (Inconsolata, Lato, Montserrat): loaded by WebFont.load in home.html but no matching font-family rule found in main.css.
- Unicode ranges: none of the 11 @font-face blocks declare `unicode-range`.
- The exact hero h1 color on the homepage: `.hm-h1` declares no color; the computed value depends on ancestor wrappers I did not fully resolve. The base body color is `#1f2022` (main.css); treat the hero ink as that unless overridden by a wrapper.
- Letter-spacing for PP Neue Montreal headings at hero size: no `letter-spacing` is declared on `.hm-h1`, `.h1`, `.h2`, or `.h3` at base size (only `-.3px` on `.h1` at ≤479px), so default/normal tracking ships.
- App-side (app.harmonic.ai) styling: not fetched; everything here is the marketing site.
- Shadow/blur values seen only in the Webflow editor or JS-injected styles, if any exist, are not covered; only main.css was shipped as CSS.
