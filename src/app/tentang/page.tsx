import HeroSection from "@/components/landing/HeroSection";
import ContactUsSection from "@/components/landing/ContactUsSection";
import FooterSection from "@/components/landing/FooterSection";
import { getSiteSettings, getAllContacts } from "@/lib/queries";

export const metadata = { title: "Tentang Kami" };

export default async function TentangPage() {
  const [siteSettings, contacts] = await Promise.all([
    getSiteSettings(),
    getAllContacts(),
  ]);

  return (
    <main>
      <HeroSection siteSettings={siteSettings} />
      <ContactUsSection contacts={contacts} />
      <FooterSection siteSettings={siteSettings} />
    </main>
  );
}
