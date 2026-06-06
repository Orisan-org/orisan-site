import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { pageMetadata, scoutRelease } from "@/lib/constants";

export const metadata: Metadata = {
  title: pageMetadata.sampleReport.title,
  description: pageMetadata.sampleReport.description,
  robots: {
    index: false,
    follow: false
  },
  alternates: { canonical: "/scout/sample-report" },
  openGraph: {
    title: pageMetadata.sampleReport.title,
    description: pageMetadata.sampleReport.description,
    url: "/scout/sample-report",
    images: [{ url: "/og-image-scout.svg", width: 1200, height: 630, alt: "Orisan Scout sample report." }]
  },
  twitter: {
    card: "summary_large_image",
    title: pageMetadata.sampleReport.title,
    description: pageMetadata.sampleReport.description,
    images: ["/og-image-scout.svg"]
  }
};

const report = `# Orisan Scout Report

- Repo: \`/repos/payments-service\`
- Git metadata: \`commit a8f3b2c, dirty: false\`
- Findings: \`4\`

## Capability Summary

AI coding agents configured in this repo can read broad repository context, execute shell commands, and change repository history through commit or push behavior. Review is required before approving AI agent use in this repository.

## Approval Guidance

Recommended decision: Review required before approving AI coding agent use in this repository.

- Scope note: Scout v0.1 checks only repo-local MCP configs and repo-level agent instruction files.
- Privacy note: No source upload. No cloud upload. Payload stored: false.

## Summary

- critical: \`0\`
- high: \`3\`
- medium: \`1\`
- low: \`0\`
- info: \`0\`

## Findings

### HIGH: filesystem server mounted to repo root

- Surface: \`.mcp.json\`
- Capability: \`READ\`
- Evidence: filesystem MCP server exposes broad repository context.
- Payload stored: \`false\`

### HIGH: shell tool available to agent

- Surface: \`.mcp.json\`
- Capability: \`EXECUTE\`
- Evidence: MCP tool can execute shell commands.
- Payload stored: \`false\`

### HIGH: shell execution allowed without approval

- Surface: \`AGENTS.md\`
- Capability: \`EXECUTE\`
- Evidence: repo-level agent instructions permit command execution without explicit reviewer approval.
- Payload stored: \`false\`

### MEDIUM: auto-commit behavior allowed

- Surface: \`AGENTS.md\`
- Capability: \`CHANGE\`
- Evidence: repo-level instructions allow autonomous commit or push behavior.
- Payload stored: \`false\`

## Integrity

- report_body_sha256: \`c9e4b8f6f7d7a5b6e3c2f0a1b4d9e8f0123456789abcdef0123456789abcdef\``;

function Label({ children }: { children: React.ReactNode }) {
  return <p className="max-w-[18rem] break-words font-mono text-[11px] uppercase leading-5 tracking-[0.22em] text-[var(--ink-dim)] sm:max-w-none">{children}</p>;
}

export default function ScoutSampleReportPage() {
  return (
    <div className="bg-[var(--bg)] pt-16 text-[var(--ink)]">
      <section className="container-shell grid gap-14 py-20 md:grid-cols-[0.9fr_1.1fr] md:items-start md:py-28">
        <div>
          <div className="mb-7 flex items-center gap-4">
            <span className="h-px w-7 bg-[var(--sun)]" />
            <Label>Archived Scout sample</Label>
          </div>
          <h1 className="max-w-4xl text-[clamp(2.4rem,5vw,4.8rem)] font-semibold leading-[1.04] tracking-[-0.04em]">
            Archived sample from the Scout experiment.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--ink-dim)] md:text-xl">
            This page is retained as background. The current Orisan product story leads with mcpscan for MCP server review.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link href="/scout/run" className="bg-[var(--ink)] px-6 py-4 text-center font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--bg)] transition hover:bg-[var(--sun)]">
              Scout runbook
            </Link>
            <a
              href={scoutRelease.feedbackUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 border-b border-[var(--rule-2)] px-1 py-4 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--ink)] transition hover:border-[var(--sun)] hover:text-[var(--sun)]"
            >
              Share feedback <ExternalLink size={14} />
            </a>
          </div>
        </div>
        <div className="border border-[var(--rule-2)] bg-[#0E1716]">
          <div className="border-b border-[var(--rule)] px-5 py-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--ink-faint)]">orisan-scout-review.md</p>
          </div>
          <pre className="whitespace-pre-wrap break-words p-5 font-mono text-xs leading-6 text-[var(--ink-dim)] md:text-sm md:leading-7">
            <code>{report}</code>
          </pre>
        </div>
      </section>
    </div>
  );
}
