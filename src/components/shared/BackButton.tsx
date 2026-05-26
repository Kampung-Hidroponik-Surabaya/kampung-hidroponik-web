// src/components/shared/BackButton.tsx
// ─────────────────────────────────────────────────────────────
// BackButton — reusable pill-shaped navigation button
// Behavior:
//   href provided → router.push(href)
//   href omitted → router.back()
// Shared atomic → consumed by HeroSection + future pages
// ─────────────────────────────────────────────────────────────

"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
    // label: button text — defaults to "Baca Blog" per mockup
    label?: string;
    // href: explicit target route — omit to use router.back()
    href?: string;
}

export default function BackButton({
    label = "Baca Blog",
    href,
}: BackButtonProps) {
    const router = useRouter();

    function handleClick() {
        if (href) {
            router.push(href);
        } else {
            router.back();
        }
    }

    return (
        <button
            onClick={handleClick}
            // pill shape → rounded-full
            // bg-brand-cream + text-brand-teal → inverted from hero bg
            // w-fit → shrinks to content width
            className="flex w-fit items-center gap-2 rounded-full bg-brand-cream px-5 py-2 font-sans text-sm font-medium text-brand-teal transition-opacity hover:opacity-80"
        >
            <ArrowLeft size={16} />
            {label}
        </button>
    );
}