"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import {
  IcoPlus,
  IcoPencil,
  IcoTrash,
  IcoSave,
  IcoClose,
  IcoSpinner,
  IcoFolderKanban,
  IcoStar,
  IcoChevronUp,
  IcoChevronDown,
} from "@/components/icons";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  gradient: string;
  accent: string;
  result: string;
  liveUrl: string | null;
  repoUrl: string | null;
  featured: boolean;
  order: number;
}

const EMPTY: Omit<Project, "id"> = {
  title: "",
  category: "",
  description: "",
  tags: [],
  gradient: "from-violet-600/30 via-purple-900/20 to-canvas",
  accent: "#7c3aed",
  result: "",
  liveUrl: "",
  repoUrl: "",
  featured: false,
  order: 0,
};

const CATEGORIES = [
  "Web App",
  "Mobile App",
  "SEO & Marketing",
  "E-commerce",
  "SaaS",
  "Branding",
  "Other",
];

const GRADIENTS = [
  {
    label: "Violet",
    value: "from-violet-600/30 via-purple-900/20 to-canvas",
    accent: "#7c3aed",
  },
  {
    label: "Cyan",
    value: "from-cyan-600/30 via-teal-900/20 to-canvas",
    accent: "#06b6d4",
  },
  {
    label: "Green",
    value: "from-emerald-600/30 via-green-900/20 to-canvas",
    accent: "#10b981",
  },
  {
    label: "Orange",
    value: "from-orange-600/30 via-amber-900/20 to-canvas",
    accent: "#f59e0b",
  },
  {
    label: "Pink",
    value: "from-pink-600/30 via-rose-900/20 to-canvas",
    accent: "#ec4899",
  },
  {
    label: "Indigo",
    value: "from-indigo-600/30 via-blue-900/20 to-canvas",
    accent: "#6366f1",
  },
];

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Omit<Project, "id"> | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [actionId, setActionId] = useState<string | null>(null);
  const [tagsInput, setTagsInput] = useState("");

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/projects");
    const data = await res.json();
    setProjects(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function openCreate() {
    setEditId(null);
    setForm({ ...EMPTY });
    setTagsInput("");
  }

  function openEdit(p: Project) {
    setEditId(p.id);
    const { id: _, ...rest } = p;
    setForm({ ...rest });
    setTagsInput(p.tags.join(", "));
  }

  function closeForm() {
    setForm(null);
    setEditId(null);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const payload = { ...form, tags };

    try {
      if (editId) {
        const res = await fetch("/api/admin/projects", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editId, ...payload }),
        });
        const updated = await res.json();
        setProjects((prev) => prev.map((p) => (p.id === editId ? updated : p)));
      } else {
        const res = await fetch("/api/admin/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const created = await res.json();
        setProjects((prev) => [created, ...prev]);
      }
      closeForm();
    } finally {
      setSaving(false);
    }
  }

  async function reorder(p: Project, dir: "up" | "down") {
    const list = [...projects];
    const idx = list.findIndex((x) => x.id === p.id);
    const targetIdx = dir === "up" ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= list.length) return;
    [list[idx], list[targetIdx]] = [list[targetIdx], list[idx]];
    setActionId(p.id);
    await Promise.all([
      fetch("/api/admin/projects", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: list[idx].id, order: idx * 10 }),
      }),
      fetch("/api/admin/projects", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: list[targetIdx].id, order: targetIdx * 10 }),
      }),
    ]);
    setActionId(null);
    await load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this project permanently?")) return;
    setActionId(id);
    await fetch("/api/admin/projects", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setProjects((prev) => prev.filter((p) => p.id !== id));
    setActionId(null);
  }

  async function toggleFeatured(p: Project) {
    setActionId(p.id);
    const res = await fetch("/api/admin/projects", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: p.id, featured: !p.featured }),
    });
    const updated = await res.json();
    setProjects((prev) => prev.map((x) => (x.id === p.id ? updated : x)));
    setActionId(null);
  }

  const F = form; // shorthand

  return (
    <AdminShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-ink">
              Projects
            </h1>
            <p className="mt-0.5 text-sm text-ink-dim">
              {projects.length} portfolio items
            </p>
          </div>
          <button
            onClick={openCreate}
            className="flex cursor-pointer items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary-light glow-violet"
          >
            <IcoPlus className="h-4 w-4" /> Add Project
          </button>
        </div>

        {/* ── Create / Edit form ─────────────────────────── */}
        {F && (
          <div className="rounded-2xl border border-primary/30 bg-surface p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-ink">
                {editId ? "Edit Project" : "New Project"}
              </h2>
              <button
                onClick={closeForm}
                className="cursor-pointer text-ink-dim hover:text-ink"
                aria-label="Close form"
              >
                <IcoClose className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="grid gap-4 sm:grid-cols-2">
              {/* Title */}
              <div>
                <label className="label">Title *</label>
                <input
                  required
                  value={F.title}
                  onChange={(e) => setForm({ ...F, title: e.target.value })}
                  className="input"
                  placeholder="My Awesome Project"
                />
              </div>

              {/* Category */}
              <div>
                <label className="label">Category *</label>
                <select
                  required
                  value={F.category}
                  onChange={(e) => setForm({ ...F, category: e.target.value })}
                  className="input"
                >
                  <option value="">Select…</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c} className="bg-surface">
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div className="sm:col-span-2">
                <label className="label">Description *</label>
                <textarea
                  required
                  rows={3}
                  value={F.description}
                  onChange={(e) =>
                    setForm({ ...F, description: e.target.value })
                  }
                  className="input resize-none"
                  placeholder="Short project description…"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="label">Tags (comma-separated)</label>
                <input
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="input"
                  placeholder="Next.js, TypeScript, AWS"
                />
              </div>

              {/* Result */}
              <div>
                <label className="label">Key Result</label>
                <input
                  value={F.result}
                  onChange={(e) => setForm({ ...F, result: e.target.value })}
                  className="input"
                  placeholder="+200% revenue growth"
                />
              </div>

              {/* Gradient picker */}
              <div>
                <label className="label">Colour Scheme</label>
                <select
                  value={F.gradient}
                  onChange={(e) => {
                    const g = GRADIENTS.find((x) => x.value === e.target.value);
                    setForm({
                      ...F,
                      gradient: e.target.value,
                      accent: g?.accent ?? F.accent,
                    });
                  }}
                  className="input"
                >
                  {GRADIENTS.map((g) => (
                    <option
                      key={g.label}
                      value={g.value}
                      className="bg-surface"
                    >
                      {g.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Order */}
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

              {/* Live URL */}
              <div>
                <label className="label">Live URL</label>
                <input
                  type="url"
                  value={F.liveUrl ?? ""}
                  onChange={(e) =>
                    setForm({ ...F, liveUrl: e.target.value || null })
                  }
                  className="input"
                  placeholder="https://…"
                />
              </div>

              {/* Repo URL */}
              <div>
                <label className="label">Repo URL</label>
                <input
                  type="url"
                  value={F.repoUrl ?? ""}
                  onChange={(e) =>
                    setForm({ ...F, repoUrl: e.target.value || null })
                  }
                  className="input"
                  placeholder="https://github.com/…"
                />
              </div>

              {/* Featured toggle */}
              <div className="flex items-center gap-3 sm:col-span-2">
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={F.featured}
                    onChange={(e) =>
                      setForm({ ...F, featured: e.target.checked })
                    }
                    className="peer sr-only"
                  />
                  <div className="h-5 w-9 rounded-full bg-edge transition-all peer-checked:bg-primary after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-4" />
                  <span className="ml-2 text-sm font-medium text-ink-dim">
                    Featured on homepage
                  </span>
                </label>
              </div>

              {/* Submit */}
              <div className="flex gap-3 sm:col-span-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex cursor-pointer items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-60 glow-violet"
                >
                  {saving ? (
                    <IcoSpinner className="h-4 w-4 animate-spin" />
                  ) : (
                    <IcoSave className="h-4 w-4" />
                  )}
                  {saving ? "Saving…" : "Save Project"}
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

        {/* ── Projects list ──────────────────────────────── */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <IcoSpinner className="h-6 w-6 animate-spin text-primary-light" />
          </div>
        ) : projects.length === 0 ? (
          <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-edge py-16 text-center">
            <IcoFolderKanban className="h-8 w-8 text-ink-fade" />
            <p className="text-sm text-ink-dim">
              No projects yet. Add your first one!
            </p>
          </div>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
            {projects.map((p) => (
              <li
                key={p.id}
                className="group rounded-2xl border border-edge bg-surface card-hover-border"
              >
                {/* colour band */}
                <div
                  className={`h-2 rounded-t-2xl bg-linear-to-r ${p.gradient}`}
                  aria-hidden="true"
                />

                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-ink truncate">
                        {p.title}
                      </div>
                      <div className="text-xs text-ink-fade">{p.category}</div>
                    </div>
                    {p.featured && (
                      <IcoStar
                        className="h-4 w-4 shrink-0 fill-amber-400 text-amber-400"
                        aria-label="Featured"
                      />
                    )}
                  </div>

                  <p className="mt-2 text-xs leading-relaxed text-ink-dim line-clamp-2">
                    {p.description}
                  </p>

                  {p.result && (
                    <div className="mt-2 flex items-center gap-1.5">
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-secondary"
                        aria-hidden="true"
                      />
                      <span className="text-xs text-secondary-light">
                        {p.result}
                      </span>
                    </div>
                  )}

                  {p.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {p.tags.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-edge bg-overlay px-2 py-0.5 text-xs text-ink-fade"
                        >
                          {t}
                        </span>
                      ))}
                      {p.tags.length > 3 && (
                        <span className="text-xs text-ink-fade">
                          +{p.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="mt-4 flex items-center gap-2 border-t border-edge pt-3">
                    <button
                      onClick={() => reorder(p, "up")}
                      disabled={projects.indexOf(p) === 0 || actionId === p.id}
                      title="Move up"
                      className="cursor-pointer rounded-lg border border-edge bg-overlay p-1.5 text-ink-dim transition-all hover:text-ink disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <IcoChevronUp className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => reorder(p, "down")}
                      disabled={
                        projects.indexOf(p) === projects.length - 1 ||
                        actionId === p.id
                      }
                      title="Move down"
                      className="cursor-pointer rounded-lg border border-edge bg-overlay p-1.5 text-ink-dim transition-all hover:text-ink disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <IcoChevronDown className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => openEdit(p)}
                      className="cursor-pointer flex items-center gap-1.5 rounded-lg border border-edge bg-overlay px-3 py-1.5 text-xs font-medium text-ink-dim transition-all hover:text-ink"
                    >
                      <IcoPencil className="h-3 w-3" /> Edit
                    </button>

                    <button
                      onClick={() => toggleFeatured(p)}
                      disabled={actionId === p.id}
                      className="cursor-pointer flex items-center gap-1.5 rounded-lg border border-edge bg-overlay px-3 py-1.5 text-xs font-medium text-ink-dim transition-all hover:text-amber-400 disabled:opacity-50"
                    >
                      <IcoStar
                        className={`h-3 w-3 ${p.featured ? "fill-amber-400 text-amber-400" : ""}`}
                      />
                      {p.featured ? "Unfeature" : "Feature"}
                    </button>

                    <button
                      onClick={() => handleDelete(p.id)}
                      disabled={actionId === p.id}
                      className="ml-auto cursor-pointer flex items-center gap-1.5 rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-1.5 text-xs font-medium text-red-400 transition-all hover:bg-red-500/15 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {actionId === p.id ? (
                        <IcoSpinner className="h-3 w-3 animate-spin" />
                      ) : (
                        <IcoTrash className="h-3 w-3" />
                      )}
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
