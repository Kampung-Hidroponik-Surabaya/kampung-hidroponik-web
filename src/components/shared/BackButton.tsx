// src/components/shared/BackButton.tsx
"use client";

import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

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
      className="flex items-center rounded-lg bg-[#76453B] font-title font-normal text-white transition-opacity hover:opacity-80 gap-3 text-sm"
      style={{ width: "115px", height: "36px", padding: "7px 8px 10px 9px" }}
    >
      <Search size={16} strokeWidth={2} color="#FFFFFF" />
      {label}
    </button>
  );
}
