// src/components/landing/FooterSection.tsx
import Image from "next/image";
import Link from "next/link";
import type { SiteSettings } from "@/lib/sanity.types";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/blog", label: "Blog" },
  { href: "/anggota", label: "Anggota" },
  { href: "/tentang", label: "Tentang Kami" },
];

export default function FooterSection({
  siteSettings, 
}: {
  siteSettings: SiteSettings | null; // passed from parent when Sanity wired
}) {
  return (
    <footer className="bg-brand-teal px-6 py-10 text-white md:px-16 md:py-14">
      {/* ── Desktop: 3 column grid | Mobile: single column ── */}
      <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:justify-between md:gap-8">
        {/* Col 1 — Logo + Collaboration */}
        <div className="flex flex-col items-center gap-3 md:items-start">
          <Image
            src="/images/ori-logo.png"
            alt="Kampung Hidroponik Surabaya"
            width={234}
            height={187}
            className="h-[187px] w-[234px] object-contain"
          />
          <div className="flex flex-col items-center gap-2 md:items-start">
            <span className="font-title text-sm font-normal text-white">
              In Collaboration With:
            </span>
            <div className="flex items-center gap-3">
              <Image
                src="/images/bakti-electics.png"
                alt="Kolaborator 1"
                width={28}
                height={28}
                className="object-contain"
              />
              <Image
                src="/images/bem.png"
                alt="Kolaborator 2"
                width={28}
                height={28}
                className="object-contain"
              />
              <Image
                src="/images/polaris.png"
                alt="Kabinet Polaris"
                width={80}
                height={28}
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Col 2 — Nav links */}
        <nav className="flex flex-col items-center gap-4 md:items-start md:pt-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-title text-2xl font-bold text-white transition-colors hover:text-white/70"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Col 3 — Hubungi Kami + Contact */}
        <div className="flex flex-col items-center gap-4 md:items-start md:pt-2">
          {/* Hubungi Kami */}
          <div className="flex flex-col items-center gap-3 md:items-start">
            <span className="font-title text-2xl font-normal text-white">
              Hubungi Kami
            </span>
            <a
              href={
                siteSettings?.instagram
                  ? `https://instagram.com/${siteSettings.instagram}`
                  : "https://instagram.com"
              }
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Kampung Hidroponik"
              className="text-white transition-colors hover:text-white/70"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
              </svg>
            </a>
          </div>

          {/* Contact info */}
          <div className="flex flex-col gap-2 text-center md:text-left">
            <div>
              <p className="font-title text-sm font-bold text-white">Email:</p>
              <p className="font-title text-sm font-normal text-white">
                {siteSettings?.email ?? '@loremipsum@gmail.com'}
              </p>
            </div>
            <div>
              <p className="font-title text-sm font-bold text-white">
                No. Telp:
              </p>
              <p className="font-title text-sm font-normal text-white">
                {siteSettings?.phone ?? '(67) 999-999'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mt-8 w-full border-t border-white" />

      {/* Copyright + address */}
      <div className="mt-4 flex flex-col items-center gap-1 text-center md:flex-row md:justify-between md:text-left">
        <span className="font-title text-sm font-normal text-white">
          © Kampung Hidroponik Surabaya
        </span>
        <span className="font-sans text-sm font-normal text-brand-cream">
          {siteSettings?.address ?? 'Jl. Medayu Utara XIII No.1, Medokan Ayu, Kec. Rungkut, Surabaya, Jawa Timur 60295'}
        </span>
      </div>
    </footer>
  );
}
