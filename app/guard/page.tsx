import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { guardProduct, pageMetadata, siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: pageMetadata.guard.title,
  description: pageMetadata.guard.description,
  alternates: { canonical: "/guard" },
  openGraph: {
    title: pageMetadata.guard.title,
    description: pageMetadata.guard.description,
    url: "/guard",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Orisan Guard - sensitive context protection for AI tools."
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: pageMetadata.guard.title,
    description: pageMetadata.guard.description,
    images: ["/og-image.svg"]
  }
};

const flow = [
  ["01", "Raw prompt", "A user drafts a prompt or pastes context intended for an AI tool."],
  ["02", "Sensitive context detected", "Guard classifies spans such as credentials, internal hosts, identifiers, and private material."],
  ["03", "Safe rewrite", "Sensitive spans are replaced with collision-resistant placeholders while preserving syntax where possible."],
  ["04", "Evidence event", "The output records what was protected without storing raw prompt payloads."]
];

const alphaCore = [
  "span-based deterministic classifier",
  "collision-resistant placeholder planner",
  "syntax-preserving redactor",
  "local redact CLI",
  "synthetic benchmark fixtures",
  "evidence-safe harness",
  "payload_stored=false model"
];

const nonClaims = [
  "no Chrome Web Store release yet",
  "no browser extension download yet",
  "no cloud sync",
  "no control plane",
  "no raw prompt upload",
  "no LLM calls in the core"
];

function Label({ children }: { children: React.ReactNode }) {
  return <p className="max-w-[18rem] break-words font-mono text-[11px] uppercase leading-5 tracking-[0.22em] text-[var(--ink-dim)] sm:max-w-none">{children}</p>;
}

export default function GuardPage() {
  return (
    <div className="bg-[var(--bg)] pt-16 text-[var(--ink)]">
      <section className="container-shell grid gap-14 py-20 md:grid-cols-[1fr_0.95fr] md:items-center md:py-28">
        <div>
          <div className="mb-7 flex items-center gap-4">
            <span className="h-px w-7 bg-[var(--sun)]" />
            <Label>{guardProduct.status}</Label>
          </div>
          <h1 className="max-w-4xl text-[clamp(2.4rem,5vw,4.8rem)] font-semibold leading-[1.04] tracking-[-0.04em]">
            Experimental sensitive-context handling before AI tools receive it.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--ink-dim)] md:text-xl">
            {guardProduct.description}
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href={`mailto:${siteConfig.email}?subject=Guard%20Alpha`}
              className="bg-[var(--ink)] px-6 py-4 text-center font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--bg)] transition hover:bg-[var(--sun)]"
            >
              Follow Guard Alpha
            </a>
            <a
              href={siteConfig.links.guardRepo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 border-b border-[var(--rule-2)] px-1 py-4 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--ink)] transition hover:border-[var(--sun)] hover:text-[var(--sun)]"
            >
              View repo <ExternalLink size={14} />
            </a>
          </div>
        </div>
        <div className="border border-[var(--rule-2)] bg-[#0E1716] p-6">
          <Label>Core question</Label>
          <p className="mt-8 text-2xl font-semibold tracking-[-0.03em] text-[var(--ink)]">
            Can this prompt or context be safely sent to an AI tool?
          </p>
          <p className="mt-6 leading-8 text-[var(--ink-dim)]">
            Guard is not released as a browser extension yet. The current work is the local alpha core: classification, placeholder planning, redaction, evidence-safe benchmarking, and a local redact CLI.
          </p>
        </div>
      </section>

      <div className="container-shell h-px bg-[var(--rule)]" />

      <section className="container-shell py-20 md:py-28">
        <div className="mb-12 grid gap-6 md:grid-cols-[12rem_1fr]">
          <Label>Future flow</Label>
          <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
            Raw prompt to safe rewrite to evidence event.
          </h2>
        </div>
        <div className="grid border-l border-t border-[var(--rule)] md:grid-cols-4">
          {flow.map(([number, title, body]) => (
            <div key={title} className="min-h-56 border-b border-r border-[var(--rule)] p-6 transition hover:bg-[var(--bg-2)]">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-faint)]">{number}</p>
              <h3 className="mt-14 text-lg font-semibold text-[var(--ink)]">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--ink-dim)]">{body}</p>
              <div className="mt-5 h-0.5 w-5 bg-[var(--sun)]" />
            </div>
          ))}
        </div>
      </section>

      <section className="container-shell py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-[12rem_1fr]">
          <Label>Alpha core</Label>
          <div>
            <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
              The foundation is local and evidence-safe first.
            </h2>
            <div className="mt-10 grid border-l border-t border-[var(--rule)] md:grid-cols-3">
              {alphaCore.map((item) => (
                <div key={item} className="min-h-32 border-b border-r border-[var(--rule)] p-5 font-mono text-xs uppercase leading-6 tracking-[0.1em] text-[var(--ink-dim)]">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-[12rem_1fr]">
          <Label>Local CLI</Label>
          <div>
            <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
              Redaction can be tested without browser interception.
            </h2>
            <div className="mt-10 border border-[var(--rule-2)] bg-[#0E1716]">
              <div className="border-b border-[var(--rule)] px-5 py-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--ink-faint)]">guard-alpha-redact</p>
              </div>
              <pre className="whitespace-pre-wrap break-words p-5 font-mono text-sm leading-7 text-[var(--ink-dim)]">
                <code>{`go run ./cmd/guard-alpha-redact \\
  --input input.txt \\
  --output redacted.txt \\
  --json evidence.json \\
  --json-evidence-only

payload_stored=false
redacted_text omitted from JSON
raw prompts stay local
browser interception is not active yet`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-[12rem_1fr]">
          <Label>Honest status</Label>
          <div>
            <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
              Guard is under active development, not a finished platform.
            </h2>
            <div className="mt-10 grid border-l border-t border-[var(--rule)] md:grid-cols-2">
              {nonClaims.map((item) => (
                <div key={item} className="border-b border-r border-[var(--rule)] p-5 font-mono text-xs uppercase tracking-[0.1em] text-[var(--ink-dim)]">
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
            <Label>Product boundary</Label>
            <h2 className="mt-5 max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
              Scout discovers. Guard remains experimental.
            </h2>
          </div>
          <Link href="/scout" className="mt-8 inline-flex bg-[var(--ink)] px-6 py-4 text-center font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--bg)] transition hover:bg-[var(--sun)] md:mt-0">
            See Scout
          </Link>
        </div>
      </section>
    </div>
  );
}
