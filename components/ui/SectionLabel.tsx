import { cn } from "@/lib/utils";

type SectionLabelProps = {
  className?: string;
  tone?: "red" | "muted";
  text: string;
};

export function SectionLabel({
  className,
  text,
  tone = "red"
}: SectionLabelProps) {
  return (
    <p
      className={cn(
        "mb-5 text-[11px] uppercase tracking-[0.15em]",
        tone === "red"
          ? "text-[var(--mi9-red)]"
          : "text-[var(--mi9-white-muted)]",
        className
      )}
    >
      {text}
    </p>
  );
}
