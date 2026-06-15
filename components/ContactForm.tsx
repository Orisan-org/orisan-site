"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { siteConfig } from "@/lib/constants";

const fieldClass =
  "min-h-12 w-full border border-[var(--rule-2)] bg-[#0E1716] px-4 text-[var(--ink)] outline-none transition placeholder:text-[var(--ink-faint)] focus:border-[var(--sun)]";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const action = siteConfig.formspreeId ? `https://formspree.io/f/${siteConfig.formspreeId}` : `mailto:${siteConfig.email}`;

  return (
    <form
      action={action}
      method={siteConfig.formspreeId ? "POST" : "GET"}
      onSubmit={() => setSubmitted(true)}
      className="border border-[var(--rule-2)] bg-[#0E1716] p-5 md:p-7"
    >
      <div className="grid gap-4">
        <div>
          <label htmlFor="name" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--ink-dim)]">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--ink-dim)]">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="message" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--ink-dim)]">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            className={`${fieldClass} resize-y py-3`}
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-6 inline-flex items-center gap-2 bg-[var(--ink)] px-6 py-3 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--bg)] transition hover:bg-[var(--sun)]"
      >
        Send <Send size={16} />
      </button>
      {submitted ? <p className="mt-4 text-sm font-medium text-[var(--sun)]">Thank you. Your message is ready to send.</p> : null}
    </form>
  );
}
