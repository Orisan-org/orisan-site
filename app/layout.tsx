import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// Self-hosted by next/font. The design files load these from Google's CDN; the
// site does not make third-party requests (CLAIMS.md row 19).
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// LOCAL, NOT next/font/google, and the reason is alignment.
//
// The Google `latin` subset excludes U+2500-257F, so every box-drawing character
// in the section 5 transcript fell out of the family to a fallback. Measured in
// the built page: X 7.680px, the heavy glyphs 7.706px, but │ 10.766px and ─ └ ┘ ┴
// 12.204px. Three advances in one table means the rules do not meet the verticals,
// and the rendered table was visibly broken.
//
// One family or the alignment is luck: a second face scoped to the box range only
// works if it is metrically identical, which is the failure above. So the range is
// brought into JetBrains Mono itself. In the upstream variable font all 13 glyphs
// carry advance 600, exactly as `X` does, so the table aligns by construction.
//
// The coverage set is DERIVED, not guessed: every distinct codepoint in
// evidence/2026-08-16-mcpscan-real-run/run.txt (13 box-drawing, nothing else
// non-Latin) plus the non-ASCII the rest of the site uses in mono — U+00B7, U+2014,
// U+2192, U+20AC. Adding the 13 costs 104 bytes over the same subset without them.
//
// `tests/visual.spec.ts` asserts every glyph in the transcript renders at one
// advance width. That is the general form of this bug: uniform advance means one
// family and no fallback, and it fails the moment a character escapes this subset.
const jetbrains = localFont({
  src: "./fonts/JetBrainsMono-subset.woff2",
  weight: "100 800",
  style: "normal",
  variable: "--font-jetbrains",
  display: "swap",
});

// Italic only — the design uses this face for emphasis inside display headings
// and nowhere else, so the roman cut is never requested.
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://orisan.org"),
  title: {
    default: "Orisan",
    template: "%s — Orisan",
  },
  description:
    "Local-first security instruments for AI agents. The first, mcpscan, reads what an MCP server exposes — tools, resources, prompts — before an agent connects.",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrains.variable} ${instrument.variable}`}
    >
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
