"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import {
  IcoExternalLink,
  IcoSave,
  IcoSpinner,
  IcoBarChart,
} from "@/components/icons";

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
            <IcoBarChart
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
                <IcoSpinner className="h-4 w-4 animate-spin" />
              ) : (
                <IcoSave className="h-4 w-4" />
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
                <IcoExternalLink
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
