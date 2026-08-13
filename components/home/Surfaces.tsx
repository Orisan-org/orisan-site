import { EYEBROW, P, WRAP } from "./chrome";

/**
 * SECTION 4 — the surfaces. An asymmetric grid on a hairline lattice, with the
 * one shipping surface weighted to twice the size in both axes.
 *
 * Status is literal and colour-bound: three dots lit for shipping, two for in
 * build, one for designed. The legend cells spell out what each word commits to.
 */
type Status = "ship" | "build" | "des";

const STATUS: Record<Status, { label: string; lit: number; dot: string; text: string }> = {
  ship:  { label: "Shipping", lit: 3, dot: "bg-holding",   text: "text-holding-status" },
  build: { label: "In build", lit: 2, dot: "bg-suspicion", text: "text-suspicion-status" },
  des:   { label: "Designed", lit: 1, dot: "bg-dim",       text: "text-grey-2" },
};

const SURFACES: { name: string; repo: string; body: string; status: Status }[] = [
  { name: "Scout", repo: "orisan-scout", status: "build",
    body: "Finds the agents, servers and automations already running, including the unregistered ones." },
  { name: "Guard", repo: "orisan-guard", status: "build",
    body: "Watches what leaves the machine and marks the paths where sensitive context escapes." },
  { name: "Relay", repo: "orisan-relay", status: "build",
    body: "The in-path binary. Sees each tool call before it executes and decides whether it proceeds." },
  { name: "Review", repo: "—", status: "des",
    body: "Judges what an agent produced, and marks actors whose output stops being trustworthy." },
  { name: "Control plane", repo: "—", status: "des",
    body: "The fleet view. Requests, never compels. No central switch that acts on every endpoint at once." },
  { name: "The map", repo: "—", status: "des",
    body: "A shared blast-radius graph. What each actor can reach, and how far a mistake travels." },
];

function Dots({ status }: { status: Status }) {
  const { lit, dot } = STATUS[status];
  return (
    <div aria-hidden="true" className="mb-5 flex gap-1">
      {[0, 1, 2].map((i) => (
        <span key={i} className={`block size-1h rounded-full ${i < lit ? dot : "bg-rule"}`} />
      ))}
    </div>
  );
}

// Borders and flow only. Padding is per-cell: the feature cell sets its own, and
// `px-*` and `pl-*`/`pr-*` are the same utility group, so a shared `pl-6 pr-6`
// here silently wins over the feature cell's `px-9h` regardless of class order.
const CELL = "flex flex-col border-b border-r border-rule";
const PAD = "pb-7 pl-6 pr-6 pt-6h";

export function Surfaces() {
  return (
    <section id="surfaces" className="py-f-72-140">
      <div className={WRAP}>
        <span className={EYEBROW}>The surfaces</span>
        <h2 className="mt-5h max-w-ch14 text-3xl font-semibold">
          Seven pieces.
          <br />
          One is shipping.
        </h2>

        <div className="mt-f-38-64 grid auto-rows-surface grid-cols-quartet border-l border-t border-rule to-1000:grid-cols-pair to-600:grid-cols-stack">
          {/* the one shipping surface is the biggest thing in the grid */}
          <div className={`${CELL} col-span-2 row-span-2 justify-start bg-paper-deep px-9h py-10 to-600:col-span-1`}>
            <Dots status="ship" />
            <div className="text-feature font-semibold text-ink">mcpscan</div>
            <div className="mt-2h font-mono text-repoLg text-grey-1">orisan-mcpscan</div>
            <p className={`${P} mt-5h max-w-ch34 flex-zero text-h4 leading-160 tracking-normal`}>
              Grades an MCP server before an agent connects to it. Deterministic, offline, no
              model in the scanner.
            </p>
            <div className={`mt-auto pt-7 font-mono text-label uppercase tracking-meta ${STATUS.ship.text}`}>
              {STATUS.ship.label}
            </div>
          </div>

          {SURFACES.map((s) => (
            <div key={s.name} className={`${CELL} ${PAD}`}>
              <Dots status={s.status} />
              <div className="text-surface font-semibold leading-160 text-ink">{s.name}</div>
              <div className="mt-1 font-mono text-repo text-grey-1">{s.repo}</div>
              <p className={`${P} mt-3h flex-1 text-card leading-160`}>{s.body}</p>
              <div className={`mt-4h font-mono text-label uppercase tracking-meta ${STATUS[s.status].text}`}>
                {STATUS[s.status].label}
              </div>
            </div>
          ))}

          <div className={`${CELL} ${PAD} bg-transparent`}>
            <p className={`${P} flex-1 text-legend leading-160`}>
              Each status is literal. <span className="font-mono text-inlineMono">Shipping</span>:
              installable today, every claim verified.{" "}
              <span className="font-mono text-inlineMono">In build</span>: repository public and
              early, nothing claimed.{" "}
              <span className="font-mono text-inlineMono">Designed</span>: specified and
              threat-modelled, no code to rely on.
            </p>
          </div>

          <div className={`${CELL} ${PAD} justify-end bg-transparent`}>
            <p className={`${P} text-legend leading-160`}>Public repositories are open and early.</p>
            <div className="mt-3h font-mono text-label uppercase tracking-meta text-ink">
              <a href="https://github.com/Orisan-org" className="border-b border-rule no-underline">
                github.com/Orisan-org →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
