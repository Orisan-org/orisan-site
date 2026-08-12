type StopRuleProps = {
  /** "full": the 14px ink bar that marks a section boundary. "thin": the 2px grey hairline. */
  variant?: "full" | "thin";
  /** One stop rule per page may drop on first paint. Never on scroll. */
  animate?: boolean;
};

/**
 * The page's spine. A solid ink bar at section boundaries — structural, not
 * decorative. Weight comes from the border-width scale (2px / 14px), the only
 * place the design system expresses rule weight.
 */
export function StopRule({ variant = "full", animate = false }: StopRuleProps) {
  if (variant === "thin") {
    return <div aria-hidden="true" className="w-full border-t-2 border-grey-1" />;
  }
  return (
    <div
      aria-hidden="true"
      className={
        animate
          ? "w-full origin-left animate-drop border-t-14 border-ink"
          : "w-full border-t-14 border-ink"
      }
    />
  );
}
