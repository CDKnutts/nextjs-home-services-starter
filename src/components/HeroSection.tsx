"use client";

import { Phone } from "lucide-react";
import * as Icons from "lucide-react";
import Link from "next/link";
import { brand } from "@/config/brand";

export default function HeroSection() {
  // Replace template variables in hero text
  const heading = brand.hero.heading
    .replace('{companyName}', brand.companyName)
    .replace('{tagline}', brand.tagline);

  const heroTagline = brand.hero.tagline
    .replace('{companyName}', brand.companyName)
    .replace('{tagline}', brand.tagline);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-primary-dark to-blue-900 text-white">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          {heading}
        </h1>

        <p className="text-xl sm:text-2xl mb-4 text-gray-100">
          {brand.hero.subheading}
        </p>

        <p className="text-lg sm:text-xl mb-8 text-gray-200">
          {heroTagline}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/contact"
            className="bg-secondary hover:bg-secondary-dark text-white font-bold py-4 px-8 rounded-lg text-lg transition-all transform hover:scale-105 shadow-lg text-center"
          >
            {brand.ui.buttons.getFreeQuote}
          </Link>

          <a
            href={`tel:${brand.phone.replace(/\D/g, '')}`}
            className="bg-white text-primary hover:bg-gray-100 font-bold py-4 px-8 rounded-lg text-lg transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
          >
            <Phone size={24} />
            {brand.ui.buttons.callNow}: {brand.phone}
          </a>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {brand.hero.badges.map((badge, index) => {
            const IconComponent = Icons[badge.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;

            return (
              <div key={index} className="flex flex-col items-center gap-2 bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                {IconComponent && <IconComponent className="w-12 h-12" />}
                <p className="font-semibold text-lg">{badge.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
