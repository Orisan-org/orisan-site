"use client";

import { Label } from "@/components/Label";
import { Section } from "@/components/Section";
import { StopRule } from "@/components/StopRule";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <>
      <StopRule />
      <Section>
        <Label>Error</Label>
        <h1 className="mt-4 max-w-hero text-2xl">Something failed.</h1>
        <p className="mt-6 max-w-lede text-lg text-grey-1">
          The page hit an error while rendering. Nothing you did caused it.
        </p>
        <p className="mt-6">
          <button
            type="button"
            onClick={() => reset()}
            className="border-2 border-ink px-4 py-2 font-display text-base"
          >
            Try again
          </button>
        </p>
      </Section>
      <StopRule />
    </>
  );
}
