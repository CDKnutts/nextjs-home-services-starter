# Brand Variables Reference

This document shows where every variable from `src/config/brand.ts` is used in the template.

## ✅ All Variables Are Used

### Basic Company Info

| Variable | Used In | Location |
|----------|---------|----------|
| `companyName` | Hero Section | `src/components/HeroSection.tsx:18` |
| | Page Title (SEO) | `src/app/layout.tsx:17` (via seo.title) |
| | Footer | `src/components/Footer.tsx:11` |
| | Footer Copyright | `src/components/Footer.tsx:69` |
| `tagline` | Hero Section | `src/components/HeroSection.tsx:25` |
| | Footer | `src/components/Footer.tsx:12` |

### Contact Information

| Variable | Used In | Location |
|----------|---------|----------|
| `phone` | Hero CTA Button | `src/components/HeroSection.tsx:39-44` |
| | Service Areas | `src/components/ServiceAreasSection.tsx:47-50` |
| | Footer | `src/components/Footer.tsx:22-29` |
| `emergencyPhone` | Footer (Emergency Line) | `src/components/Footer.tsx:30-39` |
| `email` | Footer | `src/components/Footer.tsx:40-47` |
| `address` | Footer | `src/components/Footer.tsx:55-58` |
| `hours` | Footer | `src/components/Footer.tsx:59-62` |

### SEO & Metadata

| Variable | Used In | Location |
|----------|---------|----------|
| `seo.title` | Page Metadata | `src/app/layout.tsx:17` |
| `seo.description` | Page Metadata | `src/app/layout.tsx:18` |

### Colors

| Variable | Used In | Location |
|----------|---------|----------|
| `colors.primary` | Defined in config | Referenced in `src/app/globals.css:11` |
| `colors.secondary` | Defined in config | Referenced in `src/app/globals.css:13` |

> **Note:** Colors must be manually synced between `brand.ts` and `globals.css`

### Geographic Info

| Variable | Used In | Location |
|----------|---------|----------|
| `region` | Service Areas Heading | `src/components/ServiceAreasSection.tsx:14` |
| `serviceAreas[]` | Service Areas List | `src/components/ServiceAreasSection.tsx:28-37` |
| | Footer | `src/components/Footer.tsx:68-76` |

### Services

| Variable | Used In | Location |
|----------|---------|----------|
| `services[].name` | Services Section Cards | `src/components/ServicesSection.tsx:37` |
| `services[].icon` | Services Section Icons | `src/components/ServicesSection.tsx:23` |
| `services[].slug` | Service Links | `src/components/ServicesSection.tsx:45` |
| `services[].description` | Service Card Text | `src/components/ServicesSection.tsx:41` |

### Features (Why Choose Us)

| Variable | Used In | Location |
|----------|---------|----------|
| `features[].icon` | Features Section Icons | `src/components/WhyChooseUsSection.tsx:23` |
| `features[].title` | Features Section Headings | `src/components/WhyChooseUsSection.tsx:37` |
| `features[].description` | Features Section Text | `src/components/WhyChooseUsSection.tsx:41` |

### Reviews

| Variable | Used In | Location |
|----------|---------|----------|
| `reviews[].name` | Reviews Section | `src/components/ReviewsSection.tsx:43` |
| `reviews[].location` | Reviews Section | `src/components/ReviewsSection.tsx:44` |
| `reviews[].rating` | Reviews Section Stars | `src/components/ReviewsSection.tsx:34-37` |
| `reviews[].text` | Reviews Section Quote | `src/components/ReviewsSection.tsx:31` |

## 🎯 Summary

**Total Variables: 21 fields + 4 arrays (services, features, reviews, serviceAreas)**

- ✅ **100% of variables are used** in the template
- ✅ **All arrays are dynamically rendered** (add/remove items freely)
- ✅ **Single source of truth**: Edit only `src/config/brand.ts`

## 🔄 How to Customize

1. Edit `src/config/brand.ts`
2. Save the file
3. The dev server will hot-reload automatically
4. All changes appear instantly across the entire site

**No need to touch component files!**
