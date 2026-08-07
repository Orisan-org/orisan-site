import Link from "next/link";
import { Label } from "@/components/Label";
import { Section } from "@/components/Section";
import { StopRule } from "@/components/StopRule";

export default function NotFound() {
  return (
    <>
      <StopRule />
      <Section>
        <Label>404</Label>
        <h1 className="mt-4 max-w-hero text-2xl">No such page.</h1>
        <p className="mt-6 max-w-lede text-lg text-grey-1">
          The path is wrong or the page is gone. What exists is short:
        </p>
        <p className="mt-6">
          <Link href="/">The front page</Link>
        </p>
      </Section>
      <StopRule />
    </>
  );
}
