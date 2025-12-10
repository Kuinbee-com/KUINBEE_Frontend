"use client"

import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { AlertTriangle, Target, Database, Users, Zap, ArrowRight, Globe, Building, CheckCircle } from "lucide-react"

const problems = [
  {
    icon: Database,
    problem: "Data is scattered, unstructured, and hard to access.",
    solution: "Unified Data Marketplace",
    description: "Discover and access verified, structured datasets from a single trusted source.",
  },
  {
    icon: AlertTriangle,
    problem: "Data is outdated, poorly formatted, or incomplete.",
    solution: "Real-time Structuring & Standardization",
    description: "Kuinbee cleans, formats, validates, and continuously updates data automatically.",
  },
  {
    icon: Zap,
    problem: "Teams waste time cleaning and preparing data manually.",
    solution: "AI-Powered Data Pipeline",
    description: "A multi-agent system that automates ingestion → cleaning → transformation → feature engineering → modeling.",
  },
  {
    icon: Target,
    problem: "Analysis tools are fragmented and non-intelligent.",
    solution: "Integrated Dashboards & Insights",
    description: "Auto-generated dashboards and intelligent analytics reduce repetitive work.",
  },
  {
    icon: Users,
    problem: "Buying/selling datasets lacks trust, transparency, and reliability.",
    solution: "Secure & Regulated Marketplace",
    description: "Transparent supplier verification, provenance, rights management, and compliant delivery.",
  },
  {
    icon: Building,
    problem: "Enterprises need custom datasets but lack infra to collect and process them.",
    solution: "Custom Data-on-Demand",
    description: "End-to-end custom data collection, curation, and delivery without engineering overhead.",
  },
  {
    icon: CheckCircle,
    problem: "Suppliers struggle to curate, format, and distribute data effectively.",
    solution: "Supplier Tooling & Multi-Channel Delivery",
    description: "Kuinbee handles formatting, structuring, metadata creation, compliance, and distribution.",
  },
  {
    icon: Globe,
    problem: "Researchers & Analysts lack a collaborative environment.",
    solution: "Global Data Community",
    description: "Collaborate, compete, and share insights with data professionals worldwide.",
  },
  {
    icon: Target,
    problem: "Governments need accurate, timely, policy-ready intelligence.",
    solution: "Policy-Grade Dashboards & Intelligence",
    description: "Reliable, structured, and actionable public-sector data insights.",
  },
]

export default function ProblemsSection() {
  const navigate = useNavigate();
  return (
        <section className="bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Left Side - Header and Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="sticky top-8"
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white text-slate-600 text-sm font-medium mb-6 shadow-sm">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Transforming Data Challenges
              </div>
              <h2 className="text-4xl md:text-5xl font-light text-[#1a2240] mb-6 leading-tight" style={{lineHeight: '1.15'}}>
                <span className="block mb-2">Transforming Data</span>
                <span className="block font-semibold bg-gradient-to-r from-[#1a2240] to-[#4e5a7e] bg-clip-text text-transparent" style={{display: 'inline-block', lineHeight: '1.15', paddingBottom: '0.1em'}}>
                  Challenges
                </span>
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed mb-8">
                Every data challenge presents an opportunity.<br />
                Here’s how Kuinbee solves the most critical bottlenecks in today’s data ecosystem, for consumers, enterprises, governments, and data suppliers.
              </p>

              <div className="bg-white rounded-xl p-6 border border-slate-200 mb-8">
                <h4 className="text-lg font-semibold text-[#1a2240] mb-3">From Chaos to Clarity</h4>
                <p className="text-slate-600 leading-relaxed">
                  “The data world is fragmented, slow, and repetitive. Kuinbee turns that chaos into clarity by giving you verified data, automation, and intelligence in one unified system.”
                </p>
              </div>

              {/* Additional Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-slate-600">8 Core Problems Solved</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-slate-600">Unified Data OS Approach</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-slate-600">Enterprise-Ready + Supplier-Friendly</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Comparative Table */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 overflow-hidden"
            >
              {/* Table Header */}
              <div className="bg-gradient-to-r from-[#1a2240] to-[#4e5a7e] px-6 py-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <div className="text-center md:text-left">
                    <h3 className="text-base font-semibold text-white">The Problem</h3>
                  </div>
                  <div className="hidden md:flex justify-center">
                    <ArrowRight className="w-6 h-6 text-white/60" />
                  </div>
                  <div className="text-center md:text-right">
                    <h3 className="text-base font-semibold text-white">How Kuinbee Addresses It</h3>
                  </div>
                </div>
              </div>

              {/* Comparison Rows */}
              <div className="divide-y divide-slate-100">
                {problems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group hover:bg-slate-50/50 transition-colors duration-300"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 items-center">
                      {/* Problem Side */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-lg bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors duration-300">
                            <AlertTriangle className="w-3 h-3 text-red-500" />
                          </div>
                        </div>
                        <p className="text-slate-700 font-medium leading-snug text-[0.81rem]">{item.problem}</p>
                      </div>

                      {/* Arrow Connector */}
                      <div className="hidden md:flex justify-center">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#1a2240] to-[#4e5a7e] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <ArrowRight className="w-3 h-3 text-white" />
                        </div>
                      </div>

                      {/* Solution Side */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#1a2240] to-[#4e5a7e] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <item.icon className="w-3 h-3 text-white" />
                          </div>
                        </div>
                        <h4 className="text-sm font-semibold text-[#1a2240] mb-1">{item.solution}</h4>
                        <p className="text-slate-600 leading-snug text-[0.85rem]">{item.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-br from-[#1a2240] to-[#4e5a7e] rounded-2xl p-8 text-white shadow-xl shadow-slate-200/50">
            <h3 className="text-2xl font-semibold mb-4">Ready to Transform Your Data?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Join hundreds of people already using Kuinbee to drive better decisions and outcomes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="px-8 py-3 bg-white text-[#1a2240] rounded-xl font-semibold hover:bg-slate-50 transition-colors duration-300 shadow-lg"
                onClick={() => navigate('/pricing')}
              >
                Work with us
              </button>
              <button
                className="px-8 py-3 border border-white/20 text-white rounded-xl font-semibold hover:bg-white/10 transition-colors duration-300"
                onClick={() => navigate('/support')}
              >
                Schedule a call
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
