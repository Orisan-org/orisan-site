/**
 * One boundary-aware term matcher, used by every absence check and every claims
 * sweep. Nothing else may hand-write a pattern for this.
 *
 * WHY THIS EXISTS AS CODE RATHER THAN A RULE. Unanchored substring matching failed
 * twice in two rounds, both times on a check confirming a deletion:
 *
 *   /NIST/i        matched inside "determiNISTic"   -> 8 claims rows reported as
 *                                                      mentioning regulation
 *   /2 Aug 2026/   matched inside "1|2 Aug 2026"    -> a deleted date reported as
 *                                                      still on the page
 *
 * Both got lucky in the safe direction: they reported a term PRESENT when it was
 * absent, which wastes time and nothing else.
 *
 * THE FIX EVERYONE REACHES FOR IS WORSE THAN THE BUG. Wrapping the term in \b
 * breaks the moment the term does not begin or end with a word character, and it
 * fails in the direction that ships:
 *
 *   /\b€15M\b/.test("Fines of €15M apply")   ->  false
 *
 * \b asserts a word/non-word transition. "€" is not a word character, so \b before
 * it demands a word character immediately prior, and a term at the start of a
 * phrase or after a space has none. The check reports the term ABSENT while it is
 * on the page, and certifies a deletion that never happened. That is not
 * hypothetical: "€15M" is one of the terms we deleted and then verified.
 *
 * So the boundary has to adapt to the term's own edges. A guard is applied only on
 * a side where the term actually ends in a word character; where it ends in
 * punctuation or a symbol, no guard is needed and adding one is the bug.
 */

const WORD = "\\p{L}\\p{N}_";

const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * A pattern that matches `term` as a standalone run of text.
 * Case-insensitive and Unicode-aware. Whitespace inside the term matches any run
 * of whitespace, because rendered HTML collapses and re-wraps it.
 */
export function termPattern(term) {
  if (typeof term !== "string" || term.length === 0) {
    throw new Error("termPattern: term must be a non-empty string");
  }
  const body = escapeRegExp(term).replace(/\s+/g, "\\s+");
  const startsWord = new RegExp(`^[${WORD}]`, "u").test(term);
  const endsWord = new RegExp(`[${WORD}]$`, "u").test(term);
  const lead = startsWord ? `(?<![${WORD}])` : "";
  const trail = endsWord ? `(?![${WORD}])` : "";
  return new RegExp(`${lead}${body}${trail}`, "iu");
}

/** Does `haystack` contain `term` as a standalone run? */
export function containsTerm(haystack, term) {
  return termPattern(term).test(haystack);
}

/**
 * Assert a set of terms is absent from `haystack`.
 *
 * Carries its own positive control, because an absence result means nothing if the
 * matcher is pointed at the wrong text or is incapable of matching at all. The
 * control is a term the caller expects to be PRESENT; if it is missing, the whole
 * result is discarded rather than reported as clean.
 *
 * Returns { ok, present, controlFound }.
 */
export function assertAbsent(haystack, terms, { control } = {}) {
  if (!control) throw new Error("assertAbsent: a positive control term is required");
  const controlFound = containsTerm(haystack, control);
  const present = terms.filter((t) => containsTerm(haystack, t));
  return { ok: controlFound && present.length === 0, present, controlFound };
}

/**
 * Self-test. Every case below is a real defect this file exists to prevent, so a
 * change that reintroduces one fails here rather than in an audit six months on.
 */
export function selfTest() {
  const cases = [
    // [haystack, term, expected, why]
    ["every check and every verdict is deterministic", "NIST", false, "NIST inside deterministic"],
    ["12 Aug 2026 A gate that fails the build", "2 Aug 2026", false, "date inside a longer date"],
    ["on 2 Aug 2026 the rules changed", "2 Aug 2026", true, "the same date, standalone"],
    ["Fines of €15M apply", "€15M", true, "non-word leading edge — \\b would miss this"],
    ["turnover of 3% or more", "3%", true, "non-word trailing edge"],
    ["Article 12 record-keeping", "Article 12", true, "plain phrase, present"],
    ["Article 120 is different", "Article 12", false, "phrase inside a longer number"],
    ["it is TRAIGA-compliant", "TRAIGA", true, "hyphen is not a word character"],
    ["the word\nwraps across lines", "word wraps", true, "rendered whitespace collapses"],
    ["a high-risk system", "high-risk", true, "internal punctuation"],
  ];
  const failures = [];
  for (const [hay, term, expected, why] of cases) {
    const got = containsTerm(hay, term);
    if (got !== expected) failures.push(`${why}: containsTerm(${JSON.stringify(hay)}, ${JSON.stringify(term)}) = ${got}, expected ${expected}`);
  }
  // the matcher must be capable of matching at all
  if (!containsTerm("orisan", "orisan")) failures.push("control: matcher cannot match an exact string");
  return failures;
}

if (process.argv[1] && process.argv[1].endsWith("term-match.mjs")) {
  const failures = selfTest();
  if (failures.length) {
    console.error("FAIL: term-match self-test");
    for (const f of failures) console.error("  " + f);
    process.exit(1);
  }
  console.log(`  ok: term-match self-test, ${10} cases including both historical defects`);
}
