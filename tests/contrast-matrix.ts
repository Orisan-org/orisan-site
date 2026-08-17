/**
 * The recorded contrast matrix: every (text colour, composited ground) pair on the
 * built page, with the ratio it measured at.
 *
 * WHY. Four tokens have been corrected for contrast and three were corrected twice,
 * each measured against the one ground it was expected to land on and then landing
 * on another. The bar was never the problem; the silence was. A ratio is a property
 * of a pair, so the pair is what gets recorded — and the ratio with it, so drift in
 * an accepted value fails on the next run whatever caused it.
 *
 * THE THREE RULES, in tests/contrast.spec.ts:
 *   fails   occupied pair below 7.00 whose basis does not validate
 *   fails   occupied pair absent from RECORDED
 *   fails   occupied pair whose ratio differs from RECORDED
 *
 * The second and third do the work. A new pair is a token landing somewhere it has
 * not been measured, which is the event behind every correction so far; a changed
 * ratio is that same token moving under a value someone already accepted.
 *
 * Adding a section means extending this deliberately, with the ratios in view.
 * No warn tier: findings a reader learns to ignore have a shorter useful life than
 * no gate at all.
 */
export const RECORDED: Record<string, number> = {
  "#0f0f0f|#f0f0ec": 16.78,   // 41.6px min, weight 600
  "#0f0f0f|#f1e5e4": 15.58,  // 19.2px min, weight 500 — the grade stamp's letter on
                             // harm.fill. The letter is ink by design: the mark carries
                             // the meaning, and the accent values fail AA as type.
  "#0f0f0f|#fafaf9": 18.35,   // 9.92px min, weight 400
  "#3e5735|#f0f0ec": 7.02,    // 9.92px min, weight 400
  "#4b4b49|#f0f0ec": 7.65,    // 11.84px min, weight 400
  "#4b4b49|#fafaf9": 8.37,    // 9px min, weight 400
  "#565654|#fafaf9": 7.04,    // 7.5px min, weight 400
  "#8fae83|#0f0f0f": 7.8,     // 9.5px min, weight 400
  "#8fae83|#151515": 7.43,   // 12.8px min, weight 400 — section 5 transcript, the
                             // payload_stored=false line on the pane's ink-deep ground
  "#9e2b25|#fafaf9": 7.11,    // 7.5px min, weight 400
  "#a1a19c|#151515": 7.04,    // 12.8px min, weight 400
  "#a6a6a2|#0f0f0f": 7.85,    // 9px min, weight 400
  "#a6a6a2|#151515": 7.48,    // 14.08px min, weight 400
  "#a9a9a5|#0f0f0f": 8.13,    // 7.5px min, weight 400
  "#a9a9a5|#151515": 7.74,    // 9.28px min, weight 400
  "#a9a9a5|#1c1414": 7.68,    // 9.28px min, weight 400
  "#c63c21|#fafaf9": 4.94,    // 137.6px min, weight 400
  "#c8c8c4|#0f0f0f": 11.42,   // 9.5px min, weight 400
  "#c9a566|#0f0f0f": 8.27,    // 7.5px min, weight 400
  "#c9a566|#151515": 7.88,    // 9.28px min, weight 400
  "#c9a566|#1c1414": 7.81,    // 22.4px min, weight 500
  "#d96a45|#0f0f0f": 5.57,    // 76.8px min, weight 400
  "#ee9080|#0f0f0f": 8.16,    // 8px min, weight 400
  "#ee9080|#151515": 7.77,    // 9.28px min, weight 400
  "#ee9080|#1c1414": 7.71,    // 22.4px min, weight 500
  "#ee9080|#221e1c": 7.03,    // 12.8px min, weight 400
  "#fafaf9|#0f0f0f": 18.35,   // 9px min, weight 400
  "#fafaf9|#151515": 17.48,   // 12.8px min, weight 400
};

/**
 * Pairs that do not have to clear the 7:1 house bar, each with a BASIS that the
 * check verifies rather than trusts.
 *
 * Only pairs that would otherwise FAIL belong here. 7.03 and 7.04 are above 7.00,
 * so they pass on their own and live in RECORDED like everything else — an
 * exceptions list containing things that are not exceptions is how a list stops
 * meaning anything.
 */
export type Basis = "large-text";

export const ACCEPTED_THIN: Record<string, { basis: Basis; reason: string }> = {
  // The hero's italic accent. Not thin — large, which has a different published
  // bar. WCAG AAA allows 4.5:1 for large text, so this clears a real standard
  // rather than an exemption someone granted. If the italic is ever dropped below
  // 24px the basis stops validating and this fails, which is the point: the ruling
  // is held by the code instead of by memory. It was exempt by an unwritten ruling
  // for four contrast corrections, and that is exactly how it stayed invisible.
  "#d96a45|#0f0f0f": { basis: "large-text", reason: "accent.d, hero italic at 137.6px" },
  // The paper-side twin of the same device: the contact heading's italic. accent is
  // 4.94:1 on paper, which is why orisan.type carries eyebrow-sized text instead --
  // but at 137.6px this is large text and clears AAA's 4.5 floor on the same basis.
  // Single occurrence, so the smallest-occurrence rule bites nothing here.
  "#c63c21|#fafaf9": { basis: "large-text", reason: "accent, contact italic at 137.6px" },
};

/** large-text per WCAG: >=24px, or >=18.66px at >=700 weight. Floor is AAA's 4.5:1. */
export const LARGE_PX = 24;
export const LARGE_BOLD_PX = 18.66;
export const LARGE_BOLD_WEIGHT = 700;
export const LARGE_TEXT_FLOOR = 4.5;
