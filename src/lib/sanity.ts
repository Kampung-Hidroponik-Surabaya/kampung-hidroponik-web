import { createClient } from "@sanity/client";
import createImageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url";

// ── Sanity client instance ─────────────────────────────────────────────────
// Single export reused across all server components and GROQ queries
// useCdn: true → reads from Sanity's global CDN edge cache
//   → stale up to 60s, sufficient for a community blog
//   → set false only if real-time draft preview is needed
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION

if (!projectId) throw new Error(
  'NEXT_PUBLIC_SANITY_PROJECT_ID is not set. Check .env.production or .env.local'
)
if (!dataset) throw new Error(
  'NEXT_PUBLIC_SANITY_DATASET is not set. Check .env.production or .env.local'
)

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: apiVersion ?? '2025-01-01',
  useCdn: true,
})

// ── Image URL builder ──────────────────────────────────────────────────────
// Takes a Sanity image asset reference object → returns a URL builder instance
// Usage: urlFor(post.mainImage).width(800).url()
const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
