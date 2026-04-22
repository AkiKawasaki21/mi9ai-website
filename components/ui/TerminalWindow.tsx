"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

const defaultLines = [
  "mi9_agent_v2 initialized",
  "scanning client workflow...",
  "mapping task dependencies...",
  "agent_01: ACTIVE",
  "agent_02: STANDBY",
  "queue: 14 tasks pending",
  "executing: email_handler...",
  "task complete. next in 3s"
];

type TerminalWindowProps = {
  className?: string;
  lines?: string[];
};

export function TerminalWindow({
  className,
  lines = defaultLines
}: TerminalWindowProps) {
  const reduceMotion = useReducedMotion();
  const [history, setHistory] = useState<string[]>(
    reduceMotion ? lines.slice(0, 6) : []
  );
  const [currentLine, setCurrentLine] = useState("");
  const lineIndex = useRef(0);
  const charIndex = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const palette = useMemo(
    () => ({
      base: "text-[#8dfca8]",
      dim: "text-[#58c975]"
    }),
    []
  );

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const tick = () => {
      const line = lines[lineIndex.current];

      if (charIndex.current < line.length) {
        charIndex.current += 1;
        setCurrentLine(line.slice(0, charIndex.current));
        timeoutRef.current = setTimeout(tick, 28);
        return;
      }

      setHistory((previous) => [...previous.slice(-5), line]);
      setCurrentLine("");
      charIndex.current = 0;
      lineIndex.current = (lineIndex.current + 1) % lines.length;
      timeoutRef.current = setTimeout(tick, 900);
    };

    timeoutRef.current = setTimeout(tick, 500);

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [lines, reduceMotion]);

  return (
    <div
      className={cn(
        "mi9-panel relative overflow-hidden rounded-[26px] border border-[var(--mi9-border)] shadow-[0_25px_80px_rgba(0,0,0,0.35)]",
        className
      )}
    >
      <div className="flex items-center gap-2 border-b border-[var(--mi9-border)] bg-[rgba(255,255,255,0.03)] px-5 py-4">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#ffbd2f]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-[10px] uppercase tracking-[0.18em] text-[var(--mi9-white-muted)]">
          LIVE AGENT LOG
        </span>
      </div>
      <div className="relative h-[360px] overflow-hidden bg-[#050907] px-5 py-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(38,255,120,0.08),transparent_42%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,255,123,0.04),transparent_20%,transparent_80%,rgba(0,255,123,0.03))]" />
        <div className="relative space-y-2 text-[13px] leading-6">
          {history.map((line, index) => (
            <p
              key={`${line}-${index}`}
              className={index % 3 === 0 ? palette.base : palette.dim}
            >
              &gt; {line}
            </p>
          ))}
          {!reduceMotion && (
            <p className="text-[#8dfca8]">
              &gt; {currentLine}
              <span className="animate-pulse text-[#d9ffe5]">_</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
