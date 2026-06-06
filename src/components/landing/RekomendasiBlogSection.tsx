// src/components/landing/RekommendasiBlogSection.tsx
// ─────────────────────────────────────────────────────────────
// RekommendasiBlogSection — blob SVG bg + heading + carousel
// Delegates carousel + card rendering to BlogCardCarousel
// Server Component — no 'use client' here
// Client boundary is isolated to BlogCardCarousel
// ─────────────────────────────────────────────────────────────

import BlogCardCarousel from "@/components/landing/BlogCardCarousel";
import type { BlogCardProps } from "@/components/shared/BlogCard";

export default function RekommendasiBlogSection({
  items,
}: {
  items: BlogCardProps[]; // passed from parent when Sanity wired
}) {
  return (
    <section
      className="relative px-4 py-16 md:py-24"
      style={{
        backgroundColor: "var(--brand-brown)", // Fallback for browsers that don't support CSS variables
        backgroundImage: "url('/images/cut-liquid-bg-1-brown.png')",
        backgroundSize: "100% 100%",
        minHeight: "clamp(600px, calc(100vw * 1.5), 900px)",
      }}
    >
      <div className="relative z-10">
        {/* ── Section heading ───────────────────────────
                    text-brand-cream → light text on dark blob bg
                    text-center → centered per mockup
                    px-4 → matches carousel px-4 alignment
                ─────────────────────────────────────────────── */}
        <h2
          className="section-title text-brand-cream"
          style={{ textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}
        >
          Rekomendasi Blog
        </h2>

        {/* ── BlogCardCarousel ──────────────────────────
                    No props → uses PLACEHOLDER_POSTS internally
                    When Sanity wired: pass items={fetchedPosts}
                ─────────────────────────────────────────────── */}
        <BlogCardCarousel items={items} />
      </div>
    </section>
  );
}
