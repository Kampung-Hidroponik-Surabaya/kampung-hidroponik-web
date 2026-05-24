// src/components/landing/ProgramTerbaruSection.tsx
// ─────────────────────────────────────────────────────────────
// ProgramTerbaruSection — section heading + asymmetric mosaic grid
// Grid layout: 1 large card left (spans 2 rows) + 2 stacked right
// Static placeholder: bg colors stand in for images until
// assets + Sanity schema are confirmed
// ─────────────────────────────────────────────────────────────

// Static placeholder data — replace with Sanity fetch later
const PLACEHOLDER_PROGRAMS = [
  { id: "1", label: "Lorem Ipsum", bgColor: "bg-brand-teal" },
  { id: "2", label: "Lorem Ipsum", bgColor: "bg-brand-tan" },
  { id: "3", label: "Lorem Ipsum", bgColor: "bg-brand-brown" },
];

// ── ProgramCard ───────────────────────────────────────────────
// Atomic card: colored bg + label overlay bottom-left
// Receives size variant → controls aspect ratio
// large: left col card (taller)
// small: right col cards (shorter)
// ─────────────────────────────────────────────────────────────
function ProgramCard({
  label,
  bgColor,
  size,
}: {
  label: string;
  bgColor: string;
  size: "large" | "small";
}) {
  return (
    <div
      // relative → stacking context for label overlay
      // overflow-hidden → clips label at card boundary
      className={[
        "relative overflow-hidden rounded-2xl",
        // large → aspect-[3/4] fills tall left column
        // small → aspect-video fits compact right column
        size === "large" ? "aspect-[3/4]" : "aspect-video",
        bgColor,
      ].join(" ")}
    >
      {/* ── Gradient overlay ──────────────────────────────
                Bottom-to-top gradient → label legibility
                Covers bottom 50% of card
            ─────────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

      {/* ── Label ─────────────────────────────────────────
                absolute bottom-left → overlays gradient
                z-10 → above gradient div
            ─────────────────────────────────────────────── */}
      <span className="absolute bottom-3 left-3 z-10 font-title text-sm font-bold text-brand-cream">
        {label}
      </span>
    </div>
  );
}

// ── ProgramTerbaruSection ─────────────────────────────────────
// Layout: CSS Grid 2-col
// Left col → 1 large card (row-span-2)
// Right col → 2 stacked small cards
// ─────────────────────────────────────────────────────────────
export default function ProgramTerbaruSection() {
  const [large, ...small] = PLACEHOLDER_PROGRAMS;

  return (
    <section className="bg-brand-cream px-4 py-10">
      {/* ── Section Heading ───────────────────────────────
                font-title + text-brand-teal → GSM spec
                text-center → matches mockup alignment
            ─────────────────────────────────────────────── */}
      <h2 className="mb-6 text-center font-title text-2xl font-bold text-brand-teal">
        Program Terbaru
      </h2>

      {/* ── Mosaic Grid ───────────────────────────────────
                grid-cols-2 → 2 equal columns
                grid-rows-2 → 2 rows for right col stacking
                gap-3 → consistent gutter
            ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 grid-rows-2 gap-3">
        {/* Left col: large card spans both rows */}
        <div className="row-span-2">
          <ProgramCard
            label={large.label}
            bgColor={large.bgColor}
            size="large"
          />
        </div>

        {/* Right col: 2 stacked small cards */}
        {small.map((program) => (
          <ProgramCard
            key={program.id}
            label={program.label}
            bgColor={program.bgColor}
            size="small"
          />
        ))}
      </div>
    </section>
  );
}
