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

### 2. Color Customization

**Colors are automatically generated from `brand.ts`** - no need to manually edit CSS files!

Simply update the colors in `src/config/brand.ts`:

```typescript
colors: {
  primary: "#0066CC",      // Your primary brand color
  secondary: "#FF6B35"     // Your secondary/accent color
}
```

The system automatically:
- Injects these colors into CSS custom properties via `src/app/layout.tsx`
- Generates darker variants for hover states (`primary-dark`, `secondary-dark`)
- Makes them available as Tailwind classes throughout the app

**Available Tailwind classes:**
- `bg-primary` / `text-primary` / `border-primary`
- `bg-secondary` / `text-secondary` / `border-secondary`
- `bg-primary-dark` / `bg-secondary-dark` (hover states)

**No manual CSS editing required!** Just change the hex values in `brand.ts` and the entire site updates automatically.

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

## Database Setup (Supabase)

The template includes Supabase integration for storing contact form submissions.

### 1. Create Supabase Project

1. Sign up at [supabase.com](https://supabase.com)
2. Create a new project
3. Wait for database to initialize (2-3 minutes)

### 2. Apply Database Schema

Run the SQL migration in your Supabase SQL Editor (found in project dashboard):

The schema is already applied if you're using the RepPreps-Clients project. If setting up a new project, use the `supabase-setup.sql` file in the repository root.

**Table created:**
- `contact_submissions` - Stores all form submissions with business_name as tenant discriminator

### 3. Configure Environment Variables

Add your Supabase credentials to `.env`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://yourproject.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

Find these in: Supabase Dashboard → Project Settings → API

### Multi-Tenant Architecture

**Important:** All client deployments share ONE Supabase database:
- Each deployment has the same Supabase credentials
- `business_name` field identifies which business the lead belongs to
- Submissions are automatically filtered by `brand.companyName`

## Email Notifications (Resend)

Get instant email notifications when someone submits the contact form.

### 1. Setup Resend Account

1. Sign up at [resend.com](https://resend.com)
2. Go to [API Keys](https://resend.com/api-keys)
3. Create a new API key (starts with `re_`)

### 2. Verify Your Domain

**Required before sending emails:**

1. Go to [Domains](https://resend.com/domains) in Resend dashboard
2. Add your domain (e.g., `repreps.com`)
3. Add the provided DNS records to your domain registrar
4. Wait for verification (usually 5-15 minutes)

### 3. Configure Environment Variables

Add to `.env`:

```bash
RESEND_API_KEY=re_your_actual_api_key_here
NOTIFICATION_EMAIL=your-email@example.com
```

### Email Features

Emails include:
- Business name badge
- Customer contact info (name, email, phone)
- Service type requested
- Customer message
- Zip code
- Timestamp

**Subject line:** `New Lead: {business_name}`
**From:** `leads@repreps.com`

### Error Handling

Email failures are **non-blocking**:
- Form submission succeeds even if email fails
- Lead still saved to Supabase
- Errors logged to console for debugging

## Environment Variables

Complete list of environment variables used in the template:

### Required Variables

```bash
# Supabase (required for contact form)
NEXT_PUBLIC_SUPABASE_URL=https://yourproject.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### Email Notifications

```bash
# Resend (optional but recommended)
RESEND_API_KEY=re_your_api_key
NOTIFICATION_EMAIL=your-email@example.com
```

### Optional Services

```bash
# Google Maps (for service areas map)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_maps_api_key

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

### Local Development

1. Copy `.env.example` to `.env`
2. Fill in required variables
3. Optional variables can be left blank
4. Never commit `.env` to git (already in `.gitignore`)

### Production (Vercel)

Set environment variables in: Vercel Dashboard → Project → Settings → Environment Variables

**For multi-client deployments:**
- `RESEND_API_KEY` - Same for all clients
- `NOTIFICATION_EMAIL` - Different per client (where leads go)
- Supabase credentials - Same for all clients

## Multi-Client Deployment Strategy

This template supports deploying to 200+ clients using a shared database.

### Architecture Overview

**Shared Resources:**
- ONE Supabase database (all clients)
- ONE Resend API key (all clients)
- Centralized lead management

**Per-Client Resources:**
- Separate Vercel deployment
- Unique `brand.ts` configuration
- Unique `NOTIFICATION_EMAIL`

### Deployment Workflow

**For each new client:**

1. **Clone Repository**
   ```bash
   git clone [repo-url] client-name
   cd client-name
   ```

2. **Customize `src/config/brand.ts`**
   ```typescript
   companyName: "ABC Plumbing FL"  // MUST be unique across all clients
   // ... update all brand settings
   ```

3. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```

4. **Set Environment Variables** (in Vercel Dashboard)
   ```bash
   # Same for all clients:
   NEXT_PUBLIC_SUPABASE_URL=https://wqxcadvfnuiyqclieiaa.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[shared_anon_key]
   RESEND_API_KEY=[shared_resend_key]

   # Different per client:
   NOTIFICATION_EMAIL=abc-plumbing@client-email.com
   ```

5. **Track Deployment**
   - Keep a spreadsheet of all `companyName` values to ensure uniqueness
   - Example: "ABC Plumbing FL", "ABC Plumbing TX" if multiple ABC Plumbings

### Querying Client Data

In Supabase dashboard:

```sql
-- View all leads for specific client
SELECT * FROM contact_submissions
WHERE business_name = 'ABC Plumbing FL'
ORDER BY created_at DESC;

-- Count leads by client
SELECT business_name, COUNT(*) as total_leads
FROM contact_submissions
GROUP BY business_name
ORDER BY total_leads DESC;
```

### Benefits of This Architecture

✅ **Centralized Management** - All leads in one database
✅ **Cost Effective** - One Supabase project for 200+ clients
✅ **Easy Maintenance** - Update template, redeploy all clients
✅ **Simple Configuration** - Just change `brand.ts` per client
✅ **Scalable** - Handles thousands of submissions per month

## Section IDs

All major sections have unique IDs for navigation and deep linking.

### Homepage Section IDs

```typescript
#hero               // Hero section
#services           // Services grid
#why-choose-us      // Why Choose Us features
#service-areas      // Service areas map
#reviews            // Customer reviews
#contact            // Footer contact info
```

### Page Section IDs

**Services Page:**
- `#services-hero` - Page hero
- `#services-grid` - Services grid
- `#services-cta` - Call to action

**About Page:**
- `#about-hero` - Page hero
- `#about-story` - Company story
- `#about-certifications` - Certifications grid
- `#about-team` - Team members
- `#about-timeline` - Company timeline

**Contact Page:**
- `#contact-hero` - Page hero
- `#contact-form` - Contact form section

**Service Detail Pages:**
- `#service-detail-hero` - Service hero
- `#service-detail-content` - Service information
- `#service-detail-contact` - Contact form
- `#service-detail-other-services` - Related services

### Using Section IDs

**Internal Navigation:**
```html
<a href="#services">Jump to Services</a>
<a href="/about#about-team">View Our Team</a>
```

**Smooth Scrolling:**
Automatically enabled via `scroll-smooth` class on `<html>` element.

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
