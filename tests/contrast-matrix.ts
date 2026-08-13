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
  "#0f0f0f|#fafaf9": 18.35,   // 9.92px min, weight 400
  "#3e5735|#f0f0ec": 7.02,    // 9.92px min, weight 400
  "#4b4b49|#f0f0ec": 7.65,    // 11.84px min, weight 400
  "#4b4b49|#fafaf9": 8.37,    // 9.92px min, weight 400
  "#8fae83|#0f0f0f": 7.8,     // 9.5px min, weight 400
  "#9d9d99|#0f0f0f": 7.04,    // 7.5px min, weight 400
  "#a6a6a2|#0f0f0f": 7.85,    // 14.24px min, weight 400
  "#c8c8c4|#0f0f0f": 11.42,   // 9.5px min, weight 400
  "#c9a566|#0f0f0f": 8.27,    // 7.5px min, weight 400
  "#d96a45|#0f0f0f": 5.57,    // 137.6px min, weight 400
  "#ee9080|#0f0f0f": 8.16,    // 9.5px min, weight 400
  "#fafaf9|#0f0f0f": 18.35,   // 15.04px min, weight 500
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
};

/** large-text per WCAG: >=24px, or >=18.66px at >=700 weight. Floor is AAA's 4.5:1. */
export const LARGE_PX = 24;
export const LARGE_BOLD_PX = 18.66;
export const LARGE_BOLD_WEIGHT = 700;
export const LARGE_TEXT_FLOOR = 4.5;
