import React, { useState } from "react";
import { MenuItem, HoveredLink, LogoItem, ProductItem } from "@/shared/components/ui/navbar-menu";

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

  return (
    <div className={`flex justify-center space pt-4 ${className}`}>
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
  );
};

export default Navbar;
