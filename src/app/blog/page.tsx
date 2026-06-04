// src/app/blog/page.tsx
// ─────────────────────────────────────────────────────────────
// Blog index page — Server Component
// Layout (top → bottom):
//   1. RekommendasiBlogSection — brown blob + carousel
//      (reused from landing page — already working)
//   2. BlogPageClient — cream search + teal blob grid
// ─────────────────────────────────────────────────────────────

import RekommendasiBlogSection from "@/components/landing/RekomendasiBlogSection";
import BlogPageClient from "@/components/blog/BlogPageClient";
import FooterSection from "@/components/landing/FooterSection";

export const metadata = { title: "Blog" };

export default function BlogPage() {
    return (
        <main style={{ paddingTop: "var(--nav-height, 64px)" }}>
            {/* ── Rekomendasi Blog ──────────────────────────────
                Reuses landing page section directly
                Brown blob bg + BlogCardCarousel
                Already working + responsive
            ─────────────────────────────────────────────── */}
            <div className="mt-8">
                <RekommendasiBlogSection />
            </div>

            {/* ── Blog search + list ────────────────────────────
                BlogPageClient owns all filter state
                Renders BlogSearchSection + BlogListSection
            ─────────────────────────────────────────────── */}
            <BlogPageClient />
            <FooterSection />
        </main>
    );
}