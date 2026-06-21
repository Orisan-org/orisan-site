// Single source of truth for site content. Kept honest on purpose: only the
// public org link is referenced (the individual product repos are private and
// would 404 for visitors), no invented email, no unverified social accounts.

export const siteConfig = {
  name: "Orisan",
  domain: "orisan.org",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://orisan.org",
  tagline: "Security tooling to see what your AI and agents do — and stop them when needed.",
  description:
    "Orisan builds local-first security tools for AI and MCP (Model Context Protocol). See what your AI agents can reach and do, and stop them when needed. mcpscan is the active project; the control plane is the direction.",
  // Optional Formspree form id. When unset, the contact page points to GitHub
  // instead of an invented email address.
  formspreeId: process.env.NEXT_PUBLIC_FORMSPREE_ID || "",
  links: {
    github: "https://github.com/Orisan-org",
  },
};

export const mcpscan = {
  name: "mcpscan",
  status: "Active · alpha (v0.1.0-alpha.2)",
  tagline: "Local-first security scanner for MCP servers.",
  description:
    "mcpscan inspects an MCP server before you connect an AI agent to it. It enumerates the tools, resources, prompts, and metadata the server exposes, then runs deterministic checks — locally, with nothing uploaded.",
  // The honest source-install path. Requires repository access while mcpscan is
  // pre-publication (no PyPI, pipx, Homebrew, or curl|sh installer is claimed).
  install: [
    "git clone https://github.com/Orisan-org/mcpscan",
    "cd mcpscan",
    "python3 -m venv .venv && source .venv/bin/activate",
    'python -m pip install -e ".[dev]"',
    "mcpscan scan --command '<your MCP server command>'",
  ],
  note: "Alpha software, pre-publication. Source access is available to organizations on request — there is no public package or one-line installer yet.",
};

// A small, representative slice of mcpscan output. Illustrative, not a live feed.
export const sampleReport = `$ mcpscan scan --command "python -m my_mcp_server"

  target        my_mcp_server (stdio)
  protocol      MCP / 2025-06-18
  enumerated    7 tools   3 resources   1 prompt

  FINDING  MCP-TOOL-013   high
    tool "run_shell" accepts an unconstrained command string
    evidence: input schema has no allow-list or pattern (redacted)

  FINDING  MCP-RES-004    medium
    resource "files://" exposes the working directory tree

  FINDING  MCP-META-002   low
    server does not declare a tools list-changed capability

  3 findings   payload_stored=false   no network egress
  report written to ./mcpscan-report.json`;

// The product lineup, each at its honest maturity. Only mcpscan is shipping.
export const lineup = [
  {
    name: "mcpscan",
    status: "Active · alpha",
    summary: "Local-first security scanner for MCP servers. Enumerate and check a server before an agent connects.",
  },
  {
    name: "Control Plane",
    status: "Product direction",
    summary: "The organizational layer: aggregate findings from the tools below, see what agents are doing, and stop them when needed.",
  },
  {
    name: "Scout",
    status: "In development",
    summary: "Repo-level evidence of what an AI agent can read, run, or change before agentic work is approved.",
  },
  {
    name: "Relay",
    status: "In development",
    summary: "Local-first mediation for agent tool calls — a checkpoint between an agent and the tools it invokes.",
  },
  {
    name: "Review",
    status: "In development",
    summary: "Diff-aware review routing for AI-assisted changes to security-sensitive code.",
  },
  {
    name: "Guard",
    status: "Parked experiment",
    summary: "Local protection for sensitive context handed to AI tools. Retained as background while focus stays on mcpscan.",
  },
];

// Footer/contact: GitHub org only. No unverified social accounts, no invented email.
export const socialLinks = [
  { label: "GitHub", value: "github.com/Orisan-org", href: siteConfig.links.github },
];

export const navigation = [
  { href: "/", label: "mcpscan" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: siteConfig.links.github, label: "GitHub" },
];

export const pageMetadata = {
  home: {
    title: "Orisan — local-first security for AI and MCP",
    description:
      "Orisan builds local-first security tools for AI and MCP. mcpscan, the active project, scans MCP servers before agents connect. The control plane is the direction.",
  },
  about: {
    title: "About — Orisan",
    description:
      "What Orisan is building, how the open-core model works, and the honest maturity of each tool. Local-first, no telemetry, no data harvesting.",
  },
  contact: {
    title: "Contact — Orisan",
    description: "Reach Orisan about mcpscan, MCP server security, access, or collaboration.",
  },
};
