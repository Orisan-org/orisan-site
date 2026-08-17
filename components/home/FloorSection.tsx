import { EM_INK, EYEBROW_INK, P_INK, WRAP } from "./chrome";
import { FloorFigure } from "./FloorFigure";

/**
 * SECTION 7 — the floor. A design commitment, and the closing line says outright
 * that it is not a proven property. Left exactly as written: it is the most
 * carefully hedged sentence in the reference and it should stay that way.
 */
export function FloorSection() {
  return (
    <div className="border-t border-rule-dark bg-ink text-tx-d">
      <section className="py-f-110-220">
        <div className={WRAP}>
          <span className={EYEBROW_INK}>A design commitment</span>
          <h2 className="mt-5h max-w-ch20 text-3xl font-semibold">
            Any part can raise suspicion.
            <br />
            <span className={EM_INK}>No part can grant permission.</span>
          </h2>

          <div className="mt-f-38-64 overflow-x-auto">
            <FloorFigure />
          </div>

          <p className={`${P_INK} mt-9 text-sm leading-160`}>
            This is a commitment about our own design. Its verification is a test
            obligation against the built system, and we have not claimed it is proven.
          </p>

          {/*
            Both folded in from /vision when that route was deleted.

            THE FIRST NAMES NO IDENTIFIERS ON PURPOSE. CLAIMS rows 49 and 50 permit
            publishing the SHAPE of a residual risk and forbid its address — no finding
            identifiers, no severities, no dispositions, no named areas — and row 50
            records that an earlier paraphrase of a disposition was cut, because a
            paraphrased disposition is still a published disposition. The two things
            described here are real findings in a Restricted internal document. This
            wording is shape only, and CLAIMS row 83 records that as a decision so the
            vagueness does not read as sloppiness to the next person who edits it.
          */}
          <p className={`${P_INK} mt-6h text-sm leading-160`}>
            Two things here are not proven. Whether the pieces, each safe on its own, can
            be chained into something none of them would allow alone. And whether someone
            can deliberately make the system cry wolf, so the people watching it stop
            listening. Neither can be settled by argument. Both have to be attacked in the
            real thing, and that has not happened yet.
          </p>

          <p className={`${P_INK} mt-6h text-sm leading-160`}>
            The map only works if we know which agent did what. Get that attribution wrong
            and everything built on it is wrong too: the reach it calculates, the suspicion
            it raises. The identity layer has to be real before anything is allowed to act
            on the map.
          </p>
        </div>
      </section>
    </div>
  );
}
