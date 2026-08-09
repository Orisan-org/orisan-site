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
 */
const gradeColor: Record<Grade, string> = {
  A: "border-holding text-holding",
  B: "border-holding text-holding",
  C: "border-suspicion text-suspicion",
  D: "border-suspicion text-suspicion",
  F: "border-harm text-harm",
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
      className={`inline-flex size-8 -rotate-8 items-center justify-center rounded-full border-2 p-1 ${gradeColor[grade]}`}
    >
      <span
        aria-hidden="true"
        className="flex size-full items-center justify-center rounded-full border border-current font-mono text-lg font-medium"
      >
        {grade}
      </span>
    </div>
  );
}
