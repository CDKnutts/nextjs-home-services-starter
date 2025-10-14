"use client";

import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { brand } from "@/config/brand";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">{brand.companyName}</h3>
            <p className="text-gray-300 mb-4">{brand.tagline}</p>
            <p className="text-sm text-gray-400">
              Licensed, Insured, and Ready to Serve
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${brand.phone.replace(/\D/g, '')}`}
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                >
                  <Phone size={18} />
                  {brand.phone}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${brand.emergencyPhone.replace(/\D/g, '')}`}
                  className="flex items-center gap-2 text-secondary hover:text-white transition-colors"
                >
                  <Phone size={18} className="animate-pulse" />
                  <span>
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
            </ul>
          </div>

          {/* Location & Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Location & Hours</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-gray-300">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>{brand.address}</span>
              </li>
              <li className="flex items-start gap-2 text-gray-300">
                <Clock size={18} className="mt-1 flex-shrink-0" />
                <span>{brand.hours}</span>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Service Areas</h4>
            <ul className="space-y-2">
              {brand.serviceAreas.slice(0, 4).map((area, index) => (
                <li key={index} className="text-gray-300">
                  {area}
                </li>
              ))}
              {brand.serviceAreas.length > 4 && (
                <li className="text-gray-400 text-sm italic">
                  + {brand.serviceAreas.length - 4} more areas
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>
            &copy; {new Date().getFullYear()} {brand.companyName}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
