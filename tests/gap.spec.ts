import { expect, test } from "@playwright/test";

/**
 * The gap page recomputes verdicts with a port of mcpscan 0.1.1's adjudication.
 * A port drifts. Every expectation below was produced by running the published
 * 0.1.1 wheel from PyPI against the real reference server, so this asserts the
 * page still agrees with the product rather than with itself.
 *
 * Ground truth, captured 2026-08-12:
 *   --purpose-category filesystem   -> filesystem (flag)        grade B  info/expected_by_purpose
 *   default invocation              -> filesystem (invocation)  grade B  info/expected_by_purpose
 *   scan-config                     -> filesystem (config)      grade D  high/expected_unconfirmed
 *   opaque command, server name     -> filesystem (server_info) grade D  high/expected_unconfirmed
 *   --purpose "weather server"      -> unknown (flag)           grade F  critical/undeclared + high/unexpected
 *   no signal at all                -> unknown (unknown)        grade D  high/unadjudicated
 */

const GROUND_TRUTH = [
  { purpose: "filesystem", source: "You, with a flag", grade: "B", exit: "0", purposeLine: "filesystem (flag)", write: { sev: "INFO (was HIGH)", verdict: "expected_by_purpose" } },
  { purpose: "filesystem", source: "A config file", grade: "D", exit: "1", purposeLine: "filesystem (config)", write: { sev: "HIGH", verdict: "expected_unconfirmed" } },
  { purpose: "filesystem", source: "The server itself", grade: "D", exit: "1", purposeLine: "filesystem (server_info)", write: { sev: "HIGH", verdict: "expected_unconfirmed" } },
  { purpose: "weather", source: null, grade: "F", exit: "1", purposeLine: "unknown (flag)", write: { sev: "CRITICAL (was HIGH)", verdict: "undeclared" } },
  { purpose: "none", source: null, grade: "D", exit: "1", purposeLine: "unknown (unknown)", write: { sev: "HIGH", verdict: "unadjudicated" } },
];

for (const state of GROUND_TRUTH) {
  test(`gap widget matches mcpscan 0.1.1: ${state.purposeLine}`, async ({ page }) => {
    await page.goto("/gap");
    await page.getByRole("button", { name: state.purpose, exact: true }).click();
    if (state.source) await page.getByRole("button", { name: state.source }).click();

    await expect(page.getByTestId("gap-purpose")).toHaveText(state.purposeLine);
    await expect(page.getByTestId("gap-grade")).toHaveText(state.grade);
    await expect(page.getByTestId("gap-exit")).toHaveText(state.exit);
    await expect(page.getByTestId("sev-write_file")).toHaveText(state.write.sev);
    await expect(page.getByTestId("verdict-write_file")).toHaveText(state.write.verdict);
  });
}

test("the read path differs from the write path under a wrong purpose", async ({ page }) => {
  await page.goto("/gap");
  await page.getByRole("button", { name: "weather", exact: true }).click();
  // Reads are mentioned in the server's own text, so they hold. Writes are not.
  await expect(page.getByTestId("verdict-read_file")).toHaveText("unexpected");
  await expect(page.getByTestId("sev-read_file")).toHaveText("HIGH");
  await expect(page.getByTestId("verdict-write_file")).toHaveText("undeclared");
});
