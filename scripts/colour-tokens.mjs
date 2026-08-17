/**
 * The single source of truth for what counts as a declared colour.
 *
 * Extracted so the two colour checks cannot disagree about the allowlist:
 *
 *   Check A  scripts/colour-source-check.mjs  every colour literal in the config
 *            and the source tree is declared. Static, so every token is covered
 *            the moment it runs and emission is irrelevant.
 *   Check B  scripts/colour-allowlist.mjs     no undeclared colour reaches the
 *            built CSS. Can only ever see emitted values, which is its real job.
 *
 * B was never broken. It was being read as though it were A, and that misreading
 * is what left 29 of 47 tokens ungated: a declared-but-unused token is never
 * emitted, so B had nothing to compare it against. A closes that for free —
 * without emitting dead CSS, which is why safelisting was the wrong answer.
 */
export const TOKENS = {
  // Surfaces
  "#fafaf9": "paper", "#f0f0ec": "paper.deep", "#e6e6e3": "paper.hover",
  "#0f0f0f": "ink", "#151515": "ink.deep", "#1c1414": "ink.sunk",
  "#221e1c": "ink.focus", "#1e1e1c": "ink.shape", "#2a2a2a": "ink.hover",
  // Greys
  "#4b4b49": "grey.1", "#565654": "grey.2", "#c9c9c4": "grey.3", "#a6a6a2": "grey.4",
  // Rules, strokes, figure furniture
  "#e6e6e5": "rule", "#282828": "rule.dark", "#202020": "rule.row",
  "#3a3a3a": "rule.edge", "#6a6a6a": "rule.hover", "#787878": "rule.bright",
  "#3e3e3c": "rule.stroke", "#333331": "rule.line", "#4a4a48": "rule.dot",
  "#d8d8d3": "rule.wire", "#333333": "rule.chrome",
  // Type on ink
  "#a9a9a5": "tx.3d", "#a1a19c": "tx.term", "#c8c8c4": "tx.label",
  // Accent
  "#c63c21": "accent / orisan.mark", "#d96a45": "accent.d / orisan.inverse",
  "#802f1e": "orisan.type",
  // Semantic
  "#9e2b25": "harm / harm.text", "#f1e5e4": "harm.fill", "#ee9080": "harm.lit",
  "#5e7953": "holding", "#475c3f": "holding.text", "#eaede8": "holding.fill", "#8fae83": "holding.lit",
    "#3e5735": "holding.status",
  "#b08a45": "suspicion", "#685129": "suspicion.text", "#f3efe7": "suspicion.fill",
  "#c9a566": "suspicion.lit", "#644d21": "suspicion.status",
  "#7d95ac": "watching", "#485664": "watching.text", "#eef0f1": "watching.fill",
  "#b8b8b4": "dim",
};

/**
 * Named exceptions. Every entry needs a reason and an owner decision behind it.
 * An exception is a decision to tolerate a colour, not a place to hide one.
 */
export const EXCEPTIONS = {
  "#000000": "browser/UA default reflected by preflight; not authored by us",
  "#ffffff": "browser/UA default reflected by preflight; not authored by us",
  // Tokened, not tolerated. Tailwind's preflight hardcodes this in three rules --
  // input::placeholder,textarea::placeholder and a -moz-placeholder variant of
  // each -- and there is no way to stop it emitting them short of disabling
  // preflight entirely. All three are overridden by matching selectors in
  // globals.css, so the literal is dead in the cascade rather than merely unused.
  // The override is proven by the placeholder-contrast assertion in
  // tests/visual.spec.ts, which fails at 2.21:1 if it is ever removed.
  // This exception is only safe while that assertion exists. Do not delete one
  // without the other.
  "#9ca3af": "preflight placeholder literal, overridden in all three rules; see tests/visual.spec.ts",
};

export const norm = (r, g, b) =>
  "#" + [r, g, b].map((n) => Number(n).toString(16).padStart(2, "0")).join("").toLowerCase();

export function extract(css) {
  const found = new Map();
  const add = (hex, sample) => {
    if (!found.has(hex)) found.set(hex, sample);
  };
  for (const m of css.matchAll(/#([0-9a-f]{6})\b/gi)) add("#" + m[1].toLowerCase(), m[0]);
  for (const m of css.matchAll(/#([0-9a-f]{3})\b/gi)) {
    const [r, g, b] = m[1].toLowerCase().split("");
    add(`#${r}${r}${g}${g}${b}${b}`, m[0]);
  }
  for (const m of css.matchAll(/rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)/gi)) {
    add(norm(m[1], m[2], m[3]), m[0]);
  }
  return found;
}

/**
 * Strip comments before scanning source for colour literals.
 *
 * Without this, Check A reports every hex ever mentioned in prose: the first run
 * found ten "undeclared" colours and all ten were comments explaining why a value
 * had been replaced — including #7E9070 in GapWidget.tsx and #F4EFE4 in
 * globals.css, both of which are notes about colours that are deliberately NOT
 * used any more. A check that fires on its own documentation is noise, and a noisy
 * check gets worked around rather than fixed.
 *
 * `//` is only treated as a comment when not preceded by `:`, so protocol-relative
 * URLs and `https://` survive.
 *
 * Only Check A needs this. Check B reads built CSS, where the bundler has already
 * removed comments.
 */
export function stripComments(src) {
  return src
    .replace(/<!--[\s\S]*?-->/g, " ")   // html / svg
    .replace(/\/\*[\s\S]*?\*\//g, " ")  // block, incl. css and jsx {/* */}
    .replace(/(^|[^:])\/\/[^\n]*/g, "$1 "); // line, but not https://
}
