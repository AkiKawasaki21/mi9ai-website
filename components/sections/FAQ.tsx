"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRef, useState } from "react";

import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "What exactly is an AI agent?",
    answer:
      "Think of an agent as AI with instructions, tools, and enough structure to complete real tasks. Instead of only answering prompts, it can handle multi-step work across your environment."
  },
  {
    question: "What's the difference between OpenClaw and NemoClaw?",
    answer:
      "OpenClaw is built for business workflow automation — connecting to external tools, managing pipelines, and running tasks across your existing systems. NemoClaw is designed for local deployment on personal machines, giving individuals a powerful private agent with no cloud dependency. During your briefing call, we assess your environment and recommend which is right for you — or whether a combination makes sense."
  },
  {
    question: "Do I need technical knowledge to use what you set up?",
    answer:
      "No. We handle the technical side. Your handoff is designed around daily use, not around asking you to become an infrastructure expert."
  },
  {
    question: "Can you do this remotely, or do you need to come in person?",
    answer:
      "Most deployments can be handled remotely. If your setup benefits from on-site work, MI9 can scope that separately."
  },
  {
    question: "How long does a typical deployment take?",
    answer:
      "Simple personal setups can move quickly. Larger business environments take longer because we map workflows, validate permissions, and test the agents before handoff."
  },
  {
    question: "What's included in the monthly support plan?",
    answer:
      "Ongoing tuning, updates, troubleshooting, new agent additions, and help adjusting the system as your workflows change."
  },
  {
    question: "How do I know if I need 1 agent or multiple?",
    answer:
      "That depends on the number of workflows and how specialized they need to be. We usually identify the cleanest starting point during the initial briefing call."
  },
  {
    question: "How do I get started?",
    answer:
      "Hit the INITIATE CONTACT button at the bottom of the page. We'll ask you a few quick questions about your setup and goals, then schedule a free 20-minute briefing call. No pitch. No deck. Just a real conversation about whether we're the right fit."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });

  return (
    <section className="mi9-section relative">
      <div className="mi9-shell">
        <Reveal>
          <SectionLabel text="// CLASSIFIED" />
          <h2
            ref={titleRef}
            className={cn(
              "redaction-title font-display text-[clamp(36px,5vw,64px)] leading-[0.92]",
              titleInView && "is-visible"
            )}
          >
            QUESTIONS BEFORE YOU GO LIVE.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-4">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <Reveal key={item.question} delay={index * 0.04}>
                <div className="mi9-panel overflow-hidden rounded-[22px] border border-[var(--mi9-border)]">
                  <button
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-sm uppercase tracking-[0.08em] text-[var(--mi9-white)] md:px-6"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    type="button"
                    data-cursor="interactive"
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-[var(--mi9-red)] transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="border-t border-[var(--mi9-border)] px-5 py-5 text-sm leading-8 text-[var(--mi9-white-muted)] md:px-6">
                          {item.answer}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
