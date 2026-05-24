// src/components/landing/HeroSection.tsx
// ─────────────────────────────────────────────────────────────
// HeroSection — full-bleed background image, title, body copy,
// BackButton (← Baca Blog)
// Static placeholder: bg color stands in for bg image until
// asset is confirmed with UI/UX designer
// ─────────────────────────────────────────────────────────────

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      // min-h-svh → fills viewport height on mobile (svh accounts
      // for mobile browser chrome better than vh)
      // relative → stacking context for overlay + text layers
      className="relative flex min-h-svh flex-col justify-end"
    >
      {/* ── Background image ──────────────────────────────
                fill → covers full section container
                priority → eager load, above the fold
                object-cover → crops to fill without distortion
            ─────────────────────────────────────────────── */}
      <Image
        src="/images/hero-image.png"
        alt="Latar belakang Kampung Hidroponik"
        fill
        priority
        style={{ objectFit: "cover" }}
        className="z-0"
      />
      {/* ── Overlay ───────────────────────────────────────────
                Dark gradient from bottom → top
                Ensures text legibility over any bg image
                inset-0 → covers full section
            ──────────────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

      {/* ── Content ───────────────────────────────────────────
                relative + z-20 → sits above both image (z-0) and overlay (z-10) 
                pb-10 px-6 → breathing room from viewport edges
            ──────────────────────────────────────────────────── */}
      <div className="relative z-20 flex flex-col gap-4 px-6 pb-10">
        <h1 className="font-title text-3xl font-bold text-brand-cream">
          Tentang Kami
        </h1>

        <p className="font-sans text-sm leading-relaxed text-brand-cream/90">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>

        {/* ── BackButton ────────────────────────────────────
                    Pill shape → rounded-full
                    Inline link → navigates to /blog
                    ArrowLeft icon from lucide-react
                ─────────────────────────────────────────────── */}
        <Link
          href="/blog"
          className="flex w-fit items-center gap-2 rounded-full bg-brand-cream px-5 py-2 font-sans text-sm font-medium text-brand-teal transition-opacity hover:opacity-80"
        >
          <ArrowLeft size={16} />
          Baca Blog
        </Link>
      </div>
    </section>
  );
}
