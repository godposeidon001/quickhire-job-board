import { CategorySection } from "@/components/category/category-section";
import { CompanyStripSection } from "@/components/company/company-strip";
import { CtaSection } from "@/components/cta/cta-section";
import { FeaturedJobsSection } from "@/components/featured-jobs/featured-jobs-section";
import { SiteFooter } from "@/components/footer/site-footer";
import { HeroSection } from "@/components/hero/hero-section";
import { LatestJobsSection } from "@/components/latest-jobs/latest-jobs-section";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <CompanyStripSection />
      <CategorySection />
      <CtaSection />
      <FeaturedJobsSection />
      <LatestJobsSection />
      <SiteFooter />
    </main>
  );
}
