export const siteConfig = {
  name: "Orisan",
  domain: "orisan.org",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://orisan.org",
  email: "team@orisan.org",
  tagline: "Local-first MCP server security scanning.",
  subtagline: "Local-first security tooling for MCP server review.",
  description:
    "Orisan builds local-first security tooling for teams reviewing MCP server exposure before AI agents connect.",
  formspreeId: process.env.NEXT_PUBLIC_FORMSPREE_ID || "",
  links: {
    github: "https://github.com/Orisan-org",
    mcpscanRepo: "https://github.com/Orisan-org/mcpscan",
    scoutRepo: process.env.NEXT_PUBLIC_SCOUT_REPO_URL || "https://github.com/Orisan-org/orisan-scout",
    guardRepo: process.env.NEXT_PUBLIC_GUARD_REPO_URL || "https://github.com/Orisan-org/orisan-guard",
    linkedin: "https://linkedin.com/company/orisan",
    twitter: "https://x.com/OrisanTeam",
    facebook: "https://www.facebook.com/profile.php?id=61589315133319",
    instagram: "https://instagram.com/orisanhq",
    founderGithub: "",
    founderLinkedin: ""
  }
};

export const mcpscanRelease = {
  version: "v0.1.0-alpha.2",
  url: `${siteConfig.links.mcpscanRepo}/releases/tag/v0.1.0-alpha.2`,
  installCommands: [
    "git clone https://github.com/Orisan-org/mcpscan",
    "cd mcpscan",
    "python3 -m venv .venv",
    "source .venv/bin/activate",
    "python -m pip install -e \".[dev]\"",
    "mcpscan scan --command '<your MCP server command>'"
  ],
  description:
    "Local-first security scanner for MCP servers. Enumerates tools, resources, prompts, and metadata, then runs deterministic checks without uploads.",
  status:
    "Alpha software. Useful for local MCP server review and validation."
};

export const scoutRelease = {
  version: "v0.1.0-alpha.5",
  url: `${siteConfig.links.scoutRepo}/releases/tag/v0.1.0-alpha.5`,
  installCommand: "curl -fsSL https://orisan.org/install | sh",
  windowsInstallCommand: "irm https://orisan.org/install.ps1 | iex",
  developerInstallCommand: "go install github.com/Orisan-org/orisan-scout/cmd/orisan@v0.1.0-alpha.5",
  macArm64Asset: `${siteConfig.links.scoutRepo}/releases/download/v0.1.0-alpha.5/orisan-scout_darwin_arm64.tar.gz`,
  macAmd64Asset: `${siteConfig.links.scoutRepo}/releases/download/v0.1.0-alpha.5/orisan-scout_darwin_amd64.tar.gz`,
  feedbackUrl: `${siteConfig.links.scoutRepo}/issues/new?template=alpha-feedback.yml`,
  sampleReportUrl: "/scout/sample-report",
  validateUrl: "/scout/validate"
};

export const socialLinks = [
  {
    label: "GitHub",
    value: "github.com/Orisan-org",
    href: siteConfig.links.github
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/company/orisan",
    href: siteConfig.links.linkedin
  },
  {
    label: "Twitter/X",
    value: "@OrisanTeam",
    href: siteConfig.links.twitter
  },
  {
    label: "Instagram",
    value: "@orisanhq",
    href: siteConfig.links.instagram
  },
  {
    label: "Facebook",
    value: "Facebook page",
    href: siteConfig.links.facebook
  }
];

export const navigation = [
  { href: "/", label: "mcpscan" },
  { href: siteConfig.links.mcpscanRepo, label: "GitHub" },
  { href: mcpscanRelease.url, label: "Release" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export const mcpscanProduct = {
  title: "mcpscan",
  status: mcpscanRelease.version,
  href: siteConfig.links.mcpscanRepo,
  tagline: "Local-first security scanner for MCP servers.",
  description: mcpscanRelease.description,
  preview:
    "Scan stdio and tested Streamable HTTP MCP servers before connecting them to AI agents. Findings use safe evidence and payload_stored=false.",
  tags: ["MCP Security", "Local-first", "Deterministic Checks", "Alpha"]
};

export const scoutProduct = {
  title: "Orisan Scout",
  status: "Secondary community artifact",
  href: "/scout",
  tagline: "Repo-local approval artifact for AI-agent exposure.",
  description:
    "Orisan Scout uses deterministic local checks for repo-local MCP configuration risk and repo-level agent instruction risk, then explains what AI agents can read, execute, or change without uploading source code.",
  preview:
    "Scout helps teams understand where AI agents can act, what instructions they inherit, and which local configuration choices create exposure before agentic development is approved in a repository.",
  tags: ["AI Security", "MCP", "Repository Risk", "Local-first"]
};

export const guardProduct = {
  title: "Orisan Guard",
  status: "Parked experiment",
  href: "/guard",
  tagline: "Parked sensitive-context handling experiment.",
  description:
    "Orisan Guard is a parked local experiment. It is not part of the current public story.",
  preview:
    "Guard is retained as portfolio context while Orisan focuses on mcpscan."
};

export const pageMetadata = {
  home: {
    title: "mcpscan | Local-first security scanner for MCP servers",
    description:
      "mcpscan audits MCP servers locally, enumerates exposed tools, resources, prompts, and metadata, and emits deterministic findings before AI agents connect."
  },
  about: {
    title: "About Orisan | Local-first MCP security tools",
    description:
      "Learn why Orisan is focused on local-first MCP server security review and why mcpscan is the current active project."
  },
  scout: {
    title: "Orisan Scout | Repo-local AI-agent approval artifact",
    description:
      "Orisan Scout produces a local approval artifact for MCP configuration risk and repo-level agent instruction risk without source upload."
  },
  guard: {
    title: "Orisan Guard | Experimental sensitive-context handling for AI tools",
    description:
      "Orisan Guard is a parked Orisan experiment. mcpscan is the current active project."
  },
  brief: {
    title: "Archived Scout Alpha Brief | Orisan",
    description:
      "Archived Scout alpha brief. mcpscan is the current active Orisan project."
  },
  runScout: {
    title: "Archived Scout Runbook | Orisan",
    description:
      "Archived Scout-specific runbook. mcpscan is the current active Orisan project."
  },
  sampleReport: {
    title: "Archived Scout Sample Report | Orisan",
    description:
      "Archived Scout sample report retained as background. mcpscan is the current active Orisan project."
  },
  validateScout: {
    title: "Archived Scout Internal QA | Orisan",
    description:
      "Archived Scout QA note retained as background. mcpscan is the current active Orisan project."
  },
  contact: {
    title: "Contact | Orisan",
    description:
      "Reach Orisan about mcpscan, MCP server security review, collaboration, or work."
  }
};
