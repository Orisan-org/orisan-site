type SectionProps = {
  /** Vertical rhythm comes from here and nowhere else. */
  space?: "regular" | "close";
  children: React.ReactNode;
};

/**
 * The vertical rhythm primitive. Sections own all block spacing; content
 * inside never sets its own top/bottom page margins.
 */
export function Section({ space = "regular", children }: SectionProps) {
  return (
    <section className={space === "close" ? "py-8" : "py-10"}>
      <div className="mx-auto max-w-wrap px-5">{children}</div>
    </section>
  );
}
