import { EYEBROW, P, WRAP } from "./chrome";

/**
 * SECTION 2 — why now.
 *
 * It used to be four dated stops on a hairline rail: an EU cell, a Texas cell, a
 * procurement cell and an incident cell. Three carried claims about the reader's
 * world and one of those was false — AI Act Article 12 record-keeping was said to
 * apply to high-risk systems from 2 August 2026, which Regulation (EU) 2026/1744
 * had already made untrue three weeks before this site deployed. All three went.
 *
 * WHY THE "NOW" COMES FROM THE TECHNOLOGY AND NOT FROM A REGULATOR. The deleted
 * cells were the only copy on the site that could go false while every gate stayed
 * green: nothing in the repo changes when a law moves, so nothing failed, and the
 * page went on saying it. The heading below supplies the same urgency from a fact
 * about what agents now do, which no external body can reverse and no review
 * interval has to watch.
 *
 * The incident cell's two sentences are kept verbatim — they were the only ones in
 * the section that never leaned on a statute — and "No statute needed" moves to the
 * end, where it closes the argument instead of announcing it.
 */
export function Clock() {
  return (
    <section id="why" className="pb-f-64-120 pt-f-56-104">
      <div className={WRAP}>
        <div className="grid grid-cols-headline items-end gap-7h to-780:grid-cols-stack">
          <div>
            <span className={EYEBROW}>Why now</span>
            <h2 className="mt-5h max-w-ch16 text-3xl font-semibold">
              Agents used to suggest. Now they act.
            </h2>
          </div>
        </div>

        <p className={`${P} mt-f-44-76 text-lg leading-160`}>
          Once something can act on its own, what it did stops being an academic
          question. &ldquo;We cannot tell you what the agent did&rdquo; is a position,
          and not a good one. No statute needed.
        </p>
      </div>
    </section>
  );
}
