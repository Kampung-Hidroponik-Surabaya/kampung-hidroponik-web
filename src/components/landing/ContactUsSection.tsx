// src/components/landing/ContactUsSection.tsx
// ─────────────────────────────────────────────────────────────
// ContactUsSection — section heading + horizontal scroll carousel
// of ContactCards. Mirrors BlogCardCarousel architecture exactly.
// ContactCard: avatar placeholder, phone (tel: link), name label.
// Static placeholder: no Sanity fetch yet.
// ─────────────────────────────────────────────────────────────

"use client";

import { useRef, useState } from "react";
import { Phone } from "lucide-react";

// ── Placeholder data ──────────────────────────────────────────
const PLACEHOLDER_CONTACTS = [
  {
    id: "1",
    name: "Lorem Ipsum",
    phone: "6767676767",
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

// ── ContactCard ───────────────────────────────────────────────
// Atomic card: avatar placeholder (top, centered), phone number
// as tel: link, name label below.
// flex-shrink-0 + fixed width → correct behavior inside carousel
// ─────────────────────────────────────────────────────────────
function ContactCard({
  name,
  phone,
  bgColor,
}: {
  name: string;
  phone: string;
  bgColor: string;
}) {
  // Strip non-numeric chars → clean tel: href
  // e.g. "+67-676-767-67" → "6767676767"
  const cleanPhone = phone.replace(/\D/g, "");

  return (
    <div
      // w-[55vw] max-w-[200px] → narrower than BlogCard
      // 2 cards comfortably visible on 375px viewport
      // ring-1 ring-brand-tan/30 → subtle border
      className="snap-start flex w-[55vw] max-w-[200px] flex-shrink-0 flex-col items-center gap-3 overflow-hidden rounded-2xl bg-white p-4 ring-1 ring-brand-tan/30"
    >
      {/* ── Avatar placeholder ────────────────────────────
                Replace with next/image once asset confirmed
                rounded-full → circle shape per mockup
                aspect-square → enforces 1:1 before image loads
            ─────────────────────────────────────────────── */}
      <div className={["h-16 w-16 rounded-full", bgColor].join(" ")} />

      {/* ── Phone number ──────────────────────────────────
                tel: link → native dialer on mobile tap
                flex row + Phone icon → visual affordance
            ─────────────────────────────────────────────── */}
      <a
        href={`tel:+${cleanPhone}`}
        className="flex items-center gap-1.5 font-sans text-sm font-medium text-brand-teal transition-opacity hover:opacity-80"
      >
        <Phone size={14} />+{phone}
      </a>

      {/* ── Name label ────────────────────────────────────
                font-title + brand-brown → GSM spec
                text-center → centered below avatar
            ─────────────────────────────────────────────── */}
      <span className="text-center font-title text-sm font-bold text-brand-brown">
        {name}
      </span>
    </div>
  );
}

// ── DotPagination ─────────────────────────────────────────────
// Identical pattern to RekommendasiBlogSection — fully controlled
// Extracted locally here; refactor to shared atomic post-scaffold
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

// ── ContactUsSection ──────────────────────────────────────────
// bg-brand-cream section wrapper + heading + carousel
// ─────────────────────────────────────────────────────────────
export default function ContactUsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // ── Scroll sync ───────────────────────────────────────────
  // Derives activeIndex from scrollLeft / cardWidth
  // cardWidth = scrollWidth / total cards
  function handleScroll() {
    if (!scrollRef.current) return;
    const cardWidth =
      scrollRef.current.scrollWidth / PLACEHOLDER_CONTACTS.length;
    const index = Math.round(scrollRef.current.scrollLeft / cardWidth);
    setActiveIndex(index);
  }

  // ── Dot click → programmatic scroll ──────────────────────
  function handleDotClick(index: number) {
    if (!scrollRef.current) return;
    const cardWidth =
      scrollRef.current.scrollWidth / PLACEHOLDER_CONTACTS.length;
    scrollRef.current.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    });
    setActiveIndex(index);
  }

  return (
    <section className="bg-brand-cream py-10">
      {/* ── Section Heading ───────────────────────────────
                text-brand-teal → GSM primary on cream bg
            ─────────────────────────────────────────────── */}
      <h2 className="mb-6 text-center font-title text-2xl font-bold text-brand-teal">
        Contact Us
      </h2>

      {/* ── Carousel scroll container ─────────────────────
                px-4 on container → left edge padding
                Same scroll snap pattern as RekommendasiBlog
                items-stretch → equal height cards in row
            ─────────────────────────────────────────────── */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex items-stretch gap-3 overflow-x-auto px-4 pb-2 [scroll-snap-type:x_mandatory] [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none" }}
      >
        {PLACEHOLDER_CONTACTS.map((contact) => (
          <ContactCard key={contact.id} {...contact} />
        ))}
      </div>

      {/* ── DotPagination: hide if ≤2 contacts ───────────
                All cards visible at once → no pagination needed
            ─────────────────────────────────────────────── */}
      {PLACEHOLDER_CONTACTS.length > 2 && (
        <DotPagination
          count={PLACEHOLDER_CONTACTS.length}
          activeIndex={activeIndex}
          onDotClick={handleDotClick}
        />
      )}
    </section>
  );
}
