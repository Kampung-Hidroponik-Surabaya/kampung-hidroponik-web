import {
  getFeaturedPosts,
  getLatestPosts,
  getActivePrograms,
  getAllGalleryImages,
  getSiteSettings,
  getAllContacts,
} from '@/lib/queries'
import {postToBlogCardProps} from '@/lib/sanity.utils'
import HeroSection from '@/components/landing/HeroSection'
import RekomendasiBlogSection from '@/components/landing/RekomendasiBlogSection'
import BlogCardCarousel from '@/components/landing/BlogCardCarousel'
import ProgramTerbaruSection from '@/components/landing/ProgramTerbaruSection'
import GallerySection from '@/components/landing/GallerySection'
import ContactUsSection from '@/components/landing/ContactUsSection'
import FooterSection from '@/components/landing/FooterSection'

export default async function HomePage() {
  const [
    featuredPosts,
    latestPosts,
    activePrograms,
    galleryImages,
    siteSettings,
    contacts,
  ] = await Promise.all([
    getFeaturedPosts(),
    getLatestPosts(6),
    getActivePrograms(),
    getAllGalleryImages(),
    getSiteSettings(),
    getAllContacts(),
  ])

  const featuredItems = featuredPosts.map((p, i) => postToBlogCardProps(p, i))

  return (
    <main>
      <HeroSection siteSettings={siteSettings} />
      <ProgramTerbaruSection programs={activePrograms} />
      <RekomendasiBlogSection items={featuredItems} />
      <ContactUsSection contacts={contacts} />
      <GallerySection images={galleryImages} />
      <FooterSection siteSettings={siteSettings} />
    </main>
  )
}