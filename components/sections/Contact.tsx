import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

type ContactProps = {
  onInitiate: () => void;
};

export function Contact({ onInitiate }: ContactProps) {
  return (
    <section id="contact" className="mi9-section relative">
      <div className="mi9-shell">
        <Reveal className="mi9-panel relative overflow-hidden rounded-[34px] border border-[var(--mi9-border)] px-6 py-10 md:px-10 md:py-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,23,68,0.16),transparent_34%)]" />
          <div className="relative">
            <SectionLabel text="// OPEN CHANNEL" />
            <h2 className="max-w-[12ch] font-display text-[clamp(36px,5vw,64px)] leading-[0.92]">
              READY TO RUN AN AGENT?
            </h2>
            <p className="mt-5 max-w-[58ch] text-sm leading-8 text-[var(--mi9-white-muted)]">
              Book a free 20-minute briefing call. No pitch deck. No pressure.
              Just a real conversation about what you need.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button onClick={onInitiate}>[INITIATE CONTACT]</Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
