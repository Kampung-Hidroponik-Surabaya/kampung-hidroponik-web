// src/components/landing/RekommendasiBlogSection.tsx
// ─────────────────────────────────────────────────────────────
// RekommendasiBlogSection — blob bg + horizontal scroll carousel
// of BlogCards. Carousel: CSS scroll snap, no external library.
// DotPagination synced to activeIndex via onScroll.
// Static placeholder: no Sanity fetch yet.
// ─────────────────────────────────────────────────────────────

"use client";

import { useRef, useState } from "react";
import Link from "next/link";

// ── Placeholder data ──────────────────────────────────────────
const PLACEHOLDER_POSTS = [
  {
    id: "1",
    slug: "post-1",
    title: "Lorem ipsum dolor sit amet",
    author: "Admin",
    date: "3 Jan 2026",
    bgColor: "bg-brand-teal",
  },
  {
    id: "2",
    slug: "post-2",
    title: "Lorem ipsum dolor sit amet",
    author: "Admin",
    date: "5 Jan 2026",
    bgColor: "bg-brand-tan",
  },
  {
    id: "3",
    slug: "post-3",
    title: "Lorem ipsum dolor sit amet",
    author: "Admin",
    date: "7 Jan 2026",
    bgColor: "bg-brand-brown",
  },
];

// ── BlogCard ──────────────────────────────────────────────────
// Atomic card: image placeholder, title, author, date, CTA link
// flex-shrink-0 + w-[75vw] max-w-[280px] → fixed card width
// inside horizontal scroll container
// ─────────────────────────────────────────────────────────────
function BlogCard({
  slug,
  title,
  author,
  date,
  bgColor,
}: {
  slug: string;
  title: string;
  author: string;
  date: string;
  bgColor: string;
}) {
  return (
    <div
      // flex-shrink-0 → prevents card from collapsing in flex row
      // scroll-snap-align-start → snaps to left edge on scroll
      // w-[75vw] max-w-[280px] → 75% viewport width, capped at 280px
      className="flex w-[75vw] max-w-[280px] flex-shrink-0 snap-start flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-brand-tan/30"
    >
      {/* ── Thumbnail placeholder ─────────────────────── */}
      <div className={["aspect-video w-full", bgColor].join(" ")} />

      {/* ── Card body ─────────────────────────────────── */}
      <div className="flex flex-col gap-2 p-3">
        <h3 className="line-clamp-2 font-title text-sm font-bold text-brand-brown">
          {title}
        </h3>

        {/* ── Meta row: author + date ────────────────── */}
        <div className="flex items-center justify-between">
          <span className="font-sans text-xs text-brand-brown/60">
            {author}
          </span>
          <span className="font-sans text-xs text-brand-brown/60">{date}</span>
        </div>

        {/* ── CTA link ──────────────────────────────── */}
        <Link
          href={`/blog/${slug}`}
          className="mt-1 text-center font-sans text-xs font-medium text-brand-teal underline-offset-2 hover:underline"
        >
          Baca Selengkapnya
        </Link>
      </div>
    </div>
  );
}

// ── DotPagination ─────────────────────────────────────────────
// Fully controlled — no internal state
// count: total dots | activeIndex: current | onDotClick: scroll
// ─────────────────────────────────────────────────────────────
function DotPagination({
  count,
  activeIndex,
  onDotClick,
}: {
  count: number;
  activeIndex: number;
  onDotClick: (index: number) => void;
}) {
  return (
    <div className="mt-4 flex items-center justify-center gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          aria-label={`Pergi ke item ${i + 1}`}
          aria-current={i === activeIndex ? "true" : undefined}
          onClick={() => onDotClick(i)}
          // Transition on width + bg → smooth active state change
          className={[
            "rounded-full transition-all duration-250",
            i === activeIndex
              ? "h-2.5 w-2.5 bg-brand-teal"
              : "h-2 w-2 bg-brand-tan",
          ].join(" ")}
        />
      ))}
    </div>
  );
}

// ── RekommendasiBlogSection ───────────────────────────────────
// Section wrapper: blob bg (CSS clip-path) + heading + carousel
// ─────────────────────────────────────────────────────────────
export default function RekommendasiBlogSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // ── Scroll sync ───────────────────────────────────────────
  // onScroll → reads scrollLeft → derives activeIndex
  // cardWidth = 75vw capped at 280px + gap (12px)
  // Math.round → snaps to nearest card index
  function handleScroll() {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.scrollWidth / PLACEHOLDER_POSTS.length;
    const index = Math.round(scrollRef.current.scrollLeft / cardWidth);
    setActiveIndex(index);
  }

  // ── Dot click → programmatic scroll ──────────────────────
  // scrollTo with behavior: smooth → animates to target card
  function handleDotClick(index: number) {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.scrollWidth / PLACEHOLDER_POSTS.length;
    scrollRef.current.scrollTo({ left: index * cardWidth, behavior: "smooth" });
    setActiveIndex(index);
  }

  return (
    <section className="relative overflow-hidden py-10">
      {/* ── Blob background ───────────────────────────────
                CSS clip-path organic shape → simulates SVG blob
                absolute inset → fills section behind content
                z-0 → sits below all content
            ─────────────────────────────────────────────── */}
      <img
        src="/icons/liquid-bg-1-brown.svg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 z-0 size-full object-cover"
      />

      {/* ── Content layer ─────────────────────────────────
                relative z-10 → above blob background
            ─────────────────────────────────────────────── */}
      <div className="relative z-10 px-4">
        <h2 className="mb-6 text-center font-title text-2xl font-bold text-brand-cream">
          Rekomendasi Blog
        </h2>

        {/* ── Carousel scroll container ─────────────────
                    flex + overflow-x-auto → horizontal scroll
                    scroll-snap-type-x-mandatory → snap behavior
                    gap-3 → gutter between cards
                    scrollbar hidden via [&::-webkit-scrollbar]
                    pb-2 → prevents ring clipping at bottom
                ─────────────────────────────────────────────── */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-3 overflow-x-auto pb-2 [scroll-snap-type:x_mandatory] [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none" }}
        >
          {PLACEHOLDER_POSTS.map((post) => (
            <BlogCard key={post.id} {...post} />
          ))}
        </div>

        <DotPagination
          count={PLACEHOLDER_POSTS.length}
          activeIndex={activeIndex}
          onDotClick={handleDotClick}
        />
      </div>
    </section>
  );
}
