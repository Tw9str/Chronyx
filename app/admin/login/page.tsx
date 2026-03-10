"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  IcoArrowRight,
  IcoCheckCircle,
  IcoMail,
  IcoSpinner,
} from "@/components/icons";

type Step = "email" | "otp" | "success";

export default function AdminLoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  async function handleRequestOtp(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error ?? "Failed to send code.");
      }
      setStep("otp");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: otp }),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error ?? "Invalid code.");
      }
      setStep("success");
      setTimeout(() => router.push("/admin"), 1000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setOtp("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-4">
      {/* Background glow */}
      <div
        className="pointer-events-none fixed left-1/2 top-1/3 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed inset-0 bg-dot-grid opacity-40"
        aria-hidden="true"
      />

      <div className="relative w-full max-w-sm">
        {/* Card */}
        <div className="glass rounded-2xl p-8">
          {/* Logo */}
          <div className="mb-8 flex flex-col items-center gap-2">
            <BrandMark />
            <div className="font-display text-lg font-bold text-ink">
              CHRONYX
            </div>
            <div className="text-xs text-ink-fade">Admin Panel</div>
          </div>

          {step === "success" ? (
            <div className="flex flex-col items-center gap-3 py-6 text-center">
              <IcoCheckCircle className="h-12 w-12 text-secondary" />
              <p className="font-semibold text-ink">Signed in! Redirecting…</p>
            </div>
          ) : step === "otp" ? (
            <>
              <h1 className="mb-1 text-center font-display text-xl font-bold text-ink">
                Enter your code
              </h1>
              <p className="mb-6 text-center text-sm text-ink-dim">
                We sent a 6-digit code to{" "}
                <span className="font-semibold text-ink">{email}</span>.<br />
                It expires in 10 minutes.
              </p>

              <form onSubmit={handleVerifyOtp}>
                <div className="mb-4">
                  <label
                    htmlFor="otp-code"
                    className="mb-1.5 block text-sm font-medium text-ink-dim"
                  >
                    6-digit code
                  </label>
                  <input
                    id="otp-code"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]{6}"
                    maxLength={6}
                    autoComplete="one-time-code"
                    autoFocus
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    placeholder="••••••"
                    className="w-full rounded-xl border border-edge bg-surface px-4 py-3 text-center font-display text-2xl font-bold tracking-[1rem] text-ink placeholder-ink-fade transition-all focus:border-primary-light/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    required
                  />
                </div>

                {error && (
                  <p
                    role="alert"
                    className="mb-3 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400"
                  >
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading || otp.length !== 6}
                  className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-white transition-all hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-60 glow-violet"
                >
                  {loading ? (
                    <IcoSpinner className="h-4 w-4 animate-spin" />
                  ) : (
                    <IcoArrowRight className="h-4 w-4" />
                  )}
                  {loading ? "Verifying…" : "Verify Code"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setStep("email");
                    setOtp("");
                    setError("");
                  }}
                  className="cursor-pointer mt-3 w-full text-center text-xs text-ink-fade hover:text-ink-dim"
                >
                  ← Use a different email
                </button>
              </form>
            </>
          ) : (
            <>
              <h1 className="mb-1 text-center font-display text-xl font-bold text-ink">
                Welcome back
              </h1>
              <p className="mb-6 text-center text-sm text-ink-dim">
                Enter your admin email to receive a one-time login code.
              </p>

              <form onSubmit={handleRequestOtp}>
                <div className="mb-4">
                  <label
                    htmlFor="admin-email"
                    className="mb-1.5 block text-sm font-medium text-ink-dim"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <IcoMail
                      className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-fade"
                      aria-hidden="true"
                    />
                    <input
                      id="admin-email"
                      type="email"
                      autoComplete="email"
                      autoFocus
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@yourdomain.com"
                      className="w-full rounded-xl border border-edge bg-surface py-3 pl-10 pr-4 text-sm text-ink placeholder-ink-fade transition-all focus:border-primary-light/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <p
                    role="alert"
                    className="mb-3 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400"
                  >
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading || !email}
                  className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-white transition-all hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-60 glow-violet"
                >
                  {loading ? (
                    <IcoSpinner className="h-4 w-4 animate-spin" />
                  ) : (
                    <IcoArrowRight className="h-4 w-4" />
                  )}
                  {loading ? "Sending code…" : "Send Login Code"}
                </button>
              </form>
            </>
          )}
        </div>

        <p className="mt-5 text-center text-xs text-ink-fade">
          Passwordless • Secure • No password to forget
        </p>
      </div>
    </div>
  );
}

function BrandMark() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 30 30"
      fill="none"
      aria-hidden="true"
    >
      <path d="M15 2L28 8.5V21.5L15 28L2 21.5V8.5L15 2Z" fill="url(#ll1)" />
      <path
        d="M15 8L21 11.5V18.5L15 22L9 18.5V11.5L15 8Z"
        fill="rgba(3,3,10,0.65)"
      />
      <path
        d="M15 10.5L18.5 12.5V16.5L15 18.5L11.5 16.5V12.5L15 10.5Z"
        fill="url(#ll2)"
      />
      <defs>
        <linearGradient
          id="ll1"
          x1="2"
          y1="2"
          x2="28"
          y2="28"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7c3aed" />
          <stop offset="1" stopColor="#06b6d4" />
        </linearGradient>
        <linearGradient
          id="ll2"
          x1="11.5"
          y1="10.5"
          x2="18.5"
          y2="18.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#a78bfa" />
          <stop offset="1" stopColor="#67e8f9" />
        </linearGradient>
      </defs>
    </svg>
  );
}
