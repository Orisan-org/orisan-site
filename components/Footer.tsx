import { Github } from "lucide-react";
import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { navigation, siteConfig } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-[var(--bg)] text-[var(--ink)]">
      <div className="container-shell grid gap-12 border-t border-[var(--rule)] py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <BrandMark tone="light" />
          <p className="mt-5 max-w-sm text-[var(--ink-dim)]">{siteConfig.tagline}</p>
          <p className="mt-8 font-mono text-xs uppercase tracking-[0.22em] text-[var(--ink-faint)]">
            Local-first. No telemetry.
          </p>
        </div>
        <nav className="grid content-start gap-3" aria-label="Footer navigation">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--sun)]">Navigate</p>
          {navigation.map((item) =>
            item.href.startsWith("http") ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="text-[var(--ink-dim)] transition hover:text-[var(--ink)]"
              >
                {item.label}
              </a>
            ) : (
              <Link key={item.href} href={item.href} className="text-[var(--ink-dim)] transition hover:text-[var(--ink)]">
                {item.label}
              </Link>
            )
          )}
        </nav>
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--sun)]">Source</p>
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 border border-[var(--rule-2)] px-3 py-2 text-sm text-[var(--ink-dim)] transition hover:border-[var(--sun)] hover:text-[var(--sun)]"
          >
            <Github size={16} aria-hidden="true" /> github.com/Orisan-org
          </a>
          <p className="mt-8 text-sm text-[var(--ink-faint)]">© 2026 Orisan</p>
        </div>
      </div>
    </footer>
  );
}
