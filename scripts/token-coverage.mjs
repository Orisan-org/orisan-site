#!/usr/bin/env node
/**
 * Token coverage: which colour tokens the allowlist gate can actually see.
 *
 * scripts/colour-allowlist.mjs answers "is every colour in the built CSS a
 * token?". That is a real question, but it is not the one its passing implies.
 * Tailwind only emits a colour that some class uses, so a declared-but-unused
 * token never reaches the built CSS and the allowlist has nothing to compare it
 * against. Those tokens are ungated, silently, and always have been.
 *
 * Found while proving the allowlist fires for a newly added token: undeclaring
 * #ee9080 left the gate exiting 0. That looked like a broken gate and was not —
 * harm.lit had zero usage, so the value was absent from the built CSS and there
 * was nothing to test. The general form is worse than that instance.
 *
 * This reports the blind spot rather than closing it. Closing it means deciding
 * what an unused token should do, which is a design question:
 *   - delete it (it is dead)
 *   - keep it and accept it is unverified until used
 *   - emit a safelist entry so it is always compiled and therefore always gated
 * That decision is the founder's. This makes the size of it visible.
 *
 * Exit is always 0. This is a reporter, not a gate.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const CFG = "tailwind.config.ts";
const CHUNKS = ".next/static/chunks";

const cfg = readFileSync(CFG, "utf8");
const start = cfg.indexOf("colors:");
if (start < 0) throw new Error(`no colors block in ${CFG}`);
let depth = 0, end = cfg.indexOf("{", start);
for (let i = end; i < cfg.length; i++) {
  if (cfg[i] === "{") depth++;
  else if (cfg[i] === "}") { depth--; if (!depth) { end = i; break; } }
}
const block = cfg.slice(start, end + 1);

// Walk the block tracking the current group, so a token reports as `group.key`
// rather than as a bare `lit` that appears four times.
const tokens = [];
let group = "";
for (const line of block.split("\n")) {
  const opens = line.match(/^\s{4,6}([A-Za-z][\w]*)\s*:\s*\{/);
  if (opens) group = opens[1];
  for (const m of line.matchAll(/([\w"'.-]+)\s*:\s*"(#[0-9A-Fa-f]{6})"/g)) {
    const key = m[1].replace(/["']/g, "");
    const path = group && key !== group ? `${group}.${key}` : key;
    tokens.push({ path: path.replace(/\.DEFAULT$/, ""), hex: m[2].toLowerCase() });
  }
  // A group written on one line (`harm: { ... },`) never reaches a
  // closing-brace line, so it has to be closed here or every later top-level
  // token inherits its name. `dim` reported as `watching.dim` before this.
  if (opens && line.includes("}")) group = "";
  else if (/^\s{4,6}\}/.test(line)) group = "";
}

let css = "";
try {
  css = readdirSync(CHUNKS).filter((f) => f.endsWith(".css"))
    .map((f) => readFileSync(join(CHUNKS, f), "utf8")).join("\n").toLowerCase();
} catch {
  console.error(`FAIL: no built CSS in ${CHUNKS}. Run \`npm run build\` first.`);
  process.exit(1);
}

const emitted = (hex) => {
  const [r, g, b] = [1, 3, 5].map((p) => parseInt(hex.slice(p, p + 2), 16));
  return css.includes(hex) || css.includes(`rgb(${r} ${g} ${b}`) || css.includes(`rgb(${r},${g},${b}`);
};

const byHex = new Map();
for (const t of tokens) {
  if (!byHex.has(t.hex)) byHex.set(t.hex, { hex: t.hex, paths: [] });
  byHex.get(t.hex).paths.push(t.path);
}
const all = [...byHex.values()];
const blind = all.filter((t) => !emitted(t.hex));

console.log(`  declared colour values      ${all.length}`);
console.log(`  emitted, so gated           ${all.length - blind.length}`);
console.log(`  NOT emitted, so ungated     ${blind.length}  (${Math.round((blind.length / all.length) * 100)}%)`);
if (blind.length) {
  console.log(`\n  The allowlist cannot fail on any of these. Its passing says nothing about them:\n`);
  for (const t of blind.sort((a, b) => a.paths[0].localeCompare(b.paths[0]))) {
    console.log(`    ${t.hex}   ${t.paths.join(", ")}`);
  }
}
console.log(`\n  Coverage is content-dependent: a token becomes gated the moment a page`);
console.log(`  uses it and ungated again if that usage is removed. The number above is`);
console.log(`  a property of this build, not of the config.`);
