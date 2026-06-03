// src/components/layout/Navbar.tsx
// ─────────────────────────────────────────────────────────────
// Navbar — smart auto-hide navbar + mobile full-screen drawer
// Behaviors:
//   1. Smart scroll: hide on scroll down, show on scroll up
//      → slide (translateY) + fade (opacity) combined transition
//   2. Mobile: hamburger → full-screen drawer (slides from left)
//      Drawer: SVG logo, nav links, Instagram icon, copyright
//   3. Desktop: inline nav links right-aligned
//   4. Always bg-brand-teal (opaque)
// ─────────────────────────────────────────────────────────────

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Home, FileText, Users, Info } from "lucide-react";
import { FaInstagram as Instagram } from "react-icons/fa";

// ── Nav link definitions ──────────────────────────────────────
const NAV_LINKS = [
  { label: "Beranda", href: "/", icon: Home },
  { label: "Blog", href: "/blog", icon: FileText },
  { label: "Anggota", href: "/anggota", icon: Users },
  { label: "Tentang", href: "/tentang", icon: Info },
];

// ── useSmartNavbar ────────────────────────────────────────────
// Custom hook: tracks scroll direction → returns visible state
// Mechanism:
//   prevScrollY ref → stores last scroll position
//   scrollY > prevScrollY → scrolling down → hide
//   scrollY < prevScrollY → scrolling up → show
//   scrollY < THRESHOLD → at top → always show
// ─────────────────────────────────────────────────────────────
const SCROLL_THRESHOLD = 10; // px from top → always show navbar

function useSmartNavbar() {
  const [visible, setVisible] = useState(true);
  const prevScrollY = useRef(0);

  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY;

      if (currentScrollY < SCROLL_THRESHOLD) {
        // At top of page → always show
        setVisible(true);
      } else if (currentScrollY > prevScrollY.current) {
        // Scrolling down → hide
        setVisible(false);
      } else {
        // Scrolling up → show
        setVisible(true);
      }

      prevScrollY.current = currentScrollY;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return visible;
}

// ── Navbar ────────────────────────────────────────────────────
export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  const navVisible = useSmartNavbar();

  // ── Lock body scroll when drawer open ─────────────────────
  // Prevents background scroll while mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <>
      {/* ══ Navbar bar ════════════════════════════════════
                fixed top-0 → stays in viewport
                translate-y + opacity → smart scroll animation
                transition covers both transform + opacity
                z-nav (100) → above all page content
            ═════════════════════════════════════════════════ */}
      <header
        className={[
          "fixed left-0 right-0 top-0 z-[100] bg-brand-teal transition-all duration-300",
          navVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0",
        ].join(" ")}
        style={{ height: "var(--nav-height, 64px)" }}
      >
        <div className="flex size-full items-center justify-between px-[44px]">
          {/* ── Logo (PNG) — closed state ──────────────
                        PNG logo → shown in navbar bar always
                        Hide text logo on mobile, show on desktop
                    ───────────────────────────────────────────── */}
          <Link href="/" className="relative size-10 shrink-0">
            <Image
              src="/images/logo.png"
              alt="Kampung Hidroponik Surabaya"
              width={96}
              height={240}
              className="h-10 object-contain"
              priority
            />
          </Link>

          {/* ── Desktop nav links ──────────────────────
                        hidden on mobile, flex on md+
                    ───────────────────────────────────────────── */}
          <nav className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setDrawerOpen(false)}
                className={[
                  "font-sans text-sm font-medium transition-opacity hover:opacity-80",
                  // Active state: full opacity + underline
                  // Inactive: 70% opacity
                  pathname === href
                    ? "text-brand-cream underline underline-offset-4"
                    : "text-brand-cream/70",
                ].join(" ")}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* ── Mobile hamburger ───────────────────────
                        md:hidden → only visible on mobile
                        toggles drawer open/close state
                    ───────────────────────────────────────────── */}
          <button
            onClick={() => setDrawerOpen((prev) => !prev)}
            aria-label={drawerOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={drawerOpen}
            className="p-2 text-brand-cream transition-opacity hover:opacity-80 md:hidden"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* ══ Mobile Drawer ═════════════════════════════════
                Full-screen overlay, slides in from left
                z-[200] → above navbar bar
                Mechanism:
                  translate-x-0 → open (visible)
                  -translate-x-full → closed (off-screen left)
                  transition-transform duration-300 ease-in-out
            ═════════════════════════════════════════════════ */}
      <div
        className={[
          "fixed inset-0 z-[200] flex flex-col bg-brand-teal transition-transform duration-300 ease-in-out md:hidden",
          drawerOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
        aria-hidden={!drawerOpen}
      >
        {/* ── Drawer header: SVG logo + close button ────── */}
        <div className="flex items-start justify-between px-8 pt-10">
          {/* SVG logo → open state per spec */}
          <Link href="/" aria-label="Beranda" className="inline-flex">
            <Image
              src="/icons/logo.svg"
              alt="Kampung Hidroponik Surabaya"
              width={160}
              height={100}
              className="size-auto object-contain"
            />
          </Link>

          {/* Close button → X icon top-right */}
          <button
            onClick={() => setDrawerOpen(false)}
            aria-label="Tutup menu"
            className="rounded-lg p-2 text-brand-cream/80 transition-all duration-200 hover:scale-110 hover:bg-brand-cream/10 active:scale-95 active:bg-brand-cream/20"
          >
            <X size={32} />
          </button>
        </div>

        {/* ── Drawer nav links ──────────────────────────────
                    mt-12 → vertical breathing room below logo
                    Each link: icon left + label, large tap target
                ─────────────────────────────────────────────── */}
        <nav className="mt-12 flex flex-col gap-2 px-6">
          {NAV_LINKS.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={[
                  // Base layout
                  "flex items-center gap-6 rounded-xl px-4 py-4",
                  "font-title text-xl font-bold",
                  // Transition: all props smoothly
                  "transition-all duration-200",
                  // Hover: bg fill + scale up
                  "hover:scale-[1.02] hover:bg-brand-cream/10",
                  // Press: scale down + darker bg
                  "active:scale-95 active:bg-brand-cream/20",
                  // Active page indicator
                  isActive
                    ? [
                        "border-l-4 border-brand-cream",
                        "bg-brand-cream/10",
                        "text-brand-cream",
                      ].join(" ")
                    : [
                        // Inactive: transparent left border
                        // (keeps layout stable — no shift on active)
                        "border-l-4 border-transparent",
                        "text-brand-cream/70",
                      ].join(" "),
                ].join(" ")}
              >
                <Icon
                  size={28}
                  className={[
                    "shrink-0 transition-transform duration-200",
                    // Active icon: full opacity
                    // Inactive icon: slightly muted
                    isActive ? "opacity-100" : "opacity-70",
                  ].join(" ")}
                />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* ── Drawer footer: Instagram + copyright ──────────
                    mt-auto → pushed to bottom of drawer
                    border-t brand-cream/20 → subtle separator
                ─────────────────────────────────────────────── */}
        <div className="mt-auto flex flex-col items-center gap-3 px-6 py-8">
          <div className="mx-6 h-[2px] w-auto self-stretch rounded-full bg-white/80" />
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram Kampung Hidroponik Surabaya"
            className="text-brand-cream/80 transition-opacity hover:opacity-80"
          >
            <Instagram size={28} />
          </a>
          <span className="font-sans text-xs text-brand-cream/60">
            © Kampung Hidroponik Surabaya
          </span>
        </div>
      </div>

      {/* ══ Drawer backdrop ═══════════════════════════════
                Semi-transparent overlay behind drawer
                Tapping backdrop → closes drawer
                pointer-events-none when closed → no click blocking
            ═════════════════════════════════════════════════ */}
      <div
        onClick={() => setDrawerOpen(false)}
        className={[
          "fixed inset-0 z-[150] bg-black/40 transition-opacity duration-300 md:hidden",
          drawerOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        ].join(" ")}
        aria-hidden="true"
      />
    </>
  );
}
