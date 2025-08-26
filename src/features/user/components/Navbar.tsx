import * as React from 'react';
import { useState, useEffect, useRef } from "react";
import { MenuItem, HoveredLink, LogoItem, ProductItem } from "@/shared/components/ui/navbar-menu";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ShoppingBag, BarChart2, Users, Tag, Briefcase, LifeBuoy, Info, MoreVertical } from "lucide-react";

// Theme variants for different pages
type NavbarTheme = 'default' | 'hero' | 'light' | 'dark' | 'transparent';

/**
 * Dynamic Background System for Navbar
 * 
 * Usage Examples:
 * - Default theme: <Navbar theme="default" />
 * - Hero/Landing page: <Navbar theme="hero" />
 * - Light pages: <Navbar theme="light" />
 * - Dark pages: <Navbar theme="dark" />
 * - Transparent: <Navbar theme="transparent" />
 * 
 * The theme system automatically applies:
 * - Background gradients
 * - Border colors
 * - Shadow effects
 * - Text colors (for future implementation)
 */

interface NavbarThemeConfig {
  background: string;
  shadow: string;
  border: string;
  textColor: string;
  textColorSecondary: string;
}

const navbarThemes: Record<NavbarTheme, NavbarThemeConfig> = {
  default: {
    background: 'bg-gradient-to-r from-[#050a24] via-[#4d5473] to-[#050a24]',
    shadow: 'shadow-[0_10px_28px_rgba(26,34,64,0.22),0_0_0_1px_rgba(255,255,255,0.04),inset_0_1px_0_rgba(255,255,255,0.08)]',
    border: 'border-white/20',
    textColor: 'text-white',
    textColorSecondary: 'text-white/90'
  },
  hero: {
    background: 'bg-gradient-to-r from-[#1a2240] via-[#4e5a7e] to-[#1a2240]',
    shadow: 'shadow-[0_10px_28px_rgba(26,34,64,0.22),0_0_0_1px_rgba(255,255,255,0.04),inset_0_1px_0_rgba(255,255,255,0.08)]',
    border: 'border-white/20',
    textColor: 'text-white',
    textColorSecondary: 'text-white/90'
  },
  light: {
    background: 'bg-gradient-to-r from-white/95 via-gray-50/95 to-white/95',
    shadow: 'shadow-[0_10px_28px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.9)]',
    border: 'border-gray-200/50',
    textColor: 'text-gray-900',
    textColorSecondary: 'text-gray-700'
  },
  dark: {
    background: 'bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a]',
    shadow: 'shadow-[0_10px_28px_rgba(15,23,42,0.4),0_0_0_1px_rgba(255,255,255,0.1),inset_0_1px_0_rgba(255,255,255,0.05)]',
    border: 'border-white/10',
    textColor: 'text-white',
    textColorSecondary: 'text-white/80'
  },
  transparent: {
    background: 'bg-transparent',
    shadow: '',
    border: 'border-transparent',
    textColor: 'text-white',
    textColorSecondary: 'text-white/90'
  }
};

interface NavbarProps {
  showCareers?: boolean;
  showSupport?: boolean;
  showAbout?: boolean;
  showProducts?: boolean;
  showCommunity?: boolean;
  showPricing?: boolean;
  className?: string;
  theme?: NavbarTheme;
}

const Navbar: React.FC<NavbarProps> = ({
  showCareers = true,
  showSupport = true,
  showAbout = true,
  showProducts = true,
  showCommunity = true,
  showPricing = true,
  className = "",
  theme = "default",
}) => {
  const [active, setActive] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMobileHint, setShowMobileHint] = useState(false);
  const [isInHero, setIsInHero] = useState<boolean>(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close mobile menu on click outside
  useEffect(() => {
    if (!mobileMenuOpen) return;
    function handleClick(e: MouseEvent) {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(e.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [mobileMenuOpen]);

  // Show hint on mobile on first visit
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const hasSeenHint = localStorage.getItem('kuinbee-mobile-hint-seen');
    
    if (isMobile && !hasSeenHint) {
      setShowMobileHint(true);
      // Hide the hint after 3 seconds
      const timer = setTimeout(() => {
        setShowMobileHint(false);
        localStorage.setItem('kuinbee-mobile-hint-seen', 'true');
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  // Observe hero section visibility to switch icon colors on mobile
  useEffect(() => {
    const hero = document.getElementById('hero-section');
    if (!hero) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsInHero(entry.isIntersecting && entry.intersectionRatio > 0.2);
      },
      { root: null, threshold: [0, 0.2, 0.5, 0.75, 1] }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  // Get current theme configuration
  const themeConfig = navbarThemes[theme];
  
  // Build dynamic classes for navbar
  const navbarClasses = `relative rounded-full border ${themeConfig.border} ${themeConfig.background} ${themeConfig.shadow} backdrop-blur-md flex items-center justify-center px-10 py-4 w-full max-w-3xl text-base font-semibold tracking-wide`;
  const mobileNavbarClasses = `relative rounded-full border ${themeConfig.border} ${themeConfig.background} ${themeConfig.shadow} backdrop-blur-md flex items-center justify-center px-4 py-1.5 text-base font-semibold tracking-wide min-w-[120px] max-w-[190px]`;

  return (
    <>
      {/* Desktop Navbar - Hidden on mobile, shown on md and above */}
      <div className={`hidden md:flex justify-center space pt-4 ${className}`}>
        <div 
          className={navbarClasses}
          onMouseLeave={() => setActive("")}
        >
          
          {/* Left side navigation - products dropdown, community, pricing */}
          <div className="flex items-center space-x-4 flex-1 justify-start relative z-10">
            {showProducts && (
              <div className="group transform hover:scale-105 hover:-translate-y-1 transition-all duration-200 ease-out relative">
                <div className="absolute inset-0 bg-blue-400/20 rounded-lg blur-lg opacity-90 group-hover:opacity-40 transition-opacity duration-200 pointer-events-none"></div>
                <MenuItem setActive={setActive} active={active} item="Products">
                  <div className="flex flex-col space-y-2 p-5 min-w-[360px] bg-gradient-to-br from-[#1a2240]/95 via-[#4d5473]/95 to-[#1a2240]/95 rounded-2xl shadow-[0_10px_28px_rgba(5,10,36,0.4),0_0_0_1px_rgba(255,255,255,0.06),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md border border-white/10">
                    <ProductItem
                      title="Marketplace"
                      description="Browse and buy datasets"
                      href="/marketplace"
                      src="/marketplace.webp"
                      className="transition-all duration-200 hover:bg-white/5 hover:scale-[1.01] rounded-xl px-2.5 py-2.5 cursor-pointer border border-transparent hover:border-white/10"
                    />
                 
                    <ProductItem
                      title="Analytics"
                      description="Analyze your data (coming soon)"
                      href="/analytics"
                      src="/analytics.webp"
                      className="transition-all duration-200 hover:bg-white/5 hover:scale-[1.01] rounded-xl px-2.5 py-2.5 cursor-pointer border border-transparent hover:border-white/10"
                    />
                  </div>
                </MenuItem>
              </div>
            )}
            {showCommunity && (
              <div 
                className="group transform hover:scale-105 hover:-translate-y-1 transition-all duration-200 ease-out relative"
                onMouseEnter={() => setActive("")}
              >
                <div className="absolute inset-0 bg-cyan-400/20 rounded-lg blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-200 pointer-events-none"></div>
                <HoveredLink href="/community" className="relative">Community</HoveredLink>
              </div>
            )}
            {showPricing && (
              <div 
                className="group transform hover:scale-105 hover:-translate-y-1 transition-all duration-200 ease-out relative"
                onMouseEnter={() => setActive("")}
              >
                <div className="absolute inset-0 bg-purple-400/20 rounded-lg blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-200 pointer-events-none"></div>
                <HoveredLink href="/pricing" className="relative">Pricing</HoveredLink>
              </div>
            )}
          </div>

          {/* Center logo - absolutely centered */}
          <div 
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-20"
            onMouseEnter={() => setActive("")}
          >
            <LogoItem 
              src="./Kuinbee White Logo (For dark mode) Without BG (svg).svg"
              alt="Kuinbee White Logo"
              href="/"
              className="w-14 h-14"
            />
          </div>

          {/* Right side navigation - careers, support, about */}
          <div className="flex items-center space-x-4 flex-1 justify-end relative z-10">
            {showCareers && (
              <div 
                className="group transform hover:scale-105 hover:-translate-y-1 transition-all duration-200 ease-out relative"
                onMouseEnter={() => setActive("")}
              >
                <div className="absolute inset-0 bg-emerald-400/20 rounded-lg blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-200 pointer-events-none"></div>
                <HoveredLink href="/careers" className="relative">Careers</HoveredLink>
              </div>
            )}
            {showSupport && (
              <div 
                className="group transform hover:scale-105 hover:-translate-y-1 transition-all duration-200 ease-out relative"
                onMouseEnter={() => setActive("")}
              >
                <div className="absolute inset-0 bg-orange-400/20 rounded-lg blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-200 pointer-events-none"></div>
                <HoveredLink href="/support" className="relative">Support</HoveredLink>
              </div>
            )}
            {showAbout && (
              <div 
                className="group transform hover:scale-105 hover:-translate-y-1 transition-all duration-200 ease-out relative"
                onMouseEnter={() => setActive("")}
              >
                <div className="absolute inset-0 bg-violet-400/20 rounded-lg blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-200 pointer-events-none"></div>
                <HoveredLink href="/about" className="relative">About</HoveredLink>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navbar - Only visible on small screens */}
      <div className={`md:hidden flex items-center pt-2 px-4 w-full ${className}`}>
        {/* Mobile Menu Icon Button (extreme left) */}
          <button
          ref={menuButtonRef}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex items-center justify-center w-9 h-9 focus:outline-none z-20"
          aria-label="Open navigation menu"
          style={{ background: 'none', border: 'none', boxShadow: 'none' }}
        >
          <MoreVertical className={`w-6 h-6 ${isInHero ? 'text-white' : 'text-[#1a2240]'}`} />
        </button>
        
        {/* Centered Mobile Logo Button */}
        <div className="flex-1 flex justify-center">
          <a
            href="/"
            className={mobileNavbarClasses}
            tabIndex={0}
          >
            <img
              src="./Kuinbee White Logo (For dark mode) Without BG (svg).svg"
              alt="Kuinbee Logo"
              className="w-9 h-8"
            />
          </a>
        </div>
        
        {/* Right spacer to balance the layout */}
        <div className="w-9 h-9"></div>
        

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              ref={mobileMenuRef}
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-full left-4 right-4 mt-2 z-50"
            >
              <div
                className="rounded-2xl border border-white/20 bg-gradient-to-br from-[#1a2240]/95 via-[#4d5473]/95 to-[#1a2240]/95 shadow-[0_10px 28px_rgba(5,10,36,0.4),0_0_0_1px_rgba(255,255,255,0.06),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md overflow-hidden"
                style={{ width: '100%', minWidth: '100%', maxHeight: '60vh', overflowY: 'auto' }}
              >
                <div className="p-2 space-y-1 w-full">
                  {/* Marketplace */}
                  {showProducts && (
                    <a
                      href="/marketplace"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 font-medium w-full"
                    >
                      <ShoppingBag className="w-5 h-5" />
                      Marketplace
                    </a>
                  )}

                  {/* Analytics */}
                  {showProducts && (
                    <a
                      href="/analytics"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 font-medium w-full"
                    >
                      <BarChart2 className="w-5 h-5" />
                      Analytics
                    </a>
                  )}

                  {/* Community */}
                  {showCommunity && (
                    <a
                      href="/community"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 font-medium w-full"
                    >
                      <Users className="w-5 h-5" />
                      Community
                    </a>
                  )}

                  {/* Pricing */}
                  {showPricing && (
                    <a
                      href="/pricing"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 font-medium w-full"
                    >
                      <Tag className="w-5 h-5" />
                      Pricing
                    </a>
                  )}

                  {/* Careers */}
                  {showCareers && (
                    <a
                      href="/careers"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 font-medium w-full"
                    >
                      <Briefcase className="w-5 h-5" />
                      Careers
                    </a>
                  )}

                  {/* Support */}
                  {showSupport && (
                    <a
                      href="/support"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 font-medium w-full"
                    >
                      <LifeBuoy className="w-5 h-5" />
                      Support
                    </a>
                  )}

                  {/* About */}
                  {showAbout && (
                    <a
                      href="/about"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 font-medium w-full"
                    >
                      <Info className="w-5 h-5" />
                      About
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Navbar;
