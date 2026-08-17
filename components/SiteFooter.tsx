import Link from "next/link";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/product", label: "Product" },
  { href: "/gap", label: "The gap" },
  { href: "/vision", label: "Vision" },
  // Contact was the one route missing from this list, and the omission was load
  // bearing rather than cosmetic: SiteHeader's links are `hidden sm:block`, so below
  // 640px the header is a logo and nothing else, and this footer is the only
  // navigation a phone renders. Without this line nothing anywhere on the site
  // linked to /contact on a phone — it linked out to everything and nothing linked
  // in. Completing the list, not designing anything.
  { href: "/contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-grey-3">
      <div className="mx-auto flex max-w-wrap flex-wrap items-baseline justify-between gap-6 px-8 pb-13 pt-8">
        <div className="flex items-center gap-2">
          <span className="text-base font-semibold">Orisan</span>
          <span aria-hidden="true" className="size-1 rounded-full bg-orisan-mark" />
          <span className="font-mono text-micro uppercase tracking-meta text-grey-1">
            Local-first security instruments for AI agents
          </span>
        </div>
        <div className="flex flex-wrap items-baseline gap-6 font-mono text-micro uppercase tracking-meta text-grey-1">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-grey-1 no-underline">
              {l.label}
            </Link>
          ))}
          <a href="mailto:team@orisan.org" className="text-grey-1 no-underline">
            team@orisan.org
          </a>
          <span>&copy; 2026</span>
        </div>
      </div>
    </footer>
  );
}
