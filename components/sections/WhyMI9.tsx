import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function WhyMI9() {
  return (
    <section className="relative bg-[var(--mi9-navy)] py-[clamp(72px,8vw,108px)]">
      <div className="mi9-shell">
        <Reveal>
          <SectionLabel text="// INTEL" />
        </Reveal>
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="grid content-start gap-6">
            <Reveal className="h-full">
              <Counter
                title="FOUNDERS"
                value={2}
                duration={1.5}
                description="Founders. Zero middlemen. You work with the people who scope, build, and deliver the system directly."
              />
            </Reveal>
            <Reveal delay={0.15}>
              <p className="max-w-[44ch] text-sm leading-8 text-[rgba(237,238,245,0.78)]">
                We&apos;re not a software company with an AI services tab. This is
                what we do. Entirely.
              </p>
            </Reveal>
          </div>
          <div className="grid content-start gap-6">
            <Reveal delay={0.1}>
              <Counter
                title="CUSTOM"
                value={100}
                duration={2}
                suffix="%"
                description="Custom per client. No templates, no shortcuts, and no pretending one workflow looks like another."
              />
            </Reveal>
            <Reveal delay={0.2}>
              <Counter
                title="FOCUS"
                value={1}
                duration={1}
                description="Focus. OpenClaw and NemoClaw only. We go deep, not wide."
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
