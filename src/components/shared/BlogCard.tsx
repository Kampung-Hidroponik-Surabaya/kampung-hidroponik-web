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
    category?: string;
    // variant: carousel (default) | grid
}

export default function BlogCard({
    slug,
    title,
    author,
    date,
    imageUrl,
    bgColor = "bg-brand-tan",
    category,
    className,
}: BlogCardProps & { className?: string }) {
    return (
        <Link
            href={`/blog/${slug}`}
            className={[
                "group flex flex-col overflow-hidden rounded-2xl",
                "transition-all duration-200 active:scale-[0.98]",
                "hover:shadow-md",
                className ?? "",
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
            <div className="flex flex-1 flex-col justify-between gap-2 px-1 pb-2 pt-3">
                {/* ── Category badge ────────────────────────────
            Only shown on grid variant
            pill shape, brand-teal bg
        ─────────────────────────────────────────────── */}
                {category && <span className="w-fit pill">{category}</span>}
                <h3 className="line-clamp-2 origin-left font-title text-base font-bold text-white text-outline text-stroke transition-transform duration-200 group-hover:scale-[1.03] group-active:scale-[0.99]">
                    {title}
                </h3>
                <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1 overflow-hidden">
                        <User
                            size={12}
                            className="shrink-0 text-brand-cream/75 icon-outline-thin transition-transform duration-200 group-hover:scale-105 group-active:scale-95"
                        />
                        <span className="truncate font-sans text-xs text-white/75 text-outline-thin transition-transform duration-200 group-hover:scale-105 group-active:scale-95">
                            Dari:{" "}
                            <span className="underline underline-offset-2">
                                {author}
                            </span>
                        </span>
                    </div>
                    <span className="shrink-0 font-sans text-xs text-white/75 text-outline-thin transition-transform duration-200 group-hover:scale-105 group-active:scale-95">
                        {date}
                    </span>
                </div>
            </div>
        </Link>
    );
}
