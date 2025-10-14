"use client";

import * as LucideIcons from "lucide-react";
import { brand } from "@/config/brand";

export default function WhyChooseUsSection() {

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose Us
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We&apos;re not just another home services company. Here&apos;s what sets us apart
            from the competition and makes us the trusted choice for homeowners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {brand.features.map((feature, index) => {
            const IconComponent = LucideIcons[feature.icon as keyof typeof LucideIcons] as React.ComponentType<{ className?: string }>;

            return (
              <div
                key={index}
                className="text-center p-8 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center justify-center w-20 h-20 bg-secondary/10 rounded-full mx-auto mb-6">
                  {IconComponent && (
                    <IconComponent className="w-10 h-10 text-secondary" />
                  )}
                </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
