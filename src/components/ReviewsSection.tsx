"use client";

import { Star, Quote } from "lucide-react";
import { brand } from "@/config/brand";

export default function ReviewsSection() {

  return (
    <section id="reviews" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what homeowners in your area
            are saying about our services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {brand.reviews.map((review, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-10">
                <Quote className="w-12 h-12 text-primary" />
              </div>

              {/* Star Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Customer Info */}
              <div className="border-t border-gray-200 pt-4">
                <p className="font-bold text-gray-900">{review.name}</p>
                <p className="text-sm text-gray-500">{review.location}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-gray-600 text-lg mb-4">
            Ready to experience top-rated service yourself?
          </p>
          <a
            href="#contact"
            className="inline-block bg-secondary hover:bg-secondary-dark text-white font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105"
          >
            Get Your Free Quote
          </a>
        </div>
      </div>
    </section>
  );
}
