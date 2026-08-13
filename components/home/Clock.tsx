import { EYEBROW, P, WRAP } from "./chrome";

/**
 * SECTION 2 — the clock. Deliberately denser than the hero: four dated stops on
 * a single hairline rail. The rail is a real element rather than a ::before,
 * because `content: ""` has no token form. Identical output.
 */
const STOPS = [
  {
    when: "EU · in force",
    num: "08.26",
    head: "Article 12 record-keeping",
    body: "Applicable to high-risk systems since 2 August 2026.",
  },
  {
    when: "Texas",
    num: "01.26",
    head: "TRAIGA in effect",
    body: "NIST AI RMF compliance is an affirmative defence.",
  },
  {
    when: "Procurement",
    num: "42001",
    head: "Questionnaires gate deals",
    body: "Auditors certify evidence, not intentions.",
  },
  {
    when: "Every incident",
    num: "—",
    head: "No statute needed",
    body: '"We cannot tell you what the agent did" is a position, and not a good one.',
  },
];

export function Clock() {
  return (
    <section id="why" className="pb-f-64-120 pt-f-56-104">
      <div className={WRAP}>
        <div className="grid grid-cols-headline items-end gap-7h to-780:grid-cols-stack">
          <div>
            <span className={EYEBROW}>Why now</span>
            <h2 className="mt-5h max-w-ch16 text-3xl font-semibold">
              The questions are already arriving.
            </h2>
          </div>
        </div>

        <div className="relative mt-f-44-76">
          {/* .rail:before — the hairline the four stops hang from */}
          <div aria-hidden="true" className="absolute inset-x-0 top-16 h-px bg-rule to-940:hidden" />
          <div className="grid grid-cols-quartet gap-6h to-940:grid-cols-pair to-600:grid-cols-stack">
            {STOPS.map((s) => (
              <div key={s.head}>
                <span className="font-mono text-meta uppercase tracking-20 text-grey-1">
                  {s.when}
                </span>
                <div className="mt-3 font-mono text-figure font-medium text-ink">{s.num}</div>
                <div className="relative mt-7 h-px bg-rule">
                  <i
                    aria-hidden="true"
                    className="absolute left-0 top-1/2 size-1h -translate-y-1/2 rounded-full bg-ink"
                  />
                </div>
                <h3 className="mt-6 text-h4 font-semibold text-ink">{s.head}</h3>
                <p className={`${P} mt-2 text-sm leading-160`}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
