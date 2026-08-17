import { CTA, EM, EYEBROW, P, WRAP } from "./chrome";
import { OrisanMark } from "./OrisanMark";

/**
 * SECTION 9 — contact, and the footer.
 *
 * The reference's footer carries two `href="#"` links, Claims and Security. A dead
 * link in a footer that says every claim is listed with its source is a small joke
 * at the page's own expense, so both point at real files, checked live:
 *   Claims    orisan-site/CLAIMS.md      HTTP 200
 *   Security  mcpscan/SECURITY.md        HTTP 200  (orisan-site has none)
 */
const CTA_SOLID_D = `${CTA} bg-ink text-paper hover:bg-ink-hover`;

const FOOT_LINK = "block text-sm leading-210 text-grey-1 no-underline hover:text-ink";
const FOOT_LABEL = "block font-mono text-meta uppercase tracking-18 text-grey-1";

export function Contact() {
  return (
    <>
      <section id="contact" className="pb-f-90-180 pt-f-110-220">
        <div className={WRAP}>
          <span className={EYEBROW}>Talk to us</span>
          <h2 className="mt-6h max-w-ch14 text-4xl font-semibold">
            Running agents you cannot
            <br />
            <span className={EM}>fully account for?</span>
          </h2>
          <p className={`${P} mt-8 max-w-ch48 text-lg`}>
            We want to hear what you cannot currently answer, and what you are being asked.
            Early access is a conversation, not a signup form.
          </p>
          <div className="mt-10">
            <a href="mailto:team@orisan.org" className={CTA_SOLID_D}>
              team@orisan.org
            </a>
          </div>
        </div>
      </section>

      <footer>
        <div className={WRAP}>
          <div className="flex flex-wrap justify-between gap-7h">
            <div>
              <a
                href="#"
                className="flex items-center gap-2h font-semibold tracking-n015 text-ink no-underline"
              >
                <OrisanMark id="mark-foot" tone="ink" />
                Orisan
              </a>
              <p className={`${P} mt-3h max-w-ch32 text-colophon`}>
                Evidence and enforcement for AI agents. Early, in the open, and dated.
              </p>
            </div>
            <div className="flex flex-wrap gap-14">
              <div>
                <span className={FOOT_LABEL}>Product</span>
                <a href="#surfaces" className={FOOT_LINK}>Surfaces</a>
                <a href="#ship" className={FOOT_LINK}>mcpscan</a>
                <a href="#log" className={FOOT_LINK}>Build log</a>
              </div>
              <div>
                <span className={FOOT_LABEL}>Open</span>
                <a href="https://github.com/Orisan-org" className={FOOT_LINK}>GitHub</a>
                <a
                  href="https://github.com/Orisan-org/orisan-site/blob/main/CLAIMS.md"
                  className={FOOT_LINK}
                >
                  Claims
                </a>
                <a
                  href="https://github.com/Orisan-org/mcpscan/blob/main/SECURITY.md"
                  className={FOOT_LINK}
                >
                  Security
                </a>
              </div>
            </div>
          </div>
          <hr className="mb-4h mt-9h h-px border-0 bg-rule" />
          <span className={FOOT_LABEL}>
            Orisan · Early access · Every claim on this site is listed with its source
          </span>
        </div>
      </footer>
    </>
  );
}
