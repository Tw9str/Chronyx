import Link from "next/link";

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

const socials = [
  {
    name: "Twitter / X",
    href: "https://twitter.com/chronyx",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/chronyx",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/chronyx",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "Dribbble",
    href: "https://dribbble.com/chronyx",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.048 6.404 1.73 1.35 3.92 2.165 6.295 2.165 1.388 0 2.728-.252 3.972-.715l.037-.104zm-14.908-2.43c.26-.483 3.21-5.723 8.54-7.44.12-.04.24-.073.36-.104-.23-.518-.48-1.03-.74-1.538-5.29 1.582-10.43 1.52-10.878 1.51-.012.175-.018.35-.018.528 0 2.692.974 5.16 2.574 7.044l.162-.001zm-2.35-9.124c.46.01 4.9-.01 9.85-1.326-1.758-3.12-3.657-5.75-3.953-6.16-2.856 1.347-5.04 3.9-5.9 7.486zm7.726-8.04c.31.42 2.24 3.04 3.974 6.22 3.8-1.424 5.41-3.59 5.607-3.866-1.67-1.483-3.846-2.37-6.232-2.37-.45 0-.9.035-1.348.015l-.001.001z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

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
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-edge bg-surface text-ink-fade transition-all duration-200 hover:border-primary-light/40 hover:bg-overlay hover:text-primary-light"
                >
                  {s.icon}
                </a>
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
              href="#contact"
              className="inline-flex w-full items-center justify-center rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-primary-light glow-violet"
            >
              Start a Project
            </Link>
            <a
              href="mailto:hello@chronyx.tech"
              className="mt-2 flex w-full items-center justify-center rounded-full border border-edge bg-overlay px-4 py-2.5 text-sm font-medium text-ink-dim transition-all duration-200 hover:border-primary-light/30 hover:text-ink"
            >
              hello@chronyx.tech
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-edge pt-8 sm:flex-row">
          <p className="text-xs text-ink-fade">
            © {year} Chronyx. All rights reserved.
          </p>
          <p className="text-xs text-ink-fade">
            <a
              href="https://chronyx.tech"
              className="transition-colors hover:text-primary-light"
            >
              chronyx.tech
            </a>
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
