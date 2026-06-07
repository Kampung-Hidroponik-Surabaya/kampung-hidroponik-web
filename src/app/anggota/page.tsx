import MemberCard from "@/components/member/MemberCard";
import FooterSection from "@/components/landing/FooterSection";
import { getSiteSettings, getAllMembers } from "@/lib/queries";

export const revalidate = 300;
export const metadata = { title: "Anggota" };

export default async function MembersPage() {
  const [members, siteSettings] = await Promise.all([
    getAllMembers(),
    getSiteSettings(),
  ]);

  return (
    <>
      <main
        className="min-h-screen px-6 md:px-12 lg:px-20 pt-[76px] pb-[65px]"
        style={{ backgroundColor: "#F8FAE5" }}
      >
        <h1
          className="font-title font-bold mb-16"
          style={{ fontSize: "clamp(32px, 5vw, 52px)", color: "#43766C" }}
        >
          Meet The<br />Member
        </h1>

        {members.length === 0 ? (
          <p className="font-sans text-brand-brown/60">
            Belum ada anggota yang ditambahkan.
          </p>
        ) : (
          <>
            {/* Mobile: alternating */}
            <div className="flex flex-col md:hidden" style={{ gap: "65px" }}>
              {members.map((member, index) => (
                <MemberCard key={member._id} member={member} reverse={index % 2 !== 0} />
              ))}
            </div>

            {/* Tablet: 2 column grid */}
            <div className="hidden md:grid lg:hidden grid-cols-2 gap-10">
              {members.map((member) => (
                <MemberCard key={member._id} member={member} />
              ))}
            </div>

            {/* Desktop: 3 column grid */}
            <div className="hidden lg:grid grid-cols-3 gap-12">
              {members.map((member) => (
                <MemberCard key={member._id} member={member} />
              ))}
            </div>
          </>
        )}
      </main>
      <FooterSection siteSettings={siteSettings} />
    </>
  );
}