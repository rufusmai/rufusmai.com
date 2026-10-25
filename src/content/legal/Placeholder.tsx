/** Marks a value in the legal texts that still has to be filled in. */
export function Placeholder({ children }: { children: React.ReactNode }) {
  return (
    <mark className="rounded-md bg-primary/15 px-1.5 py-0.5 font-mono text-[0.85em] text-primary">
      [{children}]
    </mark>
  );
}
