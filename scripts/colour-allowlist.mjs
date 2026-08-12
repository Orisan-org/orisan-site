#!/usr/bin/env node
/**
 * Colour allowlist: every colour literal in the built CSS must be a design token,
 * or a named exception with a reason.
 *
 * The banned-class proof answers "did one specific default colour leak?". This
 * answers the question that actually matters: "is every colour on this site one we
 * chose?" A denylist of known-bad values can only ever be as complete as its
 * author's imagination — the same argument that turned the font and radius bans
 * into allowlists.
 *
 * Tailwind emits colours as space-separated `rgb(R G B/var(...))`, and raw CSS
 * keeps whatever form it was authored in, so both are normalised to lowercase hex
 * before comparison.
 */
import { readFileSync } from "node:fs";
import { execSync } from "node:child_process";

const TOKENS = {
  "#f4efe4": "paper", "#ebe4d6": "paper.deep", "#ebdbcb": "paper.edge",
  "#16150f": "ink", "#0e0d09": "ink.deep",
  "#4a4740": "grey.1", "#6a665b": "grey.2", "#b8b2a4": "grey.3", "#a6a299": "grey.4",
  "#c2472e": "orisan.mark", "#802f1e": "orisan.type", "#d68f7d": "orisan.inverse",
  "#c4796c": "harm", "#7e9070": "holding", "#7d95ac": "watching", "#b08a45": "suspicion",
  // The readable pair for each mark. DEFAULT is a shape colour and measures
  // 2.79-3.00:1 as type on paper; .text is the same hue darkened to 7.73-7.82:1,
  // and .fill is the mark laid 10% into paper, opaque so a chip stays light on ink.
  "#872917": "harm.text", "#3d4f36": "holding.text",
  "#3a4b5c": "watching.text", "#5a4723": "suspicion.text",
  "#efe3d8": "harm.fill", "#e8e6d8": "holding.fill",
  "#e8e6de": "watching.fill", "#ede5d4": "suspicion.fill",
};

/**
 * Named exceptions. Every entry needs a reason and an owner decision behind it.
 * An exception is a decision to tolerate a colour, not a place to hide one.
 */
const EXCEPTIONS = {
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

const norm = (r, g, b) =>
  "#" + [r, g, b].map((n) => Number(n).toString(16).padStart(2, "0")).join("").toLowerCase();

function extract(css) {
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

const files = execSync('find .next -name "*.css" -not -path "*/cache/*"', { encoding: "utf8" })
  .split("\n")
  .filter(Boolean);
if (files.length === 0) {
  console.error("FAIL: no built CSS found");
  process.exit(1);
}

const all = new Map();
for (const f of files) {
  for (const [hex, sample] of extract(readFileSync(f, "utf8"))) {
    if (!all.has(hex)) all.set(hex, { sample, file: f });
  }
}

// Positive control: if no token is present the extraction is broken, and a clean
// result would mean nothing.
if (!all.has("#f4efe4")) {
  console.error("FAIL: positive control missing. The paper token was not extracted,");
  console.error("so an empty unexpected-list proves nothing.");
  process.exit(1);
}
console.log(`ok: positive control present (paper), ${all.size} distinct colours extracted`);

const unexpected = [...all.entries()].filter(([hex]) => !TOKENS[hex] && !EXCEPTIONS[hex]);

for (const [hex, meta] of [...all.entries()].sort()) {
  const label = TOKENS[hex] ? `token ${TOKENS[hex]}` : EXCEPTIONS[hex] ? "excepted" : "UNEXPECTED";
  console.log(`  ${hex}  ${label.padEnd(22)} ${meta.sample}`);
}

if (unexpected.length > 0) {
  console.error(`\nFAIL: ${unexpected.length} colour(s) in built CSS are neither a token nor a`);
  console.error("named exception. Token them, or add an exception with a reason:\n");
  for (const [hex, meta] of unexpected) {
    console.error(`  ${hex}   first seen as ${meta.sample}   in ${meta.file}`);
  }
  process.exit(1);
}
console.log("\nok: every colour in built CSS is a token or a named exception");
