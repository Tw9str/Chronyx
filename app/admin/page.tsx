import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AdminShell from "@/components/admin/AdminShell";
import type { Metadata } from "next";
import Link from "next/link";
import {
  IcoMessageSquare,
  IcoMail,
  IcoFolderKanban,
  IcoClock,
} from "@/components/icons";

interface RecentMessage {
  id: string;
  name: string;
  email: string;
  projectType: string | null;
  status: string;
  createdAt: Date;
}

export const metadata: Metadata = { title: "Dashboard" };
export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const [totalMessages, unreadMessages, totalProjects, recentMessages] =
    await Promise.all([
      prisma.message.count(),
      prisma.message.count({ where: { status: "UNREAD" } }),
      prisma.project.count(),
      prisma.message.findMany({
        orderBy: { createdAt: "desc" },
        take: 6,
        select: {
          id: true,
          name: true,
          email: true,
          projectType: true,
          status: true,
          createdAt: true,
        },
      }),
    ]);

  const stats = [
    {
      label: "Total Messages",
      value: totalMessages,
      icon: IcoMessageSquare,
      color: "text-primary-light",
      bg: "bg-primary/10",
    },
    {
      label: "Unread",
      value: unreadMessages,
      icon: IcoMail,
      color: "text-secondary-light",
      bg: "bg-secondary/10",
      highlight: unreadMessages > 0,
    },
    {
      label: "Projects",
      value: totalProjects,
      icon: IcoFolderKanban,
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
  ];

  return (
    <AdminShell>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-ink-dim">
            Welcome back. Here&apos;s what&apos;s happening.
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid gap-4 sm:grid-cols-3">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className={`rounded-2xl border p-5 ${
                  s.highlight
                    ? "border-secondary/30 bg-secondary/5"
                    : "border-edge bg-surface"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.bg}`}
                  >
                    <Icon className={`h-5 w-5 ${s.color}`} />
                  </div>
                  {s.highlight && (
                    <span className="rounded-full bg-secondary/20 px-2 py-0.5 text-xs font-semibold text-secondary-light">
                      New
                    </span>
                  )}
                </div>
                <div className="mt-4 font-display text-3xl font-bold text-ink">
                  {s.value}
                </div>
                <div className="mt-0.5 text-sm text-ink-dim">{s.label}</div>
              </div>
            );
          })}
        </div>

        {/* Recent messages */}
        <div className="rounded-2xl border border-edge bg-surface">
          <div className="flex items-center justify-between border-b border-edge px-5 py-4">
            <h2 className="font-display text-sm font-semibold text-ink">
              Recent Messages
            </h2>
            <Link
              href="/admin/messages"
              className="text-xs text-primary-light hover:underline"
            >
              View all →
            </Link>
          </div>

          {recentMessages.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-12 text-center">
              <MessageSquare className="h-8 w-8 text-ink-fade" />
              <p className="text-sm text-ink-dim">No messages yet.</p>
            </div>
          ) : (
            <ul role="list" className="divide-y divide-edge">
              {recentMessages.map((msg: RecentMessage) => (
                <li
                  key={msg.id}
                  className="flex items-center justify-between gap-4 px-5 py-3.5"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                      style={{
                        background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                      }}
                      aria-hidden="true"
                    >
                      {msg.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-ink truncate">
                          {msg.name}
                        </span>
                        {msg.status === "UNREAD" && (
                          <span
                            className="h-2 w-2 shrink-0 rounded-full bg-secondary"
                            aria-label="Unread"
                          />
                        )}
                      </div>
                      <div className="text-xs text-ink-fade truncate">
                        {msg.email}
                      </div>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    {msg.projectType && (
                      <span className="hidden rounded-full border border-edge bg-overlay px-2 py-0.5 text-xs text-ink-fade sm:block">
                        {msg.projectType}
                      </span>
                    )}
                    <div className="flex items-center gap-1 text-xs text-ink-fade">
                      <IcoClock className="h-3 w-3" aria-hidden="true" />
                      {new Date(msg.createdAt).toLocaleString(undefined, {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </AdminShell>
  );
}
