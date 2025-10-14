import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import ServiceAreasSection from "@/components/ServiceAreasSection";
import ReviewsSection from "@/components/ReviewsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="scroll-smooth">
      <main>
        <HeroSection />
        <ServicesSection />
        <WhyChooseUsSection />
        <ServiceAreasSection />
        <ReviewsSection />
      </main>
      <Footer />
    </div>
  );
}
