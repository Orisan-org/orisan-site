/**
 * FIGURE 5 — the floor. Every part can push severity upward across the line; none
 * can push it downward below it.
 *
 * TWO COLOUR CORRECTIONS LAND HERE, both of existing rulings rather than new calls:
 *
 *   .fs  #686864  3.43:1 on ink   -> tx.3d, 8.13:1. The founder's third correction;
 *                                    this figure is one of the two places .fs lives.
 *   harm #9E2B25  2.58:1 as TEXT  -> harm.lit, 8.16:1. NOT in the five. The design
 *                                    paints the downward-crossing labels in the mark
 *                                    colour, which is a severe AA failure as type on
 *                                    ink.
 *
 * The second is the grade stamp's mark-not-glyph rule applied where it was not yet
 * applied: the strokes stay `harm`, because a mark carries the meaning and is not
 * read as type. Only the letters move.
 */
// TYPOGRAPHY ONLY. The fill is set per element and must not live here: `fill-*` is
// one utility group, so a fill in the shared string beats a per-element one on CSS
// source order regardless of the order they appear in the class string. Putting
// fill-tx-3d here silently painted "NOTHING CROSSES DOWNWARD" in grey — and no
// contrast check could see it, because grey on ink is a recorded, passing pair.
// Same bug as the DecisionFigure verdicts, reintroduced by the same shortcut.
const FT = "font-mono text-fig tracking-14";
const FS = "font-mono text-figSm tracking-10";
const FT_FILL = "fill-grey-4";
const FS_FILL = "fill-tx-3d";

const PARTS = [
  { x: 120, top: 52, label: "SCOUT", labelY: 34 },
  { x: 300, top: 38, label: "MCPSCAN", labelY: 24 },
  { x: 480, top: 62, label: "GUARD", labelY: 46 },
  { x: 660, top: 44, label: "REVIEW", labelY: 28 },
  { x: 840, top: 70, label: "THE MAP", labelY: 54 },
];
const BLOCKED = [210, 570, 750];

export function FloorFigure() {
  return (
    <svg
      viewBox="0 0 1000 260"
      width="100%"
      className="min-w-floor"
      role="img"
      aria-label="Signals from every component can push the severity of an action upward across the floor line. None can push it downward below the floor."
    >
      <defs>
        <marker id="floor-up" markerWidth="7" markerHeight="7" refX="3.5" refY="6" orient="auto">
          <path d="M0 6 L3.5 0 L7 6" className="fill-none stroke-holding" strokeWidth="1.3" />
        </marker>
      </defs>

      <line x1="0" y1="130" x2="1000" y2="130" className="stroke-paper" strokeWidth="2" />
      <text className={`${FT} fill-paper`} x="0" y="120">THE FLOOR</text>
      <text className={`${FS} ${FS_FILL}`} x="880" y="120">NOT A SETTING</text>

      <g className="fill-none stroke-holding" strokeWidth="1.3" markerEnd="url(#floor-up)">
        {PARTS.map((p) => (
          <path key={p.label} d={`M${p.x} 118 L ${p.x} ${p.top}`} />
        ))}
      </g>
      {PARTS.map((p) => (
        <text key={p.label} className={`${FT} ${FT_FILL}`} x={p.x} y={p.labelY} textAnchor="middle">
          {p.label}
        </text>
      ))}
      <text className={`${FS} ${FS_FILL}`} x="0" y="20">EVERY PART CAN TIGHTEN</text>

      {/* Marks, not type: these stay in the mark colour. */}
      <g className="stroke-harm" strokeWidth="1.3" strokeDasharray="4 4">
        {BLOCKED.map((x) => (
          <path key={x} d={`M${x} 142 L ${x} 196`} className="fill-none" />
        ))}
      </g>
      <g className="stroke-harm" strokeWidth="1.8">
        {BLOCKED.map((x) => (
          <path key={x} d={`M${x - 8} 150 l16 16 M${x + 8} 150 l-16 16`} />
        ))}
      </g>

      <text className={`${FS} fill-harm-lit`} x="0" y="212">NOTHING CROSSES DOWNWARD</text>
      <text className={`${FS} ${FS_FILL}`} x="0" y="244">
        A COMPONENT CAN BE WRONG, STALE OR COMPROMISED. THE WORST IT ACHIEVES IS
        OVER-REPORTING.
      </text>
    </svg>
  );
}
