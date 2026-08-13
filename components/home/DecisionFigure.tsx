/**
 * FIGURE 1 — the live decision. Three call shapes reduce to one, which Orisan
 * resolves to exactly one of three outcomes. The three outcome groups share a 9s
 * cycle so only one verdict reads at a time; that is the argument the figure is
 * making, not decoration.
 *
 * Element order follows the reference exactly. It is paint order, not style
 * grouping: the centre rect is opaque, so the two labels inside it must be drawn
 * after it. Grouping these by shared class hides them behind the rect.
 *
 * Colours are token classes rather than fill/stroke attributes so the colour gate
 * can see them: attribute values live in HTML, and the gate reads built CSS.
 */

// .lb and .sm in the reference stylesheet.
const LB = "font-mono text-figLg tracking-meta fill-tx-label";
// .sm is the founder's contrast correction: #686864 (3.43:1) -> #9D9D99 (7.04:1).
const SM = "font-mono text-figXs tracking-10 fill-tx-3d";

export function DecisionFigure() {
  return (
    <svg
      viewBox="0 0 520 400"
      width="100%"
      role="img"
      aria-label="An agent's tool call reduces to one shape of actor, target and authority, which Orisan resolves to one of three outcomes: allowed, held for a human, or stopped."
    >
      <text className={SM} x="0" y="14">AGENT CALLS</text>

      <g className="fill-none stroke-rule-stroke" strokeWidth="1.1">
        <rect x="0" y="30" width="112" height="30" rx="15" />
        <rect x="0" y="82" width="112" height="30" rx="15" />
        <rect x="0" y="134" width="112" height="30" rx="15" />
      </g>
      <text className={LB} x="56" y="49" textAnchor="middle">SHELL</text>
      <text className={LB} x="56" y="101" textAnchor="middle">MCP</text>
      <text className={LB} x="56" y="153" textAnchor="middle">BROWSER</text>

      <g
        className="animate-flow fill-none stroke-rule-line motion-reduce:animate-none"
        strokeWidth="1"
        strokeDasharray="4 5"
      >
        <path d="M112 45 C 160 45, 168 92, 206 97" />
        <path d="M112 97 L 206 97" />
        <path d="M112 149 C 160 149, 168 102, 206 97" />
      </g>

      <rect
        x="206" y="76" width="150" height="44" rx="13"
        className="fill-ink-shape stroke-rule-stroke" strokeWidth="1.1"
      />
      <text className={LB} x="281" y="95" textAnchor="middle">ONE SHAPE</text>
      <text className={SM} x="281" y="109" textAnchor="middle">actor · target · authority</text>

      <path d="M281 120 L 281 176" className="fill-none stroke-rule-line" strokeWidth="1" />
      <circle cx="281" cy="200" r="24" className="fill-none stroke-rule-stroke" strokeWidth="1.1" />
      <circle cx="281" cy="200" r="7" className="animate-pulse fill-accent-d motion-reduce:animate-none" />
      <text className={LB} x="281" y="246" textAnchor="middle">ORISAN</text>
      <text className={SM} x="281" y="259" textAnchor="middle">deterministic · in-path · local</text>

      <g className="fill-none stroke-rule-line opacity-55" strokeWidth="1">
        <path d="M305 195 C 350 186, 356 316, 396 316" />
        <path d="M305 200 C 350 200, 356 250, 396 250" />
        <path d="M305 205 C 350 214, 356 382, 396 382" />
      </g>

      <g className="animate-outA opacity-18 motion-reduce:animate-none motion-reduce:opacity-100">
        <rect x="396" y="300" width="124" height="32" rx="16" className="fill-none stroke-holding" strokeWidth="1.4" />
        <text x="458" y="320" textAnchor="middle" className={`${LB} fill-holding-lit`}>ALLOWED</text>
      </g>
      <g className="animate-outH opacity-18 motion-reduce:animate-none motion-reduce:opacity-100">
        <rect x="396" y="234" width="124" height="32" rx="16" className="fill-none stroke-suspicion" strokeWidth="1.4" />
        <text x="458" y="248" textAnchor="middle" className={`${LB} fill-suspicion-lit`}>HELD</text>
        <text x="458" y="260" textAnchor="middle" className={`${SM} fill-suspicion-sub`}>for a human</text>
      </g>
      <g className="animate-outS opacity-18 motion-reduce:animate-none motion-reduce:opacity-100">
        <rect x="396" y="366" width="124" height="32" rx="16" className="fill-none stroke-harm" strokeWidth="1.4" />
        <text x="458" y="386" textAnchor="middle" className={`${LB} fill-harm-lit`}>STOPPED</text>
        <path d="M362 376 l11 11 M373 376 l-11 11" className="stroke-harm" strokeWidth="1.6" />
      </g>
    </svg>
  );
}
