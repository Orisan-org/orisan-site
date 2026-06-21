"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/constants";

const fieldClass =
  "min-h-12 w-full border border-[var(--rule-2)] bg-[#0E1716] px-4 py-2 text-[var(--ink)] outline-none transition placeholder:text-[var(--ink-faint)] focus:border-[var(--sun)]";
const labelClass = "mb-2 block font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--ink-dim)]";

// Only rendered when NEXT_PUBLIC_FORMSPREE_ID is configured. There is no
// invented email fallback — without a form endpoint, the contact page points to
// GitHub instead.
export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  if (!siteConfig.formspreeId) {
    return null;
  }

  return (
    <form
      action={`https://formspree.io/f/${siteConfig.formspreeId}`}
      method="POST"
      onSubmit={() => setSubmitted(true)}
      className="border border-[var(--rule-2)] bg-[#0E1716] p-5 md:p-7"
    >
      <div className="grid gap-4">
        <div>
          <label htmlFor="name" className={labelClass}>Name</label>
          <input id="name" name="name" required className={fieldClass} />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>Email</label>
          <input id="email" name="email" type="email" required className={fieldClass} />
        </div>
        <div>
          <label htmlFor="message" className={labelClass}>Message</label>
          <textarea id="message" name="message" required rows={6} className={`${fieldClass} resize-y`} />
        </div>
      </div>
      <button
        type="submit"
        className="mt-6 inline-flex items-center gap-2 border border-[var(--rule-2)] bg-[var(--ink)] px-6 py-3 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--bg)] transition hover:border-[var(--sun)] hover:bg-[var(--sun)]"
      >
        Send
      </button>
      {submitted ? <p className="mt-4 text-sm text-[var(--sun)]">Thanks — your message is ready to send.</p> : null}
    </form>
  );
}
