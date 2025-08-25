
import React, { useEffect, useRef, useState } from "react";
import Hero from "./landing/hero";
import CategoriesSection from "./landing/categories_section";
import ProblemsSection from "./landing/problems_section";
import SecuritySection from "./landing/security_section";
import FAQsSection from "./landing/faqs_section";
import Footer from "./landing/footer";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { OverlayTriggers, useOverlay } from "../components/GlobalOverlaySystem";
import ResponsiveHeader from "../components/ResponsiveHeader";

const Landing: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [showScrollIndicator, setShowScrollIndicator] = useState(true);
    const heroRef = useRef<HTMLDivElement>(null);
  
 
    

  return (
     <div ref={heroRef} className="min-h-[80vh] relative  bg-gradient-to-br from-[#1a2240] via-[#1a2240] to-[#2a3454]">
  <ResponsiveHeader theme="hero" />
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
