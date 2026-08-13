"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

/**
 * FIGURE 2 — the terminal replay.
 *
 * THE TRANSCRIPT IS SAMPLE DATA. It is not a recording of a real run, and every
 * finding, grade and count in it is invented. Two consequences, both deliberate:
 *
 * 1. The marker is INSIDE the terminal pane, not above it. A marker that does not
 *    touch the thing it marks is a marker a screenshot crops out, and that is the
 *    failure the recorder design doc already names.
 * 2. There is NO timing on the status line. The reference wrote "real runtime ·
 *    7.0s", where the number was the sum of the invented `wait` values — a
 *    fabricated figure with the word "real" asserting the opposite of what it was.
 *    A true timing attached to a fabricated transcript is worse than a false one,
 *    because it lends real precision to invented content. The number and the
 *    transcript have to become true together, from one recorded run, or neither.
 */
type Kind = "cmd" | "dim" | "high" | "crit" | "ok";

type Line = {
  t: string;
  k: Kind;
  wait: number;
  focus?: boolean;
  tag?: string;
  say?: string;
};

/** One entry per line. `t` is exact characters; `wait` is the pause after it. */
const LINES: Line[] = [
  { t: "$ uvx orisan-mcpscan scan-config ./mcp.json --yes", k: "cmd", wait: 700,
    tag: "the command",
    say: "Point it at the config file your AI assistant already uses. Nothing else to set up." },
  { t: "", k: "dim", wait: 250 },
  { t: "  scanning  filesystem · stdio", k: "dim", wait: 900,
    tag: "reading",
    say: "Asks each server what it can do, before any agent is allowed to talk to it." },
  { t: "  scanning  github · streamable-http", k: "dim", wait: 1100 },
  { t: "", k: "dim", wait: 300 },
  { t: "  HIGH      MCP-010   write_file", k: "crit", wait: 600, focus: true,
    tag: "finding",
    say: "This server can create and overwrite files anywhere it can reach, and it did not declare that capability." },
  { t: "  HIGH      MCP-010   edit_file", k: "crit", wait: 600, focus: true,
    tag: "finding",
    say: "Same again for editing. Two undeclared write paths on one server." },
  { t: "  MEDIUM    MCP-004   server_info", k: "high", wait: 500,
    tag: "finding",
    say: "The server describes itself in a way the scanner could not corroborate." },
  { t: "  INFO      MCP-002   transport", k: "dim", wait: 500,
    tag: "noted", say: "Connection method recorded. Nothing wrong with it." },
  { t: "", k: "dim", wait: 400 },
  { t: "  Worst grade: F", k: "crit", wait: 400 },
  { t: "  2 scanned, 0 failed · payload_stored=false", k: "dim", wait: 400,
    tag: "privacy",
    say: "Nothing was uploaded. The report was written to your machine and the payloads were not stored." },
  { t: "  exit 1", k: "dim", wait: 200,
    tag: "result",
    say: "Exits non-zero, so this fails a CI step automatically. You do not have to remember to look." },
];

const INK: Record<Kind, string> = {
  cmd: "text-tx-d",
  dim: "text-tx-term",
  high: "text-suspicion-lit",
  crit: "text-harm-lit",
  ok: "text-holding-lit",
};

const TAG: Record<Kind, string> = {
  cmd: "text-tx-3d",
  dim: "text-tx-3d",
  high: "text-suspicion-lit",
  crit: "text-harm-lit",
  ok: "text-holding-lit",
};

const REDUCED = "(prefers-reduced-motion: reduce)";

/**
 * Read via useSyncExternalStore rather than setState-in-effect: the preference is
 * external state React should subscribe to, and writing it into state
 * synchronously inside an effect causes a cascading render.
 */
function subscribe(cb: () => void) {
  const mq = window.matchMedia(REDUCED);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

export function TerminalReplay() {
  const reduced = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(REDUCED).matches,
    () => false, // server render: assume motion is allowed, the effect corrects it
  );
  const [shown, setShown] = useState(0);
  const [run, setRun] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const queue = timers.current;
    queue.forEach(clearTimeout);
    queue.length = 0;
    if (reduced) {
      // Still async: a synchronous setState in an effect body cascades.
      queue.push(setTimeout(() => setShown(LINES.length), 0));
    } else {
      queue.push(setTimeout(() => setShown(0), 0));
      let t = 250;
      LINES.forEach((line, i) => {
        queue.push(setTimeout(() => setShown(i + 1), t));
        t += line.wait;
      });
    }
    return () => queue.forEach(clearTimeout);
  }, [reduced, run]);

  const says = LINES.filter((l) => l.say);

  return (
    <div>
      <div className="grid gap-0h overflow-hidden rounded-panel border border-rule-dark bg-rule-dark">
        <div className="bg-ink-deep">
          <div className="flex items-center gap-2h border-b border-rule-dark px-5 py-3">
            <div aria-hidden="true" className="flex gap-1h">
              {[0, 1, 2].map((i) => (
                <span key={i} className="block size-2 rounded-full bg-rule-chrome" />
              ))}
            </div>
            <span className="font-mono text-chrome uppercase tracking-20 text-tx-3d">mcpscan</span>
            {/* Inside the pane, so it cannot be cropped away from what it marks. */}
            <span className="ml-auto rounded-full border border-harm px-2h py-1 font-mono text-chrome uppercase tracking-meta text-harm-lit">
              Sample data — not a real run
            </span>
          </div>
          <div className="min-h-term px-6 pb-6 pt-5 font-mono text-xs leading-200">
            {LINES.map((line, i) => (
              <div
                key={i}
                className={[
                  "whitespace-pre transition-opacity duration-150",
                  INK[line.k],
                  line.focus ? "-mx-6 bg-ink-focus px-6" : "",
                  i < shown ? "opacity-100" : "opacity-0",
                ].join(" ")}
              >
                {line.t || " "}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-ink-deep">
          <div className="flex items-center gap-2h border-b border-rule-dark px-5 py-3">
            <span className="font-mono text-chrome uppercase tracking-20 text-tx-3d">
              What that means
            </span>
          </div>
          <div className="flex flex-col gap-0h px-6 pb-5 pt-4">
            {says.map((line, i) => {
              const idx = LINES.indexOf(line);
              return (
                <div
                  key={i}
                  className={[
                    "border-b border-rule-row py-2h transition-opacity duration-300 last:border-b-0",
                    idx < shown ? "opacity-100" : "opacity-0",
                  ].join(" ")}
                >
                  <span className={`mb-1 block font-mono text-micro uppercase tracking-meta ${TAG[line.k]}`}>
                    {line.tag}
                  </span>
                  <p className="max-w-lede text-card leading-155 text-tx-2d">{line.say}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3h font-mono text-fine text-tx-3d">
        <button
          type="button"
          onClick={() => setRun((n) => n + 1)}
          className="rounded-full border border-rule-edge px-4 py-2 font-mono text-meta uppercase tracking-14 text-tx-2d hover:border-rule-hover hover:text-tx-d"
        >
          Replay
        </button>
        {reduced ? <span>motion reduced · full output shown</span> : null}
        <span className="ml-auto">
          Findings sort by (-severity, id, target). Exits non-zero at HIGH by default.
        </span>
      </div>
    </div>
  );
}
