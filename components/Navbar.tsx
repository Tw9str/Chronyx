"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      role="banner"
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-canvas/90 backdrop-blur-xl border-b border-edge shadow-lg shadow-black/30"
          : "bg-transparent"
      }`}
    >
      <nav
        role="navigation"
        aria-label="Main navigation"
        className="section-container"
      >
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* ── Logo ── */}
          <Link
            href="/"
            aria-label="Chronyx – back to homepage"
            className="flex items-center gap-2 focus-visible:outline-primary-light"
          >
            <LogoMark />
            <span className="font-display text-xl font-bold tracking-tight text-ink">
              CHRONYX
            </span>
          </Link>

          {/* ── Desktop links ── */}
          <ul className="hidden items-center gap-1 md:flex" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-ink-dim transition-all duration-200 hover:bg-surface hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* ── CTA + hamburger ── */}
          <div className="flex items-center gap-3">
            <Link
              href="#contact"
              className="hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-primary-light glow-violet md:inline-flex"
            >
              Let&apos;s Talk
              <ArrowRight />
            </Link>
            <button
              type="button"
              onClick={() => setIsOpen((v) => !v)}
              className="rounded-lg p-2 text-ink-dim transition-all duration-200 hover:bg-surface hover:text-ink md:hidden"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? (
                <X size={20} aria-hidden="true" />
              ) : (
                <Menu size={20} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* ── Mobile menu ── */}
        {isOpen && (
          <div
            id="mobile-menu"
            className="animate-slide-down border-t border-edge py-4 md:hidden"
          >
            <ul className="flex flex-col gap-1" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-lg px-4 py-3 text-sm font-medium text-ink-dim transition-all duration-200 hover:bg-surface hover:text-ink"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="mt-3 px-4">
                <Link
                  href="#contact"
                  className="flex w-full items-center justify-center rounded-full bg-primary py-3 text-sm font-semibold text-white"
                  onClick={() => setIsOpen(false)}
                >
                  Let&apos;s Talk
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}

function LogoMark() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M15 2L28 8.5V21.5L15 28L2 21.5V8.5L15 2Z" fill="url(#l1)" />
      <path
        d="M15 8L21 11.5V18.5L15 22L9 18.5V11.5L15 8Z"
        fill="rgba(3,3,10,0.65)"
      />
      <path
        d="M15 10.5L18.5 12.5V16.5L15 18.5L11.5 16.5V12.5L15 10.5Z"
        fill="url(#l2)"
      />
      <defs>
        <linearGradient
          id="l1"
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
          id="l2"
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

function ArrowRight() {
  return (
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
  );
}
