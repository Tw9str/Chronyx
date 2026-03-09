"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
type IcoProps = React.SVGProps<SVGSVGElement>;
function ExternalLink({ className, ...r }: IcoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...r}
    >
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}
function Save({ className, ...r }: IcoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...r}
    >
      <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
      <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" />
      <path d="M7 3v4a1 1 0 0 0 1 1h7" />
    </svg>
  );
}
function Loader2({ className, ...r }: IcoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...r}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
function BarChart3({ className, ...r }: IcoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...r}
    >
      <path d="M3 3v16a2 2 0 0 0 2 2h16" />
      <path d="M7 16V11" />
      <path d="M11 16V9" />
      <path d="M15 16V5" />
    </svg>
  );
}
import Link from "next/link";

const envVars = [
  { key: "DATABASE_URL", desc: "Neon PostgreSQL pooled connection string" },
  {
    key: "DIRECT_URL",
    desc: "Neon direct connection string (for Prisma migrations)",
  },
  { key: "JWT_SECRET", desc: "32-char random secret for JWT signing" },
  { key: "RESEND_API_KEY", desc: "Resend API key for sending OTP emails" },
  { key: "RESEND_FROM", desc: "Sender address shown in OTP emails" },
  {
    key: "ADMIN_EMAILS",
    desc: "Comma-separated list of authorised admin emails",
  },
  {
    key: "NEXT_PUBLIC_APP_URL",
    desc: "Public app URL (e.g. https://chronyx.tech)",
  },
];

const links = [
  { label: "Neon Console", href: "https://console.neon.tech" },
  { label: "Resend Dashboard", href: "https://resend.com" },
  { label: "Vercel Dashboard", href: "https://vercel.com/dashboard" },
];

export default function AdminSettingsPage() {
  const [stats, setStats] = useState({
    stat_projects: "",
    stat_clients: "",
    stat_years: "",
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((data: Record<string, string>) => {
        setStats({
          stat_projects: data.stat_projects ?? "",
          stat_clients: data.stat_clients ?? "",
          stat_years: data.stat_years ?? "",
        });
      })
      .catch(() => {});
  }, []);

  async function saveStats(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await fetch("/api/admin/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(stats),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <AdminShell>
      <div className="max-w-2xl space-y-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">Settings</h1>
          <p className="mt-1 text-sm text-ink-dim">
            Hero stats, environment variables, and useful links.
          </p>
        </div>

        {/* Hero Stats */}
        <div className="rounded-2xl border border-edge bg-surface overflow-hidden">
          <div className="border-b border-edge px-5 py-4 flex items-center gap-2">
            <BarChart3
              className="h-4 w-4 text-primary-light"
              aria-hidden="true"
            />
            <div>
              <h2 className="font-display text-sm font-semibold text-ink">
                Hero Stats
              </h2>
              <p className="mt-0.5 text-xs text-ink-fade">
                Override the numbers shown in the hero section. Leave blank to
                use live DB counts.
              </p>
            </div>
          </div>
          <form onSubmit={saveStats} className="p-5">
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-ink-dim">
                  Projects Delivered
                </label>
                <input
                  type="text"
                  value={stats.stat_projects}
                  onChange={(e) =>
                    setStats({ ...stats, stat_projects: e.target.value })
                  }
                  placeholder="Auto (from DB)"
                  className="w-full rounded-xl border border-edge bg-overlay px-3 py-2.5 text-sm text-ink placeholder-ink-fade focus:border-primary-light/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-ink-dim">
                  Happy Clients
                </label>
                <input
                  type="text"
                  value={stats.stat_clients}
                  onChange={(e) =>
                    setStats({ ...stats, stat_clients: e.target.value })
                  }
                  placeholder="e.g. 30+"
                  className="w-full rounded-xl border border-edge bg-overlay px-3 py-2.5 text-sm text-ink placeholder-ink-fade focus:border-primary-light/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-ink-dim">
                  Years Experience
                </label>
                <input
                  type="text"
                  value={stats.stat_years}
                  onChange={(e) =>
                    setStats({ ...stats, stat_years: e.target.value })
                  }
                  placeholder="e.g. 5+"
                  className="w-full rounded-xl border border-edge bg-overlay px-3 py-2.5 text-sm text-ink placeholder-ink-fade focus:border-primary-light/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={saving}
              className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-60 glow-violet"
            >
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              {saving ? "Saving..." : saved ? "Saved!" : "Save Stats"}
            </button>
          </form>
        </div>

        {/* Env vars reference */}
        <div className="rounded-2xl border border-edge bg-surface overflow-hidden">
          <div className="border-b border-edge px-5 py-4">
            <h2 className="font-display text-sm font-semibold text-ink">
              Required Environment Variables
            </h2>
            <p className="mt-0.5 text-xs text-ink-fade">
              Set these in{" "}
              <code className="rounded bg-overlay px-1.5 py-0.5 text-primary-light">
                .env.local
              </code>{" "}
              and in Vercel project settings.
            </p>
          </div>
          <ul className="divide-y divide-edge" role="list">
            {envVars.map((v) => (
              <li key={v.key} className="flex items-start gap-4 px-5 py-3.5">
                <code className="shrink-0 rounded bg-overlay px-2.5 py-1 text-xs font-bold text-primary-light">
                  {v.key}
                </code>
                <span className="text-sm text-ink-dim">{v.desc}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick links */}
        <div className="rounded-2xl border border-edge bg-surface p-5">
          <h2 className="mb-4 font-display text-sm font-semibold text-ink">
            External Services
          </h2>
          <div className="flex flex-col gap-2">
            {links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer flex items-center justify-between rounded-xl border border-edge bg-overlay px-4 py-3 text-sm text-ink-dim transition-all hover:border-primary-light/30 hover:text-ink"
              >
                {l.label}
                <ExternalLink
                  className="h-4 w-4 text-ink-fade"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </div>

        {/* Setup commands */}
        <div className="rounded-2xl border border-edge bg-surface p-5">
          <h2 className="mb-3 font-display text-sm font-semibold text-ink">
            Setup Commands
          </h2>
          <div className="space-y-2 text-xs">
            {[
              "npm install",
              "npx prisma generate",
              "npx prisma db push",
              "npx prisma db seed   # optional seed",
            ].map((cmd) => (
              <div
                key={cmd}
                className="flex items-center gap-2 rounded-lg bg-overlay px-3 py-2 font-mono text-primary-light"
              >
                <span className="text-ink-fade">$</span> {cmd}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
