#!/usr/bin/env node
/**
 * Names the steps CI runs that `npm run gates` does not, so a green local run is
 * never mistaken for a green CI run.
 *
 * Before this, `npm run gates` was build + tsc + eslint + playwright, while
 * .github/workflows/gates.yml also ran the banned-class proof and the colour
 * allowlist. CLAUDE.md says every PR must pass `npm run gates` locally first, so
 * the instruction and the gate disagreed and a local pass was a guess about CI.
 * Both proofs now run in the npm script and the workflow calls that script, so
 * the two cannot drift apart again. What is left below genuinely cannot run here.
 */
const CI_ONLY = [
  ["Lighthouse", "a11y/perf budgets, `lhci collect` + `lhci assert` against lighthouserc.json — separate `lighthouse` job in .github/workflows/gates.yml"],
  ["Ubuntu screenshots", "visual baselines are *-linux.png. macOS renders the same page differently (measured: 8052px vs 8012px at 768px), so a local screenshot run cannot confirm CI's."],
];
console.log("\n  gates passed locally.");
console.log("  skipped locally, runs in CI:");
for (const [name, why] of CI_ONLY) console.log(`    - ${name}: ${why}`);
console.log("");
