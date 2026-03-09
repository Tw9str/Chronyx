"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
type IcoProps = React.SVGProps<SVGSVGElement>;
function MessageSquare({ className, ...r }: IcoProps) {
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
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
function Trash2({ className, ...r }: IcoProps) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" x2="10" y1="11" y2="17" />
      <line x1="14" x2="14" y1="11" y2="17" />
    </svg>
  );
}
function Eye({ className, ...r }: IcoProps) {
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
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function Archive({ className, ...r }: IcoProps) {
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
      <rect width="20" height="5" x="2" y="3" rx="1" />
      <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
      <path d="M10 12h4" />
    </svg>
  );
}
function RefreshCw({ className, ...r }: IcoProps) {
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
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
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
import Link from "next/link";

type MessageStatus = "UNREAD" | "READ" | "ARCHIVED";

interface Message {
  id: string;
  name: string;
  email: string;
  projectType: string | null;
  budget: string | null;
  message: string;
  status: MessageStatus;
  createdAt: string;
}

const STATUS_FILTERS = [
  { label: "All", value: "" },
  { label: "Unread", value: "UNREAD" },
  { label: "Read", value: "READ" },
  { label: "Archived", value: "ARCHIVED" },
];

const STATUS_BADGE: Record<MessageStatus, string> = {
  UNREAD: "bg-secondary/15 text-secondary-light border-secondary/30",
  READ: "bg-edge/50 text-ink-fade border-edge",
  ARCHIVED: "bg-overlay text-ink-fade border-edge",
};

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState("");
  const [selected, setSelected] = useState<Message | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);

  async function load(status = filter) {
    setLoading(true);
    try {
      const url = `/api/admin/messages${status ? `?status=${status}` : ""}`;
      const res = await fetch(url);
      const data = await res.json();
      setMessages(data.messages ?? []);
      setTotal(data.total ?? 0);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function updateStatus(id: string, status: MessageStatus) {
    setActionId(id);
    try {
      await fetch("/api/admin/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, status } : m)),
      );
      if (selected?.id === id) setSelected((p) => (p ? { ...p, status } : p));
    } finally {
      setActionId(null);
    }
  }

  async function deleteMessage(id: string) {
    if (!confirm("Delete this message permanently?")) return;
    setActionId(id);
    try {
      await fetch("/api/admin/messages", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setMessages((prev) => prev.filter((m) => m.id !== id));
      if (selected?.id === id) setSelected(null);
      setTotal((t) => t - 1);
    } finally {
      setActionId(null);
    }
  }

  function handleFilterChange(val: string) {
    setFilter(val);
    load(val);
  }

  return (
    <AdminShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-ink">
              Messages
            </h1>
            <p className="mt-0.5 text-sm text-ink-dim">
              {total} total enquiries
            </p>
          </div>
          <button
            onClick={() => load()}
            className="cursor-pointer flex items-center gap-2 rounded-xl border border-edge bg-surface px-3 py-2 text-sm text-ink-dim transition-all hover:text-ink"
            aria-label="Refresh messages"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>

        {/* Filter chips */}
        <div
          className="flex flex-wrap gap-2"
          role="tablist"
          aria-label="Filter by status"
        >
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.value}
              role="tab"
              aria-selected={filter === f.value}
              onClick={() => handleFilterChange(f.value)}
              className={`cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                filter === f.value
                  ? "bg-primary text-white"
                  : "border border-edge bg-surface text-ink-dim hover:text-ink"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-5">
          {/* ── Message list ─────────────────────── */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-edge bg-surface overflow-hidden">
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="h-6 w-6 animate-spin text-primary-light" />
                </div>
              ) : messages.length === 0 ? (
                <div className="flex flex-col items-center gap-2 py-16 text-center">
                  <MessageSquare className="h-8 w-8 text-ink-fade" />
                  <p className="text-sm text-ink-dim">No messages found.</p>
                </div>
              ) : (
                <ul
                  role="list"
                  className="divide-y divide-edge max-h-[calc(100vh-280px)] overflow-y-auto"
                >
                  {messages.map((msg) => (
                    <li key={msg.id}>
                      <button
                        onClick={() => {
                          setSelected(msg);
                          if (msg.status === "UNREAD")
                            updateStatus(msg.id, "READ");
                        }}
                        className={`cursor-pointer w-full text-left px-4 py-3.5 transition-all hover:bg-overlay ${
                          selected?.id === msg.id ? "bg-overlay" : ""
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-ink truncate">
                                {msg.name}
                              </span>
                              {msg.status === "UNREAD" && (
                                <span className="h-2 w-2 shrink-0 rounded-full bg-secondary" />
                              )}
                            </div>
                            <div className="text-xs text-ink-fade truncate">
                              {msg.email}
                            </div>
                            <div className="mt-1.5 text-xs text-ink-dim line-clamp-2">
                              {msg.message}
                            </div>
                          </div>
                          <span
                            className={`shrink-0 rounded-full border px-2 py-0.5 text-xs font-medium ${STATUS_BADGE[msg.status]}`}
                          >
                            {msg.status.toLowerCase()}
                          </span>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* ── Message detail ───────────────────── */}
          <div className="lg:col-span-3">
            {selected ? (
              <div className="rounded-2xl border border-edge bg-surface p-6">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 border-b border-edge pb-5">
                  <div>
                    <h2 className="font-display text-lg font-bold text-ink">
                      {selected.name}
                    </h2>
                    <Link
                      href={`mailto:${selected.email}`}
                      className="text-sm text-primary-light hover:underline"
                    >
                      {selected.email}
                    </Link>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {selected.projectType && (
                        <span className="rounded-full border border-edge bg-overlay px-2.5 py-0.5 text-xs text-ink-fade">
                          {selected.projectType}
                        </span>
                      )}
                      {selected.budget && (
                        <span className="rounded-full border border-edge bg-overlay px-2.5 py-0.5 text-xs text-ink-fade">
                          {selected.budget}
                        </span>
                      )}
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${STATUS_BADGE[selected.status]}`}
                      >
                        {selected.status.toLowerCase()}
                      </span>
                    </div>
                  </div>
                  <div className="text-right text-xs text-ink-fade">
                    {new Date(selected.createdAt).toLocaleString()}
                  </div>
                </div>

                {/* Body */}
                <div className="mt-5">
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-ink-dim">
                    {selected.message}
                  </p>
                </div>

                {/* Actions */}
                <div className="mt-6 flex flex-wrap gap-2 border-t border-edge pt-5">
                  <Link
                    href={`mailto:${selected.email}?subject=Re: Your enquiry via Chronyx`}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-primary-light glow-violet"
                  >
                    Reply via Email
                  </Link>

                  {selected.status !== "ARCHIVED" && (
                    <button
                      onClick={() => updateStatus(selected.id, "ARCHIVED")}
                      disabled={actionId === selected.id}
                      className="cursor-pointer inline-flex items-center gap-2 rounded-full border border-edge bg-overlay px-4 py-2 text-sm font-medium text-ink-dim transition-all hover:text-ink disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {actionId === selected.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Archive className="h-4 w-4" />
                      )}
                      Archive
                    </button>
                  )}

                  {selected.status === "ARCHIVED" && (
                    <button
                      onClick={() => updateStatus(selected.id, "READ")}
                      disabled={actionId === selected.id}
                      className="cursor-pointer inline-flex items-center gap-2 rounded-full border border-edge bg-overlay px-4 py-2 text-sm font-medium text-ink-dim transition-all hover:text-ink disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Eye className="h-4 w-4" /> Unarchive
                    </button>
                  )}

                  <button
                    onClick={() => deleteMessage(selected.id)}
                    disabled={actionId === selected.id}
                    className="cursor-pointer inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition-all hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Trash2 className="h-4 w-4" /> Delete
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-edge text-sm text-ink-fade">
                Select a message to view details
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
