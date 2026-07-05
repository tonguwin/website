# CLAUDE.md

Personal website for Todd Nguyen, live at **https://todnguyen.com**. Astro 4 + Tailwind, no client-side framework (no React/Vue — all interactivity is vanilla JS in `<script>` tags inside .astro files).

## Commands

- `npm run dev` — dev server at http://localhost:4321
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the built site locally

## Deploy — IMPORTANT

Netlify builds and publishes **production** automatically on every push to `main`. There is no staging environment. Never push without the user's go-ahead; verify with `npm run build` locally first. Netlify's build environment is case-sensitive — keep asset filenames lowercase and make sure references match exactly.

## Routes

| Route | File | Notes |
|---|---|---|
| `/` | `src/pages/index.astro` | Landing: Hero, Intro, Projects, FeaturedWork (Testimonials exists but is commented out) |
| `/gallery` | `src/pages/gallery.astro` | Interactive gallery; content comes from `public/gallery/` folders (see below) |
| `/toon-support` | `src/pages/toon-support.astro` | Intentionally unlinked — shared by URL only. Do not "clean up" as dead code |
| `/blog/the-attic` | `src/pages/blog/the-attic.astro` | Blog index (terminal UI); links to all posts |
| `/blog/welcome` | `src/pages/blog/welcome.astro` | Blog post |
| `/blog/a-maze`, `/blog/jumpboy`, `/blog/calcifer` | `src/pages/blog/*.astro` | Interactive canvas games/toys as blog entries |
| `/blog/cooking-guide` | `src/pages/blog/cooking-guide.astro` | Recipes — uses RecipesLayout, not BaseLayout |
| `/case-study/accessories-copper` | `src/pages/case-study/accessories-copper.astro` | Work case study; uses images from `public/favicons/` |

**Convention: files prefixed with `_` are drafts/scratch versions** (e.g. `_gallery-test.astro`, `_index-test.astro`). Astro excludes them from routing. Keep experiments there instead of creating live routes.

## Architecture

### Theme system (the core shared machinery)
- `src/layouts/BaseLayout.astro` holds the theme JS: sets `data-theme` on `<html>`, persists to localStorage. Modes: light, dark, earth (time-of-day based, re-checked every minute), random (curated palettes).
- `src/styles/global.css` defines the CSS variables (`--color-primary`, `--color-secondary` as RGB triples) per `data-theme` value.
- `tailwind.config.cjs` maps those variables to the `primary`/`secondary` Tailwind colors — so components use `bg-primary`, `text-secondary`, or `rgb(var(--color-primary))` in raw CSS.
- BaseLayout also carries sitewide extras: the Calcifer companion, selection-glitch effect, earth-mode canvas particles, AOS scroll animations, and mailgo.

### Pages own their chrome
There is **no shared nav/header**. Each page implements its own back/home link (Gastly sprite on blog pages, Larvitar footer on gallery, inline links elsewhere). Blog pages import `HauntedCursor`; the landing page and case studies import `SubtleCursor`. Both cursors skip touch devices and `prefers-reduced-motion`, and pause their loops when the tab is hidden — preserve that if you touch them.

### Gallery is folder-driven
`src/pages/gallery.astro` reads `public/gallery/{jpg,png,mp4,books}/` with `readdirSync` **at build time**:
- The folder name is the gallery category — adding a file to a folder adds it to the gallery; moving a file between folders changes its category.
- Filename (minus extension) becomes the display name.
- Card size/rotation/delay are `Math.random()` in frontmatter → baked in per build, not per visit.
- The `mp4` folder regex matches `.mp4|.webm|.mov` — don't leave both an original and a converted copy of the same video or it appears twice.

### Data files
- `src/data/features.json.ts` → consumed by `landing/FeaturedWork.astro`
- `src/data/otherprojects.json.ts` → consumed by `landing/Intro.astro`
- `landing/Projects.astro` hardcodes its own array (does not use data files).

## Media rules

All gallery media is served raw from `public/` — Astro's `<Image>` optimization is not in use. Keep sources small:

- **Videos:** web-encoded H.264 MP4, target ≤ ~15 MB. Convert phone footage before committing (no ffmpeg on this machine; use built-in avconvert):
  `avconvert -p Preset1280x720 -s input.MOV -o output.mp4` — then delete the original from the folder.
- **Images:** longest edge ≤ 1600px: `sips -Z 1600 image.png`. Photos are much smaller as JPEG, but remember folder = category (a photo in `png/` must stay `.png` or move category).
- Lowercase filenames, no spaces (Netlify is case-sensitive; git on macOS hides case mismatches).
- Two ~65 MB .MOV originals from before optimization still exist in git history (backed up in `~/Desktop/website-media-originals/`); reclaiming that space would need a history rewrite — don't attempt casually.

## Known debt (candidates for the planned big update)

- Earth-mode canvas particle system in BaseLayout runs continuously while active.
- Gallery renders ~136 floating ASCII `<pre>` elements with infinite animations.
- No responsive images / `<Image>` pipeline; gallery serves one size to all devices.
- `astro.config.mjs` `site` must stay `https://todnguyen.com` (template originally shipped with lexingtonthemes.com — it drives sitemap + canonical URLs).
