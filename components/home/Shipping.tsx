import { CTA_SOLID_L, EYEBROW_INK, P_INK, WRAP } from "./chrome";
import { TerminalReplay } from "./TerminalReplay";

/**
 * SECTION 5 — shipping now. Dark, and the right column deliberately hangs past the
 * bottom of the ink block so the terminal crosses the seam into the paper below.
 *
 * THE GRADE STAMP AND ITS READOUT ARE EXCLUDED, not forgotten. The reference shows
 * a large "F" beside "2 servers scanned / 2 findings at HIGH / exit 1". All four
 * are invented readings, and a page that forbids unmarked fabricated product output
 * cannot also ship four of them. The stamp returns at full size when section 5
 * carries a recording of a real run, and the readout returns with it.
 */
const RUNGS: { letter: string; note: string; ink: string; failing: boolean }[] = [
  { letter: "A", note: "clean", ink: "text-holding-lit", failing: false },
  { letter: "B", note: "expected", ink: "text-holding-lit", failing: false },
  { letter: "C", note: "review", ink: "text-suspicion-lit", failing: false },
  { letter: "D", note: "exit 1", ink: "text-suspicion-lit", failing: true },
  { letter: "F", note: "exit 1", ink: "text-harm-lit", failing: true },
];

export function Shipping() {
  return (
    <div className="border-t border-rule-dark bg-ink text-tx-d">
      <section id="ship" className="pt-f-80-150">
        <div className={WRAP}>
          <div className="grid grid-cols-ship items-start gap-f-30-72 to-980:grid-cols-stack">
            <div className="pb-f-80-150 to-980:pb-f-60-100">
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
            {/* min-w-0: a grid track's auto minimum is its item's min-content, so the
                120-column transcript would otherwise push this track wide and crush the
                copy column to 189px. min-w-0 lets the track hold its 1.25fr share and
                hands the overflow to the pane's own scroll port. */}
            <div className="min-w-0 -mb-f-60-130 to-980:mb-0">
              <TerminalReplay />

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
        </div>
      </section>
    </div>
  );
}
