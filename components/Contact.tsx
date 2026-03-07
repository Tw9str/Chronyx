"use client";

import { useState, type FormEvent } from "react";
import {
  Mail,
  MessageSquare,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Loader2,
} from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@chronyx.tech",
    href: "mailto:hello@chronyx.tech",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 000-0000",
    href: "tel:+15550000000",
  },
  { icon: MapPin, label: "Location", value: "Available Worldwide", href: null },
];

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

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    // ── Connect to your preferred form backend here ──
    // e.g. Resend, Formspree, or a Next.js Route Handler
    await new Promise((r) => setTimeout(r, 1400)); // simulated delay
    setStatus("success");
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden bg-surface py-24 md:py-32"
    >
      <div
        className="pointer-events-none absolute left-0 top-0 h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(124,58,237,0.3), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="section-container">
        {/* Header */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-primary-light">
            Get in Touch
          </span>
          <h2
            id="contact-heading"
            className="font-display text-4xl font-bold text-ink md:text-5xl"
          >
            Let&apos;s Build Something{" "}
            <span className="gradient-text">Extraordinary</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-dim">
            Have a project in mind? Fill out the form or send an email —
            I&apos;ll get back to you within 24 hours.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-5">
          {/* ── Contact info ── */}
          <aside className="lg:col-span-2">
            <div className="space-y-4">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                const content = (
                  <div className="flex items-center gap-4 rounded-2xl border border-edge bg-overlay p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15">
                      <Icon
                        className="h-5 w-5 text-primary-light"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <div className="text-xs font-medium uppercase tracking-wider text-ink-fade">
                        {item.label}
                      </div>
                      <div className="mt-0.5 text-sm font-semibold text-ink">
                        {item.value}
                      </div>
                    </div>
                  </div>
                );
                return item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block transition-all duration-200 hover:opacity-80"
                    aria-label={`${item.label}: ${item.value}`}
                  >
                    {content}
                  </a>
                ) : (
                  <div key={item.label}>{content}</div>
                );
              })}
            </div>

            {/* Social links */}
            <div className="mt-8 rounded-2xl border border-edge bg-overlay p-5">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink">
                <MessageSquare
                  className="h-4 w-4 text-primary-light"
                  aria-hidden="true"
                />
                Response Time
              </div>
              <p className="text-sm text-ink-dim">
                I typically respond to all enquiries within{" "}
                <strong className="text-ink">24 hours</strong>. For urgent
                projects, mention it in the message.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-secondary" />
                </span>
                <span className="text-xs font-semibold text-secondary-light">
                  Currently accepting new projects
                </span>
              </div>
            </div>
          </aside>

          {/* ── Form ── */}
          <div className="rounded-2xl border border-edge bg-overlay p-6 lg:col-span-3 md:p-8">
            {status === "success" ? (
              <div className="flex h-full min-h-100 flex-col items-center justify-center gap-4 text-center">
                <CheckCircle2
                  className="h-14 w-14 text-secondary"
                  aria-hidden="true"
                />
                <h3 className="font-display text-2xl font-bold text-ink">
                  Message Received!
                </h3>
                <p className="max-w-sm text-ink-dim">
                  Thank you for reaching out. I&apos;ll review your project
                  details and get back to you within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-2 rounded-full border border-edge px-6 py-2.5 text-sm font-medium text-ink-dim transition-all hover:border-primary-light/40 hover:text-ink"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                aria-label="Project enquiry form"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  {/* Name */}
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
                      className="w-full rounded-xl border border-edge bg-surface px-4 py-3 text-sm text-ink placeholder-ink-fade transition-all duration-200 focus:border-primary-light/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  {/* Email */}
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
                      className="w-full rounded-xl border border-edge bg-surface px-4 py-3 text-sm text-ink placeholder-ink-fade transition-all duration-200 focus:border-primary-light/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  {/* Project type */}
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
                      className="w-full rounded-xl border border-edge bg-surface px-4 py-3 text-sm text-ink transition-all duration-200 focus:border-primary-light/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
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

                  {/* Budget */}
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
                      className="w-full rounded-xl border border-edge bg-surface px-4 py-3 text-sm text-ink transition-all duration-200 focus:border-primary-light/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
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

                  {/* Message */}
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
                      placeholder="Tell me about your project — what you need, your timeline, and any other details…"
                      className="w-full resize-none rounded-xl border border-edge bg-surface px-4 py-3 text-sm text-ink placeholder-ink-fade transition-all duration-200 focus:border-primary-light/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-70 glow-violet"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2
                        className="h-4 w-4 animate-spin"
                        aria-hidden="true"
                      />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="h-4 w-4" aria-hidden="true" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
