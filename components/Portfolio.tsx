import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "FinFlow Dashboard",
    category: "Web App",
    desc: "A real-time fintech analytics platform with live charts, multi-currency support, and role-based access control.",
    tags: ["Next.js", "TypeScript", "Prisma", "Recharts"],
    gradient: "from-violet-600/30 via-purple-900/20 to-canvas",
    accent: "#7c3aed",
    result: "+340% user retention",
  },
  {
    title: "Nomad Travel App",
    category: "Mobile App",
    desc: "Cross-platform travel companion app with AI itinerary generation, offline maps, and social trip sharing.",
    tags: ["React Native", "Expo", "Supabase", "OpenAI"],
    gradient: "from-cyan-600/30 via-teal-900/20 to-canvas",
    accent: "#06b6d4",
    result: "4.8★ App Store",
  },
  {
    title: "GreenMart E-commerce",
    category: "Web App",
    desc: "A sustainable e-commerce platform with server-side rendering, dynamic inventory, Stripe payments, and a custom CMS.",
    tags: ["Next.js", "Stripe", "PostgreSQL", "Sanity"],
    gradient: "from-emerald-600/30 via-green-900/20 to-canvas",
    accent: "#10b981",
    result: "+200% revenue growth",
  },
  {
    title: "LaunchPad SaaS",
    category: "Web App",
    desc: "No-code website builder SaaS with real-time collaboration, drag-and-drop editor, and white-label capabilities.",
    tags: ["React", "Node.js", "Redis", "AWS"],
    gradient: "from-orange-600/30 via-amber-900/20 to-canvas",
    accent: "#f59e0b",
    result: "2k+ active users",
  },
  {
    title: "PulseSEO Platform",
    category: "SEO & Marketing",
    desc: "Full SEO audit, keyword tracking, and backlink monitoring tool with automated reporting for agencies.",
    tags: ["Python", "Next.js", "Google API", "Ahrefs"],
    gradient: "from-pink-600/30 via-rose-900/20 to-canvas",
    accent: "#ec4899",
    result: "3× organic traffic",
  },
  {
    title: "CreativeHub CMS",
    category: "Web App",
    desc: "Headless CMS and portfolio platform for creatives with dynamic templates, custom domains, and analytics.",
    tags: ["Next.js", "Sanity", "Vercel", "Tailwind"],
    gradient: "from-indigo-600/30 via-blue-900/20 to-canvas",
    accent: "#6366f1",
    result: "10k+ portfolios hosted",
  },
];

const categories = ["All", "Web App", "Mobile App", "SEO & Marketing"];

export default function Portfolio() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="relative overflow-hidden bg-canvas py-24 md:py-32"
    >
      {/* top glow line */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(6,182,212,0.4), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="section-container">
        {/* Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-secondary-light">
              Selected Work
            </span>
            <h2
              id="work-heading"
              className="font-display text-4xl font-bold text-ink md:text-5xl"
            >
              Projects That <span className="gradient-text">Speak Results</span>
            </h2>
          </div>
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-edge bg-surface px-5 py-2.5 text-sm font-medium text-ink-dim transition-all duration-200 hover:border-primary-light/40 hover:text-ink whitespace-nowrap"
          >
            Start a Project
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Filter chips (visual only) */}
        <div
          className="mb-10 flex flex-wrap gap-2"
          role="list"
          aria-label="Project categories"
        >
          {categories.map((c, i) => (
            <span
              key={c}
              role="listitem"
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                i === 0
                  ? "bg-primary text-white"
                  : "border border-edge bg-surface text-ink-dim"
              }`}
            >
              {c}
            </span>
          ))}
        </div>

        {/* Projects grid */}
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {projects.map((p) => (
            <li key={p.title}>
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
                  {/* Category badge */}
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
                    {p.desc}
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

                  {/* Result */}
                  <div className="mt-4 flex items-center gap-2 border-t border-edge pt-4">
                    <span
                      className="h-2 w-2 rounded-full bg-secondary"
                      aria-hidden="true"
                    />
                    <span className="text-xs font-semibold text-secondary-light">
                      {p.result}
                    </span>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
