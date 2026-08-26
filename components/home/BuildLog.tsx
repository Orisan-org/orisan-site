import { EYEBROW_INK, P_INK, WRAP } from "./chrome";

/**
 * SECTION 8 — the build log. Date rail, newest entry displayed large.
 *
 * EVERY DATE COMES FROM A SOURCE, not from the reference. Three of the four dates
 * in the reference were right and one was wrong by sixteen days, which is the
 * argument for sourcing all of them rather than checking the suspicious ones:
 * invented content is not uniformly obvious.
 *
 * Convention, founder's ruling, and CLAIMS carries it as its own row:
 *   dates are UTC, because a reader who checks will look at PyPI or the GitHub API
 *     and both report UTC. A page stating IST disagrees with every reader's check.
 *   dates are the AUTHOR date of the substantive commit, not the merge date,
 *     because this repo rebases constantly and merge dates move under a rebase.
 *     A build log whose dates change is not a record.
 *
 * No commit hashes on the page. CLAIMS rows carry the hash or the PyPI URL.
 */
/**
 * WHAT EARNS AN ENTRY. Evidence about the thing being sold, or about how we handle
 * being wrong. Not evidence about the brochure.
 *
 * Two entries failed that and were removed on 2026-08-19: a gate on colours in the
 * compiled CSS, and a gate asserting the type scale is monotonic. Both were real work
 * and both were about this website. They were also the two most recent entries, so a
 * section headed "if you want to know whether this is real, read this and not the rest
 * of the page" was offering, as its freshest evidence, two facts about the CSS of the
 * page it was telling the reader to ignore.
 *
 * The 17 Aug entry is the one that matters most and is the one this log exists for. A
 * log framed as "including the mistakes" that omits the largest mistake fails its own
 * frame, which is the same defect as a claims file whose own claim was unrowed.
 *
 * Dates are the UTC author date of the substantive commit, per CLAIMS row 69.
 */
const ENTRIES = [
  {
    date: "2026-08-17",
    label: "17 Aug 2026",
    head: "A false claim about EU AI Act record-keeping was found on this page and taken down.",
    body: "It had been here since the site launched. The obligation moved three weeks before we shipped, nothing in this repository changed when it did, and every check stayed green.",
  },
  {
    date: "2026-08-16",
    label: "16 Aug 2026",
    head: "mcpscan recorded against a real MCP config. Grade F, exit 1.",
    body: "The transcript above is that recording. It replaced a fabricated one.",
  },
  { date: "2026-08-09", label: "9 Aug 2026", head: "mcpscan 0.1.1 on PyPI." },
  {
    date: "2026-07-10",
    label: "10 Jul 2026",
    head: "mcpscan 0.1.0 on PyPI.",
    body: "First public release.",
  },
];

export function BuildLog() {
  return (
    <div className="border-t border-rule-dark bg-ink-deep text-tx-d">
      <section id="log" className="py-f-80-150">
        <div className={WRAP}>
          <div className="grid grid-cols-headline items-end gap-7h to-780:grid-cols-stack">
            <div>
              <span className={EYEBROW_INK}>Build log</span>
              <h2 className="mt-5h text-3xl font-semibold">What changed, and when.</h2>
            </div>
            <p className={`${P_INK} max-w-ch38 text-standfirst leading-160`}>
              Every entry is something that actually happened, including the mistakes. If
              you want to know whether this is real, read this and not the rest of the page.
            </p>
          </div>

          <div className="mt-f-44-72 border-t border-rule-dark">
            {ENTRIES.map((e, i) => (
              <div
                key={e.date}
                className="grid grid-cols-entry gap-f-20-54 border-b border-rule-dark py-f-26-42 to-780:grid-cols-stack"
              >
                <time dateTime={e.date} className="flex items-start gap-2h pt-2 font-mono text-fine uppercase tracking-14 text-tx-3d">
                  <i
                    aria-hidden="true"
                    className={`mt-1h block size-1h flex-none rounded-full border ${
                      i === 0 ? "border-accent-d bg-accent-d" : "border-rule-dot bg-transparent"
                    }`}
                  />
                  {e.label}
                </time>
                <div>
                  <h3
                    className={
                      i === 0
                        ? "max-w-ch30 text-lead font-semibold text-tx-d"
                        : "max-w-ch30 text-entry font-semibold text-tx-d"
                    }
                  >
                    {e.head}
                  </h3>
                  {e.body ? (
                    <p className={`${P_INK} mt-2h max-w-ch58 text-sm leading-160`}>{e.body}</p>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
