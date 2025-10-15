import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { brand } from "@/config/brand";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id="contact-hero" className="bg-gradient-to-br from-primary to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{brand.pages.contact.heroTitle}</h1>
          <p className="text-xl text-gray-100 max-w-2xl mx-auto">
            {brand.pages.contact.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section id="contact-form" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form - 2 columns */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>

            {/* Info Sidebar - 1 column */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-8 sticky top-24">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">
                  {brand.pages.contact.infoHeading}
                </h3>

                <div className="space-y-6">
                  {/* Phone */}
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <Phone size={20} className="text-primary" />
                      <h4 className="font-semibold text-gray-900">{brand.pages.contact.labels.phone}</h4>
                    </div>
                    <a
                      href={`tel:${brand.phone.replace(/\D/g, "")}`}
                      className="text-gray-700 hover:text-primary transition-colors pl-8"
                    >
                      {brand.phone}
                    </a>
                    <br />
                    <a
                      href={`tel:${brand.emergencyPhone.replace(/\D/g, "")}`}
                      className="text-secondary hover:text-secondary-dark transition-colors pl-8 text-sm"
                    >
                      {brand.pages.contact.labels.emergency} {brand.emergencyPhone}
                    </a>
                  </div>

                  {/* Email */}
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <Mail size={20} className="text-primary" />
                      <h4 className="font-semibold text-gray-900">{brand.pages.contact.labels.email}</h4>
                    </div>
                    <a
                      href={`mailto:${brand.email}`}
                      className="text-gray-700 hover:text-primary transition-colors pl-8"
                    >
                      {brand.email}
                    </a>
                  </div>

                  {/* Address */}
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <MapPin size={20} className="text-primary" />
                      <h4 className="font-semibold text-gray-900">{brand.pages.contact.labels.address}</h4>
                    </div>
                    <p className="text-gray-700 pl-8">{brand.address}</p>
                  </div>

                  {/* Hours */}
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <Clock size={20} className="text-primary" />
                      <h4 className="font-semibold text-gray-900">{brand.pages.contact.labels.hours}</h4>
                    </div>
                    <p className="text-gray-700 pl-8">{brand.hours}</p>
                    <p className="text-sm text-secondary font-semibold pl-8 mt-1">
                      {brand.pages.contact.emergencyNote}
                    </p>
                  </div>
                </div>

                <hr className="my-6 border-gray-200" />

                {/* Service Areas */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    {brand.pages.contact.serviceAreasHeading}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {brand.serviceAreas.map((area, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                <hr className="my-6 border-gray-200" />

                {/* Map Placeholder */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">{brand.pages.contact.locationHeading}</h4>
                  <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <MapPin size={48} className="mx-auto mb-2" />
                      <p className="text-sm">Map embed placeholder</p>
                      <p className="text-xs">
                        Add Google Maps iframe or map component
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
