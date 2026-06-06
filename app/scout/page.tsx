import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { pageMetadata, scoutRelease, siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: pageMetadata.scout.title,
  description: pageMetadata.scout.description,
  alternates: { canonical: "/scout" },
  openGraph: {
    title: pageMetadata.scout.title,
    description: pageMetadata.scout.description,
    url: "/scout",
    images: [
      {
        url: "/og-image-scout.svg",
        width: 1200,
        height: 630,
        alt: "Orisan Scout - Repo-local AI-agent approval artifact."
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: pageMetadata.scout.title,
    description: pageMetadata.scout.description,
    images: ["/og-image-scout.svg"]
  }
};

const reviewerQuestions = [
  "What local tools can the agent reach from this repo?",
  "Can the agent execute shell commands or package scripts?",
  "Do repo instructions permit autonomous commits or pushes?",
  "Is production, infrastructure, or credential handling mentioned in agent guidance?",
  "What decision should AppSec make before approval?",
  "What evidence should be kept with the approval record?"
];

const audience = [
  ["AppSec", "Create a repeatable preflight check before approving AI-agent use in sensitive repositories."],
  ["Engineering leads", "Understand whether local agent setup has crossed from assistive coding into execution or change authority."],
  ["Security teams", "Review a historical local approval-artifact experiment without treating it as the current Orisan focus."]
];

const nonGoals = [
  "not a full SAST, SCA, DAST, or secrets scanner",
  "not a cloud service",
  "not a background agent or daemon",
  "not a claim that every AI risk is covered",
  "not home/global config scanning by default",
  "not a replacement for human approval"
];

const quickStart = [
  ["Install", scoutRelease.installCommand],
  ["Run", "orisan scout --repo ."],
  ["Reports", "Add --markdown and --json when files are needed"]
];

const terminalOutput = `$ orisan scout --repo . --markdown orisan-scout-review.md --json orisan-scout-review.json

AI coding agents configured in this repo can read broad repository context and execute shell commands through MCP. Review required before approving AI agent use.

Orisan Scout completed: 3 findings (critical: 0, high: 2, medium: 1, low: 0, info: 0)
Reports written: orisan-scout-review.md, orisan-scout-review.json`;

const heroProof = `${scoutRelease.installCommand}
orisan scout

Approval guidance: Review required
READ      broad repo context
EXECUTE   shell tool available
CHANGE    auto-commit instruction found

Payload stored: false
Source upload: none`;

const checks = [
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

const reportPreview = `## Capability Summary

AI coding agents configured in this repo can read broad repository context and execute shell commands through MCP.

## Approval Guidance

Recommended decision: Review required before approving AI coding agent use in this repository.

## Findings

HIGH   .mcp.json   filesystem server mounted to repo root
HIGH   .mcp.json   shell tool available to agent
MED    AGENTS.md   auto-commit behavior allowed`;

function Label({ children }: { children: React.ReactNode }) {
  return <p className="max-w-[18rem] font-mono text-[11px] uppercase leading-5 tracking-[0.22em] text-[var(--ink-dim)] sm:max-w-none">{children}</p>;
}

export default function ScoutPage() {
  return (
    <div className="overflow-hidden bg-[var(--bg)] pt-16 text-[var(--ink)]">
      <section className="container-shell grid min-w-0 gap-14 py-20 md:grid-cols-[1fr_0.95fr] md:items-center md:py-28">
        <div className="min-w-0">
          <div className="mb-7 flex items-center gap-4">
            <span className="h-px w-7 bg-[var(--sun)]" />
            <Label>Secondary community artifact</Label>
          </div>
          <Image
            src="/logo-lockup-orisan-scout.svg"
            alt="Orisan Scout"
            width={360}
            height={72}
            priority
            unoptimized
            className="mb-10 h-auto w-72 max-w-full"
          />
          <h1 className="max-w-[21rem] text-4xl font-semibold leading-[1.08] tracking-[-0.04em] sm:max-w-4xl sm:text-[clamp(2.4rem,5vw,4.8rem)] sm:leading-[1.04]">
            Run a local preflight check before approving AI agents in a repo.
          </h1>
          <p className="mt-7 max-w-[21rem] text-lg leading-8 text-[var(--ink-dim)] sm:max-w-2xl md:text-xl">
            Scout is kept as a secondary community artifact. The current Orisan flagship is mcpscan for local MCP server review.
          </p>
          <p className="mt-5 max-w-[21rem] font-mono text-xs uppercase leading-6 tracking-[0.13em] text-[var(--ink-faint)] sm:max-w-2xl">
              Local by default. No source upload. No cloud upload. Deterministic checks.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link href="/scout/run" className="bg-[var(--ink)] px-6 py-4 text-center font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--bg)] transition hover:bg-[var(--sun)]">
              Scout runbook
            </Link>
            <Link href="/brief" className="border-b border-[var(--rule-2)] px-1 py-4 text-center font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--ink)] transition hover:border-[var(--sun)] hover:text-[var(--sun)]">
              Runbook
            </Link>
          </div>
        </div>
        <div className="min-w-0 border border-[var(--rule-2)] bg-[#0E1716] font-mono">
          <div className="flex items-center justify-between border-b border-[var(--rule)] px-5 py-4">
            <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--ink-faint)]">local proof</p>
            <span className="text-[var(--sun)]">$</span>
          </div>
          <pre className="max-w-full whitespace-pre-wrap break-words p-5 text-sm leading-7 text-[var(--ink-dim)] [overflow-wrap:anywhere]">
            <code>{heroProof}</code>
          </pre>
        </div>
      </section>

      <div className="container-shell h-px bg-[var(--rule)]" />

      <section className="container-shell py-20 md:py-28">
        <div className="grid min-w-0 gap-10 md:grid-cols-[12rem_1fr]">
          <Label>Run it today</Label>
          <div className="min-w-0">
            <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
              One local command prints the terminal summary.
            </h2>
            <div className="mt-10 grid min-w-0 border-l border-t border-[var(--rule)] md:grid-cols-3">
              {quickStart.map(([title, body]) => (
                <div key={title} className="min-h-40 border-b border-r border-[var(--rule)] p-6">
                  <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--sun)]">{title}</h3>
                  <p className="mt-6 break-words font-mono text-sm leading-7 text-[var(--ink-dim)] [overflow-wrap:anywhere]">{body}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/scout/run" className="bg-[var(--ink)] px-5 py-3 text-center font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--bg)] transition hover:bg-[var(--sun)]">
                Full runbook
              </Link>
              <Link href="/scout/sample-report" className="border-b border-[var(--rule-2)] px-1 py-3 text-center font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--ink)] transition hover:border-[var(--sun)] hover:text-[var(--sun)]">
                Sample report
              </Link>
              <a
                href={scoutRelease.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 border-b border-[var(--rule-2)] px-1 py-3 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--ink)] transition hover:border-[var(--sun)] hover:text-[var(--sun)]"
              >
                Advanced release assets <ExternalLink size={14} />
              </a>
              <a
                href={siteConfig.links.scoutRepo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 border-b border-[var(--rule-2)] px-1 py-3 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--ink)] transition hover:border-[var(--sun)] hover:text-[var(--sun)]"
              >
                Source repo <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell py-20 md:py-28">
        <div className="grid min-w-0 gap-10 md:grid-cols-[12rem_1fr]">
          <Label>Report preview</Label>
          <div className="min-w-0">
            <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
              The report is built for the approval thread.
            </h2>
            <div className="mt-10 min-w-0 border border-[var(--rule-2)] bg-[#0E1716]">
              <div className="border-b border-[var(--rule)] px-5 py-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--ink-faint)]">terminal + orisan-scout-review.md</p>
              </div>
              <pre className="max-w-full whitespace-pre-wrap break-words p-5 font-mono text-sm leading-7 text-[var(--ink-dim)] [overflow-wrap:anywhere]">
                <code>{terminalOutput}</code>
                {"\n\n"}
                <code>{reportPreview}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-[12rem_1fr]">
          <Label>What it checks</Label>
          <div>
            <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
              Scout checks repo-local agent surfaces only.
            </h2>
            <div className="mt-10 flex flex-wrap gap-3">
              {checks.map((item) => (
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
          <Label>Review questions</Label>
          <div>
            <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
              Scout turns repo-local agent exposure into questions a reviewer can answer.
            </h2>
            <div className="mt-10 grid border-l border-t border-[var(--rule)] md:grid-cols-2">
              {reviewerQuestions.map((question) => (
                <div key={question} className="border-b border-r border-[var(--rule)] p-5 font-mono text-xs uppercase tracking-[0.1em] text-[var(--ink-dim)]">
                  {question}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell py-20 md:py-28">
        <div className="mb-12 grid gap-6 md:grid-cols-[12rem_1fr]">
          <Label>Who it helps</Label>
          <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
            Kept for teams reviewing the earlier approval-artifact experiment.
          </h2>
        </div>
        <div className="grid border-l border-t border-[var(--rule)] md:grid-cols-3">
          {audience.map(([title, body]) => (
            <div key={title} className="min-h-52 border-b border-r border-[var(--rule)] p-6">
              <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--sun)]">{title}</h3>
              <p className="mt-8 text-sm leading-7 text-[var(--ink-dim)]">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-shell py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-[12rem_1fr]">
          <Label>Non-goals</Label>
          <div>
            <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
              Narrow on purpose, honest by default.
            </h2>
            <div className="mt-10 grid border-l border-t border-[var(--rule)] md:grid-cols-2">
              {nonGoals.map((item) => (
                <div key={item} className="border-b border-r border-[var(--rule)] p-5 font-mono text-xs uppercase tracking-[0.1em] text-[var(--ink-dim)]">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="early-access" className="container-shell py-20 md:py-28">
        <div className="grid gap-10 border-y border-[var(--rule)] py-14 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Label>Alpha status</Label>
            <h2 className="mt-5 max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
              Scout is not the current Orisan focus.
            </h2>
          </div>
          <div>
            <p className="text-lg leading-8 text-[var(--ink-dim)]">
              Current Orisan positioning leads with mcpscan. Scout remains available for context on repo-local agent approval experiments, but it should not be treated as the main product.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://github.com/Orisan-org/orisan-scout/issues/1"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[var(--ink)] px-5 py-3 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--bg)] transition hover:bg-[var(--sun)]"
              >
                Feedback tracker <ExternalLink size={14} />
              </a>
              <Link href="/scout/run" className="border-b border-[var(--rule-2)] px-1 py-3 text-center font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--ink)] transition hover:border-[var(--sun)] hover:text-[var(--sun)]">
                Runbook
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
