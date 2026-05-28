// src/components/shared/DotPagination.tsx
// ─────────────────────────────────────────────────────────────
// DotPagination — fully controlled carousel dot indicator
// Consumed by: BlogCardCarousel, ContactUsSection
// No internal state — parent owns activeIndex + onDotClick
// ─────────────────────────────────────────────────────────────

interface DotPaginationProps {
  // count: total number of dots → one per card
  count: number;
  // activeIndex: current active dot index
  activeIndex: number;
  // onDotClick: callback fires with target index on dot click
  onDotClick: (index: number) => void;
  // activeColor: CSS var string or hex — defaults to brand-teal
  activeColor?: string;
  // inactiveColor: CSS var string or hex — defaults to brand-tan
  inactiveColor?: string;
}

export default function DotPagination({
  count,
  activeIndex,
  onDotClick,
  activeColor = "var(--color-teal)",
  inactiveColor = "var(--color-tan)",
}: DotPaginationProps) {
  // Edge case: single item → no pagination needed
  if (count <= 1) return null;

  return (
    <div
      className="mt-4 flex items-center justify-center gap-2"
      role="tablist"
      aria-label="Navigasi carousel"
    >
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          role="tab"
          // aria-selected → signals active state to screen readers
          aria-selected={i === activeIndex}
          aria-label={`Pergi ke item ${i + 1}`}
          onClick={() => onDotClick(i)}
          style={{
            // Inline style → supports CSS var strings + hex
            // Cannot use Tailwind for dynamic color values
            backgroundColor: i === activeIndex ? activeColor : inactiveColor,
          }}
          className={[
            "rounded-full transition-all duration-250",
            // Active: larger dot
            // Inactive: smaller dot
            i === activeIndex ? "h-2.5 w-2.5" : "h-2 w-2",
            // Hover: scale up slightly
            "hover:scale-125",
          ].join(" ")}
        />
      ))}
    </div>
  );
}
