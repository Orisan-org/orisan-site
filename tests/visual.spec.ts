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
  { path: "/product", maxDiffPixelRatio: 0.01 },
  { path: "/gap", maxDiffPixelRatio: 0.01 },
  { path: "/vision", maxDiffPixelRatio: 0.01 },
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
// Reversal of B1 ("Inter is out") and of the 2026-08-12 italic ruling. Both are
// founder taste calls for the standalone2 design, named in the token PR.
const PERMITTED_FONT_FAMILIES = ["Inter", "JetBrains Mono", "Instrument Serif"];

// Every value the radius scale can emit: none, sm, ladder, panel, full.
// Same reasoning. The previous check tested `> 2 && < 9999`, which permitted any
// value in between by accident rather than by decision.
// Reversal of B3 ("every radius collapses to 20px"). The design uses 2 / 12 / 14
// and a 999px pill; 9999px renders identically to 999px so `full` is unchanged.
const PERMITTED_RADII = ["0px", "2px", "12px", "14px", "9999px"];

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

/**
 * Lighthouse did not catch this: with no input on the page there is no element to
 * audit, so a placeholder colour can sit at 2.21:1 in the stylesheet indefinitely
 * and surface the day someone adds a form. Assert the rule itself, not a rendering
 * of it.
 */
test("the placeholder colour is a token and clears the 7:1 body bar", async ({ page }) => {
  await page.goto("/");
  const result = await page.evaluate(() => {
    const probe = document.createElement("input");
    probe.placeholder = "probe";
    probe.style.cssText = "position:absolute;visibility:hidden";
    document.body.appendChild(probe);
    const colour = getComputedStyle(probe, "::placeholder").color;
    const paper = getComputedStyle(document.body).backgroundColor;
    probe.remove();
    const rgb = (v: string) => (v.match(/\d+(\.\d+)?/g) ?? []).slice(0, 3).map(Number);
    const lum = ([r, g, b]: number[]) => {
      const f = (c: number) => {
        const x = c / 255;
        return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
      };
      return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
    };
    const a = lum(rgb(colour));
    const b = lum(rgb(paper));
    const ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
    return { colour, paper, ratio: Math.round(ratio * 100) / 100 };
  });
  expect(
    result.ratio,
    `placeholder ${result.colour} on ${result.paper} is ${result.ratio}:1`,
  ).toBeGreaterThanOrEqual(7);
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

/**
 * SVG text paints from `fill`, not `color`. A contrast sweep that reads `color`
 * silently skips every figure on the page and reports zero failures over a region
 * it never measured — which is exactly what mine did.
 *
 * Under that blind spot a real bug shipped: the figure's shared class strings
 * carried `fill-tx-label` / `fill-tx-3d`, and `fill-*` is a single utility group,
 * so the shared fill beat the per-element `fill-holding-lit` on CSS source order
 * regardless of the order they appeared in the class string. ALLOWED, HELD and
 * STOPPED all painted #C8C8C4 instead of green, ochre and red — the figure's whole
 * argument, silently erased, with no visual test able to see it.
 *
 * So this asserts the painted fill by identity, not just its contrast. A ratio
 * check alone would have passed the bug: #C8C8C4 on ink is 11.42:1.
 */
const VERDICTS = [
  { label: "ALLOWED", token: "holding.lit", fill: "rgb(143, 174, 131)" },
  { label: "HELD", token: "suspicion.lit", fill: "rgb(201, 165, 102)" },
  { label: "STOPPED", token: "harm.lit / stopped-lit", fill: "rgb(238, 144, 128)" },
];

test("figure verdicts paint their semantic fill, not the shared label fill", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);

  const painted = await page.evaluate(() =>
    Array.from(document.querySelectorAll("svg text")).map((t) => ({
      text: (t.textContent ?? "").trim(),
      fill: getComputedStyle(t).fill,
    })),
  );

  for (const v of VERDICTS) {
    const found = painted.find((p) => p.text === v.label);
    expect(found, `no <text> reading "${v.label}" in any figure`).toBeTruthy();
    expect(
      found!.fill,
      `${v.label} must paint ${v.token} ${v.fill}, got ${found!.fill}. ` +
        `A shared fill-* in the class string beats a per-element one on source order.`,
    ).toBe(v.fill);
  }
});

/**
 * The same blind spot, closed as a rule rather than per element: every figure
 * label clears AA against its ground, measured on `fill` with any inherited group
 * opacity folded in.
 *
 * The outcome groups cycle 0.18 -> 1 -> 0.18 on a shared 9s loop, which is the
 * figure's argument — one verdict reads at a time. They are held at their lit
 * keyframe here, because that is the state the design intends to be read, and
 * `prefers-reduced-motion` already pins them to opacity 1.
 */
test("every figure label clears AA on the fill it actually paints", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({
    content: "g[class*=animate-out]{animation:none !important;opacity:1 !important}",
  });

  const failures = await page.evaluate(() => {
    const rgb = (v: string) => (v.match(/\d+(\.\d+)?/g) ?? []).slice(0, 3).map(Number);
    const lum = ([r, g, b]: number[]) => {
      const f = (c: number) => {
        const x = c / 255;
        return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
      };
      return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
    };
    const groundOf = (el: Element) => {
      let n: Element | null = el;
      while (n) {
        const bg = getComputedStyle(n).backgroundColor;
        if (bg && !/rgba\(0, 0, 0, 0\)|transparent/.test(bg)) return bg;
        n = n.parentElement;
      }
      return "rgb(255, 255, 255)";
    };
    const out: string[] = [];
    for (const t of Array.from(document.querySelectorAll("svg text"))) {
      let opacity = 1;
      let n: Element | null = t;
      while (n && n.tagName !== "BODY") {
        opacity *= parseFloat(getComputedStyle(n).opacity || "1");
        n = n.parentElement;
      }
      // An SVG shape is not a CSS background: groundOf walks straight past a filled
      // disc to the section's paper, so white-on-black reads as white-on-white.
      // Text on a painted shape declares its ground beside the fill that provides it.
      const declared = t.getAttribute("data-ground");
      const ground = declared ?? groundOf(t);
      const fg = rgb(getComputedStyle(t).fill);
      const bg = rgb(ground);
      const composited = fg.map((c, i) => c * opacity + bg[i] * (1 - opacity));
      const a = lum(composited);
      const b = lum(bg);
      const ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
      if (ratio < 4.5) {
        out.push(
          `"${(t.textContent ?? "").trim()}" ${getComputedStyle(t).fill} on ${ground} ` +
            `= ${Math.round(ratio * 100) / 100}:1`,
        );
      }
    }
    return out;
  });

  expect(failures, `figure labels below AA:\n  ${failures.join("\n  ")}`).toEqual([]);
});
