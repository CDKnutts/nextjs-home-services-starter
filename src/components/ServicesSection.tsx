"use client";

import * as LucideIcons from "lucide-react";
import { brand } from "@/config/brand";
import Link from "next/link";

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive home services delivered by experienced professionals.
            We&apos;re committed to quality workmanship and customer satisfaction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {brand.services.map((service) => {
            const IconComponent = LucideIcons[service.icon as keyof typeof LucideIcons] as React.ComponentType<{ className?: string }>;

            return (
              <div
                key={service.slug}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                  {IconComponent && (
                    <IconComponent className="w-8 h-8 text-primary" />
                  )}
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {service.name}
                </h3>

                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>

                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center text-primary hover:text-primary-dark font-semibold transition-colors"
                >
                  Learn More
                  <LucideIcons.ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
