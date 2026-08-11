import { expect, test } from "@playwright/test";
import config from "../tailwind.config";

/**
 * The type scale must be strictly monotonic at every width.
 *
 * `fontSize` replaces the Tailwind theme, so every step is a hand-tuned `clamp()`
 * that can be retuned in isolation. Two clamps with different slopes cross, and a
 * scale that inverts below some width is a defect no single-step review can catch:
 * dropping a heading one step makes it larger, which is what happened at 390px
 * after the `4xl` curve was steepened on its own.
 *
 * Read from `tailwind.config.ts` rather than from the compiled stylesheet, because
 * Tailwind only emits classes it finds during content scanning. Testing compiled
 * output would silently skip any step no page happens to use yet, and monotonicity
 * is a property of the scale itself, not of current usage. The clamps are resolved
 * by the browser at each viewport, so this asserts real computed values.
 */
const STEPS = ["micro", "label", "xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl"] as const;
const WIDTHS = [320, 390, 500, 612, 768, 1024, 1440, 1920];

function declaredSizes(): Record<string, string> {
  const fontSize = config.theme?.fontSize as Record<string, unknown> | undefined;
  if (!fontSize) throw new Error("tailwind.config.ts declares no fontSize scale");
  const out: Record<string, string> = {};
  for (const step of STEPS) {
    const entry = fontSize[step];
    const value = Array.isArray(entry) ? entry[0] : entry;
    if (typeof value !== "string") {
      throw new Error(`fontSize step "${step}" is missing from tailwind.config.ts`);
    }
    out[step] = value;
  }
  return out;
}

test("the type scale is strictly monotonic at every width", async ({ page }) => {
  const declared = declaredSizes();
  await page.goto("/");

  const table: Record<number, Record<string, number>> = {};
  const failures: string[] = [];

  for (const width of WIDTHS) {
    await page.setViewportSize({ width, height: 900 });
    const sizes = await page.evaluate((decl: Record<string, string>) => {
      const probe = document.createElement("div");
      probe.style.cssText = "position:absolute;visibility:hidden";
      document.body.appendChild(probe);
      const out: Record<string, number> = {};
      for (const [step, value] of Object.entries(decl)) {
        const span = document.createElement("span");
        span.style.fontSize = value;
        span.textContent = "A";
        probe.appendChild(span);
        out[step] = parseFloat(getComputedStyle(span).fontSize);
      }
      probe.remove();
      return out;
    }, declared);

    table[width] = sizes;
    for (let i = 0; i < STEPS.length - 1; i++) {
      const lower = STEPS[i];
      const upper = STEPS[i + 1];
      if (!(sizes[upper] > sizes[lower])) {
        failures.push(
          `${width}px: ${upper} (${sizes[upper].toFixed(2)}px) is not larger than ` +
            `${lower} (${sizes[lower].toFixed(2)}px)`,
        );
      }
    }
  }

  console.log(
    "TYPE SCALE\n" +
      [
        ["width", ...STEPS].join("  "),
        ...WIDTHS.map((w) => [String(w), ...STEPS.map((s) => table[w][s].toFixed(2))].join("  ")),
      ].join("\n"),
  );

  expect(failures, "\n" + failures.join("\n")).toHaveLength(0);
});
