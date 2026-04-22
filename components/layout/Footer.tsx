const links = [
  { href: "#mission", label: "MISSION" },
  { href: "#agents", label: "AGENTS" },
  { href: "#pricing", label: "PRICING" },
  { href: "#contact", label: "CONTACT" }
];

export function Footer() {
  return (
    <footer className="border-t border-[rgba(255,23,68,0.4)] bg-[rgba(8,8,16,0.95)]">
      <div className="mi9-shell py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-1 font-display text-[28px] uppercase tracking-[0.08em]">
              <span>MI</span>
              <span className="relative inline-flex h-8 w-8 items-center justify-center">
                <span className="absolute inset-0 rounded-[4px] bg-[var(--mi9-red)]" />
                <span className="relative z-10 text-[var(--mi9-black)]">9</span>
              </span>
            </div>
            <p className="text-sm text-[var(--mi9-white-muted)]">
              We wire intelligence into your world.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-5 text-[12px] uppercase tracking-[0.18em] text-[var(--mi9-white-muted)]">
            {links.map((link) => (
              <a
                key={link.href}
                className="transition-colors duration-200 hover:text-[var(--mi9-white)]"
                href={link.href}
                data-cursor="interactive"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-2 border-t border-[var(--mi9-border)] pt-6 text-[11px] uppercase tracking-[0.16em] text-[var(--mi9-white-muted)] md:flex-row md:items-center md:justify-between">
          <span>MI9 / SIGNAL STABLE</span>
          <span>(C) MI9. ALL OPERATIONS CLASSIFIED.</span>
        </div>
      </div>
    </footer>
  );
}
