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

**Addendum, 2026-08-13.** Both specifics above were reversed within days of being
written; the reasoning was not. Recorded as an addendum rather than an edit,
because the entry was true on 2026-08-10 and a rule quietly rewritten to match
today reads as though it was always right.

- The family is **Inter**, not Schibsted Grotesk, and `font-alt` is **Instrument
  Serif**, not Fraunces. Founder taste call. `tailwind.config.ts` and
  `PERMITTED_FONT_FAMILIES` moved at the import; this file said Schibsted for three
  days after, so every session started from a wrong instruction.
- The radius set is **2 / 12 / 14 / 999**, not "between 14px and 32px".
  `rounded-feature` (32px) was removed and remapped to `panel` (14px) in eight
  places across five files.

The released-to-allowlist mechanism is unchanged and is the part that mattered.

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
- **Type:** `font-display` / `font-body` (Inter) and `font-mono` (JetBrains Mono).
  `font-alt` (Instrument Serif) italic only. Three families, and
  `tests/visual.spec.ts` permits exactly those three. The families were Schibsted
  Grotesk and Fraunces before the 2026-08-10 import; this line said so long after
  the config and the test had moved on, which is how a stale rule outlives the
  thing it describes.
- **Mono is reserved** for the product's own vocabulary: check IDs, grades, findings,
  commands, file paths. Never decorative.
- **Measure:** body copy capped at 62ch via `max-w-measure`.
- **Spacing:** only the named scale. Nothing between steps. Below 40px the scale
  advances by 2px, so any odd value in a design **rounds down** to the step below —
  3, 5, 7, 9, 11 and 13px are all equidistant between two steps, and a lost pixel
  is safer than a gained one. The direction is fixed here so it is not re-derived
  from a diff next time.
- **Accent colour carries meaning:** `harm`, `holding`, `watching`, `suspicion`.
  Never pick an accent for looks. Accent never exceeds ~10% of a viewport.
- **In copy describing unbuilt work, a finite present tense with an implied subject
  asserts existence.** "Stands in the path of the action" reads as a thing doing
  that now; "Stand in the path of an action" reads as purpose. Infinitives and noun
  phrases describe intent, finite verbs describe behaviour. Grammatical form does
  claim work, and it is cheap to check.
- **No component accepts a `className` prop that can override a token.** Variants are
  explicit props with a fixed set of values, never an escape hatch.

### The signature
1. **Stop rule** — a solid `ink` bar that snaps to full width at section boundaries.
   Structural, not decorative. It is the page's spine.
2. **Margin rail** — editorial marginalia in the left rail carrying the historical and
   literary references.
3. **Grade stamp** — the A-to-F mark from mcpscan's own output. Only where real
   product output is shown. Never decoration.
   **The stamp's colour binding is to the mark, not to the glyph.** The ring and the
   fill carry the meaning; the letter is ink. The mark values are shape colours and
   measure 2.79:1 to 3.00:1 as type on paper, so a coloured glyph was an AA failure
   dressed as a signature.
4. **The italic accent** — `font-alt`, italic, inside a display heading, carrying the
   turn in the sentence. This is a deliberate signature device and a settled founder
   taste call, not drift. It is not to be re-opened by a future audit: an audit may
   report that it is unusual, and the answer is that it is intended.

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
- **Do not diagnose a baseline diff on the host.** macOS and the Ubuntu runner do not
  render the same page at the same height. Measured on the home page at 768px:
  **macOS 8052px, Ubuntu 8012px — a 40px platform gap on identical code.** A real
  change of 47px was chased locally and could not be reproduced, because a larger
  platform difference was already sitting underneath it. Diff the CI images against
  each other, or measure the cause directly (font metrics, element widths) rather
  than comparing page heights across machines.
- If a diff is large or you cannot account for it, revert the snapshot change, leave
  the test red, and escalate. **A red visual test is a working gate. A quietly updated
  baseline is a broken one.**

**Before trusting any difference against a reference, prove the reference itself
renders correctly.** A diff harness reports differences whether or not either side is
right. Minimum proof, every run: assert the computed `font-family` actually resolved
to the intended face on at least one element per family, and assert a known text width
against a value measured outside the harness. The standalone2 reference inlines 42
Google `@font-face` rules pointing at fonts.gstatic.com; with no outbound network all
42 fail, but their narrower `unicode-range` values still win CSS font matching against
the full-range fallbacks, so the reference rendered in system type. Measured effect:
"are acting." at 556.89px against the site's 628.88px, and an h1 127px shorter. Two
diffs were invalid before this was caught, and the next step would have been to
correct a correct page to match a broken render.

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
- **A proof that a gate fires must first create the condition the gate inspects.**
  Undeclaring a token and watching the colour allowlist still pass proves nothing
  if no class uses that token, because Tailwind never emitted it and there was
  nothing to compare. Inject the usage first, *then* undeclare, watch it fail,
  restore. Not a workaround — the only valid form of the test. Worked example in
  PR #48, which also found that 29 of 47 colour tokens were ungated for exactly
  this reason.
- **A gate that cannot pass on the host it is run on is a broken gate, not a local
  quirk.** When a gate fails only locally, the first hypothesis is that the gate is
  wrong. Two instances, both real: the banned-class proof searched for colour forms
  this Tailwind never emits, and `toHaveScreenshot` looked for a `*-darwin.png`
  that cannot exist, failed, and wrote one into the tracked baseline directory
  every run. Both were read as environment noise before they were read as defects.
- **A gate that produces findings a reader must learn to ignore has a shorter
  useful life than no gate at all.** A real gate that cries wolf trains the team to
  skip it, and it is then worse than nothing because its passing is still counted.
  Check A's first run reported ten undeclared colours and all ten were comments
  documenting values that had been replaced — it was firing on its own
  documentation. Fix the noise before the gate lands, not after someone has learned
  to scroll past it.
- **Contrast tests prove legibility, never correctness.** A page painted entirely
  the wrong colour passes every contrast assertion: the figure's verdict labels
  rendered `#C8C8C4` instead of green, ochre and red, and `#C8C8C4` is 11.42:1 on
  ink. Assert the value by identity where the value carries meaning.

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

### Fabricated figures carry the same marker as fabricated footage

A diagram is not exempt from the honesty rule because it is an illustration.

**If a figure contains specifics a reader could mistake for a real reading, it is
labelled as fabricated, or the specifics come out.** Preferred is that the
specifics come out, because then there is nothing to label and nothing to get
out of date.

A specific is anything that looks like it was measured: a count (`14
repositories`), a named real path (`~/.ssh`, `notes.db`), a named branch
(`prod branch`), a version, a duration, a grade, a severity, an ID. The test is
not whether the figure is decorative in your mind — it is whether a reader
skimming it would take the number away as a fact about our product or their
system.

This binds equally on:
- terminal blocks and scan output,
- SVG diagrams, flow charts, blast-radius maps, architecture drawings,
- anything carrying the grade stamp.

The failure mode is specific and worth naming, because we shipped it: a page
carried a fabricated terminal that was correctly marked `Sample data`, and
directly beside it a blast-radius diagram whose invented paths and counts
carried no marker at all. The marked block was the less believable of the two.
Labelling the obvious fabrication and leaving the plausible one bare is worse
than labelling neither, because it teaches the reader that unlabelled means
real.

---

## Accessibility

Gated in CI at 100. Non-negotiable.
- Every image gets alt text describing the drawing, not the metaphor. Decorative
  media gets `alt=""` and `aria-hidden`.
- Visible focus states on every interactive element. Never `outline: none`.
- Semantic landmarks, one `h1` per page, heading levels never skip.
- Body text contrast at least 7:1. `grey-3` is a border colour, never text.
- **A contrast ratio reported without its composited background hex is not a
  measurement.** Every ratio, in an audit, a PR body or a table pasted into chat,
  states the ground it was measured against. A review once checked four ratios and
  reproduced none of them, because the arithmetic was right and the substrate was
  not. Where an element can land on more than one ground, it clears the bar on the
  darker one.
- **Measure SVG text on `fill`, not `color`.** A sweep that reads `color` silently
  skips every figure on the page and will report zero failures over an unmeasured
  region. Fold in any inherited group `opacity` before computing the ratio.

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

**Reversed decisions get a dated addendum, never a rewrite.** The decision record
entry for the 2026-08-10 design import was true when written and wrong three days
later. The record of a reversal is more useful than a clean file, and a rule edited
in place to match today reads as though it was always right. Append, date it, say
what changed.

**Retarget dependents before deleting a base branch.** Merging a stacked PR with
`--delete-branch` auto-closes every PR based on it, and GitHub will not reopen one
whose base is gone. Cost #46, which had to be recreated as #47.

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

## Release gates for the organs

There is no release checklist in this repo, and this rule is about the organ
repositories rather than about the site, so it is recorded here — the file that is
actually read every session — until an org-level home exists. Its misplacement
should be visible, not silent.

- **Before any organ repository is made public, its full dependency closure must
  resolve for an anonymous user.** Repository visibility is not the only barrier
  and it is the only visible one. `orisan-control-plane` depends on
  `@orisan-org/schema@0.1.0`, a private GitHub Packages package: making the repo
  public would not make it installable, and the failure is `npm error code E401` at
  install time, discovered only by someone who already tried. Verify the closure
  from a clean clone with no credentials before the repo flips, not after.

---

## Credentials

**A real credential is never written to a file.** The standard form is an `.npmrc`
(or equivalent) containing the literal string `${NODE_AUTH_TOKEN}` and an
environment variable holding the value: the tool expands it at read time, the file
is safe to commit, and the secret never lands on disk. A temporary file containing a
live token is a secret on disk whose cleanup depends on nothing crashing between the
write and the delete.

---

## THE THREE STOP CONDITIONS

Halt and report. Do not work around these, and do not interpret them narrowly.

1. **Never merge `launch` into `main`.** That is the publish action and it deploys to
   production. It is the founder's, always.
2. **Never mark a `CLAIMS.md` row `VERIFIED` without live evidence pasted into the
   row.** No live source, no claim, no page.
3. **Never modify an existing visual baseline that you cannot account for.** Leave the
   test red and escalate. A red gate is working; a silently green one is not.
