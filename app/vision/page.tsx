import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Vision",
  description:
    "Orisan is designed so that every part added can raise suspicion and none can grant permission. What that property costs, what it does not yet prove, and what exists today.",
};

/**
 * Vision is the roadmap page, and a roadmap is a list of promises. Three rules
 * govern every sentence here, in order:
 *
 * 1. No dates, no sequence numbers, no now/next/later. Ordering implies schedule.
 * 2. A dependency may be stated as architecture only if it is one of the five
 *    accepted system-level invariants, or a finding carrying one. Exactly one
 *    qualifies and it is the actor-identity dependency below. Everything else
 *    that looks like a dependency is intent and is marked as intent.
 * 3. Composition safety is not claimed as proven. Parts of the argument are test
 *    obligations against the built system rather than closed design proofs, and
 *    this page says so in its own copy.
 *
 * Everything here is a first-party design commitment: a statement about how our
 * own product is designed to behave, for which we are the source and there is
 * nothing to cite. Publish properties, never findings — no identifiers, no
 * severities, no dispositions, no named areas where something is unclosed.
 * CLAIMS.md rows 48-52.
 */

const RAISE_ONLY = [
  {
    title: "Every part can raise suspicion",
    body: "A component that learns something alarming can tighten what happens next. That direction is always available, to every part, at every authority level.",
  },
  {
    title: "No part can grant permission",
    body: "There is no path by which a component's output loosens a decision somewhere else. Not through a shared data structure, not through a direct link between two components, not through the control plane.",
  },
  {
    title: "The floor is not overridable",
    body: "Each enforcement point holds a local floor. Nothing upstream of it — no assessment, no inventory, no correlation — can lower that floor or talk it out of a catastrophic shape.",
  },
];

const INTENT = [
  {
    title: "Discovery, and the map it builds",
    body: "Finding where agents are wired in, and assembling what each one can actually reach into a single picture of blast radius.",
  },
  {
    title: "The in-path gate",
    body: "The component that sits in the path of an action and decides. It is the reason the floor exists as a concept, and it is not built.",
  },
  {
    title: "The human decision surface",
    body: "One place where a held action arrives with its context and leaves decided, rather than a queue of alerts nobody works through.",
  },
  {
    title: "The record of intent",
    body: "Not a log of what happened. The stated reason an action was permitted, recorded at the moment it was permitted.",
  },
];

export default function Vision() {
  return (
    <>
      <SiteHeader current="/vision" />
      <main>
        <section className="mx-auto max-w-wrap px-8 pt-13 sm:pt-16">
          <p className="font-mono text-label uppercase tracking-label text-orisan-type">
            How it is designed
          </p>
          <h1 className="mt-6 max-w-hero text-3xl font-semibold">
            Every part we add can raise suspicion. None of them can grant permission.
          </h1>
          <p className="mt-6 max-w-lede text-lg text-grey-1">
            That is the property the architecture is built around, and it is the honest
            answer to the question a security buyer asks about anything that intends to
            grow: what happens when you bolt on the next piece.
          </p>
          <p className="mt-5 max-w-lede text-lg text-grey-1">
            Most platforms answer it with a promise about their own discipline. This one
            answers it with a direction of travel that the design does not allow to be
            reversed.
          </p>
        </section>

        <section className="mx-auto max-w-wrap px-8 pt-17">
          <p className="font-mono text-label uppercase tracking-label text-orisan-type">
            Floor supremacy
          </p>
          <h2 className="mt-5 max-w-hero text-2xl font-semibold">
            Influence travels one way.
          </h2>
          <ul className="mt-9 grid list-none grid-cols-stack gap-4 p-0 lg:grid-cols-triad">
            {RAISE_ONLY.map((r) => (
              <li key={r.title} className="rounded-panel bg-paper-deep p-8">
                <h3 className="max-w-hero text-xl font-semibold tracking-tight">{r.title}</h3>
                <p className="mt-4 max-w-lede text-base text-grey-1">{r.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-measure text-base text-grey-1">
            The consequence is what makes it worth stating. A new component can be wrong,
            or compromised, and the worst it achieves is over-reporting. It cannot be used
            to talk the system into allowing something, because that direction does not
            exist in the design.
          </p>
        </section>

        <section className="mx-auto max-w-wrap px-8 pt-17">
          <div className="rounded-panel bg-ink px-8 py-13">
            <p className="font-mono text-label uppercase tracking-label text-orisan-inverse">
              What is not proven
            </p>
            <h2 className="mt-5 max-w-hero text-2xl font-semibold text-paper">
              Two of these are obligations, not proofs.
            </h2>
            <p className="mt-5 max-w-lede text-lg text-grey-3">
              Parts of our composition-safety argument are not closed by design reasoning
              alone. They are obligations to test the built system adversarially, and we
              record them internally as obligations rather than as proofs. Nothing here
              claims composition safety has been demonstrated.
            </p>
            <p className="mt-5 max-w-lede text-lg text-grey-3">
              Publishing that is the point. A composition-safety claim with no stated
              residual is a claim nobody has pressure-tested.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-wrap px-8 pt-17">
          <p className="font-mono text-label uppercase tracking-label text-orisan-type">
            The one hard dependency
          </p>
          <h2 className="mt-5 max-w-hero text-2xl font-semibold">
            A map of what an agent can reach is only as good as knowing which agent it is.
          </h2>
          <p className="mt-5 max-w-lede text-lg text-grey-1">
            The blast-radius map is keyed on actor identity. If the identity is wrong, the
            map attributes reach to the wrong actor, and every decision that consumes the
            map is wrong with it. This is architecture rather than scheduling: the map
            inherits identity&rsquo;s assurance and can never exceed it, so the map cannot be
            trusted for enforcement until the actor-identity plane is real.
          </p>
        </section>

        <section className="mx-auto max-w-wrap px-8 pt-17">
          <p className="font-mono text-label uppercase tracking-label text-orisan-type">
            Intent &middot; not built
          </p>
          <h2 className="mt-5 max-w-hero text-2xl font-semibold">
            What we mean to build, in no particular order.
          </h2>
          <p className="mt-5 max-w-lede text-lg text-grey-1">
            Deliberately unordered. We are not going to imply a sequence we have not
            committed to, and the only ordering constraint we can defend is the one above.
          </p>
          <ul className="mt-9 grid list-none grid-cols-stack gap-4 p-0 lg:grid-cols-pair">
            {INTENT.map((i) => (
              <li key={i.title} className="rounded-panel border border-grey-3 p-8">
                <h3 className="max-w-hero text-xl font-semibold tracking-tight">{i.title}</h3>
                <p className="mt-4 max-w-lede text-base text-grey-1">{i.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mx-auto max-w-wrap px-8 py-17">
          <div className="rounded-panel bg-ink px-8 py-15">
            <p className="font-mono text-label uppercase tracking-label text-orisan-inverse">
              What exists
            </p>
            <h2 className="mt-5 max-w-hero text-2xl font-semibold text-paper">
              One part of this is installable today.
            </h2>
            <p className="mt-5 max-w-lede text-lg text-grey-3">
              mcpscan reads what an MCP server exposes and grades it. It reports and stops
              nothing, which is exactly the shape the floor rule predicts for a component
              that observes: it can raise suspicion, and it has no way to grant anything.
            </p>
            <p className="mt-6 font-mono text-micro uppercase tracking-meta text-grey-4">
              <a href="mailto:team@orisan.org?subject=Orisan" className="text-grey-4">
                team@orisan.org
              </a>
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
