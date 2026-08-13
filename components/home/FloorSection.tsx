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
        </div>
      </section>
    </div>
  );
}
