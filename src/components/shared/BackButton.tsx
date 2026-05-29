// src/components/shared/BackButton.tsx
"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  label?: string;
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
      className="flex items-center rounded-lg bg-[#76453B] text-white font-title font-normal transition-opacity hover:opacity-80"
      style={{
        width: "115px",
        height: "36px",
        padding: "7px 8px 10px 9px",
        gap: "12px",
        fontSize: "14px",
      }}
    >
      <ArrowLeft size={16} className="shrink-0" />
      {label}
    </button>
  );
}
