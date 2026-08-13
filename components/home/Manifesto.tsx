import { EM_INK, EYEBROW_INK, P_INK, WRAP } from "./chrome";

/**
 * SECTION 3 — the manifesto. A hard cut to ink on a hairline seam, carrying the
 * widest type on the page. The second paragraph is the honesty clause and is
 * load-bearing: it says outright that none of this ships yet.
 */
export function Manifesto() {
  return (
    <div className="border-t border-rule-dark bg-ink text-tx-d">
      <section className="py-f-90-180">
        <div className={WRAP}>
          <span className={EYEBROW_INK}>What we are building</span>
          <h2 className="mt-7 max-w-ch12 text-4xl font-semibold">
            An evidence layer.
            <br />
            <span className={EM_INK}>And a brake.</span>
          </h2>
          <div className="mt-f-36-64 grid grid-cols-manifesto items-start gap-f-30-80 to-880:grid-cols-stack">
            <p className={`${P_INK} max-w-lede text-lg`}>
              One local binary in the path of an agent&apos;s actions. Every call reduced to
              the same shape, attributed to an actor, written to a record a third party can
              check. The binary that watches is the one that can stop an action before it
              lands.
            </p>
            <p className={`${P_INK} max-w-ch40 text-sm leading-160`}>
              None of that ships yet. What exists today is below, with dates. Every factual
              claim on this site is listed in a public file with the source that verifies it.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
