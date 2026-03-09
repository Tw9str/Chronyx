"use client";

import { useState, useEffect, type FormEvent, type ChangeEvent } from "react";
import { IcoSpinner, IcoSend, IcoCheckCircle } from "@/components/icons";

const FALLBACK_EMAIL = "hello@chronyx.tech";

const budgets = [
  "< $1,000",
  "$1,000 – $5,000",
  "$5,000 – $10,000",
  "$10,000+",
  "Let's discuss",
];
const projectTypes = [
  "Web Development",
  "Mobile App",
  "SEO & Analytics",
  "Social Media",
  "Content Strategy",
  "Paid Advertising",
  "Full-Stack",
  "Other",
];

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm({ email }: { email?: string }) {
  const contactEmail = email ?? FALLBACK_EMAIL;
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [projectType, setProjectType] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    function handleCalculatorContact(e: Event) {
      const {
        type,
        budget: b,
        note,
      } = (e as CustomEvent<{ type: string; budget: string; note: string }>)
        .detail;
      if (type && projectTypes.includes(type)) setProjectType(type);
      if (b && budgets.includes(b)) setBudget(b);
      if (note) setMessage(note);
    }
    window.addEventListener("calculator:contact", handleCalculatorContact);
    return () =>
      window.removeEventListener("calculator:contact", handleCalculatorContact);
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    setFieldErrors({});
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          projectType: fd.get("type") || undefined,
          budget: fd.get("budget") || undefined,
          message: fd.get("message"),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setFieldErrors(data.fields ?? {});
        setErrorMsg(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex h-full min-h-100 flex-col items-center justify-center gap-4 text-center">
        <IcoCheckCircle className="h-14 w-14 text-secondary" aria-hidden="true" />
        <h3 className="font-display text-2xl font-bold text-ink">
          Message Received!
        </h3>
        <p className="max-w-sm text-ink-dim">
          Thank you for reaching out. We&apos;ll review your project details and
          get back to you within 24 hours.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 cursor-pointer rounded-full border border-edge px-6 py-2.5 text-sm font-medium text-ink-dim transition-all hover:border-primary-light/40 hover:text-ink"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Project enquiry form">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label
            htmlFor="cf-name"
            className="mb-1.5 block text-sm font-medium text-ink-dim"
          >
            Full Name{" "}
            <span aria-hidden="true" className="text-primary-light">
              *
            </span>
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Alex Johnson"
            className={`w-full rounded-xl border bg-surface px-4 py-3 text-sm text-ink placeholder-ink-fade transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 ${
              fieldErrors.name
                ? "border-red-500/60 focus:border-red-500/60"
                : "border-edge focus:border-primary-light/50"
            }`}
          />
          {fieldErrors.name && (
            <p className="mt-1.5 text-xs text-red-400">{fieldErrors.name}</p>
          )}
        </div>
        <div className="sm:col-span-1">
          <label
            htmlFor="cf-email"
            className="mb-1.5 block text-sm font-medium text-ink-dim"
          >
            Email{" "}
            <span aria-hidden="true" className="text-primary-light">
              *
            </span>
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="alex@example.com"
            className={`w-full rounded-xl border bg-surface px-4 py-3 text-sm text-ink placeholder-ink-fade transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 ${
              fieldErrors.email
                ? "border-red-500/60 focus:border-red-500/60"
                : "border-edge focus:border-primary-light/50"
            }`}
          />
          {fieldErrors.email && (
            <p className="mt-1.5 text-xs text-red-400">{fieldErrors.email}</p>
          )}
        </div>
        <div className="sm:col-span-1">
          <label
            htmlFor="cf-type"
            className="mb-1.5 block text-sm font-medium text-ink-dim"
          >
            Project Type
          </label>
          <select
            id="cf-type"
            name="type"
            value={projectType}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setProjectType(e.target.value)
            }
            className="w-full cursor-pointer rounded-xl border border-edge bg-surface px-4 py-3 text-sm text-ink transition-all duration-200 focus:border-primary-light/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="" className="bg-surface">
              Select type…
            </option>
            {projectTypes.map((t) => (
              <option key={t} value={t} className="bg-surface">
                {t}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-1">
          <label
            htmlFor="cf-budget"
            className="mb-1.5 block text-sm font-medium text-ink-dim"
          >
            Budget
          </label>
          <select
            id="cf-budget"
            name="budget"
            value={budget}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setBudget(e.target.value)
            }
            className="w-full cursor-pointer rounded-xl border border-edge bg-surface px-4 py-3 text-sm text-ink transition-all duration-200 focus:border-primary-light/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="" className="bg-surface">
              Select budget…
            </option>
            {budgets.map((b) => (
              <option key={b} value={b} className="bg-surface">
                {b}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="cf-message"
            className="mb-1.5 block text-sm font-medium text-ink-dim"
          >
            Message{" "}
            <span aria-hidden="true" className="text-primary-light">
              *
            </span>
          </label>
          <textarea
            id="cf-message"
            name="message"
            required
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us about your project — what you need, your timeline, and any other details…"
            className={`w-full resize-none rounded-xl border bg-surface px-4 py-3 text-sm text-ink placeholder-ink-fade transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 ${
              fieldErrors.message
                ? "border-red-500/60 focus:border-red-500/60"
                : "border-edge focus:border-primary-light/50"
            }`}
          />
          {fieldErrors.message && (
            <p className="mt-1.5 text-xs text-red-400">{fieldErrors.message}</p>
          )}
        </div>
      </div>

      {status === "error" &&
        errorMsg &&
        Object.keys(fieldErrors).length === 0 && (
          <div
            role="alert"
            className="mt-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400"
          >
            {errorMsg} Email us at{" "}
            <a
              href={`mailto:${contactEmail}`}
              className="underline underline-offset-2 hover:text-red-300"
            >
              {contactEmail}
            </a>{" "}
            if the problem persists.
          </div>
        )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-70 glow-violet"
      >
        {status === "sending" ? (
          <>
            <IcoSpinner className="h-4 w-4 animate-spin" aria-hidden="true" />{" "}
            Sending…
          </>
        ) : (
          <>
            Send Message{" "}
            <IcoSend className="h-4 w-4" aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  );
}
