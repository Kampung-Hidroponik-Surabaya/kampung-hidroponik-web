// src/components/blog/BlogSearchSection.tsx
// ─────────────────────────────────────────────────────────────
// BlogSearchSection — cream bg section
// Contains: page heading + search bar + filter controls
// Fully controlled — receives state + handlers from BlogPageClient
// ─────────────────────────────────────────────────────────────

import SearchBar from "@/components/blog/SearchBar";
import FilterControls, {
    type Category,
    type SortOption,
} from "@/components/blog/FilterControls";

interface BlogSearchSectionProps {
    query: string;
    onQueryChange: (value: string) => void;
    activeCategory: Category;
    onCategoryChange: (category: Category) => void;
    sortOrder: SortOption;
    onSortChange: (sort: SortOption) => void;
}

export default function BlogSearchSection({
    query,
    onQueryChange,
    activeCategory,
    onCategoryChange,
    sortOrder,
    onSortChange,
}: BlogSearchSectionProps) {
    return (
        <section className="bg-brand-cream px-4 py-8">
            <div className="mx-auto max-w-[430px] md:max-w-[1200px]">
                {/* ── Page heading ──────────────────────────────
                    text-brand-teal → GSM primary on cream bg
                    mb-6 → breathing room before search
                ─────────────────────────────────────────────── */}
                <h1 className="section-title mb-6 text-brand-teal">
                    Blog
                </h1>

                <div className="flex flex-col gap-4">
                    {/* ── Search bar ────────────────────────────
                        Searches: title + author + category
                    ─────────────────────────────────────────── */}
                    <SearchBar
                        value={query}
                        onChange={onQueryChange}
                    />

                    {/* ── Filter controls ───────────────────────
                        Category pills + date sort dropdown
                    ─────────────────────────────────────────── */}
                    <FilterControls
                        activeCategory={activeCategory}
                        onCategoryChange={onCategoryChange}
                        sortOrder={sortOrder}
                        onSortChange={onSortChange}
                    />
                </div>
            </div>
        </section>
    );
}