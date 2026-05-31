import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { pageMetadata, scoutRelease } from "@/lib/constants";

export const metadata: Metadata = {
  title: pageMetadata.validateScout.title,
  description: pageMetadata.validateScout.description,
  robots: {
    index: false,
    follow: false
  },
  alternates: { canonical: "/scout/validate" },
  openGraph: {
    title: pageMetadata.validateScout.title,
    description: pageMetadata.validateScout.description,
    url: "/scout/validate",
    images: [{ url: "/og-image-scout.svg", width: 1200, height: 630, alt: "Validate Orisan Scout." }]
  },
  twitter: {
    card: "summary_large_image",
    title: pageMetadata.validateScout.title,
    description: pageMetadata.validateScout.description,
    images: ["/og-image-scout.svg"]
  }
};

const steps = [
  ["1. Install like a user", scoutRelease.installCommand],
  ["2. Run local repos", "orisan scout\norisan scout --repo /path/to/repo"],
  ["3. Inspect artifacts", "Read terminal output, Markdown, and JSON. Check payload_stored=false, git metadata, and report hash."],
  ["4. Decide readiness", "Would we send this report to an AppSec engineer without explaining it live?"]
];

const feedback = [
  "Did Scout run successfully?",
  "How many findings did it produce?",
  "Was the capability summary useful?",
  "Were any findings wrong, noisy, or confusing?",
  "Did Scout miss obvious repo-local AI-agent config?",
  "Would this report help an approval or remediation workflow?",
  "Would we send this externally without live explanation?"
];

const copy = `Internal Scout dogfood note

Do not start outbound validation yet.

The product question is:
What can an AI coding agent in this repo read, execute, or change?

Install:
curl -fsSL https://orisan.org/install | sh

Run:
orisan scout

It writes:
orisan-scout-review.md
orisan-scout-review.json

Final gate:
Would we send this report to an AppSec engineer without explaining it live?`;

function Label({ children }: { children: React.ReactNode }) {
  return <p className="max-w-[18rem] break-words font-mono text-[11px] uppercase leading-5 tracking-[0.22em] text-[var(--ink-dim)] sm:max-w-none">{children}</p>;
}

export default function ValidateScoutPage() {
  return (
    <div className="bg-[var(--bg)] pt-16 text-[var(--ink)]">
      <section className="container-shell grid gap-14 py-20 md:grid-cols-[1fr_0.95fr] md:items-start md:py-28">
        <div>
          <div className="mb-7 flex items-center gap-4">
            <span className="h-px w-7 bg-[var(--sun)]" />
            <Label>Internal QA first</Label>
          </div>
          <h1 className="max-w-4xl text-[clamp(2.4rem,5vw,4.8rem)] font-semibold leading-[1.04] tracking-[-0.04em]">
            Dogfood Scout before asking anyone else to trust it.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--ink-dim)] md:text-xl">
            Outbound validation is paused until install, report clarity, website story, and manual repo runs feel credible.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link href="/scout/run" className="bg-[var(--ink)] px-6 py-4 text-center font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--bg)] transition hover:bg-[var(--sun)]">
              Runbook
            </Link>
            <Link href="/scout/sample-report" className="border-b border-[var(--rule-2)] px-1 py-4 text-center font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--ink)] transition hover:border-[var(--sun)] hover:text-[var(--sun)]">
              Sample report
            </Link>
          </div>
        </div>
        <div className="border border-[var(--rule-2)] bg-[#0E1716] p-6">
          <Label>Success signal</Label>
          <p className="mt-8 text-2xl font-semibold tracking-[-0.03em] text-[var(--ink)]">
            “I would send this report without explaining it live.”
          </p>
          <p className="mt-6 leading-8 text-[var(--ink-dim)]">
            The current milestone is internal trust, not external outreach.
          </p>
        </div>
      </section>

      <div className="container-shell h-px bg-[var(--rule)]" />

      <section className="container-shell py-20 md:py-28">
        <div className="mb-12 grid gap-6 md:grid-cols-[12rem_1fr]">
          <Label>Protocol</Label>
          <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
            Keep the QA loop concrete.
          </h2>
        </div>
        <div className="grid border-l border-t border-[var(--rule)] md:grid-cols-4">
          {steps.map(([title, body]) => (
            <div key={title} className="min-h-48 border-b border-r border-[var(--rule)] p-6">
              <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--sun)]">{title}</h3>
              <p className="mt-8 whitespace-pre-wrap break-words text-sm leading-7 text-[var(--ink-dim)]">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-shell py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-[12rem_1fr]">
          <Label>Feedback checklist</Label>
          <div className="grid border-l border-t border-[var(--rule)] md:grid-cols-2">
            {feedback.map((item) => (
              <div key={item} className="border-b border-r border-[var(--rule)] p-5 font-mono text-xs uppercase leading-6 tracking-[0.1em] text-[var(--ink-dim)]">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-[12rem_1fr]">
          <Label>Copy paste</Label>
          <div>
            <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
              Internal run note.
            </h2>
            <pre className="mt-10 whitespace-pre-wrap break-words border border-[var(--rule-2)] bg-[#0E1716] p-5 font-mono text-sm leading-7 text-[var(--ink-dim)]">
              <code>{copy}</code>
            </pre>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={scoutRelease.feedbackUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[var(--ink)] px-5 py-3 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--bg)] transition hover:bg-[var(--sun)]"
              >
                QA tracker <ExternalLink size={14} />
              </a>
              <a
                href={scoutRelease.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 border-b border-[var(--rule-2)] px-1 py-3 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--ink)] transition hover:border-[var(--sun)] hover:text-[var(--sun)]"
              >
                Release <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
