"use client";

import { useState } from "react";

/**
 * The primary call to action. The package is public and installable now, so the
 * action available to a reader is to run it — not to ask permission.
 */
export function InstallCommand({ command, tone = "paper" }: { command: string; tone?: "paper" | "ink" }) {
  const [copied, setCopied] = useState(false);
  const onInk = tone === "ink";

  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div
      className={`flex max-w-lede flex-wrap items-center gap-4 rounded-panel border p-4 ${
        onInk ? "border-grey-4 bg-ink-deep" : "border-grey-3 bg-paper-deep"
      }`}
    >
      <code className={`font-mono text-sm ${onInk ? "text-paper-deep" : "text-ink"}`}>
        {command}
      </code>
      <button
        type="button"
        onClick={copy}
        className={`rounded-full px-5 py-2 font-mono text-label uppercase tracking-label ${
          onInk ? "bg-paper text-ink" : "bg-ink text-paper"
        }`}
      >
        {copied ? "Copied" : "Copy"}
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? "Install command copied to clipboard" : ""}
      </span>
    </div>
  );
}
