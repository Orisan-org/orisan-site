#!/usr/bin/env node
/**
 * Compiler-level proof that the theme was actually replaced.
 *
 * eslint-plugin-tailwindcss reads tailwind.config.ts on its own, so a clean lint
 * run does not prove Tailwind itself honours the config. This inspects the built
 * CSS.
 *
 * The positive control is the point: an "absent" result means nothing if the grep
 * is pointed at the wrong file. Asserting a token we DO expect is present is what
 * makes the absences meaningful. Both controls search the form Tailwind actually
 * EMITS, not the form a token is authored in — a space-separated rgb() with an
 * opacity variable, `rgb(250 250 249/var(--tw-bg-opacity,1))` — so a grep for the
 * authored hex or a comma-separated rgb() can never match.
 *
 * Both controls were wrong before 2026-08-12 and both were proven so:
 *   positive: matched #F4EFE4 only because globals.css happened to call
 *             theme("colors.paper.DEFAULT") in a raw ::selection rule, which
 *             inlines a literal hex. Changing that rule made the control fail
 *             while the token was still compiling correctly.
 *   negative: searched #3b82f6, rgb(59,130,246) and an oklch triple, none of
 *             which this Tailwind version emits. Verified by adding blue-500 back
 *             to the theme and using it: the built CSS contained
 *             `.bg-blue-500{...rgb(59 130 246/...)}` and all three patterns
 *             missed it. The gate could not fail, so it was proving nothing.
 *
 * Moved out of .github/workflows/gates.yml so the local command and CI run the
 * same code. It lived only in the workflow, which meant `npm run gates` passing
 * locally said nothing about this proof.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const DIRS = [".next/static/chunks", ".next/static/css"];
const files = [];
for (const d of DIRS) {
  try {
    for (const f of readdirSync(d)) if (f.endsWith(".css")) files.push(join(d, f));
  } catch { /* directory may not exist in this Next version */ }
}
if (!files.length) {
  console.error("FAIL: no built CSS found. Run `npm run build` first.");
  process.exit(1);
}
const css = files.map((f) => readFileSync(f, "utf8")).join("\n").toLowerCase();

// Positive control: the paper token must be present in emitted form.
if (!/rgb\(250 250 249/.test(css)) {
  console.error("FAIL: positive control missing. The paper token is absent from");
  console.error("built CSS, so this proof says nothing about what else is absent.");
  process.exit(1);
}
console.log("  ok: positive control present (paper, rgb(250 250 249 ...))");

// Negative control: every form this Tailwind could emit for blue-500.
const BANNED = [/rgb\(59 130 246/, /rgb\(59,130,246/, /#3b82f6/, /oklch\(0\.623 0\.214 259\.815/];
for (const re of BANNED) {
  if (re.test(css)) {
    console.error(`FAIL: Tailwind default blue-500 present in built CSS (${re}).`);
    console.error("The theme was NOT replaced at compile time.");
    process.exit(1);
  }
}
console.log("  ok: default palette absent from built CSS");
