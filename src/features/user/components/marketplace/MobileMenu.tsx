import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, User as UserIcon, X, Menu } from 'lucide-react';

interface MobileMenuProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  showCart: () => void;
  showProfile: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  mobileMenuOpen,
  setMobileMenuOpen,
  showCart,
  showProfile,
}) => {
  return (
    <>
      {/* Mobile Hamburger Menu */}
      <button 
        className="lg:hidden p-2 rounded-lg hover:bg-white/20 transition-colors flex items-center justify-center"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? (
          <X className="w-6 h-6 text-[#1a2240]" />
        ) : (
          <Menu className="w-6 h-6 text-[#1a2240]" />
        )}
      </button>

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
                  className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-[#1a2240] via-[#4d5473] to-[#1a2240] shadow-lg transition-transform duration-200 hover:scale-110 hover:shadow-xl focus:outline-none"
                  aria-label="Cart"
                >
                  <ShoppingCart className="w-6 h-6 text-white transition-colors duration-200 hover:text-[#10b981]" />
                </button>
                <button
                  onClick={() => {
                    showProfile();
                    setMobileMenuOpen(false);
                  }}
                  className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-[#1a2240] via-[#4d5473] to-[#1a2240] shadow-lg transition-transform duration-200 hover:scale-110 hover:shadow-xl focus:outline-none"
                  aria-label="Profile"
                >
                  <UserIcon className="w-6 h-6 text-white transition-colors duration-200 hover:text-[#3b82f6]" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileMenu;
