"use client"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/shared/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Database, Menu, ShoppingCart, UserIcon, Users, X } from "lucide-react"
import Navbar from "@/features/user/components/Navbar";
import { OverlayTriggers, useOverlay } from "@/features/user/components/GlobalOverlaySystem";

const rotatingWords = ["AGGREGATED", "COLLECTED", "ANALYZED", "VISUALIZED", "SIMPLIFIED"]

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { showCart, showProfile } = useOverlay();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div ref={heroRef} className="min-h-[80vh] relative  bg-gradient-to-br from-[#1a2240] via-[#1a2240] to-[#2a3454]">


      {/* Decorative background elements */}
      <div className="absolute -top-4 left-0 w-full h-[600px] pointer-events-none z-10">
        {/* Primary soft glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -100 }}
          animate={{ opacity: 0.6, scale: 1, y: 0 }}
          transition={{ duration: 2.0, ease: "easeOut", delay: 0.8 }}
          className="hidden lg:block absolute top-0 left-[24%] transform -translate-x-1/2 w-[1000px] h-[700px]"
          style={{
            background: `radial-gradient(ellipse 500px 250px at 50% 0%, rgba(147, 197, 253, 0.40) 0%, rgba(191, 219, 254, 0.18) 30%, rgba(219, 234, 254, 0.000005) 80%, transparent 70%)`,
            filter: "blur(0.5px)",
          }}
        />
        {/* Secondary flowing light effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -70 }}
          animate={{ opacity: 0.6, scale: 1, y: 0 }}
          transition={{ duration: 2.0, ease: "easeOut", delay: 0.8 }}
          className="hidden lg:block absolute top-0 left-[30%] transform -translate-x-1/2 w-[750px] h-[375px]"
          style={{
            background: `radial-gradient(ellipse 375px 190px at 50% 0%, rgba(147, 197, 253, 0.25) 0%, rgba(191, 219, 254, 0.005) 90%, transparent 70%)`,
          }}
        />

        {/* Core light beam - final cascade */}
        {/* <motion.div
          initial={{ 
            opacity: 0, 
            scale: 1.2,
            y: -100,
          }}
          animate={{ 
            opacity: 0.8, 
            scale: 1,
            y: 0,
          }}
          transition={{ 
            duration: 1.5, 
            ease: "easeOut",
            delay: 1.2 // Final cascade effect
          }}
          className="absolute top-0 left-[37%] transform -translate-x-1/2 w-[500px] h-[250px]"
          style={{
            background: `radial-gradient(ellipse 250px 125px at 50% 0%, 
              rgba(147, 197, 253, 0.20) 0%, 
              rgba(191, 219, 254, 0.10) 50%, 
              transparent 70%)`,
          }}
        /> */}

        {/* Subtle pulsing ambient light - continuous after initial animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0.2, 0.3], scale: [1, 1.05, 1, 1.02] }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2.5 }}
          className="hidden md: absolute top-0 left-[32%] transform -translate-x-1/2 w-[600px] h-[300px]"
          style={{
            background: `radial-gradient(ellipse 300px 150px at 50% 0%, rgba(147, 197, 253, 0.15) 0%, rgba(191, 219, 254, 0.08) 60%, transparent 80%)`,
            filter: "blur(1px)",
          }}
        />
      </div>

      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 0, 0], y: [0, -10, 0] }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute top-20 left-30 w-48 h-64 bg-white/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -80, 0], y: [0, 60, 0] }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-white/3 rounded-full blur-3xl"
        />
      </div>

      {/* Hero Section */}
      <section className="relative z-20 pt-20 pb-32 px-6 sm:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-12"
          >
            <div className="space-y-10">
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-7xl font-semibold text-white leading-tight">
                <div className="mb-2 sm:mb-8 font-opensans tracking-tight">The World's Data </div>
                <div className="flex items-center justify-center gap-6 sm:gap-2 flex-wrap">
                  <div className="inline-block relative min-w-[280px] sm:min-w-[320px] md:min-w-[400px]">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={currentWordIndex}
                        initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                        transition={{
                          duration: 0.6,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                        className="inline-block font-semibold bg-gradient-to-r from-blue-300 via-white to-blue-300 bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient-x"
                      >
                        {rotatingWords[currentWordIndex]}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>
              </h1>
            </div>
            {/* Subheading */}
            <div className="pt-2">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed"
              >
                Kuinbee brings together scattered datasets, powerful analytics, and clear visualizations into one unified
                platform. So you can discover, understand, and act on data with speed and confidence.
              </motion.p>
            </div>
            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-4"
            >
              <Link to="/marketplace" className="w-full sm:w-auto">
                <Button
                  asChild
                  size="lg"
                  className="group bg-white text-[#1a2240] hover:bg-white/90 px-14 py-6 text-lg font-semibold rounded-2xl shadow-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 w-full sm:w-auto tracking-wide"
                >
                  <span className="flex items-center">
                    <Database className="w-5 h-5 mr-2" />
                    Browse Marketplace
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </Link>
              <Link to="/support" className="w-full sm:w-auto">
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="bg-transparent border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-14 py-6 text-lg font-semibold rounded-2xl backdrop-blur-sm transition-all duration-300 w-full sm:w-auto tracking-wide"
                >
                  <span className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Contact Us
                  </span>
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Scroll indicator - always visible at the end of the hero section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute left-1/2 bottom-0 transform -translate-x-1/2 z-30"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="flex flex-col items-center gap-2 text-white/60"
        >
          <span className="text-sm font-medium">Scroll to explore</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent"></div>
        </motion.div>
      </motion.div>
    </div>
  )
}