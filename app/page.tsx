import type { Metadata } from "next";
import Image from "next/image";
import { mcpscanProduct, mcpscanRelease, pageMetadata, siteConfig } from "@/lib/constants";

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
        alt: "mcpscan - local-first security scanner for MCP servers."
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

const mcpscanOutput = `$ mcpscan scan --command '<your MCP server command>'

Server: filesystem
Enumerated: 12 tools, 2 resources, 0 prompts

SEVERITY  ID       TARGET       FINDING
HIGH      MCP-010  read_file    Arbitrary file read capability exposed
HIGH      MCP-030  run_command  Unconstrained command input

Grade: D
Payload stored: false
Uploads: none`;

const scanArtifact = {
  target: "stdio MCP server",
  release: mcpscanRelease.version,
  scope: "tools, resources, prompts, and metadata",
  summary: "This MCP server exposes file and command capabilities that should be reviewed before an AI agent connects.",
  capabilities: [
    ["TOOLS", "12 enumerated"],
    ["RESOURCES", "2 enumerated"],
    ["PROMPTS", "0 enumerated"]
  ],
  decision: ["Reviewer", "Decision", "Restrictions", "Expires"]
};

const capabilityColumns = [
  {
    title: "ENUMERATE",
    items: ["tools/list", "resources/list", "prompts/list", "server metadata"]
  },
  {
    title: "CHECK",
    items: ["prompt injection signals", "dangerous capabilities", "secret exposure", "transport issues"]
  },
  {
    title: "REPORT",
    items: ["terminal summary", "JSON report", "Markdown report", "payload_stored=false"]
  }
];

const scopeItems = [
  "local-first",
  "no source upload",
  "no prompt upload",
  "no secret upload",
  "no raw MCP response storage",
  "payload_stored=false"
];

const problemRows = [
  ["Before", "MCP servers were often added to agent configs because they were useful, not because their exposed tools had been reviewed."],
  ["Now", "AI agents can connect to MCP servers that read files, make network requests, execute commands, or expose sensitive metadata."],
  ["Gap", "Reviewers need a local way to see what an MCP server exposes before trusting it."],
  ["mcpscan", "mcpscan enumerates the server surface and emits deterministic findings a reviewer can inspect."]
];

const differenceRows = [
  ["Pre-connection", "Run mcpscan before an AI agent connects to a new MCP server."],
  ["Capability-first", "Findings describe exposed server behavior: files, network, commands, metadata, prompts, and transport."],
  ["Local evidence", "Reports are generated locally with no cloud upload and payload_stored=false."],
  ["Narrow scope", "The alpha focuses on stdio and tested Streamable HTTP MCP server review. MCP-002 baseline drift is deferred."]
];

const projectFocus = [
  {
    name: mcpscanProduct.title,
    status: `Active alpha / ${mcpscanRelease.version}`,
    href: siteConfig.links.mcpscanRepo,
    summary: mcpscanProduct.tagline,
    role: "Current flagship. Review MCP servers locally before AI agents connect.",
    emphasis: "primary"
  },
  {
    name: "Scout",
    status: "Secondary community artifact",
    href: "/scout",
    summary: "Repo-local AI-agent approval artifact.",
    role: "Kept as a community/portfolio artifact, not the current focus.",
    emphasis: "secondary"
  },
  {
    name: "Guard / Relay / Review",
    status: "De-emphasized",
    href: "#product-architecture",
    summary: "Portfolio/community ideas, not part of the current site focus.",
    role: "Not part of the current public product story.",
    emphasis: "future"
  }
];

const proofStats = [
  ["active release", mcpscanRelease.version],
  ["primary command", "mcpscan scan"],
  ["reports", "terminal + JSON + Markdown"],
  ["privacy", "no uploads"]
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
          Local scan output
        </span>
        <span className="text-[var(--sun)]">$</span>
      </div>
      <pre className="max-w-full whitespace-pre-wrap break-words p-5 text-[var(--ink-dim)] [overflow-wrap:anywhere]">
        <code>{mcpscanOutput}</code>
      </pre>
    </div>
  );
}

function ScanArtifact() {
  return (
    <div className="min-w-0 border border-[var(--rule-2)] bg-[#0E1716]">
      <div className="border-b border-[var(--rule)] px-5 py-4">
        <Label>MCP Server Review</Label>
      </div>
      <div className="grid border-b border-[var(--rule)] md:grid-cols-3">
        {[
          ["Target", scanArtifact.target],
          ["Release", scanArtifact.release],
          ["Scope", scanArtifact.scope]
        ].map(([key, value]) => (
          <div key={key} className="border-r border-[var(--rule)] p-5 last:border-r-0">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--sun)]">{key}</p>
            <p className="mt-4 text-sm leading-6 text-[var(--ink-dim)]">{value}</p>
          </div>
        ))}
      </div>
      <div className="p-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--ink-faint)]">Capability Summary</p>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-[var(--ink)]">{scanArtifact.summary}</p>
      </div>
      <div className="grid border-t border-[var(--rule)] md:grid-cols-3">
        {scanArtifact.capabilities.map(([capability, detail]) => (
          <div key={capability} className="border-b border-r border-[var(--rule)] p-5 md:border-b-0">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--sun)]">{capability}</p>
            <p className="mt-4 text-sm leading-6 text-[var(--ink-dim)]">{detail}</p>
          </div>
        ))}
      </div>
      <div className="grid border-t border-[var(--rule)] md:grid-cols-4">
        {scanArtifact.decision.map((field) => (
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
            <Label>{mcpscanRelease.status}</Label>
          </div>
          <h1 className="max-w-[20rem] text-4xl font-semibold leading-[1.08] tracking-[-0.04em] text-[var(--ink)] sm:max-w-4xl sm:text-[clamp(2.5rem,6vw,4.8rem)] sm:leading-[1.02]">
            mcpscan
          </h1>
          <p className="mt-8 max-w-[20rem] text-lg leading-8 text-[var(--ink-dim)] sm:max-w-2xl md:text-xl">
            Local-first security scanner for MCP servers.
          </p>
          <p className="mt-5 max-w-[20rem] text-base leading-7 text-[var(--ink-dim)] sm:max-w-2xl">
            Scan an MCP server before connecting it to an AI agent. mcpscan enumerates exposed tools, resources, prompts, and metadata, then runs deterministic checks without uploading source code, prompts, secrets, or raw MCP responses.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a href={siteConfig.links.mcpscanRepo} target="_blank" rel="noreferrer" className="bg-[var(--ink)] px-6 py-4 text-center font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--bg)] transition hover:bg-[var(--sun)]">
              View GitHub
            </a>
            <a href={mcpscanRelease.url} target="_blank" rel="noreferrer" className="border-b border-[var(--rule-2)] px-1 py-4 text-center font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--ink)] transition hover:border-[var(--sun)] hover:text-[var(--sun)]">
              View {mcpscanRelease.version} release
            </a>
          </div>
        </div>
        <div className="min-w-0">
          <TerminalPreview />
        </div>
      </section>

      <div className="container-shell h-px bg-[var(--rule)]" />

      <section id="product-architecture" className="container-shell py-20 md:py-28">
        <div className="mb-12 grid gap-6 md:grid-cols-[12rem_1fr]">
          <Label>Current focus</Label>
          <div className="min-w-0">
            <h2 className="max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
              mcpscan is the active Orisan project.
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--ink-dim)]">
              Orisan is keeping the public story narrow: a local-first MCP server scanner first. Scout remains a secondary community artifact. Other ideas stay out of the current site focus.
            </p>
          </div>
        </div>
        <div className="grid min-w-0 border-l border-t border-[var(--rule)] md:grid-cols-[1.4fr_1fr_1fr]">
          {projectFocus.map((product) => (
            <a
              key={product.name}
              href={product.href}
              target={product.href.startsWith("http") ? "_blank" : undefined}
              rel={product.href.startsWith("http") ? "noreferrer" : undefined}
              className={`group min-h-72 border-b border-r border-[var(--rule)] p-6 transition hover:bg-[var(--bg-2)] ${
                product.emphasis === "future" ? "opacity-55" : ""
              } ${product.emphasis === "primary" ? "bg-[rgba(236,231,218,0.03)]" : ""}`}
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-faint)]">{product.status}</p>
              <h3 className="mt-14 text-2xl font-semibold tracking-[-0.03em] text-[var(--ink)]">{product.name}</h3>
              <p className="mt-4 text-sm leading-6 text-[var(--ink-dim)]">{product.summary}</p>
              <p className="mt-8 border-t border-[var(--rule)] pt-5 text-xs leading-6 text-[var(--ink-faint)]">{product.role}</p>
              <div className="mt-5 h-0.5 w-5 bg-[var(--sun)] transition group-hover:w-10" />
            </a>
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
              MCP servers changed what an agent can reach.
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--ink-dim)]">
              Orisan is focused on the moment before trust. Developers are connecting agents to local and remote MCP servers, while reviewers still need clear evidence about exposed tools, resources, prompts, and metadata.
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
          <Label>Report artifact</Label>
          <div className="min-w-0">
            <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
              mcpscan turns MCP exposure into a reviewable report.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--ink-dim)]">
              The report says what was enumerated, which deterministic checks fired, what evidence is safe to store, and why a server may need review before an AI agent connects.
            </p>
            <div className="mt-10">
              <ScanArtifact />
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell py-20 md:py-28">
        <div className="grid min-w-0 gap-10 md:grid-cols-[12rem_1fr]">
          <Label>Why different</Label>
          <div className="min-w-0">
            <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
              Focused local scanner. Narrow by design.
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
            Enumerate / check / report.
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
              Local by design. Evidence-safe by default.
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
              Scan the MCP server before connecting the agent.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--ink-dim)]">
              Current verified installation is from source in a local Python environment. No PyPI, Homebrew, pipx, or curl install path is claimed for mcpscan yet.
            </p>
            <pre className="mt-8 max-w-2xl whitespace-pre-wrap break-words border border-[var(--rule-2)] bg-[#0E1716] p-5 font-mono text-xs leading-6 text-[var(--ink-dim)] [overflow-wrap:anywhere]">
              <code>{mcpscanRelease.installCommands.join("\n")}</code>
            </pre>
          </div>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row md:mt-0">
            <a href={siteConfig.links.mcpscanRepo} target="_blank" rel="noreferrer" className="bg-[var(--ink)] px-6 py-4 text-center font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--bg)] transition hover:bg-[var(--sun)]">
              View GitHub
            </a>
            <a href={mcpscanRelease.url} target="_blank" rel="noreferrer" className="border-b border-[var(--rule-2)] px-1 py-4 text-center font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--ink)] transition hover:border-[var(--sun)] hover:text-[var(--sun)]">
              View release
            </a>
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
