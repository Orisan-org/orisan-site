/**
 * Uppercase mono label. Mono is reserved for the product's own vocabulary —
 * check IDs, grades, findings, commands, file paths — and for structural
 * labels like this one. Never decorative.
 */
export function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-xs uppercase tracking-label text-grey-1">
      {children}
    </span>
  );
}
