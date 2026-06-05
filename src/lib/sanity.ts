import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type {SanityImageSource} from '@sanity/image-url/lib/types/types'

// ── Sanity client instance ─────────────────────────────────────────────────
// Single export reused across all server components and GROQ queries
// useCdn: true → reads from Sanity's global CDN edge cache
//   → stale up to 60s, sufficient for a community blog
//   → set false only if real-time draft preview is needed
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  useCdn: true,
})

// ── Image URL builder ──────────────────────────────────────────────────────
// Takes a Sanity image asset reference object → returns a URL builder instance
// Usage: urlFor(post.mainImage).width(800).url()
const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}