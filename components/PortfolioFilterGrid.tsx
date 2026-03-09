"use client";

import { useState } from "react";
import { IcoGithub, IcoExternalLink } from "@/components/icons";

type Project = {
  id?: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  gradient: string;
  accent: string;
  result: string;
  liveUrl: string | null;
  repoUrl: string | null;
};

export default function PortfolioFilterGrid({
  projects,
}: {
  projects: Project[];
}) {
  const categories = [
    "All",
    ...Array.from(new Set(projects.map((p) => p.category))),
  ];
  const [active, setActive] = useState("All");

  const displayed =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <>
      {/* Category filter chips */}
      <div
        className="mb-8 flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filter by category"
      >
        {categories.map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={active === c}
            onClick={() => setActive(c)}
            className={`cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
              active === c
                ? "bg-primary text-white"
                : "border border-edge bg-surface text-ink-dim hover:border-primary-light/40 hover:text-ink"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Projects grid */}
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" role="list">
        {displayed.map((p) => {
          const key = p.id ?? p.title;
          return (
            <li key={key}>
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
                      <a
                        href={p.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${p.title} GitHub repository`}
                        className="rounded-md p-1 text-ink-fade transition-colors hover:text-ink"
                      >
                        <IcoGithub className="h-4 w-4" aria-hidden="true" />
                      </a>
                    )}
                    {p.liveUrl && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${p.title} live site`}
                        className="rounded-md p-1 text-ink-fade transition-colors hover:text-ink"
                      >
                        <IcoExternalLink className="h-4 w-4" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </>
  );
}
