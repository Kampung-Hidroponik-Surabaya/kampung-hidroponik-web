// src/app/blog/page.tsx
// ─────────────────────────────────────────────────────────────
// Blog index page — Server Component
// Layout (top → bottom):
//   1. RekommendasiBlogSection — brown blob + carousel
//      (reused from landing page — already working)
//   2. BlogPageClient — cream search + teal blob grid
// ─────────────────────────────────────────────────────────────

import RekomendasiBlogSection from "@/components/landing/RekomendasiBlogSection";
import { getAllPosts, getAllCategories } from "@/lib/queries";
import { postToBlogCardProps } from "@/lib/sanity.utils";
import BlogPageClient from "@/components/blog/BlogPageClient";
import type { BlogPostItem } from "@/components/blog/BlogPageClient";
import FooterSection from "@/components/landing/FooterSection";
import { getSiteSettings } from "@/lib/queries";
import { getFeaturedPosts } from "@/lib/queries";


export const revalidate = 60;
export const metadata = { title: "Blog" };

export default async function BlogPage() {
    const [posts, categories] = await Promise.all([
        getAllPosts(),
        getAllCategories(),
    ]);

    const [
        featuredPosts,
        siteSettings,
      ] = await Promise.all([
        getFeaturedPosts(),
        getSiteSettings(),
      ])

    const featuredItems = featuredPosts.map((post, index) => postToBlogCardProps(post, index))

    // Transform Post[] -> BlogPostItem[] at server boundary
    // BlogPageClient receives same shape it already expects
    const blogItems: BlogPostItem[] = posts.map((post, index) => ({
        ...postToBlogCardProps(post, index),
        // rawDate: ISO string for sort comparison
        rawDate: post.publishedAt ?? '',
        // category: cast to Category string union via title
        // FilterControls Category type must include dynamic values
        category: (post.category?.title ?? 'Lainnya') as BlogPostItem['category'],
    }));

    return (
        <main style={{ paddingTop: "var(--nav-height, 64px)" }}>
            {/* ── Rekomendasi Blog ──────────────────────────────
                Reuses landing page section directly
                Brown blob bg + BlogCardCarousel
                Already working + responsive
            ─────────────────────────────────────────────── */}
            <div className="mt-8">
                <RekomendasiBlogSection items={featuredItems} />
            </div>

            {/* ── Blog search + list ────────────────────────────
                BlogPageClient owns all filter state
                Renders BlogSearchSection + BlogListSection
            ─────────────────────────────────────────────── */}
            <BlogPageClient posts={blogItems} />
            <FooterSection siteSettings={siteSettings} />
        </main>
    );
}