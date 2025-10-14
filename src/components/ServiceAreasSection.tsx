"use client";

import { MapPin, CheckCircle } from "lucide-react";
import { brand } from "@/config/brand";

export default function ServiceAreasSection() {
  return (
    <section id="service-areas" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <MapPin className="w-12 h-12 text-primary mr-3" />
            <h2 className="text-4xl font-bold text-gray-900">
              Proudly Serving {brand.region}
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide professional home services to communities throughout the region.
            If you don&apos;t see your city listed, give us a call - we may still serve your area!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Service Areas List */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Service Areas Include:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {brand.serviceAreas.map((city, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0" />
                  <span className="text-gray-800 font-medium">{city}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-primary/5 rounded-lg border border-primary/20">
              <p className="text-gray-700 font-medium mb-2">
                Don&apos;t see your area?
              </p>
              <p className="text-gray-600">
                Call us at{" "}
                <a
                  href={`tel:${brand.phone.replace(/\D/g, '')}`}
                  className="text-primary hover:text-primary-dark font-semibold"
                >
                  {brand.phone}
                </a>{" "}
                to check if we serve your location.
              </p>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="bg-gray-200 rounded-xl shadow-lg overflow-hidden h-96 lg:h-full min-h-[400px] flex items-center justify-center">
            <div className="text-center p-8">
              <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg font-medium">
                Service Area Map
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Replace this with an embedded map or image
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
