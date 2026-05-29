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

export default function HeroSection() {
  return (
    <section
      // min-h-svh → fills viewport height on mobile (svh accounts
      // for mobile browser chrome better than vh)
      // relative → stacking context for overlay + text layers
      className="relative flex h-[40vh] flex-col justify-center"
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
        <HeroContent
          title="Tentang Kami"
          description=" Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. 
"
        />
        <BackButton href="/blog" label="Baca Blog" />
      </div>
    </section>
  );
}
