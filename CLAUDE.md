# CLAUDE.md — orisan-site  (v2, AUTONOMOUS MODE)

Read this before every task in this repo. These are non-negotiables, not preferences.
If a request conflicts with this file, stop and say so instead of complying.

**This version replaces v1's human-gated workflow.** You now run the build end to
end: you create baselines, you edit gate files, you verify claims, you merge slices,
and you move to the next slice without waiting. Three narrow stop conditions remain,
listed at the bottom. Everything else is yours.

The gates did not go away. They changed from "a human holds the key" to "you may
turn the key, but every turn leaves a record that a human will read." Where v1 said
*ask*, v2 says *do it and prove it*.

---

## What this site is

The public front door for Orisan. Audience is AppSec engineers, security leads, and
developers who run AI agents. They are professionally skeptical and they discount
marketing gloss. The site's job is credibility and contact, not sales.

Lead with the acute present pain a tool kills. Never lead with a category label.

---

## THE HARD RULE: every public claim must be true

Overstated public work is negative credibility to a security buyer. This outranks
velocity, and it is the one rule autonomy does not relax.

You may now set a `CLAIMS.md` row to `VERIFIED`, but only under this discipline:

- **Verification means a live source you actually fetched in this session.** Not the
  repo's docs, not this file, not your recollection, not a value you saw earlier in
  the conversation. Fetch it now.
- **The row must carry the evidence**: the URL or command, the actual value returned,
  and today's date. A row that says `VERIFIED` without pasted evidence is a defect
  of the same severity as a false claim.
- **If you cannot fetch a live source, the row stays `UNVERIFIED` and the claim does
  not go on the page.** Cut the sentence. A shorter true page beats a longer
  impressive one.
- **Never soften a claim you cannot verify into a vaguer one.** Remove it.
- Version numbers, install commands, test counts, platform lists and performance
  figures all rot. Re-verify every row against live sources before the final PR,
  regardless of when it was last checked.

You demonstrated this discipline correctly on the PyPI README fix. That is the bar.

---

## Design system: replace, do not extend

`tailwind.config.ts` **replaces** the Tailwind theme. This is deliberate. The default
palette, radius scale, shadow scale, and font stack are deleted so that generic
utility classes do not exist.

- You may only use design tokens defined in `tailwind.config.ts`.
- **`theme()` in raw CSS is permitted only for a token that already exists.** It
  inlines a literal value at build time, so `theme("colors.foo")` for anything not
  in the config either fails the build or bakes in a colour nothing else can see.
  Enforced by `scripts/colour-allowlist.mjs`, which extracts every colour literal
  from the built CSS and requires each to be a token or a named exception with a
  reason. If you add a colour by any route — a utility, a `theme()` call, a raw
  declaration, or a dependency's stylesheet — that gate will name it.
- **Arbitrary values are banned.** No `bg-[#fff]`, no `p-[13px]`, no `rounded-[12px]`,
  no `text-[15px]`. ESLint fails the build on these.
- If you need a value that does not exist, **you may now add it** — but adding a token
  is a design decision, so it goes in its own commit with a one-line rationale, never
  buried inside a feature commit. If you find yourself adding more than two tokens in
  a slice, stop: that is a sign the design is being redesigned by accident.

### Banned outright
Gradients. Box shadows. Emoji. Icon libraries. Centered body copy. Glassmorphism,
backdrop blur. Scroll-triggered fade-ins. Anything that pulses, floats, or bounces.
Dark mode (not in v1, do not add it speculatively).

### Decision record — the design import, 2026-08-10

The design direction changed. Two bans were **released** and two of the four
animation and blur bans were **argued and held**. This is a decision, not an
erosion, and it is written down so that is legible later.

**Released, and replaced by allowlists rather than deleted:**

- *"Any sans-serif, including Inter."* Released. The design is set in Schibsted
  Grotesk; there is no version of it that is not sans.
- *"Border radius other than `none`, `sm` (2px), and `full`."* Released. The design
  is built on soft panels between 14px and 32px.

Both assertions in `tests/visual.spec.ts` were rewritten as **positive allowlists**:
`PERMITTED_FONT_FAMILIES` and `PERMITTED_RADII`. This matters more than the release
itself. The old font check was a denylist of names (`inter|helvetica|arial|system-ui`)
and had a hole — a stack of `"Some Grotesk", sans-serif` passed it while being
entirely sans-serif. The old radius check tested `> 2 && < 9999`, permitting
everything in between by accident. A denylist is only as complete as its author's
imagination. **The gate is stronger after this change than before it**, and any new
family or radius must now be added to the list deliberately.

**Held, and why:**

- **Gradients and box shadows stay banned.** The design needs neither. Its
  `inset 0 -1px 0` hairlines are real borders and its `inset 0 0 0 1px` rings are
  real borders. Same pixels, permitted mechanism.
- **Floating hero particles: rejected.** Looping decoration carrying no meaning.
- **Scroll-triggered fade-ins: rejected** at the ~80 elements the design applies them
  to. Fewer than five deliberate reveals may be proposed individually.
- **Backdrop blur: rejected.** Sticky headers use solid `paper` with a hairline
  border. Blur may be re-proposed only with evidence that the header text clears 7:1
  over every section it scrolls past.

**Granted, scoped:**

- **The blinking caret is permitted, in the terminal replay only.** It is the one
  place a pulse carries meaning: it marks a live shell. It may not appear anywhere
  else, and the `prefers-reduced-motion` block in `globals.css` still stops it
  absolutely.

### Required
- **Type:** `font-display` (Schibsted Grotesk) and `font-mono` (JetBrains Mono).
  `font-alt` (Fraunces) for quotation and the founder's voice, italic only. Three
  families, and `tests/visual.spec.ts` permits exactly those three.
- **Mono is reserved** for the product's own vocabulary: check IDs, grades, findings,
  commands, file paths. Never decorative.
- **Measure:** body copy capped at 62ch via `max-w-measure`.
- **Spacing:** only the named scale. Nothing between steps.
- **Accent colour carries meaning:** `harm`, `holding`, `watching`, `suspicion`.
  Never pick an accent for looks. Accent never exceeds ~10% of a viewport.
- **No component accepts a `className` prop that can override a token.** Variants are
  explicit props with a fixed set of values, never an escape hatch.

### The signature
1. **Stop rule** — a solid `ink` bar that snaps to full width at section boundaries.
   Structural, not decorative. It is the page's spine.
2. **Margin rail** — editorial marginalia in the left rail carrying the historical and
   literary references.
3. **Grade stamp** — the A-to-F mark from mcpscan's own output. Only where real
   product output is shown. Never decoration.

---

## Visual baselines: create freely, change never-silently

This is the rule that replaced the human-only `npm run baseline`. Read it carefully,
because the distinction it draws is the entire reason visual regression still works.

**Creating a baseline for a view that has none is safe.** Do it. Run
`npx playwright test --update-snapshots` in the Playwright Docker image matching the
installed `@playwright/test` version, so the PNGs match Ubuntu CI rather than the
host. Commit them.

**Changing a baseline that already exists is the dangerous act**, because the fix for
any failing screenshot test is always one command away, and taking that shortcut
converts the gate into a formality. So:

- Before any `--update-snapshots` run, record which baseline files already exist.
- After the run, `git status` the snapshot directory. **Any modified (not added) PNG
  is a stop condition unless you can state, in the PR description, the specific
  intended change that caused it.** "Tests were failing" is not a reason. "The stop
  rule changed from 12px to 14px in commit X, so the hero baseline moved" is.
- Never delete a baseline to force regeneration. That is the same act wearing a
  disguise.
- If a diff is large or you cannot account for it, revert the snapshot change, leave
  the test red, and escalate. **A red visual test is a working gate. A quietly updated
  baseline is a broken one.**

---

## Gate files: you may fix them, in isolation, with reasons

`.github/workflows/gates.yml`, `lighthouserc.json`, `eslint.config.mjs`,
`tailwind.config.ts` and `CLAIMS.md` are no longer untouchable. But:

- **Never in the same PR as feature work.** A gate change is its own PR, touching only
  gate files. Bundling it with a slice is how a weakened gate ships unnoticed.
- **The PR must state which is wrong: the gate, or the code.** Default assumption is
  the code. Fixing a gate because your work fails it is a process defect; fixing a
  gate because it is factually broken (an invalid input, a removed CLI flag, a wrong
  execution order) is maintenance. You have already done the latter correctly twice.
- **Never weaken an assertion to make something pass.** Loosening a threshold,
  deleting an assertion, adding `continue-on-error`, or narrowing a lint rule's scope
  requires the PR to say plainly that a gate is being weakened, what risk that admits,
  and when it will be restored.
- After any gate change, re-run the banned-class proof from README-KIT step 5 and
  paste the result. A gate edit that has not been re-proven is unverified.

---

## Media rules

- **Poster first, video second.** Every video has a required `poster` still. The page
  must be complete and good-looking with video disabled entirely.
- No text, letters, or logos inside any image or video. All type is HTML.
- **No generated asset is committed until a human has inspected it at full size,
  including all four corners, and the PR records that inspection.** Generator
  watermarks appear in corners and survive resizing. This check cannot be automated,
  so it must be scheduled.
- Autoplay media is `muted loop playsinline preload="none"`, started by an
  IntersectionObserver, hidden under `prefers-reduced-motion` with the poster shown.
- Media in `public/media/` is produced by `scripts/prep-media.sh`. Do not re-encode,
  rename, move or optimise those files.
- Alt text comes from `media-manifest.json` verbatim. Never write your own.
- Never generate or fake product footage. Demos are real terminal recordings only.

---

## Accessibility

Gated in CI at 100. Non-negotiable.
- Every image gets alt text describing the drawing, not the metaphor. Decorative
  media gets `alt=""` and `aria-hidden`.
- Visible focus states on every interactive element. Never `outline: none`.
- Semantic landmarks, one `h1` per page, heading levels never skip.
- Body text contrast at least 7:1. `grey-3` is a border colour, never text.

---

## How you work now

**One slice per PR, still.** Scope discipline is what makes diffs readable, and it
survives the move to autonomy. Slices are in `SLICES.md`.

**Self-review before every PR.** Adversarially review your own work against this file
and list every place you: used a value not in the token set, added a class not in
`tailwind.config.ts`, wrote a claim with no evidenced `CLAIMS.md` row, touched a file
outside the slice's scope, or moved a visual baseline. State explicitly if there are
none. Put the list in the PR description.

**Merging.** When every gate is green and the self-review is clean, merge your own
slice PR into `launch` and continue to the next slice without waiting. If any gate is
red, do not merge and do not proceed — diagnose and report.

**Verify, do not trust.** Check the actual state of origin rather than believing any
summary of it, including your own from earlier in the session, and including mine.
This habit has already caught several real defects. It is the most valuable thing you
do here.

## Commands
```
npm run dev
npm run gates      # must be green before any merge
npm run baseline   # you may run this — under the create/change rule above
```

---

## THE THREE STOP CONDITIONS

Halt and report. Do not work around these, and do not interpret them narrowly.

1. **Never merge `launch` into `main`.** That is the publish action and it deploys to
   production. It is the founder's, always.
2. **Never mark a `CLAIMS.md` row `VERIFIED` without live evidence pasted into the
   row.** No live source, no claim, no page.
3. **Never modify an existing visual baseline that you cannot account for.** Leave the
   test red and escalate. A red gate is working; a silently green one is not.
