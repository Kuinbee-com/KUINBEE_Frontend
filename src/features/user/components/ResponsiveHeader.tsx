import * as React from 'react';
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { OverlayTriggers } from "./GlobalOverlaySystem";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ResponsiveHeaderProps {
  theme?: "default" | "hero" | "light" | "dark" | "transparent";
  sticky?: boolean;
  className?: string;
}

const ResponsiveHeader: React.FC<ResponsiveHeaderProps> = ({
  theme = "default",
  sticky = true,
  className = "",
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isInHero, setIsInHero] = useState<boolean>(false);

  useEffect(() => {
    const hero = document.getElementById('hero-section');
    if (!hero) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        // when hero is intersecting with viewport (mostly visible) we consider we're in hero
        setIsInHero(entry.isIntersecting && entry.intersectionRatio > 0.2);
      },
      { root: null, threshold: [0, 0.2, 0.5, 0.75, 1] }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    if (!mobileMenuOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <div
      className={
        (sticky ? "sticky top-0 z-50 w-full border-gray-200/20" : "") +
        (className ? ` ${className}` : "")
      }
      style={{ background: "transparent" }}
    >
      <div className="flex items-center justify-center w-full px-4 sm:px-8 py-4 min-h-[72px] relative">
        {/* Center - Navbar */}
        <div className="flex-grow w-full max-w-4xl">
          <Navbar theme={theme} />
        </div>
        {/* Right side - Icons and Hamburger - Positioned absolutely */}
        <div className="absolute right-4 sm:right-8 flex items-center gap-4">
          {/* Desktop Icons */}
          <div className="hidden lg:flex">
            <OverlayTriggers theme={theme} />
          </div>
          {/* Mobile Hamburger Menu */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-white/20 transition-colors flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Open mobile menu"
          >
            {mobileMenuOpen ? (
              <X className={`w-6 h-6 ${isInHero ? 'text-white' : 'text-[#1a2240]'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isInHero ? 'text-white' : 'text-[#1a2240]'}`} />
            )}
          </button>
        </div>
      </div>
      {/* Mobile Menu Overlay - Only for cart and profile icons with animation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop to close menu on click */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/20 z-40"
              onClick={() => setMobileMenuOpen(false)}
            />
            {/* Menu Content - Positioned absolutely relative to the sticky header */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="lg:hidden absolute top-full right-4 w-fit bg-transparent z-50"
            >
              <div className="py-2 flex flex-col items-center gap-4">
                <OverlayTriggers
                  theme={theme}
                  className="flex flex-col gap-4"
                  onAction={() => setMobileMenuOpen(false)}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResponsiveHeader;
