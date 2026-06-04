// src/app/anggota/page.tsx
import MemberCard, { type MemberData } from "@/components/member/MemberCard";
import FooterSection from "@/components/landing/FooterSection";

export const metadata = { title: "Anggota" };

const members: MemberData[] = [
  {
    id: 1,
    label: "Lorem Ipsum",
    name: "John Doe",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    photo: "/images/ori-logo.png",
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
  },
  {
    id: 2,
    label: "Lorem Ipsum",
    name: "John Doe",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    photo: "/images/member-placeholder.png",
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
  },
  {
    id: 3,
    label: "Lorem Ipsum",
    name: "John Doe",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    photo: "/images/member-placeholder.png",
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
  },
  {
    id: 4,
    label: "Lorem Ipsum",
    name: "John Doe",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    photo: "/images/member-placeholder.png",
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
  },
  {
    id: 5,
    label: "Lorem Ipsum",
    name: "John Doe",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    photo: "/images/member-placeholder.png",
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
  },
];

export default function MembersPage() {
  return (
    <>
      <main
        className="mx-auto min-h-screen  px-[44px] pb-[65px] pt-[76px]"
        style={{ backgroundColor: "#F8FAE5" }}
      >
        {/* Section title */}
        <h1
          className="font-title font-bold"
          style={{
            fontSize: "42.361px",
            color: "#43766C",
            marginBottom: "66px",
          }}
        >
          Meet The Member
        </h1>

        {/* Mobile: alternating */}
        <div className="flex flex-col md:hidden" style={{ gap: "65px" }}>
          {members.map((member, index) => (
            <MemberCard
              key={member.id}
              member={member}
              reverse={index % 2 !== 0}
            />
          ))}
        </div>

        {/* Desktop: 2 column grid */}
        <div className="hidden md:grid md:grid-cols-2 md:gap-16">
          {members.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      </main>

      <FooterSection />
    </>
  );
}
