import * as React from 'react';
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Hero from "./landing/hero";
import CategoriesSection from "./landing/categories_section";
import ProblemsSection from "./landing/problems_section";
import SecuritySection from "./landing/security_section";
import FAQsSection from "./landing/faqs_section";
import Footer from "./landing/footer";
import ResponsiveHeader from "../components/ResponsiveHeader";

const Landing: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.state]);

  return (
    <div ref={heroRef} className="min-h-[80vh] relative  bg-gradient-to-br from-[#1a2240] via-[#1a2240] to-[#2a3454]">
      <ResponsiveHeader theme="hero" />
      <div>
        <Hero />
        <CategoriesSection />
        <ProblemsSection />
        <SecuritySection />
        <FAQsSection />
        <Footer />
      </div>
    </div>
  );
};

export default Landing;
