"use client";

import { motion, useReducedMotion } from "framer-motion";

import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

const steps = [
  {
    number: "01",
    title: "BRIEFING",
    description:
      "You tell us your setup, goals, and environment. We listen more than we talk."
  },
  {
    number: "02",
    title: "ARCHITECTURE",
    description:
      "We design your agent configuration from scratch. No templates. Built for you."
  },
  {
    number: "03",
    title: "DEPLOYMENT",
    description:
      "Remote or in-person. Clean install. Every agent tested before handoff."
  },
  {
    number: "04",
    title: "GO LIVE",
    description:
      "Your agents are operational. We're on standby for support."
  }
];

export function HowItWorks() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="how-it-works"
      className="relative pb-[clamp(80px,10vw,120px)] pt-[clamp(28px,4vw,48px)]"
    >
      <div className="mi9-shell">
        <Reveal>
          <SectionLabel text="// OPERATION SEQUENCE" />
          <h2 className="max-w-[12ch] font-display text-[clamp(36px,5vw,64px)] leading-[0.92]">
            FOUR STEPS. THEN YOU&apos;RE LIVE.
          </h2>
        </Reveal>
        <div className="relative mt-16">
          <motion.svg
            viewBox="0 0 1000 60"
            className="pointer-events-none absolute left-0 top-14 hidden h-16 w-full lg:block"
            initial={reduceMotion ? false : { opacity: 0 }}
            whileInView={reduceMotion ? undefined : { opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.path
              d="M40 30 L960 30"
              fill="none"
              stroke="rgba(255,255,255,0.18)"
              strokeDasharray="10 12"
              strokeWidth="1.5"
              initial={reduceMotion ? false : { pathLength: 0 }}
              whileInView={reduceMotion ? undefined : { pathLength: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.svg>
          <motion.svg
            viewBox="0 0 60 760"
            className="pointer-events-none absolute left-4 top-8 h-[calc(100%-4rem)] w-10 lg:hidden"
            initial={reduceMotion ? false : { opacity: 0 }}
            whileInView={reduceMotion ? undefined : { opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.path
              d="M30 0 L30 720"
              fill="none"
              stroke="rgba(255,255,255,0.18)"
              strokeDasharray="10 12"
              strokeWidth="1.5"
              initial={reduceMotion ? false : { pathLength: 0 }}
              whileInView={reduceMotion ? undefined : { pathLength: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.svg>
          <div className="grid gap-8 lg:grid-cols-4">
            {steps.map((step, index) => (
              <Reveal
                key={step.number}
                delay={index * 0.1}
                className="relative pl-14 lg:pl-0 lg:pt-14"
              >
                <span className="absolute left-0 top-0 font-display text-[72px] leading-none text-[rgba(255,23,68,0.15)] lg:left-2">
                  {step.number}
                </span>
                <div className="mi9-panel relative rounded-[24px] border border-[var(--mi9-border)] p-6 lg:min-h-[240px]">
                  <p className="mb-4 text-[11px] uppercase tracking-[0.16em] text-[var(--mi9-red)]">
                    STEP {step.number}
                  </p>
                  <h3 className="font-display text-[30px] leading-[0.96]">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-sm leading-8 text-[var(--mi9-white-muted)]">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
