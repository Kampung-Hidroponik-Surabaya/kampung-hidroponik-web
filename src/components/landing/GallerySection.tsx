// src/components/landing/GallerySection.tsx
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import type { GalleryImage } from "@/lib/sanity.types";

// Fallback: empty array -> renders nothing (section still visible vva bg)

export default function GallerySection({
  images,
}: {
  images: GalleryImage[]; // passed from parent when Sanity wired
}) {
  const photos = images
    .filter((img) => img.image?.asset) // ← buang yang tidak punya image
    .slice(0, 5)
    .map((img) => ({
      src: urlFor(img.image).width(400).url(),
      alt: img.image.alt ?? img.title,
    }));
  if (photos.length < 5) return null;
  return (
    <section
      className="relative"
      style={{
        backgroundImage: "url('/images/liquid-bg-gallery.png')",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* ── Content ───────────────────────────────────────── */}
      <div
        style={{
          paddingLeft: "30px",
          paddingRight: "39px",
          paddingBottom: "96px",
        }}
      >
        {/* Title */}
        <div className="px-[30px] md:px-[60px] lg:px-[80px] pb-[96px]">
          <h2 className="font-title font-bold text-[#F8FAE5] pt-[55px] text-[46px] md:text-[56px] lg:text-[64px]">
            Gallery
          </h2>

          {/* ── Photo grid ──────────────────────────────────
            Row 1: 2 photos (143x141, 186x141)
            Row 2: 3 photos (143x103, 78x103, remaining)
            gap: 11px both axes
        ─────────────────────────────────────────────── */}
          <div className="flex flex-col" style={{ gap: "11px" }}>
            {/* Row 1 — 2 photos */}
            <div className="flex" style={{ gap: "11px" }}>
              <div
                className="overflow-hidden"
                style={{
                  width: "35%",
                  height: "clamp(141px, 20vw, 280px)",
                  borderRadius: "4px",
                }}
              >
                <Image
                  src={photos[0].src}
                  alt={photos[0].alt}
                  width={400}
                  height={300}
                  className="size-full object-cover"
                />
              </div>
              <div
                className="flex-1 overflow-hidden"
                style={{
                  height: "clamp(141px, 20vw, 280px)",
                  borderRadius: "4px",
                }}
              >
                <Image
                  src={photos[1].src}
                  alt={photos[1].alt}
                  width={800}
                  height={400}
                  className="size-full object-cover"
                />
              </div>
            </div>

            {/* Row 2 — 3 photos */}
            <div className="flex" style={{ gap: "11px" }}>
              <div
                className="overflow-hidden"
                style={{
                  width: "35%",
                  height: "clamp(103px, 15vw, 220px)",
                  borderRadius: "4px",
                }}
              >
                <Image
                  src={photos[2].src}
                  alt={photos[2].alt}
                  width={400}
                  height={300}
                  className="size-full object-cover"
                />
              </div>
              <div
                className="overflow-hidden"
                style={{
                  width: "20%",
                  height: "clamp(103px, 15vw, 220px)",
                  borderRadius: "4px",
                }}
              >
                <Image
                  src={photos[3].src}
                  alt={photos[3].alt}
                  width={300}
                  height={300}
                  className="size-full object-cover"
                />
              </div>
              <div
                className="flex-1 overflow-hidden"
                style={{
                  height: "clamp(103px, 15vw, 220px)",
                  borderRadius: "4px",
                }}
              >
                <Image
                  src={photos[4].src}
                  alt={photos[4].alt}
                  width={800}
                  height={400}
                  className="size-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
