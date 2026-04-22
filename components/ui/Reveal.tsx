"use client";

import type { HTMLMotionProps } from "framer-motion";
import { motion, useReducedMotion } from "framer-motion";

import { revealTransition, revealViewport } from "@/lib/motion";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
};

export function Reveal({
  children,
  delay = 0,
  transition,
  ...props
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 30 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={reduceMotion ? undefined : revealViewport}
      transition={
        reduceMotion
          ? undefined
          : {
              ...revealTransition,
              delay,
              ...transition
            }
      }
      {...props}
    >
      {children}
    </motion.div>
  );
}
