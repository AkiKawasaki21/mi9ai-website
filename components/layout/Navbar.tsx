"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { buttonStyles } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const links = [
  { href: "#mission", label: "MISSION" },
  { href: "#agents", label: "AGENTS" },
  { href: "#pricing", label: "PRICING" },
  { href: "#contact", label: "CONTACT" }
];

type NavbarProps = {
  onInitiate: () => void;
};

export function Navbar({ onInitiate }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.nav
        initial={reduceMotion ? false : { opacity: 0, y: -24 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={reduceMotion ? undefined : { duration: 0.7, delay: 0 }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-[var(--mi9-border)] bg-[rgba(8,8,16,0.9)] backdrop-blur-xl"
            : "bg-transparent"
        )}
      >
        <div className="mi9-shell flex h-[78px] items-center justify-between">
          <a
            className="inline-flex items-center gap-1 font-display text-[28px] uppercase tracking-[0.08em]"
            href="#top"
            data-cursor="interactive"
          >
            <span>MI</span>
            <span className="relative inline-flex h-8 w-8 items-center justify-center">
              <span className="absolute inset-0 rounded-[4px] bg-[var(--mi9-red)]" />
              <span className="relative z-10 text-[var(--mi9-black)]">9</span>
            </span>
          </a>
          <div className="hidden items-center gap-8 lg:flex">
            {links.map((link) => (
              <a
                key={link.href}
                className="text-[12px] uppercase tracking-[0.2em] text-[var(--mi9-white-muted)] transition-colors duration-200 hover:text-[var(--mi9-white)]"
                href={link.href}
                data-cursor="interactive"
              >
                {link.label}
              </a>
            ))}
            <button
              className={buttonStyles("primary")}
              onClick={onInitiate}
              type="button"
            >
              [INITIATE]
            </button>
          </div>
          <button
            className="inline-flex h-11 w-11 items-center justify-center border border-[var(--mi9-border)] text-[var(--mi9-white)] lg:hidden"
            onClick={() => setMenuOpen((current) => !current)}
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            data-cursor="interactive"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.nav>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: -24 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -24 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[rgba(8,8,16,0.98)] pt-[78px] backdrop-blur-2xl lg:hidden"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.12,
                    delayChildren: 0.08
                  }
                }
              }}
              className="mi9-shell flex h-full flex-col justify-center gap-5 pb-20"
            >
              {links.map((link) => (
                <motion.a
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  className="border-b border-[var(--mi9-border)] pb-4 font-display text-[42px] uppercase tracking-[0.08em]"
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.button
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className={buttonStyles("primary", "mt-6 w-full justify-center")}
                onClick={() => {
                  setMenuOpen(false);
                  onInitiate();
                }}
                type="button"
              >
                [INITIATE]
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
