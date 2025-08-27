"use client"
import * as React from 'react';
import{ useState } from "react";
// import Navbar from "../../shared/components/Navbar";
import ResponsiveHeader from "../components/ResponsiveHeader";
import Footer from "@/features/user/pages/landing/footer";
import { OverlayTriggers } from "@/features/user/components/GlobalOverlaySystem";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/shared/components/ui/button";
import {
  DollarSign,
  Mail,
  Phone,
  MessageSquare,
  Building2,
  Zap,
  
} from "lucide-react";


// Shared navigation/overlay system for Pricing page


const PricingPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail("");
      setCompany("");
      setMessage("");
    }, 3000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Majestic Background */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#1a2240] via-[#ffffff] to-[#1a2240] opacity-20 pointer-events-none z-0" />
      <div className="relative z-20">
          <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-[#1a2240]/20 via-[#4e5a7e]/10 to-[#1a2240]/5 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 right-32 w-96 h-96 bg-gradient-to-br from-[#4e5a7e]/15 via-[#1a2240]/8 to-[#4e5a7e]/5 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 5,
          }}
        />
        <motion.div
          className="absolute bottom-32 left-1/3 w-80 h-80 bg-gradient-to-br from-[#1a2240]/10 via-[#4e5a7e]/15 to-[#1a2240]/8 rounded-full blur-3xl"
          animate={{
            x: [0, 120, 0],
            y: [0, -40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 30,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 10,
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-br from-[#4e5a7e]/12 via-[#1a2240]/6 to-[#4e5a7e]/10 rounded-full blur-3xl"
          animate={{
            x: [0, -60, 0],
            y: [0, -80, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 22,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 15,
          }}
        />


          <ResponsiveHeader theme="default" />
        <div className="w-full max-w-4xl mx-auto px-8 py-16">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
          

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-[#1a2240] via-[#4e5a7e] to-[#1a2240] bg-clip-text text-transparent inline-block">
                Custom Pricing for Business
              </span>
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
              We don't believe in one-size-fits-all pricing. Every business has unique data needs, and we're here to
              create a solution that perfectly fits your requirements and budget.
            </p>

            <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#4e5a7e]" />
                <span>Custom Solutions</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#4e5a7e]" />
                <span>Enterprise Support</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-[#4e5a7e]" />
                <span>Flexible Pricing</span>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden"
            style={{ boxShadow: "0 25px 80px 0 rgba(26,34,64,0.15)" }}
          >
            <div className="px-8 py-6 border-b border-gray-100/60 bg-gradient-to-r from-[#1a2240]/5 to-[#4e5a7e]/5">
              <h2 className="text-2xl font-bold text-[#1a2240] flex items-center gap-3">
                <MessageSquare className="w-6 h-6" />
                Let's Discuss Your Needs
              </h2>
              <p className="text-gray-600 mt-2">
                Tell us about your business and data requirements, and we'll create a custom proposal for you.
              </p>
            </div>

            <div className="p-8">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1a2240] mb-2">Thank You!</h3>
                  <p className="text-gray-600">
                    We've received your inquiry and will get back to you within 24 hours with a custom proposal.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-[#1a2240] mb-2">
                        Business Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4e5a7e] focus:ring-2 focus:ring-[#4e5a7e]/20 outline-none transition-all duration-300 bg-white/80"
                        placeholder="your.email@company.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-semibold text-[#1a2240] mb-2">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        id="company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4e5a7e] focus:ring-2 focus:ring-[#4e5a7e]/20 outline-none transition-all duration-300 bg-white/80"
                        placeholder="Your Company Inc."
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-[#1a2240] mb-2">
                      Tell us about your data needs *
                    </label>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4e5a7e] focus:ring-2 focus:ring-[#4e5a7e]/20 outline-none transition-all duration-300 bg-white/80 resize-none"
                      placeholder="Describe your business, data requirements, expected usage, team size, and any specific features you need..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#1a2240] to-[#4e5a7e] hover:from-[#4e5a7e] hover:to-[#1a2240] text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-[#1a2240]/25 hover:shadow-xl hover:shadow-[#1a2240]/40 transition-all duration-300 hover:scale-[1.02] text-lg"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                        Sending Your Request...
                      </>
                    ) : (
                      <>
                        <Mail className="w-5 h-5 mr-3" />
                        Get Custom Pricing
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-12"
          >
            <p className="text-gray-600 mb-4">Prefer to talk directly? We're here to help.</p>
            <div className="flex items-center justify-center gap-8">
              <a
                href="mailto:sales@kuinbee.com"
                className="flex items-center gap-2 text-[#1a2240] hover:text-[#4e5a7e] transition-colors font-medium"
              >
                <Mail className="w-4 h-4" />
                sales@kuinbee.com
              </a>
              <a
                href="tel:+1-555-0123"
                className="flex items-center gap-2 text-[#1a2240] hover:text-[#4e5a7e] transition-colors font-medium"
              >
                <Phone className="w-4 h-4" />
                +1 (555) 012-3456
              </a>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default PricingPage
