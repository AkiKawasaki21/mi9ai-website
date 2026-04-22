"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/Button";
import { GlitchText } from "@/components/ui/GlitchText";

type HeroProps = {
  onInitiate: () => void;
};

type Particle = {
  accent: boolean;
  radius: number;
  vx: number;
  vy: number;
  x: number;
  y: number;
};

const heroLine =
  '"AI agents that handle your tasks, run your workflows, and keep operating while you focus on what actually matters. We handle the entire setup."';

const intelRows = [
  "Your inbox and comms, handled automatically",
  "Your workflows, running without you in the loop",
  "On your machine or in your business — we come to you",
  "We stay on until everything works the way it should"
];

export function Hero({ onInitiate }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduceMotion = useReducedMotion();
  const [typedLine, setTypedLine] = useState(reduceMotion ? heroLine : "");

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    let index = 0;
    const interval = window.setInterval(() => {
      index += 1;
      setTypedLine(heroLine.slice(0, index));

      if (index >= heroLine.length) {
        window.clearInterval(interval);
      }
    }, 22);

    return () => {
      window.clearInterval(interval);
    };
  }, [reduceMotion]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];

    const createParticles = () => {
      const count = window.innerWidth < 768 ? 30 : 54;

      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        radius: Math.random() * 1.7 + 0.8,
        accent: Math.random() < 0.1
      }));
    };

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      createParticles();
      drawFrame(false);
    };

    const drawFrame = (update: boolean) => {
      context.clearRect(0, 0, width, height);

      for (let index = 0; index < particles.length; index += 1) {
        const particle = particles[index];

        if (update) {
          particle.x += particle.vx;
          particle.y += particle.vy;

          if (particle.x < 0 || particle.x > width) {
            particle.vx *= -1;
          }

          if (particle.y < 0 || particle.y > height) {
            particle.vy *= -1;
          }
        }

        for (let targetIndex = index + 1; targetIndex < particles.length; targetIndex += 1) {
          const target = particles[targetIndex];
          const distance = Math.hypot(particle.x - target.x, particle.y - target.y);

          if (distance < 150) {
            const opacity = 1 - distance / 150;
            context.strokeStyle = particle.accent || target.accent
              ? `rgba(255, 23, 68, ${opacity * 0.18})`
              : `rgba(237, 238, 245, ${opacity * 0.12})`;
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(particle.x, particle.y);
            context.lineTo(target.x, target.y);
            context.stroke();
          }
        }

        context.fillStyle = particle.accent
          ? "rgba(255, 23, 68, 0.92)"
          : "rgba(237, 238, 245, 0.78)";
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      }
    };

    const animateFrame = () => {
      drawFrame(true);
      animationFrame = window.requestAnimationFrame(animateFrame);
    };

    resize();
    window.addEventListener("resize", resize);

    if (!reduceMotion) {
      animationFrame = window.requestAnimationFrame(animateFrame);
    }

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationFrame);
    };
  }, [reduceMotion]);

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        aria-hidden
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(8,8,16,0.22)_75%)]" />
      <div className="absolute left-6 top-28 z-10 text-[11px] uppercase tracking-[0.16em] text-[var(--mi9-white-muted)] md:left-8 md:top-32">
        40.6962° N / 73.9988° W
      </div>
      <div className="absolute right-6 top-28 z-10 flex items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-[var(--mi9-white-muted)] md:right-8 md:top-32">
        <span className="status-pulse h-2.5 w-2.5 rounded-full bg-[var(--mi9-red)]" />
        SIGNAL: ACTIVE
      </div>
      <div className="mi9-shell relative z-10 grid w-full items-end gap-12 pt-36 lg:grid-cols-[minmax(0,1fr)_320px] lg:pt-28">
        <div className="max-w-[760px]">
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={reduceMotion ? undefined : { duration: 0.7, delay: 0.15 }}
            className="mb-6 text-[11px] uppercase tracking-[0.18em] text-[var(--mi9-red)]"
          >
            {"// FIELD DEPLOYMENT CELL"}
          </motion.p>
          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={reduceMotion ? undefined : { duration: 0.7, delay: 0.3 }}
            className="max-w-[10ch] font-display text-[clamp(52px,8vw,96px)] leading-[0.9]"
          >
            <GlitchText text="WE DEPLOY AI AGENTS." />
          </motion.h1>
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={reduceMotion ? undefined : { duration: 0.7, delay: 0.45 }}
            className="mt-6 max-w-[58ch] text-sm leading-8 text-[var(--mi9-white-muted)] md:text-[15px]"
          >
            {typedLine}
            {!reduceMotion && typedLine.length < heroLine.length ? (
              <span className="animate-pulse text-[var(--mi9-red)]">_</span>
            ) : null}
          </motion.p>
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={reduceMotion ? undefined : { duration: 0.7, delay: 0.6 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <Button onClick={onInitiate}>[START A MISSION]</Button>
            <Button href="#how-it-works" variant="ghost">
              [SEE HOW IT WORKS]
            </Button>
          </motion.div>
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={reduceMotion ? undefined : { duration: 0.7, delay: 0.75 }}
            className="mx-auto mt-5 max-w-[520px] text-center text-[12px] leading-6 text-[var(--mi9-white-muted)]"
          >
            Built for small businesses, lean teams, and individuals who want AI
            doing real work — without the enterprise price tag.
          </motion.p>
        </div>
        <motion.aside
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={reduceMotion ? undefined : { duration: 0.7, delay: 0.75 }}
          className="mi9-panel hidden rounded-[30px] border border-[var(--mi9-border)] p-6 lg:block"
        >
          <p className="mb-4 text-[11px] uppercase tracking-[0.16em] text-[var(--mi9-red)]">
            {"// LIVE OPS STACK"}
          </p>
          <div className="space-y-4 text-sm text-[var(--mi9-white-muted)]">
            {intelRows.map((row, index) => (
              <div
                key={row}
                className="flex items-start gap-3 border-b border-[var(--mi9-border)] pb-4 last:border-b-0 last:pb-0"
              >
                <span className="font-display text-[28px] leading-none text-[rgba(255,23,68,0.25)]">
                  0{index + 1}
                </span>
                <span className="pt-1 leading-6 text-[var(--mi9-white)]">{row}</span>
              </div>
            ))}
          </div>
        </motion.aside>
      </div>
      <div className="absolute bottom-10 left-6 z-10 flex items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-[var(--mi9-white-muted)] md:left-8">
        <span className="client-dot h-2.5 w-2.5 rounded-full bg-[#70ff9f]" />
        ACCEPTING NEW CLIENTS - LIMITED SPOTS
      </div>
      <a
        href="#mission"
        className="absolute bottom-8 right-6 z-10 flex flex-col items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-[var(--mi9-white-muted)] md:right-8"
        data-cursor="interactive"
      >
        <span>SCROLL</span>
        <span className="relative h-20 w-px bg-[rgba(255,255,255,0.15)]">
          <span className="scroll-dot absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 rounded-full border border-[rgba(255,23,68,0.55)] bg-[var(--mi9-black)]" />
        </span>
        <ArrowDown size={14} />
      </a>
    </section>
  );
}
