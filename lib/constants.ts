export const siteConfig = {
  name: "Orisan",
  domain: "orisan.org",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://orisan.org",
  email: "team@orisan.org",
  tagline: "Local-first checks for AI-agent exposure.",
  subtagline: "Local-first security tooling for AI-assisted software development.",
  description:
    "Orisan builds local-first security tooling for teams reviewing AI coding-agent exposure.",
  formspreeId: process.env.NEXT_PUBLIC_FORMSPREE_ID || "",
  links: {
    github: "https://github.com/Orisan-org",
    scoutRepo: process.env.NEXT_PUBLIC_SCOUT_REPO_URL || "https://github.com/Orisan-org/orisan-scout",
    guardRepo: process.env.NEXT_PUBLIC_GUARD_REPO_URL || "https://github.com/Orisan-org/orisan-guard",
    linkedin: "https://linkedin.com/company/orisan",
    twitter: "https://x.com/OrisanTeam",
    facebook: "https://www.facebook.com/profile.php?id=61589315133319",
    instagram: "https://instagram.com/orisanhq",
    founderGithub: "https://github.com/",
    founderLinkedin: "https://linkedin.com/in/"
  }
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
  { href: "/scout", label: "Scout" },
  { href: "/guard", label: "Guard" },
  { href: "/brief", label: "Brief" },
  { href: "/scout/run", label: "Run Scout" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export const scoutProduct = {
  title: "Orisan Scout",
  status: "Available now / early access",
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
  status: "Alpha core in development",
  href: "/guard",
  tagline: "Experimental sensitive-context handling for AI tools.",
  description:
    "Orisan Guard is an unreleased local alpha core for detecting sensitive context, planning safe rewrites, and producing evidence-safe events without uploading raw prompts.",
  preview:
    "Guard focuses on the moment before prompt or context leaves the user's control: classify sensitive spans, plan collision-resistant placeholders, apply safe rewrites, and keep evidence safe."
};

export const pageMetadata = {
  home: {
    title: "Orisan | Local-first checks for AI-agent exposure",
    description:
      "Orisan builds local-first security tooling for teams reviewing AI coding-agent exposure."
  },
  about: {
    title: "About Orisan | AI security lab",
    description:
      "Learn why Orisan exists, how it builds local-first security tooling for AI-assisted software development, and why Scout is the first product."
  },
  scout: {
    title: "Orisan Scout | Repo-local AI-agent approval artifact",
    description:
      "Orisan Scout produces a local approval artifact for MCP configuration risk and repo-level agent instruction risk without source upload."
  },
  guard: {
    title: "Orisan Guard | Experimental sensitive-context handling for AI tools",
    description:
      "Orisan Guard is an unreleased local alpha core for sensitive-context handling before AI tools."
  },
  brief: {
    title: "Scout Alpha Brief | Orisan",
    description:
      "The Scout alpha brief explains the approval-record hypothesis, validation protocol, success signals, and current scope."
  },
  runScout: {
    title: "Run Orisan Scout | Repo-local AI-agent approval review",
    description:
      "Run Orisan Scout locally to generate an approval artifact that summarizes what AI agents can read, execute, or change in a repository."
  },
  sampleReport: {
    title: "Scout Sample Report | Orisan",
    description:
      "View a sample Orisan Scout approval report for a risky repository with READ, EXECUTE, and CHANGE findings."
  },
  validateScout: {
    title: "Scout Internal QA | Orisan",
    description:
      "Dogfood Orisan Scout internally before asking external reviewers to trust the approval report."
  },
  contact: {
    title: "Contact | Orisan",
    description:
      "Reach Orisan about Scout, AI-agent security, collaboration, or work."
  }
};
