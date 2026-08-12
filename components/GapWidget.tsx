"use client";

import { useState } from "react";

/**
 * A faithful port of mcpscan 0.1.1's adjudication, so the page recomputes verdicts
 * rather than displaying a table someone wrote by hand.
 *
 * Ported from the published wheel, not from our repo: adjudicate.py, purpose.py,
 * scoring.py, utils/severity.py, data/purpose_categories.yaml.
 *
 * Every state below was run against the published 0.1.1 wheel and the results are
 * recorded in tests/gap.spec.ts, which asserts this component reproduces them. If
 * the port drifts from the product, that test fails. CLAIMS.md rows 59-61.
 */

type Severity = "info" | "low" | "medium" | "high" | "critical";
type Source = "flag" | "invocation" | "config" | "server_info" | "unknown";

const ORDER: Record<Severity, number> = { info: 0, low: 1, medium: 2, high: 3, critical: 4 };
const INCREASE: Record<Severity, Severity> = {
  info: "low",
  low: "medium",
  medium: "high",
  high: "critical",
  critical: "critical",
};

/** purpose_categories.yaml, the two entries this server's tools can touch. */
const EXPECTED: Record<string, string[]> = {
  filesystem: ["file_read", "file_write", "data_exposure"],
  unknown: [],
};

/** capability_keywords, for the mentioned-in-declared-text test. */
const CAPABILITY_KEYWORDS: Record<string, string[]> = {
  file_read: ["read file", "file path", "directory", "filesystem"],
  file_write: ["write file", "edit file", "save file", "delete file"],
};

const DOWNGRADE_ELIGIBLE = ["MCP-010"];
/** adjudicate.py: only these may lower a severity. */
const OPERATOR_PURPOSE_SOURCES: Source[] = ["flag", "invocation"];

const SERVER_TEXT = "secure-filesystem-server";

type Finding = {
  id: string;
  target: string;
  capability: string;
  severity: Severity;
  evidence: string;
};

/** The five MCP-010 findings a real scan of the reference server produces. */
const FINDINGS: Finding[] = [
  { id: "MCP-010", target: "edit_file", capability: "file_write", severity: "high", evidence: "Tool 'edit_file' appears to expose file write based on name, description, or schema." },
  { id: "MCP-010", target: "get_file_info", capability: "file_read", severity: "high", evidence: "Tool 'get_file_info' appears to expose file read based on name, description, or schema." },
  { id: "MCP-010", target: "read_file", capability: "file_read", severity: "high", evidence: "Tool 'read_file' appears to expose file read based on name, description, or schema." },
  { id: "MCP-010", target: "read_multiple_files", capability: "file_read", severity: "high", evidence: "Tool 'read_multiple_files' appears to expose file read based on name, description, or schema." },
  { id: "MCP-010", target: "write_file", capability: "file_write", severity: "high", evidence: "Tool 'write_file' appears to expose file write based on name, description, or schema." },
];

type Profile = { category: string; source: Source; declaredText: string };
type Adjudicated = Finding & { original: Severity; adjusted: Severity; verdict: string };

function mayDowngrade(source: Source) {
  return OPERATOR_PURPOSE_SOURCES.includes(source);
}

function downgradeEligible(finding: Finding) {
  return DOWNGRADE_ELIGIBLE.includes(finding.id);
}

function capabilityMentioned(capability: string, declaredText: string) {
  const normalized = declaredText.toLowerCase();
  return (CAPABILITY_KEYWORDS[capability] ?? []).some((k) => normalized.includes(k));
}

function adjudicate(finding: Finding, profile: Profile): Adjudicated {
  const original = finding.severity;

  if (profile.category === "unknown" && profile.source === "unknown") {
    return { ...finding, original, adjusted: original, verdict: "unadjudicated" };
  }

  const expected = EXPECTED[profile.category] ?? [];
  if (expected.includes(finding.capability)) {
    if (mayDowngrade(profile.source)) {
      return {
        ...finding,
        original,
        adjusted: downgradeEligible(finding) ? "info" : original,
        verdict: "expected_by_purpose",
      };
    }
    // Not operator-supplied: severity is left exactly where the check put it.
    return { ...finding, original, adjusted: original, verdict: "expected_unconfirmed" };
  }

  // Escalation path, open to every source.
  if (!capabilityMentioned(finding.capability, profile.declaredText)) {
    return { ...finding, original, adjusted: INCREASE[original], verdict: "undeclared" };
  }
  return { ...finding, original, adjusted: original, verdict: "unexpected" };
}

/** scoring.py grade_for(), over effective severity. */
function gradeFor(rows: Adjudicated[]) {
  const set = rows.map((r) => r.adjusted);
  if (set.includes("critical")) return "F";
  if (set.includes("high")) return "D";
  if (set.includes("medium")) return "C";
  if (set.includes("low") || set.includes("info")) return "B";
  return "A";
}

const PURPOSES = [
  { key: "filesystem", label: "filesystem" },
  { key: "weather", label: "weather" },
  { key: "none", label: "none" },
] as const;

const SOURCES = [
  { key: "flag", label: "You, with a flag" },
  { key: "config", label: "A config file" },
  { key: "server_info", label: "The server itself" },
] as const;

const SEVERITY_INK: Record<Severity, string> = {
  critical: "text-harm",
  high: "text-suspicion",
  medium: "text-suspicion",
  low: "text-grey-2",
  info: "text-holding",
};

export function GapWidget() {
  const [purpose, setPurpose] = useState<string>("filesystem");
  const [source, setSource] = useState<Source>("flag");

  const locked = purpose !== "filesystem";

  const profile: Profile =
    purpose === "none"
      ? { category: "unknown", source: "unknown", declaredText: "" }
      : purpose === "weather"
        ? { category: "unknown", source: "flag", declaredText: `weather server\n${SERVER_TEXT}` }
        : { category: "filesystem", source, declaredText: SERVER_TEXT };

  const rows = FINDINGS.map((f) => adjudicate(f, profile)).sort(
    (a, b) =>
      ORDER[b.adjusted] - ORDER[a.adjusted] || a.id.localeCompare(b.id) || a.target.localeCompare(b.target),
  );
  const grade = gradeFor(rows);
  const exitCode = rows.some((r) => ORDER[r.adjusted] >= ORDER.high) ? "1" : "0";

  const command =
    purpose === "weather"
      ? 'mcpscan scan --command "npx -y @modelcontextprotocol/server-filesystem /tmp/root" --purpose "weather server"'
      : purpose === "none"
        ? "mcpscan scan --command \"./run-server\""
        : source === "config"
          ? "mcpscan scan-config ./mcp.json --yes"
          : source === "server_info"
            ? 'mcpscan scan --command "./run-server"'
            : 'mcpscan scan --command "npx -y @modelcontextprotocol/server-filesystem /tmp/root" --purpose-category filesystem';

  return (
    <div>
      <div className="grid grid-cols-stack gap-8 rounded-panel bg-paper-deep p-8 lg:grid-cols-pair">
        <div>
          <p className="font-mono text-micro uppercase tracking-meta text-grey-2">
            Declared purpose
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {PURPOSES.map((p) => (
              <button
                key={p.key}
                type="button"
                aria-pressed={p.key === purpose}
                onClick={() => setPurpose(p.key)}
                className={`rounded-full border border-ink px-5 py-3 font-mono text-label uppercase tracking-label ${
                  p.key === purpose ? "bg-ink text-paper" : "text-grey-1"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
        <div className={locked ? "opacity-45" : undefined}>
          <p className="font-mono text-micro uppercase tracking-meta text-grey-2">
            Who declared it
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {SOURCES.map((s) => (
              <button
                key={s.key}
                type="button"
                disabled={locked}
                aria-pressed={!locked && s.key === source}
                onClick={() => setSource(s.key)}
                className={`rounded-full border border-ink px-5 py-3 font-mono text-label uppercase tracking-label ${
                  !locked && s.key === source ? "bg-ink text-paper" : "text-grey-1"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
          <p className="mt-4 max-w-lede text-base text-grey-1">
            {purpose === "none"
              ? "No purpose was resolved at all, so there is no source to choose."
              : purpose === "weather"
                ? "Free text only ever reaches the adjudicator as an operator flag, so the source is fixed here."
                : "A config file and an operator flag can be the identical string. The difference is provenance, not wording."}
          </p>
        </div>
      </div>

      <pre className="mt-4 overflow-x-auto rounded-panel border border-grey-3 p-6 font-mono text-xs text-ink sm:overflow-x-visible">
        <code data-testid="gap-command">{command}</code>
      </pre>

      <div className="mt-4 rounded-panel border border-grey-3 p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-grey-3 pb-6">
          <p className="font-mono text-sm">secure-filesystem-server</p>
          <p className="font-mono text-micro uppercase tracking-meta text-grey-2">
            purpose{" "}
            <span data-testid="gap-purpose">
              {profile.category} ({profile.source})
            </span>{" "}
            &middot; findings 5 &middot; exit <span data-testid="gap-exit">{exitCode}</span>
          </p>
          <p className="font-mono text-xl" data-testid="gap-grade">
            {grade}
          </p>
        </div>
        <ul className="list-none p-0">
          {rows.map((r) => (
            <li key={r.target} className="border-b border-grey-3 py-5">
              <p className="flex flex-wrap items-baseline gap-3 font-mono text-xs">
                <span className={SEVERITY_INK[r.adjusted]} data-testid={`sev-${r.target}`}>
                  {r.adjusted.toUpperCase()}
                  {r.adjusted !== r.original ? ` (was ${r.original.toUpperCase()})` : ""}
                </span>
                <span className="text-grey-2" data-testid={`verdict-${r.target}`}>
                  {r.verdict}
                </span>
                <span className="text-grey-2">{r.id}</span>
                <span className="text-ink">{r.target}</span>
              </p>
              <p className="mt-2 max-w-measure text-sm text-grey-1">{r.evidence}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 font-mono text-micro uppercase tracking-meta text-grey-2">
          payload_stored false &middot; no findings suppressed
        </p>
      </div>
    </div>
  );
}
