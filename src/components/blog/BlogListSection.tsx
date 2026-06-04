// src/components/blog/BlogListSection.tsx
// ─────────────────────────────────────────────────────────────
// BlogListSection — teal blob bg section
// Contains: results count + BlogCard grid + empty state
// Fully controlled — receives filtered posts from BlogPageClient
// big-cut-liquid-bg-2-teal.png: 1236×3920 → ratio 3.171
// ─────────────────────────────────────────────────────────────

import BlogCard from "@/components/shared/BlogCard";
import { type BlogPostItem } from "@/components/blog/BlogPageClient";

interface BlogListSectionProps {
    posts: BlogPostItem[];
    totalCount: number;
    hasMore: boolean;
    onLoadMore: () => void;
    onReset: () => void;
}

export default function BlogListSection({
    posts,
    totalCount,
    hasMore,
    onLoadMore,
    onReset,
}: BlogListSectionProps) {
    return (
        <section
            // pb-0 → flush with footer, no bottom gap
            // backgroundSize 100% 100% → stretches PNG to fill
            // minHeight → section always tall enough for blob
            className="px-4 pb-0 pt-8"
            style={{
                // backgroundColor: "#43766c",
                backgroundImage: "url('/images/big-cut-liquid-bg-2-teal.png')",
                backgroundSize: "100% 100%",
                // 3920/1236 = 3.171 → minHeight at current viewport
                minHeight: "calc(100vw * 3.171)",
            }}
        >
            <div className="mx-auto max-w-[430px] md:max-w-[1200px]">
                {/* ── Results count ─────────────────────────────
                    text-brand-cream/70 → muted on teal blob bg
                    mb-4 → breathing room before grid
                ─────────────────────────────────────────────── */}
                <p className="mb-4 w-fit rounded-lg bg-brand-teal px-3 py-1 font-sans text-sm text-brand-cream">
                    {totalCount === 0
                        ? "Tidak ada artikel ditemukan"
                        : `Menampilkan ${posts.length} dari ${totalCount} artikel`}
                </p>

                {/* ── Grid / Load More / Empty state ─────────────────
                    Render order:
                      1) If posts exist → show grid
                      2) Else if more posts exist → show Load More
                      3) Else → show Empty state with Reset
                ─────────────────────────────────────────────── */}
                {posts.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post) => (
                            <div
                                key={post.slug}
                                className="overflow-hidden rounded-2xl"
                            >
                                <BlogCard {...post} className="w-full" />
                            </div>
                        ))}
                    </div>
                ) : hasMore ? (
                    <div className="mt-8 flex justify-center">
                        <button
                            onClick={onLoadMore}
                            className={[
                                "rounded-full border border-brand-cream",
                                "px-8 py-3 font-sans text-sm font-medium",
                                "text-brand-cream",
                                "transition-all duration-200",
                                "hover:bg-brand-cream hover:text-brand-teal",
                                "active:scale-95",
                            ].join(" ")}
                        >
                            Muat Lebih Banyak
                        </button>
                    </div>
                ) : (
                    // Empty state — no posts and no more to load
                    <div className="flex flex-col items-center gap-3 py-16">
                        <span className="font-title text-4xl">🌱</span>
                        <p className="font-title text-lg font-bold text-brand-cream">
                            Belum ada artikel
                        </p>
                        <p className="font-sans text-sm text-brand-cream/70">
                            Coba ubah filter atau kata kunci pencarian
                        </p>
                        <button
                            onClick={onReset}
                            className={[
                                "mt-2 rounded-full border border-brand-cream",
                                "px-6 py-2 font-sans text-sm font-medium",
                                "text-brand-cream",
                                "transition-all duration-200",
                                "hover:bg-brand-cream hover:text-brand-teal",
                                "active:scale-95",
                            ].join(" ")}
                        >
                            Reset Filter
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
