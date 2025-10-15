import type { Metadata } from "next";
import Link from "next/link";
import * as Icons from "lucide-react";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: `Our Services - ${brand.companyName}`,
  description: `Professional home services including ${brand.services.map(s => s.name).join(", ")}. Licensed, insured, and available 24/7.`,
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id="services-hero" className="bg-gradient-to-br from-primary to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{brand.pages.services.heroTitle}</h1>
          <p className="text-xl text-gray-100 max-w-2xl mx-auto">
            {brand.pages.services.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services-grid" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {brand.services.map((service) => {
              const IconComponent = Icons[service.icon as keyof typeof Icons] as React.ComponentType<{ size?: number; className?: string }>;

              return (
                <div
                  key={service.slug}
                  className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="p-8">
                    {/* Icon & Title */}
                    <div className="flex items-center gap-4 mb-4">
                      {IconComponent && (
                        <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                          <IconComponent size={32} className="text-primary" />
                        </div>
                      )}
                      <h2 className="text-2xl font-bold text-gray-900">
                        {service.name}
                      </h2>
                    </div>

                    {/* Detailed Description */}
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {service.detailedDescription}
                    </p>

                    {/* Bullet Points */}
                    <ul className="space-y-3 mb-6">
                      {service.bulletPoints.map((point, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Icons.CheckCircle
                            size={20}
                            className="text-primary flex-shrink-0 mt-0.5"
                          />
                          <span className="text-gray-700">{point}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <div className="flex gap-4">
                      <Link
                        href={`/services/${service.slug}`}
                        className="flex-1 text-center bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-lg transition-all"
                      >
                        Learn More
                      </Link>
                      <Link
                        href="/contact"
                        className="flex-1 text-center bg-secondary hover:bg-secondary-dark text-white font-semibold px-6 py-3 rounded-lg transition-all"
                      >
                        Get Quote
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="services-cta" className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {brand.pages.services.ctaHeading}
          </h2>
          <p className="text-xl mb-8 text-gray-100">
            {brand.pages.services.ctaSubheading}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${brand.phone.replace(/\D/g, "")}`}
              className="bg-white text-primary hover:bg-gray-100 font-bold py-4 px-8 rounded-lg text-lg transition-all inline-flex items-center justify-center gap-2"
            >
              <Icons.Phone size={24} />
              Call {brand.phone}
            </a>
            <Link
              href="/contact"
              className="bg-secondary hover:bg-secondary-dark text-white font-bold py-4 px-8 rounded-lg text-lg transition-all"
            >
              Request Free Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
