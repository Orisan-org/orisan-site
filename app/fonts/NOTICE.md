# JetBrains Mono — modified subset

`JetBrainsMono-subset.woff2` in this directory is a **modified** copy of JetBrains
Mono. It is redistributed under the SIL Open Font License 1.1, whose full text is in
`OFL.txt` beside it, with the upstream author list in `AUTHORS.txt`.

> Copyright 2020 The JetBrains Mono Project Authors
> (https://github.com/JetBrains/JetBrainsMono)
>
> This Font Software is licensed under the SIL Open Font License, Version 1.1.
> This license is available with a FAQ at: https://openfontlicense.org/

The OFL permits modification and redistribution and requires the copyright and
licence notice to travel with the font. This file, `OFL.txt` and `AUTHORS.txt` are
that notice. They are committed next to the font deliberately: a licence that lives
somewhere else is a licence that gets separated from the thing it covers.

## Upstream

| | |
|---|---|
| Project | JetBrains Mono, https://github.com/JetBrains/JetBrainsMono |
| Version | **2.304** (`name` ID 5: "Version 2.304") |
| Source file | `fonts/variable/JetBrainsMono[wght].ttf` from the v2.304 release archive |
| Axes | `wght` 100–800, preserved in the subset |

## What was changed

Subsetting only. No glyph was redrawn, no metric altered, no axis instanced. Every
glyph in the output is upstream's, at upstream's advance width of 600 units per em —
which is the whole point of the exercise, since a metrically different substitute is
what this change exists to avoid.

Reserved Font Name: the OFL's RFN clause is not triggered here. An RFN is declared by
appending "with Reserved Font Name ..." to the copyright notice, and upstream's notice
carries no such clause — it reads exactly "Copyright 2020 The JetBrains Mono Project
Authors (https://github.com/JetBrains/JetBrainsMono)" and stops. The subset therefore
keeps the family name, which is also what makes the CSS stack resolve to one family.
(Checked in `OFL.txt` line 1, not in `name` ID 14, which is the licence URL and would
not carry an RFN in any case.)

## The command

```
pyftsubset "JetBrainsMono[wght].ttf" \
  --output-file=JetBrainsMono-subset.woff2 \
  --flavor=woff2 \
  --layout-features='*' \
  --name-IDs='*' \
  --unicodes="U+0020-007E,U+00A0-00FF,U+2014,U+2192,U+20AC,\
U+2500-2503,U+250F,U+2513,U+2514,U+2518,U+2521,U+2529,U+2533,U+2534,U+2547"
```

`--name-IDs='*'` is not incidental: it keeps the copyright, licence and licence-URL
name records inside the font file itself, so the notice survives even if the font is
lifted out of this directory.

## The codepoint set, and where it comes from

Derived, not chosen. Two sources, unioned:

1. **Every distinct codepoint in the section 5 transcript**, enumerated from
   `evidence/2026-08-16-mcpscan-real-run/run.txt`: 2,569 characters, 80 distinct
   codepoints, of which exactly 13 fall outside Latin-1 and all 13 are Box Drawing —
   `U+2500 2501 2502 2503 250F 2513 2514 2518 2521 2529 2533 2534 2547`.
2. **The non-ASCII the rest of the site sets in mono**, enumerated across `app/` and
   `components/`: `U+00B7` middle dot, `U+2014` em dash, `U+2192` rightwards arrow,
   `U+20AC` euro sign. Without these the subset would have fixed the transcript and
   silently broken every other mono string on the site.

Latin-1 is taken wholesale rather than enumerated, because it is cheap and because
enumerating it would make the subset depend on today's copy.

## Cost

| Subset | Size |
|---|---|
| Without the 13 box glyphs | 43.2 KB |
| **As shipped** | **43.4 KB** |
| Whole `U+2500-257F` block instead | 44.7 KB |

The 13 glyphs cost 104 bytes. Shipping the full block would have cost 1.5 KB and was
not done, because the coverage set is derived from what the transcript contains and
`tests/visual.spec.ts` fails the moment a codepoint escapes it.

## Regenerating

Re-run the command above against the same upstream version. If the transcript ever
changes, re-derive the codepoint list from the new `run.txt` rather than appending to
the old one — the uniform-advance test will fail first and tell you which codepoint
is missing.
