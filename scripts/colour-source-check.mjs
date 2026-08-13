#!/usr/bin/env node
/**
 * Check A: every colour literal in the config and the source tree is declared.
 *
 * Static. It never looks at the build, so emission is irrelevant and every token
 * is covered the moment this runs. That is the whole point: Check B
 * (colour-allowlist.mjs) can only fail on values present in the built CSS, and
 * Tailwind only emits a colour something uses, so 29 of 47 declared tokens were
 * ungated — not because B was broken, but because B was being read as though it
 * were this check.
 *
 * The two are complementary and both are cheap:
 *   A  nothing undeclared is authored          (this file, static)
 *   B  nothing undeclared reaches the CSS      (allowlist, over the build)
 *
 * A also catches what B structurally cannot: a hardcoded hex in a component that
 * never compiles to a class, an inline style attribute, an SVG fill written as an
 * attribute rather than a token class.
 *
 * scripts/ is excluded. It holds the allowlist itself, so scanning it is circular.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";
import { TOKENS, EXCEPTIONS, extract, stripComments } from "./colour-tokens.mjs";

const ROOTS = ["tailwind.config.ts", "app", "components", "tests"];
const EXTS = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".css", ".svg", ".html"]);

const files = [];
const walk = (p) => {
  const st = statSync(p);
  if (st.isFile()) { if (EXTS.has(extname(p))) files.push(p); return; }
  for (const e of readdirSync(p)) {
    if (e === "node_modules" || e === "__screenshots__" || e.startsWith(".")) continue;
    walk(join(p, e));
  }
};
for (const r of ROOTS) { try { walk(r); } catch { /* optional path */ } }

const found = new Map();
for (const f of files) {
  for (const [hex, sample] of extract(stripComments(readFileSync(f, "utf8")))) {
    if (!found.has(hex)) found.set(hex, { sample, file: f });
  }
}

// Positive control: the ink token is authored in tailwind.config.ts. If it is not
// here, this scan is pointed at the wrong tree and its silence proves nothing.
if (!found.has("#0f0f0f")) {
  console.error("FAIL: positive control missing. #0f0f0f (ink) was not found in");
  console.error("the source tree, so this scan proves nothing about what else is absent.");
  process.exit(1);
}

const undeclared = [...found.entries()].filter(([hex]) => !TOKENS[hex] && !EXCEPTIONS[hex]);

console.log(`  ok: positive control present (ink), ${found.size} distinct colours authored`);
for (const [hex, { file }] of [...found.entries()].sort()) {
  const label = TOKENS[hex] ? `token ${TOKENS[hex]}` : EXCEPTIONS[hex] ? "excepted" : "UNDECLARED";
  console.log(`    ${hex}  ${label.padEnd(22)} ${file}`);
}

if (undeclared.length) {
  console.error(`\nFAIL: ${undeclared.length} colour literal(s) authored in the source are`);
  console.error("neither a token nor a named exception. Token them, or add an exception");
  console.error("with a reason:\n");
  for (const [hex, { sample, file }] of undeclared) {
    console.error(`  ${hex}   written as ${sample}   in ${file}`);
  }
  process.exit(1);
}
console.log(`\n  ok: every colour authored in config and source is declared`);
