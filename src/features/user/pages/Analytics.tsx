"use client"

import * as React from 'react';
import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, Mail, Zap, Sparkles, TrendingUp } from "lucide-react";
import { useForm, ValidationError } from '@formspree/react';
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import Footer from "@/features/user/pages/landing/footer";
import ResponsiveHeader from "../components/ResponsiveHeader";


const AnalyticsPage: React.FC = () => {
  const [email, setEmail] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [state, handleSubmit] = useForm("xdkwzkgj");

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      // Create form data and submit via Formspree
      const formData = new FormData()
      formData.append('email', email)
      formData.append('source', 'Analytics Waitlist')
      
      handleSubmit(formData)
      setEmail("")
    }
  }
  
  return (
    <div className="min-h-screen relative bg-[#f7f8fa]">
      {/* Main gradient overlay */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#1a2240] via-[#ffffff] to-[#1a2240] opacity-20 pointer-events-none z-0" />
      <div className="relative z-20">
        <ResponsiveHeader theme="default" />

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
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-[#1a2240] via-[#4e5a7e] to-[#1a2240] bg-clip-text text-transparent leading-tight pt-8 pb-4 text-center break-words sm:break-normal"
              style={{ fontFamily: 'Inter, Roboto, Arial, sans-serif', wordBreak: 'break-word', lineHeight: '1.2' }}
            >
              AI Analytics Engine
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-base sm:text-lg lg:text-xl text-center text-[#24305e] mb-8 sm:mb-10 lg:mb-12 max-w-4xl mx-auto px-4"
            >
              Transform chaos into clarity. Kuinbee's AI-powered engine handles every stage of the data lifecycle, 
              from connecting and cleaning to modeling, analyzing, and visualizing, all in one unified workspace.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 text-sm sm:text-base text-slate-500 px-4"
            >
              <div className="flex items-center gap-2 sm:gap-3 bg-white/80 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-blue-100/50 shadow-lg">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-[#4e5a7e]" />
                <span className="font-medium">Automated Data Ingestion</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 bg-white/80 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-blue-100/50 shadow-lg">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-[#4e5a7e]" />
                <span className="font-medium">AI Modeling & Insights</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 bg-white/80 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-blue-100/50 shadow-lg">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#4e5a7e]" />
                <span className="font-medium">Real-Time Analytics</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12 lg:mb-16"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-light text-center mb-12 lg:mb-16 text-[#1a2240]"
            >
              Features
            </motion.h2>
            
            {/* Highlighted Feature - Seamless Integration */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mb-12 lg:mb-16"
            >
              <div className="bg-gradient-to-br from-[#1a2240] to-[#4e5a7e] rounded-3xl p-8 lg:p-12 text-white shadow-2xl relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
                
                <div className="relative z-10 text-center max-w-4xl mx-auto">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-6"
                  >
                    <TrendingUp className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-2xl lg:text-3xl font-medium mb-4">Seamless Integration</h3>
                  <p className="text-xl text-white/90 leading-relaxed">
                    Deploy insights via APIs, dashboards, or data warehouse connections all in one click. 
                    Built for enterprise scalability with developer-friendly implementation.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Other Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-[#1a2240]/10 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-[#1a2240]/10 rounded-xl mb-4">
                    <Zap className="w-6 h-6 text-[#1a2240]" />
                  </div>
                  <h3 className="text-xl font-medium text-[#1a2240] mb-3">Automated Data Ingestion</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Connect APIs, files, or databases; our AI ingests and organizes data instantly.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-[#1a2240]/10 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-[#1a2240]/10 rounded-xl mb-4">
                    <Sparkles className="w-6 h-6 text-[#1a2240]" />
                  </div>
                  <h3 className="text-xl font-medium text-[#1a2240] mb-3">Smart Cleaning & Validation</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Detects errors, fills gaps, and ensures data integrity with intelligent rule-based checks.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-[#1a2240]/10 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-[#1a2240]/10 rounded-xl mb-4">
                    <TrendingUp className="w-6 h-6 text-[#1a2240]" />
                  </div>
                  <h3 className="text-xl font-medium text-[#1a2240] mb-3">AI Modeling & Insights</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Builds predictive and descriptive models automatically to uncover trends and anomalies.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-[#1a2240]/10 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-[#1a2240]/10 rounded-xl mb-4">
                    <BarChart3 className="w-6 h-6 text-[#1a2240]" />
                  </div>
                  <h3 className="text-xl font-medium text-[#1a2240] mb-3">Instant Visualizations</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Converts processed data into dynamic dashboards and visual stories in seconds.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-[#1a2240]/10 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-[#1a2240]/10 rounded-xl mb-4">
                    <Zap className="w-6 h-6 text-[#1a2240]" />
                  </div>
                  <h3 className="text-xl font-medium text-[#1a2240] mb-3">Real-Time Analytics</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Continuously updates insights as new data flows in.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.3 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-[#1a2240]/10 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-[#1a2240]/10 rounded-xl mb-4">
                    <Sparkles className="w-6 h-6 text-[#1a2240]" />
                  </div>
                  <h3 className="text-xl font-medium text-[#1a2240] mb-3">Governance & Credibility</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Every dataset passes through validation pipelines to ensure transparency and trust.
                  </p>
                </div>
              </motion.div>
            </div>
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
                Be part of the revolution in autonomous analytics
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="text-sm sm:text-base lg:text-lg text-[#24305e] mb-12 sm:mb-16 max-w-3xl mx-auto leading-relaxed px-4"
              >
                Join the Kuinbee waitlist today and unlock the future of data intelligence.
              </motion.p>

              {!state.succeeded ? (
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
                        name="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={state.submitting}
                        className="h-12 sm:h-14 lg:h-16 px-4 sm:px-6 lg:px-8 text-base sm:text-lg lg:text-xl rounded-xl sm:rounded-2xl border-blue-200/60 focus:border-[#1a2240] focus:ring-[#1a2240]/20 bg-white/90 backdrop-blur-sm shadow-lg font-light placeholder:text-slate-400 disabled:opacity-50"
                      />
                      <ValidationError 
                        prefix="Email" 
                        field="email"
                        errors={state.errors}
                        className="text-red-500 text-sm mt-2"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={state.submitting || !email.trim()}
                      className="h-12 sm:h-14 lg:h-16 px-6 sm:px-8 lg:px-10 bg-gradient-to-r from-[#1a2240] via-[#4e5a7e] to-[#1a2240] hover:from-[#4e5a7e] hover:via-[#1a2240] hover:to-[#4e5a7e] text-white font-semibold rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-base sm:text-lg lg:text-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mr-2 sm:mr-3" />
                      <span className="hidden sm:inline">
                        {state.submitting ? 'Joining...' : 'Join Waitlist'}
                      </span>
                      <span className="sm:hidden">
                        {state.submitting ? 'Joining...' : 'Join'}
                      </span>
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
                    Thanks for joining! We'll notify you as soon as the analytics dashboard is ready.
                  </p>
                </motion.div>
              )}

              {state.errors && Object.keys(state.errors).length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4 max-w-2xl mx-auto"
                >
                  <p className="text-red-600 text-sm text-center">
                    Something went wrong. Please try again or contact support.
                  </p>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 2 }}
                className="mt-12 sm:mt-16 text-sm sm:text-base text-slate-400 space-y-2 px-4"
              >
                <p>Expected launch: Q1 2026</p>
                <p>Priority access for early subscribers • No spam, unsubscribe anytime</p>
              </motion.div>
            </div>
          </motion.div>
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default AnalyticsPage;


