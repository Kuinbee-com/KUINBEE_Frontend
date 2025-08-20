import React, { useState, useEffect, createContext, useContext } from "react";
import { motion } from "framer-motion";
import UserProfile from "../pages/userProfilePage";
import CartOverlay from "../pages/CartPage";
import { ShoppingCart, User as UserIcon, X } from "lucide-react";

// Theme system for overlays (cart/profile)
type OverlayTheme = 'default' | 'hero' | 'light' | 'dark' | 'transparent';
interface OverlayThemeConfig {
  background: string;
  shadow: string;
  border: string;
  button: string;
  icon: string;
}
const overlayThemes: Record<OverlayTheme, OverlayThemeConfig> = {
  default: {
    background: 'bg-gradient-to-br from-[#1a2240]/95 via-[#4d5473]/95 to-[#1a2240]/95 backdrop-blur-xl',
    shadow: 'shadow-[0_10px_28px_rgba(26,34,64,0.18),0_0_0_1px_rgba(255,255,255,0.04)]',
    border: 'border-white/20',
    button: 'bg-gradient-to-r from-[#1a2240] via-[#4d5473] to-[#1a2240]',
    icon: 'text-white',
  },
  hero: {
    background: 'bg-gradient-to-br from-[#1a2240]/95 via-[#4d5473]/95 to-[#1a2240]/95 backdrop-blur-xl',
    shadow: 'shadow-[0_10px_28px_rgba(26,34,64,0.18),0_0_0_1px_rgba(255,255,255,0.04)]',
    border: 'border-white/20',
    button: 'bg-gradient-to-r from-[#1a2240] via-[#1a2240] to-[#1a2240]',
    icon: 'text-white',
  },
  light: {
    background: 'bg-gradient-to-br from-white/95 via-gray-50/95 to-white/95 backdrop-blur-xl',
    shadow: 'shadow-[0_10px_28px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.04)]',
    border: 'border-gray-200/50',
    button: 'bg-gradient-to-r from-white via-gray-100 to-white',
    icon: 'text-gray-900',
  },
  dark: {
    background: 'bg-gradient-to-br from-[#0f172a]/95 via-[#1e293b]/95 to-[#0f172a]/95 backdrop-blur-xl',
    shadow: 'shadow-[0_10px_28px_rgba(15,23,42,0.25),0_0_0_1px_rgba(255,255,255,0.08)]',
    border: 'border-white/10',
    button: 'bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a]',
    icon: 'text-white',
  },
  transparent: {
    background: 'bg-transparent',
    shadow: '',
    border: 'border-transparent',
    button: 'bg-transparent',
    icon: 'text-white',
  }
};

/**
 * Global Overlay Context for managing site-wide overlays
 */
interface OverlayContextType {
  showProfile: () => void;
  showCart: () => void;
  hideProfile: () => void;
  hideCart: () => void;
  isProfileOpen: boolean;
  isCartOpen: boolean;
}

const OverlayContext = createContext<OverlayContextType | undefined>(undefined);

export const useOverlay = () => {
  const context = useContext(OverlayContext);
  if (!context) {
    throw new Error("useOverlay must be used within an OverlayProvider");
  }
  return context;
};

/**
 * CloseButton Component
 * A reusable, standardized close button for overlays.
 */
const CloseButton = ({ onClick, themeConfig }: { onClick: () => void; themeConfig: OverlayThemeConfig }) => (
  <button
    className={`absolute -top-3 -right-3 z-[70] ${themeConfig.button} backdrop-blur-xl rounded-full p-2 w-10 h-10 flex items-center justify-center shadow-xl ${themeConfig.border} hover:scale-110 hover:shadow-2xl transition-all duration-300 group`}
    onClick={onClick}
    aria-label="Close"
    style={{ boxShadow: "0 8px 30px 0 rgba(0,0,0,0.15)" }}
  >
    <X className={`w-5 h-5 ${themeConfig.icon} transition-colors duration-300`} />
  </button>
);


/**
 * Global Overlay Provider Component
 */
interface OverlayProviderProps {
  children: React.ReactNode;
  theme?: OverlayTheme;
}

export const OverlayProvider: React.FC<OverlayProviderProps> = ({ children, theme = 'default' }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Track scroll position for overlay positioning
  useEffect(() => {
    const updateScrollPosition = () => {
      setScrollPosition(window.scrollY);
    };

    // Update scroll position when overlays are opened
    if (isProfileOpen || isCartOpen) {
      updateScrollPosition();
      window.addEventListener('scroll', updateScrollPosition);
    }

    return () => {
      window.removeEventListener('scroll', updateScrollPosition);
    };
  }, [isProfileOpen, isCartOpen]);

  // Listen for Escape key to close overlays
  useEffect(() => {
    if (!isProfileOpen && !isCartOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsProfileOpen(false);
        setIsCartOpen(false);
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isProfileOpen, isCartOpen]);

  // Prevent body scroll when overlay is open and maintain scroll position
  useEffect(() => {
    if (isProfileOpen || isCartOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollPosition}px`;
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "unset";
      document.body.style.position = "unset";
      document.body.style.top = "unset";
      document.body.style.width = "unset";
      window.scrollTo(0, scrollPosition);
    }
    
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.position = "unset";
      document.body.style.top = "unset";
      document.body.style.width = "unset";
    };
  }, [isProfileOpen, isCartOpen, scrollPosition]);

  const contextValue: OverlayContextType = {
    showProfile: () => {
      setScrollPosition(window.scrollY);
      setIsProfileOpen(true);
    },
    showCart: () => {
      setScrollPosition(window.scrollY);
      setIsCartOpen(true);
    },
    hideProfile: () => setIsProfileOpen(false),
    hideCart: () => setIsCartOpen(false),
    isProfileOpen,
    isCartOpen,
  };

  const themeConfig = overlayThemes[theme];

  return (
    <OverlayContext.Provider value={contextValue}>
      {children}
      
      {/* Profile Overlay */}
      {isProfileOpen && (
        <div
          className="absolute inset-0 z-[60] bg-black/30 backdrop-blur-lg overflow-y-auto"
          style={{ 
            top: scrollPosition,
            left: 0,
            right: 0,
            height: '100vh',
            width: '100vw',
            position: 'absolute'
          }}
          onClick={() => setIsProfileOpen(false)}
        >
          {/* Mobile: full screen with top alignment, Desktop: center alignment */}
          <div className="flex items-start sm:items-center justify-center min-h-full p-1 sm:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="relative w-full max-w-4xl mx-auto my-1 sm:my-auto min-h-fit max-h-[98vh] sm:max-h-[90vh]"
              onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
            >
              <motion.div
                initial={{ scale: 0.96, y: 40, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.96, y: 40, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden sm:overflow-visible"
              >
                <div className="overflow-y-auto overscroll-contain max-h-[98vh] sm:max-h-[90vh]">
                  <UserProfile />
                </div>
                <button
                  className="absolute top-1 right-1 sm:-top-2 sm:-right-2 z-[70] bg-gradient-to-br from-[#f8fafc]/90 via-[#e2e8f0]/95 to-[#f1f5f9]/90 backdrop-blur-xl rounded-full p-2 sm:p-3 shadow-xl border border-white/40 hover:scale-110 hover:shadow-2xl transition-all duration-300 group"
                  onClick={() => setIsProfileOpen(false)}
                  aria-label="Close Profile"
                  style={{ boxShadow: "0 10px 40px 0 rgba(26,34,64,0.15)" }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-5 sm:h-5 text-[#1a2240] group-hover:text-[#050a24] transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Cart Overlay */}
      {isCartOpen && (
        <div
          className="absolute inset-0 z-[60] bg-black/30 backdrop-blur-lg overflow-hidden"
          style={{ 
            top: scrollPosition,
            left: 0,
            right: 0,
            height: '100vh',
            width: '100vw',
            position: 'absolute'
          }}
          onClick={() => setIsCartOpen(false)}
        >
          {/* Mobile: full screen with top alignment, Desktop: center alignment */}
          <div className="flex items-start sm:items-center justify-center min-h-full p-1 sm:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="relative w-full max-w-6xl mx-auto my-1 sm:my-auto flex flex-col h-[98vh] sm:h-[90vh] max-h-[98vh] sm:max-h-[90vh] min-h-[60vh]"
              onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
            >
              <motion.div
                initial={{ scale: 0.96, y: 40, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.96, y: 40, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="flex flex-col h-full min-h-0"
              >
                <CartOverlay onClose={() => setIsCartOpen(false)} />
                <button
                  className="absolute top-1 right-1 sm:-top-4 sm:-right-4 z-[70] bg-gradient-to-br from-[#f8fafc]/90 via-[#e2e8f0]/95 to-[#f1f5f9]/90 backdrop-blur-xl rounded-full p-1.5 w-7 h-7 sm:p-2 sm:w-9 sm:h-9 shadow-xl border border-white/40 hover:scale-110 hover:shadow-2xl transition-all duration-300 group"
                  onClick={() => setIsCartOpen(false)}
                  aria-label="Close Cart"
                  style={{ boxShadow: "0 6px 24px 0 rgba(26,34,64,0.13)" }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 sm:w-4 sm:h-4 text-[#1a2240] group-hover:text-[#050a24] transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      )}
    </OverlayContext.Provider>
  );
}; // FIX 3: Added the missing closing brace for the OverlayProvider component.

/**
 * Global Overlay Trigger Buttons Component
 */
interface OverlayTriggersProps {
  className?: string;
  theme?: OverlayTheme;
}

export const OverlayTriggers: React.FC<OverlayTriggersProps> = ({ className = "", theme = 'default' }) => {
  const { showProfile, showCart } = useOverlay();
  const themeConfig = overlayThemes[theme];
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <button
        onClick={showCart}
        className={`w-12 h-12 rounded-full flex items-center justify-center ${themeConfig.button} shadow-lg transition-transform duration-200 hover:scale-110 hover:shadow-xl focus:outline-none`}
        aria-label="Cart"
      >
        <ShoppingCart className={`w-6 h-6 ${themeConfig.icon}`} />
      </button>
      <button
        onClick={showProfile}
        className={`w-12 h-12 rounded-full flex items-center justify-center ${themeConfig.button} shadow-lg transition-transform duration-200 hover:scale-110 hover:shadow-xl focus:outline-none`}
        aria-label="Profile"
      >
        <UserIcon className={`w-6 h-6 ${themeConfig.icon}`} />
      </button>
    </div>
  );
};