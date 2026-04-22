import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  variant?: "primary" | "ghost";
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function buttonStyles(
  variant: "primary" | "ghost" = "primary",
  className?: string
) {
  return cn(
    "inline-flex items-center justify-center rounded-none border px-5 py-3 text-[12px] font-medium uppercase tracking-[0.18em] transition duration-200 ease-out hover:-translate-y-0.5",
    variant === "primary"
      ? "border-[var(--mi9-red)] bg-[var(--mi9-red)] text-[var(--mi9-black)] hover:border-[var(--mi9-red-dim)] hover:bg-[var(--mi9-red-dim)]"
      : "border-[rgba(255,23,68,0.55)] bg-transparent text-[var(--mi9-white)] hover:border-[rgba(255,23,68,0.9)] hover:bg-[rgba(255,23,68,0.08)]",
    className
  );
}

export function Button({
  children,
  className,
  href,
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  const classes = buttonStyles(variant, className);

  if (href) {
    return (
      <a className={classes} href={href} data-cursor="interactive">
        {children}
      </a>
    );
  }

  return (
    <button
      className={classes}
      type={type}
      data-cursor="interactive"
      {...props}
    >
      {children}
    </button>
  );
}
