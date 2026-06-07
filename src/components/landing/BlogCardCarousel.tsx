// src/components/landing/BlogCardCarousel.tsx
// ─────────────────────────────────────────────────────────────
// BlogCardCarousel — horizontal CSS scroll snap carousel
// Hosts BlogCard components, syncs DotPagination to scroll
// No external carousel library — CSS scroll snap only
// 'use client' → scroll event listener + useState + useRef
// ─────────────────────────────────────────────────────────────

"use client";

import { useRef, useState } from "react";
import BlogCard, { type BlogCardProps } from "@/components/shared/BlogCard";
import DotPagination from "@/components/shared/DotPagination";

// Parent: RekomendasiBlogSection (landing) or blog/page.tsx

interface BlogCardCarouselProps {
  // items: array of BlogCardProps — passed from parent section
  // when Sanity fetch is wired; falls back to PLACEHOLDER_POSTS
  items: BlogCardProps[];
}

export default function BlogCardCarousel({ items }: BlogCardCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // ── Scroll sync ───────────────────────────────────────────
  // Mechanism:
  //   onScroll fires → read scrollLeft from ref
  //   cardWidth = scrollWidth / total items
  //   Math.round(scrollLeft / cardWidth) → nearest card index
  //   setActiveIndex → DotPagination re-renders
  function handleScroll() {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth } = scrollRef.current;
    const cardWidth = scrollWidth / items.length;
    const index = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.min(index, items.length - 1));
  }

  // ── Dot click → programmatic scroll ──────────────────────
  // scrollTo with behavior: smooth → animates to target card
  // setActiveIndex immediately → dot updates before scroll ends
  function handleDotClick(index: number) {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.scrollWidth / items.length;
    scrollRef.current.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    });
    setActiveIndex(index);
  }

  return (
    <div className="flex flex-col">
      {/* ── Scroll container ──────────────────────────────
                flex + overflow-x-auto → horizontal scroll
                [scroll-snap-type:x_mandatory] → snap behavior
                gap-3 → gutter between cards
                px-4 → left/right breathing room
                pb-2 → prevents ring/shadow clipping at bottom
                scrollbar hidden → clean UI on all browsers
                Firefox: scrollbar-width none via style prop
            ─────────────────────────────────────────────── */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className={[
          "flex gap-4 overflow-x-auto px-4 pb-4 md:px-8 lg:px-16",
          "[scroll-snap-type:x_mandatory]",
          "[&::-webkit-scrollbar]:hidden",
        ].join(" ")}
        style={{ scrollbarWidth: "none" }}
      >
        {items.map((post) => (
          <BlogCard
            key={post.slug}
            {...post}
            className="scroll-snap-align-start w-[80vw] md:w-[40vw] lg:w-[30vw] flex-shrink-0"
          />
        ))}
      </div>

      {/* ── DotPagination ─────────────────────────────────
                count = items.length → one dot per card
                DotPagination returns null if count <= 1
                activeColor/inactiveColor → cream/cream-muted
                on dark blob bg of RekommendasiBlogSection
            ─────────────────────────────────────────────── */}
      <DotPagination
        count={items.length}
        activeIndex={activeIndex}
        onDotClick={handleDotClick}
        activeColor="var(--color-teal)"
        inactiveColor="var(--color-cream)"
      />
    </div>
  );
}
