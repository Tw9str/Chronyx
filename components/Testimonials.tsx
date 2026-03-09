import { Star } from "lucide-react";
import { prisma } from "@/lib/prisma";

const fallback = [
  {
    id: "1",
    name: "Sarah Mitchell",
    role: "CEO, TechStart Agency",
    quote:
      "Chronyx completely transformed our online presence. Our website speed improved by 3× and organic leads went up by 127% in just 4 months. Exceptional attention to detail.",
    avatar: "SM",
    rating: 5,
    project: "Web Redesign + SEO",
  },
  {
    id: "2",
    name: "James Kowalski",
    role: "Marketing Director, Nomad Ventures",
    quote:
      "The mobile app Chronyx delivered exceeded every expectation. Beautiful UI, rock-solid performance, and shipped on time. Our user retention jumped to 85%.",
    avatar: "JK",
    rating: 5,
    project: "Mobile App Development",
  },
  {
    id: "3",
    name: "Ana Rodrigues",
    role: "Founder, GreenMart",
    quote:
      "Working with Chronyx was seamless from day one. The e-commerce platform they built handles thousands of daily orders without a hitch. Revenue grew 200% post-launch.",
    avatar: "AR",
    rating: 5,
    project: "E-commerce Platform",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div
      className="flex gap-0.5"
      aria-label={`${count} out of 5 stars`}
      role="img"
    >
      {Array.from({ length: count }).map((_, i) => (
        <Star
          key={i}
          className="h-4 w-4 fill-amber-400 text-amber-400"
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export default async function Testimonials() {
  const dbItems = await prisma.testimonial
    .findMany({
      where: { enabled: true },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    })
    .catch(() => []);
  const testimonials = dbItems.length > 0 ? dbItems : fallback;
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative overflow-hidden bg-canvas py-24 md:py-32"
    >
      {/* top glow line */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(124,58,237,0.4), rgba(6,182,212,0.2), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="section-container">
        {/* Header */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-primary-light">
            Client Love
          </span>
          <h2
            id="testimonials-heading"
            className="font-display text-4xl font-bold text-ink md:text-5xl"
          >
            What Clients Say About{" "}
            <span className="gradient-text">Our Work</span>
          </h2>
        </div>

        {/* Cards */}
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {testimonials.map((t) => (
            <li key={t.id}>
              <figure className="flex h-full flex-col rounded-2xl border border-edge bg-surface p-6 card-hover-border">
                {/* Stars */}
                <Stars count={t.rating} />

                {/* Quote */}
                <blockquote className="mt-4 flex-1">
                  <p className="text-sm leading-relaxed text-ink-dim">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </blockquote>

                {/* Author */}
                <figcaption className="mt-6 flex items-center gap-3 border-t border-edge pt-5">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{
                      background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                    }}
                    aria-hidden="true"
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-ink">
                      {t.name}
                    </div>
                    <div className="text-xs text-ink-fade">{t.role}</div>
                  </div>
                  <div className="ml-auto rounded-full border border-edge bg-overlay px-2.5 py-1 text-xs text-ink-fade">
                    {t.project}
                  </div>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
