// src/components/blog/SearchBar.tsx
// ─────────────────────────────────────────────────────────────
// SearchBar — controlled search input
// Searches across: title, author, category
// Fully controlled — no internal state
// Parent (BlogGrid) owns query state + filtering logic
// ─────────────────────────────────────────────────────────────

import { Search, X } from "lucide-react";

interface SearchBarProps {
  // value: current search query — controlled by parent
  value: string;
  // onChange: fires on every keystroke
  onChange: (value: string) => void;
  // placeholder: input placeholder text
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Cari artikel...",
}: SearchBarProps) {
  return (
    <div
      className={[
        // Full width input container
        "relative flex items-center",
        // Pill shape → rounded-full
        "rounded-full",
        // Border: brand-tan/40 default, brand-teal on focus-within
        "border border-brand-tan/40 bg-white",
        "transition-all duration-200",
        "focus-within:border-brand-teal focus-within:ring-2 focus-within:ring-brand-teal/20",
      ].join(" ")}
    >
      {/* ── Search icon ───────────────────────────────────
                Left-aligned inside input
                pointer-events-none → doesn't block input focus
            ─────────────────────────────────────────────── */}
      <Search size={16} className="absolute left-4 shrink-0 text-brand-tan" />

      {/* ── Input ─────────────────────────────────────────
                pl-10 → clears search icon
                pr-10 → clears clear button
                bg-transparent → inherits container bg
                outline-none → focus handled by container ring
            ─────────────────────────────────────────────── */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={[
          "w-full bg-transparent py-3 pl-10 pr-10",
          "font-sans text-sm text-brand-brown",
          "placeholder:text-brand-tan/70",
          "outline-none",
        ].join(" ")}
        aria-label="Cari artikel blog"
      />

      {/* ── Clear button ──────────────────────────────────
                Only visible when value is non-empty
                Clears query on click → onChange("")
            ─────────────────────────────────────────────── */}
      {value.length > 0 && (
        <button
          onClick={() => onChange("")}
          aria-label="Hapus pencarian"
          className={[
            "absolute right-4",
            "flex h-5 w-5 items-center justify-center rounded-full",
            "bg-brand-tan/20 text-brand-tan",
            "transition-all duration-200 hover:bg-brand-tan/40",
          ].join(" ")}
        >
          <X size={12} />
        </button>
      )}
    </div>
  );
}
