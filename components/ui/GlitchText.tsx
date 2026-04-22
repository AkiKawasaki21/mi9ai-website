"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type GlitchTextProps = {
  className?: string;
  text: string;
};

export function GlitchText({ className, text }: GlitchTextProps) {
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    setArmed(true);
  }, []);

  return (
    <span
      className={cn("glitch", armed && "glitch-auto", className)}
      data-text={text}
      style={{ "--glitch-delay": "3s" } as CSSProperties}
    >
      {text}
    </span>
  );
}
