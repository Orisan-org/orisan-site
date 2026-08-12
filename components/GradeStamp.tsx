/**
 * The grades mcpscan actually emits. There is no E: the published
 * `grade_for()` returns F, D, C, B or A and nothing else, so a stamp for E
 * would advertise a verdict the product cannot produce.
 */
type Grade = "A" | "B" | "C" | "D" | "F";

/**
 * Colour is bound to meaning, never chosen for looks. SLICES.md anchors three
 * grades (A holding, D suspicion, F harm); neighbours share their band:
 * A-B the floor held, C-D raised, F damage.
 *
 * The binding is to the MARK — the ring and the fill — not to the glyph. The
 * mark values are shape colours and measured 2.79:1 to 3.00:1 as type on paper,
 * an AA failure. The letter is therefore ink and the meaning is carried by the
 * two rings and the wash behind them, which is where a rubber stamp carries it
 * anyway.
 */
const mark: Record<Grade, { ring: string; fill: string }> = {
  A: { ring: "border-holding-text", fill: "bg-holding-fill" },
  B: { ring: "border-holding-text", fill: "bg-holding-fill" },
  C: { ring: "border-suspicion-text", fill: "bg-suspicion-fill" },
  D: { ring: "border-suspicion-text", fill: "bg-suspicion-fill" },
  F: { ring: "border-harm-text", fill: "bg-harm-fill" },
};

/**
 * The A-to-F mark from mcpscan's own output. Double ring, rotated off the
 * grid like a hand stamp. Only appears where real product output is shown —
 * never as decoration.
 */
export function GradeStamp({ grade }: { grade: Grade }) {
  return (
    <div
      role="img"
      aria-label={`Grade ${grade}`}
      className={`inline-flex size-8 -rotate-8 items-center justify-center rounded-full border-2 p-1 ${mark[grade].ring} ${mark[grade].fill}`}
    >
      <span
        aria-hidden="true"
        className={`flex size-full items-center justify-center rounded-full border font-mono text-lg font-medium text-ink ${mark[grade].ring}`}
      >
        {grade}
      </span>
    </div>
  );
}
