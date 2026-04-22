import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TerminalWindow } from "@/components/ui/TerminalWindow";

export function WhatWeDo() {
  return (
    <section
      id="mission"
      className="relative pb-[clamp(36px,5vw,56px)] pt-[clamp(80px,10vw,140px)]"
    >
      <div className="mi9-shell">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.62fr)_minmax(320px,0.38fr)] lg:items-start">
          <Reveal>
            <SectionLabel text="// MISSION BRIEF" />
            <h2 className="max-w-[11ch] font-display text-[clamp(36px,5vw,64px)] leading-[0.92]">
              AI THAT ACTUALLY DOES THINGS.
            </h2>
            <p className="mt-6 max-w-[62ch] text-sm leading-8 text-[var(--mi9-white-muted)]">
              Most people still use AI like a search box. Useful, yes. But that
              is not where the leverage is. Agents are different: they take
              action, work through tasks, execute workflows, and keep moving when
              the job has more than one step.
            </p>
            <p className="mt-5 max-w-[62ch] text-sm leading-8 text-[var(--mi9-white-muted)]">
              MI9 handles the full deployment, configuration, and handoff so you
              do not have to learn the underlying stack just to benefit from it.
              You tell us what should happen. We wire the system that makes it
              happen.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <TerminalWindow />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
