import type { Metadata } from "next";
import { InstallCommand } from "@/components/InstallCommand";
import { Surfaces } from "@/components/home/Surfaces";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Product",
  description:
    "One shipped instrument and the loop it belongs to. mcpscan reads what an MCP server exposes and grades it; the parts that watch, decide and stop an action are not built.",
};

const INSTALL = "uvx orisan-mcpscan scan-config ./mcp.json --yes";

/**
 * Product page. Same discipline as Vision: present tense describes only mcpscan,
 * everything else is marked as intent in words. The three-verb loop is the shape
 * we are building towards and says so; only "watch" has anything shipped under it,
 * and only for one surface. CLAIMS.md rows 53-56.
 */

const SHIPPED = [
  {
    label: "Enumerate",
    body: "Connects over stdio or Streamable HTTP, performs the MCP handshake and lists the tools, resources and prompts a server actually exposes.",
  },
  {
    label: "Check",
    body: "Runs nine deterministic checks over those definitions. No model call decides whether something is a finding.",
  },
  {
    label: "Adjudicate",
    body: "Weighs each finding against the server's purpose and where that purpose came from, then grades A to F on the adjusted severity.",
  },
  {
    label: "Report",
    body: "Terminal, JSON, Markdown or SARIF. Every finding carries redacted evidence only and sets payload_stored=false.",
  },
];

const LOOP = [
  {
    verb: "Watch",
    state: "One surface shipped",
    body: "Every native call an agent can make becomes one common shape. Today only one surface is read, and only before the agent connects rather than as it acts.",
  },
  {
    verb: "Decide",
    state: "Not built",
    body: "The same signal yields the same verdict every time: allow, hold for a human, or stop. Deterministic rules you can read.",
  },
  {
    verb: "Stop",
    state: "Not built",
    body: "The action is held at the boundary rather than reported after it lands, and the record states the intent.",
  },
];

export default function Product() {
  return (
    <>
      <SiteHeader current="/product" />
      <>
        <section className="mx-auto max-w-wrap px-8 pt-13 sm:pt-16">
          <p className="font-mono text-label uppercase tracking-label text-orisan-type">
            The product
          </p>
          <h1 className="mt-6 max-w-hero text-3xl font-semibold">
            One instrument you can install, and the loop it belongs to.
          </h1>
          <p className="mt-6 max-w-lede text-lg text-grey-1">
            mcpscan is the part that exists. It reads what an MCP server exposes and grades
            it. The rest of this page is the loop it was designed to feed, and that loop is
            not built.
          </p>
          <div className="mt-9">
            <InstallCommand command={INSTALL} />
          </div>
        </section>

        <section className="mx-auto max-w-wrap px-8 pt-17">
          <div className="rounded-panel bg-ink px-8 py-13">
            <p className="font-mono text-label uppercase tracking-label text-orisan-inverse">
              Shipped &middot; mcpscan 0.1.1
            </p>
            <h2 className="mt-5 max-w-hero text-2xl font-semibold text-paper">
              What it does, in four steps.
            </h2>
            <ul className="mt-9 list-none p-0">
              {SHIPPED.map((s) => (
                <li key={s.label} className="border-t border-grey-4 py-6">
                  <p className="font-mono text-label uppercase tracking-label text-orisan-inverse">
                    {s.label}
                  </p>
                  <p className="mt-3 max-w-measure text-base text-grey-3">{s.body}</p>
                </li>
              ))}
            </ul>
            <p className="mt-8 max-w-measure text-base text-grey-4">
              Nothing leaves your machine unless you send it. It reports; it does not intervene
              in anything.
            </p>
          </div>
        </section>

        {/*
          Moved here from the home page. It is the platform pitch — seven pieces, six of
          which do not exist — and it sat ahead of the one shipped thing on the front
          door. A reader on /product has chosen depth, which is where an enumeration of
          unbuilt components belongs.

          Dropped in unchanged. Home's WRAP is max-w-home minus px-gutter and this page's
          is max-w-wrap minus px-8; both compute to 1136px, so the grid keeps its width.
        */}
        <Surfaces />

        <section className="mx-auto max-w-wrap px-8 pt-17">
          <p className="font-mono text-label uppercase tracking-label text-orisan-type">
            The loop &middot; mostly not built
          </p>
          <h2 className="mt-5 max-w-hero text-2xl font-semibold">Watch. Decide. Stop.</h2>
          <p className="mt-5 max-w-lede text-lg text-grey-1">
            Three verbs, and only the first has anything shipped under it. Naming the other
            two here is a statement of what we are building, not of what you can run.
          </p>
          <ul className="mt-9 grid list-none grid-cols-stack gap-4 p-0 lg:grid-cols-triad">
            {LOOP.map((l) => (
              <li key={l.verb} className="rounded-panel border border-grey-3 p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="text-xl font-semibold tracking-tight">{l.verb}</h3>
                  <span className="font-mono text-micro uppercase tracking-meta text-grey-1">
                    {l.state}
                  </span>
                </div>
                <p className="mt-4 max-w-lede text-base text-grey-1">{l.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mx-auto max-w-wrap px-8 pt-17">
          <p className="font-mono text-label uppercase tracking-label text-orisan-type">
            The rule the design is built on
          </p>
          <h2 className="mt-5 max-w-hero text-2xl font-semibold">
            Anything we add can raise suspicion. Nothing we add can grant permission.
          </h2>
          <p className="mt-5 max-w-lede text-lg text-grey-1">
            mcpscan is the first instance of it. A component that observes can tighten what
            happens next and has no path by which it loosens anything. That is why it grades
            and stops nothing, and why adding the next instrument cannot weaken the ones
            already there.
          </p>
        </section>

        <section className="mx-auto max-w-wrap px-8 py-17">
          <div className="rounded-panel bg-ink px-8 py-15">
            <h2 className="max-w-hero text-2xl font-semibold text-paper">
              Run the part that exists.
            </h2>
            <p className="mt-5 max-w-lede text-lg text-grey-3">
              Then tell us where the loop would break in your environment.
            </p>
            <div className="mt-9">
              <InstallCommand command={INSTALL} tone="ink" />
            </div>
            <p className="mt-6 font-mono text-micro uppercase tracking-meta text-grey-4">
              <a href="mailto:team@orisan.org?subject=Orisan" className="text-grey-4">
                team@orisan.org
              </a>
            </p>
          </div>
        </section>
      </>
      <SiteFooter />
    </>
  );
}
