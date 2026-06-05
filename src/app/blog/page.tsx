import RekomendasiBlogSection from "@/components/landing/RekomendasiBlogSection"
import FooterSection from "@/components/landing/FooterSection"
import BlogPageClient, {type BlogPostItem} from "@/components/blog/BlogPageClient"
import {getAllPosts, getFeaturedPosts, getSiteSettings} from "@/lib/queries"
import {postToBlogCardProps} from "@/lib/sanity.utils"

export const revalidate = 60
export const metadata = {title: 'Blog'}

export default async function BlogPage() {
  const [posts, featuredPosts, siteSettings] = await Promise.all([
    getAllPosts(),
    getFeaturedPosts(),
    getSiteSettings(),
  ])

  const featuredItems = featuredPosts.map((p, i) => postToBlogCardProps(p, i))

  const blogItems: BlogPostItem[] = posts.map((post, i) => ({
    ...postToBlogCardProps(post, i),
    rawDate: post.publishedAt ?? '',
    // categories: array of title strings derived from Sanity categories[]
    categories: post.categories?.map((c) => c.title) ?? [],
  }))

  // Deduplicate category titles across all posts for FilterControls pills
  const categoryTitles = [
    ...new Set(blogItems.flatMap((p) => p.categories)),
  ]

  return (
    <main style={{paddingTop: 'var(--nav-height, 64px)'}}>
      <div className="mt-8">
        <RekomendasiBlogSection items={featuredItems} />
      </div>
      <BlogPageClient posts={blogItems} categories={categoryTitles} />
      <FooterSection siteSettings={siteSettings} />
    </main>
  )
}