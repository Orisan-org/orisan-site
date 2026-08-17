import Link from "next/link";

/**
 * Two links, not three: the logo is the Home link, so listing Home as well spends
 * width on a destination the bar already offers.
 *
 * That matters because the width is the whole reason these used to be hidden below
 * 640px. Measured on the built site at 390: with Home listed, logo plus nav plus gap
 * is 320.6px against 326px available — it fits, with 5.4px to spare, which is not a
 * margin. Without it, 255.9px against 326px, 70.1px spare, one row. So dropping Home
 * is what makes an always-visible nav safe rather than lucky.
 */
const NAV = [
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
        <Link
          href="/"
          aria-current={current === "/" ? "page" : undefined}
          className="flex items-center gap-2 no-underline"
        >
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
              className={`text-sm font-medium no-underline ${
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
