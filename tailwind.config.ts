import type { Config } from "tailwindcss";

/**
 * ORISAN DESIGN SYSTEM
 *
 * This REPLACES the Tailwind theme. It does not extend it.
 *
 * Consequence, and the entire point: `bg-blue-500`, `rounded-2xl`, `shadow-lg`,
 * `font-sans`, `p-[13px]` and every other generic utility DO NOT EXIST. They fail
 * to compile. The design system is enforced by the compiler, not by good intentions.
 *
 * Do not add keys to make a component work. If a value is missing, that is a design
 * decision for a human.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    // ---- COLOUR: paper, ink, three greys, four meaning-carrying accents ----
    colors: {
      transparent: "transparent",
      current: "currentColor",
      paper: {
        DEFAULT: "#F4EFE4",
        deep: "#EBE4D6",
      },
      ink: "#16150F",
      grey: {
        1: "#4A4740", // secondary text
        2: "#6A665B", // tertiary text, labels. Darkened from #807B70 (3.67:1,
        // failed WCAG AA for its own stated text purpose); now 5.00:1 on
        // paper, 4.53:1 on paper-deep.
        3: "#B8B2A4", // BORDERS ONLY. Never text, fails contrast.
      },
      // Accents carry fixed meaning. Never choose one for looks.
      harm: "#C4796C",      // damage, the thing that already went wrong
      holding: "#7E9070",   // the floor held, all clear
      watching: "#7D95AC",  // observation, discovery
      suspicion: "#B08A45", // raised, not yet stopped
    },

    // ---- TYPE: no sans-serif exists on this site ----
    fontFamily: {
      display: ["var(--font-newsreader)", "Iowan Old Style", "Palatino", "Georgia", "serif"],
      mono: ["var(--font-jetbrains)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      alt: ["var(--font-fraunces)", "var(--font-newsreader)", "serif"], // drop caps + marginalia ONLY
    },

    // ---- SCALE: 1.25 ratio, fluid. No other sizes exist. ----
    fontSize: {
      xs:   ["clamp(0.75rem, 0.72rem + 0.15vw, 0.8125rem)", { lineHeight: "1.5" }],
      base: ["clamp(1rem, 0.96rem + 0.2vw, 1.0625rem)",     { lineHeight: "1.6" }],
      lg:   ["clamp(1.25rem, 1.18rem + 0.35vw, 1.375rem)",  { lineHeight: "1.5" }],
      xl:   ["clamp(1.5rem, 1.35rem + 0.75vw, 1.875rem)",   { lineHeight: "1.25" }],
      "2xl":["clamp(2rem, 1.7rem + 1.5vw, 2.75rem)",        { lineHeight: "1.1" }],
      "3xl":["clamp(2.75rem, 2rem + 3.6vw, 5rem)",          { lineHeight: "1.06", letterSpacing: "-0.02em" }],
      "4xl":["clamp(3.5rem, 2.2rem + 6vw, 7rem)",           { lineHeight: "1.0",  letterSpacing: "-0.03em" }],
    },

    fontWeight: { light: "300", normal: "400", medium: "500", semibold: "600" },

    letterSpacing: {
      tight: "-0.02em",
      normal: "0",
      label: "0.16em", // uppercase mono labels only
    },

    // ---- SPACE: 4px base. Nothing between steps. Ever. ----
    spacing: {
      0: "0",
      1: "0.25rem", 2: "0.5rem",  3: "0.75rem", 4: "1rem",
      5: "1.5rem",  6: "2rem",    7: "3rem",    8: "4rem",
      9: "6rem",   10: "8rem",   11: "12rem",
      px: "1px",
    },

    borderWidth: { DEFAULT: "1px", 0: "0", 2: "2px", 14: "14px" },

    // ---- Circles only. There is no soft-corner aesthetic here. ----
    borderRadius: { none: "0", sm: "2px", full: "9999px" },

    // ---- Deleted on purpose. Depth is created by rule weight and space. ----
    boxShadow: { none: "none" },
    backgroundImage: {},   // kills bg-gradient-to-*
    dropShadow: {},
    blur: {},
    backdropBlur: {},

    maxWidth: {
      measure: "62ch",   // body copy cap
      wrap: "1120px",
      hero: "16ch",
      lede: "52ch",
      none: "none",
      full: "100%",
    },

    screens: { sm: "640px", md: "768px", lg: "900px", xl: "1120px" },

    opacity: { 0: "0", 35: "0.35", 50: "0.5", 75: "0.75", 88: "0.88", 100: "1" },

    // The margin rail's one layout: a fixed 190px editorial rail beside the
    // measure (SLICES.md slice 1). No other grid template exists on the site.
    gridTemplateColumns: {
      rail: "190px minmax(0, 1fr)",
    },

    // The grade stamp's hand-stamped tilt (SLICES.md slice 1). Replacing the
    // key deletes the default rotation scale: ±8deg is the only rotation.
    rotate: {
      8: "8deg",
    },

    extend: {
      keyframes: {
        // The ONE permitted animation: the stop rule snapping into place.
        drop: { from: { transform: "scaleX(0)" }, to: { transform: "scaleX(1)" } },
      },
      animation: { drop: "drop 0.5s cubic-bezier(0.2,0.9,0.1,1) both" },
    },
  },
  corePlugins: {
    // Turn off the plugins whose mere existence invites the generic look.
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
