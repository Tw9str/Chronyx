import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  IcoX,
  IcoLinkedin,
  IcoGithub,
  IcoDribbble,
  IcoInstagram,
  IcoYoutube,
  IcoWhatsapp,
  IcoTiktok,
  IcoMail,
  IcoPhone,
  IcoGlobe,
} from "@/components/icons";

const footerLinks = {
  Services: [
    { label: "Web Development", href: "#services" },
    { label: "Mobile Apps", href: "#services" },
    { label: "SEO & Analytics", href: "#services" },
    { label: "Social Media", href: "#services" },
    { label: "Content Strategy", href: "#services" },
    { label: "Paid Advertising", href: "#services" },
  ],
  Company: [
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Process", href: "#process" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ],
};

function FooterSocialIcon({ platform }: { platform: string }) {
  const cls = "h-5 w-5";
  switch (platform) {
    case "x":          return <IcoX className={cls} />;
    case "linkedin":   return <IcoLinkedin className={cls} />;
    case "github":     return <IcoGithub className={cls} />;
    case "dribbble":   return <IcoDribbble className={cls} />;
    case "instagram":  return <IcoInstagram className={cls} />;
    case "youtube":    return <IcoYoutube className={cls} />;
    case "whatsapp":   return <IcoWhatsapp className={cls} />;
    case "tiktok":     return <IcoTiktok className={cls} />;
    case "email":      return <IcoMail className={cls} />;
    case "phone":      return <IcoPhone className={cls} />;
    default:           return <IcoGlobe className={cls} />;
  }
}

const fallbackSocials = [
  {
    id: "fs1",
    platform: "x",
    label: "Twitter / X",
    url: "https://twitter.com/chronyx",
  },
  {
    id: "fs2",
    platform: "linkedin",
    label: "LinkedIn",
    url: "https://linkedin.com/company/chronyx",
  },
  {
    id: "fs3",
    platform: "github",
    label: "GitHub",
    url: "https://github.com/chronyx",
  },
  {
    id: "fs4",
    platform: "dribbble",
    label: "Dribbble",
    url: "https://dribbble.com/chronyx",
  },
];

export default async function Footer() {
  const year = new Date().getFullYear();

  const [dbSocials, emailLink] = await Promise.all([
    prisma.socialLink
      .findMany({
        where: { enabled: true, showInFooter: true },
        orderBy: [{ order: "asc" }],
      })
      .catch(() => []),
    prisma.socialLink
      .findFirst({ where: { platform: "email" } })
      .catch(() => null),
  ]);

  const socials = dbSocials.length > 0 ? dbSocials : fallbackSocials;
  const emailAddress = emailLink?.value ?? "hello@chronyx.tech";
  const emailHref = emailLink?.url ?? `mailto:${emailAddress}`;

  return (
    <footer
      role="contentinfo"
      className="relative overflow-hidden border-t border-edge bg-canvas"
    >
      {/* Top glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(124,58,237,0.4), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="section-container py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand column */}
          <div className="md:col-span-1">
            <Link
              href="/"
              aria-label="Chronyx – home"
              className="inline-flex items-center gap-2 mb-4"
            >
              <BrandMark />
              <span className="font-display text-xl font-bold tracking-tight text-ink">
                CHRONYX
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-ink-dim">
              Professional web &amp; mobile development and full-spectrum
              digital marketing — helping brands dominate their digital space.
            </p>
            <div className="mt-5 flex gap-3">
              {socials.map((s) => (
                <Link
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-edge bg-surface text-ink-fade transition-all duration-200 hover:border-primary-light/40 hover:bg-overlay hover:text-primary-light"
                >
                  <FooterSocialIcon platform={s.platform} />
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation columns */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <nav key={group} aria-label={`${group} navigation`}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-ink">
                {group}
              </h3>
              <ul className="space-y-2.5" role="list">
                {links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-ink-dim transition-colors duration-200 hover:text-primary-light"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* CTA column */}
          <div className="rounded-2xl border border-edge bg-surface p-5">
            <div className="mb-3 flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-secondary" />
              </span>
              <span className="text-xs font-semibold text-secondary-light">
                Open for projects
              </span>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-ink-dim">
              Ready to take your digital presence to the next level?
            </p>
            <Link
              href="#calculator"
              className="inline-flex w-full items-center justify-center rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-primary-light glow-violet"
            >
              Let's Work Together
            </Link>
            <Link
              href={emailHref}
              className="mt-2 flex w-full items-center justify-center rounded-full border border-edge bg-overlay px-4 py-2.5 text-sm font-medium text-ink-dim transition-all duration-200 hover:border-primary-light/30 hover:text-ink"
            >
              {emailAddress}
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-edge pt-8 sm:flex-row">
          <p className="text-xs text-ink-fade">
            © {year} Chronyx. All rights reserved.
          </p>
          <p className="text-xs text-ink-fade">
            <Link
              href="https://chronyx.tech"
              target="_blank"
              className="transition-colors hover:text-primary-light"
            >
              chronyx.tech
            </Link>
          </p>
          <div className="flex gap-4 text-xs text-ink-fade">
            <Link
              href="#"
              className="transition-colors hover:text-primary-light"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="transition-colors hover:text-primary-light"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function BrandMark() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M15 2L28 8.5V21.5L15 28L2 21.5V8.5L15 2Z" fill="url(#fl1)" />
      <path
        d="M15 8L21 11.5V18.5L15 22L9 18.5V11.5L15 8Z"
        fill="rgba(3,3,10,0.65)"
      />
      <path
        d="M15 10.5L18.5 12.5V16.5L15 18.5L11.5 16.5V12.5L15 10.5Z"
        fill="url(#fl2)"
      />
      <defs>
        <linearGradient
          id="fl1"
          x1="2"
          y1="2"
          x2="28"
          y2="28"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7c3aed" />
          <stop offset="1" stopColor="#06b6d4" />
        </linearGradient>
        <linearGradient
          id="fl2"
          x1="11.5"
          y1="10.5"
          x2="18.5"
          y2="18.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#a78bfa" />
          <stop offset="1" stopColor="#67e8f9" />
        </linearGradient>
      </defs>
    </svg>
  );
}
