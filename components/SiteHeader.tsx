import Link from "next/link";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/product", label: "Product" },
  { href: "/contact", label: "Contact" },
];

/**
 * Sticky header. The design specifies a translucent bar over `backdrop-filter:
 * blur(14px)`; backdrop blur is held banned, so this is solid `paper` with a
 * hairline. At rest the two are indistinguishable, and the text keeps its
 * contrast over every section it scrolls past instead of inheriting whatever is
 * underneath it.
 */
export function SiteHeader({ current }: { current: string }) {
  return (
    <header className="sticky top-0 z-50 border-b border-grey-3 bg-paper">
      <div className="mx-auto flex h-13 max-w-wrap items-center justify-between gap-8 px-8">
        <Link href="/" className="flex items-center gap-2 no-underline">
          <span aria-hidden="true" className="block size-5">
            <svg viewBox="0 0 512 512" className="size-full">
              <mask id="gatecut-header">
                <rect width="512" height="512" fill="#000" />
                <circle cx="256" cy="256" r="176" fill="#fff" />
                <circle cx="256" cy="256" r="106" fill="#000" />
                <path d="M338 76 L438 125 L352 215 L306 174 Z" fill="#000" />
              </mask>
              <circle cx="256" cy="256" r="176" className="fill-ink" mask="url(#gatecut-header)" />
            </svg>
          </span>
          <span className="text-lg font-semibold tracking-tight">Orisan</span>
          <span aria-hidden="true" className="size-1 rounded-full bg-orisan-mark" />
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-6">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={current === item.href ? "page" : undefined}
              className={`hidden text-sm font-medium no-underline sm:block ${
                current === item.href ? "text-ink" : "text-grey-1"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
