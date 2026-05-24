import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-brand-cream text-brand-brown">
      <h1 className="font-title text-3xl font-bold">404</h1>
      <p className="font-sans text-base">Halaman tidak ditemukan.</p>
      <Link
        href="/"
        className="font-sans text-sm text-brand-teal underline underline-offset-4"
      >
        Kembali ke Beranda
      </Link>
    </main>
  );
}
