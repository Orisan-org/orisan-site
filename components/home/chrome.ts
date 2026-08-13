/**
 * Class strings the reference stylesheet defines once and reuses across sections.
 * Kept here so a change lands in one place, exactly as `.wrap` or `.cta` does in
 * the design.
 */

// .wrap — max-width:1280px; margin:0 auto; padding:0 var(--g)
export const WRAP = "mx-auto w-full max-w-home px-gutter";

// .eyebrow
export const EYEBROW =
  "block font-mono text-label font-medium uppercase tracking-26 text-grey-1";

// .eyebrow inside an .ink section
export const EYEBROW_INK =
  "block font-mono text-label font-medium uppercase tracking-26 text-tx-3d";

// .em — the italic emphasis inside a display heading
export const EM = "font-alt italic font-normal tracking-n01 text-accent";
export const EM_INK = "font-alt italic font-normal tracking-n01 text-accent-d";

// .cta — 13px vertical padding snaps to the 12px ladder step, the only
// sub-2px snap on the page.
export const CTA =
  "inline-flex items-center gap-2h rounded-full border border-transparent " +
  "px-6 py-3 text-cta font-medium no-underline transition duration-150";

export const CTA_SOLID_L = `${CTA} bg-tx-d text-ink hover:bg-paper-hover`;
export const CTA_GHOST_L = `${CTA} border-rule-edge text-tx-d hover:border-rule-bright`;
