export const siteConfig = {
  name: "Orisan",
  domain: "orisan.org",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://orisan.org",
  email: "team@orisan.org",
  tagline: "Security infrastructure for AI-assisted software development.",
  subtagline: "Orisan Scout is the first active product wedge.",
  description:
    "Orisan builds security infrastructure for AI-assisted software development, starting with Orisan Scout.",
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
  version: "v0.1.0-alpha.4",
  url: `${siteConfig.links.scoutRepo}/releases/tag/v0.1.0-alpha.4`,
  installCommand: "go install github.com/Orisan-org/orisan-scout/cmd/orisan@v0.1.0-alpha.4",
  macArm64Asset: `${siteConfig.links.scoutRepo}/releases/download/v0.1.0-alpha.4/orisan-scout_darwin_arm64.tar.gz`,
  macAmd64Asset: `${siteConfig.links.scoutRepo}/releases/download/v0.1.0-alpha.4/orisan-scout_darwin_amd64.tar.gz`,
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
  status: "Active product wedge",
  href: "/scout",
  tagline: "Repo-local approval artifact for AI-agent exposure.",
  description:
    "Orisan Scout reviews repo-local MCP configuration risk and repo-level agent instruction risk, then produces an approval artifact that explains what AI agents can read, execute, or change without uploading source code.",
  preview:
    "Scout helps teams understand where AI agents can act, what instructions they inherit, and which local configuration choices create exposure before agentic development is approved in a repository.",
  tags: ["AI Security", "MCP", "Repository Risk", "Local-first"]
};

export const guardProduct = {
  title: "Orisan Guard",
  status: "Alpha core in development",
  href: "/guard",
  tagline: "Sensitive context protection and safe rewrite for AI tools.",
  description:
    "Orisan Guard is being built to detect sensitive context, rewrite it safely before it reaches AI tools, and produce evidence-safe events without uploading raw prompts.",
  preview:
    "Guard focuses on the moment before prompt or context leaves the user's control: classify sensitive spans, plan collision-resistant placeholders, apply safe rewrites, and keep evidence safe."
};

export const pageMetadata = {
  home: {
    title: "Orisan | Security infrastructure for AI-assisted software development",
    description:
      "Orisan builds security infrastructure for AI-assisted software development, starting with Orisan Scout."
  },
  about: {
    title: "About Orisan | AI security lab",
    description:
      "Learn why Orisan exists, how it builds security infrastructure for AI-assisted software development, and why Scout is the first product."
  },
  scout: {
    title: "Orisan Scout | Repo-local AI-agent approval artifact",
    description:
      "Orisan Scout produces a local approval artifact for MCP configuration risk and repo-level agent instruction risk without source upload."
  },
  guard: {
    title: "Orisan Guard | Sensitive context protection for AI tools",
    description:
      "Orisan Guard is an alpha core for detecting and safely rewriting sensitive context before it reaches AI tools."
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
    title: "Validate Scout | Orisan",
    description:
      "Run Orisan Scout on one repository and tell us whether the approval report helps AppSec make a decision."
  },
  contact: {
    title: "Contact | Orisan",
    description:
      "Reach Orisan about Scout, AI-agent security, collaboration, or work."
  }
};
