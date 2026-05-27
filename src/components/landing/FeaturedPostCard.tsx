// src/components/landing/FeaturedPostCard.tsx
// ─────────────────────────────────────────────────────────────
// FeaturedPostCard — "Informasi Terkait" section
// Layout: heading → thumbnail → title + body + arrow CTA
// Arrow: two states (default: plain icon, hover: filled circle)
// Static placeholder: imageUrl null → bg-brand-tan div
// ─────────────────────────────────────────────────────────────

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// ── Placeholder data ──────────────────────────────────────────
// imageUrl: null → color placeholder
// Replace with Sanity fetch later:
// *[_type == "post"] | order(_createdAt desc) [0] {
//   _id, title, slug, mainImage, excerpt
// }
const PLACEHOLDER_POST = {
    slug: "placeholder-post",
    title: "Lorem ipsum dolor sit ametttttttt",
    description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageUrl: null as string | null,
};

// ── ArrowCTA ──────────────────────────────────────────────────
// Two states driven by group-hover on parent <Link>:
// Default: plain ArrowRight, brand-teal, no bg
// Hover:   ArrowRight inside filled brand-teal circle,
//          arrow becomes brand-cream
// Press:   circle scales down via active:scale-95
// ─────────────────────────────────────────────────────────────
function ArrowCTA({ href }: { href: string }) {
    return (
        <Link
            href={href}
            // group → drives group-hover children
            // shrink-0 self-end → anchors to bottom-right of flex row
            // relative → stacking context, fixed dimensions
            // h-9 w-9 → fixed size prevents layout shift between states
            // flex center → keeps icon centered in both states
            className={[
                "group relative flex h-9 w-9 shrink-0 self-end",
                "items-center justify-center rounded-full",
                // Default: transparent bg → Hover: filled brand-teal
                "bg-transparent transition-all duration-200",
                "hover:bg-brand-teal",
                // Press: scale down
                "active:scale-95",
            ].join(" ")}
            aria-label="Baca artikel selengkapnya"
        >
            <ArrowRight
                size={20}
                className={[
                    "transition-all duration-200",
                    // Default: brand-teal → Hover: brand-cream
                    "text-brand-teal group-hover:text-brand-cream",
                ].join(" ")}
            />
        </Link>
    );
}

// ── FeaturedPostCard ──────────────────────────────────────────
export default function FeaturedPostCard() {
    const post = PLACEHOLDER_POST;

    return (
        <section className="bg-brand-cream px-4 py-10">
            {/* ── Section heading ───────────────────────────────
                top-left aligned per mockup
                font-title + text-brand-teal → GSM spec
                text-2xl → prominent but below h1 hierarchy
            ─────────────────────────────────────────────── */}
            <h2 className="mb-6 font-title text-2xl font-bold text-brand-teal">
                Informasi Terkait
            </h2>

            {/* ── Card container ────────────────────────────────
                bg-white → lifts card off cream section bg
                rounded-2xl → consistent with other cards
                overflow-hidden → clips thumbnail at top corners
                ring-1 → subtle border
            ─────────────────────────────────────────────── */}
            <Link
                href={`/blog/${post.slug}`}
                className={[
                    "group block overflow-hidden rounded-2xl bg-white",
                    "ring-1 ring-brand-tan/30",
                    "transition-all duration-200",
                    "hover:scale-[1.01] hover:shadow-lg hover:ring-brand-tan",
                    "active:scale-[0.99] active:shadow-sm",
                ].join(" ")}
            >
                {/* ── Thumbnail ─────────────────────────────────
                    aspect-video → 16:9 ratio
                    relative → required for next/image fill
                    imageUrl null → bg-brand-tan placeholder
                    imageUrl string → next/image fill object-cover
                ─────────────────────────────────────────────── */}
                <div className="relative aspect-video w-full overflow-hidden">
                    {post.imageUrl ? (
                       <Image
                            src={post.imageUrl}
                            alt={post.title}
                            fill
                            style={{ objectFit: "cover" }}
                            className="z-0 transition-transform duration-300 group-hover:scale-105"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-brand-tan/40 transition-transform duration-300 group-hover:scale-105" /> 
                    )}
                </div>

                {/* ── Card body ─────────────────────────────────
                    p-4 → inner padding
                    flex justify-between items-end → text left,
                    arrow anchored bottom-right
                ─────────────────────────────────────────────── */}
                <div className="flex items-end justify-between gap-4 p-4">
                    {/* ── Text block ────────────────────────────
                        flex-1 → takes all available width
                        gap-2 → spacing between title and body
                    ─────────────────────────────────────────── */}
                    <div className="flex flex-1 flex-col gap-2">
                        {/* ── Post title ────────────────────────
                            font-title + text-brand-teal → GSM
                            line-clamp-2 → caps at 2 lines
                        ─────────────────────────────────────── */}
                        <h3 className="line-clamp-2 font-title text-lg font-bold text-brand-teal">
                            {post.title}
                        </h3>

                        {/* ── Body copy ─────────────────────────
                            text-justify → both edges aligned
                            line-clamp-4 → caps body at 4 lines
                            text-brand-brown/70 → muted copy
                        ─────────────────────────────────────── */}
                        <p className="line-clamp-4 text-justify font-sans text-sm leading-relaxed text-brand-brown/70">
                            {post.description}
                        </p>
                    </div>

                    {/* ── Arrow CTA ─────────────────────────────
                        relative → stacking context for absolute
                        hover state div inside ArrowCTA
                    ─────────────────────────────────────────── */}
                    <div
                        className={[
                            "relative flex h-9 w-9 shrink-0 self-end",
                            "items-center justify-center rounded-full",
                            "bg-transparent transition-all duration-200",
                            "group-hover:bg-brand-teal",
                            "group-active:scale-95",
                        ].join(" ")}
                        aria-hidden="true"
                    >
                        <ArrowRight
                            size={20}
                            className="text-brand-teal transition-colors duration-200 group-hover:text-brand-cream"
                        />
                    </div>
                </div>
            </Link>
        </section>
    );
}