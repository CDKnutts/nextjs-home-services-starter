import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { brand } from "@/config/brand";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: brand.seo.title,
  description: brand.seo.description,
};

// Helper function to darken a hex color
function darkenColor(hex: string, percent: number): string {
  // Remove # if present
  hex = hex.replace('#', '');

  // Convert to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Darken
  const darkenedR = Math.floor(r * (1 - percent / 100));
  const darkenedG = Math.floor(g * (1 - percent / 100));
  const darkenedB = Math.floor(b * (1 - percent / 100));

  // Convert back to hex
  const toHex = (n: number) => n.toString(16).padStart(2, '0');
  return `#${toHex(darkenedR)}${toHex(darkenedG)}${toHex(darkenedB)}`;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Generate dark variants of brand colors
  const primaryDark = darkenColor(brand.colors.primary, 20);
  const secondaryDark = darkenColor(brand.colors.secondary, 15);

  return (
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
              --color-primary: ${brand.colors.primary};
              --color-primary-dark: ${primaryDark};
              --color-secondary: ${brand.colors.secondary};
              --color-secondary-dark: ${secondaryDark};
            }
          `
        }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
