import { Label } from "@/components/Label";
import { MarginRail } from "@/components/MarginRail";
import { MediaOpener } from "@/components/MediaOpener";
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
      <Section>
        <Label>The record</Label>
        <h2 className="mt-4 max-w-hero text-2xl">
          Reading first is an old duty.
        </h2>

        <div className="mt-8">
          <MarginRail
            note={
              <>
                The golem obeys the letter of its instruction, animated by a
                word on paper and stopped only by taking that word back out.
                In the oldest written telling it grew until it killed the man
                who made it, in the act of being shut down.
              </>
            }
          >
            <MediaOpener slug="from-c-motion-block-the-c-2" />
            <p>
              A servant that does exactly what it was told is not safe, only
              faithful. The danger lives in the gap between what someone meant
              and what they actually wrote down &mdash; and an MCP server
              declares what it can do before it does any of it. That
              declaration is the last moment reading it costs nothing.
            </p>
          </MarginRail>
        </div>

        <div className="mt-8">
          <StopRule variant="thin" />
        </div>

        <div className="mt-8">
          <MarginRail
            note={
              <>
                Therac-25, 1985&ndash;87. Six massive overdoses, three of them
                fatal &mdash; software reused from machines whose hardware
                interlocks had been quietly absorbing its faults.
              </>
            }
          >
            <MediaOpener slug="from-c-motion-block-the-n" />
            <p>
              The code had worked for years, on hardware that made its faults
              unobservable. When the interlocks went away, reading what the
              software actually did was the only safety system left &mdash;
              and no one had, closely enough.
            </p>
          </MarginRail>
        </div>

        <div className="mt-8">
          <StopRule variant="thin" />
        </div>

        <div className="mt-8">
          <MarginRail
            note={
              <>
                Folklore gives the first reactor a safety control rod axe man.
                Historians doubt it; the man who held the axe said he felt
                foolish. The story survives anyway.
              </>
            }
          >
            <MediaOpener slug="style-hand-drawn-graphite-pen" />
            <p>
              Disputed or not, the image holds a truth: from the first
              criticality onward, someone stands ready to cut the connection.
              The unglamorous modern version is reading what sits on the other
              end of the wire before anything runs.
            </p>
          </MarginRail>
        </div>
      </Section>
      <StopRule />
    </>
  );
}
