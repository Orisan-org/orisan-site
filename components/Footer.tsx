import { Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { navigation, siteConfig, socialLinks } from "@/lib/constants";

const socialIcons = {
  GitHub: Github,
  LinkedIn: Linkedin,
  "Twitter/X": Twitter,
  Instagram: Instagram,
  Facebook: Facebook
};

export function Footer() {
  return (
    <footer className="bg-[var(--bg)] text-[var(--ink)]">
      <div className="container-shell grid gap-12 border-t border-[var(--rule)] py-14 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <BrandMark tone="light" />
          <p className="mt-5 max-w-sm text-lg text-[var(--ink-dim)]">{siteConfig.tagline}</p>
          <p className="mt-8 font-mono text-xs uppercase tracking-[0.22em] text-[var(--ink-faint)]">
            Instrument, not brochure.
          </p>
        </div>
        <nav className="grid content-start gap-3" aria-label="Footer navigation">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--sun)]">Navigate</p>
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="text-[var(--ink-dim)] transition hover:text-[var(--ink)]">
              {item.label}
            </Link>
          ))}
        </nav>
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--sun)]">Signals</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {socialLinks.map((item) => {
              const Icon = socialIcons[item.label as keyof typeof socialIcons];

              return (
                <a
                  key={item.label}
                  className="grid h-10 w-10 place-items-center border border-[var(--rule-2)] text-[var(--ink-dim)] transition hover:border-[var(--sun)] hover:text-[var(--sun)]"
                  href={item.href}
                  aria-label={item.label}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
          <p className="mt-8 text-sm text-[var(--ink-faint)]">© 2026 Orisan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
