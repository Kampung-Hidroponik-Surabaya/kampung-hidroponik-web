// src/components/landing/FooterSection.tsx
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/blog", label: "Blog" },
  { href: "/anggota", label: "Member" },
];

export default function FooterSection() {
  return (
    <footer className="flex flex-col items-center gap-6 bg-brand-teal px-6 py-10 text-white">
      {/* Logo */}
      <Image
        src="/images/logo.png"
        alt="Kampung Hidroponik Surabaya"
        width={192}
        height={153}
        className="object-contain"
      />

      {/* Collaboration logos */}
      <div className="flex flex-col items-center gap-2">
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

      {/* Nav links */}
      <nav className="flex flex-col items-center gap-4 pt-2">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="font-title text-2xl font-bold text-white hover:text-white/70 transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Hubungi Kami */}
      <div className="flex flex-col items-center gap-3 pt-2">
        <span className="font-title text-2xl font-normal text-white">
          Hubungi Kami
        </span>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram Kampung Hidroponik"
          className="text-white hover:text-white/70 transition-colors"
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
      <div className="flex flex-col gap-2 self-start">
        <div>
          <p className="font-title text-sm font-bold text-white">Email:</p>
          <p className="font-title text-sm font-normal text-white">
            @loremipsum@gmail.com
          </p>
        </div>
        <div>
          <p className="font-title text-sm font-bold text-white">No. Telp:</p>
          <p className="font-title text-sm font-normal text-white">
            +(67)999-999
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full border-t border-white" />

      {/* Copyright + address */}
      <div className="flex flex-col items-center gap-1 text-center max-w-[262px]">
        <span className="font-title text-sm font-normal text-white">
          © Kampung Hidroponik Surabaya
        </span>
        <span className="font-sans text-sm font-normal text-brand-cream">
          Jl. Medayu Utara XIII No.1, Medokan Ayu, Kec. Rungkut, Surabaya, Jawa
          Timur 60295
        </span>
      </div>
    </footer>
  );
}
