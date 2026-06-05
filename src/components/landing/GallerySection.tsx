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
  const photos = images.slice(0, 5).map((img) => ({
    src: urlFor(img.image).width(400).url(),
    alt: img.image.alt ?? img.title,
  }))
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
        <h2
          className="font-title font-bold"
          style={{
            fontSize: "46.343px",
            color: "#F8FAE5",
            paddingTop: "55.06px",
          }}
        >
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
              className="shrink-0 overflow-hidden"
              style={{ width: "143px", height: "141px", borderRadius: "4px" }}
            >
              <Image
                src={photos[0].src}
                alt={photos[0].alt}
                width={143}
                height={103}
                className="size-full object-cover"
              />
            </div>
            <div
              className="flex-1 overflow-hidden"
              style={{ height: "141px", borderRadius: "4px" }}
            >
              <Image
                src={photos[1].src}
                alt={photos[1].alt}
                width={186}
                height={141}
                className="size-full object-cover"
              />
            </div>
          </div>

          {/* Row 2 — 3 photos */}
          <div className="flex" style={{ gap: "11px" }}>
            <div
              className="shrink-0 overflow-hidden"
              style={{ width: "143px", height: "103px", borderRadius: "4px" }}
            >
              <Image
                src={photos[2].src}
                alt={photos[2].alt}
                width={143}
                height={103}
                className="size-full object-cover"
              />
            </div>
            <div
              className="shrink-0 overflow-hidden"
              style={{ width: "78px", height: "103px", borderRadius: "4px" }}
            >
              <Image
                src={photos[3].src}
                alt={photos[3].alt}
                width={78}
                height={103}
                className="size-full object-cover"
              />
            </div>
            <div
              className="flex-1 overflow-hidden"
              style={{ height: "103px", borderRadius: "4px" }}
            >
              <Image
                src={photos[4].src}
                alt={photos[4].alt}
                width={143}
                height={103}
                className="size-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
