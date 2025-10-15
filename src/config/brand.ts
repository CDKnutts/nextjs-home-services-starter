export const brand = {
  // Basic Company Info
  companyName: "ABC Plumbing",
  tagline: "Professional Home Services",
  logo: "/logo.png", // Path to logo image in /public folder

  // Contact Information
  phone: "(555) 123-4567",
  emergencyPhone: "(555) 911-HELP",
  email: "info@company.com",
  address: "123 Main St, City, ST 12345",
  hours: "Mon-Fri: 8AM-6PM, Sat: 9AM-4PM",

  // SEO & Metadata
  seo: {
    title: "Your Company Name - Professional Home Services | 24/7 Emergency",
    description: "Licensed and insured home services company offering installation, repair, maintenance, and emergency services. Available 24/7 with same-day service. 100% satisfaction guaranteed.",
  },

  // Brand Colors (auto-generated in layout.tsx)
  colors: {
    primary: "#0066CC",
    secondary: "#FF6B35"
  },

  // Geographic Info
  region: "Your Region",
  serviceAreas: ["City1", "City2", "City3", "City4"],

  // Social Media Links
  social: {
    facebook: "https://facebook.com/yourcompany",
    twitter: "https://twitter.com/yourcompany",
    instagram: "https://instagram.com/yourcompany",
    linkedin: "https://linkedin.com/company/yourcompany",
  },

  // Navigation Links
  navigation: [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],

  // Hero Section
  hero: {
    heading: "{companyName} - 24/7 Emergency Services",
    subheading: "Licensed, Insured, and Ready to Help",
    tagline: "{tagline}",
    badges: [
      { icon: "Shield", text: "Licensed & Insured" },
      { icon: "Clock", text: "24/7 Emergency" },
      { icon: "CheckCircle", text: "Same Day Service" }
    ]
  },

  // UI Text & Labels
  ui: {
    buttons: {
      getFreeQuote: "Get Free Quote",
      learnMore: "Learn More",
      requestQuote: "Request Free Quote",
      sendMessage: "Send Message",
      callNow: "Call Now",
      callPhone: "Call {phone}",
    },
    mapPlaceholder: {
      title: "Service Area Map",
      subtitle: "Replace this with an embedded map or image"
    }
  },

  // Legal & Footer Links
  legal: {
    privacyPolicyUrl: "/privacy",
    privacyPolicyLabel: "Privacy Policy",
    termsOfServiceUrl: "/terms",
    termsOfServiceLabel: "Terms of Service"
  },

  // Page-specific Content
  pages: {
    about: {
      heroSubtitle: "Over 20 years of trusted service in {region}",
      teamHeading: "Meet Our Team",
      teamSubtitle: "Our experienced professionals are dedicated to providing exceptional service and expertise",
      certificationsHeading: "Our Certifications & Commitments",
      timelineHeading: "Our Journey",
      timelineSubtitle: "Two decades of growth, innovation, and commitment to excellence"
    },
    contact: {
      heroTitle: "Contact Us",
      heroSubtitle: "Get a free quote or schedule a service appointment",
      infoHeading: "Contact Information",
      emergencyNote: "24/7 Emergency Service Available",
      serviceAreasHeading: "Service Areas",
      locationHeading: "Location",
      mapPlaceholder: "Add Google Maps iframe or map component",
      labels: {
        phone: "Phone",
        email: "Email",
        address: "Address",
        hours: "Hours",
        emergency: "Emergency:"
      }
    },
    services: {
      heroTitle: "Our Services",
      heroSubtitle: "Comprehensive home services solutions tailored to your needs",
      ctaHeading: "Ready to Get Started?",
      ctaSubheading: "Contact us today for a free consultation and quote"
    },
    serviceDetail: {
      aboutHeading: "About Our {serviceName} Service",
      whatsIncludedHeading: "What's Included",
      processHeading: "Our Process",
      faqHeading: "Frequently Asked Questions",
      whyChooseHeading: "Why Choose {companyName}?",
      getStartedHeading: "Get Started Today",
      getStartedSubheading: "Contact us for a free consultation and quote",
      otherServicesHeading: "Other Services You Might Need",
      viewAllServices: "View All Services"
    }
  },

  // Form Configuration
  forms: {
    contact: {
      heading: "Request a Free Quote",
      successTitle: "Thank you for contacting us!",
      successMessage: "We'll get back to you within 24 hours.",
      errorTitle: "Submission Failed",
      errorMessage: "Failed to submit form. Please try again or call us directly.",
      requiredNote: "* Required fields",
      submitButton: "Send Message",
      submittingButton: "Sending...",
      labels: {
        name: "Full Name",
        email: "Email Address",
        phone: "Phone Number",
        serviceType: "Service Type",
        serviceTypePlaceholder: "Select a service...",
        zipCode: "Zip Code",
        message: "Message"
      },
      placeholders: {
        name: "John Smith",
        email: "john@example.com",
        phone: "(555) 123-4567",
        zipCode: "12345",
        message: "Tell us about your project or what service you need..."
      }
    }
  },

  // Section Content
  sections: {
    services: {
      heading: "Our Services",
      subheading: "Comprehensive home services delivered by experienced professionals. We're committed to quality workmanship and customer satisfaction."
    },
    whyChooseUs: {
      heading: "Why Choose Us",
      subheading: "We're not just another home services company. Here's what sets us apart from the competition and makes us the trusted choice for homeowners."
    },
    reviews: {
      heading: "What Our Customers Say",
      subheading: "Don't just take our word for it. Here's what homeowners in your area are saying about our services.",
      cta: "Get Your Free Quote",
      ctaSubheading: "Ready to experience top-rated service yourself?"
    },
    serviceAreas: {
      heading: "Proudly Serving {region}",
      subheading: "We provide professional home services to communities throughout the region. If you don't see your city listed, give us a call - we may still serve your area!",
      listHeading: "Service Areas Include:",
      notListed: "Don't see your area?",
      notListedText: "Call us at {phone} to check if we serve your location."
    },
    footer: {
      taglinePrefix: "Licensed, Insured, and Ready to Serve",
      servingLabel: "Serving:",
      quickLinksHeading: "Quick Links",
      servicesHeading: "Our Services",
      contactHeading: "Contact Us",
      socialHeading: "Follow Us"
    }
  },

  // About Page - Company Story
  about: {
    story: {
      title: "Our Story",
      paragraphs: [
        "Founded in 2003, Your Company Name started with a simple mission: to provide honest, reliable home services that customers can trust. What began as a small family-owned business has grown into the region's most trusted home services company.",
        "Over the past two decades, we've built our reputation on quality workmanship, fair pricing, and exceptional customer service. Our team of licensed professionals brings decades of combined experience to every job, no matter how big or small.",
        "Today, we're proud to serve thousands of satisfied customers throughout the region, maintaining the same commitment to excellence that our founders established over 20 years ago."
      ],
      image: "/about-story.jpg"
    },

    // Team Members
    team: [
      {
        name: "John Smith",
        title: "Owner & Lead Technician",
        bio: "With over 25 years of experience, John founded the company with a vision of providing honest, reliable service. He's a licensed master technician and personally oversees every major project.",
        image: "/team/john.jpg"
      },
      {
        name: "Sarah Johnson",
        title: "Operations Manager",
        bio: "Sarah ensures every customer receives exceptional service from first contact to project completion. She brings 15 years of customer service excellence to our team.",
        image: "/team/sarah.jpg"
      },
      {
        name: "Mike Rodriguez",
        title: "Senior Technician",
        bio: "Mike has been with us for 12 years and is one of our most experienced technicians. He specializes in complex installations and emergency repairs.",
        image: "/team/mike.jpg"
      }
    ],

    // Certifications & Badges
    certifications: [
      { name: "Licensed & Insured", icon: "Shield" },
      { name: "BBB A+ Rating", icon: "Award" },
      { name: "24/7 Emergency Service", icon: "Clock" },
      { name: "Satisfaction Guaranteed", icon: "ThumbsUp" },
      { name: "Certified Technicians", icon: "CheckCircle" },
      { name: "20+ Years Experience", icon: "Star" }
    ],

    // Company Timeline
    timeline: [
      { year: "2003", title: "Company Founded", description: "Started as a small family business with 2 technicians" },
      { year: "2008", title: "Expanded Service Area", description: "Grew to serve 10 cities across the region" },
      { year: "2012", title: "1000th Customer", description: "Celebrated serving our 1000th satisfied customer" },
      { year: "2018", title: "Award Winning", description: "Received Best Home Services Company award" },
      { year: "2023", title: "20 Year Anniversary", description: "Two decades of trusted service to our community" }
    ]
  },

  // Services Offered
  services: [
    {
      name: "Installation & Replacement",
      icon: "Wrench",
      slug: "installation",
      description: "Professional installation and replacement services tailored to your needs. Our experienced technicians ensure high-quality results every time.",
      detailedDescription: "When it's time for a new system installation or replacement, trust our expert team to get the job done right. We work with the industry's leading brands and products, ensuring you receive top-quality equipment that's properly installed to manufacturer specifications. Our technicians are highly trained and certified, with years of experience handling installations of all sizes and complexities. We provide detailed consultations to help you choose the right system for your home and budget, and we stand behind our work with comprehensive warranties.",
      bulletPoints: [
        "Free in-home consultation and detailed estimates",
        "Expert installation by certified technicians",
        "Top-quality equipment from leading manufacturers",
        "Comprehensive warranty coverage on parts and labor"
      ],
      processSteps: [
        {
          title: "Free Consultation",
          description: "We start with a thorough assessment of your needs and space to recommend the best solution for your home and budget."
        },
        {
          title: "Custom Quote",
          description: "Receive a detailed, transparent quote with no hidden fees. We explain all options and help you make an informed decision."
        },
        {
          title: "Professional Installation",
          description: "Our certified technicians complete the installation with precision, following all manufacturer specifications and local codes."
        },
        {
          title: "Testing & Walkthrough",
          description: "We thoroughly test the new system and walk you through its operation, answering any questions you may have."
        }
      ],
      faqs: [
        {
          question: "How long does a typical installation take?",
          answer: "Most installations are completed in one day, typically 4-8 hours depending on the complexity of the project. We'll provide a specific timeline during your consultation."
        },
        {
          question: "Do you offer financing options?",
          answer: "Yes, we offer flexible financing options to make your installation affordable. Ask us about current promotions and payment plans."
        },
        {
          question: "What brands do you install?",
          answer: "We work with all major industry-leading brands and can help you select the best option for your needs and budget."
        },
        {
          question: "Is there a warranty on the installation?",
          answer: "Absolutely. All our installations come with a comprehensive warranty covering both parts and labor. Manufacturer warranties also apply to equipment."
        }
      ]
    },
    {
      name: "Repair & Maintenance",
      icon: "Settings",
      slug: "repair",
      description: "Expert repair and maintenance services to keep your systems running smoothly. We diagnose problems quickly and fix them right the first time.",
      detailedDescription: "Keep your systems running at peak performance with our professional repair and maintenance services. Our skilled technicians can quickly diagnose any issue and provide efficient, cost-effective solutions. We use state-of-the-art diagnostic equipment to identify problems accurately, and we stock our trucks with a wide range of quality parts to complete most repairs on the first visit. Regular maintenance is key to preventing costly breakdowns and extending the life of your equipment—our maintenance services include thorough inspections, cleaning, and tune-ups to keep everything running smoothly.",
      bulletPoints: [
        "Fast, accurate diagnosis of all issues",
        "Same-day repair service available",
        "Stocked trucks for immediate repairs",
        "Preventive maintenance to avoid future problems"
      ],
      processSteps: [
        {
          title: "Emergency Response",
          description: "Contact us anytime, day or night. We prioritize urgent repairs and can often arrive within an hour for emergencies."
        },
        {
          title: "Accurate Diagnosis",
          description: "Using advanced diagnostic equipment, we quickly identify the root cause of the problem, not just the symptoms."
        },
        {
          title: "Transparent Pricing",
          description: "Before any work begins, we provide a clear explanation of the issue and a firm price quote for the repair."
        },
        {
          title: "Expert Repair",
          description: "We complete the repair using quality parts and back our work with a satisfaction guarantee."
        }
      ],
      faqs: [
        {
          question: "How quickly can you respond to a repair call?",
          answer: "For emergencies, we typically arrive within 1-2 hours. For non-emergency repairs, we usually schedule same-day or next-day appointments."
        },
        {
          question: "Do you charge for diagnostics?",
          answer: "We charge a standard diagnostic fee, which is waived if you proceed with the recommended repair."
        },
        {
          question: "What if the repair doesn't fix the problem?",
          answer: "We stand behind our work with a 100% satisfaction guarantee. If the issue persists, we'll return at no additional charge to make it right."
        },
        {
          question: "Should I repair or replace my system?",
          answer: "We'll provide honest recommendations based on the age of your system, repair costs, and potential energy savings of a new unit. We never push unnecessary replacements."
        }
      ]
    },
    {
      name: "Emergency Services",
      icon: "AlertCircle",
      slug: "emergency",
      description: "24/7 emergency services when you need us most. Fast response times and professional service you can count on, day or night.",
      detailedDescription: "When disaster strikes at 2 AM, you need a team you can count on. Our 24/7 emergency service means we're always just a phone call away, ready to respond to your urgent needs. We understand that home emergencies can't wait, which is why we prioritize emergency calls and strive to arrive quickly—often within an hour. Our emergency technicians are fully equipped to handle any crisis, from complete system failures to dangerous situations that require immediate attention. We work efficiently to restore comfort and safety to your home as quickly as possible.",
      bulletPoints: [
        "Available 24 hours a day, 7 days a week",
        "Fast response times, often within an hour",
        "Fully equipped emergency service vehicles",
        "Priority scheduling for urgent situations"
      ],
      processSteps: [
        {
          title: "24/7 Availability",
          description: "Call us anytime—our emergency hotline is staffed around the clock, every day of the year."
        },
        {
          title: "Rapid Dispatch",
          description: "We immediately dispatch the nearest available technician to your location, typically arriving within an hour."
        },
        {
          title: "Quick Assessment",
          description: "Our technician quickly assesses the situation, prioritizing safety and preventing further damage."
        },
        {
          title: "Immediate Resolution",
          description: "We carry a full inventory of common parts to complete most emergency repairs on the spot."
        }
      ],
      faqs: [
        {
          question: "What qualifies as an emergency?",
          answer: "Emergencies include complete system failures, safety hazards, water damage, no heat in winter, no cooling in extreme heat, or any situation that threatens your property or comfort."
        },
        {
          question: "Is emergency service more expensive?",
          answer: "Emergency calls have an after-hours service fee, but repair costs remain the same. We believe in fair, transparent pricing even in emergencies."
        },
        {
          question: "How fast can you get to my location?",
          answer: "Most emergency calls receive service within 60 minutes. Response times may vary during extreme weather events when call volumes are high."
        },
        {
          question: "Do you service all brands in emergencies?",
          answer: "Yes, our technicians are trained on all major brands and carry parts for the most common systems."
        }
      ]
    },
    {
      name: "Inspections",
      icon: "Search",
      slug: "inspections",
      description: "Thorough inspections to identify potential issues before they become major problems. Get peace of mind with our detailed reports.",
      detailedDescription: "Don't wait for a breakdown to discover problems with your home systems. Our comprehensive inspection services provide a detailed assessment of your equipment's condition, identifying potential issues before they become expensive repairs. Using advanced diagnostic tools and our technicians' expert knowledge, we examine every component of your systems, checking for wear, damage, inefficiency, and safety concerns. You'll receive a detailed written report with photos, explaining our findings and recommendations in clear, easy-to-understand language. Whether you're buying a new home, selling your current one, or simply want peace of mind, our inspection services deliver the answers you need.",
      bulletPoints: [
        "Comprehensive system evaluation by certified professionals",
        "Detailed written reports with photos and findings",
        "Identification of safety concerns and efficiency issues",
        "Clear recommendations prioritized by importance"
      ],
      processSteps: [
        {
          title: "Schedule Inspection",
          description: "Book a convenient time for our certified inspector to visit your property. Most inspections take 1-2 hours."
        },
        {
          title: "Comprehensive Evaluation",
          description: "We examine all components, test system performance, check for safety issues, and assess efficiency."
        },
        {
          title: "Detailed Report",
          description: "Receive a comprehensive written report with photos, findings, and prioritized recommendations."
        },
        {
          title: "Expert Guidance",
          description: "We review the report with you, answer questions, and provide cost estimates for any recommended work."
        }
      ],
      faqs: [
        {
          question: "How often should I have an inspection?",
          answer: "We recommend annual inspections for most systems. Older systems or those under heavy use may benefit from more frequent inspections."
        },
        {
          question: "What's included in the inspection?",
          answer: "Our comprehensive inspection covers all major components, safety checks, efficiency testing, and identification of potential issues. You'll receive a detailed written report."
        },
        {
          question: "Can you inspect before I buy a home?",
          answer: "Absolutely. Pre-purchase inspections are one of our most common services. We'll provide a thorough assessment to help inform your buying decision."
        },
        {
          question: "Will you try to sell me services I don't need?",
          answer: "Never. Our inspectors provide honest assessments and clearly distinguish between critical issues, recommended maintenance, and optional upgrades."
        }
      ]
    },
    {
      name: "System Upgrades",
      icon: "TrendingUp",
      slug: "upgrades",
      description: "Upgrade your systems for better efficiency and performance. We help you choose the right solutions for your budget and needs.",
      detailedDescription: "Technology advances quickly, and newer systems offer significant improvements in efficiency, performance, and features. Our system upgrade services help you take advantage of these advancements, reducing your energy costs while improving comfort and reliability. We'll evaluate your current systems and recommend upgrades that make sense for your specific situation and budget. From smart thermostats and energy-efficient equipment to whole-system replacements, we guide you through every option. Many upgrades qualify for rebates and tax credits, and we'll help you take advantage of every available savings opportunity.",
      bulletPoints: [
        "Energy-efficient upgrades that lower utility bills",
        "Smart home integration for enhanced control",
        "Rebate and tax credit assistance",
        "Detailed cost-benefit analysis for all options"
      ],
      processSteps: [
        {
          title: "Energy Audit",
          description: "We evaluate your current system's efficiency and identify opportunities for improvement and savings."
        },
        {
          title: "Customized Recommendations",
          description: "Based on your goals and budget, we present upgrade options with projected ROI and energy savings."
        },
        {
          title: "Rebate Assistance",
          description: "We help you navigate available rebates, tax credits, and financing options to maximize your savings."
        },
        {
          title: "Professional Installation",
          description: "Our certified team installs your upgrades with minimal disruption and ensures optimal performance."
        }
      ],
      faqs: [
        {
          question: "What are the most cost-effective upgrades?",
          answer: "Programmable thermostats, improved insulation, and high-efficiency equipment typically offer the best return on investment through reduced energy costs."
        },
        {
          question: "Are there tax credits or rebates available?",
          answer: "Many energy-efficient upgrades qualify for federal tax credits, state rebates, and utility incentives. We stay current on all programs and help you maximize available benefits."
        },
        {
          question: "How much can I save with an upgrade?",
          answer: "Savings vary based on your current system and chosen upgrades, but many customers see 20-40% reductions in energy costs. We provide specific estimates during consultation."
        },
        {
          question: "Can I upgrade in phases?",
          answer: "Absolutely. We can create a phased upgrade plan that fits your budget while still delivering meaningful improvements over time."
        }
      ]
    },
    {
      name: "Maintenance Plans",
      icon: "Calendar",
      slug: "maintenance-plans",
      description: "Regular maintenance plans to extend the life of your systems and prevent costly repairs. Stay protected year-round.",
      detailedDescription: "The best defense against expensive repairs is regular preventive maintenance. Our comprehensive maintenance plans provide scheduled service visits throughout the year, ensuring your systems receive the care they need to perform reliably and efficiently. During each maintenance visit, our technicians perform a detailed inspection, thorough cleaning, precision adjustments, and any necessary minor repairs. Plan members receive priority scheduling, discounted service rates, and extended warranty coverage. With our maintenance plans, you'll enjoy lower energy bills, fewer breakdowns, longer equipment life, and the peace of mind that comes from knowing your systems are in expert hands.",
      bulletPoints: [
        "Scheduled maintenance visits throughout the year",
        "Priority scheduling and discounted service rates",
        "Extended warranty coverage on equipment",
        "Detailed maintenance records for your home"
      ],
      processSteps: [
        {
          title: "Choose Your Plan",
          description: "Select from our flexible maintenance plans designed to fit your needs and budget."
        },
        {
          title: "Scheduled Service",
          description: "We automatically schedule your maintenance visits at optimal times throughout the year."
        },
        {
          title: "Thorough Maintenance",
          description: "Each visit includes cleaning, inspection, adjustments, and minor repairs as needed."
        },
        {
          title: "Priority Service",
          description: "Enjoy priority scheduling, extended warranties, and discounted rates on any needed repairs."
        }
      ],
      faqs: [
        {
          question: "What's included in a maintenance plan?",
          answer: "Plans include scheduled tune-ups, priority scheduling, discounted repair rates, extended warranties, and detailed maintenance records. Specific benefits vary by plan level."
        },
        {
          question: "Can I cancel my plan?",
          answer: "Yes, our plans are flexible. You can cancel at any time, though we're confident you'll see the value in continued membership."
        },
        {
          question: "Do maintenance plans really save money?",
          answer: "Absolutely. Regular maintenance reduces energy costs, prevents expensive breakdowns, and extends equipment life. Most members save more than the plan costs."
        },
        {
          question: "What if I need repairs between visits?",
          answer: "Plan members receive priority scheduling and discounted rates on all repairs. Many plans also include coverage for certain repairs."
        }
      ]
    }
  ],

  // Why Choose Us Features
  features: [
    {
      icon: "Award",
      title: "20+ Years Experience",
      description: "With over two decades of industry experience, our team brings unmatched expertise and knowledge to every project. We've seen it all and solved it all.",
    },
    {
      icon: "Clock",
      title: "24/7 Availability",
      description: "Emergencies don't wait for business hours, and neither do we. Our team is available around the clock to handle your urgent home service needs.",
    },
    {
      icon: "ThumbsUp",
      title: "100% Satisfaction Guarantee",
      description: "We stand behind our work with a complete satisfaction guarantee. If you're not happy with our service, we'll make it right or your money back.",
    },
  ],

  // Customer Reviews / Testimonials
  reviews: [
    {
      name: "Sarah Johnson",
      location: "City1",
      rating: 5,
      text: "Outstanding service! They arrived promptly, diagnosed the problem quickly, and had everything fixed within an hour. The technician was professional, knowledgeable, and took the time to explain everything. Highly recommend!",
    },
    {
      name: "Michael Chen",
      location: "City2",
      rating: 5,
      text: "Called them for an emergency repair late on a Saturday night. They answered immediately and had someone at my house within 30 minutes. Fast, efficient, and reasonably priced. These folks are the real deal!",
    },
    {
      name: "Jennifer Martinez",
      location: "City3",
      rating: 5,
      text: "We've been using this company for years and they never disappoint. From routine maintenance to major installations, they handle everything with professionalism and expertise. Fair pricing and excellent customer service.",
    },
    {
      name: "David Thompson",
      location: "City4",
      rating: 5,
      text: "Best home services company I've ever worked with. The team is courteous, clean, and incredibly skilled. They completed our system upgrade ahead of schedule and under budget. Will definitely use them again!",
    },
    {
      name: "Emily Rodriguez",
      location: "City1",
      rating: 5,
      text: "Impressed by their attention to detail and commitment to quality. The technician explained all my options clearly and helped me make the best decision for my home and budget. No pressure, just honest advice.",
    },
    {
      name: "Robert Williams",
      location: "City2",
      rating: 5,
      text: "After getting quotes from three different companies, these guys offered the best value and service. They were professional from start to finish, and their work is top-notch. Worth every penny!",
    },
  ],
}
