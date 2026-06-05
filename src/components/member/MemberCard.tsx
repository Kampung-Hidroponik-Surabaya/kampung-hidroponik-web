// src/components/members/MemberCard.tsx
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import type { Member } from "@/lib/sanity.types";

function IconInstagram() {
    return (
        <svg
            width="33"
            height="33"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#B19470"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.5" fill="#B19470" />
        </svg>
    );
}

function IconFacebook() {
    return (
        <svg
            width="39"
            height="39"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#B19470"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
    );
}

interface MemberCardProps {
    member: Member;
    reverse?: boolean;
}

export default function MemberCard({
    member,
    reverse = false,
}: MemberCardProps) {
    const photoUrl = urlFor(member.photo).width(314).height(392).url();
    const label = member.jabatan;
    const name = member.name;
    const desc = member.description ?? "";
    const igHref = member.instagram ?? "#";
    const fbHref = member.facebook ?? "#";

    return (
        <div
            className={`flex items-stretch gap-4 md:gap-10 ${reverse ? "flex-row-reverse" : "flex-row"}`}
        >
            {/* Photo */}
            <div
                className="shrink-0 overflow-hidden"
                style={{
                    width: "157px",
                    height: "196px",
                    borderRadius: "31.343px",
                    border: "4px solid #43766C",
                }}
            >
                <Image
                    src={photoUrl}
                    alt={label}
                    width={157}
                    height={196}
                    className="size-full object-cover"
                />
            </div>

            {/* Text — same height as card via justify-between */}
            <div
                className="flex flex-1 flex-col justify-between"
                style={{ minHeight: "196px" }}
            >
                <div className="flex flex-col" style={{ gap: "4px" }}>
                    <span
                        className="font-title font-bold"
                        style={{ fontSize: "12.379px", color: "#43766C" }}
                    >
                        {label}
                    </span>
                    <span
                        className="font-title font-bold leading-tight"
                        style={{ fontSize: "24.698px", color: "#43766C" }}
                    >
                        {name}
                    </span>
                    <p
                        className="text-justify font-sans font-normal"
                        style={{ fontSize: "11px", color: "#43766C" }}
                    >
                        {desc}
                    </p>
                </div>

                {/* Social icons pinned to bottom */}
                <div className="flex items-center" style={{ gap: "15.02px" }}>
                    <a
                        href={igHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                    >
                        <IconInstagram />
                    </a>
                    <a
                        href={fbHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                    >
                        <IconFacebook />
                    </a>
                </div>
            </div>
        </div>
    );
}
