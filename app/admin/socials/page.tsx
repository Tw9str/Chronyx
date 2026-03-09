"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import {
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
  Loader2,
  Link2,
  ToggleLeft,
  ToggleRight,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

interface SocialLink {
  id: string;
  platform: string;
  label: string;
  value: string;
  url: string;
  enabled: boolean;
  order: number;
  showInFooter: boolean;
  showInContact: boolean;
}

const PLATFORMS = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "x", label: "X / Twitter" },
  { value: "instagram", label: "Instagram" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "github", label: "GitHub" },
  { value: "youtube", label: "YouTube" },
  { value: "tiktok", label: "TikTok" },
  { value: "website", label: "Website" },
  { value: "other", label: "Other" },
];

const PLATFORM_ICONS: Record<string, string> = {
  email: "✉️",
  phone: "📞",
  whatsapp: "💬",
  x: "𝕏",
  instagram: "📸",
  linkedin: "in",
  github: "⌥",
  youtube: "▶",
  tiktok: "♪",
  website: "🌐",
  other: "🔗",
};

const EMPTY: Omit<SocialLink, "id"> = {
  platform: "email",
  label: "",
  value: "",
  url: "",
  enabled: true,
  order: 0,
  showInFooter: true,
  showInContact: true,
};

export default function AdminSocialsPage() {
  const [items, setItems] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Omit<SocialLink, "id"> | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [actionId, setActionId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/social-links");
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
  function openEdit(s: SocialLink) {
    setEditId(s.id);
    const { id: _, ...rest } = s;
    setForm({
      ...rest,
      showInFooter: rest.showInFooter ?? true,
      showInContact: rest.showInContact ?? true,
    });
  }
  function closeForm() {
    setForm(null);
    setEditId(null);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    try {
      if (editId) {
        const res = await fetch("/api/admin/social-links", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editId, ...form }),
        });
        const updated = await res.json();
        setItems((prev) => prev.map((x) => (x.id === editId ? updated : x)));
      } else {
        const res = await fetch("/api/admin/social-links", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
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
    if (!confirm("Delete this channel permanently?")) return;
    setActionId(id);
    await fetch("/api/admin/social-links", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setItems((prev) => prev.filter((x) => x.id !== id));
    setActionId(null);
  }

  async function toggleEnabled(s: SocialLink) {
    setActionId(s.id);
    const res = await fetch("/api/admin/social-links", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: s.id, enabled: !s.enabled }),
    });
    const updated = await res.json();
    setItems((prev) => prev.map((x) => (x.id === s.id ? updated : x)));
    setActionId(null);
  }

  async function reorder(s: SocialLink, dir: "up" | "down") {
    const newOrder = dir === "up" ? s.order - 1 : s.order + 1;
    setActionId(s.id);
    const res = await fetch("/api/admin/social-links", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: s.id, order: newOrder }),
    });
    const updated = await res.json();
    setItems((prev) =>
      prev
        .map((x) => (x.id === s.id ? updated : x))
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
              Contact Channels
            </h1>
            <p className="mt-0.5 text-sm text-ink-dim">
              Manage social links and contact info shown on the site
            </p>
          </div>
          <button
            onClick={openCreate}
            className="flex cursor-pointer items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary-light glow-violet"
          >
            <Plus className="h-4 w-4" /> Add Channel
          </button>
        </div>

        {F && (
          <div className="rounded-2xl border border-primary/30 bg-surface p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-ink">
                {editId ? "Edit" : "New"} Channel
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
                <label className="label">Platform *</label>
                <select
                  required
                  value={F.platform}
                  onChange={(e) => setForm({ ...F, platform: e.target.value })}
                  className="input cursor-pointer"
                >
                  {PLATFORMS.map((p) => (
                    <option
                      key={p.value}
                      value={p.value}
                      className="bg-surface"
                    >
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label">Label *</label>
                <input
                  required
                  value={F.label}
                  onChange={(e) => setForm({ ...F, label: e.target.value })}
                  className="input"
                  placeholder="Email, WhatsApp, etc."
                />
              </div>
              <div>
                <label className="label">Display Value</label>
                <input
                  value={F.value}
                  onChange={(e) => setForm({ ...F, value: e.target.value })}
                  className="input"
                  placeholder="hello@chronyx.tech or +1 555 0000"
                />
              </div>
              <div>
                <label className="label">URL *</label>
                <input
                  required
                  value={F.url}
                  onChange={(e) => setForm({ ...F, url: e.target.value })}
                  className="input"
                  placeholder="mailto:… or https://…"
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
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-medium text-ink-dim">
                  Show in
                </label>
                <div className="flex gap-4">
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      checked={F.showInFooter}
                      onChange={(e) =>
                        setForm({ ...F, showInFooter: e.target.checked })
                      }
                      className="peer sr-only"
                    />
                    <div className="relative h-5 w-9 rounded-full bg-edge transition-all peer-checked:bg-primary after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-4" />
                    <span className="text-sm font-medium text-ink-dim">
                      Footer
                    </span>
                  </label>
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      checked={F.showInContact}
                      onChange={(e) =>
                        setForm({ ...F, showInContact: e.target.checked })
                      }
                      className="peer sr-only"
                    />
                    <div className="relative h-5 w-9 rounded-full bg-edge transition-all peer-checked:bg-primary after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-4" />
                    <span className="text-sm font-medium text-ink-dim">
                      Contact
                    </span>
                  </label>
                </div>
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
            <Link2 className="h-8 w-8 text-ink-fade" />
            <p className="text-sm text-ink-dim">
              No channels yet. Add your first contact channel!
            </p>
          </div>
        ) : (
          <ul
            className="divide-y divide-edge overflow-hidden rounded-2xl border border-edge bg-surface"
            role="list"
          >
            {[...items]
              .sort((a, b) => a.order - b.order)
              .map((s) => (
                <li
                  key={s.id}
                  className={`flex items-center gap-4 px-4 py-3 transition-opacity ${s.enabled ? "" : "opacity-50"}`}
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary-light">
                    {PLATFORM_ICONS[s.platform] ?? "🔗"}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold text-ink">
                      {s.label}
                    </div>
                    <div className="truncate text-xs text-ink-fade">
                      {s.value || s.url}
                    </div>
                    <div className="mt-1 flex gap-1.5">
                      <span
                        className={`inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-semibold ${
                          s.showInFooter
                            ? "bg-primary/15 text-primary-light"
                            : "bg-edge text-ink-fade"
                        }`}
                      >
                        Footer
                      </span>
                      <span
                        className={`inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-semibold ${
                          s.showInContact
                            ? "bg-secondary/15 text-secondary-light"
                            : "bg-edge text-ink-fade"
                        }`}
                      >
                        Contact
                      </span>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-1.5">
                    <button
                      onClick={() => reorder(s, "up")}
                      disabled={!!actionId}
                      title="Move up"
                      className="cursor-pointer rounded-lg border border-edge bg-overlay p-1.5 text-ink-dim hover:text-ink disabled:opacity-40"
                    >
                      <ChevronUp className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => reorder(s, "down")}
                      disabled={!!actionId}
                      title="Move down"
                      className="cursor-pointer rounded-lg border border-edge bg-overlay p-1.5 text-ink-dim hover:text-ink disabled:opacity-40"
                    >
                      <ChevronDown className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => toggleEnabled(s)}
                      disabled={actionId === s.id}
                      title={s.enabled ? "Disable" : "Enable"}
                      className="cursor-pointer rounded-lg border border-edge bg-overlay p-1.5 text-ink-dim transition-all hover:text-secondary-light disabled:opacity-50"
                    >
                      {s.enabled ? (
                        <ToggleRight className="h-4 w-4 text-secondary" />
                      ) : (
                        <ToggleLeft className="h-4 w-4" />
                      )}
                    </button>
                    <button
                      onClick={() => openEdit(s)}
                      className="cursor-pointer flex items-center gap-1 rounded-lg border border-edge bg-overlay px-3 py-1.5 text-xs font-medium text-ink-dim hover:text-ink"
                    >
                      <Pencil className="h-3 w-3" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(s.id)}
                      disabled={actionId === s.id}
                      className="cursor-pointer flex items-center gap-1 rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-1.5 text-xs font-medium text-red-400 hover:bg-red-500/15 disabled:opacity-50"
                    >
                      {actionId === s.id ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <Trash2 className="h-3 w-3" />
                      )}
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        )}
      </div>
    </AdminShell>
  );
}
