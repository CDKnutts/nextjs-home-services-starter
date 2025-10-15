import type { Metadata } from "next";
import * as Icons from "lucide-react";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: `About Us - ${brand.companyName}`,
  description: `Learn about ${brand.companyName}, our team, and our commitment to providing exceptional home services to ${brand.region}.`,
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id="about-hero" className="bg-gradient-to-br from-primary to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-xl text-gray-100 max-w-2xl mx-auto">
            {brand.pages.about.heroSubtitle.replace('{region}', brand.region)}
          </p>
        </div>
      </section>

      {/* Company Story Section */}
      <section id="about-story" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                {brand.about.story.title}
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                {brand.about.story.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
            <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden">
              {/* Image placeholder - replace with actual image */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <Icons.Building2 size={64} className="mx-auto mb-2" />
                  <p className="text-sm">Company Story Image</p>
                  <p className="text-xs">{brand.about.story.image}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="about-certifications" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            {brand.pages.about.certificationsHeading}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {brand.about.certifications.map((cert, index) => {
              const IconComponent = Icons[cert.icon as keyof typeof Icons] as React.ComponentType<{ size?: number; className?: string }>;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  {IconComponent && (
                    <IconComponent size={48} className="text-primary mb-3" />
                  )}
                  <p className="text-sm font-semibold text-gray-900">{cert.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="about-team" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">
            {brand.pages.about.teamHeading}
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            {brand.pages.about.teamSubtitle}
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {brand.about.team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="relative h-80 bg-gray-200">
                  {/* Team member image placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <Icons.User size={80} className="mx-auto mb-2" />
                      <p className="text-xs">{member.image}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1 text-gray-900">
                    {member.name}
                  </h3>
                  <p className="text-primary font-semibold mb-3">{member.title}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="about-timeline" className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">
            {brand.pages.about.timelineHeading}
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            {brand.pages.about.timelineSubtitle}
          </p>
          <div className="space-y-8">
            {brand.about.timeline.map((milestone, index) => (
              <div
                key={index}
                className="flex gap-8 items-start"
              >
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-2xl font-bold text-primary">
                    {milestone.year}
                  </span>
                </div>
                <div className="relative flex-shrink-0">
                  <div className="w-4 h-4 bg-primary rounded-full border-4 border-white shadow-md" />
                  {index !== brand.about.timeline.length - 1 && (
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-primary/30" />
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <h3 className="text-xl font-bold mb-2 text-gray-900">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
