"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { brand } from "@/config/brand";

// Zod validation schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  service_type: z.string().optional(),
  zipCode: z.string().regex(/^\d{5}$/, "Please enter a valid 5-digit zip code"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormProps {
  defaultServiceType?: string;
  showServiceSelect?: boolean;
}

export default function ContactForm({
  defaultServiceType,
  showServiceSelect = true
}: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      service_type: defaultServiceType || '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    const requestPayload = {
      business_name: brand.companyName,
      name: data.name,
      email: data.email,
      phone: data.phone,
      service_type: data.service_type || null,
      message: data.message,
      zip_code: data.zipCode,
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestPayload),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setSubmitStatus('success');
      reset();

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('[FORM] Form submission error:', error);
      setSubmitStatus('error');
      setErrorMessage(brand.forms.contact.errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">
        {brand.forms.contact.heading}
      </h2>

      {/* Success Message */}
      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 text-green-800">
          <CheckCircle size={24} className="flex-shrink-0" />
          <div>
            <p className="font-semibold">{brand.forms.contact.successTitle}</p>
            <p className="text-sm">
              {brand.forms.contact.successMessage}
            </p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-800">
          <AlertCircle size={24} className="flex-shrink-0" />
          <div>
            <p className="font-semibold">{brand.forms.contact.errorTitle}</p>
            <p className="text-sm">{errorMessage}</p>
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
            {brand.forms.contact.labels.name} *
          </label>
          <input
            type="text"
            id="name"
            {...register("name")}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 placeholder:text-gray-500 ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder={brand.forms.contact.placeholders.name}
            disabled={isSubmitting}
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
              {brand.forms.contact.labels.email} *
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 placeholder:text-gray-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder={brand.forms.contact.placeholders.email}
              disabled={isSubmitting}
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
              {brand.forms.contact.labels.phone} *
            </label>
            <input
              type="tel"
              id="phone"
              {...register("phone")}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 placeholder:text-gray-500 ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
              placeholder={brand.forms.contact.placeholders.phone}
              disabled={isSubmitting}
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
          {showServiceSelect && (
            <div>
              <label
                htmlFor="service_type"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                {brand.forms.contact.labels.serviceType}
              </label>
              <select
                id="service_type"
                {...register("service_type")}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 ${
                  errors.service_type ? "border-red-500" : "border-gray-300"
                }`}
                disabled={isSubmitting}
              >
                <option value="">{brand.forms.contact.labels.serviceTypePlaceholder}</option>
                {brand.services.map((service) => (
                  <option key={service.slug} value={service.slug}>
                    {service.name}
                  </option>
                ))}
              </select>
              {errors.service_type && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.service_type.message}
                </p>
              )}
            </div>
          )}

          <div>
            <label
              htmlFor="zipCode"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              {brand.forms.contact.labels.zipCode} *
            </label>
            <input
              type="text"
              id="zipCode"
              {...register("zipCode")}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 placeholder:text-gray-500 ${
                errors.zipCode ? "border-red-500" : "border-gray-300"
              }`}
              placeholder={brand.forms.contact.placeholders.zipCode}
              maxLength={5}
              disabled={isSubmitting}
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
            {brand.forms.contact.labels.message} *
          </label>
          <textarea
            id="message"
            {...register("message")}
            rows={6}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none text-gray-900 placeholder:text-gray-500 ${
              errors.message ? "border-red-500" : "border-gray-300"
            }`}
            placeholder={brand.forms.contact.placeholders.message}
            disabled={isSubmitting}
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
          className="w-full bg-secondary hover:bg-secondary-dark disabled:bg-gray-400 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              {brand.forms.contact.submittingButton}
            </>
          ) : (
            brand.forms.contact.submitButton
          )}
        </button>

        <p className="text-sm text-gray-500 text-center">
          {brand.forms.contact.requiredNote}
        </p>
      </form>
    </div>
  );
}
