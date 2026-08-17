import { GradeStamp } from "../GradeStamp";
import { CTA_SOLID_L, EYEBROW_INK, P_INK, WRAP } from "./chrome";
import { TerminalTranscript } from "./TerminalTranscript";

/**
 * SECTION 5 — shipping now. Dark, and the transcript block deliberately hangs past
 * the bottom of the ink block so it crosses the seam into the paper below.
 *
 * ONE COLUMN, NOT TWO, AND THAT IS A DEVIATION FROM THE REFERENCE. The reference
 * put the copy left and the terminal in a 1.25fr right track, which was sized for
 * output that was invented and about 60 columns wide. Real output is 120 columns:
 * the published wheel hardcodes Console(width=120) and no flag narrows it. Measured
 * at 1440, the two-column arrangement gives the pane 541px of text width against
 * the 940.1px a real line needs, and no split of that grid fixes it — handing the
 * terminal 940px crushes the copy column to 189px. Stacked, the wrap gives 1088px,
 * which fits with 148px to spare.
 *
 * Reproducing a container built for content that no longer exists, and then
 * clipping real content to fit it, is fidelity to the wrong thing. So the container
 * changed and the content did not.
 *
 * Stacked at every width rather than at a breakpoint: below roughly 1132px the pane
 * scrolls regardless, and the terminal was already full width at 768 and 390, so one
 * arrangement means fewer states, fewer baselines and fewer things to drift apart.
 *
 * THE READOUT IS BACK, WITH REAL VALUES. It was cut because the reference's four
 * readings were invented and a page forbidding unmarked fabricated product output
 * could not ship four of them. All four now come from the recorded run, and each is
 * checkable against evidence/2026-08-16-mcpscan-real-run/run.txt by counting rows.
 */
const RUNGS: { letter: string; note: string; ink: string; failing: boolean }[] = [
  { letter: "A", note: "clean", ink: "text-holding-lit", failing: false },
  { letter: "B", note: "expected", ink: "text-holding-lit", failing: false },
  { letter: "C", note: "review", ink: "text-suspicion-lit", failing: false },
  { letter: "D", note: "exit 1", ink: "text-suspicion-lit", failing: true },
  { letter: "F", note: "exit 1", ink: "text-harm-lit", failing: true },
];

/** Every value is a count of rows in the transcript above, not a summary of it. */
const READOUT: { label: string; value: string }[] = [
  { label: "scanned", value: "1 server scanned" },
  { label: "findings", value: "3 findings — 2 CRITICAL, 1 HIGH" },
  { label: "exit", value: "exit 1" },
];

export function Shipping() {
  return (
    <div className="border-t border-rule-dark bg-ink text-tx-d">
      <section id="ship" className="pt-f-80-150">
        <div className={WRAP}>
          <div>
            <span className={EYEBROW_INK}>Shipping now · mcpscan</span>
            <h2 className="mt-5 max-w-ch16 text-2xl font-semibold text-tx-d">
              Grade a server before you connect an agent to it.
            </h2>
            <p className={`${P_INK} mt-7 leading-160`}>
              9 deterministic checks. Same server, same report, every time. No model sits
              in the decision path, so there is nothing there to prompt-inject.
            </p>
            <p className={`${P_INK} mt-3h leading-160`}>
              Nothing leaves your machine unless you send it. Reports are written locally
              with <span className="font-mono text-inlineMono">payload_stored=false</span>.
              No telemetry.
            </p>
            <div className="mt-8">
              <a href="/product" className={CTA_SOLID_L}>
                See every check →
              </a>
            </div>
          </div>

          {/* crosses the seam on purpose */}
          <div className="-mb-f-60-130 mt-f-44-76 to-980:mb-0">
            <TerminalTranscript />

            <div className="mt-6h flex flex-wrap items-center gap-x-8 gap-y-4">
              <GradeStamp grade="F" />
              <dl className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
                {READOUT.map((r) => (
                  <div key={r.label}>
                    <dt className="font-mono text-micro uppercase tracking-meta text-tx-3d">
                      {r.label}
                    </dt>
                    <dd className="mt-1 font-mono text-chrome text-tx-2d">{r.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/*
              Folded in from /gap when that route was deleted. It explains the two
              verdicts a reader can see in the transcript above: `undeclared`, which
              escalated HIGH to CRITICAL, and `expected_unconfirmed`, which left HIGH
              alone. Source is the shipped wheel, not the page it came from:
              adjudicate.py states the invariant as "Any purpose source may ESCALATE a
              severity. Only an operator-supplied purpose may DOWNGRADE one", and
              OPERATOR_PURPOSE_SOURCES is {FLAG, INVOCATION}, which excludes config.
            */}
            <p className={`${P_INK} mt-6h leading-160`}>
              A server can tell the scanner what it is for. That can never count in its
              favour. Nothing a server says about itself makes its own grade better, and
              a config you copied from that server&rsquo;s own documentation is not you
              vouching for it either.
            </p>

            <p className={`${P_INK} mt-6h leading-160`}>
              Most of that 6.33 seconds is the scan itself — spawning the server, the MCP
              handshake, enumerating what it exposes, then nine checks over the result. The
              process prints nothing for 3.4 of those seconds and then writes the whole
              report at once, which is why there is no line-by-line replay here.
            </p>

            {/* FIGURE 3 — the severity ladder */}
            <div className="mt-6h flex overflow-hidden rounded-ladder border border-rule-dark bg-ink">
              {RUNGS.map((r) => (
                <div
                  key={r.letter}
                  className={`flex-1 border-r border-rule-dark px-3 py-4 text-center last:border-r-0 ${
                    r.failing ? "bg-ink-sunk" : ""
                  }`}
                >
                  <b className={`block font-mono text-rung font-medium ${r.ink}`}>{r.letter}</b>
                  <span className="mt-1h block font-mono text-micro uppercase tracking-14 text-tx-3d">
                    {r.note}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
