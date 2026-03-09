import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Github,
  Youtube,
  MessageSquare,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import ContactForm from "./ContactForm";

// Fallback channels shown when the DB has no social links yet
const fallback = [
  {
    id: "f1",
    platform: "email",
    label: "Email",
    value: "hello@chronyx.tech",
    url: "mailto:hello@chronyx.tech",
  },
  {
    id: "f2",
    platform: "phone",
    label: "Phone",
    value: "+1 (555) 000-0000",
    url: "tel:+15550000000",
  },
  {
    id: "f3",
    platform: "location",
    label: "Location",
    value: "Available Worldwide",
    url: null,
  },
];

function PlatformIcon({ platform }: { platform: string }) {
  const cls = "h-5 w-5 text-primary-light";
  switch (platform) {
    case "email":
      return <Mail className={cls} aria-hidden="true" />;
    case "phone":
      return <Phone className={cls} aria-hidden="true" />;
    case "whatsapp":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={cls}
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
      );
    case "linkedin":
      return <Linkedin className={cls} aria-hidden="true" />;
    case "github":
      return <Github className={cls} aria-hidden="true" />;
    case "youtube":
      return <Youtube className={cls} aria-hidden="true" />;
    case "website":
      return <Globe className={cls} aria-hidden="true" />;
    case "location":
      return <MapPin className={cls} aria-hidden="true" />;
    case "x":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={cls}
          aria-hidden="true"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "instagram":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          className={cls}
          aria-hidden="true"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <circle cx="12" cy="12" r="4" />
          <circle
            cx="17.5"
            cy="6.5"
            r="0.5"
            fill="currentColor"
            stroke="none"
          />
        </svg>
      );
    case "tiktok":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={cls}
          aria-hidden="true"
        >
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
        </svg>
      );
    default:
      return <Globe className={cls} aria-hidden="true" />;
  }
}

export default async function Contact() {
  const dbLinks = await prisma.socialLink
    .findMany({
      where: { enabled: true, showInContact: true },
      orderBy: [{ order: "asc" }],
    })
    .catch(() => []);

  const channels = dbLinks.length > 0 ? dbLinks : fallback;

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
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
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-primary-light">
            Get in Touch
          </span>
          <h2
            id="contact-heading"
            className="font-display text-4xl font-bold text-ink md:text-5xl"
          >
            Let&apos;s Build Something{" "}
            <span className="gradient-text">Extraordinary</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-dim">
            Have a project in mind? Fill out the form or reach out directly —
            We&apos;ll get back to you within 24 hours.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-5">
          {/* ── Contact channels sidebar ── */}
          <aside className="lg:col-span-2">
            <div className="space-y-4">
              {channels.map((ch) => {
                const card = (
                  <div className="flex items-center gap-4 rounded-2xl border border-edge bg-overlay p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15">
                      <PlatformIcon platform={ch.platform} />
                    </div>
                    <div>
                      <div className="text-xs font-medium uppercase tracking-wider text-ink-fade">
                        {ch.label}
                      </div>
                      <div className="mt-0.5 text-sm font-semibold text-ink">
                        {ch.value}
                      </div>
                    </div>
                  </div>
                );

                return ch.url ? (
                  <a
                    key={ch.id}
                    href={ch.url}
                    target={ch.url.startsWith("http") ? "_blank" : undefined}
                    rel={
                      ch.url.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="block cursor-pointer transition-all duration-200 hover:opacity-80"
                    aria-label={`${ch.label}: ${ch.value}`}
                  >
                    {card}
                  </a>
                ) : (
                  <div key={ch.id}>{card}</div>
                );
              })}
            </div>

            {/* Response time card */}
            <div className="mt-8 rounded-2xl border border-edge bg-overlay p-5">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink">
                <MessageSquare
                  className="h-4 w-4 text-primary-light"
                  aria-hidden="true"
                />
                Response Time
              </div>
              <p className="text-sm text-ink-dim">
                We typically respond to all enquiries within{" "}
                <strong className="text-ink">24 hours</strong>. For urgent
                projects, mention it in the message.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-secondary" />
                </span>
                <span className="text-xs font-semibold text-secondary-light">
                  Currently accepting new projects
                </span>
              </div>
            </div>
          </aside>

          {/* ── Contact form (client component) ── */}
          <div className="rounded-2xl border border-edge bg-overlay p-6 lg:col-span-3 md:p-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
