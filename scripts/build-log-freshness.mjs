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
 * NOT A MERGE GATE. This was first wired into `npm run gates` and that was wrong:
 * nothing in a pull request makes the build log stale, time does. A check that goes
 * red for reasons unrelated to the diff is the check people learn to ignore, and this
 * is the same category as the world-dependent liveness checks — scheduled, raising an
 * alarm, never blocking an unrelated merge.
 *
 * IT IS CURRENTLY DORMANT. Nothing invokes it on a schedule yet; that arrives with
 * the liveness runner. Until then this is a check that does not fire, which is
 * disclosed here rather than left for someone to discover.
 *
 * WHAT IT COMPARES, AND WHAT IT USED TO.
 *
 * The first version compared the newest entry against the newest commit. That was the
 * wrong subject twice over. It measured the log against ALL commits, including the 45
 * in this repo's 26-to-29-day tail that could never earn an entry under the entry rule
 * — so it measured log freshness against brochure work. And "would this commit earn an
 * entry" is a judgement no script makes, so the flaw was unfixable inside that design.
 *
 * It now compares the newest entry to the clock, which is the question actually being
 * asked: how long has it been quiet.
 *
 * WHY N = 45 DAYS, as a product judgement rather than a fitted parameter.
 *
 * The previous N was 30, derived as one day above the largest gap observed in this
 * repository's history. That is a margin of one day against a maximum drawn from weeks
 * of data, tuned so that it could not have fired on the data used to tune it. Both are
 * failures this project has ruled against.
 *
 * The question is what should have happened in the window. Under the entry rule an
 * entry needs evidence about the product or about handling being wrong. The observed
 * product cadence is roughly monthly — 0.1.0 on 10 Jul, 0.1.1 on 9 Aug. So 45 days is
 * one full release cycle missed, plus a fortnight. If that passes with nothing to
 * record, either a release slipped an entire cycle or nothing worth publishing
 * happened, and both are things worth being told. Neither is a reason to block a
 * merge.
 *
 * CLOCK. `NOW_ISO` overrides the system clock so a scheduled runner can supply its
 * own, because this machine's is not trustworthy: commits authored here carry dates up
 * to seven days ahead of the session clock and committer offsets range from -05:00 to
 * +05:30. Seven days of skew against a 45-day threshold is tolerable, and the override
 * exists so the scheduler does not have to rely on that being true.
 */
import { readFileSync } from "node:fs";

const N_DAYS = 45;
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

const now = process.env.NOW_ISO ? Date.parse(process.env.NOW_ISO) : Date.now();
if (Number.isNaN(now)) {
  console.error(`FAIL: NOW_ISO is not a parseable date: ${process.env.NOW_ISO}`);
  process.exit(1);
}

const gap = Math.floor((now - newestEntry) / DAY);
const fmt = (t) => new Date(t).toISOString().slice(0, 10);

if (gap > N_DAYS) {
  console.error(`STALE: the build log reads as stopped.`);
  console.error(`  newest entry ${fmt(newestEntry)}, ${gap} days ago, over the ${N_DAYS}-day bar.`);
  console.error(`  Either something happened that earns an entry — evidence about the`);
  console.error(`  product, or about how we handled being wrong — or nothing has for a`);
  console.error(`  month and a half, and the page should not imply otherwise.`);
  process.exit(1);
}

console.log(
  `  ok: build log fresh — newest entry ${fmt(newestEntry)}, ${gap}d ago, ` +
    `bar ${N_DAYS}d (${dates.length} entries examined)`,
);
