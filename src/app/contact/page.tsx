"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Phone, Mail, MapPin, Clock, CheckCircle } from "lucide-react";
import { brand } from "@/config/brand";

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  zipCode: string;
  message: string;
};

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Form data:", data);
    setIsSubmitted(true);
    setIsSubmitting(false);
    reset();

    // Reset success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-gray-100 max-w-2xl mx-auto">
            Get a free quote or schedule a service appointment
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form - 2 columns */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-900">
                  Request a Free Quote
                </h2>

                {/* Success Message */}
                {isSubmitted && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 text-green-800">
                    <CheckCircle size={24} className="flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Thank you for contacting us!</p>
                      <p className="text-sm">
                        We&apos;ll get back to you within 24 hours.
                      </p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      {...register("name", { required: true })}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="John Smith"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email & Phone */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        {...register("email", { required: true })}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="john@example.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        {...register("phone", { required: true })}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                          errors.phone ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="(555) 123-4567"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Service Type & Zip Code */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="serviceType"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Service Type *
                      </label>
                      <select
                        id="serviceType"
                        {...register("serviceType", { required: true })}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                          errors.serviceType ? "border-red-500" : "border-gray-300"
                        }`}
                      >
                        <option value="">Select a service...</option>
                        {brand.services.map((service) => (
                          <option key={service.slug} value={service.slug}>
                            {service.name}
                          </option>
                        ))}
                      </select>
                      {errors.serviceType && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.serviceType.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="zipCode"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Zip Code *
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        {...register("zipCode", { required: true })}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                          errors.zipCode ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="12345"
                        maxLength={5}
                      />
                      {errors.zipCode && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.zipCode.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      {...register("message", { required: true })}
                      rows={6}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none ${
                        errors.message ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Tell us about your project or what service you need..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-secondary hover:bg-secondary-dark disabled:bg-gray-400 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>

                  <p className="text-sm text-gray-500 text-center">
                    * Required fields
                  </p>
                </form>
              </div>
            </div>

            {/* Info Sidebar - 1 column */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-8 sticky top-24">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">
                  Contact Information
                </h3>

                <div className="space-y-6">
                  {/* Phone */}
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <Phone size={20} className="text-primary" />
                      <h4 className="font-semibold text-gray-900">Phone</h4>
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
                      Emergency: {brand.emergencyPhone}
                    </a>
                  </div>

                  {/* Email */}
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <Mail size={20} className="text-primary" />
                      <h4 className="font-semibold text-gray-900">Email</h4>
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
                      <h4 className="font-semibold text-gray-900">Address</h4>
                    </div>
                    <p className="text-gray-700 pl-8">{brand.address}</p>
                  </div>

                  {/* Hours */}
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <Clock size={20} className="text-primary" />
                      <h4 className="font-semibold text-gray-900">Hours</h4>
                    </div>
                    <p className="text-gray-700 pl-8">{brand.hours}</p>
                    <p className="text-sm text-secondary font-semibold pl-8 mt-1">
                      24/7 Emergency Service Available
                    </p>
                  </div>
                </div>

                <hr className="my-6 border-gray-200" />

                {/* Service Areas */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Service Areas
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
                  <h4 className="font-semibold text-gray-900 mb-3">Location</h4>
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
