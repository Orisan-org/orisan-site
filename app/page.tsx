import type { Metadata } from "next";
import { GradeStamp } from "@/components/GradeStamp";
import { InstallCommand } from "@/components/InstallCommand";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  description:
    "Local-first security instruments for AI agents. The first, mcpscan, reads what an MCP server exposes — tools, resources, prompts — before an agent connects.",
};

const INSTALL = "uvx orisan-mcpscan scan-config ./mcp.json --yes";

/**
 * The summary block of a real run, verbatim and unedited. CLAIMS.md rows 34-38.
 *
 *   COLUMNS=76 mcpscan scan-config ./mcp.json --yes --no-color
 *   orisan-mcpscan 0.1.1 from PyPI, 2026-08-10
 *
 * Only the summary is shown as text; the findings below are the same run's rows
 * rendered as markup rather than as an ASCII table. Two reasons, both measured:
 * the table's light box-drawing character U+2502 is outside the latin subset
 * next/font loads for JetBrains Mono, so it fell back to a font 40% wider and
 * broke the monospace grid; and at 120 columns the block was horizontally
 * scrollable on the desktop, which trapped trackpad scrolling. An ASCII table is
 * also unreadable to a screen reader.
 *
 * The only edit is the config filename, shown as `mcp.json` to match the command.
 */
const SCAN_SUMMARY = `mcpscan config report
Configs found: 1
Servers: 2 total, 2 scanned, 0 failed, 0 skipped
Worst grade: D

notes-memory
  Source: mcp.json
  Transport: stdio
  Purpose: memory_store (config)
  Grade: A
  No findings.

risky-filesystem
  Source: mcp.json
  Transport: stdio
  Purpose: filesystem (config)
  Grade: D`;

/** The same run's five findings. Values transcribed cell for cell. */
const FINDINGS = [
  { target: "edit_file", evidence: "Tool 'edit_file' appears to expose file write based on name, description, or schema." },
  { target: "get_file_info", evidence: "Tool 'get_file_info' appears to expose file read based on name, description, or schema." },
  { target: "read_file", evidence: "Tool 'read_file' appears to expose file read based on name, description, or schema." },
  { target: "read_multiple_files", evidence: "Tool 'read_multiple_files' appears to expose file read based on name, description, or schema." },
  { target: "write_file", evidence: "Tool 'write_file' appears to expose file write based on name, description, or schema." },
];

const REACH = [
  "Change the source code",
  "Push it live to the world",
  "Move the money",
  "Speak for you to a customer",
];

const VERBS = [
  { title: "Watch", body: "Every native call — shell, MCP, browser, payments — becomes one common shape." },
  { title: "Decide", body: "Same signal, same verdict: allow, hold for a human, or stop. Rules you can read." },
  { title: "Stop", body: "Held at the boundary, not reported after. The record states the intent." },
];

/**
 * Illustrations, not case studies. Every figure is invented to show the shape of a
 * decision. The "planned" column describes behaviour that does not exist yet and
 * the markup says so in words, not only in colour.
 */
const LEDGER = [
  {
    kind: "Source code",
    call: "write_file → services/auth/session.ts",
    planned: "The change touches the authentication boundary. In scope for a human, out of scope for autonomy.",
    today: "It is written and committed. Nothing was standing in the path.",
  },
  {
    kind: "Live surface",
    call: "deploy → orisan.org (production)",
    planned: "The target is production and nothing in the plan reaches a staging surface first.",
    today: "It ships. The rollback is manual and it starts after someone notices.",
  },
  {
    kind: "Money",
    call: "payments.create → new payee, above threshold",
    planned: "New payee, above threshold, unmatched to any order. This one always stops.",
    today: "It settles. The payee arrived as a line of text in a ticket the agent read.",
  },
  {
    kind: "Your voice",
    call: "message.send → customer thread",
    planned: "The message commits the company to a refund and a date no human agreed to.",
    today: "The promise is in writing, sent under your name. It is a contract now.",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader current="/" />
      <main>
        <section className="mx-auto max-w-wrap px-8 pt-13 sm:pt-16">
          <p className="font-mono text-label uppercase tracking-label text-orisan-type">
            mcpscan 0.1.1 &middot; shipped
          </p>
          <h1 className="mt-6 max-w-hero text-4xl font-semibold">
            Your agent trusts every server in that config.
          </h1>
          <p className="mt-6 max-w-lede text-lg text-grey-1">
            You added them months ago and have not read them since. One of them can write to
            your disk. mcpscan reads what each server actually exposes — tools, resources,
            prompts — runs deterministic checks over it and grades what it finds, before your
            agent connects again.
          </p>
          <p className="mt-5 max-w-lede text-lg text-grey-1">
            It runs on your machine and uploads nothing. Ten seconds, nothing installed.
          </p>
          <div className="mt-9">
            <InstallCommand command={INSTALL} />
          </div>
        </section>

        <section id="reach" className="mx-auto max-w-wrap px-8 pt-17">
          <div className="rounded-feature bg-ink px-8 py-13">
            <p className="font-mono text-label uppercase tracking-label text-orisan-inverse">
              Shipped &middot; mcpscan 0.1.1
            </p>
            <h2 className="mt-5 max-w-hero text-2xl font-semibold text-paper">
              First, know what it can reach.
            </h2>
            <p className="mt-5 max-w-lede text-lg text-grey-3">
              mcpscan enumerates the tools, resources and prompts an MCP server exposes, runs
              deterministic checks over them and grades what it finds. It runs on your machine,
              uploads nothing, and never drops a finding to make a server look cleaner. It
              reports. It does not stop anything.
            </p>

            <pre className="mt-9 overflow-x-auto rounded-panel bg-ink-deep p-6 font-mono text-xs text-paper-deep sm:overflow-x-visible">
              <code>
                <span className="text-grey-4">$ </span>
                {INSTALL}
                {"\n"}
                {SCAN_SUMMARY}
              </code>
            </pre>

            <ul className="mt-6 list-none p-0">
              {FINDINGS.map((f) => (
                <li key={f.target} className="border-t border-grey-4 py-4">
                  <p className="flex flex-wrap items-baseline gap-3 font-mono text-xs">
                    <span className="text-suspicion">HIGH</span>
                    <span className="text-grey-4">expected_unconfirmed</span>
                    <span className="text-grey-4">MCP-010</span>
                    <span className="text-paper">{f.target}</span>
                  </p>
                  <p className="mt-2 max-w-measure text-sm text-grey-3">{f.evidence}</p>
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap items-start gap-8">
              <div className="flex items-center gap-3">
                <GradeStamp grade="A" />
                <p className="max-w-lede text-base text-grey-3">
                  The memory store exposes nothing that needs a verdict.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <GradeStamp grade="D" />
                <p className="max-w-lede text-base text-grey-3">
                  The filesystem server can read and write files, held at{" "}
                  <span className="font-mono">HIGH</span> because nobody confirmed the purpose
                  the config claimed.
                </p>
              </div>
            </div>

            <div className="mt-9 border-t border-grey-4 pt-8">
              <h3 className="max-w-hero text-xl font-semibold tracking-tight text-paper">
                The approval you gave was for a name.
              </h3>
              <p className="mt-4 max-w-measure text-base text-grey-3">
                A client that asks before connecting asks once, and what it asks about is a
                server — not the five tools above. You approve a name against a list you have
                not seen. The protocol then lets that list change underneath the approval: a
                server declaring <span className="font-mono">listChanged</span> should send{" "}
                <span className="font-mono">notifications/tools/list_changed</span> when its
                tools change, and nothing requires the client to ask a second time.
              </p>
              <p className="mt-4 max-w-measure text-base text-grey-3">
                That is the failure mode <span className="font-mono">MCP-002</span> was written
                for. Hand a scan a previous report with{" "}
                <span className="font-mono">--baseline</span> and mcpscan compares the tool
                surface hash by hash, raising{" "}
                <span className="font-mono">Tool definition drift</span> at{" "}
                <span className="font-mono">HIGH</span> on anything that moved, with one
                instruction: review the changed surface before trusting the server again. It is
                the only check that cannot fire on a first run, because on a first run there is
                nothing to have drifted from.
              </p>
            </div>

            <p className="mt-8 max-w-measure text-base text-grey-4">
              What it is not telling you: that the path is <span className="font-mono">/</span>.
              mcpscan reads the tools a server exposes, not the scope it was handed. A grade is
              knowledge, and knowledge is not a brake.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-wrap px-8 pt-17">
          <p className="font-mono text-label uppercase tracking-label text-orisan-type">
            Why one is not the other
          </p>
          <h2 className="mt-5 max-w-hero text-2xl font-semibold">
            A scanner tells you what a thing can do.{" "}
            <span className="font-alt font-normal italic text-orisan-type">
              A brake decides whether it does it.
            </span>
          </h2>
          <p className="mt-5 max-w-lede text-lg text-grey-1">
            mcpscan is a scanner, and it is deliberately not more than one. Its verdicts are
            deterministic and no model votes on them. But it reads a server before the fact; it
            is not present at the moment an agent acts. The part that is present at that moment
            is what the rest of this page describes, and it is not built yet.
          </p>
        </section>

        <section className="mx-auto max-w-wrap px-8 pt-17">
          <p className="font-mono text-label uppercase tracking-label text-orisan-type">
            What your agent can already do
          </p>
          <h2 className="mt-5 max-w-hero text-2xl font-semibold">
            You gave it access. Access became authority.
          </h2>
          <p className="mt-5 max-w-lede text-lg text-grey-1">
            Nobody approved these individually. They were inherited — from a config file, a
            tool list, a pasted instruction.
          </p>
          <ul className="mt-9 grid list-none grid-cols-stack gap-4 p-0 sm:grid-cols-pair lg:grid-cols-quartet">
            {REACH.map((item, i) => (
              <li
                key={item}
                className="flex min-h-15 flex-col justify-between gap-6 rounded-panel bg-paper-deep p-6"
              >
                <span className="font-mono text-label tracking-label text-orisan-type">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-xl font-semibold tracking-tight">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mx-auto max-w-wrap px-8 pt-17">
          <p className="font-mono text-label uppercase tracking-label text-orisan-type">
            The ledger &middot; not built yet
          </p>
          <h2 className="mt-5 max-w-hero text-2xl font-semibold">
            What a kill switch would have to do.
          </h2>
          <p className="mt-5 max-w-lede text-lg text-grey-1">
            Four illustrations, not case studies — nothing below describes a real incident. The
            left column is what happens today, with nothing in the path. The right column is
            behaviour Orisan does not have yet, written down so it can be argued with.
          </p>
          <ul className="mt-9 grid list-none grid-cols-stack gap-4 p-0 lg:grid-cols-pair">
            {LEDGER.map((row) => (
              <li key={row.kind} className="rounded-panel bg-paper-deep p-6">
                <p className="font-mono text-micro uppercase tracking-meta text-grey-2">
                  {row.kind}
                </p>
                <p className="mt-4 font-mono text-sm text-ink">{row.call}</p>
                <div className="mt-5 border-l-3 border-harm pl-4">
                  <p className="font-mono text-micro uppercase tracking-meta text-grey-2">
                    Today, with nothing in the path
                  </p>
                  <p className="mt-2 text-base text-grey-1">{row.today}</p>
                </div>
                <div className="mt-4 border-l-3 border-grey-3 pl-4">
                  <p className="font-mono text-micro uppercase tracking-meta text-grey-2">
                    Planned &middot; does not exist yet
                  </p>
                  <p className="mt-2 text-base text-grey-1">{row.planned}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="mx-auto max-w-wrap px-8 pt-17">
          <p className="font-mono text-label uppercase tracking-label text-orisan-type">
            The plan &middot; not built yet
          </p>
          <h2 className="mt-5 max-w-hero text-2xl font-semibold">Three verbs. Nothing else.</h2>
          <p className="mt-5 max-w-lede text-lg text-grey-1">
            None of this ships today. It is the shape we are building towards, and the reason
            mcpscan reads a server the way it does.
          </p>
          <ul className="mt-9 grid list-none grid-cols-stack gap-4 p-0 lg:grid-cols-triad">
            {VERBS.map((v) => (
              <li key={v.title} className="rounded-panel border border-grey-3 p-8">
                <h3 className="text-xl font-semibold tracking-tight">{v.title}</h3>
                <p className="mt-3 max-w-lede text-base text-grey-1">{v.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mx-auto max-w-wrap px-8 pt-17">
          <blockquote className="m-0">
            <p className="max-w-lede font-alt text-2xl font-normal italic">
              &ldquo;Hope is not a control. I wanted something in the path, automatic, that
              would stop the action and then tell you why. It did not exist, so we started
              building it. What exists so far only reads.&rdquo;
            </p>
            <footer className="mt-6 font-mono text-micro uppercase tracking-meta text-grey-2">
              Founder, Orisan
            </footer>
          </blockquote>
        </section>

        <section className="mx-auto max-w-wrap px-8 py-17">
          <div className="rounded-feature bg-ink px-8 py-15">
            <p className="font-mono text-label uppercase tracking-label text-orisan-inverse">
              What we are building
            </p>
            <h2 className="mt-5 max-w-hero text-2xl font-semibold text-paper">
              The kill switch for AI.
            </h2>
            <p className="mt-5 max-w-lede text-lg text-grey-3">
              mcpscan reads a server before your agent trusts it. The part that stands in the
              path at the moment an agent acts does not exist yet. Run the piece that does, then
              tell us why the rest of it would not work — that is worth more to us than
              agreement.
            </p>
            <div className="mt-9">
              <InstallCommand command={INSTALL} tone="ink" />
            </div>
            <p className="mt-6 font-mono text-micro uppercase tracking-meta text-grey-4">
              <a href="mailto:team@orisan.org?subject=Orisan" className="text-grey-4">
                team@orisan.org
              </a>
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
