import { Label } from "@/components/Label";
import { Section } from "@/components/Section";
import { StopRule } from "@/components/StopRule";

export default function Home() {
  return (
    <>
      <StopRule animate />
      <Section>
        <Label>Orisan</Label>
        <h1 className="mt-4 max-w-hero text-3xl">
          Read the MCP server before your agent does.
        </h1>
        <p className="mt-6 max-w-lede text-lg text-grey-1">
          Orisan is building local-first instruments for exactly that: the
          first, <span className="font-mono">mcpscan</span>, reads what a
          server exposes &mdash; tools, resources, prompts &mdash; and runs
          deterministic checks before an AI agent connects. On your machine,
          uploading nothing.
        </p>
        <p className="mt-7">
          <a href="https://github.com/Orisan-org">Orisan on GitHub</a>
        </p>
      </Section>
      <StopRule />
    </>
  );
}
