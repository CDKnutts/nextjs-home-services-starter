import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import ServiceAreasSection from "@/components/ServiceAreasSection";
import ReviewsSection from "@/components/ReviewsSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <ServiceAreasSection />
      <ReviewsSection />
    </main>
  );
}
