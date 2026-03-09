import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PortfolioFilterGrid from "./PortfolioFilterGrid";
import { IcoArrowUpRight } from "@/components/icons";

const fallbackProjects = [
  {
    title: "FinFlow Dashboard",
    category: "Web App",
    description:
      "A real-time fintech analytics platform with live charts, multi-currency support, and role-based access control.",
    tags: ["Next.js", "TypeScript", "Prisma", "Recharts"],
    gradient: "from-violet-600/30 via-purple-900/20 to-canvas",
    accent: "#7c3aed",
    result: "+340% user retention",
    liveUrl: null as string | null,
    repoUrl: null as string | null,
  },
  {
    title: "Nomad Travel App",
    category: "Mobile App",
    description:
      "Cross-platform travel companion app with AI itinerary generation, offline maps, and social trip sharing.",
    tags: ["React Native", "Expo", "Supabase", "OpenAI"],
    gradient: "from-cyan-600/30 via-teal-900/20 to-canvas",
    accent: "#06b6d4",
    result: "4.8 App Store",
    liveUrl: null as string | null,
    repoUrl: null as string | null,
  },
  {
    title: "GreenMart E-commerce",
    category: "Web App",
    description:
      "A sustainable e-commerce platform with server-side rendering, dynamic inventory, Stripe payments, and a custom CMS.",
    tags: ["Next.js", "Stripe", "PostgreSQL", "Sanity"],
    gradient: "from-emerald-600/30 via-green-900/20 to-canvas",
    accent: "#10b981",
    result: "+200% revenue growth",
    liveUrl: null as string | null,
    repoUrl: null as string | null,
  },
  {
    title: "LaunchPad SaaS",
    category: "Web App",
    description:
      "No-code website builder SaaS with real-time collaboration, drag-and-drop editor, and white-label capabilities.",
    tags: ["React", "Node.js", "Redis", "AWS"],
    gradient: "from-orange-600/30 via-amber-900/20 to-canvas",
    accent: "#f59e0b",
    result: "2k+ active users",
    liveUrl: null as string | null,
    repoUrl: null as string | null,
  },
  {
    title: "PulseSEO Platform",
    category: "SEO & Marketing",
    description:
      "Full SEO audit, keyword tracking, and backlink monitoring tool with automated reporting for agencies.",
    tags: ["Python", "Next.js", "Google API", "Ahrefs"],
    gradient: "from-pink-600/30 via-rose-900/20 to-canvas",
    accent: "#ec4899",
    result: "3x organic traffic",
    liveUrl: null as string | null,
    repoUrl: null as string | null,
  },
  {
    title: "CreativeHub CMS",
    category: "Web App",
    description:
      "Headless CMS and portfolio platform for creatives with dynamic templates, custom domains, and analytics.",
    tags: ["Next.js", "Sanity", "Vercel", "Tailwind"],
    gradient: "from-indigo-600/30 via-blue-900/20 to-canvas",
    accent: "#6366f1",
    result: "10k+ portfolios hosted",
    liveUrl: null as string | null,
    repoUrl: null as string | null,
  },
];

export default async function Portfolio() {
  const dbProjects = await prisma.project
    .findMany({
      where: { featured: true },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      take: 6,
    })
    .catch(() => []);

  const projects =
    dbProjects.length > 0
      ? dbProjects.map((p) => ({
          id: p.id,
          title: p.title,
          category: p.category,
          description: p.description,
          tags: p.tags,
          gradient: p.gradient,
          accent: p.accent,
          result: p.result,
          liveUrl: p.liveUrl,
          repoUrl: p.repoUrl,
        }))
      : fallbackProjects;

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
            href="#calculator"
            className="inline-flex items-center gap-2 rounded-full border border-edge bg-surface px-5 py-2.5 text-sm font-medium text-ink-dim transition-all duration-200 hover:border-primary-light/40 hover:text-ink whitespace-nowrap"
          >
            Start a Project
            <IcoArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <PortfolioFilterGrid projects={projects} />

        {/* View all link */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/projects"
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-edge bg-surface px-6 py-3 text-sm font-medium text-ink-dim transition-all duration-200 hover:border-primary-light/40 hover:text-ink"
          >
            View All Projects
            <IcoArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
