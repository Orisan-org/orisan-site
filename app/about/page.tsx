import type { Metadata } from "next";
import { Github, Linkedin } from "lucide-react";
import { pageMetadata, siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: pageMetadata.about.title,
  description: pageMetadata.about.description,
  alternates: { canonical: "/about" }
};

const principles = [
  ["01", "MCP-aware from day one", "Orisan starts from how AI agents actually connect to tools: MCP servers, exposed capabilities, metadata, and the quiet permissions around them."],
  ["02", "Local-first where it matters", "Teams should not have to upload source code, prompts, secrets, or raw MCP responses to understand MCP server exposure."],
  ["03", "Evidence before theater", "We care less about broad AI claims and more about specific findings that engineering and security reviewers can act on."]
];

const values = [
  "Usefulness over novelty",
  "Clarity over noise",
  "Depth over speed theater",
  "Trust by design"
];

const operatingModel = [
  "Study where AI agents connect to MCP servers, tools, prompts, and developer workflows.",
  "Define the risk model in language engineering and security teams can share.",
  "Build local-first checks that surface exposure without uploads.",
  "Turn useful evidence into reports teams can review before connecting agents to new MCP servers."
];

function Label({ children }: { children: React.ReactNode }) {
  return <p className="max-w-[18rem] font-mono text-[11px] uppercase leading-5 tracking-[0.22em] text-[var(--ink-dim)] sm:max-w-none">{children}</p>;
}

export default function AboutPage() {
  return (
    <div className="bg-[var(--bg)] pt-16 text-[var(--ink)]">
      <section className="container-shell grid gap-12 py-20 md:grid-cols-[0.95fr_1.05fr] md:items-end md:py-28">
        <div>
          <div className="mb-7 flex items-center gap-4">
            <span className="h-px w-7 bg-[var(--sun)]" />
            <Label>About Orisan</Label>
          </div>
          <h1 className="max-w-4xl text-[clamp(2.4rem,5vw,4.8rem)] font-semibold leading-[1.04] tracking-[-0.04em]">
            We build where AI needs an approval record.
          </h1>
        </div>
        <div className="space-y-6 text-lg leading-8 text-[var(--ink-dim)]">
          <p>
            Orisan builds local-first security tooling for MCP server review. We focus on the new risks created when agents connect to local and remote tools through Model Context Protocol.
          </p>
          <p>
            mcpscan is the current active project: an alpha CLI that enumerates MCP server tools, resources, prompts, and metadata before an AI agent connects.
          </p>
        </div>
      </section>

      <div className="container-shell h-px bg-[var(--rule)]" />

      <section className="container-shell py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-[12rem_1fr]">
          <Label>The problem</Label>
          <div>
            <h2 className="max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
              MCP servers changed the boundary of agent trust.
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--ink-dim)]">
              Agents increasingly connect to MCP servers that expose tools, resources, prompts, and metadata. Reviewers need to understand that surface before the server becomes trusted agent context.
            </p>
          </div>
        </div>
      </section>

      <section className="container-shell py-20 md:py-28">
        <div className="mb-12 grid gap-6 md:grid-cols-[12rem_1fr]">
          <Label>Why Orisan</Label>
          <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
            Infrastructure for the approval moment.
          </h2>
        </div>
        <div className="grid border-l border-t border-[var(--rule)] md:grid-cols-3">
          {principles.map(([number, title, body]) => (
            <div key={title} className="min-h-64 border-b border-r border-[var(--rule)] p-6 transition hover:bg-[var(--bg-2)]">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-faint)]">{number}</p>
              <h3 className="mt-14 text-xl font-semibold text-[var(--ink)]">{title}</h3>
              <p className="mt-4 text-sm leading-6 text-[var(--ink-dim)]">{body}</p>
              <div className="mt-5 h-0.5 w-5 bg-[var(--sun)]" />
            </div>
          ))}
        </div>
      </section>

      <section className="container-shell py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-[12rem_1fr]">
          <Label>Values</Label>
          <div className="grid border-l border-t border-[var(--rule)] md:grid-cols-2">
            {values.map((value) => (
              <div key={value} className="border-b border-r border-[var(--rule)] p-6 text-xl font-semibold tracking-[-0.02em]">
                {value}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-[12rem_1fr]">
          <Label>Operating model</Label>
          <div className="grid gap-0 border-l border-t border-[var(--rule)]">
            {operatingModel.map((step, index) => (
              <div key={step} className="grid gap-4 border-b border-r border-[var(--rule)] p-5 md:grid-cols-[4rem_1fr]">
                <span className="font-mono text-xs text-[var(--sun)]">0{index + 1}</span>
                <p className="leading-7 text-[var(--ink-dim)]">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell py-20 md:py-28">
        <div className="border-y border-[var(--rule)] py-12 md:grid md:grid-cols-[12rem_1fr] md:gap-10">
          <Label>Founder</Label>
          <div>
            <h2 className="text-3xl font-semibold tracking-[-0.03em] md:text-5xl">Rakesh Bhavandlapelli</h2>
            <p className="mt-4 text-[var(--ink-dim)]">Founder. Builder.</p>
            <div className="mt-8 flex gap-3">
              {siteConfig.links.founderGithub ? (
                <a className="grid h-11 w-11 place-items-center border border-[var(--rule-2)] text-[var(--ink-dim)] transition hover:border-[var(--sun)] hover:text-[var(--sun)]" href={siteConfig.links.founderGithub} aria-label="Founder GitHub">
                  <Github size={18} />
                </a>
              ) : null}
              {siteConfig.links.founderLinkedin ? (
                <a className="grid h-11 w-11 place-items-center border border-[var(--rule-2)] text-[var(--ink-dim)] transition hover:border-[var(--sun)] hover:text-[var(--sun)]" href={siteConfig.links.founderLinkedin} aria-label="Founder LinkedIn">
                  <Linkedin size={18} />
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
