import { test, expect } from "@playwright/test";

/**
 * VISUAL REGRESSION — the gate prose review cannot provide.
 *
 * Baselines in tests/__screenshots__/ are APPROVED ARTEFACTS.
 * Agents must never regenerate them to make a test pass. If a diff is intended,
 * state what changed and why, and let a human run `npm run baseline`.
 *
 * This catches the failure mode where every individual change is defensible and
 * the cumulative result no longer looks like the brand.
 */

const VIEWPORTS = [
  { name: "mobile",  width: 390,  height: 844 },
  { name: "tablet",  width: 768,  height: 1024 },
  { name: "desktop", width: 1440, height: 900 },
];

// Per-page screenshot tolerance. Content pages reflow whenever copy changes, so
// a small ratio there is noise. /components is the design-system reference page,
// where the whole point is that a component looks the way it is supposed to: an
// entire grade stamp was removed once and passed under the 1% tolerance.
// Measured, not estimated: that removal changes 1,137 of 3,114,720 pixels, a
// ratio of 0.000365. 0.001 was tried first and still passed. 0.0001 catches it
// with roughly 3x headroom for antialiasing noise.
const PAGES = [
  { path: "/", maxDiffPixelRatio: 0.01 },
  { path: "/components", maxDiffPixelRatio: 0.0001 },
  { path: "/contact", maxDiffPixelRatio: 0.01 },
  { path: "/no-such-page-404-proof", maxDiffPixelRatio: 0.01 },
]; // add routes as slices land; the last exercises not-found

for (const { path: page_, maxDiffPixelRatio } of PAGES) {
  for (const vp of VIEWPORTS) {
    test(`${page_} @ ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.emulateMedia({ reducedMotion: "reduce" }); // deterministic: no animation mid-shot
      await page.goto(page_);
      await page.waitForLoadState("networkidle");
      await page.evaluate(() => document.fonts.ready);
      await expect(page).toHaveScreenshot(
        `${page_.replace(/\//g, "_") || "_root"}-${vp.name}.png`,
        { fullPage: true, maxDiffPixelRatio, animations: "disabled" }
      );
    });
  }
}

/** Design-system assertions. These fail loudly on drift the eye forgives. */
// The three families the design system declares (tailwind.config.ts `fontFamily`).
// Asserted positively: a page may compute these and nothing else.
//
// This replaced a denylist of forbidden family names on 2026-08-10. That list
// checked for `inter|helvetica|arial|system-ui|-apple-system`, which meant a stack
// of `"Some Grotesk", sans-serif` passed while being entirely sans-serif. A list of
// what is forbidden can only ever be as complete as its author's imagination. A list
// of what is permitted cannot have a hole in it.
const PERMITTED_FONT_FAMILIES = ["Schibsted Grotesk", "JetBrains Mono", "Fraunces"];

// Every value the radius scale can emit: none, sm, panel, feature, full.
// Same reasoning. The previous check tested `> 2 && < 9999`, which permitted any
// value in between by accident rather than by decision.
const PERMITTED_RADII = ["0px", "2px", "20px", "32px", "9999px"];

test("only permitted fonts, radii and visual properties compute anywhere on the page", async ({
  page,
}) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  const violations = await page.evaluate(
    ({ families, radii }) => {
      /** The family a stack actually asks for: the first entry, unquoted. */
      const declaredFamily = (stack: string) =>
        (stack.split(",")[0] ?? "").trim().replace(/^["']|["']$/g, "");

      /** Every length in a radius, across shorthand corners and the elliptical `/` form. */
      const radiusParts = (value: string) =>
        value
          .split("/")
          .flatMap((side) => side.trim().split(/\s+/))
          .filter(Boolean);

      const bad: string[] = [];
      for (const el of Array.from(document.querySelectorAll("*"))) {
        const s = getComputedStyle(el);
        // Elements that never get a box — <source>, <track> — return an entirely
        // empty CSSStyleDeclaration, so every property reads "" and every check
        // below fires on a value that does not exist. Skipping them polices
        // nothing less: display:none elements still resolve fully ("none", not
        // "") and stay checked.
        if (!s.display) continue;
        const tag =
          el.tagName.toLowerCase() + (el.className ? "." + String(el.className).slice(0, 40) : "");

        // Held bans. Neither is released by the design import.
        if (s.backgroundImage.includes("gradient")) bad.push(`gradient on ${tag}`);
        if (s.boxShadow !== "none") bad.push(`box-shadow on ${tag}`);
        if (s.backdropFilter && s.backdropFilter !== "none") {
          bad.push(`backdrop-filter on ${tag}`);
        }

        // Released bans, now allowlists.
        const family = declaredFamily(s.fontFamily);
        if (family && !families.includes(family)) {
          bad.push(`font-family "${family}" on ${tag} is not a declared family`);
        }
        for (const part of radiusParts(s.borderRadius)) {
          if (!radii.includes(part)) {
            bad.push(`border-radius ${s.borderRadius} on ${tag} is not a token radius`);
            break;
          }
        }
      }
      return Array.from(new Set(bad));
    },
    { families: PERMITTED_FONT_FAMILIES, radii: PERMITTED_RADII },
  );
  expect(violations, violations.join("\n")).toHaveLength(0);
});

test("body copy never exceeds the 62ch measure", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  const tooWide = await page.evaluate(() => {
    const out: string[] = [];
    for (const p of Array.from(document.querySelectorAll("p"))) {
      // Measure the real ch unit in this paragraph's font. The previous 0.5em
      // approximation undershot Newsreader's actual ch (0.566em), so the
      // system's own 62ch measure cap (~35em) tripped the 68-"char" limit
      // (34em approx). A 1ch probe is exact by definition; the 68 threshold
      // is unchanged.
      const probe = document.createElement("span");
      probe.style.position = "absolute";
      probe.style.width = "1ch";
      p.appendChild(probe);
      const ch = probe.getBoundingClientRect().width;
      probe.remove();
      if (p.getBoundingClientRect().width / ch > 68) out.push(p.textContent?.slice(0, 50) ?? "");
    }
    return out;
  });
  expect(tooWide, tooWide.join(" | ")).toHaveLength(0);
});

test("every image has a decided alt state", async ({ page }) => {
  await page.goto("/");
  const missing = await page.evaluate(() =>
    Array.from(document.querySelectorAll("img"))
      .filter((i) => i.getAttribute("alt") === null)
      .map((i) => i.getAttribute("src") ?? "unknown")
  );
  expect(missing, missing.join(", ")).toHaveLength(0);
});

test("the page is complete and correct with video disabled", async ({ page }) => {
  await page.route("**/*.{mp4,webm}", (r) => r.abort());
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.waitForLoadState("domcontentloaded");
  await expect(page).toHaveScreenshot("root-desktop-novideo.png", {
    fullPage: true,
    maxDiffPixelRatio: 0.01,
  });
});
