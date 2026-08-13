/**
 * The recorded contrast matrix: every (text colour, composited ground) pair that
 * actually occurs on the built page.
 *
 * WHY THIS EXISTS. Four tokens have now been corrected for contrast, and three of
 * the four were corrected twice, because each was measured against the one ground
 * it was expected to land on and then landed on another. suspicion.sub, stopped-lit
 * and tx.3d in turn. The bar was never the problem; the silence was. A ratio is a
 * property of a pair, so the pair is what gets recorded.
 *
 * THE CHECK, in tests/contrast.spec.ts:
 *   fails    any occupied pair below 7.00 that is not in ACCEPTED_THIN
 *   fails    any occupied pair absent from RECORDED
 *   passes   everything else
 *
 * The second rule is the one that does the work. A new pair is a token landing
 * somewhere it has not been measured, which is exactly the event that produced
 * every correction so far. Adding a section means extending RECORDED deliberately,
 * with the ratios in front of you.
 *
 * This is an allowlist, not a warning tier. There is no warn level on purpose:
 * findings a reader learns to ignore have a shorter useful life than no gate.
 */
export const RECORDED: string[] = [
  "#0f0f0f|#f0f0ec", // 16.78
  "#0f0f0f|#fafaf9", // 18.35
  "#3e5735|#f0f0ec", // 7.02
  "#4b4b49|#f0f0ec", // 7.65
  "#4b4b49|#fafaf9", // 8.37
  "#8fae83|#0f0f0f", // 7.80
  "#9d9d99|#0f0f0f", // 7.04
  "#a6a6a2|#0f0f0f", // 7.85
  "#c8c8c4|#0f0f0f", // 11.42
  "#c9a566|#0f0f0f", // 8.27
  "#d96a45|#0f0f0f", // 5.57
  "#ee9080|#0f0f0f", // 8.16
  "#fafaf9|#0f0f0f", // 18.35
];

/**
 * Thin values that are accepted, each with the reason it is tolerable.
 *
 * A thin value is a landmine when nothing watches its grounds and merely thin when
 * something does. These are watched: if one lands on a new ground, RECORDED fails
 * first and the value is re-decided with the new cell in view.
 */
export const ACCEPTED_THIN: Record<string, string> = {
  // Display-only, and ruled so before this check existed: the hero's italic accent
  // at 137.6px. Large-text AA is 3:1 and this clears it twice over. It is the third
  // thin pair, and the one the two-entry ruling omitted because it predates it.
  "#d96a45|#0f0f0f": "5.57 - accent.d, display italic at 137.6px, ruled display-only",

  // Both arrive with section 5 and are pre-registered so that PR's matrix update is
  // purely additive. Ruled: neither moves.
  //   harm.lit on ink.focus, the two focused HIGH lines. The most important text in
  //   the figure has the least margin - severity colour must stay in its hue family
  //   and the focus row is the lightest ground. The fix is a darker focus row, not a
  //   lighter red, and it is not now.
  "#ee9080|#221e1c": "7.03 - harm.lit on the focused terminal row, four grounds all enumerated",
  //   tx.term on ink.deep, its only ground. Raising it to #ADADA8 would put the
  //   terminal body at 8.10, above tx.3d's 7.74 on the same ground, inverting the
  //   reading order. A real design property is not traded for margin nobody sees.
  "#a1a19c|#151515": "7.04 - tx.term, terminal body, its only ground",
};
