// src/components/landing/GallerySection.tsx
// ─────────────────────────────────────────────────────────────
// GallerySection — section heading + 2-col × 3-row image grid
// bg-brand-teal section background per mockup
// Static placeholder: colored divs stand in for images until
// assets + Sanity schema confirmed
// ─────────────────────────────────────────────────────────────

import Image from "next/image";

// ── Placeholder data ──────────────────────────────────────────
// 6 items → 2-col × 3-row grid
const PLACEHOLDER_IMAGES = [
  { id: "1", alt: "Foto kebun 1", bgColor: "bg-brand-teal/70" },
  { id: "2", alt: "Foto kebun 2", bgColor: "bg-brand-tan/70" },
  { id: "3", alt: "Foto kebun 3", bgColor: "bg-brand-brown/70" },
  { id: "4", alt: "Foto kebun 4", bgColor: "bg-brand-teal/50" },
  { id: "5", alt: "Foto kebun 5", bgColor: "bg-brand-tan/50" },
  { id: "6", alt: "Foto kebun 6", bgColor: "bg-brand-brown/50" },
];

// ── GalleryImage ──────────────────────────────────────────────
// Atomic image tile: fixed aspect ratio, rounded corners
// Replace inner div with next/image once assets confirmed
// ─────────────────────────────────────────────────────────────
function GalleryImage({ alt, bgColor }: { alt: string; bgColor: string }) {
  return (
    // relative → required for future next/image fill prop
    // aspect-square → 1:1 ratio enforced via CSS
    // overflow-hidden → clips image at rounded corners
    <div
      className={`relative aspect-square w-full overflow-hidden rounded-xl ${bgColor}`}
    >
      {/* ── Image placeholder ─────────────────────────────
                Replace with:
                <Image src={imageUrl} alt={alt} fill
                  style={{ objectFit: "cover" }} />
                once assets confirmed with UI/UX designer
            ─────────────────────────────────────────────── */}
      <Image
        src="/images/placeholder.jpg"
        alt={alt}
        fill
        sizes="100vw"
        style={{ objectFit: "cover" }}
      />
    </div>
  );
}

// ── GallerySection ────────────────────────────────────────────
// bg-brand-teal → dark green section per mockup
// Heading: text-brand-cream → light text on dark bg
// Grid: grid-cols-2 gap-3 → 2-col uniform grid
// ─────────────────────────────────────────────────────────────
export default function GallerySection() {
  return (
    <section className="relative overflow-hidden px-4 py-10">
      {/* ── SVG blob background ───────────────────────────
                teal blob SVG → fills section behind content
                aria-hidden → decorative only
            ─────────────────────────────────────────────── */}
      <img
        src="/icons/blob-teal.svg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 z-0 size-full object-cover"
      />

      {/* ── Content layer ─────────────────────────────────
                relative z-10 → above SVG blob
            ─────────────────────────────────────────────── */}
      <div className="relative z-10">
        <h2 className="mb-6 text-center font-title text-2xl font-bold text-brand-cream">
          Gallery
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {PLACEHOLDER_IMAGES.map((image) => (
            <GalleryImage
              key={image.id}
              alt={image.alt}
              bgColor={image.bgColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
