import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { pageMetadata, scoutRelease, siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: pageMetadata.runScout.title,
  description: pageMetadata.runScout.description,
  alternates: { canonical: "/scout/run" },
  openGraph: {
    title: pageMetadata.runScout.title,
    description: pageMetadata.runScout.description,
    url: "/scout/run",
    images: [
      {
        url: "/og-image-scout.svg",
        width: 1200,
        height: 630,
        alt: "Run Orisan Scout locally."
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: pageMetadata.runScout.title,
    description: pageMetadata.runScout.description,
    images: ["/og-image-scout.svg"]
  }
};

const installCommand = scoutRelease.installCommand;
const windowsInstallCommand = scoutRelease.windowsInstallCommand;
const developerInstallCommand = scoutRelease.developerInstallCommand;
const defaultCommand = "orisan scout";
const explicitCommand = "orisan scout --repo . --markdown report.md --json report.json";
const terminalOutput = `$ orisan scout

AI coding agents configured in this repo can read broad repository context, execute shell commands, and change repository history through commit or push behavior. Review is required before approving AI agent use in this repository.

Orisan Scout completed: 4 findings (critical: 0, high: 3, medium: 1, low: 0, info: 0)
Reports written: orisan-scout-review.md, orisan-scout-review.json`;

const outputs = [
  ["orisan-scout-review.md", "Markdown review packet for a human reviewer."],
  ["orisan-scout-review.json", "Machine-readable evidence for automation or archival."],
  ["terminal summary", "Counts and capability summary printed after each run."],
  ["report_body_sha256", "Deterministic body hash included in Markdown and JSON."],
  ["git metadata", "Commit SHA and dirty status when the repo is a git checkout."],
  ["payload stored: false", "Findings store metadata and matched reasons, not source payloads."]
];

const releaseSteps = [
  ["1. Install", installCommand],
  ["2. Run", defaultCommand],
  ["3. Inspect", "Open orisan-scout-review.md and orisan-scout-review.json."],
  ["4. Decide", "Ask whether the report is clear enough to send to a reviewer without a live explanation."]
];

const binaryOptions = [
  ["macOS Apple Silicon", scoutRelease.macArm64Asset],
  ["macOS Intel", scoutRelease.macAmd64Asset],
  ["All platforms", scoutRelease.url]
];

const scope = [
  ".mcp.json",
  ".cursor/mcp.json",
  ".vscode/mcp.json",
  "AGENTS.md",
  "CLAUDE.md",
  ".github/copilot-instructions.md",
  ".cursor/rules",
  ".windsurf/",
  ".codex/",
  ".continue/"
];

const checks = [
  ["Clean repo", "Run in an empty temp repo. Expected: 0 findings and the clean v0.1 summary."],
  ["Risk fixture", "Add a repo-local MCP filesystem mount or shell server. Expected: READ or EXECUTE findings."],
  ["Instruction fixture", "Add AGENTS.md with shell or auto-commit language. Expected: EXECUTE or CHANGE findings."],
  ["Explicit paths", explicitCommand]
];

const troubleshooting = [
  ["command not found", "Confirm /usr/local/bin or ~/.local/bin is on PATH, then re-run the install command."],
  ["download blocked", "Use the GitHub release assets from the advanced install section."],
  ["non-git repo", "Scout still runs; git metadata will be marked unavailable."],
  ["unexpected clean result", "Confirm the relevant config or instruction file is repo-local and in v0.1 scope."]
];

function Label({ children }: { children: React.ReactNode }) {
  return <p className="max-w-[18rem] break-words font-mono text-[11px] uppercase leading-5 tracking-[0.22em] text-[var(--ink-dim)] sm:max-w-none">{children}</p>;
}

function Terminal() {
  return (
    <div className="min-w-0 border border-[var(--rule-2)] bg-[#0E1716] font-mono">
      <div className="flex items-center justify-between border-b border-[var(--rule)] px-4 py-3">
        <span className="text-[11px] uppercase tracking-[0.16em] text-[var(--ink-faint)]">Local CLI</span>
        <span className="text-[var(--sun)]">$</span>
      </div>
      <pre className="whitespace-pre-wrap break-words p-5 text-sm leading-7 text-[var(--ink-dim)]">
        <code>{installCommand}</code>
        {"\n"}
        <code>{defaultCommand}</code>
      </pre>
      <div className="border-t border-[var(--rule)] p-5">
        <pre className="whitespace-pre-wrap break-words text-xs leading-6 text-[var(--ink-dim)]">
          <code>{terminalOutput}</code>
        </pre>
      </div>
    </div>
  );
}

export default function RunScoutPage() {
  return (
    <div className="overflow-hidden bg-[var(--bg)] pt-16 text-[var(--ink)]">
      <section className="container-shell grid gap-14 py-20 md:grid-cols-[0.95fr_1.05fr] md:items-center md:py-28">
        <div className="min-w-0">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--ink-dim)] transition hover:text-[var(--sun)]">
            <ArrowLeft size={16} /> Orisan
          </Link>
          <div className="mt-12 flex items-center gap-4">
            <span className="h-px w-7 bg-[var(--sun)]" />
            <Label>Runbook</Label>
          </div>
          <h1 className="mt-7 max-w-[20rem] text-4xl font-semibold leading-[1.08] tracking-[-0.04em] sm:max-w-4xl sm:text-[clamp(2.35rem,5vw,4.6rem)] sm:leading-[1.04]">
            Install Scout and generate the review files.
          </h1>
          <p className="mt-7 max-w-[20rem] text-lg leading-8 text-[var(--ink-dim)] sm:max-w-2xl md:text-xl">
            This page is the operator path: install Orisan, run Scout in a repository, verify the output, and decide whether the generated files are credible enough for review.
          </p>
        </div>
        <Terminal />
      </section>

      <div className="container-shell h-px bg-[var(--rule)]" />

      <section className="container-shell py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-[12rem_1fr]">
          <Label>Quick start</Label>
          <div>
            <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
              Defaults are intentionally boring.
            </h2>
            <div className="mt-10 grid border-l border-t border-[var(--rule)] md:grid-cols-3">
              {[
                ["repo", "current directory"],
                ["markdown", "orisan-scout-review.md"],
                ["json", "orisan-scout-review.json"]
              ].map(([key, value]) => (
                <div key={key} className="border-b border-r border-[var(--rule)] p-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--sun)]">{key}</p>
                  <p className="mt-4 font-mono text-sm text-[var(--ink-dim)]">{value}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 font-mono text-xs text-[var(--ink-faint)]">Explicit flags still work: {explicitCommand}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={siteConfig.links.scoutRepo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[var(--ink)] px-5 py-3 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--bg)] transition hover:bg-[var(--sun)]"
              >
                GitHub repo <ExternalLink size={14} />
              </a>
              <a
                href={scoutRelease.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 border-b border-[var(--rule-2)] px-1 py-3 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--ink)] transition hover:border-[var(--sun)] hover:text-[var(--sun)]"
              >
                Advanced release assets <ExternalLink size={14} />
              </a>
              <a
                href={scoutRelease.feedbackUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 border-b border-[var(--rule-2)] px-1 py-3 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--ink)] transition hover:border-[var(--sun)] hover:text-[var(--sun)]"
              >
                Share feedback <ExternalLink size={14} />
              </a>
              <Link
                href="/scout/sample-report"
                className="inline-flex items-center justify-center border-b border-[var(--rule-2)] px-1 py-3 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--ink)] transition hover:border-[var(--sun)] hover:text-[var(--sun)]"
              >
                Sample report
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-[12rem_1fr]">
          <Label>Release assets</Label>
          <div>
            <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
              Use manual downloads only when the install script is not the right path.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--ink-dim)]">
              Release artifacts include macOS, Linux, and Windows binaries with sha256 checksums. Exact versions belong here and in GitHub Releases, not in the primary user flow.
            </p>
            <div className="mt-10 grid border-l border-t border-[var(--rule)] md:grid-cols-3">
              {binaryOptions.map(([title, href]) => (
                <a
                  key={title}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="group min-h-36 border-b border-r border-[var(--rule)] p-6 transition hover:bg-[var(--bg-2)]"
                >
                  <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--sun)]">{title}</h3>
                  <p className="mt-8 inline-flex items-center gap-2 break-words text-sm leading-6 text-[var(--ink-dim)] group-hover:text-[var(--ink)]">
                    Open download <ExternalLink size={14} />
                  </p>
                </a>
              ))}
            </div>
            <div className="mt-10 border border-[var(--rule-2)] bg-[#0E1716] p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--sun)]">Windows</p>
              <pre className="mt-4 whitespace-pre-wrap break-words font-mono text-sm leading-7 text-[var(--ink-dim)]">
                <code>{windowsInstallCommand}</code>
              </pre>
            </div>
            <div className="mt-6 border border-[var(--rule)] p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--ink-faint)]">Developer install from source</p>
              <pre className="mt-4 whitespace-pre-wrap break-words font-mono text-sm leading-7 text-[var(--ink-dim)]">
                <code>{developerInstallCommand}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell py-20 md:py-28">
        <div className="mb-12 grid gap-6 md:grid-cols-[12rem_1fr]">
          <Label>Run sequence</Label>
          <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
            A four-step runbook for alpha testers.
          </h2>
        </div>
        <div className="grid border-l border-t border-[var(--rule)] md:grid-cols-4">
          {releaseSteps.map(([title, description]) => (
            <div key={title} className="min-h-40 border-b border-r border-[var(--rule)] p-6">
              <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--sun)]">{title}</h3>
              <p className="mt-6 break-words text-sm leading-6 text-[var(--ink-dim)]">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-shell py-20 md:py-28">
        <div className="mb-12 grid gap-6 md:grid-cols-[12rem_1fr]">
          <Label>Files created</Label>
          <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
            What to expect after a successful run.
          </h2>
        </div>
        <div className="grid border-l border-t border-[var(--rule)] md:grid-cols-3">
          {outputs.map(([title, description]) => (
            <div key={title} className="min-h-40 border-b border-r border-[var(--rule)] p-6">
              <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--ink)]">{title}</h3>
              <p className="mt-6 text-sm leading-6 text-[var(--ink-dim)]">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-shell py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-[12rem_1fr]">
          <Label>Smoke tests</Label>
          <div>
            <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
              Validate the CLI before sending results around.
            </h2>
            <div className="mt-10 grid border-l border-t border-[var(--rule)] md:grid-cols-2">
              {checks.map(([title, description]) => (
                <div key={title} className="border-b border-r border-[var(--rule)] p-6">
                  <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--sun)]">{title}</h3>
                  <p className="mt-6 break-words text-sm leading-6 text-[var(--ink-dim)]">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell py-20 md:py-28">
        <div className="border-y border-[var(--rule)] py-14 md:flex md:items-center md:justify-between md:gap-12">
          <div>
            <Label>Alpha feedback</Label>
            <h2 className="mt-5 max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
              Tell us whether the approval record is useful.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--ink-dim)]">
              Do not share source code, secrets, or private reports unless your policy allows it. Finding count, usefulness, noise, and missing coverage are enough.
            </p>
          </div>
          <a
            href={scoutRelease.feedbackUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center justify-center gap-2 bg-[var(--ink)] px-6 py-4 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--bg)] transition hover:bg-[var(--sun)] md:mt-0"
          >
            Share feedback <ExternalLink size={14} />
          </a>
        </div>
      </section>

      <section className="container-shell py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-[12rem_1fr]">
          <Label>Scope</Label>
          <div>
            <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
              v0.1 checks repo-local MCP configs and repo-level agent instructions.
            </h2>
            <div className="mt-10 flex flex-wrap gap-3">
              {scope.map((item) => (
                <span key={item} className="border border-[var(--rule)] px-3 py-2 font-mono text-xs text-[var(--ink-dim)]">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-[12rem_1fr]">
          <Label>Troubleshooting</Label>
          <div>
            <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
              Common alpha issues.
            </h2>
            <div className="mt-10 grid border-l border-t border-[var(--rule)] md:grid-cols-2">
              {troubleshooting.map(([title, description]) => (
                <div key={title} className="border-b border-r border-[var(--rule)] p-6">
                  <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--ink)]">{title}</h3>
                  <p className="mt-6 text-sm leading-6 text-[var(--ink-dim)]">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
