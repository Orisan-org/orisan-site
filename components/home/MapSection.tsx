import { EYEBROW, P, WRAP } from "./chrome";
import { MapFigure } from "./MapFigure";

/** SECTION 6 — the map. The figure runs edge to edge, past the wrap. */
export function MapSection() {
  return (
    <section className="pb-f-72-140 pt-f-140-220">
      <div className={WRAP}>
        <div className="flex flex-wrap items-end justify-between gap-7h">
          <div>
            <span className={EYEBROW}>Designed · the map</span>
            <h2 className="mt-5h max-w-ch15 text-3xl font-semibold">
              How far does
              <br />
              a mistake travel?
            </h2>
          </div>
          <p className={`${P} max-w-ch36 text-sm leading-160`}>
            One agent, one credential, one server. Reach is what turns a small mistake into
            an incident, and almost nobody has it written down.
          </p>
        </div>
      </div>

      <div className="mt-f-44-76 overflow-x-auto border-y border-rule py-f-30-56">
        <div className={WRAP}>
          <MapFigure />
        </div>
      </div>
    </section>
  );
}
