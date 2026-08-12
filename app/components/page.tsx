import type { Metadata } from "next";
import { GradeStamp } from "@/components/GradeStamp";
import { Label } from "@/components/Label";
import { MarginRail } from "@/components/MarginRail";
import { Section } from "@/components/Section";
import { StopRule } from "@/components/StopRule";

export const metadata: Metadata = {
  title: "Components — Orisan",
  robots: { index: false, follow: false },
};

const GRADES = ["A", "B", "C", "D", "F"] as const;

export default function ComponentsPage() {
  return (
    <>
      <StopRule animate />
      <Section>
        <Label>Reference</Label>
        <h1>Components</h1>
        <p>
          The five primitives every page is built from. This page exists so the
          visual regression suite can watch all of them at once; it is not
          linked from anywhere.
        </p>
      </Section>

      <StopRule variant="thin" />
      <Section>
        <h2>Stop rule</h2>
        <p>
          The page&rsquo;s spine. The full-weight bar marks section boundaries;
          the thin rule subdivides within a section. The one at the top of this
          page carries the single permitted animation.
        </p>
      </Section>

      <StopRule variant="thin" />
      <Section>
        <h2>Margin rail</h2>
        <MarginRail
          note={
            <>
              The rail carries the record&rsquo;s annotations. On narrow
              screens it folds above the text and takes a left border.
            </>
          }
        >
          <p>
            Body copy sits beside a 190px editorial rail from the lg breakpoint
            up. The marginalia is set in the alternate face, italic,
            right-aligned toward the text it annotates. Body copy itself never
            exceeds the 62-character measure.
          </p>
        </MarginRail>
      </Section>

      <StopRule variant="thin" />
      <Section>
        <h2>Grade stamp</h2>
        <p>
          The A-to-F mark from scanner output. Colour is bound to meaning:
          the floor held, raised, damage. On product pages it appears only
          beside real output — this reference row is the one exception.
        </p>
        <ul className="flex list-none flex-wrap gap-4 p-0">
          {GRADES.map((g) => (
            <li key={g}>
              <GradeStamp grade={g} />
            </li>
          ))}
        </ul>
      </Section>

      <StopRule variant="thin" />
      <Section>
        <h2>Label</h2>
        <p>
          <Label>Uppercase mono label</Label>
        </p>
        <p>
          Mono is reserved for the product&rsquo;s own vocabulary and for
          structural labels. Never decorative.
        </p>
      </Section>

      <StopRule variant="thin" />
      <Section space="close">
        <h2>Section</h2>
        <p>
          The vertical rhythm primitive. This one uses the close spacing
          variant; every other section on this page uses regular. No content
          sets its own block margins.
        </p>
      </Section>
      <StopRule />
    </>
  );
}
