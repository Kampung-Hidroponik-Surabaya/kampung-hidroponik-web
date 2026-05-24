// src/components/landing/FooterSection.tsx
// ─────────────────────────────────────────────────────────────
// FooterSection — centered logo + tagline
// Minimal layout: no nav links, no social icons at this stage
// bg-brand-teal → matches GallerySection above, flush join
// Logo placeholder: colored div until asset confirmed with
// UI/UX designer
// ─────────────────────────────────────────────────────────────

export default function FooterSection() {
  return (
    <footer
      // bg-brand-teal → flush with GallerySection above
      // border-t separates footer from gallery visually
      className="flex flex-col items-center gap-4 bg-brand-teal px-4 py-10"
    >
      {/* ── Logo placeholder ──────────────────────────────
                Replace with:
                <Image
                    src="/logo.png"
                    alt="Kampung Hidroponik"
                    width={80}
                    height={80}
                />
                once asset path confirmed with UI/UX designer
                Dimensions: confirm exact px with designer
            ─────────────────────────────────────────────── */}
      <div
        className="flex size-16 items-center justify-center rounded-full bg-brand-cream/20"
        aria-label="Logo Kampung Hidroponik"
        role="img"
      >
        <span className="font-title text-xs font-bold text-brand-cream">
          LOGO
        </span>
      </div>

      {/* ── Site name ─────────────────────────────────────
                font-title + text-brand-cream → GSM spec
                text-center → centered on all mobile viewports
            ─────────────────────────────────────────────── */}
      <div className="flex flex-col items-center gap-1 text-center">
        <span className="font-title text-base font-bold text-brand-cream">
          Kampung Hidroponik
        </span>

        {/* ── Tagline ───────────────────────────────────
                    font-sans regular → GSM body font
                    text-brand-cream/70 → muted on dark bg
                    Confirm final copy with UI/UX designer
                ─────────────────────────────────────────────── */}
        <span className="font-sans text-xs text-brand-cream/70">
          Kebun Pro Iklim RW 12 Medokan Ayu
        </span>
      </div>

      {/* ── Copyright ─────────────────────────────────────
                Dynamic year via Date → never goes stale
                font-sans text-xs → minimal visual weight
            ─────────────────────────────────────────────── */}
      <span className="font-sans text-xs text-brand-cream/50">
        © {new Date().getFullYear()} Kampung Hidroponik. All rights reserved.
      </span>
    </footer>
  );
}
