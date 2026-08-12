import type { Metadata } from "next";
import { InstallCommand } from "@/components/InstallCommand";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "One email address, no form, no analytics. Tell us what your agent already did that you did not expect, or why nobody would buy this.",
};

const INSTALL = "uvx orisan-mcpscan scan-config ./mcp.json --yes";

const PROMPTS = [
  {
    who: "Running agents in production",
    body: "Which agents act in your environment, and what they are allowed to touch today. The one that worries you is the useful one.",
  },
  {
    who: "Security team",
    body: "The surface you cannot currently see: unmanaged laptops, remote sessions, personal accounts.",
  },
  {
    who: "Developer",
    body: "What your agent has already done that you did not expect. That is our best research input.",
  },
  {
    who: "Sceptic",
    body: "Why nobody would buy this. We keep a written pressure test on exactly that, and we would rather argue with you than agree with you.",
  },
];

export default function Contact() {
  return (
    <>
      <SiteHeader current="/contact" />
      <main>
        <section className="mx-auto max-w-wrap px-8 pt-13 sm:pt-16">
          <p className="font-mono text-label uppercase tracking-label text-orisan-type">
            Contact
          </p>
          <h1 className="mt-6 max-w-hero text-3xl font-semibold">
            Ask us the hard part.
          </h1>
          <p className="mt-6 max-w-lede text-lg text-grey-1">
            No deck to sit through and no form to fill in. One address, answered by the
            people building it, including on what the product cannot do yet.
          </p>
          <p className="mt-9">
            <a
              href="mailto:team@orisan.org?subject=Orisan"
              className="font-mono text-xl tracking-normal"
            >
              team@orisan.org
            </a>
          </p>
        </section>

        <section className="mx-auto max-w-wrap px-8 pt-17">
          <p className="font-mono text-label uppercase tracking-label text-orisan-type">
            What to send
          </p>
          <h2 className="mt-5 max-w-hero text-2xl font-semibold">One paragraph is plenty.</h2>
          <p className="mt-5 max-w-lede text-lg text-grey-1">
            The most useful thing you can include is the action you are afraid of.
          </p>
          <ul className="mt-9 grid list-none grid-cols-stack gap-4 p-0 lg:grid-cols-pair">
            {PROMPTS.map((p) => (
              <li key={p.who} className="rounded-panel bg-paper-deep p-8">
                <p className="font-mono text-micro uppercase tracking-meta text-grey-2">
                  {p.who}
                </p>
                <p className="mt-4 max-w-lede text-base text-grey-1">{p.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mx-auto max-w-wrap px-8 pt-17">
          <div className="rounded-feature bg-ink px-8 py-13">
            <p className="font-mono text-label uppercase tracking-label text-orisan-inverse">
              Before you write
            </p>
            <h2 className="mt-5 max-w-hero text-2xl font-semibold text-paper">
              You can run the shipped part first.
            </h2>
            <p className="mt-5 max-w-lede text-lg text-grey-3">
              mcpscan is public and installable now. Pointing it at your own config takes
              about ten seconds and gives you something concrete to argue with us about.
            </p>
            <div className="mt-9">
              <InstallCommand command={INSTALL} tone="ink" />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-wrap px-8 py-17">
          <p className="font-mono text-label uppercase tracking-label text-orisan-type">
            What this site does
          </p>
          <h2 className="mt-5 max-w-hero text-2xl font-semibold">
            No forms, no analytics, no third-party scripts.
          </h2>
          <p className="mt-5 max-w-lede text-lg text-grey-1">
            There is nothing on this page that collects anything. The address above is a
            plain <span className="font-mono">mailto:</span> link, the fonts are served from
            this domain, and no analytics or tag manager is loaded anywhere on the site.
          </p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
