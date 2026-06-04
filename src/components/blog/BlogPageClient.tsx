// src/components/blog/BlogPageClient.tsx
// ─────────────────────────────────────────────────────────────
// BlogPageClient — owns all filter state
// Renders BlogSearchSection + BlogListSection
// No JSX sections here — purely state + derived data + passdown
// ─────────────────────────────────────────────────────────────

"use client";

import { useMemo, useState } from "react";
import BlogSearchSection from "@/components/blog/BlogSearchSection";
import BlogListSection from "@/components/blog/BlogListSection";
import { type Category, type SortOption } from "@/components/blog/FilterControls";
import { type BlogCardProps } from "@/components/shared/BlogCard";

// ── BlogPostItem type ─────────────────────────────────────────
// Exported → consumed by BlogListSection
// Extends BlogCardProps with category + rawDate
export interface BlogPostItem extends BlogCardProps {
    category: Category;
    // rawDate: ISO 8601 string → used for date sort comparison
    // e.g. "2026-01-03" — lexicographically sortable
    rawDate: string;
}

// ── Placeholder data ──────────────────────────────────────────
// Replace with Sanity fetch in blog/page.tsx:
// *[_type == "post"] | order(publishedAt desc) {
//   _id, title, slug, author->{name},
//   publishedAt, mainImage, category
// }
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
    // posts: passed from blog/page.tsx when Sanity wired
    // Falls back to PLACEHOLDER_POSTS if not provided
    posts?: BlogPostItem[];
}

export default function BlogPageClient({
    posts = PLACEHOLDER_POSTS,
}: BlogPageClientProps) {
    // ── Filter state ──────────────────────────────────────────
    const [query, setQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState<Category>("Semua");
    const [sortOrder, setSortOrder] = useState<SortOption>("newest");
    const [page, setPage] = useState(0);
    const POSTS_PER_PAGE = 10;

    // ── Derived: filtered + sorted posts ─────────────────────
    // Recomputes only when posts, query, activeCategory,
    // or sortOrder changes
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

    // paginated: slice of filtered posts for current page
    const paginated = useMemo(
        () => filtered.slice(0, (page + 1) * POSTS_PER_PAGE),
        [filtered, page]
    );

    // hasMore: true if more posts exist beyond current page
    const hasMore = paginated.length < filtered.length;

    // ── Reset handler ─────────────────────────────────────────
    // Passed to BlogListSection empty state reset button
    function handleReset() {
        setQuery("");
        setActiveCategory("Semua");
        setSortOrder("newest");
    }
    // Reset page when any filter changes
    // Mechanism: derived via useEffect on filter deps
    // Prevents showing page 3 of a newly filtered result set
    function handleQueryChange(value: string) {
        setQuery(value);
        setPage(0);
    }
    function handleCategoryChange(category: Category) {
        setActiveCategory(category);
        setPage(0);
    }
    function handleSortChange(sort: SortOption) {
        setSortOrder(sort);
        setPage(0);
    }
    function handleLoadMore() {
        setPage((prev) => prev + 1);
    }

    return (
        <>
            {/* ── BlogSearchSection ─────────────────────────────
                cream bg — heading + search + filter
                Receives controlled state + handlers
            ─────────────────────────────────────────────── */}
            <BlogSearchSection
                query={query}
                onQueryChange={setQuery}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
                sortOrder={sortOrder}
                onSortChange={setSortOrder}
            />

            {/* ── BlogListSection ───────────────────────────────
                teal blob bg — results count + grid + empty state
                Receives filtered posts + reset handler
            ─────────────────────────────────────────────── */}
            <BlogListSection
                posts={paginated}
                totalCount={filtered.length}
                hasMore={hasMore}
                onLoadMore={handleLoadMore}
                onReset={handleReset}
            />
        </>
    );
}