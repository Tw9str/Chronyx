"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  IcoLayoutDashboard,
  IcoMessageSquare,
  IcoFolderKanban,
  IcoLogOut,
  IcoMenu,
  IcoClose,
  IcoSettings,
  IcoQuote,
  IcoShare2,
} from "@/components/icons";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: IcoLayoutDashboard, exact: true },
  { href: "/admin/messages", label: "Messages", icon: IcoMessageSquare, exact: false },
  {
    href: "/admin/projects",
    label: "Projects",
    icon: IcoFolderKanban,
    exact: false,
  },
  {
    href: "/admin/testimonials",
    label: "Testimonials",
    icon: IcoQuote,
    exact: false,
  },
  { href: "/admin/socials", label: "Socials", icon: IcoShare2, exact: false },
  {
    href: "/admin/settings",
    label: "Settings",
    icon: IcoSettings,
    exact: false,
  },
];

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  function isActive(href: string, exact: boolean) {
    return exact ? pathname === href : pathname.startsWith(href);
  }

  return (
    <div className="flex h-screen overflow-hidden bg-canvas">
      {/* ── Mobile overlay ─────────────────────────── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Sidebar ────────────────────────────────── */}
      <aside
        id="admin-sidebar"
        className={`fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r border-edge bg-surface transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Admin navigation"
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-edge px-5">
          <Link href="/admin" className="flex items-center gap-2.5">
            <BrandMark />
            <div>
              <div className="font-display text-sm font-bold text-ink">
                CHRONYX
              </div>
              <div className="text-xs text-ink-fade">Admin Panel</div>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="cursor-pointer text-ink-dim hover:text-ink lg:hidden"
            aria-label="Close sidebar"
          >
            <IcoClose size={18} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto p-3" aria-label="Admin menu">
          <ul className="space-y-1" role="list">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href, item.exact);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                      active
                        ? "bg-primary/15 text-primary-light"
                        : "text-ink-dim hover:bg-overlay hover:text-ink"
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    <Icon size={17} aria-hidden="true" />
                    {item.label}
                    {active && (
                      <span
                        className="ml-auto h-1.5 w-1.5 rounded-full bg-primary-light"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div className="border-t border-edge p-3">
          <button
            onClick={handleLogout}
            className="cursor-pointer flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-dim transition-all duration-200 hover:bg-red-500/10 hover:text-red-400"
          >
            <IcoLogOut size={17} aria-hidden="true" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main area ──────────────────────────────── */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex h-16 items-center justify-between border-b border-edge bg-surface px-5 lg:px-6">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="cursor-pointer rounded-lg p-2 text-ink-dim hover:bg-overlay hover:text-ink lg:hidden"
            aria-label="Open sidebar"
            aria-expanded={sidebarOpen}
            aria-controls="admin-sidebar"
          >
            <IcoMenu size={20} />
          </button>

          <div className="flex items-center gap-3 lg:ml-auto">
            <div className="hidden items-center gap-2 text-sm text-ink-fade sm:flex">
              <Link
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-edge bg-overlay px-3 py-1.5 text-xs font-medium text-ink-dim transition-all hover:border-primary-light/30 hover:text-ink"
              >
                View Site ↗
              </Link>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main id="admin-main" className="flex-1 overflow-y-auto p-5 lg:p-7">
          {children}
        </main>
      </div>
    </div>
  );
}

function BrandMark() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 30 30"
      fill="none"
      aria-hidden="true"
    >
      <path d="M15 2L28 8.5V21.5L15 28L2 21.5V8.5L15 2Z" fill="url(#al1)" />
      <path
        d="M15 8L21 11.5V18.5L15 22L9 18.5V11.5L15 8Z"
        fill="rgba(3,3,10,0.65)"
      />
      <path
        d="M15 10.5L18.5 12.5V16.5L15 18.5L11.5 16.5V12.5L15 10.5Z"
        fill="url(#al2)"
      />
      <defs>
        <linearGradient
          id="al1"
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
          id="al2"
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
