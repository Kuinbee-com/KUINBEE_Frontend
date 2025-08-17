"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, ChevronDown, MessageCircle, HelpCircle } from "lucide-react"
import { Input } from "@/shared/components/ui/input"

const faqData = [
  {
    id: 1,
    question: "What is Kuinbee's mission?",
    answer:
      "Kuinbee's mission is to make data universally accessible, structured, and secure. We exist to remove barriers around information and empower individuals, businesses, and institutions to make decisions backed by integrity, accuracy, and trust.",
    category: "About",
  },
  {
    id: 2,
    question: "What does Kuinbee offer?",
    answer:
      "Kuinbee is a unified data platform that brings everything under one roof. Our services include a Data Marketplace for buying and selling datasets, global Data Aggregation, a collaborative Community, AI-powered Analytics & Dashboards, Data Structuring & Cleaning, and built-in Security.",
    category: "Services",
  },
  {
    id: 3,
    question: "Can Kuinbee provide custom datasets?",
    answer:
      "Yes. Beyond ready-to-use datasets, Kuinbee offers on-demand data collection and analytics. Our team can collect, verify, structure, and secure data tailored to your exact requirements, ensuring it's both reliable and decision-ready.",
    category: "Services",
  },
  {
    id: 4,
    question: "How is Kuinbee different from other platforms?",
    answer:
      "Most platforms solve only one part of the data puzzle. Kuinbee combines collection, aggregation, structuring, security, analytics, and collaboration into a single ecosystem eliminating tool sprawl, cutting costs, and accelerating the journey from raw data to real decisions.",
    category: "About",
  },
  {
    id: 5,
    question: "Who is Kuinbee for?",
    answer:
      "Kuinbee is designed for enterprises, governments, researchers, startups, NGOs, students, and data professionals. Whether you're shaping policy, running analytics, driving innovation, or learning data skills, Kuinbee provides the structured and secure data foundation you need.",
    category: "Users",
  },
  {
    id: 6,
    question: "What is the Kuinbee Community?",
    answer:
      "The Kuinbee Community is where researchers, analysts, freelancers, students, and enterprises connect, collaborate, and share insights. It's more than updates. It's a hub for discussions, learning resources, and content built around real-world data problems and solutions.",
    category: "Community",
  },
]

export default function FAQSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [openItems, setOpenItems] = useState<number[]>([])
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", "About", "Services", "Users", "Community"]

  const filteredFAQs = faqData.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleItem = (id: number) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <section id="faq" className="py-20 px-4 sm:px-8 bg-slate-50 min-h-[80vh]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#1a2240] to-[#4e5a7e] rounded-full mb-6">
            <HelpCircle className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white">Frequently Asked Questions</span>
          </div>

          <h2
            className="text-4xl md:text-5xl font-light text-[#1a2240] mb-6"
            style={{
              textShadow: "0 2px 4px rgba(26, 34, 64, 0.3), 0 4px 8px rgba(26, 34, 64, 0.15)",
              transform: "translateZ(0)",
            }}
          >
            Got Questions?
            <span
              className="block bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 bg-clip-text text-transparent font-semibold"
              style={{
                textShadow: "0 2px 6px rgba(26, 34, 64, 0.25)",
                filter: "drop-shadow(0 4px 8px rgba(26, 34, 64, 0.3))",
                transform: "translateZ(10px)",
              }}
            >
              We've Got Answers
            </span>
          </h2>

          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Find answers to common questions about Kuinbee's platform, services, and community.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 space-y-6"
        >
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white/80 backdrop-blur-sm"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                layout
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                  layout: { duration: 0.3 },
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-500 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-[#1a2240] to-[#4e5a7e] text-white shadow-lg transform"
                    : "bg-white/60 text-slate-600 hover:bg-white/80 hover:text-[#1a2240]"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* FAQ Items */}
        <motion.div layout className="space-y-4">
          <AnimatePresence mode="wait">
            {filteredFAQs.map((faq, index) => (
              <motion.div
                key={`${selectedCategory}-${faq.id}`}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.4,
                    delay: index * 0.08,
                    ease: "easeOut",
                  },
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                  scale: 0.95,
                  transition: { duration: 0.2 },
                }}
                layoutId={`faq-${faq.id}`}
                className="group"
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 overflow-hidden hover:shadow-xl transition-all duration-500 hover:border-blue-200 hover:transform hover:scale-[1.02]">
                  <motion.button
                    onClick={() => toggleItem(faq.id)}
                    whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.03)" }}
                    transition={{ duration: 0.3 }}
                    className="w-full px-6 py-5 text-left flex items-center justify-between transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1a2240] to-[#4e5a7e] flex items-center justify-center flex-shrink-0"
                      >
                        <MessageCircle className="w-5 h-5 text-white" />
                      </motion.div>
                      <h3
                        className="text-lg font-semibold text-[#1a2240] group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-blue-700 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500"
                        style={{
                          textShadow: "0 1px 3px rgba(26, 34, 64, 0.2)",
                        }}
                      >
                        {faq.question}
                      </h3>
                    </div>
                    <motion.div
                      animate={{ rotate: openItems.includes(faq.id) ? 180 : 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                      }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors duration-300" />
                    </motion.div>
                  </motion.button>

                  <AnimatePresence>
                    {openItems.includes(faq.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                          transition: {
                            height: { duration: 0.4, ease: "easeOut" },
                            opacity: { duration: 0.3, delay: 0.1 },
                          },
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                          transition: {
                            height: { duration: 0.3, ease: "easeIn" },
                            opacity: { duration: 0.2 },
                          },
                        }}
                        className="overflow-hidden"
                      >
                        <motion.div
                          initial={{ y: -10 }}
                          animate={{ y: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                          className="px-6 pb-6 pl-20"
                        >
                          <div className="bg-gradient-to-r from-blue-50 to-transparent rounded-xl p-4 border-l-4 border-gradient-to-b border-blue-500">
                            <p className="text-slate-700 leading-relaxed">{faq.answer}</p>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Results */}
        {filteredFAQs.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-600 mb-2">No FAQs Found</h3>
            <p className="text-slate-500">Try adjusting your search terms or category filter.</p>
          </motion.div>
        )}

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16 p-8 bg-gradient-to-r from-[#1a2240] to-[#4e5a7e] rounded-2xl"
        >
          <h3
            className="text-2xl font-semibold text-white mb-4"
            style={{
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
            }}
          >
            Still have questions?
          </h3>
          <p className="text-blue-100 mb-6 max-w-md mx-auto">
            Our team is here to help. Get in touch and we'll respond as soon as possible.
          </p>
          <button className="bg-white text-[#1a2240] px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 hover:scale-105 shadow-lg">
            Contact Support
          </button>
        </motion.div>
      </div>
    </section>
  )
}
