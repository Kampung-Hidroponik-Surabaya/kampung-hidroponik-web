// src/app/tentang/page.tsx
// ─────────────────────────────────────────────────────────────
// Tentang Kami page — Server Component
// Fetches aboutPage singleton + siteSettings from Sanity
// Sections: Hero → Deskripsi Singkat → Visi Misi → Contact Info
// ─────────────────────────────────────────────────────────────

import Image from "next/image";
import { getAboutPage, getSiteSettings } from "@/lib/queries";
import { urlFor } from "@/lib/sanity";
import BackButton from "@/components/shared/BackButton";
import HeroContent from "@/components/shared/HeroContent";

export const metadata = { title: "Tentang Kami" };

export default async function TentangPage() {
    // ── Fetch data ────────────────────────────────────────────
    // Both fetches run in parallel → faster than sequential
    const [about, settings] = await Promise.all([
        getAboutPage(),
        getSiteSettings(),
    ]);

    return (
        <main style={{ paddingTop: "var(--nav-height, 64px)" }}>
            {/* ══ Hero Section ══════════════════════════════════
                Full-bleed bg image from Sanity
                Falls back to bg-brand-teal if no image set
            ═════════════════════════════════════════════════ */}
            <section className="relative flex h-[50vh] flex-col justify-center overflow-hidden">
                {/* ── Hero background image ─────────────────────
                    Sanity image → urlFor() → next/image fill
                    Falls back to brand-teal bg if not set
                ─────────────────────────────────────────────── */}
                {about?.heroImage ? (
                    <Image
                        src={urlFor(about.heroImage).width(1200).url()}
                        alt={about.heroImage.alt ?? "Hero Tentang Kami"}
                        fill
                        priority
                        style={{ objectFit: "cover" }}
                        className="z-0"
                    />
                ) : (
                    <div className="absolute inset-0 z-0 bg-brand-teal" />
                )}

                {/* ── Gradient overlay ──────────────────────────
                    Ensures text legibility over any bg image
                ─────────────────────────────────────────────── */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* ── Hero content ──────────────────────────────
                    z-20 → above image + overlay
                ─────────────────────────────────────────────── */}
                <div className="relative z-20 flex flex-col gap-4 px-6">
                    <HeroContent
                        title="Tentang Kami"
                        description={
                            about?.heroTagline ??
                            "Komunitas Hidroponik Urban Surabaya"
                        }
                    />
                    <BackButton href="/" label="Kembali ke Beranda" />
                </div>
            </section>

            {/* ══ Deskripsi Singkat ═════════════════════════════
                bg-brand-cream section
                Short description from Sanity aboutPage
            ═════════════════════════════════════════════════ */}
            <section className="bg-brand-cream px-6 py-12">
                <div className="mx-auto max-w-[430px] md:max-w-[800px]">
                    <h2 className="section-title mb-4 text-brand-teal">
                        Siapa Kami?
                    </h2>
                    <p className="font-sans text-base leading-relaxed text-brand-brown">
                        {about?.shortDescription ??
                            "Informasi tentang komunitas belum tersedia."}
                    </p>
                </div>
            </section>

            {/* ══ Visi & Misi ══════════════════════════════════
                bg-brand-teal section
                visi: single text block
                misi: array of strings → rendered as list
            ═════════════════════════════════════════════════ */}
            <section className="bg-brand-teal px-6 py-12">
                <div className="mx-auto flex max-w-[430px] flex-col gap-10 md:max-w-[800px] md:flex-row">
                    {/* ── Visi ──────────────────────────────────
                        Left col on desktop, top on mobile
                    ─────────────────────────────────────────── */}
                    <div className="flex-1">
                        <h2 className="section-title mb-4 text-brand-cream">
                            Visi
                        </h2>
                        <p className="font-sans text-base leading-relaxed text-brand-cream/90">
                            {about?.visi ?? "Visi belum tersedia."}
                        </p>
                    </div>

                    {/* ── Divider ───────────────────────────────
                        Vertical on desktop, horizontal on mobile
                    ─────────────────────────────────────────── */}
                    <div className="w-full border-t border-brand-cream/20 md:h-auto md:w-px md:border-l md:border-t-0" />

                    {/* ── Misi ──────────────────────────────────
                        Right col on desktop, bottom on mobile
                        Rendered as numbered list
                    ─────────────────────────────────────────── */}
                    <div className="flex-1">
                        <h2 className="section-title mb-4 text-brand-cream">
                            Misi
                        </h2>
                        {about?.misi && about.misi.length > 0 ? (
                            <ol className="flex flex-col gap-3">
                                {about.misi.map((item, i) => (
                                    <li
                                        key={i}
                                        className="flex gap-3 font-sans text-base leading-relaxed text-brand-cream/90"
                                    >
                                        {/* ── Number badge ──────────────
                                            Teal circle with number
                                        ─────────────────────────────── */}
                                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-cream/20 font-title text-sm font-bold text-brand-cream">
                                            {i + 1}
                                        </span>
                                        {item}
                                    </li>
                                ))}
                            </ol>
                        ) : (
                            <p className="font-sans text-base text-brand-cream/70">
                                Misi belum tersedia.
                            </p>
                        )}
                    </div>
                </div>
            </section>

            {/* ══ Contact Info ══════════════════════════════════
                bg-brand-cream section
                Data from siteSettings singleton
            ═════════════════════════════════════════════════ */}
            <section className="bg-brand-cream px-6 py-12">
                <div className="mx-auto max-w-[430px] md:max-w-[800px]">
                    <h2 className="section-title mb-6 text-brand-teal">
                        Hubungi Kami
                    </h2>

                    <div className="flex flex-col gap-4">
                        {/* ── Phone ─────────────────────────────
                            tel: link → native dialer on mobile
                        ─────────────────────────────────────── */}
                        {settings?.phone && (
                            <div className="flex flex-col gap-1">
                                <span className="font-sans text-xs font-medium uppercase tracking-wide text-brand-tan">
                                    No. Telp
                                </span>
                                
                                    href={`tel:${settings.phone}`}
                                    className="font-sans text-base text-brand-teal hover:underline"
                                >
                                    {settings.phone}
                                </a>
                            </div>
                        )}

                        {/* ── Email ─────────────────────────────
                            mailto: link → opens email client
                        ─────────────────────────────────────── */}
                        {settings?.email && (
                            <div className="flex flex-col gap-1">
                                <span className="font-sans text-xs font-medium uppercase tracking-wide text-brand-tan">
                                    Email
                                </span>
                                
                                    href={`mailto:${settings.email}`}
                                    className="font-sans text-base text-brand-teal hover:underline"
                                >
                                    {settings.email}
                                </a>
                            </div>
                        )}

                        {/* ── Instagram ─────────────────────────
                            External link → instagram profile
                        ─────────────────────────────────────── */}
                        {settings?.instagram && (
                            <div className="flex flex-col gap-1">
                                <span className="font-sans text-xs font-medium uppercase tracking-wide text-brand-tan">
                                    Instagram
                                </span>
                                
                                    href={`https://instagram.com/${settings.instagram}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-sans text-base text-brand-teal hover:underline"
                                >
                                    @{settings.instagram}
                                </a>
                            </div>
                        )}

                        {/* ── Address ───────────────────────────
                            whitespace-pre-line → preserves line
                            breaks from Sanity text field
                        ─────────────────────────────────────── */}
                        {settings?.address && (
                            <div className="flex flex-col gap-1">
                                <span className="font-sans text-xs font-medium uppercase tracking-wide text-brand-tan">
                                    Alamat
                                </span>
                                <p className="whitespace-pre-line font-sans text-base text-brand-brown">
                                    {settings.address}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}