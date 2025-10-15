"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { brand } from "@/config/brand";

export default function Footer() {
  return (
    <footer id="contact" className="bg-neutral-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Company Info + Logo */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
                {brand.companyName.charAt(0)}
              </div>
              <span className="font-bold text-xl">{brand.companyName}</span>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">{brand.tagline}</p>
            <p className="text-sm text-gray-400 mb-6">
              {brand.sections.footer.taglinePrefix} {brand.region}
            </p>
            <p className="text-xs text-gray-500">
              {brand.sections.footer.servingLabel} {brand.serviceAreas.join(", ")}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">{brand.sections.footer.quickLinksHeading}</h4>
            <ul className="space-y-3">
              {brand.navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: All Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">{brand.sections.footer.servicesHeading}</h4>
            <ul className="space-y-3">
              {brand.services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info + Hours + Social */}
          <div>
            <h4 className="text-lg font-semibold mb-6">{brand.sections.footer.contactHeading}</h4>
            <ul className="space-y-4 mb-6">
              <li>
                <a
                  href={`tel:${brand.phone.replace(/\D/g, "")}`}
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                >
                  <Phone size={18} />
                  {brand.phone}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${brand.emergencyPhone.replace(/\D/g, "")}`}
                  className="flex items-center gap-2 text-secondary hover:text-white transition-colors"
                >
                  <Phone size={18} className="animate-pulse" />
                  <span className="text-sm">
                    Emergency: {brand.emergencyPhone}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${brand.email}`}
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                >
                  <Mail size={18} />
                  {brand.email}
                </a>
              </li>
              <li className="flex items-start gap-2 text-gray-300">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>{brand.address}</span>
              </li>
              <li className="flex items-start gap-2 text-gray-300">
                <Clock size={18} className="mt-1 flex-shrink-0" />
                <span>{brand.hours}</span>
              </li>
            </ul>

            {/* Social Icons */}
            <div>
              <h5 className="text-sm font-semibold mb-3 text-gray-400">{brand.sections.footer.socialHeading}</h5>
              <div className="flex gap-3">
                <a
                  href={brand.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-primary rounded-full flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href={brand.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-primary rounded-full flex items-center justify-center transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter size={18} />
                </a>
                <a
                  href={brand.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-primary rounded-full flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href={brand.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-primary rounded-full flex items-center justify-center transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} {brand.companyName}. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href={brand.legal.privacyPolicyUrl} className="text-gray-400 hover:text-white transition-colors">
              {brand.legal.privacyPolicyLabel}
            </Link>
            <Link href={brand.legal.termsOfServiceUrl} className="text-gray-400 hover:text-white transition-colors">
              {brand.legal.termsOfServiceLabel}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
