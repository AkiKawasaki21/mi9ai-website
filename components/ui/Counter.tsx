"use client";

import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

type CounterProps = {
  description: string;
  duration?: number;
  suffix?: string;
  title: string;
  value: number;
};

export function Counter({
  description,
  duration = 1.4,
  suffix = "",
  title,
  value
}: CounterProps) {
  const hasAnimated = useRef(false);
  const reduceMotion = useReducedMotion();
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (latest) => {
      setDisplayValue(latest);
    });

    return unsubscribe;
  }, [rounded]);

  const startAnimation = () => {
    if (hasAnimated.current) {
      return;
    }

    hasAnimated.current = true;

    if (reduceMotion) {
      motionValue.set(value);
      return;
    }

    animate(motionValue, value, {
      duration,
      ease: [0.22, 1, 0.36, 1]
    });
  };

  return (
    <motion.div
      onViewportEnter={startAnimation}
      viewport={{ once: true, margin: "-100px" }}
      className="mi9-panel relative overflow-hidden rounded-[28px] border border-[var(--mi9-border)] p-6 md:p-7"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,23,68,0.12),transparent_35%)]" />
      <div className="relative">
        <p className="mb-4 text-[11px] uppercase tracking-[0.16em] text-[var(--mi9-white-muted)]">
          {title}
        </p>
        <div className="mb-4 font-display text-[clamp(72px,9vw,112px)] leading-none tracking-[0.04em] text-[var(--mi9-white)]">
          {displayValue}
          {suffix}
        </div>
        <p className="max-w-[28ch] text-sm leading-7 text-[var(--mi9-white-muted)]">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
