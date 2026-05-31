import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { guardProduct, pageMetadata, scoutProduct } from "@/lib/constants";

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

Approval guidance: Review required

READ      broad repo context
EXECUTE   shell tool available
CHANGE    auto-commit instruction found

Payload stored: false
Source upload: none

orisan-scout-review.md
orisan-scout-review.json`;

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
  "payload_stored=false",
  "Markdown and JSON evidence",
  "checksums in release artifacts"
];

const problemRows = [
  ["Before", "AI coding tools were approved as assistants, mostly evaluated by vendor trust, data handling, and developer productivity."],
  ["Now", "Agents inherit repo instructions, invoke local tools, and may execute or change code through MCP and automation workflows."],
  ["Gap", "Most teams cannot produce a repo-level approval record that states what an agent can read, execute, or change."],
  ["Scout", "Scout turns that local agent surface into Markdown and JSON evidence a reviewer can inspect before approval."]
];

const differenceRows = [
  ["Pre-approval", "Scout runs before an AI agent is allowed into a sensitive repo, not after a vulnerability lands in code."],
  ["Capability-first", "Findings map to READ, EXECUTE, and CHANGE so reviewers see authority, not just file matches."],
  ["Local evidence", "Reports are generated in the repo with no daemon, no cloud upload, and payload_stored=false."],
  ["Narrow scope", "v0.1 stays focused on MCP configs and repo-level agent instructions so the signal can be validated."]
];

const productSystem = [
  {
    name: "Scout",
    status: "Available now / early access",
    href: "/scout",
    summary: "Repo-local discovery for AI coding agent exposure.",
    role: "Install Orisan. Run `orisan scout`. Generate Markdown and JSON approval evidence.",
    emphasis: "primary"
  },
  {
    name: "Guard",
    status: "Alpha core in development",
    href: "/guard",
    summary: "Sensitive context protection and safe rewrite for AI tools.",
    role: "Local core exists. Browser protection is not released.",
    emphasis: "secondary"
  },
  {
    name: "Relay",
    status: "Future module",
    href: "#product-architecture",
    summary: "Agent and tool execution governance.",
    role: "Future module.",
    emphasis: "future"
  },
  {
    name: "Review",
    status: "Future module",
    href: "#product-architecture",
    summary: "AI-assisted code and change review.",
    role: "Future module.",
    emphasis: "future"
  }
];

const proofStats = [
  ["available today", "Scout CLI"],
  ["primary command", "orisan scout"],
  ["evidence", "Markdown + JSON"],
  ["privacy", "no source upload"]
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
    <div className="min-w-0 border border-[var(--rule-2)] bg-[#0E1716] font-mono text-[13px] leading-7">
      <div className="flex items-center justify-between border-b border-[var(--rule)] px-4 py-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--ink-faint)]">
          Local approval output
        </span>
        <span className="text-[var(--sun)]">$</span>
      </div>
      <pre className="max-w-full whitespace-pre-wrap break-words p-5 text-[var(--ink-dim)] [overflow-wrap:anywhere]">
        <code>{scoutOutput}</code>
      </pre>
    </div>
  );
}

function ApprovalArtifact() {
  return (
    <div className="min-w-0 border border-[var(--rule-2)] bg-[#0E1716]">
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
    <div className="overflow-hidden bg-[var(--bg)] pt-16 text-[var(--ink)]">
      <section className="container-shell grid min-h-[calc(100svh-4rem)] min-w-0 gap-14 py-20 md:grid-cols-[1.05fr_0.95fr] md:items-center md:py-28">
        <div className="min-w-0">
          <div className="mb-7 flex items-center gap-4">
            <span className="h-px w-7 bg-[var(--sun)]" />
            <Label>Security infrastructure for AI-assisted development</Label>
          </div>
          <h1 className="max-w-[20rem] text-4xl font-semibold leading-[1.08] tracking-[-0.04em] text-[var(--ink)] sm:max-w-4xl sm:text-[clamp(2.5rem,6vw,4.8rem)] sm:leading-[1.02]">
            Know what AI agents can read, execute, and change before you approve them.
          </h1>
          <p className="mt-8 max-w-[20rem] text-lg leading-8 text-[var(--ink-dim)] sm:max-w-2xl md:text-xl">
            Orisan builds security infrastructure for AI-assisted software development. Scout is the first module: a local preflight check for repo-level agent exposure.
          </p>
          <p className="mt-5 max-w-[20rem] font-mono text-xs uppercase leading-6 tracking-[0.13em] text-[var(--ink-faint)] sm:max-w-2xl">
            Local by default. No source upload. No cloud upload. Markdown and JSON evidence.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link href="/scout/run" className="bg-[var(--ink)] px-6 py-4 text-center font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--bg)] transition hover:bg-[var(--sun)]">
              Run Scout
            </Link>
            <Link href="/scout/sample-report" className="border-b border-[var(--rule-2)] px-1 py-4 text-center font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--ink)] transition hover:border-[var(--sun)] hover:text-[var(--sun)]">
              View sample report
            </Link>
          </div>
        </div>
        <div className="min-w-0">
          <TerminalPreview />
        </div>
      </section>

      <div className="container-shell h-px bg-[var(--rule)]" />

      <section id="product-architecture" className="container-shell py-20 md:py-28">
        <div className="mb-12 grid gap-6 md:grid-cols-[12rem_1fr]">
          <Label>Product architecture</Label>
          <div className="min-w-0">
            <h2 className="max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
              Scout is runnable today. Everything else is deliberately behind it.
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--ink-dim)]">
              Orisan is the parent system. Scout is the current product proof. Guard has a local alpha core. Relay and Review are future modules.
            </p>
          </div>
        </div>
        <div className="grid min-w-0 border-l border-t border-[var(--rule)] md:grid-cols-[1.4fr_1fr_0.8fr_0.8fr]">
          {productSystem.map((product) => (
            <Link
              key={product.name}
              href={product.href}
              className={`group min-h-72 border-b border-r border-[var(--rule)] p-6 transition hover:bg-[var(--bg-2)] ${
                product.emphasis === "future" ? "opacity-55" : ""
              } ${product.emphasis === "primary" ? "bg-[rgba(236,231,218,0.03)]" : ""}`}
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-faint)]">{product.status}</p>
              <h3 className="mt-14 text-2xl font-semibold tracking-[-0.03em] text-[var(--ink)]">{product.name}</h3>
              <p className="mt-4 text-sm leading-6 text-[var(--ink-dim)]">{product.summary}</p>
              <p className="mt-8 border-t border-[var(--rule)] pt-5 text-xs leading-6 text-[var(--ink-faint)]">{product.role}</p>
              <div className="mt-5 h-0.5 w-5 bg-[var(--sun)] transition group-hover:w-10" />
            </Link>
          ))}
        </div>
      </section>

      <section className="container-shell py-20 md:py-28">
        <div className="grid border-l border-t border-[var(--rule)] md:grid-cols-4">
          {proofStats.map(([label, value]) => (
            <div key={label} className="border-b border-r border-[var(--rule)] p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--ink-faint)]">{label}</p>
              <p className="mt-5 text-lg font-semibold tracking-[-0.02em] text-[var(--ink)]">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-shell py-20 md:py-28">
        <div className="grid min-w-0 gap-10 md:grid-cols-[12rem_1fr]">
          <Label>The motive</Label>
          <div className="min-w-0">
            <h2 className="max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
              AI agents changed repository approval faster than security review changed with it.
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--ink-dim)]">
              Orisan exists because the approval moment is becoming vague. Developers are adopting agentic tools, MCP servers, and repo instruction files, while reviewers are still asked to approve with incomplete local evidence.
            </p>
            <div className="mt-10 grid border-l border-t border-[var(--rule)]">
              {problemRows.map(([title, body]) => (
                <div key={title} className="grid gap-5 border-b border-r border-[var(--rule)] p-5 md:grid-cols-[9rem_1fr]">
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--sun)]">{title}</p>
                  <p className="text-sm leading-7 text-[var(--ink-dim)]">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell py-20 md:py-28">
        <div className="grid min-w-0 gap-10 md:grid-cols-[12rem_1fr]">
          <Label>Approval record</Label>
          <div className="min-w-0">
            <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
              {scoutProduct.title} is the current runnable module.
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
        <div className="grid min-w-0 gap-10 md:grid-cols-[12rem_1fr]">
          <Label>Why different</Label>
          <div className="min-w-0">
            <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
              Not another scanner category. A preflight approval instrument.
            </h2>
            <div className="mt-10 grid border-l border-t border-[var(--rule)] md:grid-cols-2">
              {differenceRows.map(([title, body]) => (
                <div key={title} className="min-h-48 border-b border-r border-[var(--rule)] p-6 transition hover:bg-[var(--bg-2)]">
                  <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--sun)]">{title}</h3>
                  <p className="mt-8 text-sm leading-7 text-[var(--ink-dim)]">{body}</p>
                </div>
              ))}
            </div>
          </div>
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
        <div className="grid min-w-0 gap-10 md:grid-cols-[12rem_1fr]">
          <Label>Scope and privacy</Label>
          <div className="min-w-0">
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
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--ink-dim)]">
              {guardProduct.title} is separate and under development. Start with Scout when you need a repo-local approval artifact today.
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row md:mt-0">
            <Link href="/scout/run" className="bg-[var(--ink)] px-6 py-4 text-center font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--bg)] transition hover:bg-[var(--sun)]">
              Run Scout
            </Link>
            <Link href="/scout/sample-report" className="border-b border-[var(--rule-2)] px-1 py-4 text-center font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--ink)] transition hover:border-[var(--sun)] hover:text-[var(--sun)]">
              View sample report
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
