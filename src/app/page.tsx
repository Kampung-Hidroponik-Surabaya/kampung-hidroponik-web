// src/app/page.tsx
// ─────────────────────────────────────────────────────────────
// Landing Page — assembles all section components in order
// Server Component (no 'use client') — client boundaries are
// isolated to individual interactive sections
// ─────────────────────────────────────────────────────────────

import HeroSection from "@/components/landing/HeroSection";
import ProgramTerbaruSection from "@/components/landing/ProgramTerbaruSection";
import FeaturedPostCard from "@/components/landing/FeaturedPostCard";
import RekommendasiBlogSection from "@/components/landing/RekomendasiBlogSection";
import ContactUsSection from "@/components/landing/ContactUsSection";
import GallerySection from "@/components/landing/GallerySection";
import FooterSection from "@/components/landing/FooterSection";

export const metadata = { title: "Beranda" };

export default function HomePage() {
  return (
    // page-wrapper → max-width constraint from globals.css
    // No padding-top override needed — HeroSection is
    // full-bleed, MobileNavbar not yet mounted
    <main style={{ paddingTop: "var(--nav-height, 64px)" }}>
      <HeroSection />
      <ProgramTerbaruSection />
      <FeaturedPostCard />
      <RekommendasiBlogSection />
      <ContactUsSection />
      <GallerySection />
      <div className="bg-brand-cream py-6" />{" "}
      {/* Spacerto prevent Footer overlap on mobile */}
      <FooterSection />
    </main>
  );
}
