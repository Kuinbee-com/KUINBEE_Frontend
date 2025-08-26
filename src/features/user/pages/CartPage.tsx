import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../../../shared/components/ui/button";
import { Badge } from "../../../shared/components/ui/badge";
import {
  ShoppingCart, 
  Trash2, 
  CreditCard
} from 'lucide-react';

/**
 * CartOverlay Component
 * 
 * A professional shopping cart overlay with the following features:
 * - Responsive design with grid layout (2/3 cart items, 1/3 order summary)
 * - Item quantity controls with +/- buttons
 * - Remove item functionality
 * - Price calculations (subtotal, tax, total)
 * - Empty cart state with call-to-action
 * - Professional styling with gradient backgrounds and glassmorphism effects
 * - Smooth animations and hover effects
 * - Mock data for demonstration
 * 
 * Props:
 * - onClose?: () => void - Callback when user wants to close the overlay
 */

// Cart item shape — replace with real data source (redux / API) when available
interface CartItem {
  id: number;
  title: string;
  description?: string;
  category?: string;
  price: number;
  tags?: string[];
  size?: string;
  addedDate?: string;
}

interface CartOverlayProps {
  onClose?: () => void;
}

export default function CartOverlay({ onClose }: CartOverlayProps) {
  // Start with an empty cart; wire up to real cart state or API later
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price ?? 0), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-[#f8fafc]/95 via-[#f1f5f9]/98 to-[#e2e8f0]/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/50 mx-auto flex flex-col min-h-0">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl sm:rounded-3xl">
        <div className="absolute top-0 -right-40 w-96 h-96 bg-gradient-to-br from-[#1a2240]/8 via-[#24305e]/4 to-[#2c3a6b]/4 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-[#1a2240]/4 via-[#24305e]/8 to-[#2c3a6b]/4 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <div className="relative z-10 px-2 sm:px-4 lg:px-6 py-3 sm:py-4 lg:py-5 border-b border-white/30 bg-transparent flex-shrink-0">
        <div className="flex flex-col items-center gap-2 sm:gap-3 lg:flex-row lg:justify-between lg:gap-0">
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 w-full justify-center lg:justify-start lg:w-auto">
            <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-2xl bg-gradient-to-br from-[#1a2240] to-[#24305e] flex items-center justify-center shadow-lg flex-shrink-0">
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
            </div>
            <div className="text-center lg:text-left min-w-0 flex-1">
              <h1 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-black text-[#1a2240] truncate">{cartItems.length > 0 ? 'Shopping Cart' : 'Cart'}</h1>
              <p className="text-gray-600 text-xs sm:text-sm lg:text-base truncate">
                {cartItems.length > 0 ? `${cartItems.length} item${cartItems.length !== 1 ? 's' : ''} ready` : 'Your cart is empty'}
              </p>
            </div>
          </div>
          {cartItems.length > 0 && (
            <div className="text-center lg:text-right w-full lg:w-auto min-w-0">
              <div className="text-lg sm:text-xl lg:text-2xl font-black bg-gradient-to-r from-[#1a2240] to-[#24305e] bg-clip-text text-transparent truncate">
                ${total.toFixed(2)}
              </div>
              <div className="text-gray-600 font-medium text-xs sm:text-sm lg:text-sm">Total Amount</div>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 min-h-0 overflow-hidden">{cartItems.length === 0 ? (
          // Empty Cart State
          <div className="flex flex-col items-center justify-center h-full py-6 sm:py-8 lg:py-12 px-2 sm:px-3 lg:px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-xs sm:max-w-md w-full"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-2xl bg-gradient-to-br from-[#1a2240]/20 to-[#24305e]/30 flex items-center justify-center mx-auto mb-3 sm:mb-4 lg:mb-6">
                <ShoppingCart className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-[#1a2240]" />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#1a2240] mb-2 sm:mb-3 lg:mb-4">Your cart is empty</h3>
              <p className="text-gray-600 mb-3 sm:mb-4 lg:mb-6 leading-relaxed text-xs sm:text-sm lg:text-base">Discover premium datasets to add to your collection</p>
              <Button 
                onClick={onClose}
                className="bg-gradient-to-r from-[#1a2240] to-[#24305e] hover:from-[#24305e] hover:to-[#2c3a6b] text-white px-3 sm:px-4 lg:px-6 py-2 sm:py-3 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-xs sm:text-sm lg:text-base w-full sm:w-auto"
              >
                Browse Datasets
              </Button>
            </motion.div>
          </div>
        ) : (
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-6 p-2 sm:p-4 lg:p-6 h-full min-h-0 overflow-hidden">
            {/* Cart Items - Full width on mobile, 8/12 width on desktop */}
            <div className="lg:col-span-8 flex flex-col min-h-0 order-1 h-full overflow-hidden">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white/70 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl border border-white/50 flex flex-col h-full min-h-0"
              >
                <div className="px-4 lg:px-5 py-4 border-b border-gray-100/60 bg-gradient-to-r from-[#050a24]/5 to-[#1a2240]/5 flex-shrink-0">
                  <h2 className="text-base sm:text-lg lg:text-xl font-bold bg-gradient-to-r from-[#050a24] to-[#1a2240] bg-clip-text text-transparent">
                    Cart Items ({cartItems.length})
                  </h2>
                </div>
                <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin scrollbar-white divide-y divide-gray-100/60 bg-white">
                  {cartItems.map((item) => (
                    <div  
                      key={item.id}
                      className="p-4 lg:p-5 hover:bg-gradient-to-r hover:from-[#24305e]/5 hover:to-[#4e5a7e]/5 transition-all duration-300 group"
                    >
                      <div className="flex flex-col gap-3 sm:gap-4">
                        {/* Item Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-[#1a2240] text-base sm:text-lg lg:text-xl mb-2 group-hover:text-[#24305e] transition-colors leading-tight">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 text-sm sm:text-base mb-2 sm:mb-3 leading-relaxed line-clamp-2">
                            {item.description}
                          </p>
                          <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3">
                            {(item.tags ?? []).slice(0, 3).map((tag) => (
                              <Badge
                                key={tag}
                                variant="outline"
                                className="bg-gradient-to-r from-[#24305e]/10 to-[#4e5a7e]/10 text-[#1a2240] border border-[#24305e]/20 text-xs sm:text-sm px-2 sm:px-3 py-0.5 sm:py-1 font-medium"
                              >
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center gap-3 sm:gap-4 text-gray-500 text-xs sm:text-sm">
                            <span className="font-medium flex items-center gap-1">
                              📊 {item.size}
                            </span>
                            <span className="flex items-center gap-1">
                              📅 Added {item.addedDate}
                            </span>
                          </div>
                        </div>

                        {/* Price and Controls - Full width on mobile */}
                        <div className="flex items-center justify-between gap-3 pt-2 sm:pt-3 border-t border-gray-100/60 lg:border-t-0 lg:pt-0">
                          <div className="text-left">
                            <div className="font-black text-xl sm:text-2xl lg:text-xl bg-gradient-to-r from-[#1a2240] to-[#24305e] bg-clip-text text-transparent">
                              ${Number(item.price ?? 0).toFixed(2)}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-500 font-medium">One-time purchase</div>
                          </div>

                          {/* Remove Button */}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => removeItem(item.id)}
                            className="w-8 h-8 sm:w-9 sm:h-9 lg:w-8 lg:h-8 p-0 rounded-lg sm:rounded-xl border-2 border-red-300 text-red-500 hover:bg-red-50 hover:border-red-400 hover:text-red-600 transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-md flex-shrink-0"
                          >
                            <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 lg:w-4 lg:h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Order Summary - Stacks below on mobile, right on desktop */}
            <div className="lg:col-span-4 min-w-0 order-2">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="bg-white/70 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl border border-white/50 overflow-hidden lg:sticky lg:top-0"
                style={{ zIndex: 10 }}
              >
                <div className="px-3 sm:px-4 lg:px-5 py-3 sm:py-4 border-b border-gray-100/60 bg-gradient-to-r from-[#050a24]/5 to-[#1a2240]/5">
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold bg-gradient-to-r from-[#050a24] to-[#1a2240] bg-clip-text text-transparent">Order Summary</h3>
                </div>
                <div className="p-3 sm:p-4 lg:p-5 space-y-4 sm:space-y-5 lg:space-y-6">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100/50">
                      <span className="text-gray-600 font-medium text-sm sm:text-base">Subtotal</span>
                      <span className="font-bold text-[#1a2240] text-sm sm:text-base lg:text-lg">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100/50">
                      <span className="text-gray-600 font-medium text-sm sm:text-base">Tax (8%)</span>
                      <span className="font-bold text-[#1a2240] text-sm sm:text-base lg:text-lg">${tax.toFixed(2)}</span>
                    </div>
                    <div className="bg-gradient-to-r from-[#1a2240]/5 to-[#24305e]/5 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-[#1a2240]/10">
                      <div className="flex justify-between text-base sm:text-lg lg:text-xl font-black">
                        <span className="text-[#1a2240]">Total</span>
                        <span className="bg-gradient-to-r from-[#1a2240] to-[#24305e] bg-clip-text text-transparent">
                          ${total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <Button className="w-full bg-gradient-to-r from-[#24305e] via-[#4e5a7e] to-[#24305e] hover:from-[#1a2240] hover:to-[#2c3a6b] text-white px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 font-bold rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm sm:text-base lg:text-lg">
                      <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 lg:w-5 lg:h-5 mr-2" />
                      Proceed to Checkout
                    </Button>
                    <Button
                      onClick={onClose}
                      variant="outline"
                      className="w-full bg-gradient-to-r from-[#1a2240] to-[#24305e] text-white border-none hover:from-[#24305e] hover:to-[#2c3a6b] px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 font-bold rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg text-sm sm:text-base lg:text-lg"
                    >
                      Continue Shopping
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
