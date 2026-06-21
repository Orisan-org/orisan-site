import type { Metadata } from "next";
import Link from "next/link";
import { lineup, pageMetadata, siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: pageMetadata.about.title,
  description: pageMetadata.about.description,
};

export default function AboutPage() {
  return (
    <div className="pt-16">
      <section className="container-shell max-w-3xl py-20 md:py-28">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--ink-faint)]">About Orisan</p>
        <h1 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-[-0.02em] text-balance">
          Security tooling for AI you can actually see into.
        </h1>

        <div className="mt-10 space-y-6 text-lg text-[var(--ink-dim)]">
          <p>
            AI agents are increasingly given real capability: they call tools, read files, run commands, and change
            code. Most of that happens through the Model Context Protocol (MCP), an open standard for connecting models
            to tools and resources. The convenience is real. So is the exposure — and most teams cannot see what their
            agents can reach, let alone stop them.
          </p>
          <p>
            Orisan builds tools to close that gap. The goal is plain: let an organization see what its AI and agents are
            doing, and stop them when needed. The tools are local-first by design — they run where your code and servers
            already are, and they do not upload your source, prompts, or data.
          </p>
        </div>

        <h2 className="mt-14 text-2xl font-semibold tracking-[-0.01em]">What&apos;s actually shipping</h2>
        <div className="mt-6 space-y-6 text-[var(--ink-dim)]">
          <p>
            <span className="text-[var(--ink)]">mcpscan</span> is the active project. It inspects an MCP server before
            you connect an agent to it: it enumerates the tools, resources, prompts, and metadata the server exposes,
            then runs deterministic checks and writes a report. It is alpha software, and it is honest about that — there
            is no public package or one-line installer yet; source access is available to organizations on request.
          </p>
          <p>
            Everything else is stated as what it is. The <span className="text-[var(--ink)]">control plane</span> is the
            product direction — the organizational layer that would aggregate findings and let an operator watch and
            halt agent activity. Scout, Relay, and Review are in development as local-first CLIs. Guard is a parked
            experiment kept as background. None of them are presented as finished products, because they are not.
          </p>
        </div>

        <div className="mt-8 overflow-hidden border border-[var(--rule)]">
          {lineup.map((item, i) => {
            const active = item.status.startsWith("Active");
            return (
              <div key={item.name} className={`grid gap-1 px-5 py-4 md:grid-cols-[150px_170px_1fr] md:items-baseline ${i > 0 ? "border-t border-[var(--rule)]" : ""}`}>
                <div className="font-mono text-sm text-[var(--ink)]">{item.name}</div>
                <div className={`font-mono text-xs uppercase tracking-[0.08em] ${active ? "text-[var(--sun)]" : "text-[var(--ink-faint)]"}`}>{item.status}</div>
                <div className="text-sm text-[var(--ink-dim)]">{item.summary}</div>
              </div>
            );
          })}
        </div>

        <h2 className="mt-14 text-2xl font-semibold tracking-[-0.01em]">Open-core, no harvesting</h2>
        <div className="mt-6 space-y-6 text-[var(--ink-dim)]">
          <p>
            The model is open-core: free for local use, paid for organizational use. The tools do not collect your data
            and do not send telemetry. Findings carry redacted evidence rather than raw payloads, so a report can be
            shared without leaking the thing it found. Source is opening progressively as each tool stabilizes.
          </p>
          <p>
            Orisan is early. We would rather say that plainly than overstate it. If you review MCP servers or run agents
            in places that matter, the tools are built for you — and feedback shapes what ships next.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link href="/contact" className="border border-[var(--rule-2)] bg-[var(--ink)] px-5 py-3 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--bg)] transition hover:border-[var(--sun)] hover:bg-[var(--sun)]">
            Contact
          </Link>
          <a href={siteConfig.links.github} target="_blank" rel="noreferrer" className="border border-[var(--rule-2)] px-5 py-3 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--ink-dim)] transition hover:border-[var(--sun)] hover:text-[var(--ink)]">
            GitHub
          </a>
        </div>
      </section>
    </div>
  );
}
