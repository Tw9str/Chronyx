import Link from "next/link";
import { prisma } from "@/lib/prisma";

const techs = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "React Native",
  "Flutter",
  "Tailwind CSS",
  "PostgreSQL",
  "AWS",
  "Docker",
  "Figma",
  "Google Ads",
  "Meta Ads",
  "SEO",
  "Framer",
];

export default async function Hero() {
  const [settings, projectCount] = await Promise.all([
    prisma.setting
      .findMany({
        where: { key: { in: ["stat_projects", "stat_clients", "stat_years"] } },
      })
      .catch(() => []),
    prisma.project.count().catch(() => 0),
  ]);
  const getStat = (key: string) =>
    settings.find((s) => s.key === key)?.value ?? "";
  const stats = [
    {
      value:
        getStat("stat_projects") ||
        (projectCount > 0 ? `${projectCount}+` : "50+"),
      label: "Projects Delivered",
    },
    { value: getStat("stat_clients") || "30+", label: "Happy Clients" },
    { value: getStat("stat_years") || "5+", label: "Years Experience" },
  ];
  return (
    <section
      id="hero"
      aria-label="Hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-canvas"
    >
      {/* ── Background layers ── */}
      <div
        className="pointer-events-none absolute inset-0 bg-dot-grid opacity-60"
        aria-hidden="true"
      />

      {/* Violet glow – top-left */}
      <div
        className="pointer-events-none absolute -left-40 -top-40 h-175 w-175 rounded-full opacity-50"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      {/* Cyan glow – bottom-right */}
      <div
        className="pointer-events-none absolute -bottom-32 -right-32 h-125 w-125 rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(6,182,212,0.14) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* ── Content ── */}
      <div className="section-container relative w-full pb-16 pt-32 md:pt-40">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Left column */}
          <div>
            {/* Available badge */}
            <div
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-edge bg-surface px-4 py-2 text-sm font-medium text-ink-dim animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-secondary" />
              </span>
              Available for new projects
            </div>

            {/* Headline */}
            <h1
              className="font-display text-5xl font-bold leading-tight tracking-tight text-ink md:text-6xl lg:text-7xl animate-fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              Turning Ideas Into <br className="hidden sm:block" />
              <span className="gradient-text">Digital Experiences</span>
            </h1>

            {/* Description */}
            <p
              className="mt-6 max-w-xl text-lg leading-relaxed text-ink-dim animate-fade-up"
              style={{ animationDelay: "0.35s" }}
            >
              Full-stack developer &amp; digital strategist helping brands grow
              online through cutting-edge web apps, mobile solutions, SEO, and
              performance marketing.
            </p>

            {/* CTA Buttons */}
            <div
              className="mt-8 flex flex-wrap gap-4 animate-fade-up"
              style={{ animationDelay: "0.5s" }}
            >
              <Link
                href="#work"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-primary-light glow-violet"
              >
                View Our Work
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M1 7H13M13 7L7 1M13 7L7 13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>

              <Link
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-edge bg-surface px-7 py-3.5 text-sm font-semibold text-ink transition-all duration-200 hover:border-primary-light/40 hover:bg-overlay"
              >
                Get a Quote
              </Link>
            </div>

            {/* Stats */}
            <div
              className="mt-12 flex flex-wrap gap-8 border-t border-edge pt-8 animate-fade-up"
              style={{ animationDelay: "0.65s" }}
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-3xl font-bold text-ink">
                    {s.value}
                  </div>
                  <div className="mt-0.5 text-sm text-ink-fade">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column – floating card */}
          <div
            className="hidden lg:flex lg:justify-end animate-fade-in"
            style={{ animationDelay: "0.6s" }}
          >
            <div className="relative w-full max-w-sm">
              {/* Main card */}
              <div className="glass rounded-2xl p-6 glow-violet animate-float">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/20">
                    <span className="text-lg" aria-hidden="true">
                      📈
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-ink">
                      Project Metrics
                    </div>
                    <div className="text-xs text-ink-fade">Last 3 months</div>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    {
                      label: "Organic Traffic",
                      value: "+127%",
                      fill: 87,
                      color: "bg-primary",
                    },
                    {
                      label: "Conversion Rate",
                      value: "+85%",
                      fill: 68,
                      color: "bg-secondary",
                    },
                    {
                      label: "Revenue Growth",
                      value: "+200%",
                      fill: 95,
                      color: "bg-primary-light",
                    },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="mb-1 flex justify-between text-xs">
                        <span className="text-ink-dim">{item.label}</span>
                        <span className="font-semibold text-ink">
                          {item.value}
                        </span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-edge">
                        <div
                          className={`h-full rounded-full ${item.color}`}
                          style={{ width: `${item.fill}%` }}
                          role="presentation"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mini badge card */}
              <div
                className="glass absolute -bottom-6 -left-10 flex items-center gap-3 rounded-xl px-4 py-3"
                style={{ animationDelay: "1s" }}
              >
                <div className="flex -space-x-2">
                  {["🧑‍💼", "👩‍💻", "🧑‍🎨"].map((e, i) => (
                    <div
                      key={i}
                      className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-canvas bg-overlay text-sm"
                      aria-hidden="true"
                    >
                      {e}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-xs font-semibold text-ink">
                    30+ Clients
                  </div>
                  <div className="text-xs text-ink-fade">worldwide 🌍</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Scrolling tech marquee ── */}
      <div
        className="absolute bottom-0 left-0 right-0 overflow-hidden border-t border-edge bg-surface/50 py-3"
        aria-hidden="true"
      >
        <div className="flex animate-marquee whitespace-nowrap">
          {[...techs, ...techs].map((t, i) => (
            <span
              key={i}
              className="mx-4 text-xs font-medium uppercase tracking-widest text-ink-fade"
            >
              {t}
              <span className="mx-4 text-edge-subtle">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
