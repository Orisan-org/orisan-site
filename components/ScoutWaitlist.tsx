"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/constants";

export function ScoutWaitlist() {
  const [submitted, setSubmitted] = useState(false);
  const action = siteConfig.formspreeId ? `https://formspree.io/f/${siteConfig.formspreeId}` : `mailto:${siteConfig.email}`;

  return (
    <form
      action={action}
      method={siteConfig.formspreeId ? "POST" : "GET"}
      onSubmit={() => setSubmitted(true)}
      className="mt-8 border border-[var(--rule-2)] bg-[#0E1716] p-3"
    >
      <input type="hidden" name="product" value="Orisan Scout" />
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="scout-email">
          Email address
        </label>
        <input
          id="scout-email"
          name="email"
          required
          type="email"
          placeholder="you@company.com"
          className="min-h-12 flex-1 border border-[var(--rule-2)] bg-[var(--bg)] px-4 text-[var(--ink)] outline-none transition placeholder:text-[var(--ink-faint)] focus:border-[var(--sun)]"
        />
        <button
          type="submit"
          className="bg-[var(--ink)] px-6 py-3 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--bg)] transition hover:bg-[var(--sun)]"
        >
          Request early access
        </button>
      </div>
      {submitted ? (
        <p className="px-2 pt-4 text-sm text-[var(--sun)]">Request received. We&apos;ll reach out about Scout access.</p>
      ) : null}
    </form>
  );
}
