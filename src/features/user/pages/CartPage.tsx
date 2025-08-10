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

const mockCartItems = [
  {
    id: 1,
    title: "E-commerce Sales Data 2024",
    description: "Comprehensive sales data from major e-commerce platforms including transaction details, customer demographics, and product categories.",
    category: "Sales",
    price: 299,
    tags: ["ecommerce", "sales", "analytics"],
    size: "2.5 GB",
    addedDate: "2024-07-15",
  },
  {
    id: 3,
    title: "Social Media Sentiment Analysis",
    description: "Curated social media posts with sentiment labels for machine learning and natural language processing applications.",
    category: "Social Media",
    price: 149,
    tags: ["sentiment", "nlp", "social-media"],
    size: "890 MB",
    addedDate: "2024-07-28",
  },
  {
    id: 5,
    title: "Financial Transactions Dataset",
    description: "Detailed financial transactions from multiple institutions for fraud detection and financial modeling.",
    category: "Finance",
    price: 249,
    tags: ["finance", "transactions", "fraud"],
    size: "2.1 GB",
    addedDate: "2024-07-18",
  },
];

interface CartOverlayProps {
  onClose?: () => void;
}

export default function CartOverlay({ onClose }: CartOverlayProps) {
  const [cartItems, setCartItems] = useState(mockCartItems);

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className="relative w-full h-full max-h-[90vh] overflow-hidden bg-gradient-to-br from-[#f8fafc]/95 via-[#f1f5f9]/98 to-[#e2e8f0]/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <div className="absolute top-0 -right-40 w-96 h-96 bg-gradient-to-br from-[#1a2240]/8 via-[#24305e]/4 to-[#2c3a6b]/4 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-[#1a2240]/4 via-[#24305e]/8 to-[#2c3a6b]/4 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <div className="relative z-10 px-8 py-6 border-b border-white/30 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1a2240] to-[#24305e] flex items-center justify-center shadow-lg">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-[#1a2240]">Shopping Cart</h1>
              <p className="text-gray-600">
                {cartItems.length > 0 ? `${cartItems.length} items ready for checkout` : 'Your cart is empty'}
              </p>
            </div>
          </div>
          {cartItems.length > 0 && (
            <div className="text-right">
              <div className="text-2xl font-black bg-gradient-to-r from-[#1a2240] to-[#24305e] bg-clip-text text-transparent">
                ${total.toFixed(2)}
              </div>
              <div className="text-gray-600 font-medium text-sm">Total Amount</div>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 overflow-hidden">
        {cartItems.length === 0 ? (
          // Empty Cart State
          <div className="flex flex-col items-center justify-center h-full py-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-md"
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#1a2240]/20 to-[#24305e]/30 flex items-center justify-center mx-auto mb-6">
                <ShoppingCart className="w-10 h-10 text-[#1a2240]" />
              </div>
              <h3 className="text-2xl font-bold text-[#1a2240] mb-3">Your cart is empty</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">Discover premium datasets to add to your collection</p>
              <Button 
                onClick={onClose}
                className="bg-gradient-to-r from-[#1a2240] to-[#24305e] hover:from-[#24305e] hover:to-[#2c3a6b] text-white px-6 py-3 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Browse Datasets
              </Button>
            </motion.div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 h-full">
            {/* Cart Items - Takes 2/3 of the width */}
            <div className="lg:col-span-2 flex flex-col h-full">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 overflow-hidden flex flex-col h-full"
              >
                <div className="px-6 py-5 border-b border-gray-100/60 bg-gradient-to-r from-[#050a24]/5 to-[#1a2240]/5">
                  <h2 className="text-xl font-bold bg-gradient-to-r from-[#050a24] to-[#1a2240] bg-clip-text text-transparent">
                    Cart Items ({cartItems.length})
                  </h2>
                </div>
                <div className="flex-1 overflow-y-auto divide-y divide-gray-100/60">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-6 hover:bg-gradient-to-r hover:from-[#24305e]/5 hover:to-[#4e5a7e]/5 transition-all duration-300 group border-b border-gray-50/80"
                    >
                      <div className="flex items-start justify-between gap-6">
                        {/* Item Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-[#1a2240] text-lg mb-3 group-hover:text-[#24305e] transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
                            {item.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {item.tags.slice(0, 3).map((tag) => (
                              <Badge
                                key={tag}
                                variant="outline"
                                className="bg-gradient-to-r from-[#24305e]/10 to-[#4e5a7e]/10 text-[#1a2240] border border-[#24305e]/20 text-xs px-3 py-1 font-medium"
                              >
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center gap-4 text-gray-500 text-sm">
                            <span className="font-medium flex items-center gap-1">
                              📊 {item.size}
                            </span>
                            <span className="flex items-center gap-1">
                              📅 Added {item.addedDate}
                            </span>
                          </div>
                        </div>

                        {/* Price and Controls */}
                        <div className="flex flex-col items-end gap-4 flex-shrink-0">
                          <div className="text-right">
                            <div className="font-black text-2xl bg-gradient-to-r from-[#1a2240] to-[#24305e] bg-clip-text text-transparent">
                              ${item.price.toFixed(2)}
                            </div>
                            <div className="text-xs text-gray-500 font-medium">One-time purchase</div>
                          </div>

                          {/* Remove Button */}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => removeItem(item.id)}
                            className="w-8 h-8 p-0 rounded-xl border-2 border-red-300 text-red-500 hover:bg-red-50 hover:border-red-400 hover:text-red-600 transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-md"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Order Summary - Takes 1/3 of the width */}
            <div className="lg:col-span-1">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 overflow-hidden sticky top-0"
              >
                <div className="px-6 py-5 border-b border-gray-100/60 bg-gradient-to-r from-[#050a24]/5 to-[#1a2240]/5">
                  <h3 className="text-xl font-bold bg-gradient-to-r from-[#050a24] to-[#1a2240] bg-clip-text text-transparent">Order Summary</h3>
                </div>
                                      
                <div className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100/50">
                      <span className="text-gray-600 font-medium">Subtotal</span>
                      <span className="font-bold text-[#1a2240] text-lg">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100/50">
                      <span className="text-gray-600 font-medium">Tax (8%)</span>
                      <span className="font-bold text-[#1a2240] text-lg">${tax.toFixed(2)}</span>
                    </div>
                    <div className="bg-gradient-to-r from-[#1a2240]/5 to-[#24305e]/5 rounded-xl p-4 border border-[#1a2240]/10">
                      <div className="flex justify-between text-xl font-black">
                        <span className="text-[#1a2240]">Total</span>
                        <span className="bg-gradient-to-r from-[#1a2240] to-[#24305e] bg-clip-text text-transparent">
                          ${total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Button className="w-full bg-gradient-to-r from-[#24305e] via-[#4e5a7e] to-[#24305e] hover:from-[#1a2240] hover:to-[#2c3a6b] text-white px-6 py-4 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                      <CreditCard className="w-5 h-5 mr-3" />
                      Proceed to Checkout
                    </Button>
                                                  
                    <Button
                      onClick={onClose}
                      variant="outline"
                      className="w-full bg-gradient-to-r from-[#1a2240] to-[#24305e] text-white border-none hover:from-[#24305e] hover:to-[#2c3a6b] px-6 py-4 font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
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
