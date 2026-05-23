import type { Metadata } from "next";
import { Atkinson_Hyperlegible, Ubuntu_Sans } from "next/font/google";
import "./globals.css";

const atkinson = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-atkinson",
});

const ubuntu = Ubuntu_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-ubuntu",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Kampung Hidroponik",
    default: "Kampung Hidroponik Surabaya",
  },
  description: "Urban farming berbasis hidroponik di Surabaya",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={`${atkinson.variable} ${ubuntu.variable}`}>
        {children}
      </body>
    </html>
  );
}

export const viewport = {
  themeColor: "#43766C",
  width: "device-width",
  initialScale: 1,
};