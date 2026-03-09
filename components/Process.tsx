const steps = [
  {
    number: "01",
    title: "Discovery",
    desc: "We start with a deep-dive into your goals, target audience, and competitive landscape. No templates — every solution starts with real understanding.",
    color: "text-primary-light",
    border: "border-primary/30",
    bg: "bg-primary/10",
  },
  {
    number: "02",
    title: "Strategy",
    desc: "We craft a tailored roadmap with clear milestones, technology choices, and KPIs. You know exactly what's being built, why, and when it ships.",
    color: "text-secondary-light",
    border: "border-secondary/30",
    bg: "bg-secondary/10",
  },
  {
    number: "03",
    title: "Execution",
    desc: "Rapid, iterative development with continuous feedback loops. Weekly demos keep you in the loop — no surprises at delivery.",
    color: "text-primary-light",
    border: "border-primary/30",
    bg: "bg-primary/10",
  },
  {
    number: "04",
    title: "Launch & Scale",
    desc: "Go live with confidence. Post-launch, we monitor performance, optimise based on real data, and scale what's working.",
    color: "text-secondary-light",
    border: "border-secondary/30",
    bg: "bg-secondary/10",
  },
];

export default function Process() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="relative overflow-hidden bg-surface py-24 md:py-32"
    >
      <div
        className="pointer-events-none absolute left-0 top-0 h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(124,58,237,0.3), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="section-container">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-primary-light">
            How We Work
          </span>
          <h2
            id="process-heading"
            className="font-display text-4xl font-bold text-ink md:text-5xl"
          >
            A Process Built for <span className="gradient-text">Clarity</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-dim">
            No guesswork. No endless revisions. Just a proven workflow that
            takes your idea from concept to shipped product.
          </p>
        </div>

        {/* Steps */}
        <ol className="relative" aria-label="Work process steps">
          {/* Connecting line (desktop) */}
          <div
            className="pointer-events-none absolute left-8 top-10 hidden h-[calc(100%-4rem)] w-px lg:block"
            style={{
              background:
                "linear-gradient(180deg, #7c3aed40, #06b6d440, transparent)",
            }}
            aria-hidden="true"
          />

          <div className="space-y-8 lg:space-y-6">
            {steps.map((s, i) => (
              <li key={s.number} className="flex gap-6">
                {/* Number badge */}
                <div
                  className={`relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border ${s.border} ${s.bg}`}
                  aria-hidden="true"
                >
                  <span className={`font-display text-lg font-bold ${s.color}`}>
                    {s.number}
                  </span>
                </div>

                {/* Content */}
                <div
                  className={`flex-1 rounded-2xl border border-edge bg-overlay p-6 transition-all duration-300 hover:border-primary/30 ${
                    i % 2 === 0 ? "lg:ml-0" : "lg:ml-12"
                  }`}
                >
                  <h3 className="font-display text-xl font-bold text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-ink-dim">{s.desc}</p>
                </div>
              </li>
            ))}
          </div>
        </ol>
      </div>
    </section>
  );
}
