"use client"

import * as React from 'react';
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import { ArrowLeft, MapPin, Clock, Users, Briefcase, Heart, Zap, Globe, Mail, Menu, X } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import Navbar from "@/features/user/components/Navbar";
import Footer from "@/features/user/pages/landing/footer";
import { OverlayTriggers } from "@/features/user/components/GlobalOverlaySystem";
import type { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from "react"
import ResponsiveHeader from "../components/ResponsiveHeader";

const jobOpenings: any[] = [
//   {
//     id: 1,
//     title: "Senior Frontend Developer",
//     department: "Engineering",
//     location: "Remote",
//     type: "Full-time",
//     description: "Build beautiful, responsive user interfaces using React, Next.js, and modern web technologies.",
//     requirements: ["5+ years React experience", "TypeScript proficiency", "UI/UX design sense"],
//   },
//   {
//     id: 2,
//     title: "Data Scientist",
//     department: "Data",
//     location: "San Francisco, CA",
//     type: "Full-time",
//     description: "Analyze complex datasets and build machine learning models to drive business insights.",
//     requirements: ["PhD in relevant field", "Python/R expertise", "ML/AI experience"],
//   },
//   {
//     id: 3,
//     title: "Product Manager",
//     department: "Product",
//     location: "New York, NY",
//     type: "Full-time",
//     description: "Lead product strategy and work cross-functionally to deliver exceptional user experiences.",
//     requirements: ["3+ years PM experience", "Technical background", "Strong communication skills"],
//   },
//   {
//     id: 4,
//     title: "DevOps Engineer",
//     department: "Engineering",
//     location: "Remote",
//     type: "Full-time",
//     description: "Build and maintain scalable infrastructure, CI/CD pipelines, and monitoring systems.",
//     requirements: ["AWS/GCP experience", "Kubernetes knowledge", "Infrastructure as code"],
//  },
]

const benefits = [
  {
    icon: Briefcase,
    title: "Impact & Ownership",
    description: "Take real ownership of projects that shape the future of data.",
  },
  {
    icon: Zap,
    title: "Growth & Learning",
    description: "Learning stipend, conference attendance, and continuous skill development",
  },
  {
    icon: Globe,
    title: "Remote First",
    description: "Work from anywhere with flexible hours and async-friendly culture",
  },
  {
    icon: Users,
    title: "Amazing Team",
    description: "Collaborate with world-class talent in a supportive, inclusive environment",
  },
]

export default function CareersPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6 lg:mb-8"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold bg-gradient-to-r from-[#1a2240] via-[#4e5a7e] to-[#1a2240] bg-clip-text text-transparent leading-tight lg:leading-tight xl:leading-tight">
                  <div className="block break-words font-opensans">Join Our Team</div>
              </h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed mb-8 lg:mb-12"
            >
              We're building the future of data analytics and visualization. Join us in creating tools that empower
              businesses to make data-driven decisions.
            </motion.p>
          </motion.div>

          {/* Benefits Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16 lg:mb-20"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 lg:mb-12 bg-gradient-to-r from-[#1a2240] to-[#4e5a7e] bg-clip-text text-transparent">
              Why Work With Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 lg:p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-[#1a2240] to-[#4e5a7e] rounded-xl flex items-center justify-center mb-3 lg:mb-4">
                    <benefit.icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                  </div>
                  <h3 className="text-lg lg:text-xl font-bold text-[#1a2240] mb-2">{benefit.title}</h3>
                  <p className="text-sm lg:text-base text-gray-600 leading-relaxed">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Job Openings */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-16 lg:mb-20"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 lg:mb-12 bg-gradient-to-r from-[#1a2240] to-[#4e5a7e] bg-clip-text text-transparent">
              Open Positions
            </h2>

            {jobOpenings.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-8 lg:p-12 max-w-3xl mx-auto">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-[#1a2240] to-[#4e5a7e] rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6">
                    <Briefcase className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold mb-3 lg:mb-4 bg-gradient-to-r from-[#1a2240] to-[#4e5a7e] bg-clip-text text-transparent">
                    No Open Positions Right Now
                  </h3>
                  <p className="text-base lg:text-lg text-gray-600 mb-6 lg:mb-8 leading-relaxed">
                    We don't have any open positions at the moment, but we're always interested in connecting with
                    talented individuals who share our vision.
                  </p>
                  <p className="text-sm lg:text-base text-gray-600 mb-6 lg:mb-8 leading-relaxed">
                    Send us your resume and a brief note about what excites you about our mission. We'll keep your
                    information on file and reach out when the right opportunity comes up.
                  </p>
                  <Button className="bg-gradient-to-r from-[#1a2240] to-[#4e5a7e] hover:from-[#24305e] hover:to-[#1a2240] text-white font-semibold px-6 lg:px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105 inline-flex items-center gap-2">
                    <Mail className="w-4 h-4 lg:w-5 lg:h-5" />
                    Email Your Resume
                  </Button>
                </div>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                {jobOpenings.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <div className="p-6 lg:p-8">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl lg:text-2xl font-bold text-[#1a2240] mb-2">{job.title}</h3>
                          <div className="flex flex-wrap items-center gap-3 lg:gap-4 text-xs lg:text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Briefcase className="w-3 h-3 lg:w-4 lg:h-4" />
                              {job.department}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 lg:w-4 lg:h-4" />
                              {job.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 lg:w-4 lg:h-4" />
                              {job.type}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-sm lg:text-base text-gray-700 mb-4 lg:mb-6 leading-relaxed">{job.description}</p>

                      <div className="mb-4 lg:mb-6">
                        <h4 className="text-sm lg:text-base font-semibold text-[#1a2240] mb-2">Requirements:</h4>
                        <ul className="space-y-1">
                          {job.requirements.map((req: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined, idx: Key | null | undefined) => (
                            <li key={idx} className="text-gray-600 text-xs lg:text-sm flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-[#4e5a7e] rounded-full flex-shrink-0" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button className="w-full bg-gradient-to-r from-[#1a2240] to-[#4e5a7e] hover:from-[#24305e] hover:to-[#1a2240] text-white font-semibold py-2.5 lg:py-3 text-sm lg:text-base rounded-xl transition-all duration-300 hover:scale-105">
                        Apply Now
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 lg:mt-16 text-center"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-8 lg:p-12 max-w-4xl mx-auto">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4 lg:mb-6 bg-gradient-to-r from-[#1a2240] to-[#4e5a7e] bg-clip-text text-transparent">
                Don't See Your Role?
              </h3>
              <p className="text-base lg:text-lg text-gray-600 mb-6 lg:mb-8 max-w-2xl mx-auto leading-relaxed">
                We're always looking for talented individuals to join our team. Send us your resume and tell us how
                you'd like to contribute.
              </p>
              <Button className="bg-gradient-to-r from-[#1a2240] to-[#4e5a7e] hover:from-[#24305e] hover:to-[#1a2240] text-white font-semibold px-6 lg:px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105 inline-flex items-center gap-2">
                <Mail className="w-4 h-4 lg:w-5 lg:h-5" />
                Contact Us
              </Button>
            </div>
          </motion.div>
        </main>
      </div>
      <Footer />
    </div>
  )
}