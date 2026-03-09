"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
type IcoProps = React.SVGProps<SVGSVGElement>;
function Plus({ className, ...r }: IcoProps) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
function Pencil({ className, ...r }: IcoProps) {
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
      <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
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
function X({ className, ...r }: IcoProps) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
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
function Quote({ className, ...r }: IcoProps) {
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
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
    </svg>
  );
}
function Star({ className, ...r }: IcoProps) {
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
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
function ToggleLeft({ className, ...r }: IcoProps) {
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
      <rect width="20" height="12" x="2" y="6" rx="6" ry="6" />
      <circle cx="8" cy="12" r="2" />
    </svg>
  );
}
function ToggleRight({ className, ...r }: IcoProps) {
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
      <rect width="20" height="12" x="2" y="6" rx="6" ry="6" />
      <circle cx="16" cy="12" r="2" />
    </svg>
  );
}
function ChevronUp({ className, ...r }: IcoProps) {
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
      <path d="m18 15-6-6-6 6" />
    </svg>
  );
}
function ChevronDown({ className, ...r }: IcoProps) {
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
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string | null;
  quote: string;
  rating: number;
  avatar: string;
  project: string | null;
  enabled: boolean;
  order: number;
}

const EMPTY: Omit<Testimonial, "id"> = {
  name: "",
  role: "",
  company: null,
  quote: "",
  rating: 5,
  avatar: "",
  project: null,
  enabled: true,
  order: 0,
};

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Omit<Testimonial, "id"> | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [actionId, setActionId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/testimonials");
    const data = await res.json();
    setItems(data ?? []);
    setLoading(false);
  }
  useEffect(() => {
    load();
  }, []);

  function openCreate() {
    setEditId(null);
    setForm({ ...EMPTY, order: items.length });
  }
  function openEdit(t: Testimonial) {
    setEditId(t.id);
    const { id: _, ...rest } = t;
    setForm(rest);
  }
  function closeForm() {
    setForm(null);
    setEditId(null);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    const payload = {
      ...form,
      avatar: form.avatar || form.name.slice(0, 2).toUpperCase(),
    };
    try {
      if (editId) {
        const res = await fetch("/api/admin/testimonials", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editId, ...payload }),
        });
        const updated = await res.json();
        setItems((prev) => prev.map((x) => (x.id === editId ? updated : x)));
      } else {
        const res = await fetch("/api/admin/testimonials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const created = await res.json();
        setItems((prev) => [...prev, created]);
      }
      closeForm();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this testimonial permanently?")) return;
    setActionId(id);
    await fetch("/api/admin/testimonials", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setItems((prev) => prev.filter((x) => x.id !== id));
    setActionId(null);
  }

  async function toggleEnabled(t: Testimonial) {
    setActionId(t.id);
    const res = await fetch("/api/admin/testimonials", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: t.id, enabled: !t.enabled }),
    });
    const updated = await res.json();
    setItems((prev) => prev.map((x) => (x.id === t.id ? updated : x)));
    setActionId(null);
  }

  async function reorder(t: Testimonial, dir: "up" | "down") {
    const newOrder = dir === "up" ? t.order - 1 : t.order + 1;
    setActionId(t.id);
    const res = await fetch("/api/admin/testimonials", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: t.id, order: newOrder }),
    });
    const updated = await res.json();
    setItems((prev) =>
      prev
        .map((x) => (x.id === t.id ? updated : x))
        .sort((a, b) => a.order - b.order),
    );
    setActionId(null);
  }

  const F = form;

  return (
    <AdminShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-ink">
              Testimonials
            </h1>
            <p className="mt-0.5 text-sm text-ink-dim">
              {items.length} client reviews
            </p>
          </div>
          <button
            onClick={openCreate}
            className="flex cursor-pointer items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary-light glow-violet"
          >
            <Plus className="h-4 w-4" /> Add Testimonial
          </button>
        </div>

        {F && (
          <div className="rounded-2xl border border-primary/30 bg-surface p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-ink">
                {editId ? "Edit" : "New"} Testimonial
              </h2>
              <button
                onClick={closeForm}
                className="cursor-pointer text-ink-dim hover:text-ink"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSave} className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label">Name *</label>
                <input
                  required
                  value={F.name}
                  onChange={(e) => setForm({ ...F, name: e.target.value })}
                  className="input"
                  placeholder="Sarah Mitchell"
                />
              </div>
              <div>
                <label className="label">Role *</label>
                <input
                  required
                  value={F.role}
                  onChange={(e) => setForm({ ...F, role: e.target.value })}
                  className="input"
                  placeholder="CEO, TechStart Agency"
                />
              </div>
              <div>
                <label className="label">Company</label>
                <input
                  value={F.company ?? ""}
                  onChange={(e) =>
                    setForm({ ...F, company: e.target.value || null })
                  }
                  className="input"
                  placeholder="Acme Corp"
                />
              </div>
              <div>
                <label className="label">Project</label>
                <input
                  value={F.project ?? ""}
                  onChange={(e) =>
                    setForm({ ...F, project: e.target.value || null })
                  }
                  className="input"
                  placeholder="Web Redesign + SEO"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="label">Quote *</label>
                <textarea
                  required
                  rows={3}
                  value={F.quote}
                  onChange={(e) => setForm({ ...F, quote: e.target.value })}
                  className="input resize-none"
                  placeholder="Working with Chronyx was exceptional…"
                />
              </div>
              <div>
                <label className="label">Avatar (2 initials)</label>
                <input
                  value={F.avatar}
                  onChange={(e) => setForm({ ...F, avatar: e.target.value })}
                  className="input"
                  placeholder="SM (auto from name)"
                  maxLength={2}
                />
              </div>
              <div>
                <label className="label">Rating (1–5)</label>
                <input
                  type="number"
                  min={1}
                  max={5}
                  value={F.rating}
                  onChange={(e) =>
                    setForm({ ...F, rating: Number(e.target.value) })
                  }
                  className="input"
                />
              </div>
              <div>
                <label className="label">Display Order</label>
                <input
                  type="number"
                  min={0}
                  value={F.order}
                  onChange={(e) =>
                    setForm({ ...F, order: Number(e.target.value) })
                  }
                  className="input"
                />
              </div>
              <div className="flex items-center gap-3">
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={F.enabled}
                    onChange={(e) =>
                      setForm({ ...F, enabled: e.target.checked })
                    }
                    className="peer sr-only"
                  />
                  <div className="h-5 w-9 rounded-full bg-edge transition-all peer-checked:bg-primary after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-4" />
                  <span className="ml-2 text-sm font-medium text-ink-dim">
                    Visible on site
                  </span>
                </label>
              </div>
              <div className="flex gap-3 sm:col-span-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex cursor-pointer items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary-light disabled:opacity-60 glow-violet"
                >
                  {saving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  {saving ? "Saving…" : "Save"}
                </button>
                <button
                  type="button"
                  onClick={closeForm}
                  className="cursor-pointer rounded-full border border-edge px-6 py-2.5 text-sm font-medium text-ink-dim transition-all hover:text-ink"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-primary-light" />
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-edge py-16 text-center">
            <Quote className="h-8 w-8 text-ink-fade" />
            <p className="text-sm text-ink-dim">
              No testimonials yet. Add your first one!
            </p>
          </div>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
            {[...items]
              .sort((a, b) => a.order - b.order)
              .map((t) => (
                <li
                  key={t.id}
                  className={`rounded-2xl border bg-surface transition-opacity ${t.enabled ? "border-edge" : "border-edge/50 opacity-60"}`}
                >
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <div
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                        style={{
                          background: "linear-gradient(135deg,#7c3aed,#06b6d4)",
                        }}
                      >
                        {t.avatar || t.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-semibold text-ink truncate">
                          {t.name}
                        </div>
                        <div className="text-xs text-ink-fade truncate">
                          {t.role}
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star
                            key={i}
                            className="h-3 w-3 fill-amber-400 text-amber-400"
                          />
                        ))}
                      </div>
                    </div>
                    <p className="mt-3 text-xs leading-relaxed text-ink-dim line-clamp-3">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    {t.project && (
                      <div className="mt-2 text-xs text-ink-fade">
                        Project: {t.project}
                      </div>
                    )}
                    <div className="mt-4 flex items-center gap-2 border-t border-edge pt-3">
                      <button
                        onClick={() => reorder(t, "up")}
                        disabled={!!actionId}
                        title="Move up"
                        className="cursor-pointer rounded-lg border border-edge bg-overlay p-1.5 text-ink-dim hover:text-ink disabled:opacity-40"
                      >
                        <ChevronUp className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => reorder(t, "down")}
                        disabled={!!actionId}
                        title="Move down"
                        className="cursor-pointer rounded-lg border border-edge bg-overlay p-1.5 text-ink-dim hover:text-ink disabled:opacity-40"
                      >
                        <ChevronDown className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => openEdit(t)}
                        className="cursor-pointer flex items-center gap-1.5 rounded-lg border border-edge bg-overlay px-3 py-1.5 text-xs font-medium text-ink-dim transition-all hover:text-ink"
                      >
                        <Pencil className="h-3 w-3" /> Edit
                      </button>
                      <button
                        onClick={() => toggleEnabled(t)}
                        disabled={actionId === t.id}
                        className="cursor-pointer flex items-center gap-1.5 rounded-lg border border-edge bg-overlay px-3 py-1.5 text-xs font-medium text-ink-dim transition-all hover:text-secondary-light disabled:opacity-50"
                      >
                        {t.enabled ? (
                          <ToggleRight className="h-3 w-3 text-secondary" />
                        ) : (
                          <ToggleLeft className="h-3 w-3" />
                        )}
                        {t.enabled ? "Visible" : "Hidden"}
                      </button>
                      <button
                        onClick={() => handleDelete(t.id)}
                        disabled={actionId === t.id}
                        className="cursor-pointer ml-auto flex items-center gap-1.5 rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-1.5 text-xs font-medium text-red-400 transition-all hover:bg-red-500/15 disabled:opacity-50"
                      >
                        {actionId === t.id ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                          <Trash2 className="h-3 w-3" />
                        )}{" "}
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        )}
      </div>
    </AdminShell>
  );
}
