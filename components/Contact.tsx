import { prisma } from "@/lib/prisma";
import ContactForm from "./ContactForm";
import Link from "next/link";
import {
  IcoMail,
  IcoPhone,
  IcoWhatsapp,
  IcoLinkedinOutline,
  IcoGithubOutline,
  IcoYoutubeOutline,
  IcoGlobe,
  IcoMapPin,
  IcoX,
  IcoInstagram,
  IcoTiktok,
} from "@/components/icons";

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
    case "email":     return <IcoMail className={cls} />;
    case "phone":     return <IcoPhone className={cls} />;
    case "whatsapp":  return <IcoWhatsapp className={cls} />;
    case "linkedin":  return <IcoLinkedinOutline className={cls} />;
    case "github":    return <IcoGithubOutline className={cls} />;
    case "youtube":   return <IcoYoutubeOutline className={cls} />;
    case "website":   return <IcoGlobe className={cls} />;
    case "location":  return <IcoMapPin className={cls} />;
    case "x":         return <IcoX className={cls} />;
    case "instagram": return <IcoInstagram className={cls} />;
    case "tiktok":    return <IcoTiktok className={cls} />;
    default:          return <IcoGlobe className={cls} />;
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
  const contactEmail =
    dbLinks.find((l) => l.platform === "email")?.value ??
    fallback.find((l) => l.platform === "email")?.value;

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
                  <Link
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
                  </Link>
                ) : (
                  <div key={ch.id}>{card}</div>
                );
              })}
            </div>

            {/* Response time card */}
            <div className="mt-8 rounded-2xl border border-edge bg-overlay p-5">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 text-primary-light"
                  aria-hidden="true"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
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
            <ContactForm email={contactEmail} />
          </div>
        </div>
      </div>
    </section>
  );
}
