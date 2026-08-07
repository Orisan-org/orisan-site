import type { Metadata } from "next";
import { Label } from "@/components/Label";
import { Section } from "@/components/Section";
import { StopRule } from "@/components/StopRule";

export const metadata: Metadata = {
  title: "Contact",
  description: "How to reach Orisan: the public channel on GitHub.",
};

export default function ContactPage() {
  return (
    <>
      <StopRule />
      <Section>
        <Label>Contact</Label>
        <h1 className="mt-4 max-w-hero text-2xl">The channel is public.</h1>
        <p className="mt-6 max-w-lede text-lg text-grey-1">
          Orisan is early, and early conversations belong in the open: issues
          and discussions on GitHub reach the people building the tools.
        </p>
        <p className="mt-6">
          <a href="https://github.com/Orisan-org">github.com/Orisan-org</a>
        </p>
        <p className="mt-7 max-w-measure text-grey-1">
          No forms, no analytics, no third-party scripts on this site.
        </p>
      </Section>
      <StopRule />
    </>
  );
}
