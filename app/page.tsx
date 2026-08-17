import type { Metadata } from "next";
import { DecisionFigure } from "@/components/home/DecisionFigure";
import { Clock } from "@/components/home/Clock";
import { Manifesto } from "@/components/home/Manifesto";
import { BuildLog } from "@/components/home/BuildLog";
import { Contact } from "@/components/home/Contact";
import { FloorSection } from "@/components/home/FloorSection";
import { MapSection } from "@/components/home/MapSection";
import { Shipping } from "@/components/home/Shipping";
import { Surfaces } from "@/components/home/Surfaces";
import { OrisanMark } from "@/components/home/OrisanMark";
import { SiteHeader } from "@/components/SiteHeader";
import {
  CTA_GHOST_L,
  CTA_SOLID_L,
  EM_INK,
  EYEBROW_INK,
  WRAP,
} from "@/components/home/chrome";

export const metadata: Metadata = {
  description:
    "Local-first security instruments for AI agents. The first, mcpscan, reads what an MCP server exposes — tools, resources, prompts — before an agent connects.",
};

/** The four hero ticker cells. */
const TICKS = [
  { figure: "2 Aug 2026", note: "EU AI Act Article 12 applicable to high-risk systems" },
  { figure: "€15M", note: "or 3% of worldwide turnover, whichever is higher" },
  { figure: "1 Jan 2026", note: "Texas TRAIGA in effect, NIST AI RMF an affirmative defence" },
  { figure: "7", note: "surfaces designed, one shipping, status stated on each" },
];

export default function Home() {
  return (
    <>
      {/*
        One navigation, the same component every page uses. Home used to carry its
        own: five in-page anchors, a logo pointing at "#", and exactly one outbound
        route link — a CTA six viewports down. Two navigation systems on one site,
        and the front door was the one that did not link out.
      */}
      <SiteHeader current="/" />
        <div className="bg-ink text-tx-d">
        <section className="overflow-hidden pt-f-84-176">
          <div className={WRAP}>
            <div className="grid grid-cols-hero items-center gap-f-30-80 to-980:grid-cols-stack">
              <div>
                <span className={`${EYEBROW_INK} mb-7h`}>Orisan · Early access 2026</span>
                <h1 className="text-4xl font-semibold">
                  Your agents
                  <br />
                  are acting.
                  <br />
                  <span className={EM_INK}>
                    Can you prove
                    <br />
                    what they did?
                  </span>
                </h1>
                <p className="mt-10 max-w-heroLede text-lg text-tx-2d">
                  They read inboxes, call tools, move data and commit changes on their own.
                  When one goes wrong, most teams cannot reconstruct what it saw, decided or
                  touched.
                </p>
                <div className="mt-10h flex flex-wrap gap-3">
                  <a href="#surfaces" className={CTA_SOLID_L}>
                    What we are building
                  </a>
                  <a href="#log" className={CTA_GHOST_L}>
                    Read the build log
                  </a>
                </div>
              </div>

              <div>
                <DecisionFigure />
              </div>
            </div>
          </div>

          <div className="mt-f-60-110 border-t border-rule-dark">
            <div className={`${WRAP} flex flex-wrap`}>
              {TICKS.map((t) => (
                <div
                  key={t.figure}
                  className="flex-tick border-r border-rule-dark pb-8h pl-0 pr-7 pt-7h last:border-r-0 to-780:border-b to-780:border-r-0 to-780:pr-0"
                >
                  <b className="block font-mono text-ticker font-medium text-tx-d">{t.figure}</b>
                  <span className="mt-2 block text-xs text-tx-3d">{t.note}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Clock />
      <Manifesto />
      <Surfaces />
      <Shipping />
      <MapSection />
      <FloorSection />
      <BuildLog />
      <Contact />
    </>
  );
}
