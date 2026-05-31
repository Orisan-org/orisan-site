import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { pageMetadata, scoutProduct, scoutRelease, siteConfig } from "@/lib/constants";
import { ScoutWaitlist } from "@/components/ScoutWaitlist";

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

const thesis = [
  ["Input", "Scout looks only at repo-local MCP configs and repo-level agent instruction files in v0.1."],
  ["Detection", "Findings are mapped to READ, EXECUTE, and CHANGE so the reviewer sees agent capability."],
  ["Guidance", "The report recommends review required, restricted approval, or no repo-local blocker found."],
  ["Artifact", "Markdown and JSON outputs carry git metadata, report hash, and payload_stored=false."]
];

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
  ["Platform teams", "Standardize lightweight approval evidence without adding a daemon, control plane, or cloud upload."]
];

const nonGoals = [
  "not a full SAST, SCA, DAST, or secrets scanner",
  "not a cloud control plane",
  "not a background agent or daemon",
  "not a claim that every AI risk is covered",
  "not home/global config scanning by default",
  "not a replacement for human approval"
];

const quickStart = [
  ["Install", scoutRelease.installCommand],
  ["Run", "orisan scout"],
  ["Outputs", "orisan-scout-review.md + orisan-scout-review.json"]
];

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
    <div className="bg-[var(--bg)] pt-16 text-[var(--ink)]">
      <section className="container-shell grid gap-14 py-20 md:grid-cols-[1fr_0.95fr] md:items-center md:py-28">
        <div>
          <div className="mb-7 flex items-center gap-4">
            <span className="h-px w-7 bg-[var(--sun)]" />
            <Label>First active product</Label>
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
          <h1 className="max-w-4xl text-[clamp(2.4rem,5vw,4.8rem)] font-semibold leading-[1.04] tracking-[-0.04em]">
            Before approving an AI coding agent in a repo, know what it can read, execute, or change.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--ink-dim)] md:text-xl">
            {scoutProduct.description}
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link href="/scout/run" className="bg-[var(--ink)] px-6 py-4 text-center font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--bg)] transition hover:bg-[var(--sun)]">
              Get Scout
            </Link>
            <Link href="/brief" className="border-b border-[var(--rule-2)] px-1 py-4 text-center font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--ink)] transition hover:border-[var(--sun)] hover:text-[var(--sun)]">
              Read alpha brief
            </Link>
          </div>
        </div>
        <div className="border border-[var(--rule-2)] bg-[#0E1716] p-6">
          <Label>Core question</Label>
          <p className="mt-8 text-2xl font-semibold tracking-[-0.03em] text-[var(--ink)]">
            What can an AI coding agent in this repo read, execute, or change?
          </p>
          <p className="mt-6 leading-8 text-[var(--ink-dim)]">
            Scout is for the moment before approval, when a team needs a clear local record instead of a verbal “it should be fine.”
          </p>
        </div>
      </section>

      <div className="container-shell h-px bg-[var(--rule)]" />

      <section className="container-shell py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-[12rem_1fr]">
          <Label>Run it today</Label>
          <div>
            <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
              One local command creates the approval files.
            </h2>
            <div className="mt-10 grid border-l border-t border-[var(--rule)] md:grid-cols-3">
              {quickStart.map(([title, body]) => (
                <div key={title} className="min-h-40 border-b border-r border-[var(--rule)] p-6">
                  <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--sun)]">{title}</h3>
                  <p className="mt-6 break-words font-mono text-sm leading-7 text-[var(--ink-dim)]">{body}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/scout/run" className="bg-[var(--ink)] px-5 py-3 text-center font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--bg)] transition hover:bg-[var(--sun)]">
                Full runbook
              </Link>
              <a
                href={scoutRelease.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 border-b border-[var(--rule-2)] px-1 py-3 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--ink)] transition hover:border-[var(--sun)] hover:text-[var(--sun)]"
              >
                GitHub release <ExternalLink size={14} />
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
        <div className="mb-12 grid gap-6 md:grid-cols-[12rem_1fr]">
          <Label>Product mechanics</Label>
          <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
            Scout is intentionally small so the artifact can be trusted.
          </h2>
        </div>
        <div className="grid border-l border-t border-[var(--rule)] md:grid-cols-4">
          {thesis.map(([title, body], index) => (
            <div key={title} className="min-h-56 border-b border-r border-[var(--rule)] p-6 transition hover:bg-[var(--bg-2)]">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-faint)]">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-14 text-lg font-semibold text-[var(--ink)]">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--ink-dim)]">{body}</p>
              <div className="mt-5 h-0.5 w-5 bg-[var(--sun)]" />
            </div>
          ))}
        </div>
      </section>

      <section className="container-shell py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-[12rem_1fr]">
          <Label>Report preview</Label>
          <div>
            <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
              The report is built for the approval thread.
            </h2>
            <div className="mt-10 border border-[var(--rule-2)] bg-[#0E1716]">
              <div className="border-b border-[var(--rule)] px-5 py-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--ink-faint)]">orisan-scout-review.md</p>
              </div>
              <pre className="whitespace-pre-wrap break-words p-5 font-mono text-sm leading-7 text-[var(--ink-dim)]">
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
              Scout turns vague agent risk into questions a reviewer can answer.
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
            Built for teams approving agentic development, not buying another dashboard.
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
            <Label>Early access</Label>
            <h2 className="mt-5 max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
              Bring Scout into the repositories where agent risk is becoming real.
            </h2>
          </div>
          <div>
            <p className="text-lg leading-8 text-[var(--ink-dim)]">
              Scout is in active development. We are looking for teams already using AI coding assistants, local agent workflows, MCP servers, or repository-level instruction files.
            </p>
            <ScoutWaitlist />
          </div>
        </div>
      </section>
    </div>
  );
}
