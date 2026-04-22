import { Building2, Laptop, RefreshCw } from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { StampBadge } from "@/components/ui/StampBadge";

const services = [
  {
    title: "BUSINESS DEPLOYMENT",
    stamp: "ACTIVE",
    description:
      "We map your operations and deploy OpenClaw or NemoClaw agents wired directly to your workflows. From client communication to internal task automation - built to your exact specification.",
    icon: Building2
  },
  {
    title: "PERSONAL SETUP",
    stamp: "PERSONAL RIG",
    description:
      "Want agents running on your own machine? We handle the full installation and configuration. You tell us what you want it to do - we make it work.",
    icon: Laptop
  },
  {
    title: "SUPPORT PLAN",
    stamp: "ONGOING OPS",
    description:
      "Stay on our monthly support plan. We add new agents, push updates, and keep your system optimized as your needs evolve.",
    icon: RefreshCw
  }
];

export function Services() {
  return (
    <section
      id="agents"
      className="relative pb-[clamp(44px,6vw,72px)] pt-[clamp(28px,4vw,48px)]"
    >
      <div className="mi9-shell">
        <Reveal>
          <SectionLabel text="// CAPABILITIES" />
          <h2 className="max-w-[12ch] font-display text-[clamp(36px,5vw,64px)] leading-[0.92]">
            WHAT WE SET UP FOR YOU.
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <Reveal
                key={service.title}
                delay={index * 0.1}
                className="mi9-panel group relative overflow-hidden rounded-[28px] border border-[var(--mi9-border)] p-7 transition duration-200 ease-out hover:-translate-y-1 hover:border-[rgba(255,23,68,0.4)]"
              >
                <StampBadge label={service.stamp} />
                <div className="mb-8 inline-flex h-12 w-12 items-center justify-center border border-[rgba(255,23,68,0.3)] bg-[rgba(255,23,68,0.07)] text-[var(--mi9-red)]">
                  <Icon size={22} />
                </div>
                <h3 className="max-w-[12ch] font-display text-[36px] leading-[0.95]">
                  {service.title}
                </h3>
                <p className="mt-5 text-sm leading-8 text-[var(--mi9-white-muted)]">
                  {service.description}
                </p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
