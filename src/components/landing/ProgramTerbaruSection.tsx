// src/components/landing/ProgramTerbaruSection.tsx
// ─────────────────────────────────────────────────────────────
// Changes from v1:
// 1. Gradient → label-only strip (bottom 40% of card) not full overlay
// 2. Hover state: card scale-105, gradient darkens, label text grows
// 3. Grid: cols-[3fr_2fr] → left col 60%, right col 40% (matches mockup)
// 4. Gap: gap-1.5 → tighter gutter
// 5. Grid height: fixed h-[320px] → resizes with container not content
// 6. Large card: h-full fills left col entirely
// ─────────────────────────────────────────────────────────────

import Link from "next/link";
import Image from "next/image";

const PLACEHOLDER_PROGRAMS = [
  {
    id: "1",
    label: "Lorem Ipsum",
    imageUrl: null,
    bgColor: "bg-brand-teal",
    href: "/blog",
  },
  {
    id: "2",
    label: "Lorem Ipsum",
    imageUrl: null,
    bgColor: "bg-brand-tan",
    href: "/blog",
  },
  {
    id: "3",
    label: "Lorem Ipsum",
    imageUrl: null,
    bgColor: "bg-brand-brown",
    href: "/blog",
  },
];

function ProgramCard({
  label,
  imageUrl,
  bgColor,
  href,
  labelPosition,
  textSize,
  className,
}: {
  label: string;
  imageUrl: string | null;
  bgColor: string;
  href: string;
  labelPosition: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  textSize: "sm" | "xs" | "base" | "lg";
  className?: string;
}) {
  return (
    <Link
      href={href}
      // group → enables group-hover on children
      // overflow-hidden → clips scaled image at border
      // h-full → fills parent grid cell height exactly
      // rounded-2xl → consistent with design
      className={[
        "group relative block h-full w-full overflow-hidden rounded-2xl",
        "transition-transform duration-300 hover:scale-[1.02] active:scale-95",
        className ?? "",
      ].join(" ")}
    >
      {/* ── Image or color placeholder ────────────────────
                imageUrl → next/image fill object-cover
                null     → solid bgColor div
                Both: group-hover:scale-110 → zoom on hover
                transition-transform duration-300 → smooth
            ─────────────────────────────────────────────── */}
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={label}
          fill
          style={{ objectFit: "cover" }}
          className="z-0 transition-transform duration-300 group-hover:scale-110"
        />
      ) : (
        <div
          className={[
            "absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110",
            bgColor,
          ].join(" ")}
        />
      )}

      {/* ── Label gradient strip ──────────────────────────
                Covers bottom 40% of card only — not full overlay
                Mechanism: bg-gradient-to-t from-black/60 to-transparent
                height: 40% via h-[40%] absolute bottom-0
                group-hover: from-black/80 → darkens on hover
                transition-colors → smooth gradient change
            ─────────────────────────────────────────────── */}
      {/* ── Gradient strip ────────────────────────────────
                Direction flips based on labelPosition
                top → gradient top-to-bottom (from-black/60 at top)
                bottom → gradient bottom-to-top (from-black/60 at bottom)
            ─────────────────────────────────────────────── */}
      <div
        className={[
          "absolute left-0 right-0 z-10 h-[40%]",
          "transition-colors duration-300",
          labelPosition.startsWith("top")
            ? "top-0 bg-gradient-to-b from-black/60 to-transparent group-hover:from-black/80"
            : "bottom-0 bg-gradient-to-t from-black/60 to-transparent group-hover:from-black/80",
        ].join(" ")}
      />

      {/* ── Label ─────────────────────────────────────────
                Position mapped from labelPosition prop:
                top-left     → top-2 left-3
                top-right    → top-2 right-3
                bottom-left  → bottom-2 left-3
                bottom-right → bottom-2 right-3
            ─────────────────────────────────────────────── */}
      <span
        className={[
          "absolute z-20 font-title font-bold text-brand-cream",
          "transition-all duration-300 group-hover:font-extrabold",
          // Position mapping
          labelPosition === "top-left" && "left-3 top-2",
          labelPosition === "top-right" && "right-3 top-2",
          labelPosition === "bottom-left" && "bottom-2 left-3",
          labelPosition === "bottom-right" && "bottom-2 right-3",
          // Text size + hover grow
          textSize === "xs" && "text-xs group-hover:text-sm",
          textSize === "sm" && "text-sm group-hover:text-base",
          textSize === "base" && "text-base group-hover:text-lg",
          textSize === "lg" && "text-lg group-hover:text-xl",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {label}
      </span>
    </Link>
  );
}

export default function ProgramTerbaruSection() {
  const [large, ...small] = PLACEHOLDER_PROGRAMS;

  return (
    <section className="bg-brand-cream px-4 py-10">
      <h2 className="section-title text-brand-teal">Program Terbaru</h2>

      {/* ── Mosaic Grid ───────────────────────────────────
                grid-cols-[3fr_2fr] → left 60%, right 40%
                grid-rows-2 → 2 equal rows for right col
                gap-1.5 → tight gutter matching mockup
                h-[320px] → fixed total grid height
                  → both cols fill this height
                  → resizes correctly at all screen widths
                  → gap stays tight regardless of screen size
            ─────────────────────────────────────────────── */}
      <div className="grid h-[320px] grid-cols-[3fr_2fr] grid-rows-2 gap-1.5">
        <ProgramCard
          {...large}
          labelPosition="top-left"
          textSize="lg"
          className="row-span-2"
        />
        <ProgramCard {...small[0]} labelPosition="top-left" textSize="sm" />
        <ProgramCard
          {...small[1]}
          labelPosition="bottom-left"
          textSize="base"
        />
      </div>
    </section>
  );
}
