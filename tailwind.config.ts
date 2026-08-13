import type { Config } from "tailwindcss";

/**
 * ORISAN DESIGN SYSTEM  —  design import, 2026-08-10
 *
 * This REPLACES the Tailwind theme. It does not extend it.
 *
 * Consequence, and the entire point: `bg-blue-500`, `rounded-2xl`, `shadow-lg`,
 * `p-[13px]` and every other generic utility DO NOT EXIST. They fail to compile.
 * The design system is enforced by the compiler, not by good intentions.
 *
 * Every value below is the design's own value. Where a design value could not be
 * adopted, the reason is on the line, and it is always one of exactly two:
 * a CLAUDE.md ban, or the 7:1 body-contrast gate.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",

      // ── Surfaces. The design's :root, verbatim. ──────────────────────────────
      ink: {
        DEFAULT: "#0F0F0F",
        deep: "#151515",   // terminal panes, the build-log section
        sunk: "#1C1414",   // the two failing rungs of the severity ladder
        focus: "#221E1C",  // the highlighted terminal row
        shape: "#1E1E1C",  // filled shapes inside the hero figure
        hover: "#2A2A2A",
      },
      paper: {
        DEFAULT: "#FAFAF9",
        deep: "#F0F0EC",   // the design's --card: the weighted "shipping" cell
        hover: "#E6E6E3",
      },

      // ── Greys. Legacy names kept so the four other pages inherit the new
      // palette without a markup change; values are the design's. ──────────────
      grey: {
        1: "#4B4B49", // body copy on paper, 8.37:1
        2: "#565654", // secondary on paper, 7.04:1 — was #6A665B
        3: "#C9C9C4", // BORDER ONLY, 1.59:1. Never type.
        4: "#A6A6A2", // secondary on ink, 7.85:1
      },

      // ── Rules, strokes and figure furniture. ─────────────────────────────────
      rule: {
        DEFAULT: "#E6E6E5", // hairlines on paper
        dark: "#282828",    // hairlines on ink
        row: "#202020",     // the explainer rows beside the terminal
        edge: "#3A3A3A",    // ghost button border
        hover: "#6A6A6A",
        bright: "#787878",
        stroke: "#3E3E3C",  // hero figure node strokes
        line: "#333331",    // hero figure connectors
        dot: "#4A4A48",     // build-log timeline dots
        node: "#C9C9C4",    // map figure node strokes
        wire: "#D8D8D3",    // map figure edges
        chrome: "#333333",  // terminal window dots
      },

      // ── Type on ink. Two values darkened from the design; each was an AA
      // failure at the size and ground it renders on, each now 7.04:1. ─────────
      tx: {
        d: "#FAFAF9",
        "2d": "#A6A6A2",  // 7.85:1 on ink
        // Was the design's #6E6E6A (3.74:1 on ink), corrected to #9D9D99 for 7.04:1
        // on ink -- but ink is not the only ground it lands on. In section 5 the same
        // token carries the terminal pane labels on ink.deep (6.71) and the failing
        // ladder rungs on ink.sunk (6.65), both under the house bar. Same shape as
        // #B39968, which was rejected for being 7.00 on ink and 6.67 on ink.deep.
        // #A9A9A5 holds hue and saturation and clears 7:1 on every ground it reaches:
        // ink 8.13, ink.deep 7.74, ink.sunk 7.68.
        "3d": "#A9A9A5",
        term: "#A1A19C",  // was #5E5E5A (2.80) on ink.deep → 7.04
        label: "#C8C8C4", // figure labels, 11.42:1
      },

      // ── Accent. Rhetorical, display sizes only. ──────────────────────────────
      accent: { DEFAULT: "#C63C21", d: "#D96A45" },
      // Legacy names. `type` is NOT remapped to the accent: it carries eyebrow-
      // sized text in 18 places and #C63C21 measures 4.94:1 on paper.
      orisan: { mark: "#C63C21", type: "#802F1E", inverse: "#D96A45" },

      // ── Semantic. Fixed meaning, never chosen for looks. The design's
      // allowed/held/stopped ARE these four under other names, so one vocabulary
      // is kept. DEFAULT is the mark, `lit` the on-ink type value, `text` the
      // on-paper type value, `fill` the mark 10% into paper. ───────────────────
      harm:      { DEFAULT: "#9E2B25", text: "#9E2B25", fill: "#F1E5E4",
             // The design's STOPPED type. #C96A62 clears AA but nothing else:
             // 5.22:1 on ink, 4.98 on ink.deep, 4.93 on ink.sunk, 4.50 on
             // ink.focus — and ink.focus is the terminal's highlighted row,
             // exactly where a crit line lands. #EE9080 clears 7:1 on all four:
             // 8.16 / 7.77 / 7.71 / 7.03. Sits with ALLOWED 7.80 and HELD 8.27,
             // so the three verdicts read at comparable weight.
             lit: "#EE9080" },
      holding:   { DEFAULT: "#5E7953", text: "#475C3F", fill: "#EAEDE8", lit: "#8FAE83",
             // 7.02:1 on paper.deep, 7.68:1 on paper. Was the design's #3F5936,
             // which is 6.82:1 on paper.deep — the ground it actually lands on.
             status: "#3E5735" },
      // `sub` is the figure subtitle. The design's #8A7346 is 4.22:1 on ink, an AA
      // failure. #B39968 was tried and rejected: exactly 7.00:1 on ink but 6.67:1 on
      // ink.deep, so it fails the moment the figure sits on the panel ground. `lit`
      // is 8.27:1 on ink and 7.88:1 on ink.deep and is already a declared token, so
      // the subtitle uses it and `sub` is gone rather than becoming a second name
      // for one value. The subtitle now separates from HELD by size alone (7.5px vs
      // 9.5px), not by colour.
      suspicion: { DEFAULT: "#B08A45", text: "#685129", fill: "#F3EFE7", lit: "#C9A566",
                   // 7.00:1 on paper.deep, 7.66:1 on paper. Was #8A6A2E = 4.81:1 on paper.
                   status: "#644D21" },
      watching:  { DEFAULT: "#7D95AC", text: "#485664", fill: "#EEF0F1" },

      // The inert dot on a "Designed" surface. Not semantic — it means "not yet".
      dim: "#B8B8B4",
    },

    fontFamily: {
      // Reversal of B1 ("Inter is out"). Founder taste call, recorded in the PR.
      display: ["var(--font-inter)", "system-ui", "sans-serif"],
      body: ["var(--font-inter)", "system-ui", "sans-serif"],
      mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      // The italic emphasis face. Reversal of the 2026-08-12 ruling that the
      // deck's italic device does not transfer. Founder taste call.
      alt: ["var(--font-instrument)", "Georgia", "serif"],
    },

    // The design's ten sizes. Its 22 literal px values collapse into these; the
    // largest resulting shift is 2px, which is below the threshold of noticing.
    fontSize: {
      // The ten-step spine, remapped onto the design's scale. The names are kept
      // so Product, The gap, Vision and Contact inherit the new type without a
      // markup change; the values are standalone2's. Strictly ordered at every
      // width — asserted by tests/scale.spec.ts.
      micro: [".58rem", { lineHeight: "1.6", letterSpacing: ".16em" }],
      label: [".62rem", { lineHeight: "1.6", letterSpacing: ".26em" }],
      xs:    [".8rem", { lineHeight: "1.45" }],
      sm:    [".9rem", { lineHeight: "1.55" }],
      base:  ["1.0625rem", { lineHeight: "1.6" }],   // the design's 17px body
      lg:    ["clamp(1.08rem,1.8vw,1.38rem)", { lineHeight: "1.55" }],
      xl:    ["clamp(1.5rem,2.6vw,2.1rem)", { lineHeight: "1.15", letterSpacing: "-.025em" }],
      "2xl": ["clamp(1.6rem,3vw,2.4rem)", { lineHeight: "1.12", letterSpacing: "-.025em" }],
      "3xl": ["clamp(2.3rem,6vw,4.8rem)", { lineHeight: "1", letterSpacing: "-.04em" }],
      "4xl": ["clamp(3.2rem,10.5vw,8.6rem)", { lineHeight: ".92", letterSpacing: "-.05em" }],

      // Steps the design uses that the spine does not carry. Named for the role
      // they play rather than their size, so a reader can tell why each exists.
      chrome:  [".6rem", { lineHeight: "1.6", letterSpacing: ".2em" }],    // terminal pane label
      meta:    [".66rem", { lineHeight: "1.6", letterSpacing: ".2em" }],   // timeline caption, footer rule
      repo:    [".68rem", { lineHeight: "1.6" }],                          // package name under a surface
      fine:    [".7rem", { lineHeight: "1.6", letterSpacing: ".05em" }],   // hero fine print, log dates
      repoLg:  [".74rem", { lineHeight: "1.6" }],                          // the weighted cell's package name
      legend:  [".86rem", { lineHeight: "1.55" }],                         // the two legend cells
      colophon:[".87rem", { lineHeight: "1.55" }],                         // footer blurb
      card:    [".88rem", { lineHeight: "1.55" }],                         // surface copy, explainer rows
      nav:     [".89rem", { lineHeight: "1.5" }],                          // nav links
      cta:     [".94rem", { lineHeight: "1.6" }],   // .cta sets none; inherits body 1.6                          // button labels
      standfirst: [".95rem", { lineHeight: "1.55" }],                      // build-log standfirst
      h4:      ["1.02rem", { lineHeight: "1.35", letterSpacing: "-.01em" }],
      entry:   ["1.05rem", { lineHeight: "1.5", letterSpacing: "-.015em" }],   // build-log heading
      surface: ["1.12rem", { lineHeight: "1.4", letterSpacing: "-.02em" }],    // surface name
      rung:    ["1.4rem", { lineHeight: "1", letterSpacing: "-.02em" }],       // severity ladder letter
      ticker:  ["1.6rem", { lineHeight: "1.6", letterSpacing: "-.03em" }],     // the hero ticker figures
      figure:  ["clamp(3rem,7.5vw,5.8rem)", { lineHeight: "1", letterSpacing: "-.045em" }],
      feature: ["clamp(1.8rem,3vw,2.6rem)", { lineHeight: "1.05", letterSpacing: "-.03em" }],
      lead:    ["clamp(1.5rem,2.6vw,2.1rem)", { lineHeight: "1.15", letterSpacing: "-.025em" }],

      // The figures set type at four fixed sizes. They are inside SVG viewBoxes
      // that scale with the container, so these do not need to be fluid.
      inlineMono: ".9em",  // the `.mono` run inside a sentence, sized relatively
      figXs: ["7.5px", { lineHeight: "1" }],
      figSm: ["8px", { lineHeight: "1" }],
      fig:   ["9px", { lineHeight: "1" }],
      figLg: ["9.5px", { lineHeight: "1" }],
    },

    fontWeight: { normal: "400", medium: "500", semibold: "600" },

    // Named for the value in hundredths of an em. The design tracks uppercase mono
    // at eight distinct widths and the difference between .1em and .26em is the
    // difference between a caption and a masthead, so they are not collapsed.
    letterSpacing: {
      tight: "-0.03em",  // display headings
      normal: "0",
      "03": "0.03em", "05": "0.05em", "08": "0.08em", "10": "0.1em",
      "14": "0.14em", meta: "0.16em", "18": "0.18em", "20": "0.2em",
      // Negatives. tight (-.03em) already carried the display headings; these are
      // the design's remaining tight-set values, named nNN for -.NNem.
      n01: "-0.01em", n015: "-0.015em", n02: "-0.02em", n025: "-0.025em",
      n04: "-0.04em", n045: "-0.045em", n05: "-0.05em", n06: "-0.06em",
      label: "0.22em", "26": "0.26em",
    },

    // Replaced, like every other scale. No page used a `leading-*` class before
    // this one — line-height arrived baked into the fontSize steps — so the
    // default rem-based scale is removed rather than left to rot. Named for the
    // unitless value x100, matching the letterSpacing scheme above.
    lineHeight: {
      "80": ".8", "92": ".92", "100": "1", "105": "1.05", "112": "1.12",
      "115": "1.15", "135": "1.35", "145": "1.45", "155": "1.55", "160": "1.6",
      "170": "1.7", "200": "2", "210": "2.1",
    },

    // 4px ladder, complete. Steps widen as they grow, which is what the design does.
    // Its 32 off-scale values snap here with a maximum error of 4px.
    // 4px ladder, complete, plus the half-steps the design's own rhythm needs.
    //
    // RULE (founder, 2026-08-13): below 40px the grid advances by 2px; above 40px
    // it stays coarse and curated. Nothing between steps.
    //
    // The numeric keys are NOT renumbered — px-8 still means 32px — because four
    // shipped pages depend on them. The ten new values sit between the existing
    // steps and are named for that: `h` is the half-step above its number.
    // 3h = 14px, between 3 (12px) and 4 (16px).
    //
    // Of the design's 32 distinct spacing values: 16 land on this grid directly,
    // 6 odd ones snap at 1px, and these 10 are new.
    spacing: {
      0: "0", px: "1px",
      1: "0.25rem",  2: "0.5rem",   3: "0.75rem",  4: "1rem",     5: "1.25rem",
      6: "1.5rem",   7: "1.75rem",  8: "2rem",     9: "2.25rem",  10: "2.5rem",
      11: "3rem",    12: "3.5rem",  13: "4rem",    14: "4.5rem",  15: "5rem",
      16: "6rem",    17: "7rem",    18: "8rem",    19: "10rem",   20: "12rem",

      // the seven half-steps below 40px
      "0h": "0.125rem", // 2px
      "1h": "0.375rem", // 6px
      "2h": "0.625rem", // 10px
      "3h": "0.875rem", // 14px
      "4h": "1.125rem", // 18px
      "5h": "1.375rem", // 22px
      "6h": "1.625rem", // 26px
      "7h": "1.875rem", // 30px
      "8h": "2.125rem", // 34px
      // three in the coarse range, where snapping cost more than 2px
      "9h": "2.375rem", // 38px
      "10h": "2.75rem", // 44px
      "12h": "3.75rem", // 60px
      "14h": "4.75rem", // 76px

      // ── Fluid steps. The design's section rhythm is 22 clamps and the
      // founder's ruling is to keep every one exactly, so they are declared
      // rather than approximated onto the fixed ladder. Named for their min and
      // max bounds: that pair is unique across all 22, so a class can be checked
      // against the reference without a lookup table. These are the ONLY
      // exception to "nothing between steps" — the fixed ladder above is
      // untouched and still governs everything that is not fluid.
      gutter: "clamp(20px,5vw,84px)", // the design's --g, the wrap inset
      "f-140-220": "clamp(140px,17vw,220px)",
      "f-110-220": "clamp(110px,16vw,220px)",
      "f-90-180": "clamp(90px,13vw,180px)",
      "f-84-176": "clamp(84px,13vw,176px)",
      "f-80-150": "clamp(80px,11vw,150px)",
      "f-72-140": "clamp(72px,10vw,140px)",
      "f-64-120": "clamp(64px,9vw,120px)",
      "f-64-110": "clamp(64px,9vw,110px)",
      "f-60-130": "clamp(60px,9vw,130px)",
      "f-60-110": "clamp(60px,8vw,110px)",
      "f-60-100": "clamp(60px,8vw,100px)",
      "f-56-104": "clamp(56px,8vw,104px)",
      "f-44-76": "clamp(44px,6vw,76px)",
      "f-44-72": "clamp(44px,6vw,72px)",
      "f-38-64": "clamp(38px,5vw,64px)",
      "f-36-64": "clamp(36px,5vw,64px)",
      "f-30-80": "clamp(30px,5vw,80px)",
      "f-30-72": "clamp(30px,5vw,72px)",
      "f-30-56": "clamp(30px,4vw,56px)",
      "f-26-42": "clamp(26px,3.4vw,42px)",
      "f-20-54": "clamp(20px,3vw,54px)",
    },

    borderWidth: { DEFAULT: "1px", 0: "0", 2: "2px", 3: "3px", 14: "14px" },

    // The design is built on soft panels. Two radii carry it; everything between
    // 14px and 26px in the mockups resolves to `panel`.
    borderRadius: {
      none: "0",
      sm: "2px",       // hairline detail
      ladder: "12px",  // the severity ladder
      panel: "14px",   // the terminal split
      full: "9999px",  // pills and circles. The design writes 999px; both clamp
                       // to a pill and render identically, so this is a markup
                       // difference with identical output, not a deviation.
    },

    // Still deleted. The design's `inset 0 -1px 0` hairlines are real borders.
    boxShadow: { none: "none" },
    backgroundImage: {},
    dropShadow: {},
    blur: {},
    backdropBlur: {},

    maxWidth: {
      measure: "62ch",  // body copy cap, gated
      lede: "52ch",
      heroLede: "46ch", // the hero lede is set tighter than the section ledes
      // Heading and note measures, named for the ch value the design sets.
      ch12: "12ch", ch14: "14ch", ch16: "16ch", ch34: "34ch", ch40: "40ch",
      hero: "18ch",
      wrap: "1200px",   // the design's wrap. Was 1120px.
      // The standalone2 reference measures 1280px. Kept separate from `wrap`
      // rather than widened in place: `wrap` is load-bearing for the four
      // shipped pages and moving it would shift all of their baselines.
      home: "1280px",
      none: "none",
      full: "100%",
    },

    // The terminal pane holds its height before any line has been written, so the
    // pane does not grow as the replay runs. The design's one min-height.
    minHeight: { 0: "0", term: "300px", full: "100%" },

    // Two figures are wider than a phone and scroll horizontally inside their own
    // container rather than stretching the page. Named for the figure, because the
    // number is the point at which each stops being readable, not a breakpoint.
    minWidth: { 0: "0", map: "820px", floor: "700px", full: "100%" },

    // The ticker cells: grow, shrink, 200px basis. Declared because a raw
    // `flex:1 1 200px` has nowhere else to live in a token system.
    // The sticky nav sits above every section including the ticker rail.
    zIndex: { auto: "auto", 0: "0", 10: "10", 20: "20", 30: "30", 40: "40", 50: "50", 60: "60" },

    gridAutoRows: { surface: "minmax(190px, auto)" },

    flex: { tick: "1 1 200px", zero: "0 1 0%", none: "none", auto: "1 1 auto", initial: "0 1 auto", 1: "1 1 0%" },

    screens: {
      // Min-width, unchanged: the four shipped pages are built on these.
      sm: "640px", md: "768px", lg: "900px", xl: "1200px",
      // The reference collapses at max-width, not min-width, and mixing the two
      // schemes silently is how a breakpoint gets lost. These are declared as
      // what they are and named for the pixel, so `to-980:` reads straight back
      // to `@media(max-width:980px)` in the design.
      "to-1000": { max: "1000px" }, "to-980": { max: "980px" },
      "to-940": { max: "940px" },   "to-880": { max: "880px" },
      "to-780": { max: "780px" },   "to-680": { max: "680px" },
      "to-600": { max: "600px" },
    },

    opacity: { 0: "0", 18: "0.18", 94: "0.94", 45: "0.45", 50: "0.5", 55: "0.55", 75: "0.75", 88: "0.88", 100: "1" },

    gridTemplateColumns: {
      // The single-column state every card grid collapses to on a phone. Named
      // for what it is rather than "1", so `grid-cols-stack` reads as a decision.
      stack: "minmax(0, 1fr)",
      hero: "1.08fr .92fr",  // the hero split: figure slightly narrower than the copy
      headline: "1fr auto",  // section head: heading left, anything trailing right
      manifesto: "1.2fr .8fr",
      ship: "1fr 1.25fr",    // section 5: copy left, the terminal wider on the right
      entry: "170px 1fr",    // section 8: the build-log date rail against the entry
      pair: "repeat(2, minmax(0, 1fr))",
      triad: "repeat(3, minmax(0, 1fr))",
      quartet: "repeat(4, minmax(0, 1fr))",
      rail: "190px minmax(0, 1fr)", // the editorial margin rail
      verdict: "minmax(0, 1fr) minmax(0, 11rem)", // finding row: body beside its grade
    },

    rotate: { 8: "8deg" },

    extend: {
      keyframes: {
        drop: { from: { transform: "scaleX(0)" }, to: { transform: "scaleX(1)" } },
        // The hero figure. `flow` runs the dashes along the three input paths;
        // `pulse` breathes the decision dot; outA/outH/outS light each outcome in
        // turn on a shared 9s cycle, so exactly one verdict reads at a time.
        flow: { to: { strokeDashoffset: "-18" } },
        pulse: { "0%,100%": { opacity: ".35" }, "50%": { opacity: "1" } },
        outA: { "0%,6%": { opacity: ".18" }, "12%,28%": { opacity: "1" }, "34%,100%": { opacity: ".18" } },
        outH: { "0%,38%": { opacity: ".18" }, "44%,60%": { opacity: "1" }, "66%,100%": { opacity: ".18" } },
        outS: { "0%,70%": { opacity: ".18" }, "76%,92%": { opacity: "1" }, "98%,100%": { opacity: ".18" } },
      },
      animation: {
        drop: "drop 0.5s cubic-bezier(0.2,0.9,0.1,1) both",
        flow: "flow 1.4s linear infinite",
        pulse: "pulse 9s infinite",
        outA: "outA 9s infinite",
        outH: "outH 9s infinite",
        outS: "outS 9s infinite",
      },
    },
  },
  corePlugins: {
    gradientColorStops: false,
    boxShadowColor: false,
    ringWidth: false,
    ringColor: false,
    ringOffsetWidth: false,
    backdropBlur: false,
    backdropBrightness: false,
    backdropSaturate: false,
  },
  plugins: [],
};

export default config;
