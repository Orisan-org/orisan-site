import { expect, test } from "@playwright/test";
import {
  ACCEPTED_THIN,
  LARGE_BOLD_PX,
  LARGE_BOLD_WEIGHT,
  LARGE_PX,
  LARGE_TEXT_FLOOR,
  RECORDED,
} from "./contrast-matrix";

const BAR = 7;

test("every text pair is recorded, unchanged, and clears its bar", async ({ page }) => {
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
    // Smallest and lightest occurrence per pair: a basis must hold for EVERY
    // occurrence, so one small instance must not be excused by a large one.
    const m = new Map<string, { minPx: number; minW: number; sample: string }>();
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
      const px = parseFloat(cs.fontSize);
      const w = parseInt(cs.fontWeight) || 400;
      const cur = m.get(key);
      if (!cur) m.set(key, { minPx: px, minW: w, sample: (e.textContent ?? "").trim().slice(0, 30) });
      else {
        cur.minPx = Math.min(cur.minPx, px);
        cur.minW = Math.min(cur.minW, w);
      }
    });
    return Array.from(m.entries()).map(([key, v]) => ({ key, ...v }));
  });

  // Positive control: a page that rendered nothing, or a walk that matched nothing,
  // would report zero problems and read as a pass.
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
  const drifted: string[] = [];
  const unjustified: string[] = [];

  for (const f of found) {
    const [fg, bg] = f.key.split("|");
    const r = ratio(fg, bg);

    if (!(f.key in RECORDED)) {
      unrecorded.push(`${f.key}  ${r}:1  "${f.sample}"`);
      continue;
    }
    if (RECORDED[f.key] !== r) {
      drifted.push(`${f.key}  recorded ${RECORDED[f.key]}:1, measured ${r}:1  "${f.sample}"`);
    }
    if (r >= BAR) continue;

    const entry = ACCEPTED_THIN[f.key];
    if (!entry) {
      unjustified.push(`${f.key}  ${r}:1  "${f.sample}"  — below ${BAR}:1 with no basis`);
      continue;
    }
    // Verify the basis rather than trust it.
    if (entry.basis === "large-text") {
      const isLarge =
        f.minPx >= LARGE_PX || (f.minPx >= LARGE_BOLD_PX && f.minW >= LARGE_BOLD_WEIGHT);
      if (!isLarge) {
        unjustified.push(
          `${f.key}  claims basis "large-text" but its smallest occurrence is ` +
            `${f.minPx}px at weight ${f.minW}  "${f.sample}"`,
        );
      } else if (r < LARGE_TEXT_FLOOR) {
        unjustified.push(
          `${f.key}  ${r}:1 is below the AAA large-text floor of ${LARGE_TEXT_FLOOR}:1  "${f.sample}"`,
        );
      }
    }
  }

  expect(
    unrecorded,
    "text colours on grounds absent from RECORDED. This is the event behind every " +
      "contrast correction so far: a token on a ground nobody measured. Add them with " +
      "their ratios, or fix them.",
  ).toEqual([]);

  expect(
    drifted,
    "a recorded pair's ratio changed. Something moved under a value that was already " +
      "accepted — re-decide it rather than updating the number.",
  ).toEqual([]);

  expect(
    unjustified,
    `pairs below ${BAR}:1 with no valid basis. Raise the value, or accept it with a ` +
      "basis the check can verify.",
  ).toEqual([]);
});
