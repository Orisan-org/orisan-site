import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { pageMetadata, siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: pageMetadata.contact.title,
  description: pageMetadata.contact.description,
};

const hasForm = Boolean(siteConfig.formspreeId);

export default function ContactPage() {
  return (
    <div className="pt-16">
      <section className="container-shell max-w-2xl py-20 md:py-28">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--ink-faint)]">Contact</p>
        <h1 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-[-0.02em]">Get in touch</h1>
        <p className="mt-6 text-lg text-[var(--ink-dim)]">
          Questions about mcpscan, MCP server security, access to the source, or collaboration — reach out through
          GitHub. Everything Orisan builds lives under the organization there.
        </p>

        <div className="mt-10 border border-[var(--rule)] bg-[var(--bg-2)] p-6 md:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--sun)]">GitHub</p>
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block font-mono text-lg text-[var(--ink)] underline decoration-[var(--rule-2)] underline-offset-4 transition hover:decoration-[var(--sun)]"
          >
            github.com/Orisan-org
          </a>
          <p className="mt-4 text-sm text-[var(--ink-dim)]">
            Open an issue or discussion on the relevant repository, or request access to mcpscan. We don&apos;t publish a
            contact email — this keeps the path real instead of pointing at an inbox that isn&apos;t monitored.
          </p>
        </div>

        {hasForm ? (
          <div className="mt-10">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-[var(--ink-faint)]">Or send a message</p>
            <ContactForm />
          </div>
        ) : null}
      </section>
    </div>
  );
}
