import React, { useState, useEffect } from "react";
import { MenuItem, HoveredLink, LogoItem, ProductItem } from "@/shared/components/ui/navbar-menu";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ShoppingBag, BarChart2, Users, Tag, Briefcase, LifeBuoy, Info } from "lucide-react";

interface NavbarProps {
  showCareers?: boolean;
  showSupport?: boolean;
  showAbout?: boolean;
  showProducts?: boolean;
  showCommunity?: boolean;
  showPricing?: boolean;
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({
  showCareers = true,
  showSupport = true,
  showAbout = true,
  showProducts = true,
  showCommunity = true,
  showPricing = true,
  className = "",
}) => {
  const [active, setActive] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMobileHint, setShowMobileHint] = useState(false);

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

  return (
    <>
      {/* Desktop Navbar - Hidden on mobile, shown on md and above */}
      <div className={`hidden md:flex justify-center space pt-4 ${className}`}>
        <div 
          className="relative rounded-full border border-white/20 bg-gradient-to-r from-[#050a24] via-[#4d5473] to-[#050a24] shadow-[0_10px_28px_rgba(5,10,36,0.22),0_0_0_1px_rgba(255,255,255,0.04),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md flex items-center justify-center px-10 py-4 w-full max-w-3xl text-base font-semibold tracking-wide"
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
                      src="/marketplace.png"
                      className="transition-all duration-200 hover:bg-white/5 hover:scale-[1.01] rounded-xl px-2.5 py-2.5 cursor-pointer border border-transparent hover:border-white/10"
                    />
                 
                    <ProductItem
                      title="Analytics"
                      description="Analyze your data (coming soon)"
                      href="/analytics"
                      src="/analytics.png"
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
      <div className={`md:hidden flex justify-center pt-2 ${className}`}>
        <div className="relative w-full max-w-[200px]">
          {/* Mobile Logo Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="relative rounded-full border border-white/20 bg-gradient-to-r from-[#050a24] via-[#4d5473] to-[#050a24] shadow-[0_10px_28px_rgba(5,10,36,0.22),0_0_0_1px_rgba(255,255,255,0.04),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md flex items-center justify-center px-4 py-1.5 w-full text-base font-semibold tracking-wide min-w-[120px] max-w-[190px] mx-auto"
          >
            <img
              src="./Kuinbee White Logo (For dark mode) Without BG (svg).svg"
              alt="Kuinbee Logo"
              className="w-9 h-8"
            />
            {/* Dropdown arrow removed as requested */}
          </button>

          {/* Subtle professional hint for mobile users */}
          <AnimatePresence>
            {showMobileHint && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 1.0, ease: "easeOut" }}
                className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 z-50 pointer-events-none"
              >
               <div className="bg-gradient-to-r from-[#1a2240] to-[#24305e] text-white text-xs px-4 py-2 rounded-xl shadow-lg backdrop-blur-md border border-white/20">
                  <div className="text-center font-normal">
                    Tap logo to open menu
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile Dropdown Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute top-full left-0 right-0 mt-2 z-50"
                style={{ width: '100%' }}
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
      </div>
    </>
  );
};

export default Navbar;
