import { CategorySection } from "@/components/category/category-section";
import { CompanyStripSection } from "@/components/company/company-strip";
import { HeroSection } from "@/components/hero/hero-section";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <CompanyStripSection />
      <CategorySection />
    </main>
  );
}
