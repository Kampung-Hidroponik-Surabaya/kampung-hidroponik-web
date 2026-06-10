import { getAllPosts } from "@/lib/queries";

export default async function sitemap() {
  const posts = await getAllPosts();

  const blogUrls = posts.map((post) => ({
    url: `https://www.kampunghidroponiksby.com/blog/${post.slug}`,
    lastModified: post.publishedAt ?? new Date().toISOString(),
  }));

  return [
    { url: "https://www.kampunghidroponiksby.com" },
    { url: "https://www.kampunghidroponiksby.com/blog" },
    { url: "https://www.kampunghidroponiksby.com/anggota" },
    { url: "https://www.kampunghidroponiksby.com/tentang" },
    ...blogUrls,
  ];
}
