# CLAIMS.md

Every factual assertion that appears on orisan.org gets a row here before it ships.
No row, no claim on the page. This is the mechanism behind the honest-finish bar.

Statuses: `VERIFIED` (checked against a live source, with date) · `UNVERIFIED`
(do not put on the page) · `STALE` (was true, needs recheck before launch).

Agents may add rows with status `UNVERIFIED`. Only a human may set `VERIFIED`.

| # | Claim as written on the page | Where it appears | Source | Status | Checked |
|---|---|---|---|---|---|
| 1 | Package installs as `uvx orisan-mcpscan` | mcpscan section, install block | pypi.org/project/orisan-mcpscan | VERIFIED | 2026-08-04 |
| 2 | Published version is 0.1.0, alpha | mcpscan section | PyPI release page | STALE — 0.1.1 pending | 2026-08-04 |
| 3 | Scanner is deterministic, no LLM in scanner logic | mcpscan section | mcpscan invariants, cold verification | VERIFIED | see Notion |
| 4 | No findings are suppressed; verdicts adjust severity, never hide | mcpscan section | 1:1 adjudication map | VERIFIED | see Notion |
| 5 | `payload_stored=false` on every finding; no telemetry by default | privacy line | Observed in live output | VERIFIED | 2026-08-04 |
| 6 | Runs locally; uploads nothing | privacy line | README + observed behaviour | VERIFIED | 2026-08-04 |
| 7 | Coverage maps to OWASP MCP01/02/03/05/07/09/10 | checks table | `mcpscan list-checks` | VERIFIED | 2026-08-04 |
| 8 | Streamable HTTP is a tested remote transport | transports | **FALSE on 0.1.0 from a clean install.** Unpinned `mcp>=1.0.0` resolves to 2.0.0, which renamed the client entry point. Fixed in 0.1.1. | DO NOT SHIP until 0.1.1 | 2026-08-04 |
| 9 | Terminal output shown on the page | proof section | Must be a verbatim copy of a real run, with the command and date recorded here | UNVERIFIED | — |
| 10 | The reactor "safety control rod axe man" backronym | catastrophe spine marginalia | Disputed folklore. Use the imagery; do not assert the etymology as fact. | UNVERIFIED — do not assert | — |
| 11 | Test counts, supported Python versions | anywhere | CI matrix must actually test every version claimed | STALE | — |
| 12 | "mcpscan reads what a server exposes — tools, resources, prompts — and runs deterministic checks before an AI agent connects" | hero lede | Live fetch, pypi.org/pypi/orisan-mcpscan/json (2026-08-07): summary "an alpha, local-first security scanner for Model Context Protocol servers"; description "enumerates exposed tools/resources/prompts/metadata, runs deterministic checks, and emits terminal, JSON, or Markdown findings before an AI agent trusts that server". Cross-refs rows 3, 7. Deliberately omits transports (row 8). | VERIFIED (agent, live fetch per CLAUDE.md v2) | 2026-08-07 |
| 13 | "On your machine, uploading nothing" | hero lede | Rows 5 and 6, human-verified 2026-08-04: payload_stored=false observed in live output; runs locally, uploads nothing. | VERIFIED (via rows 5–6) | 2026-08-07 |
| 14 | Hero primary link: github.com/Orisan-org is Orisan's public GitHub organisation | hero link | Anonymous fetch 2026-08-07: org page loads publicly; public repo orisan-site ("Orisan website and Scout landing pages"). NOTE: PyPI 0.1.0 metadata links github.com/Orisan-org/mcpscan, which 404s anonymously — do not link product source anywhere until that repo is public; fix the URL in 0.1.1. | VERIFIED (agent, live fetch per CLAUDE.md v2) | 2026-08-07 |

## Rules
- Version numbers, install commands, test counts and platform lists rot. Re-verify
  every row against live sources on launch day, not on the day it was written.
- If a claim cannot be verified, cut it. A shorter true page beats a longer impressive one.
- Never soften a false claim into a vague one. Remove it.
