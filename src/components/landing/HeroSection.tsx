// src/components/landing/HeroSection.tsx
// ─────────────────────────────────────────────────────────────
// HeroSection — full-bleed background image, title, body copy,
// BackButton (← Baca Blog)
// Static placeholder: bg color stands in for bg image until
// asset is confirmed with UI/UX designer
// ─────────────────────────────────────────────────────────────

import Image from "next/image";
import BackButton from "@/components/shared/BackButton";
import HeroContent from "@/components/shared/HeroContent";
import type { SiteSettings } from "@/lib/sanity.types";

export default function HeroSection({
  siteSettings,
}: {
  siteSettings: SiteSettings | null; // passed from parent when Sanity wired
}) {
  return (
    <section
      // min-h-svh → fills viewport height on mobile (svh accounts
      // for mobile browser chrome better than vh)
      // relative → stacking context for overlay + text layers
      className="relative flex h-full min-h-[500px] md:min-h-[600px] lg:min-h-[750px] flex-col justify-end"
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
        style={{ objectFit: "cover", objectPosition: "center bottom" }}
        className="z-0"
      />
      {/* ── Overlay ───────────────────────────────────────────
                Dark gradient from bottom → top
                Ensures text legibility over any bg image
                inset-0 → covers full section
            ──────────────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-black/40 md:bg-black/50" />

      {/* ── Content ───────────────────────────────────────────
                relative + z-20 → sits above both image (z-0) and overlay (z-10) 
                pb-10 px-6 → breathing room from viewport edges
            ──────────────────────────────────────────────────── */}
      <div className="relative z-20 flex flex-col gap-8 px-6 md:px-16 lg:px-24 pb-8 md:pb-20">
        <HeroContent
          title={siteSettings?.siteTitle ?? "Tentang Kami"}
          description={
            siteSettings?.description ??
            " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. "
          }
        />
        <BackButton href="/blog" label="Baca Blog" />
      </div>
    </section>
  );
}
