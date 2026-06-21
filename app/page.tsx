import type { Metadata } from "next";
import Link from "next/link";
import { lineup, mcpscan, pageMetadata, sampleReport, siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: pageMetadata.home.title,
  description: pageMetadata.home.description,
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--ink-faint)]">{children}</p>;
}

function ReportBlock() {
  return (
    <pre tabIndex={0} aria-label="Illustrative mcpscan report output" className="overflow-x-auto border border-[var(--rule-2)] bg-[#0E1413] p-5 font-mono text-[12.5px] leading-relaxed text-[var(--ink-dim)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[var(--sun)]">
      {sampleReport.split("\n").map((line, i) => {
        const high = /\bhigh\b/.test(line);
        return (
          <span key={i} className={high ? "text-[var(--sun)]" : undefined}>
            {line}
            {"\n"}
          </span>
        );
      })}
    </pre>
  );
}

function FlowDiagram() {
  // Thin-line lifecycle: agent -> tools/MCP -> Orisan observes -> stop. The only
  // amber is the "stop" control, because that is the point that carries meaning.
  return (
    <svg viewBox="0 0 720 150" className="w-full" role="img" aria-label="AI agent connects to tools and MCP servers; Orisan observes the activity and can stop it.">
      <defs>
        <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#5E6E69" />
        </marker>
      </defs>
      {[
        { x: 12, label: "AI agent", sub: "model / assistant" },
        { x: 250, label: "Tools & MCP", sub: "servers, resources" },
        { x: 488, label: "Orisan", sub: "observe + record", accent: false },
      ].map((n) => (
        <g key={n.label}>
          <rect x={n.x} y={40} width={190} height={66} fill="#141A19" stroke="rgba(236,231,218,0.18)" />
          <text x={n.x + 16} y={70} fill="#ECE7DA" fontFamily="monospace" fontSize="14">{n.label}</text>
          <text x={n.x + 16} y={90} fill="#9DAAA5" fontFamily="monospace" fontSize="11">{n.sub}</text>
        </g>
      ))}
      <line x1={202} y1={73} x2={248} y2={73} stroke="#5E6E69" strokeWidth="1.5" markerEnd="url(#arr)" />
      <line x1={440} y1={73} x2={486} y2={73} stroke="#5E6E69" strokeWidth="1.5" markerEnd="url(#arr)" />
      {/* stop control */}
      <rect x={678} y={40} width={30} height={66} fill="rgba(232,160,44,0.10)" stroke="rgba(232,160,44,0.55)" />
      <text x={693} y={70} fill="#E8A02C" fontFamily="monospace" fontSize="11" textAnchor="middle">S</text>
      <text x={693} y={86} fill="#E8A02C" fontFamily="monospace" fontSize="11" textAnchor="middle">T</text>
      <text x={693} y={102} fill="#E8A02C" fontFamily="monospace" fontSize="11" textAnchor="middle">P</text>
      <line x1={678} y1={73} x2={636} y2={73} stroke="#E8A02C" strokeWidth="1.5" markerEnd="url(#arr)" />
      <text x={500} y={130} fill="#8B958F" fontFamily="monospace" fontSize="11">stop the activity when needed</text>
    </svg>
  );
}

export default function HomePage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="container-shell grid gap-12 py-20 md:grid-cols-[1.05fr_1fr] md:py-28">
        <div>
          <Eyebrow>Local-first security for AI &amp; MCP</Eyebrow>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.08] tracking-[-0.02em] text-balance md:text-5xl">
            See what your AI and agents do. Stop them when needed.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-[var(--ink-dim)]">
            Orisan builds security tools for AI and the Model Context Protocol (MCP) — the open standard that lets AI
            agents call tools and read resources. The tools run locally, on your machine or in your environment.
            Nothing is uploaded.
          </p>
          <p className="mt-4 max-w-xl text-[var(--ink-dim)]">
            <span className="text-[var(--ink)]">mcpscan</span> is the active project today. The control plane — the layer
            that lets an organization watch agent activity and halt it — is the direction.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#mcpscan"
              className="border border-[var(--rule-2)] bg-[var(--ink)] px-5 py-3 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--bg)] transition hover:border-[var(--sun)] hover:bg-[var(--sun)]"
            >
              See mcpscan
            </a>
            <Link
              href="/about"
              className="border border-[var(--rule-2)] px-5 py-3 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--ink-dim)] transition hover:border-[var(--sun)] hover:text-[var(--ink)]"
            >
              How it&apos;s built
            </Link>
          </div>
        </div>
        <div className="self-center">
          <ReportBlock />
          <p className="mt-3 font-mono text-xs text-[var(--ink-faint)]">Illustrative mcpscan output. Findings carry redacted evidence; raw payloads are never stored.</p>
        </div>
      </section>

      {/* mcpscan */}
      <section id="mcpscan" className="border-t border-[var(--rule)]">
        <div className="container-shell grid gap-12 py-20 md:grid-cols-[1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-semibold tracking-[-0.01em]">mcpscan</h2>
              <span className="border border-[var(--amber-border)] bg-[var(--amber-soft)] px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--sun)]">
                {mcpscan.status}
              </span>
            </div>
            <p className="mt-5 text-[var(--ink-dim)]">{mcpscan.description}</p>
            <p className="mt-4 text-[var(--ink-dim)]">
              An MCP server can expose tools that run commands, resources that read files, and prompts that steer a
              model. mcpscan shows you that surface and flags the risky parts before an agent ever connects.
            </p>
            <p className="mt-4 text-sm text-[var(--ink-faint)]">{mcpscan.note}</p>
          </div>
          <div>
            <Eyebrow>Run from source</Eyebrow>
            <pre tabIndex={0} aria-label="mcpscan source install commands" className="mt-3 overflow-x-auto border border-[var(--rule-2)] bg-[#0E1413] p-5 font-mono text-[12.5px] leading-relaxed text-[var(--ink-dim)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[var(--sun)]">
              {mcpscan.install.map((l) => `$ ${l}`).join("\n")}
            </pre>
            <p className="mt-3 font-mono text-xs text-[var(--ink-faint)]">Requires repository access — mcpscan is pre-publication.</p>
          </div>
        </div>
      </section>

      {/* Flow diagram */}
      <section className="border-t border-[var(--rule)]">
        <div className="container-shell py-20">
          <Eyebrow>What the control plane is for</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-2xl font-semibold tracking-[-0.01em]">
            Agents reach tools. You should be able to watch that — and stop it.
          </h2>
          <div className="mt-10 border border-[var(--rule)] bg-[var(--bg-2)] p-6 md:p-10">
            <FlowDiagram />
          </div>
        </div>
      </section>

      {/* Lineup */}
      <section className="border-t border-[var(--rule)]">
        <div className="container-shell py-20">
          <Eyebrow>Where each piece stands</Eyebrow>
          <h2 className="mt-4 text-2xl font-semibold tracking-[-0.01em]">The lineup, at its honest maturity</h2>
          <p className="mt-4 max-w-2xl text-[var(--ink-dim)]">
            One product is shipping. The rest are stated as what they are — directions and prototypes, not finished
            products.
          </p>
          <div className="mt-10 overflow-hidden border border-[var(--rule)]">
            {lineup.map((item, i) => {
              const active = item.status.startsWith("Active");
              return (
                <div
                  key={item.name}
                  className={`grid gap-2 px-5 py-5 md:grid-cols-[160px_180px_1fr] md:items-baseline ${i > 0 ? "border-t border-[var(--rule)]" : ""}`}
                >
                  <div className="font-mono text-sm text-[var(--ink)]">{item.name}</div>
                  <div className={`font-mono text-xs uppercase tracking-[0.08em] ${active ? "text-[var(--sun)]" : "text-[var(--ink-faint)]"}`}>
                    {item.status}
                  </div>
                  <div className="text-sm text-[var(--ink-dim)]">{item.summary}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open core */}
      <section className="border-t border-[var(--rule)]">
        <div className="container-shell grid gap-10 py-20 md:grid-cols-[1fr_1fr]">
          <div>
            <Eyebrow>How it&apos;s licensed</Eyebrow>
            <h2 className="mt-4 text-2xl font-semibold tracking-[-0.01em]">Open-core, local-first</h2>
            <p className="mt-5 text-[var(--ink-dim)]">
              Local use is free; organizational use is paid. The tools are built local-first by default: they run where
              your code and servers already are.
            </p>
          </div>
          <ul className="grid content-start gap-4">
            {[
              ["No data harvesting", "Your servers, prompts, and code are not collected."],
              ["No telemetry", "The tools do not phone home."],
              ["Local-first", "Analysis happens on your machine or in your environment."],
              ["Redacted evidence", "Findings reference evidence without storing raw payloads."],
            ].map(([t, d]) => (
              <li key={t} className="border-l border-[var(--rule-2)] pl-4">
                <p className="font-mono text-sm text-[var(--ink)]">{t}</p>
                <p className="mt-1 text-sm text-[var(--ink-dim)]">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contact */}
      <section className="border-t border-[var(--rule)]">
        <div className="container-shell flex flex-col items-start gap-6 py-20 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.01em]">Reviewing MCP servers, or want access to mcpscan?</h2>
            <p className="mt-3 max-w-xl text-[var(--ink-dim)]">Get in touch. The code lives under the Orisan organization on GitHub.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="border border-[var(--rule-2)] bg-[var(--ink)] px-5 py-3 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--bg)] transition hover:border-[var(--sun)] hover:bg-[var(--sun)]"
            >
              Contact
            </Link>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="border border-[var(--rule-2)] px-5 py-3 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--ink-dim)] transition hover:border-[var(--sun)] hover:text-[var(--ink)]"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
