# Techatron — techatronagency.com

The website of **Techatron Consulting Limited**, built to the visual specification of the ORVENA reference
(see [`docs/REFERENCE-AUDIT.md`](docs/REFERENCE-AUDIT.md)) and adapted to Techatron's brand, services and portfolio.

## Stack

- **Next.js 15** (App Router, static export) · **React 19** · **TypeScript**
- **Tailwind CSS 4** for layout utilities, plus a small component layer in `src/app/globals.css` holding the measured
  design tokens (colours, type scale, breakpoints 1200 / 810)
- **GSAP 3** (ScrollTrigger, SplitText, CustomEase) for every timeline and scroll interaction
- **Lenis** smooth scrolling (desktop, fine pointers only), driven from GSAP's ticker
- **Host Grotesk** (text), **Instrument Serif** italic (hero accent) and **Archivo 900**, self-hosted from Fontsource via `next/font/local`
- **Logo**: vector trace of the official Techatron artwork (`src/content/logo-path.ts`, `public/brand/logo*.svg`). If you have the original vector logo, replace the path there.

No other animation library is used. Everything animates `transform`, `opacity` or `clip-path`, and all motion is
disabled under `prefers-reduced-motion`.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in out/
```

## Deploy

`npm run build` produces a plain static site in `out/` that runs on any host.

- **Vercel / Netlify**: connect the repository; build command `npm run build`, output directory `out`.
- **cPanel / DirectAdmin** (the current techatronagency.com hosting): upload the *contents* of `out/` into
  `public_html/`. The included `.htaccess` (enable "show hidden files") adds HTTPS, caching, security headers, a 404
  page and 301 redirects from the old `/services/*` and `/approach` URLs.

### Environment variables (all optional, set at build time)

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_FORM_ENDPOINT` | JSON endpoint for the contact form (Formspree, Basin, a Laravel route…). Without it the form opens a pre-filled email to hello@techatronagency.com. |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 measurement ID. |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Plausible analytics domain. |

## Where things live

| What | Where |
|---|---|
| Company facts, navigation, process, convictions | `src/content/site.ts` |
| Services | `src/content/services.ts` |
| Portfolio & case studies | `src/content/projects.ts` |
| Insights articles | `src/content/articles.ts` |
| Scroll reveal system (`data-split`, `data-reveal`, `data-reveal-group`, `data-clip`, `data-parallax`) | `src/components/motion/Reveals.tsx` |
| Page transitions | `src/components/motion/PageTransition.tsx` + `src/components/TransitionLink.tsx` |
| Pinned word-list sections | `src/lib/useStickySteps.ts` |
| Project screenshots (sources) | `assets/source/` → `npm run images` → `public/images/work/` |

To add a project: drop screenshots into `assets/source/` (`<key>-c.jpg` at 1440×1065 for cards, `<key>-1/2/3.jpg` at
16:10 for the gallery, `<key>-m.jpg` for mobile), run `npm run images`, then add an entry to `src/content/projects.ts`.

## Content sources and items to review

- Operations hubs: Lagos, Nigeria and Delaware, USA, serving clients globally (`src/content/site.ts`).
- Client websites on /work: all 24 sites from the Drive doc *Portfolio / Websites* (`websites` in `src/content/projects.ts`).
  Eight could not be screenshotted and show a branded card instead: acesolvit.com, cordiantresources.com.ng and
  theebookclub.org (domains not resolving), houseontherockdublin.org (invalid SSL certificate), doowe.ng and
  neboconcept.com (Cloudflare bot check), drffat85.com (403) and goldbrooks.com (502). Add a `<key>-c.jpg` screenshot
  to `assets/source/` and an `image` key to replace any of them.
- Client logos come from techatronagency.com (`public/images/clients/`); photography from Techatron's supplied image set
  (`assets/source/photo-*.jpg`). The photos are used as general imagery and are not labelled as Techatron staff.

- Company details, services, process, convictions and standards come from techatronagency.com.
- Project descriptions come from Techatron's verified portfolio (`techatron-v2` seed data). ElectionShield, Kwoat and
  PowerNest Estate technologies come from those products' own repositories. Screenshots were captured from the live
  sites on 8 Nov 2026; ElectionShield (private) is shown as an illustration of its real interface and empty state, with
  no vote figures.
- No testimonials, metrics or results are claimed. The testimonial slot from the reference carries Techatron's own
  statement of belief.
- **Please review before launch:** the six Insights articles (written in Techatron's voice from its published
  convictions), the contact form's budget ranges, the privacy notice, and the client name shown for ElectionShield.
