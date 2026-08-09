# SLICES.md — orisan-site build order

One slice per PR. Do the slice, stop at its boundary, open the PR. Do not start the
next slice because it seemed related. Every slice must pass `npm run gates`.

Tier per the Orisan agent operating model. Tier A may run unattended on green.
Tier B is attended. Anything touching a public claim is human-gated.

---

## Slice 0 — Foundations  ·  Tier A
Rip out the parked v0.1 styling and install the design system.

- Replace `tailwind.config.ts` with the provided file. Replacement, not extension.
- Load fonts with `next/font/google` in `app/layout.tsx`: Newsreader (variable, opsz
  auto), JetBrains Mono, Fraunces. Expose as `--font-newsreader`, `--font-jetbrains`,
  `--font-fraunces`. Self-hosted, `display: swap`.
- `app/globals.css`: reset, paper background, base type, the SVG paper-grain overlay
  (data URI feTurbulence, `position: fixed`, `pointer-events: none`, multiply blend),
  visible focus ring in `suspicion`, `prefers-reduced-motion` block.
- Install and wire `eslint-plugin-tailwindcss`, Playwright, Lighthouse CI.
- Add `npm run gates` and `npm run baseline` scripts.

**Acceptance:** `npm run gates` passes on a page containing only an `h1`. Deliberately
writing `className="bg-blue-500 rounded-2xl shadow-lg p-[13px]"` fails the build with
four distinct errors. Screenshot that failure in the PR description.

---

## Slice 1 — Layout shell + the three signature components  ·  Tier A
- `components/StopRule.tsx` — solid `ink` bar, `h-14` full-bleed variant and `h-2`
  `grey-1` thin variant. One `animate-drop` on first paint. Never on scroll.
- `components/MarginRail.tsx` — two-column grid, `190px` rail on `lg` and up,
  collapses to a left-bordered block below. Marginalia in `font-alt` italic,
  right-aligned on desktop.
- `components/GradeStamp.tsx` — circular stamp, grade A-F, colour bound to meaning
  (A `holding`, D `suspicion`, F `harm`), −8deg rotation, double-ring.
- `components/Label.tsx` — mono, uppercase, `tracking-label`, `grey-2`.
- `components/Section.tsx` — vertical rhythm primitive. All spacing comes from here.

**Acceptance:** a components page renders all five at three viewports. Visual baselines
approved by a human. No component accepts a `className` prop that could override tokens.

---

## Slice 2 — Hero  ·  Tier B (copy is a public claim)
Stop rule, mono kicker, `text-3xl` headline at `max-w-hero`, lede at `max-w-lede`,
one primary link. No hero video yet, no image yet. Structure only.

**Acceptance:** reads as finished with zero media. That is the test. If it needs an
image to look complete, the layout is wrong and media is covering for it.

---

## Slice 3 — mcpscan section  ·  HUMAN-GATED
The only shipped tool, so the only organ the site may lead with.

- What it kills, in the user's words, not the category's.
- Real terminal output in a `<pre>` block. **Real, copied from an actual run.**
  Never invented, never prettified, never edited to look better.
- Install command. **Verify against the live PyPI package before writing it.** As of
  the last check the package is `orisan-mcpscan` and the command is
  `uvx orisan-mcpscan`, not `mcpscan`. Confirm, do not trust this line.
- Grade stamps used here and only here.

**Acceptance:** every claim has a row in `CLAIMS.md` with a verification source. A
human has run the install command from a clean environment and confirmed the page's
description matches what actually happened.

**Blocked on:** mcpscan 0.1.1. Three confirmed defects make the current published
behaviour different from what any honest page would describe. Do not write this
section against 0.1.0.

---

## Slice 4 — Catastrophe spine + media  ·  Tier B
Margin rail sections carrying the historical and literary references. This is where
the generated stills and video land.

- Poster still is required and ships first. Video is added after the section is
  approved without it.
- `<video autoplay muted loop playsinline preload="none">` with WebM + MP4 sources
  and a poster. IntersectionObserver starts playback. Hidden under reduced motion,
  poster shown instead.
- Every historical reference needs a source in `CLAIMS.md`. The reactor
  axe-man backronym is disputed folklore — use the imagery, do not assert the etymology.

**Acceptance:** the no-video Playwright test passes and the page still looks finished.
Media budget holds. Reduced-motion path verified by hand.

- **Per-asset inspection record in the PR.** This applies to any slice that commits
  media, not just this one. For every asset: who looked at it, at full size,
  confirming all four corners are clean. One line per asset, named individually — a
  blanket "inspected the media" is not a record.
- Deliberately no CI check on that record. The record is automatable; the looking is
  not, and a gate on the record alone would certify inspections nobody did.

---

## Slice 5 — Proof  ·  HUMAN-GATED
A real asciinema recording of a real scan against a real MCP server. Not generated,
not re-enacted. Self-hosted player or a static SVG cast, no third-party embed.

---

## Slice 6 — Contact, metadata, edges  ·  Tier A
Contact route (credibility and contact, not sales). Full favicon set, OG image
(1200×630, type set in HTML or Figma, never generated), `sitemap.ts`, `robots.ts`,
404 and 500 pages in the same design system.

**Acceptance:** OG card renders correctly in a real validator. 404 does not look like
a different website.

- Delete `continue-on-error: true` from the budget job in
  .github/workflows/gates.yml. The advisory period ends here.

---

## Slice 7 — Final pass  ·  Tier B → human sign-off
Lighthouse 100 accessibility. Keyboard-only walkthrough. Screen reader pass on the
hero and mcpscan sections. Every `CLAIMS.md` row re-verified against live sources on
the day of launch, not on the day it was written.

---

## Standing blockers
1. **mcpscan 0.1.1 ships before this site does.** The site's install command is a
   public claim and it currently fails for most users.
2. **`README.md` in this repo is stale.** It says no package manager distribution is
   configured. The package has been on PyPI since 2026-07-10. That is a false public
   claim living in a public repo right now. Fix it independently of this build, today.
