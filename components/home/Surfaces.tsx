import { EYEBROW, P, WRAP } from "./chrome";

/**
 * SECTION 4 — the surfaces. An asymmetric grid on a hairline lattice, with the
 * one shipping surface weighted to twice the size in both axes.
 *
 * The status system came off the grid. Six of seven repositories are private and
 * one has no code at all, and at that ratio a readiness board costs more than it
 * returns: six cells reading "Designed" invite the reader to tally what does not
 * exist, and every badge is a claim with a staleness clock. One badge remains, on
 * mcpscan, which is the only piece that is public, installable and versioned.
 *
 * Each cell now carries what the piece is FOR, in one line. Those lines are design
 * descriptions of intended function, not statements of availability — CLAIMS.md
 * carries one row covering all seven, because there is one claim being made.
 *
 * The status dots went with the badges: three lit for shipping, two for in build,
 * one for designed WAS the status system in another form. Kept as ornament they
 * would be decoration, which the design system bans outright.
 *
 * Repository names went the same way, for the same reason a badge would: naming
 * `orisan-scout` implies a repository a reader can find, and six of them 404.
 * mcpscan keeps its package name because `orisan-mcpscan` resolves on PyPI.
 */
const SURFACES: { name: string; line: string }[] = [
  { name: "Scout",
    line: "Find what is already running: the agents, servers and credentials nobody wrote down." },
  { name: "Guard",
    line: "See what an agent is about to send out, and where it goes." },
  { name: "Relay",
    line: "Stand in the path of an action, so a bad one can be stopped rather than reported." },
  { name: "Review",
    line: "Check what the agent produced before a person or another system acts on it." },
  { name: "Control plane",
    line: "Where the rules are written and the evidence is kept." },
  { name: "The map",
    line: "How far one compromised agent reaches, across every server and credential it touches." },
];

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
        {/*
          The middle sentence — "this is the shape it is being built to, not a list of
          what you can install, six of these are design, and the line under each says
          what it is for rather than what it does yet" — is gone. It told the reader
          how to read the grid below it, and a section that has to explain how to read
          itself has a design problem rather than a copy one.
          
          It needed no replacement mechanism, because four already exist and were
          checked in the render before this was cut: the shipping cell spans 2x2 where
          every sibling is 1x1, carries `bg-paper-deep` where they are plain, sets its
          name at `text-feature` against their `text-surface`, and is the only cell
          with a status label. The distinction reads instantly at 1440.
          
          What survives still carries the availability claim twice: the h2 says "Seven
          pieces. One is shipping," and the closing sentence says one is installable,
          which leaves the other six unclaimed. The six lines are imperatives, and per
          the grammar rule an imperative asserts no existence.
        */}
        <p className={`${P} mt-5h max-w-lede text-lg`}>
          One system in seven pieces, sharing one record and one switch. One of them you
          can install today.
        </p>

        <div className="mt-f-38-64 grid auto-rows-surface grid-cols-quartet border-l border-t border-rule to-1000:grid-cols-pair to-600:grid-cols-stack">
          {/* the one shipping surface is the biggest thing in the grid */}
          <div className={`${CELL} col-span-2 row-span-2 justify-start bg-paper-deep px-9h py-10 to-600:col-span-1`}>
            <div className="text-feature font-semibold text-ink">mcpscan</div>
            <div className="mt-2h font-mono text-repoLg text-grey-1">orisan-mcpscan</div>
            {/*
              A "for" line, imperative, matching the grid's dominant form: four of the
              six siblings open Find / See / Stand / Check, and two are wh-clauses.
              It replaces "Grade an MCP server before you connect an agent to it.",
              which duplicated section 5's heading at 1.00 overlap one section later.
              "before you connect" now belongs to that heading alone.
            */}
            <p className={`${P} mt-5h max-w-ch34 flex-zero text-h4 leading-160 tracking-normal`}>
              Know what a server can do, without taking its word for it.
            </p>
            {/*
              Three clauses, each verified against mcpscan-work 9649575 before
              shipping and cited in CLAIMS. "Offline" is deliberately NOT used: it
              is ambiguous in the one direction that already bit us, and scanning a
              server involves talking to it.
            */}
            {/*
              "Nothing leaves your machine unless you send it" was here, in section 5,
              and on /product — three times, twice of them on this page. Section 5 keeps
              it: that is where the recorded transcript is, and the section that
              demonstrates the property should own the sentence that states it.
            */}
            <p className={`${P} mt-3h max-w-ch34 flex-zero text-card leading-160`}>
              Deterministic. No model in the scanner.
            </p>
            <div className="mt-auto pt-7 font-mono text-label uppercase tracking-meta text-holding-status">
              Shipping now
            </div>
          </div>

          {SURFACES.map((s, i) => (
            // The last two sit alone on the closing row now that the legend cell has
            // left the grid. Spanning them keeps the lattice closed rather than
            // leaving two empty bordered boxes.
            <div key={s.name} className={`${CELL} ${PAD} ${i >= 4 ? "col-span-2 to-600:col-span-1" : ""}`}>
              <div className="text-surface font-semibold leading-160 text-ink">{s.name}</div>
              <p className={`${P} mt-3h flex-1 text-card leading-160`}>{s.line}</p>
            </div>
          ))}

        </div>

        {/*
          Was a legend cell inside the grid. A legend explains badges and the badges
          are gone, so the framing went and the sentence stayed: it makes no count
          claim, and the link resolves to ground truth, so a reader who follows it
          sees exactly two repositories and calibrates on the spot. Self-verifying
          copy, and the only sentence in the section that touches publicness.
        */}
        <p className={`${P} mt-6 flex flex-wrap items-baseline gap-3h text-legend leading-160`}>
          Public repositories are open and early.
          <a
            href="https://github.com/Orisan-org"
            className="border-b border-rule font-mono text-label uppercase tracking-meta text-ink no-underline"
          >
            github.com/Orisan-org →
          </a>
        </p>
      </div>
    </section>
  );
}
