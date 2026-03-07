import { CheckCircle2 } from "lucide-react";

const highlights = [
  "Full-Stack Web & Mobile Development",
  "SEO & Performance Optimisation",
  "Social Media & Content Strategy",
  "Data-Driven Paid Advertising",
  "UX/UI Design & Prototyping",
  "Ongoing Maintenance & Support",
];

const stack = [
  { name: "React / Next.js", pct: 95 },
  { name: "TypeScript", pct: 90 },
  { name: "Node.js", pct: 88 },
  { name: "React Native", pct: 82 },
  { name: "SEO & Analytics", pct: 92 },
  { name: "Paid Ads", pct: 85 },
];

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative overflow-hidden bg-surface py-24 md:py-32"
    >
      {/* Divider line */}
      <div
        className="pointer-events-none absolute left-0 top-0 h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(124,58,237,0.3), rgba(6,182,212,0.2), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="section-container">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* ── Left: text ── */}
          <div>
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-primary-light">
              About Me
            </span>
            <h2
              id="about-heading"
              className="font-display text-4xl font-bold leading-tight text-ink md:text-5xl"
            >
              Crafting Digital Solutions{" "}
              <span className="gradient-text">That Convert</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-dim">
              I&apos;m a freelance developer &amp; digital marketer with{" "}
              <strong className="font-semibold text-ink">5+ years</strong> of
              experience helping startups and established brands achieve their
              digital goals. I combine technical precision with strategic
              thinking to deliver results that matter.
            </p>
            <p className="mt-4 leading-relaxed text-ink-dim">
              Whether you need a blazing-fast web app, an intuitive mobile
              experience, or a full-funnel marketing strategy — I handle it
              end-to-end, removing the headache of managing multiple agencies.
            </p>

            {/* Highlights */}
            <ul className="mt-8 space-y-3" role="list">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm text-ink-dim"
                >
                  <CheckCircle2
                    className="h-4 w-4 shrink-0 text-secondary"
                    aria-hidden="true"
                    strokeWidth={2}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Right: skills ── */}
          <div className="rounded-2xl border border-edge bg-overlay p-8">
            <h3 className="mb-6 font-display text-lg font-semibold text-ink">
              Core Skills
            </h3>
            <dl className="space-y-5">
              {stack.map((s) => (
                <div key={s.name}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <dt className="font-medium text-ink-dim">{s.name}</dt>
                    <dd className="font-semibold text-primary-light">
                      {s.pct}%
                    </dd>
                  </div>
                  <div
                    className="h-2 w-full overflow-hidden rounded-full bg-edge"
                    role="presentation"
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${s.pct}%`,
                        background: "linear-gradient(90deg, #7c3aed, #06b6d4)",
                      }}
                    />
                  </div>
                </div>
              ))}
            </dl>

            {/* Mini stats */}
            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-edge pt-6">
              {[
                { v: "50+", l: "Projects" },
                { v: "30+", l: "Clients" },
                { v: "5+", l: "Years" },
              ].map((s) => (
                <div key={s.l} className="text-center">
                  <div className="font-display text-2xl font-bold gradient-brand">
                    {s.v}
                  </div>
                  <div className="mt-0.5 text-xs text-ink-fade">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
