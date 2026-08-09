import { ChecksTable } from "@/components/ChecksTable";
import { GradeStamp } from "@/components/GradeStamp";
import { Label } from "@/components/Label";
import { MarginRail } from "@/components/MarginRail";
import { Section } from "@/components/Section";
import { StopRule } from "@/components/StopRule";

/**
 * Verbatim stdout of a real run, pasted unedited. Command, date and evidence
 * are in CLAIMS.md. Never retype, reflow, or tidy this: the value of showing
 * product output is that it is the product's output.
 *
 *   COLUMNS=76 mcpscan scan-config ./mcp.json --yes --no-color
 *   orisan-mcpscan 0.1.1 from PyPI, 2026-08-10
 *
 * The only edit is the config filename, which was `demo-mcp.json` on disk and
 * is shown as `mcp.json` to match the command above it.
 */
const SCAN_OUTPUT = `mcpscan config report
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
  Grade: D
┏━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ SEVERITY ┃ VERDICT              ┃ ID      ┃ TARGET              ┃ FINDING                                            ┃
┡━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┩
│ HIGH     │ expected_unconfirmed │ MCP-010 │ edit_file           │ Tool 'edit_file' appears to expose file write      │
│          │                      │         │                     │ based on name, description, or schema.             │
│ HIGH     │ expected_unconfirmed │ MCP-010 │ get_file_info       │ Tool 'get_file_info' appears to expose file read   │
│          │                      │         │                     │ based on name, description, or schema.             │
│ HIGH     │ expected_unconfirmed │ MCP-010 │ read_file           │ Tool 'read_file' appears to expose file read based │
│          │                      │         │                     │ on name, description, or schema.                   │
│ HIGH     │ expected_unconfirmed │ MCP-010 │ read_multiple_files │ Tool 'read_multiple_files' appears to expose file  │
│          │                      │         │                     │ read based on name, description, or schema.        │
│ HIGH     │ expected_unconfirmed │ MCP-010 │ write_file          │ Tool 'write_file' appears to expose file write     │
│          │                      │         │                     │ based on name, description, or schema.             │
└──────────┴──────────────────────┴─────────┴─────────────────────┴────────────────────────────────────────────────────┘

Privacy: payload_stored=false for all findings
`;

/**
 * Grades and their trigger conditions, transcribed from the published
 * `grade_for()`. There is no E: the function returns F, D, C, B or A.
 */
const GRADE_RULES = [
  ["A", "no findings"],
  ["B", "low or info"],
  ["C", "medium"],
  ["D", "high"],
  ["F", "critical"],
] as const;

const NON_GOALS = [
  {
    title: "No LLM anywhere in the scanner logic",
    body: "Every check and every verdict is deterministic. The same server scanned twice gives the same answer, and there is no model to prompt-inject.",
  },
  {
    title: "No suppression",
    body: "Findings are never hidden. Severity is adjusted by contextual verdict, and the original value is kept alongside it.",
  },
  {
    title: "Nothing leaves your machine unless you send it",
    body: "Scans run locally and contact nothing but the MCP server you point them at. There is one opt-in exception: --push-envelope posts the report to a control-plane URL you specify.",
  },
  {
    title: "No raw payloads stored",
    body: "Every finding carries payload_stored=false. Evidence identifies the location and class of a risk without keeping the payload that proved it.",
  },
  {
    title: "No runtime enforcement",
    body: "It reads a server before an agent trusts it. It does not block agent actions, enforce policy at runtime, or modify the target server.",
  },
  {
    title: "No registry monitoring, no dashboards",
    body: "It does not watch package registries for typosquats, and there is no SaaS product behind it to log into. It is a command that prints a report.",
  },
] as const;

export default function Home() {
  return (
    <>
      <StopRule animate />
      <Section>
        <Label>Orisan</Label>
        <h1 className="mt-4 max-w-hero text-3xl">
          Read the MCP server before your agent does.
        </h1>
        <p className="mt-6 max-w-lede text-lg text-grey-1">
          Orisan is building local-first instruments for exactly that: the
          first, <span className="font-mono">mcpscan</span>, reads what a
          server exposes &mdash; tools, resources, prompts &mdash; and runs
          deterministic checks before an AI agent connects. On your machine,
          uploading nothing.
        </p>
        <p className="mt-7">
          <a href="https://github.com/Orisan-org">Orisan on GitHub</a>
        </p>
      </Section>
      <StopRule />
      <Section>
        <Label>The record</Label>
        <h2 className="mt-4 max-w-hero text-2xl">
          Reading first is an old duty.
        </h2>

        <div className="mt-8">
          <MarginRail
            note={
              <>
                The golem obeys the letter of its instruction, animated by a
                word on paper and stopped only by taking that word back out.
                In the oldest written telling it grew until it killed the man
                who made it, in the act of being shut down.
              </>
            }
          >
            <p>
              A servant that does exactly what it was told is not safe, only
              faithful. The danger lives in the gap between what someone meant
              and what they actually wrote down &mdash; and an MCP server
              declares what it can do before it does any of it. That
              declaration is the last moment reading it costs nothing.
            </p>
          </MarginRail>
        </div>

        <div className="mt-8">
          <StopRule variant="thin" />
        </div>

        <div className="mt-8">
          <MarginRail
            note={
              <>
                Therac-25, 1985&ndash;87. Six massive overdoses, three of them
                fatal &mdash; software reused from machines whose hardware
                interlocks had been quietly absorbing its faults.
              </>
            }
          >
            <p>
              The code had worked for years, on hardware that made its faults
              unobservable. When the interlocks went away, reading what the
              software actually did was the only safety system left &mdash;
              and no one had, closely enough.
            </p>
          </MarginRail>
        </div>

        <div className="mt-8">
          <StopRule variant="thin" />
        </div>

        <div className="mt-8">
          <MarginRail
            note={
              <>
                Folklore gives the first reactor a safety control rod axe man.
                Historians doubt it; the man who held the axe said he felt
                foolish. The story survives anyway.
              </>
            }
          >
            <p>
              Disputed or not, the image holds a truth: from the first
              criticality onward, someone stands ready to cut the connection.
              The unglamorous modern version is reading what sits on the other
              end of the wire before anything runs.
            </p>
          </MarginRail>
        </div>
      </Section>
      <StopRule />

      <Section>
        <Label>What it reads</Label>
        <h2 className="mt-4 max-w-hero text-2xl">Nine checks, run locally.</h2>
        <p className="mt-6 max-w-lede text-lg text-grey-1">
          <span className="font-mono">mcpscan</span> connects to an MCP server,
          enumerates the tools, resources and prompts it exposes, and runs
          deterministic checks over those definitions. Everything below is the
          published 0.1.0, printed by{" "}
          <span className="font-mono">mcpscan list-checks</span>.
        </p>

        <div className="mt-8">
          <ChecksTable />
        </div>

        <div className="mt-6 max-w-measure">
          <p className="text-grey-1">
            Two of those nine carry conditions worth reading before you rely on
            them. <span className="font-mono">MCP-002</span> runs only when you
            give it a previous JSON report with{" "}
            <span className="font-mono">--baseline</span> (or{" "}
            <span className="font-mono">scan-config --baseline-dir</span>); with
            no baseline there is nothing to compare and the check does not fire.{" "}
            <span className="font-mono">MCP-050</span> compares exposed names
            against a curated static seed list held in the package. It does not
            monitor package registries, and it is not ecosystem coverage.
          </p>
          <p className="mt-5 text-grey-1">
            Coverage maps to seven OWASP MCP classes: MCP01, MCP02, MCP03,
            MCP05, MCP07, MCP09 and MCP10. Supply chain (MCP04), intent and flow
            (MCP06), and audit and telemetry gaps (MCP08) are out of scope for
            this alpha.
          </p>
        </div>
      </Section>

      <StopRule variant="thin" />

      <Section>
        <Label>How it grades</Label>
        <h2 className="mt-4 max-w-hero text-2xl">
          Nothing is suppressed. Severity is adjusted, and both values are kept.
        </h2>
        <p className="mt-6 max-w-lede text-lg text-grey-1">
          A finding that is expected of the server you are scanning is still a
          finding. <span className="font-mono">mcpscan</span> labels each one
          with a contextual verdict and records the original severity beside the
          adjusted one, so a downgrade is always visible as a downgrade.
        </p>

        <dl className="mt-8 max-w-measure">
          <dt className="font-mono text-xs uppercase tracking-label text-grey-1">
            expected_by_purpose
          </dt>
          <dd className="mt-2 text-ink">
            The capability is inherent to the server&rsquo;s declared purpose.
            Downgrade-eligible.
          </dd>
          <dt className="mt-5 font-mono text-xs uppercase tracking-label text-grey-1">
            unexpected
          </dt>
          <dd className="mt-2 text-ink">
            Outside the purpose category, but the declared text mentions it.
          </dd>
          <dt className="mt-5 font-mono text-xs uppercase tracking-label text-grey-1">
            undeclared
          </dt>
          <dd className="mt-2 text-ink">
            Outside the purpose category and not mentioned anywhere in the
            declared text. This is the one that escalates.
          </dd>
          <dt className="mt-5 font-mono text-xs uppercase tracking-label text-grey-1">
            unadjudicated
          </dt>
          <dd className="mt-2 text-ink">
            No declared purpose was available, so nothing was adjudicated.
          </dd>
        </dl>

        <p className="mt-8 max-w-measure text-grey-1">
          The grade is the worst effective severity in the report, and the
          effective severity is the adjusted one where a verdict changed it:
        </p>

        <ul className="mt-6 flex list-none flex-wrap gap-5 p-0">
          {GRADE_RULES.map(([grade, rule]) => (
            <li key={grade} className="flex items-center gap-3">
              <GradeStamp grade={grade} />
              <span className="text-xs text-grey-1">{rule}</span>
            </li>
          ))}
        </ul>
      </Section>

      <StopRule variant="thin" />

      <Section>
        <Label>What it will not do</Label>
        <h2 className="mt-4 max-w-hero text-2xl">
          The list of things it refuses is the point.
        </h2>
        <ul className="mt-8 max-w-measure list-none p-0">
          {NON_GOALS.map((item) => (
            <li key={item.title} className="mt-5 border-l-2 border-grey-3 pl-4 first:mt-0">
              <h3 className="text-base text-ink">{item.title}</h3>
              <p className="mt-1 text-grey-1">{item.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <StopRule variant="thin" />

      <Section>
        <Label>Run it</Label>
        <h2 className="mt-4 max-w-hero text-2xl">
          One command, nothing installed, against the config you already have.
        </h2>
        <p className="mt-6 max-w-lede text-lg text-grey-1">
          You have an MCP config with servers in it that you added months ago
          and have not read since. This tells you what each of them can reach
          before your agent trusts them again.
        </p>

        <pre className="mt-8 overflow-x-auto border-l-2 border-ink pl-4 font-mono text-base text-ink">
          <code>uvx orisan-mcpscan scan-config ./mcp.json --yes</code>
        </pre>
        <p className="mt-3 max-w-measure text-xs text-grey-1">
          The published distribution is{" "}
          <span className="font-mono">orisan-mcpscan</span>; the command it
          installs is <span className="font-mono">mcpscan</span>. Nothing is
          installed permanently and nothing leaves the machine.
        </p>

        <h3 className="mt-10 text-base text-ink">
          A real run, copied out of the terminal
        </h3>
        <p className="mt-2 max-w-measure text-grey-1">
          Two servers from the official Model Context Protocol collection. One
          is a memory store. The other is the filesystem server, handed{" "}
          <span className="font-mono">/</span> &mdash; the configuration mistake
          that is one careless line in a config file.
        </p>

        <pre className="mt-6 overflow-x-auto border-l-2 border-grey-3 pl-4 font-mono text-xs text-ink">
          <code>{SCAN_OUTPUT}</code>
        </pre>

        <div className="mt-8 max-w-measure">
          <div className="flex items-center gap-3">
            <GradeStamp grade="A" />
            <p className="text-grey-1">
              The memory store exposes nothing that needs a verdict. A clean
              server looks clean; that is what makes the other one worth
              reading.
            </p>
          </div>
          <div className="mt-6 flex items-center gap-3">
            <GradeStamp grade="D" />
            <p className="text-grey-1">
              The filesystem server can read and write files, which is what a
              filesystem server is for &mdash; so it is not called hidden. It is
              held at <span className="font-mono">HIGH</span> and marked{" "}
              <span className="font-mono">expected_unconfirmed</span>, because
              the purpose came from the config file rather than from you.
            </p>
          </div>
        </div>

        <p className="mt-8 max-w-measure text-grey-1">
          What it is not telling you: that the path is{" "}
          <span className="font-mono">/</span>. mcpscan reads the tools a server
          exposes, not the scope it was handed. Both of those servers would
          produce the same five findings pointed at a single folder. The grade
          says this server can read and write files and you have not confirmed
          that you meant it to &mdash; the blast radius is still yours to check.
        </p>
      </Section>

      <StopRule variant="thin" />

      <Section>
        <Label>Status</Label>
        <h2 className="mt-4 max-w-hero text-2xl">
          Alpha. Two defects were listed here. Both are fixed.
        </h2>
        <p className="mt-6 max-w-lede text-lg text-grey-1">
          Version <span className="font-mono">0.1.1</span> was published on 9
          August 2026. It closes both defects this section previously carried as
          open. They are left below, struck through, because a status page that
          quietly deletes its own admissions is not a status page.
        </p>

        <div className="mt-8 max-w-measure border-l-2 border-holding pl-4">
          <h3 className="text-base text-ink">
            <s>A well-behaved server can be graded{" "}
            <span className="font-mono">F</span> for doing its job</s>{" "}
            &mdash; fixed in <span className="font-mono">0.1.1</span>
          </h3>
          <p className="mt-2 text-grey-1">
            A purpose worked out from the server rather than from an explicit
            flag was printed in the header and then not used, so a standard
            filesystem server graded{" "}
            <span className="font-mono">F</span> with two criticals on the
            plainest invocation. Scanning the same server with{" "}
            <span className="font-mono">0.1.1</span> and no flags now reads{" "}
            <span className="font-mono">Purpose: filesystem (invocation)</span>{" "}
            and grades <span className="font-mono">B</span>{" "}
            &mdash; identical to passing the purpose explicitly. The header and the verdict column no
            longer disagree.
          </p>
          <p className="mt-2 text-grey-1">
            One thing did not change, deliberately. A purpose a server claims
            for itself still cannot lower a severity, only raise one. A server
            that names itself a filesystem server does not get to mark its own
            file-write tool routine.
          </p>
        </div>

        <div className="mt-6 max-w-measure border-l-2 border-holding pl-4">
          <h3 className="text-base text-ink">
            <s>Remote scanning over Streamable HTTP fails on a clean install</s>{" "}
            &mdash; fixed in <span className="font-mono">0.1.1</span>
          </h3>
          <p className="mt-2 text-grey-1">
            The package did not pin the MCP SDK it depends on, and a newer SDK
            renamed the function it calls to open that connection. Installed
            fresh today from PyPI,{" "}
            <span className="font-mono">0.1.1</span> pins that SDK and scans a
            live Streamable HTTP server. If the pin is bypassed, the scanner now
            refuses and names the version it found, rather than reporting a
            result it cannot stand behind.
          </p>
        </div>

        <h3 className="mt-10 text-base text-ink">Still true, and still alpha</h3>
        <ul className="mt-4 max-w-measure list-none p-0">
          <li className="mt-4 border-l-2 border-grey-3 pl-4 first:mt-0">
            <p className="text-grey-1">
              The MCP SDK is pinned below version 2. Adapting to the 2.x API is
              open work. If your environment forces a 2.x SDK, mcpscan will
              decline to scan rather than scan wrongly.
            </p>
          </li>
          <li className="mt-4 border-l-2 border-grey-3 pl-4">
            <p className="text-grey-1">
              Streamable HTTP is the remote transport that is tested. SSE is
              wired through the SDK where available and is not
              integration-tested. Treat it as unproven.
            </p>
          </li>
          <li className="mt-4 border-l-2 border-grey-3 pl-4">
            <p className="text-grey-1">
              It is alpha software at version{" "}
              <span className="font-mono">0.1.1</span>. The defect list above
              went from two entries to zero in six days, which tells you both
              that the defects get fixed and that there were defects to fix.
            </p>
          </li>
        </ul>
      </Section>

      <StopRule />
    </>
  );
}
