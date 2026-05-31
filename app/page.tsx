import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { pageMetadata, scoutRelease } from "@/lib/constants";

export const metadata: Metadata = {
  title: pageMetadata.home.title,
  description: pageMetadata.home.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: pageMetadata.home.title,
    description: pageMetadata.home.description,
    url: "/",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Orisan - Security infrastructure for AI-assisted software development."
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: pageMetadata.home.title,
    description: pageMetadata.home.description,
    images: ["/og-image.svg"]
  }
};

const scoutOutput = `$ orisan scout

Orisan Scout ${scoutRelease.version} · payments-service · commit a8f3b2c

AI coding agents configured in this repo can read broad repository context and execute shell commands through MCP. Review required before approving AI agent use.

HIGH   .mcp.json        filesystem server mounted to repo root
HIGH   .mcp.json        shell tool available to agent
HIGH   AGENTS.md        shell execution allowed without approval
MED    AGENTS.md        auto-commit behavior allowed

orisan-scout-review.md written · awaiting reviewer verdict`;

const reviewArtifact = {
  repository: "payments-service",
  commit: "a8f3b2c",
  scope: "repo-local MCP configs and agent instruction files",
  summary: "AI coding agents configured in this repo can read broad repository context and execute shell commands through MCP.",
  capabilities: [
    ["READ", "Broad repository context"],
    ["EXECUTE", "Shell commands through MCP"],
    ["CHANGE", "Auto-commit behavior in instructions"]
  ],
  decision: ["Reviewer", "Decision", "Restrictions", "Expires"]
};

const watchCells = [
  ["01", "Discover", "MCP configs and agent instruction files."],
  ["02", "Assess", "Map READ / EXECUTE / CHANGE capability."],
  ["03", "Decide", "Recommend review, conditional approval, or no blocker."],
  ["04", "Record", "Generate Markdown/JSON evidence for security review."]
];

const capabilityColumns = [
  {
    title: "READ",
    items: ["filesystem access", "broad repo context", "instruction-driven file access"]
  },
  {
    title: "EXECUTE",
    items: ["shell tools", "command execution", "package/script execution"]
  },
  {
    title: "CHANGE",
    items: ["auto-commit", "GitHub write actions", "infra or production modification instructions"]
  }
];

const scopeItems = [
  "repo-local by default",
  "no source upload",
  "no cloud upload",
  "no daemon",
  "no home/global config scanning by default",
  "v0.1 checks only MCP configs and repo-level agent instructions"
];

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="max-w-[18rem] break-words font-mono text-[11px] font-medium uppercase leading-5 tracking-[0.22em] text-[var(--ink-dim)] sm:max-w-none">
      {children}
    </p>
  );
}

function TerminalPreview() {
  return (
    <div className="border border-[var(--rule-2)] bg-[#0E1716] font-mono text-[13px] leading-7">
      <div className="flex items-center justify-between border-b border-[var(--rule)] px-4 py-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--ink-faint)]">
          Local approval output
        </span>
        <span className="text-[var(--sun)]">$</span>
      </div>
      <pre className="whitespace-pre-wrap break-words p-5 text-[var(--ink-dim)]">
        <code>{scoutOutput}</code>
      </pre>
    </div>
  );
}

function ApprovalArtifact() {
  return (
    <div className="border border-[var(--rule-2)] bg-[#0E1716]">
      <div className="border-b border-[var(--rule)] px-5 py-4">
        <Label>Agent Access Review</Label>
      </div>
      <div className="grid border-b border-[var(--rule)] md:grid-cols-3">
        {[
          ["Repository", reviewArtifact.repository],
          ["Commit", reviewArtifact.commit],
          ["Scope", reviewArtifact.scope]
        ].map(([key, value]) => (
          <div key={key} className="border-r border-[var(--rule)] p-5 last:border-r-0">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--sun)]">{key}</p>
            <p className="mt-4 text-sm leading-6 text-[var(--ink-dim)]">{value}</p>
          </div>
        ))}
      </div>
      <div className="p-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--ink-faint)]">Capability Summary</p>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-[var(--ink)]">{reviewArtifact.summary}</p>
      </div>
      <div className="grid border-t border-[var(--rule)] md:grid-cols-3">
        {reviewArtifact.capabilities.map(([capability, detail]) => (
          <div key={capability} className="border-b border-r border-[var(--rule)] p-5 md:border-b-0">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--sun)]">{capability}</p>
            <p className="mt-4 text-sm leading-6 text-[var(--ink-dim)]">{detail}</p>
          </div>
        ))}
      </div>
      <div className="grid border-t border-[var(--rule)] md:grid-cols-4">
        {reviewArtifact.decision.map((field) => (
          <div key={field} className="min-h-24 border-b border-r border-[var(--rule)] p-5 md:border-b-0">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--ink-faint)]">{field}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="bg-[var(--bg)] pt-16 text-[var(--ink)]">
      <section className="container-shell grid min-h-[calc(100svh-4rem)] gap-14 py-20 md:grid-cols-[1.05fr_0.95fr] md:items-center md:py-28">
        <div>
          <div className="mb-7 flex items-center gap-4">
            <span className="h-px w-7 bg-[var(--sun)]" />
            <Label>Security infrastructure for AI-assisted development</Label>
          </div>
          <h1 className="max-w-[20rem] text-4xl font-semibold leading-[1.08] tracking-[-0.04em] text-[var(--ink)] sm:max-w-4xl sm:text-[clamp(2.5rem,6vw,4.8rem)] sm:leading-[1.02]">
            See what an AI agent can touch before you allow it in the repo.
          </h1>
          <p className="mt-8 max-w-[20rem] text-lg leading-8 text-[var(--ink-dim)] sm:max-w-2xl md:text-xl">
            Orisan Scout produces a local approval record of what repo-local MCP configs and agent instruction files allow AI coding agents to read, execute, or change. No source upload. No cloud upload. Repo-scoped by default.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link href="/scout/run" className="bg-[var(--ink)] px-6 py-4 text-center font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--bg)] transition hover:bg-[var(--sun)]">
              Get Scout
            </Link>
            <Link href="#brief" className="border-b border-[var(--rule-2)] px-1 py-4 text-center font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--ink)] transition hover:border-[var(--sun)] hover:text-[var(--sun)]">
              Read the alpha brief
            </Link>
          </div>
        </div>
        <div className="min-w-0">
          <TerminalPreview />
        </div>
      </section>

      <div className="container-shell h-px bg-[var(--rule)]" />

      <section id="brief" className="container-shell py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-[12rem_1fr]">
          <Label>Approval record</Label>
          <div>
            <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
              The output is the artifact.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--ink-dim)]">
              Scout turns repo-local agent exposure into a review record: what was scanned, what agents can read, execute, or change, and what decision a reviewer should make before approval.
            </p>
            <div className="mt-10">
              <ApprovalArtifact />
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell py-20 md:py-28">
        <div className="mb-12 grid gap-6 md:grid-cols-[12rem_1fr]">
          <Label>Workflow</Label>
          <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
            From repo scan to approval record.
          </h2>
        </div>
        <div className="grid border-l border-t border-[var(--rule)] md:grid-cols-4">
          {watchCells.map(([number, title, body]) => (
            <div key={title} className="min-h-44 border-b border-r border-[var(--rule)] p-6 transition hover:bg-[var(--bg-2)]">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-faint)]">{number}</p>
              <h3 className="mt-14 text-lg font-semibold text-[var(--ink)]">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--ink-dim)]">{body}</p>
              <div className="mt-5 h-0.5 w-5 bg-[var(--sun)]" />
            </div>
          ))}
        </div>
      </section>

      <section className="container-shell py-20 md:py-28">
        <div className="mb-12 grid gap-6 md:grid-cols-[12rem_1fr]">
          <Label>Capability model</Label>
          <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
            READ / EXECUTE / CHANGE.
          </h2>
        </div>
        <div className="grid border-l border-t border-[var(--rule)] md:grid-cols-3">
          {capabilityColumns.map((column) => (
            <div key={column.title} className="border-b border-r border-[var(--rule)] p-7">
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--sun)]">{column.title}</h3>
              <ul className="mt-8 space-y-4">
                {column.items.map((item) => (
                  <li key={item} className="border-t border-[var(--rule)] pt-4 text-[var(--ink-dim)]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="container-shell py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-[12rem_1fr]">
          <Label>Scope and privacy</Label>
          <div>
            <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
              Repo-scoped by default. Local by design.
            </h2>
            <div className="mt-10 grid border-l border-t border-[var(--rule)] md:grid-cols-2">
              {scopeItems.map((item) => (
                <div key={item} className="border-b border-r border-[var(--rule)] p-5 font-mono text-xs uppercase tracking-[0.12em] text-[var(--ink-dim)]">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell py-20 md:py-28">
        <div className="border-y border-[var(--rule)] py-14 md:flex md:items-center md:justify-between md:gap-12">
          <div>
            <Label>Preflight</Label>
            <h2 className="mt-5 max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
              Run the preflight check before approving AI coding agents.
            </h2>
          </div>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row md:mt-0">
            <Link href="/scout/run" className="bg-[var(--ink)] px-6 py-4 text-center font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--bg)] transition hover:bg-[var(--sun)]">
              Get Scout
            </Link>
            <Link href="/scout" className="border-b border-[var(--rule-2)] px-1 py-4 text-center font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--ink)] transition hover:border-[var(--sun)] hover:text-[var(--sun)]">
              Read validation brief
            </Link>
          </div>
        </div>
      </section>

      <div className="container-shell pb-20">
        <Image
          src="/logo-mark.svg"
          alt=""
          width={44}
          height={44}
          className="h-11 w-11 opacity-70"
          unoptimized
        />
      </div>
    </div>
  );
}
