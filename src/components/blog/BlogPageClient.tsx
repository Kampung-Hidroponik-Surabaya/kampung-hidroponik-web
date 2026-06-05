// src/components/blog/BlogPageClient.tsx
"use client";

import { useMemo, useState } from "react";
import BlogSearchSection from "@/components/blog/BlogSearchSection";
import BlogListSection from "@/components/blog/BlogListSection";
import { type Category, type SortOption } from "@/components/blog/FilterControls";
import { type BlogCardProps } from "@/components/shared/BlogCard";

// ── BlogPostItem type ─────────────────────────────────────────
// Exported → consumed by BlogListSection + blog/page.tsx
export interface BlogPostItem extends BlogCardProps {
    // categories: array of category title strings
    // derived from Sanity Post.categories[].title at transform layer
    categories: string[];
    // rawDate: ISO 8601 string → lexicographic sort
    rawDate: string;
}

interface BlogPageClientProps {
    // required — parent blog/page.tsx always passes Sanity data
    posts: BlogPostItem[];
    // categories: for FilterControls dynamic button list
    categories: string[];
}

export default function BlogPageClient({
    posts,
    categories,
}: BlogPageClientProps) {
    const [query, setQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState<Category>("Semua");
    const [sortOrder, setSortOrder] = useState<SortOption>("newest");
    const [page, setPage] = useState(0);
    const POSTS_PER_PAGE = 10;

    const filtered = useMemo(() => {
        const q = query.toLowerCase().trim();
        return posts
            .filter((post) => {
                if (q) {
                    const matchesTitle = post.title.toLowerCase().includes(q);
                    const matchesAuthor = post.author.toLowerCase().includes(q);
                    // search across all category titles
                    const matchesCategory = post.categories?.some((c) =>
                        c.toLowerCase().includes(q)
                    );
                    if (!matchesTitle && !matchesAuthor && !matchesCategory)
                        return false;
                }
                if (
                    activeCategory !== "Semua" &&
                    !post.categories?.some((c) => c === activeCategory)
                )
                    return false;
                return true;
            })
            .sort((a, b) =>
                sortOrder === "newest"
                    ? b.rawDate.localeCompare(a.rawDate)
                    : a.rawDate.localeCompare(b.rawDate)
            );
    }, [posts, query, activeCategory, sortOrder]);

    const paginated = useMemo(
        () => filtered.slice(0, (page + 1) * POSTS_PER_PAGE),
        [filtered, page]
    );

    const hasMore = paginated.length < filtered.length;

    function handleReset() {
        setQuery("");
        setActiveCategory("Semua");
        setSortOrder("newest");
        setPage(0);
    }
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
            <BlogSearchSection
                query={query}
                onQueryChange={handleQueryChange}
                activeCategory={activeCategory}
                onCategoryChange={handleCategoryChange}
                sortOrder={sortOrder}
                onSortChange={handleSortChange}
                // pass dynamic category list from Sanity
                categories={categories}
            />
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