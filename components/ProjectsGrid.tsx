"use client";

import { useMemo, useState } from "react";
import { Github, ExternalLink, SlidersHorizontal } from "lucide-react";
import Link from "next/link";

type Project = {
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
  createdAt: string | Date;
};

type SortKey = "featured" | "order" | "newest" | "oldest";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured first" },
  { value: "order", label: "Custom order" },
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
];

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  const categories = useMemo(() => {
    const cats = Array.from(new Set(projects.map((p) => p.category)));
    return ["All", ...cats];
  }, [projects]);

  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState<SortKey>("featured");

  const displayed = useMemo(() => {
    let list =
      activeCategory === "All"
        ? [...projects]
        : projects.filter((p) => p.category === activeCategory);

    list.sort((a, b) => {
      switch (sortBy) {
        case "featured":
          return Number(b.featured) - Number(a.featured) || a.order - b.order;
        case "order":
          return a.order - b.order;
        case "newest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "oldest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
      }
    });

    return list;
  }, [projects, activeCategory, sortBy]);

  return (
    <>
      {/* Filters + sort bar */}
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
        {/* Category chips */}
        <div
          className="flex flex-wrap gap-2"
          role="tablist"
          aria-label="Filter by category"
        >
          {categories.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={activeCategory === c}
              onClick={() => setActiveCategory(c)}
              className={`cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                activeCategory === c
                  ? "bg-primary text-white"
                  : "border border-edge bg-surface text-ink-dim hover:border-primary-light/40 hover:text-ink"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Sort dropdown */}
        <div className="flex items-center gap-2 text-sm text-ink-dim">
          <SlidersHorizontal className="h-4 w-4 shrink-0" aria-hidden="true" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortKey)}
            aria-label="Sort projects"
            className="cursor-pointer rounded-xl border border-edge bg-surface px-3 py-1.5 text-sm text-ink-dim transition-all focus:border-primary-light/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value} className="bg-surface">
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Result count */}
      <p className="mb-6 text-xs text-ink-fade">
        {displayed.length} project{displayed.length !== 1 ? "s" : ""}
        {activeCategory !== "All" ? ` in ${activeCategory}` : ""}
      </p>

      {displayed.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-edge py-20 text-center">
          <p className="text-sm text-ink-dim">
            No projects in this category yet.
          </p>
        </div>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {displayed.map((p) => (
            <li key={p.id}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-edge bg-surface card-hover-border">
                {/* Visual header */}
                <div
                  className={`relative flex h-40 items-center justify-center bg-linear-to-br ${p.gradient}`}
                >
                  <div
                    className="absolute inset-0 opacity-20 bg-dot-grid"
                    aria-hidden="true"
                  />
                  <span
                    className="font-display text-4xl font-bold uppercase tracking-widest opacity-20"
                    aria-hidden="true"
                    style={{ color: p.accent }}
                  >
                    {p.title.split(" ")[0]}
                  </span>
                  <span
                    className="absolute right-4 top-4 rounded-full border px-3 py-1 text-xs font-semibold"
                    style={{
                      borderColor: `${p.accent}40`,
                      color: p.accent,
                      background: `${p.accent}15`,
                    }}
                  >
                    {p.category}
                  </span>
                  {p.featured && (
                    <span className="absolute left-4 top-4 rounded-full bg-amber-400/20 border border-amber-400/30 px-2.5 py-0.5 text-xs font-semibold text-amber-300">
                      Featured
                    </span>
                  )}
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-base font-semibold text-ink">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-dim">
                    {p.description}
                  </p>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-edge bg-overlay px-2.5 py-0.5 text-xs text-ink-fade"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Result + Links */}
                  <div className="mt-4 flex items-center gap-2 border-t border-edge pt-4">
                    <span
                      className="h-2 w-2 shrink-0 rounded-full bg-secondary"
                      aria-hidden="true"
                    />
                    <span className="flex-1 text-xs font-semibold text-secondary-light">
                      {p.result}
                    </span>
                    {p.repoUrl && (
                      <Link
                        href={p.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${p.title} GitHub repository`}
                        className="cursor-pointer rounded-md p-1 text-ink-fade transition-colors hover:text-ink"
                      >
                        <Github className="h-4 w-4" />
                      </Link>
                    )}
                    {p.liveUrl && (
                      <Link
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${p.title} live site`}
                        className="cursor-pointer rounded-md p-1 text-ink-fade transition-colors hover:text-ink"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
