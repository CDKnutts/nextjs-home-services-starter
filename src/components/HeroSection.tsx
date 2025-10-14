"use client";

import { Phone, Shield, Clock, CheckCircle } from "lucide-react";
import { brand } from "@/config/brand";

export default function HeroSection() {
  const handleGetQuote = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-primary-dark to-blue-900 text-white">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          {brand.companyName} - 24/7 Emergency Services
        </h1>

        <p className="text-xl sm:text-2xl mb-4 text-gray-100">
          Licensed, Insured, and Ready to Help
        </p>

        <p className="text-lg sm:text-xl mb-8 text-gray-200">
          {brand.tagline}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={handleGetQuote}
            className="bg-secondary hover:bg-secondary-dark text-white font-bold py-4 px-8 rounded-lg text-lg transition-all transform hover:scale-105 shadow-lg"
          >
            Get Free Quote
          </button>

          <a
            href={`tel:${brand.phone.replace(/\D/g, '')}`}
            className="bg-white text-primary hover:bg-gray-100 font-bold py-4 px-8 rounded-lg text-lg transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
          >
            <Phone size={24} />
            Call Now: {brand.phone}
          </a>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="flex flex-col items-center gap-2 bg-white/10 backdrop-blur-sm p-4 rounded-lg">
            <Shield className="w-12 h-12" />
            <p className="font-semibold text-lg">Licensed & Insured</p>
          </div>

          <div className="flex flex-col items-center gap-2 bg-white/10 backdrop-blur-sm p-4 rounded-lg">
            <Clock className="w-12 h-12" />
            <p className="font-semibold text-lg">24/7 Emergency</p>
          </div>

          <div className="flex flex-col items-center gap-2 bg-white/10 backdrop-blur-sm p-4 rounded-lg">
            <CheckCircle className="w-12 h-12" />
            <p className="font-semibold text-lg">Same Day Service</p>
          </div>
        </div>
      </div>
    </section>
  );
}
