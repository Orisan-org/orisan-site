import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { pageMetadata, siteConfig, socialLinks } from "@/lib/constants";

export const metadata: Metadata = {
  title: pageMetadata.contact.title,
  description: pageMetadata.contact.description,
  alternates: { canonical: "/contact" }
};

const contactLinks = [
  {
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`
  },
  ...socialLinks
];

function Label({ children }: { children: React.ReactNode }) {
  return <p className="max-w-[18rem] font-mono text-[11px] uppercase leading-5 tracking-[0.22em] text-[var(--ink-dim)] sm:max-w-none">{children}</p>;
}

export default function ContactPage() {
  return (
    <div className="bg-[var(--bg)] pt-16 text-[var(--ink)]">
      <section className="container-shell grid gap-14 py-20 md:grid-cols-[0.9fr_1.1fr] md:py-28">
        <div>
          <div className="mb-7 flex items-center gap-4">
            <span className="h-px w-7 bg-[var(--sun)]" />
            <Label>Contact</Label>
          </div>
          <h1 className="max-w-3xl text-[clamp(2.4rem,5vw,4.8rem)] font-semibold leading-[1.04] tracking-[-0.04em]">
            Reach out.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-[var(--ink-dim)] md:text-xl">
            Whether you are evaluating Scout, reviewing AI-agent risk, or want to compare notes, we are listening.
          </p>
          <div className="mt-10 grid border-l border-t border-[var(--rule)]">
            {contactLinks.map((item) => (
              <a key={item.label} href={item.href} className="grid gap-1 border-b border-r border-[var(--rule)] p-4 transition hover:bg-[var(--bg-2)]">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--sun)]">{item.label}</span>
                <span className="break-words text-[var(--ink-dim)]">{item.value}</span>
              </a>
            ))}
          </div>
        </div>
        <ContactForm />
      </section>
    </div>
  );
}
