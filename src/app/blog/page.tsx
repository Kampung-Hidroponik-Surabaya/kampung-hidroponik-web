import RekomendasiBlogSection from "@/components/landing/RekomendasiBlogSection";
import BlogPageClient from "@/components/blog/BlogPageClient";
import FooterSection from "@/components/landing/FooterSection";

export const metadata = { title: "Blog" };

export default function BlogPage() {
    return (
        <main style={{ paddingTop: "var(--nav-height, 64px)" }}>
            <div className="mt-8">
              <RekomendasiBlogSection />
            </div>
            <BlogPageClient />
            <FooterSection />
        </main>
    );
}