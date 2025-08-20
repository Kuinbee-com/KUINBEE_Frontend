
import React, { useEffect, useRef, useState } from "react";
import Hero from "./landing/hero";
import CategoriesSection from "./landing/categories_section";
import ProblemsSection from "./landing/problems_section";
import SecuritySection from "./landing/security_section";
import FAQsSection from "./landing/faqs_section";
import Footer from "./landing/footer";
import { AnimatePresence, motion } from "motion/react";
import { Menu, ShoppingCart, UserIcon, X } from "lucide-react";
import { OverlayTriggers, useOverlay } from "../components/GlobalOverlaySystem";
import Navbar from "../components/Navbar";

const Landing: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { showCart, showProfile } = useOverlay();
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [showScrollIndicator, setShowScrollIndicator] = useState(true);
    const heroRef = useRef<HTMLDivElement>(null);
  
 
    

  return (
     <div ref={heroRef} className="min-h-[80vh] relative  bg-gradient-to-br from-[#1a2240] via-[#1a2240] to-[#2a3454]">
      <div className="sticky top-0 z-50 w-full border-gray-200/20" style={{ background: 'transparent' }}>
        <div className="flex items-center justify-center w-full px-4 sm:px-8 py-4 min-h-[72px] relative">
          {/* Center - Navbar */}
          <div className="flex-grow w-full max-w-4xl">
            <Navbar theme="hero" />
          </div>
          {/* Right side - Icons and Hamburger - Positioned absolutely */}
          <div className="absolute right-4 sm:right-8 flex items-center gap-4">
            {/* Desktop Icons */}
            <div className="hidden lg:flex">
              <OverlayTriggers theme="hero" />
            </div>
            {/* Mobile Hamburger Menu */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-white/20 transition-colors flex items-center justify-center"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
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
              {/* Sticky Menu Content */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="lg:hidden sticky top-[72px] right-4 w-20 bg-transparent z-50 ml-auto"
                style={{ position: 'sticky' }}
              >
                <div className="py-2 flex flex-col items-center gap-4">
                  <button
                    onClick={() => {
                      showCart();
                      setMobileMenuOpen(false);
                    }}
                    className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-[#1a2240] via-[#1a2240] to-[#1a2240] shadow-lg transition-transform duration-200 hover:scale-110 hover:shadow-xl focus:outline-none"
                    aria-label="Cart"
                  >
                    <ShoppingCart className="w-6 h-6 text-white transition-colors duration-200 hover:text-[#10b981]" />
                  </button>
                  <button
                    onClick={() => {
                      showProfile();
                      setMobileMenuOpen(false);
                    }}
                    className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-[#1a2240] via-[#1a2240] to-[#1a2240] shadow-lg transition-transform duration-200 hover:scale-110 hover:shadow-xl focus:outline-none"
                    aria-label="Profile"
                  >
                    <UserIcon className="w-6 h-6 text-white transition-colors duration-200 hover:text-[#3b82f6]" />
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
      <div>
        <Hero />
        <CategoriesSection />
        <ProblemsSection />
        <SecuritySection />
      <FAQsSection />
      <Footer /></div>

    </div>
  );
};

export default Landing;
