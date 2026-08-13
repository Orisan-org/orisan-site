/**
 * Builds public/__ref.html: the standalone2 reference, rendered with the site's
 * own fonts so a visual diff compares layout rather than font availability.
 *
 * The reference inlines 42 Google Fonts @font-face rules pointing at
 * fonts.gstatic.com. This sandbox has no outbound network, so all 42 fail; and
 * because their unicode-ranges are narrower than a full-range face, they win CSS
 * font matching and then fall back to system type. Every text metric shifted:
 * "are acting." measured 556.89px in the reference against 628.88px on the site,
 * which reads as a fidelity defect and is not one.
 *
 * So: strip those 42, and substitute the site's self-hosted woff2 as data URIs.
 *
 * This file is a local test harness. It is not part of the site build.
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const SRC = process.argv[2];
const OUT = "public/__ref.html";
const MEDIA = ".next/static/media";

const FACES = [
  ["Inter", "normal", "100 900", /^83afe278.*\.woff2$/],
  ["JetBrains Mono", "normal", "100 800", /^70bc3e13.*\.woff2$/],
  ["Instrument Serif", "italic", "400", /^7ebf22b5.*\.woff2$/],
];

let html = readFileSync(SRC, "utf8");

const before = (html.match(/@font-face/g) || []).length;
html = html.replace(/@font-face\s*\{[^}]*\}/g, "");
const after = (html.match(/@font-face/g) || []).length;

const files = readdirSync(MEDIA);
const rules = FACES.map(([fam, style, weight, re]) => {
  const f = files.find((x) => re.test(x));
  if (!f) throw new Error(`no woff2 matching ${re} in ${MEDIA}`);
  const b64 = readFileSync(join(MEDIA, f)).toString("base64");
  return `@font-face{font-family:'${fam}';font-style:${style};font-weight:${weight};`
       + `font-display:block;src:url(data:font/woff2;base64,${b64}) format('woff2')}`;
});

html = html.replace("<head>", `<head>\n<style id="borrowed-fonts">\n${rules.join("\n")}\n</style>`);
writeFileSync(OUT, html);
console.log(`  stripped ${before - after} google @font-face, embedded ${rules.length} local faces`);
console.log(`  ${OUT} ${Math.round(html.length / 1024)} KB`);
