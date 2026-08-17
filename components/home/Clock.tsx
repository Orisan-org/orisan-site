import { EYEBROW, P, WRAP } from "./chrome";

/**
 * SECTION 2 — the clock. Deliberately denser than the hero: four dated stops on
 * a single hairline rail. The rail is a real element rather than a ::before,
 * because `content: ""` has no token form. Identical output.
 */
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

        {/*
          The dated regulatory stops are gone: the EU cell asserted that AI Act
          Article 12 record-keeping applied to high-risk systems from 2 August 2026,
          which Regulation (EU) 2026/1744 had already made untrue before this site
          deployed. Removed with the Texas and procurement cells in the same commit.

          What remains was the fourth stop and it is the only one that never leaned
          on a statute, so it is set as body copy rather than left hanging off a
          four-column rail with three empty columns. Its words are unchanged.
        */}
        <p className={`${P} mt-f-44-76 text-lg leading-160`}>
          No statute needed. &ldquo;We cannot tell you what the agent did&rdquo; is a
          position, and not a good one.
        </p>
      </div>
    </section>
  );
}
