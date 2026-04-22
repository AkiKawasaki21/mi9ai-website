"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { buttonStyles } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type FormValues = {
  email: string;
  message: string;
  name: string;
  type: "Business" | "Personal";
};

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const reduceMotion = useReducedMotion();
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const firstInputRef = useRef<HTMLInputElement | null>(null);
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      message: "",
      name: "",
      type: "Business"
    }
  });
  const {
    ref: nameInputRef,
    ...nameField
  } = register("name", {
    required: "Name is required."
  });

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    firstInputRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  const onSubmit = handleSubmit(async (values) => {
    setServerError("");
    setSuccessMessage("");

    const payloadBody = new URLSearchParams({
      email: values.email,
      message: values.message,
      name: values.name,
      type: values.type
    });

    const response = await fetch("/contact.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: payloadBody.toString()
    });

    const payload = (await response.json()) as { message?: string };

    if (!response.ok) {
      setServerError(payload.message ?? "Something interrupted the transmission.");
      return;
    }

    setSuccessMessage(payload.message ?? "Transmission received.");
    reset();
  });

  const fieldClassName =
    "mt-2 w-full border bg-[rgba(255,255,255,0.02)] px-4 py-3 text-sm text-[var(--mi9-white)] outline-none transition-colors duration-200 placeholder:text-[var(--mi9-white-muted)] focus:border-[rgba(255,23,68,0.65)]";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={reduceMotion ? undefined : { opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-[rgba(3,3,8,0.78)] px-4 py-8 backdrop-blur-xl"
        >
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 30 }}
            className="mi9-panel relative w-full max-w-[720px] border border-[var(--mi9-border)] p-6 md:p-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
          >
            <button
              className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center border border-[var(--mi9-border)] text-[var(--mi9-white-muted)] transition-colors duration-200 hover:text-[var(--mi9-white)]"
              onClick={onClose}
              type="button"
              aria-label="Close contact form"
              data-cursor="interactive"
            >
              <X size={16} />
            </button>
            <p className="mb-4 text-[11px] uppercase tracking-[0.16em] text-[var(--mi9-red)]">
              {"// OPEN CHANNEL"}
            </p>
            <h2
              id="contact-modal-title"
              className="max-w-[12ch] font-display text-[clamp(36px,5vw,64px)] leading-[0.92]"
            >
              INITIATE CONTACT.
            </h2>
            <p className="mt-3 max-w-[48ch] text-sm leading-7 text-[var(--mi9-white-muted)]">
              Tell MI9 what you need, where the agents will live, and what you
              want them handling first.
            </p>
            <form className="mt-8 grid gap-5" onSubmit={onSubmit}>
              <div className="grid gap-5 md:grid-cols-2">
                <label className="text-[11px] uppercase tracking-[0.16em] text-[var(--mi9-white-muted)]">
                  NAME
                  <input
                    {...nameField}
                    ref={(element) => {
                      nameInputRef(element);
                      firstInputRef.current = element;
                    }}
                    className={cn(
                      fieldClassName,
                      errors.name
                        ? "border-[rgba(255,23,68,0.75)]"
                        : "border-[var(--mi9-border)]"
                    )}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <span className="mt-2 block text-[11px] text-[var(--mi9-red)]">
                      {errors.name.message}
                    </span>
                  )}
                </label>
                <label className="text-[11px] uppercase tracking-[0.16em] text-[var(--mi9-white-muted)]">
                  EMAIL
                  <input
                    {...register("email", {
                      required: "Email is required.",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email address."
                      }
                    })}
                    className={cn(
                      fieldClassName,
                      errors.email
                        ? "border-[rgba(255,23,68,0.75)]"
                        : "border-[var(--mi9-border)]"
                    )}
                    placeholder="you@company.com"
                  />
                  {errors.email && (
                    <span className="mt-2 block text-[11px] text-[var(--mi9-red)]">
                      {errors.email.message}
                    </span>
                  )}
                </label>
              </div>
              <fieldset>
                <legend className="text-[11px] uppercase tracking-[0.16em] text-[var(--mi9-white-muted)]">
                  TYPE
                </legend>
                <div className="mt-3 flex flex-wrap gap-3">
                  {["Business", "Personal"].map((option) => (
                    <label
                      key={option}
                      className="flex items-center gap-3 border border-[var(--mi9-border)] px-4 py-3 text-sm text-[var(--mi9-white)]"
                    >
                      <input
                        {...register("type", { required: true })}
                        className="accent-[var(--mi9-red)]"
                        type="radio"
                        value={option}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <label className="text-[11px] uppercase tracking-[0.16em] text-[var(--mi9-white-muted)]">
                MESSAGE
                <textarea
                  {...register("message", {
                    required: "Tell us what you want the agents doing.",
                    minLength: {
                      value: 24,
                      message: "Give us a little more context so we can prep properly."
                    }
                  })}
                  className={cn(
                    fieldClassName,
                    "min-h-[160px] resize-none",
                    errors.message
                      ? "border-[rgba(255,23,68,0.75)]"
                      : "border-[var(--mi9-border)]"
                  )}
                  placeholder="What should the agents help with first?"
                />
                {errors.message && (
                  <span className="mt-2 block text-[11px] text-[var(--mi9-red)]">
                    {errors.message.message}
                  </span>
                )}
              </label>
              {serverError && (
                <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--mi9-red)]">
                  {serverError}
                </p>
              )}
              {successMessage && (
                <p className="text-[11px] uppercase tracking-[0.16em] text-[#73f29e]">
                  {successMessage}
                </p>
              )}
              <button
                className={buttonStyles("primary", "mt-2 w-full justify-center")}
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? "[TRANSMITTING]" : "[SUBMIT BRIEFING]"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
