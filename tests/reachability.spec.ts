import { readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "@playwright/test";

/**
 * CAN A VISITOR GET THERE.
 *
 * Every other check in this suite asks what a page SAYS. None asked whether the site
 * CONNECTS, and the gap was not theoretical: `/` shipped with a navigation of five
 * in-page anchors and exactly one outbound route link — a "See every check →" CTA
 * six viewports down, at 48% of an 11,235px page. The other four pages carried a
 * different navigation entirely, a real route nav listing all five. Two navigation
 * systems on one site, and the front door was the one that did not link out.
 *
 * The defect class is the terminal pane's: reproducing the reference faithfully meant
 * reproducing a navigation built for a document that was one page long. Fidelity to
 * the wrong thing.
 *
 * WHY IT ASSERTS DIRECT LINKS, NOT TRANSITIVE REACHABILITY. Every route was already
 * reachable from every other in the graph-theoretic sense, because `/` reaches
 * `/product` and `/product` links everywhere. A transitive assertion would have
 * passed on the broken site. What is actually required of a navigation is that a
 * visitor can get from any page to any page WITHOUT having to discover a body-copy
 * CTA halfway down an unrelated section, so the assertion is one click.
 */

/**
 * The routes are ENUMERATED FROM THE FILESYSTEM, not listed here. A list someone has
 * to remember to extend is the thing this test exists to replace: a new route that
 * nobody links to is exactly the failure, and a hand-maintained array would omit it
 * for the same reason the navigation did.
 */
function routesFromDisk(dir = "app", prefix = ""): string[] {
  const out: string[] = [];
  if (existsSync(join(dir, "page.tsx"))) out.push(prefix === "" ? "/" : prefix);
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    // route groups and private folders are not URL segments
    if (entry.name.startsWith("_") || entry.name.startsWith("(")) continue;
    out.push(...routesFromDisk(join(dir, entry.name), `${prefix}/${entry.name}`));
  }
  return out;
}

/**
 * The exception list is explicit, short and reasoned, rather than a warn tier nobody
 * reads. `/components` is a noindexed internal design reference; it is deliberately
 * unlinked and deliberately absent from the sitemap, and linking it would put an
 * internal page in front of a visitor.
 */
const NOT_PUBLIC = new Set(["/components"]);

const PUBLIC_ROUTES = routesFromDisk().filter((r) => !NOT_PUBLIC.has(r));

/**
 * MEASURED AT TWO WIDTHS, AND THE SECOND ONE IS THE POINT.
 *
 * The first version of this test read hrefs out of the DOM. It would have passed a
 * site whose entire navigation is `display: none`, which is very nearly the site it
 * was written against: SiteHeader's links are `hidden sm:block`, so below 640px the
 * header renders a logo and nothing else. A DOM-presence check reports on the markup
 * it was pointed at, not on what a visitor can click.
 *
 * So it asserts VISIBILITY, at a phone width as well as a desktop one.
 */
const WIDTHS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

for (const vp of WIDTHS) {
  test(`every public route links directly to every other public route @ ${vp.name}`, async ({ page }) => {
  // The check must be able to fail. A reachability assertion over zero or one route
  // passes by examining nothing.
  //
  // This guard first read `>= 5`, the route count at the time it was written, and it
  // fired the moment /gap and /vision were deleted. That was the guard working, but a
  // hardcoded count is the wrong instrument: it asserts today's route set rather than
  // that the enumeration ran. Two properties instead, neither of which moves when a
  // route is added or removed — there must be a pair to check, and Home must be in it,
  // because an enumeration that misses `/` is broken however many routes it returns.
  expect(
    PUBLIC_ROUTES.length,
    `route enumeration found ${PUBLIC_ROUTES.length} route(s); reachability needs a pair`,
  ).toBeGreaterThanOrEqual(2);
  expect(PUBLIC_ROUTES, "route enumeration did not find Home").toContain("/");

  const outbound = new Map<string, Set<string>>();

  await page.setViewportSize({ width: vp.width, height: vp.height });

  for (const route of PUBLIC_ROUTES) {
    await page.goto(route);
    await page.waitForLoadState("networkidle");

    // Only links a visitor can actually click. A link that is present in the markup
    // but has no box is not navigation.
    const hrefs = await page.evaluate(() =>
      Array.from(document.querySelectorAll("a[href]"))
        .filter((a) => {
          const r = a.getBoundingClientRect();
          return r.width > 0 && r.height > 0;
        })
        .map((a) => a.getAttribute("href") ?? ""),
    );

    // Same-document anchors are not navigation between routes. "#contact" is a
    // section of the current page; "/contact" is a different page. Conflating them is
    // precisely how `/` looked navigable while linking nowhere.
    const targets = new Set(
      hrefs
        .filter((h) => h.startsWith("/") && !h.startsWith("//"))
        .map((h) => h.split("#")[0] || "/")
        .filter((h) => PUBLIC_ROUTES.includes(h) && h !== route),
    );
    outbound.set(route, targets);
  }

  const missing: string[] = [];
  for (const from of PUBLIC_ROUTES) {
    for (const to of PUBLIC_ROUTES) {
      if (from === to) continue;
      if (!outbound.get(from)!.has(to)) missing.push(`${from}  ->  ${to}`);
    }
  }

  expect(
    missing,
    `a visitor cannot reach these in one click:\n  ${missing.join("\n  ")}\n\n` +
      `outbound route links per page:\n  ` +
      PUBLIC_ROUTES.map(
        (r) => `${r}: ${Array.from(outbound.get(r)!).sort().join(", ") || "NONE"}`,
      ).join("\n  "),
    ).toEqual([]);
  });
}

/**
 * The sitemap is the other half of reachability: the half that applies to a visitor
 * who never sees the navigation because a search engine brought them straight in.
 * Found alongside the navigation defect — the sitemap listed `/` and `/contact` and
 * omitted `/product`, `/gap` and `/vision`.
 */
test("the sitemap lists every public route", async ({ page }) => {
  const res = await page.goto("/sitemap.xml");
  expect(res?.status(), "sitemap.xml must be served").toBe(200);
  const xml = await page.content();

  const listed = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g)).map((m) =>
    new URL(m[1]).pathname.replace(/(.)\/$/, "$1"),
  );
  expect(
    listed.length,
    "sitemap parsed to zero entries — the assertion below would pass on nothing",
  ).toBeGreaterThan(0);

  const absent = PUBLIC_ROUTES.filter((r) => !listed.includes(r));
  expect(
    absent,
    `public routes missing from the sitemap: ${absent.join(", ")}\n` +
      `  sitemap lists: ${listed.join(", ")}`,
  ).toEqual([]);

  const extra = listed.filter((r) => !PUBLIC_ROUTES.includes(r));
  expect(extra, `sitemap lists routes that are not public: ${extra.join(", ")}`).toEqual([]);
});
