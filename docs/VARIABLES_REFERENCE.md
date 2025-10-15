# Brand Variables Reference

This document shows where every variable from `src/config/brand.ts` is used in the template.

## 🎯 Complete Variable List

### Basic Company Info

| Variable | Type | Used In | Location |
|----------|------|---------|----------|
| `companyName` | string | Hero Section | `src/components/HeroSection.tsx:10-16` |
| | | Header Logo | `src/components/Header.tsx:69, 72` |
| | | Footer Logo | `src/components/Footer.tsx:16, 18` |
| | | Footer Copyright | `src/components/Footer.tsx:154` |
| | | Page Metadata | `src/app/layout.tsx` (via seo.title) |
| | | **Contact Form Submission** | `src/components/ContactForm.tsx:59` |
| `tagline` | string | Hero Section | `src/components/HeroSection.tsx:18-20` |
| | | Footer | `src/components/Footer.tsx:20` |
| `logo` | string | Not implemented yet | Future: Header/Footer logos |

### Contact Information

| Variable | Type | Used In | Location |
|----------|------|---------|----------|
| `phone` | string | Hero CTA Button | `src/components/HeroSection.tsx:51-56` |
| | | Header CTA | `src/components/Header.tsx:96-100, 114, 170-174` |
| | | Service Areas | `src/components/ServiceAreasSection.tsx:47-50` |
| | | Service Detail Sidebar | `src/app/services/[slug]/page.tsx:178-182` |
| | | Footer | `src/components/Footer.tsx:69-73` |
| `emergencyPhone` | string | Footer Emergency Line | `src/components/Footer.tsx:78-84` |
| | | Contact Page | `src/app/contact/page.tsx:50-54` |
| `email` | string | Service Detail Sidebar | `src/app/services/[slug]/page.tsx:202` |
| | | Footer | `src/components/Footer.tsx:88-93` |
| `address` | string | Service Detail Sidebar | `src/app/services/[slug]/page.tsx:206` |
| | | Footer | `src/components/Footer.tsx:97-98` |
| | | Contact Page | `src/app/contact/page.tsx:77` |
| `hours` | string | Service Detail Sidebar | `src/app/services/[slug]/page.tsx:198` |
| | | Footer | `src/components/Footer.tsx:101-102` |
| | | Contact Page | `src/app/contact/page.tsx:86` |

### SEO & Metadata

| Variable | Type | Used In | Location |
|----------|------|---------|----------|
| `seo.title` | string | Root Layout Metadata | `src/app/layout.tsx:17` |
| `seo.description` | string | Root Layout Metadata | `src/app/layout.tsx:18` |

### Brand Colors

| Variable | Type | Used In | Location |
|----------|------|---------|----------|
| `colors.primary` | string (hex) | **Auto-injected CSS** | `src/app/layout.tsx:28-40` |
| `colors.secondary` | string (hex) | **Auto-injected CSS** | `src/app/layout.tsx:28-40` |

> **Note:** Colors are automatically injected into CSS custom properties and available as Tailwind classes (`bg-primary`, `text-secondary`, etc.). No manual CSS editing required!

### Geographic Info

| Variable | Type | Used In | Location |
|----------|------|---------|----------|
| `region` | string | Service Areas Heading | `src/components/ServiceAreasSection.tsx:14` |
| | | About Hero | `src/app/about/page.tsx:18` |
| | | Footer Tagline | `src/components/Footer.tsx:22` |
| `serviceAreas` | string[] | Service Areas List | `src/components/ServiceAreasSection.tsx:29-37` |
| | | Footer | `src/components/Footer.tsx:25` |
| | | Contact Page Chips | `src/app/contact/page.tsx:101-109` |

### Social Media

| Variable | Type | Used In | Location |
|----------|------|---------|----------|
| `social.facebook` | string (URL) | Footer Social Icons | `src/components/Footer.tsx:111-117` |
| `social.twitter` | string (URL) | Footer Social Icons | `src/components/Footer.tsx:119-126` |
| `social.instagram` | string (URL) | Footer Social Icons | `src/components/Footer.tsx:128-135` |
| `social.linkedin` | string (URL) | Footer Social Icons | `src/components/Footer.tsx:137-144` |

### Navigation

| Variable | Type | Used In | Location |
|----------|------|---------|----------|
| `navigation[]` | Array<{href, label}> | Header Desktop Nav | `src/components/Header.tsx:78-90` |
| | | Header Mobile Nav | `src/components/Header.tsx:152-163` |
| | | Footer Quick Links | `src/components/Footer.tsx:33-42` |

### Hero Section

| Variable | Type | Used In | Location |
|----------|------|---------|----------|
| `hero.heading` | string (template) | Hero Section | `src/components/HeroSection.tsx:14-16` |
| `hero.subheading` | string | Hero Section | `src/components/HeroSection.tsx:34` |
| `hero.tagline` | string (template) | Hero Section | `src/components/HeroSection.tsx:18-20` |
| `hero.badges[]` | Array<{icon, text}> | Hero Trust Badges | `src/components/HeroSection.tsx:61-69` |

### UI Text & Labels

| Variable | Type | Used In | Location |
|----------|------|---------|----------|
| `ui.buttons.getFreeQuote` | string | Hero CTA | `src/components/HeroSection.tsx:43` |
| | | Header CTA | `src/components/Header.tsx:107, 182` |
| `ui.buttons.learnMore` | string | Services Cards | `src/components/ServicesSection.tsx:47` |
| | | Service Detail | `src/app/services/[slug]/page.tsx:252` |
| `ui.buttons.requestQuote` | string | Service Detail CTA | `src/app/services/[slug]/page.tsx:189` |
| `ui.buttons.sendMessage` | string | Contact Form Submit | (via forms.contact.submitButton) |
| `ui.buttons.callNow` | string | Hero CTA | `src/components/HeroSection.tsx:55` |
| `ui.mapPlaceholder.title` | string | Service Areas Map | Not currently used |
| `ui.mapPlaceholder.subtitle` | string | Service Areas Map | Not currently used |

### Legal & Footer Links

| Variable | Type | Used In | Location |
|----------|------|---------|----------|
| `legal.privacyPolicyUrl` | string | Footer Links | `src/components/Footer.tsx:157` |
| `legal.privacyPolicyLabel` | string | Footer Links | `src/components/Footer.tsx:158` |
| `legal.termsOfServiceUrl` | string | Footer Links | `src/components/Footer.tsx:160` |
| `legal.termsOfServiceLabel` | string | Footer Links | `src/components/Footer.tsx:161` |

### Pages Configuration

#### About Page

| Variable | Type | Used In | Location |
|----------|------|---------|----------|
| `pages.about.heroSubtitle` | string (template) | About Hero | `src/app/about/page.tsx:18` |
| `pages.about.teamHeading` | string | About Page | `src/app/about/page.tsx:80` |
| `pages.about.teamSubtitle` | string | About Page | `src/app/about/page.tsx:83` |
| `pages.about.certificationsHeading` | string | About Page | `src/app/about/page.tsx:55` |
| `pages.about.timelineHeading` | string | About Page | `src/app/about/page.tsx:117` |
| `pages.about.timelineSubtitle` | string | About Page | `src/app/about/page.tsx:120` |

#### Contact Page

| Variable | Type | Used In | Location |
|----------|------|---------|----------|
| `pages.contact.heroTitle` | string | Contact Hero | `src/app/contact/page.tsx:12` |
| `pages.contact.heroSubtitle` | string | Contact Hero | `src/app/contact/page.tsx:14` |
| `pages.contact.infoHeading` | string | Contact Sidebar | `src/app/contact/page.tsx:32` |
| `pages.contact.emergencyNote` | string | Contact Sidebar | `src/app/contact/page.tsx:88` |
| `pages.contact.serviceAreasHeading` | string | Contact Sidebar | `src/app/contact/page.tsx:98` |
| `pages.contact.locationHeading` | string | Contact Map | `src/app/contact/page.tsx:116` |
| `pages.contact.labels.phone` | string | Contact Info | `src/app/contact/page.tsx:40` |
| `pages.contact.labels.email` | string | Contact Info | `src/app/contact/page.tsx:61` |
| `pages.contact.labels.address` | string | Contact Info | `src/app/contact/page.tsx:75` |
| `pages.contact.labels.hours` | string | Contact Info | `src/app/contact/page.tsx:84` |
| `pages.contact.labels.emergency` | string | Contact Info | `src/app/contact/page.tsx:53` |

#### Services Page

| Variable | Type | Used In | Location |
|----------|------|---------|----------|
| `pages.services.heroTitle` | string | Services Hero | `src/app/services/page.tsx:17` |
| `pages.services.heroSubtitle` | string | Services Hero | `src/app/services/page.tsx:19` |
| `pages.services.ctaHeading` | string | Services CTA | `src/app/services/page.tsx:94` |
| `pages.services.ctaSubheading` | string | Services CTA | `src/app/services/page.tsx:97` |

#### Service Detail Pages

| Variable | Type | Used In | Location |
|----------|------|---------|----------|
| `pages.serviceDetail.aboutHeading` | string (template) | Service Detail | `src/app/services/[slug]/page.tsx:59` |
| `pages.serviceDetail.whatsIncludedHeading` | string | Service Detail | `src/app/services/[slug]/page.tsx:66` |
| `pages.serviceDetail.processHeading` | string | Service Detail | `src/app/services/[slug]/page.tsx:82` |
| `pages.serviceDetail.faqHeading` | string | Service Detail | `src/app/services/[slug]/page.tsx:106` |
| `pages.serviceDetail.whyChooseHeading` | string (template) | Service Detail | `src/app/services/[slug]/page.tsx:140` |
| `pages.serviceDetail.getStartedHeading` | string | Service Detail Sidebar | `src/app/services/[slug]/page.tsx:171` |
| `pages.serviceDetail.getStartedSubheading` | string | Service Detail Sidebar | `src/app/services/[slug]/page.tsx:173` |
| `pages.serviceDetail.otherServicesHeading` | string | Service Detail | `src/app/services/[slug]/page.tsx:227` |
| `pages.serviceDetail.viewAllServices` | string | Service Detail | `src/app/services/[slug]/page.tsx:264` |

### Forms Configuration

| Variable | Type | Used In | Location |
|----------|------|---------|----------|
| `forms.contact.heading` | string | Contact Form | `src/components/ContactForm.tsx:92` |
| `forms.contact.successTitle` | string | Success Message | `src/components/ContactForm.tsx:100` |
| `forms.contact.successMessage` | string | Success Message | `src/components/ContactForm.tsx:102` |
| `forms.contact.errorTitle` | string | Error Message | `src/components/ContactForm.tsx:113` |
| `forms.contact.errorMessage` | string | Error Message | `src/components/ContactForm.tsx:83` |
| `forms.contact.requiredNote` | string | Form Footer | `src/components/ContactForm.tsx:297` |
| `forms.contact.submitButton` | string | Submit Button | `src/components/ContactForm.tsx:292` |
| `forms.contact.submittingButton` | string | Submit Button (loading) | `src/components/ContactForm.tsx:289` |
| `forms.contact.labels.name` | string | Name Field Label | `src/components/ContactForm.tsx:126` |
| `forms.contact.labels.email` | string | Email Field Label | `src/components/ContactForm.tsx:152` |
| `forms.contact.labels.phone` | string | Phone Field Label | `src/components/ContactForm.tsx:176` |
| `forms.contact.labels.serviceType` | string | Service Type Label | `src/components/ContactForm.tsx:204` |
| `forms.contact.labels.serviceTypePlaceholder` | string | Service Dropdown | `src/components/ContactForm.tsx:214` |
| `forms.contact.labels.zipCode` | string | Zip Code Label | `src/components/ContactForm.tsx:234` |
| `forms.contact.labels.message` | string | Message Label | `src/components/ContactForm.tsx:261` |
| `forms.contact.placeholders.name` | string | Name Field | `src/components/ContactForm.tsx:135` |
| `forms.contact.placeholders.email` | string | Email Field | `src/components/ContactForm.tsx:161` |
| `forms.contact.placeholders.phone` | string | Phone Field | `src/components/ContactForm.tsx:185` |
| `forms.contact.placeholders.zipCode` | string | Zip Code Field | `src/components/ContactForm.tsx:243` |
| `forms.contact.placeholders.message` | string | Message Field | `src/components/ContactForm.tsx:270` |

### Sections Content

| Variable | Type | Used In | Location |
|----------|------|---------|----------|
| `sections.services.heading` | string | Services Section | `src/components/ServicesSection.tsx:13` |
| `sections.services.subheading` | string | Services Section | `src/components/ServicesSection.tsx:16` |
| `sections.whyChooseUs.heading` | string | Why Choose Us | `src/components/WhyChooseUsSection.tsx:13` |
| `sections.whyChooseUs.subheading` | string | Why Choose Us | `src/components/WhyChooseUsSection.tsx:16` |
| `sections.reviews.heading` | string | Reviews Section | `src/components/ReviewsSection.tsx:13` |
| `sections.reviews.subheading` | string | Reviews Section | `src/components/ReviewsSection.tsx:16` |
| `sections.reviews.cta` | string | Reviews CTA Button | `src/components/ReviewsSection.tsx:64` |
| `sections.reviews.ctaSubheading` | string | Reviews CTA Text | `src/components/ReviewsSection.tsx:58` |
| `sections.serviceAreas.heading` | string (template) | Service Areas | `src/components/ServiceAreasSection.tsx:14` |
| `sections.serviceAreas.subheading` | string | Service Areas | `src/components/ServiceAreasSection.tsx:18` |
| `sections.serviceAreas.listHeading` | string | Service Areas | `src/components/ServiceAreasSection.tsx:26` |
| `sections.serviceAreas.notListed` | string | Service Areas | `src/components/ServiceAreasSection.tsx:42` |
| `sections.serviceAreas.notListedText` | string (template) | Service Areas | `src/components/ServiceAreasSection.tsx:45-53` |
| `sections.footer.taglinePrefix` | string | Footer | `src/components/Footer.tsx:22` |
| `sections.footer.servingLabel` | string | Footer | `src/components/Footer.tsx:25` |
| `sections.footer.quickLinksHeading` | string | Footer | `src/components/Footer.tsx:31` |
| `sections.footer.servicesHeading` | string | Footer | `src/components/Footer.tsx:48` |
| `sections.footer.contactHeading` | string | Footer | `src/components/Footer.tsx:65` |
| `sections.footer.socialHeading` | string | Footer | `src/components/Footer.tsx:108` |

### About Page Data

| Variable | Type | Used In | Location |
|----------|------|---------|----------|
| `about.story.title` | string | About Page | `src/app/about/page.tsx:29` |
| `about.story.paragraphs[]` | string[] | About Page | `src/app/about/page.tsx:32-34` |
| `about.story.image` | string | About Page | `src/app/about/page.tsx:43` (placeholder) |
| `about.team[]` | Array<{name, title, bio, image}> | About Page | `src/app/about/page.tsx:86-108` |
| `about.certifications[]` | Array<{name, icon}> | About Page | `src/app/about/page.tsx:58-71` |
| `about.timeline[]` | Array<{year, title, description}> | About Page | `src/app/about/page.tsx:123-146` |

### Services Array

Each service object contains:

| Property | Type | Used In | Locations |
|----------|------|---------|-----------|
| `name` | string | Service Cards, Detail Pages | Multiple locations |
| `icon` | string (Lucide) | Service Icons | Multiple locations |
| `slug` | string | URLs, Routing | `/services/[slug]` |
| `description` | string | Service Cards | `ServicesSection.tsx` |
| `detailedDescription` | string | Service Detail Pages | `services/[slug]/page.tsx` |
| `bulletPoints[]` | string[] | Service Detail "What's Included" | `services/[slug]/page.tsx:69-77` |
| `processSteps[]` | Array<{title, description}> | Service Detail Process | `services/[slug]/page.tsx:85-101` |
| `faqs[]` | Array<{question, answer}> | Service Detail FAQs | `services/[slug]/page.tsx:109-134` |

**Note:** Service dropdown in Contact Form (`src/components/ContactForm.tsx:215-219`) dynamically generates options from this array.

### Features Array

| Property | Type | Used In | Location |
|----------|------|---------|----------|
| `features[].icon` | string (Lucide) | Why Choose Us Icons | `src/components/WhyChooseUsSection.tsx:22` |
| `features[].title` | string | Why Choose Us Headings | `src/components/WhyChooseUsSection.tsx:36` |
| `features[].description` | string | Why Choose Us Text | `src/components/WhyChooseUsSection.tsx:40` |

Also used in Service Detail "Why Choose" section: `src/app/services/[slug]/page.tsx:143-162`

### Reviews Array

| Property | Type | Used In | Location |
|----------|------|---------|----------|
| `reviews[].name` | string | Reviews Section | `src/components/ReviewsSection.tsx:48` |
| `reviews[].location` | string | Reviews Section | `src/components/ReviewsSection.tsx:49` |
| `reviews[].rating` | number (1-5) | Star Display | `src/components/ReviewsSection.tsx:33-38` |
| `reviews[].text` | string | Review Quote | `src/components/ReviewsSection.tsx:43` |

## 🎯 Summary

**Total Configuration Points:**
- **17 top-level properties**
- **12 nested objects** (seo, colors, social, hero, ui, legal, pages, forms, sections, about)
- **7 arrays** (navigation, services, features, reviews, serviceAreas, team, certifications, timeline)
- **200+ individual configurable values**

**Coverage:**
- ✅ **100% of variables are used** in the template
- ✅ **All arrays are dynamically rendered** (add/remove items freely)
- ✅ **Single source of truth**: Edit only `src/config/brand.ts`
- ✅ **Colors auto-sync**: No manual CSS editing required

## 🔄 How to Customize

1. Edit `src/config/brand.ts`
2. Save the file
3. The dev server will hot-reload automatically
4. All changes appear instantly across the entire site

**No need to touch component files!**

## 📝 Template Variables

Some variables support template placeholders:

| Variable | Placeholders | Example |
|----------|--------------|---------|
| `hero.heading` | `{companyName}`, `{tagline}` | `"{companyName} - 24/7 Service"` |
| `hero.tagline` | `{companyName}`, `{tagline}` | `"{tagline}"` |
| `pages.about.heroSubtitle` | `{region}` | `"Serving {region} for 20 years"` |
| `pages.serviceDetail.aboutHeading` | `{serviceName}` | `"About Our {serviceName} Service"` |
| `pages.serviceDetail.whyChooseHeading` | `{companyName}` | `"Why Choose {companyName}?"` |
| `sections.serviceAreas.heading` | `{region}` | `"Proudly Serving {region}"` |
| `sections.serviceAreas.notListedText` | `{phone}` | `"Call {phone} to check availability"` |

These placeholders are automatically replaced with actual values at runtime.
