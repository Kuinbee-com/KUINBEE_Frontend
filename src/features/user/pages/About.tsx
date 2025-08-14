"use client"
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/features/user/components/Navbar";
import { OverlayTriggers, useOverlay } from "@/features/user/components/GlobalOverlaySystem";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ShoppingCart,
  User as UserIcon,
  Target,
  Globe,
  Database,
  Zap,
  Users,
  Award,
  TrendingUp,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

// AboutNavbarLayout: shared navigation/overlay system for About page


export default function AboutPageComponent() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { showCart, showProfile } = useOverlay();
  return (
    <div className="min-h-screen relative overflow-hidden bg-white">
    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#1a2240] via-[#ffffff] to-[#1a2240] opacity-20 pointer-events-none z-0" />
      <div className="relative z-20">
        <div className="sticky top-0 z-50 w-full  border-gray-200/20" style={{background: 'transparent'}}>
          <div className="flex items-center justify-center w-full px-4 sm:px-8 py-4 min-h-[72px] relative">
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

  <section className="relative pt-12 md:pt-16 lg:pt-20 pb-16 md:pb-20 lg:pb-32 overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="space-y-6 md:space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a2240]/5 rounded-full border border-[#1a2240]/10"
              >
                <div className="w-2 h-2 bg-[#1a2240] rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-[#1a2240]">Making Data Accessible</span>
              </motion.div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-[#1a2240] leading-tight">
                With good data and the right access,{" "}
                <motion.span
                  className="font-medium bg-gradient-to-r from-[#1a2240] via-[#4e5a7e] to-[#1a2240] bg-clip-text text-transparent bg-size-200 animate-gradient"
                  initial={{ backgroundPosition: "0% 50%" }}
                  animate={{ backgroundPosition: "100% 50%" }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                >
                  people can change the world
                </motion.span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg md:text-xl text-slate-600 max-w-3xl leading-relaxed"
              >
                When we looked at the way data was being accessed and used, we saw bottlenecks everywhere. That's why we
                founded Kuinbee - to deliver trusted, ready-to-use data instantly while giving users the flexibility to
                request exactly what they need.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
              >
                <Link
                  to="/pricing"
                  className="group bg-[#1a2240] text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-medium hover:bg-[#4e5a7e] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 w-full sm:w-auto text-center"
                >
                  Get Started
                  <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
                </Link>
                <Link
                  to="/community"
                  className="text-[#1a2240] hover:text-[#4e5a7e] font-medium transition-colors duration-200 w-full sm:w-auto text-center sm:text-left"
                >
                  Join Our Community
                </Link>
              </motion.div>

              {/* Scroll hint */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
              >
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  className="flex flex-col items-center gap-2 text-[#1a2240]/60"
                >
                  <span className="text-sm font-medium">Scroll to explore</span>
                  <div className="w-px h-8 bg-gradient-to-b from-[#1a2240]/60 to-transparent"></div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-slate-50/50 relative">
          {/* Connecting line from previous section */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-8 bg-gradient-to-b from-transparent to-[#1a2240]/20"></div>
          
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-8 md:mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-light text-[#1a2240] mb-2">Trusted by thousands</h2>
              <p className="text-slate-600 text-sm md:text-base">Real numbers, real impact</p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {[
                { number: "10K+", label: "Datasets Available", icon: Database },
                { number: "500+", label: "Happy Clients", icon: Users },
                { number: "99.9%", label: "Uptime Guarantee", icon: Award },
                { number: "24/7", label: "Expert Support", icon: TrendingUp },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center group cursor-pointer"
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-xl md:rounded-2xl shadow-sm border border-slate-200/50 flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                    <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-[#1a2240]" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-[#1a2240] mb-1 md:mb-2">{stat.number}</div>
                  <div className="text-slate-600 font-medium text-sm md:text-base">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-slate-50/50 relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-6 md:space-y-8 order-2 lg:order-1"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-[#1a2240] to-[#4e5a7e] rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg">
                    <Target className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-[#1a2240] to-transparent rounded-full"></div>
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#1a2240] leading-tight">The bottlenecks we saw</h2>

                <div className="space-y-4 md:space-y-6 text-slate-600 leading-relaxed text-base md:text-lg">
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="relative pl-6"
                  >
                    <span className="absolute left-0 top-2 w-2 h-2 bg-[#1a2240] rounded-full"></span>
                    Public data was scattered across thousands of sources. Custom data collection was slow, expensive,
                    and inconsistent.
                  </motion.p>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="relative pl-6"
                  >
                    <span className="absolute left-0 top-2 w-2 h-2 bg-[#4e5a7e] rounded-full"></span>
                    Businesses, researchers, and governments had to choose between buying outdated datasets or building
                    their own from scratch - a process that often took weeks or months.
                  </motion.p>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="relative pl-6"
                  >
                    <span className="absolute left-0 top-2 w-2 h-2 bg-[#1a2240] rounded-full"></span>
                    Complex tools required advanced technical skills just to ask a simple question. Valuable data was
                    locked behind paywalls, silos, and outdated processes.
                  </motion.p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative order-1 lg:order-2"
              >
                <div className="bg-white rounded-2xl md:rounded-3xl p-8 md:p-12 shadow-xl border border-slate-200/50 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-[#1a2240]/10 to-transparent rounded-full blur-2xl"></div>
                  <div className="relative z-10 text-center space-y-6 md:space-y-8">
                    <motion.div 
                      initial={{ scale: 0.8 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      viewport={{ once: true }}
                      className="space-y-2"
                    >
                      <div className="text-4xl md:text-5xl lg:text-6xl font-light text-[#1a2240]">Weeks</div>
                      <div className="text-slate-600 font-medium text-sm md:text-base">to get basic data insights</div>
                    </motion.div>

                    <div className="relative">
                      <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4">
                        <motion.div 
                          whileInView={{ rotate: 360 }}
                          transition={{ duration: 1, delay: 0.6 }}
                          viewport={{ once: true }}
                          className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-[#1a2240] to-[#4e5a7e] rounded-full flex items-center justify-center"
                        >
                          <Zap className="w-3 h-3 md:w-4 md:h-4 text-white" />
                        </motion.div>
                      </div>
                    </div>

                    <motion.div 
                      initial={{ scale: 0.8 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                      viewport={{ once: true }}
                      className="space-y-2"
                    >
                      <div className="text-4xl md:text-5xl lg:text-6xl font-light bg-gradient-to-r from-[#1a2240] to-[#4e5a7e] bg-clip-text text-transparent">
                        Days
                      </div>
                      <div className="text-slate-600 font-medium text-sm md:text-base">with Kuinbee</div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-white relative">
          {/* Visual separator */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-px bg-gradient-to-r from-transparent via-[#1a2240]/30 to-transparent"></div>
          
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12 md:mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a2240]/5 rounded-full border border-[#1a2240]/10 mb-4 md:mb-6">
                <span className="text-sm font-medium text-[#1a2240]">01 / What we do</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#1a2240] leading-tight mb-4 md:mb-6">
                We make data accessible, accurate, and actionable on demand
              </h2>
              <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                We focus on creating the most seamless experience for finding, collecting, and working with data. Our
                goal is to empower anyone from a solo researcher to a Fortune 500 company.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {[
                {
                  title: "Verified Datasets",
                  description: "Available for instant download with quality guarantees",
                  icon: CheckCircle,
                },
                {
                  title: "Custom Analytics",
                  description: "Requests fulfilled in days, not months",
                  icon: Zap,
                },
                {
                  title: "Aggregated Sources",
                  description: "Public data from multiple sources in one place",
                  icon: Database,
                },
                {
                  title: "Analytics Tools",
                  description: "Turn raw numbers into actionable insights",
                  icon: TrendingUp,
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-slate-50/50 rounded-xl md:rounded-2xl p-6 md:p-8 hover:shadow-lg hover:bg-white transition-all duration-300 group cursor-pointer border border-transparent hover:border-[#1a2240]/10"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#1a2240] to-[#4e5a7e] rounded-lg md:rounded-xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-[#1a2240] mb-2 md:mb-3">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm md:text-base">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-gradient-to-br from-[#1a2240] via-[#1a2240] to-[#4e5a7e] relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-48 h-48 md:w-64 md:h-64 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-64 h-64 md:w-96 md:h-96 bg-white/3 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12 md:mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-4 md:mb-6">
                <span className="text-sm font-medium text-white">02 / Where we're going</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight mb-4 md:mb-6">
                Organizations around the world are already using Kuinbee
              </h2>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-6 md:space-y-8 order-2 lg:order-1"
              >
                <div className="space-y-4 md:space-y-6 text-white/90 leading-relaxed text-base md:text-lg">
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    Researchers are accessing agriculture datasets to strengthen food security initiatives. Energy
                    analysts are tracking production patterns to drive smarter infrastructure investments.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    Environmental specialists are monitoring climate data to plan sustainable interventions. Financial
                    institutions are leveraging market indicators to forecast trends and guide strategic decisions.
                  </motion.p>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="text-white font-medium text-lg md:text-xl"
                  >
                    And this is just the beginning.
                  </motion.p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <Link
                    to="/pricing"
                    className="inline-flex items-center gap-3 bg-white text-[#1a2240] px-6 md:px-8 py-3 md:py-4 rounded-xl font-medium hover:bg-slate-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    Start Your Journey
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="order-1 lg:order-2"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl md:rounded-3xl p-8 md:p-12 border border-white/20 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-white/5 rounded-full blur-2xl"></div>
                  <div className="relative z-10 space-y-6 md:space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl flex items-center justify-center border border-white/20">
                        <Globe className="w-6 h-6 md:w-8 md:h-8 text-white" />
                      </div>
                      <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-white/50 to-transparent rounded-full"></div>
                    </div>

                    <div className="text-2xl md:text-3xl lg:text-4xl font-light text-white">Mission-driven engineering</div>
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                    <p className="text-white/90 leading-relaxed text-base md:text-lg">
                      We're builders, not theorists. Our team blends expertise in data engineering, analytics, automation,
                      and product design with a relentless commitment to accuracy, speed, and usability.
                    </p>
                    {/* Meet Our People link removed as requested */}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
