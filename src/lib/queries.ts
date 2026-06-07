import {sanityClient} from './sanity'
import type {Post, Member, GalleryImage, Program, SiteSettings, Category, Contact, AboutPage} from './sanity.types'

// ─────────────────────────────────────────────────────────────────────────────
// ARCHITECTURAL NOTES
//
// All queries follow this pattern:
//   1. GROQ string → defines shape of returned JSON
//   2. Typed async fetch function → wraps sanityClient.fetch()
//   3. Return type explicitly declared → TypeScript catches field mismatches
//
// Field projection rules:
//   - Never fetch _all_ fields (avoid over-fetching body on list views)
//   - Dereference references inline: author-> { name, photo }
//   - slug projected as slug.current string → components never access .current
// ─────────────────────────────────────────────────────────────────────────────


// ══════════════════════════════════════════════════════════════════════════════
// POST QUERIES
// ══════════════════════════════════════════════════════════════════════════════

// ── Shared projection for post list cards (no body — expensive) ───────────
const POST_CARD_PROJECTION = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  featured,
  mainImage { asset, alt, hotspot },
  "author": author-> { _id, name, photo { asset, hotspot } },
  "category": category-> { _id, title }
`

// ── All published posts — blog index page ─────────────────────────────────
const ALL_POSTS_QUERY = `
  *[_type == "post"] | order(publishedAt desc) {
    ${POST_CARD_PROJECTION}
  }
`

export async function getAllPosts(): Promise<Post[]> {
  return sanityClient.fetch(ALL_POSTS_QUERY)
}

// ── Featured posts — landing page RekomendasiBlogSection + FeaturedPostCard ─
const FEATURED_POSTS_QUERY = `
  *[_type == "post" && featured == true] | order(publishedAt desc) [0...4] {
    ${POST_CARD_PROJECTION}
  }
`

export async function getFeaturedPosts(): Promise<Post[]> {
  return sanityClient.fetch(FEATURED_POSTS_QUERY)
}

// ── Latest N posts — landing page BlogCardCarousel ────────────────────────
const LATEST_POSTS_QUERY = `
  *[_type == "post"] | order(publishedAt desc) [0...$limit] {
    ${POST_CARD_PROJECTION}
  }
`

export async function getLatestPosts(limit: number = 6): Promise<Post[]> {
  return sanityClient.fetch(LATEST_POSTS_QUERY, {limit})
}

// ── Posts filtered by category slug ──────────────────────────────────────
const POSTS_BY_CATEGORY_QUERY = `
  *[_type == "post" && category->._id == $categoryId] | order(publishedAt desc) {
    ${POST_CARD_PROJECTION}
  }
`

export async function getPostsByCategory(categoryId: string): Promise<Post[]> {
  return sanityClient.fetch(POSTS_BY_CATEGORY_QUERY, {categoryId})
}

// ── Single post by slug — individual blog post page ───────────────────────
// Fetches body only here — full Portable Text needed for render
const POST_BY_SLUG_QUERY = `
  *[_type == "post" && slug.current == $slug][0] {
    ${POST_CARD_PROJECTION},
    body,
    tags
  }
`

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return sanityClient.fetch(POST_BY_SLUG_QUERY, {slug})
}

// ── Search posts by title — BlogSearchSection ─────────────────────────────
// GROQ match operator: case-insensitive substring search
const SEARCH_POSTS_QUERY = `
  *[_type == "post" && title match $searchTerm] | order(publishedAt desc) {
    ${POST_CARD_PROJECTION}
  }
`

export async function searchPosts(term: string): Promise<Post[]> {
  // Append wildcard → "hidroponik" matches "hidroponik selada" etc.
  return sanityClient.fetch(SEARCH_POSTS_QUERY, {searchTerm: `${term}*`})
}


// ══════════════════════════════════════════════════════════════════════════════
// CATEGORY QUERIES
// ══════════════════════════════════════════════════════════════════════════════

const ALL_CATEGORIES_QUERY = `
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    description
  }
`

export async function getAllCategories(): Promise<Category[]> {
  return sanityClient.fetch(ALL_CATEGORIES_QUERY)
}


// ══════════════════════════════════════════════════════════════════════════════
// MEMBER QUERIES
// ══════════════════════════════════════════════════════════════════════════════

// orderRank → string field injected by @sanity/orderable-document-list
// editors drag to reorder in Studio → this query respects that order
const ALL_MEMBERS_QUERY = `
  *[_type == "member"] | order(orderRank asc) {
    _id,
    name,
    jabatan,
    photo { asset, hotspot },
    orderRank,
    description,
    instagram,
    facebook
  }
`

export async function getAllMembers(): Promise<Member[]> {
  return sanityClient.fetch(ALL_MEMBERS_QUERY)
}


// ══════════════════════════════════════════════════════════════════════════════
// GALLERY QUERIES
// ══════════════════════════════════════════════════════════════════════════════

const ALL_GALLERY_QUERY = `
  *[_type == "galleryImage"] | order(orderRank asc) {
    _id,
    title,
    image { asset, hotspot, alt },
    takenAt,
    orderRank
  }
`

export async function getAllGalleryImages(): Promise<GalleryImage[]> {
  return sanityClient.fetch(ALL_GALLERY_QUERY)
}


// ══════════════════════════════════════════════════════════════════════════════
// PROGRAM QUERIES
// ══════════════════════════════════════════════════════════════════════════════

const ALL_PROGRAMS_QUERY = `
  *[_type == "program"] | order(date desc) {
    _id,
    title,
    description,
    image { asset, hotspot, alt },
    date,
    active,
    "relatedPost": relatedPost-> { "slug": slug.current }
  }
`

export async function getAllPrograms(): Promise<Program[]> {
  return sanityClient.fetch(ALL_PROGRAMS_QUERY)
}

// ── Active programs only — ProgramTerbaruSection ──────────────────────────
const ACTIVE_PROGRAMS_QUERY = `
  *[_type == "program" && active == true] | order(date desc) [0...3] {
    _id,
    title,
    description,
    image { asset, hotspot, alt },
    date,
    active,
    "relatedPost": relatedPost-> { "slug": slug.current }
  }
`

export async function getActivePrograms(): Promise<Program[]> {
  return sanityClient.fetch(ACTIVE_PROGRAMS_QUERY)
}


// ══════════════════════════════════════════════════════════════════════════════
// SITE SETTINGS QUERY
// ══════════════════════════════════════════════════════════════════════════════

// Fixed documentId 'siteSettings' → set in sanity.config.ts singleton definition
// [0] slice → guarantees single object return, not array
const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings" && _id == "siteSettings"][0] {
    siteTitle,
    description,
    phone,
    email,
    instagram,
    facebook,
    address
  }
`

// ══════════════════════════════════════════════════════════════════════════════
// CONTACT QUERIES
// ══════════════════════════════════════════════════════════════════════════════

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return sanityClient.fetch(SITE_SETTINGS_QUERY)
}

const ALL_CONTACTS_QUERY = `
  *[_type == "contact"] | order(orderRank asc) {
    _id,
    name,
    phone,
    orderRank
  }
`

export async function getAllContacts(): Promise<Contact[]> {
  return sanityClient.fetch(ALL_CONTACTS_QUERY)
}

// ══════════════════════════════════════════════════════════════════════════════
// ABOUT PAGE QUERY
// ══════════════════════════════════════════════════════════════════════════════

// Fixed documentId 'aboutPage' → singleton, always returns single object
const ABOUT_PAGE_QUERY = `
  *[_type == "aboutPage" && _id == "aboutPage"][0] {
    heroImage { asset, alt, hotspot },
    heroTagline,
    shortDescription,
    visi,
    misi
  }
`

export async function getAboutPage(): Promise<AboutPage | null> {
  return sanityClient.fetch(ABOUT_PAGE_QUERY)
}