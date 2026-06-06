// src/components/landing/ContactUsSection.tsx
// ─────────────────────────────────────────────────────────────
// ContactUsSection — bg-brand-cream section wrapper
// Delegates carousel + card rendering to ContactCardCarousel
// Server Component — no 'use client' here
// Client boundary isolated to ContactCardCarousel
// ─────────────────────────────────────────────────────────────

import ContactCardCarousel from "@/components/landing/ContactCardCarousel";
import type { Contact } from "@/lib/sanity.types";

export default function ContactUsSection({
  contacts,
}: {
  contacts: Contact[]
}) {
    return (
    <section className="bg-brand-cream px-4 py-16">
      {/* ── Section Heading ───────────────────────────────
                section-title → global font size token
                text-brand-teal → GSM primary on cream bg
                px-4 → aligns with carousel left edge
            ─────────────────────────────────────────────── */}
      <h2 className="section-title text-center text-5xl text-brand-teal">
        Contact Us
      </h2>

      {/* ── ContactCardCarousel ───────────────────────────
                No props → uses PLACEHOLDER_CONTACTS internally
                When Sanity wired: pass items={fetchedContacts}
            ─────────────────────────────────────────────── */}
      <ContactCardCarousel contacts={contacts} />
    </section>
  );
}
