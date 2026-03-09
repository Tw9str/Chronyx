import React from "react";
type IcoProps = React.SVGProps<SVGSVGElement>;
function Code2({ className, ...r }: IcoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...r}
    >
      <path d="m18 16 4-4-4-4" />
      <path d="m6 8-4 4 4 4" />
      <path d="m14.5 4-5 16" />
    </svg>
  );
}
function Smartphone({ className, ...r }: IcoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...r}
    >
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  );
}
function TrendingUp({ className, ...r }: IcoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...r}
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}
function Share2({ className, ...r }: IcoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...r}
    >
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
      <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
    </svg>
  );
}
function FileText({ className, ...r }: IcoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...r}
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </svg>
  );
}
function Target({ className, ...r }: IcoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...r}
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

const services = [
  {
    icon: Code2,
    title: "Web Development",
    desc: "Fast, scalable web apps built with modern stacks — React, Next.js, Node.js, and TypeScript. From landing pages to full SaaS platforms.",
    tags: ["React", "Next.js", "Node.js"],
    accent: "text-primary-light",
    glow: "bg-primary/10",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    desc: "Native & cross-platform iOS/Android apps with exceptional UX. Built with React Native and Flutter for performance that users love.",
    tags: ["React Native", "Flutter", "iOS/Android"],
    accent: "text-secondary-light",
    glow: "bg-secondary/10",
  },
  {
    icon: TrendingUp,
    title: "SEO & Analytics",
    desc: "Data-driven SEO strategies that drive organic traffic and measurable results. Technical audits, on-page optimisation, and link building.",
    tags: ["Technical SEO", "On-Page", "Analytics"],
    accent: "text-green-400",
    glow: "bg-green-500/10",
  },
  {
    icon: Share2,
    title: "Social Media",
    desc: "Grow your audience with strategic content calendars, community management, and platform-specific campaigns that convert followers.",
    tags: ["Instagram", "LinkedIn", "TikTok"],
    accent: "text-pink-400",
    glow: "bg-pink-500/10",
  },
  {
    icon: FileText,
    title: "Content Strategy",
    desc: "Compelling copy and content that converts visitors into customers. Blog posts, landing pages, email sequences, and brand messaging.",
    tags: ["Copywriting", "Blog", "Email"],
    accent: "text-amber-400",
    glow: "bg-amber-500/10",
  },
  {
    icon: Target,
    title: "Paid Advertising",
    desc: "Targeted ad campaigns on Google, Meta, and TikTok that maximise ROI. Audience research, creative testing, and continuous optimisation.",
    tags: ["Google Ads", "Meta Ads", "TikTok Ads"],
    accent: "text-orange-400",
    glow: "bg-orange-500/10",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative overflow-hidden bg-canvas py-24 md:py-32"
    >
      {/* subtle top glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(124,58,237,0.4), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="section-container">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-primary-light">
            What We Do
          </span>
          <h2
            id="services-heading"
            className="font-display text-4xl font-bold text-ink md:text-5xl"
          >
            Services Built for <span className="gradient-text">Growth</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-dim">
            Everything you need to establish, grow, and dominate your digital
            presence — under one roof.
          </p>
        </div>

        {/* Grid */}
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <li key={s.title}>
                <article className="group h-full rounded-2xl border border-edge bg-surface p-6 card-hover-border">
                  {/* Icon */}
                  <div
                    className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl ${s.glow}`}
                  >
                    <Icon
                      className={`h-6 w-6 ${s.accent}`}
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Title & desc */}
                  <h3 className="font-display text-lg font-semibold text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-dim">
                    {s.desc}
                  </p>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {s.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-edge bg-overlay px-2.5 py-0.5 text-xs font-medium text-ink-fade"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
