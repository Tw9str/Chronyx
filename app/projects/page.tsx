import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import ProjectsGrid from "@/components/ProjectsGrid";

export const metadata = {
  title: "All Projects — Chronyx",
  description:
    "Browse all projects — filter by category and sort to find what matters most.",
};

const fallbackProjects = [
  {
    id: "f1",
    title: "FinFlow Dashboard",
    category: "Web App",
    description:
      "A real-time fintech analytics platform with live charts, multi-currency support, and role-based access control.",
    tags: ["Next.js", "TypeScript", "Prisma", "Recharts"],
    gradient: "from-violet-600/30 via-purple-900/20 to-canvas",
    accent: "#7c3aed",
    result: "+340% user retention",
    liveUrl: null,
    repoUrl: null,
    featured: false,
    order: 0,
    createdAt: new Date(),
  },
  {
    id: "f2",
    title: "Nomad Travel App",
    category: "Mobile App",
    description:
      "Cross-platform travel companion app with AI itinerary generation, offline maps, and social trip sharing.",
    tags: ["React Native", "Expo", "Supabase", "OpenAI"],
    gradient: "from-cyan-600/30 via-teal-900/20 to-canvas",
    accent: "#06b6d4",
    result: "4.8★ App Store",
    liveUrl: null,
    repoUrl: null,
    featured: false,
    order: 1,
    createdAt: new Date(),
  },
  {
    id: "f3",
    title: "GreenMart E-commerce",
    category: "Web App",
    description:
      "A sustainable e-commerce platform with server-side rendering, dynamic inventory, Stripe payments, and a custom CMS.",
    tags: ["Next.js", "Stripe", "PostgreSQL", "Sanity"],
    gradient: "from-emerald-600/30 via-green-900/20 to-canvas",
    accent: "#10b981",
    result: "+200% revenue growth",
    liveUrl: null,
    repoUrl: null,
    featured: false,
    order: 2,
    createdAt: new Date(),
  },
  {
    id: "f4",
    title: "LaunchPad SaaS",
    category: "Web App",
    description:
      "No-code website builder SaaS with real-time collaboration, drag-and-drop editor, and white-label capabilities.",
    tags: ["React", "Node.js", "Redis", "AWS"],
    gradient: "from-orange-600/30 via-amber-900/20 to-canvas",
    accent: "#f59e0b",
    result: "2k+ active users",
    liveUrl: null,
    repoUrl: null,
    featured: false,
    order: 3,
    createdAt: new Date(),
  },
  {
    id: "f5",
    title: "PulseSEO Platform",
    category: "SEO & Marketing",
    description:
      "Full SEO audit, keyword tracking, and backlink monitoring tool with automated reporting for agencies.",
    tags: ["Python", "Next.js", "Google API", "Ahrefs"],
    gradient: "from-pink-600/30 via-rose-900/20 to-canvas",
    accent: "#ec4899",
    result: "3× organic traffic",
    liveUrl: null,
    repoUrl: null,
    featured: false,
    order: 4,
    createdAt: new Date(),
  },
  {
    id: "f6",
    title: "CreativeHub CMS",
    category: "Web App",
    description:
      "Headless CMS and portfolio platform for creatives with dynamic templates, custom domains, and analytics.",
    tags: ["Next.js", "Sanity", "Vercel", "Tailwind"],
    gradient: "from-indigo-600/30 via-blue-900/20 to-canvas",
    accent: "#6366f1",
    result: "10k+ portfolios hosted",
    liveUrl: null,
    repoUrl: null,
    featured: false,
    order: 5,
    createdAt: new Date(),
  },
];

export default async function ProjectsPage() {
  const dbProjects = await prisma.project
    .findMany({
      orderBy: [{ featured: "desc" }, { order: "asc" }, { createdAt: "desc" }],
    })
    .catch(() => []);

  const projects =
    dbProjects.length > 0
      ? dbProjects.map((p) => ({ ...p, createdAt: p.createdAt.toISOString() }))
      : fallbackProjects.map((p) => ({
          ...p,
          createdAt: p.createdAt.toISOString(),
        }));

  return (
    <main className="min-h-screen bg-canvas">
      {/* Header */}
      <div className="relative overflow-hidden bg-surface py-20 md:py-28">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(124,58,237,0.4), transparent)",
          }}
          aria-hidden="true"
        />
        <div className="section-container">
          <span className="mb-4 block text-sm font-semibold uppercase tracking-widest text-secondary-light">
            All Work
          </span>
          <h1 className="font-display text-4xl font-bold text-ink md:text-5xl">
            Projects That <span className="gradient-text">Speak Results</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-ink-dim">
            Every project is built with precision, performance, and a clear
            outcome in mind.
          </p>
        </div>
      </div>

      {/* Grid with filter + sort */}
      <div className="section-container py-16 md:py-20">
        <div className="mb-8">
          <Link
            href="/#work"
            className="flex w-fit cursor-pointer items-center gap-2 text-sm font-medium text-ink-dim transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Home
          </Link>
        </div>
        <ProjectsGrid projects={projects} />
      </div>
    </main>
  );
}
