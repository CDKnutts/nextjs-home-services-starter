export const brand = {
  // Basic Company Info
  companyName: "Your Company Name",
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

  // Brand Colors (must match globals.css)
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
