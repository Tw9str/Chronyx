import type { SVGProps } from "react";

export type IcoProps = SVGProps<SVGSVGElement> & {
  /** Shorthand for width + height when you need a fixed pixel size (e.g. size={17}). */
  size?: number;
};

// ─── Shared base attribute sets ──────────────────────────────────────────────

function stroke(
  size: number | undefined,
  className: string | undefined,
  props: SVGProps<SVGSVGElement>,
) {
  return {
    width: size ?? 24,
    height: size ?? 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className,
    ...props,
  };
}

function filled(
  size: number | undefined,
  className: string | undefined,
  props: SVGProps<SVGSVGElement>,
) {
  return {
    width: size ?? 24,
    height: size ?? 24,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": true,
    className,
    ...props,
  };
}

// ─── Brand icons (filled) ─────────────────────────────────────────────────────

export function IcoX({ size, className, ...props }: IcoProps) {
  return (
    <svg {...filled(size, className, props)}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function IcoLinkedin({ size, className, ...props }: IcoProps) {
  return (
    <svg {...filled(size, className, props)}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function IcoGithub({ size, className, ...props }: IcoProps) {
  return (
    <svg {...filled(size, className, props)}>
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

export function IcoDribbble({ size, className, ...props }: IcoProps) {
  return (
    <svg {...filled(size, className, props)}>
      <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.048 6.404 1.73 1.35 3.92 2.165 6.295 2.165 1.388 0 2.728-.252 3.972-.715l.037-.104zm-14.908-2.43c.26-.483 3.21-5.723 8.54-7.44.12-.04.24-.073.36-.104-.23-.518-.48-1.03-.74-1.538-5.29 1.582-10.43 1.52-10.878 1.51-.012.175-.018.35-.018.528 0 2.692.974 5.16 2.574 7.044l.162-.001zm-2.35-9.124c.46.01 4.9-.01 9.85-1.326-1.758-3.12-3.657-5.75-3.953-6.16-2.856 1.347-5.04 3.9-5.9 7.486zm7.726-8.04c.31.42 2.24 3.04 3.974 6.22 3.8-1.424 5.41-3.59 5.607-3.866-1.67-1.483-3.846-2.37-6.232-2.37-.45 0-.9.035-1.348.015l-.001.001z" />
    </svg>
  );
}

export function IcoInstagram({ size, className, ...props }: IcoProps) {
  return (
    <svg
      width={size ?? 24}
      height={size ?? 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IcoYoutube({ size, className, ...props }: IcoProps) {
  return (
    <svg {...filled(size, className, props)}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export function IcoWhatsapp({ size, className, ...props }: IcoProps) {
  return (
    <svg {...filled(size, className, props)}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

export function IcoTiktok({ size, className, ...props }: IcoProps) {
  return (
    <svg {...filled(size, className, props)}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
    </svg>
  );
}

// ─── Brand icons (outline — simplified stroke versions) ───────────────────────

export function IcoLinkedinOutline({ size, className, ...props }: IcoProps) {
  return (
    <svg {...stroke(size, className, props)}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function IcoGithubOutline({ size, className, ...props }: IcoProps) {
  return (
    <svg {...stroke(size, className, props)}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function IcoYoutubeOutline({ size, className, ...props }: IcoProps) {
  return (
    <svg {...stroke(size, className, props)}>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

// ─── Communication ────────────────────────────────────────────────────────────

export function IcoMail({ size, className, ...props }: IcoProps) {
  return (
    <svg {...stroke(size, className, props)}>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export function IcoPhone({ size, className, ...props }: IcoProps) {
  return (
    <svg {...stroke(size, className, props)}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.54 2.69h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l.49-.99a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export function IcoMessageSquare({ size, className, ...props }: IcoProps) {
  return (
    <svg {...stroke(size, className, props)}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

// ─── Forms / Actions ──────────────────────────────────────────────────────────

export function IcoSend({ size, className, ...props }: IcoProps) {
  return (
    <svg {...stroke(size, className, props)}>
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

export function IcoSpinner({ size, className, ...props }: IcoProps) {
  return (
    <svg {...stroke(size, className, props)}>
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

export function IcoCheckCircle({ size, className, ...props }: IcoProps) {
  return (
    <svg {...stroke(size, className, props)}>
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

// ─── Navigation ───────────────────────────────────────────────────────────────

export function IcoArrowRight({ size, className, ...props }: IcoProps) {
  return (
    <svg {...stroke(size, className, props)}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export function IcoArrowLeft({ size, className, ...props }: IcoProps) {
  return (
    <svg {...stroke(size, className, props)}>
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

export function IcoArrowUpRight({ size, className, ...props }: IcoProps) {
  return (
    <svg {...stroke(size, className, props)}>
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  );
}

export function IcoExternalLink({ size, className, ...props }: IcoProps) {
  return (
    <svg {...stroke(size, className, props)}>
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}

export function IcoChevronDown({ size, className, ...props }: IcoProps) {
  return (
    <svg {...stroke(size, className, props)}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function IcoChevronUp({ size, className, ...props }: IcoProps) {
  return (
    <svg {...stroke(size, className, props)}>
      <path d="m18 15-6-6-6 6" />
    </svg>
  );
}

export function IcoLogOut({ size, className, ...props }: IcoProps) {
  return (
    <svg {...stroke(size, className, props)}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  );
}

// ─── Admin / UI ───────────────────────────────────────────────────────────────

export function IcoMenu({ size, className, ...props }: IcoProps) {
  return (
    <svg {...stroke(size, className, props)}>
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

export function IcoClose({ size, className, ...props }: IcoProps) {
  return (
    <svg {...stroke(size, className, props)}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export function IcoSettings({ size, className, ...props }: IcoProps) {
  return (
    <svg {...stroke(size, className, props)}>
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function IcoLayoutDashboard({ size, className, ...props }: IcoProps) {
  return (
    <svg {...stroke(size, className, props)}>
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
  );
}

export function IcoShare2({ size, className, ...props }: IcoProps) {
  return (
    <svg {...stroke(size, className, props)}>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
      <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
    </svg>
  );
}

export function IcoSlidersHorizontal({ size, className, ...props }: IcoProps) {
  return (
    <svg {...stroke(size, className, props)}>
      <path d="M21 4H14" />
      <path d="M10 4H3" />
      <circle cx="12" cy="4" r="2" />
      <path d="M21 12H12" />
      <path d="M8 12H3" />
      <circle cx="10" cy="12" r="2" />
      <path d="M21 20H16" />
      <path d="M12 20H3" />
      <circle cx="14" cy="20" r="2" />
    </svg>
  );
}

export function IcoFolderKanban({ size, className, ...props }: IcoProps) {
  return (
    <svg {...stroke(size, className, props)}>
      <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
      <path d="M8 13v4" />
      <path d="M12 9v8" />
      <path d="M16 13v4" />
    </svg>
  );
}

export function IcoQuote({ size, className, ...props }: IcoProps) {
  return (
    <svg {...stroke(size, className, props)}>
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
    </svg>
  );
}

export function IcoInfo({ size, className, ...props }: IcoProps) {
  return (
    <svg {...stroke(size, className, props)}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}

// ─── Content / Data ───────────────────────────────────────────────────────────

export function IcoStar({ size, className, ...props }: IcoProps) {
  return (
    <svg
      width={size ?? 24}
      height={size ?? 24}
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
    </svg>
  );
}

export function IcoClock({ size, className, ...props }: IcoProps) {
  return (
    <svg {...stroke(size, className, props)}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

export function IcoUsers({ size, className, ...props }: IcoProps) {
  return (
    <svg {...stroke(size, className, props)}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export function IcoTarget({ size, className, ...props }: IcoProps) {
  return (
    <svg {...stroke(size, className, props)}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

export function IcoTrendingUp({ size, className, ...props }: IcoProps) {
  return (
    <svg {...stroke(size, className, props)}>
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}

// ─── Location / Web ───────────────────────────────────────────────────────────

export function IcoGlobe({ size, className, ...props }: IcoProps) {
  return (
    <svg {...stroke(size, className, props)}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}

export function IcoMapPin({ size, className, ...props }: IcoProps) {
  return (
    <svg {...stroke(size, className, props)}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

// ─── Services / Domain ────────────────────────────────────────────────────────

export function IcoCode2({ size, className, ...props }: IcoProps) {
  return (
    <svg {...stroke(size, className, props)}>
      <path d="m18 16 4-4-4-4" />
      <path d="m6 8-4 4 4 4" />
      <path d="m14.5 4-5 16" />
    </svg>
  );
}

export function IcoSmartphone({ size, className, ...props }: IcoProps) {
  return (
    <svg {...stroke(size, className, props)}>
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  );
}

export function IcoFileText({ size, className, ...props }: IcoProps) {
  return (
    <svg {...stroke(size, className, props)}>
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </svg>
  );
}

export function IcoZap({ size, className, ...props }: IcoProps) {
  return (
    <svg {...stroke(size, className, props)}>
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
    </svg>
  );
}

export function IcoRocket({ size, className, ...props }: IcoProps) {
  return (
    <svg {...stroke(size, className, props)}>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

export function IcoWrench({ size, className, ...props }: IcoProps) {
  return (
    <svg {...stroke(size, className, props)}>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

export function IcoPaintbrush({ size, className, ...props }: IcoProps) {
  return (
    <svg {...stroke(size, className, props)}>
      <path d="M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3Z" />
      <path d="M9 8c-2 3-4 3.5-7 4l8 10c2-1 6-5 6-7" />
      <path d="M14.5 17.5 4.5 15" />
    </svg>
  );
}

export function IcoCalculator({ size, className, ...props }: IcoProps) {
  return (
    <svg {...stroke(size, className, props)}>
      <rect width="16" height="20" x="4" y="2" rx="2" />
      <line x1="8" x2="16" y1="6" y2="6" />
      <line x1="16" x2="16" y1="14" y2="14" />
      <line x1="16" x2="16" y1="18" y2="18" />
      <line x1="12" x2="12" y1="14" y2="14" />
      <line x1="8" x2="8" y1="14" y2="14" />
      <line x1="12" x2="12" y1="18" y2="18" />
      <line x1="8" x2="8" y1="18" y2="18" />
    </svg>
  );
}
