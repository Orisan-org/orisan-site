# CLAUDE.md — orisan-site

Read this before every task in this repo. These are non-negotiables, not preferences.
If a request conflicts with this file, stop and say so instead of complying.

---

## What this site is

The public front door for Orisan. Audience is AppSec engineers, security leads, and
developers who run AI agents. They are professionally skeptical and they discount
marketing gloss. The site's job is credibility and contact, not sales.

Lead with the acute present pain a tool kills. Never lead with a category label.

---

## THE HARD RULE: every public claim must be true

Overstated public work is negative credibility to a security buyer. This is the
project's highest-severity rule and it outranks deadlines.

- Every factual assertion on the site is listed in `CLAIMS.md` with the source that
  verifies it. No claim ships without a row in that file.
- Never write a claim you inferred. If you are not certain, mark it `UNVERIFIED` in
  `CLAIMS.md` and leave it out of the page.
- Never describe a capability as working that you have not seen work.
- Version numbers, test counts, install commands, and supported-platform lists are
  claims. They rot. Check them against the live package and repo, not against
  documentation in this repo.

---

## Design system: replace, do not extend

`tailwind.config.ts` **replaces** the Tailwind theme. This is deliberate. The default
palette, radius scale, shadow scale, and font stack are deleted so that generic
utility classes do not exist.

- You may only use design tokens defined in `tailwind.config.ts`.
- **Arbitrary values are banned.** No `bg-[#fff]`, no `p-[13px]`, no `rounded-[12px]`,
  no `text-[15px]`. ESLint fails the build on these. They are the escape hatch that
  destroys design systems, which is exactly why they are closed.
- If you need a value that does not exist, that is a design decision. Stop and ask.
  Do not invent it.

### Banned outright
Gradients. Box shadows. Border radius other than `none`, `sm` (2px), and `full`
(circles only). Any sans-serif, including Inter. Emoji. Icon libraries. Centered body
copy. Glassmorphism, backdrop blur. Scroll-triggered fade-ins. Anything that pulses,
floats, or bounces. Dark mode (not in v1, do not add it speculatively).

### Required
- **Type:** `font-display` (Newsreader) and `font-mono` (JetBrains Mono) only.
  `font-alt` (Fraunces) for the drop cap and marginalia only. There is no sans on
  this site.
- **Mono is reserved** for the product's own vocabulary: check IDs, grades, findings,
  commands, file paths. Never decorative.
- **Measure:** body copy capped at 62ch. Use `max-w-measure`.
- **Spacing:** only the named scale. Nothing between steps, ever.
- **Accent colour carries meaning:** `harm` (rose), `holding` (sage), `watching`
  (sky), `suspicion` (ochre). Never pick an accent for looks. Accent never exceeds
  ~10% of a viewport.

### The signature
Three devices, used consistently, defined in `components/`:
1. **Stop rule** — a solid `ink` bar that snaps to full width at section boundaries.
   Structural, not decorative. It is the page's spine.
2. **Margin rail** — editorial marginalia in the left rail carrying the historical and
   literary references. Right-aligned on desktop, left-bordered on mobile.
3. **Grade stamp** — the A-to-F mark from mcpscan's own output. Only appears where
   real product output is being shown. Never as decoration.

---

## Media rules

- **Poster first, video second.** Every video has a required `poster` still. The page
  must be complete and good-looking with video disabled entirely. Build and review
  every section in that state before wiring video.
- No text, letters, or logos inside any image or video. All type is HTML.
- Autoplay media is `muted loop playsinline preload="none"`, started by an
  IntersectionObserver, and hidden entirely under `prefers-reduced-motion: reduce`
  with the poster shown instead.
- Budget: hero media under 2 MB, section clips under 800 KB, page HTML+CSS+JS under
  400 KB.
- Never generate or fake product footage. Product demos are real terminal recordings
  only (asciinema + agg, or clean screen capture).

---

## Accessibility

Non-negotiable, gated in CI at 100.
- Every image gets alt text describing the drawing, not the metaphor. Decorative
  media gets `alt=""` and `aria-hidden`.
- Visible focus states on every interactive element. Never `outline: none`.
- Semantic landmarks and one `h1` per page. Heading levels never skip.
- Contrast: body text against paper must be at least 7:1. Do not use `grey-3` for
  text, it is a border colour.

---

## How to work in this repo

- **One slice per PR.** Slices are defined in `SLICES.md` with acceptance criteria.
  Do the slice, stop at its boundary, open the PR. Do not do the next slice because
  it seemed related.
- Every PR must pass `npm run gates` locally before you open it.
- Do not modify `tailwind.config.ts`, `CLAIMS.md`, `.eslintrc.json`, or anything in
  `.github/workflows/` as part of a feature slice. Changing a gate to make your work
  pass is a process defect, not a fix. If a gate is wrong, say so and stop.
- Visual regression baselines in `tests/__screenshots__/` are approved artefacts.
  Never regenerate them to make a test pass. If a diff is intended, say what changed
  and why, and let a human approve the new baseline.
- Copy is human-gated. Draft it, never publish it. Publishing is a founder decision.

## Commands
```
npm run dev      # local
npm run gates    # lint + types + a11y + visual regression. Must pass before PR.
npm run baseline # regenerate visual baselines. HUMAN ONLY. Never run this yourself.
```
