# mcpscan real run — recording provenance

One run. Cold uv cache. The timing and the media are the same event: `/usr/bin/time -p`
wraps the invocation asciinema captured, so `real 6.33` is a line **inside** the
transcript, not a number computed beside it.

## Machine and date

| | |
|---|---|
| Date | 2026-08-16 |
| Machine | Apple M1 Pro (arm64), macOS 26.5.1 |
| Terminal | 120 x 34, real PTY, `TERM=xterm-256color` |
| Recorder | asciinema 3.2.1, cast v3 |

120 columns is not a presentation choice. The published wheel hardcodes
`Console(..., width=120)` at `mcpscan/reporters/terminal.py:14` and `:49`, so the
report table is always 120 columns and wraps on anything narrower.

## Command

    uvx orisan-mcpscan scan-config ./mcp.json --yes

The published README's headline one-liner, unchanged. `uvx` builds a throwaway
environment from PyPI; the local `mcpscan-work` tree was never on the path and was
not installed.

## Artifact identity, proved in the same run

- Step 1 of the transcript prints what PyPI publishes for `orisan-mcpscan` 0.1.1.
- Step 2 streams the bytes PyPI actually serves for that wheel through `shasum -a 256`.
  Published and re-derived agree: `1f23dcf2…faa8d8`.
- Step 4 shows the version `uvx` resolved from the environment step 3 built: `0.1.1`.

See `wheel-digest.txt` for the digests and for what they do and do not bind.

## Cache state

| Cache | State | Consequence |
|---|---|---|
| uv | **COLD** — `UV_CACHE_DIR` pointed at a fresh empty directory | The download is inside the measurement |
| npm | **WARM** | See the caveat below |

### The npm caveat — the number is a floor

`@modelcontextprotocol/server-puppeteer` is fetched by `npx -y`. It was already in
this machine's npm cache, so **the recorded time does not include that download**. A
first-timer on a cold machine also pays it. Whatever the wall clock says, it is a
floor, not a typical figure, and it must not be presented as "what it takes on a
fresh machine". Only the uv cache was cleared.

## Numbers

| | |
|---|---|
| Command wall clock | **6.33 s** real (1.78 user, 1.02 sys) — `/usr/bin/time -p`, inside the cast |
| Cast duration | **7.456 s** — sum of the cast's own inter-event intervals |
| Exit code | **1** (findings present) |

The cast is longer than the command because it also contains zsh startup, the two
provenance steps, and asciinema teardown. They are different measurements of
different spans and neither substitutes for the other. **The number that belongs
next to a transcript of the scan is 6.33 s**, because that is the one the transcript
itself contains.

## Target config — real, not a fixture

`mcp.json` is a byte-for-byte copy of `~/.mcp.json`, this machine's actual MCP client
config. It declares one server, `puppeteer`
(`npx -y @modelcontextprotocol/server-puppeteer`), which was live and in use by the
session that produced this recording. The server was really spawned and really
enumerated. Nothing was stubbed, and no fixture was substituted.

Audited before recording for home-directory paths, username, tokens, keys, env
values, internal hostnames, IPs and absolute-path args: none present. The transcript
was re-checked after recording for the same: none present. Both are publishable as-is.

## Files

| File | What it is |
|---|---|
| `run.cast` | The recording. The raw artifact; everything else derives from it. |
| `run.txt` | Plain-text capture, produced by replaying `run.cast` through a pyte terminal emulator at 120x34 with scrollback. Emulation rather than regex-stripping, because uv's progress block redraws with cursor-up sequences that line-based filtering renders wrongly. |
| `mcp.json` | The exact config scanned. |
| `wheel-digest.txt` | Digests, and the limits of what they bind. |
| `record.sh` | The exact session recorded. |
| `ptyrec.py` | The 120x34 PTY harness. |

`.uvcache-cold/` is created by `record.sh` and deleted after; it is a 96 MB byproduct
and is deliberately not kept.

## Reproducing

    cd evidence/2026-08-16-mcpscan-real-run
    rm -rf .uvcache-cold && mkdir -p .uvcache-cold
    python3 ptyrec.py asciinema rec --overwrite -c ./record.sh run.cast

Findings, grade and verdicts are deterministic and will match. The wall clock will
not: it is a measurement of this machine, this network and this cache state on this
date, and re-running replaces it rather than confirming it.

---

# Addendum — the digest chain, closed

The body above left a join unproved. It had two facts:

1. PyPI serves bytes with sha256 `1f23dcf2…faa8d8` (published, and re-derived by
   `curl | shasum` in the recording).
2. `uvx` resolved version `0.1.1`.

Nothing tied them together. "The index publishes a digest" and "the installer chose
a version" are not the same statement as "the bytes that ran are those bytes." The
gap is exactly the kind this page exists to refuse, so it is closed here by making
**uv itself** do the verification.

Full output in `require-hashes.txt`. Both halves were run against a fresh venv and a
fresh `UV_CACHE_DIR`, so uv had to fetch and hash the bytes rather than trust a cache.

## A. Correct digest — installs

    $ cat req-good.txt
    orisan-mcpscan==0.1.1 --hash=sha256:1f23dcf29a779efc884b055c321c8ede4fd283e3605699742a5b1dee12faa8d8

    $ uv pip install --require-hashes --no-deps -r req-good.txt
    Resolved 1 package in 356ms
    Prepared 1 package in 109ms
    Installed 1 package in 4ms
     + orisan-mcpscan==0.1.1
    exit: 0

## B. Tampered digest — refuses

One hex digit flipped, `1f…` to `0f…`, everything else identical:

    $ uv pip install --require-hashes --no-deps -r req-bad.txt
      × Failed to download `orisan-mcpscan==0.1.1`
      ╰─▶ Hash mismatch for `orisan-mcpscan==0.1.1`
          Expected:
            sha256:0f23dcf29a779efc884b055c321c8ede4fd283e3605699742a5b1dee12faa8d8
          Computed:
            sha256:1f23dcf29a779efc884b055c321c8ede4fd283e3605699742a5b1dee12faa8d8
    exit: 1

**B is the load-bearing half.** A passing hash check proves nothing on its own — a
flag that is silently ignored also "passes". The refusal, and the `Computed:` line
naming `1f23dcf2…faa8d8` as what uv actually hashed from the downloaded bytes, is
what makes A evidence instead of assertion.

## What is now bound

Published digest → bytes PyPI serves → **bytes uv installed** → version 0.1.1.
uv computed the digest itself, from the artifact it fetched, and refused the wrong
one. The earlier caveat in `wheel-digest.txt` — that the digest bound only what PyPI
serves and not uv's installed bytes — no longer stands. It is left in place as the
record of what was missing and when.

`--no-deps` scopes the check to the wheel under test. `--require-hashes` demands a
hash for every package in the resolution, and the dependency set is not the claim
being made here; the claim is about the `orisan-mcpscan` artifact itself.
