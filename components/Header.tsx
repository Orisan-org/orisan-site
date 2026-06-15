"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BrandMark } from "@/components/BrandMark";
import { mcpscanRelease, siteConfig } from "@/lib/constants";

const headerLinks = [
  { href: "/", label: "mcpscan" },
  { href: siteConfig.links.mcpscanRepo, label: "GitHub", external: true },
  { href: mcpscanRelease.url, label: "Release", external: true },
  { href: "/about", label: "About" }
];

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-[var(--rule)] bg-[rgba(20,30,29,0.86)] backdrop-blur-xl">
      <div className="container-shell flex h-16 items-center justify-between">
        <BrandMark tone="light" size="sm" />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
          {headerLinks.map((item) => {
            const active = !item.external && (pathname === item.href || (item.href !== "/" && pathname.startsWith(`${item.href}/`)));
            const className =
              "group relative font-mono text-xs uppercase tracking-[0.12em] text-[var(--ink-dim)] transition hover:text-[var(--ink)]";

            if (item.external) {
              return (
                <a key={item.href} href={item.href} target="_blank" rel="noreferrer" className={className}>
                  {item.label}
                  <span className="absolute -bottom-2 left-0 h-px w-0 bg-[var(--sun)] transition-all duration-300 group-hover:w-full" />
                </a>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={className}
              >
                {item.label}
                <span
                  className={`absolute -bottom-2 left-0 h-px bg-[var(--sun)] transition-all duration-300 ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <a
            href={siteConfig.links.mcpscanRepo}
            target="_blank"
            rel="noreferrer"
            className="bg-[var(--ink)] px-4 py-2.5 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--bg)] transition hover:bg-[var(--sun)]"
          >
            View GitHub
          </a>
        </div>
        <button
          className="grid h-10 w-10 place-items-center border border-[var(--rule-2)] text-[var(--ink)] md:hidden"
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
      </div>

      {isOpen ? (
        <div className="fixed inset-0 z-50 min-h-screen bg-[var(--bg)] text-[var(--ink)] md:hidden">
          <div className="container-shell flex h-16 items-center justify-between">
            <BrandMark tone="light" size="sm" />
            <button
              className="grid h-10 w-10 place-items-center border border-[var(--rule-2)] text-[var(--ink)]"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>
          <nav className="container-shell grid gap-5 py-12" aria-label="Mobile navigation">
            {headerLinks.map((item) =>
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={closeMenu}
                  className="border-b border-[var(--rule)] py-4 text-4xl font-semibold tracking-[-0.03em] text-[var(--ink)] transition hover:text-[var(--sun)]"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="border-b border-[var(--rule)] py-4 text-4xl font-semibold tracking-[-0.03em] text-[var(--ink)] transition hover:text-[var(--sun)]"
                >
                  {item.label}
                </Link>
              )
            )}
            <a
              href={siteConfig.links.mcpscanRepo}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex w-fit bg-[var(--ink)] px-6 py-3 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--bg)]"
            >
              View GitHub
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
