# design/reference

The restyle authority. Not part of the site build.

## What is in here

`home.html` — the Orisan Home v3 page produced in a Claude Design session,
extracted from the standalone bundler download. It is the **restyle candidate**:
the visual target the shipped site is being moved toward, one audited phase at
a time.

## Why it is tracked

The restyle spans several PRs. Without a tracked copy there is no single answer
to "what are we restyling *to*", and each PR would be argued against a file
sitting in someone's Downloads folder. This is that answer. Fixes land here
first; the shipped site follows.

## Why it does not build

- Tailwind's `content` globs cover `./app` and `./components` only, so nothing
  in this directory is scanned and no utility is emitted from it.
- It is plain CSS and inline `<script>`, not a route. Next.js does not serve it.
- `design/` is listed in `.vercelignore`, so it is not uploaded to the platform.

Open it directly in a browser to view it.

## What it is not

It is **not** a claims-cleared page. It carries figures whose specifics were
invented for layout, and its terminal block is fabricated output, marked as such
on screen. Nothing in this file may be copied to a shipped page without a
`CLAIMS.md` row. See the fabricated-figure rule in `CLAUDE.md`.
