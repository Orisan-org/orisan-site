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
  expect: { toHaveScreenshot: { maxDiffPixelRatio: 0.01 } },
});
