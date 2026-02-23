"use client"

import { motion, AnimatePresence } from "framer-motion"
import { DollarSign, Zap, Leaf, Globe, TrendingUp, Factory, ArrowRight, Database } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

export default function CategoriesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const navigate = useNavigate();

  // Categories as shown in DataMarketplace
  const marketplaceCategories = [
    "Finance",
    "Energy",
    "Environment",
    "Agri and Food",
    "Economics"
  ];

  const categories = [
    {
      title: "Finance",
      description: "Market data, trading patterns, economic indicators, and financial analytics",
      icon: DollarSign,
      count: "2,500+",
      color: "#34d399",
      bgColor: "#1a2240",
      hoverBg: "hover:bg-emerald-100",
      glareColor: "#34d399",
    },
    {
      title: "Energy",
      description: "Power generation, consumption patterns, renewable sources, and grid analytics",
      icon: Zap,
      count: "1,800+",
      color: "#fbbf24",
      bgColor: "#1a2240",
      hoverBg: "hover:bg-yellow-100",
      glareColor: "#fbbf24",
    },
    {
      title: "Environment",
      description: "Climate data, pollution metrics, biodiversity, and sustainability indicators",
      icon: Leaf,
      count: "3,200+",
      color: "#4ade80",
      bgColor: "#1a2240",
      hoverBg: "hover:bg-green-100",
      glareColor: "#4ade80",
    },
    {
      title: "Agri and Food",
      description: "Crop yields, supply chains, nutrition data, and agricultural trends",
      icon: Globe,
      count: "1,400+",
      color: "#fbbf24",
      bgColor: "#1a2240",
      hoverBg: "hover:bg-amber-100",
      glareColor: "#fbbf24",
    },
    {
      title: "Economics",
      description: "GDP metrics, trade data, employment statistics, and economic forecasts",
      icon: TrendingUp,
      count: "2,100+",
      color: "#60a5fa",
      bgColor: "#1a2240",
      hoverBg: "hover:bg-blue-100",
      glareColor: "#60a5fa",
    },
    {
      title: "AI & Machine Learning",
      description: "Machine learning datasets, AI models, training data, benchmarks, and synthetic data for advanced analytics and automation.",
      icon: Database, // Changed to Database for AI & ML
      count: "1,100+",
      color: "#a78bfa",
      bgColor: "#1a2240",
      hoverBg: "hover:bg-purple-100",
      glareColor: "#a78bfa",
    },
  ]

  return (
    <section className="py-4 bg-white min-h-[70vh]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 max-w-4xl"
        >
          <div className="flex items-start justify-between mb-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a2240]/5 rounded-full border border-[#1a2240]/10 mb-6">
                <span className="text-sm font-medium text-[#1a2240]">Explore by Category</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#1a2240] leading-tight mb-6">
                Discover datasets across
                <span className="block font-semibold mt-2">every industry</span>
              </h2>
            </div>
            <div className="hidden lg:block w-px h-24 bg-gradient-to-b from-[#1a2240]/20 to-transparent ml-12"></div>
          </div>
          <div className="ml-0 lg:ml-8">
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
              From finance to agriculture, find the exact data you need to power your next breakthrough
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group block p-2 h-full w-full cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => {
                if (marketplaceCategories.includes(category.title)) {
                  navigate(`/marketplace?category=${encodeURIComponent(category.title)}`);
                } else {
                  navigate('/marketplace');
                }
              }}
            >
              {/* Background hover effect */}
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.span
                    className="absolute inset-0 h-full w-full block rounded-3xl transition-colors duration-300 bg-gradient-to-br from-[#1a2240]/15 to-[#24305e]/20"
                    layoutId="hoverBackground"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { duration: 0.15 },
                    }}
                    exit={{
                      opacity: 0,
                      transition: { duration: 0.15, delay: 0.2 },
                    }}
                  />
                )}
              </AnimatePresence>

              {/* Card content */}
              <div
                className={`rounded-2xl h-full w-full p-8 overflow-hidden relative z-20 transition-all duration-300 border border-white/20 group-hover:shadow-2xl group-hover:shadow-[#1a2240]/30 shadow-xl shadow-[#1a2240]/15`}
                style={{
                  background: `linear-gradient(135deg, ${category.bgColor}f5 0%, ${category.bgColor}e8 30%, ${category.bgColor}d5 70%, ${category.bgColor}c0 100%)`,
                  boxShadow:
                    "0 20px 40px 0 rgba(26,34,64,0.25), 0 10px 25px 0 rgba(26,34,64,0.15), 0 4px 12px 0 rgba(26,34,64,0.1)",
                }}
              >
                <div className="relative z-10">
                  {/* Icon and count */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      style={{
                        backgroundColor: `${category.bgColor}40`,
                        border: `1px solid ${category.bgColor}60`,
                      }}
                    >
                      <category.icon className={`w-7 h-7 text-white`} />
                    </div>
                    <div className="text-right">
                      {category.title === "AI & Machine Learning" ? (
                        <span className="inline-block bg-white text-[#1a2240] text-xs font-semibold px-3 py-1 rounded-full shadow border border-gray-200">Coming Soon</span>
                      ) : (
                        <>
                          <div className="text-2xl font-bold text-white transition-colors">{category.count}</div>
                          <div className="text-sm text-white/80 font-medium">datasets</div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-white mb-3 transition-colors">{category.title}</h3>

                  {/* Description */}
                  <p className="text-white/80 leading-relaxed mb-6 transition-colors">{category.description}</p>

                  {/* Progress bar */}
                  <div className="w-full bg-white/20 rounded-full h-1 mb-4 overflow-hidden">
                    <motion.div
                      initial={{ width: "0%" }}
                      whileInView={{ width: "75%" }}
                      transition={{ duration: 1.5, delay: index * 0.1 + 0.5 }}
                      viewport={{ once: true }}
                      className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                    />
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                      Explore Category
                    </span>
                    <ArrowRight className="w-4 h-4 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Categories CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/marketplace">
            <Button
              size="lg"
              variant="outline"
              className="bg-white border-2 border-[#1a2240]/20 text-[#1a2240] hover:bg-[#1a2240] hover:text-white hover:border-[#1a2240] px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
            >
              <span className="flex items-center">
                Explore Beta Marketplace
                <ArrowRight className="w-5 h-5 ml-2" />
              </span>
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
