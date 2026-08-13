/**
 * Builds public/__ref.html: the standalone2 reference, rendered with the site's
 * own fonts so a visual diff compares layout rather than font availability.
 *
 * The reference inlines 42 Google Fonts @font-face rules pointing at
 * fonts.gstatic.com. This sandbox has no outbound network, so all 42 fail; and
 * because their unicode-ranges are narrower than a full-range face, they still
 * win CSS font matching and the page falls back to system type. Every text
 * metric shifted: "are acting." measured 556.89px against the site's 628.88px.
 *
 * So: strip those 42, and substitute the site's own faces.
 *
 * Every subset is carried over, not just the latin one. With a single latin face
 * the reference had no U+2192 and rendered a fallback arrow 7.56px wide where the
 * site rendered the real JetBrains glyph at 14.94px — which reads as an 8px
 * fidelity defect and is not one. The page uses arrows, bullets, em dashes and a
 * euro sign, so the subsets have to be complete for the diff to mean anything.
 *
 * This file is a local test harness. It is not part of the site build.
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const SRC = process.argv[2];
const OUT = "public/__ref.html";
const CHUNKS = ".next/static/chunks";

const cssFile = readdirSync(CHUNKS).find((f) => f.endsWith(".css"));
if (!cssFile) throw new Error(`no built stylesheet in ${CHUNKS}`);
const siteCss = readFileSync(join(CHUNKS, cssFile), "utf8");

const faces = siteCss.match(/@font-face\{[^}]*\}/g) ?? [];
const withSrc = faces.filter((f) => f.includes("src:url("));
if (!withSrc.length) throw new Error("no @font-face with a src in the site stylesheet");
const rules = withSrc.map((f) => f.replace(/url\(\.\.\/media\//g, "url(/_next/static/media/"));

let html = readFileSync(SRC, "utf8");
const before = (html.match(/@font-face/g) || []).length;
html = html.replace(/@font-face\s*\{[^}]*\}/g, "");
const after = (html.match(/@font-face/g) || []).length;

html = html.replace("<head>", `<head>\n<style id="borrowed-fonts">\n${rules.join("\n")}\n</style>`);
writeFileSync(OUT, html);
console.log(`  stripped ${before - after} google @font-face, carried ${rules.length} site faces`);
