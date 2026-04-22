import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { StampBadge } from "@/components/ui/StampBadge";

type PricingProps = {
  onInitiate: () => void;
};

const tiers = [
  {
    name: "FIELD AGENT",
    subtitle: "Personal Setup",
    price: "$299",
    priceCaption: "one-time",
    details: [
      "1 agent installed + configured",
      "1-hour handoff call",
      "30 days of included support"
    ],
    cta: "[BEGIN MISSION]",
    featured: false
  },
  {
    name: "OPERATIVE",
    subtitle: "Recommended",
    price: "From $1,250",
    priceCaption: "based on deployment complexity",
    footnote:
      "Final price depends on workflow complexity. Most business deployments fall between $1,250 and $3,500.",
    details: [
      "Up to 3 agents",
      "Full workflow integration",
      "2-hour onboarding session",
      "90 days of support"
    ],
    cta: "[BEGIN MISSION]",
    featured: true
  },
  {
    name: "COMMAND",
    subtitle: "Enterprise",
    price: "Let's talk",
    details: [
      "Custom agent architecture",
      "Unlimited scope",
      "White-glove deployment",
      "Retainer available"
    ],
    cta: "[OPEN COMMS]",
    featured: false
  }
];

export function Pricing({ onInitiate }: PricingProps) {
  return (
    <section id="pricing" className="mi9-section relative">
      <div className="mi9-shell">
        <Reveal>
          <SectionLabel text="// MISSION TIERS" />
          <h2 className="max-w-[12ch] font-display text-[clamp(36px,5vw,64px)] leading-[0.92]">
            PICK YOUR OPERATION.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {tiers.map((tier, index) => (
            <Reveal
              key={tier.name}
              delay={index * 0.1}
              className={`mi9-panel relative overflow-hidden rounded-[28px] border p-7 ${
                tier.featured
                  ? "border-[rgba(255,23,68,0.45)] shadow-glow lg:-translate-y-3"
                  : "border-[var(--mi9-border)]"
              }`}
            >
              {tier.featured ? <StampBadge label="RECOMMENDED" /> : null}
              <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--mi9-red)]">
                {tier.subtitle}
              </p>
              <h3 className="mt-4 font-display text-[40px] leading-[0.94]">
                {tier.name}
              </h3>
              {"priceCaption" in tier ? (
                <div className="mt-6">
                  <p className="font-display text-[clamp(40px,5vw,56px)] leading-none text-[var(--mi9-white)]">
                    {tier.price}
                  </p>
                  <p className="mt-2 text-[13px] uppercase tracking-[0.15em] text-[var(--mi9-white-muted)]">
                    {tier.priceCaption}
                  </p>
                </div>
              ) : (
                <p className="mt-6 text-[13px] uppercase tracking-[0.15em] text-[var(--mi9-white-muted)]">
                  {tier.price}
                </p>
              )}
              <ul className="mt-8 space-y-4 text-sm leading-7 text-[var(--mi9-white-muted)]">
                {tier.details.map((detail) => (
                  <li key={detail} className="border-b border-[var(--mi9-border)] pb-4">
                    {detail}
                  </li>
                ))}
              </ul>
              {"footnote" in tier ? (
                <p className="mt-5 text-center text-[11px] leading-6 text-[var(--mi9-white-muted)]">
                  {tier.footnote}
                </p>
              ) : null}
              <Button className="mt-8 w-full justify-center" onClick={onInitiate}>
                {tier.cta}
              </Button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
