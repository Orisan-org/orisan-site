#!/usr/bin/env node
/**
 * Report a workflow's conclusion, and prove it is about the commit being merged.
 *
 * WHY THIS EXISTS. A green was nearly reported off a run whose head was two pushes
 * old. It was caught by noticing the run's parent SHA, which is a person remembering
 * to look — the same defect class as a test suite adopting a `next start` left running
 * from another branch, and the same fix: the harness must prove it is exercising the
 * subject it claims to exercise before any result counts.
 *
 * A conclusion without the SHA it was reached on is not a result about this branch. It
 * is a result about whatever GitHub last happened to run.
 *
 * NOT A MERGE GATE. It makes a network request, so it never sits in `npm run gates`. It
 * is a reporting tool: run it before saying a branch is green, and it refuses to say so
 * when the run is stale.
 *
 * Usage:  node scripts/gate-status.mjs [workflow] [branch]
 * Default: gates.yml on the current branch.
 */
import { execSync } from "node:child_process";

const workflow = process.argv[2] ?? "gates.yml";
const branch = process.argv[3] ?? execSync("git rev-parse --abbrev-ref HEAD", { encoding: "utf8" }).trim();

const sh = (cmd) => execSync(cmd, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();

// The tip that matters is what the remote has, because that is what CI saw.
let tip;
try {
  tip = sh(`git rev-parse origin/${branch}`);
} catch {
  console.error(`FAIL: no origin/${branch}. Push the branch before asking whether CI is green on it.`);
  process.exit(1);
}
const local = sh("git rev-parse HEAD");

const raw = sh(
  `gh run list --branch ${JSON.stringify(branch)} --workflow=${JSON.stringify(workflow)} ` +
    `--limit 1 --json headSha,status,conclusion,databaseId,createdAt`,
);
const runs = JSON.parse(raw);

// Scope assertion: no runs at all is not a pass, it is an absence of evidence.
if (runs.length === 0) {
  console.error(`FAIL: no ${workflow} runs found for ${branch}. Nothing has been verified.`);
  process.exit(1);
}
const run = runs[0];

const short = (s) => s.slice(0, 7);
console.log(`  workflow   ${workflow} on ${branch}`);
console.log(`  run        ${run.databaseId}  ${run.createdAt}`);
console.log(`  ran on     ${short(run.headSha)}`);
console.log(`  origin tip ${short(tip)}`);
if (local !== tip) console.log(`  local HEAD ${short(local)}  (differs from origin — push first)`);

if (run.headSha !== tip) {
  console.error(``);
  console.error(`FAIL: the newest ${workflow} run is not about this branch's tip.`);
  console.error(`  It ran on ${short(run.headSha)}; the tip is ${short(tip)}.`);
  console.error(`  Whatever it concluded is a result about a different commit.`);
  process.exit(1);
}
if (run.status !== "completed") {
  console.error(`\nNOT DONE: ${workflow} is ${run.status} on ${short(tip)}.`);
  process.exit(2);
}
if (run.conclusion !== "success") {
  console.error(`\nFAIL: ${workflow} concluded ${run.conclusion} on ${short(tip)}.`);
  process.exit(1);
}
console.log(`\n  ok: ${workflow} succeeded on ${short(tip)}, which is this branch's tip.`);
