// playwright.config.ts
import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  snapshotDir: "./tests/__screenshots__",
  // A dedicated port, not 3000. Reuse is made structurally impossible rather than
  // detected: the suite never looks at 3000, so a hand-run `next start` there
  // cannot be picked up no matter what is listening.
  use: { baseURL: "http://localhost:3111" },
  // Production server, deliberately: the dev server injects tooling into the
  // page (dev-tools badge, nextjs-portal element) that contaminates both the
  // screenshots and the computed-style assertions. Gates measure what ships.
  // `npm run gates` builds before testing, so the build always exists here.
  // reuseExistingServer was `true`, and that made every green suspect: Playwright
  // silently adopted whichever `next start` was already on 3000, which during this
  // rebuild was routinely a build from a different branch. It surfaced as
  // gap.spec.ts failing 5 tests on a clean `launch` that passes 6/6 against its own
  // build. The harness was measuring the wrong subject, exactly as the font harness
  // was before it, and every conclusion downstream inherited the error.
  webServer: {
    command: "npm run start -- -p 3111",
    url: "http://localhost:3111",
    reuseExistingServer: false,
  },
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
