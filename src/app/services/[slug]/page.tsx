import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import * as Icons from "lucide-react";
import { brand } from "@/config/brand";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return brand.services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = brand.services.find((s) => s.slug === slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: `${service.name} - ${brand.companyName}`,
    description: service.detailedDescription,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = brand.services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const IconComponent = Icons[service.icon as keyof typeof Icons] as React.ComponentType<{ size?: number; className?: string }>;
  const otherServices = brand.services.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            {IconComponent && (
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <IconComponent size={32} className="text-white" />
              </div>
            )}
            <h1 className="text-4xl sm:text-5xl font-bold">{service.name}</h1>
          </div>
          <p className="text-xl text-gray-100 max-w-3xl">
            {service.description}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content Column */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                About Our {service.name} Service
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg mb-8">
                {service.detailedDescription}
              </p>

              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                What&apos;s Included
              </h3>
              <ul className="space-y-4 mb-12">
                {service.bulletPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Icons.CheckCircle
                      size={24}
                      className="text-primary flex-shrink-0 mt-0.5"
                    />
                    <span className="text-gray-700 text-lg">{point}</span>
                  </li>
                ))}
              </ul>

              {/* Why Choose Us Section */}
              <div className="bg-gray-50 rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">
                  Why Choose {brand.companyName}?
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {brand.features.map((feature, index) => {
                    const FeatureIcon = Icons[feature.icon as keyof typeof Icons] as React.ComponentType<{ size?: number; className?: string }>;
                    return (
                      <div key={index} className="flex gap-4">
                        {FeatureIcon && (
                          <div className="flex-shrink-0">
                            <FeatureIcon size={24} className="text-primary" />
                          </div>
                        )}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">
                            {feature.title}
                          </h4>
                          <p className="text-gray-600 text-sm">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Contact Card */}
              <div className="bg-primary text-white rounded-lg p-8 mb-8 sticky top-24">
                <h3 className="text-2xl font-bold mb-4">Get Started Today</h3>
                <p className="mb-6 text-gray-100">
                  Contact us for a free consultation and quote
                </p>

                <div className="space-y-4">
                  <a
                    href={`tel:${brand.phone.replace(/\D/g, "")}`}
                    className="block w-full bg-white text-primary hover:bg-gray-100 font-bold py-3 px-6 rounded-lg text-center transition-all"
                  >
                    <Icons.Phone size={20} className="inline mr-2" />
                    {brand.phone}
                  </a>

                  <Link
                    href="/contact"
                    className="block w-full bg-secondary hover:bg-secondary-dark text-white font-bold py-3 px-6 rounded-lg text-center transition-all"
                  >
                    Request Free Quote
                  </Link>
                </div>

                <hr className="my-6 border-white/20" />

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Icons.Clock size={18} />
                    <span>{brand.hours}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icons.Mail size={18} />
                    <span>{brand.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icons.MapPin size={18} />
                    <span>{brand.address}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Services Section */}
      {otherServices.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Other Services You Might Need
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {otherServices.map((otherService) => {
                const OtherIconComponent = Icons[otherService.icon as keyof typeof Icons] as React.ComponentType<{ size?: number; className?: string }>;
                return (
                  <Link
                    key={otherService.slug}
                    href={`/services/${otherService.slug}`}
                    className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      {OtherIconComponent && (
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <OtherIconComponent size={24} className="text-primary" />
                        </div>
                      )}
                      <h3 className="text-xl font-bold text-gray-900">
                        {otherService.name}
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">
                      {otherService.description}
                    </p>
                    <span className="text-primary font-semibold text-sm inline-flex items-center gap-1">
                      Learn More
                      <Icons.ArrowRight size={16} />
                    </span>
                  </Link>
                );
              })}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/services"
                className="text-primary hover:text-primary-dark font-semibold inline-flex items-center gap-2"
              >
                View All Services
                <Icons.ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
