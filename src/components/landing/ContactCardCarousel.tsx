// src/components/landing/ContactCardCarousel.tsx
// ─────────────────────────────────────────────────────────────
// ContactCardCarousel — horizontal CSS scroll snap carousel
// Hosts ContactCard components, syncs DotPagination to scroll
// Mirrors BlogCardCarousel architecture exactly
// 'use client' → scroll event listener + useState + useRef
// ─────────────────────────────────────────────────────────────

"use client";

import { useRef, useState } from "react";
import ContactCard, {
  type ContactCardProps,
} from "@/components/landing/ContactCard";
import DotPagination from "@/components/shared/DotPagination";

// ── Placeholder data ──────────────────────────────────────────
// Replace with Sanity fetch in ContactUsSection later:
// *[_type == "contact"] | order(order asc) {
//   _id, name, phone, avatar
// }
const PLACEHOLDER_CONTACTS: ContactCardProps[] = [
  {
    id: "1",
    name: "Lorem Ipsum",
    phone: "6281277777777",
    bgColor: "bg-brand-teal",
  },
  {
    id: "2",
    name: "Lorem Ipsum",
    phone: "6767676767",
    bgColor: "bg-brand-tan",
  },
  {
    id: "3",
    name: "Lorem Ipsum",
    phone: "6767676767",
    bgColor: "bg-brand-brown",
  },
];

interface ContactCardCarouselProps {
  // items: passed from parent when Sanity wired
  // falls back to PLACEHOLDER_CONTACTS if not provided
  items?: ContactCardProps[];
}

export default function ContactCardCarousel({
  items = PLACEHOLDER_CONTACTS,
}: ContactCardCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // ── Scroll sync ───────────────────────────────────────────
  // Mirrors BlogCardCarousel scroll sync exactly
  function handleScroll() {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth } = scrollRef.current;
    const cardWidth = scrollWidth / items.length;
    const index = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.min(index, items.length - 1));
  }

  // ── Dot click → programmatic scroll ──────────────────────
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
                gap-4 → gutter between cards
                px-4 → left padding, peek visible on right
                pb-4 → bottom breathing room
                scroll-snap-type mandatory → clean card snapping
                scrollbar hidden → clean UI
            ─────────────────────────────────────────────── */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className={[
          "flex gap-4 overflow-x-auto px-4 pb-4",
          "[scroll-snap-type:x_mandatory]",
          "[&::-webkit-scrollbar]:hidden",
        ].join(" ")}
        style={{ scrollbarWidth: "none" }}
      >
        {items.map((contact) => (
          <ContactCard key={contact.id} {...contact} />
        ))}
      </div>

      {/* ── DotPagination ─────────────────────────────────
                activeColor → brand-teal on cream bg
                inactiveColor → brand-tan (muted)
                returns null if items.length <= 1
            ─────────────────────────────────────────────── */}
      <DotPagination
        count={items.length}
        activeIndex={activeIndex}
        onDotClick={handleDotClick}
        activeColor="#43766c"
        inactiveColor="#b19470"
      />
    </div>
  );
}
