# Attio.com frontend/design teardown

Fetched 2026-07-18 with curl (Chrome 126 macOS User-Agent). No bot block; full HTML + all 8 CSS chunks downloaded.

Source files (all in this directory):
- `home.html` — https://attio.com (1,099,735 bytes)
- `pricing.html` — https://attio.com/pricing
- `platform-workflows.html` — https://attio.com/platform/workflows
- `css/1323anb_tvnwu.css` — main stylesheet (441,911 bytes; Tailwind v4 theme + utilities). Prettified copy in `pretty/`.
- `css/0_aivuqf~udyo.css` — button component tokens (primary/outline/ghost, light + dark)
- `css/0lnri2nsolo51.css` — all `@font-face` blocks
- `css/0novd3638rqgx.css`, `css/116sc1td222yh.css`, `css/0e_v2r2_dpmmy.css`, `css/09-gai.q5c35i.css`, `css/0-3jdgy1a36yc.css` — page-specific effects (AI gradient, workflows card, scroll fades, bento mask, keen-slider)

The site is Next.js + Tailwind v4 (CSS-first `@layer theme` with `--spacing:.25rem` base). All values below are quoted from these files. Deploy query string on every asset: `?dpl=dpl_A3mGpMehk4X7GPCjDtGrKyXBc69V`.

---

## 1. Typefaces and @font-face facts

All from `css/0lnri2nsolo51.css` (verbatim declarations) and `<link rel=preload as=font>` tags in `home.html`.

Four families, self-hosted woff2 under `/_next/static/media/`:

**1. `inter`** (body face — Inter by rsms; file names are explicit)
- Weights: 400, 500, 600, 700; style normal only. One file per weight:
  - `inter_regular-s.p.14d~dgkwwinsr.woff2` (400)
  - `inter_medium-s.p.0mb6cdaxva~_b.woff2` (500)
  - `inter_semibold-s.p.0i89rz5dgvr85.woff2` (600)
  - `inter_bold-s.p.17izycnw7mk7o.woff2` (700)
- `font-display:swap`. Fallback: `inter Fallback` = local Arial with `ascent-override:89.79%; descent-override:22.36%; size-adjust:107.89%`.
- Exposed as `--font-inter`, and `--default-font-family:var(--font-inter)` (main CSS), so Inter is the page default.

**2. `interDisplay`** (heading face — Inter Display optical size)
- Weights: 500, 600, 700; style normal only:
  - `inter_display_medium-s.p.18b1yud.1tn.g.woff2` (500)
  - `inter_display_semibold-s.p.07numhg7zlt5z.woff2` (600)
  - `inter_display_bold-s.p.08z.2j4gcre0y.woff2` (700)
- Exposed as `--font-inter-display`, utility `.font-display`. A global rule (`css/1323anb_tvnwu.css`) sets every `.text-heading-*` utility to `font-family:var(--font-inter-display)`.

**3. `tiemposText`** (serif accent — Tiempos Text; Klim Type Foundry's name is in the file name)
- Weight 400 only, normal + italic:
  - `tiempos_text_regular-s.p.09inv_nvjux_7.woff2` (400 normal)
  - `tiempos_text_regular_italic-s.p.01tz5540cqey6.woff2` (400 italic)
- Exposed as `--font-tiempos-text`, utilities `.font-serif`, `.text-heading-*-serif`.

**4. `JetBrains Mono`** (code/mono)
- Variable weight `font-weight:100 800`, style normal, 6 unicode-range subset files (latin subset: `3fe682a82f50d426-s.p.09q3q1i5159bl.woff2`, plus cyrillic/greek/vietnamese/latin-ext subsets — full ranges quoted in `css/0lnri2nsolo51.css`).
- Exposed as `--font-jetbrains-mono` = `--default-mono-font-family` and `--font-mono`.

Base rule (`css/1323anb_tvnwu.css`): `html{line-height:1.5; font-family:var(--default-font-family,...)}` and `h1..h6{font-size:inherit;font-weight:inherit}` — all heading sizing is done with utility classes.

## 2. Type scale

Token definitions, all from the `@layer theme` `:root` block of `css/1323anb_tvnwu.css`:

| Token | size | line-height | letter-spacing | default weight |
|---|---|---|---|---|
| `--text-xs` | .75rem (12px) | 1.125rem | 0 | 500 |
| `--text-sm` | .875rem (14px) | 1.25rem | -.005em | 500 |
| `--text-base` | 1rem | 1.375rem | -.01em | 500 |
| `--text-lg` | 1.125rem | 1.5rem | -.01em | 500 |
| `--text-xl` | 1.25rem | 1.625rem | -.01em | 500 |
| `--text-2xl` | 1.5rem | 1.875rem | -.01em | 500 |
| `--text-heading-xs` | 1.75rem | 2.125rem | -.01em | 600 |
| `--text-heading-sm` | 2rem | 2.25rem | -.01em | 600 |
| `--text-heading-md` | 2.5rem | 2.75rem | -.01em | 600 |
| `--text-heading-lg` | 3.5rem | 3.75rem | -.015em | 600 |
| `--text-heading-xl` | 4rem | 4rem | -.02em | 600 |

Notable: **default body-text weight is 500 (medium), not 400**, for every text-* token. Headings are 600 in Inter Display with negative tracking that increases with size.

Responsive heading utilities (`css/1323anb_tvnwu.css`): `.text-heading-responsive-md` = heading-sm below 992px, heading-md at `min-width:992px`; `.text-heading-responsive-lg` = heading-md → heading-lg at 992px. Serif variants (`.text-heading-sm-serif`, `.text-heading-responsive-md-serif`) switch family to `var(--font-tiempos-text)` and override weight to `var(--font-weight-normal)` (400), tracking `-.015em`.

Real elements mapped (class attribute from HTML → resolved via CSS above):

| Element (source) | family | size | weight | line-height | tracking | color |
|---|---|---|---|---|---|---|
| Hero h1 (`home.html`): `class="text-balance font-display font-semibold text-primary-foreground leading-[0.95]"` with inline `style="font-size:clamp(64px, calc(16px + 5.333svh), 80px);letter-spacing:clamp(-2.4px, calc(2.08px - 0.3733svh), -1.28px)"` | interDisplay | clamp(64px…80px) (inline style) | 600 | 0.95 | clamp(-2.4px…-1.28px) | `--color-black-100` #1c1d1f |
| Hero h1 no-JS/mobile variant (`home.html`): `text-heading-md … sm:text-heading-lg sm:tracking-[-0.02em] leading-[0.95]` | interDisplay | 2.5rem → 3.5rem (sm) | 600 | 0.95 | -.01em → -.02em (sm) | same |
| Hero sub-paragraph (`home.html`): `mt-3 max-w-[27em] text-balance font-medium text-[18px] text-accent-foreground leading-[1.3] tracking-[-0.18px]` | inter (default) | 18px | 500 | 1.3 | -.18px | `--color-black-700` #6f7988 |
| Section h2s (`home.html`): `text-balance font-medium text-heading-responsive-md text-primary-foreground` | interDisplay | 32px → 40px @992px | 500 (font-medium overrides the 600 default) | 2.25rem → 2.75rem | -.01em | #1c1d1f |
| Big dark-section h2 (`home.html`, "Universal Context"): `font-display font-semibold text-[40px] … leading-none tracking-[-0.024em] sm:text-[48px] md:text-[56px] lg:text-[72px] xl:text-[96px]` | interDisplay | 40/48/56/72/96px by breakpoint | 600 | 1 | -.024em | `text-white-200` #fafafb |
| Serif pull-quote (`home.html`): `text-heading-sm-serif leading-9 lg:text-[3rem] lg:leading-13` | tiemposText | 2rem → 3rem (lg) | 400 | 2.25rem → 3.25rem (`.leading-13` = spacing*13) | -.015em | #1c1d1f |
| Nav triggers (`home.html` header): `h-9 … px-3 rounded-[10px] button-ghost text-[15px]` | inter | 15px (`.text-[15px]{font-size:15px}`) | inherited (html default; utility sets none) | inherited 1.5 | — | ghost token `--color-black-400` #2e3238 |
| Pricing plan name (`pricing.html`): `<h3 class="text-2xl text-secondary-foreground">` | inter | 1.5rem | 500 | 1.875rem | -.01em | `--color-black-300` #232529 |
| Pricing h1 (`pricing.html`): `text-heading-responsive-lg` | interDisplay | 2.5rem → 3.5rem @992px | 600 | 2.75rem → 3.75rem | -.01em → -.015em | inherit |
| Workflows subhead (`platform-workflows.html`): `text-lg text-s…` (text-lg token) | inter | 1.125rem | 500 | 1.5rem | -.01em | (truncated class; could not verify color) |

## 3. Color palette

All hex values verbatim from the `@layer theme :root` block, `css/1323anb_tvnwu.css` (the file also ships a parallel `lab()` block under `@supports (color:lab(0% 0 0))`).

Primitives:
- Blue: `--color-blue-100 #e8f0ff`, `200 #c8dcff`, `300 #94b9ff`, `400 #709ff5`, `450 #538bf3`, `500 #266df0` (brand blue), `600 #245bc2`, `800 #1a2233`
- Black scale (warm-grey darks): `0 #000`, `50 #101010`, `100 #1c1d1f`, `200 #202124`, `300 #232529`, `400 #2e3238`, `500 #383e47`, `600 #505967`, `700 #6f7988`, `800 #8f99a8`, `900 #a4adba`
- White scale (cool light greys): `100 #fff`, `200 #fafafb`, `300 #f3f4f6`, `400 #edeff3`, `500 #e4e7ec`, `600 #dee2e7`, `700 #d3d8df`, `800 #cad0d9`, `900 #b5bdc9`
- Green `500 #0fc27b`, `600 #0db472`; Red `500 #ff5b59`, `600 #f65351`; Yellow `500 #f5b900`, `600 #dba601`
- Changelog tags: design `#00b5e6`, feature `#72a4fb`, enhancement `#ab92f1`

Semantic aliases — light theme (`:root` block, `css/1323anb_tvnwu.css`):
- primary-background → white-100 `#fff`; secondary-background → white-200 `#fafafb`; surface → white-400 `#edeff3`; surface-subtle → white-300
- Strokes: weak → white-400 `#edeff3`; subtle → white-500 `#e4e7ec`; default → white-700 `#d3d8df`; strong → white-800 `#cad0d9`; accent-stroke → blue-400
- Foregrounds: primary → black-100 `#1c1d1f`; secondary → black-300 `#232529`; tertiary → black-600 `#505967`; accent → black-700 `#6f7988`; caption → black-900 `#a4adba`; disabled → white-700
- Links: blue-500 `#266df0`, strong blue-600 `#245bc2`. Focus ring: `#266df04d` (blue-500 at 30% via color-mix when supported).

Dark theme (`.dark` block, same file): primary-background → black-50 `#101010`; secondary-background → black-100; primary-foreground → white-100; secondary → white-400; subtle-stroke → black-400; default-stroke → black-700; link → blue-400; focus ring `#709ff599`.

## 4. Spacing / radius / shadow / misc tokens

From the `@layer theme :root` block, `css/1323anb_tvnwu.css`:

- **Spacing base**: `--spacing:.25rem` — every `p-*/m-*/h-*/gap-*` utility is `calc(var(--spacing) * N)`.
- **Radii**: `--radius-xs .125rem`, `sm .25rem`, `md .375rem`, `lg .5rem`, `xl .75rem`, `2xl 1rem`, `3xl 1.25rem`. Heavily used arbitrary values in markup: `rounded-[10px]` (buttons, inputs), `rounded-[13px]` (browser-frame card, badge).
- **Shadows** (the signature layered set, same file):
  - `--shadow-attio-layer-1: 0px 1px 3px 0px #00000003`
  - `--shadow-attio-layer-2: 0px 2px 4px -1px #00000005`
  - `--shadow-attio-layer-3: 0px 4px 8px -2px #00000008`
  - `--shadow-attio-layer-4: 0px 8px 16px -4px #0000000a`
  - `--shadow-attio-layer-5: 0px 16px 32px -8px #0000000d`
  - `--shadow-attio-layer-6: 0px 32px 64px -16px #0000000f`
  - `--shadow-attio-layer-7: 0px 64px 128px -32px #00000012`
  - Utilities `.shadow-attio-2 … .shadow-attio-7` stack layers 1..N cumulatively (e.g. `.shadow-attio-5` = layers 1+2+3+4+5). Note the tiny alphas: 1–7%.
  - `.shadow-attio-product-e1{box-shadow:0 1px 3px #0000000a,0 0 2px #1c28402e}` — used on in-page product UI cards.
- **Blur**: `--blur-xs 4px`, `md 12px`, `lg 16px`, `xl 24px`.
- **Containers**: `--container-xs 20rem` … `--container-7xl 80rem`. `--breakpoint-lg:992px`. `--aspect-golden:1.618`.
- **Weights/tracking/leading tokens**: `--font-weight-light 300 … bold 700`; `--tracking-tighter -.05em … wider .05em`; `--leading-tight 1.25`, `--leading-relaxed 1.625`.
- **Z-index scale** (`:root`, same file): site-header 92, navigation-menu 93, dialog overlay/content 100/101, context-menu 200–202, style-overlay 999.

## 5. Component recipes

**Primary button** (markup in `home.html`; tokens in `css/0_aivuqf~udyo.css`; utilities in `css/1323anb_tvnwu.css`):
- Box (md size): `h-9` (36px) `px-3` (12px) `gap-x-1.5` `rounded-[10px]` `text-sm` (14px/1.25rem, wt 500, -.005em) `border`; icon-side padding drops to `pr-2/pl-2` via `has-[>svg]` selectors.
- Large size (mobile CTAs): `h-11.5` (46px) `px-3.5` (14px) `rounded-xl` (12px) `text-base`. Small: `h-8` (32px) `px-2.5` `text-xs`.
- Surface: `background-image:radial-gradient(at center -10%, var(--button-primary-bg-from) 0%, var(--button-primary-bg-to) 100%)` — a subtle top-lit radial. Light theme values: bg from/to `--color-black-200` #202124, border `--color-black-600` #505967, text `--color-white-300` #f3f4f6. Hover: from becomes black-600 (lightens the top), text → white. Active: both stops black-500. Disabled: bg/border white-900, text white-100. (Safari fallback: flat `background-color` via `@supports (-webkit-hyphens:none)`.)
- Transition: `transition-colors duration-300 ease-in-out hover:duration-50 active:duration-50` — slow ease-out to rest, 50ms snap on interaction. Registered `@property` for the two gradient stops so the gradient itself animates.

**Outline (secondary) button** (`css/0_aivuqf~udyo.css`): bg white-100, border white-800 #cad0d9, text black-400 #2e3238; hover border → black-700 (bg unchanged); active bg white-300 + border black-500; disabled border white-500, text white-800. Same size/radius classes as primary. A `.blue` scope re-themes it: bg blue-500, border blue-400, text white-400, active bg blue-450.

**Ghost button / nav link** (`css/0_aivuqf~udyo.css`): transparent bg, text black-400; hover bg white-300 + text black-300; active bg white-400 + text black-200; disabled text white-900. Nav triggers use it at `h-9 px-3 rounded-[10px] text-[15px]` (`home.html`).

**Input** (newsletter, `home.html` + utilities in `css/1323anb_tvnwu.css`): `rounded-[10px] bg-primary-background p-[10px_13px]` (`padding:10px 13px`), `border border-default-stroke` (#d3d8df), text `text-secondary-foreground`, placeholder `text-accent-foreground`; hover `shadow-[0px_1px_4px_rgba(56,_62,_71,_0.1)]`; focus `border-blue-500` + `ring-[3px]` with `ring-blue-300` (#94b9ff); `transition-all duration-300 ease-out`.

**Pricing card** (`pricing.html`): `rounded-3xl` (1.25rem) `border border-subtle-stroke` (#e4e7ec) `px-[23px] pt-[21px] pb-[23px]` with `shadow-[0px_1px_2px_-1px_rgba(28,_40,_64,_0.08),_0px_2px_4px_0px_rgba(28,_40,_64,_0.04)]`. Plan name `text-2xl text-secondary-foreground`; price meta `text-accent-foreground text-xs`. Card corners are decorated with 7×7px plus-sign crosses built from two 1px `bg-muted-strong-background` bars, fading in at 1000ms.

**Billing toggle** (`pricing.html`): pill buttons `rounded-[10px] px-5 py-2 text-sm transition-colors duration-500 ease-emphasized-in-out`; sliding thumb `bg-…background … duration-500` with `shadow-[0px_4px_4px_-2px_rgba(24,_39,_75,_0.06),_0px_2px_4px_-2px_rgba(24,_39,_75,_0.02),0px_0px_2px_0px_#E0E0E0]`.

**Hero "browser" card** (`home.html`): `h-[460px] rounded-t-[13px] border border-subtle-stroke border-b-0 bg-primary-background shadow-attio-5`.

**Floating glass side-cards in hero** (`home.html`): `rounded-lg p-[3px] backdrop-blur-md bg-white-300/80` (lg: `rounded-2xl p-1.5`); dark variant `bg-black-0/80`. `.backdrop-blur-md` = `blur(var(--blur-md))` = 12px.

**Badge/eyebrow** (`platform-workflows.html`): `rounded-[13px] border border-weak-stroke bg-primary-background px-3 py-1.5 font-medium text-[13px]/[1.4em] text-secondary-foreground` (contains the page's real `<h1>`).

**Nav bar** (`home.html` + `:root` vars in `css/1323anb_tvnwu.css`): `<header class="border-subtle-stroke border-b bg-primary-background/95 transition-colors duration-250 dark:bg-primary-background">`; `bg-primary-background/95` resolves to `color-mix(in oklab, … 95%, transparent)`. Height tokens: `--site-header-nav-height:52px`, `68px` at `min-width:992px`; optional banner 48px, toolbar 36px, mobile subheader 63px, summed into `--site-header-height`. Inner nav padding: `pt-2 pb-[7px] lg:pt-4 lg:pb-[15px]`. No backdrop-blur on the header itself (blur is used on hero glass cards).

## 6. Layout

- **`.container`** (`css/1323anb_tvnwu.css`, second definition wins): `width:100%; max-width:100%; padding-inline:calc(var(--spacing)*6)` (24px; 16px below 375px); `margin-inline:auto`; max-width `var(--container-md)` (28rem) ≥375px, `calc(var(--spacing)*156)` (39rem/624px) ≥768px, `calc(var(--spacing)*360)` (**90rem/1440px**) ≥992px. Homepage also uses `xl:max-w-360 xl:px-6` (1440px cap) directly.
- **Grid**: product pages use `container … grid grid-cols-12 gap-x-6 gap-y-30 lg:gap-y-38` (`platform-workflows.html`); homepage sections use `lg:grid-cols-subgrid`, `lg:col-[1/7]` splits.
- **Section rhythm** (`home.html`): full-bleed `<section>`s separated by `border-subtle-stroke border-b/t`, alternating `bg-primary-background` / `bg-secondary-background`, with periodic `dark` sections. Hero section: `px-6 pb-18 pt-38 md:px-14 md:pb-28 max-xl:pt-28 max-lg:pt-22` → e.g. pt 152px desktop, pb 72→112px (all `calc(var(--spacing)*N)`).
- Page headers on product pages: `pt-30 pb-15 max-xl:pt-25 max-lg:pt-20` (`platform-workflows.html`).
- Breakpoints observed in the CSS: 375, 576, 768, 992 (the canonical `--breakpoint-lg`), 1200, 1536.

## 7. Motion

Tokens (`@layer theme :root`, `css/1323anb_tvnwu.css`):
- `--default-transition-duration:.15s`; `--default-transition-timing-function:cubic-bezier(.4,0,.2,1)`
- Named easings: `--ease-in:cubic-bezier(.3,0,1,1)`, `--ease-out:cubic-bezier(0,0,0,1)`, `--ease-reveal:cubic-bezier(0,0,.58,1)`, `--ease-in-out:cubic-bezier(.2,0,0,1)`, `--ease-in-cubic:cubic-bezier(.32,0,.67,0)`, `--ease-out-cubic:cubic-bezier(.33,1,.68,1)`, `--ease-in-out-cubic:cubic-bezier(.65,0,.35,1)`, `--ease-in-out-quad:cubic-bezier(.45,.05,.55,.95)`, `--ease-in-out-expo:cubic-bezier(1,0,0,1)`, `--ease-emphasized-in-out:cubic-bezier(.2,0,0,1)`
- Animation tokens: nav panel slide `.2s ease-in-out-cubic` (`navigation-enter-from-right` etc.: `opacity:0; filter:blur(8px); translate ±200px` → identity — the blur-in is a house signature; hero h1 also starts at `filter:blur(1.5px); opacity:0` via inline style). Dialogs: `dialog-scale-in/out .2s ease-in-out-quad` (`scale(.96)`+fade). Accordions: `slideDown/Up`, `collapsibleSlideDown/Up .3s cubic-bezier(.65,0,.35,1)` animating to `var(--radix-accordion-content-height)`. `search-shine 1s ease-in-out infinite` (translate -100%→200%), `caret-blink .5s`, `spin 1s linear`, `pulse 2s cubic-bezier(.4,0,.6,1)`.
- Buttons: `duration-300 ease-in-out` at rest, `hover:duration-50 active:duration-50`.
- Reduced motion: `@media (prefers-reduced-motion:reduce)` swaps nav slides for `navigation-fade-in/out .1s ease-out-cubic`.
- Decorative: conic-gradient AI border spinning 30s linear (`css/0novd3638rqgx.css`, palette stops `#fd9038 #f5b900 #ff5b59 #266df0 #13dd8d`); workflows card conic progress ring in green #0fc27b (`css/116sc1td222yh.css`); scroll-edge mask fades `.22s` (`css/0e_v2r2_dpmmy.css`).

## 8. Qualitative notes (not measured — impressions from the fetched markup)

- The "product screenshots" are not images: the homepage rebuilds miniature product UI in live DOM at tiny type sizes (`text-[5px] lg:text-[10px]`), inside browser-chrome frames with the attio shadow stack. 0 `<video>` tags, 1 `<canvas>`, few inline SVGs on the homepage.
- Overall look: white/near-white surfaces separated by hairline borders rather than gaps; whole sections delimited by 1px `subtle-stroke` borders; shadows are extremely faint (1–7% alpha) and layered for realism rather than drama.
- Editorial voice: giant tight Inter Display headlines (hero copy "Welcome to agentic revenue."), with Tiempos Text serif reserved for quote-like emphasis lines and italic spans — a serif-as-punctuation pattern.
- Color restraint: essentially monochrome greys + one brand blue (#266df0); green/red/yellow appear only as status colors; the rainbow conic gradient is reserved for AI features.
- Dark sections are used as chapter breaks (class `dark` re-themes semantic tokens); the "Universal Context" section headline scales to 96px.
- Detail flourishes: plus-sign corner ticks on pricing cards, dot-grid PNG backgrounds, golden-ratio aspect token, blur-in entrances everywhere.

## 9. Could not be verified

- Rendered/computed styles (this is a static fetch; no browser). Anything dependent on JS runtime state — e.g. the hero h1's final animated state, scroll-linked values — only initial inline styles are quoted.
- The workflows-page subhead text color (class attribute truncated in extraction: `text-lg text-s…`).
- Font foundry/licensing beyond what file names state (`tiempos_text_*`, `inter_*`, `inter_display_*`, JetBrains Mono subsets); the files are subset/renamed hashes, and I did not parse the font binaries' name tables.
- Whether the marketing `.dark` tokens match the actual Attio app product; only attio.com marketing CSS was fetched.
- Exact usage location of `.shadow-attio-6/-7` utilities (defined in CSS; only `shadow-attio-2` and `shadow-attio-5` appear in the fetched homepage HTML).
