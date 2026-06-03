// src/components/blog/BlogPageClient.tsx
// ─────────────────────────────────────────────────────────────
// BlogPageClient — owns all filter state
// Renders search/filter controls + grid as separate sections
// Lifted state → controls in cream section, grid in teal section
// ─────────────────────────────────────────────────────────────

"use client";

import { useMemo, useState } from "react";
import BlogCard from "@/components/shared/BlogCard";
import SearchBar from "@/components/blog/SearchBar";
import FilterControls, {
    type Category,
    type SortOption,
} from "@/components/blog/FilterControls";

// ── Placeholder data ──────────────────────────────────────────
const PLACEHOLDER_POSTS: BlogPostItem[] = [
    {
        slug: "lorem-ipsum-1",
        title: "Lorem ipsum dolor sit amet consectetur",
        author: "Lorem Ipsum",
        date: "3 Jan 2026",
        rawDate: "2026-01-03",
        imageUrl: "/images/ori-logo.png",
        bgColor: "bg-brand-teal",
        category: "Program",
    },
    {
        slug: "lorem-ipsum-2",
        title: "Lorem ipsum dolor sit amet consectetur",
        author: "Lorem Ipsum",
        date: "5 Jan 2026",
        rawDate: "2026-01-05",
        imageUrl: "/images/ori-logo.png",
        bgColor: "bg-brand-tan",
        category: "Berita",
    },
    {
        slug: "lorem-ipsum-3",
        title: "Lorem ipsum dolor sit amet consectetur",
        author: "Admin",
        date: "7 Jan 2026",
        rawDate: "2026-01-07",
        imageUrl: "/images/ori-logo.png",
        bgColor: "bg-brand-brown",
        category: "Edukasi",
    },
    {
        slug: "lorem-ipsum-4",
        title: "Lorem ipsum dolor sit amet consectetur",
        author: "Admin",
        date: "9 Jan 2026",
        rawDate: "2026-01-09",
        imageUrl: "/images/ori-logo.png",
        bgColor: "bg-brand-teal",
        category: "Kegiatan",
    },
    {
        slug: "lorem-ipsum-5",
        title: "Lorem ipsum dolor sit amet consectetur",
        author: "Lorem Ipsum",
        date: "11 Jan 2026",
        rawDate: "2026-01-11",
        imageUrl: "/images/ori-logo.png",
        bgColor: "bg-brand-tan",
        category: "Program",
    },
    {
        slug: "lorem-ipsum-6",
        title: "Lorem ipsum dolor sit amet consectetur",
        author: "Admin",
        date: "13 Jan 2026",
        rawDate: "2026-01-13",
        imageUrl: "/images/ori-logo.png",
        bgColor: "bg-brand-brown",
        category: "Berita",
    },
];

interface BlogPageClientProps {
    posts?: BlogPostItem[];
}

export default function BlogPageClient({
    posts = PLACEHOLDER_POSTS,
}: BlogPageClientProps) {
    // ── Filter state ──────────────────────────────────────────
    const [query, setQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState<Category>("Semua");
    const [sortOrder, setSortOrder] = useState<SortOption>("newest");

    // ── Derived: filtered + sorted posts ─────────────────────
    const filtered = useMemo(() => {
        const q = query.toLowerCase().trim();
        return posts
            .filter((post) => {
                if (q) {
                    const matchesTitle = post.title.toLowerCase().includes(q);
                    const matchesAuthor = post.author.toLowerCase().includes(q);
                    const matchesCategory = post.category.toLowerCase().includes(q);
                    if (!matchesTitle && !matchesAuthor && !matchesCategory)
                        return false;
                }
                if (activeCategory !== "Semua" && post.category !== activeCategory)
                    return false;
                return true;
            })
            .sort((a, b) =>
                sortOrder === "newest"
                    ? b.rawDate.localeCompare(a.rawDate)
                    : a.rawDate.localeCompare(b.rawDate)
            );
    }, [posts, query, activeCategory, sortOrder]);

    return (
        <>
            {/* ══ Part 1: Search + Filter (cream bg) ═══════════ */}
            <section className="bg-brand-cream px-4 py-8">
                <div className="mx-auto max-w-[430px] md:max-w-[1200px]">
                    <h1 className="section-title mb-6 text-brand-teal">
                        Blog
                    </h1>
                    <div className="flex flex-col gap-4">
                        <SearchBar value={query} onChange={setQuery} />
                        <FilterControls
                            activeCategory={activeCategory}
                            onCategoryChange={setActiveCategory}
                            sortOrder={sortOrder}
                            onSortChange={setSortOrder}
                        />
                    </div>
                </div>
            </section>

            {/* ══ Part 2: Blog grid (teal blob bg) ════════════ */}
            <section
                className="relative px-4 pb-16 pt-8"
                style={{
                    backgroundColor: "#43766c",
                    backgroundImage:
                        "url('/images/big-cut-liquid-bg-2-teal.png')",
                    backgroundSize: "100% 100%",
                    minHeight: "calc(100vw * 3.171)",
                }}
            >
                <div className="mx-auto max-w-[430px] md:max-w-[1200px]">
                    {/* ── Results count ─────────────────────── */}
                    <p className="mb-4 font-sans text-sm text-brand-cream/70">
                        {filtered.length === 0
                            ? "Tidak ada artikel ditemukan"
                            : `${filtered.length} artikel ditemukan`}
                    </p>

                    {/* ── Grid or empty state ───────────────── */}
                    {filtered.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {filtered.map((post) => (
                                <BlogCard
                                    key={post.slug}
                                    {...post}
                                    className="w-full"
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-3 py-16">
                            <span className="font-title text-4xl">🌱</span>
                            <p className="font-title text-lg font-bold text-brand-cream">
                                Belum ada artikel
                            </p>
                            <p className="font-sans text-sm text-brand-cream/70">
                                Coba ubah filter atau kata kunci pencarian
                            </p>
                            <button
                                onClick={() => {
                                    setQuery("");
                                    setActiveCategory("Semua");
                                    setSortOrder("newest");
                                }}
                                className={[
                                    "mt-2 rounded-full border border-brand-cream",
                                    "px-6 py-2 font-sans text-sm font-medium text-brand-cream",
                                    "transition-all duration-200 hover:bg-brand-cream hover:text-brand-teal",
                                    "active:scale-95",
                                ].join(" ")}
                            >
                                Reset Filter
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}