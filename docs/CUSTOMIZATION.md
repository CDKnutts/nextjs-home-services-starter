# Home Services Template - Customization Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

## ⚡ One-File Customization

**The entire website is controlled by a single configuration file: `src/config/brand.ts`**

Edit this file to customize ALL aspects of your website. No need to touch any component files!

### 1. Brand Configuration (`src/config/brand.ts`)

```typescript
export const brand = {
  // ===== BASIC COMPANY INFO =====
  companyName: "Your Company Name",          // Used in hero, metadata
  tagline: "Professional Home Services",      // Used in hero

  // ===== CONTACT INFORMATION =====
  phone: "(555) 123-4567",                   // Main phone (click-to-call)
  emergencyPhone: "(555) 911-HELP",          // Emergency line (not used yet)
  email: "info@company.com",                 // Business email (not used yet)
  address: "123 Main St, City, ST 12345",    // Physical address (not used yet)
  hours: "Mon-Fri: 8AM-6PM, Sat: 9AM-4PM",  // Business hours (not used yet)

  // ===== SEO & METADATA =====
  seo: {
    title: "Your Company Name - Professional Home Services | 24/7 Emergency",
    description: "Licensed and insured home services company...",
  },

  // ===== BRAND COLORS =====
  // Note: Must match colors in src/app/globals.css
  colors: {
    primary: "#0066CC",      // Blue
    secondary: "#FF6B35"     // Orange
  },

  // ===== GEOGRAPHIC INFO =====
  region: "Your Region",                     // Used in service areas heading
  serviceAreas: ["City1", "City2", ...],     // Cities you serve

  // ===== SERVICES OFFERED =====
  services: [
    {
      name: "Installation & Replacement",
      icon: "Wrench",                        // Lucide React icon name
      slug: "installation",                  // URL-friendly identifier
      description: "Full service description..."  // Displayed on cards
    },
    // Add/remove services as needed
  ],

  // ===== WHY CHOOSE US FEATURES =====
  features: [
    {
      icon: "Award",                         // Lucide React icon
      title: "20+ Years Experience",
      description: "Full feature description..."
    },
    // Add/remove features as needed
  ],

  // ===== CUSTOMER REVIEWS =====
  reviews: [
    {
      name: "Sarah Johnson",
      location: "City1",
      rating: 5,
      text: "Full review text..."
    },
    // Add/remove reviews as needed
  ],
}
```

### 2. Color Customization (`src/app/globals.css`)

Update the custom colors in the `@theme inline` section:

```css
@theme inline {
  --color-primary: #0066CC;        /* Primary blue */
  --color-primary-dark: #004d99;   /* Darker blue for hovers */
  --color-secondary: #FF6B35;      /* Secondary orange */
  --color-secondary-dark: #e55520; /* Darker orange for hovers */
}
```

You can use these colors in components with Tailwind classes:
- `bg-primary` / `text-primary`
- `bg-secondary` / `text-secondary`
- `bg-primary-dark` / `text-primary-dark`
- `bg-secondary-dark` / `text-secondary-dark`

### 3. Page Metadata (`src/app/layout.tsx`)

Update SEO information:

```typescript
export const metadata: Metadata = {
  title: "Your Company Name - Professional Home Services | 24/7 Emergency",
  description: "Your custom description here...",
}
```

### 4. Customize Individual Sections

#### Hero Section (`src/components/HeroSection.tsx`)
- Update heading text
- Modify CTA buttons
- Change trust badges
- Add background image (replace gradient)

#### Services Section (`src/components/ServicesSection.tsx`)
- Services are pulled from `brand.services` array
- Customize service descriptions
- Add service detail pages at `/services/[slug]`

#### Why Choose Us (`src/components/WhyChooseUsSection.tsx`)
- Update the `features` array with your unique selling points
- Change icons from Lucide React library
- Modify titles and descriptions

#### Service Areas (`src/components/ServiceAreasSection.tsx`)
- Areas are pulled from `brand.serviceAreas` array
- Replace map placeholder with actual Google Maps embed
- Update region name in heading

#### Reviews Section (`src/components/ReviewsSection.tsx`)
- Update the `reviews` array with real testimonials
- Connect to external review platform API
- Modify review display format

## Available Icons

The template uses [Lucide React](https://lucide.dev/icons) for icons. You can browse all available icons at their website and use any icon name in the `brand.services` array.

Example icons:
- `Wrench`, `Settings`, `AlertCircle`
- `Phone`, `Mail`, `MapPin`
- `Star`, `Award`, `ThumbsUp`

## File Structure

```
home-services/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx            # Homepage (combines all sections)
│   │   └── globals.css         # Global styles and theme
│   ├── components/
│   │   ├── HeroSection.tsx     # Hero banner with CTA
│   │   ├── ServicesSection.tsx # Services grid
│   │   ├── WhyChooseUsSection.tsx
│   │   ├── ServiceAreasSection.tsx
│   │   └── ReviewsSection.tsx  # Customer testimonials
│   └── config/
│       └── brand.ts            # Brand configuration (EDIT THIS FIRST!)
└── package.json
```

## Adding New Sections

1. Create a new component in `src/components/`
2. Import it in `src/app/page.tsx`
3. Add it to the page in the desired order

```tsx
// src/app/page.tsx
import NewSection from "@/components/NewSection";

export default function Home() {
  return (
    <main className="scroll-smooth">
      <HeroSection />
      <NewSection />  {/* Add your new section */}
      <ServicesSection />
      {/* ... */}
    </main>
  );
}
```

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Other Platforms
The template works on any platform that supports Next.js:
- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Self-hosted with Node.js

## Support

For issues or questions about Next.js, visit [Next.js Documentation](https://nextjs.org/docs).

For Tailwind CSS help, visit [Tailwind CSS Documentation](https://tailwindcss.com/docs).
