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
    <section
      className="relative py-14 md:py-20"
      style={{
        backgroundColor: "var(--brand-teal)", // Fallback for browsers that don't support CSS variables
        backgroundImage: "url('/images/cut-liquid-bg-2-teal.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative z-10">
        <h2
          className="section-title text-brand-cream"
          style={{ textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}
        >
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
