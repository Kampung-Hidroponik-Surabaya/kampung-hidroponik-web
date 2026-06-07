// src/components/landing/ContactCard.tsx
// ─────────────────────────────────────────────────────────────
// ContactCard — rounded square avatar with border,
// phone number below avatar, name label at bottom
// Transparent card bg — floats on cream section bg
// ─────────────────────────────────────────────────────────────

import { Phone } from "lucide-react";

export interface ContactCardProps {
  id: string;
  name: string;
  phone: string;
  bgColor?: string;
}

export default function ContactCard({
  name,
  phone,
  bgColor = "bg-brand-tan/30",
}: ContactCardProps) {
  const cleanPhone = phone.replace(/\D/g, "");

  return (
    <div
      className={[
        // w-[80vw] → 1 card visible + peek of next
        "flex w-[60vw] sm:w-[40vw] md:w-[30vw] lg:w-[220px] flex-shrink-0 [scroll-snap-align:start]",
        // transparent bg — no fill
        // flex-col centered → avatar top, phone mid, name bot
        "flex-col items-center gap-3 px-6 py-4",
        "transition-all duration-200 active:scale-[0.98]",
      ].join(" ")}
    >
      {/* ── Avatar ────────────────────────────────────────
                Rounded square with brand-brown border
                Large size → dominant visual element per mockup
                Replace inner div with next/image once asset ready:
                <Image src={avatarUrl} alt={name} fill
                  className="object-cover" />
                border-brand-brown → matches mockup border color
                rounded-3xl → rounded square, not circle
            ─────────────────────────────────────────────── */}
      <div
        className={[
          "relative overflow-hidden",
          // Size: large square
          "h-40 w-40",
          // Rounded square shape
          "rounded-3xl",
          // Border per mockup: brown, medium weight
          "border-[3px] border-brand-brown",
          // Placeholder bg
          bgColor,
        ].join(" ")}
      >
        {/* ── Placeholder label ─────────────────────────
                    Centered "?" until real avatar confirmed
                    Remove once next/image is wired
                ─────────────────────────────────────────────── */}
        <div className="flex size-full items-center justify-center">
          <span className="font-title text-4xl font-bold text-brand-brown/30">
            ?
          </span>
        </div>
      </div>

      {/* ── Name label ────────────────────────────────────
                Bottom of card per mockup
                font-title + text-brand-teal → GSM spec
                font-bold → prominent label
            ─────────────────────────────────────────────── */}
      <span className="text-center font-title text-lg font-bold text-brand-teal">
        {name}
      </span>

      {/* ── Phone number ──────────────────────────────────
                Directly below avatar per mockup
                tel: link → native dialer on mobile tap
                Phone icon left of number
                text-brand-teal → GSM spec
            ─────────────────────────────────────────────── */}
      <a
        href={`https://wa.me/+${cleanPhone}`}
        className={[
          "flex items-center gap-1.5 rounded-full",
          "border border-brand-teal px-4 py-2",
          "font-sans text-base font-medium text-brand-teal",
          "transition-opacity duration-200 hover:opacity-70",
          "active:scale-95",
        ].join(" ")}
      >
        <Phone size={14} className="shrink-0" />+{" "}
        {phone.replace(/(\d{2})(\d{3})(\d{4})(\d{3})/, "$1 $2-$3-$4")}
      </a>
    </div>
  );
}
