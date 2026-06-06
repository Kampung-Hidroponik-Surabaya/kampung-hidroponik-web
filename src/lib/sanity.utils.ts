// src/lib/sanity.utils.ts — NEW utility file
// Transforms Post → BlogCardProps so BlogCard JSX never changes

import { urlFor } from "./sanity";
import type { Post } from "./sanity.types";
import type { BlogCardProps } from "@/components/shared/BlogCard";

// BG_COLORS: cycle through brand colors when no image exists
const BG_COLORS = ["bg-brand-teal", "bg-brand-tan", "bg-brand-brown"];

export function postToBlogCardProps(
  post: Post,
  index: number = 0,
): BlogCardProps {
  const slugString =
    typeof post.slug === "string"
      ? post.slug
      : ((post.slug as { current: string })?.current ?? "");

  return {
    slug: slugString, // ← ini yang dipakai BlogCard untuk /blog/${slug}
    title: post.title,
    author: post.author?.name ?? "Admin",
    date: post.publishedAt
      ? new Intl.DateTimeFormat("id-ID", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }).format(new Date(post.publishedAt))
      : "",
    imageUrl: post.mainImage?.asset
      ? urlFor(post.mainImage).width(600).url()
      : null,
    bgColor: BG_COLORS[index % BG_COLORS.length],
    category: post.category?.title,
  };
}
