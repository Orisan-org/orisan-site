// playwright.config.ts
import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  snapshotDir: "./tests/__screenshots__",
  use: { baseURL: "http://localhost:3000" },
  // Production server, deliberately: the dev server injects tooling into the
  // page (dev-tools badge, nextjs-portal element) that contaminates both the
  // screenshots and the computed-style assertions. Gates measure what ships.
  // `npm run gates` builds before testing, so the build always exists here.
  webServer: { command: "npm run start", url: "http://localhost:3000", reuseExistingServer: true },
  // Screenshot assertions are Ubuntu-only. Baselines are committed as *-linux.png
  // and macOS does not render the same page the same way (measured: 8052px vs
  // 8012px at 768px), so off-linux Playwright looks for a *-darwin.png that does
  // not exist, FAILS, and writes one into the tracked snapshot directory. That
  // made `npm run gates` unpassable on the host CLAUDE.md tells an agent to run
  // it on, and polluted the repo every time it ran.
  //
  // This narrows nothing in CI: the runner is linux, so every baseline is still
  // compared there. Off-linux the comparison is skipped rather than run against a
  // baseline that cannot be right. scripts/ci-only.mjs names it in the local
  // output so a green local run is never read as a green visual gate.
  ignoreSnapshots: process.platform !== "linux",
  expect: { toHaveScreenshot: { maxDiffPixelRatio: 0.01 } },
});
