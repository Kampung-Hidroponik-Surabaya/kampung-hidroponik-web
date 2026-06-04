// src/components/blog/FilterControls.tsx
// ─────────────────────────────────────────────────────────────
// FilterControls — category pills + date sort + author filter
// Fully controlled — no internal state
// Parent (BlogGrid) owns all filter state
// ─────────────────────────────────────────────────────────────

import { ChevronDown } from "lucide-react";

// ── Category definitions ──────────────────────────────────────
export const CATEGORIES = [
  "Semua",
  "Program",
  "Berita",
  "Edukasi",
  "Kegiatan",
] as const;

export type Category = (typeof CATEGORIES)[number];

// ── Sort options ──────────────────────────────────────────────
export const SORT_OPTIONS = [
  { label: "Terbaru", value: "newest" },
  { label: "Terlama", value: "oldest" },
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number]["value"];

interface FilterControlsProps {
  // Category filter
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
  // Date sort
  sortOrder: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export default function FilterControls({
  activeCategory,
  onCategoryChange,
  sortOrder,
  onSortChange,
}: FilterControlsProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* ── Category pills ────────────────────────────────
                Horizontal scroll → all pills visible on mobile
                Active pill: bg-brand-teal text-brand-cream
                Inactive pill: bg-white border-brand-tan/40
            ─────────────────────────────────────────────── */}
      <div
        className={[
          "flex gap-2 overflow-x-auto pb-1",
          "[&::-webkit-scrollbar]:hidden",
        ].join(" ")}
        style={{ scrollbarWidth: "none" }}
        role="tablist"
        aria-label="Filter kategori"
      >
        {CATEGORIES.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              role="tab"
              aria-selected={isActive}
              onClick={() => onCategoryChange(category)}
              className={[
                "shrink-0 rounded-full px-4 py-2",
                "font-sans text-sm font-medium",
                "transition-all duration-200",
                "border",
                isActive
                  ? "border-brand-teal bg-brand-teal text-brand-cream"
                  : "border-brand-tan/40 bg-white text-brand-brown hover:border-brand-teal hover:text-brand-teal",
              ].join(" ")}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* ── Sort + Author row ─────────────────────────────
                flex row → sort left, author right
                Both: native <select> styled as pill dropdowns
            ─────────────────────────────────────────────── */}
      <div className="relative w-full md:w-48">
        <select
          value={sortOrder}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className={[
            "w-full appearance-none rounded-full",
            "border border-brand-tan/40 bg-white",
            "py-2 pl-4 pr-8",
            "font-sans text-sm text-brand-brown",
            "transition-all duration-200",
            "focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20",
            "cursor-pointer",
          ].join(" ")}
          aria-label="Urutkan berdasarkan tanggal"
        >
          {SORT_OPTIONS.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={14}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-brand-tan"
        />
      </div>
    </div>
  );
}
