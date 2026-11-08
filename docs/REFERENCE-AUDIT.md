# ORVENA reference audit

Source: https://orvena.framer.website/ — inspected 8 Nov 2026 with Playwright at 1440×900, 1024×1366 and 390×844,
with computed-style extraction of every text node and every rounded element. All figures below are measured,
not estimated, unless marked *(observed)*.

## 1. Site map

| Route | Purpose |
|---|---|
| `/` | Home |
| `/work` | Project index with category filter chips |
| `/work/[slug]` | Case study (4 projects) |
| `/studio` | About the studio |
| `/services` | Services, engagement types, pricing note |
| `/journal` | Journal index (featured article + filtered grid) |
| `/journal/[slug]` | Article |
| `/contact` | Contact details card + project inquiry form |

## 2. Breakpoints

Framer defaults: **desktop ≥ 1200px**, **tablet 810–1199px**, **mobile < 810px**.
Hamburger menu below 1200px. Mobile menu is a full-width sheet: large 36px links with right-aligned `01`–`05`
indices and hairline dividers; close button is a 40px yellow circle.

## 3. Colour tokens

| Token | Value | Use |
|---|---|---|
| cream | `#F4F1EA` | Page background |
| sand | `#EAE4D8` | Eyebrow pills, secondary buttons |
| sand-deep | `#DCD3C3` | Card shadow-plate behind project cards |
| ink | `#111218` | Text, primary buttons |
| night | `#151729` | Dark sections, footer |
| night-card | `#1D1E2A` | Project card frame, dark cards |
| night-raised | `#20233A` | Image wells on dark |
| indigo | `#2B1A73` | Lilac-section text, indigo service card |
| lilac | `#C8B6FF` | Highlight pill, services band, CTA panel, buttons |
| yellow | `#FFDD4A` | Accents, numbers on dark, hover state of dark buttons |
| orange | `#FF5B1F` | Marquee separators, status dot, logo asterisk |
| slate | `#3D3F49` | Body copy on cream |
| grey | `#858792` | Meta text |
| cream-56 / 86 | `rgba(244,241,234,.56/.86)` | Secondary text on dark |

## 4. Typography

Fonts: **Host Grotesk** (400/500) for everything; **Archivo 900** for the wordmark and big numerals.
Both are on Google Fonts and used directly.

| Role | Size / line-height | Tracking |
|---|---|---|
| Hero H1 | 84 / 84 | −4.2px (−0.05em) |
| Section-word (sticky list) | 88 / 91.5 | −4.4px |
| Display H2 | 72 / 73.4 | −3.24px |
| Section H2 | 56 / 58.2 | −2.35px |
| Testimonial quote | 46 / 52.4 | −1.61px |
| Medium H2 / footer statement | 40 / 46.4 and 36 / 39.6 | −1.4 / −1.26px |
| Card title (service) | 36 / 39.6 | −1.26px |
| Card title (project/article) | 26 / 29.9 | −0.78px |
| Lead | 19 / 27.55 | −0.285px |
| Body | 16 / 24.8 | −0.128px |
| Button / nav | 16 / 16, weight 500 | −0.24px |
| Pill | 17 / 18.7, weight 500 | −0.34px |
| Meta | 14 / 20.3 | −0.07px |
| Micro caps label | 13 / 16.9, weight 500, uppercase | — |
| Big numerals | Archivo 900, 120 / 108 (−6.6px) and 64 / 57.6 (−3.2px) | |

## 5. Layout

- Container: full width with **64px side gutters** at 1440 (content 1312px). Tablet 32px, mobile 16px *(observed)*.
- Two faint vertical guide lines at `50% ± 278px` run through the hero and the approach section.
- Header: 86px tall, `rgba(244,241,234,.86)` with backdrop blur, sticky; logo left, centred nav, dark pill CTA right.
- Marquee bands sit on the boundary between a cream and a dark section: a cream strip with concave
  "shoulders" curving down into the dark section (the dark section's top corners are notched).

## 6. Components

- **Button**: pill, radius 100, padding `17 24 17 26`, height 50, label + three 5px dots.
  Variants: dark (`ink` → hover `yellow` with ink text), lilac, sand, outline-on-dark, yellow.
  Dots animate (sequential opacity) on hover.
- **Pill / eyebrow**: radius 100, padding `10 18`, 17px/500.
- **Project card**: `night-card` frame, radius 30, padding 10; image well radius 22, aspect ≈ 622×460;
  category pill top-right of image; title 26px + 14px description; lilac "View project" pill bottom-right.
  A `sand-deep` plate sits behind each card and is revealed as the card lifts on hover.
- **Service card**: radius 26, padding `28 28 30`; Archivo 64 numeral top-left, 74px circular image top-right,
  36px title + 16px copy at bottom; 2×2 grid, the cards enter slightly rotated and settle.
- **Process card**: radius 24, 4-up, 351×446; graphic or photo fill; pill label `01 / Discover` + 19px/500 copy.
- **Article card**: white, radius 28, padding `10 10 24`; image radius 20 at 401×270; category pill on image.
- **CTA panel**: lilac, radius 40, padding `88 64 64`, inset 110px each side at 1440;
  72px indigo heading, 104px cream star badge, avatar cluster + dark pill label, two buttons.
- **Footer**: night; marquee strip on top; two-column intro (logo + 112px lilac star disc | 36px statement + email
  + avatars) with a vertical divider; three link columns; giant Archivo wordmark at the bottom with three coloured
  pills that drop onto it with physics.

## 7. Home page section order (desktop heights)

1. Hero — 975px. Eyebrow pill + status line, hairline, 84px headline with inline lilac highlight, avatar trio and
   yellow dot-pill; lead copy; two buttons; right: three tilted phone-ratio cards (radius 28, padding 8) with a
   rotating circular text badge and a yellow "Featured" pill.
2. Marquee (services).
3. Dark — 1287px. Top micro labels; **sticky list** of four 88px words, the active word full-opacity with a
   yellow index, inactive words at 16% opacity and blurred; active numeral (yellow, 44px) at left; image card at
   right swaps per word with a floating lilac pill. Below: 604×508 orange image + "Good work starts with a clear
   point of view." (56px) + lead + outline button.
4. Selected work — 1875px. Eyebrow, 56px H2, lead, 112px lilac star disc; 2×2 project cards; "View all" button.
5. Services — lilac, 1353px. Eyebrow, 56px indigo H2, cream star disc; left: avatar cluster + pill, Archivo 120
   numeral, caption; right: 2×2 service cards.
6. Approach — 1111px. Spinning star, eyebrow, centred 40px H2, lead, four process cards.
7. Marquee (values) → dark studio snapshot — 1274px. 72px H2, lead, yellow button; right: numbered list with
   hairlines and lilac star glyphs. Hairline, then testimonial: tilted photo on lilac plate + yellow pill,
   yellow star, 46px quote, avatar + name.
8. Journal — 946px. Eyebrow, 36px H2, sand button right; three article cards.
9. CTA panel.
10. Footer.

## 8. Motion (observed)

- Load: nav/eyebrows present immediately; headline words rise from below with blur (≈0.6s each, staggered);
  hero cards slide in from the right; total ≈ 2s.
- Scroll: section headings reveal word-by-word (y + opacity + blur). Cards fade/rise in groups.
- Sticky word list scrubs with scroll; inactive words blur.
- Marquees loop continuously (≈40s per cycle).
- Hover: dark buttons turn yellow; dots animate; project cards lift; nav links dim siblings.
- Footer pills drop with bounce/rotation when the footer enters.
- No custom cursor and no page-transition overlay on the reference (Framer cross-fade only).

## 9. Adaptation rules for Techatron

- Keep structure, tokens, type scale, spacing and component geometry exactly.
- Replace stock portraits with Techatron's own project imagery (no invented people, testimonials or metrics).
- Testimonial slot becomes a statement of Techatron's own conviction, attributed to Techatron.
- Animation upgrades (all `transform`/`opacity`/`clip-path`, all disabled under `prefers-reduced-motion`):
  clip-path page transitions, masked line reveals, image clip/scale reveals, magnetic buttons, pointer-tilt hero
  cards, a contextual cursor label on project cards (fine pointers only), Lenis smooth scrolling.
