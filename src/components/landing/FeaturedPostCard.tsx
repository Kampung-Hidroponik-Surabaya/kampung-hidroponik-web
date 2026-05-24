// src/components/landing/FeaturedPostCard.tsx
// ─────────────────────────────────────────────────────────────
// FeaturedPostCard — standalone card between ProgramTerbaru
// and RekommendasiBlog sections
// Layout: full-width image top, description + CTA bottom
// CTA button → navigates to specific blog post page (/blog/[slug])
// Static placeholder: bg color stands in for image until
// assets + Sanity schema confirmed
// ─────────────────────────────────────────────────────────────

import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Static placeholder data — replace with Sanity fetch later
const PLACEHOLDER_POST = {
  slug: "placeholder-post",
  label: "Program Terbaru",
  title: "Lorem ipsum dolor sit amet consectetur",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  bgColor: "bg-brand-tan",
};

export default function FeaturedPostCard() {
  const post = PLACEHOLDER_POST;

  return (
    <section className="bg-brand-cream px-4 py-6">
      <div
        // overflow-hidden → clips image at card boundary
        // ring-1 → subtle border using GSM tan
        className="overflow-hidden rounded-2xl ring-1 ring-brand-tan/40"
      >
        {/* ── Featured Image ────────────────────────────────
                    aspect-video → consistent 16:9 ratio placeholder
                    relative → stacking context for badge overlay
                    Replace div with next/image once asset confirmed
                ─────────────────────────────────────────────── */}
        <div
          className={["relative aspect-video w-full", post.bgColor].join(" ")}
        >
          {/* ── Category Badge ────────────────────────────
                        absolute top-left → overlays image
                        bg-brand-teal → GSM primary color
                    ─────────────────────────────────────────────── */}
          <span className="absolute left-3 top-3 rounded-full bg-brand-teal px-3 py-1 font-sans text-xs font-medium text-brand-cream">
            {post.label}
          </span>
        </div>

        {/* ── Card Body ─────────────────────────────────────
                    bg-white → lifts card off cream background
                    Separated from image by no gap → flush join
                ─────────────────────────────────────────────── */}
        <div className="flex flex-col gap-3 bg-white p-4">
          {/* ── Title ─────────────────────────────────────
                        font-title + brand-brown → GSM spec
                        line-clamp-2 → prevents overflow on long titles
                    ─────────────────────────────────────────────── */}
          <h3 className="line-clamp-2 font-title text-lg font-bold text-brand-brown">
            {post.title}
          </h3>

          {/* ── Description ───────────────────────────────
                        line-clamp-3 → caps at 3 lines on mobile
                        text-brand-brown/70 → muted body copy
                    ─────────────────────────────────────────────── */}
          <p className="line-clamp-3 font-sans text-sm leading-relaxed text-brand-brown/70">
            {post.description}
          </p>

          {/* ── CTA Button ────────────────────────────────
                        w-full → stretches to card width on mobile
                        ArrowRight icon → signals navigation
                        href → /blog/[slug] (404 until blog route added)
                    ─────────────────────────────────────────────── */}
          <Link
            href={`/blog/${post.slug}`}
            className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-teal px-4 py-2.5 font-sans text-sm font-medium text-brand-cream transition-opacity hover:opacity-80"
          >
            Baca Selengkapnya
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
