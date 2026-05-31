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
  macAmd64Asset: `${siteConfig.links.scoutRepo}/releases/download/v0.1.0-alpha.4/orisan-scout_darwin_amd64.tar.gz`
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
  { href: "/about", label: "About" },
  { href: "/scout", label: "Scout" },
  { href: "/scout/run", label: "Run Scout" },
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
  runScout: {
    title: "Run Orisan Scout | Repo-local AI-agent approval review",
    description:
      "Run Orisan Scout locally to generate an approval artifact that summarizes what AI agents can read, execute, or change in a repository."
  },
  contact: {
    title: "Contact | Orisan",
    description:
      "Reach Orisan about Scout, AI-agent security, collaboration, or work."
  }
};
