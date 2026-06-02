// src/app/blog/page.tsx
import BlogCard, { type BlogCardProps } from "@/components/shared/BlogCard";
import FooterSection from "@/components/landing/FooterSection";

export const metadata = { title: "Blog" };

const blogs: BlogCardProps[] = [
  {
    slug: "lorem-ipsum-1",
    title: "Lorem ipsum dolor sit amet",
    author: "Lorem Ipsum",
    date: "Jan 3, 2026",
    imageUrl: "/images/ori-logo.png",
    bgColor: "bg-brand-teal",
  },
  {
    slug: "lorem-ipsum-2",
    title: "Lorem ipsum dolor sit amet",
    author: "Lorem Ipsum",
    date: "Jan 3, 2026",
    imageUrl: "/images/ori-logo.png",
    bgColor: "bg-brand-teal",
  },
  {
    slug: "lorem-ipsum-3",
    title: "Lorem ipsum dolor sit amet",
    author: "Lorem Ipsum",
    date: "Jan 3, 2026",
    imageUrl: "/images/ori-logo.png",
    bgColor: "bg-brand-teal",
  },
  {
    slug: "lorem-ipsum-4",
    title: "Lorem ipsum dolor sit amet",
    author: "Lorem Ipsum",
    date: "Jan 3, 2026",
    imageUrl: "/images/ori-logo.png",
    bgColor: "bg-brand-teal",
  },
  {
    slug: "lorem-ipsum-5",
    title: "Lorem ipsum dolor sit amet",
    author: "Lorem Ipsum",
    date: "Jan 3, 2026",
    imageUrl: "/images/ori-logo.png",
    bgColor: "bg-brand-teal",
  },
  {
    slug: "lorem-ipsum-6",
    title: "Lorem ipsum dolor sit amet",
    author: "Lorem Ipsum",
    date: "Jan 3, 2026",
    imageUrl: "/images/ori-logo.png",
    bgColor: "bg-brand-teal",
  },
];

export default function BlogPage() {
  return (
    <>
      <main
        className="min-h-screen pt-[76px] pb-[65px] px-[30px] md:px-[64px]"
        style={{ backgroundColor: "#43766C" }}
      >
        {/* Mobile: single column stack */}
        {/* Desktop: 3 column grid */}
        <div
          className="
          grid gap-5
          grid-cols-1
          md:grid-cols-3
          [&_a]:w-full
          [&_a]:flex-shrink
        "
        >
          {blogs.map((blog) => (
            <BlogCard key={blog.slug} {...blog} />
          ))}
        </div>
      </main>
      <FooterSection />
    </>
  );
}
