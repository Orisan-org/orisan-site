import type { Metadata } from "next";
import { GapWidget } from "@/components/GapWidget";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "The gap",
  description:
    "Same server, same five tools, a different grade. Change who declared what the server is for and every verdict re-adjudicates, computed by mcpscan 0.1.1's own rules.",
};

export default function Gap() {
  return (
    <>
      <SiteHeader current="/gap" />
      <main>
        <section className="mx-auto max-w-wrap px-8 pt-13 sm:pt-16">
          <p className="font-mono text-label uppercase tracking-label text-orisan-type">
            The gap &middot; mcpscan 0.1.1
          </p>
          <h1 className="mt-6 max-w-hero text-3xl font-semibold">
            Same server. Same five tools. A different grade.
          </h1>
          <p className="mt-6 max-w-lede text-lg text-grey-1">
            The official filesystem server, and the five capabilities mcpscan finds on it.
            Change what it was declared to be for, and who did the declaring, and every
            verdict re-adjudicates.
          </p>
          <p className="mt-5 max-w-lede text-lg text-grey-1">
            Computed here by the same rules the installed package uses, not written by
            hand. Every state below was run against the published 0.1.1 wheel and a test
            asserts this page reproduces those results.
          </p>
        </section>

        <section className="mx-auto max-w-wrap px-8 pt-13">
          <GapWidget />
        </section>

        <section className="mx-auto max-w-wrap px-8 pt-17">
          <div className="rounded-panel bg-ink px-8 py-13">
            <p className="font-mono text-label uppercase tracking-label text-orisan-inverse">
              The rule underneath
            </p>
            <h2 className="mt-5 max-w-hero text-2xl font-semibold text-paper">
              Any source may raise a severity. Only you may lower one.
            </h2>
            <div className="mt-9 grid grid-cols-stack gap-4 lg:grid-cols-triad">
              <div className="rounded-panel border border-grey-4 p-6">
                <p className="max-w-lede text-base text-grey-3">
                  Raising needs no trust. The worst a hostile server achieves by inflating
                  its own severity is making its own findings look worse than they are.
                </p>
              </div>
              <div className="rounded-panel border border-grey-4 p-6">
                <p className="max-w-lede text-base text-grey-3">
                  Lowering is a claim that a dangerous capability is fine. That claim has to
                  come from outside the thing being scanned, so a server naming itself{" "}
                  <span className="font-mono">filesystem-helper</span> cannot wave its own
                  file writes through.
                </p>
              </div>
              <div className="rounded-panel border border-grey-4 p-6">
                <p className="max-w-lede text-base text-grey-3">
                  Nothing is suppressed. Every finding is shown — escalated, held, or
                  annotated. The severity moves; the row never disappears.
                </p>
              </div>
            </div>
            <p className="mt-8 max-w-measure text-base text-grey-4">
              A config file is not you. It reads as your intent, but install snippets get
              copy-pasted out of a server&rsquo;s own documentation, so the same string can be
              the server talking. That is why <span className="font-mono">config</span> and{" "}
              <span className="font-mono">server_info</span> land in the same place above.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-wrap px-8 py-17">
          <h2 className="max-w-hero text-2xl font-semibold">
            The interesting state is the one that grades F.
          </h2>
          <p className="mt-5 max-w-lede text-lg text-grey-1">
            Declare a purpose the taxonomy does not recognise and nothing is expected any
            more. File reads are still mentioned in the server&rsquo;s own text, so they are
            unexpected and hold their severity. File writes are mentioned nowhere, so they
            are undeclared and escalate a level. That is escalation working: a wrong purpose
            makes the tool more suspicious, never less.
          </p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
