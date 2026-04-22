import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

const operatives = [
  {
    name: "ALEKSA",
    role: "TECHNICAL LEAD",
    initials: "AV",
    bio: "Builds the installs, hardens the environment, and does not leave until the agents behave the way they should."
  },
  {
    name: "VANJA",
    role: "OUTREACH LEAD",
    initials: "O2",
    bio: "Runs discovery, shapes the engagement, and makes sure every deployment solves an operational problem worth solving."
  }
];

export function Team() {
  return (
    <section className="mi9-section relative">
      <div className="mi9-shell">
        <Reveal>
          <SectionLabel text="// OPERATIVES" />
          <h2 className="max-w-[12ch] font-display text-[clamp(36px,5vw,64px)] leading-[0.92]">
            TWO PEOPLE. TOTAL OWNERSHIP.
          </h2>
          <p className="mt-5 max-w-[56ch] text-sm leading-8 text-[var(--mi9-white-muted)]">
            You&apos;re not talking to a sales rep. You&apos;re working with the people
            who build and run your system.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {operatives.map((operative, index) => (
            <Reveal
              key={operative.name}
              delay={index * 0.1}
              className="mi9-panel rounded-[28px] border border-[var(--mi9-border)] p-7"
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-center">
                <div className="hex-avatar relative h-[150px] w-[130px] shrink-0 overflow-hidden border border-[rgba(255,23,68,0.35)] bg-[radial-gradient(circle_at_top,rgba(255,23,68,0.18),transparent_48%),linear-gradient(180deg,rgba(13,27,62,0.8),rgba(8,8,16,1))]">
                  <div className="absolute inset-0 mi9-grid bg-[length:32px_32px] opacity-40" />
                  <div className="absolute inset-0 flex items-center justify-center font-display text-[44px] tracking-[0.08em] text-[var(--mi9-white)]">
                    {operative.initials}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-[36px] leading-[0.94]">
                    {operative.name}
                  </h3>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-[var(--mi9-red)]">
                    {operative.role}
                  </p>
                  <p className="mt-5 max-w-[42ch] text-sm leading-8 text-[var(--mi9-white-muted)]">
                    {operative.bio}
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <a
                      className="inline-flex h-10 w-10 items-center justify-center border border-[var(--mi9-border)] text-[var(--mi9-white-muted)] transition-colors duration-200 hover:text-[var(--mi9-white)]"
                      href="#contact"
                      aria-label="Open contact section"
                      data-cursor="interactive"
                    >
                      <ArrowUpRight size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
