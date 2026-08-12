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
        "3d": "#9D9D99",  // was #6E6E6A (3.74) → 7.04
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
      harm:      { DEFAULT: "#9E2B25", text: "#9E2B25", fill: "#F1E5E4", lit: "#C96A62" },
      holding:   { DEFAULT: "#5E7953", text: "#475C3F", fill: "#EAEDE8", lit: "#8FAE83" },
      suspicion: { DEFAULT: "#B08A45", text: "#685129", fill: "#F3EFE7", lit: "#C9A566", sub: "#8A7346" },
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
      cta:     [".94rem", { lineHeight: "1.5" }],                          // button labels
      standfirst: [".95rem", { lineHeight: "1.55" }],                      // build-log standfirst
      h4:      ["1.02rem", { lineHeight: "1.35", letterSpacing: "-.01em" }],
      entry:   ["1.05rem", { lineHeight: "1.5", letterSpacing: "-.015em" }],   // build-log heading
      surface: ["1.12rem", { lineHeight: "1.4", letterSpacing: "-.02em" }],    // surface name
      rung:    ["1.4rem", { lineHeight: "1", letterSpacing: "-.02em" }],       // severity ladder letter
      ticker:  ["1.6rem", { lineHeight: "1.2", letterSpacing: "-.03em" }],     // the hero ticker figures
      figure:  ["clamp(3rem,7.5vw,5.8rem)", { lineHeight: "1", letterSpacing: "-.045em" }],
      feature: ["clamp(1.8rem,3vw,2.6rem)", { lineHeight: "1.05", letterSpacing: "-.03em" }],
      lead:    ["clamp(1.5rem,2.6vw,2.1rem)", { lineHeight: "1.15", letterSpacing: "-.025em" }],
    },

    fontWeight: { normal: "400", medium: "500", semibold: "600" },

    letterSpacing: {
      tight: "-0.03em",  // display headings
      normal: "0",
      label: "0.22em",   // uppercase mono eyebrows
      meta: "0.16em",    // uppercase mono footer and captions
    },

    // 4px ladder, complete. Steps widen as they grow, which is what the design does.
    // Its 32 off-scale values snap here with a maximum error of 4px.
    spacing: {
      0: "0", px: "1px",
      1: "0.25rem",  2: "0.5rem",   3: "0.75rem",  4: "1rem",     5: "1.25rem",
      6: "1.5rem",   7: "1.75rem",  8: "2rem",     9: "2.25rem",  10: "2.5rem",
      11: "3rem",    12: "3.5rem",  13: "4rem",    14: "4.5rem",  15: "5rem",
      16: "6rem",    17: "7rem",    18: "8rem",    19: "10rem",   20: "12rem",
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
      hero: "18ch",
      wrap: "1200px",   // the design's wrap. Was 1120px.
      none: "none",
      full: "100%",
    },

    screens: { sm: "640px", md: "768px", lg: "900px", xl: "1200px" },

    opacity: { 0: "0", 45: "0.45", 50: "0.5", 75: "0.75", 88: "0.88", 100: "1" },

    gridTemplateColumns: {
      // The single-column state every card grid collapses to on a phone. Named
      // for what it is rather than "1", so `grid-cols-stack` reads as a decision.
      stack: "minmax(0, 1fr)",
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
      },
      animation: { drop: "drop 0.5s cubic-bezier(0.2,0.9,0.1,1) both" },
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
