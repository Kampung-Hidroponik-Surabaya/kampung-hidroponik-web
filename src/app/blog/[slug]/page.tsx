// src/app/blog/[slug]/page.tsx
import FooterSection from "@/components/landing/FooterSection";

interface Props {
  params: Promise<{ slug: string }>;
}

const blogContent: Record<
  string,
  {
    title: string;
    author: string;
    date: string;
    readTime: string;
    thumbnail: string | null;
    body: string[];
  }
> = {
  "eco-enzym-sampah-dapur": {
    title:
      "Warga Kampung Hidroponik Surabaya Sulap Sampah Dapur Jadi Eco Enzym",
    author: "Kabar Bisnis",
    date: "15 Mei 2023",
    readTime: "4 menit",
    thumbnail: null,
    body: [
      "Sebanyak 1.500 - 1.600 ton sampah dari masyarakat Surabaya setiap harinya masuk ke TPS Benowo. Sampah yang paling banyak adalah sampah basah sisa makanan dan sayuran rumah tangga.",
      "Beranjak dari keprihatinan itu, warga RW 12 Kelurahan Medokan Ayu bersama tim dosen dari UPN Veteran Jawa Timur menggelar pelatihan pembuatan Eco Enzym — inovasi pengolahan sampah basah sisa buah dan sayur rumah tangga yang difermentasi menjadi cairan kaya manfaat.",
      '"Eco Enzym kami pilih karena manfaatnya bisa digunakan langsung di rumah tangga. Eco Enzym bisa untuk ngepel lantai, bahan cuci piring, bahkan bisa untuk antiseptik mandi," papar Dewi Deniaty S., SE, MM, Dosen Fakultas Ekonomi dan Bisnis UPN Veteran Jatim.',
      "Pelatihan ini digelar di Kebun Proklim RW 12 Kelurahan Medokan Ayu Kota Surabaya sebagai bagian dari program pemberdayaan masyarakat yang berkelanjutan.",
    ],
  },
  "mahasiswa-australia-kunjungi-kampung-hidroponik": {
    title:
      "Kagumnya Mahasiswa Australia Saat Sambangi Kampung Hidroponik Surabaya",
    author: "Jatim Now",
    date: "13 Jan 2023",
    readTime: "3 menit",
    thumbnail: null,
    body: [
      "Mahasiswa dari Australia mengunjungi Kampung Hidroponik Surabaya dan mengungkapkan kekaguman mereka terhadap inovasi pertanian perkotaan yang dikembangkan warga RW 12 Kelurahan Medokan Ayu.",
      "Kunjungan ini menjadi bukti bahwa program urban farming yang dijalankan warga Kampung Hidroponik Surabaya telah mendapat perhatian internasional.",
      "Para mahasiswa Australia tersebut terkejut melihat bagaimana warga biasa mampu mengubah lahan sempit di perkotaan menjadi kebun produktif yang menghasilkan berbagai jenis sayuran segar.",
      "Kunjungan ini diharapkan dapat mempererat hubungan dan pertukaran pengetahuan antara komunitas urban farming Indonesia dan Australia.",
    ],
  },
};

const defaultContent = {
  title: "Artikel Kampung Hidroponik Surabaya",
  author: "Admin KHS",
  date: "2023",
  readTime: "3 menit",
  thumbnail: null,
  body: [
    "Kampung Hidroponik Surabaya di RW 12 Kelurahan Medokan Ayu terus berinovasi dalam mengembangkan pertanian perkotaan yang berkelanjutan.",
    "Program ini melibatkan seluruh warga dalam memanfaatkan lahan terbatas untuk menanam berbagai sayuran dengan metode hidroponik.",
    "Dengan dukungan dari berbagai pihak termasuk akademisi dan pemerintah kota, Kampung Hidroponik Surabaya terus berkembang menjadi contoh nyata urban farming yang sukses.",
  ],
};

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const content = blogContent[slug] ?? defaultContent;
  return (
    <>
      <main
        className="min-h-screen pt-[76px] pb-[80px]"
        style={{ backgroundColor: "#F8FAE5" }}
      >
        {/* ── Article container — Medium style ── */}
        <article className="max-w-2xl mx-auto px-6">
          {/* Title */}
          <h1
            className="font-title font-bold leading-tight mb-4"
            style={{ fontSize: "clamp(28px, 5vw, 40px)", color: "#43766C" }}
          >
            {content.title}
          </h1>

          {/* Meta row */}
          <div className="flex items-center gap-2 mb-8">
            <span
              className="font-sans text-sm font-medium underline"
              style={{ color: "#43766C" }}
            >
              {content.author}
            </span>
            <span style={{ color: "#B19470" }}>·</span>
            <span
              className="font-sans text-sm italic"
              style={{ color: "#76453B" }}
            >
              {content.date}
            </span>
            <span style={{ color: "#B19470" }}>·</span>
            <span className="font-sans text-sm" style={{ color: "#76453B" }}>
              {content.readTime} baca
            </span>
          </div>

          {/* Divider */}
          <div
            className="w-full h-px mb-8"
            style={{ backgroundColor: "#B19470" }}
          />

          {/* Thumbnail */}
          <div
            className="w-full rounded-2xl overflow-hidden mb-10"
            style={{ height: "320px", backgroundColor: "#43766C" }}
          />

          {/* Body */}
          <div className="space-y-6">
            {content.body.map((paragraph, i) => (
              <p
                key={i}
                className="font-sans leading-relaxed"
                style={{ fontSize: "17px", color: "#F8FAE5" }}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Bottom divider */}
          <div
            className="w-full h-px mt-12 mb-8"
            style={{ backgroundColor: "#B19470" }}
          />
        </article>
      </main>
      <FooterSection />
    </>
  );
}
