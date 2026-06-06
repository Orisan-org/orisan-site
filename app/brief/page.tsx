import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { pageMetadata, scoutRelease, siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: pageMetadata.brief.title,
  description: pageMetadata.brief.description,
  alternates: { canonical: "/brief" },
  openGraph: {
    title: pageMetadata.brief.title,
    description: pageMetadata.brief.description,
    url: "/brief",
    images: [
      {
        url: "/og-image-scout.svg",
        width: 1200,
        height: 630,
        alt: "Scout alpha brief - approval evidence for AI coding agents."
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: pageMetadata.brief.title,
    description: pageMetadata.brief.description,
    images: ["/og-image-scout.svg"]
  }
};

const validationQuestions = [
  "When developers use AI coding tools, do reviewers know what those tools can access in a repo?",
  "Are MCP servers or repo-level agent instruction files reviewed by security today?",
  "Would a local report on READ / EXECUTE / CHANGE authority be useful, or do existing controls already cover it?",
  "How are agent approval decisions documented today?",
  "Would we send the report to an AppSec engineer without explaining it live?"
];

const realRunProtocol = [
  ["Install", scoutRelease.installCommand],
  ["Run", "orisan scout --repo ."],
  ["Optional files", "Add --markdown and --json when report files are needed."],
  ["Decide", "Mark what is confusing, noisy, missing, or not credible enough yet."]
];

const successSignals = [
  "Install works without explaining Go modules",
  "Scout runs cleanly on Orisan repos and test fixtures",
  "Markdown and JSON can be inspected without source upload",
  "The report feels clear enough to send without a live walkthrough"
];

const failureSignals = [
  "Interesting, but not urgent",
  "Existing controls already cover this",
  "AppSec does not own this approval moment",
  "Findings are too obvious or too noisy",
  "The report is not actionable enough to create a ticket, approval note, or policy exception"
];

function Label({ children }: { children: React.ReactNode }) {
  return <p className="max-w-[18rem] break-words font-mono text-[11px] uppercase leading-5 tracking-[0.22em] text-[var(--ink-dim)] sm:max-w-none">{children}</p>;
}

export default function BriefPage() {
  return (
    <div className="bg-[var(--bg)] pt-16 text-[var(--ink)]">
      <section className="container-shell grid gap-14 py-20 md:grid-cols-[1fr_0.95fr] md:items-end md:py-28">
        <div>
          <div className="mb-7 flex items-center gap-4">
            <span className="h-px w-7 bg-[var(--sun)]" />
          <Label>Internal readiness brief</Label>
          </div>
          <h1 className="max-w-4xl text-[clamp(2.4rem,5vw,4.8rem)] font-semibold leading-[1.04] tracking-[-0.04em]">
            We are not ready for outbound validation until the artifact feels trustworthy.
          </h1>
        </div>
        <p className="text-lg leading-8 text-[var(--ink-dim)] md:text-xl">
          Scout is a strong hypothesis: teams approving AI coding agents need repo-local evidence that explains what agents can read, execute, or change. First we have to dogfood the install path, reports, and website until the product feels credible.
        </p>
      </section>

      <div className="container-shell h-px bg-[var(--rule)]" />

      <section className="container-shell py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-[12rem_1fr]">
          <Label>The hypothesis</Label>
          <div>
            <h2 className="max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
              Approval without repo-local evidence is becoming the gap.
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--ink-dim)]">
              Security teams already know how to review code, dependencies, secrets, and infrastructure. What is newer is the agent layer: local tool access, MCP config, inherited instructions, and repository-specific behavior that may authorize reading, execution, or changes before anyone has written a new line of code.
            </p>
          </div>
        </div>
      </section>

      <section className="container-shell py-20 md:py-28">
        <div className="mb-12 grid gap-6 md:grid-cols-[12rem_1fr]">
          <Label>Validation questions</Label>
          <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
              Five questions decide whether Scout is ready to leave our hands.
          </h2>
        </div>
        <div className="grid border-l border-t border-[var(--rule)]">
          {validationQuestions.map((question, index) => (
            <div key={question} className="grid gap-5 border-b border-r border-[var(--rule)] p-5 md:grid-cols-[4rem_1fr]">
              <span className="font-mono text-xs text-[var(--sun)]">{String(index + 1).padStart(2, "0")}</span>
              <p className="leading-7 text-[var(--ink-dim)]">{question}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-shell py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-[12rem_1fr]">
          <Label>Real-run protocol</Label>
          <div>
            <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
              One install path, real repo runs, one readiness decision.
            </h2>
            <div className="mt-10 grid border-l border-t border-[var(--rule)] md:grid-cols-4">
              {realRunProtocol.map(([title, body]) => (
                <div key={title} className="min-h-44 border-b border-r border-[var(--rule)] p-6">
                  <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--sun)]">{title}</h3>
                  <p className="mt-8 break-words text-sm leading-7 text-[var(--ink-dim)]">{body}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 max-w-2xl text-sm leading-7 text-[var(--ink-faint)]">
              Do this internally before asking external testers. Do not start outreach until the install path and report artifact feel self-explanatory.
            </p>
          </div>
        </div>
      </section>

      <section className="container-shell py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-[12rem_1fr]">
          <Label>Signals</Label>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-semibold leading-tight tracking-[-0.03em]">Success looks like pull.</h2>
              <div className="mt-8 grid border-l border-t border-[var(--rule)]">
                {successSignals.map((signal) => (
                  <div key={signal} className="border-b border-r border-[var(--rule)] p-5 text-sm leading-7 text-[var(--ink-dim)]">
                    {signal}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-semibold leading-tight tracking-[-0.03em]">Failure is useful too.</h2>
              <div className="mt-8 grid border-l border-t border-[var(--rule)]">
                {failureSignals.map((signal) => (
                  <div key={signal} className="border-b border-r border-[var(--rule)] p-5 text-sm leading-7 text-[var(--ink-dim)]">
                    {signal}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell py-20 md:py-28">
        <div className="border-y border-[var(--rule)] py-14 md:flex md:items-center md:justify-between md:gap-12">
          <div>
            <Label>Alpha path</Label>
            <h2 className="mt-5 max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
              Run Scout, inspect the artifacts, then decide whether the report can stand on its own.
            </h2>
          </div>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row md:mt-0">
            <Link href="/scout/run" className="bg-[var(--ink)] px-6 py-4 text-center font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--bg)] transition hover:bg-[var(--sun)]">
              Run Scout
            </Link>
            <a
              href={siteConfig.links.scoutRepo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 border-b border-[var(--rule-2)] px-1 py-4 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--ink)] transition hover:border-[var(--sun)] hover:text-[var(--sun)]"
            >
              GitHub repo <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
