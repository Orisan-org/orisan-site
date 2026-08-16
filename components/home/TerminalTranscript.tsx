/**
 * FIGURE 2 — the transcript. A record, not a replay.
 *
 * WHY THERE IS NO ANIMATION. The component this replaces staggered its lines on
 * per-line `wait` values, and its own docstring indicted the "real runtime · 7.0s"
 * that the reference computed by summing them. Both the number and the motion came
 * from the same place: the data was invented, so intervals could be invented with
 * it, and a made-up cadence is only visible as made-up once you have a real one to
 * compare against.
 *
 * We now have one. `evidence/2026-08-16-mcpscan-real-run/run.cast` was replayed
 * event by event through a terminal emulator to timestamp every line's first
 * appearance, and the answer is that THE CAST HAS NO INTERVALS. mcpscan's reporters
 * build the whole report into a buffer and print it in a single write: all thirty
 * lines below arrive at t=7.178s in two adjacent writes 0.000s apart, inside a 63ms
 * window, after 3.436s in which the process emits nothing at all. Every real
 * interval is 0ms.
 *
 * So the animation was never a property of the product. It was an artifact of
 * having made the data up, and it goes with the data. Any cadence here would be a
 * number someone chose — which is the exact defect the old docstring was written to
 * name. The transcript renders complete.
 *
 * THE TEXT IS VERBATIM, character for character, from run.txt. Colour is the site's
 * own meaning-bound palette rather than the recording's ANSI, and it is applied only
 * to the line carrying a severity token — continuation lines stay dim, which is both
 * closer to what rich actually colours and what keeps the accent inside its budget.
 *
 * 120 COLUMNS IS THE ARTIFACT'S CONSTRAINT, NOT A CHOICE. The published 0.1.1 wheel
 * hardcodes Console(width=120) in reporters/terminal.py, no flag narrows it
 * (`--width` does not exist; `--output terminal` is byte-identical to `table`), and
 * COLUMNS is ignored. The pane is therefore a scroll port, never a clipper: see the
 * overflow note below.
 */
type Kind = "head" | "dim" | "high" | "crit" | "held";

const INK: Record<Kind, string> = {
  head: "text-tx-d",
  dim: "text-tx-term",
  high: "text-suspicion-lit",
  crit: "text-harm-lit",
  held: "text-holding-lit",
};

/**
 * Verbatim from evidence/2026-08-16-mcpscan-real-run/run.txt, the scan section.
 * `real 6.33` is kept in the body deliberately: the status line above the pane
 * shows the same number, so a reader can see that the figure and the recording are
 * one event rather than two claims that happen to agree.
 */
const LINES: { t: string; k: Kind }[] = [
  { t: "mcpscan config report", k: "head" },
  { t: "Configs found: 1", k: "dim" },
  { t: "Servers: 1 total, 1 scanned, 0 failed, 0 skipped", k: "dim" },
  { t: "Worst grade: F", k: "crit" },
  { t: "", k: "dim" },
  { t: "puppeteer", k: "head" },
  { t: "  Source: mcp.json", k: "dim" },
  { t: "  Transport: stdio", k: "dim" },
  { t: "  Purpose: browser_automation (config)", k: "dim" },
  { t: "  Grade: F", k: "crit" },
  { t: "┏━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓", k: "dim" },
  { t: "┃ SEVERITY            ┃ VERDICT              ┃ ID      ┃ TARGET             ┃ FINDING                                  ┃", k: "dim" },
  { t: "┡━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┩", k: "dim" },
  { t: "│ CRITICAL (was HIGH) │ undeclared           │ MCP-010 │ puppeteer_evaluate │ Tool 'puppeteer_evaluate' appears to     │", k: "crit" },
  { t: "│                     │                      │         │                    │ expose shell execution based on name,    │", k: "dim" },
  { t: "│                     │                      │         │                    │ description, or schema.                  │", k: "dim" },
  { t: "│ CRITICAL (was HIGH) │ undeclared           │ MCP-030 │ puppeteer_evaluate │ Tool 'puppeteer_evaluate' accepts        │", k: "crit" },
  { t: "│                     │                      │         │                    │ unconstrained string parameter 'script'  │", k: "dim" },
  { t: "│                     │                      │         │                    │ and appears to execute commands or code. │", k: "dim" },
  { t: "│ HIGH                │ expected_unconfirmed │ MCP-010 │ puppeteer_navigate │ Tool 'puppeteer_navigate' appears to     │", k: "high" },
  { t: "│                     │                      │         │                    │ expose outbound network request          │", k: "dim" },
  { t: "│                     │                      │         │                    │ capability based on name, description,   │", k: "dim" },
  { t: "│                     │                      │         │                    │ or schema.                               │", k: "dim" },
  { t: "└─────────────────────┴──────────────────────┴─────────┴────────────────────┴──────────────────────────────────────────┘", k: "dim" },
  { t: "", k: "dim" },
  { t: "Privacy: payload_stored=false for all findings", k: "held" },
  { t: "real 6.33", k: "dim" },
  { t: "user 1.78", k: "dim" },
  { t: "sys 1.02", k: "dim" },
  { t: "exit: 1", k: "crit" },
];

export function TerminalTranscript() {
  return (
    <div className="overflow-hidden rounded-panel border border-rule-dark bg-ink-deep">
      <div className="flex items-center gap-2h border-b border-rule-dark px-5 py-3">
        <div aria-hidden="true" className="flex gap-1h">
          {[0, 1, 2].map((i) => (
            <span key={i} className="block size-2 rounded-full bg-rule-chrome" />
          ))}
        </div>
        <span className="font-mono text-chrome uppercase tracking-20 text-tx-3d">mcpscan</span>
        {/*
          The only timing number in this component, and it is the one the transcript
          itself prints. `/usr/bin/time -p` wrapped the invocation asciinema
          captured, so the figure and the media are a single event. It is a record of
          one machine on one date, not a prediction about the reader's.
        */}
        <span className="ml-auto font-mono text-chrome uppercase tracking-meta text-tx-3d">
          real 6.33s
        </span>
      </div>

      {/*
        overflow-x-auto, never a clipping ancestor. The lines are whitespace-pre, so
        they establish their own intrinsic width and this element is the scroll port.
        A pane that clips CRITICAL away from its reason, on a page whose whole claim
        is that we show what actually happened, fails the claim and not merely the
        layout. Same device as the map and floor figures, which scroll inside their
        own container rather than stretching the page.
      */}
      <div
        data-testid="transcript-pane"
        className="overflow-x-auto px-6 pb-6 pt-5 font-mono text-xs leading-200"
      >
        {LINES.map((line, i) => (
          <div key={i} className={`whitespace-pre ${INK[line.k]}`}>
            {line.t || " "}
          </div>
        ))}
      </div>
    </div>
  );
}
