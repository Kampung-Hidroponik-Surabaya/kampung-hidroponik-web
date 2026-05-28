// src/components/shared/BlogCard.tsx
// ─────────────────────────────────────────────────────────────
// BlogCard — reusable blog post card
// Consumed by: BlogCardCarousel (landing), /blog index page
// Layout: thumbnail → title → meta row (author + date)
// Entire card is a <Link> → /blog/[slug]
// imageUrl: string → next/image | null → color placeholder
// ─────────────────────────────────────────────────────────────

import Image from "next/image";
import Link from "next/link";
import { User } from "lucide-react";

export interface BlogCardProps {
  // slug: used to construct /blog/[slug] href
  slug: string;
  // title: post title — line-clamp-2
  title: string;
  // author: display name of post author
  author: string;
  // date: pre-formatted string — e.g. "3 Jan 2026"
  // Format at data layer: new Intl.DateTimeFormat('id-ID',
  //   { dateStyle: 'medium' }).format(new Date(publishedAt))
  date: string;
  // imageUrl: null → color placeholder | string → next/image
  imageUrl: string | null;
  // bgColor: placeholder bg color when imageUrl is null
  bgColor?: string;
}

export default function BlogCard({
  slug,
  title,
  author,
  date,
  imageUrl,
  bgColor = "bg-brand-tan",
}: BlogCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      // group → drives group-hover on thumbnail zoom
      // w-[75vw] max-w-[280px] → fixed card width inside carousel
      // flex-shrink-0 → prevents compression in flex row
      // scroll-snap-align-start → snaps to left edge
      className={[
        "group flex w-[80vw] flex-shrink-0",
        "scroll-snap-align-start flex-col overflow-hidden",
        "rounded-2xl",
        "transition-all duration-200",
        "active:scale-[0.98]",
      ].join(" ")}
    >
      {/* ── Thumbnail ─────────────────────────────────────
                aspect-video → 16:9 ratio
                overflow-hidden → clips zoom effect at boundary
                imageUrl null → bgColor placeholder div
                imageUrl string → next/image fill object-cover
            ─────────────────────────────────────────────── */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            style={{ objectFit: "cover" }}
            className="z-0 transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div
            className={[
              "absolute inset-0 transition-transform duration-300 group-hover:scale-105",
              bgColor,
            ].join(" ")}
          />
        )}
      </div>

      {/* ── Card body ─────────────────────────────────────
                p-3 → inner padding
                flex-1 → fills remaining card height
                justify-between → pushes meta to bottom
            ─────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col justify-between gap-2 px-1 pb-0 pt-3">
        <h3
          className={[
            "line-clamp-2 font-title text-base font-bold",
            "text-brand-cream transition-colors duration-200",
            "group-hover:text-brand-cream/80",
          ].join(" ")}
        >
          {title}
        </h3>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 overflow-hidden">
            <User size={12} className="shrink-0 text-brand-cream/70" />
            <span className="truncate font-sans text-xs text-brand-cream/70">
              Dari:{" "}
              <span className="underline underline-offset-2">{author}</span>
            </span>
          </div>
          <span className="shrink-0 font-sans text-xs text-brand-cream/70">
            {date}
          </span>
        </div>
      </div>
    </Link>
  );
}
