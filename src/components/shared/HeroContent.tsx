// src/components/shared/HeroContent.tsx
// ─────────────────────────────────────────────────────────────
// HeroContent — title + body copy block for hero sections
// Accepts title + description as props → reusable across
// Landing, Tentang, Anggota, Program pages
// Renders above BackButton inside HeroSection content layer
// ─────────────────────────────────────────────────────────────

interface HeroContentProps {
    // title: h1 text — required
    title: string;
    // description: body copy — required
    description: string;
}

export default function HeroContent({
    title,
    description,
}: HeroContentProps) {
    return (
        // gap-2 → tight spacing between title and body
        // no padding here → HeroSection content wrapper owns padding
        <div className="flex flex-col gap-2">
            {/* ── Title ─────────────────────────────────────────
                font-title → Atkinson Hyperlegible Bold (GSM)
                text-brand-cream → light text on dark overlay
                text-3xl → large enough for hero prominence
            ─────────────────────────────────────────────── */}
            <h1 className="font-title text-3xl font-bold text-brand-cream">
                {title}
            </h1>

            {/* ── Body copy ─────────────────────────────────────
                font-sans → Ubuntu Sans Regular (GSM)
                text-brand-cream/90 → slightly muted on overlay
                leading-relaxed → comfortable line spacing
            ─────────────────────────────────────────────── */}
            <p className="font-sans text-sm leading-relaxed text-brand-cream/90">
                {description}
            </p>
        </div>
    );
}