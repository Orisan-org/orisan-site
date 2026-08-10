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

      // Ground and ceiling.
      paper: {
        DEFAULT: "#F4EFE4",
        deep: "#EBE4D6", // raised card on paper
        edge: "#EBDBCB", // selection only; the one place paper goes warmer
      },
      ink: {
        DEFAULT: "#16150F",
        deep: "#0E0D09", // terminal ground: darker than ink so product output recedes
      },

      grey: {
        1: "#4A4740", // secondary text on paper.        8.08:1 / 7.32:1 on deep
        2: "#6A665B", // labels and meta on paper.       5.00:1 — never body copy
        3: "#B8B2A4", // borders on paper; body text on ink, where it is 8.66:1
        4: "#A6A299", // meta on ink. Design had #8B867A (5.04:1); lightened to 7.18:1
      },

      // The brand's own colour. It means "Orisan is present here" — the eyebrow,
      // the dot in the wordmark, the stop. It is never a status.
      orisan: {
        mark: "#C2472E", // shapes, rules, dots. Design value, exact. Never carries type.
        type: "#802F1E", // the same hue and saturation, darkened 34% so it can be read.
        // Design used #C2472E for type at 4.32:1. Same colour at eyebrow scale,
        // 7.82:1 on paper and 7.08:1 on paper-deep.
        inverse: "#D68F7D", // the same again for type on ink. Design #C96A52 was 4.94:1.
      },

      // Status accents. Fixed meaning, never chosen for looks.
      harm: "#C4796C",      // damage, the thing that already went wrong
      holding: "#7E9070",   // the floor held, all clear
      watching: "#7D95AC",  // observation, discovery
      suspicion: "#B08A45", // raised, not yet stopped
    },

    fontFamily: {
      // The design's voice. Replaces Newsreader across the site.
      display: ["var(--font-schibsted)", "system-ui", "sans-serif"],
      // Quotation and the founder's voice. Italic only.
      alt: ["var(--font-fraunces)", "Georgia", "serif"],
      // The product's own vocabulary: grades, check IDs, commands, file paths.
      mono: ["var(--font-jetbrains)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
    },

    // The design's ten sizes. Its 22 literal px values collapse into these; the
    // largest resulting shift is 2px, which is below the threshold of noticing.
    fontSize: {
      micro: ["0.65625rem", { lineHeight: "1.6", letterSpacing: "0.16em" }], // mono footer/meta
      label: ["0.6875rem", { lineHeight: "1.6", letterSpacing: "0.22em" }],  // mono eyebrow
      xs:    ["0.8125rem", { lineHeight: "1.55" }],
      sm:    ["0.96875rem", { lineHeight: "1.55" }],
      base:  ["1.0625rem", { lineHeight: "1.55" }],
      lg:    ["clamp(1.1rem, 0.95rem + 0.75vw, 1.35rem)", { lineHeight: "1.5" }],
      xl:    ["clamp(1.5rem, 1.2rem + 1.5vw, 2.1rem)", { lineHeight: "1.12", letterSpacing: "-0.025em" }],
      "2xl": ["clamp(2rem, 1.4rem + 3vw, 3.4rem)", { lineHeight: "1.04", letterSpacing: "-0.03em" }],
      "3xl": ["clamp(2.8rem, 1.9rem + 4.5vw, 5.4rem)", { lineHeight: "1", letterSpacing: "-0.035em" }],
      "4xl": ["clamp(3.2rem, 1.9rem + 6.5vw, 6.8rem)", { lineHeight: "0.98", letterSpacing: "-0.035em" }],
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
      sm: "2px",      // hairline detail
      panel: "1.25rem",  // cards, buttons, terminal chrome
      feature: "2rem",   // the large dark full-width panels
      full: "9999px",    // pills and circles
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
