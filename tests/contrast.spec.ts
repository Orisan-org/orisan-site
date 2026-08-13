import { expect, test } from "@playwright/test";
import { ACCEPTED_THIN, RECORDED } from "./contrast-matrix";

const BAR = 7;

test("every text pair on the page is recorded and clears the bar", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1200 });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1500);

  const found = await page.evaluate(() => {
    const num = (s: string) => (s.match(/\d+(\.\d+)?/g) ?? []).slice(0, 3).map(Number);
    const hex = (s: string) =>
      "#" + num(s).map((v) => Math.round(v).toString(16).padStart(2, "0")).join("").toLowerCase();
    const ground = (e: Element) => {
      let n: Element | null = e;
      while (n) {
        const bg = getComputedStyle(n).backgroundColor;
        if (bg && !/rgba\(0, 0, 0, 0\)|transparent/.test(bg)) return bg;
        n = n.parentElement;
      }
      return "rgb(255,255,255)";
    };
    const out = new Map<string, string>();
    document.querySelectorAll("*").forEach((e) => {
      if (!Array.from(e.childNodes).some((n) => n.nodeType === 3 && (n.textContent ?? "").trim())) return;
      const cs = getComputedStyle(e);
      if (cs.visibility === "hidden" || cs.display === "none") return;
      const isSvg = e.namespaceURI === "http://www.w3.org/2000/svg";
      if (isSvg && e.tagName.toLowerCase() !== "text") return;
      // SVG text paints from `fill`; reading `color` skips every figure on the page.
      const paint = isSvg ? cs.fill : cs.color;
      if (!paint || /none/.test(paint)) return;
      const key = hex(paint) + "|" + hex(ground(e));
      if (!out.has(key)) out.set(key, (e.textContent ?? "").trim().slice(0, 30));
    });
    return Array.from(out.entries());
  });

  // Positive control: a page that rendered nothing, or a walk that matched nothing,
  // would report zero unrecorded pairs and read as a pass.
  expect(found.length, "no text pairs found at all — this check proves nothing").toBeGreaterThan(5);

  const lum = (h: string) =>
    [1, 3, 5]
      .map((i) => parseInt(h.slice(i, i + 2), 16) / 255)
      .map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)))
      .reduce((a, c, i) => a + [0.2126, 0.7152, 0.0722][i] * c, 0);
  const ratio = (fg: string, bg: string) => {
    const a = lum(fg);
    const b = lum(bg);
    return Math.round(((Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)) * 100) / 100;
  };

  const unrecorded: string[] = [];
  const thin: string[] = [];
  for (const [key, sample] of found) {
    const [fg, bg] = key.split("|");
    const r = ratio(fg, bg);
    if (!RECORDED.includes(key)) unrecorded.push(`${key}  ${r}:1  "${sample}"`);
    if (r < BAR && !(key in ACCEPTED_THIN)) thin.push(`${key}  ${r}:1  "${sample}"`);
  }

  expect(
    unrecorded,
    "text colours landing on grounds that are not in the recorded matrix. " +
      "This is the event that produced every contrast correction so far: a token " +
      "on a ground nobody measured. Add them to RECORDED with their ratios, or fix them.",
  ).toEqual([]);

  expect(
    thin,
    `pairs below ${BAR}:1 that are not in ACCEPTED_THIN. Raise the value, or accept ` +
      "it explicitly with the reason it is tolerable.",
  ).toEqual([]);
});
