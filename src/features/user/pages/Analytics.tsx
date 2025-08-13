"use client"

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, BarChart3, Mail, Zap, Sparkles, TrendingUp, Menu, X, ShoppingCart,User as UserIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import Navbar from "@/features/user/components/Navbar";
import { OverlayTriggers, useOverlay } from "@/features/user/components/GlobalOverlaySystem";


const AnalyticsPage: React.FC = () => {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { showCart, showProfile } = useOverlay();

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      setEmail("")
    }
  }
  
  return (
    <div className="min-h-screen relative bg-[#f7f8fa]">
      {/* Main gradient overlay */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#1a2240] via-[#ffffff] to-[#1a2240] opacity-20 pointer-events-none z-0" />
      <div className="relative z-20">
  <div className="w-full border-gray-200/20" style={{background: 'transparent'}}>
          <div className="flex items-center justify-center w-full px-4 sm:px-8 py-4 min-h-[72px] relative">
            {/* Left side intentionally left blank (no Back to Marketplace button) */}
            
            {/* Center - Navbar */}
            <div className="flex-grow w-full max-w-4xl">
              <Navbar />
            </div>
            
            {/* Right side - Icons and Hamburger - Positioned absolutely */}
            <div className="absolute right-4 sm:right-8 flex items-center gap-4">
              {/* Desktop Icons */}
              <div className="hidden lg:flex">
                <OverlayTriggers />
              </div>
              
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
            </div>
          </div>
          
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
                
                {/* Menu Content */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="lg:hidden absolute top-full right-4 w-20 bg-transparent z-50"
                  style={{ position: 'fixed', top: '72px' }}
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
        </div>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          {/* Enhanced Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 lg:mb-16"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-[#1a2240]/15 to-[#4e5a7e]/15 mb-6 sm:mb-8 shadow-2xl"
            >
              <BarChart3 className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-[#1a2240]" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-[#1a2240] via-[#4e5a7e] to-[#1a2240] bg-clip-text text-transparent leading-tight pt-8 text-center break-words sm:break-normal"
              style={{ fontFamily: 'Inter, Roboto, Arial, sans-serif', wordBreak: 'break-word' }}
            >
              Analytics Dashboard
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-base sm:text-lg lg:text-xl text-center text-[#24305e] mb-8 sm:mb-10 lg:mb-12 max-w-4xl mx-auto px-4"
            >
              Create beautiful, interactive dashboards in seconds. Transform your data into stunning visualizations with
              our AI-powered analytics platform.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 text-sm sm:text-base text-slate-500 px-4"
            >
              <div className="flex items-center gap-2 sm:gap-3 bg-white/80 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-blue-100/50 shadow-lg">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-[#4e5a7e]" />
                <span className="font-medium">AI-Powered Insights</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 bg-white/80 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-blue-100/50 shadow-lg">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-[#4e5a7e]" />
                <span className="font-medium">Real-time Dashboards</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 bg-white/80 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-blue-100/50 shadow-lg">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#4e5a7e]" />
                <span className="font-medium">One-Click Deployment</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Enhanced Waitlist Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative bg-gradient-to-br from-white/95 via-blue-50/70 to-white/95 backdrop-blur-3xl rounded-2xl sm:rounded-3xl shadow-3xl border border-blue-100/40 overflow-hidden p-6 sm:p-12 lg:p-16 xl:p-20 text-center"
          >
            {/* Enhanced decorative elements */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#1a2240] via-[#4e5a7e] to-[#1a2240] animate-pulse" />

            {/* Additional decorative corners */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#1a2240]/10 to-transparent rounded-bl-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#4e5a7e]/10 to-transparent rounded-tr-3xl" />

            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-[#1a2240]/15 to-[#4e5a7e]/15 mb-6 sm:mb-8 lg:mb-10 shadow-xl"
              >
                <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-[#1a2240]" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-2 sm:mb-4 text-[#1a2240]"
              >
                Coming Soon
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="text-sm sm:text-base lg:text-lg text-[#24305e] mb-3 sm:mb-4 max-w-4xl mx-auto leading-relaxed px-4"
              >
                Our analytics platform is being crafted to deliver enterprise-grade insights with consumer-friendly
                simplicity.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
                className="text-sm sm:text-base lg:text-lg text-[#24305e] mb-12 sm:mb-16 max-w-3xl mx-auto leading-relaxed px-4"
              >
                Join our exclusive waitlist to get early access and be among the first to experience the future of data
                visualization.
              </motion.p>

              {!isSubmitted ? (
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.6 }}
                  onSubmit={handleWaitlistSubmit}
                  className="max-w-2xl mx-auto px-4"
                >
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                    <div className="flex-1">
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-12 sm:h-14 lg:h-16 px-4 sm:px-6 lg:px-8 text-base sm:text-lg lg:text-xl rounded-xl sm:rounded-2xl border-blue-200/60 focus:border-[#1a2240] focus:ring-[#1a2240]/20 bg-white/90 backdrop-blur-sm shadow-lg font-light placeholder:text-slate-400"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="h-12 sm:h-14 lg:h-16 px-6 sm:px-8 lg:px-10 bg-gradient-to-r from-[#1a2240] via-[#4e5a7e] to-[#1a2240] hover:from-[#4e5a7e] hover:via-[#1a2240] hover:to-[#4e5a7e] text-white font-semibold rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-base sm:text-lg lg:text-xl hover:scale-105"
                    >
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mr-2 sm:mr-3" />
                      <span className="hidden sm:inline">Join Waitlist</span>
                      <span className="sm:hidden">Join</span>
                    </Button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 border border-emerald-200/60 max-w-lg mx-auto shadow-xl"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-emerald-100 mb-4 sm:mb-6">
                    <Mail className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-emerald-800 mb-3 sm:mb-4">You're on the list!</h3>
                  <p className="text-base sm:text-lg text-emerald-700">
                    We'll notify you as soon as the analytics dashboard is ready.
                  </p>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 2 }}
                className="mt-12 sm:mt-16 text-sm sm:text-base text-slate-400 space-y-2 px-4"
              >
                <p>Expected launch: Q2 2024</p>
                <p>Priority access for early subscribers • No spam, unsubscribe anytime</p>
              </motion.div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}

export default AnalyticsPage;


