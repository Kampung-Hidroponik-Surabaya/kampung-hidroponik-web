import { getPostBySlug, getAllPosts } from "@/lib/queries";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/lib/PortableTextComponents";
import { urlFor } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug as unknown as string }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-brand-cream pt-[64px]">
      {/* ── Back button ───────────────────────────────────── */}
      <div className="px-6 pt-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-sans text-sm text-brand-teal hover:underline"
        >
          ← Kembali ke Blog
        </Link>
      </div>

      {/* ── Hero image ────────────────────────────────────── */}
      {post.mainImage?.asset && (
        <div className="relative mx-6 mt-4 aspect-video overflow-hidden rounded-2xl">
          <Image
            src={urlFor(post.mainImage).width(900).url()}
            alt={post.mainImage.alt ?? post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* ── Article container ─────────────────────────────── */}
      <article className="mx-auto max-w-2xl px-6 py-8">
        {/* ── Categories ──────────────────────────────────── */}
        {post.category && (
          <div className="mb-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-brand-teal/10 px-3 py-1 font-sans text-xs font-semibold text-brand-teal">
              {post.category.title}
            </span>
          </div>
        )}

        {/* ── Title ───────────────────────────────────────── */}
        <h1 className="font-title text-3xl font-bold leading-tight text-brand-teal">
          {post.title}
        </h1>

        {/* ── Meta: author + date ─────────────────────────── */}
        <div className="mt-3 flex items-center gap-3 font-sans text-sm text-brand-brown/70">
          {post.author?.name && (
            <span>
              oleh <span className="font-semibold">{post.author.name}</span>
            </span>
          )}
          {post.author?.name && post.publishedAt && <span>·</span>}
          {post.publishedAt && (
            <span>
              {new Date(post.publishedAt).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          )}
        </div>

        {/* ── Excerpt ─────────────────────────────────────── */}
        {post.excerpt && (
          <p className="mt-4 font-sans text-base italic text-brand-brown/80 border-l-4 border-brand-teal pl-4">
            {post.excerpt}
          </p>
        )}

        {/* ── Divider ─────────────────────────────────────── */}
        <hr className="my-6 border-brand-tan/40" />

        {/* ── Body ────────────────────────────────────────── */}
        {post.body && (
          <div className="font-sans text-brand-brown">
            <PortableText
              value={post.body}
              components={portableTextComponents}
            />
          </div>
        )}

        {/* ── Tags ────────────────────────────────────────── */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-brand-tan/30 px-3 py-1 font-sans text-xs text-brand-brown"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* ── Back to blog ────────────────────────────────── */}
        <div className="mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full bg-brand-teal px-6 py-3 font-sans text-sm font-semibold text-brand-cream transition hover:bg-brand-teal/80"
          >
            ← Kembali ke Blog
          </Link>
        </div>
      </article>
    </main>
  );
}
