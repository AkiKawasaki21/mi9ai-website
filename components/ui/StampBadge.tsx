type StampBadgeProps = {
  label: string;
};

export function StampBadge({ label }: StampBadgeProps) {
  return (
    <div className="pointer-events-none absolute right-4 top-5 rotate-[-8deg] border border-[rgba(255,23,68,0.45)] bg-[rgba(255,23,68,0.08)] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--mi9-red)]">
      {label}
    </div>
  );
}
