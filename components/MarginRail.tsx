type MarginRailProps = {
  /** The marginalia. Editorial voice only — set in font-alt italic. */
  note: React.ReactNode;
  children: React.ReactNode;
};

/**
 * Editorial marginalia beside body copy. A 190px left rail on lg and up,
 * right-aligned toward the text; below lg it folds into a left-bordered block
 * above the content.
 */
export function MarginRail({ note, children }: MarginRailProps) {
  return (
    <div className="grid gap-5 lg:grid-cols-rail lg:gap-7">
      <aside className="border-l-2 border-grey-3 pl-4 lg:border-l-0 lg:pl-0 lg:text-right">
        <span className="font-alt text-xs italic text-grey-1">{note}</span>
      </aside>
      <div className="max-w-measure">{children}</div>
    </div>
  );
}
