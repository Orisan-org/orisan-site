import { ChecksTable } from "@/components/ChecksTable";
import { GradeStamp } from "@/components/GradeStamp";
import { Label } from "@/components/Label";
import { MarginRail } from "@/components/MarginRail";
import { Section } from "@/components/Section";
import { StopRule } from "@/components/StopRule";

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
        <Label>Status</Label>
        <h2 className="mt-4 max-w-hero text-2xl">
          Alpha, and here is what is broken.
        </h2>
        <p className="mt-6 max-w-lede text-lg text-grey-1">
          Version 0.1.0 is published and it is alpha software. Two defects are
          confirmed by running that published package, and both are listed here
          rather than left for you to find at a worse moment. Fixes are in
          flight for 0.1.1.
        </p>

        <div className="mt-8 max-w-measure">
          <h3 className="text-base text-ink">
            A well-behaved server can be graded F for doing its job
          </h3>
          <p className="mt-2 text-grey-1">
            When <span className="font-mono">mcpscan</span> works out a
            server&rsquo;s purpose from the server&rsquo;s own metadata instead
            of from an explicit flag, it prints that purpose and then does not
            use it. Scanning a standard filesystem server with no flags, the
            header reads <span className="font-mono">Purpose: filesystem</span>{" "}
            and <span className="font-mono">write_file</span> is still marked{" "}
            <span className="font-mono">undeclared</span> and escalated to{" "}
            <span className="font-mono">CRITICAL</span>, for a grade of{" "}
            <span className="font-mono">F</span>. Passing the purpose explicitly
            grades the same server <span className="font-mono">B</span>, with
            the same tool marked{" "}
            <span className="font-mono">expected_by_purpose</span>. What it
            means for you: the plainest way to run it is the one that produces
            false alarms, and the report contradicts its own header.
          </p>
        </div>

        <div className="mt-6 max-w-measure">
          <h3 className="text-base text-ink">
            Remote scanning over Streamable HTTP fails on a clean install
          </h3>
          <p className="mt-2 text-grey-1">
            The package does not pin the MCP SDK it depends on, and a newer SDK
            renamed the function <span className="font-mono">mcpscan</span>{" "}
            calls to open that connection. Installed fresh today, a scan against
            an <span className="font-mono">http://</span> server cannot connect.
            Scanning local stdio servers is unaffected: that path does not touch
            the renamed function. What it means for you: only local scanning can
            be relied on until the pin lands.
          </p>
        </div>

        <p className="mt-8 max-w-measure text-grey-1">
          This page carries no install command for the same reason it carries no
          proof recording: 0.1.0 is not the version anyone should be told to
          install, and a command that fails for most people is worse than no
          command at all.
        </p>
      </Section>

      <StopRule />
    </>
  );
}
