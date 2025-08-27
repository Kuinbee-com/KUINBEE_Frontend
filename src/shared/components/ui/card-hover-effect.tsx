// import Link from "next/link"
"use client"

import type React from "react"

import { cn } from "../../utils"
import { AnimatePresence, motion } from "framer-motion"

import { useState } from "react"


export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string
    description: string
    link: string
    icon: React.ElementType
    color: string
    comingSoon?: boolean
  }[]
  className?: string
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10", className)}>
      {items.map((item, idx) => {
        // Extract the main color from the color string (e.g., from-[#5865F2]/10 to-[#5865F2]/5)
        const colorMatch = item.color.match(/#([0-9a-fA-F]{6})/);
        let mainColor = colorMatch ? `#${colorMatch[1]}` : '#bfc9d1';
        // Reduce glare opacity for Instagram and Reddit, and set Reddit glare to orange
        let glareOpacity = 0.5;
        if (item.title === 'Instagram') {
          glareOpacity = 0.1;
        }
        if (item.title === 'Reddit') {
          glareOpacity = 0.1;
          mainColor = '#FF4500'; // Reddit orange
        }
        return (
          <a
            href={item?.link}
            key={item?.link}
            className="relative group block p-2 h-full w-full"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* Animated glare/glow for every card, only on hover */}
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.div
                  className="pointer-events-none absolute inset-0 z-20 rounded-3xl"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{
                    opacity: 0.7,
                    scale: 1.04,
                    filter: 'blur(18px) brightness(1.18)',
                  }}
                  exit={{ opacity: 0, scale: 0.98, filter: 'blur(0px) brightness(1.10)' }}
                  transition={{
                    duration: 0.5,
                    ease: 'easeInOut',
                  }}
                  style={{
                    background:
                      `radial-gradient(circle at 50% 50%, ${mainColor} 0%, #fff0 70%)`, // tighter glare
                    boxShadow:
                      `0 0 20px 12px ${mainColor}55, 0 0 40px 12px ${mainColor}33`,
                    opacity: glareOpacity,
                  }}
                />
              )}
            </AnimatePresence>
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className={cn(
                    "absolute inset-0 h-full w-full block rounded-3xl transition-colors duration-300",
                    "bg-gradient-to-br from-[#1a2240]/15 to-[#24305e]/20", // Lighter hover effect
                  )}
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
            <Card icon={item.icon} iconColor={item.color} comingSoon={item.comingSoon}>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </Card>
          </a>
        );
      })}
    </div>
  )
}

export const Card = ({
  className,
  children,
  icon: Icon,
  iconColor,
  comingSoon = false,
}: {
  className?: string
  children: React.ReactNode
  icon: React.ElementType
  iconColor: string
  comingSoon?: boolean
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-6 overflow-hidden relative z-20 flex flex-col items-center text-center transition-colors duration-300",
        "bg-gradient-to-br from-[#f8fafc]/85 via-[#f1f5f9]/90 to-[#e2e8f0]/85 border-white/40", // Light mode card background
        className,
      )}
      style={{
        boxShadow: "0 10px 40px 0 rgba(26,34,64,0.12)", // Light mode shadow
      }}
    >
      {/* Coming Soon Badge */}
      {comingSoon && (
        <div className="absolute top-3 right-3 z-30">
          <div className="bg-gradient-to-r from-[#1a2240] to-[#24305e] text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
            Coming Soon
          </div>
        </div>
      )}
      
      <div
        className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-lg transition-colors duration-300",
          `bg-gradient-to-br ${iconColor}`, // Use the passed iconColor
        )}
      >
        <Icon className="w-8 h-8 text-[#1a2240]" /> {/* Light mode icon color */}
      </div>
      <div className="relative z-50 flex flex-col items-center text-center">{children}</div>
    </div>
  )
}

export const CardTitle = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return <h4 className={cn("text-2xl font-bold mb-2 text-[#1a2240]", className)}>{children}</h4>
}

export const CardDescription = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return <p className={cn("text-base mb-6 text-gray-600", className)}>{children}</p>
}
