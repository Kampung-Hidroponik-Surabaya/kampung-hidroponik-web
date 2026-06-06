import MemberCard from "@/components/member/MemberCard";
import type { Member } from "@/lib/sanity.types";
import FooterSection from "@/components/landing/FooterSection";
import { getSiteSettings } from "@/lib/queries";

export const metadata = { title: "Anggota" };

const members: Member[] = [
  {
    _id: "1",
    name: "John Doe",
    jabatan: "Lorem Ipsum",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    photo: {} as any,
    orderRank: "1",
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
  },
  {
    _id: "2",
    name: "John Doe",
    jabatan: "Lorem Ipsum",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    photo: {} as any,
    orderRank: "2",
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
  },
  {
    _id: "3",
    name: "John Doe",
    jabatan: "Lorem Ipsum",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    photo: {} as any,
    orderRank: "3",
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
  },
];
export default async function MembersPage() {
  const siteSettings = await getSiteSettings();

  return (
    <>
      <main
        className="min-h-screen px-[44px] pt-[76px] pb-[65px]"
        style={{ backgroundColor: "#F8FAE5" }}
      >
        <h1
          className="font-title font-bold"
          style={{
            fontSize: "42.361px",
            color: "#43766C",
            marginBottom: "66px",
          }}
        >
          Meet The
          <br />
          Member
        </h1>

        {/* Mobile: alternating */}
        <div className="flex flex-col md:hidden" style={{ gap: "65px" }}>
          {members.map((member, index) => (
            <MemberCard
              key={member._id}
              member={member}
              reverse={index % 2 !== 0}
            />
          ))}
        </div>

        {/* Desktop: 2 column grid */}
        <div className="hidden md:grid md:grid-cols-2 md:gap-16">
          {members.map((member) => (
            <MemberCard key={member._id} member={member} />
          ))}
        </div>
      </main>
      <FooterSection siteSettings={siteSettings} />
    </>
  );
}
