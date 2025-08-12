import React, { useState, useEffect, createContext, useContext } from "react";
import { motion } from "framer-motion";
import UserProfile from "../pages/userProfilePage";
import CartOverlay from "../pages/CartPage";
import { ShoppingCart, User as UserIcon } from "lucide-react";

/**
 * Global Overlay Context for managing site-wide overlays
 * This allows any component to trigger profile or cart overlays from anywhere in the app
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
 * Global Overlay Provider Component
 * 
 * This component provides overlay functionality throughout the entire application.
 * It manages the state for profile and cart overlays and provides methods to show/hide them.
 * 
 * Features:
 * - Global state management for overlays
 * - Escape key to close overlays
 * - Click outside to close overlays
 * - Smooth animations using Framer Motion
 * - Professional close buttons with hover effects
 * - Can be triggered from any component in the app
 */
export const OverlayProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

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

  // Prevent body scroll when overlay is open
  useEffect(() => {
    if (isProfileOpen || isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isProfileOpen, isCartOpen]);

  const contextValue: OverlayContextType = {
    showProfile: () => setIsProfileOpen(true),
    showCart: () => setIsCartOpen(true),
    hideProfile: () => setIsProfileOpen(false),
    hideCart: () => setIsCartOpen(false),
    isProfileOpen,
    isCartOpen,
  };

  return (
    <OverlayContext.Provider value={contextValue}>
      {children}
      
      {/* Profile Overlay */}
      {isProfileOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-start justify-center bg-black/30 backdrop-blur-lg pt-16 pb-8 overflow-y-auto"
          onClick={() => setIsProfileOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="relative w-full max-w-4xl mx-auto px-4 min-h-fit"
            onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
          >
            <motion.div
              initial={{ scale: 0.96, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.96, y: 40, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              <UserProfile />
              <button
                className="absolute -top-6 -right-2 z-[70] bg-gradient-to-br from-[#f8fafc]/90 via-[#e2e8f0]/95 to-[#f1f5f9]/90 backdrop-blur-xl rounded-full p-3 shadow-xl border border-white/40 hover:scale-110 hover:shadow-2xl transition-all duration-300 group"
                onClick={() => setIsProfileOpen(false)}
                aria-label="Close Profile"
                style={{ boxShadow: "0 10px 40px 0 rgba(26,34,64,0.15)" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#1a2240] group-hover:text-[#050a24] transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        </div>
      )}

      {/* Cart Overlay */}
      {isCartOpen && (
        <div
          className="fixed inset-0 z-[60] flex flex-col items-start justify-center bg-black/30 backdrop-blur-lg pt-8 pb-8 overflow-y-hidden min-h-0 h-screen"
          onClick={() => setIsCartOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="relative w-full max-w-6xl mx-auto flex flex-col h-full min-h-0 px-4"
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
                className="absolute -top-6 -right-2 z-[70] bg-gradient-to-br from-[#f8fafc]/90 via-[#e2e8f0]/95 to-[#f1f5f9]/90 backdrop-blur-xl rounded-full p-3 shadow-xl border border-white/40 hover:scale-110 hover:shadow-2xl transition-all duration-300 group"
                onClick={() => setIsCartOpen(false)}
                aria-label="Close Cart"
                style={{ boxShadow: "0 10px 40px 0 rgba(26,34,64,0.15)" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#1a2240] group-hover:text-[#050a24] transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        </div>
      )}
    </OverlayContext.Provider>
  );
};

/**
 * Global Overlay Trigger Buttons Component
 * 
 * This component provides the standard cart and profile buttons that can be used
 * in any component to trigger the global overlays.
 */
interface OverlayTriggersProps {
  className?: string;
}

export const OverlayTriggers: React.FC<OverlayTriggersProps> = ({ className = "" }) => {
  const { showProfile, showCart } = useOverlay();

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <button
        onClick={showCart}
        className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-[#1a2240] via-[#4d5473] to-[#1a2240] shadow-lg transition-transform duration-200 hover:scale-110 hover:shadow-xl focus:outline-none"
        aria-label="Cart"
      >
        <ShoppingCart className="w-6 h-6 text-white transition-colors duration-200 hover:text-[#10b981]" />
      </button>
      <button
        onClick={showProfile}
        className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-[#1a2240] via-[#4d5473] to-[#1a2240] shadow-lg transition-transform duration-200 hover:scale-110 hover:shadow-xl focus:outline-none"
        aria-label="Profile"
      >
        <UserIcon className="w-6 h-6 text-white transition-colors duration-200 hover:text-[#3b82f6]" />
      </button>
    </div>
  );
};
