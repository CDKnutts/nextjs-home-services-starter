"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Menu, X } from "lucide-react";
import { brand } from "@/config/brand";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect for backdrop blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const navLinks = brand.navigation;

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const handleGetQuote = () => {
    if (pathname === "/contact") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-md"
            : "bg-white shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
                {brand.companyName.charAt(0)}
              </div>
              <span className="font-bold text-xl text-gray-900 hidden sm:block">
                {brand.companyName}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-medium transition-colors ${
                    isActive(link.href)
                      ? "text-primary"
                      : "text-gray-700 hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Right Side - Phone & CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href={`tel:${brand.phone.replace(/\D/g, "")}`}
                className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors font-medium"
              >
                <Phone size={18} />
                {brand.phone}
              </a>
              <Link
                href="/contact"
                onClick={handleGetQuote}
                className="bg-secondary hover:bg-secondary-dark text-white font-semibold px-6 py-2.5 rounded-lg transition-all transform hover:scale-105"
              >
                {brand.ui.buttons.getFreeQuote}
              </Link>
            </div>

            {/* Mobile Right Side - Phone Icon & Hamburger */}
            <div className="flex lg:hidden items-center gap-4">
              <a
                href={`tel:${brand.phone.replace(/\D/g, "")}`}
                className="text-gray-700 hover:text-primary transition-colors"
              >
                <Phone size={24} />
              </a>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-primary transition-colors"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`absolute top-20 right-0 bottom-0 w-full sm:w-96 bg-white shadow-2xl transform transition-transform duration-300 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <nav className="flex flex-col p-8 gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-2xl font-semibold transition-colors ${
                  isActive(link.href)
                    ? "text-primary"
                    : "text-gray-700 hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <hr className="border-gray-200 my-4" />

            <div className="space-y-4">
              <a
                href={`tel:${brand.phone.replace(/\D/g, "")}`}
                className="flex items-center gap-3 text-xl text-gray-700 hover:text-primary transition-colors font-medium"
              >
                <Phone size={24} />
                {brand.phone}
              </a>

              <Link
                href="/contact"
                onClick={handleGetQuote}
                className="block text-center bg-secondary hover:bg-secondary-dark text-white font-semibold px-6 py-4 rounded-lg transition-all text-lg"
              >
                {brand.ui.buttons.getFreeQuote}
              </Link>
            </div>
          </nav>
        </div>
      </div>

      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-20" />
    </>
  );
}
