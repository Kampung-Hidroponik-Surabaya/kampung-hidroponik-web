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

        {/* guard: no members published yet → empty state */}
        {members.length === 0 ? (
          <p className="font-sans text-brand-brown/60">
            Belum ada anggota yang ditambahkan.
          </p>
        ) : (
          <>
            {/* Mobile: alternating reverse layout */}
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
          </>
        )}
      </main>
      <FooterSection siteSettings={siteSettings} />
    </>
  );
}
