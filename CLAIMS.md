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
| 15 | "Quidquid id est, timeo Danaos et dona ferentis." — Virgil, Aeneid II.49 | catastrophe spine marginalia | Live fetch, thelatinlibrary.com/vergil/aen2.shtml (2026-08-07): exact line at Book 2 line 49, Laocoön's warning about the horse. | VERIFIED (agent, live fetch per CLAUDE.md v2) | 2026-08-07 |
| 16 | Therac-25, 1985–87: six massive overdoses, three fatal; software reused from earlier machines whose hardware interlocks masked its faults | catastrophe spine marginalia | Live fetch, en.wikipedia.org/wiki/Therac-25 (2026-08-07): "at least six incident overdoses of radiation between 1985 and 1987"; "in three cases, the injured patients later died as a result of the overdose"; "reused modules and code routines from the Therac-20"; "Previous models had hardware interlocks to prevent such faults, but the Therac-25 had removed them". Canonical source named there: Leveson & Turner, "An Investigation of the Therac-25 Accidents" (1993). | VERIFIED (agent, live fetch per CLAUDE.md v2) | 2026-08-07 |
| 17 | SCRAM "safety control rod axe man" presented as folklore: historians doubt it, the man who held the axe felt foolish | catastrophe spine marginalia | Live fetch, en.wikipedia.org/wiki/Scram (2026-08-07): NRC historian favours the slang origin; axe-man story framed as urban legend; Hilberry: "I don't believe I have ever felt quite as foolish as I did then... I did not get the SCRAM story until many years after the fact." Copy hedges per row 10: imagery only, etymology never asserted. | VERIFIED (agent, live fetch per CLAUDE.md v2) | 2026-08-07 |
| 18 | Meta description: "Local-first security instruments for AI agents. The first, mcpscan, reads what an MCP server exposes — tools, resources, prompts — before an agent connects." | site metadata | Same evidence as rows 12–13 (PyPI summary/description fetched 2026-08-07; local-first and pre-connection enumeration are the package's own published description). | VERIFIED (agent, live fetch per CLAUDE.md v2) | 2026-08-07 |
| 19 | "No forms, no analytics, no third-party scripts on this site." | contact page | Verified against the built output (2026-08-07): grep of .next chunks and rendered HTML finds zero analytics SDK references (segment.io/gtag/plausible/posthog/hotjar: 0 matches; the word "segment" appears only as Next router vocabulary) and zero external script src attributes. No form elements exist in any page source. Re-verify at launch. | VERIFIED (agent, build inspection per CLAUDE.md v2) | 2026-08-07 |

## Rules
- Version numbers, install commands, test counts and platform lists rot. Re-verify
  every row against live sources on launch day, not on the day it was written.
- If a claim cannot be verified, cut it. A shorter true page beats a longer impressive one.
- Never soften a false claim into a vague one. Remove it.
