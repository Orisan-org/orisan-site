/**
 * FIGURE 4 — the blast radius. One agent, through credentials, to servers, to what
 * each can reach. The hot path is one credential's reach highlighted.
 *
 * THE INVENTED SPECIFICS ARE GONE. The reference's REACH column read "14
 * repositories", "prod branch", "~/.ssh" and "notes.db" — four readings of a real
 * system nobody has. Replaced with unquantified nouns rather than labelled as
 * sample, because then there is nothing to label: the figure argues that reach
 * compounds, and it makes that argument without claiming a count or a path.
 *
 * `data-ground-from` on AGENT: the black disc is painted by the SVG, not by CSS, so
 * a contrast sweep walking `background-color` sees the section's paper behind white
 * text and reads 1:1. The attribute POINTS at the element that paints the ground; the
 * check resolves the id and reads its computed fill. Nothing is asserted by hand — a
 * literal hex would let a wrong value compute a correct ratio against a false
 * background, which is the defect this whole thread keeps closing.
 */
const MT = "font-mono text-fig tracking-10 fill-grey-1";
// .ms carries the founder's fifth correction: #8A8A86 (3.32:1 on paper) -> grey-2 (7.04:1).
const MS = "font-mono text-figXs tracking-08 fill-grey-2";

const CREDS = [
  { y: 60, label: "ci-deploy-key", hot: true },
  { y: 134, label: "read-only", hot: false },
  { y: 210, label: "local-fs", hot: false },
];
const SERVERS = [
  { y: 34, label: "github · write", hot: true },
  { y: 104, label: "filesystem · rw", hot: true },
  { y: 174, label: "search", hot: false },
  { y: 234, label: "notes", hot: false },
];
const REACH = [
  { y: 24, label: "repositories", hot: true },
  { y: 80, label: "branches", hot: true },
  { y: 136, label: "private keys", hot: true },
  { y: 192, label: "web index", hot: false },
  { y: 242, label: "saved notes", hot: false },
];

const NODE = "fill-paper stroke-rule-node";
const EDGE = "fill-none stroke-rule-wire";
const HOT = "fill-none stroke-harm";

export function MapFigure() {
  return (
    <svg
      viewBox="0 0 1100 300"
      width="100%"
      className="min-w-map"
      role="img"
      aria-label="A graph showing one agent connected through credentials to servers and the data each can reach, with the reach of a single credential highlighted."
    >
      <text className={MS} x="0" y="12">ACTOR</text>
      <circle id="agent-disc" cx="52" cy="150" r="30" className="fill-ink" />
      <text className={`${MT} fill-paper`} x="52" y="153" textAnchor="middle" data-ground-from="agent-disc">
        AGENT
      </text>

      <text className={MS} x="250" y="12">CREDENTIALS</text>
      <path className={HOT} strokeWidth="1.4" d="M82 150 L 250 76" />
      <path className={EDGE} strokeWidth="1" d="M82 150 L 250 150" />
      <path className={EDGE} strokeWidth="1" d="M82 150 L 250 226" />
      {CREDS.map((c) => (
        <g key={c.label}>
          <rect
            x="250" y={c.y} width="126" height="32" rx="16"
            className={c.hot ? "fill-paper stroke-harm" : NODE} strokeWidth="1"
          />
          <text className={MT} x="313" y={c.y + 20} textAnchor="middle">{c.label}</text>
        </g>
      ))}

      <text className={MS} x="500" y="12">SERVERS</text>
      <path className={HOT} strokeWidth="1.4" d="M376 76 L 500 50" />
      <path className={HOT} strokeWidth="1.4" d="M376 76 L 500 120" />
      <path className={EDGE} strokeWidth="1" d="M376 150 L 500 190" />
      <path className={EDGE} strokeWidth="1" d="M376 226 L 500 250" />
      {SERVERS.map((s) => (
        <g key={s.label}>
          <rect
            x="500" y={s.y} width="140" height="32" rx="16"
            className={s.hot ? "fill-paper stroke-harm" : NODE} strokeWidth="1"
          />
          <text className={MT} x="570" y={s.y + 20} textAnchor="middle">{s.label}</text>
        </g>
      ))}

      <text className={MS} x="770" y="12">REACH</text>
      <path className={HOT} strokeWidth="1.4" d="M640 50 L 770 40" />
      <path className={HOT} strokeWidth="1.4" d="M640 50 L 770 96" />
      <path className={HOT} strokeWidth="1.4" d="M640 120 L 770 152" />
      <path className={EDGE} strokeWidth="1" d="M640 190 L 770 208" />
      <path className={EDGE} strokeWidth="1" d="M640 250 L 770 258" />
      {REACH.map((r) => (
        <g key={r.label}>
          <rect
            x="770" y={r.y} width="150" height="32" rx="16"
            className={r.hot ? "fill-paper stroke-harm" : NODE} strokeWidth="1"
          />
          <text className={MT} x="845" y={r.y + 20} textAnchor="middle">{r.label}</text>
        </g>
      ))}

      <path d="M960 20 L 960 180" className="stroke-harm" strokeWidth="1" strokeDasharray="3 4" />
      <text className={`${MS} fill-harm`} x="972" y="96">BLAST RADIUS</text>
      <text className={`${MS} fill-harm`} x="972" y="110">OF ONE KEY</text>
    </svg>
  );
}
