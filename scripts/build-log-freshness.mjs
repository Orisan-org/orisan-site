#!/usr/bin/env node
/**
 * The build log may not read as stopped.
 *
 * A historical claim cannot rot — 10 Jul 2026 is true forever. But an empty recent
 * stretch says something the entries do not: that nothing is happening. Section 8
 * tells the reader "if you want to know whether this is real, read this and not the
 * rest of the page", so a log whose newest entry is months old is the page arguing
 * against itself.
 *
 * WHY N = 30 DAYS, measured rather than picked.
 *
 * For every one of this repository's commits, the gap to the then-newest log entry
 * was computed. The distribution is bimodal: 174 commits sit within 6 days of an
 * entry, and a tail of 45 sits at 26-29 days, all inside the 10 Jul -> 9 Aug window
 * between the two PyPI releases. That window was real work, correctly unlogged under
 * the entry rule, and the largest legitimate gap in the repo's history is 29 days.
 *
 * N = 30 clears that by a day, so this gate would not have fired once on the only
 * history available. A tighter N would have produced findings a reader learns to
 * ignore, which is worse than no gate.
 *
 * It also has to absorb clock skew, and this repo has some: commits authored on the
 * same day as this file carry dates 7 days ahead of the session clock, and committer
 * offsets in the log range from -05:00 to +05:30. Everything below is compared in UTC
 * and a future-dated commit cannot make the log look fresher, only staler, which is
 * the safe direction for a staleness check.
 *
 * Local, deterministic, no network. It compares the log against the one thing in the
 * repository that always moves.
 */
import { readFileSync } from "node:fs";
import { execSync } from "node:child_process";

const N_DAYS = 30;
const DAY = 86_400_000;

const src = readFileSync("components/home/BuildLog.tsx", "utf8");
const dates = [...src.matchAll(/date:\s*"(\d{4}-\d{2}-\d{2})"/g)].map((m) => m[1]);

// Scope assertion: a freshness check over zero entries passes by examining nothing.
if (dates.length === 0) {
  console.error("FAIL: no build-log entries parsed. The check examined nothing,");
  console.error("which is indistinguishable from a fresh log.");
  process.exit(1);
}

const newestEntry = dates.map((d) => Date.parse(`${d}T00:00:00Z`)).sort((a, b) => b - a)[0];

const commitISO = execSync("git log -1 --format=%aI", { encoding: "utf8" }).trim();
if (!commitISO) {
  console.error("FAIL: could not read the newest commit date. Nothing to compare against.");
  process.exit(1);
}
const newestCommit = Date.parse(commitISO);

const gap = Math.floor((newestCommit - newestEntry) / DAY);
const fmt = (t) => new Date(t).toISOString().slice(0, 10);

if (gap > N_DAYS) {
  console.error(`FAIL: the build log reads as stopped.`);
  console.error(`  newest entry  ${fmt(newestEntry)}`);
  console.error(`  newest commit ${fmt(newestCommit)}`);
  console.error(`  gap ${gap} days, over the ${N_DAYS}-day bar.`);
  console.error(`  Either something happened that earns an entry, or nothing has`);
  console.error(`  happened for a month and the page should not imply otherwise.`);
  process.exit(1);
}

console.log(
  `  ok: build log fresh — newest entry ${fmt(newestEntry)}, newest commit ` +
    `${fmt(newestCommit)}, gap ${gap}d of ${N_DAYS}d (${dates.length} entries examined)`,
);
