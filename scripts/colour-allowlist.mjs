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

import { TOKENS, EXCEPTIONS, extract } from "./colour-tokens.mjs";


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
if (!all.has("#fafaf9")) {
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
