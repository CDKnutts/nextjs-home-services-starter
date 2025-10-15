# Home Services Website Template

A professional, fully-responsive Next.js 14 template for home services businesses (HVAC, plumbing, electrical, etc.).

## ⚡ Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

Visit [http://localhost:3000](http://localhost:3000) to see your site.

## 🎯 One-File Customization

**Edit one file to customize everything:** `src/config/brand.ts`

Change your company info, services, reviews, contact details, and more - all from a single configuration file!

## 📚 Documentation

- **[Customization Guide](docs/CUSTOMIZATION.md)** - How to customize the template
- **[Variables Reference](docs/VARIABLES_REFERENCE.md)** - Complete list of all variables and where they're used

## ✨ Features

- ✅ **Next.js 14** with App Router
- ✅ **TypeScript** for type safety
- ✅ **Tailwind CSS v4** for styling
- ✅ **Fully Responsive** - Mobile-first design
- ✅ **SEO Optimized** - Meta tags and semantic HTML
- ✅ **Click-to-Call** phone numbers
- ✅ **100% Configurable** from single config file
- ✅ **Lucide Icons** throughout
- ✅ **Form Ready** - react-hook-form + zod installed
- ✅ **Email Notifications** - Instant lead alerts via Resend
- ✅ **Database Ready** - Supabase integration included

## 📦 What's Included

### Sections

1. **Hero Section** - Full-screen banner with CTAs
2. **Services Section** - Showcases your services in a grid
3. **Why Choose Us** - Highlight your unique value propositions
4. **Service Areas** - Display cities you serve with map placeholder
5. **Reviews** - Customer testimonials with star ratings
6. **Footer** - Complete contact info and links

### Tech Stack

- Next.js 15.5.5
- React 19
- TypeScript
- Tailwind CSS v4
- Lucide React (icons)
- react-hook-form
- zod

## 🛠️ Project Structure

```
home-services/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx            # Homepage
│   │   └── globals.css         # Global styles & theme
│   ├── components/
│   │   ├── HeroSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── WhyChooseUsSection.tsx
│   │   ├── ServiceAreasSection.tsx
│   │   ├── ReviewsSection.tsx
│   │   └── Footer.tsx
│   └── config/
│       └── brand.ts            # 🎯 EDIT THIS FILE!
├── docs/
│   ├── CUSTOMIZATION.md
│   └── VARIABLES_REFERENCE.md
└── package.json
```

## 🚀 Deployment

Deploy to Vercel (recommended):

```bash
npm install -g vercel
vercel
```

Also compatible with:
- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Self-hosted with Node.js

## 📧 Email Notifications Setup

The template includes instant email notifications for contact form submissions using [Resend](https://resend.com).

### 1. Get Your Resend API Key

1. Sign up at [resend.com](https://resend.com)
2. Go to [API Keys](https://resend.com/api-keys)
3. Create a new API key
4. Copy the key (starts with `re_`)

### 2. Verify Your Sending Domain

**Important:** Resend requires domain verification before sending emails.

1. Go to [Domains](https://resend.com/domains) in Resend dashboard
2. Add your domain (`repreps.com` in this example)
3. Add the provided DNS records to your domain registrar
4. Wait for verification (usually 5-15 minutes)

Once verified, you can send from `leads@repreps.com` (or any address on your domain).

### 3. Configure Environment Variables

**For local development**, add to `.env`:
```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
NOTIFICATION_EMAIL=your-email@example.com
```

**For production (Vercel)**, set these as environment variables:

1. Go to your Vercel project → Settings → Environment Variables
2. Add `RESEND_API_KEY` (use same key for all deployments)
3. Add `NOTIFICATION_EMAIL` (different email per client)

**Example for multi-client setup:**
- Client A deployment: `NOTIFICATION_EMAIL=abc-plumbing@clientemail.com`
- Client B deployment: `NOTIFICATION_EMAIL=xyz-roofing@clientemail.com`
- Both use same `RESEND_API_KEY`

### 4. Email Template

Emails include:
- ✅ Business name badge
- ✅ Customer contact info (name, email, phone)
- ✅ Service type requested
- ✅ Customer message
- ✅ Zip code
- ✅ Submission timestamp
- ✅ Clickable phone/email links

Subject line: `New Lead: {business_name}`

### 5. Error Handling

Email failures are **non-blocking**:
- Form submission succeeds even if email fails
- Errors logged to console for debugging
- Lead still saved to Supabase database

This ensures customers never see email errors - leads are never lost!

## 📝 License

This is a template - feel free to use it for your projects!

## 🤝 Support

For Next.js questions: [Next.js Documentation](https://nextjs.org/docs)

For Tailwind CSS: [Tailwind Documentation](https://tailwindcss.com/docs)
